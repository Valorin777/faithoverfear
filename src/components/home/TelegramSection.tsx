export default function TelegramSection() {
  return (
    <section style={{ background: 'var(--beige)', borderTop: '1px solid var(--beige-dark)', padding: '3.5rem 0' }}>
      <div className="container">
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1rem', textAlign: 'center' }}>

          <svg viewBox="0 0 24 24" fill="var(--navy)" style={{ width: 32, height: 32, opacity: 0.6 }}>
            <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.562 8.248-1.97 9.289c-.145.658-.537.818-1.084.508l-3-2.21-1.447 1.394c-.16.16-.295.295-.605.295l.213-3.053 5.56-5.023c.242-.213-.054-.333-.373-.12L7.16 14.605l-2.963-.924c-.643-.204-.657-.643.136-.953l11.57-4.461c.537-.194 1.006.131.659.981z" />
          </svg>

          <h3 style={{
            fontFamily: 'var(--font-playfair), Georgia, serif',
            fontSize: '1.4rem',
            color: 'var(--navy)',
            fontWeight: 600,
          }}>
            Подпишитесь на наш Telegram-канал
          </h3>

          <p style={{
            fontFamily: 'var(--font-inter), sans-serif',
            fontSize: '0.9rem',
            color: '#777',
            fontWeight: 300,
            maxWidth: 380,
            lineHeight: 1.6,
          }}>
            Новинки, акции, вдохновляющие цитаты и новости проекта — первыми узнают подписчики
          </p>

          <a
            href="https://t.me/"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: 'inline-block',
              marginTop: '0.5rem',
              background: '#229ED9',
              color: '#fff',
              padding: '0.75rem 2rem',
              borderRadius: 3,
              fontFamily: 'var(--font-inter), sans-serif',
              fontSize: '0.875rem',
              fontWeight: 600,
              letterSpacing: '0.03em',
              transition: 'background 0.2s',
            }}
          >
            Подписаться
          </a>

        </div>
      </div>
    </section>
  )
}
