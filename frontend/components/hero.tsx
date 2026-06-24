'use client'

import { ArrowRight, Fish, Croissant } from 'lucide-react'
import { useTranslation } from '@/lib/i18n'

export function Hero() {
  const { t } = useTranslation()
  const h = t.hero

  return (
    <section id="top" className="bg-background">
      <div className="mx-auto max-w-7xl px-4 pt-5 sm:px-6 lg:px-8">
        <div className="grid gap-4 lg:grid-cols-[1.55fr_1fr]">
          {/* Primary promo */}
          <div className="relative overflow-hidden rounded-3xl bg-primary text-primary-foreground">
            <img
              src="https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=1100&q=80"
              alt="Inside the Kim Nhung Superfood superstore"
              className="absolute inset-0 size-full object-cover opacity-30"
            />
            <div className="relative flex h-full flex-col justify-center p-7 sm:p-10 lg:p-12">
              <span className="inline-flex w-fit items-center gap-2 rounded-full bg-background/15 px-3 py-1 text-xs font-bold uppercase tracking-[0.16em] backdrop-blur">
                <span className="size-1.5 rounded-full bg-gold" />
                {h.badge}
              </span>
              <h1 className="mt-4 text-balance text-4xl font-extrabold leading-[0.98] tracking-tight sm:text-5xl lg:text-6xl">
                {h.headline}
              </h1>
              <p className="mt-4 max-w-md text-pretty text-base leading-relaxed text-primary-foreground/90 sm:text-lg">
                {h.body}
              </p>
              <div className="mt-7 flex flex-wrap gap-3">
                <a
                  href="#specials"
                  className="inline-flex items-center gap-2 rounded-full bg-background px-6 py-3 text-base font-bold text-foreground transition-transform hover:scale-[1.03]"
                >
                  {h.ctaDeals}
                  <ArrowRight className="size-4" />
                </a>
                <a
                  href="#shop"
                  className="inline-flex items-center gap-2 rounded-full bg-background/15 px-6 py-3 text-base font-bold text-primary-foreground backdrop-blur transition-colors hover:bg-background/25"
                >
                  {h.ctaDepts}
                </a>
              </div>
            </div>
          </div>

          {/* Secondary promos */}
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-1">
            <a
              href="#specials"
              className="group relative flex items-end overflow-hidden rounded-3xl bg-gold text-gold-foreground"
            >
              <img
                src="https://images.unsplash.com/photo-1580476262798-bddd9f4b7369?auto=format&fit=crop&w=560&q=80"
                alt="Live seafood on ice"
                className="absolute inset-0 size-full object-cover opacity-25"
              />
              <div className="relative p-6">
                <Fish className="size-6" />
                <p className="mt-3 text-xs font-bold uppercase tracking-[0.14em]">
                  {h.seafoodLabel}
                </p>
                <h2 className="text-xl font-extrabold leading-tight">
                  {h.seafoodTitle}
                </h2>
                <span className="mt-2 inline-flex items-center gap-1 text-sm font-bold underline-offset-2 group-hover:underline">
                  {h.seafoodCta}
                  <ArrowRight className="size-4" />
                </span>
              </div>
            </a>
            <a
              href="#departments"
              className="group relative flex items-end overflow-hidden rounded-3xl bg-tangerine text-tangerine-foreground"
            >
              <img
                src="https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=560&q=80"
                alt="Freshly baked bánh mì"
                className="absolute inset-0 size-full object-cover opacity-25"
              />
              <div className="relative p-6">
                <Croissant className="size-6" />
                <p className="mt-3 text-xs font-bold uppercase tracking-[0.14em]">
                  {h.bakeryLabel}
                </p>
                <h2 className="text-xl font-extrabold leading-tight">
                  {h.bakeryTitle}
                </h2>
                <span className="mt-2 inline-flex items-center gap-1 text-sm font-bold underline-offset-2 group-hover:underline">
                  {h.bakeryCta}
                  <ArrowRight className="size-4" />
                </span>
              </div>
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
