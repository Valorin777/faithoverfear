/**
 * Фирменный логотип на экране входа в админку.
 */
export default function Logo() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.875rem' }}>
      <div
        style={{
          width: 64,
          height: 64,
          borderRadius: 14,
          background: 'linear-gradient(135deg, #1a2744 0%, #2a3a5c 100%)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          boxShadow: '0 8px 24px rgba(26,39,68,0.25)',
        }}
      >
        <svg width="26" height="34" viewBox="0 0 32 44" fill="none">
          <rect x="13" y="0" width="6" height="44" rx="3" fill="#c9a84c" />
          <rect x="0" y="12" width="32" height="6" rx="3" fill="#c9a84c" />
        </svg>
      </div>
      <div style={{ textAlign: 'center' }}>
        <div
          style={{
            fontFamily: 'Georgia, "Times New Roman", serif',
            fontSize: '1.4rem',
            fontWeight: 700,
            color: 'var(--theme-text)',
            lineHeight: 1.1,
          }}
        >
          Faith over Fear
        </div>
        <div
          style={{
            fontSize: '0.6rem',
            letterSpacing: '0.28em',
            textTransform: 'uppercase',
            color: '#c9a84c',
            marginTop: 4,
          }}
        >
          Панель управления
        </div>
      </div>
    </div>
  )
}
