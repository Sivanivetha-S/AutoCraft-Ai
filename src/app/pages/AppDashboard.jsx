import { useNavigate } from 'react-router-dom'
import { useApp } from '../AppContext'
import { C, font, radius, glassCard } from '../tokens'

const DIFFICULTY_COLOR = { Easy: '#4ADE80', Medium: '#E4C441', Hard: '#f87171' }

function StatCard({ icon, label, value, sub, accent }) {
  return (
    <div style={{ ...glassCard({ padding: '24px' }), display: 'flex', flexDirection: 'column', gap: '12px' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div style={{ width: '38px', height: '38px', background: `rgba(${accent === C.accent ? '228,196,65' : '74,222,128'},0.1)`, border: `1px solid rgba(${accent === C.accent ? '228,196,65' : '74,222,128'},0.2)`, borderRadius: radius.md, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          {icon}
        </div>
      </div>
      <div>
        <p style={{ fontFamily: font.mono, fontSize: '28px', fontWeight: 800, color: accent, letterSpacing: '-0.03em', lineHeight: 1 }}>{value}</p>
        <p style={{ fontFamily: font.sans, fontSize: '14px', fontWeight: 500, color: C.textPrimary, marginTop: '6px' }}>{label}</p>
        <p style={{ fontFamily: font.sans, fontSize: '12px', color: C.textMuted, marginTop: '3px' }}>{sub}</p>
      </div>
    </div>
  )
}

function MiniBar({ values, color }) {
  const max = Math.max(...values, 1)
  return (
    <div style={{ display: 'flex', alignItems: 'flex-end', gap: '4px', height: '40px' }}>
      {values.map((v, i) => (
        <div key={i} style={{ flex: 1, height: `${(v / max) * 100}%`, minHeight: '4px', background: i === values.length - 1 ? color : `rgba(${color === C.accent ? '228,196,65' : '74,222,128'},0.25)`, borderRadius: '2px 2px 0 0', transition: 'height 0.5s ease-out' }} />
      ))}
    </div>
  )
}

export default function AppDashboard() {
  const navigate = useNavigate()
  const { library: { items } } = useApp()

  const total = items.length
  const favorites = items.filter(i => i.favorite).length
  const completed = items.filter(i => i.completionStatus === 'Completed').length
  const recent = [...items].sort((a, b) => new Date(b.savedAt) - new Date(a.savedAt)).slice(0, 4)

  const weekData = [3, 5, 2, 7, 4, 8, total || 6]

  return (
    <div style={{ padding: '32px', minHeight: '100vh' }}>
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', flexWrap: 'wrap', gap: '16px', marginBottom: '36px' }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
            <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: C.success }} />
            <span style={{ fontFamily: font.mono, fontSize: '11px', color: C.textMuted, letterSpacing: '0.08em', textTransform: 'uppercase' }}>CraftFlow AI</span>
          </div>
          <h1 style={{ fontFamily: font.mono, fontSize: 'clamp(22px, 3vw, 30px)', fontWeight: 800, color: C.textPrimary, letterSpacing: '-0.03em' }}>
            Welcome back 👋
          </h1>
          <p style={{ color: C.textSecondary, fontSize: '14px', fontFamily: font.sans, marginTop: '4px' }}>
            Your creative workspace is ready. What are you making today?
          </p>
        </div>
        <button
          onClick={() => navigate('/app/generate')}
          style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '13px 24px', background: C.accent, color: C.bgPrimary, border: 'none', borderRadius: radius.md, fontFamily: font.sans, fontSize: '14px', fontWeight: 600, cursor: 'pointer', transition: 'background 150ms ease-out, transform 150ms ease-out' }}
          onMouseEnter={e => { e.currentTarget.style.background = '#FFD95A'; e.currentTarget.style.transform = 'translateY(-1px)' }}
          onMouseLeave={e => { e.currentTarget.style.background = C.accent; e.currentTarget.style.transform = 'none' }}
        >
          <SparkleIcon size={16} /> Generate New Craft
        </button>
      </div>

      {/* Stats */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '16px', marginBottom: '32px' }}>
        <StatCard icon={<CraftIcon />} label="Crafts Created" value={total || '0'} sub="All time" accent={C.accent} />
        <StatCard icon={<SaveIcon />} label="Projects Saved" value={total || '0'} sub="In your library" accent={C.success} />
        <StatCard icon={<HeartFillIcon />} label="Favorites" value={favorites || '0'} sub="Starred projects" accent={C.accent} />
        <StatCard icon={<CheckIcon />} label="Completed" value={completed || '0'} sub={`${total ? Math.round((completed / total) * 100) : 0}% completion rate`} accent={C.success} />
      </div>

      {/* Charts + Activity row */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '16px', marginBottom: '32px' }}>
        {/* Activity chart */}
        <div style={{ ...glassCard({ padding: '24px' }), gridColumn: 'span 2' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
            <div>
              <p style={{ fontFamily: font.mono, fontSize: '12px', color: C.textMuted, letterSpacing: '0.07em', textTransform: 'uppercase', marginBottom: '4px' }}>Crafts Generated</p>
              <p style={{ fontFamily: font.mono, fontSize: '24px', fontWeight: 700, color: C.textPrimary }}>{total} <span style={{ color: C.success, fontSize: '14px' }}>total</span></p>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', padding: '5px 12px', background: 'rgba(74,222,128,0.1)', border: '1px solid rgba(74,222,128,0.2)', borderRadius: radius.full }}>
              <svg width="10" height="10" viewBox="0 0 10 10" fill="none"><path d="M2 7l2.5-2.5L6 6l3-4" stroke={C.success} strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/></svg>
              <span style={{ color: C.success, fontSize: '12px', fontFamily: font.mono, fontWeight: 600 }}>Active</span>
            </div>
          </div>
          <MiniBar values={weekData} color={C.accent} />
          <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '8px' }}>
            {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map(d => (
              <span key={d} style={{ color: C.textMuted, fontSize: '10px', fontFamily: font.mono }}>{d}</span>
            ))}
          </div>
        </div>

        {/* Sustainability score */}
        <div style={{ ...glassCard({ padding: '24px' }) }}>
          <p style={{ fontFamily: font.mono, fontSize: '12px', color: C.textMuted, letterSpacing: '0.07em', textTransform: 'uppercase', marginBottom: '16px' }}>Sustainability Score</p>
          <div style={{ position: 'relative', width: '100px', height: '100px', margin: '0 auto 16px' }}>
            <svg width="100" height="100" viewBox="0 0 100 100">
              <circle cx="50" cy="50" r="40" fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="8"/>
              <circle cx="50" cy="50" r="40" fill="none" stroke={C.success} strokeWidth="8"
                strokeDasharray={`${(92 / 100) * 251} 251`} strokeLinecap="round"
                style={{ transform: 'rotate(-90deg)', transformOrigin: '50% 50%' }}/>
            </svg>
            <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column' }}>
              <span style={{ fontFamily: font.mono, fontSize: '20px', fontWeight: 800, color: C.textPrimary }}>92</span>
              <span style={{ fontFamily: font.sans, fontSize: '10px', color: C.textMuted }}>/ 100</span>
            </div>
          </div>
          <p style={{ textAlign: 'center', color: C.success, fontSize: '13px', fontFamily: font.sans, fontWeight: 500 }}>Excellent eco impact</p>
          <p style={{ textAlign: 'center', color: C.textMuted, fontSize: '12px', fontFamily: font.sans, marginTop: '4px' }}>Materials kept from landfill</p>
        </div>
      </div>

      {/* Quick Actions */}
      <div style={{ marginBottom: '32px' }}>
        <h2 style={{ fontFamily: font.mono, fontSize: '16px', fontWeight: 700, color: C.textPrimary, marginBottom: '16px' }}>Quick Actions</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '12px' }}>
          {[
            { icon: '📸', label: 'Upload Materials', sub: 'Scan & generate crafts', to: '/app/generate', accent: C.accent },
            { icon: '📚', label: 'Browse Library', sub: `${total} saved projects`, to: '/app/library', accent: C.success },
            { icon: '❤️', label: 'My Favorites', sub: `${favorites} starred`, to: '/app/favorites', accent: C.accent },
            { icon: '🕐', label: 'Recent Activity', sub: 'Continue where you left off', to: '/app/recent', accent: C.success },
          ].map(action => (
            <button
              key={action.to}
              onClick={() => navigate(action.to)}
              style={{ display: 'flex', alignItems: 'center', gap: '14px', padding: '18px', background: 'rgba(18,60,70,0.4)', border: `1px solid ${C.border}`, borderRadius: radius.lg, cursor: 'pointer', textAlign: 'left', transition: 'background 150ms, border-color 150ms, transform 150ms' }}
              onMouseEnter={e => { e.currentTarget.style.background = 'rgba(18,60,70,0.65)'; e.currentTarget.style.borderColor = `rgba(${action.accent === C.accent ? '228,196,65' : '74,222,128'},0.2)`; e.currentTarget.style.transform = 'translateY(-2px)' }}
              onMouseLeave={e => { e.currentTarget.style.background = 'rgba(18,60,70,0.4)'; e.currentTarget.style.borderColor = C.border; e.currentTarget.style.transform = 'none' }}
            >
              <span style={{ fontSize: '24px' }}>{action.icon}</span>
              <div>
                <p style={{ fontFamily: font.sans, fontSize: '14px', fontWeight: 600, color: C.textPrimary }}>{action.label}</p>
                <p style={{ fontFamily: font.sans, fontSize: '12px', color: C.textMuted, marginTop: '2px' }}>{action.sub}</p>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Recent Projects */}
      {recent.length > 0 && (
        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
            <h2 style={{ fontFamily: font.mono, fontSize: '16px', fontWeight: 700, color: C.textPrimary }}>Recent Projects</h2>
            <button onClick={() => navigate('/app/library')} style={{ background: 'none', border: 'none', color: C.accent, fontSize: '13px', fontFamily: font.sans, cursor: 'pointer' }}>View all →</button>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: '12px' }}>
            {recent.map(p => (
              <button
                key={p.id}
                onClick={() => navigate(`/app/project/${p.id}`)}
                style={{ padding: '20px', background: 'rgba(18,60,70,0.4)', border: `1px solid ${C.border}`, borderRadius: radius.lg, cursor: 'pointer', textAlign: 'left', transition: 'background 150ms, border-color 150ms, transform 150ms' }}
                onMouseEnter={e => { e.currentTarget.style.background = 'rgba(18,60,70,0.65)'; e.currentTarget.style.transform = 'translateY(-2px)' }}
                onMouseLeave={e => { e.currentTarget.style.background = 'rgba(18,60,70,0.4)'; e.currentTarget.style.transform = 'none' }}
              >
                <div style={{ fontSize: '28px', marginBottom: '10px' }}>{p.emoji}</div>
                <p style={{ fontFamily: font.mono, fontSize: '13px', fontWeight: 600, color: C.textPrimary, marginBottom: '4px' }}>{p.title}</p>
                <p style={{ fontFamily: font.sans, fontSize: '12px', color: C.textMuted, marginBottom: '8px' }}>{p.category}</p>
                <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
                  <span style={{ padding: '2px 8px', background: `rgba(${DIFFICULTY_COLOR[p.difficulty] === '#4ADE80' ? '74,222,128' : '228,196,65'},0.1)`, borderRadius: radius.full, color: DIFFICULTY_COLOR[p.difficulty] || C.accent, fontSize: '11px', fontFamily: font.mono }}>{p.difficulty}</span>
                  <span style={{ padding: '2px 8px', background: 'rgba(255,255,255,0.04)', borderRadius: radius.full, color: C.textMuted, fontSize: '11px', fontFamily: font.sans }}>{p.time}</span>
                </div>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Empty state */}
      {total === 0 && (
        <div style={{ ...glassCard({ padding: '48px 32px' }), textAlign: 'center', marginTop: '16px' }}>
          <div style={{ fontSize: '48px', marginBottom: '16px' }}>🎨</div>
          <h3 style={{ fontFamily: font.mono, fontSize: '18px', fontWeight: 700, color: C.textPrimary, marginBottom: '8px' }}>No projects yet</h3>
          <p style={{ color: C.textMuted, fontSize: '14px', fontFamily: font.sans, marginBottom: '24px' }}>Upload your first craft materials and let AI do the magic.</p>
          <button
            onClick={() => navigate('/app/generate')}
            style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '13px 28px', background: C.accent, color: C.bgPrimary, border: 'none', borderRadius: radius.md, fontFamily: font.sans, fontSize: '15px', fontWeight: 600, cursor: 'pointer' }}
          >
            <SparkleIcon size={16} /> Start Generating
          </button>
        </div>
      )}
    </div>
  )
}

function SparkleIcon({ size = 16 }) { return <svg width={size} height={size} viewBox="0 0 16 16" fill="none"><path d="M8 2v2M8 12v2M2 8h2M12 8h2M4.1 4.1l1.4 1.4M10.5 10.5l1.4 1.4M4.1 11.9l1.4-1.4M10.5 5.5l1.4-1.4" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/><circle cx="8" cy="8" r="2" stroke="currentColor" strokeWidth="1.4"/></svg> }
function CraftIcon() { return <svg width="18" height="18" viewBox="0 0 18 18" fill="none"><path d="M9 2L15 6v6l-6 4-6-4V6l6-4z" stroke="#E4C441" strokeWidth="1.3"/><circle cx="9" cy="9" r="2" stroke="#E4C441" strokeWidth="1.3"/></svg> }
function SaveIcon() { return <svg width="18" height="18" viewBox="0 0 18 18" fill="none"><rect x="3" y="2" width="12" height="14" rx="2" stroke="#4ADE80" strokeWidth="1.3"/><path d="M6 2v5h6V2M9 10v4M7 12h4" stroke="#4ADE80" strokeWidth="1.3" strokeLinecap="round"/></svg> }
function HeartFillIcon() { return <svg width="18" height="18" viewBox="0 0 18 18" fill="none"><path d="M9 15s-7-4.5-7-8.5a4 4 0 018 0 4 4 0 018 0c0 4-7 8.5-7 8.5z" stroke="#E4C441" strokeWidth="1.3" fill="rgba(228,196,65,0.15)" strokeLinejoin="round"/></svg> }
function CheckIcon() { return <svg width="18" height="18" viewBox="0 0 18 18" fill="none"><circle cx="9" cy="9" r="7" stroke="#4ADE80" strokeWidth="1.3"/><path d="M5.5 9l2.5 2.5 5-5" stroke="#4ADE80" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/></svg> }
