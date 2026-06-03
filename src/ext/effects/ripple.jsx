// Ripple — concentric rings expanding from a center point.
// Inspired by Magic UI's "Ripple".
export default function Ripple() {
  return (
    <div style={{ position: 'relative', minHeight: '100vh', background: '#0b0b12', display: 'grid', placeItems: 'center', overflow: 'hidden', fontFamily: 'Inter, sans-serif' }}>
      <style>{`@keyframes rp { from { width:0; height:0; opacity:.7 } to { width:900px; height:900px; opacity:0 } }
        .rp { position:absolute; border:1px solid rgba(139,92,246,.45); border-radius:50%; animation: rp 4s ease-out infinite; }`}</style>
      {[0, 0.8, 1.6, 2.4].map((d, i) => (
        <span key={i} className="rp" style={{ animationDelay: `${d}s` }} />
      ))}
      <h1 style={{ position: 'relative', color: '#fff', fontSize: 'clamp(30px,5vw,60px)', fontWeight: 800, letterSpacing: '-.03em' }}>Ripple</h1>
    </div>
  )
}
