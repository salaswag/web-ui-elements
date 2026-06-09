import { useState, useEffect } from 'react'
import { useParams, Link, useNavigate, useSearchParams } from 'react-router-dom'
import { byId, demos, CATEGORIES } from '../prompts.js'
import { getExtFiles } from '../ext/registry.js'
import { getEffectiveFreq, isUserSet, setFreq } from '../lib/userFrequency.js'
import { isStarred, toggleStar } from '../lib/userStars.js'
import { isArchived, toggleArchive } from '../lib/userArchive.js'
import FrequencySelect from '../components/FrequencySelect.jsx'
import './effect-page.css'

const ArchiveIcon = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor"
    strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <rect x="3" y="4" width="18" height="4" rx="1" />
    <path d="M5 8v10a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8" />
    <path d="M10 12h4" />
  </svg>
)

const PAGE_SOURCES = import.meta.glob('./*.jsx', { query: '?raw', import: 'default', eager: true })

function idToPageFile(id) {
  return id.split('-').map((w) => w[0].toUpperCase() + w.slice(1)).join('')
}

const cxLabel = { easy: 'Easy', mod: 'Moderate', high: 'High' }
const cxColor = { easy: '#16a34a', mod: '#d97706', high: '#dc2626' }
const cxBg   = { easy: 'rgba(22,163,74,0.1)', mod: 'rgba(217,119,6,0.1)', high: 'rgba(220,38,38,0.1)' }

const liveList = demos.filter((d) => d.route && d.live !== false)

export default function EffectPage() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [params] = useSearchParams()
  const demo = byId[id]
  const [tab, setTab] = useState('preview')
  const [copied, setCopied] = useState(false)
  const [freq, setFreqState] = useState(() => getEffectiveFreq(id))
  const [userSet, setUserSet] = useState(() => isUserSet(id))
  const [starred, setStarred] = useState(() => isStarred(id))
  const [archived, setArchived] = useState(() => isArchived(id))
  const [fileIdx, setFileIdx] = useState(0)

  // sync state when id changes
  useEffect(() => {
    setFreqState(getEffectiveFreq(id))
    setUserSet(isUserSet(id))
    setStarred(isStarred(id))
    setArchived(isArchived(id))
    setTab('preview')
  }, [id])

  if (!demo) {
    return (
      <div className="ep-notfound">
        <p>Effect <code>{id}</code> not found.</p>
        <Link to="/">← Back to all effects</Link>
      </div>
    )
  }

  // Prev/Next walk WITHIN the category you're browsing. The category is PINNED in
  // the URL (?cat=) by whatever you clicked from (a sidebar group or a hub card),
  // so it stays stable across Next/Next/Next instead of being re-derived per effect
  // (which made navigation jump categories). Falls back to the effect's first
  // matching category when no cat is in the URL (e.g. a direct link).
  const catParam = params.get('cat')
  const activeCat = (catParam && demo.categories.includes(catParam))
    ? catParam
    : CATEGORIES.find((c) => demo.categories.includes(c))
  const navList = activeCat ? liveList.filter((d) => d.categories.includes(activeCat)) : liveList
  const catQuery = activeCat ? `?cat=${encodeURIComponent(activeCat)}` : ''
  const idx = navList.findIndex((d) => d.id === id)
  const prevDemo = idx > 0 ? navList[idx - 1] : null
  const nextDemo = idx < navList.length - 1 ? navList[idx + 1] : null

  const isExternal = demo.source === 'external'
  const pageName = idToPageFile(demo.id)
  const jsxSource = PAGE_SOURCES[`./${pageName}.jsx`] || ''
  const extFiles = isExternal ? (demo.ext ? getExtFiles(demo.ext) : demo.code || []) : []

  const base = typeof window !== 'undefined' ? window.location.href.split('#')[0] : '/'
  const iframeSrc = `${base}#${demo.route}`

  const copyText = async (text) => {
    try { await navigator.clipboard.writeText(text); setCopied(true); setTimeout(() => setCopied(false), 1600) }
    catch { /* ignore */ }
  }

  const handleFreq = (val) => {
    const v = val || null
    setFreq(id, v)
    setFreqState(v ? v : getEffectiveFreq(id))
    setUserSet(!!v)
  }

  // External effects have no page file — their real source lives in the "Source Code"
  // tab (the 'prompt' tab), so the empty "Code" tab is dropped for them.
  const tabs = ['preview', ...(isExternal ? [] : ['code']), ...(demo.prompt || isExternal ? ['prompt'] : [])]

  return (
    <div className="ep">

      {/* ── Top bar: breadcrumb + title + nav ── */}
      <div className="ep-topbar">
        <div className="ep-topbar-left">
          <Link to="/" className="ep-back">All effects</Link>
          <span className="ep-sep">/</span>
          <span className="ep-title-inline">{demo.title}</span>
        </div>
        <div className="ep-topbar-right">
          <button
            className="ep-nav-btn"
            disabled={!prevDemo}
            onClick={() => prevDemo && navigate(`/effects/${prevDemo.id}${catQuery}`)}
            title={prevDemo ? prevDemo.title : 'First in category'}
          >
            ← Prev
          </button>
          <button
            className="ep-nav-btn"
            disabled={!nextDemo}
            onClick={() => nextDemo && navigate(`/effects/${nextDemo.id}${catQuery}`)}
            title={nextDemo ? nextDemo.title : 'Last in category'}
          >
            Next →
          </button>
          <button
            className={`ep-star-btn ${starred ? 'on' : ''}`}
            onClick={() => { toggleStar(id); setStarred(isStarred(id)) }}
            title={starred ? 'Unstar this effect' : 'Star this effect'}
          >
            {starred ? '★' : '☆'}
          </button>
          <button
            className={`ep-archive-btn ${archived ? 'on' : ''}`}
            onClick={() => { toggleArchive(id); setArchived(isArchived(id)) }}
            title={archived ? 'Unarchive (show in sidebar & hub again)' : 'Archive (hide from sidebar & hub)'}
            aria-label="Archive this effect"
          >
            <ArchiveIcon />
          </button>
          <a href={iframeSrc} target="_blank" rel="noreferrer" className="ep-open-btn">
            ↗
          </a>
        </div>
      </div>

      {/* ── Meta + freq bar ── */}
      <div className="ep-metabar">
        <div className="ep-badges">
          <span
            className="ep-badge"
            style={{ background: cxBg[demo.complexity], color: cxColor[demo.complexity] }}
          >
            {cxLabel[demo.complexity]}
          </span>
          {demo.library && (
            <span className="ep-badge ep-badge-lib">{demo.library}</span>
          )}
          {isExternal && (
            <a href={demo.sourceUrl} target="_blank" rel="noreferrer" className="ep-badge ep-badge-ext">
              ↗ {demo.author}
            </a>
          )}
          {demo.categories.map((c) => (
            <span key={c} className="ep-badge ep-badge-cat">{c}</span>
          ))}
        </div>
        <FrequencySelect
          value={freq || ''}
          onChange={handleFreq}
          isUserSet={userSet}
        />
        {userSet && (
          <button
            className="ep-freq-reset"
            onClick={() => handleFreq(null)}
            title="Reset to suggested default"
          >↺</button>
        )}
      </div>

      {/* ── Tab bar ── */}
      <div className="ep-tabs">
        {tabs.map((t) => (
          <button key={t} className={`ep-tab ${tab === t ? 'on' : ''}`} onClick={() => setTab(t)}>
            {t === 'preview' && 'Preview'}
            {t === 'code' && 'Code'}
            {t === 'prompt' && (isExternal ? 'Source Code' : 'Prompt')}
          </button>
        ))}
        {demo.blurb && (
          <span className="ep-blurb-inline">{demo.blurb}</span>
        )}
      </div>

      {/* ── Body ── */}
      <div className="ep-body">

        {tab === 'preview' && (
          <iframe
            key={iframeSrc}
            src={iframeSrc}
            className="ep-iframe"
            title={demo.title}
            allow="fullscreen"
          />
        )}

        {tab === 'code' && (
          <div className="ep-code-wrap">
            <div className="ep-code-bar">
              <span className="ep-code-file">{pageName}.jsx</span>
              <button className="ep-copy-btn" onClick={() => copyText(jsxSource)}>
                {copied ? '✓ Copied' : 'Copy'}
              </button>
            </div>
            <pre className="ep-code"><code>{jsxSource || '// Source not bundled for this effect.'}</code></pre>
          </div>
        )}

        {tab === 'prompt' && !isExternal && demo.prompt && (
          <div className="ep-code-wrap">
            <div className="ep-code-bar">
              <span className="ep-code-file">prompt.txt</span>
              <button className="ep-copy-btn" onClick={() => copyText(demo.prompt)}>
                {copied ? '✓ Copied' : 'Copy'}
              </button>
            </div>
            <pre className="ep-code ep-prompt">{demo.prompt}</pre>
          </div>
        )}

        {tab === 'prompt' && isExternal && (
          <div className="ep-code-wrap">
            {extFiles.length > 1 && (
              <div className="ep-filetabs">
                {extFiles.map((f, i) => (
                  <button key={f.file} className={`ep-filetab ${i === fileIdx ? 'on' : ''}`} onClick={() => setFileIdx(i)}>
                    {f.file}
                  </button>
                ))}
                <button className="ep-copy-btn" style={{ marginLeft: 'auto' }} onClick={() => copyText(extFiles[fileIdx]?.content || '')}>
                  {copied ? '✓ Copied' : 'Copy'}
                </button>
              </div>
            )}
            {extFiles.length <= 1 && (
              <div className="ep-code-bar">
                <span className="ep-code-file">{extFiles[0]?.file || 'source'}</span>
                <button className="ep-copy-btn" onClick={() => copyText(extFiles[0]?.content || '')}>
                  {copied ? '✓ Copied' : 'Copy'}
                </button>
              </div>
            )}
            <pre className="ep-code"><code>{extFiles[fileIdx]?.content || 'See source link.'}</code></pre>
          </div>
        )}

      </div>
    </div>
  )
}
