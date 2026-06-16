'use client'

import { useFormFields } from '@payloadcms/ui'

/** Кликабельные контакты клиента в карточке заказа — позвонить/написать. */
export default function OrderContact() {
  const email = useFormFields(([fields]) => (fields?.customerEmail?.value as string) || '')
  const phone = useFormFields(([fields]) => (fields?.customerPhone?.value as string) || '')
  const phoneClean = phone.replace(/[^\d+]/g, '')
  const phoneIntl = phoneClean.replace(/^\+/, '')

  const chip: React.CSSProperties = {
    display: 'inline-flex',
    alignItems: 'center',
    gap: 6,
    padding: '7px 12px',
    borderRadius: 9,
    border: '1px solid var(--theme-elevation-150)',
    background: 'var(--theme-elevation-50)',
    color: 'var(--theme-text)',
    fontSize: '0.82rem',
    fontWeight: 600,
    textDecoration: 'none',
  }

  const has = email || phone

  return (
    <div className="field-type" style={{ marginBottom: '1rem' }}>
      <label className="field-label">Связаться с клиентом</label>
      <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
        {email && (
          <a href={`mailto:${email}`} style={chip}>
            ✉ {email}
          </a>
        )}
        {phone && (
          <a href={`tel:${phoneClean}`} style={chip}>
            ☎ {phone}
          </a>
        )}
        {phoneIntl && (
          <a href={`https://wa.me/${phoneIntl}`} target="_blank" rel="noopener noreferrer" style={{ ...chip, borderColor: '#25D366', color: '#1c8c47' }}>
            WhatsApp
          </a>
        )}
        {phoneClean && (
          <a href={`https://t.me/${phoneClean}`} target="_blank" rel="noopener noreferrer" style={{ ...chip, borderColor: '#229ED9', color: '#1d83b3' }}>
            Telegram
          </a>
        )}
        {!has && <span style={{ color: 'var(--theme-elevation-500)', fontSize: '0.85rem' }}>Контакты не указаны</span>}
      </div>
    </div>
  )
}
