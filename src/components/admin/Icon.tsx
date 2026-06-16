/**
 * Фирменная иконка в навигации админки (вместо логотипа Payload).
 */
export default function Icon() {
  return (
    <div
      style={{
        width: 28,
        height: 28,
        borderRadius: 7,
        background: 'linear-gradient(135deg, #1a2744 0%, #2a3a5c 100%)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexShrink: 0,
      }}
    >
      <svg width="14" height="18" viewBox="0 0 32 44" fill="none">
        <rect x="13" y="0" width="6" height="44" rx="3" fill="#c9a84c" />
        <rect x="0" y="12" width="32" height="6" rx="3" fill="#c9a84c" />
      </svg>
    </div>
  )
}
