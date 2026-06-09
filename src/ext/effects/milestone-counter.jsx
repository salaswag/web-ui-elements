// Milestone Stat Timeline — a horizontal run of milestones whose numbers count up
// when the strip enters view. IntersectionObserver + requestAnimationFrame.
import { useEffect, useRef } from 'react'

const STATS = [
  { to: 12000, suffix: '+', label: 'Calls answered' },
  { to: 98, suffix: '%', label: 'Reminder open rate' },
  { to: 70, suffix: '%', label: 'Fewer no-shows' },
  { to: 4.9, suffix: '★', label: 'Average rating', dec: 1 },
]

const css = `
*{box-sizing:border-box;margin:0;padding:0}
.msc-root{font-family:Inter,system-ui,sans-serif;background:#07090f;min-height:100vh;display:grid;place-items:center;padding:80px 24px;color:#eaf2f3}
.msc-wrap{width:100%;max-width:920px;text-align:center}
.msc-h2{font-size:clamp(26px,3.5vw,42px);font-weight:900;letter-spacing:-.03em;margin-bottom:56px}
.msc-row{position:relative;display:grid;grid-template-columns:repeat(4,1fr);gap:24px}
.msc-row::before{content:'';position:absolute;left:8%;right:8%;top:20px;height:2px;background:rgba(255,255,255,.1)}
.msc-cell{position:relative}
.msc-node{width:14px;height:14px;border-radius:50%;background:#22d3ee;margin:0 auto 30px;box-shadow:0 0 0 5px rgba(34,211,238,.15)}
.msc-num{font-size:clamp(30px,5vw,52px);font-weight:900;letter-spacing:-.03em;color:#fff;line-height:1}
.msc-label{font-size:13px;color:rgba(234,242,243,.5);margin-top:10px}
@media(max-width:640px){.msc-row{grid-template-columns:repeat(2,1fr);gap:40px 24px}.msc-row::before{display:none}}
`

export default function MilestoneCounter() {
  const root = useRef(null)
  useEffect(() => {
    let raf
    const run = () => {
      const start = performance.now()
      const dur = 1400
      const els = [...root.current.querySelectorAll('.msc-num')]
      const tick = (now) => {
        const p = Math.min(1, (now - start) / dur)
        const e = 1 - Math.pow(1 - p, 3)
        els.forEach((el) => {
          const to = Number(el.dataset.to), dec = Number(el.dataset.dec || 0), sfx = el.dataset.sfx || ''
          el.textContent = (to * e).toFixed(dec) + (p >= 1 ? sfx : '')
        })
        if (p < 1) raf = requestAnimationFrame(tick)
      }
      raf = requestAnimationFrame(tick)
    }
    const io = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) { run(); io.disconnect() }
    }, { threshold: 0.5 })
    io.observe(root.current.querySelector('.msc-row'))
    return () => { io.disconnect(); cancelAnimationFrame(raf) }
  }, [])
  return (
    <div className="msc-root" ref={root}>
      <style>{css}</style>
      <div className="msc-wrap">
        <h2 className="msc-h2">Milestones that matter.</h2>
        <div className="msc-row">
          {STATS.map((s) => (
            <div key={s.label} className="msc-cell">
              <div className="msc-node" />
              <div className="msc-num" data-to={s.to} data-dec={s.dec || 0} data-sfx={s.suffix}>0</div>
              <div className="msc-label">{s.label}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
