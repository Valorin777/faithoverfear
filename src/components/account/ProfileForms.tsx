'use client'

import { useState, useEffect, type CSSProperties } from 'react'
import { useLang } from '@/context/LanguageContext'

const FONT = 'var(--font-inter), sans-serif'
export const ADDRESS_KEY = 'fof_delivery_address'

export interface DeliveryAddress {
  recipient: string
  phone: string
  city: string
  street: string
  postal: string
}

const EMPTY_ADDR: DeliveryAddress = { recipient: '', phone: '', city: '', street: '', postal: '' }

const cardStyle: CSSProperties = {
  background: '#fff', borderRadius: 12, border: '1px solid #ece9e3',
  padding: 'clamp(1.5rem, 4vw, 2rem)',
}
const h2Style: CSSProperties = {
  fontFamily: 'var(--font-playfair), Georgia, serif',
  fontSize: '1.2rem', fontWeight: 700, color: 'var(--navy)', marginBottom: '1.25rem',
}
const labelStyle: CSSProperties = {
  fontFamily: FONT, fontSize: '0.72rem', fontWeight: 600, color: '#888',
  textTransform: 'uppercase', letterSpacing: '0.04em', marginBottom: '0.4rem', display: 'block',
}
const inputStyle: CSSProperties = {
  width: '100%', boxSizing: 'border-box', border: '1.5px solid #e8e8e8', borderRadius: 6,
  padding: '0.7rem 0.875rem', fontFamily: FONT, fontSize: '0.85rem', color: 'var(--navy)',
  background: 'var(--beige)', outline: 'none',
}
const saveBtn = (done: boolean): CSSProperties => ({
  display: 'inline-flex', alignItems: 'center', gap: '0.4rem',
  background: done ? '#22863a' : 'var(--navy)', color: '#fff', border: 'none',
  borderRadius: 6, padding: '0.7rem 1.5rem', cursor: 'pointer',
  fontFamily: FONT, fontSize: '0.78rem', fontWeight: 600, whiteSpace: 'nowrap',
})

function Field({ label, value, onChange, placeholder, type = 'text' }: {
  label: string; value: string; onChange: (v: string) => void; placeholder?: string; type?: string
}) {
  return (
    <div>
      <label style={labelStyle}>{label}</label>
      <input style={inputStyle} type={type} value={value} placeholder={placeholder} onChange={(e) => onChange(e.target.value)} />
    </div>
  )
}

export default function ProfileForms({
  customer,
  onSaved,
}: {
  customer: { id: string | number; email: string; name?: string; phone?: string }
  onSaved?: () => void
}) {
  const { t } = useLang()

  // ── Профиль (сохраняется в аккаунт) ──
  const [name, setName] = useState(customer.name || '')
  const [phone, setPhone] = useState(customer.phone || '')
  const [pStatus, setPStatus] = useState<'idle' | 'saving' | 'done' | 'error'>('idle')

  async function saveProfile() {
    setPStatus('saving')
    try {
      const res = await fetch(`/api/customers/${customer.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ name, phone }),
      })
      if (!res.ok) throw new Error()
      setPStatus('done')
      onSaved?.()
      setTimeout(() => setPStatus('idle'), 2000)
    } catch {
      setPStatus('error')
    }
  }

  // ── Адрес доставки (сохраняется на устройстве, подставляется в оформлении) ──
  const [addr, setAddr] = useState<DeliveryAddress>(EMPTY_ADDR)
  const [aDone, setADone] = useState(false)

  useEffect(() => {
    try {
      const raw = localStorage.getItem(ADDRESS_KEY)
      if (raw) setAddr({ ...EMPTY_ADDR, ...JSON.parse(raw) })
    } catch {
      /* нет сохранённого адреса */
    }
  }, [])

  function saveAddress() {
    try {
      localStorage.setItem(ADDRESS_KEY, JSON.stringify(addr))
    } catch {
      /* недоступно хранилище */
    }
    setADone(true)
    setTimeout(() => setADone(false), 2000)
  }
  const setA = (k: keyof DeliveryAddress) => (v: string) => setAddr((p) => ({ ...p, [k]: v }))

  return (
    <>
      {/* Профиль */}
      <div style={cardStyle}>
        <h2 style={h2Style}>{t('Профиль', 'Profile')}</h2>
        <div style={{ display: 'grid', gap: '1rem', gridTemplateColumns: '1fr 1fr' }} className="fof-acc-grid">
          <Field label={t('Имя', 'Name')} value={name} onChange={setName} placeholder={t('Ваше имя', 'Your name')} />
          <Field label={t('Телефон', 'Phone')} value={phone} onChange={setPhone} placeholder="+7 900 000-00-00" type="tel" />
        </div>
        <div style={{ marginTop: '1rem' }}>
          <label style={labelStyle}>Email</label>
          <input style={{ ...inputStyle, opacity: 0.7, cursor: 'not-allowed' }} value={customer.email} readOnly />
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginTop: '1.25rem' }}>
          <button type="button" onClick={saveProfile} disabled={pStatus === 'saving'} style={saveBtn(pStatus === 'done')}>
            {pStatus === 'saving' ? t('Сохранение…', 'Saving…') : pStatus === 'done' ? t('Сохранено', 'Saved') : t('Сохранить', 'Save')}
          </button>
          {pStatus === 'error' && (
            <span style={{ fontFamily: FONT, fontSize: '0.8rem', color: 'var(--burgundy)' }}>
              {t('Не удалось сохранить', 'Could not save')}
            </span>
          )}
        </div>
      </div>

      {/* Адрес доставки */}
      <div style={cardStyle}>
        <h2 style={h2Style}>{t('Адрес доставки', 'Delivery address')}</h2>
        <p style={{ fontFamily: FONT, fontSize: '0.78rem', color: '#999', marginTop: '-0.75rem', marginBottom: '1.25rem' }}>
          {t('Сохраним на этом устройстве и подставим при оформлении заказа.', 'Saved on this device and used to pre-fill checkout.')}
        </p>
        <div style={{ display: 'grid', gap: '1rem', gridTemplateColumns: '1fr 1fr' }} className="fof-acc-grid">
          <Field label={t('Получатель', 'Recipient')} value={addr.recipient} onChange={setA('recipient')} placeholder={t('ФИО', 'Full name')} />
          <Field label={t('Телефон', 'Phone')} value={addr.phone} onChange={setA('phone')} placeholder="+7 900 000-00-00" type="tel" />
          <Field label={t('Город', 'City')} value={addr.city} onChange={setA('city')} placeholder={t('Москва', 'Moscow')} />
          <Field label={t('Индекс', 'Postal code')} value={addr.postal} onChange={setA('postal')} placeholder="000000" />
        </div>
        <div style={{ marginTop: '1rem' }}>
          <Field label={t('Улица, дом, квартира', 'Street, building, apartment')} value={addr.street} onChange={setA('street')} placeholder={t('ул. Примерная, д. 1, кв. 1', '1 Example St, apt. 1')} />
        </div>
        <div style={{ marginTop: '1.25rem' }}>
          <button type="button" onClick={saveAddress} style={saveBtn(aDone)}>
            {aDone ? t('Сохранено', 'Saved') : t('Сохранить адрес', 'Save address')}
          </button>
        </div>
      </div>

      <style>{`
        @media (max-width: 560px) {
          .fof-acc-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </>
  )
}
