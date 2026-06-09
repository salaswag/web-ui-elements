// Tablet (Landscape) Mockup — a wide tablet bezel framing a dashboard UI, tilting
// toward the cursor in 3D. Local onMouseMove (no global listeners). Pure CSS frame.
import { useRef } from 'react'

export default function TabletLandscape() {
  const ref = useRef(null)
  const onMove = (e) => {
    const r = ref.current.getBoundingClientRect()
    const px = (e.clientX - (r.left + r.width / 2)) / r.width
    const py = (e.clientY - (r.top + r.height / 2)) / r.height
    ref.current.style.transform = `rotateY(${px * 10}deg) rotateX(${-py * 10}deg)`
  }
  const reset = () => { if (ref.current) ref.current.style.transform = 'rotateY(0) rotateX(0)' }
  const css = `
  *{box-sizing:border-box;margin:0;padding:0}
  .tl-root{font-family:Inter,system-ui,sans-serif;background:radial-gradient(120% 90% at 50% 10%,#1a1730,#07070d 60%);min-height:100vh;display:grid;place-items:center;padding:70px 24px;perspective:1300px}
  .tl-tab{width:min(760px,92vw);background:#15151c;border-radius:26px;padding:18px;box-shadow:0 40px 110px -40px rgba(124,58,237,.6),0 0 0 2px #26262f;transition:transform .15s ease;transform-style:preserve-3d}
  .tl-screen{aspect-ratio:4/3;border-radius:12px;overflow:hidden;background:#0f1117;display:flex}
  .tl-side{width:26%;background:#13151d;padding:20px 16px}
  .tl-dot{width:30px;height:30px;border-radius:9px;background:rgba(255,255,255,.08);margin-bottom:14px}
  .tl-dot.on{background:#7c3aed}
  .tl-main{flex:1;padding:24px}
  .tl-h{height:18px;width:50%;border-radius:6px;background:rgba(255,255,255,.18);margin-bottom:20px}
  .tl-cards{display:grid;grid-template-columns:1fr 1fr 1fr;gap:12px}
  .tl-c{height:84px;border-radius:11px;background:linear-gradient(135deg,rgba(124,58,237,.55),rgba(34,211,238,.35))}
  .tl-hint{position:absolute;bottom:34px;font-size:12px;color:rgba(255,255,255,.4);letter-spacing:.05em}
  `
  return (
    <div className="tl-root">
      <style>{css}</style>
      <div className="tl-tab" ref={ref} onMouseMove={onMove} onMouseLeave={reset}>
        <div className="tl-screen">
          <div className="tl-side">
            <div className="tl-dot on" /><div className="tl-dot" /><div className="tl-dot" /><div className="tl-dot" />
          </div>
          <div className="tl-main">
            <div className="tl-h" />
            <div className="tl-cards"><div className="tl-c" /><div className="tl-c" /><div className="tl-c" /><div className="tl-c" /><div className="tl-c" /><div className="tl-c" /></div>
          </div>
        </div>
      </div>
      <span className="tl-hint">move your cursor — it tilts</span>
    </div>
  )
}
