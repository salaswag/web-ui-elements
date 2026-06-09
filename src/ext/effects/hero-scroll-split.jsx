// Hero Scroll Split — headline splits in half: top flies up, bottom flies down on scroll.
// GSAP ScrollTrigger scrub. Dramatic entrance for bold headlines.
import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
gsap.registerPlugin(ScrollTrigger)

const css = `
*{box-sizing:border-box;margin:0;padding:0}
.hss-root{font-family:Inter,system-ui,sans-serif;background:#000}
.hss-hero{
  height:100vh;display:flex;align-items:center;justify-content:center;
  overflow:hidden;position:relative;
}
/* split headline container */
.hss-text-wrap{text-align:center;padding:0 24px}
.hss-top{
  font-size:clamp(56px,9vw,140px);font-weight:900;letter-spacing:-.06em;
  line-height:.88;color:#fff;display:block;
  will-change:transform;
}
.hss-bot{
  font-size:clamp(56px,9vw,140px);font-weight:900;letter-spacing:-.06em;
  line-height:.88;color:#22d3ee;display:block;
  will-change:transform;
}
.hss-reveal{
  height:200vh;
  display:flex;align-items:flex-start;justify-content:center;
  padding-top:100vh;
}
.hss-below{
  max-width:540px;padding:0 24px;text-align:center;
}
.hss-h2{
  font-size:clamp(28px,4vw,48px);font-weight:800;letter-spacing:-.03em;
  color:#fff;margin-bottom:16px;
}
.hss-p{font-size:17px;color:rgba(255,255,255,.45);line-height:1.65;margin-bottom:32px}
.hss-cta{
  padding:13px 28px;border-radius:9px;border:none;cursor:pointer;
  background:#22d3ee;color:#000;font-weight:800;font-size:14px;
  transition:opacity .15s,transform .15s;
}
.hss-cta:hover{opacity:.88;transform:translateY(-1px)}
.hss-hint{
  position:absolute;bottom:28px;left:50%;transform:translateX(-50%);
  font-size:11px;letter-spacing:.14em;text-transform:uppercase;
  color:rgba(255,255,255,.22);animation:hss-bob 2s ease-in-out infinite;
}
@keyframes hss-bob{0%,100%{transform:translateX(-50%) translateY(0)}50%{transform:translateX(-50%) translateY(6px)}}
`

export default function HeroScrollSplit() {
  const topRef = useRef(null)
  const botRef = useRef(null)
  const heroRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: heroRef.current,
          start: 'top top',
          end: '+=80%',
          scrub: 1.2,
          pin: true,
        },
      })
      tl.to(topRef.current, { y: '-60%', opacity: 0, ease: 'power2.in' }, 0)
        .to(botRef.current, { y: '60%', opacity: 0, ease: 'power2.in' }, 0)
    }, heroRef)
    return () => ctx.revert()
  }, [])

  return (
    <div className="hss-root">
      <style>{css}</style>
      <div ref={heroRef} className="hss-hero">
        <div className="hss-text-wrap">
          <span ref={topRef} className="hss-top">Never</span>
          <span ref={botRef} className="hss-bot">miss a lead.</span>
        </div>
        <div className="hss-hint">↓ scroll</div>
      </div>
      <div className="hss-reveal">
        <div className="hss-below">
          <h2 className="hss-h2">The headline splits apart as you scroll.</h2>
          <p className="hss-p">Top half flies up, bottom half drops down — a dramatic reveal that draws the eye down the page.</p>
          <button className="hss-cta">See the effect</button>
        </div>
      </div>
    </div>
  )
}
