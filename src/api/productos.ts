import { apiFetch } from './client'
import type { Product } from '../types'

export interface Categoria {
  id: number
  nombre: string
}

// Forma que devuelve el backend
interface ProductoAPI {
  id: number
  nombre: string
  descripcion: string
  imagen: string
  marca: string
  precio: string        // DRF devuelve los decimales como texto
  stock: number
  categoria: number
  categoria_nombre: string
}

interface Paginado<T> {
  count: number
  next: string | null
  previous: string | null
  results: T[]
}

export interface FiltrosProductos {
  search?: string
  categoria?: string
  precioMin?: string
  precioMax?: string
  ordering?: string
  page?: number
}

// Adapta el producto del backend al tipo que usan los componentes
export const mapProducto = (p: ProductoAPI): Product => ({
  id: p.id,
  nombre: p.nombre,
  descripcion: p.descripcion,
  img: p.imagen,
  marca: p.marca,
  precio: Number(p.precio),
  stock: p.stock,
  categoria: p.categoria_nombre,
  categoriaId: p.categoria,
})

export async function getProductos(
  filtros: FiltrosProductos = {},
): Promise<{ count: number; results: Product[] }> {
  const params = new URLSearchParams()
  if (filtros.search) params.set('search', filtros.search)
  if (filtros.categoria) params.set('categoria', filtros.categoria)
  if (filtros.precioMin) params.set('precio_min', filtros.precioMin)
  if (filtros.precioMax) params.set('precio_max', filtros.precioMax)
  if (filtros.ordering) params.set('ordering', filtros.ordering)
  if (filtros.page) params.set('page', String(filtros.page))

  const query = params.toString()
  const data = await apiFetch<Paginado<ProductoAPI>>(
    `/api/productos/${query ? `?${query}` : ''}`,
  )
  return { count: data.count, results: data.results.map(mapProducto) }
}

export async function getCategorias(): Promise<Categoria[]> {
  const data = await apiFetch<Paginado<Categoria> | Categoria[]>('/api/productos/categorias/')
  return Array.isArray(data) ? data : data.results
}