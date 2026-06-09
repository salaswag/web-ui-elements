// Word Rotate Hero — a single word in the headline cycles through alternatives.
// Pure CSS with JS fallback for timing. Classic SaaS pattern.
import { useState, useEffect } from 'react'

const WORDS = ['faster', 'smarter', 'without hassle', 'on autopilot', '24/7']

const css = `
*{box-sizing:border-box;margin:0;padding:0}
.wrh-root{
  font-family:Inter,system-ui,sans-serif;
  background:#07090f;min-height:100vh;
  display:flex;flex-direction:column;align-items:center;justify-content:center;
  padding:80px 24px;text-align:center;
}
.wrh-h1{
  font-size:clamp(40px,6vw,88px);font-weight:900;letter-spacing:-.05em;
  line-height:.96;color:#eaf2f3;margin-bottom:24px;
}
.wrh-word-wrap{
  display:inline-block;
  overflow:hidden;
  vertical-align:bottom;
  position:relative;
}
.wrh-word{
  display:inline-block;
  color:transparent;
  -webkit-background-clip:text;background-clip:text;
  background:linear-gradient(90deg,#22d3ee,#7c3aed);
  transition:transform .45s cubic-bezier(.4,0,.2,1),opacity .45s;
}
.wrh-word.exit{
  transform:translateY(-100%);opacity:0;
  position:absolute;top:0;left:0;
  transition:transform .35s cubic-bezier(.4,0,.2,1),opacity .35s;
}
.wrh-word.enter{
  transform:translateY(0);opacity:1;
}
.wrh-word.enter-from{
  transform:translateY(100%);opacity:0;
  transition:none;
}
.wrh-p{
  font-size:clamp(16px,2vw,19px);color:rgba(234,242,243,.42);
  max-width:500px;line-height:1.65;margin-bottom:44px;
}
.wrh-btns{display:flex;gap:12px;justify-content:center;flex-wrap:wrap}
.wrh-btn-a{
  padding:13px 28px;border-radius:9px;border:none;cursor:pointer;
  background:#22d3ee;color:#07090f;font-weight:800;font-size:14px;
  transition:opacity .15s,transform .15s;
}
.wrh-btn-b{
  padding:13px 28px;border-radius:9px;cursor:pointer;
  background:rgba(255,255,255,.06);border:1px solid rgba(255,255,255,.1);
  color:rgba(255,255,255,.7);font-weight:600;font-size:14px;
  transition:background .15s,transform .15s;
}
.wrh-btn-a:hover,.wrh-btn-b:hover{opacity:.88;transform:translateY(-1px)}
/* trust row */
.wrh-trust{
  display:flex;align-items:center;gap:16px;margin-top:52px;
  color:rgba(234,242,243,.28);font-size:12.5px;
}
.wrh-avatar-row{display:flex}
.wrh-avatar{
  width:28px;height:28px;border-radius:50%;border:2px solid #07090f;
  background:linear-gradient(135deg,#7c3aed,#22d3ee);margin-left:-8px;
}
.wrh-avatar:first-child{margin-left:0}
`

export default function WordRotateHero() {
  const [idx, setIdx] = useState(0)
  const [phase, setPhase] = useState('enter')

  useEffect(() => {
    const timer = setInterval(() => {
      setPhase('exit')
      setTimeout(() => {
        setIdx((i) => (i + 1) % WORDS.length)
        setPhase('enter-from')
        requestAnimationFrame(() => requestAnimationFrame(() => setPhase('enter')))
      }, 380)
    }, 2400)
    return () => clearInterval(timer)
  }, [])

  return (
    <div className="wrh-root">
      <style>{css}</style>
      <h1 className="wrh-h1">
        Run your business<br />
        <span className="wrh-word-wrap">
          <span className={`wrh-word ${phase}`}>{WORDS[idx]}</span>
        </span>
      </h1>
      <p className="wrh-p">
        A single rotating word keeps the headline fresh and tests messaging — no rewrite needed.
        Pure CSS transitions, zero-flicker swap.
      </p>
      <div className="wrh-btns">
        <button className="wrh-btn-a">Start for free</button>
        <button className="wrh-btn-b">Watch demo</button>
      </div>
      <div className="wrh-trust">
        <div className="wrh-avatar-row">
          {[0,1,2,3].map(i => <div key={i} className="wrh-avatar" style={{ background: ['#7c3aed','#22d3ee','#10b981','#f59e0b'][i] }} />)}
        </div>
        Trusted by 400+ service businesses
      </div>
    </div>
  )
}
