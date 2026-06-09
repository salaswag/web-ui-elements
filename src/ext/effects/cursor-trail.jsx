// Cursor Trail — a smooth chain of dots that lags behind the cursor with easing.
// requestAnimationFrame loop, fully cleaned up on unmount.
import { useEffect, useRef } from 'react'

const N = 18

export default function CursorTrail() {
  const root = useRef(null)
  const dots = useRef([])
  useEffect(() => {
    const pts = Array.from({ length: N }, () => ({ x: window.innerWidth / 2, y: window.innerHeight / 2 }))
    const target = { x: window.innerWidth / 2, y: window.innerHeight / 2 }
    const onMove = (e) => {
      const r = root.current.getBoundingClientRect()
      target.x = e.clientX - r.left
      target.y = e.clientY - r.top
    }
    root.current.addEventListener('mousemove', onMove)
    let raf
    const tick = () => {
      let lead = target
      pts.forEach((p, i) => {
        p.x += (lead.x - p.x) * 0.35
        p.y += (lead.y - p.y) * 0.35
        const el = dots.current[i]
        if (el) {
          const s = 1 - i / N
          el.style.transform = `translate(${p.x}px, ${p.y}px) scale(${s})`
        }
        lead = p
      })
      raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => { cancelAnimationFrame(raf); root.current && root.current.removeEventListener('mousemove', onMove) }
  }, [])
  const css = `
  *{box-sizing:border-box;margin:0;padding:0}
  .ct-root{font-family:Inter,system-ui,sans-serif;position:relative;min-height:100vh;background:#06060c;overflow:hidden;display:grid;place-items:center;cursor:none}
  .ct-dot{position:absolute;top:0;left:0;width:26px;height:26px;margin:-13px;border-radius:50%;background:radial-gradient(circle,#22d3ee,#7c3aed);mix-blend-mode:screen;pointer-events:none;will-change:transform}
  .ct-copy{color:#fff;text-align:center;pointer-events:none}
  .ct-copy h1{font-size:clamp(30px,6vw,64px);font-weight:900;letter-spacing:-.03em}
  .ct-copy p{margin-top:10px;color:rgba(255,255,255,.45);font-size:14px}
  `
  return (
    <div className="ct-root" ref={root}>
      <style>{css}</style>
      {Array.from({ length: N }).map((_, i) => (
        <span key={i} className="ct-dot" ref={(el) => (dots.current[i] = el)} style={{ opacity: 1 - i / N }} />
      ))}
      <div className="ct-copy"><h1>Move your cursor.</h1><p>A trail of light follows you.</p></div>
    </div>
  )
}
