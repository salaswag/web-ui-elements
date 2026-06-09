// Horizontal Scroll Sequence — GSAP pins the container and translates a horizontal
// track as you scroll. Industry-standard Awwwards / GSAP ShowCase pattern.
import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
gsap.registerPlugin(ScrollTrigger)

const PANELS = [
  { num: '01', title: 'Discover', body: 'Map the problem space before writing a single line.', bg: '#0b0b12', accent: '#7c3aed' },
  { num: '02', title: 'Design',   body: 'Sketch, prototype, and kill your darlings early.',   bg: '#1a0a2e', accent: '#a855f7' },
  { num: '03', title: 'Build',    body: 'Crisp components. Intentional state. No shortcuts.',  bg: '#0a1628', accent: '#3b82f6' },
  { num: '04', title: 'Ship',     body: 'Deploy with confidence. Monitor everything.',         bg: '#041a12', accent: '#10b981' },
  { num: '05', title: 'Grow',     body: 'Listen, measure, iterate. The best is never done.',  bg: '#1a1202', accent: '#f59e0b' },
]

const css = `
*{box-sizing:border-box;margin:0;padding:0}
.hs-outer{font-family:Inter,system-ui,sans-serif;overflow:hidden}
.hs-pin{height:600vh}
.hs-sticky{position:sticky;top:0;height:100vh;overflow:hidden}
.hs-track{display:flex;height:100%;will-change:transform}
.hs-panel{
  flex-shrink:0;width:100vw;height:100%;
  display:flex;align-items:center;justify-content:center;padding:80px;
}
.hs-inner{max-width:560px}
.hs-num{
  font-size:11px;font-weight:700;letter-spacing:.2em;text-transform:uppercase;
  margin-bottom:28px;opacity:.5;color:#fff;
}
.hs-h{
  font-size:clamp(56px,8vw,96px);font-weight:900;letter-spacing:-.04em;
  line-height:.95;color:#fff;margin-bottom:24px;
}
.hs-p{font-size:18px;line-height:1.65;color:rgba(255,255,255,.55)}
.hs-progress{
  position:fixed;bottom:32px;left:50%;transform:translateX(-50%);
  display:flex;gap:8px;z-index:10;
}
.hs-pip{
  width:6px;height:6px;border-radius:50%;background:rgba(255,255,255,.22);
  transition:all .3s;
}
.hs-pip.on{background:#fff;transform:scale(1.6)}
`

export default function HorizontalScroll() {
  const outerRef = useRef(null)
  const trackRef = useRef(null)
  const pipsRef  = useRef([])

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.to(trackRef.current, {
        x: () => -(trackRef.current.scrollWidth - window.innerWidth),
        ease: 'none',
        scrollTrigger: {
          trigger: outerRef.current,
          start: 'top top',
          end: () => `+=${PANELS.length * window.innerWidth}`,
          scrub: 1,
          pin: true,
          anticipatePin: 1,
          onUpdate(self) {
            const idx = Math.round(self.progress * (PANELS.length - 1))
            pipsRef.current.forEach((p, i) => p && p.classList.toggle('on', i === idx))
          },
        },
      })
    }, outerRef)
    return () => ctx.revert()
  }, [])

  return (
    <div ref={outerRef} className="hs-outer">
      <style>{css}</style>
      <div className="hs-pin">
        <div className="hs-sticky">
          <div ref={trackRef} className="hs-track">
            {PANELS.map((p, i) => (
              <div key={i} className="hs-panel" style={{ background: p.bg }}>
                <div className="hs-inner">
                  <div className="hs-num" style={{ color: p.accent }}>{p.num} — {p.title}</div>
                  <h2 className="hs-h">{p.title}</h2>
                  <p className="hs-p">{p.body}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="hs-progress">
        {PANELS.map((_, i) => (
          <div key={i} ref={(el) => pipsRef.current[i] = el} className={`hs-pip ${i === 0 ? 'on' : ''}`} />
        ))}
      </div>
    </div>
  )
}
