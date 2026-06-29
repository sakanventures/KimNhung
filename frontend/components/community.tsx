'use client'

import Link from 'next/link'
import { useTranslation } from '@/lib/i18n'
import { getStrapiMedia } from '@/lib/utils'
import type { CommunityPost } from '@/data/loaders'

interface Props {
  posts: CommunityPost[]
}

export function Community({ posts }: Props) {
  const { t } = useTranslation()
  const c = t.community

  return (
    <section
      id="community"
      className="scroll-mt-20 bg-secondary/40 py-16 lg:py-24"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl">
          <span className="text-sm font-semibold uppercase tracking-[0.18em] text-primary">
            {c.eyebrow}
          </span>
          <h2 className="mt-3 text-balance font-heading text-4xl font-semibold tracking-tight text-foreground sm:text-5xl">
            {c.title}
          </h2>
          <p className="mt-4 text-pretty leading-relaxed text-muted-foreground">
            {c.body}
          </p>
        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {posts.slice(0, 3).map((post) => {
            const imageUrl = getStrapiMedia(post.Thumbnail?.url ?? null) ?? '/placeholder.svg'
            return (
              <Link
                key={post.id}
                href={`/community/${post.Slug}`}
                className="group overflow-hidden rounded-3xl border border-border bg-card transition-shadow hover:shadow-lg"
              >
                <div className="aspect-[4/3] overflow-hidden">
                  <img
                    src={imageUrl}
                    alt={post.Thumbnail?.alternativeText ?? `${post.Title} ${c.altSuffix}`}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
                <div className="p-6">
                  <h3 className="font-heading text-2xl font-semibold text-foreground">
                    {post.Title}
                  </h3>
                  {post.Description && (
                    <p className="mt-2 text-pretty leading-relaxed text-muted-foreground">
                      {post.Description}
                    </p>
                  )}
                </div>
              </Link>
            )
          })}
        </div>
      </div>
    </section>
  )
}
