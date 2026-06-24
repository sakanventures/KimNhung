'use client'

import { useTranslation } from '@/lib/i18n'

export function Story() {
  const { t } = useTranslation()
  const s = t.story

  return (
    <section id="story" className="scroll-mt-20 py-16 lg:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <div className="relative">
            <div className="overflow-hidden rounded-3xl">
              <img
                src="https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&w=640&q=80"
                alt="The family behind Kim Nhung Superfood"
                className="h-full w-full object-cover"
              />
            </div>
            <div className="absolute -right-3 -top-3 hidden rounded-2xl bg-accent px-5 py-4 text-accent-foreground sm:block">
              <p className="font-heading text-3xl font-semibold leading-none">
                {s.statNumber}
              </p>
              <p className="mt-1 text-xs font-medium uppercase tracking-wide">
                {s.statLabel[0]}
                <br />
                {s.statLabel[1]}
              </p>
            </div>
          </div>

          <div>
            <span className="text-sm font-semibold uppercase tracking-[0.18em] text-primary">
              {s.eyebrow}
            </span>
            <h2 className="mt-3 text-balance font-heading text-4xl font-semibold tracking-tight text-foreground sm:text-5xl">
              {s.title}
            </h2>
            <div className="mt-5 space-y-4 text-pretty leading-relaxed text-muted-foreground">
              <p>
                {s.p1Start}
                <strong className="text-foreground">{s.p1Kim}</strong>
                {s.p1Mid}
                <strong className="text-foreground">{s.p1Nhung}</strong>
                {s.p1End}
              </p>
              <p>{s.p2}</p>
              <p>{s.p3}</p>
            </div>

            <ul className="mt-8 grid grid-cols-1 gap-3 sm:grid-cols-2">
              {s.bullets.map((point) => (
                <li
                  key={point}
                  className="flex items-start gap-2 text-sm font-medium text-foreground"
                >
                  <span className="mt-1 size-1.5 shrink-0 rounded-full bg-primary" />
                  {point}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  )
}
