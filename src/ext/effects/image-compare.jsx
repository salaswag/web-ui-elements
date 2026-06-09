// Before / After Compare — drag the divider to wipe between two images. The top
// layer is clipped by a slider value. Pure React state, works on touch + mouse.
import { useState } from 'react'

export default function ImageCompare() {
  const [pos, setPos] = useState(50)
  const css = `
  *{box-sizing:border-box;margin:0;padding:0}
  .ic-root{font-family:Inter,system-ui,sans-serif;min-height:100vh;background:#0b0b12;display:grid;place-items:center;padding:70px 24px;color:#fff}
  .ic-wrap{width:100%;max-width:760px}
  .ic-h2{text-align:center;font-size:clamp(24px,3.5vw,40px);font-weight:900;letter-spacing:-.03em;margin-bottom:28px}
  .ic-frame{position:relative;aspect-ratio:16/10;border-radius:16px;overflow:hidden;box-shadow:0 30px 80px -34px rgba(0,0,0,.8);user-select:none}
  .ic-img{position:absolute;inset:0;display:grid;place-items:center;font-weight:900;font-size:clamp(20px,4vw,40px);letter-spacing:-.02em}
  .ic-before{background:linear-gradient(135deg,#334155,#0f172a)}
  .ic-after{background:linear-gradient(135deg,#7c3aed,#22d3ee)}
  .ic-tag{position:absolute;bottom:16px;padding:5px 12px;border-radius:99px;font-size:11px;font-weight:700;letter-spacing:.08em;background:rgba(0,0,0,.5);backdrop-filter:blur(4px)}
  .ic-divider{position:absolute;top:0;bottom:0;width:3px;background:#fff;box-shadow:0 0 12px rgba(0,0,0,.5);transform:translateX(-50%)}
  .ic-handle{position:absolute;top:50%;left:50%;transform:translate(-50%,-50%);width:42px;height:42px;border-radius:50%;background:#fff;color:#0b0b12;display:grid;place-items:center;font-size:16px;font-weight:900;box-shadow:0 4px 14px rgba(0,0,0,.4)}
  .ic-range{position:absolute;inset:0;width:100%;height:100%;opacity:0;cursor:ew-resize;margin:0}
  `
  return (
    <div className="ic-root">
      <style>{css}</style>
      <div className="ic-wrap">
        <h2 className="ic-h2">Drag to compare.</h2>
        <div className="ic-frame">
          <div className="ic-img ic-before"><span style={{ position: 'absolute', top: 16, right: 16, fontSize: 11, fontWeight: 700, letterSpacing: '.08em', opacity: .7 }}>BEFORE</span>Before</div>
          <div className="ic-img ic-after" style={{ clipPath: `inset(0 ${100 - pos}% 0 0)` }}><span style={{ position: 'absolute', top: 16, left: 16, fontSize: 11, fontWeight: 700, letterSpacing: '.08em', opacity: .85 }}>AFTER</span>After</div>
          <div className="ic-divider" style={{ left: `${pos}%` }}><span className="ic-handle">⇄</span></div>
          <input className="ic-range" type="range" min="0" max="100" value={pos}
            onChange={(e) => setPos(Number(e.target.value))} aria-label="Compare slider" />
        </div>
      </div>
    </div>
  )
}
