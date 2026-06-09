// Gradient Text Sweep — a color gradient shifts across the headline on scroll.
// Clean minimal SaaS hero. Pure CSS animation, no deps.
import { useEffect, useRef, useState } from 'react'

const css = `
*{box-sizing:border-box;margin:0;padding:0}
.gth-root{
  font-family:Inter,system-ui,sans-serif;
  background:#000;min-height:100vh;
  display:flex;flex-direction:column;align-items:center;justify-content:center;
  padding:80px 24px;text-align:center;
}
/* gradient text */
.gth-h1{
  font-size:clamp(48px,7vw,96px);font-weight:900;letter-spacing:-.05em;
  line-height:.92;margin-bottom:24px;
  background:linear-gradient(90deg,#fff 0%,#fff 30%,#22d3ee 50%,#7c3aed 70%,#fff 100%);
  background-size:300% 100%;
  -webkit-background-clip:text;background-clip:text;
  -webkit-text-fill-color:transparent;
  animation:gth-sweep 4s linear infinite;
}
@keyframes gth-sweep{
  0%{background-position:100% 0}
  100%{background-position:-100% 0}
}
.gth-sub{
  font-size:clamp(16px,2vw,20px);color:rgba(255,255,255,.45);
  max-width:520px;line-height:1.65;margin-bottom:44px;
}
.gth-row{display:flex;gap:12px;justify-content:center;flex-wrap:wrap}
.gth-btn{
  padding:13px 28px;border-radius:9px;border:none;cursor:pointer;
  font-weight:700;font-size:14px;transition:opacity .15s,transform .15s;
}
.gth-btn-main{background:#22d3ee;color:#000}
.gth-btn-ghost{background:rgba(255,255,255,.06);color:rgba(255,255,255,.7);border:1px solid rgba(255,255,255,.12)}
.gth-btn:hover{opacity:.85;transform:translateY(-1px)}
/* badge */
.gth-badge{
  display:inline-flex;align-items:center;gap:6px;
  font-size:12px;font-weight:600;color:rgba(255,255,255,.55);
  border:1px solid rgba(255,255,255,.1);border-radius:99px;
  padding:5px 14px;margin-bottom:28px;
}
.gth-dot{width:6px;height:6px;border-radius:50%;background:#22d3ee;
  animation:gth-pulse 2s ease infinite;}
@keyframes gth-pulse{0%,100%{opacity:1}50%{opacity:.3}}
/* word swap */
.gth-swap{
  display:inline-block;overflow:hidden;vertical-align:bottom;
  height:1.0em;line-height:1.0;
}
.gth-swap span{
  display:block;animation:gth-roll 6s ease-in-out infinite;
}
@keyframes gth-roll{
  0%,22%{transform:translateY(0)}
  33%,55%{transform:translateY(-100%)}
  66%,88%{transform:translateY(-200%)}
  100%{transform:translateY(-300%)}
}
.gth-word-list{
  display:flex;flex-direction:column;
}
`

export default function GradientTextHero() {
  return (
    <div className="gth-root">
      <style>{css}</style>
      <div className="gth-badge"><span className="gth-dot" />Designed for modern teams</div>
      <h1 className="gth-h1">
        Ship faster.<br />
        <span className="gth-swap">
          <span className="gth-word-list">
            <span>Stay lean.</span>
            <span>Stay sharp.</span>
            <span>Scale up.</span>
            <span>Stay lean.</span>
          </span>
        </span>
      </h1>
      <p className="gth-sub">
        Animated gradient text with a cycling word swap — a staple on every modern SaaS hero.
        Pure CSS, no JavaScript, zero dependencies.
      </p>
      <div className="gth-row">
        <button className="gth-btn gth-btn-main">Get started free</button>
        <button className="gth-btn gth-btn-ghost">See how it works →</button>
      </div>
    </div>
  )
}
