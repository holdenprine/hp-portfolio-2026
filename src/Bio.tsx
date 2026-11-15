import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrambleTextPlugin } from 'gsap/ScrambleTextPlugin'
import './Bio.css'

gsap.registerPlugin(ScrambleTextPlugin);

function Bio() {

  const containerRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        id: "text-scramble",
        paused: true,
        defaults: {ease: "none"}
      });

      gsap.set("#scrambled-text-original", {
        opacity: 0,
      });

      tl.to("#scramble-text-1", {
        scrambleText: {
          text: "Full Stack Developer specializing in contract and freelance web development, with hands-on experience across React.js, JavaScript, Python, and SQL/NoSQL Database Management Systems.",
          chars: "lowerCase",
          speed: 0.5
        },
        duration: 4
      })
      .to("#scramble-text-2",{
        scrambleText: {
          text: "Track record of shipping production work across music, health/wellness, and fitness industries including Full-Lifecycle Development, Stripe/Analytics integrations, and performance optimization.",
          chars: "~",
          speed: 0.1
        },
        duration: 4
      }).to("#scramble-text-3", {
        scrambleText: {
          text: "Actively seeking full-time or long-term roles while completing a B.S. in Computer Science at Western Governors University.",
          chars: "upperCase",
          speed: 0.1
        },
        duration: 1
      })
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef}>
     <section className="bio">
      <p>Holden Prine is a ...</p>
      <div id="scrambled-text-content">
        <p id="scrambled-text-original">Full Stack Developer specializing in contract and freelance web development, with hands-on experience across React.js, JavaScript, Python, and SQL.  Track record of shipping production work across music, health/wellness, and fitness industries including Full-Lifecycle Development,Stripe/Analytics integrations, and performance optimization. Actively seeking full-time or long-term roles while completing a B.S. in Computer Science at Western Governors University.
        </p>
        <p className="text-scrambled">
          <span id="scramble-text-1"></span>
          <span id="scramble-text-2"></span>
          <span id="scramble-text-3"></span>
          <span id="scramble-cursor">_</span>
        </p>
      </div>
     </section>
    </div>
  )
}

export default Bio