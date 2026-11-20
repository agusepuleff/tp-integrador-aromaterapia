// Navbar.tsx — Barra de navegación moderna, sticky y responsive con menú móvil
import { useState, useEffect } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useCarritoContext } from '../context/CartContext'
import { useAuth } from '../context/AuthContext'

interface NavbarProps {
  onCartOpen: () => void
}

const Navbar = ({ onCartOpen }: NavbarProps) => {
  const { getTotalCart } = useCarritoContext()
  const { user, isAuthenticated, logout } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()
  const itemCount = getTotalCart()

  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false)

  // Cerrar menú móvil al cambiar de ruta
  useEffect(() => {
    setMobileMenuOpen(false)
  }, [location.pathname])

  // Cerrar con Escape
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setMobileMenuOpen(false)
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [])

  // Lleva al inicio de la página (si está en otra pantalla, vuelve primero a "/")
  const scrollToTop = (e: React.MouseEvent<HTMLAnchorElement>): void => {
    e.preventDefault()
    setMobileMenuOpen(false)
    if (location.pathname !== '/') {
      navigate('/')
    }
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  // Desplaza a una sección (si está en otra pantalla, vuelve primero a "/")
  const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, id: string): void => {
    e.preventDefault()
    setMobileMenuOpen(false)
    const ir = (): void => {
      document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
    if (location.pathname !== '/') {
      navigate('/')
      setTimeout(ir, 150)
    } else {
      ir()
    }
  }

  const handleLogout = (): void => {
    setMobileMenuOpen(false)
    logout()
    navigate('/')
  }

  const isPedidosActive = location.pathname === '/pedidos'

  return (
    <header className="navbar">
      <div className="navbar__inner">
        {/* Logo / Marca */}
        <a
          href="#inicio"
          className="navbar__brand"
          onClick={scrollToTop}
          aria-label="Aromaterapia - Volver al inicio"
          title="Volver al inicio"
        >
          <span className="navbar__logo-icon" aria-hidden="true">🌿</span>
          <span className="navbar__logo-text">
            Aroma<span>terapia</span>
          </span>
        </a>

        {/* Navegación Desktop */}
        <nav className="navbar__nav" aria-label="Menú principal">
          <a href="#inicio" className="navbar__link" onClick={scrollToTop}>
            Inicio
          </a>
          <a
            href="#productos"
            className="navbar__link"
            onClick={(e) => scrollToSection(e, 'productos')}
          >
            Productos
          </a>
          <a
            href="#contacto"
            className="navbar__link"
            onClick={(e) => scrollToSection(e, 'contacto')}
          >
            Contacto
          </a>
        </nav>

        {/* Acciones a la derecha (Desktop) */}
        <div className="navbar__actions">
          {/* Sesión Desktop */}
          <div className="navbar__auth">
            {isAuthenticated ? (
              <>
                <Link
                  to="/pedidos"
                  className={`navbar__auth-link ${isPedidosActive ? 'navbar__auth-link--active' : ''}`}
                  title="Ver mis pedidos realizados"
                >
                  <span aria-hidden="true">📦</span> Mis pedidos
                </Link>

                <div className="navbar__user-pill" title={user?.email || 'Cuenta de usuario'}>
                  <span className="navbar__user-avatar" aria-hidden="true">👤</span>
                  <span className="navbar__user-name">{user?.email}</span>
                </div>

                <button
                  type="button"
                  className="navbar__logout-btn"
                  onClick={handleLogout}
                  title="Cerrar sesión"
                  aria-label="Cerrar sesión"
                >
                  Salir
                </button>
              </>
            ) : (
              <>
                <Link to="/login" className="navbar__login-link">
                  Ingresar
                </Link>
                <Link to="/registro" className="navbar__register-link">
                  Registrarme
                </Link>
              </>
            )}
          </div>

          {/* Botón Carrito */}
          <button
            id="cart-toggle-btn"
            className="navbar__cart-btn"
            onClick={onCartOpen}
            aria-label={`Abrir carrito — ${itemCount} ${itemCount === 1 ? 'producto' : 'productos'}`}
            title="Abrir carrito de compras"
          >
            <span className="navbar__cart-icon" aria-hidden="true">🛒</span>
            <span className="navbar__cart-label">Carrito</span>
            {itemCount > 0 && (
              <span key={itemCount} className="navbar__cart-badge" aria-live="polite">
                {itemCount}
              </span>
            )}
          </button>

          {/* Botón Hamburguesa (Móvil y Tablet < 1024px) */}
          <button
            type="button"
            className={`navbar__hamburger ${mobileMenuOpen ? 'navbar__hamburger--open' : ''}`}
            onClick={() => setMobileMenuOpen((prev) => !prev)}
            aria-label={mobileMenuOpen ? 'Cerrar menú' : 'Abrir menú de navegación'}
            aria-expanded={mobileMenuOpen}
          >
            <span className="navbar__hamburger-line" />
            <span className="navbar__hamburger-line" />
            <span className="navbar__hamburger-line" />
          </button>
        </div>
      </div>

      {/* Menú Móvil / Drawer desplegable */}
      {mobileMenuOpen && (
        <div
          className="navbar__mobile-backdrop"
          onClick={() => setMobileMenuOpen(false)}
          aria-hidden="true"
        />
      )}

      <div
        className={`navbar__mobile-menu ${mobileMenuOpen ? 'navbar__mobile-menu--open' : ''}`}
        aria-hidden={!mobileMenuOpen}
      >
        <div className="navbar__mobile-content">
          <nav className="navbar__mobile-nav" aria-label="Navegación móvil">
            <a href="#inicio" className="navbar__mobile-link" onClick={scrollToTop}>
              🌿 Inicio
            </a>
            <a
              href="#productos"
              className="navbar__mobile-link"
              onClick={(e) => scrollToSection(e, 'productos')}
            >
              ✨ Productos
            </a>
            <a
              href="#contacto"
              className="navbar__mobile-link"
              onClick={(e) => scrollToSection(e, 'contacto')}
            >
              📬 Contacto
            </a>
          </nav>

          <div className="navbar__mobile-divider" />

          <div className="navbar__mobile-auth">
            {isAuthenticated ? (
              <>
                <div className="navbar__mobile-user">
                  <span className="navbar__mobile-user-avatar">👤</span>
                  <div className="navbar__mobile-user-info">
                    <span className="navbar__mobile-user-label">Conectado como</span>
                    <span className="navbar__mobile-user-email">{user?.email}</span>
                  </div>
                </div>

                <Link
                  to="/pedidos"
                  className={`navbar__mobile-btn navbar__mobile-btn--primary ${isPedidosActive ? 'navbar__mobile-btn--active' : ''
                    }`}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  📦 Mis pedidos
                </Link>

                <button
                  type="button"
                  className="navbar__mobile-btn navbar__mobile-btn--danger"
                  onClick={handleLogout}
                >
                  Salir de la cuenta
                </button>
              </>
            ) : (
              <div className="navbar__mobile-auth-grid">
                <Link
                  to="/login"
                  className="navbar__mobile-btn navbar__mobile-btn--secondary"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Ingresar
                </Link>
                <Link
                  to="/registro"
                  className="navbar__mobile-btn navbar__mobile-btn--primary"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Crear cuenta
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  )
}

export default Navbar
