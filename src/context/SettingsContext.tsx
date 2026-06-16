'use client'

import { createContext, useContext, ReactNode } from 'react'
import type { SiteSettingsData } from '@/types'

const FALLBACK: SiteSettingsData = { freeDeliveryFrom: 3500, socials: [], deliveryMethods: [], paymentMethods: [] }

const SettingsContext = createContext<SiteSettingsData>(FALLBACK)

export function SettingsProvider({ value, children }: { value: SiteSettingsData; children: ReactNode }) {
  return <SettingsContext.Provider value={value}>{children}</SettingsContext.Provider>
}

export function useSettings(): SiteSettingsData {
  return useContext(SettingsContext)
}
