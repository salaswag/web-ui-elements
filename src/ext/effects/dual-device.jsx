// Dual-Device Mockup — a laptop with a phone overlapping its corner, the classic
// "works on every screen" hero shot. Pure CSS, gentle idle float on the phone.
export default function DualDevice() {
  const css = `
  *{box-sizing:border-box;margin:0;padding:0}
  .dd-root{font-family:Inter,system-ui,sans-serif;background:#0c0c12;min-height:100vh;display:grid;place-items:center;padding:70px 24px}
  .dd-stage{position:relative;width:min(640px,92vw)}
  .dd-laptop{background:#1c1c24;border:2px solid #2c2c38;border-radius:16px;padding:10px 10px 0;box-shadow:0 30px 80px -34px rgba(0,0,0,.85)}
  .dd-lscreen{aspect-ratio:16/10;border-radius:7px;background:linear-gradient(135deg,#5b21b6,#0ea5e9);display:grid;place-items:center;color:#fff;text-align:center}
  .dd-lscreen h3{font-size:26px;font-weight:900;letter-spacing:-.02em}
  .dd-lscreen p{font-size:13px;opacity:.85;margin-top:6px}
  .dd-base{height:12px;width:118%;margin-left:-9%;margin-top:2px;background:linear-gradient(#c2c4cc,#9a9ca6);border-radius:0 0 14px 14px}
  .dd-phone{position:absolute;right:-6px;bottom:-26px;width:118px;height:236px;background:#0b0b10;border-radius:24px;padding:7px;box-shadow:0 24px 50px -16px rgba(0,0,0,.7),0 0 0 2px #23232e;animation:dd-float 6s ease-in-out infinite}
  @keyframes dd-float{0%,100%{transform:translateY(0)}50%{transform:translateY(-12px)}}
  .dd-pscreen{width:100%;height:100%;border-radius:18px;background:#fff;overflow:hidden;padding:14px 10px}
  .dd-pbar{height:10px;width:60%;border-radius:5px;background:#7c3aed;margin-bottom:12px}
  .dd-pr{height:34px;border-radius:9px;background:#f1f1f6;margin-bottom:9px}
  .dd-notch{position:absolute;top:7px;left:50%;transform:translateX(-50%);width:54px;height:11px;background:#0b0b10;border-radius:0 0 9px 9px;z-index:2}
  @media(max-width:520px){.dd-phone{right:-2px;width:96px;height:192px}}
  `
  return (
    <div className="dd-root">
      <style>{css}</style>
      <div className="dd-stage">
        <div className="dd-laptop">
          <div className="dd-lscreen">
            <div><h3>One app. Every screen.</h3><p>Desktop and pocket, perfectly in sync.</p></div>
          </div>
        </div>
        <div className="dd-base" />
        <div className="dd-phone">
          <span className="dd-notch" />
          <div className="dd-pscreen">
            <div className="dd-pbar" />
            <div className="dd-pr" /><div className="dd-pr" /><div className="dd-pr" /><div className="dd-pr" />
          </div>
        </div>
      </div>
    </div>
  )
}
