'use client'

import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import { Clock, ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react'
import type { BlogPost } from '@/lib/site-data'
import { cn } from '@/lib/utils'

const PER_PAGE = 3

interface Props {
  posts: BlogPost[]
}

export function BlogFilmstrip({ posts }: Props) {
  const totalPages = Math.ceil(posts.length / PER_PAGE)
  const [page, setPage] = useState(0)
  const [visible, setVisible] = useState(true)
  const prevPage = useRef(0)

  const slice = posts.slice(page * PER_PAGE, page * PER_PAGE + PER_PAGE)

  function goTo(next: number) {
    if (next === page) return
    // fade out → swap → fade in
    setVisible(false)
    prevPage.current = page
    setTimeout(() => {
      setPage(next)
      setVisible(true)
    }, 220)
  }

  return (
    <div className="space-y-10">
      {/* Card grid */}
      <div
        className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
        style={{
          opacity: visible ? 1 : 0,
          transform: visible ? 'translateY(0)' : 'translateY(10px)',
          transition: 'opacity 220ms ease, transform 220ms ease',
        }}
      >
        {slice.map((post) => (
          <Link
            key={post.slug}
            href={`/blog/${post.slug}`}
            className="group flex flex-col overflow-hidden rounded-2xl border border-border bg-card shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
          >
            <div className="relative aspect-[16/10] overflow-hidden">
              <img
                src={post.coverImage}
                alt={post.title}
                className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <span
                className={cn(
                  'absolute left-3 top-3 rounded-full px-2.5 py-0.5 text-xs font-semibold backdrop-blur-sm',
                  post.categoryColor,
                )}
              >
                {post.category}
              </span>
            </div>

            <div className="flex flex-1 flex-col gap-2 p-5">
              <h3 className="text-balance font-heading text-lg font-semibold leading-snug tracking-tight text-foreground">
                {post.title}
              </h3>
              <p className="line-clamp-2 flex-1 text-sm leading-relaxed text-muted-foreground">
                {post.excerpt}
              </p>
              <div className="mt-3 flex items-center justify-between border-t border-border pt-3">
                <span className="flex items-center gap-1.5 text-xs text-muted-foreground">
                  <Clock className="size-3 shrink-0" />
                  {post.readingTime} &middot; {post.date}
                </span>
                <span className="flex items-center gap-1 text-xs font-semibold text-primary opacity-0 transition-opacity group-hover:opacity-100">
                  Read <ArrowRight className="size-3 transition-transform group-hover:translate-x-0.5" />
                </span>
              </div>
            </div>
          </Link>
        ))}
      </div>

      {/* Pagination controls */}
      {totalPages > 1 && (
        <div className="flex items-center justify-center gap-2">

          {/* Prev arrow */}
          <button
            onClick={() => goTo(page - 1)}
            disabled={page === 0}
            aria-label="Previous page"
            className="flex size-10 items-center justify-center rounded-full border border-border bg-card text-foreground transition-colors hover:bg-secondary disabled:pointer-events-none disabled:opacity-30"
          >
            <ChevronLeft className="size-4" />
          </button>

          {/* Page tiles */}
          {Array.from({ length: totalPages }).map((_, i) => (
            <button
              key={i}
              onClick={() => goTo(i)}
              aria-label={`Page ${i + 1}`}
              aria-current={i === page ? 'page' : undefined}
              className={cn(
                'relative flex items-center justify-center rounded-xl font-heading text-sm font-bold tabular-nums transition-all duration-300',
                i === page
                  ? 'w-14 bg-primary text-primary-foreground shadow-md'
                  : 'size-10 border border-border bg-card text-muted-foreground hover:border-primary/40 hover:text-foreground',
              )}
            >
              {String(i + 1).padStart(2, '0')}
              {/* Active underline pip */}
              {i === page && (
                <span className="absolute -bottom-1.5 left-1/2 size-1.5 -translate-x-1/2 rounded-full bg-primary" />
              )}
            </button>
          ))}

          {/* Next arrow */}
          <button
            onClick={() => goTo(page + 1)}
            disabled={page === totalPages - 1}
            aria-label="Next page"
            className="flex size-10 items-center justify-center rounded-full border border-border bg-card text-foreground transition-colors hover:bg-secondary disabled:pointer-events-none disabled:opacity-30"
          >
            <ChevronRight className="size-4" />
          </button>

        </div>
      )}
    </div>
  )
}
