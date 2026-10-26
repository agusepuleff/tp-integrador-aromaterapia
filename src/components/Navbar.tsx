// Navbar.tsx — Barra de navegación moderna, sticky y responsive
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

  // Lleva al inicio de la página (si está en otra pantalla, vuelve primero a "/")
  const scrollToTop = (e: React.MouseEvent<HTMLAnchorElement>): void => {
    e.preventDefault()
    if (location.pathname !== '/') navigate('/')
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  // Desplaza a una sección (si está en otra pantalla, vuelve primero a "/")
  const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, id: string): void => {
    e.preventDefault()
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
    logout()
    navigate('/')
  }

  return (
    <header className="navbar">
      <div className="navbar__inner">
        {/* Logo / Marca - clickeable para volver al inicio */}
        <a
          href="#inicio"
          className="navbar__brand"
          onClick={scrollToTop}
          aria-label="Aromaterapia - Volver al inicio"
          title="Volver al inicio"
        >
          <span className="navbar__logo-icon">🌿</span>
          <span className="navbar__logo-text">
            Aroma<span>terapia</span>
          </span>
        </a>

        {/* Navegación - Enlaces con smooth scroll */}
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

        <div className="navbar__actions">
          {/* Sesión */}
          <div className="navbar__auth">
            {isAuthenticated ? (
              <>
                <Link to="/pedidos" className="navbar__auth-link">
                  Mis pedidos
                </Link>
                <span className="navbar__user" title={user?.email}>
                  {user?.email}
                </span>
                <button type="button" className="navbar__auth-btn" onClick={handleLogout}>
                  Salir
                </button>
              </>
            ) : (
              <>
                <Link to="/login" className="navbar__auth-link">
                  Ingresar
                </Link>
                <Link to="/registro" className="navbar__auth-link">
                  Registrarme
                </Link>
              </>
            )}
          </div>

          {/* Botón carrito con badge */}
          <button
            id="cart-toggle-btn"
            className="navbar__cart-btn"
            onClick={onCartOpen}
            aria-label={`Abrir carrito — ${itemCount} ${itemCount === 1 ? 'producto' : 'productos'}`}
            title="Abrir carrito de compras"
          >
            <span aria-hidden="true">🛒</span>
            <span className="navbar__cart-label">Carrito</span>
            {itemCount > 0 && (
              <span key={itemCount} className="navbar__cart-badge" aria-live="polite">
                {itemCount}
              </span>
            )}
          </button>
        </div>
      </div>
    </header>
  )
}

export default Navbar