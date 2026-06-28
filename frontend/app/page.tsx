import { getGlobal, getHomePage, getCommunityPosts, blocksToText, type ShowcaseBlock, type DealsBlock, type StoryBlock, type EateryBlock, type MapBlock, type NewsletterBlock } from '@/data/loaders'
import { getStrapiMedia } from '@/lib/utils'
import { getSaleProducts } from '@/lib/medusa/products'
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
import { SiteFooter } from '@/components/site-footer'

export default async function Page() {
  const [global, homepage, saleProducts, communityPosts] = await Promise.all([
    getGlobal(),
    getHomePage(),
    getSaleProducts().catch(() => []),
    getCommunityPosts(),
  ])
  const heroBlock = homepage?.Blocks?.find(b => b.__component === 'layouts.hero')
  const heroData = heroBlock?.Hero

  const showcaseBlock = homepage?.Blocks?.find(
    (b): b is ShowcaseBlock => b.__component === 'layouts.showcase'
  )

  const dealsBlock = homepage?.Blocks?.find(
    (b): b is DealsBlock => b.__component === 'layouts.deals'
  )

  const storyBlock = homepage?.Blocks?.find(
    (b): b is StoryBlock => b.__component === 'layouts.story'
  )

  const eateryBlock = homepage?.Blocks?.find(
    (b): b is EateryBlock => b.__component === 'layouts.eatery'
  )

  const mapBlock = homepage?.Blocks?.find(
    (b): b is MapBlock => b.__component === 'layouts.map'
  )

  const newsletterBlock = homepage?.Blocks?.find(
    (b): b is NewsletterBlock => b.__component === 'layouts.newsletter'
  )

const announcementItems = global?.Announcement?.RichText
    .map((entry) => blocksToText(entry.RichText))
    .filter((s) => s.length > 0)

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
      <AnnouncementBar items={announcementItems} />
      <SiteHeader
        utilityItems={utilityItems}
        logoUrl={logoUrl}
        darkLogoUrl={darkLogoUrl}
        logoTitle={logoTitle}
      />
      <main>
        <Hero heroData={heroData} />
        <ShopByDepartment showcaseData={showcaseBlock} />
        <WeeklySpecials dealsData={dealsBlock} products={saleProducts} />
        <Departments mapData={mapBlock} />
        <FoodHall eateryData={eateryBlock} />
        <Story storyData={storyBlock} />
        <Community posts={communityPosts} />
        <Newsletter data={newsletterBlock} />
      </main>
      <SiteFooter footer={global?.Footer ?? null} />
    </>
  )
}
