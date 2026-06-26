import { useEffect, useRef, useState } from 'react'

const FAQS = [
  {
    q: 'Is CraftFlow AI only for Indian sellers?',
    a: 'No. CraftFlow AI works globally. We support INR, USD, EUR, GBP, and 12 other currencies. Our marketplace integrations cover Etsy, Amazon Handmade, Meesho, Flipkart, Shopify, WooCommerce, and more — across 40+ countries.',
  },
  {
    q: 'How accurate is the AI Material Scanner?',
    a: "The material scanner achieves 98.4% accuracy across 2,400+ material types including natural fibers (cotton, silk, jute, wool), synthetic fabrics, dyes, beads, wire, wood, and paper crafts. It's trained on 15M+ product images and improves every week.",
  },
  {
    q: 'Do I need technical knowledge to use CraftFlow AI?',
    a: 'Not at all. CraftFlow is designed for artists and creators, not engineers. If you can use Instagram, you can use CraftFlow. Our onboarding takes under 15 minutes and we offer live chat support plus a dedicated YouTube tutorial library.',
  },
  {
    q: 'Can I connect my existing Etsy or Amazon shop?',
    a: 'Yes. CraftFlow connects to your existing storefronts via official APIs — no passwords shared, no scraping. We sync listings, inventory, and orders in real-time. Setup takes under 5 minutes per marketplace.',
  },
  {
    q: 'What happens to my data? Is it private?',
    a: 'Your data belongs to you, always. We use bank-grade AES-256 encryption at rest and TLS 1.3 in transit. We never train shared AI models on your private product data. You can export or delete all your data at any time from settings.',
  },
  {
    q: 'Can multiple team members use the same account?',
    a: 'Starter plans support 1 user. Professional supports up to 5 team members with role-based access. Enterprise supports unlimited team members with custom permissions, audit logs, and SSO.',
  },
  {
    q: 'Is there a free trial? What does it include?',
    a: 'Yes — all plans start with a 14-day free trial. No credit card required. You get full access to every feature in the plan you chose, including all AI scans, marketplace connections, and analytics.',
  },
  {
    q: 'How does the Smart Pricing Engine work?',
    a: 'Our pricing engine pulls live data from Etsy, Amazon, Meesho, and 3 other marketplaces every 6 hours. It factors your material cost, labor time, platform fees, and desired margin to recommend a price that maximizes profit while staying competitive.',
  },
]

function FAQItem({ item, index, isOpen, onToggle, visible }) {
  return (
    <div
      style={{
        borderBottom: '1px solid rgba(255,255,255,0.06)',
        opacity: visible ? 1 : 0,
        transform: visible ? 'none' : 'translateY(16px)',
        transition: `opacity 0.5s ease-out ${index * 0.06}s, transform 0.5s ease-out ${index * 0.06}s`,
      }}
    >
      <button
        aria-expanded={isOpen}
        onClick={onToggle}
        style={{
          width: '100%', padding: '24px 0',
          background: 'none', border: 'none',
          display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between',
          gap: '16px', cursor: 'pointer', textAlign: 'left',
        }}
      >
        <span style={{
          fontFamily: "'Inter'", fontSize: 'clamp(15px, 2vw, 17px)',
          fontWeight: 500,
          color: isOpen ? '#fff' : '#B7C7CC',
          lineHeight: '1.5',
          transition: 'color 200ms ease-out',
          flex: 1,
        }}>
          {item.q}
        </span>
        <div style={{
          width: '28px', height: '28px', flexShrink: 0,
          background: isOpen ? 'rgba(228,196,65,0.12)' : 'rgba(255,255,255,0.04)',
          border: `1px solid ${isOpen ? 'rgba(228,196,65,0.25)' : 'rgba(255,255,255,0.08)'}`,
          borderRadius: '50%',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          transition: 'background 200ms ease-out, border-color 200ms ease-out',
          marginTop: '2px',
        }}>
          <svg
            width="12" height="12" viewBox="0 0 12 12" fill="none"
            aria-hidden="true"
            style={{ transform: isOpen ? 'rotate(45deg)' : 'none', transition: 'transform 350ms ease-in-out' }}
          >
            <path d="M6 2v8M2 6h8" stroke={isOpen ? '#E4C441' : '#8FA7AD'} strokeWidth="1.5" strokeLinecap="round"/>
          </svg>
        </div>
      </button>

      <div className={`accordion-content ${isOpen ? 'open' : ''}`}>
        <p style={{
          color: '#8FA7AD', fontSize: '15px', fontFamily: "'Inter'",
          lineHeight: '1.75', paddingBottom: '24px', maxWidth: '720px',
        }}>
          {item.a}
        </p>
      </div>
    </div>
  )
}

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState(0)
  const ref = useRef(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVisible(true) }, { threshold: 0.1 })
    if (ref.current) obs.observe(ref.current)
    return () => obs.disconnect()
  }, [])

  return (
    <section id="faq" ref={ref} aria-label="Frequently asked questions" style={{ padding: '120px 24px', background: '#071E26', position: 'relative', overflow: 'hidden' }}>
      <div aria-hidden="true" style={{ position: 'absolute', top: '20%', left: '5%', width: '400px', height: '400px', background: 'radial-gradient(ellipse, rgba(17,76,90,0.15) 0%, transparent 70%)', pointerEvents: 'none' }} />

      <div style={{ maxWidth: '800px', margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: '72px', opacity: visible ? 1 : 0, transform: visible ? 'none' : 'translateY(24px)', transition: 'opacity 0.6s, transform 0.6s' }}>
          <div className="section-label" style={{ margin: '0 auto 20px' }}>FAQ</div>
          <h2 style={{ fontFamily: "'JetBrains Mono'", fontSize: 'clamp(28px, 4vw, 48px)', fontWeight: 800, letterSpacing: '-0.03em', color: '#fff', lineHeight: 1.15, marginBottom: '16px' }}>
            Questions Answered
          </h2>
          <p style={{ color: '#8FA7AD', fontSize: '17px', fontFamily: "'Inter'", lineHeight: 1.7 }}>
            Everything you need to know before you start automating.
          </p>
        </div>

        <div>
          {FAQS.map((item, i) => (
            <FAQItem
              key={i} item={item} index={i}
              isOpen={openIndex === i}
              onToggle={() => setOpenIndex(openIndex === i ? -1 : i)}
              visible={visible}
            />
          ))}
        </div>

        <div style={{
          marginTop: '64px', padding: '32px', textAlign: 'center',
          background: 'rgba(18,60,70,0.4)', border: '1px solid rgba(255,255,255,0.07)',
          borderRadius: '16px',
          opacity: visible ? 1 : 0, transition: 'opacity 0.6s ease-out 0.5s',
        }}>
          <p style={{ color: '#B7C7CC', fontSize: '16px', fontFamily: "'Inter'", marginBottom: '16px' }}>
            Still have questions? We're here for you.
          </p>
          <a
            href="mailto:support@craftflow.ai"
            style={{
              display: 'inline-flex', alignItems: 'center', gap: '8px',
              padding: '12px 24px',
              background: 'rgba(228,196,65,0.1)', border: '1px solid rgba(228,196,65,0.25)',
              borderRadius: '10px', color: '#E4C441',
              fontFamily: "'Inter'", fontSize: '15px', fontWeight: 500,
              textDecoration: 'none',
              transition: 'background 150ms ease-out, border-color 150ms ease-out',
            }}
            onMouseEnter={e => { e.currentTarget.style.background = 'rgba(228,196,65,0.18)'; e.currentTarget.style.borderColor = 'rgba(228,196,65,0.4)' }}
            onMouseLeave={e => { e.currentTarget.style.background = 'rgba(228,196,65,0.1)'; e.currentTarget.style.borderColor = 'rgba(228,196,65,0.25)' }}
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true"><path d="M2 4l6 5 6-5M2 4h12v9a1 1 0 01-1 1H3a1 1 0 01-1-1V4z" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/></svg>
            Chat with Support
          </a>
        </div>
      </div>
    </section>
  )
}
