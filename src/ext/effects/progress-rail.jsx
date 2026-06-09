// Sticky Progress Rail — a left-hand step rail stays pinned while sections scroll
// past; the active step highlights and the rail fills. IntersectionObserver.
import { useEffect, useRef, useState } from 'react'

const SECTIONS = [
  { t: 'Discovery', s: 'We map your call volume, busy hours, and the questions customers ask most.' },
  { t: 'Setup', s: 'We configure the assistant, connect your calendar, and match your brand voice.' },
  { t: 'Launch', s: 'Calls start routing through on day one — fully answered, booked, and logged.' },
  { t: 'Optimize', s: 'We tune scripts and flows monthly against real outcomes and recordings.' },
]

const css = `
*{box-sizing:border-box;margin:0;padding:0}
.prl-root{font-family:Inter,system-ui,sans-serif;background:#fff;color:#0f0f12}
.prl-grid{max-width:980px;margin:0 auto;display:grid;grid-template-columns:230px 1fr;gap:60px;padding:0 28px}
.prl-rail{position:sticky;top:0;height:100vh;display:flex;flex-direction:column;justify-content:center;gap:4px}
.prl-step{display:flex;align-items:center;gap:14px;padding:14px 0;opacity:.4;transition:opacity .3s}
.prl-step.on{opacity:1}
.prl-bullet{width:13px;height:13px;border-radius:50%;border:2px solid #cfcfe0;background:#fff;flex-shrink:0;transition:all .3s}
.prl-step.on .prl-bullet{border-color:#7c3aed;background:#7c3aed;box-shadow:0 0 0 5px rgba(124,58,237,.15)}
.prl-step-t{font-size:15px;font-weight:700}
.prl-sections{padding:30vh 0}
.prl-sec{min-height:62vh;display:flex;flex-direction:column;justify-content:center}
.prl-sec-n{font-size:13px;font-weight:700;letter-spacing:.12em;text-transform:uppercase;color:#7c3aed;margin-bottom:14px}
.prl-sec-t{font-size:clamp(28px,4vw,44px);font-weight:900;letter-spacing:-.03em;margin-bottom:16px;line-height:1.05}
.prl-sec-s{font-size:16px;line-height:1.7;color:#6b6b76;max-width:460px}
@media(max-width:720px){.prl-grid{grid-template-columns:1fr;gap:0}.prl-rail{display:none}}
`

export default function ProgressRail() {
  const root = useRef(null)
  const [active, setActive] = useState(0)
  useEffect(() => {
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => { if (e.isIntersecting) setActive(Number(e.target.dataset.i)) })
    }, { threshold: 0.55 })
    root.current.querySelectorAll('.prl-sec').forEach((el) => io.observe(el))
    return () => io.disconnect()
  }, [])
  return (
    <div className="prl-root" ref={root}>
      <style>{css}</style>
      <div className="prl-grid">
        <div className="prl-rail">
          {SECTIONS.map((s, i) => (
            <div key={s.t} className={`prl-step ${active === i ? 'on' : ''}`}>
              <span className="prl-bullet" />
              <span className="prl-step-t">{s.t}</span>
            </div>
          ))}
        </div>
        <div className="prl-sections">
          {SECTIONS.map((s, i) => (
            <div key={s.t} className="prl-sec" data-i={i}>
              <div className="prl-sec-n">Step {i + 1}</div>
              <div className="prl-sec-t">{s.t}</div>
              <div className="prl-sec-s">{s.s}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
