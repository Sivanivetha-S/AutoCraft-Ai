import { useState, useRef, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

const CURRENCY = {
  INR: { symbol: '₹', rate: 1, label: 'INR' },
  USD: { symbol: '$', rate: 0.012, label: 'USD' },
  EUR: { symbol: '€', rate: 0.011, label: 'EUR' },
}

const PLANS_BASE = [
  {
    id: 'starter',
    name: 'Starter',
    desc: 'Perfect for solo creators just getting started.',
    monthlyINR: 999,
    highlight: false,
    badge: null,
    features: [
      'AI Material Scanner (50 scans/mo)',
      'Craft Generator (20 designs/mo)',
      'Basic Template Builder',
      '1 Marketplace Integration',
      'Inventory Tracking (up to 50 SKUs)',
      'Business Dashboard (read-only)',
      'Email Support',
    ],
    cta: 'Start Free Trial',
  },
  {
    id: 'professional',
    name: 'Professional',
    desc: 'Built for growing handmade businesses and studios.',
    monthlyINR: 2999,
    highlight: true,
    badge: 'Most Popular',
    features: [
      'AI Material Scanner (unlimited)',
      'Craft Generator (unlimited)',
      'Advanced Template Builder + SVG Export',
      '6 Marketplace Integrations',
      'Inventory AI (unlimited SKUs)',
      'Smart Pricing Engine',
      'Full Business Dashboard + Analytics',
      'Marketing Automation (3 channels)',
      'Priority Support',
    ],
    cta: 'Get Professional',
  },
  {
    id: 'enterprise',
    name: 'Enterprise',
    desc: 'Custom automation for art schools and large studios.',
    monthlyINR: 7999,
    highlight: false,
    badge: null,
    features: [
      'Everything in Professional',
      'Unlimited team members',
      'Custom AI model fine-tuning',
      'White-label storefront',
      'ERP & accounting integrations',
      'Dedicated account manager',
      'SLA guarantee (99.9% uptime)',
      'Custom onboarding & training',
    ],
    cta: 'Contact Sales',
  },
]

function CheckIcon({ color }) {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true" style={{ flexShrink: 0 }}>
      <circle cx="7" cy="7" r="6.5" fill={`rgba(${color === '#E4C441' ? '228,196,65' : '74,222,128'},0.12)`}/>
      <path d="M4 7l2 2 4-4" stroke={color} strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  )
}

function PlanCard({ plan, currency, isAnnual, index, visible }) {
  const navigate = useNavigate()
  const raw = plan.monthlyINR * CURRENCY[currency].rate
  const monthly = isAnnual ? raw * 0.8 : raw
  const sym = CURRENCY[currency].symbol

  const fmt = (n) => {
    if (currency === 'INR') return Math.round(n).toLocaleString('en-IN')
    return n < 10 ? n.toFixed(2) : Math.round(n).toLocaleString()
  }

  return (
    <div
      className={plan.highlight ? 'pricing-highlight' : ''}
      style={{
        position: 'relative',
        background: plan.highlight ? 'rgba(18,60,70,0.8)' : 'rgba(18,60,70,0.4)',
        border: plan.highlight ? '1px solid rgba(228,196,65,0.3)' : '1px solid rgba(255,255,255,0.07)',
        borderRadius: '20px',
        padding: plan.highlight ? '36px 32px' : '32px',
        display: 'flex',
        flexDirection: 'column',
        opacity: visible ? 1 : 0,
        transform: visible ? (plan.highlight ? 'scale(1.03)' : 'none') : 'translateY(30px)',
        transition: `opacity 0.6s ease-out ${index * 0.1}s, transform 0.6s ease-out ${index * 0.1}s`,
      }}
    >
      {plan.badge && (
        <div style={{
          position: 'absolute', top: '-14px', left: '50%', transform: 'translateX(-50%)',
          padding: '5px 18px',
          background: 'linear-gradient(135deg, #E4C441, #FFD95A)',
          borderRadius: '100px',
          fontFamily: "'JetBrains Mono'", fontSize: '11px', fontWeight: 700,
          color: '#071E26', whiteSpace: 'nowrap',
        }}>
          {plan.badge}
        </div>
      )}

      <div style={{ marginBottom: '24px' }}>
        <h3 style={{ fontFamily: "'JetBrains Mono'", fontSize: '18px', fontWeight: 700, color: '#fff', marginBottom: '8px' }}>{plan.name}</h3>
        <p style={{ color: '#8FA7AD', fontSize: '14px', fontFamily: "'Inter'", lineHeight: '1.6' }}>{plan.desc}</p>
      </div>

      <div style={{ marginBottom: '28px' }}>
        <div style={{ display: 'flex', alignItems: 'flex-end', gap: '4px' }}>
          <span style={{ fontFamily: "'JetBrains Mono'", fontSize: '13px', fontWeight: 500, color: '#8FA7AD', marginBottom: '6px' }}>{sym}</span>
          <span style={{ fontFamily: "'JetBrains Mono'", fontSize: '44px', fontWeight: 800, color: plan.highlight ? '#E4C441' : '#fff', lineHeight: 1, letterSpacing: '-0.03em' }}>
            {fmt(monthly)}
          </span>
          <span style={{ fontFamily: "'Inter'", fontSize: '14px', color: '#8FA7AD', marginBottom: '6px' }}>/mo</span>
        </div>
        {isAnnual && (
          <p style={{ color: '#4ADE80', fontSize: '12px', fontFamily: "'JetBrains Mono'", marginTop: '6px' }}>
            ↓ Save {sym}{fmt(raw * 12 * 0.2)} annually
          </p>
        )}
      </div>

      <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 32px', display: 'flex', flexDirection: 'column', gap: '10px', flex: 1 }}>
        {plan.features.map((f, i) => (
          <li key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '10px' }}>
            <CheckIcon color={plan.highlight ? '#E4C441' : '#4ADE80'} />
            <span style={{ color: '#B7C7CC', fontSize: '13px', fontFamily: "'Inter'", lineHeight: '1.5' }}>{f}</span>
          </li>
        ))}
      </ul>

      <button
        onClick={() => plan.id !== 'enterprise' ? navigate('/app/generate') : null}
        style={{
          width: '100%', padding: '14px',
          background: plan.highlight ? '#E4C441' : 'transparent',
          color: plan.highlight ? '#071E26' : '#fff',
          border: plan.highlight ? 'none' : '1px solid rgba(255,255,255,0.15)',
          borderRadius: '10px',
          fontFamily: "'Inter'", fontSize: '15px', fontWeight: 600,
          cursor: 'pointer',
          transition: 'all 150ms ease-out',
        }}
        onMouseEnter={e => {
          if (plan.highlight) { e.currentTarget.style.background = '#FFD95A'; e.currentTarget.style.boxShadow = '0 6px 24px rgba(228,196,65,0.3)' }
          else { e.currentTarget.style.background = 'rgba(255,255,255,0.06)'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.25)' }
          e.currentTarget.style.transform = 'translateY(-1px)'
        }}
        onMouseLeave={e => {
          e.currentTarget.style.background = plan.highlight ? '#E4C441' : 'transparent'
          e.currentTarget.style.boxShadow = 'none'
          e.currentTarget.style.borderColor = plan.highlight ? 'none' : 'rgba(255,255,255,0.15)'
          e.currentTarget.style.transform = 'none'
        }}
      >
        {plan.cta}
      </button>
    </div>
  )
}

export default function Pricing() {
  const [isAnnual, setIsAnnual] = useState(false)
  const [currency, setCurrency] = useState('INR')
  const ref = useRef(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVisible(true) }, { threshold: 0.1 })
    if (ref.current) obs.observe(ref.current)
    return () => obs.disconnect()
  }, [])

  return (
    <section id="pricing" ref={ref} aria-label="Pricing" style={{ padding: '120px 24px', background: '#071E26', position: 'relative', overflow: 'hidden' }}>
      <div aria-hidden="true" style={{ position: 'absolute', bottom: '10%', left: '5%', width: '500px', height: '500px', background: 'radial-gradient(ellipse, rgba(17,76,90,0.18) 0%, transparent 70%)', pointerEvents: 'none' }} />

      <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '60px', opacity: visible ? 1 : 0, transform: visible ? 'none' : 'translateY(24px)', transition: 'opacity 0.6s, transform 0.6s' }}>
          <div className="section-label" style={{ margin: '0 auto 20px' }}>Pricing</div>
          <h2 style={{ fontFamily: "'JetBrains Mono'", fontSize: 'clamp(28px, 4vw, 48px)', fontWeight: 800, letterSpacing: '-0.03em', color: '#fff', lineHeight: 1.15, marginBottom: '16px' }}>
            Simple, Transparent<br /><span style={{ color: '#E4C441' }}>Pricing</span>
          </h2>
          <p style={{ color: '#8FA7AD', fontSize: '17px', fontFamily: "'Inter'", maxWidth: '440px', margin: '0 auto 36px', lineHeight: 1.7 }}>
            Start free. Scale as you grow. No hidden fees.
          </p>

          {/* Controls */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', flexWrap: 'wrap', gap: '20px' }}>
            {/* Billing toggle */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', background: 'rgba(18,60,70,0.5)', border: '1px solid rgba(255,255,255,0.07)', borderRadius: '100px', padding: '5px' }}>
              {['Monthly', 'Annual'].map((opt, i) => {
                const active = (i === 0 && !isAnnual) || (i === 1 && isAnnual)
                return (
                  <button
                    key={opt}
                    onClick={() => setIsAnnual(i === 1)}
                    style={{
                      padding: '8px 20px',
                      background: active ? '#E4C441' : 'transparent',
                      color: active ? '#071E26' : '#8FA7AD',
                      border: 'none', borderRadius: '100px',
                      fontFamily: "'Inter'", fontSize: '14px', fontWeight: 600,
                      cursor: 'pointer', transition: 'all 200ms ease-out',
                      display: 'flex', alignItems: 'center', gap: '6px',
                    }}
                  >
                    {opt}
                    {i === 1 && <span style={{ padding: '2px 7px', background: active ? 'rgba(7,30,38,0.3)' : 'rgba(74,222,128,0.15)', color: active ? '#071E26' : '#4ADE80', borderRadius: '100px', fontSize: '10px', fontWeight: 700, fontFamily: "'JetBrains Mono'" }}>−20%</span>}
                  </button>
                )
              })}
            </div>

            {/* Currency switcher */}
            <div style={{ display: 'flex', gap: '4px', background: 'rgba(18,60,70,0.5)', border: '1px solid rgba(255,255,255,0.07)', borderRadius: '100px', padding: '5px' }}>
              {Object.keys(CURRENCY).map(cur => (
                <button
                  key={cur}
                  onClick={() => setCurrency(cur)}
                  style={{
                    padding: '7px 16px',
                    background: currency === cur ? 'rgba(228,196,65,0.15)' : 'transparent',
                    color: currency === cur ? '#E4C441' : '#8FA7AD',
                    border: currency === cur ? '1px solid rgba(228,196,65,0.25)' : '1px solid transparent',
                    borderRadius: '100px',
                    fontFamily: "'JetBrains Mono'", fontSize: '12px', fontWeight: 600,
                    cursor: 'pointer', transition: 'all 200ms ease-out',
                  }}
                >
                  {cur}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Plan cards */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 300px), 1fr))', gap: '20px', alignItems: 'start' }}>
          {PLANS_BASE.map((plan, i) => (
            <PlanCard key={plan.id} plan={plan} currency={currency} isAnnual={isAnnual} index={i} visible={visible} />
          ))}
        </div>

        {/* Enterprise note */}
        <p style={{ textAlign: 'center', color: '#8FA7AD', fontSize: '14px', fontFamily: "'Inter'", marginTop: '40px', opacity: visible ? 1 : 0, transition: 'opacity 0.6s ease-out 0.4s' }}>
          All plans include a 14-day free trial. No credit card required. &nbsp;
          <a href="#contact" style={{ color: '#E4C441', textDecoration: 'none', borderBottom: '1px solid rgba(228,196,65,0.3)' }}>Contact sales</a> for volume discounts.
        </p>
      </div>
    </section>
  )
}
