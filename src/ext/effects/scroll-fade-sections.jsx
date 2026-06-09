// Scroll Fade + Slide Sections — each content block fades and slides up on enter.
// IntersectionObserver. The baseline reveal every SaaS page uses.
const css = `
*{box-sizing:border-box;margin:0;padding:0}
.sfs-root{font-family:Inter,system-ui,sans-serif;background:#07090f}
.sfs-section{
  min-height:100vh;display:flex;align-items:center;justify-content:center;
  padding:80px 32px;
  border-bottom:1px solid rgba(255,255,255,.05);
}
.sfs-inner{max-width:640px;width:100%}
/* reveal animation */
.sfs-reveal{
  opacity:0;transform:translateY(32px);
  transition:opacity .7s cubic-bezier(.2,.7,.3,1),transform .7s cubic-bezier(.2,.7,.3,1);
}
.sfs-reveal.visible{opacity:1;transform:translateY(0)}
.sfs-reveal:nth-child(2){transition-delay:.12s}
.sfs-reveal:nth-child(3){transition-delay:.22s}
.sfs-reveal:nth-child(4){transition-delay:.32s}
/* content styles */
.sfs-eyebrow{
  font-size:11px;font-weight:700;letter-spacing:.2em;text-transform:uppercase;
  margin-bottom:14px;display:inline-block;
}
.sfs-h2{
  font-size:clamp(32px,4vw,56px);font-weight:900;letter-spacing:-.04em;
  line-height:.96;color:#eaf2f3;margin-bottom:16px;
}
.sfs-p{font-size:17px;color:rgba(234,242,243,.42);line-height:1.7;margin-bottom:28px}
.sfs-chips{display:flex;flex-wrap:wrap;gap:8px}
.sfs-chip{
  font-size:12px;font-weight:600;
  padding:5px 12px;border-radius:6px;
  background:rgba(255,255,255,.06);border:1px solid rgba(255,255,255,.08);
  color:rgba(234,242,243,.55);
}
`

const SECTIONS = [
  {
    color: '#22d3ee',
    eyebrow: '01 — The problem',
    h2: 'Phones ring after hours.\nYou miss the lead.',
    body: 'Most service businesses lose 40% of leads simply because no one answers when the phone rings after 5pm.',
    chips: ['After-hours calls', 'Missed revenue', 'Lost trust'],
  },
  {
    color: '#7c3aed',
    eyebrow: '02 — The solution',
    h2: 'AI answers.\nEvery time.',
    body: 'Our receptionist picks up every call, qualifies the lead, and books the appointment — while you sleep.',
    chips: ['24/7 coverage', 'Instant booking', 'Zero staff needed'],
  },
  {
    color: '#10b981',
    eyebrow: '03 — The result',
    h2: 'Live in 14 days.\nNo IT required.',
    body: 'We audit, build, and run everything. You get a working system in two weeks with no software to learn.',
    chips: ['14-day launch', 'Done for you', '98% text open rate'],
  },
]

import { useEffect, useRef } from 'react'

export default function ScrollFadeSections() {
  const revealRefs = useRef([])

  useEffect(() => {
    const obs = new IntersectionObserver((entries) => {
      entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible') })
    }, { threshold: 0.15 })
    revealRefs.current.forEach(el => el && obs.observe(el))
    return () => obs.disconnect()
  }, [])

  let refIdx = 0

  return (
    <div className="sfs-root">
      <style>{css}</style>
      {SECTIONS.map((s, si) => (
        <div key={si} className="sfs-section">
          <div className="sfs-inner">
            <div ref={el => revealRefs.current[refIdx++] = el} className="sfs-reveal">
              <span className="sfs-eyebrow" style={{ color: s.color }}>{s.eyebrow}</span>
            </div>
            <div ref={el => revealRefs.current[refIdx++] = el} className="sfs-reveal">
              <h2 className="sfs-h2" style={{ whiteSpace: 'pre-line' }}>{s.h2}</h2>
            </div>
            <div ref={el => revealRefs.current[refIdx++] = el} className="sfs-reveal">
              <p className="sfs-p">{s.body}</p>
            </div>
            <div ref={el => revealRefs.current[refIdx++] = el} className="sfs-reveal">
              <div className="sfs-chips">
                {s.chips.map(c => <span key={c} className="sfs-chip">{c}</span>)}
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}
