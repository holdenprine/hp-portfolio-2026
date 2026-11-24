import { useEffect, useRef, useSyncExternalStore, type CSSProperties } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import './Title.css'

gsap.registerPlugin(ScrollTrigger)

const NAME = 'HOLDEN PRINE'
const ROLE = 'FULL STACK DEVELOPER'

// must be at least half viewport size, will tune if need be
const COPIES_PER_HALF = 4
// One copy already outruns a phone's width; extra copies only bloat the GPU texture and cause stutter
const MOBILE_COPIES_PER_HALF = 2

const MOBILE_QUERY = window.matchMedia('(max-width: 640px)')

function subscribeMobile(onChange: () => void) {
    MOBILE_QUERY.addEventListener('change', onChange)
    return () => MOBILE_QUERY.removeEventListener('change', onChange)
}

function useIsMobile() {
    return useSyncExternalStore(subscribeMobile, () => MOBILE_QUERY.matches)
}

type MarqueeRowProps = {
    text: string
    duration: number
}

function MarqueeRow({ text, duration }: MarqueeRowProps) {
    const trackRef = useRef<HTMLDivElement>(null)
    const isMobile = useIsMobile()
    const copiesPerHalf = isMobile ? MOBILE_COPIES_PER_HALF : COPIES_PER_HALF
    // The loop travels half the track, so fewer copies need a shorter duration to keep the same speed
    const loopDuration = (duration * copiesPerHalf) / COPIES_PER_HALF

    useEffect(() => {
        // Mobile runs the CSS animation in Title.css instead, which stays smooth when the main thread is busy
        if (isMobile) return

        const ctx = gsap.context(() => {
            gsap.to(trackRef.current, {
                xPercent: -50,
                duration: loopDuration,
                ease: 'none',
                repeat: -1,
            })
        }, trackRef)
        return () => ctx.revert()
    }, [isMobile, loopDuration])

    const items = Array.from({ length: copiesPerHalf * 2 }, (_, i) => (
        <span className="marquee-item" key={i}>
            {text}
        </span>
    ))

    return (
        <div className="marquee-row" aria-hidden="true">
            <div
                className="marquee-track"
                ref={trackRef}
                style={{ '--marquee-duration': `${loopDuration}s` } as CSSProperties}
            >
                {items}
            </div>
        </div>
    )
}

function Title() {
    return (
        <section className="title">
            <h1 className="visually-hidden">
                {NAME}, {ROLE}
            </h1>
            <MarqueeRow text={NAME} duration={50} />
            <MarqueeRow text={ROLE} duration={60} />
            <h6 className="title-hint">
                <span className="max-sm:hidden">Scroll to Continue</span>
                <span className="hidden max-sm:inline">Tap Arrows to Continue</span>
            </h6>
        </section>
    )
}

export default Title
