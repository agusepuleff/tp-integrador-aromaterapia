// Cliente HTTP único: toda la comunicación con el backend pasa por acá.
// La URL base viene de la variable de entorno (nunca hardcodeada).

const API_URL = (import.meta.env.VITE_API_URL as string | undefined)?.replace(/\/$/, '')

if (!API_URL) {
  console.error('Falta definir VITE_API_URL en el archivo .env')
}

export class ApiError extends Error {
  status: number
  details?: Record<string, string[]>

  constructor(status: number, message: string, details?: Record<string, string[]>) {
    super(message)
    this.status = status
    this.details = details
  }
}

export const getAccessToken = (): string | null => localStorage.getItem('access')

export async function apiFetch<T>(path: string, options: RequestInit = {}): Promise<T> {
  const headers = new Headers(options.headers)
  if (options.body) headers.set('Content-Type', 'application/json')

  const token = getAccessToken()
  if (token) headers.set('Authorization', `Bearer ${token}`)

  let response: Response
  try {
    response = await fetch(`${API_URL}${path}`, { ...options, headers })
  } catch {
    throw new ApiError(0, 'No se pudo conectar con el servidor. Intentá de nuevo en unos segundos.')
  }

  if (response.status === 204) return undefined as T

  const data = await response.json().catch(() => null)

  if (!response.ok) {
    // El backend siempre responde errores con { status, error, message, details? }
    throw new ApiError(
      response.status,
      data?.message ?? 'Ocurrió un error inesperado.',
      data?.details,
    )
  }

  return data as T
}