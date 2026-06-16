import { Metadata } from 'next'
import AboutContent from './AboutContent'

export const metadata: Metadata = {
  title: 'О проекте — миссия Faith over Fear',
  description: 'История и миссия проекта православной одежды Faith over Fear.',
}

export default function AboutPage() {
  return <AboutContent />
}
