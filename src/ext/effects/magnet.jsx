// Magnet — wraps an element so it's pulled toward the cursor, springs back on leave.
// Inspired by React Bits' "Magnet".
import { useRef } from 'react'

export default function Magnet() {
  const ref = useRef(null)
  const strength = 0.45
  const onMove = (e) => {
    const r = ref.current.getBoundingClientRect()
    const mx = e.clientX - (r.left + r.width / 2)
    const my = e.clientY - (r.top + r.height / 2)
    ref.current.style.transform = `translate(${mx * strength}px, ${my * strength}px)`
  }
  const reset = () => { ref.current.style.transform = 'translate(0,0)' }
  return (
    <div
      onMouseMove={onMove}
      onMouseLeave={reset}
      style={{ minHeight: '100vh', display: 'grid', placeItems: 'center', background: '#fff', fontFamily: 'Inter, sans-serif' }}
    >
      <button
        ref={ref}
        style={{
          transition: 'transform .35s cubic-bezier(.2,.9,.2,1.2)', cursor: 'pointer',
          border: 'none', borderRadius: 999, padding: '20px 40px', fontSize: 18, fontWeight: 700,
          color: '#fff', background: '#0f0f12',
        }}
      >
        Pull me
      </button>
    </div>
  )
}
