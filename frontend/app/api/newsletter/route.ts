import { type NextRequest, NextResponse } from 'next/server'
import { getStrapiURL } from '@/lib/utils'

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export async function POST(req: NextRequest) {
  const body = await req.json().catch(() => null)
  const email: unknown = body?.email

  if (typeof email !== 'string' || !EMAIL_RE.test(email)) {
    return NextResponse.json({ error: 'Invalid email' }, { status: 400 })
  }

  let res: Response
  try {
    res = await fetch(`${getStrapiURL()}/api/newsletters`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${process.env.STRAPI_TOKEN}`,
      },
      body: JSON.stringify({ data: { email } }),
    })
  } catch {
    return NextResponse.json({ error: 'Network error' }, { status: 502 })
  }

  if (res.ok) {
    return NextResponse.json({ ok: true })
  }

  // Strapi returns 400 with an error containing "unique" when the email already exists
  const payload = await res.json().catch(() => ({}))
  const isDuplicate =
    res.status === 400 &&
    JSON.stringify(payload).toLowerCase().includes('unique')

  if (isDuplicate) {
    return NextResponse.json({ error: 'duplicate' }, { status: 409 })
  }

  return NextResponse.json({ error: 'Strapi error' }, { status: res.status })
}
