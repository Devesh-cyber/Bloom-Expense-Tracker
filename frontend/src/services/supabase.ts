import { ApiError } from './apiClient'

const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL?.replace(/\/$/, '')
const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY

if (!SUPABASE_URL || !SUPABASE_ANON_KEY) {
  console.warn(
    'Bloom Tracker is missing VITE_SUPABASE_URL or VITE_SUPABASE_ANON_KEY. Add them to your Vercel/local environment.'
  )
}

function getConfig() {
  if (!SUPABASE_URL || !SUPABASE_ANON_KEY) {
    throw new ApiError('Supabase is not configured. Check the app environment variables.')
  }

  return {
    url: SUPABASE_URL,
    key: SUPABASE_ANON_KEY,
  }
}

function getEndpoint(path = '') {
  const { url } = getConfig()
  return `${url}/rest/v1/${path}`
}

async function parseError(response: Response): Promise<string> {
  try {
    const body = await response.json()
    if (typeof body?.message === 'string') return body.message
    if (typeof body?.hint === 'string') return body.hint
    if (typeof body?.details === 'string') return body.details
    if (typeof body?.error === 'string') return body.error
  } catch {
    // Ignore malformed/non-JSON error responses.
  }

  if (response.status === 404) return 'The requested record was not found.'
  if (response.status >= 500) return 'Supabase is temporarily unavailable. Please try again.'
  return 'Something went wrong while accessing your data.'
}

export async function supabaseRequest<T>(
  path: string,
  options: RequestInit = {}
): Promise<T> {
  const { key } = getConfig()

  let response: Response
  try {
    response = await fetch(getEndpoint(path), {
      ...options,
      headers: {
        apikey: key,
        Authorization: `Bearer ${key}`,
        Accept: 'application/json',
        ...(options.body ? { 'Content-Type': 'application/json' } : {}),
        ...options.headers,
      },
    })
  } catch {
    throw new ApiError('Unable to reach Supabase. Check your connection and try again.')
  }

  if (!response.ok) {
    throw new ApiError(await parseError(response), response.status)
  }

  if (response.status === 204) {
    return undefined as T
  }

  const text = await response.text()
  return text ? (JSON.parse(text) as T) : (undefined as T)
}
