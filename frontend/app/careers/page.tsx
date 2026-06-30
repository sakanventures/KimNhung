import type { Metadata } from 'next'
import { cookies } from 'next/headers'
import { getGlobal } from '@/data/loaders'
import { getStrapiMedia } from '@/lib/utils'
import { SiteHeader } from '@/components/site-header'
import { SiteFooter } from '@/components/site-footer'
import { CareersClient } from '@/components/careers-client'

export const metadata: Metadata = {
  title: 'Careers — Kim Nhung Superfood',
  description:
    "Join the team at Kim Nhung Superfood — Metro Detroit's largest Asian superstore. Explore open positions in our store.",
}

export default async function CareersPage() {
  const cookieStore = await cookies()
  const locale = cookieStore.get('NEXT_LOCALE')?.value === 'vi' ? 'vi' : 'en'

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
    <>
      <SiteHeader
        utilityItems={utilityItems}
        logoUrl={logoUrl}
        darkLogoUrl={darkLogoUrl}
        logoTitle={logoTitle}
        navLinks={global?.NavBar?.Link}
      />
      <main>
        <CareersClient />
      </main>
      <SiteFooter footer={global?.Footer ?? null} subFooter={global?.SubFooter ?? null} />
    </>
  )
}
