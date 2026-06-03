import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import DemoChrome from '../components/DemoChrome.jsx'
import './word-fill.css'

gsap.registerPlugin(ScrollTrigger)

// Sentence split into words. `icon` anchors a platform icon above that word.
const words = [
  { t: 'A' },
  { t: 'web', icon: 'web' },
  { t: 'app,' },
  { t: 'Mac', icon: 'mac' },
  { t: 'app,' },
  { t: 'Windows', icon: 'win' },
  { t: 'app,' },
  { t: 'and' },
  { t: 'a' },
  { t: 'wearable', icon: 'wear' },
  { t: 'to' },
  { t: 'power' },
  { t: 'your' },
  { t: 'personalized' },
  { t: 'AI.' },
]

function Icon({ kind }) {
  if (kind === 'web')
    return (
      <span className="wf-icon" data-kind="web">
        <svg viewBox="0 0 40 40" width="40" height="40">
          <rect x="2" y="2" width="36" height="36" rx="11" fill="#7c3aed" />
          <path
            d="M20 11l2.2 5.1 5.5.4-4.2 3.6 1.3 5.4L20 23l-4.8 2.9 1.3-5.4-4.2-3.6 5.5-.4z"
            fill="#fff"
          />
        </svg>
      </span>
    )
  if (kind === 'mac')
    return (
      <span className="wf-icon" data-kind="mac">
        <svg viewBox="0 0 40 40" width="40" height="40">
          <rect x="2" y="2" width="36" height="36" rx="11" fill="#2a7de1" />
          <rect x="13" y="13" width="6" height="9" rx="3" fill="#fff" />
          <rect x="21" y="13" width="6" height="9" rx="3" fill="#dceafe" />
          <path d="M13 26c2 2.6 12 2.6 14 0" stroke="#fff" strokeWidth="2.4" fill="none" strokeLinecap="round" />
        </svg>
      </span>
    )
  if (kind === 'win')
    return (
      <span className="wf-icon" data-kind="win">
        <svg viewBox="0 0 40 40" width="40" height="40">
          <rect x="6" y="6" width="13" height="13" rx="2" fill="#c026d3" />
          <rect x="21" y="6" width="13" height="13" rx="2" fill="#a21caf" />
          <rect x="6" y="21" width="13" height="13" rx="2" fill="#a21caf" />
          <rect x="21" y="21" width="13" height="13" rx="2" fill="#c026d3" />
        </svg>
      </span>
    )
  return (
    <span className="wf-icon" data-kind="wear">
      <svg viewBox="0 0 40 40" width="40" height="40">
        <circle cx="20" cy="20" r="13" fill="#e7e7ee" stroke="#c7c7d2" strokeWidth="2" />
        <circle cx="20" cy="20" r="5" fill="#b4b4bd" />
      </svg>
    </span>
  )
}

export default function WordFill() {
  const root = useRef(null)
  const wordRefs = useRef([])
  const iconRefs = useRef({})

  useEffect(() => {
    const total = words.length
    const setters = wordRefs.current.map((el) =>
      el ? gsap.quickSetter(el, 'color') : null,
    )

    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: '.wf-stage',
        start: 'top top',
        end: '+=1800',
        pin: '.wf-inner',
        scrub: 0.4,
        onUpdate: (self) => {
          const front = self.progress * (total + 1) // words turned black
          wordRefs.current.forEach((el, i) => {
            if (!el) return
            const lit = i < front
            setters[i] && setters[i](lit ? '#0f0f12' : '#cfcfd8')
            el.style.fontWeight = lit ? 800 : 700
          })
          // icons: visible while the fill front is passing the anchor word
          words.forEach((w, i) => {
            if (!w.icon) return
            const node = iconRefs.current[w.icon]
            if (!node) return
            const d = front - i
            const visible = d > -0.4 && d < 2.2
            gsap.to(node, {
              opacity: visible ? 1 : 0,
              scale: visible ? 1 : 0.8,
              duration: 0.2,
              overwrite: true,
            })
          })
        },
      })
    }, root)
    return () => ctx.revert()
  }, [])

  return (
    <DemoChrome id="word-fill">
    <div className="wf-page" ref={root}>
      <section className="wf-stage">
        <div className="wf-inner">
          <p className="wf-sentence">
            {words.map((w, i) => (
              <span
                className="wf-word"
                key={i}
                ref={(el) => (wordRefs.current[i] = el)}
              >
                {w.icon && (
                  <span
                    className="wf-icon-slot"
                    ref={(el) => (iconRefs.current[w.icon] = el)}
                  >
                    <Icon kind={w.icon} />
                  </span>
                )}
                {w.t}
                {i < words.length - 1 ? ' ' : ''}
              </span>
            ))}
          </p>
          <div className="wf-hint">scroll ↓</div>
        </div>
      </section>
    </div>
    </DemoChrome>
  )
}
