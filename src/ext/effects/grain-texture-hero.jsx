// Grain Texture Hero — subtle CSS noise/grain layer over a gradient background.
// Adds tactile, premium feel. Pure CSS, zero deps. Common on high-end agency sites.
const css = `
*{box-sizing:border-box;margin:0;padding:0}
.grn-root{
  font-family:Inter,system-ui,sans-serif;
  background:linear-gradient(135deg,#0d0d1a 0%,#0a1628 50%,#041a12 100%);
  min-height:100vh;position:relative;
  display:flex;align-items:center;justify-content:center;
  padding:80px 24px;text-align:center;overflow:hidden;
}
/* grain overlay via SVG data URI */
.grn-root::before{
  content:'';
  position:absolute;inset:0;
  background-image:url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='1'/%3E%3C/svg%3E");
  background-repeat:repeat;background-size:256px 256px;
  opacity:.04;pointer-events:none;z-index:0;
}
/* soft color accent */
.grn-root::after{
  content:'';position:absolute;
  width:600px;height:600px;border-radius:50%;
  background:radial-gradient(circle,rgba(34,211,238,.12) 0%,transparent 65%);
  top:50%;left:50%;transform:translate(-50%,-50%);
  pointer-events:none;z-index:0;
}
.grn-content{position:relative;z-index:1;max-width:600px}
.grn-chip{
  display:inline-flex;align-items:center;gap:6px;
  font-size:11.5px;font-weight:600;color:rgba(234,242,243,.5);
  border:1px solid rgba(255,255,255,.1);border-radius:99px;
  padding:5px 14px;margin-bottom:26px;
  background:rgba(255,255,255,.04);
}
.grn-chip-dot{width:5px;height:5px;border-radius:50%;background:#10b981}
.grn-h1{
  font-size:clamp(44px,6vw,84px);font-weight:900;letter-spacing:-.05em;
  line-height:.94;color:#eaf2f3;margin-bottom:20px;
  text-shadow:0 2px 40px rgba(34,211,238,.1);
}
.grn-accent{color:#22d3ee}
.grn-p{
  font-size:17px;color:rgba(234,242,243,.4);
  line-height:1.7;margin-bottom:44px;max-width:460px;margin-inline:auto;
}
.grn-btns{display:flex;gap:12px;justify-content:center;flex-wrap:wrap}
.grn-btn-a{
  padding:13px 28px;border-radius:9px;border:none;cursor:pointer;
  background:#22d3ee;color:#07090f;font-weight:800;font-size:14px;
  transition:opacity .15s,transform .15s;
}
.grn-btn-b{
  padding:13px 28px;border-radius:9px;cursor:pointer;
  background:rgba(255,255,255,.05);border:1px solid rgba(255,255,255,.1);
  color:rgba(255,255,255,.65);font-weight:600;font-size:14px;
  transition:background .15s,transform .15s;
}
.grn-btn-a:hover,.grn-btn-b:hover{opacity:.88;transform:translateY(-1px)}
`

export default function GrainTextureHero() {
  return (
    <div className="grn-root">
      <style>{css}</style>
      <div className="grn-content">
        <div className="grn-chip">
          <span className="grn-chip-dot" />
          Grain texture · pure CSS
        </div>
        <h1 className="grn-h1">
          Feels <span className="grn-accent">premium</span>.<br />
          Costs nothing.
        </h1>
        <p className="grn-p">
          A faint SVG noise layer over a dark gradient. Adds depth and texture
          without distracting from the content. Zero dependencies, no JavaScript.
        </p>
        <div className="grn-btns">
          <button className="grn-btn-a">Copy the CSS</button>
          <button className="grn-btn-b">See source</button>
        </div>
      </div>
    </div>
  )
}
