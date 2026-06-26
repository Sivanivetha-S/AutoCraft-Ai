import { useEffect, useRef, useState } from 'react'

const BRANDS = [
  { name: 'Etsy Studio', abbr: 'ES' },
  { name: 'Craftsy Academy', abbr: 'CA' },
  { name: 'ArtResin', abbr: 'AR' },
  { name: 'Spoonflower', abbr: 'SF' },
  { name: 'CreativeBug', abbr: 'CB' },
  { name: 'Artstop', abbr: 'AT' },
  { name: 'Maker\'s Mart', abbr: 'MM' },
  { name: 'Woven Labs', abbr: 'WL' },
]

function BrandLogo({ name, abbr }) {
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: '10px',
        padding: '14px 24px',
        background: 'rgba(18,60,70,0.35)',
        border: '1px solid rgba(255,255,255,0.06)',
        borderRadius: '10px',
        flexShrink: 0,
        transition: 'border-color 150ms ease-out, background 150ms ease-out',
        cursor: 'default',
      }}
      onMouseEnter={e => { e.currentTarget.style.borderColor = 'rgba(228,196,65,0.2)'; e.currentTarget.style.background = 'rgba(18,60,70,0.55)' }}
      onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.06)'; e.currentTarget.style.background = 'rgba(18,60,70,0.35)' }}
      aria-label={name}
    >
      <div style={{
        width: '28px', height: '28px',
        background: 'rgba(228,196,65,0.1)',
        border: '1px solid rgba(228,196,65,0.15)',
        borderRadius: '6px',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
      }}>
        <span style={{ fontFamily: "'JetBrains Mono'", fontSize: '10px', fontWeight: 700, color: '#E4C441' }}>{abbr}</span>
      </div>
      <span style={{ fontFamily: "'Inter'", fontSize: '14px', fontWeight: 500, color: '#8FA7AD', whiteSpace: 'nowrap' }}>{name}</span>
    </div>
  )
}

export default function TrustSection() {
  const [visible, setVisible] = useState(false)
  const ref = useRef(null)

  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVisible(true) }, { threshold: 0.2 })
    if (ref.current) obs.observe(ref.current)
    return () => obs.disconnect()
  }, [])

  return (
    <section
      ref={ref}
      aria-label="Trusted by section"
      style={{
        padding: '80px 24px',
        background: 'linear-gradient(180deg, #071E26 0%, rgba(17,76,90,0.12) 50%, #071E26 100%)',
        overflow: 'hidden',
        position: 'relative',
      }}
    >
      <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
        <div
          style={{
            textAlign: 'center',
            marginBottom: '48px',
            opacity: visible ? 1 : 0,
            transform: visible ? 'none' : 'translateY(20px)',
            transition: 'opacity 0.6s ease-out, transform 0.6s ease-out',
          }}
        >
          <p style={{
            fontFamily: "'Inter'",
            fontSize: '13px',
            fontWeight: 500,
            color: '#8FA7AD',
            letterSpacing: '0.12em',
            textTransform: 'uppercase',
            marginBottom: '8px',
          }}>
            Trusted by leading creative businesses worldwide
          </p>
          <div style={{ width: '40px', height: '1px', background: 'rgba(228,196,65,0.3)', margin: '0 auto' }} />
        </div>

        {/* Scrolling marquee row 1 */}
        <div style={{ position: 'relative', overflow: 'hidden' }}>
          {/* Fade edges */}
          <div aria-hidden="true" style={{ position: 'absolute', left: 0, top: 0, bottom: 0, width: '120px', background: 'linear-gradient(to right, #071E26, transparent)', zIndex: 2, pointerEvents: 'none' }} />
          <div aria-hidden="true" style={{ position: 'absolute', right: 0, top: 0, bottom: 0, width: '120px', background: 'linear-gradient(to left, #071E26, transparent)', zIndex: 2, pointerEvents: 'none' }} />
          <div
            style={{
              display: 'flex',
              gap: '16px',
              width: 'max-content',
              animation: 'marquee 30s linear infinite',
              opacity: visible ? 1 : 0,
              transition: 'opacity 0.6s ease-out 0.2s',
            }}
          >
            {[...BRANDS, ...BRANDS, ...BRANDS].map((b, i) => (
              <BrandLogo key={`${b.abbr}-${i}`} name={b.name} abbr={b.abbr} />
            ))}
          </div>
        </div>

        {/* Stats row */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
            gap: '1px',
            marginTop: '64px',
            background: 'rgba(255,255,255,0.05)',
            borderRadius: '16px',
            overflow: 'hidden',
            border: '1px solid rgba(255,255,255,0.06)',
            opacity: visible ? 1 : 0,
            transform: visible ? 'none' : 'translateY(20px)',
            transition: 'opacity 0.6s ease-out 0.3s, transform 0.6s ease-out 0.3s',
          }}
        >
          {[
            { value: '12,000+', label: 'Creative Businesses', icon: '◆' },
            { value: '₹48Cr+', label: 'Revenue Generated', icon: '●' },
            { value: '4.9 / 5', label: 'Average Rating', icon: '★' },
            { value: '98%', label: 'Automation Accuracy', icon: '▲' },
          ].map((stat, i) => (
            <div
              key={stat.label}
              style={{
                padding: '32px 24px',
                background: '#071E26',
                textAlign: 'center',
                position: 'relative',
              }}
            >
              <p style={{ color: '#E4C441', fontSize: '11px', fontFamily: "'JetBrains Mono'", marginBottom: '8px', letterSpacing: '0.06em' }}>{stat.icon}</p>
              <p style={{ color: '#fff', fontSize: '28px', fontWeight: 700, fontFamily: "'JetBrains Mono'", letterSpacing: '-0.02em', marginBottom: '6px' }}>{stat.value}</p>
              <p style={{ color: '#8FA7AD', fontSize: '13px', fontFamily: "'Inter'" }}>{stat.label}</p>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-33.333%); }
        }
      `}</style>
    </section>
  )
}
