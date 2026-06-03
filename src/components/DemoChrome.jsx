import { useState } from 'react'
import { byId } from '../prompts.js'
import { getExtFiles } from '../ext/registry.js'
import SiteSidebar from './SiteSidebar.jsx'
import './demo-chrome.css'

const cxLabel = { easy: 'Easy', mod: 'Moderate', high: 'High' }
const inIframe = typeof window !== 'undefined' && window.self !== window.top

export default function DemoChrome({ id, children }) {
  const [open, setOpen] = useState(false)
  const [copied, setCopied] = useState(false)
  const [fileIdx, setFileIdx] = useState(0)
  const demo = byId[id]

  if (inIframe || !demo) return children // chrome-less inside preview iframe / unknown

  const isExternal = demo.source === 'external'
  const files = isExternal ? (demo.ext ? getExtFiles(demo.ext) : demo.code || []) : []
  const copyText = async (t) => {
    try { await navigator.clipboard.writeText(t); setCopied(true); setTimeout(() => setCopied(false), 1600) } catch { /* ignore */ }
  }

  return (
    <>
      {children}
      <SiteSidebar />

      <button className="dc-open" onClick={() => setOpen(true)}>
        <span className="dc-open-mark">{'</>'}</span> {isExternal ? 'View code' : 'View prompt'}
      </button>

      <div className={`dc-scrim ${open ? 'show' : ''}`} onClick={() => setOpen(false)} />
      <aside className={`dc-panel ${open ? 'show' : ''}`} aria-hidden={!open}>
        <div className="dc-panel-head">
          <div className="dc-panel-meta">
            <span className="dc-num">{demo.num}{demo.variantLabel ? ` · ${demo.variantLabel}` : ''}</span>
            <span className={`dc-cx cx-${demo.complexity}`}>{cxLabel[demo.complexity]}</span>
          </div>
          <button className="dc-close" onClick={() => setOpen(false)} aria-label="Close">×</button>
        </div>

        <h2 className="dc-panel-title">{demo.title}</h2>
        <div className="dc-panel-sub">
          {isExternal
            ? <span>from <a href={demo.sourceUrl} target="_blank" rel="noreferrer" style={{ color: 'var(--purple)' }}>{demo.author} ↗</a></span>
            : <span>↳ {demo.video}</span>}
          <span className="dc-lib">{demo.library}</span>
        </div>

        {isExternal ? (
          <>
            <div className="dc-filetabs">
              {files.map((f, i) => (
                <button key={f.file} className={`dc-filetab ${i === fileIdx ? 'on' : ''}`} onClick={() => setFileIdx(i)}>{f.file}</button>
              ))}
              <button className="dc-copy" style={{ marginLeft: 'auto' }} onClick={() => copyText(files[fileIdx]?.content || '')}>{copied ? '✓ Copied' : 'Copy'}</button>
            </div>
            <pre className="dc-prompt">{files[fileIdx]?.content || 'See source link.'}</pre>
          </>
        ) : (
          <>
            <div className="dc-prompt-bar">
              <span>PROMPT</span>
              <button className="dc-copy" onClick={() => copyText(demo.prompt)}>{copied ? '✓ Copied' : 'Copy'}</button>
            </div>
            <pre className="dc-prompt">{demo.prompt}</pre>
          </>
        )}
      </aside>
    </>
  )
}
