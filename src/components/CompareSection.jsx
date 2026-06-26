import { useEffect, useRef, useState } from 'react'

const ROWS = [
  { task: 'Material identification', before: '30–60 min, manual lookup', after: '< 2 seconds, AI scan' },
  { task: 'Product pricing', before: 'Guesswork & gut feeling', after: 'Live market data + cost model' },
  { task: 'Listing on Etsy / Amazon', before: '45 min per product', after: '1-click, AI writes copy' },
  { task: 'Inventory tracking', before: 'Spreadsheets + sticky notes', after: 'Real-time, auto-reorder alerts' },
  { task: 'Social media posts', before: '2 hours per campaign', after: 'Auto-scheduled from catalog' },
  { task: 'Business analytics', before: 'Monthly review, usually late', after: 'Live dashboard, daily AI digest' },
  { task: 'Design templates', before: 'Hire a designer (₹2,000+)', after: 'Generated in 15 seconds' },
]

export default function CompareSection() {
  const ref = useRef(null)
  const [visible, setVisible] = useState(false)
  const [activeRow, setActiveRow] = useState(null)

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setVisible(true) },
      { threshold: 0.1 }
    )
    if (ref.current) obs.observe(ref.current)
    return () => obs.disconnect()
  }, [])

  return (
    <section
      ref={ref}
      aria-label="Before vs After comparison"
      style={{
        padding: '120px 24px',
        background: '#071E26',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* bg glow */}
      <div aria-hidden="true" style={{ position: 'absolute', top: '30%', left: '50%', transform: 'translateX(-50%)', width: '700px', height: '400px', background: 'radial-gradient(ellipse, rgba(17,76,90,0.18) 0%, transparent 70%)', pointerEvents: 'none' }} />

      <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
        {/* Header */}
        <div style={{
          textAlign: 'center', marginBottom: '64px',
          opacity: visible ? 1 : 0, transform: visible ? 'none' : 'translateY(24px)',
          transition: 'opacity 0.6s ease-out, transform 0.6s ease-out',
        }}>
          <div className="section-label" style={{ margin: '0 auto 20px' }}>The Difference</div>
          <h2 style={{ fontFamily: "'JetBrains Mono'", fontSize: 'clamp(28px, 4vw, 44px)', fontWeight: 800, letterSpacing: '-0.03em', color: '#fff', lineHeight: 1.15, marginBottom: '16px' }}>
            Before CraftFlow AI.<br />
            <span style={{ color: '#E4C441' }}>After CraftFlow AI.</span>
          </h2>
          <p style={{ color: '#8FA7AD', fontSize: '17px', fontFamily: "'Inter'", lineHeight: 1.7 }}>
            Every hour you spend on admin is an hour not spent creating.
          </p>
        </div>

        {/* Column headers */}
        <div style={{
          display: 'grid', gridTemplateColumns: '1fr 1fr 1fr',
          gap: '0', marginBottom: '4px',
          opacity: visible ? 1 : 0, transition: 'opacity 0.6s ease-out 0.15s',
        }}>
          <div style={{ padding: '12px 20px' }}>
            <span style={{ color: '#8FA7AD', fontSize: '11px', fontFamily: "'JetBrains Mono'", letterSpacing: '0.08em', textTransform: 'uppercase' }}>Task</span>
          </div>
          <div style={{ padding: '12px 20px', background: 'rgba(248,113,113,0.05)', borderRadius: '10px 10px 0 0', border: '1px solid rgba(248,113,113,0.1)', borderBottom: 'none', textAlign: 'center' }}>
            <span style={{ color: '#f87171', fontSize: '11px', fontFamily: "'JetBrains Mono'", letterSpacing: '0.08em', textTransform: 'uppercase' }}>✗ Without AI</span>
          </div>
          <div style={{ padding: '12px 20px', background: 'rgba(228,196,65,0.06)', borderRadius: '10px 10px 0 0', border: '1px solid rgba(228,196,65,0.15)', borderBottom: 'none', textAlign: 'center' }}>
            <span style={{ color: '#E4C441', fontSize: '11px', fontFamily: "'JetBrains Mono'", letterSpacing: '0.08em', textTransform: 'uppercase' }}>✓ With CraftFlow AI</span>
          </div>
        </div>

        {/* Rows */}
        <div style={{
          border: '1px solid rgba(255,255,255,0.06)',
          borderRadius: '0 0 14px 14px',
          overflow: 'hidden',
        }}>
          {ROWS.map((row, i) => (
            <div
              key={i}
              onMouseEnter={() => setActiveRow(i)}
              onMouseLeave={() => setActiveRow(null)}
              style={{
                display: 'grid', gridTemplateColumns: '1fr 1fr 1fr',
                borderBottom: i < ROWS.length - 1 ? '1px solid rgba(255,255,255,0.05)' : 'none',
                background: activeRow === i ? 'rgba(18,60,70,0.5)' : 'transparent',
                transition: 'background 150ms ease-out',
                opacity: visible ? 1 : 0,
                transform: visible ? 'none' : 'translateX(-10px)',
                transitionProperty: 'background, opacity, transform',
                transitionDuration: `150ms, 0.5s, 0.5s`,
                transitionDelay: `0s, ${i * 0.07}s, ${i * 0.07}s`,
                transitionTimingFunction: 'ease-out',
              }}
            >
              {/* Task */}
              <div style={{ padding: '18px 20px', display: 'flex', alignItems: 'center' }}>
                <span style={{ fontFamily: "'Inter'", fontSize: '14px', fontWeight: 500, color: activeRow === i ? '#fff' : '#B7C7CC', transition: 'color 150ms' }}>
                  {row.task}
                </span>
              </div>

              {/* Before */}
              <div style={{ padding: '18px 20px', background: activeRow === i ? 'rgba(248,113,113,0.04)' : 'transparent', display: 'flex', alignItems: 'center', gap: '8px', borderLeft: '1px solid rgba(255,255,255,0.04)' }}>
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true" style={{ flexShrink: 0 }}>
                  <circle cx="7" cy="7" r="6" fill="rgba(248,113,113,0.12)"/>
                  <path d="M4.5 4.5l5 5M9.5 4.5l-5 5" stroke="#f87171" strokeWidth="1.3" strokeLinecap="round"/>
                </svg>
                <span style={{ fontFamily: "'Inter'", fontSize: '13px', color: '#8FA7AD', lineHeight: 1.5 }}>{row.before}</span>
              </div>

              {/* After */}
              <div style={{ padding: '18px 20px', background: activeRow === i ? 'rgba(228,196,65,0.04)' : 'transparent', display: 'flex', alignItems: 'center', gap: '8px', borderLeft: '1px solid rgba(255,255,255,0.04)' }}>
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true" style={{ flexShrink: 0 }}>
                  <circle cx="7" cy="7" r="6" fill="rgba(74,222,128,0.12)"/>
                  <path d="M4 7l2 2 4-4" stroke="#4ADE80" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                <span style={{ fontFamily: "'Inter'", fontSize: '13px', color: '#B7C7CC', lineHeight: 1.5 }}>{row.after}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom callout */}
        <div style={{
          marginTop: '40px', padding: '28px 32px',
          background: 'linear-gradient(135deg, rgba(228,196,65,0.07), rgba(17,76,90,0.4))',
          border: '1px solid rgba(228,196,65,0.15)',
          borderRadius: '14px',
          display: 'flex', flexWrap: 'wrap', gap: '20px',
          alignItems: 'center', justifyContent: 'space-between',
          opacity: visible ? 1 : 0, transition: 'opacity 0.6s ease-out 0.5s',
        }}>
          <div>
            <p style={{ fontFamily: "'JetBrains Mono'", fontSize: '20px', fontWeight: 700, color: '#fff', marginBottom: '6px' }}>
              Save <span style={{ color: '#E4C441' }}>18+ hours</span> every week.
            </p>
            <p style={{ fontFamily: "'Inter'", fontSize: '14px', color: '#8FA7AD' }}>
              That's 936 hours a year redirected from admin back to creating.
            </p>
          </div>
          <a
            href="#pricing"
            onClick={e => { e.preventDefault(); document.getElementById('pricing')?.scrollIntoView({ behavior: 'smooth' }) }}
            style={{
              display: 'inline-flex', alignItems: 'center', gap: '8px',
              padding: '13px 26px',
              background: '#E4C441', color: '#071E26',
              fontFamily: "'Inter'", fontSize: '15px', fontWeight: 600,
              borderRadius: '10px', textDecoration: 'none',
              transition: 'background 150ms ease-out, transform 150ms ease-out',
              flexShrink: 0,
            }}
            onMouseEnter={e => { e.currentTarget.style.background = '#FFD95A'; e.currentTarget.style.transform = 'translateY(-1px)' }}
            onMouseLeave={e => { e.currentTarget.style.background = '#E4C441'; e.currentTarget.style.transform = 'none' }}
          >
            Start Saving Time
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
              <path d="M3 8h10M10 5l3 3-3 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </a>
        </div>
      </div>
    </section>
  )
}
