import type { Metadata } from 'next'
import Link from 'next/link'
import { GlobalHeader } from '@/components/global-header'
import { SiteFooter } from '@/components/site-footer'
import { AnnouncementBar } from '@/components/announcement-bar'
import { CheckoutForm, OrderSummary } from '@/components/checkout-form'

export const metadata: Metadata = { title: 'Checkout' }

export default function CheckoutPage() {
  return (
    <>
      <AnnouncementBar />
      <GlobalHeader />
      <main className="min-h-[70vh]">
        <div className="mx-auto max-w-5xl px-4 py-10 sm:px-6 lg:px-8">
          <div className="mb-8 flex items-center gap-3">
            <Link href="/cart" className="text-sm font-semibold text-primary hover:underline">
              ← Back to cart
            </Link>
            <span className="text-muted-foreground">/</span>
            <h1 className="text-2xl font-extrabold tracking-tight text-foreground">Checkout</h1>
          </div>

          <div className="grid gap-10 lg:grid-cols-[1fr_380px]">
            <CheckoutForm />
            <div className="hidden lg:block">
              <OrderSummary />
            </div>
          </div>
        </div>
      </main>
      <SiteFooter />
    </>
  )
}
