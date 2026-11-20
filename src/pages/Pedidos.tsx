// Pedidos.tsx — Historial de pedidos del usuario (ruta protegida)
import { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { getPedidos } from '../api/pedidos'
import type { Pedido } from '../api/pedidos'
import { formatApiError } from '../api/client'

// Formatea un número como moneda argentina (ARS)
const formatPrice = (valor: number): string =>
  new Intl.NumberFormat('es-AR', {
    style: 'currency',
    currency: 'ARS',
    maximumFractionDigits: 0,
  }).format(valor)

const formatFecha = (iso: string): string =>
  new Date(iso).toLocaleString('es-AR', { dateStyle: 'medium', timeStyle: 'short' })

const Pedidos = () => {
  const location = useLocation()
  // Mensaje de éxito que envía el carrito después de finalizar la compra
  const mensajeExito = (location.state as { mensaje?: string } | null)?.mensaje

  const [pedidos, setPedidos] = useState<Pedido[]>([])
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    let cancelado = false

    getPedidos()
      .then((data) => {
        if (!cancelado) setPedidos(data)
      })
      .catch((err) => {
        if (!cancelado) setError(formatApiError(err))
      })
      .finally(() => {
        if (!cancelado) setLoading(false)
      })

    return () => {
      cancelado = true
    }
  }, [])

  return (
    <main className="orders-page">
      <div className="orders-page__header">
        <Link to="/" className="orders-page__back-link">
          ← Volver a la tienda
        </Link>
        <span className="orders-page__tag">🌿 Tu historial de compras</span>
        <h1 className="orders-page__title">Mis Pedidos</h1>
        <p className="orders-page__subtitle">
          Consultá el estado y detalle de cada uno de tus pedidos realizados.
        </p>
      </div>

      {mensajeExito && (
        <div className="orders-success" role="status">
          <span className="orders-success__icon" aria-hidden="true">✓</span>
          <div className="orders-success__content">
            <p className="orders-success__title">¡Compra realizada con éxito!</p>
            <p className="orders-success__desc">{mensajeExito}</p>
          </div>
        </div>
      )}

      {loading && (
        <div className="product-status">
          <p>Cargando tus pedidos…</p>
        </div>
      )}

      {error && !loading && (
        <div className="product-status product-status--error">
          <p>{error}</p>
          <Link to="/" className="orders-empty__btn" style={{ marginTop: '1rem', display: 'inline-block' }}>
            Volver a la tienda
          </Link>
        </div>
      )}

      {!loading && !error && pedidos.length === 0 && (
        <div className="orders-empty">
          <span className="orders-empty__icon" aria-hidden="true">🛍️</span>
          <h2 className="orders-empty__title">Todavía no realizaste ningún pedido</h2>
          <p className="orders-empty__desc">
            Explorá nuestra variedad de productos botánicos y aceites esenciales.
          </p>
          <Link to="/" className="orders-empty__btn">
            Ir al catálogo de productos →
          </Link>
        </div>
      )}

      {!loading && pedidos.length > 0 && (
        <div className="orders-list">
          {pedidos.map((pedido) => (
            <article key={pedido.id} className="order-card" aria-label={`Pedido ${pedido.id}`}>
              <header className="order-card__header">
                <div>
                  <h2 className="order-card__id">Pedido #{pedido.id}</h2>
                  <p className="order-card__date">{formatFecha(pedido.creado_en)}</p>
                </div>
                <span className={`order-status order-status--${pedido.estado}`}>
                  {pedido.estado_display}
                </span>
              </header>

              <ul className="order-card__items">
                {pedido.items.map((item) => (
                  <li key={item.id} className="order-card__item">
                    <span className="order-card__item-name">
                      {item.nombre_producto} <strong className="order-card__item-qty">× {item.cantidad}</strong>
                    </span>
                    <span className="order-card__item-price">{formatPrice(Number(item.subtotal))}</span>
                  </li>
                ))}
              </ul>

              {pedido.direccion_envio && (
                <div className="order-card__address">
                  <span className="order-card__address-icon" aria-hidden="true">📍</span>
                  <span>{pedido.direccion_envio}</span>
                </div>
              )}

              <footer className="order-card__footer">
                <span className="order-card__total-label">Total del pedido</span>
                <strong className="order-card__total-val">{formatPrice(Number(pedido.total))}</strong>
              </footer>
            </article>
          ))}
        </div>
      )}
    </main>
  )
}

export default Pedidos
