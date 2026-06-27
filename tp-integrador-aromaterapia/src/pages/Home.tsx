// Home.tsx — Página principal de la tienda
import ProductList from '../components/ProductList'

const Home = () => {
  return (
    <main id="inicio" className="home-layout">
      {/* Hero Section */}
      <section className="hero" aria-label="Bienvenida">
        <div className="hero__inner">
          <span className="hero__badge">✨ Bienestar Natural</span>

          <h1 className="hero__title">
            El poder de la <span>naturaleza</span><br />en tu hogar
          </h1>

          <p className="hero__subtitle">
            Descubrí nuestra colección de aceites esenciales puros, difusores y
            productos de aromaterapia para transformar tu espacio.
          </p>

          <a href="#productos" className="hero__cta">
            Ver productos →
          </a>

          {/* Íconos decorativos */}
          <div className="hero__decorations" aria-hidden="true">
            <div className="hero__deco-item">
              <span className="hero__deco-icon">🌿</span>
              <span className="hero__deco-label">100% Natural</span>
            </div>
            <div className="hero__deco-item">
              <span className="hero__deco-icon">💧</span>
              <span className="hero__deco-label">Aceites Puros</span>
            </div>
            <div className="hero__deco-item">
              <span className="hero__deco-icon">🕯️</span>
              <span className="hero__deco-label">Velas Artesanales</span>
            </div>
            <div className="hero__deco-item">
              <span className="hero__deco-icon">🌸</span>
              <span className="hero__deco-label">Bienestar</span>
            </div>
          </div>
        </div>
      </section>

      {/* Catálogo de productos */}
      <ProductList />
    </main>
  )
}

export default Home
