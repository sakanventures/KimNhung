import { DEPARTMENTS } from '@/lib/site-data'
import { getStrapiMedia } from '@/lib/utils'
import type { MapBlock } from '@/data/loaders'

const DEPT_COLORS = [
  'bg-primary/10 text-primary',
  'bg-tangerine/15 text-tangerine',
  'bg-gold/20 text-gold-foreground',
  'bg-leaf/15 text-leaf',
  'bg-berry/12 text-berry',
  'bg-teal/15 text-teal',
]

export function Departments({ mapData }: { mapData?: MapBlock }) {
  const map = mapData?.Map
  const aisles = map?.Aisle ?? []

  const badge = map?.Badge ?? 'Store map'
  const title = map?.Title ?? 'Know before you go.'
  const description = map?.Description ?? 'Six fully stocked departments. One very big store. Here\'s exactly what\'s waiting for you.'

  const items =
    aisles.length > 0
      ? aisles.map((aisle, i) => ({
          id: String(aisle.id),
          name: aisle.Title ?? DEPARTMENTS[i]?.name ?? '',
          highlight: aisle.Description ?? DEPARTMENTS[i]?.highlight ?? '',
          image: getStrapiMedia(aisle.Image?.url ?? null) ?? DEPARTMENTS[i]?.image ?? '/placeholder.svg',
        }))
      : DEPARTMENTS.map((d) => ({ id: d.id, name: d.name, highlight: d.highlight, image: d.image }))

  return (
    <section id="departments" className="scroll-mt-20 py-16 lg:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <div className="mb-12 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <span className="text-sm font-semibold uppercase tracking-[0.18em] text-primary">
              {badge}
            </span>
            <h2 className="mt-2 text-balance font-heading text-4xl font-semibold tracking-tight text-foreground sm:text-5xl">
              {title}
            </h2>
          </div>
          <p className="max-w-sm text-pretty text-base leading-relaxed text-muted-foreground">
            {description}
          </p>
        </div>

        {/* Directory rows */}
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((item, i) => (
            <div
              key={item.id}
              className="group flex items-center gap-5 rounded-2xl border border-border bg-card px-6 py-7 transition-all hover:-translate-y-0.5 hover:shadow-lg"
            >
              {/* Number badge */}
              <span
                className={`flex size-14 shrink-0 items-center justify-center rounded-full text-lg font-black ${DEPT_COLORS[i % DEPT_COLORS.length]}`}
              >
                0{i + 1}
              </span>

              {/* Text */}
              <div className="min-w-0">
                <p className="text-xs font-semibold uppercase tracking-[0.15em] text-muted-foreground">
                  {item.highlight}
                </p>
                <h3 className="mt-0.5 truncate font-heading text-lg font-semibold tracking-tight text-foreground">
                  {item.name}
                </h3>
              </div>

              {/* Thumbnail */}
              <div className="ml-auto size-16 shrink-0 overflow-hidden rounded-xl">
                <img
                  src={item.image}
                  alt={item.name}
                  className="size-full object-cover transition-transform duration-300 group-hover:scale-110"
                />
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  )
}
