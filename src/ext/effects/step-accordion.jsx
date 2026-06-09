// Vertical Step Accordion — numbered steps; click one to expand its detail.
// Pure React state, smooth max-height transition. A compact "how it works".
import { useState } from 'react'

const STEPS = [
  { t: 'You get the call', s: 'A customer calls. Our AI answers instantly, in a natural voice, 24/7 — no hold music, no voicemail.' },
  { t: 'It books the job', s: 'The assistant checks your live calendar and locks in the appointment before the call ends.' },
  { t: 'It confirms & reminds', s: 'Automated SMS confirmations and reminders cut no-shows dramatically.' },
  { t: 'It earns the review', s: 'After the job, happy customers are routed to your public review link automatically.' },
]

const css = `
*{box-sizing:border-box;margin:0;padding:0}
.sac-root{font-family:Inter,system-ui,sans-serif;background:#fff;min-height:100vh;padding:100px 24px;color:#0f0f12;display:flex;flex-direction:column;align-items:center}
.sac-h2{font-size:clamp(28px,4vw,46px);font-weight:900;letter-spacing:-.03em;margin-bottom:48px;text-align:center}
.sac-list{width:100%;max-width:620px}
.sac-item{border:1px solid #ececf1;border-radius:14px;margin-bottom:12px;overflow:hidden;transition:border-color .2s,box-shadow .2s}
.sac-item.open{border-color:#7c3aed;box-shadow:0 12px 30px -18px rgba(124,58,237,.5)}
.sac-btn{width:100%;display:flex;align-items:center;gap:16px;padding:20px 22px;background:none;border:none;cursor:pointer;text-align:left;font-family:inherit}
.sac-n{display:grid;place-items:center;width:32px;height:32px;border-radius:9px;font-weight:800;font-size:14px;flex-shrink:0;background:#f4f1ff;color:#7c3aed;transition:background .2s,color .2s}
.sac-item.open .sac-n{background:#7c3aed;color:#fff}
.sac-t{flex:1;font-size:16px;font-weight:700}
.sac-chev{color:#b4b4bd;transition:transform .3s}
.sac-item.open .sac-chev{transform:rotate(45deg);color:#7c3aed}
.sac-panel{max-height:0;overflow:hidden;transition:max-height .35s ease}
.sac-item.open .sac-panel{max-height:180px}
.sac-s{padding:0 22px 22px 70px;font-size:14px;line-height:1.65;color:#6b6b76}
`

export default function StepAccordion() {
  const [open, setOpen] = useState(0)
  return (
    <div className="sac-root">
      <style>{css}</style>
      <h2 className="sac-h2">From ring to review.</h2>
      <div className="sac-list">
        {STEPS.map((s, i) => (
          <div key={s.t} className={`sac-item ${open === i ? 'open' : ''}`}>
            <button className="sac-btn" onClick={() => setOpen(open === i ? -1 : i)}>
              <span className="sac-n">{i + 1}</span>
              <span className="sac-t">{s.t}</span>
              <span className="sac-chev">+</span>
            </button>
            <div className="sac-panel"><div className="sac-s">{s.s}</div></div>
          </div>
        ))}
      </div>
    </div>
  )
}
