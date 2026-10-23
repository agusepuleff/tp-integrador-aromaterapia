// CartContext.tsx — Context API para el carrito de compras
import { useState, createContext, useContext } from 'react'
import type { ReactNode } from 'react'
import type { Product } from '../types'


// Tipo de cada ítem del carrito (producto + cantidad)
export interface CarritoItem extends Product {
  quantity: number
}


// Interfaz del contexto: estado + funciones disponibles para los componentes
interface CarritoContextType {
  carrito: CarritoItem[]
  addToCart: (product: Product, quantity: number) => void
  removeFromCart: (id: number) => void
  clearCart: () => void
  getTotalCart: () => number
  getTotalPrice: () => number
  getItemSubtotal: (id: number) => number
}


// Creación del contexto con valor inicial undefined (requiere estar dentro del Provider)
const CarritoContext = createContext<CarritoContextType | undefined>(undefined)


// Hook personalizado para consumir el contexto con validación
export const useCarritoContext = (): CarritoContextType => {
  const context = useContext(CarritoContext)
  if (!context) throw new Error('useCarritoContext debe usarse dentro de CarritoProvider')
  return context
}


// Provider del carrito: contiene el estado y las funciones de negocio
export const CarritoProvider = ({ children }: { children: ReactNode }) => {
  const [carrito, setCarrito] = useState<CarritoItem[]>([])


  // Verifica si un producto ya está en el carrito
  const isInCart = (id: number): boolean => carrito.some(p => p.id === id)


  // Agrega un producto al carrito o actualiza su cantidad si ya existe
  const addToCart = (product: Product, quantity: number): void => {
    if (quantity > product.stock) {
      console.warn('No hay stock suficiente')
      return
    }

    const index = carrito.findIndex(p => p.id === product.id)

    if (isInCart(product.id)) {
      // Si ya existe, actualiza la cantidad
      const updated = [...carrito]
      updated[index] = { ...updated[index], quantity }
      setCarrito(updated)
    } else {
      // Si no existe, lo agrega con la cantidad indicada
      setCarrito(prev => [...prev, { ...product, quantity }])
    }
  }


  // Elimina un producto del carrito por su id
  const removeFromCart = (id: number): void =>
    setCarrito(prev => prev.filter(p => p.id !== id))


  // Vacía el carrito completo
  const clearCart = (): void => setCarrito([])


  // Retorna la cantidad total de unidades en el carrito
  const getTotalCart = (): number =>
    carrito.reduce((acum, p) => acum + p.quantity, 0)


  // Retorna el precio total de todos los ítems del carrito
  const getTotalPrice = (): number =>
    carrito.reduce((acum, p) => acum + p.precio * p.quantity, 0)


  // Retorna el subtotal de un ítem específico (precio × cantidad)
  const getItemSubtotal = (id: number): number => {
    const item = carrito.find(p => p.id === id)
    return item ? item.precio * item.quantity : 0
  }


  return (
    <CarritoContext.Provider
      value={{ carrito, addToCart, removeFromCart, clearCart, getTotalCart, getTotalPrice, getItemSubtotal }}
    >
      {children}
    </CarritoContext.Provider>
  )
}

export default CarritoProvider
