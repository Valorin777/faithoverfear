import type { Payload } from 'payload'

export interface ReferralRow {
  id: string
  name: string
  email: string
  phone?: string
  code: string
  link: string
  count: number
  tier: 'Золото' | 'Серебро' | 'Старт'
  discountPct: number
  bonusBalance: number
  joinedAt: string
}

export interface ReferralData {
  rows: ReferralRow[]
  summary: {
    participants: number
    totalInvited: number
    activeReferrers: number
    gold: number
    silver: number
  }
  siteUrl: string
}

/** Статус и скидка для друзей по числу приглашённых (синхронно с place-order и Customers). */
function tierFor(count: number): { tier: ReferralRow['tier']; pct: number } {
  if (count >= 30) return { tier: 'Золото', pct: 15 }
  if (count >= 10) return { tier: 'Серебро', pct: 12 }
  return { tier: 'Старт', pct: 10 }
}

/**
 * Данные реферальной программы из коллекции «Покупатели».
 * Реальные цифры: код, ссылка, число приглашённых, статус, скидка, бонусы.
 * Никаких новых колонок в БД — только чтение существующих полей.
 */
export async function getReferralData(payload: Payload): Promise<ReferralData> {
  const base = (process.env.NEXT_PUBLIC_SITE_URL || 'https://faithof.ru').replace(/\/+$/, '')

  let docs: any[] = []
  try {
    const res = await payload.find({
      collection: 'customers',
      sort: '-referralCount',
      depth: 0,
      limit: 200,
      pagination: false,
      overrideAccess: true,
    })
    docs = res.docs
  } catch {
    docs = []
  }

  const rows: ReferralRow[] = docs.map((d) => {
    const count = d.referralCount || 0
    const { tier, pct } = tierFor(count)
    const code = d.referralCode || ''
    return {
      id: String(d.id),
      name: d.name || '',
      email: d.email || '',
      phone: d.phone || undefined,
      code,
      link: code ? `${base}/account/register?ref=${code}` : '',
      count,
      tier,
      discountPct: pct,
      bonusBalance: d.bonusBalance || 0,
      joinedAt: d.createdAt || '',
    }
  })

  return {
    rows,
    summary: {
      participants: rows.filter((r) => r.code).length,
      totalInvited: rows.reduce((s, r) => s + r.count, 0),
      activeReferrers: rows.filter((r) => r.count > 0).length,
      gold: rows.filter((r) => r.tier === 'Золото').length,
      silver: rows.filter((r) => r.tier === 'Серебро').length,
    },
    siteUrl: base,
  }
}
