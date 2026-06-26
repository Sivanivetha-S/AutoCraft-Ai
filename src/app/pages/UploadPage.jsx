import { useCallback, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useApp } from '../AppContext'
import { C, font, radius, glassCard } from '../tokens'

const ACCEPTED = ['image/png', 'image/jpeg', 'image/jpg', 'image/webp']
const MAX_FILES = 8

export default function UploadPage() {
  const navigate = useNavigate()
  const { setUploadedImages } = useApp()
  const [images, setImages] = useState([])
  const [dragging, setDragging] = useState(false)
  const [uploading, setUploading] = useState(false)
  const fileRef = useRef(null)

  const addFiles = useCallback((files) => {
    const valid = Array.from(files)
      .filter(f => ACCEPTED.includes(f.type))
      .slice(0, MAX_FILES - images.length)
    if (!valid.length) return

    const readers = valid.map(file => new Promise(resolve => {
      const reader = new FileReader()
      reader.onload = e => resolve({ id: `${Date.now()}_${Math.random()}`, file, name: file.name, preview: e.target.result, progress: 0, done: false })
      reader.readAsDataURL(file)
    }))

    Promise.all(readers).then(newImages => {
      setImages(prev => {
        const combined = [...prev, ...newImages].slice(0, MAX_FILES)
        // Simulate upload progress
        combined.forEach((img, i) => {
          if (!img.done) {
            let p = 0
            const tick = setInterval(() => {
              p = Math.min(p + Math.random() * 25 + 10, 100)
              setImages(cur => cur.map(c => c.id === img.id ? { ...c, progress: Math.round(p), done: p >= 100 } : c))
              if (p >= 100) clearInterval(tick)
            }, 120)
          }
        })
        return combined
      })
    })
  }, [images.length])

  const handleDrop = useCallback((e) => {
    e.preventDefault()
    setDragging(false)
    addFiles(e.dataTransfer.files)
  }, [addFiles])

  const handleDragOver = (e) => { e.preventDefault(); setDragging(true) }
  const handleDragLeave = () => setDragging(false)
  const removeImage = (id) => setImages(prev => prev.filter(i => i.id !== id))

  const handleAnalyze = () => {
    if (!images.length) return
    setUploading(true)
    setUploadedImages(images)
    setTimeout(() => navigate('/app/processing'), 600)
  }

  const allDone = images.length > 0 && images.every(i => i.done)

  return (
    <div style={{ padding: '32px', minHeight: '100vh' }}>
      {/* Header */}
      <div style={{ marginBottom: '36px' }}>
        <div className="section-label" style={{ display: 'inline-flex', marginBottom: '16px' }}>
          <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: C.accent, display: 'inline-block' }} />
          AI Material Scanner
        </div>
        <h1 style={{ fontFamily: font.mono, fontSize: 'clamp(24px, 3vw, 36px)', fontWeight: 800, color: C.textPrimary, letterSpacing: '-0.03em', marginBottom: '10px' }}>
          Upload Your <span style={{ color: C.accent }}>Craft Materials</span>
        </h1>
        <p style={{ color: C.textSecondary, fontSize: '16px', fontFamily: font.sans, maxWidth: '540px', lineHeight: 1.7 }}>
          Photograph your available materials — paper, fabric, plastic bottles, wood, cardboard, or anything creative. Our AI will suggest the best craft ideas instantly.
        </p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: images.length > 0 ? 'repeat(auto-fit, minmax(300px, 1fr))' : '1fr', gap: '24px', maxWidth: '1100px' }}>

        {/* Drop zone */}
        <div>
          <div
            onDrop={handleDrop}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onClick={() => !images.length || images.length < MAX_FILES ? fileRef.current?.click() : null}
            role="button"
            tabIndex={0}
            aria-label="Upload materials drop zone"
            onKeyDown={e => e.key === 'Enter' && fileRef.current?.click()}
            style={{
              ...glassCard(),
              padding: '48px 32px',
              textAlign: 'center',
              cursor: 'pointer',
              border: `2px dashed ${dragging ? C.accent : 'rgba(255,255,255,0.1)'}`,
              background: dragging ? 'rgba(228,196,65,0.05)' : 'rgba(18,60,70,0.35)',
              transition: 'border-color 200ms, background 200ms',
              minHeight: '280px',
              display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '16px',
            }}
          >
            <div style={{ width: '64px', height: '64px', background: dragging ? 'rgba(228,196,65,0.15)' : 'rgba(255,255,255,0.05)', border: `1px solid ${dragging ? 'rgba(228,196,65,0.3)' : 'rgba(255,255,255,0.1)'}`, borderRadius: '16px', display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'all 200ms', margin: '0 auto' }}>
              <svg width="28" height="28" viewBox="0 0 28 28" fill="none"><path d="M14 4v14M7 11l7-7 7 7" stroke={dragging ? C.accent : C.textMuted} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/><path d="M4 22h20" stroke={dragging ? C.accent : C.textMuted} strokeWidth="2" strokeLinecap="round"/></svg>
            </div>
            <div>
              <p style={{ fontFamily: font.mono, fontSize: '16px', fontWeight: 600, color: dragging ? C.accent : C.textPrimary, marginBottom: '6px' }}>
                {dragging ? 'Drop to upload' : 'Drag & Drop Materials'}
              </p>
              <p style={{ fontFamily: font.sans, fontSize: '14px', color: C.textMuted }}>or click to browse files</p>
            </div>
            <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', justifyContent: 'center' }}>
              {['PNG', 'JPG', 'JPEG', 'WEBP'].map(f => (
                <span key={f} style={{ padding: '3px 10px', background: 'rgba(255,255,255,0.04)', border: `1px solid ${C.border}`, borderRadius: radius.full, color: C.textMuted, fontSize: '11px', fontFamily: font.mono }}>{f}</span>
              ))}
            </div>
            <p style={{ color: C.textMuted, fontSize: '12px', fontFamily: font.sans }}>{images.length}/{MAX_FILES} files uploaded</p>
          </div>
          <input ref={fileRef} type="file" accept={ACCEPTED.join(',')} multiple style={{ display: 'none' }} onChange={e => addFiles(e.target.files)} />

          {/* Material hints */}
          <div style={{ marginTop: '20px', ...glassCard({ padding: '20px' }) }}>
            <p style={{ fontFamily: font.mono, fontSize: '11px', color: C.textMuted, letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: '12px' }}>Supported Materials</p>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
              {['📄 Paper', '📦 Cardboard', '🍾 Plastic Bottle', '🧵 Fabric', '🪵 Wood', '🍦 Ice Cream Sticks', '🍃 Leaves', '📰 Newspaper', '🧽 Foam Sheet', '🫙 Glass Bottle', '♻️ Waste Materials'].map(m => (
                <span key={m} style={{ padding: '5px 12px', background: 'rgba(255,255,255,0.04)', border: `1px solid ${C.border}`, borderRadius: radius.full, color: C.textSecondary, fontSize: '12px', fontFamily: font.sans }}>{m}</span>
              ))}
            </div>
          </div>
        </div>

        {/* Image previews */}
        {images.length > 0 && (
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
              <p style={{ fontFamily: font.mono, fontSize: '13px', fontWeight: 600, color: C.textPrimary }}>{images.length} file{images.length > 1 ? 's' : ''} selected</p>
              {images.length < MAX_FILES && (
                <button onClick={() => fileRef.current?.click()} style={{ background: 'none', border: 'none', color: C.accent, fontSize: '13px', fontFamily: font.sans, cursor: 'pointer' }}>+ Add more</button>
              )}
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(140px, 1fr))', gap: '10px', marginBottom: '24px' }}>
              {images.map(img => (
                <div key={img.id} style={{ position: 'relative', borderRadius: radius.md, overflow: 'hidden', border: `1px solid ${img.done ? 'rgba(74,222,128,0.3)' : C.border}`, transition: 'border-color 300ms', aspectRatio: '1' }}>
                  <img src={img.preview} alt={img.name} style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} loading="lazy" />
                  {/* Progress overlay */}
                  {!img.done && (
                    <div style={{ position: 'absolute', inset: 0, background: 'rgba(7,30,38,0.75)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
                      <div style={{ width: '60%', height: '3px', background: 'rgba(255,255,255,0.1)', borderRadius: '2px', overflow: 'hidden' }}>
                        <div style={{ height: '100%', width: `${img.progress}%`, background: C.accent, borderRadius: '2px', transition: 'width 150ms' }} />
                      </div>
                      <span style={{ fontFamily: font.mono, fontSize: '11px', color: C.accent }}>{img.progress}%</span>
                    </div>
                  )}
                  {/* Done badge */}
                  {img.done && (
                    <div style={{ position: 'absolute', top: '6px', right: '6px', width: '20px', height: '20px', background: 'rgba(74,222,128,0.9)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <svg width="10" height="10" viewBox="0 0 10 10" fill="none"><path d="M2 5l2 2 4-4" stroke="#071E26" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
                    </div>
                  )}
                  {/* Remove */}
                  <button
                    onClick={e => { e.stopPropagation(); removeImage(img.id) }}
                    style={{ position: 'absolute', top: '6px', left: '6px', width: '20px', height: '20px', background: 'rgba(7,30,38,0.85)', border: `1px solid ${C.border}`, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}
                    aria-label={`Remove ${img.name}`}
                  >
                    <svg width="8" height="8" viewBox="0 0 8 8" fill="none"><path d="M1 1l6 6M7 1L1 7" stroke={C.textMuted} strokeWidth="1.3" strokeLinecap="round"/></svg>
                  </button>
                  {/* Filename */}
                  <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, background: 'linear-gradient(to top, rgba(7,30,38,0.9), transparent)', padding: '16px 8px 6px' }}>
                    <p style={{ fontFamily: font.sans, fontSize: '10px', color: C.textSecondary, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{img.name}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Analyze button */}
            <button
              onClick={handleAnalyze}
              disabled={!allDone}
              style={{ width: '100%', padding: '16px', background: allDone ? C.accent : 'rgba(228,196,65,0.3)', color: allDone ? C.bgPrimary : 'rgba(7,30,38,0.5)', border: 'none', borderRadius: radius.md, fontFamily: font.sans, fontSize: '16px', fontWeight: 700, cursor: allDone ? 'pointer' : 'not-allowed', transition: 'all 200ms', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px' }}
              onMouseEnter={e => { if (allDone) { e.currentTarget.style.background = '#FFD95A'; e.currentTarget.style.transform = 'translateY(-1px)'; e.currentTarget.style.boxShadow = '0 8px 32px rgba(228,196,65,0.3)' }}}
              onMouseLeave={e => { e.currentTarget.style.background = allDone ? C.accent : 'rgba(228,196,65,0.3)'; e.currentTarget.style.transform = 'none'; e.currentTarget.style.boxShadow = 'none' }}
            >
              <svg width="18" height="18" viewBox="0 0 18 18" fill="none"><path d="M9 2v2M9 14v2M2 9h2M14 9h2M4.1 4.1l1.4 1.4M12.5 12.5l1.4 1.4M4.1 13.9l1.4-1.4M12.5 5.5l1.4-1.4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/><circle cx="9" cy="9" r="2.5" stroke="currentColor" strokeWidth="1.5"/></svg>
              {allDone ? 'Analyze with AI →' : 'Uploading...'}
            </button>

            <p style={{ textAlign: 'center', color: C.textMuted, fontSize: '12px', fontFamily: font.sans, marginTop: '12px' }}>
              AI analysis takes 8–12 seconds • Results are instant after processing
            </p>
          </div>
        )}
      </div>
    </div>
  )
}
