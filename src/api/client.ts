const API_URL = (import.meta.env.VITE_API_URL as string | undefined)
  ?.replace(/\/+$/, '')

if (!API_URL) {
  console.error('Falta definir VITE_API_URL en el archivo .env')
}

const ACCESS_KEY = 'access'
const REFRESH_KEY = 'refresh'

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

// ---------- Manejo de tokens (localStorage) ----------
export const getAccessToken = (): string | null =>
  localStorage.getItem(ACCESS_KEY)

const getRefreshToken = (): string | null =>
  localStorage.getItem(REFRESH_KEY)

export const saveTokens = (access: string, refresh?: string): void => {
  localStorage.setItem(ACCESS_KEY, access)
  if (refresh) localStorage.setItem(REFRESH_KEY, refresh)
}

export const clearTokens = (): void => {
  localStorage.removeItem(ACCESS_KEY)
  localStorage.removeItem(REFRESH_KEY)
}

// Mutex para evitar race conditions si ocurren múltiples 401 concurrentes
let refreshPromise: Promise<boolean> | null = null

// Pide un access token nuevo usando el refresh token (sin pedir la contraseña)
async function refrescarAccessToken(): Promise<boolean> {
  const refresh = getRefreshToken()
  if (!refresh) return false

    if (refreshPromise) {
      return refreshPromise
    }

  refreshPromise = (async () => {
    try {
      const response = await fetch(`${API_URL ?? ''}/api/auth/token/refresh/`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ refresh }),
      })
      if (!response.ok) return false

      const data = await response.json()
      saveTokens(data.access, data.refresh)
      return true
    } catch {
      return false
    } finally {
      refreshPromise = null
    }
  })()

  return refreshPromise
}

// ---------- Peticiones ----------
type ApiFetchOptions = RequestInit & {
  auth?: boolean // false = no enviar el token (endpoints públicos)
}

async function enviar(
  path: string,
  requestOptions: RequestInit,
  auth: boolean,
): Promise<Response> {
  const headers = new Headers(requestOptions.headers)

  if (requestOptions.body != null) {
    headers.set('Content-Type', 'application/json')
  }

  if (auth) {
    const token = getAccessToken()
    if (token) headers.set('Authorization', `Bearer ${token}`)
  } else {
    headers.delete('Authorization')
  }

  try {
    return await fetch(`${API_URL ?? ''}${path}`, {
      ...requestOptions,
      headers,
    })
  } catch {
    throw new ApiError(
      0,
      'No se pudo conectar con el servidor. Intentá de nuevo en unos segundos.',
    )
  }
}

export async function apiFetch<T>(
  path: string,
  options: ApiFetchOptions = {},
): Promise<T> {
  const { auth = true, ...requestOptions } = options

  let response = await enviar(path, requestOptions, auth)

  // Si el access token venció, se intenta renovar una vez y se repite la petición
  if (response.status === 401 && auth && getRefreshToken()) {
    if (await refrescarAccessToken()) {
      response = await enviar(path, requestOptions, auth)
    } else {
      // El refresh token también venció: se cierra la sesión
      clearTokens()
      window.dispatchEvent(new Event('auth:logout'))
    }
  }

  if (response.status === 204) {
    return undefined as T
  }

  const data = await response.json().catch(() => null)

  if (!response.ok) {
    throw new ApiError(
      response.status,
      data?.message ?? data?.detail ?? 'Ocurrió un error inesperado.',
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