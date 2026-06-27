// ProductList.tsx — Lista de todos los productos del catálogo
import { products } from '../data/products'
import ProductCard from './ProductCard'

const ProductList = () => {
  return (
    <section id="productos" className="product-list-section" aria-label="Catálogo de productos">
      <div className="section-header">
        <span className="section-tag">🌿 Nuestro catálogo</span>
        <h2 className="section-title">Productos Naturales</h2>
        <p className="section-subtitle">
          Descubrí nuestra selección de aceites esenciales, difusores y productos de bienestar.
        </p>
      </div>

      <div className="product-grid" role="list" aria-label="Lista de productos">
        {products.map((product) => (
          <div key={product.id} role="listitem">
            <ProductCard product={product} />
          </div>
        ))}
      </div>
    </section>
  )
}

export default ProductList
