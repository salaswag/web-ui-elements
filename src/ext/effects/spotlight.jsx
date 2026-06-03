// Spotlight — a soft radial glow that follows the cursor on a dark hero.
// Inspired by Aceternity UI's "Spotlight". Self-contained, copy-paste ready.
import { useRef } from 'react'

export default function Spotlight() {
  const ref = useRef(null)
  const onMove = (e) => {
    const r = ref.current.getBoundingClientRect()
    ref.current.style.setProperty('--mx', `${e.clientX - r.left}px`)
    ref.current.style.setProperty('--my', `${e.clientY - r.top}px`)
  }
  return (
    <div
      ref={ref}
      onMouseMove={onMove}
      style={{
        position: 'relative', minHeight: '100vh', background: '#0b0b12',
        overflow: 'hidden', display: 'grid', placeItems: 'center',
        fontFamily: 'Inter, system-ui, sans-serif',
      }}
    >
      <div style={{
        position: 'absolute', inset: 0, pointerEvents: 'none',
        background:
          'radial-gradient(480px circle at var(--mx,50%) var(--my,35%), rgba(139,92,246,.30), transparent 60%)',
      }} />
      <div style={{ position: 'relative', textAlign: 'center', color: '#fff' }}>
        <p style={{ letterSpacing: '.2em', fontSize: 13, color: '#8b8b9a', textTransform: 'uppercase' }}>Spotlight</p>
        <h1 style={{ fontSize: 'clamp(36px,7vw,84px)', fontWeight: 800, letterSpacing: '-.03em', margin: '10px 0 0' }}>
          Move your cursor.
        </h1>
      </div>
    </div>
  )
}
