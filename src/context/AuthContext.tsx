
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react'
import type { ReactNode } from 'react'
import {
  iniciarSesion,
  registrarUsuario,
  getPerfil,
} from '../api/auth'
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
  const [loading, setLoading] = useState(true)

  const logout = useCallback(() => {
    localStorage.removeItem('access')
    localStorage.removeItem('refresh')
    setUser(null)
  }, [])

  const cargarPerfil = useCallback(async () => {
    try {
      const perfil = await getPerfil()
      setUser(perfil)
    } catch {
      localStorage.removeItem('access')
      localStorage.removeItem('refresh')
      setUser(null)
    }
  }, [])

  useEffect(() => {
    const iniciar = async () => {
      if (localStorage.getItem('access')) {
        await cargarPerfil()
      }
      setLoading(false)
    }

    void iniciar()
  }, [cargarPerfil])

  const login = async (email: string, password: string) => {
    const tokens = await iniciarSesion(email, password)

    localStorage.setItem('access', tokens.access)
    localStorage.setItem('refresh', tokens.refresh)

    await cargarPerfil()

    if (!localStorage.getItem('access')) {
      throw new Error('No se pudo cargar el perfil del usuario.')
    }
  }

  const register = async (
    email: string,
    password: string,
    passwordConfirm: string,
  ) => {
    await registrarUsuario(email, password, passwordConfirm)
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
