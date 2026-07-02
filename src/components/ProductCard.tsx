// ProductCard.tsx — Tarjeta individual de producto con nuevo diseño

import { useState } from 'react'
import { useCarritoContext } from '../context/CartContext'
import type { Product } from '../data/products'

interface ProductCardProps {
  product: Product
}

// Formatea un número como moneda argentina (ARS)
const formatPrice = (precio: number): string =>
  new Intl.NumberFormat('es-AR', {
    style: 'currency',
    currency: 'ARS',
    maximumFractionDigits: 0,
  }).format(precio)

const ProductCard = ({ product }: ProductCardProps) => {
  const { addToCart } = useCarritoContext()
  const [qty, setQty] = useState<number>(1)
  const [added, setAdded] = useState<boolean>(false)

  const handleAdd = (): void => {
    addToCart(product, qty)
    setAdded(true)
    setTimeout(() => setAdded(false), 1500)
  }

  const handleQtyChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ): void => {
    const value = Math.max(
      1,
      Math.min(Number(e.target.value), product.stock)
    )
    setQty(value)
  }

  return (
    <article
      className="product-card"
      aria-label={`Producto: ${product.nombre}`}
    >
      {/* Imagen */}
      <div className="product-card__img-wrap">
        <img
          src={product.img}
          className="product-card__img"
          alt={product.nombre}
          loading="lazy"
        />

        {/* Insignia de categoría */}
        <span className="product-card__category-badge">
          {product.categoria}
        </span>
      </div>

      {/* Cuerpo de la tarjeta */}
      <div className="product-card__body">
        {/* Nombre del producto */}
        <h3 className="product-card__name">
          {product.nombre}
        </h3>

        {/* Precio destacado */}
        <p className="product-card__price">
          {formatPrice(product.precio)}
        </p>

        {/* Stock disponible */}
        <p
          className={`product-card__stock ${
            product.stock <= 3 ? 'low' : ''
          }`}
        >
          {product.stock === 0
            ? '✗ Sin stock'
            : product.stock <= 3
              ? `⚠ Solo ${product.stock} en stock`
              : `✓ Stock disponible (${product.stock})`}
        </p>

        {/* Descripción del producto */}
        {product.descripcion && (
          <p className="product-card__description">
            {product.descripcion}
          </p>
        )}

        {/* Acciones: cantidad + botón agregar */}
        <div className="product-card__actions">
          <input
            id={`qty-product-${product.id}`}
            type="number"
            className="product-card__qty"
            min={1}
            max={product.stock}
            value={qty}
            onChange={handleQtyChange}
            disabled={product.stock === 0}
            aria-label="Cantidad"
          />

          <button
            id={`add-btn-product-${product.id}`}
            className={`product-card__btn ${
              added ? 'added' : ''
            }`}
            onClick={handleAdd}
            disabled={product.stock === 0}
            aria-label={`Agregar ${product.nombre} al carrito`}
          >
            {added ? '✓ Agregado' : 'Agregar al carrito'}
          </button>
        </div>
      </div>
    </article>
  )
}

export default ProductCard
