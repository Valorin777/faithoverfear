'use client'

import { createContext, useContext, useState, useEffect, ReactNode } from 'react'
import { Product, ProductVariant } from '@/types'

export interface CartItem {
  product: Product
  variant: ProductVariant
  quantity: number
}

interface CartContextType {
  items: CartItem[]
  addItem: (product: Product, variant: ProductVariant, quantity?: number) => void
  removeItem: (productId: string, variantId: string) => void
  updateQuantity: (productId: string, variantId: string, quantity: number) => void
  clearCart: () => void
  total: number
  count: number
}

const CartContext = createContext<CartContextType | null>(null)

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([])

  useEffect(() => {
    try {
      const saved = localStorage.getItem('fof_cart')
      if (saved) setItems(JSON.parse(saved))
    } catch {}
  }, [])

  useEffect(() => {
    localStorage.setItem('fof_cart', JSON.stringify(items))
  }, [items])

  function addItem(product: Product, variant: ProductVariant, quantity = 1) {
    setItems(prev => {
      const existing = prev.find(
        i => i.product.id === product.id && i.variant.id === variant.id
      )
      if (existing) {
        return prev.map(i =>
          i.product.id === product.id && i.variant.id === variant.id
            ? { ...i, quantity: i.quantity + quantity }
            : i
        )
      }
      return [...prev, { product, variant, quantity }]
    })
  }

  function removeItem(productId: string, variantId: string) {
    setItems(prev =>
      prev.filter(i => !(i.product.id === productId && i.variant.id === variantId))
    )
  }

  function updateQuantity(productId: string, variantId: string, quantity: number) {
    if (quantity <= 0) { removeItem(productId, variantId); return }
    setItems(prev =>
      prev.map(i =>
        i.product.id === productId && i.variant.id === variantId
          ? { ...i, quantity }
          : i
      )
    )
  }

  function clearCart() { setItems([]) }

  const total = items.reduce(
    (sum, i) => sum + (i.product.salePrice ?? i.product.price) * i.quantity,
    0
  )
  const count = items.reduce((sum, i) => sum + i.quantity, 0)

  return (
    <CartContext.Provider value={{ items, addItem, removeItem, updateQuantity, clearCart, total, count }}>
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  const ctx = useContext(CartContext)
  if (!ctx) throw new Error('useCart must be used inside CartProvider')
  return ctx
}
