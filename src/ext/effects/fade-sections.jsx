// Fade + Slide Reveal Sections — sections enter with a gentle fade+translateY
// as they scroll into view. Uses IntersectionObserver, zero dependencies.
import { useEffect, useRef } from 'react'

const SECTIONS = [
  { label: 'Design', bg: '#0a0a0f', accent: '#7c3aed', headline: 'Start with intent.', body: 'Every pixel earns its place. Strip back until only the essential remains — then make that shine.' },
  { label: 'Build',  bg: '#0d0d18', accent: '#0ea5e9', headline: 'Ship with confidence.', body: 'Clean architecture means fewer surprises. Write code your future self will thank you for.' },
  { label: 'Launch', bg: '#0a0f0a', accent: '#10b981', headline: 'Grow from day one.', body: 'The work isn\'t done at launch. Measure, listen, iterate. The best products never stop evolving.' },
  { label: 'Scale',  bg: '#0f0a0a', accent: '#f59e0b', headline: 'Built to last.', body: 'Infrastructure that scales isn\'t an afterthought — it\'s the foundation everything else rests on.' },
]

const css = `
.fs-wrap { font-family: Inter, system-ui, sans-serif; }
.fs-section {
  min-height: 100vh; display: flex; align-items: center; justify-content: center;
  padding: 80px 48px; box-sizing: border-box;
}
.fs-inner {
  max-width: 640px; opacity: 0; transform: translateY(48px);
  transition: opacity 0.7s cubic-bezier(.16,1,.3,1), transform 0.7s cubic-bezier(.16,1,.3,1);
}
.fs-inner.visible { opacity: 1; transform: translateY(0); }
.fs-label { font-size: 11px; font-weight: 700; letter-spacing: .16em; text-transform: uppercase; margin-bottom: 18px; }
.fs-h { font-size: clamp(40px,6vw,72px); font-weight: 800; letter-spacing: -.03em; line-height: 1; margin: 0 0 20px; color: #fff; }
.fs-p { font-size: 18px; line-height: 1.65; color: rgba(255,255,255,.6); margin: 0; }
.fs-progress {
  position: fixed; right: 24px; top: 50%; transform: translateY(-50%);
  display: flex; flex-direction: column; gap: 8px; z-index: 10;
}
.fs-dot {
  width: 6px; height: 6px; border-radius: 50%; background: rgba(255,255,255,.25);
  transition: background .3s, transform .3s; cursor: pointer;
}
.fs-dot.active { background: #fff; transform: scale(1.5); }
`

export default function FadeSections() {
  const sectionRefs = useRef([])
  const dotsRef = useRef([])

  useEffect(() => {
    const obs = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        const inner = e.target.querySelector('.fs-inner')
        const idx = sectionRefs.current.indexOf(e.target)
        if (e.isIntersecting) {
          if (inner) inner.classList.add('visible')
          if (dotsRef.current[idx]) {
            dotsRef.current.forEach((d) => d && d.classList.remove('active'))
            dotsRef.current[idx].classList.add('active')
          }
        }
      })
    }, { threshold: 0.35 })
    sectionRefs.current.forEach((s) => s && obs.observe(s))
    return () => obs.disconnect()
  }, [])

  return (
    <div className="fs-wrap">
      <style>{css}</style>
      <div className="fs-progress">
        {SECTIONS.map((s, i) => (
          <div
            key={i}
            className={`fs-dot ${i === 0 ? 'active' : ''}`}
            ref={(el) => dotsRef.current[i] = el}
            onClick={() => sectionRefs.current[i]?.scrollIntoView({ behavior: 'smooth' })}
          />
        ))}
      </div>
      {SECTIONS.map((s, i) => (
        <div
          key={i}
          ref={(el) => sectionRefs.current[i] = el}
          className="fs-section"
          style={{ background: s.bg }}
        >
          <div className="fs-inner">
            <div className="fs-label" style={{ color: s.accent }}>{s.label}</div>
            <h2 className="fs-h">{s.headline}</h2>
            <p className="fs-p">{s.body}</p>
          </div>
        </div>
      ))}
    </div>
  )
}
