// Horizontal Roadmap — a scrollable milestone track with a connecting line and
// nodes. Drag/scroll sideways; nodes pop as they enter view. No library.
import { useEffect, useRef } from 'react'

const NODES = [
  { q: 'Q1', t: 'Foundations', s: 'Core booking + call answering ship.', done: true },
  { q: 'Q2', t: 'Reviews engine', s: 'Automated reputation management.', done: true },
  { q: 'Q3', t: 'Multi-location', s: 'One dashboard, every branch.', done: false },
  { q: 'Q4', t: 'AI insights', s: 'Predictive win-back recommendations.', done: false },
  { q: '2026', t: 'Open API', s: 'Build on top of the platform.', done: false },
]

const css = `
*{box-sizing:border-box;margin:0;padding:0}
.rmh-root{font-family:Inter,system-ui,sans-serif;background:#07090f;min-height:100vh;padding:90px 0;color:#eaf2f3;display:flex;flex-direction:column;justify-content:center}
.rmh-head{text-align:center;margin-bottom:50px;padding:0 24px}
.rmh-eyebrow{font-size:11.5px;font-weight:700;letter-spacing:.18em;text-transform:uppercase;color:#22d3ee;margin-bottom:12px}
.rmh-h2{font-size:clamp(28px,4vw,48px);font-weight:900;letter-spacing:-.03em}
.rmh-scroll{overflow-x:auto;padding:30px 24px 40px;scrollbar-width:thin}
.rmh-track{position:relative;display:flex;gap:60px;min-width:max-content;padding-top:40px}
.rmh-track::before{content:'';position:absolute;left:0;right:0;top:50px;height:2px;background:rgba(255,255,255,.12)}
.rmh-node{position:relative;width:230px}
.rmh-dot{position:absolute;top:-30px;left:0;width:20px;height:20px;border-radius:50%;background:#0b0b12;border:2px solid rgba(255,255,255,.3);transition:transform .4s,border-color .4s,box-shadow .4s;transform:scale(0)}
.rmh-node.in .rmh-dot{transform:scale(1)}
.rmh-node.done .rmh-dot{border-color:#10b981;box-shadow:0 0 0 5px rgba(16,185,129,.15)}
.rmh-node.done .rmh-dot::after{content:'';position:absolute;inset:4px;border-radius:50%;background:#10b981}
.rmh-card{background:rgba(255,255,255,.04);border:1px solid rgba(255,255,255,.08);border-radius:14px;padding:20px;opacity:0;transform:translateY(22px);transition:opacity .5s ease,transform .5s ease}
.rmh-node.in .rmh-card{opacity:1;transform:none}
.rmh-q{font-size:12px;font-weight:700;letter-spacing:.1em;color:#22d3ee;margin-bottom:8px}
.rmh-t{font-size:17px;font-weight:800;margin-bottom:7px}
.rmh-s{font-size:13px;line-height:1.55;color:rgba(234,242,243,.5)}
.rmh-hint{text-align:center;font-size:12px;color:rgba(234,242,243,.35);letter-spacing:.05em}
`

export default function RoadmapHorizontal() {
  const root = useRef(null)
  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && e.target.classList.add('in')),
      { threshold: 0.5, root: root.current.querySelector('.rmh-scroll') },
    )
    root.current.querySelectorAll('.rmh-node').forEach((el) => io.observe(el))
    return () => io.disconnect()
  }, [])
  return (
    <div className="rmh-root" ref={root}>
      <style>{css}</style>
      <div className="rmh-head">
        <div className="rmh-eyebrow">Product roadmap</div>
        <h2 className="rmh-h2">Where we're headed.</h2>
      </div>
      <div className="rmh-scroll">
        <div className="rmh-track">
          {NODES.map((n) => (
            <div key={n.q} className={`rmh-node ${n.done ? 'done' : ''}`}>
              <span className="rmh-dot" />
              <div className="rmh-card">
                <div className="rmh-q">{n.q}</div>
                <div className="rmh-t">{n.t}</div>
                <div className="rmh-s">{n.s}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="rmh-hint">← scroll sideways →</div>
    </div>
  )
}
