import { DEPARTMENTS } from '@/lib/site-data'

const CIRCLE_TINTS = [
  'bg-primary/10 ring-primary/15 group-hover:ring-primary/30',
  'bg-tangerine/15 ring-tangerine/20 group-hover:ring-tangerine/40',
  'bg-leaf/15 ring-leaf/20 group-hover:ring-leaf/40',
  'bg-gold/20 ring-gold/30 group-hover:ring-gold/50',
  'bg-teal/15 ring-teal/20 group-hover:ring-teal/40',
  'bg-berry/12 ring-berry/20 group-hover:ring-berry/40',
]

export function ShopByDepartment() {
  return (
    <section id="shop" className="scroll-mt-28 bg-background py-10 lg:py-14">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-6 flex items-end justify-between gap-4">
          <div>
            <h2 className="text-2xl font-extrabold tracking-tight text-foreground sm:text-3xl">
              Shop by department
            </h2>
            <p className="mt-1 text-sm text-muted-foreground">
              Everything from live seafood to K-beauty, all in one store.
            </p>
          </div>
          <a
            href="#departments"
            className="hidden shrink-0 text-sm font-bold text-primary hover:underline sm:block"
          >
            See all departments
          </a>
        </div>

        <ul className="grid grid-cols-3 gap-x-3 gap-y-6 sm:grid-cols-6">
          {DEPARTMENTS.map((dept, i) => (
            <li key={dept.id}>
              <a
                href="#departments"
                className="group flex flex-col items-center gap-3 text-center"
              >
                <span
                  className={`relative aspect-square w-full overflow-hidden rounded-full ring-4 ring-inset transition-all group-hover:-translate-y-1 ${CIRCLE_TINTS[i % CIRCLE_TINTS.length]}`}
                >
                  <img
                    src={dept.image || '/placeholder.svg'}
                    alt={dept.name}
                    className="size-full object-cover transition-transform duration-300 group-hover:scale-110"
                  />
                </span>
                <span className="text-xs font-bold leading-tight text-foreground sm:text-sm">
                  {dept.name}
                </span>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
