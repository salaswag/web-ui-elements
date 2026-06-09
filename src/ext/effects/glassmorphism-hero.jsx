// Glassmorphism Card Hero — frosted-glass product card on blurred gradient backdrop.
// Popular in Notion-style, Linear-style product pages. Pure CSS.
const css = `
*{box-sizing:border-box;margin:0;padding:0}
.glh-root{
  font-family:Inter,system-ui,sans-serif;
  min-height:100vh;background:#0d0d1a;
  display:flex;align-items:center;justify-content:center;
  padding:40px 24px;position:relative;overflow:hidden;
}
/* background blobs */
.glh-blob{position:absolute;border-radius:50%;filter:blur(100px);pointer-events:none}
.glh-blob-1{width:480px;height:480px;background:#7c3aed;opacity:.28;top:-80px;left:-60px}
.glh-blob-2{width:360px;height:360px;background:#22d3ee;opacity:.22;bottom:-80px;right:40px}
.glh-blob-3{width:260px;height:260px;background:#f59e0b;opacity:.12;top:50%;left:50%}
/* layout */
.glh-layout{
  position:relative;z-index:1;
  display:grid;grid-template-columns:1fr 1fr;
  gap:64px;align-items:center;max-width:1000px;width:100%;
}
/* left text */
.glh-eyebrow{
  font-size:11.5px;font-weight:700;letter-spacing:.18em;text-transform:uppercase;
  color:#22d3ee;margin-bottom:16px;
}
.glh-h1{
  font-size:clamp(32px,4vw,56px);font-weight:900;letter-spacing:-.04em;
  line-height:.96;color:#fff;margin-bottom:18px;
}
.glh-p{font-size:16px;color:rgba(255,255,255,.48);line-height:1.65;margin-bottom:32px}
.glh-btn{
  padding:13px 26px;border-radius:9px;border:none;cursor:pointer;
  background:#22d3ee;color:#07090f;font-weight:800;font-size:14px;
  transition:opacity .15s,transform .15s;display:inline-block;
}
.glh-btn:hover{opacity:.88;transform:translateY(-1px)}
/* glass card */
.glh-card{
  background:rgba(255,255,255,.06);
  border:1px solid rgba(255,255,255,.12);
  backdrop-filter:blur(24px);-webkit-backdrop-filter:blur(24px);
  border-radius:20px;padding:28px;
}
.glh-card-top{
  display:flex;align-items:center;gap:10px;margin-bottom:20px;
}
.glh-card-icon{
  width:38px;height:38px;border-radius:10px;
  background:linear-gradient(135deg,#7c3aed,#22d3ee);
  display:flex;align-items:center;justify-content:center;
  font-size:18px;flex-shrink:0;
}
.glh-card-title{font-size:15px;font-weight:700;color:#fff}
.glh-card-sub{font-size:12.5px;color:rgba(255,255,255,.38);margin-top:2px}
.glh-divider{height:1px;background:rgba(255,255,255,.08);margin:0 0 20px}
.glh-row{
  display:flex;justify-content:space-between;align-items:center;
  padding:8px 0;border-bottom:1px solid rgba(255,255,255,.05);
}
.glh-row:last-child{border-bottom:none}
.glh-row-label{font-size:13px;color:rgba(255,255,255,.42)}
.glh-row-val{font-size:13px;font-weight:700;color:#fff}
.glh-pill{
  font-size:10.5px;font-weight:700;padding:2px 8px;border-radius:99px;
  background:rgba(34,211,238,.12);color:#22d3ee;
}
@media(max-width:700px){
  .glh-layout{grid-template-columns:1fr;gap:36px}
}
`

const rows = [
  { label: 'Active conversations', val: '12', pill: '↑ 3' },
  { label: 'Leads captured today', val: '47', pill: '+18%' },
  { label: 'Avg. response time', val: '8s', pill: '↓ 2s' },
  { label: 'Bookings confirmed', val: '9', pill: '+6' },
]

export default function GlassmorphismHero() {
  return (
    <div className="glh-root">
      <style>{css}</style>
      <div className="glh-blob glh-blob-1" />
      <div className="glh-blob glh-blob-2" />
      <div className="glh-blob glh-blob-3" />
      <div className="glh-layout">
        <div>
          <div className="glh-eyebrow">AI-powered inbox</div>
          <h1 className="glh-h1">Every lead,<br />every time.</h1>
          <p className="glh-p">
            Real-time dashboard behind a frosted glass card.
            Backdrop-filter blur over animated gradient blobs.
          </p>
          <button className="glh-btn">See it live →</button>
        </div>
        <div className="glh-card">
          <div className="glh-card-top">
            <div className="glh-card-icon">📊</div>
            <div>
              <div className="glh-card-title">Live Dashboard</div>
              <div className="glh-card-sub">Updated 3s ago</div>
            </div>
          </div>
          <div className="glh-divider" />
          {rows.map((r) => (
            <div key={r.label} className="glh-row">
              <span className="glh-row-label">{r.label}</span>
              <span style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <span className="glh-row-val">{r.val}</span>
                <span className="glh-pill">{r.pill}</span>
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
