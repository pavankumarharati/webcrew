'use client'
import { useState } from 'react'
import { ArrowRight, CheckCircle } from 'lucide-react'

const inputStyle: React.CSSProperties = {
  width: '100%',
  background: '#FFFFFF',
  border: '1px solid var(--color-border)',
  borderRadius: '8px',
  padding: '13px 16px',
  color: 'var(--color-text)',
  fontSize: '0.9rem',
  outline: 'none',
  transition: 'border-color 0.2s, background 0.2s',
  fontFamily: 'var(--font-body)',
}

const onFocus = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
  e.currentTarget.style.borderColor = 'var(--color-blue)'
  e.currentTarget.style.background = 'rgba(0,194,110,0.03)'
}
const onBlur = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
  e.currentTarget.style.borderColor = 'var(--color-border)'
  e.currentTarget.style.background = '#FFFFFF'
}

export default function AffiliateApplyForm() {
  const [form, setForm] = useState({ name: '', email: '', websiteUrl: '', promotionPlan: '', agreed: false })
  const [sent, setSent] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!form.agreed) { setError('Please agree to the Affiliate Terms to continue.'); return }
    setError(''); setLoading(true)
    try {
      await fetch('https://api.webcrew.app/affiliate-apply', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: form.name,
          email: form.email,
          websiteUrl: form.websiteUrl || undefined,
          promotionPlan: form.promotionPlan || undefined,
          source: 'webcrew.app/affiliate',
          submittedAt: new Date().toISOString(),
        }),
      })
      setSent(true)
    } catch {
      setSent(true)
    } finally {
      setLoading(false)
    }
  }

  if (sent) {
    return (
      <div style={{
        textAlign: 'center', padding: '56px 40px',
        background: 'var(--color-surface)',
        border: '1px solid rgba(0,194,110,0.25)',
        borderRadius: '20px',
        boxShadow: '0 0 80px rgba(0,194,110,0.08)',
      }}>
        <CheckCircle size={52} color="var(--color-blue)" style={{ margin: '0 auto 20px' }} />
        <h3 style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '1.7rem', letterSpacing: '-0.02em', marginBottom: '12px' }}>
          Application received.
        </h3>
        <p style={{ color: 'var(--color-muted)', lineHeight: 1.7, maxWidth: '380px', margin: '0 auto' }}>
          We'll review it and email you your referral link within 2 business days.
        </p>
      </div>
    )
  }

  return (
    <form
      onSubmit={handleSubmit}
      style={{
        background: 'var(--color-surface)',
        border: '1px solid var(--color-border)',
        borderRadius: '20px', padding: '36px',
        display: 'flex', flexDirection: 'column', gap: '16px',
      }}
    >
      <div style={{
        padding: '12px 16px',
        background: 'rgba(74,222,128,0.05)',
        border: '1px solid rgba(74,222,128,0.2)',
        borderRadius: '8px',
        fontSize: '0.82rem', color: '#16a34a', fontWeight: 600,
      }}>
        ● Apply free — we review every application by hand, no bots
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }} className="form-grid-2">
        <input style={inputStyle} type="text" placeholder="Your name *" required
          value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
          onFocus={onFocus} onBlur={onBlur} />
        <input style={inputStyle} type="email" placeholder="Your email *" required
          value={form.email} onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
          onFocus={onFocus} onBlur={onBlur} />
      </div>

      <input style={inputStyle} type="url" placeholder="Your website or social profile (optional)"
        value={form.websiteUrl} onChange={e => setForm(f => ({ ...f, websiteUrl: e.target.value }))}
        onFocus={onFocus} onBlur={onBlur} />

      <textarea
        style={{ ...inputStyle, resize: 'vertical', minHeight: '90px', fontFamily: 'var(--font-body)' }}
        placeholder="How will you promote WebCrew? (audience, channel, rough plan)"
        value={form.promotionPlan} onChange={e => setForm(f => ({ ...f, promotionPlan: e.target.value }))}
        onFocus={onFocus} onBlur={onBlur}
      />

      <label style={{ display: 'flex', gap: 12, alignItems: 'flex-start', cursor: 'pointer' }}>
        <input
          type="checkbox"
          checked={form.agreed}
          onChange={e => { setForm(f => ({ ...f, agreed: e.target.checked })); setError('') }}
          style={{ width: '18px', height: '18px', minWidth: '18px', accentColor: 'var(--color-blue)', cursor: 'pointer', marginTop: '2px' }}
        />
        <span style={{ fontSize: '0.82rem', lineHeight: 1.6, color: 'var(--color-text)' }}>
          I agree to the{' '}
          <a href="/affiliate-terms" style={{ color: 'var(--color-blue)', textDecoration: 'underline' }}>Affiliate Terms</a>.
        </span>
      </label>

      {error && <p style={{ color: '#ff4d4d', fontSize: '0.82rem', textAlign: 'center' }}>{error}</p>}

      <button type="submit" className="btn-primary"
        style={{ justifyContent: 'center', opacity: loading ? 0.7 : 1, fontSize: '1rem', padding: '17px 36px' }}
        disabled={loading}>
        {loading ? 'Submitting…' : <>Apply to the Program <ArrowRight size={17} /></>}
      </button>
    </form>
  )
}
