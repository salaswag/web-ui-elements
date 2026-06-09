// Spotlight Cards — a feature grid where a soft radial spotlight follows the cursor
// across the cards and each card's border glows near the pointer. Local onMouseMove.
import { useRef } from 'react'

const CARDS = [
  { icon: '📞', t: 'Always answered', s: 'AI picks up 24/7 in a natural voice.' },
  { icon: '📅', t: 'Auto-booked', s: 'Appointments set before they hang up.' },
  { icon: '⭐', t: 'More reviews', s: 'Happy customers routed to your link.' },
  { icon: '💬', t: '98% open rate', s: 'SMS that actually gets read.' },
  { icon: '🔁', t: 'Win-backs', s: 'Lapsed customers re-engaged on autopilot.' },
  { icon: '📊', t: 'Live insights', s: 'Every call logged, tagged, and scored.' },
]

export default function SpotlightCards() {
  const grid = useRef(null)
  const onMove = (e) => {
    grid.current.querySelectorAll('.sc2-card').forEach((card) => {
      const r = card.getBoundingClientRect()
      card.style.setProperty('--x', `${e.clientX - r.left}px`)
      card.style.setProperty('--y', `${e.clientY - r.top}px`)
    })
  }
  const css = `
  *{box-sizing:border-box;margin:0;padding:0}
  .sc2-root{font-family:Inter,system-ui,sans-serif;min-height:100vh;background:#06060c;display:grid;place-items:center;padding:80px 28px}
  .sc2-wrap{width:100%;max-width:980px}
  .sc2-h2{text-align:center;color:#fff;font-size:clamp(28px,4vw,46px);font-weight:900;letter-spacing:-.03em;margin-bottom:42px}
  .sc2-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:16px}
  .sc2-card{position:relative;border:1px solid rgba(255,255,255,.09);border-radius:16px;padding:28px 24px;background:rgba(255,255,255,.02);overflow:hidden}
  .sc2-card::before{content:'';position:absolute;inset:0;border-radius:16px;opacity:0;transition:opacity .3s;background:radial-gradient(220px circle at var(--x) var(--y),rgba(124,58,237,.18),transparent 60%)}
  .sc2-card:hover::before{opacity:1}
  .sc2-card::after{content:'';position:absolute;inset:0;border-radius:16px;padding:1px;background:radial-gradient(220px circle at var(--x) var(--y),rgba(34,211,238,.5),transparent 60%);-webkit-mask:linear-gradient(#000 0 0) content-box,linear-gradient(#000 0 0);-webkit-mask-composite:xor;mask-composite:exclude;opacity:0;transition:opacity .3s}
  .sc2-card:hover::after{opacity:1}
  .sc2-icon{font-size:26px;margin-bottom:14px}
  .sc2-t{position:relative;color:#eaf2f3;font-size:17px;font-weight:800;margin-bottom:8px}
  .sc2-s{position:relative;color:rgba(234,242,243,.5);font-size:13.5px;line-height:1.55}
  @media(max-width:760px){.sc2-grid{grid-template-columns:1fr 1fr}}
  @media(max-width:480px){.sc2-grid{grid-template-columns:1fr}}
  `
  return (
    <div className="sc2-root">
      <style>{css}</style>
      <div className="sc2-wrap">
        <h2 className="sc2-h2">Hover the grid.</h2>
        <div className="sc2-grid" ref={grid} onMouseMove={onMove}>
          {CARDS.map((c) => (
            <div className="sc2-card" key={c.t}>
              <div className="sc2-icon">{c.icon}</div>
              <div className="sc2-t">{c.t}</div>
              <div className="sc2-s">{c.s}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
