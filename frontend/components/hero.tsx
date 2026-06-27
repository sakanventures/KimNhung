'use client'

import { ArrowRight, Fish, Croissant } from 'lucide-react'
import { useTranslation } from '@/lib/i18n'
import { getStrapiMedia } from '@/lib/utils'
import type { HeroContent, HeroIconEnum, HeroColorEnum } from '@/data/loaders'

const COLOR_MAP: Record<HeroColorEnum, { bg: string; text: string }> = {
  Red:    { bg: 'bg-primary',    text: 'text-primary-foreground' },
  Yellow: { bg: 'bg-gold',       text: 'text-gold-foreground' },
  Brown:  { bg: 'bg-tangerine',  text: 'text-tangerine-foreground' },
  Orange: { bg: 'bg-tangerine',  text: 'text-tangerine-foreground' },
  Green:  { bg: 'bg-leaf',       text: 'text-leaf-foreground' },
  Blue:   { bg: 'bg-teal',       text: 'text-teal-foreground' },
  Black:  { bg: 'bg-foreground', text: 'text-background' },
  White:  { bg: 'bg-background', text: 'text-foreground' },
}

const ICON_MAP: Record<HeroIconEnum, typeof Fish> = { Fish, Bread: Croissant }

export function Hero({ heroData }: { heroData?: HeroContent[] }) {
  const { t } = useTranslation()
  const h = t.hero

  if (heroData && heroData.length > 0) {
    const primary = heroData.find(c => c.isPrimary)
    const secondaries = heroData.filter(c => !c.isPrimary)
    const primaryColors = COLOR_MAP[primary?.Color ?? 'Red']
    const primaryImgUrl = getStrapiMedia(primary?.Image?.url ?? null)

    return (
      <section id="top" className="bg-background">
        <div className="mx-auto max-w-7xl px-4 pt-5 sm:px-6 lg:px-8">
          <div className="grid gap-4 lg:grid-cols-[1.55fr_1fr]">
            {/* Primary promo */}
            <div className={`relative overflow-hidden rounded-3xl ${primaryColors.bg} ${primaryColors.text}`}>
              {primaryImgUrl && (
                <img
                  src={primaryImgUrl}
                  alt={primary?.Image?.alternativeText ?? primary?.Title ?? ''}
                  className="absolute inset-0 size-full object-cover opacity-30"
                />
              )}
              <div className="relative flex h-full flex-col justify-center p-7 sm:p-10 lg:p-12">
                {primary?.Badge && (
                  <span className="inline-flex w-fit items-center gap-2 rounded-full bg-background/15 px-3 py-1 text-xs font-bold uppercase tracking-[0.16em] backdrop-blur">
                    {primary.Badge}
                  </span>
                )}
                <h1 className="mt-4 text-balance text-4xl font-extrabold leading-[0.98] tracking-tight sm:text-5xl lg:text-6xl">
                  {primary?.Title}
                </h1>
                {primary?.Description && (
                  <p className="mt-4 max-w-md text-pretty text-base leading-relaxed opacity-90 sm:text-lg">
                    {primary.Description}
                  </p>
                )}
                {primary?.Link && primary.Link.length > 0 && (
                  <div className="mt-7 flex flex-wrap gap-3">
                    {primary.Link.map(link => link.isButton ? (
                      <a
                        key={link.id}
                        href={link.Url}
                        target={link.isExternal ? '_blank' : undefined}
                        rel={link.isExternal ? 'noopener noreferrer' : undefined}
                        className="inline-flex items-center gap-2 rounded-full bg-background px-6 py-3 text-base font-bold text-foreground transition-transform hover:scale-[1.03]"
                      >
                        {link.Text}
                        <ArrowRight className="size-4" />
                      </a>
                    ) : (
                      <a
                        key={link.id}
                        href={link.Url}
                        target={link.isExternal ? '_blank' : undefined}
                        rel={link.isExternal ? 'noopener noreferrer' : undefined}
                        className="inline-flex items-center gap-2 rounded-full bg-background/15 px-6 py-3 text-base font-bold backdrop-blur transition-colors hover:bg-background/25"
                      >
                        {link.Text}
                      </a>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Secondary promos */}
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-1">
              {secondaries.map(card => {
                const colors = COLOR_MAP[card.Color ?? 'Yellow']
                const imgUrl = getStrapiMedia(card.Image?.url ?? null)
                const href = card.Link?.[0]?.Url ?? '#'
                const Icon = card.Icon ? ICON_MAP[card.Icon] : null
                return (
                  <a
                    key={card.id}
                    href={href}
                    className={`group relative flex items-end overflow-hidden rounded-3xl ${colors.bg} ${colors.text}`}
                  >
                    {imgUrl && (
                      <img
                        src={imgUrl}
                        alt={card.Image?.alternativeText ?? card.Title ?? ''}
                        className="absolute inset-0 size-full object-cover opacity-25"
                      />
                    )}
                    <div className="relative p-6">
                      {Icon && <Icon className="size-6" />}
                      {card.Badge && (
                        <p className="mt-3 text-xs font-bold uppercase tracking-[0.14em]">
                          {card.Badge}
                        </p>
                      )}
                      <h2 className="text-xl font-extrabold leading-tight">
                        {card.Title}
                      </h2>
                      {card.Description && (
                        <p className="mt-1 text-sm leading-snug opacity-80">
                          {card.Description}
                        </p>
                      )}
                      {card.Link?.[0] && (
                        <span className="mt-2 inline-flex items-center gap-1 text-sm font-bold underline-offset-2 group-hover:underline">
                          {card.Link[0].Text}
                          <ArrowRight className="size-4" />
                        </span>
                      )}
                    </div>
                  </a>
                )
              })}
            </div>
          </div>
        </div>
      </section>
    )
  }

  // Fallback: hardcoded i18n layout
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
