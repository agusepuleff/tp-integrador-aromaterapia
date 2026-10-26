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
      <h1>Mis pedidos</h1>

      {mensajeExito && (
        <p className="orders-success" role="status">
          ✓ {mensajeExito}
        </p>
      )}

      {loading && <p className="product-status">Cargando tus pedidos…</p>}

      {error && !loading && (
        <p className="product-status product-status--error">{error}</p>
      )}

      {!loading && !error && pedidos.length === 0 && (
        <p className="product-status">
          Todavía no realizaste ningún pedido. <Link to="/">Ir a la tienda</Link>
        </p>
      )}

      <div className="orders-list">
        {pedidos.map((pedido) => (
          <article key={pedido.id} className="order-card" aria-label={`Pedido ${pedido.id}`}>
            <header className="order-card__header">
              <div>
                <h2>Pedido #{pedido.id}</h2>
                <p className="order-card__date">{formatFecha(pedido.creado_en)}</p>
              </div>
              <span className={`order-status order-status--${pedido.estado}`}>
                {pedido.estado_display}
              </span>
            </header>

            <ul className="order-card__items">
              {pedido.items.map((item) => (
                <li key={item.id}>
                  <span>
                    {item.nombre_producto} × {item.cantidad}
                  </span>
                  <span>{formatPrice(Number(item.subtotal))}</span>
                </li>
              ))}
            </ul>

            {pedido.direccion_envio && (
              <p className="order-card__address">📍 {pedido.direccion_envio}</p>
            )}

            <footer className="order-card__footer">
              <span>Total</span>
              <strong>{formatPrice(Number(pedido.total))}</strong>
            </footer>
          </article>
        ))}
      </div>
    </main>
  )
}

export default Pedidos