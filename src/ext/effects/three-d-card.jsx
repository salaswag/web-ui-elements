// 3D Card Effect — card tilts toward the cursor, inner layers lift on Z.
// Inspired by Aceternity UI's "3D Card Effect".
import { useRef } from 'react'

export default function ThreeDCard() {
  const ref = useRef(null)
  const onMove = (e) => {
    const r = ref.current.getBoundingClientRect()
    const x = (e.clientX - r.left) / r.width - 0.5
    const y = (e.clientY - r.top) / r.height - 0.5
    ref.current.style.transform = `rotateY(${x * 18}deg) rotateX(${-y * 18}deg)`
  }
  const reset = () => { ref.current.style.transform = 'rotateX(0) rotateY(0)' }
  return (
    <div style={{ minHeight: '100vh', display: 'grid', placeItems: 'center', background: '#0e0b1a', perspective: 1000, fontFamily: 'Inter, sans-serif' }}>
      <div
        ref={ref}
        onMouseMove={onMove}
        onMouseLeave={reset}
        style={{
          width: 'min(340px,80vw)', aspectRatio: '3/4', borderRadius: 22,
          background: 'linear-gradient(150deg,#7c3aed,#2563eb)',
          boxShadow: '0 40px 80px -30px rgba(124,58,237,.7)',
          transition: 'transform .15s ease-out', transformStyle: 'preserve-3d',
          color: '#fff', padding: 26, display: 'flex', flexDirection: 'column', justifyContent: 'flex-end',
        }}
      >
        <div style={{ transform: 'translateZ(50px)' }}>
          <div style={{ fontSize: 13, opacity: .8, letterSpacing: '.15em' }}>HOVER ME</div>
          <div style={{ fontSize: 30, fontWeight: 800, letterSpacing: '-.02em', marginTop: 6 }}>3D Card</div>
        </div>
      </div>
    </div>
  )
}
