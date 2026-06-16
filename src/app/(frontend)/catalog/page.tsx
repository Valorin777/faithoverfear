import { Metadata } from 'next'
import PageLayout from '@/components/layout/PageLayout'
import CatalogGrid from '@/components/catalog/CatalogGrid'
import { getProducts } from '@/lib/cms'

export const metadata: Metadata = {
  title: 'Каталог православной одежды',
  description: 'Все товары: футболки, поло, свитшоты, свитеры и аксессуары с православными дизайнами.',
}

export const revalidate = 60

export default async function CatalogPage() {
  const products = await getProducts()
  return (
    <PageLayout>
      <CatalogGrid products={products} title="Каталог" titleEn="Catalog" />
    </PageLayout>
  )
}
