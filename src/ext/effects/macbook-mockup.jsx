// MacBook Mockup — a CSS laptop frame (lid + hinge + base) showing a UI on screen.
// Pure CSS, no images. Great for "see it on desktop" hero shots.
export default function MacbookMockup() {
  const css = `
  *{box-sizing:border-box;margin:0;padding:0}
  .mb-root{font-family:Inter,system-ui,sans-serif;background:#0c0c12;min-height:100vh;display:grid;place-items:center;padding:60px 24px}
  .mb-stage{width:min(680px,90vw)}
  .mb-lid{position:relative;background:#1c1c24;border:2px solid #2c2c38;border-radius:18px;padding:12px;box-shadow:0 30px 80px -30px rgba(0,0,0,.8)}
  .mb-cam{position:absolute;top:6px;left:50%;transform:translateX(-50%);width:5px;height:5px;border-radius:50%;background:#3a3a48}
  .mb-screen{aspect-ratio:16/10;border-radius:8px;overflow:hidden;background:#0f1117;display:flex}
  .mb-side{width:34%;background:#13151d;padding:18px 14px;border-right:1px solid rgba(255,255,255,.05)}
  .mb-pill{height:9px;border-radius:99px;background:rgba(255,255,255,.09);margin-bottom:11px}
  .mb-pill.on{background:#7c3aed;width:70%}
  .mb-main{flex:1;padding:20px}
  .mb-h{height:16px;width:55%;border-radius:6px;background:rgba(255,255,255,.16);margin-bottom:16px}
  .mb-grid{display:grid;grid-template-columns:1fr 1fr;gap:10px}
  .mb-tile{height:60px;border-radius:9px;background:linear-gradient(135deg,rgba(124,58,237,.5),rgba(34,211,238,.35))}
  .mb-base{height:14px;margin:0 auto;width:104%;margin-left:-2%;background:linear-gradient(#c2c4cc,#9a9ca6);border-radius:0 0 12px 12px;position:relative}
  .mb-notch{position:absolute;top:0;left:50%;transform:translateX(-50%);width:120px;height:7px;background:#7e818c;border-radius:0 0 8px 8px}
  `
  return (
    <div className="mb-root">
      <style>{css}</style>
      <div className="mb-stage">
        <div className="mb-lid">
          <span className="mb-cam" />
          <div className="mb-screen">
            <div className="mb-side">
              <div className="mb-pill on" /><div className="mb-pill" /><div className="mb-pill" /><div className="mb-pill" /><div className="mb-pill" />
            </div>
            <div className="mb-main">
              <div className="mb-h" />
              <div className="mb-grid">
                <div className="mb-tile" /><div className="mb-tile" /><div className="mb-tile" /><div className="mb-tile" />
              </div>
            </div>
          </div>
        </div>
        <div className="mb-base"><span className="mb-notch" /></div>
      </div>
    </div>
  )
}
