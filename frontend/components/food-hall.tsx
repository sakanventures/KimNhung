'use client'

import { UtensilsCrossed } from 'lucide-react'
import { VENDORS } from '@/lib/site-data'
import { useTranslation } from '@/lib/i18n'

export function FoodHall() {
  const { t } = useTranslation()
  const f = t.foodHall

  return (
    <section
      id="food-hall"
      className="scroll-mt-20 bg-primary py-16 text-primary-foreground lg:py-24"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-5 text-center">
          <span className="mx-auto inline-flex items-center gap-2 rounded-full border border-primary-foreground/30 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em]">
            <UtensilsCrossed className="size-3.5" />
            {f.eyebrow}
          </span>
          <h2 className="mx-auto max-w-3xl text-balance font-heading text-4xl font-semibold tracking-tight sm:text-5xl lg:text-6xl">
            {f.title}
          </h2>
          <p className="mx-auto max-w-2xl text-pretty text-lg leading-relaxed text-primary-foreground/85">
            {f.body}
          </p>
        </div>

        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {VENDORS.map((v, i) => {
            const text = f.vendors[i]
            return (
              <div
                key={v.name}
                className="rounded-2xl border border-primary-foreground/20 bg-primary-foreground/5 p-6 backdrop-blur-sm"
              >
                <p className="text-xs font-semibold uppercase tracking-[0.15em] text-accent">
                  {text.cuisine}
                </p>
                <h3 className="mt-2 font-heading text-2xl font-semibold">
                  {v.name}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-primary-foreground/80">
                  {text.note}
                </p>
              </div>
            )
          })}
        </div>

        <p className="mt-10 text-center text-sm text-primary-foreground/70">
          {f.vendorNote}{' '}
          <a href="#newsletter" className="font-semibold text-accent underline underline-offset-4">
            {f.joinList}
          </a>
          .
        </p>
      </div>
    </section>
  )
}
