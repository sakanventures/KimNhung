'use client'

import { ArrowRight } from 'lucide-react'
import { SPECIALS } from '@/lib/site-data'
import { useTranslation } from '@/lib/i18n'

export function WeeklySpecials() {
  const { t } = useTranslation()
  const s = t.specials

  return (
    <section id="specials" className="scroll-mt-28 bg-muted/50 py-14 lg:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
          <div>
            <span className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-3 py-1 text-xs font-bold uppercase tracking-[0.14em] text-primary">
              {s.eyebrow}
            </span>
            <h2 className="mt-3 text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl">
              {s.title}
            </h2>
            <p className="mt-2 max-w-lg text-pretty text-sm leading-relaxed text-muted-foreground">
              {s.body}
            </p>
          </div>
          <a
            href="#newsletter"
            className="inline-flex items-center gap-2 rounded-full bg-primary px-5 py-2.5 text-sm font-bold text-primary-foreground transition-colors hover:bg-primary/90"
          >
            {s.cta}
            <ArrowRight className="size-4" />
          </a>
        </div>

        <ul className="grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-3 lg:grid-cols-6">
          {SPECIALS.map((item, i) => {
            const text = s.items[i]
            return (
              <li
                key={item.title}
                className="group flex flex-col overflow-hidden rounded-2xl border border-border bg-card transition-shadow hover:shadow-md"
              >
                <div className="relative aspect-square overflow-hidden bg-muted">
                  <span className="absolute left-2 top-2 z-10 rounded-full bg-primary px-2 py-0.5 text-[0.65rem] font-extrabold uppercase tracking-wide text-primary-foreground">
                    {s.saleBadge}
                  </span>
                  <img
                    src={item.image || '/placeholder.svg'}
                    alt={text.title}
                    className="size-full object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                </div>
                <div className="flex flex-1 flex-col p-3">
                  <span className="text-[0.65rem] font-bold uppercase tracking-wide text-leaf">
                    {text.tag}
                  </span>
                  <h3 className="mt-1 text-sm font-bold leading-tight text-foreground">
                    {text.title}
                  </h3>
                  <p className="mt-1 line-clamp-2 text-xs leading-snug text-muted-foreground">
                    {text.detail}
                  </p>
                  <div className="mt-auto flex items-baseline gap-1.5 pt-3">
                    <span className="text-xl font-extrabold text-primary">
                      {item.price}
                    </span>
                    <span className="text-xs font-medium text-muted-foreground">
                      {item.unit}
                    </span>
                  </div>
                  <span className="text-xs font-medium text-muted-foreground line-through">
                    {s.was} {item.was}
                  </span>
                </div>
              </li>
            )
          })}
        </ul>
      </div>
    </section>
  )
}
