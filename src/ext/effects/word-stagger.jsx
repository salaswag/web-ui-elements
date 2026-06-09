// Word Stagger Reveal — each heading splits into words and staggers up into view as
// the section enters the viewport. Inspired by GSAP SplitText / Codrops technique.
import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
gsap.registerPlugin(ScrollTrigger)

const BLOCKS = [
  {
    label: 'MOTION',
    headline: 'Make things move with intention.',
    body: 'Animation isn\'t decoration. It carries meaning, directs attention, and makes interactions feel alive.',
    bg: '#0b0b12', accent: '#7c3aed',
  },
  {
    label: 'RHYTHM',
    headline: 'Timing is everything in design.',
    body: 'The right easing curve turns a mechanical twitch into something that feels genuinely physical.',
    bg: '#0f0820', accent: '#a855f7',
  },
  {
    label: 'WEIGHT',
    headline: 'Heavy things should feel heavy.',
    body: 'Scroll-linked animation gives users a sense of inertia — the page responds to how fast they move.',
    bg: '#0a1020', accent: '#3b82f6',
  },
  {
    label: 'SILENCE',
    headline: 'Know when to stop animating.',
    body: 'The most elegant interactions are barely noticed. Restraint is as powerful as spectacle.',
    bg: '#0a0a0a', accent: '#9ca3af',
  },
]

const css = `
*{box-sizing:border-box;margin:0;padding:0}
.ws-wrap{font-family:Inter,system-ui,sans-serif}
.ws-section{
  min-height:100vh;display:flex;align-items:center;
  padding:80px 10vw;
}
.ws-inner{max-width:720px}
.ws-label{
  font-size:10px;font-weight:700;letter-spacing:.22em;text-transform:uppercase;
  margin-bottom:22px;
}
.ws-headline{
  font-size:clamp(44px,6vw,80px);font-weight:900;letter-spacing:-.03em;
  line-height:1.05;color:#fff;margin-bottom:24px;overflow:hidden;
}
.ws-word{
  display:inline-block;
  transform:translateY(110%);opacity:0;
  margin-right:.22em;
}
.ws-body{font-size:18px;line-height:1.7;opacity:.5;color:#fff;max-width:560px}
`

export default function WordStagger() {
  const wrapRef  = useRef(null)
  const headRefs = useRef([])
  const bodyRefs = useRef([])

  useEffect(() => {
    const ctx = gsap.context(() => {
      headRefs.current.forEach((headEl, i) => {
        if (!headEl) return
        const words = headEl.querySelectorAll('.ws-word')
        gsap.timeline({
          scrollTrigger: {
            trigger: headEl,
            start: 'top 82%',
            toggleActions: 'play none none none',
          }
        })
          .to(words, {
            y: 0,
            opacity: 1,
            duration: 0.65,
            stagger: 0.07,
            ease: 'power3.out',
          })
          .from(bodyRefs.current[i], {
            y: 20,
            opacity: 0,
            duration: 0.55,
            ease: 'power2.out',
          }, '-=0.2')
      })
    }, wrapRef)

    return () => ctx.revert()
  }, [])

  return (
    <div ref={wrapRef} className="ws-wrap">
      <style>{css}</style>
      {BLOCKS.map((b, i) => (
        <div key={i} className="ws-section" style={{ background: b.bg }}>
          <div className="ws-inner">
            <div className="ws-label" style={{ color: b.accent }}>{b.label}</div>
            <h2
              ref={(el) => headRefs.current[i] = el}
              className="ws-headline"
              aria-label={b.headline}
            >
              {b.headline.split(' ').map((w, wi) => (
                <span key={wi} className="ws-word">{w}</span>
              ))}
            </h2>
            <p ref={(el) => bodyRefs.current[i] = el} className="ws-body">{b.body}</p>
          </div>
        </div>
      ))}
    </div>
  )
}
