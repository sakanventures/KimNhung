import { UtensilsCrossed } from 'lucide-react'
import { VENDORS } from '@/lib/site-data'

export function FoodHall() {
  return (
    <section
      id="food-hall"
      className="scroll-mt-20 bg-primary py-16 text-primary-foreground lg:py-24"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-5 text-center">
          <span className="mx-auto inline-flex items-center gap-2 rounded-full border border-primary-foreground/30 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em]">
            <UtensilsCrossed className="size-3.5" />
            Coming Soon
          </span>
          <h2 className="mx-auto max-w-3xl text-balance font-heading text-4xl font-semibold tracking-tight sm:text-5xl lg:text-6xl">
            The District Eatery
          </h2>
          <p className="mx-auto max-w-2xl text-pretty text-lg leading-relaxed text-primary-foreground/85">
            A 10,000 sq ft indoor food hall bringing together independent food
            stalls under one roof. Come shop, then stay to eat your way across
            Southeast Asia and beyond.
          </p>
        </div>

        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {VENDORS.map((v) => (
            <div
              key={v.name}
              className="rounded-2xl border border-primary-foreground/20 bg-primary-foreground/5 p-6 backdrop-blur-sm"
            >
              <p className="text-xs font-semibold uppercase tracking-[0.15em] text-accent">
                {v.cuisine}
              </p>
              <h3 className="mt-2 font-heading text-2xl font-semibold">
                {v.name}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-primary-foreground/80">
                {v.note}
              </p>
            </div>
          ))}
        </div>

        <p className="mt-10 text-center text-sm text-primary-foreground/70">
          Vendor lineup subject to change. Want to be a vendor or get opening
          updates?{' '}
          <a href="#newsletter" className="font-semibold text-accent underline underline-offset-4">
            Join the list
          </a>
          .
        </p>
      </div>
    </section>
  )
}
