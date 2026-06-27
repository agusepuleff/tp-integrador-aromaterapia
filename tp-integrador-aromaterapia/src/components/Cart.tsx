// Cart.tsx — Panel lateral (drawer) del carrito de compras
import { useCarritoContext } from '../context/CartContext'

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
  const { carrito, removeFromCart, clearCart, getTotalCart, getTotalPrice, getItemSubtotal } =
    useCarritoContext()

  if (!isOpen) return null

  const totalUnidades = getTotalCart()
  const totalPrecio = getTotalPrice()

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

        {/* Cuerpo: lista de ítems o estado vacío */}
        <div className="cart-drawer__body">
          {carrito.length === 0 ? (
            <div className="cart-empty">
              <span className="cart-empty__icon" aria-hidden="true">🌿</span>
              <p className="cart-empty__text">Tu carrito está vacío</p>
              <p className="cart-empty__hint">Explorá nuestros productos y agregá los que más te gusten.</p>
            </div>
          ) : (
            <ul aria-label="Productos en el carrito">
              {carrito.map((item) => (
                <li key={item.id} className="cart-item">
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
                    <p className="cart-item__qty">
                      {formatPrice(item.precio)} × {item.quantity} {item.quantity === 1 ? 'unidad' : 'unidades'}
                    </p>
                    <p className="cart-item__subtotal">
                      Subtotal: {formatPrice(getItemSubtotal(item.id))}
                    </p>
                  </div>

                  {/* Botón eliminar ítem */}
                  <button
                    id={`remove-item-${item.id}`}
                    className="cart-item__remove"
                    onClick={() => removeFromCart(item.id)}
                    aria-label={`Eliminar ${item.nombre} del carrito`}
                    title="Eliminar producto"
                  >
                    ✕
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Pie del drawer con resumen y acciones */}
        {carrito.length > 0 && (
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
                onClick={clearCart}
                aria-label="Vaciar carrito completo"
              >
                🗑 Vaciar
              </button>
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