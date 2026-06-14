import PageLayout from '@/components/layout/PageLayout'
import HeroBanner from '@/components/home/HeroBanner'
import BestsellersSection from '@/components/home/BestsellersSection'
import NewArrivalsSection from '@/components/home/NewArrivalsSection'
import CategoriesSection from '@/components/home/CategoriesSection'
import ReviewsSection from '@/components/home/ReviewsSection'
import AboutSection from '@/components/home/AboutSection'
import MissionBlock from '@/components/home/MissionBlock'

export default function HomePage() {
  return (
    <PageLayout>
      <HeroBanner />
      <BestsellersSection />
      <CategoriesSection />
      <NewArrivalsSection />
      <ReviewsSection />
      <AboutSection />
      <MissionBlock />
    </PageLayout>
  )
}
