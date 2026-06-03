// Lamp — a conic "lamp" glow that blooms behind a heading.
// Inspired by Aceternity UI's "Lamp Effect".
export default function Lamp() {
  return (
    <div style={{ minHeight: '100vh', background: '#05050b', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', fontFamily: 'Inter, sans-serif', overflow: 'hidden' }}>
      <div style={{ position: 'relative', display: 'flex', justifyContent: 'center', width: '100%' }}>
        <div style={{ width: 'min(560px,80vw)', height: 2, background: 'linear-gradient(90deg,transparent,#22d3ee,transparent)', boxShadow: '0 0 40px 8px rgba(34,211,238,.5)' }} />
        <div style={{ position: 'absolute', top: 0, width: 'min(560px,80vw)', height: 220, background: 'conic-gradient(from 90deg at 50% 0%, transparent, rgba(34,211,238,.35), transparent)', filter: 'blur(36px)' }} />
      </div>
      <h1 style={{ color: '#fff', fontSize: 'clamp(34px,6vw,76px)', fontWeight: 800, letterSpacing: '-.03em', marginTop: 40, textAlign: 'center' }}>Build under the lamp</h1>
    </div>
  )
}
