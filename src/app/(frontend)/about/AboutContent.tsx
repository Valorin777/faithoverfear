'use client'

import PageLayout from '@/components/layout/PageLayout'
import { useLang } from '@/context/LanguageContext'
import { useSettings } from '@/context/SettingsContext'

const VALUE_ICONS = ['+', '◎', '♡']

export default function AboutContent() {
  const { t } = useLang()
  const settings = useSettings()

  const DEFAULT_SECTIONS = [
    {
      title: 'Откуда мы',
      titleEn: 'Where we come from',
      text: '<strong>Faith over Fear</strong> — проект христианской одежды, созданный людьми, которые сами живут верой. Мы не просто печатаем слова на ткани — мы несём свидетельство живой веры в мир, где всё больше людей ищут смысл и опору.',
      textEn: '<strong>Faith over Fear</strong> is a Christian clothing project created by people who live their faith. We don’t just print words on fabric — we carry a testimony of living faith into a world where more and more people are searching for meaning and a foundation.',
    },
    {
      title: 'Наша миссия',
      titleEn: 'Our mission',
      text: 'Название бренда — «Вера сильнее страха» — это не просто красивые слова. Это жизненная позиция. Мы верим, что одежда может быть исповеданием веры, что каждый раз, когда человек надевает нашу вещь, он напоминает себе и окружающим: есть Бог, есть Свет, есть Любовь.',
      textEn: 'The brand name — “Faith over Fear” — is not just a beautiful phrase. It is a way of life. We believe clothing can be a confession of faith, that every time a person puts on one of our pieces, they remind themselves and those around them: there is God, there is Light, there is Love.',
    },
    {
      title: 'Как мы создаём одежду',
      titleEn: 'How we make our clothing',
      text: 'Каждый дизайн проходит духовное осмысление. Мы выбираем только те цитаты и образы, которые несут подлинный христианский смысл — без китча, без поверхностности. Производство находится в России, ткани — натуральный хлопок от проверенных поставщиков.',
      textEn: 'Every design is spiritually considered. We choose only those quotes and images that carry genuine Christian meaning — without kitsch, without superficiality. Production is based in Russia, and the fabrics are natural cotton from trusted suppliers.',
    },
    {
      title: 'Благотворительность',
      titleEn: 'Charity',
      text: 'Часть средств от каждой продажи направляется на поддержку христианских общин и социальных проектов. Покупая нашу одежду, вы не просто приобретаете вещь — вы участвуете в добром деле.',
      textEn: 'A part of the proceeds from every sale goes to support Christian communities and social projects. By buying our clothing you don’t just acquire an item — you take part in a good deed.',
    },
  ]

  const DEFAULT_VALUES = [
    { title: 'Христианский смысл', titleEn: 'Christian meaning', desc: 'Каждый принт — живое слово Евангелия', descEn: 'Every print is a living word of the Gospel' },
    { title: '100% натуральный хлопок', titleEn: '100% natural cotton', desc: 'Стойкий принт, бережный уход', descEn: 'Durable print, gentle care' },
    { title: 'Благотворительность', titleEn: 'Charity', desc: 'Часть выручки идёт в христианские общины', descEn: 'Part of the revenue goes to Christian communities' },
  ]

  const sections = settings.aboutSections?.length ? settings.aboutSections : DEFAULT_SECTIONS
  const values = settings.aboutValues?.length ? settings.aboutValues : DEFAULT_VALUES
  const aQuote = settings.aboutQuote || '«Не бойся, только веруй»'
  const aQuoteEn = settings.aboutQuoteEn || '“Do not be afraid; only believe”'
  const aSource = settings.aboutQuoteSource || 'Евангелие от Марка, 5:36'
  const aSourceEn = settings.aboutQuoteSourceEn || 'Gospel of Mark, 5:36'

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
            {t('Наша история', 'Our story')}
          </p>
          <h1 style={{
            fontFamily: 'var(--font-playfair), Georgia, serif',
            fontSize: 'clamp(2rem, 5vw, 3.5rem)',
            color: '#fff', fontWeight: 700, lineHeight: 1.15,
          }}>
            {t('О проекте', 'About')}
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
              {t(aQuote, aQuoteEn)}
            </p>
            <p style={{
              fontFamily: 'var(--font-inter), sans-serif',
              fontSize: '0.8rem', color: '#aaa', fontWeight: 300,
            }}>
              {t(aSource, aSourceEn)}
            </p>
          </div>

          {sections.map(({ title, titleEn, text, textEn }, i) => (
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
                  {t(title, titleEn)}
                </h2>
              </div>
              <div style={{ paddingLeft: '2rem', borderLeft: '1px solid #ece9e3' }}>
                <p
                  style={{
                    fontFamily: 'var(--font-inter), sans-serif',
                    fontSize: '0.95rem', color: '#555',
                    lineHeight: 1.85, fontWeight: 300,
                  }}
                  dangerouslySetInnerHTML={{ __html: t(text, textEn) }}
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
              {t('Наши принципы', 'Our principles')}
            </p>
            <h2 style={{
              fontFamily: 'var(--font-playfair), Georgia, serif',
              fontSize: 'clamp(1.3rem, 3vw, 1.8rem)',
              color: 'var(--navy)', fontWeight: 700, marginBottom: '2rem',
            }}>
              {t('Что нами движет', 'What drives us')}
            </h2>
            <div className="values-grid" style={{ display: 'grid', gap: '1rem' }}>
              {values.map((v, i) => (
                <div key={v.title} style={{
                  background: 'var(--beige)', borderRadius: 8,
                  padding: '1.5rem', border: '1px solid #ece9e3',
                }}>
                  <div style={{
                    fontFamily: 'var(--font-playfair), Georgia, serif',
                    fontSize: '1.25rem', color: 'var(--gold)',
                    marginBottom: '0.75rem',
                  }}>
                    {VALUE_ICONS[i]}
                  </div>
                  <h3 style={{
                    fontFamily: 'var(--font-inter), sans-serif',
                    fontSize: '0.88rem', fontWeight: 700,
                    color: 'var(--navy)', marginBottom: '0.35rem',
                  }}>
                    {t(v.title, v.titleEn)}
                  </h3>
                  <p style={{
                    fontFamily: 'var(--font-inter), sans-serif',
                    fontSize: '0.78rem', color: '#999', fontWeight: 300,
                  }}>
                    {t(v.desc, v.descEn)}
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
