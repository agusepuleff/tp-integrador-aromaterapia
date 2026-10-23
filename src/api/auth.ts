
import { apiFetch } from './client'

export interface Tokens {
  access: string
  refresh: string
}

export interface Perfil {
  id: number
  email: string
  first_name: string
  last_name: string
}

export interface RegistroRespuesta {
  id: number
  email: string
}

export const registrarUsuario = (
  email: string,
  password: string,
  passwordConfirm: string,
): Promise<RegistroRespuesta> =>
  apiFetch<RegistroRespuesta>('/api/auth/registro/', {
    method: 'POST',
    auth: false,
    body: JSON.stringify({
      email,
      password,
      password_confirm: passwordConfirm,
    }),
  })

export const iniciarSesion = (
  email: string,
  password: string,
): Promise<Tokens> =>
  apiFetch<Tokens>('/api/auth/login/', {
    method: 'POST',
    auth: false,
    body: JSON.stringify({ email, password }),
  })

export const getPerfil = (): Promise<Perfil> =>
  apiFetch<Perfil>('/api/auth/me/')
