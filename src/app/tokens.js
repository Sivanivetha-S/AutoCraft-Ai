// Shared design tokens — identical to landing page
export const C = {
  bgPrimary:   '#071E26',
  bgSecondary: '#114C5A',
  card:        '#123C46',
  cardHover:   'rgba(18,60,70,0.75)',
  border:      'rgba(255,255,255,0.08)',
  borderHover: 'rgba(255,255,255,0.14)',
  accent:      '#E4C441',
  accentGlow:  '#FFD95A',
  success:     '#4ADE80',
  textPrimary:   '#FFFFFF',
  textSecondary: '#B7C7CC',
  textMuted:     '#8FA7AD',
  danger:        '#f87171',
}

export const radius = {
  sm: '8px',
  md: '12px',
  lg: '16px',
  xl: '20px',
  full: '100px',
}

export const font = {
  mono: "'JetBrains Mono', monospace",
  sans: "'Inter', sans-serif",
}

// Reusable inline style helpers
export const glassCard = (extra = {}) => ({
  background: 'rgba(18,60,70,0.5)',
  border: `1px solid ${C.border}`,
  borderRadius: radius.lg,
  backdropFilter: 'blur(20px)',
  WebkitBackdropFilter: 'blur(20px)',
  ...extra,
})

export const accentBtn = (extra = {}) => ({
  display: 'inline-flex', alignItems: 'center', gap: '8px',
  padding: '12px 24px',
  background: C.accent, color: C.bgPrimary,
  border: 'none', borderRadius: radius.md,
  fontFamily: font.sans, fontSize: '14px', fontWeight: 600,
  cursor: 'pointer',
  transition: 'background 150ms ease-out, transform 150ms ease-out, box-shadow 150ms ease-out',
  whiteSpace: 'nowrap',
  ...extra,
})

export const ghostBtn = (extra = {}) => ({
  display: 'inline-flex', alignItems: 'center', gap: '8px',
  padding: '11px 23px',
  background: 'transparent', color: C.textPrimary,
  border: `1px solid ${C.border}`, borderRadius: radius.md,
  fontFamily: font.sans, fontSize: '14px', fontWeight: 500,
  cursor: 'pointer',
  transition: 'background 150ms ease-out, border-color 150ms ease-out',
  whiteSpace: 'nowrap',
  ...extra,
})
