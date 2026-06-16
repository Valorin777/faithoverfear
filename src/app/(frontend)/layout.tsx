import type { Metadata } from 'next'
import { Playfair_Display, Inter } from 'next/font/google'
import { CartProvider } from '@/context/CartContext'
import { WishlistProvider } from '@/context/WishlistContext'
import { LanguageProvider } from '@/context/LanguageContext'
import '../globals.css'

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
    default: 'Faith over Fear — православная одежда с христианскими мотивами',
    template: '%s | Faith over Fear',
  },
  description: 'Интернет-магазин православной одежды. Футболки, поло, свитшоты и аксессуары с цитатами Иисуса Христа, крестами и христианской символикой.',
  keywords: ['православная одежда', 'христианская одежда', 'одежда с крестом', 'футболка с молитвой', 'faith over fear'],
  openGraph: {
    title: 'Faith over Fear — православная одежда',
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

export default function FrontendLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ru" className={`${playfair.variable} ${inter.variable}`}>
      <body className="min-h-screen flex flex-col antialiased">
        <LanguageProvider>
          <CartProvider>
            <WishlistProvider>
              {children}
            </WishlistProvider>
          </CartProvider>
        </LanguageProvider>
      </body>
    </html>
  )
}
