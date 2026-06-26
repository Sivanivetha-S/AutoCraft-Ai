import { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useApp } from '../AppContext'
import { analyzeMaterials, AI_STEPS } from '../mockAI'
import { C, font, radius } from '../tokens'

export default function ProcessingPage() {
  const navigate = useNavigate()
  const { uploadedImages, setCraftResults } = useApp()
  const [currentStep, setCurrentStep] = useState(-1)
  const [done, setDone] = useState(false)
  const ran = useRef(false)

  useEffect(() => {
    if (ran.current) return
    ran.current = true

    if (!uploadedImages.length) { navigate('/app/generate'); return }

    analyzeMaterials(uploadedImages, (stepIdx) => {
      setCurrentStep(stepIdx)
    }).then(results => {
      setCraftResults(results)
      setDone(true)
      setTimeout(() => navigate('/app/results'), 800)
    })
  }, [])

  const total = AI_STEPS.length
  const pct = currentStep < 0 ? 0 : Math.round(((currentStep + 1) / total) * 100)

  return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '32px' }}>
      <div style={{ maxWidth: '560px', width: '100%' }}>
        {/* Top icon */}
        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '40px' }}>
          <div style={{ width: '80px', height: '80px', borderRadius: '20px', background: 'rgba(228,196,65,0.1)', border: '1px solid rgba(228,196,65,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative' }}>
            <svg width="36" height="36" viewBox="0 0 36 36" fill="none">
              <path d="M18 4v4M18 28v4M4 18h4M28 18h4M7.1 7.1l2.8 2.8M26.1 26.1l2.8 2.8M7.1 28.9l2.8-2.8M26.1 9.9l2.8-2.8" stroke={C.accent} strokeWidth="2.5" strokeLinecap="round"/>
              <circle cx="18" cy="18" r="6" stroke={C.accent} strokeWidth="2.5" style={{ animation: 'nodePulse 1.5s ease-in-out infinite' }}/>
            </svg>
            {/* Ring spinner */}
            <svg width="80" height="80" viewBox="0 0 80 80" style={{ position: 'absolute', inset: 0, animation: 'rotateSlow 3s linear infinite' }}>
              <circle cx="40" cy="40" r="36" fill="none" stroke="rgba(228,196,65,0.15)" strokeWidth="1.5"/>
              <circle cx="40" cy="40" r="36" fill="none" stroke={C.accent} strokeWidth="1.5"
                strokeDasharray="40 186" strokeLinecap="round"
                style={{ transform: 'rotate(-90deg)', transformOrigin: '50% 50%' }}/>
            </svg>
          </div>
        </div>

        {/* Headline */}
        <div style={{ textAlign: 'center', marginBottom: '40px' }}>
          <h1 style={{ fontFamily: font.mono, fontSize: '26px', fontWeight: 800, color: C.textPrimary, letterSpacing: '-0.03em', marginBottom: '8px' }}>
            {done ? '✨ Analysis Complete!' : 'AI is Working...'}
          </h1>
          <p style={{ color: C.textMuted, fontSize: '14px', fontFamily: font.sans }}>
            {done ? 'Preparing your craft recommendations' : 'Scanning your materials and generating ideas'}
          </p>
        </div>

        {/* Progress bar */}
        <div style={{ marginBottom: '36px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
            <span style={{ fontFamily: font.mono, fontSize: '12px', color: C.textMuted }}>Processing</span>
            <span style={{ fontFamily: font.mono, fontSize: '12px', color: C.accent, fontWeight: 600 }}>{done ? '100' : pct}%</span>
          </div>
          <div style={{ height: '6px', background: 'rgba(255,255,255,0.06)', borderRadius: '3px', overflow: 'hidden' }}>
            <div style={{ height: '100%', width: `${done ? 100 : pct}%`, background: `linear-gradient(90deg, ${C.bgSecondary}, ${C.accent})`, borderRadius: '3px', transition: 'width 400ms ease-out' }} />
          </div>
        </div>

        {/* Step timeline */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0' }}>
          {AI_STEPS.map((step, i) => {
            const isCompleted = i <= currentStep || done
            const isCurrent = i === currentStep && !done
            return (
              <div key={step.id} style={{ display: 'flex', gap: '16px', alignItems: 'flex-start' }}>
                {/* Connector */}
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '24px', flexShrink: 0 }}>
                  <div style={{
                    width: '24px', height: '24px', borderRadius: '50%',
                    background: isCompleted ? (isCurrent ? 'rgba(228,196,65,0.2)' : 'rgba(74,222,128,0.15)') : 'rgba(255,255,255,0.04)',
                    border: `1.5px solid ${isCompleted ? (isCurrent ? C.accent : C.success) : 'rgba(255,255,255,0.1)'}`,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    transition: 'all 400ms ease-out',
                    flexShrink: 0,
                    animation: isCurrent ? 'nodePulse 1.5s ease-in-out infinite' : 'none',
                  }}>
                    {isCompleted && !isCurrent ? (
                      <svg width="10" height="10" viewBox="0 0 10 10" fill="none"><path d="M2 5l2 2 4-4" stroke={C.success} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
                    ) : isCurrent ? (
                      <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: C.accent }} />
                    ) : (
                      <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: 'rgba(255,255,255,0.15)' }} />
                    )}
                  </div>
                  {i < AI_STEPS.length - 1 && (
                    <div style={{ width: '1.5px', flex: 1, minHeight: '20px', background: isCompleted ? (isCurrent ? 'rgba(228,196,65,0.3)' : 'rgba(74,222,128,0.3)') : 'rgba(255,255,255,0.05)', transition: 'background 400ms' }} />
                  )}
                </div>

                {/* Label */}
                <div style={{ paddingBottom: i < AI_STEPS.length - 1 ? '12px' : '0', paddingTop: '2px' }}>
                  <p style={{
                    fontFamily: font.sans, fontSize: '14px', fontWeight: isCurrent ? 600 : 400,
                    color: isCompleted ? (isCurrent ? C.accent : C.textPrimary) : C.textMuted,
                    transition: 'color 400ms',
                  }}>
                    {isCompleted && !isCurrent && <span style={{ color: C.success, marginRight: '6px' }}>✓</span>}
                    {step.label}
                    {isCurrent && <span style={{ color: C.accent, marginLeft: '6px', fontSize: '12px', animation: 'pulse-glow 1s infinite' }}>●</span>}
                  </p>
                </div>
              </div>
            )
          })}
        </div>

        {/* Uploaded images mini strip */}
        {uploadedImages.length > 0 && (
          <div style={{ marginTop: '36px', display: 'flex', gap: '8px', justifyContent: 'center', flexWrap: 'wrap' }}>
            {uploadedImages.slice(0, 5).map((img, i) => (
              <div key={i} style={{ width: '48px', height: '48px', borderRadius: '8px', overflow: 'hidden', border: `1px solid ${C.border}`, opacity: currentStep >= 0 ? 1 : 0.4, transition: 'opacity 400ms' }}>
                <img src={img.preview} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              </div>
            ))}
            {uploadedImages.length > 5 && <div style={{ width: '48px', height: '48px', borderRadius: '8px', background: 'rgba(255,255,255,0.04)', border: `1px solid ${C.border}`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}><span style={{ color: C.textMuted, fontSize: '11px', fontFamily: font.mono }}>+{uploadedImages.length - 5}</span></div>}
          </div>
        )}
      </div>
    </div>
  )
}
