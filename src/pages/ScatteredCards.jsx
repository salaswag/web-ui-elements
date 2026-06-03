import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import DemoChrome from '../components/DemoChrome.jsx'
import './scattered-cards.css'

gsap.registerPlugin(ScrollTrigger)

const cards = [
  { label: 'Disease Risk', x: 6, y: 4, r: -7, d: 0.5, g: 'linear-gradient(135deg,#a78bfa,#6d28d9)' },
  { label: 'Body Composition', x: 64, y: 10, r: 6, d: 1.4, g: 'linear-gradient(135deg,#fca5a5,#ef4444)' },
  { label: 'Sleep', x: 34, y: 26, r: -3, d: 0.9, g: 'linear-gradient(135deg,#7dd3fc,#0284c7)' },
  { label: 'Cognitive Health', x: 72, y: 40, r: 8, d: 0.4, g: 'linear-gradient(135deg,#6ee7b7,#059669)' },
  { label: 'Gut Health', x: 10, y: 48, r: 5, d: 1.6, g: 'linear-gradient(135deg,#fde68a,#f59e0b)' },
  { label: 'Hormones', x: 44, y: 62, r: -8, d: 1.0, g: 'linear-gradient(135deg,#f0abfc,#c026d3)' },
]
const categories = ['Disease Risk', 'Body Composition', 'Sleep', 'Cognitive Health', 'Gut Health', 'Hormones', 'Aging', 'Toxins']
const milestones = ['Baseline blood panel', 'Personalized protocol', 'Quarterly re-test']

export default function ScatteredCards() {
  const root = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.utils.toArray('.sca-card').forEach((c) => {
        const depth = Number(c.dataset.depth)
        gsap.fromTo(c, { y: 90 * depth }, {
          y: -90 * depth, ease: 'none',
          scrollTrigger: { trigger: '.sca-collage', start: 'top bottom', end: 'bottom top', scrub: 0.6 },
        })
      })
      gsap.from('.sca-node', {
        scale: 0, opacity: 0, stagger: 0.2,
        scrollTrigger: { trigger: '.sca-rail', start: 'top 70%' },
      })
    }, root)
    return () => ctx.revert()
  }, [])

  return (
    <DemoChrome id="scattered-cards">
      <div className="sca-page" ref={root}>
        <header className="sca-head">
          <span className="eyebrow">What we measure</span>
          <h1>A complete map of you.</h1>
        </header>

        <section className="sca-collage">
          {cards.map((c) => (
            <figure
              key={c.label}
              className="sca-card"
              data-depth={c.d}
              style={{ left: `${c.x}%`, top: `${c.y}%`, transform: `rotate(${c.r}deg)` }}
            >
              <div className="sca-thumb" style={{ background: c.g }} />
              <figcaption>{c.label}</figcaption>
            </figure>
          ))}
        </section>

        <section className="sca-rail">
          {milestones.map((m, i) => (
            <div className={`sca-step ${i % 2 ? 'right' : 'left'}`} key={m}>
              <span className="sca-node">{i + 1}</span>
              <div className="sca-shot">{m}</div>
            </div>
          ))}
        </section>

        <section className="sca-cats">
          <h2>Hundreds of biomarkers. One picture.</h2>
          <div className="sca-grid">
            {categories.map((c) => (
              <div className="sca-cat" key={c}><span>{c}</span></div>
            ))}
          </div>
          <div className="sca-cta">
            <span className="br tl" /><span className="br tr" /><span className="br bl" /><span className="br br2" />
            JOIN WAITLIST
          </div>
        </section>

        <div className="scroll-spacer">end</div>
      </div>
    </DemoChrome>
  )
}
