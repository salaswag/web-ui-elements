// Mouse Parallax Layers — stacked depth layers that shift by the cursor offset,
// deeper layers moving more. Local onMouseMove on the container (no cleanup needed).
import { useRef } from 'react'

const LAYERS = [
  { d: 8,  size: 520, color: 'rgba(124,58,237,.35)', x: '20%', y: '30%' },
  { d: 16, size: 360, color: 'rgba(34,211,238,.30)', x: '70%', y: '55%' },
  { d: 28, size: 240, color: 'rgba(245,158,11,.28)', x: '45%', y: '70%' },
]

export default function MouseParallaxLayers() {
  const ref = useRef(null)
  const onMove = (e) => {
    const r = ref.current.getBoundingClientRect()
    const mx = (e.clientX - (r.left + r.width / 2)) / r.width
    const my = (e.clientY - (r.top + r.height / 2)) / r.height
    ref.current.querySelectorAll('.mpl-blob').forEach((el) => {
      const d = Number(el.dataset.d)
      el.style.transform = `translate(${mx * d}px, ${my * d}px)`
    })
    ref.current.querySelector('.mpl-copy').style.transform = `translate(${mx * -10}px, ${my * -10}px)`
  }
  const css = `
  *{box-sizing:border-box;margin:0;padding:0}
  .mpl-root{font-family:Inter,system-ui,sans-serif;position:relative;min-height:100vh;background:#06060c;overflow:hidden;display:grid;place-items:center}
  .mpl-blob{position:absolute;border-radius:50%;filter:blur(60px);transition:transform .25s ease-out}
  .mpl-copy{position:relative;z-index:2;text-align:center;color:#fff;transition:transform .25s ease-out}
  .mpl-copy h1{font-size:clamp(36px,7vw,82px);font-weight:900;letter-spacing:-.04em}
  .mpl-copy p{margin-top:12px;color:rgba(255,255,255,.55);font-size:15px}
  `
  return (
    <div className="mpl-root" ref={ref} onMouseMove={onMove}>
      <style>{css}</style>
      {LAYERS.map((l, i) => (
        <span key={i} className="mpl-blob" data-d={l.d}
          style={{ width: l.size, height: l.size, background: l.color, left: l.x, top: l.y }} />
      ))}
      <div className="mpl-copy">
        <h1>Depth, on cursor.</h1>
        <p>Move your mouse — each layer drifts by its depth.</p>
      </div>
    </div>
  )
}
