import { useNavigate } from 'react-router-dom'
import { useApp } from '../AppContext'
import { C, font, radius, glassCard } from '../tokens'

export default function FavoritesPage() {
  const navigate = useNavigate()
  const { library: { items, toggleFavorite } } = useApp()
  const favorites = items.filter(i => i.favorite)

  return (
    <div style={{ padding: '32px', minHeight: '100vh' }}>
      <div className="section-label" style={{ display: 'inline-flex', marginBottom: '16px' }}>Favorites</div>
      <h1 style={{ fontFamily: font.mono, fontSize: 'clamp(22px, 3vw, 30px)', fontWeight: 800, color: C.textPrimary, letterSpacing: '-0.03em', marginBottom: '6px' }}>
        Starred Projects
      </h1>
      <p style={{ color: C.textMuted, fontSize: '14px', fontFamily: font.sans, marginBottom: '32px' }}>
        {favorites.length} favorited project{favorites.length !== 1 ? 's' : ''}
      </p>

      {favorites.length === 0 ? (
        <div style={{ ...glassCard({ padding: '64px 32px' }), textAlign: 'center' }}>
          <div style={{ fontSize: '48px', marginBottom: '16px' }}>♡</div>
          <h3 style={{ fontFamily: font.mono, fontSize: '18px', fontWeight: 700, color: C.textPrimary, marginBottom: '8px' }}>No favorites yet</h3>
          <p style={{ color: C.textMuted, fontSize: '14px', fontFamily: font.sans, marginBottom: '24px' }}>Click the heart icon on any project to save it here.</p>
          <button onClick={() => navigate('/app/library')} style={{ padding: '12px 24px', background: C.accent, color: C.bgPrimary, border: 'none', borderRadius: radius.md, fontFamily: font.sans, fontSize: '14px', fontWeight: 600, cursor: 'pointer' }}>Browse Library</button>
        </div>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: '14px' }}>
          {favorites.map(p => (
            <div key={p.id} style={{ ...glassCard({ padding: '20px' }), display: 'flex', flexDirection: 'column', gap: '14px' }}>
              <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between' }}>
                <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
                  <span style={{ fontSize: '24px' }}>{p.emoji}</span>
                  <div>
                    <p style={{ fontFamily: font.mono, fontSize: '13px', fontWeight: 700, color: C.textPrimary }}>{p.title}</p>
                    <p style={{ fontFamily: font.sans, fontSize: '11px', color: C.textMuted, marginTop: '2px' }}>{p.category}</p>
                  </div>
                </div>
                <button onClick={() => toggleFavorite(p.id)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#f87171', fontSize: '16px' }} aria-label="Remove from favorites">♥</button>
              </div>
              <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
                <span style={{ padding: '3px 8px', background: 'rgba(228,196,65,0.1)', borderRadius: radius.full, color: C.accent, fontSize: '10px', fontFamily: font.mono }}>{p.difficulty}</span>
                <span style={{ padding: '3px 8px', background: 'rgba(255,255,255,0.04)', borderRadius: radius.full, color: C.textMuted, fontSize: '10px', fontFamily: font.sans }}>{p.time}</span>
              </div>
              <button onClick={() => navigate(`/app/project/${p.id}`)} style={{ padding: '9px', background: C.accent, color: C.bgPrimary, border: 'none', borderRadius: radius.md, fontFamily: font.sans, fontSize: '13px', fontWeight: 600, cursor: 'pointer', transition: 'background 150ms' }}
                onMouseEnter={e => e.currentTarget.style.background = '#FFD95A'}
                onMouseLeave={e => e.currentTarget.style.background = C.accent}
              >Open Project</button>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
