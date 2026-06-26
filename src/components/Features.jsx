import { useEffect, useRef, useState } from 'react'

const FEATURES = [
  {
    id: 'scanner',
    icon: (
      <svg width="22" height="22" viewBox="0 0 22 22" fill="none" aria-hidden="true">
        <rect x="2" y="6" width="18" height="10" rx="2" stroke="#E4C441" strokeWidth="1.4"/>
        <path d="M7 11h8M11 6V3M11 19v-3" stroke="#E4C441" strokeWidth="1.4" strokeLinecap="round"/>
        <circle cx="11" cy="11" r="2" stroke="#E4C441" strokeWidth="1.2"/>
      </svg>
    ),
    title: 'AI Material Scanner',
    desc: 'Identify any craft material from a photo in under 2 seconds. Detects type, grade, quantity, and market value automatically.',
    tag: 'Vision AI',
    size: 'large',
    accent: '#E4C441',
    visual: 'scanner',
  },
  {
    id: 'generator',
    icon: (
      <svg width="22" height="22" viewBox="0 0 22 22" fill="none" aria-hidden="true">
        <path d="M4 18L11 4l7 14" stroke="#4ADE80" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M6.5 13h9" stroke="#4ADE80" strokeWidth="1.4" strokeLinecap="round"/>
      </svg>
    ),
    title: 'Craft Generator',
    desc: 'Generate product ideas, design variants, and complete craft blueprints from your material inventory.',
    tag: 'Generative AI',
    size: 'medium',
    accent: '#4ADE80',
    visual: 'generator',
  },
  {
    id: 'template',
    icon: (
      <svg width="22" height="22" viewBox="0 0 22 22" fill="none" aria-hidden="true">
        <rect x="3" y="3" width="7" height="7" rx="1.5" stroke="#E4C441" strokeWidth="1.4"/>
        <rect x="12" y="3" width="7" height="7" rx="1.5" stroke="#E4C441" strokeWidth="1.4"/>
        <rect x="3" y="12" width="7" height="7" rx="1.5" stroke="#E4C441" strokeWidth="1.4"/>
        <rect x="12" y="12" width="7" height="7" rx="1.5" stroke="#E4C441" strokeWidth="1.4"/>
      </svg>
    ),
    title: 'Template Builder',
    desc: 'Auto-generate SVG cut files, stitch patterns, and assembly guides ready for Cricut or laser cutter.',
    tag: 'Design Automation',
    size: 'small',
    accent: '#E4C441',
    visual: 'template',
  },
  {
    id: 'marketplace',
    icon: (
      <svg width="22" height="22" viewBox="0 0 22 22" fill="none" aria-hidden="true">
        <path d="M3 8h16v10a2 2 0 01-2 2H5a2 2 0 01-2-2V8z" stroke="#E4C441" strokeWidth="1.4"/>
        <path d="M1 5l1.5 3h17L21 5H1z" stroke="#E4C441" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M8 8v3a3 3 0 006 0V8" stroke="#E4C441" strokeWidth="1.4" strokeLinecap="round"/>
      </svg>
    ),
    title: 'Marketplace Automation',
    desc: 'Publish to Etsy, Amazon Handmade, Meesho & Flipkart with AI-written SEO titles and descriptions.',
    tag: '6 Platforms',
    size: 'medium',
    accent: '#E4C441',
    visual: 'marketplace',
  },
  {
    id: 'inventory',
    icon: (
      <svg width="22" height="22" viewBox="0 0 22 22" fill="none" aria-hidden="true">
        <rect x="3" y="3" width="16" height="16" rx="2" stroke="#4ADE80" strokeWidth="1.4"/>
        <path d="M7 8h8M7 12h5M7 16h6" stroke="#4ADE80" strokeWidth="1.4" strokeLinecap="round"/>
      </svg>
    ),
    title: 'Inventory AI',
    desc: 'Track every gram of raw material. Smart reorder alerts and supplier cost comparisons keep you stocked.',
    tag: 'Smart Tracking',
    size: 'small',
    accent: '#4ADE80',
    visual: 'inventory',
  },
  {
    id: 'pricing',
    icon: (
      <svg width="22" height="22" viewBox="0 0 22 22" fill="none" aria-hidden="true">
        <circle cx="11" cy="11" r="8" stroke="#E4C441" strokeWidth="1.4"/>
        <path d="M11 7v1.5M11 13.5V15M8.5 9.5C8.5 8.7 9.2 8 11 8s2.5.7 2.5 1.5S12.8 11 11 11s-2.5.7-2.5 1.5S9.2 14 11 14s2.5-.7 2.5-1.5" stroke="#E4C441" strokeWidth="1.3" strokeLinecap="round"/>
      </svg>
    ),
    title: 'Smart Pricing Engine',
    desc: 'Dynamic pricing that scans competitor rates across 6 marketplaces and recommends the sweet spot for max margin.',
    tag: 'Live Market Data',
    size: 'large',
    accent: '#E4C441',
    visual: 'pricing',
  },
  {
    id: 'dashboard',
    icon: (
      <svg width="22" height="22" viewBox="0 0 22 22" fill="none" aria-hidden="true">
        <path d="M3 17l4-5 4 3 4-7 4 3" stroke="#4ADE80" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
        <rect x="3" y="3" width="16" height="16" rx="2" stroke="#4ADE80" strokeWidth="1.4"/>
      </svg>
    ),
    title: 'Business Dashboard',
    desc: 'Real-time analytics: revenue, orders, customer LTV, bestsellers, and AI-powered growth forecasts in one view.',
    tag: 'Real-time',
    size: 'medium',
    accent: '#4ADE80',
    visual: 'dashboard',
  },
  {
    id: 'marketing',
    icon: (
      <svg width="22" height="22" viewBox="0 0 22 22" fill="none" aria-hidden="true">
        <path d="M18 4L11 11M18 4H13M18 4V9" stroke="#E4C441" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M10 4H5a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5" stroke="#E4C441" strokeWidth="1.4" strokeLinecap="round"/>
      </svg>
    ),
    title: 'Marketing Automation',
    desc: 'Auto-schedule Instagram reels, Pinterest pins, and WhatsApp campaigns tied to your product catalog.',
    tag: 'Social AI',
    size: 'small',
    accent: '#E4C441',
    visual: 'marketing',
  },
]

// Visual previews inside cards
function CardVisual({ type, accent }) {
  if (type === 'scanner') return (
    <div style={{ position: 'relative', height: '80px', background: 'rgba(7,30,38,0.6)', borderRadius: '8px', overflow: 'hidden', border: '1px solid rgba(255,255,255,0.05)', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
      {['Cotton Blend', 'Raw Silk', 'Jute Fiber'].map((m, i) => (
        <div key={m} style={{ padding: '4px 10px', background: i === 1 ? 'rgba(228,196,65,0.15)' : 'rgba(255,255,255,0.04)', border: `1px solid ${i === 1 ? 'rgba(228,196,65,0.3)' : 'rgba(255,255,255,0.06)'}`, borderRadius: '6px' }}>
          <span style={{ color: i === 1 ? '#E4C441' : '#8FA7AD', fontSize: '11px', fontFamily: "'JetBrains Mono'", whiteSpace: 'nowrap' }}>{m}</span>
        </div>
      ))}
      <div style={{ position: 'absolute', left: 0, right: 0, height: '1.5px', background: 'linear-gradient(90deg, transparent, #E4C441, transparent)', animation: 'scanLine 2.5s ease-in-out infinite', opacity: 0.7 }} />
    </div>
  )

  if (type === 'pricing') return (
    <div style={{ display: 'flex', gap: '8px', alignItems: 'flex-end', height: '60px' }}>
      {[45, 62, 58, 80, 72, 95, 88, 110].map((v, i) => (
        <div key={i} style={{ flex: 1, height: `${(v / 110) * 100}%`, background: i === 7 ? '#E4C441' : 'rgba(228,196,65,0.2)', borderRadius: '3px 3px 0 0', transition: 'height 0.5s ease-out' }} />
      ))}
    </div>
  )

  if (type === 'marketplace') return (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
      {['Etsy', 'Amazon', 'Meesho', 'Flipkart', 'Shopify', 'WooCommerce'].map((p, i) => (
        <div key={p} style={{ padding: '4px 10px', background: i < 2 ? 'rgba(228,196,65,0.1)' : 'rgba(255,255,255,0.04)', border: `1px solid ${i < 2 ? 'rgba(228,196,65,0.25)' : 'rgba(255,255,255,0.06)'}`, borderRadius: '100px' }}>
          <span style={{ color: i < 2 ? '#E4C441' : '#8FA7AD', fontSize: '11px', fontFamily: "'Inter'", fontWeight: 500 }}>{p}</span>
        </div>
      ))}
    </div>
  )

  return null
}

// Bento card component
function BentoCard({ feature, index, isMobile, isOpen, onToggle }) {
  const ref = useRef(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVisible(true) }, { threshold: 0.1 })
    if (ref.current) obs.observe(ref.current)
    return () => obs.disconnect()
  }, [])

  const sizeMap = { large: '2', medium: '1', small: '1' }

  if (isMobile) {
    return (
      <div
        ref={ref}
        style={{
          background: 'rgba(18,60,70,0.5)',
          border: `1px solid ${isOpen ? `rgba(${feature.accent === '#E4C441' ? '228,196,65' : '74,222,128'},0.2)` : 'rgba(255,255,255,0.07)'}`,
          borderRadius: '14px',
          overflow: 'hidden',
          transition: 'border-color 350ms ease-in-out',
          opacity: visible ? 1 : 0,
          transform: visible ? 'none' : 'translateY(20px)',
          transitionProperty: 'opacity, transform, border-color',
          transitionDuration: '0.5s, 0.5s, 0.35s',
          transitionDelay: `${index * 0.05}s`,
        }}
      >
        <button
          aria-expanded={isOpen}
          onClick={onToggle}
          style={{
            width: '100%', padding: '20px', background: 'none', border: 'none',
            display: 'flex', alignItems: 'center', justifyContent: 'space-between',
            cursor: 'pointer',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div style={{ width: '36px', height: '36px', background: `rgba(${feature.accent === '#E4C441' ? '228,196,65' : '74,222,128'},0.1)`, borderRadius: '9px', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
              {feature.icon}
            </div>
            <span style={{ fontFamily: "'JetBrains Mono'", fontSize: '14px', fontWeight: 600, color: '#fff', textAlign: 'left' }}>{feature.title}</span>
          </div>
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" style={{ flexShrink: 0, transform: isOpen ? 'rotate(180deg)' : 'none', transition: 'transform 350ms ease-in-out', color: '#8FA7AD' }} aria-hidden="true">
            <path d="M4 6l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
        <div className={`accordion-content ${isOpen ? 'open' : ''}`}>
          <div style={{ padding: '0 20px 20px' }}>
            <p style={{ color: '#B7C7CC', fontSize: '14px', fontFamily: "'Inter'", lineHeight: '1.7', marginBottom: '12px' }}>{feature.desc}</p>
            <span style={{ display: 'inline-block', padding: '4px 10px', background: `rgba(${feature.accent === '#E4C441' ? '228,196,65' : '74,222,128'},0.08)`, border: `1px solid rgba(${feature.accent === '#E4C441' ? '228,196,65' : '74,222,128'},0.15)`, borderRadius: '100px', color: feature.accent, fontSize: '11px', fontFamily: "'JetBrains Mono'", fontWeight: 500 }}>{feature.tag}</span>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div
      ref={ref}
      className="bento-card"
      style={{
        gridColumn: `span ${sizeMap[feature.size]}`,
        background: 'rgba(18,60,70,0.45)',
        border: '1px solid rgba(255,255,255,0.07)',
        borderRadius: '16px',
        padding: '28px',
        position: 'relative',
        overflow: 'hidden',
        cursor: 'default',
        opacity: visible ? 1 : 0,
        transform: visible ? 'none' : 'translateY(24px)',
        transition: `opacity 0.5s ease-out ${index * 0.07}s, transform 0.5s ease-out ${index * 0.07}s`,
      }}
    >
      {/* Subtle corner accent */}
      <div aria-hidden="true" style={{ position: 'absolute', top: 0, right: 0, width: '80px', height: '80px', background: `radial-gradient(ellipse at top right, rgba(${feature.accent === '#E4C441' ? '228,196,65' : '74,222,128'},0.07) 0%, transparent 70%)`, pointerEvents: 'none' }} />

      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: '16px' }}>
        <div style={{ width: '44px', height: '44px', background: `rgba(${feature.accent === '#E4C441' ? '228,196,65' : '74,222,128'},0.1)`, border: `1px solid rgba(${feature.accent === '#E4C441' ? '228,196,65' : '74,222,128'},0.18)`, borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
          {feature.icon}
        </div>
        <span style={{ padding: '4px 10px', background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.06)', borderRadius: '100px', color: '#8FA7AD', fontSize: '11px', fontFamily: "'JetBrains Mono'", fontWeight: 500, letterSpacing: '0.04em' }}>{feature.tag}</span>
      </div>

      <h3 style={{ fontFamily: "'JetBrains Mono'", fontSize: '16px', fontWeight: 700, color: '#fff', marginBottom: '10px', letterSpacing: '-0.01em' }}>{feature.title}</h3>
      <p style={{ color: '#8FA7AD', fontSize: '14px', fontFamily: "'Inter'", lineHeight: '1.65', marginBottom: feature.visual ? '16px' : 0 }}>{feature.desc}</p>

      {feature.visual && <CardVisual type={feature.visual} accent={feature.accent} />}
    </div>
  )
}

export default function Features() {
  const [isMobile, setIsMobile] = useState(false)
  const [openIndex, setOpenIndex] = useState(0)

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768)
    check()
    window.addEventListener('resize', check)
    return () => window.removeEventListener('resize', check)
  }, [])

  return (
    <section id="features" aria-label="Features" style={{ padding: '120px 24px', background: '#071E26', position: 'relative', overflow: 'hidden' }}>
      <div aria-hidden="true" style={{ position: 'absolute', top: '30%', left: '-5%', width: '500px', height: '500px', background: 'radial-gradient(ellipse, rgba(17,76,90,0.2) 0%, transparent 70%)', pointerEvents: 'none' }} />

      <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: '72px' }}>
          <div className="section-label" style={{ margin: '0 auto 20px' }}>Platform Features</div>
          <h2 style={{ fontFamily: "'JetBrains Mono'", fontSize: 'clamp(28px, 4vw, 48px)', fontWeight: 800, letterSpacing: '-0.03em', color: '#fff', lineHeight: 1.15, marginBottom: '16px' }}>
            Every Tool Your Creative<br /><span style={{ color: '#E4C441' }}>Business Needs</span>
          </h2>
          <p style={{ color: '#8FA7AD', fontSize: '17px', fontFamily: "'Inter'", maxWidth: '480px', margin: '0 auto', lineHeight: 1.7 }}>
            One platform. Eight AI modules. Complete business automation from raw material to sale.
          </p>
        </div>

        {isMobile ? (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            {FEATURES.map((f, i) => (
              <BentoCard
                key={f.id} feature={f} index={i}
                isMobile={true}
                isOpen={openIndex === i}
                onToggle={() => setOpenIndex(openIndex === i ? -1 : i)}
              />
            ))}
          </div>
        ) : (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px' }}>
            {FEATURES.map((f, i) => (
              <BentoCard key={f.id} feature={f} index={i} isMobile={false} />
            ))}
          </div>
        )}
      </div>
    </section>
  )
}
