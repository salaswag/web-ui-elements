// Browser Window Mockup — a realistic browser chrome framing a product screenshot,
// floating with a gentle idle tilt. Pure CSS. Drop any image/UI inside.
export default function BrowserWindow() {
  const css = `
  *{box-sizing:border-box;margin:0;padding:0}
  .bw-root{font-family:Inter,system-ui,sans-serif;background:radial-gradient(120% 90% at 50% 0%,#1b1733,#07070d 60%);min-height:100vh;display:grid;place-items:center;padding:80px 24px;perspective:1400px}
  .bw-win{width:min(820px,92vw);border-radius:14px;overflow:hidden;background:#15151c;box-shadow:0 40px 120px -40px rgba(124,58,237,.6),0 0 0 1px rgba(255,255,255,.06);animation:bw-float 7s ease-in-out infinite}
  @keyframes bw-float{0%,100%{transform:rotateX(6deg) rotateY(-4deg) translateY(0)}50%{transform:rotateX(3deg) rotateY(3deg) translateY(-14px)}}
  .bw-bar{display:flex;align-items:center;gap:8px;padding:13px 16px;background:#1d1d27}
  .bw-dot{width:12px;height:12px;border-radius:50%}
  .bw-url{flex:1;margin-left:14px;height:26px;border-radius:7px;background:#2a2a37;display:flex;align-items:center;padding:0 14px;font-size:12px;color:#8a8a9c}
  .bw-body{aspect-ratio:16/9;background:linear-gradient(135deg,#7c3aed,#22d3ee);position:relative;display:grid;place-items:center}
  .bw-card{background:rgba(255,255,255,.16);backdrop-filter:blur(8px);border:1px solid rgba(255,255,255,.25);border-radius:14px;padding:30px 38px;text-align:center;color:#fff}
  .bw-card h3{font-size:clamp(22px,3vw,34px);font-weight:900;letter-spacing:-.02em}
  .bw-card p{font-size:14px;opacity:.85;margin-top:8px}
  `
  return (
    <div className="bw-root">
      <style>{css}</style>
      <div className="bw-win">
        <div className="bw-bar">
          <span className="bw-dot" style={{ background: '#ff5f57' }} />
          <span className="bw-dot" style={{ background: '#febc2e' }} />
          <span className="bw-dot" style={{ background: '#28c840' }} />
          <span className="bw-url">app.yourproduct.com/dashboard</span>
        </div>
        <div className="bw-body">
          <div className="bw-card">
            <h3>Your product, framed.</h3>
            <p>Swap this panel for a real screenshot.</p>
          </div>
        </div>
      </div>
    </div>
  )
}
