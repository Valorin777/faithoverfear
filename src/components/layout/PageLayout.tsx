import Header from './Header'
import Footer from './Footer'
import TelegramWidget from './TelegramWidget'
import Analytics from './Analytics'

export default function PageLayout({ children }: { children: React.ReactNode }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', overflowX: 'hidden' }}>
      <Analytics />
      <Header />
      <main style={{ flex: 1 }}>
        {children}
      </main>
      <Footer />
      <TelegramWidget />
    </div>
  )
}
