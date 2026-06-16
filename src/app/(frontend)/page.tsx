import PageLayout from '@/components/layout/PageLayout'
import Reveal from '@/components/ui/Reveal'
import HeroBanner from '@/components/home/HeroBanner'
import BestsellersSection from '@/components/home/BestsellersSection'
import NewArrivalsSection from '@/components/home/NewArrivalsSection'
import CategoriesSection from '@/components/home/CategoriesSection'
import ReviewsSection from '@/components/home/ReviewsSection'
import AboutSection from '@/components/home/AboutSection'
import MissionBlock from '@/components/home/MissionBlock'
import { getProducts, getReviews } from '@/lib/cms'

// Главная пересобирается раз в минуту — правки из админки видны без деплоя
export const revalidate = 60

export default async function HomePage() {
  const [products, reviews] = await Promise.all([getProducts(), getReviews()])
  return (
    <PageLayout>
      <HeroBanner />
      <Reveal><BestsellersSection products={products} /></Reveal>
      <Reveal><CategoriesSection /></Reveal>
      <Reveal><NewArrivalsSection products={products} /></Reveal>
      <Reveal><ReviewsSection reviews={reviews} /></Reveal>
      <Reveal><AboutSection /></Reveal>
      <Reveal><MissionBlock /></Reveal>
    </PageLayout>
  )
}
