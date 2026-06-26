import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useApp } from '../AppContext'
import { C, font, radius, glassCard } from '../tokens'

const DIFF_COLOR = { Easy: C.success, Medium: C.accent, Hard: '#f87171' }

// ── Craft Preview Image Panel ────────────────────────────────────────────────
function CraftPreviewPanel({ craft, uploadedImages }) {
  const [imgLoaded, setImgLoaded] = useState(false)
  const [lightbox, setLightbox] = useState(false)

  // Reset loaded state when craft changes
  useEffect(() => { setImgLoaded(false) }, [craft.id])

  const handleDownloadImage = () => {
    if (!craft.previewImage) return
    const a = document.createElement('a')
    a.href = craft.previewImage
    a.download = `${craft.title.replace(/\s+/g, '_')}_preview.png`
    a.click()
  }

  return (
    <>
      <div style={{ ...glassCard({ padding: '0' }), overflow: 'hidden', position: 'relative' }}>
        {/* AI Generated label */}
        <div style={{ position: 'absolute', top: '14px', left: '14px', zIndex: 3, display: 'flex', alignItems: 'center', gap: '6px', padding: '5px 12px', background: 'rgba(7,30,38,0.85)', border: `1px solid rgba(228,196,65,0.3)`, borderRadius: radius.full, backdropFilter: 'blur(8px)' }}>
          <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: C.accent, animation: 'pulse-glow 2s infinite' }} />
          <span style={{ fontFamily: font.mono, fontSize: '11px', fontWeight: 600, color: C.accent, letterSpacing: '0.06em' }}>AI GENERATED PREVIEW</span>
        </div>

        {/* Action buttons top-right */}
        <div style={{ position: 'absolute', top: '14px', right: '14px', zIndex: 3, display: 'flex', gap: '8px' }}>
          <button
            onClick={handleDownloadImage}
            title="Download preview image"
            style={{ width: '34px', height: '34px', background: 'rgba(7,30,38,0.85)', border: `1px solid ${C.border}`, borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', backdropFilter: 'blur(8px)', transition: 'border-color 150ms' }}
            onMouseEnter={e => e.currentTarget.style.borderColor = `rgba(228,196,65,0.4)`}
            onMouseLeave={e => e.currentTarget.style.borderColor = C.border}
          >
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M7 1v8M4 6l3 3 3-3M2 11h10" stroke={C.textSecondary} strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/></svg>
          </button>
          <button
            onClick={() => setLightbox(true)}
            title="View full size"
            style={{ width: '34px', height: '34px', background: 'rgba(7,30,38,0.85)', border: `1px solid ${C.border}`, borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', backdropFilter: 'blur(8px)', transition: 'border-color 150ms' }}
            onMouseEnter={e => e.currentTarget.style.borderColor = `rgba(228,196,65,0.4)`}
            onMouseLeave={e => e.currentTarget.style.borderColor = C.border}
          >
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M9 1h4v4M5 13H1V9M13 1L8 6M1 13l5-5" stroke={C.textSecondary} strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/></svg>
          </button>
        </div>

        {/* Preview image */}
        {craft.previewImage ? (
          <>
            {/* Shimmer while loading */}
            {!imgLoaded && (
              <div style={{ width: '100%', height: '280px', background: 'linear-gradient(90deg, rgba(18,60,70,0.6) 25%, rgba(30,80,90,0.6) 50%, rgba(18,60,70,0.6) 75%)', backgroundSize: '200% 100%', animation: 'shimmer 1.5s linear infinite' }} />
            )}
            <img
              src={craft.previewImage}
              alt={`AI generated preview of ${craft.title}`}
              onLoad={() => setImgLoaded(true)}
              style={{ width: '100%', display: imgLoaded ? 'block' : 'none', borderRadius: '16px 16px 0 0', cursor: 'zoom-in' }}
              onClick={() => setLightbox(true)}
            />
          </>
        ) : (
          // Fallback illustrated placeholder
          <div style={{ width: '100%', height: '220px', background: 'rgba(7,30,38,0.6)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '12px' }}>
            <span style={{ fontSize: '56px' }}>{craft.emoji}</span>
            <span style={{ fontFamily: font.mono, fontSize: '13px', color: C.textMuted }}>Preview generating...</span>
          </div>
        )}

        {/* Uploaded materials overlay strip */}
        {uploadedImages.length > 0 && (
          <div style={{ padding: '12px 16px', background: 'rgba(7,30,38,0.8)', borderTop: `1px solid ${C.border}`, display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span style={{ fontFamily: font.mono, fontSize: '10px', color: C.textMuted, letterSpacing: '0.07em', textTransform: 'uppercase', flexShrink: 0 }}>From your materials</span>
            <div style={{ display: 'flex', gap: '6px', overflow: 'hidden' }}>
              {uploadedImages.slice(0, 6).map((img, i) => (
                <div key={i} style={{ width: '32px', height: '32px', borderRadius: '6px', overflow: 'hidden', border: `1px solid ${C.border}`, flexShrink: 0 }}>
                  <img src={img.preview} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                </div>
              ))}
              {uploadedImages.length > 6 && (
                <div style={{ width: '32px', height: '32px', borderRadius: '6px', background: 'rgba(255,255,255,0.04)', border: `1px solid ${C.border}`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  <span style={{ fontFamily: font.mono, fontSize: '9px', color: C.textMuted }}>+{uploadedImages.length - 6}</span>
                </div>
              )}
            </div>
            <div style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: '5px' }}>
              <svg width="10" height="10" viewBox="0 0 10 10" fill="none"><circle cx="5" cy="5" r="4" stroke={C.success} strokeWidth="1"/><path d="M3 5l1.5 1.5L7 3.5" stroke={C.success} strokeWidth="1.2" strokeLinecap="round"/></svg>
              <span style={{ fontFamily: font.mono, fontSize: '10px', color: C.success }}>Analyzed</span>
            </div>
          </div>
        )}
      </div>

      {/* Lightbox */}
      {lightbox && (
        <div
          onClick={() => setLightbox(false)}
          style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.92)', zIndex: 9999, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '24px', cursor: 'zoom-out' }}
          role="dialog"
          aria-modal="true"
          aria-label={`Full preview of ${craft.title}`}
        >
          <div onClick={e => e.stopPropagation()} style={{ position: 'relative', maxWidth: '900px', width: '100%' }}>
            <button
              onClick={() => setLightbox(false)}
              style={{ position: 'absolute', top: '-40px', right: 0, background: 'none', border: 'none', color: C.textMuted, fontFamily: font.mono, fontSize: '13px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px' }}
            >
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none"><path d="M1 1l10 10M11 1L1 11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/></svg>
              Close
            </button>
            <img src={craft.previewImage} alt={craft.title} style={{ width: '100%', borderRadius: '12px', display: 'block', boxShadow: '0 32px 80px rgba(0,0,0,0.6)' }} />
            <div style={{ display: 'flex', gap: '10px', marginTop: '16px', justifyContent: 'center' }}>
              <button onClick={handleDownloadImage}
                style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '10px 22px', background: C.accent, color: C.bgPrimary, border: 'none', borderRadius: radius.md, fontFamily: font.sans, fontSize: '14px', fontWeight: 600, cursor: 'pointer' }}>
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M7 1v8M4 6l3 3 3-3M2 11h10" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/></svg>
                Download Preview Image
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

function VariationCard({ craft, index, isSelected, onClick }) {
  const [fav, setFav] = useState(false)
  return (
    <button
      onClick={onClick}
      style={{
        padding: '20px', background: isSelected ? 'rgba(228,196,65,0.08)' : 'rgba(18,60,70,0.45)',
        border: `1.5px solid ${isSelected ? 'rgba(228,196,65,0.35)' : C.border}`,
        borderRadius: radius.lg, textAlign: 'left', cursor: 'pointer', width: '100%',
        transition: 'all 200ms ease-out',
        transform: isSelected ? 'scale(1.01)' : 'scale(1)',
      }}
      onMouseEnter={e => { if (!isSelected) { e.currentTarget.style.background = 'rgba(18,60,70,0.65)'; e.currentTarget.style.transform = 'translateY(-2px)' }}}
      onMouseLeave={e => { if (!isSelected) { e.currentTarget.style.background = 'rgba(18,60,70,0.45)'; e.currentTarget.style.transform = 'scale(1)' }}}
    >
      {/* Thumbnail preview strip */}
      {craft.previewImage && (
        <div style={{ width: '100%', height: '80px', borderRadius: '8px', overflow: 'hidden', marginBottom: '14px', position: 'relative' }}>
          <img src={craft.previewImage} alt={craft.title} style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center 30%' }} />
          <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(7,30,38,0.6), transparent)' }} />
          {isSelected && (
            <div style={{ position: 'absolute', top: '6px', right: '6px', width: '18px', height: '18px', background: C.accent, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <svg width="9" height="9" viewBox="0 0 9 9" fill="none"><path d="M1.5 4.5l2 2 4-4" stroke="#071E26" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/></svg>
            </div>
          )}
        </div>
      )}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '12px' }}>
        <div style={{ width: '44px', height: '44px', background: `rgba(${craft.color === C.accent ? '228,196,65' : '74,222,128'},0.12)`, borderRadius: radius.md, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '22px' }}>
          {craft.emoji}
        </div>
        <button
          onClick={e => { e.stopPropagation(); setFav(v => !v) }}
          style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '4px' }}
          aria-label={fav ? 'Unfavorite' : 'Favorite'}
        >
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path d="M8 13.5S1.5 9.5 1.5 5.5a3.5 3.5 0 017 0 3.5 3.5 0 017 0c0 4-6.5 8-6.5 8z" stroke={fav ? '#f87171' : C.textMuted} strokeWidth="1.3" fill={fav ? 'rgba(248,113,113,0.25)' : 'none'} strokeLinejoin="round"/>
          </svg>
        </button>
      </div>
      <p style={{ fontFamily: font.mono, fontSize: '13px', fontWeight: 600, color: isSelected ? C.accent : C.textPrimary, marginBottom: '4px' }}>
        Option {index + 1}: {craft.title}
      </p>
      <p style={{ fontFamily: font.sans, fontSize: '12px', color: C.textMuted, marginBottom: '12px' }}>{craft.category}</p>
      <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
        <span style={{ padding: '3px 8px', background: `rgba(${DIFF_COLOR[craft.difficulty] === C.success ? '74,222,128' : '228,196,65'},0.1)`, borderRadius: radius.full, color: DIFF_COLOR[craft.difficulty], fontSize: '10px', fontFamily: font.mono }}>{craft.difficulty}</span>
        <span style={{ padding: '3px 8px', background: 'rgba(255,255,255,0.04)', borderRadius: radius.full, color: C.textMuted, fontSize: '10px', fontFamily: font.sans }}>{craft.time}</span>
        <span style={{ padding: '3px 8px', background: 'rgba(255,255,255,0.04)', borderRadius: radius.full, color: C.textSecondary, fontSize: '10px', fontFamily: font.sans }}>{craft.cost}</span>
      </div>
      {isSelected && (
        <div style={{ marginTop: '10px', display: 'flex', alignItems: 'center', gap: '5px' }}>
          <div style={{ width: '5px', height: '5px', borderRadius: '50%', background: C.accent }} />
          <span style={{ color: C.accent, fontSize: '11px', fontFamily: font.mono, fontWeight: 600 }}>Selected</span>
        </div>
      )}
    </button>
  )
}

function StepCard({ step }) {
  return (
    <div style={{ display: 'flex', gap: '16px', alignItems: 'flex-start' }}>
      <div style={{ width: '28px', height: '28px', borderRadius: '8px', background: 'rgba(228,196,65,0.12)', border: '1px solid rgba(228,196,65,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
        <span style={{ fontFamily: font.mono, fontSize: '11px', fontWeight: 700, color: C.accent }}>{step.n}</span>
      </div>
      <div>
        <p style={{ fontFamily: font.mono, fontSize: '13px', fontWeight: 600, color: C.textPrimary, marginBottom: '4px' }}>{step.title}</p>
        <p style={{ fontFamily: font.sans, fontSize: '13px', color: C.textSecondary, lineHeight: '1.65' }}>{step.desc}</p>
      </div>
    </div>
  )
}

export default function ResultsPage() {
  const navigate = useNavigate()
  const { craftResults, uploadedImages, library: { addProject } } = useApp()
  const [selected, setSelected] = useState(0)
  const [saved, setSaved] = useState(false)
  const [savedId, setSavedId] = useState(null)

  if (!craftResults.length) {
    navigate('/app/generate')
    return null
  }

  const craft = craftResults[selected]

  const handleSave = () => {
    if (saved) { navigate(`/app/project/${savedId}`); return }
    const id = addProject(craft, uploadedImages)
    setSavedId(id)
    setSaved(true)
  }

  const handleDownload = () => {
    const text = [
      `# ${craft.title}`,
      `Category: ${craft.category} | Difficulty: ${craft.difficulty} | Time: ${craft.time}`,
      `Cost: ${craft.cost} | Skill: ${craft.skill}`,
      '',
      `## Description`,
      craft.description,
      '',
      `## Additional Materials Needed`,
      ...craft.additionalMaterials.map(m => `- ${m}`),
      '',
      `## Step-by-Step Instructions`,
      ...craft.steps.map(s => `${s.n}. ${s.title}\n   ${s.desc}`),
      '',
      `## Safety Tips`,
      ...craft.safetyTips.map(t => `- ${t}`),
      '',
      `## Environmental Impact`,
      craft.environmentalImpact,
      '',
      `Generated by CraftFlow AI — ${new Date().toLocaleString()}`,
    ].join('\n')

    const blob = new Blob([text], { type: 'text/plain' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url; a.download = `${craft.title.replace(/\s+/g, '_')}_CraftFlow.txt`
    a.click(); URL.revokeObjectURL(url)
  }

  return (
    <div style={{ padding: '32px', minHeight: '100vh' }}>
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '8px' }}>
        <button onClick={() => navigate('/app/generate')} style={{ background: 'rgba(255,255,255,0.05)', border: `1px solid ${C.border}`, borderRadius: '8px', width: '32px', height: '32px', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M9 2L4 7l5 5" stroke={C.textMuted} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
        </button>
        <div className="section-label">AI Results</div>
      </div>
      <h1 style={{ fontFamily: font.mono, fontSize: 'clamp(22px, 3vw, 32px)', fontWeight: 800, color: C.textPrimary, letterSpacing: '-0.03em', marginBottom: '6px' }}>
        {craftResults.length} Craft Ideas <span style={{ color: C.accent }}>Generated</span>
      </h1>
      <p style={{ color: C.textMuted, fontSize: '14px', fontFamily: font.sans, marginBottom: '32px' }}>
        Select any option to view full instructions, materials, and download template.
      </p>

      <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0,1fr) minmax(0,1.6fr)', gap: '24px', alignItems: 'start' }}>

        {/* Left — variations */}
        <div>
          <p style={{ fontFamily: font.mono, fontSize: '11px', color: C.textMuted, letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: '12px' }}>Choose a Design</p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {craftResults.map((c, i) => (
              <VariationCard key={c.id} craft={c} index={i} isSelected={i === selected} onClick={() => { setSelected(i); setSaved(false); setSavedId(null) }} />
            ))}
          </div>

          {/* Regenerate */}
          <button
            onClick={() => navigate('/app/generate')}
            style={{ width: '100%', marginTop: '14px', padding: '12px', background: 'transparent', border: `1px solid ${C.border}`, borderRadius: radius.md, color: C.textSecondary, fontFamily: font.sans, fontSize: '14px', fontWeight: 500, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', transition: 'all 150ms' }}
            onMouseEnter={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.04)'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.15)' }}
            onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.borderColor = C.border }}
          >
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M2 7a5 5 0 0110 0M2 7l2-2M2 7l2 2" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/></svg>
            Generate Another Variation
          </button>
        </div>

        {/* Right — detail panel */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {/* AI Generated Preview Image */}
          <CraftPreviewPanel craft={craft} uploadedImages={uploadedImages} />

          {/* Hero card */}
          <div style={{ ...glassCard({ padding: '28px' }) }}>
            <div style={{ display: 'flex', gap: '16px', alignItems: 'flex-start', marginBottom: '20px' }}>
              <div style={{ width: '64px', height: '64px', background: `rgba(${craft.color === C.accent ? '228,196,65' : '74,222,128'},0.12)`, border: `1px solid rgba(${craft.color === C.accent ? '228,196,65' : '74,222,128'},0.2)`, borderRadius: '16px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '32px', flexShrink: 0 }}>
                {craft.emoji}
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap', marginBottom: '8px' }}>
                  <span style={{ padding: '3px 10px', background: `rgba(${DIFF_COLOR[craft.difficulty] === C.success ? '74,222,128' : '228,196,65'},0.1)`, borderRadius: radius.full, color: DIFF_COLOR[craft.difficulty], fontSize: '11px', fontFamily: font.mono, fontWeight: 600 }}>{craft.difficulty}</span>
                  <span style={{ padding: '3px 10px', background: 'rgba(255,255,255,0.04)', borderRadius: radius.full, color: C.textMuted, fontSize: '11px', fontFamily: font.sans }}>{craft.category}</span>
                  <span style={{ padding: '3px 10px', background: 'rgba(74,222,128,0.08)', borderRadius: radius.full, color: C.success, fontSize: '11px', fontFamily: font.mono, fontWeight: 600 }}>{craft.matchScore}% match</span>
                </div>
                <h2 style={{ fontFamily: font.mono, fontSize: '20px', fontWeight: 800, color: C.textPrimary, letterSpacing: '-0.02em' }}>{craft.title}</h2>
              </div>
            </div>
            <p style={{ color: C.textSecondary, fontSize: '14px', fontFamily: font.sans, lineHeight: '1.7', marginBottom: '20px' }}>{craft.description}</p>

            {/* Quick stats */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(100px, 1fr))', gap: '10px', marginBottom: '20px' }}>
              {[
                { label: 'Time', value: craft.time },
                { label: 'Cost', value: craft.cost },
                { label: 'Skill', value: craft.skill },
                { label: 'Eco Score', value: `${craft.sustainability}/100` },
              ].map(s => (
                <div key={s.label} style={{ padding: '12px', background: 'rgba(7,30,38,0.6)', borderRadius: radius.md, border: `1px solid ${C.border}`, textAlign: 'center' }}>
                  <p style={{ fontFamily: font.mono, fontSize: '15px', fontWeight: 700, color: C.textPrimary }}>{s.value}</p>
                  <p style={{ fontFamily: font.sans, fontSize: '11px', color: C.textMuted, marginTop: '2px' }}>{s.label}</p>
                </div>
              ))}
            </div>

            {/* Action buttons */}
            <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
              <button
                onClick={handleSave}
                style={{ flex: 1, minWidth: '140px', padding: '13px', background: saved ? 'rgba(74,222,128,0.15)' : C.accent, color: saved ? C.success : C.bgPrimary, border: saved ? `1px solid rgba(74,222,128,0.3)` : 'none', borderRadius: radius.md, fontFamily: font.sans, fontSize: '14px', fontWeight: 600, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', transition: 'all 200ms' }}
              >
                {saved ? (<><svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M2 7l3.5 3.5L12 3" stroke={C.success} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/></svg>Saved — View Project</>) : (<><svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M7 1v8M7 1L4 4M7 1l3 3M1 10v2a1 1 0 001 1h10a1 1 0 001-1v-2" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/></svg>Save to Library</>)}
              </button>
              <button
                onClick={handleDownload}
                style={{ padding: '13px 20px', background: 'transparent', border: `1px solid ${C.border}`, borderRadius: radius.md, color: C.textSecondary, fontFamily: font.sans, fontSize: '14px', fontWeight: 500, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px', transition: 'all 150ms' }}
                onMouseEnter={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.05)'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.15)' }}
                onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.borderColor = C.border }}
              >
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M7 1v8M4 6l3 3 3-3M2 11h10" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/></svg>
                Download Template
              </button>
            </div>
          </div>

          {/* Additional materials */}
          <div style={{ ...glassCard({ padding: '20px' }) }}>
            <p style={{ fontFamily: font.mono, fontSize: '12px', color: C.textMuted, letterSpacing: '0.07em', textTransform: 'uppercase', marginBottom: '12px' }}>Additional Materials Needed</p>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
              {craft.additionalMaterials.map((m, i) => (
                <span key={i} style={{ padding: '5px 12px', background: 'rgba(255,255,255,0.04)', border: `1px solid ${C.border}`, borderRadius: radius.full, color: C.textSecondary, fontSize: '12px', fontFamily: font.sans }}>{m}</span>
              ))}
            </div>
          </div>

          {/* Steps */}
          <div style={{ ...glassCard({ padding: '24px' }) }}>
            <p style={{ fontFamily: font.mono, fontSize: '12px', color: C.textMuted, letterSpacing: '0.07em', textTransform: 'uppercase', marginBottom: '20px' }}>Step-by-Step Instructions</p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {craft.steps.map(step => <StepCard key={step.n} step={step} />)}
            </div>
          </div>

          {/* Safety + Eco */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
            <div style={{ ...glassCard({ padding: '18px' }) }}>
              <p style={{ fontFamily: font.mono, fontSize: '11px', color: '#f87171', letterSpacing: '0.07em', textTransform: 'uppercase', marginBottom: '10px' }}>Safety Tips</p>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '7px' }}>
                {craft.safetyTips.map((t, i) => (
                  <li key={i} style={{ display: 'flex', gap: '8px', alignItems: 'flex-start' }}>
                    <span style={{ color: '#f87171', fontSize: '10px', marginTop: '3px', flexShrink: 0 }}>⚠</span>
                    <span style={{ fontFamily: font.sans, fontSize: '12px', color: C.textSecondary, lineHeight: '1.5' }}>{t}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div style={{ ...glassCard({ padding: '18px' }) }}>
              <p style={{ fontFamily: font.mono, fontSize: '11px', color: C.success, letterSpacing: '0.07em', textTransform: 'uppercase', marginBottom: '10px' }}>Eco Impact</p>
              <div style={{ display: 'flex', gap: '8px', alignItems: 'flex-start' }}>
                <span style={{ fontSize: '18px' }}>🌿</span>
                <p style={{ fontFamily: font.sans, fontSize: '12px', color: C.textSecondary, lineHeight: '1.6' }}>{craft.environmentalImpact}</p>
              </div>
              <div style={{ marginTop: '12px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
                  <span style={{ fontFamily: font.sans, fontSize: '11px', color: C.textMuted }}>Sustainability</span>
                  <span style={{ fontFamily: font.mono, fontSize: '11px', color: C.success, fontWeight: 600 }}>{craft.sustainability}/100</span>
                </div>
                <div style={{ height: '4px', background: 'rgba(255,255,255,0.05)', borderRadius: '2px' }}>
                  <div style={{ height: '100%', width: `${craft.sustainability}%`, background: C.success, borderRadius: '2px' }} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Responsive stacking */}
      <style>{`
        @media (max-width: 900px) {
          .results-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </div>
  )
}
