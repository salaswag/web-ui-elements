// Meteors — streaking meteors falling diagonally across a dark hero.
// Inspired by Magic UI's "Meteors".
export default function Meteors() {
  const items = Array.from({ length: 22 })
  return (
    <div style={{ position: 'relative', minHeight: '100vh', background: '#07070f', overflow: 'hidden', display: 'grid', placeItems: 'center', fontFamily: 'Inter, sans-serif' }}>
      <style>{`
        @keyframes meteor { 0%{transform:rotate(215deg) translateX(0);opacity:1} 70%{opacity:1} 100%{transform:rotate(215deg) translateX(-700px);opacity:0} }
        .meteor{position:absolute;top:0;width:2px;height:2px;border-radius:50%;background:#cdd3ff;box-shadow:0 0 6px 1px rgba(205,211,255,.6);animation:meteor linear infinite}
        .meteor::before{content:'';position:absolute;top:50%;width:60px;height:1px;background:linear-gradient(90deg,#cdd3ff,transparent);transform:translateY(-50%)}
      `}</style>
      {items.map((_, i) => (
        <span key={i} className="meteor" style={{
          left: `${(i * 53) % 100}%`,
          animationDelay: `${(i % 7) * 0.6}s`,
          animationDuration: `${3 + (i % 5)}s`,
        }} />
      ))}
      <h1 style={{ position: 'relative', color: '#fff', fontSize: 'clamp(34px,6vw,72px)', fontWeight: 800, letterSpacing: '-.03em' }}>Meteor shower</h1>
    </div>
  )
}
