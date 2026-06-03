// Blur Text — words animate from blurred + offset to sharp, one after another.
// Inspired by React Bits' "Blur Text".
export default function BlurText() {
  const text = 'Clarity, one word at a time.'
  return (
    <div style={{ minHeight: '100vh', display: 'grid', placeItems: 'center', background: '#fff', fontFamily: 'Inter, sans-serif', padding: 24 }}>
      <style>{`@keyframes blurin { from { filter: blur(10px); opacity: 0; transform: translateY(12px); } to { filter: blur(0); opacity: 1; transform: none; } }`}</style>
      <h1 style={{ fontSize: 'clamp(34px,6vw,76px)', fontWeight: 800, letterSpacing: '-.03em', textAlign: 'center', color: '#0f0f12', margin: 0 }}>
        {text.split(' ').map((w, i) => (
          <span key={i} style={{ display: 'inline-block', animation: `blurin .6s ${i * 0.12}s both` }}>{w}&nbsp;</span>
        ))}
      </h1>
    </div>
  )
}
