'use client'

import { useLang } from '@/context/LanguageContext'

export default function MissionBlock() {
  const { t } = useLang()
  return (
    <section style={{ background: 'var(--navy)', padding: '6rem 0', position: 'relative', overflow: 'hidden' }}>
      {/* Фоновый акцент */}
      <div style={{
        position: 'absolute', inset: 0, pointerEvents: 'none',
        background: 'radial-gradient(ellipse 60% 80% at 50% 50%, rgba(201,168,76,0.05) 0%, transparent 70%)',
      }} />

      <div style={{ maxWidth: 900, margin: '0 auto', padding: '0 1.25rem', textAlign: 'center', position: 'relative', zIndex: 1 }}>

        {/* Верхний крест-разделитель */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '1rem',
          marginBottom: '2.5rem',
        }}>
          <div style={{ flex: 1, height: 1, background: 'rgba(201,168,76,0.2)', maxWidth: 120 }} />
          <svg width="16" height="22" viewBox="0 0 16 22" fill="none">
            <rect x="6.5" y="0" width="3" height="22" rx="1.5" fill="rgba(201,168,76,0.5)" />
            <rect x="0" y="5" width="16" height="3" rx="1.5" fill="rgba(201,168,76,0.5)" />
          </svg>
          <div style={{ flex: 1, height: 1, background: 'rgba(201,168,76,0.2)', maxWidth: 120 }} />
        </div>

        {/* Цитата */}
        <p style={{
          fontFamily: 'var(--font-playfair), Georgia, serif',
          fontSize: 'clamp(1.2rem, 2.5vw, 1.65rem)',
          color: '#ffffff',
          fontWeight: 400,
          fontStyle: 'italic',
          lineHeight: 1.65,
          marginBottom: '1.25rem',
        }}>
          {t('«Все средства от продажи одежды направляются на поддержку православных общин и социальных проектов»', '“All proceeds from clothing sales go to support Orthodox communities and social projects”')}
        </p>

        <p style={{
          fontFamily: 'var(--font-inter), sans-serif',
          fontSize: '0.88rem',
          color: 'rgba(255,255,255,0.42)',
          lineHeight: 1.75,
          marginBottom: '3.5rem',
          fontWeight: 300,
          maxWidth: 560,
          margin: '0 auto 3.5rem',
        }}>
          {t('Покупая нашу одежду, вы участвуете в добром деле. Часть прибыли идёт на помощь нуждающимся и развитие православных инициатив в России.', 'By buying our clothing, you take part in a good cause. Part of the profit goes to helping those in need and developing Orthodox initiatives in Russia.')}
        </p>

        {/* Статистика */}
        <div style={{
          display: 'flex',
          justifyContent: 'center',
          gap: '0',
          flexWrap: 'wrap',
        }}>
          {[
            { title: t('Помощь общинам', 'Helping communities'), desc: t('Поддержка православных приходов', 'Support for Orthodox parishes') },
            { title: t('Социальные проекты', 'Social projects'), desc: t('Помощь нуждающимся семьям', 'Help for families in need') },
            { title: t('Духовное просвещение', 'Spiritual education'), desc: t('Распространение Слова Божия', 'Spreading the Word of God') },
          ].map(({ title, desc }, i) => (
            <div key={title} style={{
              flex: '1 1 200px',
              padding: '2rem 1.5rem',
              borderLeft: i > 0 ? '1px solid rgba(255,255,255,0.08)' : 'none',
              textAlign: 'center',
            }}>
              <div style={{
                width: 24, height: 1,
                background: 'var(--gold)',
                margin: '0 auto 1rem',
                opacity: 0.5,
              }} />
              <p style={{
                fontFamily: 'var(--font-inter), sans-serif',
                fontWeight: 600,
                fontSize: '0.75rem',
                color: 'var(--gold)',
                marginBottom: '0.5rem',
                letterSpacing: '0.08em',
                textTransform: 'uppercase',
              }}>
                {title}
              </p>
              <p style={{
                fontFamily: 'var(--font-inter), sans-serif',
                fontSize: '0.78rem',
                color: 'rgba(255,255,255,0.35)',
                lineHeight: 1.6,
                fontWeight: 300,
              }}>
                {desc}
              </p>
            </div>
          ))}
        </div>

        {/* Нижний разделитель */}
        <div style={{ width: 32, height: 1, background: 'rgba(201,168,76,0.25)', margin: '2.5rem auto 0' }} />
      </div>
    </section>
  )
}
