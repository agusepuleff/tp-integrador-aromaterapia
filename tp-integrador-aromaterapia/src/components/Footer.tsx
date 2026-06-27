// Footer.tsx — Pie de página de la tienda
const Footer = () => {
  return (
    <footer className="footer" aria-label="Pie de página">
      <div className="footer__top">
        {/* Columna marca */}
        <div>
          <div className="footer__brand">
            <span className="footer__brand-icon" aria-hidden="true">🌿</span>
            <span className="footer__brand-name">Aromaterapia Natural</span>
          </div>
          <p className="footer__desc">
            Productos naturales de aromaterapia para tu bienestar. Aceites esenciales, difusores,
            velas y kits de relajación con la mejor calidad.
          </p>
        </div>

        {/* Columna: Productos */}
        <div>
          <p className="footer__col-title">Productos</p>
          <ul className="footer__links">
            <li><a href="#productos">Aceites Esenciales</a></li>
            <li><a href="#productos">Sets de Regalo</a></li>
            <li><a href="#productos">Difusores</a></li>
            <li><a href="#productos">Velas Aromáticas</a></li>
            <li><a href="#productos">Cuidado Personal</a></li>
          </ul>
        </div>

        {/* Columna: Información */}
        <div>
          <p className="footer__col-title">Información</p>
          <ul className="footer__links">
            <li><a href="#inicio">Sobre nosotros</a></li>
            <li><a href="#contacto">Contacto</a></li>
            <li><a href="#contacto">Envíos y entregas</a></li>
            <li><a href="#contacto">Preguntas frecuentes</a></li>
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
