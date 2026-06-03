// Border Beam — a light that travels around an element's border.
// Inspired by Magic UI's "Border Beam".
export default function BorderBeam() {
  return (
    <div style={{ minHeight: '100vh', display: 'grid', placeItems: 'center', background: '#0b0b12', fontFamily: 'Inter, sans-serif' }}>
      <style>{`
        @keyframes bb-spin { to { transform: rotate(360deg); } }
        .bb { position: relative; border-radius: 20px; overflow: hidden; }
        .bb::before {
          content:''; position:absolute; inset:-150%; z-index:0;
          background: conic-gradient(from 0deg, transparent 0 70%, #8b5cf6 85%, #22d3ee 100%, transparent);
          animation: bb-spin 4s linear infinite;
        }
        .bb-inner { position:relative; z-index:1; margin:2px; border-radius:18px; background:#13131c; }
      `}</style>
      <div className="bb">
        <div className="bb-inner" style={{ width: 'min(360px,82vw)', padding: '40px 32px', color: '#fff', textAlign: 'center' }}>
          <div style={{ fontSize: 13, color: '#8b8b9a', letterSpacing: '.15em' }}>PRO PLAN</div>
          <div style={{ fontSize: 40, fontWeight: 800, margin: '8px 0' }}>$19<span style={{ fontSize: 16, color: '#8b8b9a' }}>/mo</span></div>
          <div style={{ fontSize: 14, color: '#b9b9c6' }}>A glowing beam circles the border.</div>
        </div>
      </div>
    </div>
  )
}
