// Scroll Snap Sections — CSS scroll-snap-type forces full-page snapping. An
// IntersectionObserver fires content animations when each section locks into view.
import { useEffect, useRef } from 'react'

const SECTIONS = [
  {
    num: '1', label: 'FOUNDATION',
    headline: 'Start with the why.',
    body: 'Purpose-driven work outlasts trend-driven work. Know what you\'re building before you build it.',
    bg: '#09090b', accent: '#7c3aed', bar: '#7c3aed',
  },
  {
    num: '2', label: 'STRUCTURE',
    headline: 'Shape the experience.',
    body: 'Information architecture is invisible when done well. Users find what they need without thinking.',
    bg: '#0f0820', accent: '#a855f7', bar: '#a855f7',
  },
  {
    num: '3', label: 'SURFACE',
    headline: 'Make it feel right.',
    body: 'Visual polish isn\'t vanity — it communicates craft and builds trust before a word is read.',
    bg: '#0a1628', accent: '#3b82f6', bar: '#3b82f6',
  },
  {
    num: '4', label: 'MOTION',
    headline: 'Let it breathe.',
    body: 'Animation tells the story of how things relate. Used sparingly, it elevates. Overused, it exhausts.',
    bg: '#041a12', accent: '#10b981', bar: '#10b981',
  },
  {
    num: '5', label: 'LAUNCH',
    headline: 'Ship. Learn. Repeat.',
    body: 'Perfect is the enemy of shipped. The best version of your product is the one that exists and can be improved.',
    bg: '#1a1202', accent: '#f59e0b', bar: '#f59e0b',
  },
]

const css = `
*{box-sizing:border-box;margin:0;padding:0}
.ss-outer{
  height:100vh;overflow-y:scroll;
  scroll-snap-type:y mandatory;
  font-family:Inter,system-ui,sans-serif;
  scrollbar-width:none;
}
.ss-outer::-webkit-scrollbar{display:none}
.ss-section{
  scroll-snap-align:start;
  height:100vh;display:flex;align-items:center;
  padding:80px 10vw;position:relative;overflow:hidden;
}
.ss-inner{max-width:680px}
.ss-num-row{
  display:flex;align-items:center;gap:12px;
  margin-bottom:24px;overflow:hidden;
}
.ss-num{
  font-family:ui-monospace,monospace;font-size:clamp(60px,10vw,120px);
  font-weight:900;line-height:1;color:#fff;opacity:.07;
  transform:translateX(-40px);transition:transform .7s cubic-bezier(.16,1,.3,1),opacity .7s;
}
.ss-label{
  font-size:10px;font-weight:700;letter-spacing:.2em;text-transform:uppercase;
  transform:translateX(-20px);opacity:0;
  transition:transform .6s .1s cubic-bezier(.16,1,.3,1),opacity .6s .1s;
}
.ss-headline{
  font-size:clamp(36px,5.5vw,72px);font-weight:900;letter-spacing:-.03em;
  line-height:1.05;color:#fff;margin-bottom:20px;
  transform:translateY(30px);opacity:0;
  transition:transform .65s .18s cubic-bezier(.16,1,.3,1),opacity .65s .18s;
}
.ss-body{
  font-size:17px;line-height:1.7;max-width:520px;
  color:rgba(255,255,255,.5);
  transform:translateY(20px);opacity:0;
  transition:transform .6s .28s cubic-bezier(.16,1,.3,1),opacity .6s .28s;
}
/* Animated in */
.ss-section.visible .ss-num{transform:translateX(0);opacity:.07}
.ss-section.visible .ss-label{transform:translateX(0);opacity:1}
.ss-section.visible .ss-headline{transform:translateY(0);opacity:1}
.ss-section.visible .ss-body{transform:translateY(0);opacity:.5}

.ss-progress{
  position:fixed;right:24px;top:50%;transform:translateY(-50%);
  display:flex;flex-direction:column;gap:8px;z-index:10;
}
.ss-dot{width:6px;height:6px;border-radius:50%;background:rgba(255,255,255,.2);transition:all .3s}
.ss-dot.on{background:#fff;transform:scale(1.5)}
`

export default function ScrollSnap() {
  const outerRef = useRef(null)
  const sectionRefs = useRef([])
  const dotRefs = useRef([])

  useEffect(() => {
    const obs = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        const idx = sectionRefs.current.indexOf(e.target)
        if (e.isIntersecting) {
          e.target.classList.add('visible')
          dotRefs.current.forEach((d, i) => d && d.classList.toggle('on', i === idx))
        }
      })
    }, { root: outerRef.current, threshold: 0.6 })

    sectionRefs.current.forEach((s) => s && obs.observe(s))
    return () => obs.disconnect()
  }, [])

  return (
    <div ref={outerRef} className="ss-outer">
      <style>{css}</style>
      <div className="ss-progress">
        {SECTIONS.map((_, i) => (
          <div key={i} ref={(el) => dotRefs.current[i] = el} className={`ss-dot ${i === 0 ? 'on' : ''}`} />
        ))}
      </div>
      {SECTIONS.map((s, i) => (
        <div
          key={i}
          ref={(el) => sectionRefs.current[i] = el}
          className={`ss-section ${i === 0 ? 'visible' : ''}`}
          style={{ background: s.bg }}
        >
          <div className="ss-inner">
            <div className="ss-num-row">
              <span className="ss-num" style={{ WebkitTextStroke: `1px ${s.accent}` }}>{s.num}</span>
              <span className="ss-label" style={{ color: s.accent }}>{s.label}</span>
            </div>
            <h2 className="ss-headline">{s.headline}</h2>
            <p className="ss-body">{s.body}</p>
          </div>
        </div>
      ))}
    </div>
  )
}
