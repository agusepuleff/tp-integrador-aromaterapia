import { apiFetch } from './client'

export interface MensajeContacto {
  nombre: string
  correo: string
  mensaje: string
}

export interface RespuestaContacto {
  id: number
  nombre: string
  correo: string
  mensaje: string
  creado: string
}

export const enviarMensajeContacto = (
  datos: MensajeContacto,
): Promise<RespuestaContacto> =>
  apiFetch<RespuestaContacto>('/api/contacto/', {
    method: 'POST',
    auth: false,
    body: JSON.stringify(datos),
  })

