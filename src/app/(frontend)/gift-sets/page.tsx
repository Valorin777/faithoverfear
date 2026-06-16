import { Metadata } from 'next'
import PageLayout from '@/components/layout/PageLayout'
import CatalogGrid from '@/components/catalog/CatalogGrid'
import { getProducts } from '@/lib/cms'

export const metadata: Metadata = {
  title: 'Подарочные наборы',
  description: 'Подарочные наборы православной одежды. Идеальный подарок для близких.',
}

export const revalidate = 60

export default async function GiftSetsPage() {
  const products = await getProducts()
  const giftProducts = products.filter(p => p.category === 'gift-sets')
  return (
    <PageLayout>
      <CatalogGrid products={giftProducts} title="Подарочные наборы" titleEn="Gift Sets" />
    </PageLayout>
  )
}
