'use client'

import { useState, type CSSProperties, type ReactNode } from 'react'
import { INFO_TOPICS, type InfoBlock, type InfoTopic } from '@/data/infoSections'
import { useLang } from '@/context/LanguageContext'

const FONT = 'var(--font-inter), sans-serif'
const SERIF = 'var(--font-playfair), Georgia, serif'

const TITLE_EN: Record<string, string> = {
  'bible-quotes': 'Bible quotes', faq: 'FAQ', traditions: 'Christian traditions',
  symbols: 'Christian symbols', holidays: 'Christian holidays', commandments: 'Commandments',
}

// Тонкие line-иконки вместо эмодзи (наводим премиальный вид)
function TopicIcon({ slug }: { slug: string }) {
  const p = { fill: 'none', stroke: 'currentColor', strokeWidth: 1.5, strokeLinecap: 'round' as const, strokeLinejoin: 'round' as const }
  const svg = (children: ReactNode) => (
    <svg width="22" height="22" viewBox="0 0 24 24" {...p}>{children}</svg>
  )
  switch (slug) {
    case 'bible-quotes':
      return svg(<><path d="M3 5.6S4 5 6 5c3 0 6 1.6 6 1.6S15 5 18 5c2 0 3 .6 3 .6V19s-1-.6-3-.6c-3 0-6 1.6-6 1.6s-3-1.6-6-1.6c-2 0-3 .6-3 .6V5.6Z" /><path d="M12 6.6V20" /></>)
    case 'faq':
      return svg(<><circle cx="12" cy="12" r="9.3" /><path d="M9.3 9.4a2.8 2.8 0 0 1 5.4.8c0 1.9-2.7 2.4-2.7 2.4" /><path d="M12 16.6h.01" /></>)
    case 'traditions':
      return svg(<><path d="M12 2.5v3.2M10.4 4.1h3.2" /><path d="M5 21V10l7-3 7 3v11" /><path d="M3.5 21h17" /><path d="M10 21v-4.5a2 2 0 0 1 4 0V21" /></>)
    case 'symbols':
      return svg(<><path d="M12 3v18" /><path d="M9 7h6" /><path d="M6.5 11h11" /><path d="M9.5 16.6l5-2.4" /></>)
    case 'holidays':
      return svg(<path d="M12 3.2l2.4 4.86 5.36.78-3.88 3.78.92 5.34L12 15.7l-4.8 2.52.92-5.34L4.24 9.1l5.36-.78L12 3.2Z" />)
    case 'commandments':
      return svg(<><path d="M5 21V8.2a2.4 2.4 0 0 1 4.8 0V21" /><path d="M14.2 21V8.2a2.4 2.4 0 0 1 4.8 0V21" /><path d="M4 21h16" /></>)
    default:
      return svg(<circle cx="12" cy="12" r="9" />)
  }
}

const cardStyle: CSSProperties = {
  background: '#fff', border: '1px solid #e8e4dc', borderRadius: 14, overflow: 'hidden',
  transition: 'border-color 0.2s, box-shadow 0.2s',
}
const headerBtn: CSSProperties = {
  width: '100%', display: 'flex', alignItems: 'center', gap: '1.1rem',
  padding: '1.25rem 1.4rem', background: 'none', border: 'none', cursor: 'pointer', textAlign: 'left',
}
const iconBadge: CSSProperties = {
  width: 48, height: 48, flexShrink: 0, borderRadius: 12,
  background: 'var(--beige)', border: '1px solid #e8e4dc', color: 'var(--navy)',
  display: 'flex', alignItems: 'center', justifyContent: 'center',
}

function cleanHead(text: string) {
  return text.replace(/^[^\p{L}0-9]+/u, '').trim()
}

function Block({ block }: { block: InfoBlock }) {
  if (block.type === 'head') {
    return (
      <p style={{
        fontFamily: FONT, fontSize: '0.7rem', fontWeight: 700, letterSpacing: '0.14em',
        textTransform: 'uppercase', color: 'var(--gold-ink, #94762a)', margin: '1.9rem 0 0.6rem',
        display: 'flex', alignItems: 'center', gap: '0.7rem',
      }}>
        <span style={{ width: 16, height: 1, background: 'var(--gold)', flexShrink: 0 }} />
        {cleanHead(block.text)}
      </p>
    )
  }
  if (block.type === 'q') {
    return (
      <p style={{ fontFamily: SERIF, fontSize: '1.02rem', fontWeight: 700, color: 'var(--navy)', margin: '1.3rem 0 0.35rem' }}>
        {block.text}
      </p>
    )
  }
  if (block.type === 'sub') {
    return (
      <p style={{ fontFamily: FONT, fontSize: '0.9rem', fontWeight: 600, color: 'var(--navy)', margin: '0.8rem 0 0.2rem', lineHeight: 1.6 }}>
        {block.text}
      </p>
    )
  }
  return (
    <p style={{ fontFamily: FONT, fontSize: '0.92rem', color: '#56503f', lineHeight: 1.85, margin: '0.45rem 0', fontWeight: 400 }}>
      {block.text}
    </p>
  )
}

export default function InfoHub({ topics = INFO_TOPICS }: { topics?: InfoTopic[] }) {
  const { lang } = useLang()
  const [open, setOpen] = useState<string | null>(null)

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
      {topics.map((topic) => {
        const isOpen = open === topic.slug
        return (
          <div
            key={topic.slug}
            id={topic.slug}
            style={{ ...cardStyle, borderColor: isOpen ? 'var(--gold)' : '#e8e4dc', boxShadow: isOpen ? '0 8px 24px rgba(27,42,74,0.06)' : 'none' }}
          >
            <button type="button" onClick={() => setOpen(isOpen ? null : topic.slug)} style={headerBtn} aria-expanded={isOpen}>
              <span style={iconBadge}><TopicIcon slug={topic.slug} /></span>
              <span style={{ flex: 1, minWidth: 0 }}>
                <span style={{ display: 'block', fontFamily: SERIF, fontSize: '1.2rem', fontWeight: 700, color: 'var(--navy)', lineHeight: 1.25 }}>
                  {lang === 'en' ? (TITLE_EN[topic.slug] || topic.title) : topic.title}
                </span>
                {topic.intro && (
                  <span style={{ display: 'block', fontFamily: FONT, fontSize: '0.8rem', color: '#9a958a', marginTop: 3 }}>
                    {topic.intro}
                  </span>
                )}
              </span>
              <svg
                width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--gold)" strokeWidth="1.8"
                strokeLinecap="round" strokeLinejoin="round"
                style={{ flexShrink: 0, transition: 'transform 0.25s', transform: isOpen ? 'rotate(180deg)' : 'none' }}
              >
                <path d="M6 9l6 6 6-6" />
              </svg>
            </button>
            {isOpen && (
              <div style={{ padding: '0.5rem 1.5rem 1.9rem', borderTop: '1px solid #f1ede4' }}>
                {lang === 'en' && (
                  <p style={{ fontFamily: FONT, fontSize: '0.74rem', color: '#bbb', margin: '0.85rem 0 0' }}>
                    Content is provided in Russian.
                  </p>
                )}
                {topic.blocks.map((b, i) => <Block key={i} block={b} />)}
              </div>
            )}
          </div>
        )
      })}
    </div>
  )
}
