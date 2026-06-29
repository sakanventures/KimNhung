import { type NextRequest, NextResponse } from 'next/server'
import { getSearchIndex, runTypeahead } from '@/lib/search'

export const revalidate = 60

export async function GET(req: NextRequest) {
  const q = req.nextUrl.searchParams.get('q') ?? ''
  if (q.trim().length < 2) return NextResponse.json([])
  const index = await getSearchIndex()
  return NextResponse.json(runTypeahead(index, q))
}
