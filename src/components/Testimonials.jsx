import { useEffect, useRef, useState } from 'react'

const TESTIMONIALS = [
  {
    name: 'Priya Nair',
    role: 'Founder, ThreadCraft Studio',
    location: 'Bangalore, IN',
    avatar: 'PN',
    rating: 5,
    growth: '+340% revenue',
    period: 'in 6 months',
    quote: 'CraftFlow AI completely changed how I run my macramé business. What used to take me 3 hours — pricing, listing, inventory — now takes under 10 minutes. The AI pricing engine alone increased my margins by 22%.',
    accent: '#E4C441',
  },
  {
    name: 'Ritu Sharma',
    role: 'Creative Director, ArtNest India',
    location: 'Mumbai, IN',
    avatar: 'RS',
    rating: 5,
    growth: '4.2x orders',
    period: 'since onboarding',
    quote: 'The material scanner is genuinely magical. I just photograph my fabric stock and within seconds it tells me exactly what I can make, the estimated cost, and the ideal selling price. My team of 12 uses it daily.',
    accent: '#4ADE80',
  },
  {
    name: 'Meera Iyer',
    role: 'Solo Artist & Etsy Seller',
    location: 'Chennai, IN',
    avatar: 'MI',
    rating: 5,
    growth: '₹8L ARR',
    period: 'first year',
    quote: 'I was skeptical about AI for a handmade business but CraftFlow proved me wrong. The marketplace automation published 40 Etsy listings in 20 minutes — all with SEO descriptions better than I could ever write.',
    accent: '#E4C441',
  },
  {
    name: 'Ananya Reddy',
    role: 'Head of Product, Handloom Hub',
    location: 'Hyderabad, IN',
    avatar: 'AR',
    rating: 5,
    growth: '68% cost saving',
    period: 'on operations',
    quote: 'We scaled from 2 to 18 people without hiring extra ops staff because CraftFlow handles our entire inventory and order workflow. The business intelligence dashboard helps us make faster, smarter decisions.',
    accent: '#4ADE80',
  },
  {
    name: 'Kavya Menon',
    role: 'Tutor, Craft Academy Kerala',
    location: 'Kochi, IN',
    avatar: 'KM',
    rating: 5,
    growth: '1,200 students',
    period: 'powered by AI',
    quote: 'We use CraftFlow to teach students real business skills alongside craft skills. The platform lets them simulate pricing, inventory, and publishing — it\'s become the best learning tool we have.',
    accent: '#E4C441',
  },
  {
    name: 'Divya Pillai',
    role: 'CEO, Boho Collective',
    location: 'Delhi, IN',
    avatar: 'DP',
    rating: 5,
    growth: '3 marketplace wins',
    period: 'consecutive months',
    quote: 'Three months in a row we\'ve been among the top sellers on Meesho in the handmade category. CraftFlow\'s social automation and the AI content generation makes every product launch feel effortless.',
    accent: '#4ADE80',
  },
]

function StarRating({ count }) {
  return (
    <div style={{ display: 'flex', gap: '3px' }} aria-label={`${count} out of 5 stars`}>
      {Array.from({ length: 5 }, (_, i) => (
        <svg key={i} width="13" height="13" viewBox="0 0 13 13" fill="none" aria-hidden="true">
          <path d="M6.5 1l1.5 3.2 3.5.5-2.5 2.4.6 3.4L6.5 9 3.4 10.5l.6-3.4L1.5 4.7l3.5-.5z"
            fill={i < count ? '#E4C441' : 'rgba(255,255,255,0.1)'} />
        </svg>
      ))}
    </div>
  )
}

function TestimonialCard({ t, index, visible }) {
  const [hovered, setHovered] = useState(false)

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        padding: '28px',
        background: hovered ? 'rgba(18,60,70,0.7)' : 'rgba(18,60,70,0.45)',
        border: `1px solid ${hovered ? `rgba(${t.accent === '#E4C441' ? '228,196,65' : '74,222,128'},0.2)` : 'rgba(255,255,255,0.07)'}`,
        borderRadius: '16px',
        display: 'flex',
        flexDirection: 'column',
        gap: '20px',
        cursor: 'default',
        transition: 'background 200ms ease-out, border-color 200ms ease-out, transform 200ms ease-out, box-shadow 200ms ease-out',
        transform: hovered ? 'translateY(-4px)' : 'none',
        boxShadow: hovered ? '0 16px 48px rgba(0,0,0,0.35)' : 'none',
        opacity: visible ? 1 : 0,
        transitionProperty: 'background, border-color, transform, box-shadow, opacity',
        transitionDuration: `200ms, 200ms, 200ms, 200ms, 0.5s`,
        transitionDelay: `0s, 0s, 0s, 0s, ${index * 0.08}s`,
        transitionTimingFunction: 'ease-out',
      }}
    >
      {/* Top: rating + growth badge */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <StarRating count={t.rating} />
        <div style={{ textAlign: 'right' }}>
          <p style={{ color: t.accent, fontSize: '16px', fontWeight: 700, fontFamily: "'JetBrains Mono'", lineHeight: 1 }}>{t.growth}</p>
          <p style={{ color: '#8FA7AD', fontSize: '11px', fontFamily: "'Inter'", marginTop: '2px' }}>{t.period}</p>
        </div>
      </div>

      {/* Quote */}
      <blockquote style={{ margin: 0 }}>
        <p style={{ color: '#B7C7CC', fontSize: '14px', fontFamily: "'Inter'", lineHeight: '1.75', fontStyle: 'normal' }}>
          "{t.quote}"
        </p>
      </blockquote>

      {/* Author */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px', paddingTop: '4px', borderTop: '1px solid rgba(255,255,255,0.05)' }}>
        <div style={{
          width: '40px', height: '40px', borderRadius: '50%', flexShrink: 0,
          background: `linear-gradient(135deg, rgba(${t.accent === '#E4C441' ? '228,196,65' : '74,222,128'},0.25), rgba(17,76,90,0.8))`,
          border: `1px solid rgba(${t.accent === '#E4C441' ? '228,196,65' : '74,222,128'},0.25)`,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}>
          <span style={{ fontFamily: "'JetBrains Mono'", fontSize: '12px', fontWeight: 700, color: t.accent }}>{t.avatar}</span>
        </div>
        <div>
          <p style={{ color: '#fff', fontSize: '14px', fontWeight: 600, fontFamily: "'Inter'", lineHeight: 1.3 }}>{t.name}</p>
          <p style={{ color: '#8FA7AD', fontSize: '12px', fontFamily: "'Inter'", marginTop: '2px' }}>{t.role}</p>
        </div>
        <div style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: '4px' }}>
          <svg width="10" height="10" viewBox="0 0 10 10" fill="none" aria-hidden="true"><circle cx="5" cy="5" r="4" stroke="#8FA7AD" strokeWidth="0.8"/><circle cx="5" cy="5" r="1.5" fill="#8FA7AD"/></svg>
          <span style={{ color: '#8FA7AD', fontSize: '11px', fontFamily: "'Inter'" }}>{t.location}</span>
        </div>
      </div>
    </div>
  )
}

export default function Testimonials() {
  const ref = useRef(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVisible(true) }, { threshold: 0.1 })
    if (ref.current) obs.observe(ref.current)
    return () => obs.disconnect()
  }, [])

  return (
    <section id="testimonials" ref={ref} aria-label="Testimonials" style={{ padding: '120px 24px', background: 'linear-gradient(180deg, #071E26 0%, rgba(17,76,90,0.08) 50%, #071E26 100%)', position: 'relative', overflow: 'hidden' }}>
      <div aria-hidden="true" style={{ position: 'absolute', top: '20%', right: '-5%', width: '400px', height: '400px', background: 'radial-gradient(ellipse, rgba(228,196,65,0.04) 0%, transparent 70%)', pointerEvents: 'none' }} />

      <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: '72px', opacity: visible ? 1 : 0, transform: visible ? 'none' : 'translateY(24px)', transition: 'opacity 0.6s, transform 0.6s' }}>
          <div className="section-label" style={{ margin: '0 auto 20px' }}>Testimonials</div>
          <h2 style={{ fontFamily: "'JetBrains Mono'", fontSize: 'clamp(28px, 4vw, 48px)', fontWeight: 800, letterSpacing: '-0.03em', color: '#fff', lineHeight: 1.15, marginBottom: '16px' }}>
            Real Businesses.<br /><span style={{ color: '#E4C441' }}>Real Results.</span>
          </h2>
          <p style={{ color: '#8FA7AD', fontSize: '17px', fontFamily: "'Inter'", maxWidth: '460px', margin: '0 auto', lineHeight: 1.7 }}>
            From solo artists to 50-person studios — here's what CraftFlow AI actually does for your bottom line.
          </p>
        </div>

        {/* Animated results ticker */}
        <div style={{ position: 'relative', overflow: 'hidden', marginBottom: '56px' }}>
          <div aria-hidden="true" style={{ position: 'absolute', left: 0, top: 0, bottom: 0, width: '80px', background: 'linear-gradient(to right, #071E26, transparent)', zIndex: 2, pointerEvents: 'none' }} />
          <div aria-hidden="true" style={{ position: 'absolute', right: 0, top: 0, bottom: 0, width: '80px', background: 'linear-gradient(to left, #071E26, transparent)', zIndex: 2, pointerEvents: 'none' }} />
          <div style={{ display: 'flex', gap: '12px', width: 'max-content', animation: 'marquee 28s linear infinite' }}>
            {[
              { metric: '+340%', label: 'Revenue Growth' },
              { metric: '4.2x', label: 'Order Volume' },
              { metric: '₹8L ARR', label: 'First Year' },
              { metric: '68%', label: 'Cost Reduction' },
              { metric: '98.4%', label: 'AI Accuracy' },
              { metric: '< 2s', label: 'Scan Time' },
              { metric: '6 Markets', label: 'Auto-Published' },
              { metric: '40 Listings', label: 'In 20 Minutes' },
              { metric: '+340%', label: 'Revenue Growth' },
              { metric: '4.2x', label: 'Order Volume' },
              { metric: '₹8L ARR', label: 'First Year' },
              { metric: '68%', label: 'Cost Reduction' },
              { metric: '98.4%', label: 'AI Accuracy' },
              { metric: '< 2s', label: 'Scan Time' },
              { metric: '6 Markets', label: 'Auto-Published' },
              { metric: '40 Listings', label: 'In 20 Minutes' },
            ].map((item, i) => (
              <div key={i} style={{ flexShrink: 0, display: 'flex', alignItems: 'center', gap: '10px', padding: '10px 20px', background: 'rgba(18,60,70,0.5)', border: '1px solid rgba(255,255,255,0.06)', borderRadius: '100px' }}>
                <span style={{ fontFamily: "'JetBrains Mono'", fontSize: '15px', fontWeight: 700, color: i % 2 === 0 ? '#E4C441' : '#4ADE80' }}>{item.metric}</span>
                <span style={{ fontFamily: "'Inter'", fontSize: '13px', color: '#8FA7AD', whiteSpace: 'nowrap' }}>{item.label}</span>
              </div>
            ))}
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 340px), 1fr))', gap: '16px' }}>
          {TESTIMONIALS.map((t, i) => (
            <TestimonialCard key={t.name} t={t} index={i} visible={visible} />
          ))}
        </div>

        {/* Average rating bar */}
        <div style={{ marginTop: '64px', padding: '32px', background: 'rgba(18,60,70,0.4)', border: '1px solid rgba(255,255,255,0.07)', borderRadius: '16px', display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '40px', opacity: visible ? 1 : 0, transition: 'opacity 0.6s ease-out 0.4s' }}>
          {[
            { value: '4.9/5', label: 'Average Rating', sub: 'across 1,200+ reviews' },
            { value: '12,000+', label: 'Active Businesses', sub: 'using CraftFlow AI' },
            { value: '98%', label: 'Would Recommend', sub: 'to other creators' },
          ].map(s => (
            <div key={s.label} style={{ textAlign: 'center' }}>
              <p style={{ color: '#E4C441', fontSize: '32px', fontWeight: 800, fontFamily: "'JetBrains Mono'", letterSpacing: '-0.03em', lineHeight: 1 }}>{s.value}</p>
              <p style={{ color: '#fff', fontSize: '14px', fontFamily: "'Inter'", fontWeight: 500, marginTop: '6px' }}>{s.label}</p>
              <p style={{ color: '#8FA7AD', fontSize: '12px', fontFamily: "'Inter'", marginTop: '2px' }}>{s.sub}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
