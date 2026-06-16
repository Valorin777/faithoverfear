/**
 * Фирменная иконка (крест в круге). Масштабируется под свой контейнер,
 * поэтому не обрезается ни в шапке-хлебных-крошках, ни в навигации.
 */
export default function Icon() {
  return (
    <svg viewBox="0 0 100 100" style={{ width: '100%', height: '100%', minWidth: 18, minHeight: 18, display: 'block' }} aria-hidden="true">
      <circle cx="50" cy="50" r="46" fill="#121110" stroke="#c9a84c" strokeWidth="4" />
      <g stroke="#c9a84c" strokeLinecap="round">
        <line x1="50" y1="20" x2="50" y2="84" strokeWidth="7" />
        <line x1="39" y1="33" x2="61" y2="33" strokeWidth="6" />
        <line x1="31" y1="47" x2="69" y2="47" strokeWidth="7" />
        <line x1="38" y1="73" x2="62" y2="63" strokeWidth="6" />
      </g>
    </svg>
  )
}
