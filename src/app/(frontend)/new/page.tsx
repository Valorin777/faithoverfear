import { Metadata } from 'next'
import PageLayout from '@/components/layout/PageLayout'
import CatalogGrid from '@/components/catalog/CatalogGrid'
import { getProducts } from '@/lib/cms'

export const metadata: Metadata = {
  title: 'Новинки',
  description: 'Новые поступления христианской одежды.',
}

export const revalidate = 60

export default async function NewPage() {
  const products = await getProducts()
  const newProducts = products.filter(p => p.isNew)
  return (
    <PageLayout>
      <CatalogGrid products={newProducts} title="Новинки" titleEn="New In" />
    </PageLayout>
  )
}
