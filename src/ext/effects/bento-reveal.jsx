// Bento Grid Reveal — feature cards in a bento layout, stagger in on scroll.
// GSAP ScrollTrigger. Clean SaaS features section.
import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
gsap.registerPlugin(ScrollTrigger)

const ITEMS = [
  { size: 'wide', icon: '📞', title: '24/7 Auto-Receptionist', body: 'Never miss a call. AI answers, qualifies, and routes every lead — day or night.', accent: '#22d3ee' },
  { size: 'tall', icon: '📅', title: 'Zero No-Shows', body: 'Automated reminders cut cancellations by 70%.', accent: '#7c3aed' },
  { size: 'small', icon: '⭐', title: 'Review Capture', body: 'Ask happy customers for Google reviews automatically.', accent: '#f59e0b' },
  { size: 'small', icon: '💬', title: '98% Open Rate', body: 'SMS beats email every time.', accent: '#10b981' },
  { size: 'wide', icon: '🔁', title: 'Win-Back Campaigns', body: 'Re-engage cold leads and past customers with personalized follow-up sequences.', accent: '#6366f1' },
]

const css = `
*{box-sizing:border-box;margin:0;padding:0}
.btr-root{
  font-family:Inter,system-ui,sans-serif;
  background:#07090f;min-height:100vh;
  padding:80px 32px;
}
.btr-head{text-align:center;margin-bottom:56px}
.btr-eyebrow{
  font-size:11.5px;font-weight:700;letter-spacing:.18em;text-transform:uppercase;
  color:#22d3ee;margin-bottom:14px;
}
.btr-h2{
  font-size:clamp(32px,4vw,52px);font-weight:900;letter-spacing:-.03em;
  color:#eaf2f3;line-height:1.0;margin-bottom:14px;
}
.btr-sub{font-size:16px;color:rgba(234,242,243,.42);max-width:480px;margin:0 auto;line-height:1.65}
/* bento grid */
.btr-grid{
  display:grid;
  grid-template-columns:repeat(3,1fr);
  grid-template-rows:auto;
  gap:14px;max-width:900px;margin:0 auto;
}
.btr-card{
  background:rgba(255,255,255,.04);
  border:1px solid rgba(255,255,255,.08);
  border-radius:16px;padding:28px 24px;
  opacity:0;transform:translateY(28px);
}
.btr-card.wide{grid-column:span 2}
.btr-card.tall{grid-row:span 2;display:flex;flex-direction:column;justify-content:flex-end}
.btr-icon{font-size:28px;margin-bottom:16px}
.btr-title{font-size:16px;font-weight:700;color:#eaf2f3;margin-bottom:8px}
.btr-body{font-size:13.5px;color:rgba(234,242,243,.42);line-height:1.6}
.btr-accent-bar{height:2px;border-radius:99px;margin-top:18px;width:40px}
@media(max-width:640px){
  .btr-grid{grid-template-columns:1fr}
  .btr-card.wide{grid-column:span 1}
  .btr-card.tall{grid-row:span 1}
}
`

export default function BentoReveal() {
  const cardRefs = useRef([])

  useEffect(() => {
    const ctx = gsap.context(() => {
      cardRefs.current.forEach((el, i) => {
        if (!el) return
        gsap.to(el, {
          opacity: 1, y: 0, duration: .65, ease: 'power3.out',
          scrollTrigger: {
            trigger: el,
            start: 'top 85%',
            toggleActions: 'play none none none',
          },
          delay: (i % 3) * 0.08,
        })
      })
    })
    return () => ctx.revert()
  }, [])

  return (
    <div className="btr-root">
      <style>{css}</style>
      <div className="btr-head">
        <div className="btr-eyebrow">Everything you need</div>
        <h2 className="btr-h2">Built for businesses<br />that don't stop.</h2>
        <p className="btr-sub">Five automated systems working together — no software to learn, no extra staff.</p>
      </div>
      <div className="btr-grid">
        {ITEMS.map((item, i) => (
          <div
            key={i}
            ref={(el) => cardRefs.current[i] = el}
            className={`btr-card ${item.size}`}
          >
            <div className="btr-icon">{item.icon}</div>
            <div className="btr-title">{item.title}</div>
            <div className="btr-body">{item.body}</div>
            <div className="btr-accent-bar" style={{ background: item.accent }} />
          </div>
        ))}
      </div>
    </div>
  )
}
