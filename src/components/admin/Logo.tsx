/**
 * Фирменный логотип на экране входа в админку.
 * Чёрный круг · золотой православный крест · засечный шрифт.
 */
function OrthodoxCross({ size }: { size: number }) {
  return (
    <svg width={size} height={size * 1.5} viewBox="0 0 100 150" fill="none" aria-hidden="true">
      <g stroke="#c9a84c" strokeLinecap="round">
        <line x1="50" y1="12" x2="50" y2="138" strokeWidth="9" />
        <line x1="37" y1="32" x2="63" y2="32" strokeWidth="8" />
        <line x1="26" y1="58" x2="74" y2="58" strokeWidth="9" />
        <line x1="34" y1="108" x2="66" y2="94" strokeWidth="8" />
      </g>
    </svg>
  )
}

export default function Logo() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1.1rem' }}>
      <div
        style={{
          width: 104,
          height: 104,
          borderRadius: '50%',
          background: 'radial-gradient(circle at 50% 38%, #20201d 0%, #121110 70%, #0c0b0a 100%)',
          border: '2px solid #c9a84c',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          boxShadow: '0 14px 40px rgba(0,0,0,0.35), inset 0 0 0 6px rgba(201,168,76,0.08)',
        }}
      >
        <OrthodoxCross size={40} />
      </div>
      <div style={{ textAlign: 'center' }}>
        <div
          style={{
            fontFamily: 'var(--font-display), Georgia, serif',
            fontSize: '1.7rem',
            fontWeight: 700,
            color: 'var(--theme-text)',
            lineHeight: 1.05,
            letterSpacing: '0.01em',
          }}
        >
          Faith over Fear
        </div>
        <div
          style={{
            fontSize: '0.6rem',
            letterSpacing: '0.3em',
            textTransform: 'uppercase',
            color: '#c9a84c',
            marginTop: 7,
          }}
        >
          Православная одежда
        </div>
      </div>
    </div>
  )
}
