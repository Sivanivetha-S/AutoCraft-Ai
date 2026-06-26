import { useState, useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import { useApp } from '../AppContext'
import { C, font, radius, glassCard } from '../tokens'

const SORT_OPTIONS = [
  { value: 'newest', label: 'Newest First' },
  { value: 'oldest', label: 'Oldest First' },
  { value: 'favorites', label: 'Favorites' },
  { value: 'difficulty', label: 'Difficulty' },
]
const DIFF_COLOR = { Easy: C.success, Medium: C.accent, Hard: '#f87171' }

function ProjectCard({ project, onOpen, onDelete, onToggleFav }) {
  const [hovered, setHovered] = useState(false)
  const [confirmDelete, setConfirmDelete] = useState(false)

  const statusColor = { 'Not Started': C.textMuted, 'In Progress': C.accent, 'Completed': C.success }

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => { setHovered(false); setConfirmDelete(false) }}
      style={{
        ...glassCard({ padding: '20px' }),
        background: hovered ? 'rgba(18,60,70,0.65)' : 'rgba(18,60,70,0.45)',
        border: `1px solid ${hovered ? 'rgba(255,255,255,0.12)' : C.border}`,
        transition: 'all 200ms ease-out',
        transform: hovered ? 'translateY(-2px)' : 'none',
        display: 'flex', flexDirection: 'column', gap: '14px',
      }}
    >
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: '10px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div style={{ width: '44px', height: '44px', background: `rgba(${project.color === C.accent ? '228,196,65' : '74,222,128'},0.1)`, borderRadius: radius.md, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '22px', flexShrink: 0 }}>
            {project.emoji}
          </div>
          <div>
            <p style={{ fontFamily: font.mono, fontSize: '13px', fontWeight: 700, color: C.textPrimary, lineHeight: 1.3 }}>{project.title}</p>
            <p style={{ fontFamily: font.sans, fontSize: '11px', color: C.textMuted, marginTop: '2px' }}>{project.category}</p>
          </div>
        </div>
        <button
          onClick={() => onToggleFav(project.id)}
          style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '4px', flexShrink: 0 }}
          aria-label={project.favorite ? 'Unfavorite' : 'Favorite'}
        >
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path d="M8 13.5S1.5 9.5 1.5 5.5a3.5 3.5 0 017 0 3.5 3.5 0 017 0c0 4-6.5 8-6.5 8z"
              stroke={project.favorite ? '#f87171' : C.textMuted}
              fill={project.favorite ? 'rgba(248,113,113,0.25)' : 'none'}
              strokeWidth="1.3" strokeLinejoin="round"/>
          </svg>
        </button>
      </div>

      {/* Badges */}
      <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
        <span style={{ padding: '3px 8px', background: `rgba(${DIFF_COLOR[project.difficulty] === C.success ? '74,222,128' : '228,196,65'},0.1)`, borderRadius: radius.full, color: DIFF_COLOR[project.difficulty] || C.accent, fontSize: '10px', fontFamily: font.mono, fontWeight: 600 }}>{project.difficulty}</span>
        <span style={{ padding: '3px 8px', background: 'rgba(255,255,255,0.04)', borderRadius: radius.full, color: C.textMuted, fontSize: '10px', fontFamily: font.sans }}>{project.time}</span>
        <span style={{ padding: '3px 8px', background: 'rgba(255,255,255,0.04)', borderRadius: radius.full, color: statusColor[project.completionStatus], fontSize: '10px', fontFamily: font.sans, fontWeight: 500 }}>● {project.completionStatus}</span>
      </div>

      {/* Materials */}
      {project.materials.length > 0 && (
        <div style={{ display: 'flex', gap: '5px', flexWrap: 'wrap' }}>
          {project.materials.slice(0, 3).map((m, i) => (
            <span key={i} style={{ padding: '2px 7px', background: 'rgba(255,255,255,0.03)', border: `1px solid ${C.border}`, borderRadius: radius.full, color: C.textMuted, fontSize: '10px', fontFamily: font.sans }}>{m}</span>
          ))}
          {project.materials.length > 3 && <span style={{ padding: '2px 7px', color: C.textMuted, fontSize: '10px', fontFamily: font.sans }}>+{project.materials.length - 3} more</span>}
        </div>
      )}

      {/* Date */}
      <p style={{ fontFamily: font.sans, fontSize: '11px', color: C.textMuted }}>
        Saved {new Date(project.savedAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}
      </p>

      {/* Actions */}
      <div style={{ display: 'flex', gap: '8px' }}>
        <button
          onClick={() => onOpen(project.id)}
          style={{ flex: 1, padding: '9px', background: C.accent, color: C.bgPrimary, border: 'none', borderRadius: radius.md, fontFamily: font.sans, fontSize: '12px', fontWeight: 600, cursor: 'pointer', transition: 'background 150ms' }}
          onMouseEnter={e => e.currentTarget.style.background = '#FFD95A'}
          onMouseLeave={e => e.currentTarget.style.background = C.accent}
        >
          Open Project
        </button>
        {confirmDelete ? (
          <button
            onClick={() => onDelete(project.id)}
            style={{ padding: '9px 14px', background: 'rgba(248,113,113,0.15)', border: '1px solid rgba(248,113,113,0.3)', borderRadius: radius.md, color: '#f87171', fontFamily: font.sans, fontSize: '12px', fontWeight: 600, cursor: 'pointer' }}
          >
            Confirm?
          </button>
        ) : (
          <button
            onClick={() => setConfirmDelete(true)}
            style={{ padding: '9px 12px', background: 'transparent', border: `1px solid ${C.border}`, borderRadius: radius.md, cursor: 'pointer', transition: 'all 150ms' }}
            onMouseEnter={e => { e.currentTarget.style.borderColor = 'rgba(248,113,113,0.3)' }}
            onMouseLeave={e => { e.currentTarget.style.borderColor = C.border }}
            aria-label="Delete project"
          >
            <svg width="13" height="13" viewBox="0 0 13 13" fill="none"><path d="M2 3h9M5 3V2h3v1M4 3v7a1 1 0 001 1h3a1 1 0 001-1V3" stroke={C.textMuted} strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/></svg>
          </button>
        )}
      </div>
    </div>
  )
}

export default function LibraryPage() {
  const navigate = useNavigate()
  const { library: { items, removeProject, toggleFavorite } } = useApp()
  const [search, setSearch] = useState('')
  const [sort, setSort] = useState('newest')
  const [filter, setFilter] = useState('All')

  const categories = useMemo(() => ['All', ...new Set(items.map(i => i.category))], [items])

  const filtered = useMemo(() => {
    let res = [...items]
    if (filter !== 'All') res = res.filter(i => i.category === filter)
    if (search.trim()) {
      const q = search.toLowerCase()
      res = res.filter(i => i.title.toLowerCase().includes(q) || i.category.toLowerCase().includes(q) || i.materials.some(m => m.toLowerCase().includes(q)))
    }
    if (sort === 'newest') res.sort((a, b) => new Date(b.savedAt) - new Date(a.savedAt))
    if (sort === 'oldest') res.sort((a, b) => new Date(a.savedAt) - new Date(b.savedAt))
    if (sort === 'favorites') res.sort((a, b) => (b.favorite ? 1 : 0) - (a.favorite ? 1 : 0))
    if (sort === 'difficulty') {
      const order = { Easy: 0, Medium: 1, Hard: 2 }
      res.sort((a, b) => (order[a.difficulty] ?? 1) - (order[b.difficulty] ?? 1))
    }
    return res
  }, [items, search, sort, filter])

  return (
    <div style={{ padding: '32px', minHeight: '100vh' }}>
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', flexWrap: 'wrap', gap: '16px', marginBottom: '32px' }}>
        <div>
          <div className="section-label" style={{ display: 'inline-flex', marginBottom: '12px' }}>My Craft Library</div>
          <h1 style={{ fontFamily: font.mono, fontSize: 'clamp(22px, 3vw, 30px)', fontWeight: 800, color: C.textPrimary, letterSpacing: '-0.03em' }}>
            Your Saved Projects
          </h1>
          <p style={{ color: C.textMuted, fontSize: '14px', fontFamily: font.sans, marginTop: '4px' }}>{items.length} project{items.length !== 1 ? 's' : ''} in library</p>
        </div>
        <button onClick={() => navigate('/app/generate')} style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '11px 20px', background: C.accent, color: C.bgPrimary, border: 'none', borderRadius: radius.md, fontFamily: font.sans, fontSize: '14px', fontWeight: 600, cursor: 'pointer', transition: 'background 150ms' }}
          onMouseEnter={e => e.currentTarget.style.background = '#FFD95A'}
          onMouseLeave={e => e.currentTarget.style.background = C.accent}
        >
          + New Craft
        </button>
      </div>

      {/* Filters */}
      <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', marginBottom: '24px', alignItems: 'center' }}>
        {/* Search */}
        <div style={{ position: 'relative', flex: '1', minWidth: '200px', maxWidth: '340px' }}>
          <svg style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none' }} width="14" height="14" viewBox="0 0 14 14" fill="none"><circle cx="6" cy="6" r="4.5" stroke={C.textMuted} strokeWidth="1.3"/><path d="M10 10l2.5 2.5" stroke={C.textMuted} strokeWidth="1.3" strokeLinecap="round"/></svg>
          <input type="search" placeholder="Search projects..." value={search} onChange={e => setSearch(e.target.value)}
            style={{ width: '100%', padding: '10px 14px 10px 34px', background: 'rgba(18,60,70,0.5)', border: `1px solid ${C.border}`, borderRadius: radius.md, color: C.textPrimary, fontFamily: font.sans, fontSize: '14px', outline: 'none', transition: 'border-color 150ms' }}
            onFocus={e => e.target.style.borderColor = 'rgba(228,196,65,0.4)'}
            onBlur={e => e.target.style.borderColor = C.border}
          />
        </div>

        {/* Sort */}
        <select value={sort} onChange={e => setSort(e.target.value)}
          style={{ padding: '10px 14px', background: 'rgba(18,60,70,0.5)', border: `1px solid ${C.border}`, borderRadius: radius.md, color: C.textSecondary, fontFamily: font.sans, fontSize: '14px', outline: 'none', cursor: 'pointer' }}>
          {SORT_OPTIONS.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
        </select>

        {/* Category filter */}
        <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
          {categories.map(cat => (
            <button key={cat} onClick={() => setFilter(cat)}
              style={{ padding: '7px 14px', background: filter === cat ? 'rgba(228,196,65,0.12)' : 'rgba(18,60,70,0.4)', border: `1px solid ${filter === cat ? 'rgba(228,196,65,0.25)' : C.border}`, borderRadius: radius.full, color: filter === cat ? C.accent : C.textMuted, fontFamily: font.sans, fontSize: '12px', fontWeight: filter === cat ? 600 : 400, cursor: 'pointer', transition: 'all 150ms' }}>
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Grid */}
      {filtered.length > 0 ? (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: '14px' }}>
          {filtered.map(p => (
            <ProjectCard key={p.id} project={p}
              onOpen={id => navigate(`/app/project/${id}`)}
              onDelete={removeProject}
              onToggleFav={toggleFavorite}
            />
          ))}
        </div>
      ) : (
        <div style={{ textAlign: 'center', padding: '80px 32px' }}>
          <div style={{ fontSize: '48px', marginBottom: '16px' }}>{items.length === 0 ? '📚' : '🔍'}</div>
          <h3 style={{ fontFamily: font.mono, fontSize: '18px', fontWeight: 700, color: C.textPrimary, marginBottom: '8px' }}>
            {items.length === 0 ? 'Library is empty' : 'No results found'}
          </h3>
          <p style={{ color: C.textMuted, fontSize: '14px', fontFamily: font.sans, marginBottom: '24px' }}>
            {items.length === 0 ? 'Save your first generated craft to see it here.' : 'Try a different search or filter.'}
          </p>
          {items.length === 0 && (
            <button onClick={() => navigate('/app/generate')} style={{ padding: '13px 28px', background: C.accent, color: C.bgPrimary, border: 'none', borderRadius: radius.md, fontFamily: font.sans, fontSize: '15px', fontWeight: 600, cursor: 'pointer' }}>
              Generate First Craft
            </button>
          )}
        </div>
      )}
    </div>
  )
}
