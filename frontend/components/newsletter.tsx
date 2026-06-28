'use client'

import { useState } from 'react'
import { Mail, Check } from 'lucide-react'
import { useTranslation } from '@/lib/i18n'
import { getStrapiMedia } from '@/lib/utils'
import type { NewsletterBlock } from '@/data/loaders'

interface Props {
  data?: NewsletterBlock | null
}

export function Newsletter({ data }: Props) {
  const [email, setEmail] = useState('')
  const [submitted, setSubmitted] = useState(false)
  const { t } = useTranslation()
  const n = t.newsletter

  const info = data?.Info?.[0]
  const badge = info?.Badge ?? n.eyebrow
  const title = info?.Title ?? n.title
  const description = info?.Description ?? n.body
  const disclaimer = data?.Text?.[0]?.Text ?? n.disclaimer
  const imageUrl = data?.Image?.url ? getStrapiMedia(data.Image.url) : null

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!email) return
    setSubmitted(true)
  }

  return (
    <section id="newsletter" className="scroll-mt-20 py-16 lg:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="overflow-hidden rounded-3xl border border-border bg-card">
          <div className="grid gap-0 lg:grid-cols-2">
            <div className="flex flex-col justify-center p-8 sm:p-12">
              <span className="inline-flex w-fit items-center gap-2 rounded-full bg-leaf/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.15em] text-leaf">
                <Mail className="size-3.5" />
                {badge}
              </span>
              <h2 className="mt-4 text-balance font-heading text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
                {title}
              </h2>
              <p className="mt-3 text-pretty leading-relaxed text-muted-foreground">
                {description}
              </p>

              {submitted ? (
                <div className="mt-6 flex items-center gap-3 rounded-2xl border border-leaf/30 bg-leaf/10 px-5 py-4 text-leaf">
                  <Check className="size-5 shrink-0" />
                  <p className="text-sm font-medium">{n.success}</p>
                </div>
              ) : (
                <form
                  onSubmit={handleSubmit}
                  className="mt-6 flex flex-col gap-3 sm:flex-row"
                >
                  <label htmlFor="email" className="sr-only">
                    {n.emailLabel}
                  </label>
                  <input
                    id="email"
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder={n.placeholder}
                    className="flex-1 rounded-full border border-border bg-background px-5 py-3 text-base text-foreground outline-none transition-colors focus:border-primary focus:ring-2 focus:ring-primary/20"
                  />
                  <button
                    type="submit"
                    className="rounded-full bg-primary px-6 py-3 text-base font-semibold text-primary-foreground transition-transform hover:scale-[1.03]"
                  >
                    {n.subscribe}
                  </button>
                </form>
              )}
              <p className="mt-3 text-xs text-muted-foreground">
                {disclaimer}
              </p>
            </div>

            <div className="relative min-h-64 lg:min-h-full">
              <img
                src={imageUrl ?? '/placeholder.svg?height=640&width=640&query=colorful%20asian%20groceries%20snacks%20flat%20lay%20vibrant'}
                alt={data?.Image?.alternativeText ?? 'A colorful spread of Asian groceries and snacks'}
                className="absolute inset-0 h-full w-full object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
