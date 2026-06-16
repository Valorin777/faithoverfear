import { getPayload } from 'payload'
import config from '@payload-config'
import HeroBannerView from './HeroBannerView'

export default async function HeroBanner() {
  let s: {
    heroEyebrow?: string
    heroTitleLine1?: string
    heroTitleLine2?: string
    heroSubtitle?: string
  } = {}
  try {
    const payload = await getPayload({ config })
    s = await payload.findGlobal({ slug: 'settings', depth: 0 })
  } catch {
    // настройки ещё не заданы — используем значения по умолчанию
  }
  const eyebrow = s?.heroEyebrow || 'Православная одежда · Faith over Fear'
  const title1 = s?.heroTitleLine1 || 'Одежда,'
  const title2 = s?.heroTitleLine2 || 'которая несёт Свет'
  const subtitle =
    s?.heroSubtitle ||
    'Футболки, поло, свитшоты и аксессуары с цитатами Священного Писания и православной символикой. Создано с молитвой.'

  return <HeroBannerView eyebrow={eyebrow} title1={title1} title2={title2} subtitle={subtitle} />
}
