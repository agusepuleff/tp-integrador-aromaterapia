// ProductCard.tsx — Tarjeta individual de producto con soporte de placeholder botánico
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useCarritoContext } from '../context/CartContext'
import { useAuth } from '../context/AuthContext'
import { formatApiError } from '../api/client'
import type { Product } from '../types'

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
  const { isAuthenticated } = useAuth()
  const navigate = useNavigate()

  const [qty, setQty] = useState<number>(1)
  const [added, setAdded] = useState<boolean>(false)
  const [enviando, setEnviando] = useState<boolean>(false)
  const [error, setError] = useState<string | null>(null)
  const [imgError, setImgError] = useState<boolean>(false)

  const handleAdd = async (): Promise<void> => {
    // El carrito pertenece a un usuario: sin sesión, se lo manda a ingresar
    if (!isAuthenticated) {
      navigate('/login', { state: { from: '/' } })
      return
    }

    setError(null)
    setEnviando(true)
    try {
      await addToCart(product, qty)
      setAdded(true)
      setTimeout(() => setAdded(false), 1500)
    } catch (err) {
      setError(formatApiError(err))
    } finally {
      setEnviando(false)
    }
  }

  const handleQtyChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const value = Math.max(1, Math.min(Number(e.target.value), product.stock))
    setQty(value)
  }

  const hasValidImage = product.img && product.img.trim() !== '' && !imgError

  return (
    <article className="product-card" aria-label={`Producto: ${product.nombre}`}>
      {/* Contenedor de Imagen */}
      <div className="product-card__img-wrap">
        {hasValidImage ? (
          <img
            src={product.img}
            className="product-card__img"
            alt={product.nombre}
            loading="lazy"
            onError={() => setImgError(true)}
          />
        ) : (
          <div className="product-card__placeholder" aria-label="Imagen ilustrativa botánica">
            <svg
              className="product-card__placeholder-icon"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <path d="M12 2a9 9 0 0 1 9 9c0 4.97-4.03 9-9 9s-9-4.03-9-9a9 9 0 0 1 9-9Z" />
              <path d="M12 7c-2.5 2.5-3 6.5-1 9 2.5-2.5 3-6.5 1-9Z" />
              <path d="M7 12c2.5 2.5 6.5 3 9 1-2.5-2.5-6.5-3-9-1Z" />
            </svg>
            <span className="product-card__placeholder-text">Aromaterapia Natural</span>
          </div>
        )}

        {/* Insignia de categoría */}
        {product.categoria && (
          <span className="product-card__category-badge">{product.categoria}</span>
        )}
      </div>

      {/* Cuerpo de la tarjeta con alineación consistente */}
      <div className="product-card__body">
        <div className="product-card__info">
          <h3 className="product-card__name" title={product.nombre}>
            {product.nombre}
          </h3>

          {product.descripcion ? (
            <p className="product-card__description">{product.descripcion}</p>
          ) : (
            <p className="product-card__description product-card__description--empty">
              Producto puro y natural para tu bienestar y armonía diaria.
            </p>
          )}
        </div>

        {/* Sección inferior fija (alinea precios, stock y botones en todas las cards) */}
        <div className="product-card__bottom">
          <div className="product-card__meta">
            <p className="product-card__price">{formatPrice(product.precio)}</p>

            <span className={`product-card__stock ${product.stock <= 3 && product.stock > 0 ? 'low' : ''}`}>
              {product.stock === 0
                ? '✗ Sin stock'
                : product.stock <= 3
                  ? `⚠ Solo ${product.stock} disp.`
                  : `✓ En stock (${product.stock})`}
            </span>
          </div>

          <div className="product-card__actions">
            <input
              id={`qty-product-${product.id}`}
              type="number"
              className="product-card__qty"
              min={1}
              max={Math.max(1, product.stock)}
              value={qty}
              onChange={handleQtyChange}
              disabled={product.stock === 0}
              aria-label="Cantidad a comprar"
            />

            <button
              id={`add-btn-product-${product.id}`}
              type="button"
              className={`product-card__btn ${added ? 'added' : ''}`}
              onClick={handleAdd}
              disabled={product.stock === 0 || enviando}
              aria-label={`Agregar ${product.nombre} al carrito`}
            >
              {added ? '✓ Agregado' : enviando ? 'Agregando…' : 'Agregar al carrito'}
            </button>
          </div>

          {error && (
            <p className="product-card__error" role="alert">
              {error}
            </p>
          )}
        </div>
      </div>
    </article>
  )
}

export default ProductCard
