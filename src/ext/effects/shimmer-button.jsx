// Shimmer Button — a sheen of light sweeps across the button surface.
// Inspired by Magic UI's "Shimmer Button".
export default function ShimmerButton() {
  return (
    <div style={{ minHeight: '100vh', display: 'grid', placeItems: 'center', background: '#0b0b12', fontFamily: 'Inter, sans-serif' }}>
      <style>{`
        @keyframes sh { to { transform: translateX(180%); } }
        .sh-btn { position:relative; overflow:hidden; border:none; cursor:pointer;
          padding:16px 34px; border-radius:999px; font-weight:600; font-size:16px; color:#fff;
          background:#1b1530; box-shadow:0 0 0 1px rgba(139,92,246,.5), 0 20px 50px -20px rgba(139,92,246,.7); }
        .sh-btn::before { content:''; position:absolute; top:0; left:-60%; width:60%; height:100%;
          background:linear-gradient(110deg,transparent,rgba(255,255,255,.55),transparent);
          transform:translateX(0); animation: sh 2.4s ease-in-out infinite; }
      `}</style>
      <button className="sh-btn">✦ Book a demo</button>
    </div>
  )
}
