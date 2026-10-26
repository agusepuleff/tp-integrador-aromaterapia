// ProtectedRoute.tsx — Solo deja pasar a usuarios con sesión iniciada
import { Navigate, useLocation } from 'react-router-dom'
import type { ReactNode } from 'react'
import { useAuth } from '../context/AuthContext'

interface ProtectedRouteProps {
  children: ReactNode
}

const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const { isAuthenticated, loading } = useAuth()
  const location = useLocation()

  // Mientras se verifica el token guardado, no se decide todavía
  if (loading) {
    return <p className="product-status">Verificando sesión…</p>
  }

  // Sin sesión: se manda a /login y se recuerda a dónde quería ir
  if (!isAuthenticated) {
    return <Navigate to="/login" replace state={{ from: location.pathname }} />
  }

  return <>{children}</>
}

export default ProtectedRoute