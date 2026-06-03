// Click Spark — a burst of little sparks radiates from each click.
// Inspired by React Bits' "Click Spark".
import { useRef } from 'react'

export default function ClickSpark() {
  const layer = useRef(null)
  const burst = (e) => {
    const host = layer.current
    const x = e.clientX, y = e.clientY
    for (let i = 0; i < 10; i++) {
      const s = document.createElement('span')
      const a = (Math.PI * 2 * i) / 10
      s.style.cssText = `position:fixed;left:${x}px;top:${y}px;width:6px;height:6px;border-radius:50%;background:#7c3aed;pointer-events:none;transform:translate(-50%,-50%)`
      host.appendChild(s)
      const dist = 34 + (i % 3) * 8
      s.animate(
        [{ transform: `translate(-50%,-50%) translate(0,0)`, opacity: 1 },
         { transform: `translate(-50%,-50%) translate(${Math.cos(a) * dist}px,${Math.sin(a) * dist}px)`, opacity: 0 }],
        { duration: 520, easing: 'cubic-bezier(.2,.7,.3,1)' },
      ).onfinish = () => s.remove()
    }
  }
  return (
    <div onClick={burst} style={{ minHeight: '100vh', display: 'grid', placeItems: 'center', background: '#0b0b12', cursor: 'pointer', fontFamily: 'Inter, sans-serif' }}>
      <div ref={layer} />
      <h1 style={{ color: '#fff', fontSize: 'clamp(30px,5vw,60px)', fontWeight: 800, letterSpacing: '-.03em', userSelect: 'none' }}>Click anywhere ✦</h1>
    </div>
  )
}
