import { getPayload } from 'payload'
import config from '@payload-config'
import HeroBannerView from './HeroBannerView'

export default async function HeroBanner() {
  let s: {
    heroEyebrow?: string
    heroEyebrowEn?: string
    heroTitleLine1?: string
    heroTitleLine1En?: string
    heroTitleLine2?: string
    heroTitleLine2En?: string
    heroSubtitle?: string
    heroSubtitleEn?: string
    heroImage?: { url?: string } | string
    heroVideo?: { url?: string } | string
  } = {}
  try {
    const payload = await getPayload({ config })
    s = await payload.findGlobal({ slug: 'settings', depth: 1 })
  } catch {
    // настройки ещё не заданы — используем значения по умолчанию
  }
  const mediaUrl = (m: { url?: string } | string | undefined) =>
    !m ? undefined : typeof m === 'string' ? m : m.url || undefined
  const heroImage = mediaUrl(s?.heroImage)
  const heroVideo = mediaUrl(s?.heroVideo)
  const eyebrow = s?.heroEyebrow || 'Православная одежда · Faith over Fear'
  const title1 = s?.heroTitleLine1 || 'Одежда,'
  const title2 = s?.heroTitleLine2 || 'которая несёт Свет'
  const subtitle =
    s?.heroSubtitle ||
    'Футболки, поло, свитшоты и аксессуары с цитатами Священного Писания и православной символикой. Создано с молитвой.'

  return (
    <HeroBannerView
      eyebrow={eyebrow}
      eyebrowEn={s?.heroEyebrowEn}
      title1={title1}
      title1En={s?.heroTitleLine1En}
      title2={title2}
      title2En={s?.heroTitleLine2En}
      subtitle={subtitle}
      subtitleEn={s?.heroSubtitleEn}
      heroImage={heroImage}
      heroVideo={heroVideo}
    />
  )
}
