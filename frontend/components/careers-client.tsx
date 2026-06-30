'use client'

import { useState, useActionState } from 'react'
import {
  ChevronDown,
  X,
  MapPin,
  Clock,
  Heart,
  TrendingUp,
  ShieldCheck,
  Users,
  Star,
  Briefcase,
  ArrowRight,
  CheckCircle2,
} from 'lucide-react'
import { submitApplicationAction } from '@/data/actions/careers-actions'
import { ZodFormState, ZOD_FORM_INITIAL_STATE } from '@/data/types/careers'

// ─── Data ────────────────────────────────────────────────────────────────────

const PERKS = [
  {
    icon: Heart,
    label: 'Health Coverage',
    detail: 'Medical benefits for all full-time team members.',
    color: 'bg-berry/10 text-berry',
  },
  {
    icon: TrendingUp,
    label: 'Career Growth',
    detail: 'We promote from within. Many of our leads started on the floor.',
    color: 'bg-leaf/15 text-leaf',
  },
  {
    icon: ShieldCheck,
    label: 'Employee Discounts',
    detail: 'Discounts on everything in the store from day one.',
    color: 'bg-teal/15 text-teal',
  },
  {
    icon: Users,
    label: 'Tight-Knit Team',
    detail: 'A family-owned culture where everyone knows your name.',
    color: 'bg-tangerine/15 text-tangerine',
  },
  {
    icon: Star,
    label: 'Flexible Hours',
    detail: 'Full-time and part-time schedules that work for your life.',
    color: 'bg-gold/20 text-gold-foreground',
  },
  {
    icon: Briefcase,
    label: 'Real Experience',
    detail: 'Learn specialty skills in seafood, bakery, produce, and more.',
    color: 'bg-primary/10 text-primary',
  },
]

const DEPT_COLORS: Record<string, string> = {
  'Front End': 'bg-primary/10 text-primary',
  'Warehouse': 'bg-tangerine/15 text-tangerine',
  'Produce': 'bg-leaf/15 text-leaf',
  'Meat & Seafood': 'bg-teal/15 text-teal',
  'Facilities': 'bg-gold/20 text-gold-foreground',
}

const JOBS = [
  {
    id: 'cashier',
    title: 'Cashier',
    dept: 'Front End',
    type: 'Full-time & Part-time',
    location: 'Madison Heights, MI',
    summary:
      'We are looking for a friendly, dependable, and customer-focused Cashier to join our grocery team. As the first and last point of contact for shoppers, you will ensure a smooth checkout experience, handle transactions accurately, and help maintain an inviting store environment.',
    responsibilities: [
      'Greet customers warmly and provide helpful, courteous service',
      'Operate cash registers, scanners, scales, and POS systems accurately',
      'Handle cash, credit, EBT and other payment types with precision',
      'Bag groceries efficiently and with care to protect delicate items',
      'Assist customers with price checks, product locations, and store information',
      'Keep the checkout lanes clean, stocked, and organized',
      'Monitor and manage line flow during busy periods',
      'Follow all cash-handling, food safety, and loss-prevention procedures',
      'Assist with restocking impulse areas near the registers',
      'Support store operations with light cleaning or stocking when needed',
    ],
    qualifications: [
      'High school diploma or equivalent preferred',
      'Prior grocery, retail, or customer service experience helpful but not required',
      'Strong communication and people skills',
      'Basic math skills and ability to count change accurately',
      'Ability to stand for long periods and lift up to 25 lbs',
      'Reliable, punctual, and comfortable in a fast-paced environment',
    ],
  },
  {
    id: 'stocker',
    title: 'Stocker',
    dept: 'Warehouse',
    type: 'Full-time & Part-time',
    location: 'Madison Heights, MI',
    summary:
      'We are seeking a reliable and customer-focused Grocery Clerk to join our team. The ideal candidate will ensure that our store shelves are well-stocked, organized, and clean, while providing exceptional service to our customers.',
    responsibilities: [
      'Stock shelves, displays, and coolers with merchandise in a timely and organized manner',
      'Check product expiration dates and rotate inventory to ensure freshness',
      'Assist customers by answering questions, locating items, and providing recommendations',
      'Maintain cleanliness and orderliness in all areas of the store',
      'Assist at checkout counters when needed',
      'Assist with receiving and unloading deliveries, verifying quantities, and inspecting goods',
      'Ensure all shopping carts are returned to the designated area',
      'Follow all safety and sanitation policies and procedures',
      'Support team members and management with additional tasks as needed',
    ],
    qualifications: [
      'High school diploma or equivalent preferred',
      'Previous experience in retail, grocery, or customer service is a plus',
      'Ability to lift and carry heavy items (up to 60 lbs) and stand for extended periods',
      'Strong organizational skills and attention to detail',
      'Friendly, professional, and customer-oriented demeanor',
      'Ability to work flexible hours, including evenings, weekends, and holidays',
    ],
  },
  {
    id: 'produce-clerk',
    title: 'Produce Clerk',
    dept: 'Produce',
    type: 'Full-time & Part-time',
    location: 'Madison Heights, MI',
    summary:
      'We are looking for an energetic and detail-oriented Produce Associate to join our grocery team. This role focuses on stocking, rotating, and maintaining fresh fruits and vegetables while ensuring a clean, attractive, and customer-friendly produce department.',
    responsibilities: [
      'Greet and assist customers with product questions and recommendations',
      'Stock, rotate, and merchandise fresh produce to maintain quality and appearance',
      'Inspect fruits and vegetables for freshness, quality, and proper ripeness',
      'Maintain clean, organized displays and ensure shelves are properly faced',
      'Follow all food safety and sanitation guidelines, including temperature checks',
      'Set up and break down produce displays, including seasonal or promotional layouts',
      'Prepare items as needed (trimming, packaging, labeling)',
      'Assist with unloading and storing deliveries according to proper procedures',
      'Reduce shrink by handling products carefully and rotating stock efficiently',
    ],
    qualifications: [
      'Previous grocery or produce department experience helpful but not required',
      'Strong customer service and communication skills',
      'Ability to work in cold environments and handle frequent lifting (up to 50 lbs)',
      'Good attention to detail and ability to identify quality produce',
      'Able to stand, walk, and bend for extended periods',
      'Reliable, punctual, and able to work in a fast-paced setting',
    ],
  },
  {
    id: 'meat-seafood-clerk',
    title: 'Meat & Seafood Clerk',
    dept: 'Meat & Seafood',
    type: 'Full-time & Part-time',
    location: 'Madison Heights, MI',
    summary:
      'We are seeking a motivated and customer-oriented Meat & Seafood Associate to join our team. This role involves preparing, cutting, packaging, and merchandising fresh meat and seafood products while maintaining the highest standards of food safety, cleanliness, and customer service.',
    responsibilities: [
      'Provide friendly and knowledgeable service to customers seeking meat and seafood products',
      'Cut, trim, slice, and prepare various meats and seafood according to store standards',
      'Weigh, package, label, and display products in an appealing and organized manner',
      'Monitor product quality, freshness, and rotation to ensure optimal presentation',
      'Maintain a clean and sanitary work area including counters, equipment, and tools',
      'Follow all food safety, sanitation, and temperature control guidelines',
      'Assist customers with special orders in a timely manner',
      'Stock service cases and self-serve coolers with fresh products throughout the day',
      'Operate saws, slicers, grinders, and other department equipment safely',
      'Receive, inspect, and store deliveries according to store procedures',
    ],
    qualifications: [
      'Previous experience in meat or seafood handling preferred — training is available',
      'Strong customer service and communication skills',
      'Ability to work in cold environments for extended periods',
      'Comfortable handling raw meat and seafood',
      'Ability to lift up to 80 lbs and stand for long periods',
      'Reliable, punctual, and able to work in a fast-paced environment',
    ],
  },
  {
    id: 'janitorial',
    title: 'Janitorial Associate',
    dept: 'Facilities',
    type: 'Full-time & Part-time',
    location: 'Madison Heights, MI',
    summary:
      'We are seeking a dependable and hardworking Janitorial Associate to maintain a clean, safe, and welcoming environment throughout our store. This role supports daily operations by ensuring all areas — sales floor, restrooms, backrooms, and common spaces — are kept sanitary, organized, and hazard-free.',
    responsibilities: [
      'Maintain cleanliness of the entire store, including floors, restrooms, and entryways',
      'Sweep, mop, scrub, vacuum, and polish floors as needed',
      'Empty trash and recycling bins throughout the store and replace liners',
      'Clean and sanitize restrooms, fixtures, mirrors, and restock supplies',
      'Wipe down glass, doors, windows, and high-touch surfaces',
      'Respond promptly to spills and safety hazards to prevent accidents',
      'Clean and organize the backroom, stock areas, and employee common spaces',
      'Follow all safety, sanitation, and chemical-handling procedures',
      'Complete daily cleaning checklists and report any issues to management',
    ],
    qualifications: [
      'Prior janitorial, custodial, or cleaning experience preferred but not required',
      'Strong attention to detail and ability to work independently',
      'Comfortable working around cleaning chemicals and equipment',
      'Able to stand, walk, bend, lift up to 30–50 lbs, and perform physical tasks',
      'Reliable, punctual, and able to work in a fast-paced retail environment',
      'Good communication skills and a strong sense of responsibility',
    ],
  },
]

// ─── Apply Drawer ─────────────────────────────────────────────────────────────

function ApplyDrawer({
  job,
  onClose,
}: {
  job: (typeof JOBS)[0]
  onClose: () => void
}) {
  const [formState, formAction, pending] = useActionState<ZodFormState, FormData>(
    submitApplicationAction,
    ZOD_FORM_INITIAL_STATE
  )

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center sm:items-center" role="dialog" aria-modal="true" aria-label={`Apply for ${job.title}`}>
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-foreground/40 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Panel */}
      <div className="relative z-10 w-full max-w-lg overflow-hidden rounded-t-3xl bg-card shadow-2xl sm:rounded-3xl">
        {/* Colour bar */}
        <div className="h-2 w-full bg-primary" />

        <div className="max-h-[85vh] overflow-y-auto p-6 sm:p-8">
          {/* Header */}
          <div className="mb-6 flex items-start justify-between gap-4">
            <div>
              <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
                Applying for
              </p>
              <h2 className="mt-1 text-2xl font-bold tracking-tight text-foreground">
                {job.title}
              </h2>
              <p className="mt-1 text-sm text-muted-foreground">
                {job.type} · {job.location}
              </p>
            </div>
            <button
              onClick={onClose}
              className="rounded-full p-2 transition-colors hover:bg-muted"
              aria-label="Close"
            >
              <X className="size-5 text-muted-foreground" />
            </button>
          </div>

          {formState.success ? (
            <div className="flex flex-col items-center py-10 text-center">
              <span className="mb-4 flex size-16 items-center justify-center rounded-full bg-leaf/15">
                <CheckCircle2 className="size-8 text-leaf" />
              </span>
              <h3 className="text-xl font-bold text-foreground">
                Application sent!
              </h3>
              <p className="mt-2 max-w-xs text-pretty text-muted-foreground">
                Thanks for your interest. Our team will be in touch within a few
                business days.
              </p>
              <button
                onClick={onClose}
                className="mt-6 rounded-full bg-primary px-8 py-3 text-sm font-bold text-primary-foreground transition-colors hover:bg-primary/90"
              >
                Done
              </button>
            </div>
          ) : (
            <form action={formAction} className="flex flex-col gap-4">
              {/* Hidden job context */}
              <input type="hidden" name="jobTitle" value={job.title} />
              <input type="hidden" name="jobId" value={job.id} />

              {/* Top-level error */}
              {formState.message && (
                <p className="rounded-xl bg-red-50 px-4 py-2.5 text-sm text-red-600">
                  {formState.message}
                </p>
              )}

              <div className="grid gap-4 sm:grid-cols-2">
                <div className="flex flex-col gap-1.5">
                  <label className="text-sm font-semibold text-foreground" htmlFor="apply-first">
                    First name <span className="text-primary">*</span>
                  </label>
                  <input
                    id="apply-first"
                    name="firstName"
                    required
                    type="text"
                    placeholder="Lan"
                    className="rounded-xl border border-border bg-background px-4 py-2.5 text-sm outline-none transition-colors focus:border-primary"
                  />
                  {formState.zodErrors?.firstName && (
                    <p className="text-xs text-red-500">{formState.zodErrors.firstName[0]}</p>
                  )}
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="text-sm font-semibold text-foreground" htmlFor="apply-last">
                    Last name <span className="text-primary">*</span>
                  </label>
                  <input
                    id="apply-last"
                    name="lastName"
                    required
                    type="text"
                    placeholder="Nguyen"
                    className="rounded-xl border border-border bg-background px-4 py-2.5 text-sm outline-none transition-colors focus:border-primary"
                  />
                  {formState.zodErrors?.lastName && (
                    <p className="text-xs text-red-500">{formState.zodErrors.lastName[0]}</p>
                  )}
                </div>
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-sm font-semibold text-foreground" htmlFor="apply-email">
                  Email <span className="text-primary">*</span>
                </label>
                <input
                  id="apply-email"
                  name="email"
                  required
                  type="email"
                  placeholder="you@email.com"
                  className="rounded-xl border border-border bg-background px-4 py-2.5 text-sm outline-none transition-colors focus:border-primary"
                />
                {formState.zodErrors?.email && (
                  <p className="text-xs text-red-500">{formState.zodErrors.email[0]}</p>
                )}
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-sm font-semibold text-foreground" htmlFor="apply-phone">
                  Phone
                </label>
                <input
                  id="apply-phone"
                  name="phone"
                  type="tel"
                  placeholder="(248) 555-0000"
                  className="rounded-xl border border-border bg-background px-4 py-2.5 text-sm outline-none transition-colors focus:border-primary"
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-sm font-semibold text-foreground" htmlFor="apply-availability">
                  Availability
                </label>
                <select
                  id="apply-availability"
                  name="availability"
                  className="appearance-none rounded-xl border border-border bg-background px-4 py-2.5 text-sm outline-none transition-colors focus:border-primary"
                >
                  <option value="">Select…</option>
                  <option>Full-time</option>
                  <option>Part-time</option>
                  <option>Either</option>
                </select>
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-sm font-semibold text-foreground" htmlFor="apply-message">
                  Tell us about yourself
                </label>
                <textarea
                  id="apply-message"
                  name="message"
                  rows={4}
                  placeholder="Any relevant experience, why you want to join the team…"
                  className="resize-none rounded-xl border border-border bg-background px-4 py-2.5 text-sm outline-none transition-colors focus:border-primary"
                />
              </div>

              <button
                type="submit"
                disabled={pending}
                className="mt-2 flex items-center justify-center gap-2 rounded-full bg-primary py-3.5 text-sm font-bold text-primary-foreground transition-colors hover:bg-primary/90 disabled:opacity-60"
              >
                {pending ? 'Submitting…' : 'Submit Application'}
                {!pending && <ArrowRight className="size-4" />}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  )
}

// ─── Job Card ─────────────────────────────────────────────────────────────────

function JobCard({
  job,
  onApply,
}: {
  job: (typeof JOBS)[0]
  onApply: () => void
}) {
  const [open, setOpen] = useState(false)
  const deptColor = DEPT_COLORS[job.dept] ?? 'bg-muted text-muted-foreground'

  return (
    <div className={`overflow-hidden rounded-2xl border border-border bg-card transition-shadow ${open ? 'shadow-lg' : 'hover:shadow-md'}`}>
      {/* Always-visible row */}
      <button
        onClick={() => setOpen((o) => !o)}
        className="flex w-full items-center gap-4 px-6 py-5 text-left"
        aria-expanded={open}
      >
        {/* Left: dept colour swatch */}
        <span className={`hidden size-11 shrink-0 items-center justify-center rounded-xl text-xs font-black sm:flex ${deptColor}`}>
          {job.title.slice(0, 2).toUpperCase()}
        </span>

        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-2">
            <h3 className="text-base font-bold tracking-tight text-foreground">
              {job.title}
            </h3>
            <span className={`rounded-full px-2.5 py-0.5 text-xs font-semibold ${deptColor}`}>
              {job.dept}
            </span>
          </div>
          <div className="mt-1 flex flex-wrap gap-x-4 gap-y-1 text-xs text-muted-foreground">
            <span className="flex items-center gap-1">
              <MapPin className="size-3" />
              {job.location}
            </span>
            <span className="flex items-center gap-1">
              <Clock className="size-3" />
              {job.type}
            </span>
          </div>
        </div>

        <ChevronDown
          className={`size-5 shrink-0 text-muted-foreground transition-transform duration-300 ${open ? 'rotate-180' : ''}`}
        />
      </button>

      {/* Expanded content */}
      {open && (
        <div className="border-t border-border px-6 pb-6 pt-5">
          <p className="text-pretty leading-relaxed text-muted-foreground">
            {job.summary}
          </p>

          <div className="mt-6 grid gap-6 md:grid-cols-2">
            {/* Responsibilities */}
            <div>
              <h4 className="mb-3 text-sm font-bold uppercase tracking-widest text-foreground">
                Responsibilities
              </h4>
              <ul className="flex flex-col gap-2">
                {job.responsibilities.map((r) => (
                  <li key={r} className="flex items-start gap-2 text-sm leading-relaxed text-muted-foreground">
                    <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-primary" />
                    {r}
                  </li>
                ))}
              </ul>
            </div>

            {/* Qualifications */}
            <div>
              <h4 className="mb-3 text-sm font-bold uppercase tracking-widest text-foreground">
                Qualifications
              </h4>
              <ul className="flex flex-col gap-2">
                {job.qualifications.map((q) => (
                  <li key={q} className="flex items-start gap-2 text-sm leading-relaxed text-muted-foreground">
                    <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-leaf" />
                    {q}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="mt-6 flex items-center gap-3">
            <button
              onClick={onApply}
              className="inline-flex items-center gap-2 rounded-full bg-primary px-6 py-2.5 text-sm font-bold text-primary-foreground transition-colors hover:bg-primary/90"
            >
              Apply Now
              <ArrowRight className="size-4" />
            </button>
            <span className="text-xs text-muted-foreground">Takes about 2 minutes</span>
          </div>
        </div>
      )}
    </div>
  )
}

// ─── Main Component ───────────────────────────────────────────────────────────

export function CareersClient() {
  const [applyJob, setApplyJob] = useState<(typeof JOBS)[0] | null>(null)

  return (
    <>
      {/* ── Hero ─────────────────────────────────────────────────────────── */}
      <section className="relative overflow-hidden bg-primary px-4 pb-20 pt-24 sm:px-6 lg:px-8">
        {/* Decorative circles */}
        <span className="pointer-events-none absolute -right-24 -top-24 size-96 rounded-full bg-white/5" />
        <span className="pointer-events-none absolute -bottom-32 -left-16 size-72 rounded-full bg-white/5" />
        <span className="pointer-events-none absolute right-1/3 top-8 size-40 rounded-full bg-tangerine/20" />

        <div className="relative mx-auto max-w-4xl text-center">
          <span className="inline-block rounded-full bg-white/15 px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-white/90">
            Now Hiring
          </span>
          <h1 className="mt-5 text-balance font-heading text-5xl font-black leading-none tracking-tight text-white sm:text-6xl lg:text-7xl">
            Come work with<br />
            <span className="text-gold">Kim Nhung.</span>
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-pretty text-lg leading-relaxed text-white/75">
            We are Metro Detroit&apos;s largest Asian superstore — 25,000 sq ft of
            live seafood, fresh-baked bánh mì, imported groceries, and a whole
            lot of heart. We are always looking for passionate people to grow with us.
          </p>

          {/* Quick stats */}
          <div className="mx-auto mt-10 flex flex-wrap justify-center gap-6">
            {[
              { n: '5', label: 'Open roles' },
              { n: '25K', label: 'sq ft store' },
              { n: '2025', label: 'Grand opening' },
            ].map(({ n, label }) => (
              <div key={label} className="flex flex-col items-center">
                <span className="text-4xl font-black text-white">{n}</span>
                <span className="text-sm text-white/60">{label}</span>
              </div>
            ))}
          </div>

          <a
            href="#openings"
            className="mt-10 inline-flex items-center gap-2 rounded-full bg-white px-8 py-3.5 text-sm font-bold text-primary transition-colors hover:bg-white/90"
          >
            See open positions
            <ArrowRight className="size-4" />
          </a>
        </div>
      </section>

      {/* ── Perks ────────────────────────────────────────────────────────── */}
      <section className="bg-background py-16 lg:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-12 max-w-xl">
            <span className="text-sm font-semibold uppercase tracking-[0.18em] text-primary">
              Why join us
            </span>
            <h2 className="mt-2 text-balance font-heading text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
              More than a paycheck.
            </h2>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {PERKS.map(({ icon: Icon, label, detail, color }) => (
              <div
                key={label}
                className="group flex gap-4 rounded-2xl border border-border bg-card p-6 transition-shadow hover:shadow-md"
              >
                <span className={`flex size-12 shrink-0 items-center justify-center rounded-xl ${color}`}>
                  <Icon className="size-5" />
                </span>
                <div>
                  <p className="font-bold text-foreground">{label}</p>
                  <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
                    {detail}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Culture strip ────────────────────────────────────────────────── */}
      <section className="overflow-hidden bg-muted/60 py-14">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid items-center gap-10 lg:grid-cols-2">
            <div>
              <span className="text-sm font-semibold uppercase tracking-[0.18em] text-primary">
                Our culture
              </span>
              <h2 className="mt-2 text-balance font-heading text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
                Family-owned. Community-rooted.
              </h2>
              <p className="mt-4 text-pretty leading-relaxed text-muted-foreground">
                Kim Nhung Superfood was named after two women in our founding family —
                aunt Kim and her daughter Nhung. That spirit of care, community, and
                purpose runs through everything we do. When you join our team, you are
                not just stocking shelves — you are part of the cultural fabric of
                Metro Detroit&apos;s Vietnamese and Southeast Asian community.
              </p>
              <p className="mt-3 text-pretty leading-relaxed text-muted-foreground">
                We opened our new 25,000 sq ft superstore in April 2025 and are
                growing fast. There has never been a better time to join.
              </p>
            </div>

            {/* Photo mosaic */}
            <div className="grid grid-cols-2 gap-3">
              <img
                src="https://images.unsplash.com/photo-1542838132-92c53300491e?w=500&h=500&fit=crop&auto=format"
                alt="Fresh produce at Kim Nhung Superfood"
                className="aspect-square rounded-2xl object-cover"
              />
              <img
                src="https://images.unsplash.com/photo-1534482421-64566f976cfa?w=500&h=500&fit=crop&auto=format"
                alt="Live seafood department"
                className="aspect-square rounded-2xl object-cover"
              />
              <img
                src="https://images.unsplash.com/photo-1509440159596-0249088772ff?w=500&h=500&fit=crop&auto=format"
                alt="Fresh-baked bread from the bakery"
                className="aspect-square rounded-2xl object-cover"
              />
              <img
                src="https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=500&h=500&fit=crop&auto=format"
                alt="Imported pantry goods"
                className="aspect-square rounded-2xl object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* ── Open positions ───────────────────────────────────────────────── */}
      <section id="openings" className="scroll-mt-24 bg-background py-16 lg:py-24">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <div className="mb-10">
            <span className="text-sm font-semibold uppercase tracking-[0.18em] text-primary">
              Open positions
            </span>
            <h2 className="mt-2 text-balance font-heading text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
              Find your role.
            </h2>
            <p className="mt-3 text-muted-foreground">
              Click any position to read the full job description and apply.
            </p>
          </div>

          <div className="flex flex-col gap-3">
            {JOBS.map((job) => (
              <JobCard
                key={job.id}
                job={job}
                onApply={() => setApplyJob(job)}
              />
            ))}
          </div>

          {/* General interest CTA */}
          <div className="mt-8 flex flex-col items-center gap-3 rounded-2xl border border-dashed border-border bg-muted/40 px-6 py-8 text-center">
            <p className="font-semibold text-foreground">
              Don&apos;t see the right fit?
            </p>
            <p className="max-w-sm text-sm text-muted-foreground">
              We are always growing. Send us your resume and we will keep you in mind
              for future openings.
            </p>
            <a
              href="mailto:careers@kimnhungsuperfood.com"
              className="mt-1 inline-flex items-center gap-2 rounded-full border border-border bg-card px-6 py-2.5 text-sm font-bold text-foreground transition-colors hover:bg-muted"
            >
              Send a general application
              <ArrowRight className="size-4" />
            </a>
          </div>
        </div>
      </section>

      {/* Apply drawer */}
      {applyJob && (
        <ApplyDrawer job={applyJob} onClose={() => setApplyJob(null)} />
      )}
    </>
  )
}
