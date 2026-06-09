// Terminal Hero — dark hero with a code/terminal window that types out commands.
// Vanilla JS typing loop. Popular on dev-tool and API landing pages.
import { useEffect, useRef } from 'react'

const LINES = [
  { prompt: '$ ', text: 'atlas init --business="Peak HVAC"', color: '#eaf2f3' },
  { prompt: '', text: '✓ Receptionist configured', color: '#10b981' },
  { prompt: '', text: '✓ Follow-up sequences active', color: '#10b981' },
  { prompt: '', text: '✓ Review capture enabled', color: '#10b981' },
  { prompt: '', text: '→ First lead captured in 00:04:22', color: '#22d3ee' },
]

const css = `
*{box-sizing:border-box;margin:0;padding:0}
.trm-root{
  font-family:Inter,system-ui,sans-serif;
  background:#04060c;min-height:100vh;
  display:flex;flex-direction:column;align-items:center;justify-content:center;
  padding:64px 24px;
}
.trm-content{width:100%;max-width:680px}
.trm-eyebrow{
  font-size:11.5px;font-weight:700;letter-spacing:.18em;text-transform:uppercase;
  color:#22d3ee;margin-bottom:14px;
}
.trm-h1{
  font-size:clamp(36px,5vw,64px);font-weight:900;letter-spacing:-.04em;
  line-height:.95;color:#eaf2f3;margin-bottom:16px;
}
.trm-p{font-size:16px;color:rgba(234,242,243,.44);line-height:1.65;margin-bottom:40px;max-width:460px}
/* terminal window */
.trm-window{
  background:#0e1117;border:1px solid rgba(255,255,255,.1);
  border-radius:14px;overflow:hidden;
}
.trm-titlebar{
  display:flex;align-items:center;gap:7px;
  padding:13px 16px;background:#161b25;border-bottom:1px solid rgba(255,255,255,.07);
}
.trm-dot{width:11px;height:11px;border-radius:50%}
.trm-dot-r{background:#ff5f57}
.trm-dot-y{background:#febc2e}
.trm-dot-g{background:#28c840}
.trm-window-title{
  flex:1;text-align:center;font-size:12px;
  color:rgba(255,255,255,.25);font-family:monospace;letter-spacing:.05em;
}
.trm-body{
  padding:20px 22px;min-height:150px;
  font-family:"JetBrains Mono",ui-monospace,monospace;font-size:13.5px;
  line-height:1.75;
}
.trm-line{display:flex;gap:0}
.trm-prompt{color:#7c3aed;white-space:pre}
.trm-cursor{
  display:inline-block;width:8px;height:1.1em;vertical-align:text-bottom;
  background:#22d3ee;animation:trm-blink .9s step-end infinite;margin-left:1px;
}
@keyframes trm-blink{0%,100%{opacity:1}50%{opacity:0}}
`

export default function TerminalHero() {
  const bodyRef = useRef(null)
  const cursorRef = useRef(null)

  useEffect(() => {
    const el = bodyRef.current
    if (!el) return
    while (el.firstChild) el.removeChild(el.firstChild)
    let active = true

    async function run() {
      for (const line of LINES) {
        if (!active) return
        const row = document.createElement('div')
        row.className = 'trm-line'
        if (line.prompt) {
          const pr = document.createElement('span')
          pr.className = 'trm-prompt'
          pr.textContent = line.prompt
          row.appendChild(pr)
        }
        const txt = document.createElement('span')
        txt.style.color = line.color
        row.appendChild(txt)
        el.appendChild(row)

        for (let i = 0; i <= line.text.length; i++) {
          if (!active) return
          txt.textContent = line.text.slice(0, i)
          await new Promise(r => setTimeout(r, line.prompt ? 42 : 28))
        }
        await new Promise(r => setTimeout(r, 380))
      }
    }

    run()
    return () => { active = false }
  }, [])

  return (
    <div className="trm-root">
      <style>{css}</style>
      <div className="trm-content">
        <div className="trm-eyebrow">Zero setup</div>
        <h1 className="trm-h1">Up and running<br />in minutes.</h1>
        <p className="trm-p">One command. Your entire automation stack — receptionist, follow-ups, reviews, win-back — deployed and live.</p>
        <div className="trm-window">
          <div className="trm-titlebar">
            <div className="trm-dot trm-dot-r" />
            <div className="trm-dot trm-dot-y" />
            <div className="trm-dot trm-dot-g" />
            <div className="trm-window-title">atlas — bash</div>
          </div>
          <div className="trm-body" ref={bodyRef} />
        </div>
      </div>
    </div>
  )
}
