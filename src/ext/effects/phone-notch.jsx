// iPhone Mockup — a notched phone frame whose screen content auto-scrolls in a
// seamless loop. Pure CSS frame + keyframe scroll. Swap the feed for real UI.
export default function PhoneNotch() {
  const rows = Array.from({ length: 6 })
  const css = `
  *{box-sizing:border-box;margin:0;padding:0}
  .pn-root{font-family:Inter,system-ui,sans-serif;background:radial-gradient(110% 80% at 50% 0%,#15223a,#070a10 60%);min-height:100vh;display:grid;place-items:center;padding:60px 24px}
  .pn-phone{position:relative;width:300px;height:610px;background:#0b0b10;border-radius:46px;padding:13px;box-shadow:0 40px 100px -30px rgba(34,211,238,.45),0 0 0 2px #23232e}
  .pn-notch{position:absolute;top:13px;left:50%;transform:translateX(-50%);width:150px;height:26px;background:#0b0b10;border-radius:0 0 18px 18px;z-index:3}
  .pn-screen{position:relative;width:100%;height:100%;border-radius:34px;overflow:hidden;background:#fff}
  .pn-status{position:absolute;top:0;left:0;right:0;height:46px;background:#fff;z-index:2;display:flex;align-items:center;justify-content:space-between;padding:0 26px;font-size:12px;font-weight:700;color:#0f0f12}
  .pn-feed{position:absolute;top:46px;left:0;right:0;padding:14px;animation:pn-scroll 9s linear infinite}
  @keyframes pn-scroll{0%{transform:translateY(0)}100%{transform:translateY(-50%)}}
  .pn-item{display:flex;gap:12px;align-items:center;padding:13px;border-radius:14px;background:#f5f5f8;margin-bottom:12px}
  .pn-av{width:42px;height:42px;border-radius:50%;flex-shrink:0;background:linear-gradient(135deg,#7c3aed,#22d3ee)}
  .pn-lines{flex:1}
  .pn-l1{height:10px;width:60%;border-radius:5px;background:#d7d7e0;margin-bottom:7px}
  .pn-l2{height:8px;width:90%;border-radius:5px;background:#e6e6ee}
  `
  return (
    <div className="pn-root">
      <style>{css}</style>
      <div className="pn-phone">
        <span className="pn-notch" />
        <div className="pn-screen">
          <div className="pn-status"><span>9:41</span><span>●●● ▮</span></div>
          <div className="pn-feed">
            {[...rows, ...rows].map((_, i) => (
              <div className="pn-item" key={i}>
                <span className="pn-av" />
                <div className="pn-lines"><div className="pn-l1" /><div className="pn-l2" /></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
