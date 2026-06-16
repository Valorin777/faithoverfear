'use client'

interface Row {
  id: string
  name: string
  count: number
  tier: string
}

const tierColor = (tier: string) => (tier === 'Золото' ? '#C9A84C' : tier === 'Серебро' ? '#9AA0AD' : '#cfcfcf')

export default function TopReferrers({ rows, empty }: { rows: Row[]; empty: boolean }) {
  return (
    <div className="fof-card">
      <div className="fof-card__head">
        <div>
          <h3 className="fof-card__title">Топ рефералов</h3>
          <p className="fof-card__subtitle">Кто привёл больше всего друзей</p>
        </div>
      </div>
      {empty ? (
        <div className="fof-empty">Пока никто не приглашал друзей</div>
      ) : (
        <ul className="fof-feed__list">
          {rows.map((r, i) => (
            <li key={r.id} className="fof-feed__row" style={{ animationDelay: `${i * 45}ms` }}>
              <span className="fof-feed__avatar" style={{ background: 'linear-gradient(135deg,#1b2a4a,#33538f)', color: '#fff' }}>
                {i + 1}
              </span>
              <div className="fof-feed__main">
                <p className="fof-feed__name">{r.name}</p>
                <p className="fof-feed__meta">{r.count} приглашённых</p>
              </div>
              {r.tier !== '—' && (
                <span className="fof-badge" style={{ color: tierColor(r.tier), background: `${tierColor(r.tier)}22` }}>
                  {r.tier}
                </span>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
