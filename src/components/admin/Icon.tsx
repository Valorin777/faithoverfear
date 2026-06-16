/**
 * Фирменная иконка в навигации админки.
 * Чёрный круг с золотым православным крестом.
 */
export default function Icon() {
  return (
    <div
      style={{
        width: 32,
        height: 32,
        borderRadius: '50%',
        background: 'radial-gradient(circle at 50% 38%, #20201d 0%, #121110 72%, #0c0b0a 100%)',
        border: '1.5px solid #c9a84c',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexShrink: 0,
        boxShadow: 'inset 0 0 0 3px rgba(201,168,76,0.08)',
      }}
    >
      <svg width="13" height="19" viewBox="0 0 100 150" fill="none" aria-hidden="true">
        <g stroke="#c9a84c" strokeLinecap="round">
          <line x1="50" y1="12" x2="50" y2="138" strokeWidth="9" />
          <line x1="37" y1="32" x2="63" y2="32" strokeWidth="8" />
          <line x1="26" y1="58" x2="74" y2="58" strokeWidth="9" />
          <line x1="34" y1="108" x2="66" y2="94" strokeWidth="8" />
        </g>
      </svg>
    </div>
  )
}
