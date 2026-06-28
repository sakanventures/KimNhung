import Link from 'next/link'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { cn } from '@/lib/utils'

interface Props {
  page: number
  pageCount: number
}

const MAX_VISIBLE = 5

export function Pagination({ page, pageCount }: Props) {
  if (pageCount <= 1) return null

  let start = Math.max(1, page - Math.floor(MAX_VISIBLE / 2))
  const end = Math.min(pageCount, start + MAX_VISIBLE - 1)
  if (end - start < MAX_VISIBLE - 1) start = Math.max(1, end - MAX_VISIBLE + 1)
  const pages = Array.from({ length: end - start + 1 }, (_, i) => start + i)

  const arrowBase =
    'flex size-10 items-center justify-center rounded-full border border-primary/25 bg-card text-foreground transition-colors'

  return (
    <div className="flex items-center justify-center gap-2 pt-12">
      {page > 1 ? (
        <Link href={`?page=${page - 1}`} aria-label="Previous page" className={cn(arrowBase, 'hover:bg-secondary')}>
          <ChevronLeft className="size-4" />
        </Link>
      ) : (
        <span className={cn(arrowBase, 'pointer-events-none opacity-30')}>
          <ChevronLeft className="size-4" />
        </span>
      )}

      {pages.map((p) => (
        <Link
          key={p}
          href={`?page=${p}`}
          aria-label={`Page ${p}`}
          aria-current={p === page ? 'page' : undefined}
          className={cn(
            'relative flex items-center justify-center font-heading text-sm font-bold tabular-nums transition-all duration-300',
            p === page
              ? 'h-6 w-14 rounded-full bg-primary text-primary-foreground shadow-md'
              : 'size-10 rounded-full border border-primary/25 bg-card text-foreground hover:border-primary/50',
          )}
        >
          {String(p).padStart(2, '0')}
          {p === page && (
            <span className="absolute -bottom-1.5 left-1/2 size-1.5 -translate-x-1/2 rounded-full bg-primary" />
          )}
        </Link>
      ))}

      {page < pageCount ? (
        <Link href={`?page=${page + 1}`} aria-label="Next page" className={cn(arrowBase, 'hover:bg-secondary')}>
          <ChevronRight className="size-4" />
        </Link>
      ) : (
        <span className={cn(arrowBase, 'pointer-events-none opacity-30')}>
          <ChevronRight className="size-4" />
        </span>
      )}
    </div>
  )
}
