'use client'

import { createContext, useContext, ReactNode } from 'react'
import type { CategoryItem } from '@/types'
import { DEFAULT_CATEGORIES } from '@/types'

const CategoriesContext = createContext<CategoryItem[]>(DEFAULT_CATEGORIES)

export function CategoriesProvider({ value, children }: { value: CategoryItem[]; children: ReactNode }) {
  return <CategoriesContext.Provider value={value}>{children}</CategoriesContext.Provider>
}

/** Категории витрины (из админки), раздаются из корневого лейаута. */
export function useCategories(): CategoryItem[] {
  return useContext(CategoriesContext)
}
