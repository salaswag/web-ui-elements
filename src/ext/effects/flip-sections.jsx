// Flip Sections — each section rotates in via a 3D rotateX from 45° to 0° as it
// enters the viewport. perspective creates depth. GSAP ScrollTrigger per section.
import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
gsap.registerPlugin(ScrollTrigger)

const CARDS = [
  {
    num: '01', tag: 'Approach',
    title: 'Think in systems, not screens.',
    body: 'A single beautiful screen that doesn\'t connect to anything else is a dead end. Design the flow first.',
    bg: '#111118', border: '#7c3aed', accent: '#7c3aed',
  },
  {
    num: '02', tag: 'Process',
    title: 'Constraint creates creativity.',
    body: 'Given infinite options, people freeze. Given three, they decide. The best briefs include sharp limits.',
    bg: '#0d1018', border: '#3b82f6', accent: '#3b82f6',
  },
  {
    num: '03', tag: 'Execution',
    title: 'Craft is visible at the edges.',
    body: 'Anyone can get the obvious parts right. Elite work shows in the loading states, the error messages, the transitions.',
    bg: '#0a140f', border: '#10b981', accent: '#10b981',
  },
  {
    num: '04', tag: 'Mindset',
    title: 'Ship fast. Refine faster.',
    body: 'The gap between "good enough to ship" and "perfect" is mostly fear. Courage is a design tool.',
    bg: '#130f07', border: '#f59e0b', accent: '#f59e0b',
  },
]

const css = `
*{box-sizing:border-box;margin:0;padding:0}
.fp-wrap{
  font-family:Inter,system-ui,sans-serif;
  background:#09090b;min-height:100vh;
  padding:80px 5vw;
  perspective:1200px;
}
.fp-hero{margin-bottom:80px}
.fp-eyebrow{
  font-size:10px;font-weight:700;letter-spacing:.2em;text-transform:uppercase;
  color:#7c3aed;margin-bottom:12px;
}
.fp-hero-h{
  font-size:clamp(36px,5vw,64px);font-weight:900;letter-spacing:-.03em;
  color:#fff;line-height:1.05;
}
.fp-cards{display:flex;flex-direction:column;gap:20px;max-width:780px;margin:0 auto}
.fp-card{
  background:var(--bg);
  border:1px solid var(--border);
  border-radius:16px;padding:32px 36px;
  transform-origin:top center;
  opacity:0;transform:rotateX(45deg);
  will-change:transform,opacity;
}
.fp-tag{
  font-size:10px;font-weight:700;letter-spacing:.16em;text-transform:uppercase;
  margin-bottom:16px;
}
.fp-title{
  font-size:clamp(22px,3vw,30px);font-weight:800;letter-spacing:-.02em;
  color:#fff;margin-bottom:12px;line-height:1.15;
}
.fp-body{font-size:14.5px;line-height:1.65;color:rgba(255,255,255,.45)}
`

export default function FlipSections() {
  const wrapRef = useRef(null)
  const cardRefs = useRef([])

  useEffect(() => {
    const ctx = gsap.context(() => {
      cardRefs.current.forEach((card) => {
        if (!card) return
        gsap.to(card, {
          opacity: 1,
          rotateX: 0,
          duration: 0.7,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: card,
            start: 'top 85%',
            toggleActions: 'play none none none',
          },
        })
      })
    }, wrapRef)

    return () => ctx.revert()
  }, [])

  return (
    <div ref={wrapRef} className="fp-wrap">
      <style>{css}</style>
      <div className="fp-hero">
        <div className="fp-eyebrow">Principles</div>
        <h2 className="fp-hero-h">Cards that flip<br/>into view on scroll.</h2>
      </div>
      <div className="fp-cards">
        {CARDS.map((c, i) => (
          <div
            key={i}
            ref={(el) => cardRefs.current[i] = el}
            className="fp-card"
            style={{ '--bg': c.bg, '--border': c.border + '55' }}
          >
            <div className="fp-tag" style={{ color: c.accent }}>{c.num} — {c.tag}</div>
            <div className="fp-title">{c.title}</div>
            <p className="fp-body">{c.body}</p>
          </div>
        ))}
      </div>
    </div>
  )
}
