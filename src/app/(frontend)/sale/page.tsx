import { Metadata } from 'next'
import PageLayout from '@/components/layout/PageLayout'
import CatalogGrid from '@/components/catalog/CatalogGrid'
import { getProducts } from '@/lib/cms'

export const metadata: Metadata = {
  title: 'Акции и скидки',
  description: 'Товары со скидкой в магазине христианской одежды Faith over Fear.',
}

export const revalidate = 60

export default async function SalePage() {
  const products = await getProducts()
  const saleProducts = products.filter(p => p.salePrice && p.salePrice < p.price)
  return (
    <PageLayout>
      <CatalogGrid products={saleProducts} title="Акции / Скидки" titleEn="Sale" />
    </PageLayout>
  )
}
