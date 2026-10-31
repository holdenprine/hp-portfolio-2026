import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import './Title.css'

gsap.registerPlugin(ScrollTrigger)

function Title() {
    const ref = useRef<HTMLDivElement>(null)

    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.from(ref.current, {
                opacity: 0,
                y:50,
                scrollTrigger: {
                    trigger: ref.current,
                    start: 'left center 80%',
                    end: 'right center 30%',
                    scrub: true,
                }
            })
        })
        return () => ctx.revert()
    }, [])
  return (
    <div ref={ref}>
        <h1>Title</h1>
    </div>
  )
}

export default Title