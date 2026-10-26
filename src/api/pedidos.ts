import { apiFetch } from './client'

// Forma que devuelve el backend (los decimales llegan como texto)
export interface ItemPedido {
  id: number
  producto_id: number
  nombre_producto: string
  precio_unitario: string
  cantidad: number
  subtotal: string
}

export interface Pedido {
  id: number
  usuario: string
  estado: 'pendiente' | 'pagado' | 'enviado' | 'cancelado'
  estado_display: string
  total: string
  direccion_envio: string
  cantidad_items: number
  items: ItemPedido[]
  creado_en: string
  actualizado_en: string
}

interface RespuestaCheckout {
  mensaje: string
  pedido: Pedido
}

// Convierte el carrito en un pedido (el backend descuenta el stock y vacía el carrito)
export const finalizarCompra = (direccionEnvio: string): Promise<RespuestaCheckout> =>
  apiFetch<RespuestaCheckout>('/api/pedidos/checkout/', {
    method: 'POST',
    body: JSON.stringify({ direccion_envio: direccionEnvio }),
  })

// Historial de pedidos del usuario autenticado (del más reciente al más antiguo)
export const getPedidos = (): Promise<Pedido[]> => apiFetch<Pedido[]>('/api/pedidos/')