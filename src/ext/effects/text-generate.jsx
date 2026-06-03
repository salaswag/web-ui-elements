// Text Generate — words fade + rise in sequence on mount (typewriter-ish reveal).
// Inspired by Aceternity UI's "Text Generate Effect".
export default function TextGenerate() {
  const text = 'I build the AI staff, you watch the bookings come in.'
  return (
    <div style={{ minHeight: '100vh', display: 'grid', placeItems: 'center', background: '#fff', fontFamily: 'Inter, sans-serif', padding: 28 }}>
      <style>{`@keyframes tg { from { opacity:0; transform: translateY(10px); } to { opacity:1; transform:none; } }`}</style>
      <p style={{ maxWidth: 760, textAlign: 'center', fontSize: 'clamp(26px,4vw,48px)', fontWeight: 700, letterSpacing: '-.02em', lineHeight: 1.25, color: '#0f0f12', margin: 0 }}>
        {text.split(' ').map((w, i) => (
          <span key={i} style={{ display: 'inline-block', animation: `tg .5s ${i * 0.07}s both` }}>{w}&nbsp;</span>
        ))}
      </p>
    </div>
  )
}
