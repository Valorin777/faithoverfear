import { Metadata } from 'next'
import PageLayout from '@/components/layout/PageLayout'
import CatalogGrid from '@/components/catalog/CatalogGrid'
import { products } from '@/data/products'

export const metadata: Metadata = {
  title: 'Новинки',
  description: 'Новые поступления православной одежды.',
}

export default function NewPage() {
  const newProducts = products.filter(p => p.isNew)
  return (
    <PageLayout>
      <CatalogGrid products={newProducts} title="Новинки" titleEn="New In" />
    </PageLayout>
  )
}
