/* Форматтеры для дашборда. Без React — безопасно и на сервере, и на клиенте. */

export function formatRub(n: number): string {
  return new Intl.NumberFormat('ru-RU', { maximumFractionDigits: 0 }).format(Math.round(n || 0)) + ' ₽'
}

export function formatRubShort(n: number): string {
  const v = Math.round(n || 0)
  const abs = Math.abs(v)
  if (abs >= 1_000_000) {
    const m = v / 1_000_000
    return (Number.isInteger(m) ? m.toFixed(0) : m.toFixed(1)).replace('.', ',') + ' млн ₽'
  }
  if (abs >= 10_000) return Math.round(v / 1000).toLocaleString('ru-RU') + ' тыс ₽'
  return formatRub(v)
}

export function formatInt(n: number): string {
  return new Intl.NumberFormat('ru-RU').format(Math.round(n || 0))
}

export function formatPct(n: number | null | undefined): string {
  if (n === null || n === undefined || !isFinite(n)) return '—'
  const sign = n > 0 ? '+' : n < 0 ? '−' : ''
  return sign + Math.abs(n).toFixed(1).replace('.', ',') + '%'
}

export function relativeTimeRu(iso: string): string {
  const then = new Date(iso).getTime()
  if (isNaN(then)) return ''
  const diffSec = Math.round((then - Date.now()) / 1000)
  const abs = Math.abs(diffSec)
  const rtf = new Intl.RelativeTimeFormat('ru', { numeric: 'auto' })
  if (abs < 45) return rtf.format(Math.round(diffSec), 'second')
  if (abs < 3600) return rtf.format(Math.round(diffSec / 60), 'minute')
  if (abs < 86400) return rtf.format(Math.round(diffSec / 3600), 'hour')
  if (abs < 2592000) return rtf.format(Math.round(diffSec / 86400), 'day')
  return new Date(iso).toLocaleDateString('ru-RU', { day: 'numeric', month: 'short' })
}

export function shortDateRu(iso: string): string {
  const d = new Date(iso)
  if (isNaN(d.getTime())) return ''
  return d.toLocaleDateString('ru-RU', { day: 'numeric', month: 'short' })
}

export function initialsOf(name: string): string {
  const parts = (name || '').trim().split(/\s+/).filter(Boolean)
  if (!parts.length) return '?'
  if (parts.length === 1) return parts[0].charAt(0).toUpperCase()
  return (parts[0].charAt(0) + parts[parts.length - 1].charAt(0)).toUpperCase()
}
