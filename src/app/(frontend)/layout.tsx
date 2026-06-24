import type { Metadata } from 'next'
import { Playfair_Display, Inter } from 'next/font/google'
import { CartProvider } from '@/context/CartContext'
import { WishlistProvider } from '@/context/WishlistContext'
import { LanguageProvider } from '@/context/LanguageContext'
import { SettingsProvider } from '@/context/SettingsContext'
import { CategoriesProvider } from '@/context/CategoriesContext'
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
  title: {
    default: 'Faith over Fear — христианская одежда с христианскими мотивами',
    template: '%s | Faith over Fear',
  },
  description: 'Интернет-магазин христианской одежды. Футболки, поло, свитшоты и аксессуары с цитатами Иисуса Христа, крестами и христианской символикой.',
  keywords: ['христианская одежда', 'христианская одежда', 'одежда с крестом', 'футболка с молитвой', 'faith over fear'],
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
                </WishlistProvider>
              </CartProvider>
            </LanguageProvider>
          </CategoriesProvider>
        </SettingsProvider>
      </body>
    </html>
  )
}
