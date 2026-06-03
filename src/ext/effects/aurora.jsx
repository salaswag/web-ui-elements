// Aurora — soft animated aurora ribbons as a full-bleed background.
// Inspired by React Bits' "Aurora".
export default function Aurora() {
  return (
    <div style={{ position: 'relative', minHeight: '100vh', background: '#05060d', overflow: 'hidden', display: 'grid', placeItems: 'center', fontFamily: 'Inter, sans-serif' }}>
      <style>{`
        @keyframes au { 0%,100%{ transform: translateY(0) scaleX(1); opacity:.5 } 50%{ transform: translateY(-30px) scaleX(1.15); opacity:.85 } }
        .au { position:absolute; left:-20%; width:140%; height:300px; border-radius:50%; filter: blur(60px); }
        .au1 { top:10%; background:linear-gradient(90deg,transparent,#5eead4,transparent); animation: au 9s ease-in-out infinite; }
        .au2 { top:34%; background:linear-gradient(90deg,transparent,#818cf8,transparent); animation: au 11s ease-in-out 1.5s infinite; }
        .au3 { top:58%; background:linear-gradient(90deg,transparent,#c084fc,transparent); animation: au 13s ease-in-out 3s infinite; }
      `}</style>
      <div className="au au1" /><div className="au au2" /><div className="au au3" />
      <h1 style={{ position: 'relative', color: '#fff', fontSize: 'clamp(34px,6vw,76px)', fontWeight: 800, letterSpacing: '-.03em' }}>Aurora</h1>
    </div>
  )
}
