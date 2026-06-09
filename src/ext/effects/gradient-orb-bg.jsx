// Gradient Orb Hero Background — floating blurred color orbs over a dark surface.
// Common on Linear, Vercel, Stripe. Pure CSS, zero deps.
import { useEffect, useRef } from 'react'

const css = `
*{box-sizing:border-box;margin:0;padding:0}
.gob-root{
  font-family:Inter,system-ui,sans-serif;
  background:#060610;min-height:100vh;
  display:flex;flex-direction:column;align-items:center;justify-content:center;
  position:relative;overflow:hidden;
}
/* orbs */
.gob-orb{
  position:absolute;border-radius:50%;
  filter:blur(90px);opacity:.55;
  animation:gob-drift 18s ease-in-out infinite alternate;
  pointer-events:none;
}
.gob-orb:nth-child(1){width:520px;height:520px;background:#7c3aed;top:-120px;left:-80px;animation-delay:0s}
.gob-orb:nth-child(2){width:400px;height:400px;background:#06b6d4;bottom:-100px;right:-60px;animation-delay:-6s}
.gob-orb:nth-child(3){width:300px;height:300px;background:#3b82f6;top:40%;left:45%;animation-delay:-12s}
@keyframes gob-drift{
  0%{transform:translate(0,0) scale(1)}
  50%{transform:translate(40px,-30px) scale(1.08)}
  100%{transform:translate(-30px,50px) scale(.95)}
}
/* content */
.gob-content{position:relative;z-index:1;text-align:center;padding:0 24px;max-width:640px}
.gob-eyebrow{
  display:inline-block;font-size:11px;font-weight:700;letter-spacing:.18em;
  text-transform:uppercase;color:#7c3aed;margin-bottom:20px;
  padding:4px 12px;border:1px solid rgba(124,58,237,.35);border-radius:99px;
}
.gob-h1{
  font-size:clamp(36px,6vw,72px);font-weight:900;letter-spacing:-.04em;
  line-height:.95;color:#fff;margin-bottom:20px;
}
.gob-p{font-size:17px;line-height:1.65;color:rgba(255,255,255,.52);margin-bottom:40px}
.gob-btns{display:flex;gap:12px;justify-content:center;flex-wrap:wrap}
.gob-btn-primary{
  padding:13px 28px;border-radius:10px;border:none;cursor:pointer;
  background:linear-gradient(135deg,#7c3aed,#06b6d4);
  color:#fff;font-weight:700;font-size:14px;
  transition:opacity .15s,transform .15s;
}
.gob-btn-primary:hover{opacity:.88;transform:translateY(-1px)}
.gob-btn-outline{
  padding:13px 28px;border-radius:10px;cursor:pointer;
  background:rgba(255,255,255,.06);border:1px solid rgba(255,255,255,.14);
  color:rgba(255,255,255,.8);font-weight:600;font-size:14px;
  transition:background .15s,transform .15s;
}
.gob-btn-outline:hover{background:rgba(255,255,255,.1);transform:translateY(-1px)}
/* grid overlay */
.gob-grid{
  position:absolute;inset:0;
  background-image:linear-gradient(rgba(255,255,255,.028) 1px,transparent 1px),
    linear-gradient(90deg,rgba(255,255,255,.028) 1px,transparent 1px);
  background-size:48px 48px;
  pointer-events:none;
}
`

export default function GradientOrbBg() {
  return (
    <div className="gob-root">
      <style>{css}</style>
      <div className="gob-grid" />
      <div className="gob-orb" />
      <div className="gob-orb" />
      <div className="gob-orb" />
      <div className="gob-content">
        <div className="gob-eyebrow">Now in public beta</div>
        <h1 className="gob-h1">Build products<br />people love.</h1>
        <p className="gob-p">
          A modern design system with ambient lighting effects.<br />
          Drop it in your hero — zero JavaScript required.
        </p>
        <div className="gob-btns">
          <button className="gob-btn-primary">Get started free</button>
          <button className="gob-btn-outline">View docs</button>
        </div>
      </div>
    </div>
  )
}
