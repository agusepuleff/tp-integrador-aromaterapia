// ProductList.tsx — Lista de los primeros 10 productos del catálogo

import { products } from '../data/products'
import ProductCard from './ProductCard'

const ProductList = () => {
  // Limitar a los primeros 10 productos
  const displayProducts = products.slice(0, 10)

  return (
    <section
      id="productos"
      className="product-list-section"
      aria-label="Catálogo de productos"
    >
      <div className="section-header">
        <span className="section-tag">🌿 Nuestro catálogo</span>

        <h2 className="section-title">
          Productos Naturales
        </h2>

        <p className="section-subtitle">
          Descubre nuestra selección de aceites esenciales,
          difusores y productos de bienestar.
        </p>
      </div>

      <div
        className="product-grid"
        role="list"
        aria-label="Lista de productos"
      >
        {displayProducts.map((product) => (
          <div
            key={product.id}
            role="listitem"
            className="product-grid__item"
          >
            <ProductCard product={product} />
          </div>
        ))}
      </div>
    </section>
  )
}

export default ProductList