import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const LINKS = {
  Product: ['Features', 'Workflow', 'Dashboard', 'Pricing', 'Changelog'],
  Resources: ['Documentation', 'API Reference', 'Tutorials', 'Blog', 'Status'],
  Company: ['About', 'Careers', 'Press', 'Partners', 'Contact'],
  Legal: ['Privacy Policy', 'Terms of Service', 'Cookie Policy', 'GDPR'],
}

const SOCIALS = [
  {
    label: 'Twitter / X',
    href: '#',
    icon: (
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
        <path d="M12.6 1.5h2.3L9.8 7.2l5.9 7.8h-4.4l-3.7-4.8-4.2 4.8H1l5.5-6.3L.9 1.5h4.5l3.3 4.4 4-4.4zm-.8 13.2h1.3L4.3 2.8H3l8.8 11.9z" fill="currentColor"/>
      </svg>
    ),
  },
  {
    label: 'Instagram',
    href: '#',
    icon: (
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
        <rect x="2" y="2" width="12" height="12" rx="3.5" stroke="currentColor" strokeWidth="1.3"/>
        <circle cx="8" cy="8" r="3" stroke="currentColor" strokeWidth="1.3"/>
        <circle cx="11.5" cy="4.5" r="0.8" fill="currentColor"/>
      </svg>
    ),
  },
  {
    label: 'LinkedIn',
    href: '#',
    icon: (
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
        <rect x="2" y="2" width="12" height="12" rx="2" stroke="currentColor" strokeWidth="1.3"/>
        <path d="M5 7v4M5 5.5v.01M8 11V8.5c0-1 .5-1.5 1.5-1.5S11 7.5 11 8.5V11M8 7v4" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round"/>
      </svg>
    ),
  },
  {
    label: 'YouTube',
    href: '#',
    icon: (
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
        <path d="M14 4.5s-.14-.98-.57-1.41c-.54-.57-1.15-.57-1.43-.6C10 2.4 8 2.4 8 2.4s-2 0-4 .09c-.28.03-.89.03-1.43.6C2.14 3.52 2 4.5 2 4.5S1.86 5.65 1.86 6.8v1.07c0 1.15.14 2.3.14 2.3s.14.98.57 1.41c.54.57 1.26.55 1.57.61C5.14 12.34 8 12.4 8 12.4s2 0 4-.1c.28-.03.89-.03 1.43-.6.43-.43.57-1.41.57-1.41S14 9.22 14 8.07V7c0-1.15-.14-2.3-.14-2.3zM6.57 9.43V6l3.86 1.72-3.86 1.71z" fill="currentColor"/>
      </svg>
    ),
  },
]

function NewsletterForm() {
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState(null)

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!email.includes('@')) return
    setStatus('success')
    setEmail('')
    setTimeout(() => setStatus(null), 4000)
  }

  return (
    <form onSubmit={handleSubmit} aria-label="Newsletter signup" style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
      <div style={{ position: 'relative', flex: 1, minWidth: '200px' }}>
        <input
          type="email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          placeholder="your@email.com"
          required
          aria-label="Email address for newsletter"
          style={{
            width: '100%', padding: '12px 16px',
            background: 'rgba(255,255,255,0.04)',
            border: '1px solid rgba(255,255,255,0.1)',
            borderRadius: '8px', color: '#fff',
            fontFamily: "'Inter'", fontSize: '14px',
            outline: 'none',
            transition: 'border-color 150ms ease-out',
          }}
          onFocus={e => e.target.style.borderColor = 'rgba(228,196,65,0.4)'}
          onBlur={e => e.target.style.borderColor = 'rgba(255,255,255,0.1)'}
        />
      </div>
      <button
        type="submit"
        style={{
          padding: '12px 20px',
          background: '#E4C441', color: '#071E26',
          border: 'none', borderRadius: '8px',
          fontFamily: "'Inter'", fontSize: '14px', fontWeight: 600,
          cursor: 'pointer',
          transition: 'background 150ms ease-out, transform 150ms ease-out',
          whiteSpace: 'nowrap',
        }}
        onMouseEnter={e => { e.currentTarget.style.background = '#FFD95A'; e.currentTarget.style.transform = 'translateY(-1px)' }}
        onMouseLeave={e => { e.currentTarget.style.background = '#E4C441'; e.currentTarget.style.transform = 'none' }}
      >
        Subscribe
      </button>
      {status === 'success' && (
        <p style={{ width: '100%', color: '#4ADE80', fontSize: '13px', fontFamily: "'JetBrains Mono'", marginTop: '4px' }}>
          ✓ You're subscribed. Welcome aboard.
        </p>
      )}
    </form>
  )
}

export default function Footer() {
  const navigate = useNavigate()
  return (
    <footer id="contact" aria-label="Footer" style={{ background: '#071E26', borderTop: '1px solid rgba(255,255,255,0.06)', position: 'relative', overflow: 'hidden' }}>
      <div aria-hidden="true" style={{ position: 'absolute', bottom: 0, left: '20%', width: '600px', height: '300px', background: 'radial-gradient(ellipse, rgba(17,76,90,0.2) 0%, transparent 70%)', pointerEvents: 'none' }} />

      <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '80px 24px 40px', position: 'relative', zIndex: 1 }}>

        {/* CTA Banner */}
        <div style={{
          padding: '56px 48px',
          background: 'linear-gradient(135deg, rgba(17,76,90,0.6) 0%, rgba(18,60,70,0.8) 100%)',
          border: '1px solid rgba(228,196,65,0.15)',
          borderRadius: '20px',
          marginBottom: '80px',
          position: 'relative',
          overflow: 'hidden',
          display: 'flex', flexWrap: 'wrap', gap: '32px',
          alignItems: 'center', justifyContent: 'space-between',
        }}>
          <div aria-hidden="true" style={{ position: 'absolute', top: '-40px', right: '-40px', width: '200px', height: '200px', background: 'radial-gradient(ellipse, rgba(228,196,65,0.1) 0%, transparent 70%)', pointerEvents: 'none' }} />
          <div>
            <p style={{ color: '#E4C441', fontSize: '12px', fontFamily: "'JetBrains Mono'", fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '10px' }}>Start automating today</p>
            <h2 style={{ fontFamily: "'JetBrains Mono'", fontSize: 'clamp(22px, 3.5vw, 36px)', fontWeight: 800, color: '#fff', letterSpacing: '-0.03em', lineHeight: 1.2, marginBottom: '8px' }}>
              Ready to Scale Your<br />Creative Business?
            </h2>
            <p style={{ color: '#8FA7AD', fontSize: '16px', fontFamily: "'Inter'" }}>14-day free trial. No credit card required.</p>
          </div>
          <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
            <a href="#pricing"
              onClick={e => { e.preventDefault(); navigate('/app/generate') }}
              style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '14px 28px', background: '#E4C441', color: '#071E26', fontFamily: "'Inter'", fontSize: '15px', fontWeight: 600, borderRadius: '10px', textDecoration: 'none', transition: 'background 150ms ease-out, transform 150ms ease-out' }}
              onMouseEnter={e => { e.currentTarget.style.background = '#FFD95A'; e.currentTarget.style.transform = 'translateY(-1px)' }}
              onMouseLeave={e => { e.currentTarget.style.background = '#E4C441'; e.currentTarget.style.transform = 'none' }}
            >
              Start Free Trial
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true"><path d="M3 8h10M10 5l3 3-3 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
            </a>
            <a href="mailto:demo@craftflow.ai"
              style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '13px 27px', background: 'transparent', color: '#fff', fontFamily: "'Inter'", fontSize: '15px', fontWeight: 500, borderRadius: '10px', border: '1px solid rgba(255,255,255,0.15)', textDecoration: 'none', transition: 'background 150ms ease-out' }}
              onMouseEnter={e => e.currentTarget.style.background = 'rgba(255,255,255,0.06)'}
              onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
            >
              Request Demo
            </a>
          </div>
        </div>

        {/* Main footer grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))', gap: '48px', marginBottom: '64px' }}>
          {/* Brand col */}
          <div style={{ gridColumn: 'span 2', minWidth: '200px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '16px' }}>
              <div style={{ width: '34px', height: '34px', background: 'linear-gradient(135deg, #E4C441, #114C5A)', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true"><path d="M9 2L15.5 6V12L9 16L2.5 12V6L9 2Z" stroke="#071E26" strokeWidth="1.5" fill="none"/><circle cx="9" cy="9" r="1.5" fill="#071E26"/></svg>
              </div>
              <span style={{ fontFamily: "'JetBrains Mono'", fontWeight: 700, fontSize: '17px', color: '#fff' }}>CraftFlow <span style={{ color: '#E4C441' }}>AI</span></span>
            </div>
            <p style={{ color: '#8FA7AD', fontSize: '14px', fontFamily: "'Inter'", lineHeight: '1.7', maxWidth: '260px', marginBottom: '24px' }}>
              AI-powered business automation for artists, craft studios, and handmade sellers.
            </p>
            <div style={{ marginBottom: '24px' }}>
              <p style={{ color: '#B7C7CC', fontSize: '13px', fontFamily: "'Inter'", fontWeight: 500, marginBottom: '12px' }}>Get product updates</p>
              <NewsletterForm />
            </div>
            <div style={{ display: 'flex', gap: '8px' }}>
              {SOCIALS.map(s => (
                <a
                  key={s.label}
                  href={s.href}
                  aria-label={s.label}
                  style={{
                    width: '36px', height: '36px',
                    background: 'rgba(255,255,255,0.04)',
                    border: '1px solid rgba(255,255,255,0.08)',
                    borderRadius: '8px',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    color: '#8FA7AD',
                    textDecoration: 'none',
                    transition: 'color 150ms ease-out, background 150ms ease-out, border-color 150ms ease-out',
                  }}
                  onMouseEnter={e => { e.currentTarget.style.color = '#E4C441'; e.currentTarget.style.background = 'rgba(228,196,65,0.08)'; e.currentTarget.style.borderColor = 'rgba(228,196,65,0.2)' }}
                  onMouseLeave={e => { e.currentTarget.style.color = '#8FA7AD'; e.currentTarget.style.background = 'rgba(255,255,255,0.04)'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)' }}
                >
                  {s.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Link columns */}
          {Object.entries(LINKS).map(([category, items]) => (
            <div key={category}>
              <h3 style={{ fontFamily: "'JetBrains Mono'", fontSize: '12px', fontWeight: 700, color: '#fff', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: '20px' }}>{category}</h3>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '10px' }}>
                {items.map(item => (
                  <li key={item}>
                    <a
                      href="#"
                      style={{ color: '#8FA7AD', fontSize: '14px', fontFamily: "'Inter'", textDecoration: 'none', transition: 'color 150ms ease-out' }}
                      onMouseEnter={e => e.currentTarget.style.color = '#fff'}
                      onMouseLeave={e => e.currentTarget.style.color = '#8FA7AD'}
                    >
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div style={{ paddingTop: '32px', borderTop: '1px solid rgba(255,255,255,0.06)', display: 'flex', flexWrap: 'wrap', gap: '16px', alignItems: 'center', justifyContent: 'space-between' }}>
          <p style={{ color: '#8FA7AD', fontSize: '13px', fontFamily: "'Inter'" }}>
            © 2026 CraftFlow AI Technologies Pvt. Ltd. All rights reserved.
          </p>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#4ADE80' }} />
            <span style={{ color: '#8FA7AD', fontSize: '12px', fontFamily: "'JetBrains Mono'" }}>All systems operational</span>
          </div>
          <div style={{ display: 'flex', gap: '20px' }}>
            {['Privacy', 'Terms', 'Cookies'].map(l => (
              <a key={l} href="#" style={{ color: '#8FA7AD', fontSize: '13px', fontFamily: "'Inter'", textDecoration: 'none', transition: 'color 150ms ease-out' }}
                onMouseEnter={e => e.currentTarget.style.color = '#fff'}
                onMouseLeave={e => e.currentTarget.style.color = '#8FA7AD'}
              >{l}</a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}
