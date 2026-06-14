import { Metadata } from 'next'
import PageLayout from '@/components/layout/PageLayout'
import CatalogGrid from '@/components/catalog/CatalogGrid'
import { products } from '@/data/products'

export const metadata: Metadata = {
  title: 'Каталог православной одежды',
  description: 'Все товары: футболки, поло, свитшоты, свитеры и аксессуары с православными дизайнами.',
}

export default function CatalogPage() {
  return (
    <PageLayout>
      <CatalogGrid products={products} title="Каталог" />
    </PageLayout>
  )
}
