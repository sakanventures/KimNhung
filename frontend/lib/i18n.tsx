'use client'

import { createContext, useContext, useState, type ReactNode } from 'react'
import { en } from './translations/en'
import { vi } from './translations/vi'

export type Lang = 'en' | 'vi'

interface I18nContextValue {
  lang: Lang
  t: typeof en
  setLang: (lang: Lang) => void
}

const I18nContext = createContext<I18nContextValue | null>(null)

export function LanguageProvider({ children, initialLang = 'en' }: { children: ReactNode; initialLang?: Lang }) {
  const [lang, setLang] = useState<Lang>(initialLang)
  return (
    <I18nContext.Provider value={{ lang, t: lang === 'en' ? en : vi, setLang }}>
      {children}
    </I18nContext.Provider>
  )
}

export function useTranslation() {
  const ctx = useContext(I18nContext)
  if (!ctx) throw new Error('useTranslation must be used within LanguageProvider')
  return ctx
}
