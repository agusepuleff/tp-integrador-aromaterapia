// CartContext.tsx — Carrito de compras conectado a la API
// El carrito vive en el servidor: acá solo se guarda la última copia que devolvió el backend.
import { createContext, useContext, useEffect, useMemo, useState } from 'react'
import type { ReactNode } from 'react'
import { useAuth } from './AuthContext'
import {
  actualizarItem,
  agregarAlCarrito,
  eliminarItem,
  getCarrito,
  vaciarCarrito,
} from '../api/carrito'
import type { CarritoAPI } from '../api/carrito'
import type { Product } from '../types'

// Cada ítem del carrito, listo para mostrar
export interface CarritoItem {
  itemId: number // id del ítem en el carrito (lo usa la API)
  id: number // id del producto
  nombre: string
  precio: number
  img: string
  stock: number
  quantity: number
  subtotal: number
}

interface CarritoContextType {
  carrito: CarritoItem[]
  addToCart: (product: Product, quantity: number) => Promise<void>
  updateQuantity: (id: number, quantity: number) => Promise<void>
  removeFromCart: (id: number) => Promise<void>
  clearCart: () => Promise<void>
  refreshCart: () => Promise<void>
  getTotalCart: () => number
  getTotalPrice: () => number
  getItemSubtotal: (id: number) => number
}

const CarritoContext = createContext<CarritoContextType | undefined>(undefined)

export const useCarritoContext = (): CarritoContextType => {
  const context = useContext(CarritoContext)
  if (!context) throw new Error('useCarritoContext debe usarse dentro de CarritoProvider')
  return context
}

export const CarritoProvider = ({ children }: { children: ReactNode }) => {
  const { isAuthenticated, user } = useAuth()
  const [data, setData] = useState<CarritoAPI | null>(null)

  // Solo se muestra el carrito si pertenece al usuario que tiene la sesión iniciada
  const visible: CarritoAPI | null =
    isAuthenticated && data !== null && data.usuario === user?.email ? data : null

  const carrito: CarritoItem[] = useMemo(
    () =>
      visible
        ? visible.items.map((item) => ({
            itemId: item.id,
            id: item.producto.id,
            nombre: item.producto.nombre,
            precio: Number(item.producto.precio),
            img: item.producto.imagen ?? '',
            stock: item.producto.stock,
            quantity: item.cantidad,
            subtotal: Number(item.subtotal),
          }))
        : [],
    [visible],
  )

  // Al iniciar sesión se trae el carrito guardado en el servidor
  useEffect(() => {
    if (!isAuthenticated) return
    let cancelado = false

    getCarrito()
      .then((c) => {
        if (!cancelado) setData(c)
      })
      .catch(() => undefined)

    return () => {
      cancelado = true
    }
  }, [isAuthenticated, user?.email])

  // Agrega un producto (el backend valida que no se supere el stock)
  const addToCart = async (product: Product, quantity: number): Promise<void> => {
    const respuesta = await agregarAlCarrito(product.id, quantity)
    setData(respuesta.carrito)
  }

  const removeFromCart = async (id: number): Promise<void> => {
    const item = carrito.find((p) => p.id === id)
    if (!item) return
    const respuesta = await eliminarItem(item.itemId)
    setData(respuesta.carrito)
  }

  const updateQuantity = async (id: number, quantity: number): Promise<void> => {
    const item = carrito.find((p) => p.id === id)
    if (!item) return
    if (quantity < 1) {
      await removeFromCart(id)
      return
    }
    const respuesta = await actualizarItem(item.itemId, quantity)
    setData(respuesta.carrito)
  }

  const clearCart = async (): Promise<void> => {
    const respuesta = await vaciarCarrito()
    setData(respuesta.carrito)
  }

  // Vuelve a pedir el carrito al servidor (se usa después de finalizar la compra)
  const refreshCart = async (): Promise<void> => {
    setData(await getCarrito())
  }

  const getTotalCart = (): number => visible?.cantidad_total_items ?? 0
  const getTotalPrice = (): number => Number(visible?.total ?? 0)
  const getItemSubtotal = (id: number): number =>
    carrito.find((p) => p.id === id)?.subtotal ?? 0

  return (
    <CarritoContext.Provider
      value={{
        carrito,
        addToCart,
        updateQuantity,
        removeFromCart,
        clearCart,
        refreshCart,
        getTotalCart,
        getTotalPrice,
        getItemSubtotal,
      }}
    >
      {children}
    </CarritoContext.Provider>
  )
}

export default CarritoProvider