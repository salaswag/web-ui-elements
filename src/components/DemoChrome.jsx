import { useState } from 'react'
import { byId } from '../prompts.js'
import SiteSidebar from './SiteSidebar.jsx'
import './demo-chrome.css'

const cxLabel = { easy: 'Easy', mod: 'Moderate', high: 'High' }
const inIframe = typeof window !== 'undefined' && window.self !== window.top

export default function DemoChrome({ id, children }) {
  const [open, setOpen] = useState(false)
  const [copied, setCopied] = useState(false)
  const demo = byId[id]

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(demo.prompt)
      setCopied(true)
      setTimeout(() => setCopied(false), 1600)
    } catch {
      /* clipboard blocked — ignore */
    }
  }

  // inside the hub's preview iframe: render only the effect, no chrome
  if (inIframe) return children

  return (
    <>
      {children}
      <SiteSidebar />

      <button className="dc-open" onClick={() => setOpen(true)}>
        <span className="dc-open-mark">{'</>'}</span> View prompt
      </button>

      <div className={`dc-scrim ${open ? 'show' : ''}`} onClick={() => setOpen(false)} />
      <aside className={`dc-panel ${open ? 'show' : ''}`} aria-hidden={!open}>
        <div className="dc-panel-head">
          <div className="dc-panel-meta">
            <span className="dc-num">Demo {demo.num}{demo.variantLabel ? ` · ${demo.variantLabel}` : ''}</span>
            <span className={`dc-cx cx-${demo.complexity}`}>{cxLabel[demo.complexity]}</span>
          </div>
          <button className="dc-close" onClick={() => setOpen(false)} aria-label="Close">×</button>
        </div>

        <h2 className="dc-panel-title">{demo.title}</h2>
        <div className="dc-panel-sub">
          <span>↳ {demo.video}</span>
          <span className="dc-lib">{demo.library}</span>
        </div>

        <div className="dc-prompt-bar">
          <span>PROMPT</span>
          <button className="dc-copy" onClick={copy}>{copied ? '✓ Copied' : 'Copy'}</button>
        </div>
        <pre className="dc-prompt">{demo.prompt}</pre>
      </aside>
    </>
  )
}
