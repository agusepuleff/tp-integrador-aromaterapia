// AuthContext.tsx — Estado de autenticación (usuario logueado) para toda la app
import { createContext, useContext, useEffect, useState } from 'react'
import type { ReactNode } from 'react'
import { clearTokens, getAccessToken, saveTokens } from '../api/client'
import { getPerfil, iniciarSesion, registrarUsuario } from '../api/auth'
import type { Perfil } from '../api/auth'

interface AuthContextType {
  user: Perfil | null
  isAuthenticated: boolean
  loading: boolean
  login: (email: string, password: string) => Promise<void>
  register: (
    email: string,
    password: string,
    passwordConfirm: string,
  ) => Promise<void>
  logout: () => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

interface AuthProviderProps {
  children: ReactNode
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<Perfil | null>(null)
  // Si hay un token guardado, hay que verificarlo con el backend antes de decidir si hay sesión
  const [loading, setLoading] = useState<boolean>(() => getAccessToken() !== null)

  // Al abrir la app: si hay token guardado, se recupera el perfil del usuario
  useEffect(() => {
    if (!getAccessToken()) return
    let cancelado = false

    getPerfil()
      .then((perfil) => {
        if (!cancelado) setUser(perfil)
      })
      .catch(() => clearTokens())
      .finally(() => {
        if (!cancelado) setLoading(false)
      })

    return () => {
      cancelado = true
    }
  }, [])

  // El cliente HTTP avisa con este evento cuando no pudo renovar el token
  useEffect(() => {
    const onLogout = (): void => setUser(null)
    window.addEventListener('auth:logout', onLogout)
    return () => window.removeEventListener('auth:logout', onLogout)
  }, [])

  const login = async (email: string, password: string): Promise<void> => {
    const tokens = await iniciarSesion(email, password)
    saveTokens(tokens.access, tokens.refresh)

    try {
      setUser(await getPerfil())
    } catch (error) {
      clearTokens()
      throw error
    }
  }

  const register = async (
    email: string,
    password: string,
    passwordConfirm: string,
  ): Promise<void> => {
    await registrarUsuario(email, password, passwordConfirm)
    await login(email, password) // después de registrarse, inicia sesión automáticamente
  }

  const logout = (): void => {
    clearTokens()
    setUser(null)
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: user !== null,
        loading,
        login,
        register,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext)

  if (!context) {
    throw new Error('useAuth debe utilizarse dentro de AuthProvider.')
  }

  return context
}