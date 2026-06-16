import { Metadata } from 'next'
import PageLayout from '@/components/layout/PageLayout'
import CatalogGrid from '@/components/catalog/CatalogGrid'
import { products } from '@/data/products'

export const metadata: Metadata = {
  title: 'Акции и скидки',
  description: 'Товары со скидкой в магазине православной одежды Faith over Fear.',
}

export default function SalePage() {
  const saleProducts = products.filter(p => p.salePrice && p.salePrice < p.price)
  return (
    <PageLayout>
      <CatalogGrid products={saleProducts} title="Акции / Скидки" titleEn="Sale" />
    </PageLayout>
  )
}
