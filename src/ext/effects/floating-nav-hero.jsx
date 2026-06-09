// Floating Nav Hero — nav bar starts transparent, gains backdrop-blur + border on scroll.
// Vanilla JS IntersectionObserver. Universal SaaS pattern.
import { useEffect, useRef } from 'react'

const NAV_LINKS = ['How it works', 'Systems', 'Pricing', 'About']

const css = `
*{box-sizing:border-box;margin:0;padding:0}
.fnh-root{font-family:Inter,system-ui,sans-serif;background:#07090f}
/* nav */
.fnh-nav{
  position:fixed;top:0;left:0;right:0;z-index:100;
  display:flex;align-items:center;justify-content:space-between;
  padding:18px 40px;
  transition:background .3s,border-color .3s,backdrop-filter .3s,box-shadow .3s;
  border-bottom:1px solid transparent;
}
.fnh-nav.stuck{
  background:rgba(7,9,15,.82);
  backdrop-filter:blur(16px);-webkit-backdrop-filter:blur(16px);
  border-bottom-color:rgba(255,255,255,.08);
  box-shadow:0 1px 24px rgba(0,0,0,.3);
}
.fnh-logo{
  font-size:16px;font-weight:800;color:#eaf2f3;letter-spacing:-.02em;
  display:flex;align-items:center;gap:8px;
}
.fnh-logo-icon{
  width:26px;height:26px;border-radius:7px;
  background:linear-gradient(135deg,#7c3aed,#22d3ee);
  display:flex;align-items:center;justify-content:center;font-size:13px;
}
.fnh-links{display:flex;align-items:center;gap:28px}
.fnh-link{
  font-size:13.5px;font-weight:500;color:rgba(234,242,243,.52);
  text-decoration:none;transition:color .15s;cursor:pointer;
}
.fnh-link:hover{color:#eaf2f3}
.fnh-cta{
  padding:8px 18px;border-radius:7px;border:none;cursor:pointer;
  background:#22d3ee;color:#07090f;font-weight:700;font-size:13px;
  transition:opacity .15s;
}
.fnh-cta:hover{opacity:.85}
/* hero */
.fnh-hero{
  height:100vh;display:flex;flex-direction:column;
  align-items:center;justify-content:center;
  padding:0 24px;text-align:center;
}
.fnh-eyebrow{
  font-size:11px;font-weight:700;letter-spacing:.18em;text-transform:uppercase;
  color:#22d3ee;margin-bottom:16px;
}
.fnh-h1{
  font-size:clamp(44px,6vw,88px);font-weight:900;letter-spacing:-.05em;
  line-height:.94;color:#eaf2f3;margin-bottom:20px;
}
.fnh-p{font-size:17px;color:rgba(234,242,243,.4);max-width:480px;line-height:1.65;margin-bottom:40px}
.fnh-btn{
  padding:14px 32px;border-radius:9px;border:none;cursor:pointer;
  background:#22d3ee;color:#07090f;font-weight:800;font-size:15px;
  transition:opacity .15s,transform .15s;
}
.fnh-btn:hover{opacity:.88;transform:translateY(-1px)}
/* scroll area below hero */
.fnh-below{
  min-height:80vh;display:flex;align-items:center;justify-content:center;
  padding:80px 24px;text-align:center;
  border-top:1px solid rgba(255,255,255,.06);
}
.fnh-below p{font-size:20px;font-weight:600;color:rgba(234,242,243,.3);max-width:400px;line-height:1.6}
.fnh-sentinel{position:absolute;top:80px;left:0;right:0;height:1px;pointer-events:none}
@media(max-width:640px){.fnh-links{display:none}}
`

export default function FloatingNavHero() {
  const navRef = useRef(null)
  const sentinelRef = useRef(null)

  useEffect(() => {
    const nav = navRef.current
    const sentinel = sentinelRef.current
    if (!nav || !sentinel) return
    const obs = new IntersectionObserver(([entry]) => {
      nav.classList.toggle('stuck', !entry.isIntersecting)
    }, { threshold: 0 })
    obs.observe(sentinel)
    return () => obs.disconnect()
  }, [])

  return (
    <div className="fnh-root">
      <style>{css}</style>
      <nav ref={navRef} className="fnh-nav">
        <div className="fnh-logo">
          <div className="fnh-logo-icon">✦</div>
          Atlas
        </div>
        <div className="fnh-links">
          {NAV_LINKS.map(l => <span key={l} className="fnh-link">{l}</span>)}
        </div>
        <button className="fnh-cta">Book a call</button>
      </nav>
      <div className="fnh-hero">
        <div ref={sentinelRef} className="fnh-sentinel" />
        <div className="fnh-eyebrow">Scroll down to see it</div>
        <h1 className="fnh-h1">Nav appears<br />on scroll.</h1>
        <p className="fnh-p">
          Starts fully transparent. As you scroll past the top of the hero,
          it gains backdrop-blur, border, and shadow — zero flicker.
        </p>
        <button className="fnh-btn">Try it →</button>
      </div>
      <div className="fnh-below">
        <p>Nav is now frosted. Scroll back up and it disappears again.</p>
      </div>
    </div>
  )
}
