import Medusa from '@medusajs/js-sdk'

// Server-side (Docker): MEDUSA_SERVER_URL → host.docker.internal:9000
// Client-side (browser): NEXT_PUBLIC_MEDUSA_URL → localhost:9000
const baseUrl =
  typeof window === 'undefined'
    ? (process.env.MEDUSA_SERVER_URL ?? process.env.NEXT_PUBLIC_MEDUSA_URL!)
    : process.env.NEXT_PUBLIC_MEDUSA_URL!

export const medusa = new Medusa({
  baseUrl,
  publishableKey: process.env.NEXT_PUBLIC_MEDUSA_PUBLISHABLE_KEY!,
  fetchOptions: { cache: 'no-store' },
})

export const REGION_ID = process.env.NEXT_PUBLIC_MEDUSA_REGION_ID!
