// Vertical Timeline — alternating entries reveal as they enter the viewport.
// IntersectionObserver, no library. Classic "our journey / changelog" section.
import { useEffect, useRef } from 'react'

const STEPS = [
  { year: '2021', t: 'The first call', s: 'A missed inquiry became the whole idea — never let a lead hit voicemail again.' },
  { year: '2022', t: 'Booking goes live', s: 'Real-time calendar booking while the customer is still on the line.' },
  { year: '2023', t: 'Reminders that land', s: 'SMS confirmations push open rates to 98% and no-shows off a cliff.' },
  { year: '2024', t: 'Reviews on autopilot', s: 'Happy customers get the public review link; everyone else gets a human.' },
  { year: '2025', t: 'Win-backs, automated', s: 'Lapsed customers re-engaged with a comeback offer that actually converts.' },
]

const css = `
*{box-sizing:border-box;margin:0;padding:0}
.vtl-root{font-family:Inter,system-ui,sans-serif;background:#07090f;min-height:100vh;padding:90px 24px;color:#eaf2f3}
.vtl-head{text-align:center;margin-bottom:70px}
.vtl-eyebrow{font-size:11.5px;font-weight:700;letter-spacing:.18em;text-transform:uppercase;color:#22d3ee;margin-bottom:12px}
.vtl-h2{font-size:clamp(30px,4vw,50px);font-weight:900;letter-spacing:-.03em}
.vtl-line{position:relative;max-width:860px;margin:0 auto}
.vtl-line::before{content:'';position:absolute;left:50%;top:0;bottom:0;width:2px;background:rgba(255,255,255,.1);transform:translateX(-50%)}
.vtl-row{position:relative;display:flex;width:100%;margin-bottom:54px;min-height:90px}
.vtl-row.right{justify-content:flex-end}
.vtl-card{width:44%;background:rgba(255,255,255,.04);border:1px solid rgba(255,255,255,.08);border-radius:14px;padding:22px 24px;opacity:0;transform:translateY(30px);transition:opacity .6s ease,transform .6s ease}
.vtl-row.in .vtl-card{opacity:1;transform:none}
.vtl-dot{position:absolute;left:50%;top:18px;width:16px;height:16px;border-radius:50%;background:#22d3ee;transform:translateX(-50%) scale(0);transition:transform .4s ease .15s;box-shadow:0 0 0 6px rgba(34,211,238,.15)}
.vtl-row.in .vtl-dot{transform:translateX(-50%) scale(1)}
.vtl-year{font-size:12px;font-weight:700;letter-spacing:.1em;color:#22d3ee;margin-bottom:8px}
.vtl-t{font-size:18px;font-weight:800;letter-spacing:-.01em;margin-bottom:8px}
.vtl-s{font-size:14px;line-height:1.6;color:rgba(234,242,243,.5)}
@media(max-width:640px){.vtl-line::before{left:8px}.vtl-row,.vtl-row.right{justify-content:flex-start}.vtl-card{width:calc(100% - 30px);margin-left:30px}.vtl-dot{left:8px}}
`

export default function VerticalTimeline() {
  const root = useRef(null)
  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && e.target.classList.add('in')),
      { threshold: 0.4 },
    )
    root.current.querySelectorAll('.vtl-row').forEach((el) => io.observe(el))
    return () => io.disconnect()
  }, [])
  return (
    <div className="vtl-root" ref={root}>
      <style>{css}</style>
      <div className="vtl-head">
        <div className="vtl-eyebrow">Our journey</div>
        <h2 className="vtl-h2">Five years, one mission.</h2>
      </div>
      <div className="vtl-line">
        {STEPS.map((s, i) => (
          <div key={s.year} className={`vtl-row ${i % 2 ? 'right' : ''}`}>
            <span className="vtl-dot" />
            <div className="vtl-card">
              <div className="vtl-year">{s.year}</div>
              <div className="vtl-t">{s.t}</div>
              <div className="vtl-s">{s.s}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
