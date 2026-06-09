// Mouse-Tracked Gradient Hero — radial glow follows the cursor across a dark surface.
// Vanilla JS mousemove. Zero deps. Feels alive without being distracting.
import { useEffect, useRef } from 'react'

const css = `
*{box-sizing:border-box;margin:0;padding:0}
.mgh-root{
  font-family:Inter,system-ui,sans-serif;
  background:#050509;min-height:100vh;
  display:flex;align-items:center;justify-content:center;
  padding:80px 24px;text-align:center;
  position:relative;overflow:hidden;cursor:none;
}
.mgh-glow{
  position:fixed;width:600px;height:600px;
  border-radius:50%;pointer-events:none;
  background:radial-gradient(circle,rgba(124,58,237,.18) 0%,rgba(34,211,238,.08) 40%,transparent 70%);
  transform:translate(-50%,-50%);
  transition:opacity .3s;
  will-change:transform;
  z-index:0;
}
.mgh-content{position:relative;z-index:1;max-width:600px}
.mgh-eyebrow{
  font-size:11px;font-weight:700;letter-spacing:.2em;text-transform:uppercase;
  color:#7c3aed;margin-bottom:18px;
  display:inline-flex;align-items:center;gap:8px;
}
.mgh-eyebrow-line{width:24px;height:1px;background:#7c3aed}
.mgh-h1{
  font-size:clamp(42px,6vw,80px);font-weight:900;letter-spacing:-.05em;
  line-height:.93;color:#eaf2f3;margin-bottom:22px;
}
.mgh-p{
  font-size:17px;color:rgba(234,242,243,.38);
  line-height:1.7;margin-bottom:44px;
}
.mgh-cta{
  display:inline-flex;align-items:center;gap:8px;
  padding:13px 26px;border-radius:9px;border:none;cursor:pointer;
  background:linear-gradient(135deg,#7c3aed,#22d3ee);
  color:#fff;font-weight:700;font-size:14px;
  transition:opacity .15s,transform .15s;
}
.mgh-cta:hover{opacity:.88;transform:translateY(-1px)}
/* subtle grid */
.mgh-grid{
  position:absolute;inset:0;
  background-image:
    linear-gradient(rgba(255,255,255,.018) 1px,transparent 1px),
    linear-gradient(90deg,rgba(255,255,255,.018) 1px,transparent 1px);
  background-size:56px 56px;pointer-events:none;
}
.mgh-hint{
  position:absolute;bottom:24px;left:50%;transform:translateX(-50%);
  font-size:11px;color:rgba(255,255,255,.18);letter-spacing:.1em;
  pointer-events:none;
}
`

export default function MouseGradientHero() {
  const glowRef = useRef(null)

  useEffect(() => {
    const glow = glowRef.current
    if (!glow) return
    const move = (e) => {
      glow.style.left = e.clientX + 'px'
      glow.style.top  = e.clientY + 'px'
    }
    window.addEventListener('mousemove', move, { passive: true })
    return () => window.removeEventListener('mousemove', move)
  }, [])

  return (
    <div className="mgh-root">
      <style>{css}</style>
      <div className="mgh-grid" />
      <div className="mgh-glow" ref={glowRef} />
      <div className="mgh-content">
        <div className="mgh-eyebrow">
          <span className="mgh-eyebrow-line" />
          Move your cursor
          <span className="mgh-eyebrow-line" />
        </div>
        <h1 className="mgh-h1">Follow the<br />light.</h1>
        <p className="mgh-p">
          A radial gradient tracks the mouse, casting a soft glow
          that makes dark heroes feel tactile and alive.
          Pure JavaScript — no libraries.
        </p>
        <button className="mgh-cta">
          Get started <span>→</span>
        </button>
      </div>
      <div className="mgh-hint">move cursor anywhere</div>
    </div>
  )
}
