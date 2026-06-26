import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import Link from 'next/link'
import { SiteHeader } from '@/components/site-header'
import { SiteFooter } from '@/components/site-footer'
import { AnnouncementBar } from '@/components/announcement-bar'
import { retrieveOrder } from '@/lib/medusa/checkout'
import { formatPrice } from '@/lib/utils'

type Props = { params: Promise<{ id: string }> }

export const metadata: Metadata = { title: 'Order Confirmed' }

export default async function OrderConfirmationPage({ params }: Props) {
  const { id } = await params
  const order = await retrieveOrder(id)
  if (!order) notFound()

  return (
    <>
      <AnnouncementBar />
      <SiteHeader />
      <main className="min-h-[70vh]">
        <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 lg:px-8">
          {/* Success header */}
          <div className="mb-10 text-center">
            <div className="mx-auto mb-4 flex size-16 items-center justify-center rounded-full bg-green-100 text-green-600 dark:bg-green-900/30">
              <svg className="size-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h1 className="text-3xl font-extrabold tracking-tight text-foreground">Order confirmed!</h1>
            <p className="mt-2 text-muted-foreground">
              Order <span className="font-bold text-foreground">{order.order_number}</span> — we&apos;ll
              email you when it&apos;s ready.
            </p>
          </div>

          {/* Line items */}
          <div className="rounded-2xl border border-border bg-card p-6">
            <h2 className="mb-4 text-base font-extrabold text-foreground">Your items</h2>
            <ul className="divide-y divide-border">
              {order.items.map((item) => (
                <li key={item.id} className="flex items-center gap-4 py-4">
                  <div className="size-14 shrink-0 overflow-hidden rounded-xl bg-muted">
                    {item.thumbnail && (
                      <img src={item.thumbnail} alt={item.title} className="size-full object-cover" />
                    )}
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-bold text-foreground">{item.title}</p>
                    <p className="text-xs text-muted-foreground">Qty {item.quantity}</p>
                  </div>
                  <span className="text-sm font-bold text-foreground">{formatPrice(item.subtotal)}</span>
                </li>
              ))}
            </ul>
            <div className="mt-4 flex items-center justify-between border-t border-border pt-4 font-bold text-foreground">
              <span>Total</span>
              <span>{formatPrice(order.total)}</span>
            </div>
          </div>

          <div className="mt-8 text-center">
            <Link
              href="/products"
              className="inline-flex items-center gap-1.5 rounded-full bg-primary px-6 py-3 text-sm font-bold text-primary-foreground hover:bg-primary/90"
            >
              Continue shopping
            </Link>
          </div>
        </div>
      </main>
      <SiteFooter />
    </>
  )
}
