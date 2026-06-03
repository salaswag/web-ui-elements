import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { getTags, addTag, removeTag } from '../userTags.js'
import './preview-modal.css'

const cxLabel = { easy: 'Easy', mod: 'Moderate', high: 'High' }

export default function PreviewModal({ demo, onClose, onTagsChange }) {
  const [showPrompt, setShowPrompt] = useState(false)
  const [draft, setDraft] = useState('')
  const [copied, setCopied] = useState(false)
  const [fileIdx, setFileIdx] = useState(0)

  useEffect(() => {
    const onKey = (e) => e.key === 'Escape' && onClose()
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [onClose])

  if (!demo) return null
  const tags = getTags(demo.id)
  const isExternal = demo.source === 'external'
  const live = demo.live !== false && !!demo.route

  const submitTag = (e) => {
    e.preventDefault()
    if (draft.trim()) { addTag(demo.id, draft); setDraft(''); onTagsChange?.() }
  }
  const copyText = async (text) => {
    try { await navigator.clipboard.writeText(text); setCopied(true); setTimeout(() => setCopied(false), 1500) } catch { /* ignore */ }
  }

  const src = live ? `${window.location.origin}${window.location.pathname}#${demo.route}` : null
  const files = demo.code || []

  return (
    <div className="pv-scrim" onClick={onClose}>
      <div className="pv-modal" onClick={(e) => e.stopPropagation()}>
        <div className="pv-left">
          {live ? (
            <>
              <div className="pv-frame-bar">
                <span className="pv-dot r" /><span className="pv-dot y" /><span className="pv-dot g" />
                <span className="pv-frame-hint">live preview · scroll inside ↓</span>
              </div>
              <iframe className="pv-iframe" src={src} title={demo.title} />
            </>
          ) : (
            <>
              <div className="pv-filetabs">
                {files.length ? files.map((f, i) => (
                  <button key={f.file} className={`pv-filetab ${i === fileIdx ? 'on' : ''}`} onClick={() => setFileIdx(i)}>{f.file}</button>
                )) : <span className="pv-frame-hint">code</span>}
              </div>
              <pre className="pv-codeblock">{files[fileIdx]?.content || 'No snippet — see source link.'}</pre>
            </>
          )}
        </div>

        <div className="pv-right">
          <button className="pv-x" onClick={onClose} aria-label="Close">×</button>
          <div className="pv-meta">
            <span className="pv-num">{demo.num}{demo.variantLabel ? ` · ${demo.variantLabel}` : ''}</span>
            <span className={`cx cx-${demo.complexity}`}>{cxLabel[demo.complexity]}</span>
            <span className={`pv-src-tag ${isExternal ? 'src-ext' : 'src-orig'}`}>
              {isExternal ? '↗ External' : '★ Original'}
            </span>
          </div>
          <h2 className="pv-title">{demo.title}</h2>
          <p className="pv-blurb">{demo.blurb}</p>
          {isExternal && (
            <p className="pv-attr">
              From <a href={demo.sourceUrl} target="_blank" rel="noreferrer">{demo.author} ↗</a>
              {' '}· code shown is illustrative — see source for the full component.
            </p>
          )}

          <div className="pv-cats">
            {demo.categories.map((c) => <span key={c} className="pv-cat">{c}</span>)}
            <span className="pv-cat">{demo.platform === 'mobile' ? 'Mobile-first' : demo.platform === 'any' ? 'Any device' : 'Desktop-first'}</span>
          </div>

          <div className="pv-tags-block">
            <div className="pv-tags-label">Your tags</div>
            <div className="pv-tags">
              {tags.map((t) => (
                <span key={t} className="pv-tag">{t}
                  <button onClick={() => { removeTag(demo.id, t); onTagsChange?.() }} aria-label={`remove ${t}`}>×</button>
                </span>
              ))}
              {!tags.length && <span className="pv-tags-empty">none yet</span>}
            </div>
            <form onSubmit={submitTag} className="pv-tag-form">
              <input value={draft} onChange={(e) => setDraft(e.target.value)} placeholder="add a tag…" />
              <button type="submit">Add</button>
            </form>
          </div>

          <div className="pv-actions">
            {live && <Link to={demo.route} className="pv-open">Open full page ↗</Link>}
            {isExternal && <a className="pv-open" href={demo.sourceUrl} target="_blank" rel="noreferrer">View source ↗</a>}
            {demo.prompt && (
              <button className="pv-prompt-btn" onClick={() => setShowPrompt((v) => !v)}>
                {showPrompt ? 'Hide prompt' : 'View prompt'}
              </button>
            )}
            {!demo.prompt && files.length > 0 && (
              <button className="pv-prompt-btn" onClick={() => copyText(files[fileIdx].content)}>
                {copied ? '✓ Copied' : 'Copy code'}
              </button>
            )}
          </div>

          {showPrompt && demo.prompt && (
            <div className="pv-prompt-wrap">
              <div className="pv-prompt-bar">
                <span>{demo.library}</span>
                <button onClick={() => copyText(demo.prompt)}>{copied ? '✓ Copied' : 'Copy'}</button>
              </div>
              <pre className="pv-prompt">{demo.prompt}</pre>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
