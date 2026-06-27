// Navbar.tsx — Barra de navegación con badge del carrito
import { useCarritoContext } from '../context/CartContext'

interface NavbarProps {
  onCartOpen: () => void
}

const Navbar = ({ onCartOpen }: NavbarProps) => {
  const { getTotalCart } = useCarritoContext()
  const itemCount = getTotalCart()

  return (
    <header className="navbar">
      <div className="navbar__inner">
        {/* Logo / Marca */}
        <a href="#" className="navbar__brand">
          <span className="navbar__logo-icon">🌿</span>
          <span className="navbar__logo-text">
            Aroma<span>terapia</span>
          </span>
        </a>

        {/* Navegación */}
        <nav className="navbar__nav" aria-label="Menú principal">
          <a href="#inicio" className="navbar__link">Inicio</a>
          <a href="#productos" className="navbar__link">Productos</a>
          <a href="#contacto" className="navbar__link">Contacto</a>
        </nav>

        {/* Botón carrito con badge */}
        <button
          id="cart-toggle-btn"
          className="navbar__cart-btn"
          onClick={onCartOpen}
          aria-label={`Abrir carrito — ${itemCount} ${itemCount === 1 ? 'producto' : 'productos'}`}
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
    </header>
  )
}

export default Navbar
