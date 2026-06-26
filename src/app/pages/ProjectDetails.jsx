import { useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useApp } from '../AppContext'
import { C, font, radius, glassCard } from '../tokens'

const STATUS_OPTIONS = ['Not Started', 'In Progress', 'Completed']
const STATUS_COLOR = { 'Not Started': C.textMuted, 'In Progress': C.accent, 'Completed': C.success }

export default function ProjectDetails() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { library: { getProject, updateProject, removeProject, toggleFavorite } } = useApp()
  const project = getProject(id)
  const [notes, setNotes] = useState(project?.notes || '')
  const [editingNotes, setEditingNotes] = useState(false)
  const [confirmDelete, setConfirmDelete] = useState(false)

  if (!project) {
    return (
      <div style={{ padding: '80px', textAlign: 'center' }}>
        <p style={{ color: C.textMuted, fontFamily: font.mono, fontSize: '18px' }}>Project not found.</p>
        <button onClick={() => navigate('/app/library')} style={{ marginTop: '16px', padding: '10px 20px', background: C.accent, color: C.bgPrimary, border: 'none', borderRadius: radius.md, fontFamily: font.sans, fontWeight: 600, cursor: 'pointer' }}>Back to Library</button>
      </div>
    )
  }

  const handleStatusChange = (status) => updateProject(id, { completionStatus: status })
  const handleSaveNotes = () => { updateProject(id, { notes }); setEditingNotes(false) }
  const handleDelete = () => { removeProject(id); navigate('/app/library') }

  return (
    <div style={{ padding: '32px', minHeight: '100vh', maxWidth: '1100px' }}>
      {/* Nav */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '28px', flexWrap: 'wrap' }}>
        <button onClick={() => navigate('/app/library')} style={{ display: 'flex', alignItems: 'center', gap: '6px', background: 'rgba(255,255,255,0.04)', border: `1px solid ${C.border}`, borderRadius: radius.md, padding: '8px 14px', color: C.textSecondary, fontFamily: font.sans, fontSize: '13px', cursor: 'pointer' }}>
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none"><path d="M8 2L4 6l4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
          My Library
        </button>
        <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M5 2l4 5-4 5" stroke={C.textMuted} strokeWidth="1.2" strokeLinecap="round"/></svg>
        <span style={{ fontFamily: font.mono, fontSize: '13px', color: C.textMuted }}>{project.title}</span>
      </div>

      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', flexWrap: 'wrap', gap: '20px', marginBottom: '32px' }}>
        <div style={{ display: 'flex', gap: '16px', alignItems: 'flex-start' }}>
          <div style={{ width: '60px', height: '60px', background: `rgba(${project.color === C.accent ? '228,196,65' : '74,222,128'},0.12)`, borderRadius: '14px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '30px', flexShrink: 0 }}>
            {project.emoji}
          </div>
          <div>
            <h1 style={{ fontFamily: font.mono, fontSize: 'clamp(20px, 3vw, 28px)', fontWeight: 800, color: C.textPrimary, letterSpacing: '-0.03em', marginBottom: '6px' }}>{project.title}</h1>
            <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
              <span style={{ padding: '3px 10px', background: 'rgba(255,255,255,0.05)', borderRadius: radius.full, color: C.textMuted, fontSize: '12px', fontFamily: font.sans }}>{project.category}</span>
              <span style={{ padding: '3px 10px', background: `rgba(${STATUS_COLOR[project.completionStatus] === C.success ? '74,222,128' : STATUS_COLOR[project.completionStatus] === C.accent ? '228,196,65' : '143,167,173'},0.1)`, borderRadius: radius.full, color: STATUS_COLOR[project.completionStatus], fontSize: '12px', fontFamily: font.mono, fontWeight: 600 }}>● {project.completionStatus}</span>
            </div>
          </div>
        </div>
        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
          <button onClick={() => toggleFavorite(id)} style={{ display: 'flex', alignItems: 'center', gap: '6px', padding: '9px 16px', background: project.favorite ? 'rgba(248,113,113,0.1)' : 'rgba(255,255,255,0.04)', border: `1px solid ${project.favorite ? 'rgba(248,113,113,0.3)' : C.border}`, borderRadius: radius.md, color: project.favorite ? '#f87171' : C.textMuted, fontFamily: font.sans, fontSize: '13px', cursor: 'pointer', transition: 'all 150ms' }}>
            ♥ {project.favorite ? 'Favorited' : 'Favorite'}
          </button>
          {confirmDelete ? (
            <div style={{ display: 'flex', gap: '6px' }}>
              <button onClick={handleDelete} style={{ padding: '9px 16px', background: 'rgba(248,113,113,0.15)', border: '1px solid rgba(248,113,113,0.3)', borderRadius: radius.md, color: '#f87171', fontFamily: font.sans, fontSize: '13px', fontWeight: 600, cursor: 'pointer' }}>Delete</button>
              <button onClick={() => setConfirmDelete(false)} style={{ padding: '9px 16px', background: 'transparent', border: `1px solid ${C.border}`, borderRadius: radius.md, color: C.textMuted, fontFamily: font.sans, fontSize: '13px', cursor: 'pointer' }}>Cancel</button>
            </div>
          ) : (
            <button onClick={() => setConfirmDelete(true)} style={{ padding: '9px 14px', background: 'transparent', border: `1px solid ${C.border}`, borderRadius: radius.md, color: C.textMuted, fontFamily: font.sans, fontSize: '13px', cursor: 'pointer', transition: 'border-color 150ms' }}
              onMouseEnter={e => e.currentTarget.style.borderColor = 'rgba(248,113,113,0.3)'}
              onMouseLeave={e => e.currentTarget.style.borderColor = C.border}
            >🗑 Delete</button>
          )}
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '20px' }}>
        {/* Left column */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {/* Quick info */}
          <div style={{ ...glassCard({ padding: '20px' }) }}>
            <p style={{ fontFamily: font.mono, fontSize: '11px', color: C.textMuted, letterSpacing: '0.07em', textTransform: 'uppercase', marginBottom: '14px' }}>Project Details</p>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
              {[
                { label: 'Difficulty', value: project.difficulty },
                { label: 'Time Required', value: project.time },
                { label: 'Skill Level', value: project.skill },
                { label: 'Cost', value: project.cost },
                { label: 'Sustainability', value: `${project.sustainability}/100` },
                { label: 'Saved', value: new Date(project.savedAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'short' }) },
              ].map(s => (
                <div key={s.label} style={{ padding: '10px', background: 'rgba(7,30,38,0.5)', borderRadius: radius.md, border: `1px solid ${C.border}` }}>
                  <p style={{ fontFamily: font.sans, fontSize: '10px', color: C.textMuted, marginBottom: '3px' }}>{s.label}</p>
                  <p style={{ fontFamily: font.mono, fontSize: '13px', fontWeight: 600, color: C.textPrimary }}>{s.value}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Completion status */}
          <div style={{ ...glassCard({ padding: '20px' }) }}>
            <p style={{ fontFamily: font.mono, fontSize: '11px', color: C.textMuted, letterSpacing: '0.07em', textTransform: 'uppercase', marginBottom: '12px' }}>Completion Status</p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
              {STATUS_OPTIONS.map(s => (
                <button key={s} onClick={() => handleStatusChange(s)}
                  style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '10px 14px', background: project.completionStatus === s ? `rgba(${STATUS_COLOR[s] === C.success ? '74,222,128' : STATUS_COLOR[s] === C.accent ? '228,196,65' : '143,167,173'},0.1)` : 'transparent', border: `1px solid ${project.completionStatus === s ? `rgba(${STATUS_COLOR[s] === C.success ? '74,222,128' : STATUS_COLOR[s] === C.accent ? '228,196,65' : '143,167,173'},0.25)` : C.border}`, borderRadius: radius.md, color: project.completionStatus === s ? STATUS_COLOR[s] : C.textMuted, fontFamily: font.sans, fontSize: '13px', fontWeight: project.completionStatus === s ? 600 : 400, cursor: 'pointer', transition: 'all 150ms', textAlign: 'left' }}>
                  <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: project.completionStatus === s ? STATUS_COLOR[s] : 'rgba(255,255,255,0.15)', flexShrink: 0 }} />
                  {s}
                </button>
              ))}
            </div>
          </div>

          {/* Uploaded images */}
          {project.uploadedImages?.length > 0 && (
            <div style={{ ...glassCard({ padding: '20px' }) }}>
              <p style={{ fontFamily: font.mono, fontSize: '11px', color: C.textMuted, letterSpacing: '0.07em', textTransform: 'uppercase', marginBottom: '12px' }}>Uploaded Materials ({project.uploadedImages.length})</p>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(72px, 1fr))', gap: '8px' }}>
                {project.uploadedImages.map((img, i) => (
                  <div key={i} style={{ aspectRatio: '1', borderRadius: radius.md, overflow: 'hidden', border: `1px solid ${C.border}` }}>
                    <img src={img.preview} alt={img.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} loading="lazy" />
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Notes */}
          <div style={{ ...glassCard({ padding: '20px' }) }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
              <p style={{ fontFamily: font.mono, fontSize: '11px', color: C.textMuted, letterSpacing: '0.07em', textTransform: 'uppercase' }}>Notes</p>
              <button onClick={() => editingNotes ? handleSaveNotes() : setEditingNotes(true)}
                style={{ background: 'none', border: 'none', color: C.accent, fontSize: '12px', fontFamily: font.sans, cursor: 'pointer' }}>
                {editingNotes ? 'Save' : 'Edit'}
              </button>
            </div>
            {editingNotes ? (
              <textarea value={notes} onChange={e => setNotes(e.target.value)}
                placeholder="Add your notes, progress, or ideas here..."
                style={{ width: '100%', minHeight: '100px', background: 'rgba(7,30,38,0.6)', border: `1px solid rgba(228,196,65,0.3)`, borderRadius: radius.md, color: C.textPrimary, fontFamily: font.sans, fontSize: '13px', padding: '10px', resize: 'vertical', outline: 'none', lineHeight: '1.6' }}
              />
            ) : (
              <p style={{ fontFamily: font.sans, fontSize: '13px', color: notes ? C.textSecondary : C.textMuted, lineHeight: '1.7', fontStyle: notes ? 'normal' : 'italic' }}>
                {notes || 'No notes yet. Click Edit to add some.'}
              </p>
            )}
          </div>
        </div>

        {/* Right column */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {/* Description */}
          <div style={{ ...glassCard({ padding: '20px' }) }}>
            <p style={{ fontFamily: font.mono, fontSize: '11px', color: C.textMuted, letterSpacing: '0.07em', textTransform: 'uppercase', marginBottom: '12px' }}>Description</p>
            <p style={{ fontFamily: font.sans, fontSize: '14px', color: C.textSecondary, lineHeight: '1.75' }}>{project.description}</p>
          </div>

          {/* Steps */}
          {project.steps?.length > 0 && (
            <div style={{ ...glassCard({ padding: '20px' }) }}>
              <p style={{ fontFamily: font.mono, fontSize: '11px', color: C.textMuted, letterSpacing: '0.07em', textTransform: 'uppercase', marginBottom: '16px' }}>Step-by-Step Instructions</p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                {project.steps.map((step, i) => (
                  <div key={i} style={{ display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
                    <div style={{ width: '24px', height: '24px', borderRadius: '7px', background: 'rgba(228,196,65,0.1)', border: '1px solid rgba(228,196,65,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                      <span style={{ fontFamily: font.mono, fontSize: '10px', fontWeight: 700, color: C.accent }}>{step.n}</span>
                    </div>
                    <div>
                      <p style={{ fontFamily: font.mono, fontSize: '12px', fontWeight: 600, color: C.textPrimary, marginBottom: '3px' }}>{step.title}</p>
                      <p style={{ fontFamily: font.sans, fontSize: '12px', color: C.textSecondary, lineHeight: '1.6' }}>{step.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Materials */}
          {project.materials?.length > 0 && (
            <div style={{ ...glassCard({ padding: '20px' }) }}>
              <p style={{ fontFamily: font.mono, fontSize: '11px', color: C.textMuted, letterSpacing: '0.07em', textTransform: 'uppercase', marginBottom: '12px' }}>Materials Needed</p>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '7px' }}>
                {project.materials.map((m, i) => (
                  <span key={i} style={{ padding: '5px 12px', background: 'rgba(255,255,255,0.04)', border: `1px solid ${C.border}`, borderRadius: radius.full, color: C.textSecondary, fontSize: '12px', fontFamily: font.sans }}>{m}</span>
                ))}
              </div>
            </div>
          )}

          {/* Eco impact */}
          {project.environmentalImpact && (
            <div style={{ ...glassCard({ padding: '20px' }), border: '1px solid rgba(74,222,128,0.15)' }}>
              <p style={{ fontFamily: font.mono, fontSize: '11px', color: C.success, letterSpacing: '0.07em', textTransform: 'uppercase', marginBottom: '10px' }}>🌿 Eco Impact</p>
              <p style={{ fontFamily: font.sans, fontSize: '13px', color: C.textSecondary, lineHeight: '1.65' }}>{project.environmentalImpact}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
