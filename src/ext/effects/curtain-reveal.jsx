// Curtain Reveal — a layered overlay wipes upward on scroll to reveal each new section.
// Three staggered color curtains create a theatrical reveal. GSAP ScrollTrigger.
import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
gsap.registerPlugin(ScrollTrigger)

const SECTIONS = [
  {
    heading: 'Act I', body: 'The stage is set. Everything before this was preparation.',
    bg: '#0b0b12', text: '#fff',
    curtains: ['#1e1b4b', '#312e81', '#7c3aed'],
  },
  {
    heading: 'Act II', body: 'Conflict emerges. Nothing stays the same for long.',
    bg: '#7c3aed', text: '#fff',
    curtains: ['#1e3a5f', '#1d4ed8', '#0ea5e9'],
  },
  {
    heading: 'Act III', body: 'Resolution arrives. The work becomes what it was meant to be.',
    bg: '#0ea5e9', text: '#fff',
    curtains: ['#064e3b', '#065f46', '#10b981'],
  },
  {
    heading: 'Finale', body: 'Curtain call. Begin again — but different.',
    bg: '#10b981', text: '#fff',
    curtains: [],
  },
]

const css = `
*{box-sizing:border-box;margin:0;padding:0}
.cr-wrap{font-family:Inter,system-ui,sans-serif}
.cr-block{height:250vh}
.cr-sticky{
  position:sticky;top:0;height:100vh;overflow:hidden;
  display:flex;align-items:center;justify-content:center;
}
.cr-content{
  position:relative;z-index:2;text-align:center;color:#fff;padding:40px;
}
.cr-eyebrow{
  font-size:10px;font-weight:700;letter-spacing:.22em;text-transform:uppercase;
  opacity:.45;margin-bottom:20px;
}
.cr-h{
  font-size:clamp(56px,10vw,120px);font-weight:900;letter-spacing:-.04em;
  line-height:.9;margin-bottom:22px;
}
.cr-p{font-size:17px;line-height:1.65;opacity:.6;max-width:460px;margin:0 auto}
.cr-curtains{position:absolute;inset:0;z-index:3;pointer-events:none}
.cr-curtain{
  position:absolute;inset:0;transform:translateY(0);
}
`

export default function CurtainReveal() {
  const wrapRef = useRef(null)
  const blockRefs = useRef([])
  const curtainContainerRefs = useRef([])

  useEffect(() => {
    const ctx = gsap.context(() => {
      SECTIONS.forEach((s, i) => {
        if (!s.curtains.length || !curtainContainerRefs.current[i]) return
        const curtains = curtainContainerRefs.current[i].children

        gsap.timeline({
          scrollTrigger: {
            trigger: blockRefs.current[i],
            start: 'top top',
            end: '+=800',
            scrub: 1,
            pin: true,
          },
        })
          // Three curtains wipe up in sequence
          .to(curtains[2], { yPercent: -100, ease: 'none' }, 0)
          .to(curtains[1], { yPercent: -100, ease: 'none' }, 0.15)
          .to(curtains[0], { yPercent: -100, ease: 'none' }, 0.3)
      })
    }, wrapRef)

    return () => ctx.revert()
  }, [])

  return (
    <div ref={wrapRef} className="cr-wrap">
      <style>{css}</style>
      {SECTIONS.map((s, i) => (
        <div key={i} ref={(el) => blockRefs.current[i] = el} className="cr-block" style={{ background: s.bg }}>
          <div className="cr-sticky">
            <div className="cr-content">
              <div className="cr-eyebrow">Section {i + 1} of {SECTIONS.length}</div>
              <h2 className="cr-h">{s.heading}</h2>
              <p className="cr-p">{s.body}</p>
            </div>
            {s.curtains.length > 0 && (
              <div ref={(el) => curtainContainerRefs.current[i] = el} className="cr-curtains">
                {s.curtains.map((c, ci) => (
                  <div key={ci} className="cr-curtain" style={{ background: c }} />
                ))}
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  )
}
