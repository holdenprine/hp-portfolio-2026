import gsap from 'gsap'
import { ScrollSmoother } from 'gsap/ScrollSmoother'
import './Bio.css'

function Bio() {

  gsap.registerPlugin(ScrollSmoother)

  return (
    <div id="smooth-wrapper">
     <section id="smooth-content" className="bio">
      <p>Full Stack Developer specializing in contract and freelance web development, with hands-on experience across React.js, JavaScript, Python, and SQL. Track record of shipping production work across music, health/wellness, and fitness industries — including Stripe/Analytics integrations, WordPress security remediation, and performance optimization. Actively seeking full-time or long-term roles while completing a B.S. in Computer Science at Western Governors University.
      </p>
     </section>
    </div>
  )
}

export default Bio