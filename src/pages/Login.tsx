// Login.tsx — Inicio de sesión
import { useState } from 'react'
import type { FormEvent } from 'react'
import { Link, Navigate, useLocation, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { ApiError, formatApiError } from '../api/client'

const Login = () => {
  const { login, isAuthenticated } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()

  // Si el usuario llegó acá desde una ruta protegida, vuelve a esa pantalla después de ingresar
  const destino = (location.state as { from?: string } | null)?.from ?? '/'

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [enviando, setEnviando] = useState(false)

  // Si ya hay sesión iniciada, no tiene sentido mostrar el formulario
  if (isAuthenticated) {
    return <Navigate to={destino} replace />
  }

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setError(null)
    setEnviando(true)

    try {
      await login(email.trim(), password)
      navigate(destino, { replace: true })
    } catch (err: unknown) {
      if (err instanceof ApiError && err.status === 401) {
        setError('Email o contraseña incorrectos.')
      } else {
        setError(formatApiError(err))
      }
    } finally {
      setEnviando(false)
    }
  }

  return (
    <main className="auth-page">
      <form className="auth-card" onSubmit={handleSubmit}>
        <h1>Iniciar sesión</h1>

        <label className="auth-field">
          Email
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            autoComplete="email"
            required
          />
        </label>

        <label className="auth-field">
          Contraseña
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            autoComplete="current-password"
            required
          />
        </label>

        {error && (
          <p className="auth-error" role="alert">
            {error}
          </p>
        )}

        <button type="submit" className="auth-submit" disabled={enviando}>
          {enviando ? 'Ingresando…' : 'Ingresar'}
        </button>

        <p className="auth-switch">
          ¿Todavía no tenés cuenta? <Link to="/registro">Registrate</Link>
        </p>
      </form>
    </main>
  )
}

export default Login