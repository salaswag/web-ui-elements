import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import DemoChrome from '../components/DemoChrome.jsx'
import './velocity-skew.css'

const projects = [
  { t: 'Scavolini sthlm', y: '2024', g: 'linear-gradient(135deg,#3b3b4f,#0b0b12)', c: '#ef4444' },
  { t: 'Will Cornelius', y: '2023', g: 'linear-gradient(135deg,#1f3a3a,#07120f)', c: '#14b8a6' },
  { t: 'Nordic Atlas', y: '2023', g: 'linear-gradient(135deg,#3a2a1f,#120b07)', c: '#f59e0b' },
  { t: 'Mono Studio', y: '2022', g: 'linear-gradient(135deg,#2a2040,#0d0a16)', c: '#8b5cf6' },
]

export default function VelocitySkew() {
  const root = useRef(null)
  const [wipe, setWipe] = useState(null)

  useEffect(() => {
    let prev = window.scrollY
    let skew = 0
    const tick = () => {
      const cur = window.scrollY
      const target = gsap.utils.clamp(-9, 9, (cur - prev) * 0.35)
      prev = cur
      skew += (target - skew) * 0.12
      if (Math.abs(skew) < 0.01) skew = 0
      gsap.set('.vs-skew', { skewY: skew })
    }
    gsap.ticker.add(tick)
    return () => gsap.ticker.remove(tick)
  }, [])

  const open = (p) => {
    if (wipe) return
    setWipe(p.c)
    const tl = gsap.timeline({ onComplete: () => setWipe(null) })
    tl.fromTo('.vs-wipe', { xPercent: -100 }, { xPercent: 0, duration: 0.5, ease: 'power3.inOut' })
      .to('.vs-wipe', { xPercent: 100, duration: 0.5, ease: 'power3.inOut' }, '+=0.25')
  }

  return (
    <DemoChrome id="velocity-skew">
      <div className="vs-page" ref={root}>
        <header className="vs-head">
          <span className="eyebrow vs-eye">Selected work</span>
          <p className="vs-hint">scroll fast — the frames shear with your velocity</p>
        </header>

        <div className="vs-gallery">
          {projects.map((p) => (
            <button className="vs-item" key={p.t} onClick={() => open(p)}>
              <div className="vs-skew vs-frame" style={{ background: p.g }} />
              <span className="vs-skew vs-title">{p.t}</span>
              <span className="vs-year">{p.y}</span>
              <span className="vs-arrow">→</span>
            </button>
          ))}
        </div>

        <div className="scroll-spacer vs-foot">end</div>
        {wipe && <div className="vs-wipe" style={{ background: wipe }} />}
      </div>
    </DemoChrome>
  )
}
