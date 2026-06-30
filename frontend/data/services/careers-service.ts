import { getStrapiURL } from '@/lib/utils'
import { JobApplication } from '@/data/types/careers'

const baseUrl = getStrapiURL()

export async function submitJobApplication(payload: JobApplication) {
  const url = new URL('/api/jobs', baseUrl)
  try {
    const response = await fetch(url.toString(), {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ data: payload }),
      cache: 'no-cache',
    })
    return response.json()
  } catch (error) {
    throw error
  }
}
