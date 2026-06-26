import { useState } from 'react'
import { C, font, radius, glassCard } from '../tokens'

function Toggle({ value, onChange, label, sub }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '16px 0', borderBottom: `1px solid ${C.border}` }}>
      <div>
        <p style={{ fontFamily: font.sans, fontSize: '14px', fontWeight: 500, color: C.textPrimary }}>{label}</p>
        {sub && <p style={{ fontFamily: font.sans, fontSize: '12px', color: C.textMuted, marginTop: '2px' }}>{sub}</p>}
      </div>
      <button
        role="switch" aria-checked={value} onClick={() => onChange(!value)}
        style={{ width: '44px', height: '24px', borderRadius: '12px', background: value ? C.accent : 'rgba(255,255,255,0.1)', border: 'none', cursor: 'pointer', position: 'relative', transition: 'background 200ms', flexShrink: 0 }}
      >
        <div style={{ position: 'absolute', top: '3px', left: value ? '23px' : '3px', width: '18px', height: '18px', borderRadius: '50%', background: value ? C.bgPrimary : 'rgba(255,255,255,0.5)', transition: 'left 200ms' }} />
      </button>
    </div>
  )
}

export default function SettingsPage() {
  const [prefs, setPrefs] = useState({ notifications: true, autoSave: true, darkMode: true, analytics: false, newsletter: true })
  const [currency, setCurrency] = useState('INR')
  const [saved, setSaved] = useState(false)

  const handleSave = () => { setSaved(true); setTimeout(() => setSaved(false), 2500) }
  const set = (key) => (val) => setPrefs(p => ({ ...p, [key]: val }))

  return (
    <div style={{ padding: '32px', minHeight: '100vh', maxWidth: '720px' }}>
      <div className="section-label" style={{ display: 'inline-flex', marginBottom: '16px' }}>Settings</div>
      <h1 style={{ fontFamily: font.mono, fontSize: 'clamp(22px, 3vw, 30px)', fontWeight: 800, color: C.textPrimary, letterSpacing: '-0.03em', marginBottom: '32px' }}>
        Preferences
      </h1>

      {/* Profile */}
      <div style={{ ...glassCard({ padding: '24px' }), marginBottom: '16px' }}>
        <p style={{ fontFamily: font.mono, fontSize: '12px', color: C.textMuted, letterSpacing: '0.07em', textTransform: 'uppercase', marginBottom: '20px' }}>Profile</p>
        <div style={{ display: 'flex', gap: '16px', alignItems: 'center', marginBottom: '20px' }}>
          <div style={{ width: '56px', height: '56px', borderRadius: '50%', background: 'linear-gradient(135deg, rgba(228,196,65,0.3), rgba(17,76,90,0.8))', border: '2px solid rgba(228,196,65,0.3)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <span style={{ fontFamily: font.mono, fontSize: '18px', fontWeight: 700, color: C.accent }}>CF</span>
          </div>
          <div>
            <p style={{ fontFamily: font.mono, fontSize: '16px', fontWeight: 700, color: C.textPrimary }}>Creator</p>
            <p style={{ fontFamily: font.sans, fontSize: '13px', color: C.textMuted }}>Free Trial Plan</p>
          </div>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
          {[{ label: 'Display Name', val: 'Creator', ph: 'Your name' }, { label: 'Email', val: '', ph: 'your@email.com' }].map(f => (
            <div key={f.label}>
              <label style={{ fontFamily: font.sans, fontSize: '12px', color: C.textMuted, display: 'block', marginBottom: '6px' }}>{f.label}</label>
              <input defaultValue={f.val} placeholder={f.ph} style={{ width: '100%', padding: '9px 12px', background: 'rgba(7,30,38,0.7)', border: `1px solid ${C.border}`, borderRadius: radius.md, color: C.textPrimary, fontFamily: font.sans, fontSize: '13px', outline: 'none' }}
                onFocus={e => e.target.style.borderColor = 'rgba(228,196,65,0.4)'}
                onBlur={e => e.target.style.borderColor = C.border}
              />
            </div>
          ))}
        </div>
      </div>

      {/* Currency */}
      <div style={{ ...glassCard({ padding: '24px' }), marginBottom: '16px' }}>
        <p style={{ fontFamily: font.mono, fontSize: '12px', color: C.textMuted, letterSpacing: '0.07em', textTransform: 'uppercase', marginBottom: '16px' }}>Currency & Region</p>
        <div style={{ display: 'flex', gap: '8px' }}>
          {['INR', 'USD', 'EUR'].map(c => (
            <button key={c} onClick={() => setCurrency(c)}
              style={{ padding: '9px 20px', background: currency === c ? 'rgba(228,196,65,0.12)' : 'transparent', border: `1px solid ${currency === c ? 'rgba(228,196,65,0.3)' : C.border}`, borderRadius: radius.full, color: currency === c ? C.accent : C.textMuted, fontFamily: font.mono, fontSize: '13px', fontWeight: currency === c ? 600 : 400, cursor: 'pointer', transition: 'all 150ms' }}>
              {c}
            </button>
          ))}
        </div>
      </div>

      {/* Notifications */}
      <div style={{ ...glassCard({ padding: '24px' }), marginBottom: '16px' }}>
        <p style={{ fontFamily: font.mono, fontSize: '12px', color: C.textMuted, letterSpacing: '0.07em', textTransform: 'uppercase', marginBottom: '8px' }}>Preferences</p>
        <Toggle value={prefs.notifications} onChange={set('notifications')} label="Push Notifications" sub="Get alerts for new AI features" />
        <Toggle value={prefs.autoSave} onChange={set('autoSave')} label="Auto-Save Projects" sub="Automatically save generated crafts" />
        <Toggle value={prefs.analytics} onChange={set('analytics')} label="Usage Analytics" sub="Help improve CraftFlow AI" />
        <Toggle value={prefs.newsletter} onChange={set('newsletter')} label="Newsletter" sub="Weekly craft trends and tips" />
      </div>

      {/* Save */}
      <button onClick={handleSave}
        style={{ padding: '13px 32px', background: saved ? 'rgba(74,222,128,0.15)' : C.accent, color: saved ? C.success : C.bgPrimary, border: saved ? `1px solid rgba(74,222,128,0.3)` : 'none', borderRadius: radius.md, fontFamily: font.sans, fontSize: '15px', fontWeight: 600, cursor: 'pointer', transition: 'all 200ms', display: 'flex', alignItems: 'center', gap: '8px' }}>
        {saved ? (<><svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M2 7l3.5 3.5L12 3" stroke={C.success} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/></svg>Saved!</>) : 'Save Settings'}
      </button>
    </div>
  )
}
