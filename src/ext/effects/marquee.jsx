// Marquee — seamless infinite scrolling row, pauses on hover.
// Inspired by Magic UI's "Marquee" / Aceternity's "Infinite Moving Cards".
export default function Marquee() {
  const cards = ['“Never miss a call.”', '“Bookings on autopilot.”', '“5-star reviews, asked.”', '“Win back lapsed clients.”', '“24/7 receptionist.”']
  const row = [...cards, ...cards]
  return (
    <div style={{ minHeight: '100vh', display: 'grid', placeItems: 'center', background: '#0b0b12', fontFamily: 'Inter, sans-serif', overflow: 'hidden' }}>
      <style>{`
        @keyframes mq { to { transform: translateX(-50%); } }
        .mq { width: 100%; overflow: hidden; -webkit-mask-image: linear-gradient(90deg,transparent,#000 12%,#000 88%,transparent); }
        .mq-row { display:flex; gap:18px; width:max-content; animation: mq 22s linear infinite; }
        .mq:hover .mq-row { animation-play-state: paused; }
        .mq-card { background:#15151f; color:#e8e8ef; border:1px solid #26262f; border-radius:14px; padding:22px 26px; font-size:18px; font-weight:600; white-space:nowrap; }
      `}</style>
      <div className="mq">
        <div className="mq-row">
          {row.map((c, i) => <div className="mq-card" key={i}>{c}</div>)}
        </div>
      </div>
    </div>
  )
}
