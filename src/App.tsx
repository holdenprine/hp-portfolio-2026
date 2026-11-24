import { useLayoutEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { ScrollSmoother } from 'gsap/ScrollSmoother'
import { ChevronLeftIcon, ChevronRightIcon } from 'lucide-react'
import './App.css'
import Title from './Title'
import Bio from './Bio'
import Projects from './Projects'
import Contact from './Contact'

gsap.registerPlugin(ScrollTrigger, ScrollSmoother)

const TILE_COLS = 12
const TILE_ROWS = 8
const TILE_COLORS = ['--tile-1', '--tile-2', '--tile-3', '--tile-4', '--tile-5']



function App() {
  const panelsRef = useRef<HTMLDivElement>(null)
  const [contactActive, setContactActive] = useState(false)
  const [canPrev, setCanPrev] = useState(false)
  const [canNext, setCanNext] = useState(true)
  const smootherRef = useRef<ScrollSmoother | null>(null)
  const wipesTriggerRef = useRef<ScrollTrigger | null>(null)
  const panelStepsRef = useRef(0)
  const navTweenRef = useRef<gsap.core.Tween | null>(null)
  const navTargetRef = useRef(0)

  // Layout effect so the smoother exists before children create their ScrollTriggers in useEffect
  useLayoutEffect(() => {
    const smoother = ScrollSmoother.create({
      wrapper: '#smooth-wrapper',
      content: '#smooth-content',
      smooth: 1,
    })
    smootherRef.current = smoother

    const ctx = gsap.context(() => {
      const panels = gsap.utils.toArray<HTMLElement>('.panel')
      const incoming = panels.slice(1)
      const tiles = gsap.utils.toArray<HTMLElement>('.tile')

      const rootStyle = getComputedStyle(document.documentElement)
      const palette = TILE_COLORS.map((name) => rootStyle.getPropertyValue(name).trim())

      gsap.set(incoming, { autoAlpha: 0 })
      gsap.set(tiles, { scale: 0 })

      const tileStagger = {
        grid: [TILE_ROWS, TILE_COLS] as [number, number],
        axis: 'x' as const,
        from: 'start' as const,
        amount: 0.4,
      }

      const wipes = gsap.timeline({
        scrollTrigger: {
          trigger: panelsRef.current,
          start: 'top top',
          end: () => `+=${incoming.length * window.innerHeight}`,
          pin: true,
          scrub: true,
          invalidateOnRefresh: true,
          onUpdate: (self) => {
            const tl = self.animation as gsap.core.Timeline
            setContactActive(tl.time() >= tl.labels.contactIn)
            setCanPrev(self.progress > 0.01)
            setCanNext(self.progress < 0.99)
          },
        },
      })
      wipesTriggerRef.current = wipes.scrollTrigger ?? null
      panelStepsRef.current = incoming.length

      // Each wipe reshuffles tile colors, covers the screen left to right, swaps in the next panel, then clears left to right
      incoming.forEach((panel) => {
        wipes
          .set(tiles, { backgroundColor: () => gsap.utils.random(palette) })
          .to(tiles, { scale: 1, duration: 0.3, ease: 'power2.in', stagger: tileStagger })
          .set(panel, { autoAlpha: 1 })

        if (panel.querySelector('.bio')) {
          // Looked up at call time because Bio's useEffect creates the timeline after this layout effect runs
          wipes.call(() => gsap.getById('text-scramble')?.restart())
        }

        if (panel.querySelector('.contact')) {
          wipes.addLabel('contactIn')
        }

        wipes.to(tiles, { scale: 0, duration: 0.3, ease: 'power2.out', stagger: tileStagger })
      })

    }, panelsRef)

    return () => {
      navTweenRef.current?.kill()
      ctx.revert()
      smoother.kill()
    }
  }, [])

  // Tweens the scroll position rather than jumping so the scrubbed tile wipe still plays
  const goToPanel = (direction: 1 | -1) => {
    const smoother = smootherRef.current
    const st = wipesTriggerRef.current
    const steps = panelStepsRef.current
    if (!smoother || !st || !steps) return

    // Rapid taps chain off the pending target instead of wherever the scroll currently is
    const current = navTweenRef.current?.isActive()
      ? navTargetRef.current
      : Math.round(st.progress * steps)
    const target = gsap.utils.clamp(0, steps, current + direction)
    navTargetRef.current = target

    navTweenRef.current = gsap.to(smoother, {
      scrollTop: st.start + ((st.end - st.start) * target) / steps,
      duration: 1.2,
      ease: 'power1.inOut',
      overwrite: true,
    })
  }

  return (
    <>
      {/* Outside #smooth-wrapper because ScrollSmoother transforms its content, which breaks position: fixed */}
      <nav className="panel-nav" aria-label="Sections">
        <button
          type="button"
          className="panel-nav-zone panel-nav-next"
          aria-label="Next section"
          disabled={!canNext}
          onClick={() => goToPanel(1)}
        >
          <ChevronLeftIcon />
        </button>
        <button
          type="button"
          className="panel-nav-zone panel-nav-prev"
          aria-label="Previous section"
          disabled={!canPrev}
          onClick={() => goToPanel(-1)}
        >
          <ChevronRightIcon />
        </button>
      </nav>
      <div id="smooth-wrapper">
        <div id="smooth-content">
          <div className="panels" ref={panelsRef}>
            <div className="panel"><Title /></div>
            <div className="panel"><Bio /></div>
            <div className="panel"><Projects /></div>
            <div className="panel"><Contact active={contactActive} /></div>
            <div
              className="tiles"
              aria-hidden="true"
              style={{
                gridTemplateColumns: `repeat(${TILE_COLS}, 1fr)`,
                gridTemplateRows: `repeat(${TILE_ROWS}, 1fr)`,
              }}
            >
              {Array.from({ length: TILE_COLS * TILE_ROWS }, (_, i) => (
                <div className="tile" key={i} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default App
