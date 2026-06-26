import { useState, useEffect, useCallback } from 'react'

const NAV_LINKS = [
  { label: 'Home', href: '#hero' },
  { label: 'Features', href: '#features' },
  { label: 'Pricing', href: '#pricing' },
  { label: 'Testimonials', href: '#testimonials' },
]

export default function Navigation() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [activeSection, setActiveSection] = useState('')

  const handleScroll = useCallback(() => {
    setScrolled(window.scrollY > 20)
    const sections = ['hero', 'features', 'pricing', 'testimonials']
    for (const id of sections) {
      const el = document.getElementById(id)
      if (el) {
        const rect = el.getBoundingClientRect()
        if (rect.top <= 120 && rect.bottom >= 120) {
          setActiveSection(id)
          break
        }
      }
    }
  }, [])

  useEffect(() => {
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [handleScroll])

  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => { document.body.style.overflow = '' }
  }, [menuOpen])

  const scrollTo = (e, href) => {
    e.preventDefault()
    setMenuOpen(false)
    const id = href.replace('#', '')
    const el = document.getElementById(id)
    if (el) {
      const offset = 80
      const top = el.getBoundingClientRect().top + window.scrollY - offset
      window.scrollTo({ top, behavior: 'smooth' })
    }
  }

  return (
    <>
      <nav
        aria-label="Main navigation"
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          zIndex: 1000,
          transition: 'background 350ms ease-in-out, border-color 350ms ease-in-out, box-shadow 350ms ease-in-out',
          background: scrolled
            ? 'rgba(7, 30, 38, 0.92)'
            : 'transparent',
          borderBottom: scrolled
            ? '1px solid rgba(255,255,255,0.06)'
            : '1px solid transparent',
          boxShadow: scrolled
            ? '0 8px 32px rgba(0,0,0,0.3)'
            : 'none',
          backdropFilter: scrolled ? 'blur(24px) saturate(180%)' : 'none',
          WebkitBackdropFilter: scrolled ? 'blur(24px) saturate(180%)' : 'none',
        }}
      >
        <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 24px' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: '72px' }}>
            {/* Logo */}
            <a
              href="#"
              onClick={e => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }) }}
              style={{ display: 'flex', alignItems: 'center', gap: '10px', textDecoration: 'none' }}
              aria-label="CraftFlow AI - Home"
            >
              <div style={{
                width: '34px', height: '34px',
                background: 'linear-gradient(135deg, #E4C441, #114C5A)',
                borderRadius: '8px',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                flexShrink: 0,
              }}>
                <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true">
                  <path d="M9 2L15.5 6V12L9 16L2.5 12V6L9 2Z" stroke="#071E26" strokeWidth="1.5" fill="none"/>
                  <path d="M9 5.5L12.5 7.5V11.5L9 13.5L5.5 11.5V7.5L9 5.5Z" fill="#071E26" opacity="0.6"/>
                  <circle cx="9" cy="9" r="1.5" fill="#071E26"/>
                </svg>
              </div>
              <span style={{
                fontFamily: "'JetBrains Mono', monospace",
                fontWeight: 700,
                fontSize: '17px',
                color: '#FFFFFF',
                letterSpacing: '-0.01em',
              }}>
                CraftFlow <span style={{ color: '#E4C441' }}>AI</span>
              </span>
            </a>

            {/* Desktop Links */}
            <div
              role="menubar"
              style={{ display: 'flex', alignItems: 'center', gap: '4px' }}
              className="hidden-mobile"
            >
              {NAV_LINKS.map(link => {
                const id = link.href.replace('#', '')
                const isActive = activeSection === id
                return (
                  <a
                    key={link.href}
                    href={link.href}
                    role="menuitem"
                    onClick={e => scrollTo(e, link.href)}
                    style={{
                      padding: '8px 16px',
                      borderRadius: '8px',
                      fontFamily: "'Inter', sans-serif",
                      fontSize: '14px',
                      fontWeight: 500,
                      color: isActive ? '#E4C441' : '#B7C7CC',
                      textDecoration: 'none',
                      transition: 'color 150ms ease-out, background 150ms ease-out',
                      background: isActive ? 'rgba(228,196,65,0.08)' : 'transparent',
                      whiteSpace: 'nowrap',
                    }}
                    onMouseEnter={e => { if (!isActive) e.currentTarget.style.color = '#fff'; e.currentTarget.style.background = 'rgba(255,255,255,0.04)' }}
                    onMouseLeave={e => { e.currentTarget.style.color = isActive ? '#E4C441' : '#B7C7CC'; e.currentTarget.style.background = isActive ? 'rgba(228,196,65,0.08)' : 'transparent' }}
                  >
                    {link.label}
                  </a>
                )
              })}
            </div>

            {/* CTA */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <a
                href="#pricing"
                onClick={e => scrollTo(e, '#pricing')}
                className="hidden-mobile"
                style={{
                  padding: '8px 16px',
                  fontFamily: "'Inter', sans-serif",
                  fontSize: '14px',
                  fontWeight: 500,
                  color: '#B7C7CC',
                  textDecoration: 'none',
                  transition: 'color 150ms ease-out',
                }}
                onMouseEnter={e => e.currentTarget.style.color = '#fff'}
                onMouseLeave={e => e.currentTarget.style.color = '#B7C7CC'}
              >
                Sign In
              </a>
              <a
                href="#contact"
                onClick={e => scrollTo(e, '#contact')}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '6px',
                  padding: '9px 20px',
                  background: '#E4C441',
                  color: '#071E26',
                  fontFamily: "'Inter', sans-serif",
                  fontWeight: 600,
                  fontSize: '14px',
                  borderRadius: '8px',
                  textDecoration: 'none',
                  transition: 'background 150ms ease-out, transform 150ms ease-out, box-shadow 150ms ease-out',
                  whiteSpace: 'nowrap',
                }}
                onMouseEnter={e => { e.currentTarget.style.background = '#FFD95A'; e.currentTarget.style.transform = 'translateY(-1px)'; e.currentTarget.style.boxShadow = '0 6px 20px rgba(228,196,65,0.3)' }}
                onMouseLeave={e => { e.currentTarget.style.background = '#E4C441'; e.currentTarget.style.transform = 'none'; e.currentTarget.style.boxShadow = 'none' }}
              >
                Request Demo
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
                  <path d="M3 7H11M11 7L7.5 3.5M11 7L7.5 10.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </a>

              {/* Mobile hamburger */}
              <button
                aria-label={menuOpen ? 'Close menu' : 'Open menu'}
                aria-expanded={menuOpen}
                onClick={() => setMenuOpen(v => !v)}
                className="show-mobile"
                style={{
                  width: '40px', height: '40px',
                  background: 'rgba(255,255,255,0.06)',
                  border: '1px solid rgba(255,255,255,0.1)',
                  borderRadius: '8px',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  cursor: 'pointer',
                  flexShrink: 0,
                }}
              >
                <div style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
                  <span style={{
                    display: 'block', width: '18px', height: '1.5px',
                    background: '#fff',
                    transition: 'transform 350ms ease-in-out, opacity 350ms',
                    transform: menuOpen ? 'rotate(45deg) translate(4.5px, 4.5px)' : 'none',
                  }} />
                  <span style={{
                    display: 'block', width: '18px', height: '1.5px',
                    background: '#fff',
                    transition: 'opacity 350ms',
                    opacity: menuOpen ? 0 : 1,
                  }} />
                  <span style={{
                    display: 'block', width: '18px', height: '1.5px',
                    background: '#fff',
                    transition: 'transform 350ms ease-in-out, opacity 350ms',
                    transform: menuOpen ? 'rotate(-45deg) translate(4.5px, -4.5px)' : 'none',
                  }} />
                </div>
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <div
        role="dialog"
        aria-modal="true"
        aria-label="Mobile navigation menu"
        style={{
          position: 'fixed',
          inset: 0,
          zIndex: 999,
          background: 'rgba(7,30,38,0.97)',
          backdropFilter: 'blur(24px)',
          WebkitBackdropFilter: 'blur(24px)',
          display: 'flex',
          flexDirection: 'column',
          padding: '100px 32px 40px',
          transition: 'opacity 350ms ease-in-out, transform 350ms ease-in-out',
          opacity: menuOpen ? 1 : 0,
          transform: menuOpen ? 'none' : 'translateY(-10px)',
          pointerEvents: menuOpen ? 'auto' : 'none',
        }}
      >
        <nav style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
          {NAV_LINKS.map((link, i) => (
            <a
              key={link.href}
              href={link.href}
              onClick={e => scrollTo(e, link.href)}
              style={{
                padding: '16px 0',
                fontFamily: "'Inter', sans-serif",
                fontSize: '24px',
                fontWeight: 600,
                color: '#fff',
                textDecoration: 'none',
                borderBottom: '1px solid rgba(255,255,255,0.06)',
                transition: 'color 150ms ease-out, padding-left 150ms ease-out',
                opacity: menuOpen ? 1 : 0,
                transform: menuOpen ? 'none' : 'translateY(10px)',
                transitionDelay: `${i * 50 + 100}ms`,
              }}
              onMouseEnter={e => { e.currentTarget.style.color = '#E4C441'; e.currentTarget.style.paddingLeft = '12px' }}
              onMouseLeave={e => { e.currentTarget.style.color = '#fff'; e.currentTarget.style.paddingLeft = '0' }}
            >
              {link.label}
            </a>
          ))}
        </nav>
        <div style={{ marginTop: '40px' }}>
          <a
            href="#contact"
            onClick={e => scrollTo(e, '#contact')}
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '16px',
              background: '#E4C441',
              color: '#071E26',
              fontFamily: "'Inter', sans-serif",
              fontWeight: 600,
              fontSize: '16px',
              borderRadius: '10px',
              textDecoration: 'none',
            }}
          >
            Request Demo
          </a>
        </div>
      </div>

      <style>{`
        @media (min-width: 768px) {
          .hidden-mobile { display: flex !important; }
          .show-mobile { display: none !important; }
        }
        @media (max-width: 767px) {
          .hidden-mobile { display: none !important; }
          .show-mobile { display: flex !important; }
        }
      `}</style>
    </>
  )
}
