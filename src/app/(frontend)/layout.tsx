import type { Metadata, Viewport } from 'next'
import { Playfair_Display, Inter } from 'next/font/google'
import { CartProvider } from '@/context/CartContext'
import { WishlistProvider } from '@/context/WishlistContext'
import { LanguageProvider } from '@/context/LanguageContext'
import { SettingsProvider } from '@/context/SettingsContext'
import { CategoriesProvider } from '@/context/CategoriesContext'
import PWARegister from '@/components/pwa/PWARegister'
import InstallPrompt from '@/components/pwa/InstallPrompt'
import { getSettings, getCategories } from '@/lib/cms'
import '../globals.css'

export const revalidate = 60

const playfair = Playfair_Display({
  variable: '--font-playfair',
  subsets: ['latin', 'cyrillic'],
  weight: ['400', '600', '700'],
})

const inter = Inter({
  variable: '--font-inter',
  subsets: ['latin', 'cyrillic'],
  weight: ['300', '400', '500', '600'],
})

export const metadata: Metadata = {
  metadataBase: new URL('https://faithof.ru'),
  applicationName: 'Faith over Fear',
  title: {
    default: 'Faith over Fear — христианская одежда с христианскими мотивами',
    template: '%s | Faith over Fear',
  },
  description: 'Интернет-магазин христианской одежды. Футболки, поло, свитшоты и аксессуары с цитатами Иисуса Христа, крестами и христианской символикой.',
  keywords: ['христианская одежда', 'христианская одежда', 'одежда с крестом', 'футболка с молитвой', 'faith over fear'],
  manifest: '/manifest.webmanifest',
  appleWebApp: {
    capable: true,
    title: 'Faith over Fear',
    statusBarStyle: 'black-translucent',
  },
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon.ico',
    apple: '/icons/apple-touch-icon.png',
  },
  formatDetection: { telephone: false },
  openGraph: {
    title: 'Faith over Fear — христианская одежда',
    description: 'Одежда, которая несёт Свет',
    locale: 'ru_RU',
    type: 'website',
    siteName: 'Faith over Fear',
  },
  robots: {
    index: true,
    follow: true,
  },
}

export const viewport: Viewport = {
  themeColor: '#1B2A4A',
  colorScheme: 'light',
  width: 'device-width',
  initialScale: 1,
  viewportFit: 'cover',
}

export default async function FrontendLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const [settings, categories] = await Promise.all([getSettings(), getCategories()])
  return (
    <html lang="ru" className={`${playfair.variable} ${inter.variable}`}>
      <body className="min-h-screen flex flex-col antialiased">
        <SettingsProvider value={settings}>
          <CategoriesProvider value={categories}>
            <LanguageProvider>
              <CartProvider>
                <WishlistProvider>
                  {children}
                  <InstallPrompt />
                </WishlistProvider>
              </CartProvider>
            </LanguageProvider>
          </CategoriesProvider>
        </SettingsProvider>
        <PWARegister />
      </body>
    </html>
  )
}
