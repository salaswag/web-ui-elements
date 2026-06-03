import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import DemoChrome from '../components/DemoChrome.jsx'
import './tablet-tabs.css'

gsap.registerPlugin(ScrollTrigger)

const tabs = ['Home', 'Services', 'Action Plan', 'Data', 'Doctors']
const headingWords = 'The most complete picture of your health you’ve ever had'.split(' ')

function Screen({ tab }) {
  if (tab === 0)
    return (
      <div className="tt-screen-grid">
        <div className="tt-tile big">Health Score <b>92</b></div>
        <div className="tt-tile">Resting HR<br /><b>54</b></div>
        <div className="tt-tile">Sleep<br /><b>7h 48m</b></div>
        <div className="tt-tile wide">VO₂ Max trending up ↗</div>
      </div>
    )
  if (tab === 1)
    return (
      <div className="tt-screen-grid">
        {['Bloodwork', 'Imaging', 'Genetics', 'Coaching'].map((s) => (
          <div className="tt-tile" key={s}>{s}</div>
        ))}
      </div>
    )
  if (tab === 2)
    return (
      <div className="tt-screen-list">
        {['Cut LDL by 20%', 'Add Zone-2 cardio 3×/wk', 'Vitamin D → 50 ng/mL'].map((s) => (
          <div className="tt-row" key={s}><span className="tt-dot" />{s}</div>
        ))}
      </div>
    )
  if (tab === 3)
    return (
      <div className="tt-screen-chart">
        {[40, 65, 52, 80, 72, 90, 84].map((h, i) => (
          <span key={i} style={{ height: `${h}%` }} />
        ))}
      </div>
    )
  return (
    <div className="tt-screen-grid">
      {['Dr. Lee', 'Dr. Ortiz', 'Dr. Singh', 'Dr. Park'].map((s) => (
        <div className="tt-tile doc" key={s}><span className="tt-ava" />{s}</div>
      ))}
    </div>
  )
}

export default function TabletTabs() {
  const root = useRef(null)
  const tabletRef = useRef(null)
  const wordRefs = useRef([])
  const [tab, setTab] = useState(0)

  useEffect(() => {
    const total = headingWords.length
    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: '.tt-stage',
        start: 'top top',
        end: '+=1500', // short → lots of movement per scroll
        pin: '.tt-pin',
        scrub: 0.5,
        onUpdate: (self) => {
          const p = self.progress
          // SCROLL drives the active tab (not a timer)
          const i = Math.min(tabs.length - 1, Math.floor(p * tabs.length))
          setTab((prev) => (prev === i ? prev : i))
          // lively tablet movement: wander x/y + 3D tilt easing toward flat
          const t = tabletRef.current
          const x = Math.sin(p * Math.PI * 2) * 34
          const y = Math.cos(p * Math.PI * 1.6) * 22
          const ry = Math.sin(p * Math.PI * 2.2) * 12
          const rx = 16 * (1 - p) + Math.sin(p * Math.PI * 3) * 3
          t.style.transform = `translate(${x}px, ${y}px) rotateX(${rx}deg) rotateY(${ry}deg) scale(${0.9 + p * 0.12})`
          // heading fills grey -> black
          const front = p * (total + 1)
          wordRefs.current.forEach((el, idx) => el && (el.style.color = idx < front ? '#0f0f12' : '#cdcdd6'))
        },
      })
    }, root)
    return () => ctx.revert()
  }, [])

  return (
    <DemoChrome id="tablet-tabs">
      <div className="tt-page" ref={root}>
        <section className="tt-stage">
          <div className="tt-pin">
            <h1 className="tt-heading">
              {headingWords.map((w, i) => (
                <span key={i} ref={(el) => (wordRefs.current[i] = el)}>{w} </span>
              ))}
            </h1>

            <div className="tt-tablet" ref={tabletRef}>
              <div className="tt-bezel">
                <div className="tt-screen"><Screen tab={tab} /></div>
              </div>
            </div>

            <div className="tt-tabbar">
              <span className="tt-pill" style={{ transform: `translateX(${tab * 100}%)` }} />
              {tabs.map((t, i) => (
                <button key={t} className={i === tab ? 'on' : ''} onClick={() => setTab(i)}>{t}</button>
              ))}
            </div>
            <div className="tt-hint">scroll to walk the tabs ↓</div>
          </div>
        </section>
        <div className="scroll-spacer">end</div>
      </div>
    </DemoChrome>
  )
}
