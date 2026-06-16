'use client'

import { createContext, useContext, useState, useEffect, ReactNode } from 'react'

interface WishlistContextType {
  ids: string[]
  toggle: (id: string) => void
  isWishlisted: (id: string) => boolean
  remove: (id: string) => void
  count: number
}

const WishlistContext = createContext<WishlistContextType | null>(null)

export function WishlistProvider({ children }: { children: ReactNode }) {
  const [ids, setIds] = useState<string[]>([])
  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    try {
      const saved = localStorage.getItem('fof_wishlist')
      if (saved) setIds(JSON.parse(saved))
    } catch {}
    setLoaded(true)
  }, [])

  useEffect(() => {
    if (loaded) localStorage.setItem('fof_wishlist', JSON.stringify(ids))
  }, [ids, loaded])

  function toggle(id: string) {
    setIds(prev => (prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]))
  }
  function remove(id: string) {
    setIds(prev => prev.filter(x => x !== id))
  }
  const isWishlisted = (id: string) => ids.includes(id)

  return (
    <WishlistContext.Provider value={{ ids, toggle, isWishlisted, remove, count: ids.length }}>
      {children}
    </WishlistContext.Provider>
  )
}

export function useWishlist() {
  const ctx = useContext(WishlistContext)
  if (!ctx) throw new Error('useWishlist must be used inside WishlistProvider')
  return ctx
}
