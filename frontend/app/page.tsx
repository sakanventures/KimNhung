import { getGlobal, getHomePage, blocksToText } from '@/data/loaders'
import { getStrapiMedia } from '@/lib/utils'
import { SiteHeader } from '@/components/site-header'
import { AnnouncementBar } from '@/components/announcement-bar'
import { Hero } from '@/components/hero'
import { ShopByDepartment } from '@/components/shop-by-department'
import { Departments } from '@/components/departments'
import { WeeklySpecials } from '@/components/weekly-specials'
import { FoodHall } from '@/components/food-hall'
import { Story } from '@/components/story'
import { Community } from '@/components/community'
import { Newsletter } from '@/components/newsletter'
import { Visit } from '@/components/visit'
import { SiteFooter } from '@/components/site-footer'

export default async function Page() {
  const [global, homepage] = await Promise.all([getGlobal(), getHomePage()])
  const heroBlock = homepage?.Blocks?.find(b => b.__component === 'layouts.hero')
  const heroData = heroBlock?.Hero

const announcementItems = global?.Announcement?.RichText
    .map((entry) => blocksToText(entry.RichText))
    .filter((s) => s.length > 0)

  const utilityItems = global?.Utility?.Text

  const logoUrl = getStrapiMedia(global?.NavBar?.LogoText?.Logo?.url ?? null) ?? undefined
  const darkLogoUrl = getStrapiMedia(global?.NavBar?.LogoText?.DarkLogo?.url ?? null) ?? undefined
  const logoTitle = global?.NavBar?.LogoText?.Title
    ? {
        text: global.NavBar.LogoText.Title.Text,
        description: global.NavBar.LogoText.Title.Description ?? 'Superfood',
      }
    : undefined

  return (
    <>
      <AnnouncementBar items={announcementItems} />
      <SiteHeader
        utilityItems={utilityItems}
        logoUrl={logoUrl}
        darkLogoUrl={darkLogoUrl}
        logoTitle={logoTitle}
      />
      <main>
        <Hero heroData={heroData} />
        <ShopByDepartment />
        <WeeklySpecials />
        <Departments />
        <FoodHall />
        <Story />
        <Community />
        <Newsletter />
        <Visit />
      </main>
      <SiteFooter />
    </>
  )
}
