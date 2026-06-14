import { reviews } from '@/data/products'

function Stars({ rating }: { rating: number }) {
  return (
    <div style={{ display: 'flex', gap: 3 }}>
      {Array.from({ length: 5 }).map((_, i) => (
        <svg key={i} width="12" height="12" viewBox="0 0 14 14" fill={i < rating ? 'var(--gold)' : '#ddd'}>
          <path d="M7 1l1.545 3.13L12 4.635l-2.5 2.435.59 3.43L7 8.885l-3.09 1.615.59-3.43L2 4.635l3.455-.505L7 1z" />
        </svg>
      ))}
    </div>
  )
}

export default function ReviewsSection() {
  return (
    <section style={{ background: '#fff', padding: '6rem 0' }}>
      <div style={{ maxWidth: 1280, margin: '0 auto', padding: '0 1.25rem' }}>

        {/* Заголовок */}
        <div style={{ textAlign: 'center', marginBottom: '3.5rem' }}>
          <p style={{
            fontFamily: 'var(--font-inter), sans-serif',
            fontSize: '0.65rem',
            letterSpacing: '0.28em',
            textTransform: 'uppercase',
            color: 'var(--gold)',
            marginBottom: '0.75rem',
            fontWeight: 500,
          }}>
            Отзывы покупателей
          </p>
          <h2 style={{
            fontFamily: 'var(--font-playfair), Georgia, serif',
            fontSize: 'clamp(1.7rem, 3vw, 2.4rem)',
            color: 'var(--navy)',
            fontWeight: 700,
            marginBottom: '0.5rem',
          }}>
            Что говорят наши покупатели
          </h2>
          <div style={{ width: 40, height: 2, background: 'var(--gold)', margin: '1rem auto 0', borderRadius: 2 }} />
        </div>

        {/* Карточки */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
          gap: '1.5rem',
        }}>
          {reviews.map((r, idx) => (
            <div key={r.id} style={{
              background: idx % 2 === 0 ? '#fafafa' : '#fff',
              border: '1px solid #f0f0f0',
              borderRadius: 6,
              padding: '2rem',
              display: 'flex',
              flexDirection: 'column',
              gap: '1.25rem',
              transition: 'box-shadow 0.25s',
            }}>
              {/* Кавычка */}
              <div style={{
                fontFamily: 'Georgia, serif',
                fontSize: '3.5rem',
                color: 'var(--gold)',
                lineHeight: 1,
                opacity: 0.35,
                marginBottom: '-1rem',
                userSelect: 'none',
              }}>
                "
              </div>

              {/* Текст */}
              <p style={{
                fontFamily: 'var(--font-inter), sans-serif',
                fontSize: '0.9rem',
                color: '#555',
                lineHeight: 1.75,
                fontWeight: 300,
                flex: 1,
              }}>
                {r.text}
              </p>

              {/* Подпись */}
              <div style={{ borderTop: '1px solid #f0f0f0', paddingTop: '1.25rem' }}>
                <Stars rating={r.rating} />
                <div style={{ marginTop: '0.75rem', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                  <div style={{
                    width: 38, height: 38, borderRadius: '50%',
                    background: 'var(--navy)',
                    color: 'var(--gold)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontFamily: 'var(--font-inter), sans-serif',
                    fontWeight: 700, fontSize: '0.85rem', flexShrink: 0,
                  }}>
                    {r.author[0]}
                  </div>
                  <div>
                    <p style={{
                      fontFamily: 'var(--font-inter), sans-serif',
                      fontWeight: 600, fontSize: '0.82rem',
                      color: 'var(--navy)',
                    }}>
                      {r.author}
                    </p>
                    <p style={{
                      fontFamily: 'var(--font-inter), sans-serif',
                      fontSize: '0.68rem', color: '#bbb', marginTop: 2,
                    }}>
                      {new Date(r.createdAt).toLocaleDateString('ru-RU', { month: 'long', year: 'numeric' })}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Итоговая строка */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '2rem',
          marginTop: '3rem',
          padding: '2rem',
          background: 'var(--beige)',
          borderRadius: 6,
          flexWrap: 'wrap',
        }}>
          {[
            { num: '4.9', label: 'Средняя оценка' },
            { num: '200+', label: 'Довольных покупателей' },
            { num: '98%', label: 'Рекомендуют нас' },
          ].map(({ num, label }) => (
            <div key={label} style={{ textAlign: 'center' }}>
              <p style={{
                fontFamily: 'var(--font-playfair), Georgia, serif',
                fontSize: '2rem',
                fontWeight: 700,
                color: 'var(--navy)',
                lineHeight: 1,
              }}>
                {num}
              </p>
              <p style={{
                fontFamily: 'var(--font-inter), sans-serif',
                fontSize: '0.75rem',
                color: '#888',
                marginTop: '0.35rem',
                fontWeight: 300,
              }}>
                {label}
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  )
}
