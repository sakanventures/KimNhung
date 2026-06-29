'use client'

import { useRouter } from 'next/navigation'
import { useTranslation } from '@/lib/i18n'

export function LanguageToggle() {
  const { lang, t, setLang } = useTranslation()
  const router = useRouter()

  function toggle() {
    const next = lang === 'en' ? 'vi' : 'en'
    setLang(next)
    document.cookie = `NEXT_LOCALE=${next}; path=/; max-age=31536000; SameSite=Lax`
    router.refresh()
  }

  return (
    <button
      onClick={toggle}
      aria-label={lang === 'en' ? t.languageToggle.switchToVietnamese : t.languageToggle.switchToEnglish}
      className="inline-flex items-center rounded-full border border-border bg-muted px-3 py-1.5 text-xs font-bold text-foreground transition-colors hover:border-primary hover:text-primary"
    >
      {lang === 'en' ? 'VN' : 'EN'}
    </button>
  )
}
