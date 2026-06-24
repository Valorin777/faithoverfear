'use client'

import Link from 'next/link'
import { useLang } from '@/context/LanguageContext'
import { useCategories } from '@/context/CategoriesContext'

/** Набор значков. Категория хранит ключ иконки (поле «Иконка» в админке). */
const ICONS: Record<string, React.ReactNode> = {
  tshirt: <svg viewBox="0 0 40 40" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" style={{ width: 28, height: 28 }}><path d="M5 12L13 7H27L35 12L29 17V34H11V17L5 12Z"/><path d="M13 7C13 7 15 13 20 13C25 13 27 7 27 7"/></svg>,
  polo: <svg viewBox="0 0 40 40" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" style={{ width: 28, height: 28 }}><path d="M5 12L13 7H16L20 12L24 7H27L35 12L29 17V34H11V17L5 12Z"/><path d="M20 12V18M19 14H21"/></svg>,
  sweatshirt: <svg viewBox="0 0 40 40" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" style={{ width: 28, height: 28 }}><path d="M4 13L12 7H28L36 13L30 18V34H10V18L4 13Z"/><path d="M10 18H4M36 18H30"/></svg>,
  sweater: <svg viewBox="0 0 40 40" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" style={{ width: 28, height: 28 }}><path d="M5 13L13 7H18C18 11 19 13 20 13C21 13 22 11 22 7H27L35 13V34H25V24H15V34H5V13Z"/></svg>,
  gift: <svg viewBox="0 0 40 40" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" style={{ width: 28, height: 28 }}><rect x="5" y="17" width="30" height="18" rx="1"/><rect x="4" y="11" width="32" height="8" rx="1"/><line x1="20" y1="11" x2="20" y2="35"/><path d="M20 11C20 11 17 5 13 8C9 11 16 11 20 11Z"/><path d="M20 11C20 11 23 5 27 8C31 11 24 11 20 11Z"/></svg>,
  accessory: <svg viewBox="0 0 40 40" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" style={{ width: 28, height: 28 }}><circle cx="20" cy="20" r="15"/><circle cx="20" cy="20" r="8"/><line x1="20" y1="5" x2="20" y2="12"/><line x1="20" y1="28" x2="20" y2="35"/><line x1="5" y1="20" x2="12" y2="20"/><line x1="28" y1="20" x2="35" y2="20"/></svg>,
  tag: <svg viewBox="0 0 40 40" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" style={{ width: 28, height: 28 }}><path d="M6 6H18L34 22L22 34L6 18V6Z"/><circle cx="13" cy="13" r="2.5"/></svg>,
}

export default function CategoriesSection() {
  const { t } = useLang()
  const categories = useCategories()

  return (
    <section style={{ background: '#fff', padding: '5rem 0' }}>
      <div style={{ maxWidth: 1280, margin: '0 auto', padding: '0 1.25rem' }}>

        <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
          <p style={{
            fontFamily: 'var(--font-inter), sans-serif',
            fontSize: '0.62rem', letterSpacing: '0.28em',
            textTransform: 'uppercase', color: 'var(--gold)',
            marginBottom: '0.6rem', fontWeight: 500,
          }}>
            {t('Ассортимент', 'Range')}
          </p>
          <h2 style={{
            fontFamily: 'var(--font-playfair), Georgia, serif',
            fontSize: 'clamp(1.6rem, 3vw, 2.2rem)',
            color: 'var(--navy)', fontWeight: 700,
          }}>
            {t('Категории', 'Categories')}
          </h2>
          <p style={{
            fontFamily: 'var(--font-inter), sans-serif',
            fontSize: '0.85rem', color: '#999', fontWeight: 300,
            marginTop: '0.4rem', maxWidth: 340, margin: '0.5rem auto 0',
          }}>
            {t('Вся одежда из натуральных материалов', 'All clothing made from natural materials')}
          </p>
          <div style={{ width: 36, height: 2, background: 'var(--gold)', margin: '1rem auto 0', borderRadius: 2 }} />
        </div>

        {/* Сетка категорий */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(2, 1fr)',
          gap: '0.75rem',
        }}
          className="cat-grid"
        >
          {categories.map(cat => (
            <Link key={cat.slug} href={`/catalog/${cat.slug}`} className="cat-card">
              <div style={{
                color: 'var(--navy)', opacity: 0.4, flexShrink: 0,
                transition: 'opacity 0.2s',
              }}
                className="cat-icon"
              >
                {ICONS[cat.icon || 'tag'] || ICONS.tag}
              </div>
              <div style={{ minWidth: 0 }}>
                <div style={{
                  fontFamily: 'var(--font-inter), sans-serif',
                  fontSize: '0.82rem', fontWeight: 600,
                  color: 'var(--navy)', marginBottom: '0.15rem',
                  whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis',
                }}>
                  {t(cat.name, cat.nameEn || cat.name)}
                </div>
                {(cat.description || cat.descriptionEn) && (
                  <div style={{
                    fontFamily: 'var(--font-inter), sans-serif',
                    fontSize: '0.7rem', color: '#bbb', fontWeight: 300,
                    whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis',
                  }}>
                    {t(cat.description || '', cat.descriptionEn || cat.description || '')}
                  </div>
                )}
              </div>
              <svg style={{ marginLeft: 'auto', flexShrink: 0, color: '#ddd' }} width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M9 18l6-6-6-6"/>
              </svg>
            </Link>
          ))}
        </div>

      </div>

      <style>{`
        .cat-grid {
          grid-template-columns: repeat(2, 1fr);
        }
        @media (min-width: 640px) {
          .cat-grid { grid-template-columns: repeat(3, 1fr); }
        }
        @media (min-width: 1024px) {
          .cat-grid { grid-template-columns: repeat(6, 1fr); }
          .cat-card { flex-direction: column; align-items: center; text-align: center; padding: 1.5rem 0.75rem; }
          .cat-card svg:last-child { display: none; }
          .cat-card > div:nth-child(2) > div { white-space: normal; text-overflow: unset; overflow: visible; }
        }
        .cat-card {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          padding: 0.875rem 1rem;
          border: 1px solid #f0f0f0;
          border-radius: 6px;
          text-decoration: none;
          background: #fff;
          transition: border-color 0.2s, box-shadow 0.2s;
          min-width: 0;
          overflow: hidden;
        }
        .cat-card:hover {
          border-color: rgba(201,168,76,0.5);
          box-shadow: 0 2px 12px rgba(201,168,76,0.08);
        }
        .cat-card:hover .cat-icon { opacity: 1 !important; color: var(--burgundy) !important; }
      `}</style>
    </section>
  )
}
