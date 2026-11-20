// Footer.tsx — Pie de página elegante, accesible y responsive
import { useLocation, useNavigate } from 'react-router-dom'

const Footer = () => {
  const navigate = useNavigate()
  const location = useLocation()

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

  const scrollToTop = (e: React.MouseEvent<HTMLAnchorElement>): void => {
    e.preventDefault()
    if (location.pathname !== '/') {
      navigate('/')
    }
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <footer className="footer" aria-label="Pie de página">
      <div className="footer__top">
        {/* Columna marca */}
        <div className="footer__col footer__col--brand">
          <a href="#inicio" className="footer__brand" onClick={scrollToTop}>
            <span className="footer__brand-icon" aria-hidden="true">🌿</span>
            <span className="footer__brand-name">Aromaterapia Natural</span>
          </a>
          <p className="footer__desc">
            Productos botánicos y orgánicos elaborados para conectar con el bienestar,
            el equilibrio y la serenidad de tu hogar.
          </p>
          <div className="footer__badges">
            <span className="footer__badge">✓ 100% Puros</span>
            <span className="footer__badge">✓ Cruelty Free</span>
          </div>
        </div>

        {/* Columna: Productos */}
        <div className="footer__col">
          <p className="footer__col-title">Productos</p>
          <ul className="footer__links">
            <li>
              <a href="#productos" onClick={(e) => scrollToSection(e, 'productos')}>
                Aceites Esenciales
              </a>
            </li>
            <li>
              <a href="#productos" onClick={(e) => scrollToSection(e, 'productos')}>
                Sets de Regalo
              </a>
            </li>
            <li>
              <a href="#productos" onClick={(e) => scrollToSection(e, 'productos')}>
                Difusores y Lámparas
              </a>
            </li>
            <li>
              <a href="#productos" onClick={(e) => scrollToSection(e, 'productos')}>
                Velas Aromáticas
              </a>
            </li>
          </ul>
        </div>

        {/* Columna: Información */}
        <div className="footer__col">
          <p className="footer__col-title">Información y Ayuda</p>
          <ul className="footer__links">
            <li>
              <a href="#inicio" onClick={scrollToTop}>
                Sobre nosotros
              </a>
            </li>
            <li>
              <a href="#contacto" onClick={(e) => scrollToSection(e, 'contacto')}>
                Contacto y Consultas
              </a>
            </li>
            <li>
              <a href="#contacto" onClick={(e) => scrollToSection(e, 'contacto')}>
                Envíos y Entregas
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="footer__bottom">
        <p>© {new Date().getFullYear()} Aromaterapia Natural — Todos los derechos reservados</p>
      </div>
    </footer>
  )
}

export default Footer
