import { cookies } from 'next/headers'
import { getGlobal } from '@/data/loaders'
import { getStrapiMedia } from '@/lib/utils'
import { SiteHeader } from '@/components/site-header'
import type { Lang } from '@/lib/i18n'

export async function GlobalHeader() {
  const cookieStore = await cookies()
  const locale: Lang = cookieStore.get('NEXT_LOCALE')?.value === 'vi' ? 'vi' : 'en'
  const global = await getGlobal(locale)

  const utilityItems = global?.Utility?.Text
  const logoUrl = getStrapiMedia(global?.NavBar?.LogoText?.Logo?.url ?? null) ?? undefined
  const darkLogoUrl = getStrapiMedia(global?.NavBar?.LogoText?.DarkLogo?.url ?? null) ?? undefined
  const logoTitle = global?.NavBar?.LogoText?.Title
    ? {
        text: global.NavBar.LogoText.Title.Title,
        description: global.NavBar.LogoText.Title.Description ?? 'Superfood',
      }
    : undefined

  return (
    <SiteHeader
      utilityItems={utilityItems}
      logoUrl={logoUrl}
      darkLogoUrl={darkLogoUrl}
      logoTitle={logoTitle}
      navLinks={global?.NavBar?.Link}
    />
  )
}
