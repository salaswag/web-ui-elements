// 3D Tilt Card Stack — a stack of layered cards that tilt together toward the
// cursor, inner layers lifting on Z for parallax depth. Local onMouseMove.
import { useRef } from 'react'

export default function TiltStack() {
  const ref = useRef(null)
  const onMove = (e) => {
    const r = ref.current.getBoundingClientRect()
    const px = (e.clientX - (r.left + r.width / 2)) / r.width
    const py = (e.clientY - (r.top + r.height / 2)) / r.height
    ref.current.style.transform = `rotateY(${px * 18}deg) rotateX(${-py * 18}deg)`
  }
  const reset = () => { if (ref.current) ref.current.style.transform = 'rotateY(0) rotateX(0)' }
  const css = `
  *{box-sizing:border-box;margin:0;padding:0}
  .ts2-root{font-family:Inter,system-ui,sans-serif;min-height:100vh;background:radial-gradient(120% 90% at 50% 20%,#1c1733,#06060c 60%);display:grid;place-items:center;padding:60px 24px;perspective:1200px}
  .ts2-stack{position:relative;width:300px;height:380px;transform-style:preserve-3d;transition:transform .15s ease}
  .ts2-layer{position:absolute;inset:0;border-radius:22px;border:1px solid rgba(255,255,255,.12)}
  .ts2-l1{background:rgba(124,58,237,.18);transform:translateZ(20px)}
  .ts2-l2{background:rgba(34,211,238,.14);transform:translateZ(60px);inset:24px}
  .ts2-l3{background:linear-gradient(135deg,#7c3aed,#22d3ee);transform:translateZ(110px);inset:60px;display:grid;place-items:center;color:#fff;text-align:center;box-shadow:0 30px 60px -20px rgba(34,211,238,.6)}
  .ts2-l3 h3{font-size:24px;font-weight:900;letter-spacing:-.02em}
  .ts2-l3 p{font-size:12px;opacity:.85;margin-top:6px}
  .ts2-hint{position:absolute;bottom:34px;color:rgba(255,255,255,.4);font-size:12px;letter-spacing:.05em}
  `
  return (
    <div className="ts2-root">
      <style>{css}</style>
      <div className="ts2-stack" ref={ref} onMouseMove={onMove} onMouseLeave={reset}>
        <div className="ts2-layer ts2-l1" />
        <div className="ts2-layer ts2-l2" />
        <div className="ts2-layer ts2-l3"><div><h3>Depth stack</h3><p>Layers lift on Z</p></div></div>
      </div>
      <span className="ts2-hint">move your cursor — layers part in 3D</span>
    </div>
  )
}
