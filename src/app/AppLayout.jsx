import { useState } from 'react'
import { NavLink, Outlet, useNavigate } from 'react-router-dom'
import { C, font, radius } from './tokens'

const NAV_ITEMS = [
  { to: '/app', end: true, icon: GridIcon, label: 'Dashboard' },
  { to: '/app/generate', icon: SparkIcon, label: 'Generate Craft' },
  { to: '/app/library', icon: BookIcon, label: 'My Library' },
  { to: '/app/favorites', icon: HeartIcon, label: 'Favorites' },
  { to: '/app/recent', icon: ClockIcon, label: 'Recent' },
]
const BOTTOM_ITEMS = [
  { to: '/app/settings', icon: SettingsIcon, label: 'Settings' },
]

function SideItem({ to, end, Icon, label, collapsed }) {
  return (
    <NavLink
      to={to}
      end={end}
      style={({ isActive }) => ({
        display: 'flex', alignItems: 'center', gap: '12px',
        padding: collapsed ? '12px' : '11px 14px',
        borderRadius: radius.md,
        textDecoration: 'none',
        fontFamily: font.sans, fontSize: '14px', fontWeight: 500,
        color: isActive ? C.accent : C.textSecondary,
        background: isActive ? 'rgba(228,196,65,0.1)' : 'transparent',
        border: `1px solid ${isActive ? 'rgba(228,196,65,0.18)' : 'transparent'}`,
        transition: 'all 150ms ease-out',
        justifyContent: collapsed ? 'center' : 'flex-start',
        position: 'relative',
      })}
      onMouseEnter={e => {
        if (!e.currentTarget.style.background.includes('228')) {
          e.currentTarget.style.background = 'rgba(255,255,255,0.04)'
          e.currentTarget.style.color = C.textPrimary
        }
      }}
      onMouseLeave={e => {
        const link = e.currentTarget
        // Let NavLink handle re-apply via style prop on next render
        link.style.background = ''
        link.style.color = ''
      }}
      title={collapsed ? label : undefined}
    >
      <Icon size={18} />
      {!collapsed && <span>{label}</span>}
    </NavLink>
  )
}

export default function AppLayout() {
  const [collapsed, setCollapsed] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const navigate = useNavigate()

  const sidebarWidth = collapsed ? '64px' : '220px'

  return (
    <div style={{ display: 'flex', minHeight: '100vh', background: C.bgPrimary, fontFamily: font.sans }}>

      {/* Mobile overlay */}
      {mobileOpen && (
        <div
          onClick={() => setMobileOpen(false)}
          style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.6)', zIndex: 40, display: 'none' }}
          className="mobile-overlay"
          aria-hidden="true"
        />
      )}

      {/* Sidebar */}
      <aside
        style={{
          width: sidebarWidth,
          minHeight: '100vh',
          background: 'rgba(10,36,46,0.95)',
          borderRight: `1px solid ${C.border}`,
          backdropFilter: 'blur(20px)',
          WebkitBackdropFilter: 'blur(20px)',
          display: 'flex', flexDirection: 'column',
          position: 'fixed', top: 0, left: 0, bottom: 0,
          zIndex: 50,
          transition: 'width 350ms ease-in-out',
          overflow: 'hidden',
        }}
        aria-label="App sidebar navigation"
      >
        {/* Logo */}
        <div style={{ padding: collapsed ? '20px 12px' : '20px 16px', borderBottom: `1px solid ${C.border}`, display: 'flex', alignItems: 'center', justifyContent: collapsed ? 'center' : 'space-between', flexShrink: 0 }}>
          {!collapsed && (
            <button
              onClick={() => navigate('/')}
              style={{ display: 'flex', alignItems: 'center', gap: '8px', background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}
              title="Back to landing page"
            >
              <div style={{ width: '28px', height: '28px', background: 'linear-gradient(135deg, #E4C441, #114C5A)', borderRadius: '7px', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                <svg width="14" height="14" viewBox="0 0 18 18" fill="none"><path d="M9 2L15.5 6V12L9 16L2.5 12V6L9 2Z" stroke="#071E26" strokeWidth="1.5" fill="none"/><circle cx="9" cy="9" r="1.5" fill="#071E26"/></svg>
              </div>
              <span style={{ fontFamily: font.mono, fontWeight: 700, fontSize: '14px', color: '#fff', whiteSpace: 'nowrap' }}>
                CraftFlow <span style={{ color: C.accent }}>AI</span>
              </span>
            </button>
          )}
          {collapsed && (
            <div style={{ width: '28px', height: '28px', background: 'linear-gradient(135deg, #E4C441, #114C5A)', borderRadius: '7px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <svg width="14" height="14" viewBox="0 0 18 18" fill="none"><path d="M9 2L15.5 6V12L9 16L2.5 12V6L9 2Z" stroke="#071E26" strokeWidth="1.5" fill="none"/><circle cx="9" cy="9" r="1.5" fill="#071E26"/></svg>
            </div>
          )}
          <button
            onClick={() => setCollapsed(v => !v)}
            style={{ background: 'rgba(255,255,255,0.04)', border: `1px solid ${C.border}`, borderRadius: '6px', width: '26px', height: '26px', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', flexShrink: 0 }}
            aria-label={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
          >
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none"><path d={collapsed ? 'M4 2l4 4-4 4' : 'M8 2L4 6l4 4'} stroke={C.textMuted} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
          </button>
        </div>

        {/* Nav */}
        <nav style={{ flex: 1, padding: '12px 8px', display: 'flex', flexDirection: 'column', gap: '4px', overflowY: 'auto', overflowX: 'hidden' }}>
          {NAV_ITEMS.map(item => (
            <SideItem key={item.to} to={item.to} end={item.end} Icon={item.icon} label={item.label} collapsed={collapsed} />
          ))}
        </nav>

        {/* Bottom */}
        <div style={{ padding: '12px 8px', borderTop: `1px solid ${C.border}`, display: 'flex', flexDirection: 'column', gap: '4px' }}>
          {BOTTOM_ITEMS.map(item => (
            <SideItem key={item.to} to={item.to} Icon={item.icon} label={item.label} collapsed={collapsed} />
          ))}
          {/* Profile */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: collapsed ? '10px' : '10px 14px', borderRadius: radius.md, marginTop: '4px', cursor: 'pointer' }}
            onMouseEnter={e => e.currentTarget.style.background = 'rgba(255,255,255,0.04)'}
            onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
          >
            <div style={{ width: '30px', height: '30px', borderRadius: '50%', background: 'linear-gradient(135deg, rgba(228,196,65,0.3), rgba(17,76,90,0.8))', border: '1px solid rgba(228,196,65,0.3)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
              <span style={{ fontFamily: font.mono, fontSize: '11px', fontWeight: 700, color: C.accent }}>CF</span>
            </div>
            {!collapsed && (
              <div>
                <p style={{ color: C.textPrimary, fontSize: '13px', fontWeight: 500, lineHeight: 1.3 }}>Creator</p>
                <p style={{ color: C.textMuted, fontSize: '11px' }}>Free Trial</p>
              </div>
            )}
          </div>
        </div>
      </aside>

      {/* Main content */}
      <main
        style={{
          flex: 1,
          marginLeft: sidebarWidth,
          transition: 'margin-left 350ms ease-in-out',
          minHeight: '100vh',
          overflow: 'auto',
        }}
      >
        <Outlet />
      </main>

      <style>{`
        @media (max-width: 767px) {
          .mobile-overlay { display: block !important; }
        }
      `}</style>
    </div>
  )
}

// ── Icons ──────────────────────────────────────────
function GridIcon({ size = 18 }) {
  return <svg width={size} height={size} viewBox="0 0 18 18" fill="none"><rect x="2" y="2" width="6" height="6" rx="1.5" stroke="currentColor" strokeWidth="1.3"/><rect x="10" y="2" width="6" height="6" rx="1.5" stroke="currentColor" strokeWidth="1.3"/><rect x="2" y="10" width="6" height="6" rx="1.5" stroke="currentColor" strokeWidth="1.3"/><rect x="10" y="10" width="6" height="6" rx="1.5" stroke="currentColor" strokeWidth="1.3"/></svg>
}
function SparkIcon({ size = 18 }) {
  return <svg width={size} height={size} viewBox="0 0 18 18" fill="none"><path d="M9 2v3M9 13v3M2 9h3M13 9h3M4.2 4.2l2.1 2.1M11.7 11.7l2.1 2.1M4.2 13.8l2.1-2.1M11.7 6.3l2.1-2.1" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/><circle cx="9" cy="9" r="2.5" stroke="currentColor" strokeWidth="1.4"/></svg>
}
function BookIcon({ size = 18 }) {
  return <svg width={size} height={size} viewBox="0 0 18 18" fill="none"><path d="M3 3h5a3 3 0 013 3v10a2 2 0 00-2-2H3V3z" stroke="currentColor" strokeWidth="1.3"/><path d="M15 3h-5a3 3 0 00-3 3v10a2 2 0 012-2h6V3z" stroke="currentColor" strokeWidth="1.3"/></svg>
}
function HeartIcon({ size = 18 }) {
  return <svg width={size} height={size} viewBox="0 0 18 18" fill="none"><path d="M9 14.5s-7-4.5-7-8.5a4 4 0 018 0 4 4 0 018 0c0 4-7 8.5-7 8.5z" stroke="currentColor" strokeWidth="1.3" strokeLinejoin="round"/></svg>
}
function ClockIcon({ size = 18 }) {
  return <svg width={size} height={size} viewBox="0 0 18 18" fill="none"><circle cx="9" cy="9" r="7" stroke="currentColor" strokeWidth="1.3"/><path d="M9 5v4l3 2" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/></svg>
}
function SettingsIcon({ size = 18 }) {
  return <svg width={size} height={size} viewBox="0 0 18 18" fill="none"><circle cx="9" cy="9" r="2.5" stroke="currentColor" strokeWidth="1.3"/><path d="M9 2v1.5M9 14.5V16M2 9h1.5M14.5 9H16M4.1 4.1l1 1M12.9 12.9l1 1M4.1 13.9l1-1M12.9 5.1l1-1" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round"/></svg>
}
