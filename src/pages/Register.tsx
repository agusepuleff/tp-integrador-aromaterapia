// Register.tsx — Registro de usuarios
import { useState } from 'react'
import type { FormEvent } from 'react'
import { Link, Navigate, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { formatApiError } from '../api/client'

const Register = () => {
  const { register, isAuthenticated } = useAuth()
  const navigate = useNavigate()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [passwordConfirm, setPasswordConfirm] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [enviando, setEnviando] = useState(false)

  if (isAuthenticated) {
    return <Navigate to="/" replace />
  }

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setError(null)

    if (password !== passwordConfirm) {
      setError('Las contraseñas no coinciden.')
      return
    }

    setEnviando(true)

    try {
      // Crea la cuenta e inicia sesión automáticamente
      await register(email.trim(), password, passwordConfirm)
      navigate('/', { replace: true })
    } catch (err: unknown) {
      // El backend devuelve los motivos (email ya usado, contraseña débil, etc.)
      setError(formatApiError(err))
    } finally {
      setEnviando(false)
    }
  }

  return (
    <main className="auth-page">
      <form className="auth-card" onSubmit={handleSubmit}>
        <h1>Crear cuenta</h1>

        <label className="auth-field">
          Email
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            autoComplete="email"
          />
        </label>

        <label className="auth-field">
          Contraseña
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            minLength={8}
            autoComplete="new-password"
          />
          <span className="auth-hint">
            Mínimo 8 caracteres. No puede ser solo números ni una contraseña muy común.
          </span>
        </label>

        <label className="auth-field">
          Repetir contraseña
          <input
            type="password"
            value={passwordConfirm}
            onChange={(e) => setPasswordConfirm(e.target.value)}
            required
            minLength={8}
            autoComplete="new-password"
          />
        </label>

        {error && (
          <p className="auth-error" role="alert">
            {error}
          </p>
        )}

        <button type="submit" className="auth-submit" disabled={enviando}>
          {enviando ? 'Creando cuenta…' : 'Registrarme'}
        </button>

        <p className="auth-switch">
          ¿Ya tenés cuenta? <Link to="/login">Iniciá sesión</Link>
        </p>
      </form>
    </main>
  )
}

export default Register