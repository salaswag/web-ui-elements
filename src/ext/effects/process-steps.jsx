// Numbered Process Steps — connected step cards that cascade in on scroll.
// IntersectionObserver stagger. The "how it works" section every site needs.
import { useEffect, useRef } from 'react'

const STEPS = [
  { n: 1, t: 'Connect', s: 'Link your calendar and phone number in under two minutes — no code, no IT ticket.' },
  { n: 2, t: 'Configure', s: 'Pick the voice, the hours, and the rules. Our AI handles the rest of the conversation.' },
  { n: 3, t: 'Go live', s: 'Every call is answered, booked, and confirmed automatically from day one.' },
  { n: 4, t: 'Grow', s: 'Watch reviews climb and no-shows vanish while you focus on the work.' },
]

const css = `
*{box-sizing:border-box;margin:0;padding:0}
.pst-root{font-family:Inter,system-ui,sans-serif;background:#fff;min-height:100vh;padding:100px 28px;color:#0f0f12}
.pst-head{text-align:center;margin-bottom:64px}
.pst-eyebrow{font-size:11.5px;font-weight:700;letter-spacing:.18em;text-transform:uppercase;color:#7c3aed;margin-bottom:12px}
.pst-h2{font-size:clamp(30px,4vw,52px);font-weight:900;letter-spacing:-.03em}
.pst-grid{display:grid;grid-template-columns:repeat(4,1fr);gap:20px;max-width:1040px;margin:0 auto}
.pst-card{position:relative;background:#faf9ff;border:1px solid #ece9ff;border-radius:16px;padding:30px 24px 26px;opacity:0;transform:translateY(34px);transition:opacity .6s ease,transform .6s ease}
.pst-card.in{opacity:1;transform:none}
.pst-num{display:grid;place-items:center;width:44px;height:44px;border-radius:12px;background:#7c3aed;color:#fff;font-weight:900;font-size:18px;margin-bottom:18px}
.pst-t{font-size:18px;font-weight:800;letter-spacing:-.01em;margin-bottom:9px}
.pst-s{font-size:13.5px;line-height:1.6;color:#6b6b76}
.pst-card:not(:last-child)::after{content:'→';position:absolute;right:-15px;top:46px;color:#cfc7f5;font-size:20px;z-index:2}
@media(max-width:860px){.pst-grid{grid-template-columns:repeat(2,1fr)}.pst-card::after{display:none}}
@media(max-width:480px){.pst-grid{grid-template-columns:1fr}}
`

export default function ProcessSteps() {
  const root = useRef(null)
  useEffect(() => {
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (!e.isIntersecting) return
        const i = Number(e.target.dataset.i)
        setTimeout(() => e.target.classList.add('in'), i * 120)
        io.unobserve(e.target)
      })
    }, { threshold: 0.3 })
    root.current.querySelectorAll('.pst-card').forEach((el) => io.observe(el))
    return () => io.disconnect()
  }, [])
  return (
    <div className="pst-root" ref={root}>
      <style>{css}</style>
      <div className="pst-head">
        <div className="pst-eyebrow">How it works</div>
        <h2 className="pst-h2">Live in four steps.</h2>
      </div>
      <div className="pst-grid">
        {STEPS.map((s, i) => (
          <div key={s.n} className="pst-card" data-i={i}>
            <div className="pst-num">{s.n}</div>
            <div className="pst-t">{s.t}</div>
            <div className="pst-s">{s.s}</div>
          </div>
        ))}
      </div>
    </div>
  )
}
