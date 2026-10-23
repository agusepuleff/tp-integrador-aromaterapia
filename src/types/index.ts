// Tipos compartidos del frontend

export interface Product {
  id: number
  nombre: string
  precio: number
  stock: number
  categoria: string      // nombre de la categoría
  categoriaId?: number
  img: string
  descripcion?: string
  marca?: string
}