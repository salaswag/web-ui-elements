import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import DemoChrome from '../components/DemoChrome.jsx'
import './sticky-scroller.css'

gsap.registerPlugin(ScrollTrigger)

const features = [
  { name: 'Carbon belt', cap: 'Grease-free, 30k km', grad: 'linear-gradient(135deg,#1f2937,#4b5563)' },
  { name: 'Wireless phone charger', cap: 'Top up as you ride', grad: 'linear-gradient(135deg,#0f766e,#14b8a6)' },
  { name: 'Removable battery', cap: '70 km range', grad: 'linear-gradient(135deg,#7c3aed,#a78bfa)' },
  { name: 'Integrated lights', cap: 'Auto day & night', grad: 'linear-gradient(135deg,#b45309,#f59e0b)' },
  { name: 'Auto-lock', cap: 'Locks as you step away', grad: 'linear-gradient(135deg,#1e3a8a,#3b82f6)' },
  { name: 'Theft alerts', cap: 'Real-time on your phone', grad: 'linear-gradient(135deg,#991b1b,#ef4444)', alert: true },
  { name: 'Crash detection', cap: 'Calls help automatically', grad: 'linear-gradient(135deg,#374151,#9ca3af)' },
  { name: 'Ride statistics', cap: 'Every ride, logged', grad: 'linear-gradient(135deg,#065f46,#34d399)' },
  { name: 'Find My Bike', cap: 'GPS to the last metre', grad: 'linear-gradient(135deg,#5b21b6,#8b5cf6)' },
]

const ITEM_H = 58

export default function StickyScroller() {
  const root = useRef(null)
  const [active, setActive] = useState(0)

  useEffect(() => {
    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: '.ss-stage',
        start: 'top top',
        end: '+=1500',
        pin: '.ss-pin',
        scrub: 0.4,
        onUpdate: (self) => {
          const i = Math.min(features.length - 1, Math.floor(self.progress * features.length))
          setActive((p) => (p === i ? p : i))
        },
      })
    }, root)
    return () => ctx.revert()
  }, [])

  return (
    <DemoChrome id="sticky-scroller">
      <div className="ss-page" ref={root}>
        <section className="ss-stage">
          <div className="ss-pin">
            <div className="ss-grid">
              <div className="ss-left">
                <span className="eyebrow">Built in</span>
                <div className="ss-list-window">
                  <ul
                    className="ss-list"
                    style={{ transform: `translateY(calc(50% - ${(active + 0.5) * ITEM_H}px))` }}
                  >
                    {features.map((f, i) => (
                      <li key={f.name} className={i === active ? 'on' : ''} style={{ height: ITEM_H }}>
                        {f.name}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="ss-media">
                {features.map((f, i) => (
                  <div
                    key={f.name}
                    className={`ss-panel ${i === active ? 'on' : ''}`}
                    style={{ background: f.grad }}
                  >
                    <span className="ss-panel-name">{f.name}</span>
                    {f.alert && (
                      <div className="ss-alert">
                        <strong>Movement detected</strong>
                        <span>Not you? Track your bike →</span>
                      </div>
                    )}
                    <span className="ss-cap">{f.cap}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
        <div className="scroll-spacer">end</div>
      </div>
    </DemoChrome>
  )
}
