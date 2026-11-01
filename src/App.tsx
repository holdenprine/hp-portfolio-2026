import { useLayoutEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { ScrollSmoother } from 'gsap/ScrollSmoother'
import './App.css'
import Title from './Title'
import Bio from './Bio'
import Projects from './Projects'
import Contact from './Contact'

gsap.registerPlugin(ScrollTrigger, ScrollSmoother)

const TILE_COLS = 12
const TILE_ROWS = 8
const TILE_COLORS = [
  '--tile-violet',
  '--tile-purple',
  '--tile-black',
  '--tile-yellow',
  '--tile-orange',
]

function App() {
  const panelsRef = useRef<HTMLDivElement>(null)

  // Layout effect so the smoother exists before children create their ScrollTriggers in useEffect
  useLayoutEffect(() => {
    const smoother = ScrollSmoother.create({
      wrapper: '#smooth-wrapper',
      content: '#smooth-content',
      smooth: 1,
    })

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
        },
      })

      // Each wipe reshuffles tile colors, covers the screen left to right, swaps in the next panel, then clears left to right
      incoming.forEach((panel) => {
        wipes
          .set(tiles, { backgroundColor: () => gsap.utils.random(palette) })
          .to(tiles, { scale: 1, duration: 0.3, ease: 'power2.in', stagger: tileStagger })
          .set(panel, { autoAlpha: 1 })
          .to(tiles, { scale: 0, duration: 0.3, ease: 'power2.out', stagger: tileStagger })
      })
    }, panelsRef)

    return () => {
      ctx.revert()
      smoother.kill()
    }
  }, [])

  return (
    <div id="smooth-wrapper">
      <div id="smooth-content">
        <div className="panels" ref={panelsRef}>
          <div className="panel"><Title /></div>
          <div className="panel"><Bio /></div>
          <div className="panel"><Projects /></div>
          <div className="panel"><Contact /></div>
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
  )
}

export default App
