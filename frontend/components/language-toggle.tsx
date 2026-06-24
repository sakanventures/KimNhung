'use client'

import { useTranslation } from '@/lib/i18n'

export function LanguageToggle() {
  const { lang, setLang } = useTranslation()
  return (
    <button
      onClick={() => setLang(lang === 'en' ? 'vi' : 'en')}
      aria-label={lang === 'en' ? 'Switch to Vietnamese' : 'Chuyển sang tiếng Anh'}
      className="inline-flex items-center rounded-full border border-border bg-muted px-3 py-1.5 text-xs font-bold text-foreground transition-colors hover:border-primary hover:text-primary"
    >
      {lang === 'en' ? 'VI' : 'EN'}
    </button>
  )
}
