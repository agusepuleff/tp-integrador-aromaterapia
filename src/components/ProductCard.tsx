// ProductCard.tsx — Tarjeta individual de producto
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
      // Por ejemplo: "Stock insuficiente para ..."
      setError(formatApiError(err))
    } finally {
      setEnviando(false)
    }
  }

  const handleQtyChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const value = Math.max(1, Math.min(Number(e.target.value), product.stock))
    setQty(value)
  }

  return (
    <article className="product-card" aria-label={`Producto: ${product.nombre}`}>
      {/* Imagen */}
      <div className="product-card__img-wrap">
        <img
          src={product.img}
          className="product-card__img"
          alt={product.nombre}
          loading="lazy"
        />

        {/* Insignia de categoría */}
        <span className="product-card__category-badge">{product.categoria}</span>
      </div>

      {/* Cuerpo de la tarjeta */}
      <div className="product-card__body">
        <h3 className="product-card__name">{product.nombre}</h3>

        <p className="product-card__price">{formatPrice(product.precio)}</p>

        {/* Stock disponible */}
        <p className={`product-card__stock ${product.stock <= 3 ? 'low' : ''}`}>
          {product.stock === 0
            ? '✗ Sin stock'
            : product.stock <= 3
              ? `⚠ Solo ${product.stock} en stock`
              : `✓ Stock disponible (${product.stock})`}
        </p>

        {product.descripcion && (
          <p className="product-card__description">{product.descripcion}</p>
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
    </article>
  )
}

export default ProductCard