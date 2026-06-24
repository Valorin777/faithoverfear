export interface Product {
  id: string
  slug: string
  name: string
  nameEn?: string
  description: string
  descriptionEn?: string
  spiritualMeaning: string
  spiritualMeaningEn?: string
  price: number
  salePrice?: number
  category: string
  images: string[]
  video?: string
  variants: ProductVariant[]
  tags: string[]
  isNew?: boolean
  isBestseller?: boolean
  wildberriesUrl?: string
  specifications?: { label: string; labelEn?: string; value: string; valueEn?: string }[]
  designs?: { name: string; nameEn?: string; images: string[] }[]
  crossCustomizable?: boolean
  crossNote?: string
  crossNoteEn?: string
}

export interface ProductVariant {
  id: string
  size: 'S' | 'M' | 'L' | 'XL' | 'XXL'
  color: string
  colorEn?: string
  colorHex: string
  stock: number
  sku: string
}

export type ProductCategory =
  | 'tshirts'
  | 'polo'
  | 'sweatshirts'
  | 'sweaters'
  | 'gift-sets'
  | 'accessories'

export interface CartItem {
  productId: string
  variantId: string
  quantity: number
  product: Product
  variant: ProductVariant
}

export interface Order {
  id: string
  status: OrderStatus
  items: CartItem[]
  total: number
  delivery: DeliveryInfo
  payment: PaymentInfo
  createdAt: string
}

export type OrderStatus =
  | 'pending'
  | 'paid'
  | 'processing'
  | 'shipped'
  | 'delivered'
  | 'cancelled'

export interface DeliveryInfo {
  method: 'cdek' | 'boxberry' | 'russianpost' | 'pickup'
  address?: string
  city?: string
  trackingNumber?: string
}

export interface PaymentInfo {
  method: 'sbp' | 'card' | 'tinkoff' | 'sber' | 'alfa'
  status: 'pending' | 'paid' | 'failed'
}

export interface Review {
  id: string
  author: string
  rating: number
  text: string
  textEn?: string
  photo?: string
  productId?: string
  createdAt: string
}

export interface BlogPost {
  id: string
  slug: string
  title: string
  titleEn?: string
  excerpt: string
  excerptEn?: string
  content: string
  image?: string
  video?: string
  createdAt: string
}

export interface SiteSettingsData {
  promoBarText?: string
  promoBarTextEn?: string
  freeDeliveryFrom: number
  contactEmail?: string
  contactPhone?: string
  contactWebsite?: string
  workingHours?: string
  workingHoursEn?: string
  socials: { platform: string; url: string }[]
  telegramUrl?: string
  telegramPitch?: string
  telegramPitchEn?: string
  deliveryMethods: {
    name: string
    nameEn?: string
    price: string
    priceEn?: string
    time: string
    timeEn?: string
    description: string
    descriptionEn?: string
  }[]
  paymentMethods: { ru: string; en?: string }[]
  paymentSystems: { code: string; name: string; nameEn?: string; hint?: string; hintEn?: string }[]
  aboutQuote?: string
  aboutQuoteEn?: string
  aboutQuoteSource?: string
  aboutQuoteSourceEn?: string
  aboutSections?: { title: string; titleEn?: string; text: string; textEn?: string }[]
  aboutValues?: { title: string; titleEn?: string; desc: string; descEn?: string }[]
  heroImage?: string
  heroVideo?: string
}

export const CATEGORY_LABELS: Record<ProductCategory, string> = {
  tshirts: 'Футболки',
  polo: 'Поло',
  sweatshirts: 'Свитшоты / Худи',
  sweaters: 'Свитеры',
  'gift-sets': 'Подарочные наборы',
  accessories: 'Аксессуары',
}

export const CATEGORY_LABELS_EN: Record<ProductCategory, string> = {
  tshirts: 'T-shirts',
  polo: 'Polo',
  sweatshirts: 'Sweatshirts / Hoodies',
  sweaters: 'Sweaters',
  'gift-sets': 'Gift Sets',
  accessories: 'Accessories',
}

/** Категория для витрины (приходит из админки; имеет запасной список ниже). */
export interface CategoryItem {
  slug: string
  name: string
  nameEn?: string
  order: number
  icon?: string
  description?: string
  descriptionEn?: string
}

/** Запасной список категорий — используется, если коллекция «Категории» в базе пуста/недоступна. */
export const DEFAULT_CATEGORIES: CategoryItem[] = [
  { slug: 'tshirts', name: 'Футболки', nameEn: 'T-shirts', order: 1, icon: 'tshirt', description: 'С принтами и цитатами', descriptionEn: 'With prints and quotes' },
  { slug: 'polo', name: 'Поло', nameEn: 'Polo', order: 2, icon: 'polo', description: 'Лаконичный стиль', descriptionEn: 'Minimalist style' },
  { slug: 'sweatshirts', name: 'Свитшоты / Худи', nameEn: 'Sweatshirts / Hoodies', order: 3, icon: 'sweatshirt', description: 'Тепло и уют', descriptionEn: 'Warm and cosy' },
  { slug: 'sweaters', name: 'Свитеры', nameEn: 'Sweaters', order: 4, icon: 'sweater', description: 'Для прохладных дней', descriptionEn: 'For cooler days' },
  { slug: 'gift-sets', name: 'Подарочные наборы', nameEn: 'Gift Sets', order: 5, icon: 'gift', description: 'Подарочные комплекты', descriptionEn: 'Gift bundles' },
  { slug: 'accessories', name: 'Аксессуары', nameEn: 'Accessories', order: 6, icon: 'accessory', description: 'Дополните образ', descriptionEn: 'Complete your look' },
]
