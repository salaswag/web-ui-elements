import { useEffect, useMemo, useState } from 'react'
import { demos, CATEGORIES } from '../prompts.js'
import { getTags, getAllTags, subscribe } from '../userTags.js'
import { getPref, setTheme } from '../theme.js'
import SiteSidebar from '../components/SiteSidebar.jsx'
import PreviewModal from '../components/PreviewModal.jsx'

const cxLabel = { easy: 'Easy', mod: 'Moderate', high: 'High' }
const cxRank = { easy: 0, mod: 1, high: 2 }
const platformOf = (d) => d.platform || 'desktop'
const sourceOf = (d) => d.source || 'original'

export default function Home() {
  const [cats, setCats] = useState(() => new Set())
  const [tag, setTag] = useState(null)
  const [src, setSrc] = useState('all')
  const [plat, setPlat] = useState('all')
  const [sort, setSort] = useState('num')
  const [preview, setPreview] = useState(null)
  const [tick, setTick] = useState(0)
  const [theme, setThemePref] = useState(() => getPref())

  useEffect(() => subscribe(() => setTick((t) => t + 1)), [])
  const allTags = useMemo(() => getAllTags(), [tick])

  const toggleCat = (c) =>
    setCats((prev) => { const n = new Set(prev); n.has(c) ? n.delete(c) : n.add(c); return n })

  const pickTheme = (t) => { setTheme(t); setThemePref(t) }

  const list = useMemo(() => {
    let l = demos.filter((d) => {
      if (cats.size && !d.categories.some((c) => cats.has(c))) return false
      if (tag && !getTags(d.id).includes(tag)) return false
      if (src !== 'all' && sourceOf(d) !== src) return false
      if (plat === 'mobile' && !['mobile', 'any'].includes(platformOf(d))) return false
      if (plat === 'desktop' && !['desktop', 'any'].includes(platformOf(d))) return false
      return true
    })
    if (sort === 'complexity') l = [...l].sort((a, b) => cxRank[a.complexity] - cxRank[b.complexity])
    else if (sort === 'category') l = [...l].sort((a, b) => a.categories[0].localeCompare(b.categories[0]))
    else if (sort === 'source') l = [...l].sort((a, b) => sourceOf(a).localeCompare(sourceOf(b)))
    return l
  }, [cats, tag, src, plat, sort, tick])

  return (
    <div className="hub">
      <SiteSidebar />
      <div className="hub-head">
        <div>
          <span className="eyebrow">Scroll Effect Library</span>
          <h1>Prompt → Effect, recreated.</h1>
          <p className="lead">
            Click any tile to preview it live (or read the code), tag it your way, or open it
            full-screen. <b>★ Original</b> = built here with a prompt; <b>↗ External</b> = curated
            open-source, shown with code + attribution.
          </p>
        </div>
        <div className="hub-aside">
          <div className="theme-toggle">
            {[['light', '☀ Light'], ['dark', '🌙 Dark'], ['system', '🖥 System']].map(([v, label]) => (
              <button key={v} className={theme === v ? 'on' : ''} onClick={() => pickTheme(v)}>{label}</button>
            ))}
          </div>
          <div className="font-legend">
            <div>Type roles, kept separate:</div>
            <div><b>Space Grotesk</b> — site UI</div>
            <div style={{ fontFamily: 'var(--font-content)' }}><b>Inter</b> — demo content</div>
            <div className="mono"><b>JetBrains Mono</b> — prompt/code</div>
            <div className="serif"><b>Fraunces</b> — editorial serif</div>
          </div>
        </div>
      </div>

      <div className="filters">
        <div className="filter-chips">
          {CATEGORIES.map((c) => (
            <button key={c} className={`chip ${cats.has(c) ? 'on' : ''}`} onClick={() => toggleCat(c)}>{c}</button>
          ))}
          {cats.size > 0 && <button className="chip clear" onClick={() => setCats(new Set())}>clear ×</button>}
        </div>

        <div className="filter-row">
          <div className="seg">
            <span className="seg-label" style={{ alignSelf: 'center' }}>Source</span>
            {[['all', 'All'], ['original', '★ Ours'], ['external', '↗ External']].map(([v, l]) => (
              <button key={v} className={src === v ? 'on' : ''} onClick={() => setSrc(v)}>{l}</button>
            ))}
          </div>
          <div className="seg">
            <span className="seg-label" style={{ alignSelf: 'center' }}>Platform</span>
            {[['all', 'All'], ['mobile', '📱 Mobile-first'], ['desktop', '🖥 Desktop-first']].map(([v, l]) => (
              <button key={v} className={plat === v ? 'on' : ''} onClick={() => setPlat(v)}>{l}</button>
            ))}
          </div>
          <label className="sort">
            Sort
            <select value={sort} onChange={(e) => setSort(e.target.value)}>
              <option value="num">by number</option>
              <option value="complexity">by complexity</option>
              <option value="category">by category</option>
              <option value="source">by source</option>
            </select>
          </label>
        </div>

        {allTags.length > 0 && (
          <div className="filter-row">
            <div className="tag-filter">
              <span className="tag-filter-label">Your tags:</span>
              {allTags.map((t) => (
                <button key={t} className={`chip tag ${tag === t ? 'on' : ''}`} onClick={() => setTag(tag === t ? null : t)}>#{t}</button>
              ))}
            </div>
          </div>
        )}
      </div>

      <div className="card-grid">
        {list.map((d) => {
          const ut = getTags(d.id)
          const ext = sourceOf(d) === 'external'
          return (
            <button key={d.id} className={`demo-card ${ext ? 'is-external' : ''}`} onClick={() => setPreview(d)}>
              <div className="demo-card-top">
                <span className="tag">{d.num}{d.variantLabel ? ` ${d.variantLabel}` : ''}</span>
                <span className={`cx cx-${d.complexity}`}>{cxLabel[d.complexity]}</span>
                <span className={`src-badge ${ext ? 'src-ext' : 'src-orig'}`}>{ext ? `↗ ${d.author}` : '★ Ours'}</span>
              </div>
              <h3>{d.title}</h3>
              <p>{d.blurb}</p>
              <div className="card-cats">
                {d.categories.slice(0, 3).map((c) => <span key={c} className="card-cat">{c}</span>)}
                {platformOf(d) === 'mobile' && <span className="card-cat">📱 Mobile</span>}
              </div>
              {ut.length > 0 && <div className="card-utags">{ut.map((t) => <span key={t}>#{t}</span>)}</div>}
            </button>
          )
        })}
      </div>
      {!list.length && <p className="hub-foot">No demos match those filters.</p>}
      <p className="hub-foot">
        {list.length} of {demos.length} shown · {demos.filter((d) => sourceOf(d) === 'original').length} original · {demos.filter((d) => sourceOf(d) === 'external').length} external.
      </p>

      {preview && <PreviewModal demo={preview} onClose={() => setPreview(null)} onTagsChange={() => setTick((t) => t + 1)} />}
    </div>
  )
}
