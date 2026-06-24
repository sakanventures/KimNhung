import { ArrowRight, Fish, Croissant } from 'lucide-react'

export function Hero() {
  return (
    <section id="top" className="bg-background">
      <div className="mx-auto max-w-7xl px-4 pt-5 sm:px-6 lg:px-8">
        <div className="grid gap-4 lg:grid-cols-[1.55fr_1fr]">
          {/* Primary promo */}
          <div className="relative overflow-hidden rounded-3xl bg-primary text-primary-foreground">
            <img
              src="/placeholder.svg?height=720&width=1100&query=vibrant%20asian%20supermarket%20fresh%20produce%20seafood%20wide%20interior"
              alt="Inside the Kim Nhung Superfood superstore"
              className="absolute inset-0 size-full object-cover opacity-30"
            />
            <div className="relative flex h-full flex-col justify-center p-7 sm:p-10 lg:p-12">
              <span className="inline-flex w-fit items-center gap-2 rounded-full bg-background/15 px-3 py-1 text-xs font-bold uppercase tracking-[0.16em] backdrop-blur">
                <span className="size-1.5 rounded-full bg-gold" />
                Now open in Madison Heights
              </span>
              <h1 className="mt-4 text-balance text-4xl font-extrabold leading-[0.98] tracking-tight sm:text-5xl lg:text-6xl">
                Metro Detroit&apos;s Asian superstore
              </h1>
              <p className="mt-4 max-w-md text-pretty text-base leading-relaxed text-primary-foreground/90 sm:text-lg">
                25,000 sq ft of live seafood, fresh-baked bánh mì, imported
                groceries, K-beauty &amp; more — all under one roof.
              </p>
              <div className="mt-7 flex flex-wrap gap-3">
                <a
                  href="#specials"
                  className="inline-flex items-center gap-2 rounded-full bg-background px-6 py-3 text-base font-bold text-foreground transition-transform hover:scale-[1.03]"
                >
                  Shop weekly deals
                  <ArrowRight className="size-4" />
                </a>
                <a
                  href="#shop"
                  className="inline-flex items-center gap-2 rounded-full bg-background/15 px-6 py-3 text-base font-bold text-primary-foreground backdrop-blur transition-colors hover:bg-background/25"
                >
                  Browse departments
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
                src="/placeholder.svg?height=400&width=560&query=fresh%20live%20seafood%20fish%20on%20ice%20market"
                alt="Live seafood on ice"
                className="absolute inset-0 size-full object-cover opacity-25"
              />
              <div className="relative p-6">
                <Fish className="size-6" />
                <p className="mt-3 text-xs font-bold uppercase tracking-[0.14em]">
                  Live tuna cutting
                </p>
                <h2 className="text-xl font-extrabold leading-tight">
                  Fresh from the tank, every weekend
                </h2>
                <span className="mt-2 inline-flex items-center gap-1 text-sm font-bold underline-offset-2 group-hover:underline">
                  See the seafood market
                  <ArrowRight className="size-4" />
                </span>
              </div>
            </a>
            <a
              href="#departments"
              className="group relative flex items-end overflow-hidden rounded-3xl bg-tangerine text-tangerine-foreground"
            >
              <img
                src="/placeholder.svg?height=400&width=560&query=fresh%20banh%20mi%20french%20bread%20asian%20bakery"
                alt="Freshly baked bánh mì"
                className="absolute inset-0 size-full object-cover opacity-25"
              />
              <div className="relative p-6">
                <Croissant className="size-6" />
                <p className="mt-3 text-xs font-bold uppercase tracking-[0.14em]">
                  Bakery
                </p>
                <h2 className="text-xl font-extrabold leading-tight">
                  Bánh mì &amp; French bread baked daily
                </h2>
                <span className="mt-2 inline-flex items-center gap-1 text-sm font-bold underline-offset-2 group-hover:underline">
                  Visit the bakery
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
