import PageLayout from '@/components/layout/PageLayout'
import Reveal from '@/components/ui/Reveal'
import HeroBanner from '@/components/home/HeroBanner'
import BestsellersSection from '@/components/home/BestsellersSection'
import NewArrivalsSection from '@/components/home/NewArrivalsSection'
import CategoriesSection from '@/components/home/CategoriesSection'
import ReviewsSection from '@/components/home/ReviewsSection'
import AboutSection from '@/components/home/AboutSection'
import MissionBlock from '@/components/home/MissionBlock'

// Главная пересобирается раз в минуту — правки баннера из админки видны без деплоя
export const revalidate = 60

export default function HomePage() {
  return (
    <PageLayout>
      <HeroBanner />
      <Reveal><BestsellersSection /></Reveal>
      <Reveal><CategoriesSection /></Reveal>
      <Reveal><NewArrivalsSection /></Reveal>
      <Reveal><ReviewsSection /></Reveal>
      <Reveal><AboutSection /></Reveal>
      <Reveal><MissionBlock /></Reveal>
    </PageLayout>
  )
}
