import { useRef, useState } from 'react'
import { gsap } from 'gsap'
import DemoChrome from '../components/DemoChrome.jsx'
import './page-transition.css'

const scenes = [
  { name: 'Dashboard', bg: 'linear-gradient(135deg,#6d28d9,#a78bfa)' },
  { name: 'Reviews', bg: 'linear-gradient(135deg,#0284c7,#7dd3fc)' },
  { name: 'Bookings', bg: 'linear-gradient(135deg,#059669,#6ee7b7)' },
]

export default function PageTransition() {
  const overlay = useRef(null)
  const [scene, setScene] = useState(0)
  const [busy, setBusy] = useState(false)

  const run = (style) => {
    if (busy) return
    setBusy(true)
    const panels = overlay.current.querySelectorAll('.pt-panel')
    const next = (scene + 1) % scenes.length
    const tl = gsap.timeline({ onComplete: () => setBusy(false) })

    if (style === 'single') {
      gsap.set(panels, { display: 'none' })
      gsap.set(panels[0], { display: 'block', xPercent: -100, background: '#0f0f12' })
      tl.to(panels[0], { xPercent: 0, duration: 0.45, ease: 'power3.inOut' })
        .add(() => setScene(next))
        .to(panels[0], { xPercent: 100, duration: 0.45, ease: 'power3.inOut' }, '+=0.1')
    } else if (style === 'stack') {
      const colors = ['#6d28d9', '#0284c7', '#0f0f12']
      gsap.set(panels, { display: 'block', xPercent: -100 })
      panels.forEach((p, i) => (p.style.background = colors[i]))
      tl.to(panels, { xPercent: 0, duration: 0.4, ease: 'power3.inOut', stagger: 0.09 })
        .add(() => setScene(next))
        .to(panels, { xPercent: 100, duration: 0.4, ease: 'power3.inOut', stagger: 0.09 }, '+=0.1')
    } else {
      // center-split
      gsap.set(panels, { display: 'none' })
      gsap.set([panels[0], panels[1]], { display: 'block', background: '#0f0f12' })
      gsap.set(panels[0], { top: 0, height: '50%', yPercent: -100, xPercent: 0 })
      gsap.set(panels[1], { top: '50%', height: '50%', yPercent: 100, xPercent: 0 })
      tl.to([panels[0], panels[1]], { yPercent: 0, duration: 0.45, ease: 'power3.inOut' })
        .add(() => setScene(next))
        .to(panels[0], { yPercent: -100, duration: 0.45, ease: 'power3.inOut' }, '+=0.1')
        .to(panels[1], { yPercent: 100, duration: 0.45, ease: 'power3.inOut' }, '<')
        .set(panels, { top: 0, height: '100%' })
    }
  }

  return (
    <DemoChrome id="page-transition">
      <div className="pt-page">
        <div className="pt-scene" style={{ background: scenes[scene].bg }}>
          <span className="pt-scene-eyebrow">now showing</span>
          <h1 className="pt-scene-name">{scenes[scene].name}</h1>
        </div>

        <div className="pt-controls">
          <span className="eyebrow" style={{ color: '#fff' }}>Global · add-anywhere</span>
          <p>Trigger a transition — the panel(s) wipe across, the “page” swaps behind, then reveal.</p>
          <div className="pt-btns">
            <button onClick={() => run('single')}>Single wipe</button>
            <button onClick={() => run('stack')}>Stacked stagger</button>
            <button onClick={() => run('split')}>Center-split</button>
          </div>
        </div>

        <div className="pt-overlay" ref={overlay}>
          <span className="pt-panel" /><span className="pt-panel" /><span className="pt-panel" />
        </div>
      </div>
    </DemoChrome>
  )
}
