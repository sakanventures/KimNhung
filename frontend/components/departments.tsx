import { DEPARTMENTS } from '@/lib/site-data'

export function Departments() {
  return (
    <section id="departments" className="scroll-mt-20 bg-secondary/40 py-16 lg:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div className="max-w-2xl">
            <span className="text-sm font-semibold uppercase tracking-[0.18em] text-primary">
              Inside the store
            </span>
            <h2 className="mt-3 text-balance font-heading text-4xl font-semibold tracking-tight text-foreground sm:text-5xl">
              Six worlds under one roof
            </h2>
          </div>
          <p className="max-w-md text-pretty leading-relaxed text-muted-foreground">
            From tanks of live seafood to a wall of K-beauty, every department
            is built to be explored. Here&apos;s what you&apos;ll find when you
            walk through the doors.
          </p>
        </div>

        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {DEPARTMENTS.map((dept) => (
            <article
              key={dept.id}
              className="group flex flex-col overflow-hidden rounded-3xl border border-border bg-card transition-shadow hover:shadow-xl"
            >
              <div className="relative aspect-[4/5] overflow-hidden">
                <img
                  src={dept.image || '/placeholder.svg'}
                  alt={`${dept.name} at Kim Nhung Superfood`}
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <span className="absolute left-4 top-4 rounded-full bg-accent px-3 py-1 text-xs font-semibold text-accent-foreground">
                  {dept.highlight}
                </span>
              </div>
              <div className="flex flex-1 flex-col p-6">
                <h3 className="font-heading text-2xl font-semibold tracking-tight text-foreground">
                  {dept.name}
                </h3>
                <p className="mt-2 text-pretty leading-relaxed text-muted-foreground">
                  {dept.blurb}
                </p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
