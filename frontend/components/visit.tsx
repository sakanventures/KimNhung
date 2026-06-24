'use client'

import { MapPin, Clock, Phone, Navigation } from 'lucide-react'
import { STORE } from '@/lib/site-data'
import { useTranslation } from '@/lib/i18n'

export function Visit() {
  const { t } = useTranslation()
  const v = t.visit

  const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
    STORE.mapsQuery,
  )}`
  const embedUrl = `https://www.google.com/maps?q=${encodeURIComponent(
    STORE.mapsQuery,
  )}&output=embed`

  return (
    <section id="visit" className="scroll-mt-20 py-16 lg:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-stretch">
          <div className="flex flex-col">
            <span className="text-sm font-semibold uppercase tracking-[0.18em] text-primary">
              {v.eyebrow}
            </span>
            <h2 className="mt-3 text-balance font-heading text-4xl font-semibold tracking-tight text-foreground sm:text-5xl">
              {v.title}
            </h2>
            <p className="mt-4 text-pretty leading-relaxed text-muted-foreground">
              {v.body}
            </p>

            <dl className="mt-8 space-y-5">
              <div className="flex items-start gap-4">
                <span className="flex size-11 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
                  <MapPin className="size-5" />
                </span>
                <div>
                  <dt className="text-sm font-semibold uppercase tracking-wide text-muted-foreground">
                    {v.address}
                  </dt>
                  <dd className="font-heading text-lg font-semibold text-foreground">
                    {STORE.address}
                    <br />
                    {STORE.city}, {STORE.state} {STORE.zip}
                  </dd>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <span className="flex size-11 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
                  <Clock className="size-5" />
                </span>
                <div>
                  <dt className="text-sm font-semibold uppercase tracking-wide text-muted-foreground">
                    {v.hours}
                  </dt>
                  <dd className="font-heading text-lg font-semibold text-foreground">
                    {STORE.hours}
                  </dd>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <span className="flex size-11 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
                  <Phone className="size-5" />
                </span>
                <div>
                  <dt className="text-sm font-semibold uppercase tracking-wide text-muted-foreground">
                    {v.phone}
                  </dt>
                  <dd className="font-heading text-lg font-semibold text-foreground">
                    {STORE.phone}
                  </dd>
                </div>
              </div>
            </dl>

            <a
              href={mapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-8 inline-flex w-fit items-center gap-2 rounded-full bg-primary px-6 py-3 text-base font-semibold text-primary-foreground transition-transform hover:scale-[1.03]"
            >
              <Navigation className="size-4" />
              {v.directions}
            </a>
          </div>

          <div className="min-h-80 overflow-hidden rounded-3xl border border-border">
            <iframe
              title={`${v.mapTitle} ${STORE.name}`}
              src={embedUrl}
              className="h-full min-h-80 w-full"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>
      </div>
    </section>
  )
}
