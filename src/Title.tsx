import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import './Title.css'

gsap.registerPlugin(ScrollTrigger)

const NAME = 'HOLDEN PRINE'
const ROLE = 'FULL STACK DEVELOPER'

// must be at least half viewport size, will tune if need be
const COPIES_PER_HALF = 4

type MarqueeRowProps = {
    text: string
    duration: number
}

function MarqueeRow({ text, duration }: MarqueeRowProps) {
    const trackRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.to(trackRef.current, {
                xPercent: -50,
                duration,
                ease: 'none',
                repeat: -1,
            })
        }, trackRef)
        return () => ctx.revert()
    }, [duration])

    const items = Array.from({ length: COPIES_PER_HALF * 2 }, (_, i) => (
        <span className="marquee-item" key={i}>
            {text}
        </span>
    ))

    return (
        <div className="marquee-row" aria-hidden="true">
            <div className="marquee-track" ref={trackRef}>
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
        </section>
    )
}

export default Title
