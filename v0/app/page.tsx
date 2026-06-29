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

export default function Page() {
  return (
    <>
      <AnnouncementBar />
      <SiteHeader />
      <main>
        <Hero />
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
