// Star Border — a glowing star sweeps around a button's border.
// Inspired by React Bits' "Star Border".
export default function StarBorder() {
  return (
    <div style={{ minHeight: '100vh', display: 'grid', placeItems: 'center', background: '#06060c', fontFamily: 'Inter, sans-serif' }}>
      <style>{`@keyframes sbspin { to { transform: rotate(360deg); } }
        .sb { position:relative; border-radius:14px; padding:2px; overflow:hidden; }
        .sb::before { content:''; position:absolute; inset:-150%; background:conic-gradient(from 0deg, transparent 0 75%, #fde68a 88%, #f59e0b 100%, transparent); animation: sbspin 3.2s linear infinite; }
        .sb-inner { position:relative; border-radius:12px; background:#11111a; color:#fff; padding:16px 30px; font-weight:600; font-size:16px; }`}</style>
      <div className="sb"><div className="sb-inner">★ Star border</div></div>
    </div>
  )
}
