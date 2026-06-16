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
  category: ProductCategory
  images: string[]
  video?: string
  variants: ProductVariant[]
  tags: string[]
  isNew?: boolean
  isBestseller?: boolean
  wildberriesUrl?: string
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
  createdAt: string
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
