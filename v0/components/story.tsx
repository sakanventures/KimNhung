export function Story() {
  return (
    <section id="story" className="scroll-mt-20 py-16 lg:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <div className="relative">
            <div className="overflow-hidden rounded-3xl">
              <img
                src="/placeholder.svg?height=720&width=640&query=vietnamese%20family%20grocery%20store%20owners%20warm%20portrait"
                alt="The family behind Kim Nhung Superfood"
                className="h-full w-full object-cover"
              />
            </div>
            <div className="absolute -right-3 -top-3 hidden rounded-2xl bg-accent px-5 py-4 text-accent-foreground sm:block">
              <p className="font-heading text-3xl font-semibold leading-none">
                20+
              </p>
              <p className="mt-1 text-xs font-medium uppercase tracking-wide">
                years serving
                <br />
                Metro Detroit
              </p>
            </div>
          </div>

          <div>
            <span className="text-sm font-semibold uppercase tracking-[0.18em] text-primary">
              Our story
            </span>
            <h2 className="mt-3 text-balance font-heading text-4xl font-semibold tracking-tight text-foreground sm:text-5xl">
              Named for two women. Built for a whole community.
            </h2>
            <div className="mt-5 space-y-4 text-pretty leading-relaxed text-muted-foreground">
              <p>
                Kim Nhung carries the names of two women in our founding family
                &mdash; <strong className="text-foreground">Kim</strong>, the
                aunt who started it all, and{' '}
                <strong className="text-foreground">Nhung</strong>, her
                daughter. What began as a small, family-owned grocery has grown
                into one of the largest Asian markets in Metro Detroit.
              </p>
              <p>
                For over two decades we&apos;ve been a cultural anchor for the
                region&apos;s Vietnamese and Southeast Asian communities &mdash;
                the place where families find the ingredients, flavors and
                traditions of home.
              </p>
              <p>
                In April 2025 we took our biggest step yet: relocating into a
                25,000 sq ft superstore down the street, originally built for an
                Amazon Fresh. Same family, same heart &mdash; far more to
                discover.
              </p>
            </div>

            <ul className="mt-8 grid grid-cols-1 gap-3 sm:grid-cols-2">
              {[
                'Family-owned since 2002',
                'Relocated & expanded April 2025',
                'A cultural hub for the community',
                'A destination, not a corner store',
              ].map((point) => (
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
