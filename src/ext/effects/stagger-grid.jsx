// Stagger Grid Reveal — grid cells cascade into view on scroll. Each column staggers
// independently, creating a waterfall wave effect. GSAP ScrollTrigger batch.
import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
gsap.registerPlugin(ScrollTrigger)

const ITEMS = [
  { n: '01', label: 'Velocity',   desc: 'Speed without direction is noise.' },
  { n: '02', label: 'Clarity',    desc: 'Remove everything that doesn\'t belong.' },
  { n: '03', label: 'Rhythm',     desc: 'Good design breathes.' },
  { n: '04', label: 'Tension',    desc: 'The space before resolution.' },
  { n: '05', label: 'Contrast',   desc: 'Everything is relative.' },
  { n: '06', label: 'Precision',  desc: 'Every pixel has a reason.' },
  { n: '07', label: 'Balance',    desc: 'Symmetry can be boring. Asymmetry can be wrong.' },
  { n: '08', label: 'Hierarchy',  desc: 'Lead the eye. Don\'t confuse it.' },
  { n: '09', label: 'Space',      desc: 'Emptiness is a design element too.' },
  { n: '10', label: 'Motion',     desc: 'Animate the why, not just the what.' },
  { n: '11', label: 'Texture',    desc: 'Even flatness has a surface.' },
  { n: '12', label: 'Intent',     desc: 'A decision made is better than a default kept.' },
]

const ACCENTS = ['#7c3aed', '#a855f7', '#3b82f6', '#0ea5e9', '#10b981', '#f59e0b']

const css = `
*{box-sizing:border-box;margin:0;padding:0}
.sg-wrap{
  font-family:Inter,system-ui,sans-serif;
  background:#0b0b12;min-height:100vh;padding:80px 5vw;
}
.sg-eyebrow{
  font-size:10px;font-weight:700;letter-spacing:.2em;text-transform:uppercase;
  color:#7c3aed;margin-bottom:12px;
}
.sg-h{
  font-size:clamp(36px,5vw,64px);font-weight:900;letter-spacing:-.03em;
  color:#fff;margin-bottom:64px;line-height:1.05;
}
.sg-grid{
  display:grid;
  grid-template-columns:repeat(auto-fill,minmax(240px,1fr));
  gap:16px;
}
.sg-card{
  background:#111117;border:1px solid #1e1e2a;
  border-radius:12px;padding:24px 22px;
  opacity:0;transform:translateY(36px);
  transition:border-color .2s;
}
.sg-card:hover{border-color:#7c3aed}
.sg-num{
  font-family:ui-monospace,monospace;font-size:10.5px;font-weight:700;
  margin-bottom:14px;
}
.sg-title{
  font-size:17px;font-weight:700;color:#fff;
  margin-bottom:8px;letter-spacing:-.01em;
}
.sg-desc{font-size:13px;color:#6b6b7a;line-height:1.55}
`

export default function StaggerGrid() {
  const wrapRef = useRef(null)
  const cardRefs = useRef([])

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.to(cardRefs.current.filter(Boolean), {
        opacity: 1,
        y: 0,
        duration: 0.6,
        stagger: { amount: 0.7, from: 'start' },
        ease: 'power3.out',
        scrollTrigger: {
          trigger: wrapRef.current.querySelector('.sg-grid'),
          start: 'top 80%',
          toggleActions: 'play none none none',
        },
      })
    }, wrapRef)

    return () => ctx.revert()
  }, [])

  return (
    <div ref={wrapRef} className="sg-wrap">
      <style>{css}</style>
      <div className="sg-eyebrow">Principles</div>
      <h2 className="sg-h">What makes great work<br/>recognisable.</h2>
      <div className="sg-grid">
        {ITEMS.map((item, i) => (
          <div key={i} ref={(el) => cardRefs.current[i] = el} className="sg-card">
            <div className="sg-num" style={{ color: ACCENTS[i % ACCENTS.length] }}>{item.n}</div>
            <div className="sg-title">{item.label}</div>
            <div className="sg-desc">{item.desc}</div>
          </div>
        ))}
      </div>
    </div>
  )
}
