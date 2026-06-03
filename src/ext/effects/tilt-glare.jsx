// Tilt + Glare — smooth 3D tilt on hover with a moving glare highlight.
// Inspired by vanilla-tilt.js (also supports gyroscope on mobile).
import { useRef } from 'react'

export default function TiltGlare() {
  const card = useRef(null)
  const glare = useRef(null)
  const onMove = (e) => {
    const r = card.current.getBoundingClientRect()
    const x = (e.clientX - r.left) / r.width
    const y = (e.clientY - r.top) / r.height
    card.current.style.transform = `rotateY(${(x - 0.5) * 24}deg) rotateX(${-(y - 0.5) * 24}deg)`
    glare.current.style.background = `radial-gradient(circle at ${x * 100}% ${y * 100}%, rgba(255,255,255,.5), transparent 60%)`
  }
  const reset = () => { card.current.style.transform = 'rotateX(0) rotateY(0)'; glare.current.style.background = 'transparent' }
  return (
    <div style={{ minHeight: '100vh', display: 'grid', placeItems: 'center', background: '#0e0e16', perspective: 900, fontFamily: 'Inter, sans-serif' }}>
      <div
        ref={card}
        onMouseMove={onMove}
        onMouseLeave={reset}
        style={{
          position: 'relative', width: 'min(380px,82vw)', aspectRatio: '1.6', borderRadius: 18,
          background: 'linear-gradient(135deg,#1f2937,#0f172a)', overflow: 'hidden',
          boxShadow: '0 40px 80px -30px rgba(0,0,0,.6)', transition: 'transform .12s ease-out',
          transformStyle: 'preserve-3d', color: '#fff',
        }}
      >
        <div ref={glare} style={{ position: 'absolute', inset: 0, mixBlendMode: 'overlay' }} />
        <div style={{ position: 'absolute', bottom: 22, left: 22 }}>
          <div style={{ fontSize: 12, letterSpacing: '.2em', opacity: .7 }}>VANILLA-TILT</div>
          <div style={{ fontSize: 24, fontWeight: 700 }}>Tilt + glare</div>
        </div>
      </div>
    </div>
  )
}
