'use client'

/**
 * Ячейка списка для булевых полей: показывает «Да» / «Нет» вместо «Истина/Ложь».
 */
export default function YesNoCell({ cellData }: { cellData?: boolean }) {
  const yes = Boolean(cellData)
  return (
    <span
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: 5,
        padding: '2px 9px',
        borderRadius: 99,
        fontSize: '0.72rem',
        fontWeight: 600,
        background: yes ? 'rgba(201,168,76,0.15)' : 'var(--theme-elevation-100)',
        color: yes ? '#9a7d2e' : 'var(--theme-elevation-500)',
      }}
    >
      <span
        style={{
          width: 6,
          height: 6,
          borderRadius: '50%',
          background: yes ? '#c9a84c' : 'var(--theme-elevation-400)',
        }}
      />
      {yes ? 'Да' : 'Нет'}
    </span>
  )
}
