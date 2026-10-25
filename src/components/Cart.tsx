// Cart.tsx — Panel lateral (drawer) del carrito de compras
import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useCarritoContext } from '../context/CartContext'
import { useAuth } from '../context/AuthContext'
import { formatApiError } from '../api/client'

interface CartProps {
  isOpen: boolean
  onClose: () => void
}

// Formatea un número como moneda argentina (ARS)
const formatPrice = (precio: number): string =>
  new Intl.NumberFormat('es-AR', {
    style: 'currency',
    currency: 'ARS',
    maximumFractionDigits: 0,
  }).format(precio)

const Cart = ({ isOpen, onClose }: CartProps) => {
  const {
    carrito,
    updateQuantity,
    removeFromCart,
    clearCart,
    getTotalCart,
    getTotalPrice,
    getItemSubtotal,
  } = useCarritoContext()
  const { isAuthenticated } = useAuth()

  const [error, setError] = useState<string | null>(null)
  const [ocupado, setOcupado] = useState<boolean>(false)

  if (!isOpen) return null

  const totalUnidades = getTotalCart()
  const totalPrecio = getTotalPrice()

  // Ejecuta una acción del carrito mostrando el error del backend si falla
  const ejecutar = async (accion: () => Promise<void>): Promise<void> => {
    setError(null)
    setOcupado(true)
    try {
      await accion()
    } catch (err) {
      setError(formatApiError(err))
    } finally {
      setOcupado(false)
    }
  }

  return (
    <>
      {/* Overlay oscuro detrás del drawer */}
      <div
        className="cart-overlay"
        onClick={onClose}
        aria-hidden="true"
        role="presentation"
      />

      {/* Panel lateral del carrito */}
      <aside
        id="cart-drawer"
        className="cart-drawer"
        role="dialog"
        aria-modal="true"
        aria-label="Carrito de compras"
      >
        {/* Encabezado */}
        <div className="cart-drawer__header">
          <h2 className="cart-drawer__title">
            🛒 Mi carrito
            {totalUnidades > 0 && (
              <span className="cart-drawer__count">
                ({totalUnidades} {totalUnidades === 1 ? 'producto' : 'productos'})
              </span>
            )}
          </h2>
          <button
            id="cart-close-btn"
            className="cart-drawer__close"
            onClick={onClose}
            aria-label="Cerrar carrito"
          >
            ✕
          </button>
        </div>

        {/* Cuerpo: sin sesión, vacío o lista de ítems */}
        <div className="cart-drawer__body">
          {!isAuthenticated ? (
            <div className="cart-empty">
              <span className="cart-empty__icon" aria-hidden="true">🔒</span>
              <p className="cart-empty__text">Iniciá sesión para usar tu carrito</p>
              <p className="cart-empty__hint">
                Tu carrito se guarda en tu cuenta.{' '}
                <Link to="/login" state={{ from: '/' }} onClick={onClose}>
                  Ingresar
                </Link>{' '}
                o{' '}
                <Link to="/registro" onClick={onClose}>
                  crear una cuenta
                </Link>
                .
              </p>
            </div>
          ) : carrito.length === 0 ? (
            <div className="cart-empty">
              <span className="cart-empty__icon" aria-hidden="true">🌿</span>
              <p className="cart-empty__text">Tu carrito está vacío</p>
              <p className="cart-empty__hint">
                Explorá nuestros productos y agregá los que más te gusten.
              </p>
            </div>
          ) : (
            <ul aria-label="Productos en el carrito">
              {carrito.map((item) => (
                <li key={item.itemId} className="cart-item">
                  {/* Imagen del producto */}
                  <img
                    className="cart-item__img"
                    src={item.img}
                    alt={item.nombre}
                    loading="lazy"
                  />

                  {/* Información del ítem */}
                  <div className="cart-item__info">
                    <p className="cart-item__name">{item.nombre}</p>
                    <p className="cart-item__qty">{formatPrice(item.precio)} c/u</p>

                    {/* Cantidad: el backend valida el stock */}
                    <div className="cart-item__qty-controls">
                      <button
                        type="button"
                        onClick={() => ejecutar(() => updateQuantity(item.id, item.quantity - 1))}
                        disabled={ocupado || item.quantity <= 1}
                        aria-label={`Quitar una unidad de ${item.nombre}`}
                      >
                        −
                      </button>
                      <span aria-live="polite">{item.quantity}</span>
                      <button
                        type="button"
                        onClick={() => ejecutar(() => updateQuantity(item.id, item.quantity + 1))}
                        disabled={ocupado || item.quantity >= item.stock}
                        aria-label={`Agregar una unidad de ${item.nombre}`}
                      >
                        +
                      </button>
                    </div>

                    <p className="cart-item__subtotal">
                      Subtotal: {formatPrice(getItemSubtotal(item.id))}
                    </p>
                  </div>

                  {/* Botón eliminar ítem */}
                  <button
                    id={`remove-item-${item.id}`}
                    className="cart-item__remove"
                    onClick={() => ejecutar(() => removeFromCart(item.id))}
                    disabled={ocupado}
                    aria-label={`Eliminar ${item.nombre} del carrito`}
                    title="Eliminar producto"
                  >
                    ✕
                  </button>
                </li>
              ))}
            </ul>
          )}

          {error && (
            <p className="cart-error" role="alert">
              {error}
            </p>
          )}
        </div>

        {/* Pie del drawer con resumen y acciones */}
        {isAuthenticated && carrito.length > 0 && (
          <div className="cart-drawer__footer">
            <div className="cart-summary" aria-label="Resumen del carrito">
              <div className="cart-summary__row">
                <span>Cantidad de productos</span>
                <span>{totalUnidades}</span>
              </div>
              <div className="cart-summary__row total">
                <span>Total</span>
                <span>{formatPrice(totalPrecio)}</span>
              </div>
            </div>

            <div className="cart-footer__actions">
              <button
                id="clear-cart-btn"
                className="cart-btn-clear"
                onClick={() => ejecutar(clearCart)}
                disabled={ocupado}
                aria-label="Vaciar carrito completo"
              >
                🗑 Vaciar
              </button>
              {/* Se conecta al checkout en la tanda 5C */}
              <button
                id="checkout-btn"
                className="cart-btn-checkout"
                aria-label="Proceder al pago"
              >
                Finalizar compra →
              </button>
            </div>
          </div>
        )}
      </aside>
    </>
  )
}

export default Cart