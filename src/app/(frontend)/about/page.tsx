import { Metadata } from 'next'
import PageLayout from '@/components/layout/PageLayout'

export const metadata: Metadata = {
  title: 'О проекте — миссия Faith over Fear',
  description: 'История и миссия проекта православной одежды Faith over Fear.',
}

export default function AboutPage() {
  return (
    <PageLayout>
      {/* Hero */}
      <div style={{ background: 'var(--navy)', padding: '5rem 0 4rem' }}>
        <div style={{ maxWidth: 1280, margin: '0 auto', padding: '0 1.25rem', textAlign: 'center' }}>
          <p style={{
            fontFamily: 'var(--font-inter), sans-serif',
            fontSize: '0.6rem', letterSpacing: '0.28em',
            textTransform: 'uppercase', color: 'var(--gold)',
            fontWeight: 500, marginBottom: '0.75rem',
          }}>
            Наша история
          </p>
          <h1 style={{
            fontFamily: 'var(--font-playfair), Georgia, serif',
            fontSize: 'clamp(2rem, 5vw, 3.5rem)',
            color: '#fff', fontWeight: 700, lineHeight: 1.15,
          }}>
            О проекте
          </h1>
          <div style={{ width: 40, height: 2, background: 'var(--gold)', margin: '1.25rem auto 0', borderRadius: 2 }} />
        </div>
      </div>

      {/* Контент */}
      <div style={{ background: '#fff', padding: '5rem 0' }}>
        <div style={{ maxWidth: 760, margin: '0 auto', padding: '0 1.25rem' }}>

          {/* Цитата */}
          <div style={{
            background: 'var(--beige)', padding: '2rem 2rem 2rem 2.5rem',
            borderLeft: '4px solid var(--gold)',
            borderRadius: '0 8px 8px 0',
            marginBottom: '3.5rem',
          }}>
            <p style={{
              fontFamily: 'var(--font-playfair), Georgia, serif',
              fontSize: 'clamp(1.2rem, 3vw, 1.6rem)',
              color: 'var(--navy)', fontStyle: 'italic',
              fontWeight: 700, lineHeight: 1.4, marginBottom: '0.75rem',
            }}>
              «Не бойся, только веруй»
            </p>
            <p style={{
              fontFamily: 'var(--font-inter), sans-serif',
              fontSize: '0.8rem', color: '#aaa', fontWeight: 300,
            }}>
              Евангелие от Марка, 5:36
            </p>
          </div>

          {[
            {
              title: 'Откуда мы',
              text: '<strong>Faith over Fear</strong> — проект православной одежды, созданный людьми, которые сами живут верой. Мы не просто печатаем слова на ткани — мы несём свидетельство живой веры в мир, где всё больше людей ищут смысл и опору.',
            },
            {
              title: 'Наша миссия',
              text: 'Название бренда — «Вера сильнее страха» — это не просто красивые слова. Это жизненная позиция. Мы верим, что одежда может быть исповеданием веры, что каждый раз, когда человек надевает нашу вещь, он напоминает себе и окружающим: есть Бог, есть Свет, есть Любовь.',
            },
            {
              title: 'Как мы создаём одежду',
              text: 'Каждый дизайн проходит духовное осмысление. Мы выбираем только те цитаты и образы, которые несут подлинный православный смысл — без китча, без поверхностности. Производство находится в России, ткани — натуральный хлопок от проверенных поставщиков.',
            },
            {
              title: 'Благотворительность',
              text: 'Часть средств от каждой продажи направляется на поддержку православных общин и социальных проектов. Покупая нашу одежду, вы не просто приобретаете вещь — вы участвуете в добром деле.',
            },
          ].map(({ title, text }, i) => (
            <div key={title} style={{ marginBottom: '2.75rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.875rem', marginBottom: '1rem' }}>
                <span style={{
                  fontFamily: 'var(--font-inter), sans-serif',
                  fontSize: '0.65rem', color: 'var(--gold)',
                  fontWeight: 700, letterSpacing: '0.1em',
                }}>
                  0{i + 1}
                </span>
                <h2 style={{
                  fontFamily: 'var(--font-playfair), Georgia, serif',
                  fontSize: 'clamp(1.1rem, 2.5vw, 1.35rem)',
                  color: 'var(--navy)', fontWeight: 700, lineHeight: 1.3,
                }}>
                  {title}
                </h2>
              </div>
              <div style={{ paddingLeft: '2rem', borderLeft: '1px solid #ece9e3' }}>
                <p
                  style={{
                    fontFamily: 'var(--font-inter), sans-serif',
                    fontSize: '0.95rem', color: '#555',
                    lineHeight: 1.85, fontWeight: 300,
                  }}
                  dangerouslySetInnerHTML={{ __html: text }}
                />
              </div>
            </div>
          ))}

          {/* Ценности */}
          <div style={{ marginTop: '3.5rem', paddingTop: '3.5rem', borderTop: '1px solid #f0f0f0' }}>
            <p style={{
              fontFamily: 'var(--font-inter), sans-serif',
              fontSize: '0.62rem', letterSpacing: '0.28em',
              textTransform: 'uppercase', color: 'var(--gold)',
              fontWeight: 500, marginBottom: '0.5rem',
            }}>
              Наши принципы
            </p>
            <h2 style={{
              fontFamily: 'var(--font-playfair), Georgia, serif',
              fontSize: 'clamp(1.3rem, 3vw, 1.8rem)',
              color: 'var(--navy)', fontWeight: 700, marginBottom: '2rem',
            }}>
              Что нами движет
            </h2>
            <div className="values-grid" style={{ display: 'grid', gap: '1rem' }}>
              {[
                { num: '✝', title: 'Православный смысл', desc: 'Каждый принт — живое слово Евангелия' },
                { num: '◎', title: '100% натуральный хлопок', desc: 'Стойкий принт, бережный уход' },
                { num: '♡', title: 'Благотворительность', desc: 'Часть выручки идёт в православные общины' },
              ].map(v => (
                <div key={v.title} style={{
                  background: 'var(--beige)', borderRadius: 8,
                  padding: '1.5rem', border: '1px solid #ece9e3',
                }}>
                  <div style={{
                    fontFamily: 'var(--font-playfair), Georgia, serif',
                    fontSize: '1.25rem', color: 'var(--gold)',
                    marginBottom: '0.75rem',
                  }}>
                    {v.num}
                  </div>
                  <h3 style={{
                    fontFamily: 'var(--font-inter), sans-serif',
                    fontSize: '0.88rem', fontWeight: 700,
                    color: 'var(--navy)', marginBottom: '0.35rem',
                  }}>
                    {v.title}
                  </h3>
                  <p style={{
                    fontFamily: 'var(--font-inter), sans-serif',
                    fontSize: '0.78rem', color: '#999', fontWeight: 300,
                  }}>
                    {v.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <style>{`
        .values-grid {
          grid-template-columns: 1fr;
        }
        @media (min-width: 640px) {
          .values-grid { grid-template-columns: repeat(3, 1fr); }
        }
        strong {
          font-family: var(--font-playfair), Georgia, serif;
          color: var(--navy); font-weight: 600;
        }
      `}</style>
    </PageLayout>
  )
}
