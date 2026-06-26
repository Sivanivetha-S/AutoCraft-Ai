import { useEffect, useRef, useState } from 'react'

const STEPS = [
  {
    id: 1, icon: '⬡', label: 'Upload Materials',
    desc: 'Upload photos, PDFs, or scan physical materials directly into CraftFlow.',
    detail: 'Supports JPEG, PNG, RAW, PDF. Drag-and-drop or mobile camera scan.',
    color: '#E4C441',
  },
  {
    id: 2, icon: '◈', label: 'AI Material Recognition',
    desc: 'Our vision model identifies material type, quality, quantity, and market value in seconds.',
    detail: '98.4% accuracy across 2,400+ material types including fibers, dyes, and substrates.',
    color: '#4ADE80',
  },
  {
    id: 3, icon: '◉', label: 'Craft Recommendation Engine',
    desc: 'AI suggests the highest-margin products you can make with the scanned materials.',
    detail: 'Trained on 3M+ product listings across Etsy, Amazon Handmade, and Meesho.',
    color: '#E4C441',
  },
  {
    id: 4, icon: '▣', label: 'Template Generation',
    desc: 'Auto-generate design templates, cut patterns, and assembly instructions.',
    detail: 'SVG/PDF exports compatible with Cricut, Silhouette, and laser cutters.',
    color: '#4ADE80',
  },
  {
    id: 5, icon: '◐', label: 'Cost & Price Prediction',
    desc: 'Dynamic pricing engine calculates optimal selling price based on materials, labor, and market.',
    detail: 'Compares live competitor pricing across 6 marketplaces. Updates daily.',
    color: '#E4C441',
  },
  {
    id: 6, icon: '⬟', label: 'Inventory Optimization',
    desc: 'Track every gram of material. Get reorder alerts before you run out.',
    detail: 'FIFO tracking, expiry management, supplier comparison, bulk order planning.',
    color: '#4ADE80',
  },
  {
    id: 7, icon: '◫', label: 'Marketplace Publishing',
    desc: 'One-click publish to Etsy, Amazon, Meesho, Flipkart, and your own store.',
    detail: 'AI writes SEO-optimized titles, descriptions, and selects the best category tags.',
    color: '#E4C441',
  },
  {
    id: 8, icon: '◑', label: 'Business Analytics',
    desc: 'Real-time dashboards show revenue, bestsellers, customer LTV, and growth forecasts.',
    detail: 'Weekly AI digest with actionable growth recommendations delivered to your inbox.',
    color: '#4ADE80',
  },
]

function TimelineNode({ step, index, activeIndex, setActive }) {
  const isActive = activeIndex >= index
  const isCurrent = activeIndex === index
  const ref = useRef(null)

  return (
    <div
      ref={ref}
      style={{
        display: 'flex',
        gap: '28px',
        alignItems: 'flex-start',
        cursor: 'pointer',
        padding: '12px 0',
      }}
      onClick={() => setActive(index)}
      onMouseEnter={() => setActive(index)}
    >
      {/* Left: line + node */}
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', flexShrink: 0, paddingTop: '4px' }}>
        <div
          style={{
            width: '42px', height: '42px',
            borderRadius: '12px',
            border: `1.5px solid ${isActive ? step.color : 'rgba(255,255,255,0.1)'}`,
            background: isActive ? `rgba(${step.color === '#E4C441' ? '228,196,65' : '74,222,128'},0.1)` : 'rgba(18,60,70,0.5)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            transition: 'all 350ms ease-in-out',
            boxShadow: isCurrent ? `0 0 20px ${step.color}30` : 'none',
            animation: isCurrent ? 'nodePulse 2s ease-in-out infinite' : 'none',
            flexShrink: 0,
          }}
          aria-hidden="true"
        >
          <span style={{ fontSize: '16px', color: isActive ? step.color : '#8FA7AD', transition: 'color 350ms' }}>{step.icon}</span>
        </div>
        {index < STEPS.length - 1 && (
          <div style={{ width: '1.5px', height: '100%', minHeight: '60px', background: 'rgba(255,255,255,0.06)', marginTop: '4px', position: 'relative', overflow: 'hidden' }}>
            <div style={{
              position: 'absolute', top: 0, left: 0, right: 0,
              background: `linear-gradient(to bottom, ${step.color}, transparent)`,
              height: isActive ? '100%' : '0%',
              transition: 'height 0.6s ease-out',
            }} />
          </div>
        )}
      </div>

      {/* Right: content */}
      <div style={{ paddingBottom: '20px', flex: 1 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '6px' }}>
          <span style={{
            fontFamily: "'JetBrains Mono'", fontSize: '11px', fontWeight: 700,
            color: isActive ? step.color : '#8FA7AD',
            transition: 'color 350ms',
            letterSpacing: '0.06em',
          }}>
            {String(step.id).padStart(2, '0')}
          </span>
          <h3 style={{
            fontFamily: "'JetBrains Mono'", fontSize: '15px', fontWeight: 600,
            color: isActive ? '#fff' : '#8FA7AD',
            transition: 'color 350ms',
          }}>
            {step.label}
          </h3>
        </div>
        <p style={{ color: isActive ? '#B7C7CC' : '#4a6870', fontSize: '14px', lineHeight: '1.6', transition: 'color 350ms', maxWidth: '460px' }}>
          {step.desc}
        </p>
        <div style={{
          overflow: 'hidden',
          maxHeight: isCurrent ? '60px' : '0',
          opacity: isCurrent ? 1 : 0,
          transition: 'max-height 350ms ease-in-out, opacity 350ms ease-in-out',
          marginTop: isCurrent ? '8px' : '0',
        }}>
          <p style={{ color: step.color, fontSize: '12px', fontFamily: "'JetBrains Mono'", opacity: 0.85, lineHeight: '1.6' }}>
            ↳ {step.detail}
          </p>
        </div>
      </div>
    </div>
  )
}

export default function WorkflowTimeline() {
  const [activeIndex, setActiveIndex] = useState(-1)
  const sectionRef = useRef(null)

  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting && activeIndex === -1) {
        let i = 0
        const tick = () => {
          setActiveIndex(prev => {
            if (prev < STEPS.length - 1) {
              setTimeout(tick, 300)
              return prev + 1
            }
            return prev
          })
        }
        setTimeout(tick, 400)
      }
    }, { threshold: 0.1 })
    if (sectionRef.current) obs.observe(sectionRef.current)
    return () => obs.disconnect()
  }, [])

  return (
    <section
      id="workflow"
      ref={sectionRef}
      aria-label="AI automation workflow"
      style={{
        padding: '120px 24px',
        background: 'linear-gradient(180deg, #071E26 0%, rgba(17,76,90,0.08) 50%, #071E26 100%)',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* bg accent */}
      <div aria-hidden="true" style={{ position: 'absolute', top: '20%', right: 0, width: '400px', height: '400px', background: 'radial-gradient(ellipse, rgba(228,196,65,0.04) 0%, transparent 70%)', pointerEvents: 'none' }} />

      <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: '80px' }}>
          <div className="section-label" style={{ margin: '0 auto 20px' }}>AI Automation Pipeline</div>
          <h2 style={{
            fontFamily: "'JetBrains Mono'", fontSize: 'clamp(28px, 4vw, 48px)',
            fontWeight: 800, letterSpacing: '-0.03em', color: '#fff',
            lineHeight: 1.15, marginBottom: '16px',
          }}>
            From Raw Material to<br />
            <span style={{ color: '#E4C441' }}>Ready-to-Sell Product</span>
          </h2>
          <p style={{ color: '#8FA7AD', fontSize: '17px', fontFamily: "'Inter'", maxWidth: '500px', margin: '0 auto', lineHeight: 1.7 }}>
            Eight intelligent steps. Fully automated. Zero manual data entry.
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 420px), 1fr))', gap: '0 80px', alignItems: 'start' }}>
          {/* Left column — steps 1–4 */}
          <div>
            {STEPS.slice(0, 4).map((step, i) => (
              <TimelineNode key={step.id} step={step} index={i} activeIndex={activeIndex} setActive={setActiveIndex} />
            ))}
          </div>
          {/* Right column — steps 5–8 */}
          <div>
            {STEPS.slice(4).map((step, i) => (
              <TimelineNode key={step.id} step={step} index={i + 4} activeIndex={activeIndex} setActive={setActiveIndex} />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
