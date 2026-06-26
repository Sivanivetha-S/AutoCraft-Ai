import { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'

// Animated floating dashboard card
function DashboardCard({ style, className, children, delay = 0 }) {
  return (
    <div
      className={`glass-card gpu ${className || ''}`}
      style={{
        padding: '16px',
        position: 'absolute',
        animationDelay: `${delay}s`,
        ...style,
      }}
    >
      {children}
    </div>
  )
}

// Tiny sparkline SVG
function Sparkline({ values, color = '#E4C441', height = 32 }) {
  const max = Math.max(...values)
  const min = Math.min(...values)
  const range = max - min || 1
  const w = 80
  const h = height
  const pts = values.map((v, i) => {
    const x = (i / (values.length - 1)) * w
    const y = h - ((v - min) / range) * h
    return `${x},${y}`
  }).join(' ')
  return (
    <svg width={w} height={h} viewBox={`0 0 ${w} ${h}`} fill="none" aria-hidden="true">
      <polyline points={pts} stroke={color} strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  )
}

// Mini bar chart
function MiniBar({ values, color = '#E4C441' }) {
  const max = Math.max(...values)
  return (
    <div style={{ display: 'flex', alignItems: 'flex-end', gap: '3px', height: '36px' }}>
      {values.map((v, i) => (
        <div
          key={i}
          style={{
            flex: 1,
            height: `${(v / max) * 100}%`,
            background: i === values.length - 1 ? color : 'rgba(228,196,65,0.3)',
            borderRadius: '2px 2px 0 0',
            transition: 'height 0.5s ease-out',
          }}
        />
      ))}
    </div>
  )
}

// Animated counter
function Counter({ end, suffix = '', prefix = '' }) {
  const [val, setVal] = useState(0)
  const ref = useRef(null)
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) {
        let start = 0
        const dur = 1500
        const step = end / (dur / 16)
        const timer = setInterval(() => {
          start = Math.min(start + step, end)
          setVal(Math.floor(start))
          if (start >= end) clearInterval(timer)
        }, 16)
        obs.disconnect()
      }
    }, { threshold: 0.5 })
    if (ref.current) obs.observe(ref.current)
    return () => obs.disconnect()
  }, [end])
  return (
    <span ref={ref} className="tabular-nums" style={{ fontFamily: "'JetBrains Mono', monospace" }}>
      {prefix}{val.toLocaleString()}{suffix}
    </span>
  )
}

// Particles background
function Particles() {
  const particles = Array.from({ length: 20 }, (_, i) => ({
    id: i,
    left: Math.random() * 100,
    delay: Math.random() * 15,
    duration: 12 + Math.random() * 10,
    size: Math.random() > 0.7 ? 3 : 2,
  }))
  return (
    <div style={{ position: 'absolute', inset: 0, overflow: 'hidden', pointerEvents: 'none' }} aria-hidden="true">
      {particles.map(p => (
        <div
          key={p.id}
          className="particle"
          style={{
            left: `${p.left}%`,
            bottom: '-10px',
            width: `${p.size}px`,
            height: `${p.size}px`,
            animationDuration: `${p.duration}s`,
            animationDelay: `${p.delay}s`,
            opacity: 0.5,
          }}
        />
      ))}
    </div>
  )
}

// AI Dashboard visual — right side
function HeroDashboard() {
  const revenueData = [42, 58, 51, 73, 62, 88, 75, 95, 82, 110, 98, 124]
  const inventoryData = [80, 65, 72, 58, 90, 45, 78, 62, 85, 70, 92, 88]

  return (
    <div style={{ position: 'relative', width: '100%', height: '540px' }} aria-hidden="true">

      {/* Main analytics card */}
      <DashboardCard
        className="float-card-1"
        style={{ top: '20px', left: '10px', right: '10px', zIndex: 3 }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '16px' }}>
          <div>
            <p style={{ color: '#8FA7AD', fontSize: '11px', fontFamily: "'JetBrains Mono'", letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: '4px' }}>Monthly Revenue</p>
            <p style={{ color: '#fff', fontSize: '26px', fontWeight: 700, fontFamily: "'JetBrains Mono'", lineHeight: 1 }}>
              ₹2,84,500
            </p>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '4px', background: 'rgba(74,222,128,0.12)', border: '1px solid rgba(74,222,128,0.2)', borderRadius: '100px', padding: '4px 10px' }}>
            <svg width="10" height="10" viewBox="0 0 10 10" fill="none"><path d="M2 7L5 4L7 6L9 2" stroke="#4ADE80" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
            <span style={{ color: '#4ADE80', fontSize: '11px', fontWeight: 600, fontFamily: "'JetBrains Mono'" }}>+24.8%</span>
          </div>
        </div>
        <Sparkline values={revenueData} color="#E4C441" height={40} />
        <div style={{ display: 'flex', gap: '20px', marginTop: '12px' }}>
          {[{ l: 'Orders', v: '1,247' }, { l: 'Products', v: '386' }, { l: 'Customers', v: '4,891' }].map(m => (
            <div key={m.l}>
              <p style={{ color: '#8FA7AD', fontSize: '10px', letterSpacing: '0.06em', textTransform: 'uppercase', fontFamily: "'Inter'" }}>{m.l}</p>
              <p style={{ color: '#fff', fontSize: '15px', fontWeight: 600, fontFamily: "'JetBrains Mono'" }}>{m.v}</p>
            </div>
          ))}
        </div>
      </DashboardCard>

      {/* Material Scanner card */}
      <DashboardCard
        className="float-card-2"
        style={{ bottom: '100px', left: '10px', width: '190px', zIndex: 4 }}
        delay={1.5}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '10px' }}>
          <div style={{ width: '28px', height: '28px', background: 'rgba(228,196,65,0.12)', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', border: '1px solid rgba(228,196,65,0.2)' }}>
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><rect x="1" y="4" width="12" height="6" rx="1.5" stroke="#E4C441" strokeWidth="1.2"/><path d="M4 7h6M7 4V2M7 10v2" stroke="#E4C441" strokeWidth="1.2" strokeLinecap="round"/></svg>
          </div>
          <span style={{ color: '#B7C7CC', fontSize: '11px', fontWeight: 500, fontFamily: "'Inter'" }}>AI Material Scanner</span>
        </div>
        {/* Scanner animation */}
        <div style={{ position: 'relative', background: 'rgba(7,30,38,0.8)', borderRadius: '6px', overflow: 'hidden', height: '60px', border: '1px solid rgba(255,255,255,0.05)', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px' }}>
          {['Cotton', 'Jute', 'Silk', 'Wool'].map((m, i) => (
            <div key={m} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '2px' }}>
              <div style={{ width: '28px', height: '28px', borderRadius: '4px', background: ['rgba(228,196,65,0.15)', 'rgba(74,222,128,0.12)', 'rgba(17,76,90,0.6)', 'rgba(228,196,65,0.08)'][i], border: '1px solid rgba(255,255,255,0.06)' }} />
              <span style={{ color: '#8FA7AD', fontSize: '8px', fontFamily: "'JetBrains Mono'" }}>{m}</span>
            </div>
          ))}
          {/* scan line */}
          <div className="scan-line" style={{ position: 'absolute', left: 0, right: 0, height: '1.5px', background: 'linear-gradient(90deg, transparent, #E4C441, transparent)', opacity: 0.8 }} />
        </div>
        <div style={{ marginTop: '8px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <span style={{ color: '#8FA7AD', fontSize: '10px', fontFamily: "'Inter'" }}>Confidence</span>
          <span style={{ color: '#4ADE80', fontSize: '11px', fontWeight: 600, fontFamily: "'JetBrains Mono'" }}>98.4%</span>
        </div>
      </DashboardCard>

      {/* AI Recommendation card */}
      <DashboardCard
        className="float-card-3"
        style={{ bottom: '100px', right: '10px', width: '190px', zIndex: 4 }}
        delay={0.8}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '10px' }}>
          <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#E4C441', animation: 'pulse-glow 2s infinite' }} />
          <span style={{ color: '#E4C441', fontSize: '10px', fontWeight: 600, fontFamily: "'JetBrains Mono'", letterSpacing: '0.06em' }}>AI INSIGHTS</span>
        </div>
        {[
          { icon: '◆', text: 'Reorder Jute — stock low', type: 'warning' },
          { icon: '●', text: 'Peak demand: macramé bags', type: 'success' },
          { icon: '▲', text: 'Price by 12% — margins up', type: 'info' },
        ].map((item, i) => (
          <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '8px', marginBottom: '7px' }}>
            <span style={{ fontSize: '8px', marginTop: '3px', color: ['#E4C441', '#4ADE80', '#B7C7CC'][i] }}>{item.icon}</span>
            <span style={{ color: '#B7C7CC', fontSize: '11px', fontFamily: "'Inter'", lineHeight: '1.4' }}>{item.text}</span>
          </div>
        ))}
        <div style={{ height: '1px', background: 'rgba(255,255,255,0.06)', margin: '8px 0' }} />
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <span style={{ color: '#8FA7AD', fontSize: '10px', fontFamily: "'Inter'" }}>3 new insights</span>
          <span style={{ color: '#E4C441', fontSize: '10px', fontFamily: "'Inter'", cursor: 'pointer' }}>View all →</span>
        </div>
      </DashboardCard>

      {/* Inventory card bottom center */}
      <DashboardCard
        style={{ bottom: '20px', left: '50%', transform: 'translateX(-50%)', width: '220px', zIndex: 3 }}
        delay={2}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
          <span style={{ color: '#B7C7CC', fontSize: '11px', fontFamily: "'Inter'", fontWeight: 500 }}>Inventory Health</span>
          <span style={{ color: '#4ADE80', fontSize: '10px', fontFamily: "'JetBrains Mono'" }}>Optimal</span>
        </div>
        <MiniBar values={inventoryData} />
        <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '8px' }}>
          <span style={{ color: '#8FA7AD', fontSize: '10px', fontFamily: "'Inter'" }}>386 SKUs tracked</span>
          <span style={{ color: '#B7C7CC', fontSize: '10px', fontFamily: "'JetBrains Mono'" }}>96% filled</span>
        </div>
      </DashboardCard>

    </div>
  )
}

export default function Hero() {
  const [visible, setVisible] = useState(false)
  const navigate = useNavigate()
  useEffect(() => { const t = setTimeout(() => setVisible(true), 100); return () => clearTimeout(t) }, [])

  return (
    <section
      id="hero"
      aria-label="Hero section"
      style={{
        position: 'relative',
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        overflow: 'hidden',
        background: '#071E26',
        paddingTop: '72px',
      }}
    >
      {/* Mesh gradient bg */}
      <div aria-hidden="true" style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }}>
        <div className="mesh-bg" style={{ position: 'absolute', top: '-20%', left: '-10%', width: '70%', height: '120%', background: 'radial-gradient(ellipse at center, rgba(17,76,90,0.45) 0%, transparent 70%)', borderRadius: '50%' }} />
        <div style={{ position: 'absolute', top: '10%', right: '-5%', width: '50%', height: '80%', background: 'radial-gradient(ellipse at center, rgba(228,196,65,0.06) 0%, transparent 60%)', borderRadius: '50%' }} />
        <div style={{ position: 'absolute', bottom: 0, left: '20%', width: '60%', height: '40%', background: 'radial-gradient(ellipse at center, rgba(7,30,38,1) 0%, transparent 70%)' }} />
      </div>

      {/* Geometric grid lines */}
      <div aria-hidden="true" style={{ position: 'absolute', inset: 0, pointerEvents: 'none', opacity: 0.04 }}>
        <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="grid" width="60" height="60" patternUnits="userSpaceOnUse">
              <path d="M 60 0 L 0 0 0 60" fill="none" stroke="#E4C441" strokeWidth="0.5"/>
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)"/>
        </svg>
      </div>

      <Particles />

      <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '80px 24px', width: '100%', position: 'relative', zIndex: 2 }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 480px), 1fr))', gap: '80px', alignItems: 'center' }}>

          {/* Left — copy */}
          <div style={{ opacity: visible ? 1 : 0, transform: visible ? 'none' : 'translateY(30px)', transition: 'opacity 0.7s ease-out, transform 0.7s ease-out' }}>
            <div className="section-label" style={{ marginBottom: '28px' }}>
              <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#E4C441', animation: 'pulse-glow 2s infinite', display: 'inline-block' }} />
              AI-Powered Business Automation
            </div>

            <h1 style={{
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: 'clamp(36px, 5vw, 64px)',
              fontWeight: 800,
              lineHeight: 1.1,
              letterSpacing: '-0.03em',
              color: '#FFFFFF',
              marginBottom: '24px',
            }}>
              Automate Every{' '}
              <span style={{ color: '#E4C441', textShadow: '0 0 40px rgba(228,196,65,0.35)' }}>
                Creative
              </span>
              <br />Workflow with AI
            </h1>

            <p style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: 'clamp(16px, 2vw, 19px)',
              fontWeight: 400,
              color: '#B7C7CC',
              lineHeight: 1.7,
              maxWidth: '480px',
              marginBottom: '12px',
            }}>
              Transform raw materials into profitable handmade products using intelligent automation.
            </p>
            <p style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: 'clamp(15px, 1.8vw, 17px)',
              color: '#8FA7AD',
              lineHeight: 1.7,
              maxWidth: '460px',
              marginBottom: '40px',
            }}>
              CraftFlow AI streamlines designing, pricing, inventory, marketing, and selling — so you focus on creating.
            </p>

            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '14px', marginBottom: '52px' }}>
              <button
                onClick={() => navigate('/app/generate')}
                className="btn-primary" style={{ fontSize: '15px', padding: '14px 28px' }}>
                Start Free Trial
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true"><path d="M3 8h10M10 5l3 3-3 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
              </button>
              <button className="btn-ghost" style={{ fontSize: '15px', padding: '13px 27px' }}
                onClick={() => document.getElementById('workflow')?.scrollIntoView({ behavior: 'smooth' })}>
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true"><circle cx="8" cy="8" r="6.5" stroke="currentColor" strokeWidth="1.2"/><path d="M6.5 5.5l4 2.5-4 2.5V5.5Z" fill="currentColor"/></svg>
                Watch Demo
              </button>
            </div>

            {/* Social proof stats */}
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '32px' }}>
              {[
                { value: 12000, suffix: '+', label: 'Creators' },
                { value: 98, suffix: '%', label: 'Satisfaction' },
                { value: 4, suffix: 'x', label: 'Revenue Growth' },
              ].map(s => (
                <div key={s.label}>
                  <p style={{ color: '#fff', fontSize: '26px', fontWeight: 700, lineHeight: 1, marginBottom: '4px' }}>
                    <Counter end={s.value} suffix={s.suffix} />
                  </p>
                  <p style={{ color: '#8FA7AD', fontSize: '13px', fontFamily: "'Inter'", letterSpacing: '0.02em' }}>{s.label}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Right — animated dashboard */}
          <div style={{
            opacity: visible ? 1 : 0,
            transform: visible ? 'none' : 'translateX(30px)',
            transition: 'opacity 0.7s ease-out 0.2s, transform 0.7s ease-out 0.2s',
          }}>
            <HeroDashboard />
          </div>

        </div>
      </div>

      {/* Bottom fade */}
      <div aria-hidden="true" style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: '120px', background: 'linear-gradient(to top, #071E26, transparent)', pointerEvents: 'none' }} />
    </section>
  )
}
