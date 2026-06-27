'use client'

import { Fragment } from 'react'
import { useTranslation } from '@/lib/i18n'
import { getStrapiMedia } from '@/lib/utils'
import type { StoryBlock } from '@/data/loaders'

type Block = { type: string; children?: InlineChild[] }
type InlineChild = { type?: string; text?: string; bold?: boolean; italic?: boolean }

function RichParagraph({ block }: { block: Block }) {
  return (
    <p>
      {block.children?.map((child, i) => {
        if (child.bold) return <strong key={i} className="text-foreground">{child.text}</strong>
        if (child.italic) return <em key={i}>{child.text}</em>
        return <Fragment key={i}>{child.text}</Fragment>
      })}
    </p>
  )
}

export function Story({ storyData }: { storyData?: StoryBlock }) {
  const { t } = useTranslation()
  const s = t.story

  const entry = storyData?.Story?.[0]
  const bulletin = storyData?.Bulletin?.[0]

  const badge = entry?.Badge ?? s.eyebrow
  const title = entry?.Title ?? s.title
  const imgUrl = getStrapiMedia(entry?.Image?.url ?? null)
  const imgCaption = entry?.Image?.caption ?? null
  const blocks = (entry?.RichText ?? []).flatMap(
    (rt) => (rt.RichText as Block[]) ?? []
  )
  const bullets = bulletin?.Text?.map((t) => t.Text).filter(Boolean) as string[] | undefined

  // Split caption: first word = big number, remaining words split into two label lines
  // e.g. "20+ Years Serving Metro Detroit" → "20+" | "Years Serving" | "Metro Detroit"
  const captionWords = imgCaption ? imgCaption.split(' ') : []
  const statNumber = captionWords[0] ?? null
  const labelWords = captionWords.slice(1)
  const mid = Math.ceil(labelWords.length / 2)
  const statLine1 = labelWords.slice(0, mid).join(' ')
  const statLine2 = labelWords.slice(mid).join(' ')

  return (
    <section id="story" className="scroll-mt-20 py-16 lg:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <div className="relative">
            <div className="overflow-hidden rounded-3xl">
              <img
                src={imgUrl ?? 'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&w=640&q=80'}
                alt={entry?.Image?.alternativeText ?? 'The family behind Kim Nhung Superfood'}
                className="h-full w-full object-cover"
              />
            </div>
            {(imgCaption || !entry) && (
              <div className="absolute -right-3 -top-3 hidden w-fit rounded-2xl bg-accent px-5 py-4 text-accent-foreground sm:block">
                <p className="font-heading text-3xl font-semibold leading-none">
                  {statNumber ?? s.statNumber}
                </p>
                <p className="mt-1 whitespace-nowrap text-xs font-medium uppercase tracking-wide">
                  {statLine1 || s.statLabel[0]}
                  <br />
                  {statLine2 || s.statLabel[1]}
                </p>
              </div>
            )}
          </div>

          <div>
            <span className="text-sm font-semibold uppercase tracking-[0.18em] text-primary">
              {badge}
            </span>
            <h2 className="mt-3 text-balance font-heading text-4xl font-semibold tracking-tight text-foreground sm:text-5xl">
              {title}
            </h2>

            <div className="mt-5 space-y-4 text-pretty leading-relaxed text-muted-foreground">
              {blocks.length > 0 ? (
                blocks.map((block, i) => <RichParagraph key={i} block={block} />)
              ) : (
                <>
                  <p>
                    {s.p1Start}
                    <strong className="text-foreground">{s.p1Kim}</strong>
                    {s.p1Mid}
                    <strong className="text-foreground">{s.p1Nhung}</strong>
                    {s.p1End}
                  </p>
                  <p>{s.p2}</p>
                  <p>{s.p3}</p>
                </>
              )}
            </div>

            <ul className="mt-8 grid grid-cols-1 gap-3 sm:grid-cols-2">
              {(bullets ?? s.bullets).map((point) => (
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
