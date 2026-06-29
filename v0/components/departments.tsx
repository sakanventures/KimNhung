import { DEPARTMENTS } from '@/lib/site-data'

const DEPT_COLORS = [
  'bg-primary/10 text-primary',
  'bg-tangerine/15 text-tangerine',
  'bg-gold/20 text-gold-foreground',
  'bg-leaf/15 text-leaf',
  'bg-berry/12 text-berry',
  'bg-teal/15 text-teal',
]

export function Departments() {
  return (
    <section id="departments" className="scroll-mt-20 py-16 lg:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <div className="mb-12 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <span className="text-sm font-semibold uppercase tracking-[0.18em] text-primary">
              Store map
            </span>
            <h2 className="mt-2 text-balance font-heading text-4xl font-semibold tracking-tight text-foreground sm:text-5xl">
              Know before you go.
            </h2>
          </div>
          <p className="max-w-sm text-pretty text-base leading-relaxed text-muted-foreground">
            Six fully stocked departments. One very big store.
            Here&apos;s exactly what&apos;s waiting for you.
          </p>
        </div>

        {/* Directory rows */}
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {DEPARTMENTS.map((dept, i) => (
            <div
              key={dept.id}
              className="group flex items-center gap-5 rounded-2xl border border-border bg-card p-5 transition-all hover:-translate-y-0.5 hover:shadow-lg"
            >
              {/* Number badge */}
              <span
                className={`flex size-12 shrink-0 items-center justify-center rounded-xl text-lg font-black ${DEPT_COLORS[i % DEPT_COLORS.length]}`}
              >
                0{i + 1}
              </span>

              {/* Text */}
              <div className="min-w-0">
                <p className="text-xs font-semibold uppercase tracking-[0.15em] text-muted-foreground">
                  {dept.highlight}
                </p>
                <h3 className="mt-0.5 truncate font-heading text-lg font-semibold tracking-tight text-foreground">
                  {dept.name}
                </h3>
              </div>

              {/* Thumbnail */}
              <div className="ml-auto size-14 shrink-0 overflow-hidden rounded-xl">
                <img
                  src={dept.image}
                  alt={dept.name}
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
