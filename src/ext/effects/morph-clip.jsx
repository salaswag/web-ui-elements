// Morph Clip — a circle clip-path at the center of each section morphs to a full-
// screen rectangle on scroll, revealing the next section. No JS animation lib needed.
import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
gsap.registerPlugin(ScrollTrigger)

const SECTIONS = [
  {
    heading: 'Compress.', sub: 'Start as small as possible. A seed, not a forest.',
    bg: '#0b0b12', revealBg: '#1e1b4b', text: '#fff',
  },
  {
    heading: 'Expand.', sub: 'Let the idea breathe. Fill every corner of the canvas.',
    bg: '#1e1b4b', revealBg: '#0c4a6e', text: '#fff',
  },
  {
    heading: 'Release.', sub: 'Once it\'s ready, it flows into the world on its own.',
    bg: '#0c4a6e', revealBg: '#064e3b', text: '#fff',
  },
  {
    heading: 'Root.', sub: 'The best things grow quietly and last longer than expected.',
    bg: '#064e3b', revealBg: null, text: '#fff',
  },
]

const css = `
*{box-sizing:border-box;margin:0;padding:0}
.mc-wrap{font-family:Inter,system-ui,sans-serif}
.mc-block{height:220vh}
.mc-sticky{
  position:sticky;top:0;height:100vh;overflow:hidden;
  display:flex;align-items:center;justify-content:center;
}
.mc-content{
  position:relative;z-index:2;text-align:center;padding:40px;
}
.mc-h{
  font-size:clamp(52px,9vw,108px);font-weight:900;letter-spacing:-.05em;
  line-height:.9;color:#fff;margin-bottom:18px;
}
.mc-p{font-size:17px;line-height:1.6;opacity:.55;color:#fff;max-width:420px;margin:0 auto}
.mc-reveal{
  position:absolute;inset:0;z-index:1;
  clip-path:circle(0% at 50% 50%);
}
`

export default function MorphClip() {
  const wrapRef = useRef(null)
  const blockRefs = useRef([])
  const revealRefs = useRef([])

  useEffect(() => {
    const ctx = gsap.context(() => {
      SECTIONS.forEach((s, i) => {
        if (!s.revealBg || !revealRefs.current[i]) return

        gsap.fromTo(
          revealRefs.current[i],
          { clipPath: 'circle(0% at 50% 50%)' },
          {
            clipPath: 'circle(150% at 50% 50%)',
            ease: 'none',
            scrollTrigger: {
              trigger: blockRefs.current[i],
              start: 'top top',
              end: '+=700',
              scrub: 1,
              pin: true,
            },
          }
        )
      })
    }, wrapRef)

    return () => ctx.revert()
  }, [])

  return (
    <div ref={wrapRef} className="mc-wrap">
      <style>{css}</style>
      {SECTIONS.map((s, i) => (
        <div
          key={i}
          ref={(el) => blockRefs.current[i] = el}
          className="mc-block"
          style={{ background: s.bg }}
        >
          <div className="mc-sticky">
            <div className="mc-content">
              <h2 className="mc-h">{s.heading}</h2>
              <p className="mc-p">{s.sub}</p>
            </div>
            {s.revealBg && (
              <div
                ref={(el) => revealRefs.current[i] = el}
                className="mc-reveal"
                style={{ background: s.revealBg }}
              />
            )}
          </div>
        </div>
      ))}
    </div>
  )
}
