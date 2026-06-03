import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import DemoChrome from '../components/DemoChrome.jsx'
import './perspective-flatten.css'

gsap.registerPlugin(ScrollTrigger)

const words = 'The joyful productivity app. Schedule time for todos, events, and contacts.'.split(' ')
const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
const todos = ['Series to watch', 'Mark of Darkness', 'Scenes from a Marriage', 'Books to read', 'Refactor sidebar']
// events: [dayIndex, top%, height%, color, label]
const events = [
  [0, 6, 12, '#c4b5fd', 'Standup'],
  [0, 30, 22, '#93c5fd', 'Deep work'],
  [1, 12, 16, '#6ee7b7', 'Design sync'],
  [1, 54, 12, '#fcd34d', 'Lunch'],
  [2, 8, 14, '#f9a8d4', '1:1 Sam'],
  [2, 40, 20, '#86efac', 'Review'],
  [3, 18, 30, '#a5b4fc', 'Focus block'],
  [4, 10, 12, '#fca5a5', 'Ship'],
  [4, 36, 16, '#c4b5fd', 'Demo'],
  [5, 22, 14, '#fdba74', 'Brunch'],
  [6, 30, 18, '#7dd3fc', 'Plan week'],
]

export default function PerspectiveFlatten() {
  const root = useRef(null)
  const wordRefs = useRef([])
  const shotRef = useRef(null)

  useEffect(() => {
    const total = words.length
    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: '.pf-stage',
        start: 'top top',
        end: '+=1100', // short → fast flatten
        pin: '.pf-pin',
        scrub: 0.5,
        onUpdate: (self) => {
          const p = self.progress
          const t = gsap.utils.clamp(0, 1, p / 0.7)
          const shot = shotRef.current
          shot.style.transform = `rotateX(${(1 - t) * 40}deg) scale(${0.82 + t * 0.18})`
          shot.style.filter = `blur(${(1 - t) * 12}px)`
          const front = p * (total + 1)
          wordRefs.current.forEach((el, i) => el && (el.style.color = i < front ? '#0f0f12' : '#cdcdd6'))
        },
      })
    }, root)
    return () => ctx.revert()
  }, [])

  return (
    <DemoChrome id="perspective-flatten">
      <div className="pf-page" ref={root}>
        <section className="pf-stage">
          <div className="pf-pin">
            <div className="pf-scene">
              {/* outer = scroll-controlled tilt/scale/blur; inner = perpetual idle hover */}
              <div className="pf-shot" ref={shotRef}>
                <div className="pf-float">
                  <div className="pf-app">
                    <aside className="pf-side">
                      <span className="pf-logo" />
                      <div className="pf-side-title">Todos</div>
                      {todos.map((t) => (
                        <label key={t} className="pf-todo"><span className="pf-check" />{t}</label>
                      ))}
                    </aside>
                    <div className="pf-cal">
                      <div className="pf-cal-head">
                        <span className="pf-month">March</span>
                        <div className="pf-avatars">
                          {['#7c3aed', '#2a7de1', '#db2777', '#059669'].map((c) => (
                            <span key={c} style={{ background: c }} />
                          ))}
                          <span className="pf-ava-more">+5</span>
                        </div>
                      </div>
                      <div className="pf-grid">
                        {days.map((d, di) => (
                          <div className="pf-day" key={d}>
                            <span className="pf-day-h">{d}</span>
                            <div className="pf-day-col">
                              {events.filter((e) => e[0] === di).map((e, i) => (
                                <div
                                  key={i}
                                  className="pf-event"
                                  style={{ top: `${e[1]}%`, height: `${e[2]}%`, background: e[3] }}
                                >
                                  {e[4]}
                                </div>
                              ))}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <h2 className="pf-heading">
              {words.map((w, i) => (
                <span key={i} ref={(el) => (wordRefs.current[i] = el)}>{w} </span>
              ))}
            </h2>
          </div>
        </section>
        <div className="scroll-spacer">end</div>
      </div>
    </DemoChrome>
  )
}
