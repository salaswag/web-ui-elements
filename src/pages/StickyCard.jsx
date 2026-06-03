import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import DemoChrome from '../components/DemoChrome.jsx'
import './sticky-card.css'

gsap.registerPlugin(ScrollTrigger)

const TABS = ['Prep', 'Transcript', 'Notes', 'Summary']

const stages = [
  {
    eyebrow: 'Before the meeting',
    heading: 'Make the most of every conversation with pre-meeting briefs',
    sub: 'Walk in ready. Limitless pulls the agenda, attendees, and context before you join.',
  },
  {
    eyebrow: 'During the meeting',
    heading: 'Stay on top of every moment with accurate transcription',
    sub: 'A live, speaker-labeled transcript runs as you talk — no bot in the call.',
  },
  {
    eyebrow: 'No more note-taking',
    heading: 'Say goodbye to manually writing meeting notes',
    sub: 'Structured notes are generated automatically while you stay present.',
  },
  {
    eyebrow: 'After the meeting',
    heading: 'Be the most reliable teammate with useful summaries',
    sub: 'Key updates, decisions, and challenges — packaged the moment you hang up.',
  },
]

function CardContent({ stage }) {
  if (stage === 0)
    return (
      <div className="sc-pane">
        <div className="sc-pane-label">Agenda</div>
        <ul className="sc-agenda">
          <li>Q3 launch readiness review</li>
          <li>Open design blockers</li>
          <li>Pricing experiment results</li>
          <li>Next-step owners + dates</li>
        </ul>
      </div>
    )
  if (stage === 1)
    return (
      <div className="sc-pane">
        <div className="sc-pane-label">Live transcript</div>
        <div className="sc-transcript">
          <p><b>Maya</b> Let’s start with launch readiness.</p>
          <p><b>Dev</b> Backend is green, ship-ready by Thursday.</p>
          <p><b>Sam</b> One design blocker on the onboarding step…</p>
          <p className="sc-live"><b>Maya</b> Let’s assign an owner for that.</p>
        </div>
      </div>
    )
  if (stage === 2)
    return (
      <div className="sc-pane">
        <div className="sc-pane-label">Auto notes</div>
        <ul className="sc-notes">
          <li>Backend confirmed ship-ready by Thursday.</li>
          <li>Onboarding step has an open design blocker.</li>
          <li>Pricing experiment lifted conversion 8%.</li>
          <li>Owners assigned for each follow-up.</li>
        </ul>
      </div>
    )
  return (
    <div className="sc-pane">
      <div className="sc-summary-grid">
        <div>
          <div className="sc-pane-label">Key updates</div>
          <ul className="sc-notes">
            <li>Launch on track for Thursday.</li>
            <li>Pricing test +8% conversion.</li>
          </ul>
        </div>
        <div>
          <div className="sc-pane-label">Challenges</div>
          <ul className="sc-notes">
            <li>Onboarding blocker → Sam.</li>
            <li>Needs design sign-off.</li>
          </ul>
        </div>
      </div>
    </div>
  )
}

function CardActions({ stage }) {
  if (stage === 0)
    return (
      <div className="sc-actions">
        <button className="sc-btn sc-btn-primary">Join &amp; Record</button>
      </div>
    )
  if (stage === 1)
    return (
      <div className="sc-actions">
        <button className="sc-btn sc-btn-stop">Stop</button>
        <button className="sc-btn sc-btn-ghost">Pause</button>
      </div>
    )
  return null
}

function StatusPill({ stage }) {
  if (stage === 0) return <span className="sc-pill sc-pill-soon">In 5 min</span>
  if (stage === 1)
    return (
      <span className="sc-pill sc-pill-rec">
        <span className="sc-rec-dot" /> REC
      </span>
    )
  if (stage === 2) return <span className="sc-pill sc-pill-soon">Recording</span>
  return <span className="sc-pill sc-pill-ended">Ended</span>
}

export default function StickyCard() {
  const root = useRef(null)
  const [stage, setStage] = useState(0)

  useEffect(() => {
    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: '.sc-stage',
        start: 'top top',
        end: '+=1400',
        pin: '.sc-pin',
        scrub: 0.4,
        snap: {
          snapTo: [0, 1 / 3, 2 / 3, 1],
          duration: 0.3,
          ease: 'power1.inOut',
        },
        onUpdate: (self) => {
          const s = Math.round(self.progress * 3)
          setStage((prev) => (prev === s ? prev : s))
        },
      })
    }, root)
    return () => ctx.revert()
  }, [])

  return (
    <DemoChrome id="sticky-card">
    <div className="sc-page" ref={root}>
      <section className="sc-stage">
        <div className="sc-pin">
          {/* LEFT: text blocks cross-fade in sync with the card */}
          <div className="sc-text">
            {stages.map((st, i) => (
              <div className={`sc-text-block ${i === stage ? 'is-active' : ''}`} key={i}>
                <span className="eyebrow">{st.eyebrow}</span>
                <h2>{st.heading}</h2>
                <p>{st.sub}</p>
              </div>
            ))}
            <div className="sc-progress">
              {TABS.map((t, i) => (
                <span key={t} className={i === stage ? 'on' : ''} />
              ))}
            </div>
          </div>

          {/* RIGHT: pinned meeting card that morphs */}
          <div className="sc-card">
            <div className="sc-card-head">
              <div>
                <div className="sc-title-row">
                  <h3>Product Review</h3>
                  <StatusPill stage={stage} />
                </div>
                <div className="sc-time">2:00 – 2:30 PM</div>
              </div>
              <div className="sc-avatars">
                <span style={{ background: '#7c3aed' }}>M</span>
                <span style={{ background: '#2a7de1' }}>D</span>
                <span style={{ background: '#db2777' }}>S</span>
                <span className="sc-avatar-more">+2</span>
              </div>
            </div>

            <div className="sc-tabs">
              {TABS.map((t, i) => (
                <button
                  key={t}
                  className={`sc-tab ${i === stage ? 'on' : ''}`}
                  onClick={() => setStage(i)}
                >
                  {t}
                </button>
              ))}
              <span
                className="sc-tab-indicator"
                style={{ transform: `translateX(${stage * 100}%)` }}
              />
            </div>

            <div className="sc-content">
              {stages.map((_, i) => (
                <div
                  className={`sc-content-layer ${i === stage ? 'is-active' : ''}`}
                  key={i}
                >
                  <CardContent stage={i} />
                </div>
              ))}
            </div>

            <CardActions stage={stage} />
          </div>
        </div>
      </section>

      <div className="scroll-spacer">end of section</div>
    </div>
    </DemoChrome>
  )
}
