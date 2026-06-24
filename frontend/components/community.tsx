import { FESTIVALS } from '@/lib/site-data'

export function Community() {
  return (
    <section
      id="community"
      className="scroll-mt-20 bg-secondary/40 py-16 lg:py-24"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl">
          <span className="text-sm font-semibold uppercase tracking-[0.18em] text-primary">
            Community & culture
          </span>
          <h2 className="mt-3 text-balance font-heading text-4xl font-semibold tracking-tight text-foreground sm:text-5xl">
            More than a market &mdash; a gathering place
          </h2>
          <p className="mt-4 text-pretty leading-relaxed text-muted-foreground">
            Throughout the year, the store comes alive with festivals,
            tastings and traditions that bring the community together.
          </p>
        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {FESTIVALS.map((f) => (
            <article
              key={f.name}
              className="group overflow-hidden rounded-3xl border border-border bg-card"
            >
              <div className="aspect-[4/3] overflow-hidden">
                <img
                  src={f.image || '/placeholder.svg'}
                  alt={`${f.name} celebration at Kim Nhung Superfood`}
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>
              <div className="p-6">
                <p className="text-xs font-semibold uppercase tracking-[0.15em] text-leaf">
                  {f.season}
                </p>
                <h3 className="mt-2 font-heading text-2xl font-semibold text-foreground">
                  {f.name}
                </h3>
                <p className="mt-2 text-pretty leading-relaxed text-muted-foreground">
                  {f.blurb}
                </p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
