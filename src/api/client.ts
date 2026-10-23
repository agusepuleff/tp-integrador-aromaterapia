
const API_URL = (import.meta.env.VITE_API_URL as string | undefined)
  ?.replace(/\/+$/, '')

if (!API_URL) {
  console.error('Falta definir VITE_API_URL en el archivo .env')
}

export class ApiError extends Error {
  status: number
  details?: Record<string, string[]>

  constructor(
    status: number,
    message: string,
    details?: Record<string, string[]>,
  ) {
    super(message)
    this.name = 'ApiError'
    this.status = status
    this.details = details
  }
}

export const getAccessToken = (): string | null =>
  localStorage.getItem('access')

type ApiFetchOptions = RequestInit & {
  auth?: boolean
}

export async function apiFetch<T>(
  path: string,
  options: ApiFetchOptions = {},
): Promise<T> {
  const { auth = true, ...requestOptions } = options
  const headers = new Headers(requestOptions.headers)

  if (requestOptions.body != null) {
    headers.set('Content-Type', 'application/json')
  }

  if (auth) {
    const token = getAccessToken()

    if (token) {
      headers.set('Authorization', `Bearer ${token}`)
    }
  } else {
    headers.delete('Authorization')
  }

  let response: Response

  try {
    response = await fetch(`${API_URL ?? ''}${path}`, {
      ...requestOptions,
      headers,
    })
  } catch {
    throw new ApiError(
      0,
      'No se pudo conectar con el servidor. Intentá de nuevo en unos segundos.',
    )
  }

  if (response.status === 204) {
    return undefined as T
  }

  const data = await response.json().catch(() => null)

  if (!response.ok) {
    throw new ApiError(
      response.status,
      data?.message ??
        data?.detail ??
        'Ocurrió un error inesperado.',
      data?.details,
    )
  }

  return data as T
}

export const formatApiError = (err: unknown): string => {
  if (err instanceof ApiError) {
    const details = err.details

    if (details) {
      const messages = Object.values(details).flat()
      if (messages.length > 0) {
        return messages.join(' ')
      }
    }

    return err.message
  }

  if (err instanceof Error) {
    return err.message
  }

  if (typeof err === 'string') {
    return err
  }

  return 'Ocurrió un error inesperado. Intentá nuevamente.'
}

