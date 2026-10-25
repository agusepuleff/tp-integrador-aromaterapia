import { apiFetch } from './client'

// Forma que devuelve el backend (los decimales llegan como texto)
export interface ItemCarritoAPI {
  id: number
  producto: {
    id: number
    nombre: string
    precio: string
    stock: number
    imagen: string | null
  }
  cantidad: number
  subtotal: string
}

export interface CarritoAPI {
  id: number
  usuario: string
  items: ItemCarritoAPI[]
  cantidad_total_items: number
  total: string
}

interface RespuestaCarrito {
  mensaje: string
  carrito: CarritoAPI
}

export const getCarrito = (): Promise<CarritoAPI> =>
  apiFetch<CarritoAPI>('/api/carrito/')

// El backend suma la cantidad si el producto ya estaba en el carrito
export const agregarAlCarrito = (
  productoId: number,
  cantidad: number,
): Promise<RespuestaCarrito> =>
  apiFetch<RespuestaCarrito>('/api/carrito/agregar/', {
    method: 'POST',
    body: JSON.stringify({ producto_id: productoId, cantidad }),
  })

export const actualizarItem = (
  itemId: number,
  cantidad: number,
): Promise<RespuestaCarrito> =>
  apiFetch<RespuestaCarrito>(`/api/carrito/items/${itemId}/`, {
    method: 'PATCH',
    body: JSON.stringify({ cantidad }),
  })

export const eliminarItem = (itemId: number): Promise<RespuestaCarrito> =>
  apiFetch<RespuestaCarrito>(`/api/carrito/items/${itemId}/`, {
    method: 'DELETE',
  })

export const vaciarCarrito = (): Promise<RespuestaCarrito> =>
  apiFetch<RespuestaCarrito>('/api/carrito/vaciar/', {
    method: 'DELETE',
  })