import { useMemo, useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { demos, CATEGORIES } from '../prompts.js'
import { getTags, getAllTags, subscribe as subTags } from '../userTags.js'
import { getEffectiveFreq, isUserSet, setFreq, FREQ_OPTIONS, subscribe as subFreq } from '../lib/userFrequency.js'
import { isStarred, toggleStar, subscribe as subStars } from '../lib/userStars.js'
import { isArchived, toggleArchive, subscribe as subArch } from '../lib/userArchive.js'
import FrequencySelect from '../components/FrequencySelect.jsx'

const ArchiveIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor"
    strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <rect x="3" y="4" width="18" height="4" rx="1" />
    <path d="M5 8v10a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8" />
    <path d="M10 12h4" />
  </svg>
)

const cxRank  = { easy: 0, mod: 1, high: 2 }
const platformOf = (d) => d.platform || 'desktop'
const sourceOf   = (d) => d.source   || 'original'

export default function Home() {
  const [cats, setCats]   = useState(() => new Set())
  const [tag,  setTag]    = useState(null)
  const [src,  setSrc]    = useState('all')
  const [plat, setPlat]   = useState('all')
  const [freq, setFreqFilter] = useState('all')
  const [onlyStarred, setOnlyStarred] = useState(false)
  const [showArchived, setShowArchived] = useState(false)
  const [sort, setSort]   = useState('num')
  const [tick, setTick]   = useState(0)

  useEffect(() => {
    const u1 = subTags(()  => setTick((t) => t + 1))
    const u2 = subFreq(()  => setTick((t) => t + 1))
    const u3 = subStars(() => setTick((t) => t + 1))
    const u4 = subArch(()  => setTick((t) => t + 1))
    return () => { u1(); u2(); u3(); u4() }
  }, [])

  const allTags = useMemo(() => getAllTags(), [tick])

  const toggleCat = (c) =>
    setCats((prev) => { const n = new Set(prev); n.has(c) ? n.delete(c) : n.add(c); return n })

  const list = useMemo(() => {
    let l = demos.filter((d) => {
      // Archive gate: hide archived by default; "Archived" toggle shows only them.
      if (showArchived ? !isArchived(d.id) : isArchived(d.id)) return false
      if (cats.size && !d.categories.some((c) => cats.has(c))) return false
      if (tag && !getTags(d.id).includes(tag)) return false
      if (src !== 'all' && sourceOf(d) !== src) return false
      if (plat === 'mobile'   && !['mobile','any'].includes(platformOf(d))) return false
      if (plat === 'desktop'  && !['desktop','any'].includes(platformOf(d))) return false
      if (freq !== 'all' && getEffectiveFreq(d.id) !== freq) return false
      if (onlyStarred && !isStarred(d.id)) return false
      return true
    })
    if (sort === 'complexity') l = [...l].sort((a, b) => cxRank[a.complexity] - cxRank[b.complexity])
    else if (sort === 'category') l = [...l].sort((a, b) => a.categories[0].localeCompare(b.categories[0]))
    else if (sort === 'source')   l = [...l].sort((a, b) => sourceOf(a).localeCompare(sourceOf(b)))
    else if (sort === 'freq') l = [...l].sort((a, b) => {
      const order = ['everywhere', 'often', 'rare', 'superrare', null]
      return order.indexOf(getEffectiveFreq(a.id)) - order.indexOf(getEffectiveFreq(b.id))
    })
    return l
  }, [cats, tag, src, plat, freq, sort, onlyStarred, showArchived, tick])

  return (
    <div className="hub">
      <div className="hub-hero">
        <span className="hub-badge">✦ {demos.length} effects and counting</span>
        <h1 className="hub-h1">Make them <span className="hub-grad">stop scrolling.</span></h1>
        <p className="hub-lead">
          Your personal arsenal of scroll, motion, and interaction effects — every one live,
          copy-paste ready, and shamelessly reusable. Click a card, watch it move, steal the code.
        </p>
        <div className="hub-stats">
          <span>{demos.length} effects</span>
          <span className="hub-dot">·</span>
          <span>{demos.filter((d) => sourceOf(d) === 'original').length} original</span>
          <span className="hub-dot">·</span>
          <span>{demos.filter((d) => sourceOf(d) === 'external').length} external</span>
        </div>
      </div>

      <div className="hub-filters">
        <div className="hub-filter-row">
          <div className="hub-chips">
            {CATEGORIES.map((c) => (
              <button key={c} className={`hub-chip ${cats.has(c) ? 'on' : ''}`} onClick={() => toggleCat(c)}>
                {c}
              </button>
            ))}
            {cats.size > 0 && (
              <button className="hub-chip hub-chip-clear" onClick={() => setCats(new Set())}>clear ×</button>
            )}
          </div>
        </div>

        <div className="hub-filter-row hub-filter-controls">
          {/* Starred */}
          <button
            className={`hub-chip hub-chip-star ${onlyStarred ? 'on' : ''}`}
            onClick={() => setOnlyStarred((v) => !v)}
            title="Show only starred effects"
          >
            {onlyStarred ? '★ Starred' : '☆ Starred'}
          </button>
          {/* Archived */}
          <button
            className={`hub-chip hub-chip-archive ${showArchived ? 'on' : ''}`}
            onClick={() => setShowArchived((v) => !v)}
            title="Show archived effects (hidden from the sidebar)"
          >
            Archived
          </button>
          {/* Source */}
          <div className="hub-seg">
            {[['all','All'],['original','★ Ours'],['external','↗ External']].map(([v,l]) => (
              <button key={v} className={src === v ? 'on' : ''} onClick={() => setSrc(v)}>{l}</button>
            ))}
          </div>
          {/* Platform */}
          <div className="hub-seg">
            {[['all','All'],['mobile','📱 Mobile'],['desktop','🖥 Desktop']].map(([v,l]) => (
              <button key={v} className={plat === v ? 'on' : ''} onClick={() => setPlat(v)}>{l}</button>
            ))}
          </div>
          {/* Usage freq */}
          <div className="hub-seg">
            <button className={freq === 'all' ? 'on' : ''} onClick={() => setFreqFilter('all')}>All uses</button>
            {FREQ_OPTIONS.map((o) => (
              <button key={o.value} className={freq === o.value ? 'on' : ''} onClick={() => setFreqFilter(o.value)}>
                {o.label}
              </button>
            ))}
          </div>
          {/* Sort — custom styled */}
          <div className="hub-sort-wrap">
            <span className="hub-sort-label">Sort</span>
            <FrequencySelect
              value={sort}
              onChange={(v) => setSort(v)}
              plain
              options={[
                { value: 'num',        label: 'by number' },
                { value: 'complexity', label: 'by complexity' },
                { value: 'category',   label: 'by category' },
                { value: 'source',     label: 'by source' },
                { value: 'freq',       label: 'by usage freq' },
              ]}
            />
          </div>
        </div>

        {allTags.length > 0 && (
          <div className="hub-filter-row hub-tag-row">
            <span className="hub-tag-label">Your tags</span>
            {allTags.map((t) => (
              <button
                key={t}
                className={`hub-chip hub-chip-tag ${tag === t ? 'on' : ''}`}
                onClick={() => setTag(tag === t ? null : t)}
              >
                #{t}
              </button>
            ))}
          </div>
        )}
      </div>

      <div className="hub-grid">
        {list.map((d) => {
          const ut = getTags(d.id)
          const ext = sourceOf(d) === 'external'
          const dFreq = getEffectiveFreq(d.id)
          const userOverrode = isUserSet(d.id)
          const starred = isStarred(d.id)
          const archived = isArchived(d.id)
          // Pin a category for Prev/Next: prefer an active filter chip the demo is
          // in, else its first category (matches the sidebar grouping).
          const navCat = [...cats].find((c) => d.categories.includes(c)) || CATEGORIES.find((c) => d.categories.includes(c))
          return (
            <div key={d.id} className={`hub-card ${ext ? 'is-ext' : ''}`}>
              <Link to={`/effects/${d.id}${navCat ? `?cat=${encodeURIComponent(navCat)}` : ''}`} className="hub-card-link">
                <div className="hub-card-top">
                  <span className="hub-card-num">{d.num}{d.variantLabel ? ` ${d.variantLabel}` : ''}</span>
                  <button
                    className={`hub-card-star ${starred ? 'on' : ''}`}
                    onClick={(e) => { e.preventDefault(); toggleStar(d.id); setTick((t) => t + 1) }}
                    title={starred ? 'Unstar' : 'Star this effect'}
                  >
                    {starred ? '★' : '☆'}
                  </button>
                  <button
                    className={`hub-card-archive ${archived ? 'on' : ''}`}
                    onClick={(e) => { e.preventDefault(); toggleArchive(d.id); setTick((t) => t + 1) }}
                    title={archived ? 'Unarchive' : 'Archive (hide from sidebar & hub)'}
                    aria-label="Archive this effect"
                  >
                    <ArchiveIcon />
                  </button>
                  <span className={`hub-card-src ${ext ? 'ext' : 'orig'}`}>
                    {ext ? `↗ ${d.author}` : '★'}
                  </span>
                </div>
                <h3 className="hub-card-title">{d.title}</h3>
                <p className="hub-card-blurb">{d.blurb}</p>
                <div className="hub-card-cats">
                  {d.categories.slice(0, 3).map((c) => (
                    <span key={c} className="hub-card-cat">{c}</span>
                  ))}
                  {platformOf(d) === 'mobile' && <span className="hub-card-cat">📱 Mobile</span>}
                </div>
                {ut.length > 0 && (
                  <div className="hub-card-utags">{ut.map((t) => <span key={t}>#{t}</span>)}</div>
                )}
              </Link>
              {/* Freq setter lives outside the link to prevent navigation */}
              <div className="hub-card-footer" onClick={(e) => e.stopPropagation()}>
                <FrequencySelect
                  value={dFreq || ''}
                  onChange={(val) => { setFreq(d.id, val); setTick((t) => t + 1) }}
                  isUserSet={userOverrode}
                  compact
                />
                {userOverrode && (
                  <button
                    className="hub-freq-clear"
                    onClick={(e) => { e.preventDefault(); setFreq(d.id, null); setTick((t) => t + 1) }}
                    title="Reset to suggested default"
                  >↺</button>
                )}
              </div>
            </div>
          )
        })}
      </div>

      {!list.length && <p className="hub-empty">Nothing matches those filters — loosen up a little. 🎛️</p>}
    </div>
  )
}
