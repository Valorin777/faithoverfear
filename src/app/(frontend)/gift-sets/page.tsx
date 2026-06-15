import { Metadata } from 'next'
import PageLayout from '@/components/layout/PageLayout'
import CatalogGrid from '@/components/catalog/CatalogGrid'
import { products } from '@/data/products'

export const metadata: Metadata = {
  title: 'Подарочные наборы',
  description: 'Подарочные наборы православной одежды. Идеальный подарок для близких.',
}

export default function GiftSetsPage() {
  const giftProducts = products.filter(p => p.category === 'gift-sets')
  return (
    <PageLayout>
      <CatalogGrid products={giftProducts} title="Подарочные наборы" />
    </PageLayout>
  )
}
