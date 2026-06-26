import { useNavigate } from 'react-router-dom'
import { useApp } from '../AppContext'
import { C, font, radius, glassCard } from '../tokens'

export default function RecentPage() {
  const navigate = useNavigate()
  const { library: { items } } = useApp()
  const recent = [...items].sort((a, b) => new Date(b.savedAt) - new Date(a.savedAt)).slice(0, 20)

  return (
    <div style={{ padding: '32px', minHeight: '100vh' }}>
      <div className="section-label" style={{ display: 'inline-flex', marginBottom: '16px' }}>Recent Activity</div>
      <h1 style={{ fontFamily: font.mono, fontSize: 'clamp(22px, 3vw, 30px)', fontWeight: 800, color: C.textPrimary, letterSpacing: '-0.03em', marginBottom: '6px' }}>
        Recent Projects
      </h1>
      <p style={{ color: C.textMuted, fontSize: '14px', fontFamily: font.sans, marginBottom: '32px' }}>Continue where you left off.</p>

      {recent.length === 0 ? (
        <div style={{ ...glassCard({ padding: '64px 32px' }), textAlign: 'center' }}>
          <div style={{ fontSize: '48px', marginBottom: '16px' }}>🕐</div>
          <h3 style={{ fontFamily: font.mono, fontSize: '18px', fontWeight: 700, color: C.textPrimary, marginBottom: '8px' }}>No recent activity</h3>
          <p style={{ color: C.textMuted, fontSize: '14px', fontFamily: font.sans, marginBottom: '24px' }}>Generate a craft to get started.</p>
          <button onClick={() => navigate('/app/generate')} style={{ padding: '12px 24px', background: C.accent, color: C.bgPrimary, border: 'none', borderRadius: radius.md, fontFamily: font.sans, fontSize: '14px', fontWeight: 600, cursor: 'pointer' }}>Generate Craft</button>
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', maxWidth: '700px' }}>
          {recent.map((p, i) => (
            <button key={p.id} onClick={() => navigate(`/app/project/${p.id}`)}
              style={{ display: 'flex', alignItems: 'center', gap: '16px', padding: '16px 20px', background: 'rgba(18,60,70,0.4)', border: `1px solid ${C.border}`, borderRadius: radius.lg, cursor: 'pointer', textAlign: 'left', transition: 'all 150ms', width: '100%' }}
              onMouseEnter={e => { e.currentTarget.style.background = 'rgba(18,60,70,0.65)'; e.currentTarget.style.transform = 'translateX(4px)' }}
              onMouseLeave={e => { e.currentTarget.style.background = 'rgba(18,60,70,0.4)'; e.currentTarget.style.transform = 'none' }}
            >
              <span style={{ width: '24px', color: C.textMuted, fontFamily: font.mono, fontSize: '12px', flexShrink: 0, textAlign: 'right' }}>{i + 1}</span>
              <span style={{ fontSize: '24px', flexShrink: 0 }}>{p.emoji}</span>
              <div style={{ flex: 1 }}>
                <p style={{ fontFamily: font.mono, fontSize: '13px', fontWeight: 600, color: C.textPrimary }}>{p.title}</p>
                <p style={{ fontFamily: font.sans, fontSize: '12px', color: C.textMuted, marginTop: '2px' }}>
                  {p.category} · {p.difficulty} · {new Date(p.savedAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}
                </p>
              </div>
              <span style={{ padding: '3px 10px', background: p.completionStatus === 'Completed' ? 'rgba(74,222,128,0.1)' : p.completionStatus === 'In Progress' ? 'rgba(228,196,65,0.1)' : 'rgba(255,255,255,0.04)', borderRadius: radius.full, color: p.completionStatus === 'Completed' ? C.success : p.completionStatus === 'In Progress' ? C.accent : C.textMuted, fontSize: '11px', fontFamily: font.mono, flexShrink: 0 }}>
                {p.completionStatus}
              </span>
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M5 2l5 5-5 5" stroke={C.textMuted} strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/></svg>
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
