import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { demos, CATEGORIES } from '../prompts.js'
import { getPref, setTheme } from '../theme.js'
import { getEffectiveFreq, subscribe as subFreq } from '../lib/userFrequency.js'
import { isStarred, subscribe as subStars } from '../lib/userStars.js'
import './app-sidebar.css'

const FREQ_RANK = { everywhere: 0, often: 1, rare: 2, superrare: 3, null: 4 }

function sortItems(items, sort) {
  if (sort === 'freq') {
    return [...items].sort((a, b) => {
      const ra = FREQ_RANK[getEffectiveFreq(a.id)] ?? 4
      const rb = FREQ_RANK[getEffectiveFreq(b.id)] ?? 4
      return ra - rb
    })
  }
  if (sort === 'starred') {
    return [...items].sort((a, b) => (isStarred(a.id) ? 0 : 1) - (isStarred(b.id) ? 0 : 1))
  }
  return items
}

const FREQ_OPTS = [
  { value: 'all',        label: 'All' },
  { value: 'everywhere', label: 'Every' },
  { value: 'often',      label: 'Often' },
  { value: 'rare',       label: 'Rare' },
  { value: 'superrare',  label: 'Super' },
]

const inIframe = typeof window !== 'undefined' && window.self !== window.top

export default function AppSidebar() {
  const loc = useLocation()
  const [theme, setThemePref] = useState(() => getPref())
  const [mobileOpen, setMobileOpen] = useState(false)
  const [sideSort, setSideSort] = useState('num')
  const [sideCats, setSideCats] = useState(() => new Set())
  const [sideFreq, setSideFreq] = useState('all')
  const [tick, setTick] = useState(0)
  const [collapsed, setCollapsed] = useState(false)

  useEffect(() => {
    const u1 = subFreq(()  => setTick((t) => t + 1))
    const u2 = subStars(() => setTick((t) => t + 1))
    return () => { u1(); u2() }
  }, [])

  const activeId = loc.pathname.startsWith('/effects/')
    ? loc.pathname.replace('/effects/', '')
    : null

  const activeGroup = activeId
    ? CATEGORIES.find((cat) => demos.some((d) => d.id === activeId && d.categories.includes(cat))) || null
    : null

  const [expanded, setExpanded] = useState(() => new Set(activeGroup ? [activeGroup] : []))

  const toggleGroup = (cat) =>
    setExpanded((prev) => { const n = new Set(prev); n.has(cat) ? n.delete(cat) : n.add(cat); return n })

  const toggleCat = (cat) =>
    setSideCats((prev) => { const n = new Set(prev); n.has(cat) ? n.delete(cat) : n.add(cat); return n })

  const pickTheme = (t) => { setTheme(t); setThemePref(t) }

  if (inIframe) return null

  const groups = CATEGORIES.map((cat) => {
    if (sideCats.size > 0 && !sideCats.has(cat)) return { cat, items: [] }
    let items = demos.filter((d) => d.categories.includes(cat) && d.route && d.live !== false)
    if (sideFreq !== 'all') items = items.filter((d) => getEffectiveFreq(d.id) === sideFreq)
    return { cat, items: sortItems(items, sideSort) }
  }).filter((g) => g.items.length)

  const totalCount = demos.filter((d) => d.route && d.live !== false).length
  const visibleCount = groups.reduce((acc, g) => acc + g.items.length, 0)
  const isFiltered = sideCats.size > 0 || sideFreq !== 'all'

  const nav = (
    <nav className="asb-nav">
      <div className="asb-head">
        <Link to="/" className="asb-brand" onClick={() => setMobileOpen(false)}>
          <span className="asb-brand-icon">✦</span>
          <span className="asb-brand-text">Effects Library</span>
        </Link>
        <button className="asb-collapse-btn" onClick={() => setCollapsed(true)} title="Collapse sidebar">◀</button>
        <div className="asb-theme">
          {[['light', '☀ Light'], ['dark', '🌙 Dark'], ['system', '⊙ System']].map(([v, label]) => (
            <button key={v} className={`asb-theme-btn ${theme === v ? 'on' : ''}`} onClick={() => pickTheme(v)}>
              {label}
            </button>
          ))}
        </div>
      </div>

      <div className="asb-scroll">
        <Link
          to="/"
          className={`asb-all-link ${loc.pathname === '/' ? 'on' : ''}`}
          onClick={() => setMobileOpen(false)}
        >
          All Effects
          <span className="asb-all-count">
            {isFiltered ? `${visibleCount} / ${totalCount}` : totalCount}
          </span>
        </Link>

        {/* Filters block */}
        <div className="asb-filters-block">

          {/* Category chips */}
          <div>
            <div className="asb-filter-label">Category</div>
            <div className="asb-cat-chips">
              {CATEGORIES.map((cat) => (
                <button
                  key={cat}
                  className={`asb-cat-chip ${sideCats.has(cat) ? 'on' : ''}`}
                  onClick={() => toggleCat(cat)}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* Frequency filter */}
          <div>
            <div className="asb-filter-label">Frequency</div>
            <div className="asb-freq-row">
              {FREQ_OPTS.map((o) => (
                <button
                  key={o.value}
                  className={`asb-freq-btn ${sideFreq === o.value ? 'on' : ''}`}
                  onClick={() => setSideFreq(o.value)}
                >
                  {o.label}
                </button>
              ))}
            </div>
          </div>

          {/* Sort + clear */}
          <div className="asb-sort-row">
            <span className="asb-filter-label" style={{ paddingBottom: 0, alignSelf: 'center' }}>Sort</span>
            {[['num','#'],['freq','use']].map(([v, label]) => (
              <button
                key={v}
                className={`asb-sort-btn ${sideSort === v ? 'on' : ''}`}
                onClick={() => setSideSort(v)}
                title={v === 'num' ? 'By number' : v === 'freq' ? 'By usage frequency' : 'Starred first'}
              >
                {label}
              </button>
            ))}
            {isFiltered && (
              <button
                className="asb-sort-btn asb-clear-btn"
                onClick={() => { setSideCats(new Set()); setSideFreq('all') }}
                title="Clear all filters"
              >
                ×
              </button>
            )}
          </div>

        </div>

        {groups.map((g) => {
          const isOpen = expanded.has(g.cat)
          const hasActive = g.items.some((d) => d.id === activeId)
          return (
            <div key={g.cat} className="asb-group">
              <button
                className={`asb-cat-btn ${hasActive ? 'has-active' : ''} ${isOpen ? 'open' : ''}`}
                onClick={() => toggleGroup(g.cat)}
              >
                <span className="asb-cat-label">{g.cat}</span>
                <span className="asb-cat-count">{g.items.length}</span>
                <span className="asb-cat-arrow">{isOpen ? '▾' : '▸'}</span>
              </button>
              {isOpen && (
                <div className="asb-items">
                  {g.items.map((d) => (
                    <Link
                      key={d.id}
                      to={`/effects/${d.id}`}
                      className={`asb-link ${activeId === d.id ? 'on' : ''}`}
                      onClick={() => setMobileOpen(false)}
                    >
                      <span className="asb-num">{d.num}</span>
                      <span className="asb-title">{d.title}</span>
                      {d.variantLabel && <span className="asb-var">{d.variantLabel}</span>}
                      {isStarred(d.id) && <span className="asb-star">★</span>}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          )
        })}
      </div>
    </nav>
  )

  return (
    <>
      {collapsed && (
        <button className="asb-open-btn" onClick={() => setCollapsed(false)} title="Expand sidebar">▶</button>
      )}

      <button className="asb-mobile-toggle" onClick={() => setMobileOpen(true)} aria-label="Open menu">
        <span /><span /><span />
      </button>

      <aside className={`asb-sidebar asb-desktop${collapsed ? ' collapsed' : ''}`}>{nav}</aside>

      {mobileOpen && (
        <>
          <div className="asb-scrim" onClick={() => setMobileOpen(false)} />
          <aside className="asb-sidebar asb-mobile">
            <button className="asb-close" onClick={() => setMobileOpen(false)}>×</button>
            {nav}
          </aside>
        </>
      )}
    </>
  )
}
