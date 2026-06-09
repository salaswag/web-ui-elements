// Magnetic Dot Grid — a field of dots that push away from the cursor and ease back.
// One rAF loop over a fixed grid, cleaned up on unmount. Local pointer tracking.
import { useEffect, useRef } from 'react'

export default function MagneticDots() {
  const root = useRef(null)
  useEffect(() => {
    const el = root.current
    const mouse = { x: -999, y: -999 }
    const onMove = (e) => { const r = el.getBoundingClientRect(); mouse.x = e.clientX - r.left; mouse.y = e.clientY - r.top }
    const onLeave = () => { mouse.x = -999; mouse.y = -999 }
    el.addEventListener('mousemove', onMove)
    el.addEventListener('mouseleave', onLeave)
    const dots = [...el.querySelectorAll('.md-dot')].map((node) => ({ node, ox: node.offsetLeft, oy: node.offsetTop, x: 0, y: 0 }))
    let raf
    const tick = () => {
      dots.forEach((d) => {
        const dx = d.ox - mouse.x, dy = d.oy - mouse.y
        const dist = Math.hypot(dx, dy)
        let tx = 0, ty = 0
        if (dist < 120) { const f = (1 - dist / 120) * 26; tx = (dx / dist) * f; ty = (dy / dist) * f }
        d.x += (tx - d.x) * 0.15; d.y += (ty - d.y) * 0.15
        d.node.style.transform = `translate(${d.x}px, ${d.y}px)`
      })
      raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => { cancelAnimationFrame(raf); el.removeEventListener('mousemove', onMove); el.removeEventListener('mouseleave', onLeave) }
  }, [])
  const cells = Array.from({ length: 12 * 8 })
  const css = `
  *{box-sizing:border-box;margin:0;padding:0}
  .md-root{font-family:Inter,system-ui,sans-serif;position:relative;min-height:100vh;background:#06060c;overflow:hidden;display:grid;place-items:center}
  .md-grid{position:absolute;inset:0;display:grid;grid-template-columns:repeat(12,1fr);grid-template-rows:repeat(8,1fr);place-items:center}
  .md-cell{display:grid;place-items:center;width:100%;height:100%}
  .md-dot{width:6px;height:6px;border-radius:50%;background:rgba(124,58,237,.55);will-change:transform}
  .md-copy{position:relative;z-index:2;text-align:center;color:#fff;pointer-events:none}
  .md-copy h1{font-size:clamp(30px,6vw,66px);font-weight:900;letter-spacing:-.03em}
  .md-copy p{margin-top:10px;color:rgba(255,255,255,.45);font-size:14px}
  `
  return (
    <div className="md-root" ref={root}>
      <style>{css}</style>
      <div className="md-grid">
        {cells.map((_, i) => (<div className="md-cell" key={i}><span className="md-dot" /></div>))}
      </div>
      <div className="md-copy"><h1>Magnetic field.</h1><p>The dots flee your cursor.</p></div>
    </div>
  )
}
