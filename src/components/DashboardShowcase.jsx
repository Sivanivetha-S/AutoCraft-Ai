import { useEffect, useRef, useState } from 'react'

function BarChart({ data, label, color = '#E4C441' }) {
  const max = Math.max(...data.map(d => d.v))
  return (
    <div>
      <p style={{ color: '#8FA7AD', fontSize: '11px', fontFamily: "'JetBrains Mono'", letterSpacing: '0.07em', textTransform: 'uppercase', marginBottom: '12px' }}>{label}</p>
      <div style={{ display: 'flex', alignItems: 'flex-end', gap: '4px', height: '80px' }}>
        {data.map((d, i) => (
          <div key={i} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4px', height: '100%', justifyContent: 'flex-end' }}>
            <div style={{ width: '100%', height: `${(d.v / max) * 100}%`, background: i === data.length - 1 ? color : `rgba(${color === '#E4C441' ? '228,196,65' : '74,222,128'},0.25)`, borderRadius: '3px 3px 0 0', minHeight: '4px', transition: 'height 0.6s ease-out' }} />
            <span style={{ color: '#8FA7AD', fontSize: '9px', fontFamily: "'JetBrains Mono'" }}>{d.l}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

function DonutChart({ percentage, color = '#E4C441', label, sublabel }) {
  const r = 36, circ = 2 * Math.PI * r
  const dash = (percentage / 100) * circ
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}>
      <div style={{ position: 'relative', width: '88px', height: '88px' }}>
        <svg width="88" height="88" viewBox="0 0 88 88" aria-hidden="true">
          <circle cx="44" cy="44" r={r} fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="7"/>
          <circle cx="44" cy="44" r={r} fill="none" stroke={color} strokeWidth="7"
            strokeDasharray={`${dash} ${circ}`} strokeLinecap="round"
            style={{ transform: 'rotate(-90deg)', transformOrigin: '50% 50%', transition: 'stroke-dasharray 1s ease-out' }}/>
        </svg>
        <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <span style={{ fontFamily: "'JetBrains Mono'", fontSize: '15px', fontWeight: 700, color: '#fff' }}>{percentage}%</span>
        </div>
      </div>
      <div style={{ textAlign: 'center' }}>
        <p style={{ color: '#fff', fontSize: '13px', fontFamily: "'Inter'", fontWeight: 500 }}>{label}</p>
        <p style={{ color: '#8FA7AD', fontSize: '11px', fontFamily: "'Inter'" }}>{sublabel}</p>
      </div>
    </div>
  )
}

function MetricCard({ label, value, change, positive = true }) {
  return (
    <div style={{ padding: '20px', background: 'rgba(7,30,38,0.7)', borderRadius: '10px', border: '1px solid rgba(255,255,255,0.06)' }}>
      <p style={{ color: '#8FA7AD', fontSize: '11px', fontFamily: "'Inter'", marginBottom: '8px', letterSpacing: '0.04em' }}>{label}</p>
      <p style={{ color: '#fff', fontSize: '22px', fontWeight: 700, fontFamily: "'JetBrains Mono'", letterSpacing: '-0.02em', marginBottom: '6px' }}>{value}</p>
      <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
        <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true">
          {positive
            ? <path d="M2 9l3.5-3.5L8 8l3-4" stroke="#4ADE80" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/>
            : <path d="M2 3l3.5 3.5L8 4l3 4" stroke="#f87171" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/>}
        </svg>
        <span style={{ color: positive ? '#4ADE80' : '#f87171', fontSize: '12px', fontFamily: "'JetBrains Mono'", fontWeight: 600 }}>{change}</span>
        <span style={{ color: '#8FA7AD', fontSize: '11px', fontFamily: "'Inter'" }}>vs last month</span>
      </div>
    </div>
  )
}

const revenueData = [
  { l: 'Jan', v: 42 }, { l: 'Feb', v: 58 }, { l: 'Mar', v: 51 },
  { l: 'Apr', v: 73 }, { l: 'May', v: 62 }, { l: 'Jun', v: 88 },
  { l: 'Jul', v: 75 }, { l: 'Aug', v: 95 }, { l: 'Sep', v: 82 },
  { l: 'Oct', v: 110 }, { l: 'Nov', v: 98 }, { l: 'Dec', v: 124 },
]
const ordersData = [
  { l: 'Mon', v: 24 }, { l: 'Tue', v: 38 }, { l: 'Wed', v: 29 },
  { l: 'Thu', v: 45 }, { l: 'Fri', v: 52 }, { l: 'Sat', v: 61 }, { l: 'Sun', v: 43 },
]

const AI_INSIGHTS = [
  { icon: '◆', text: 'Macramé wall hangings trending — 3x demand spike', badge: 'Hot', color: '#E4C441' },
  { icon: '▲', text: 'Raise cotton bag price by ₹45 for 18% margin boost', badge: 'Pricing', color: '#4ADE80' },
  { icon: '●', text: 'Reorder jute (2kg) — current stock lasts 4 days', badge: 'Inventory', color: '#E4C441' },
  { icon: '◉', text: 'Best posting time: Tuesday 7–9 PM on Instagram', badge: 'Marketing', color: '#4ADE80' },
]

export default function DashboardShowcase() {
  const ref = useRef(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVisible(true) }, { threshold: 0.1 })
    if (ref.current) obs.observe(ref.current)
    return () => obs.disconnect()
  }, [])

  return (
    <section id="dashboard" ref={ref} aria-label="Dashboard showcase" style={{ padding: '120px 24px', background: 'linear-gradient(180deg, #071E26 0%, rgba(17,76,90,0.1) 50%, #071E26 100%)', position: 'relative', overflow: 'hidden' }}>
      <div aria-hidden="true" style={{ position: 'absolute', top: '10%', right: '5%', width: '400px', height: '400px', background: 'radial-gradient(ellipse, rgba(228,196,65,0.05) 0%, transparent 70%)', pointerEvents: 'none' }} />

      <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '72px', opacity: visible ? 1 : 0, transform: visible ? 'none' : 'translateY(24px)', transition: 'opacity 0.6s, transform 0.6s' }}>
          <div className="section-label" style={{ margin: '0 auto 20px' }}>Analytics Dashboard</div>
          <h2 style={{ fontFamily: "'JetBrains Mono'", fontSize: 'clamp(28px, 4vw, 48px)', fontWeight: 800, letterSpacing: '-0.03em', color: '#fff', lineHeight: 1.15, marginBottom: '16px' }}>
            Your Entire Business<br /><span style={{ color: '#E4C441' }}>At a Glance</span>
          </h2>
          <p style={{ color: '#8FA7AD', fontSize: '17px', fontFamily: "'Inter'", maxWidth: '480px', margin: '0 auto', lineHeight: 1.7 }}>
            Enterprise analytics built for craft businesses — from solo creators to studios with 50+ team members.
          </p>
        </div>

        {/* Dashboard frame */}
        <div
          role="img"
          aria-label="CraftFlow AI dashboard preview"
          style={{
            background: 'rgba(18,60,70,0.4)',
            border: '1px solid rgba(255,255,255,0.08)',
            borderRadius: '20px',
            overflow: 'hidden',
            boxShadow: '0 40px 120px rgba(0,0,0,0.5)',
            opacity: visible ? 1 : 0,
            transform: visible ? 'none' : 'translateY(40px)',
            transition: 'opacity 0.7s ease-out 0.15s, transform 0.7s ease-out 0.15s',
          }}
        >
          {/* Toolbar */}
          <div style={{ padding: '14px 20px', borderBottom: '1px solid rgba(255,255,255,0.06)', display: 'flex', alignItems: 'center', gap: '12px', background: 'rgba(7,30,38,0.8)' }}>
            <div style={{ display: 'flex', gap: '6px' }}>
              {['#f87171', '#fbbf24', '#4ade80'].map(c => <div key={c} style={{ width: '10px', height: '10px', borderRadius: '50%', background: c, opacity: 0.7 }} />)}
            </div>
            <div style={{ flex: 1, height: '24px', background: 'rgba(255,255,255,0.04)', borderRadius: '6px', display: 'flex', alignItems: 'center', paddingLeft: '10px', maxWidth: '300px' }}>
              <span style={{ color: '#8FA7AD', fontSize: '11px', fontFamily: "'JetBrains Mono'" }}>app.craftflow.ai/dashboard</span>
            </div>
            <div style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: '6px' }}>
              <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#4ADE80', animation: 'pulse-glow 2s infinite' }} />
              <span style={{ color: '#4ADE80', fontSize: '11px', fontFamily: "'JetBrains Mono'" }}>Live</span>
            </div>
          </div>

          {/* Dashboard content */}
          <div style={{ padding: '24px', display: 'grid', gap: '16px' }}>
            {/* Metric cards row */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))', gap: '12px' }}>
              <MetricCard label="Total Revenue" value="₹2,84,500" change="+24.8%" positive />
              <MetricCard label="Total Orders" value="1,247" change="+18.3%" positive />
              <MetricCard label="Active Products" value="386" change="+12.1%" positive />
              <MetricCard label="Avg. Margin" value="67.4%" change="+4.2%" positive />
            </div>

            {/* Charts row */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '16px' }}>
              {/* Revenue chart */}
              <div style={{ padding: '20px', background: 'rgba(7,30,38,0.7)', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.06)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                  <BarChart data={revenueData} label="Revenue (₹K) — 12 months" color="#E4C441" />
                </div>
              </div>

              {/* Orders chart */}
              <div style={{ padding: '20px', background: 'rgba(7,30,38,0.7)', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.06)' }}>
                <BarChart data={ordersData} label="Orders — This Week" color="#4ADE80" />
              </div>

              {/* Donut charts */}
              <div style={{ padding: '20px', background: 'rgba(7,30,38,0.7)', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.06)', display: 'flex', justifyContent: 'space-around', alignItems: 'center' }}>
                <DonutChart percentage={96} color="#4ADE80" label="Stock Health" sublabel="386 SKUs" />
                <DonutChart percentage={78} color="#E4C441" label="Goal Progress" sublabel="Q4 Target" />
              </div>
            </div>

            {/* AI Insights */}
            <div style={{ padding: '20px', background: 'rgba(7,30,38,0.7)', borderRadius: '12px', border: '1px solid rgba(228,196,65,0.1)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px' }}>
                <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#E4C441', animation: 'pulse-glow 2s infinite' }} />
                <span style={{ color: '#E4C441', fontSize: '12px', fontFamily: "'JetBrains Mono'", fontWeight: 600, letterSpacing: '0.07em' }}>AI INSIGHTS — 4 NEW</span>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '10px' }}>
                {AI_INSIGHTS.map((ins, i) => (
                  <div key={i} style={{ display: 'flex', gap: '10px', alignItems: 'flex-start', padding: '12px', background: 'rgba(18,60,70,0.5)', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.05)' }}>
                    <span style={{ color: ins.color, fontSize: '10px', marginTop: '3px', flexShrink: 0 }}>{ins.icon}</span>
                    <p style={{ color: '#B7C7CC', fontSize: '12px', fontFamily: "'Inter'", lineHeight: '1.5', flex: 1 }}>{ins.text}</p>
                    <span style={{ padding: '2px 7px', background: `rgba(${ins.color === '#E4C441' ? '228,196,65' : '74,222,128'},0.1)`, border: `1px solid rgba(${ins.color === '#E4C441' ? '228,196,65' : '74,222,128'},0.2)`, borderRadius: '100px', color: ins.color, fontSize: '9px', fontFamily: "'JetBrains Mono'", fontWeight: 600, whiteSpace: 'nowrap', flexShrink: 0 }}>{ins.badge}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
