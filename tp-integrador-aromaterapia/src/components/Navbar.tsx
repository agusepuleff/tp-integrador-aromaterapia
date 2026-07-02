// Navbar.tsx — Barra de navegación moderna, sticky y responsive
import { useCarritoContext } from '../context/CartContext'

interface NavbarProps {
  onCartOpen: () => void
}

const Navbar = ({ onCartOpen }: NavbarProps) => {
  const { getTotalCart } = useCarritoContext()
  const itemCount = getTotalCart()

  // Función para desplazamiento suave al inicio
  const scrollToTop = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault()
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    })
  }

  // Función para desplazamiento suave a una sección
  const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault()
    const element = document.getElementById(id)
    if (element) {
      element.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      })
    }
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
          <a 
            href="#inicio" 
            className="navbar__link"
            onClick={scrollToTop}
          >
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

        {/* Botón carrito con badge - Alineado a la derecha */}
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
    </header>
  )
}

export default Navbar

