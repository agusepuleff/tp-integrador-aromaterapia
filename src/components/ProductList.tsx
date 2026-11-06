// ProductList.tsx — Catálogo conectado a la API, con filtros y paginación
import { useEffect, useState } from 'react'
import ProductCard from './ProductCard'
import { getProductos, getCategorias } from '../api/productos'
import type { Categoria } from '../api/productos'
import type { Product } from '../types'

const PAGE_SIZE = 10

const FILTROS_VACIOS = {
  search: '',
  categoria: '',
  precioMin: '',
  precioMax: '',
  ordering: '',
}

const ProductList = () => {
  const [productos, setProductos] = useState<Product[]>([])
  const [categorias, setCategorias] = useState<Categoria[]>([])
  const [total, setTotal] = useState<number>(0)
  const [page, setPage] = useState<number>(1)
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<string | null>(null)

  // draft = lo que se escribe en el formulario; filtros = lo que ya se aplicó
  const [draft, setDraft] = useState(FILTROS_VACIOS)
  const [filtros, setFiltros] = useState(FILTROS_VACIOS)

  // Categorías para el selector (una sola vez)
  useEffect(() => {
    getCategorias().then(setCategorias).catch(() => setCategorias([]))
  }, [])

  // Productos: se vuelven a pedir cuando cambian los filtros o la página
  useEffect(() => {
    let cancelado = false

    getProductos({ ...filtros, page })
      .then((data) => {
        if (cancelado) return
        setProductos(data.results)
        setTotal(data.count)
        setError(null)
      })
      .catch((e: Error) => {
        if (!cancelado) setError(e.message)
      })
      .finally(() => {
        if (!cancelado) setLoading(false)
      })

    return () => {
      cancelado = true
    }
  }, [filtros, page])

  const aplicarFiltros = (e: React.FormEvent): void => {
    e.preventDefault()
    setLoading(true)
    setError(null)
    setPage(1)
    setFiltros(draft)
  }

  const limpiarFiltros = (): void => {
    setLoading(true)
    setError(null)
    setDraft(FILTROS_VACIOS)
    setFiltros(FILTROS_VACIOS)
    setPage(1)
  }

  const totalPaginas = Math.max(1, Math.ceil(total / PAGE_SIZE))

  return (
    <section
      id="productos"
      className="product-list-section"
      aria-label="Catálogo de productos"
    >
      <div className="section-header">
        <span className="section-tag">🌿 Nuestro catálogo</span>
        <h2 className="section-title">Productos Naturales</h2>
        <p className="section-subtitle">
          Descubre nuestra selección de aceites esenciales,
          difusores y productos de bienestar.
        </p>
      </div>

      {/* Filtros */}
      <form className="product-filters" onSubmit={aplicarFiltros}>
        <input
          type="search"
          placeholder="Buscar por nombre…"
          value={draft.search}
          onChange={(e) => setDraft({ ...draft, search: e.target.value })}
          aria-label="Buscar por nombre"
        />

        <select
          value={draft.categoria}
          onChange={(e) => setDraft({ ...draft, categoria: e.target.value })}
          aria-label="Filtrar por categoría"
        >
          <option value="">Todas las categorías</option>
          {categorias.map((c) => (
            <option key={c.id} value={c.id}>
              {c.nombre}
            </option>
          ))}
        </select>

        <input
          type="number"
          min={0}
          placeholder="Precio mín."
          value={draft.precioMin}
          onChange={(e) => setDraft({ ...draft, precioMin: e.target.value })}
          aria-label="Precio mínimo"
        />

        <input
          type="number"
          min={0}
          placeholder="Precio máx."
          value={draft.precioMax}
          onChange={(e) => setDraft({ ...draft, precioMax: e.target.value })}
          aria-label="Precio máximo"
        />

        <select
          value={draft.ordering}
          onChange={(e) => setDraft({ ...draft, ordering: e.target.value })}
          aria-label="Ordenar por"
        >
          <option value="">Ordenar por…</option>
          <option value="precio">Precio: menor a mayor</option>
          <option value="-precio">Precio: mayor a menor</option>
          <option value="nombre">Nombre: A–Z</option>
        </select>

        <button type="submit">Filtrar</button>
        <button type="button" onClick={limpiarFiltros}>
          Limpiar
        </button>
      </form>

      {/* Estados */}
      {loading && (
        <p className="product-status">
          Cargando productos… la primera vez puede tardar hasta un minuto.
        </p>
      )}

      {error && !loading && (
        <p className="product-status product-status--error">
          {error}{' '}
            <button
              type="button"
              onClick={() => {
                setLoading(true)
                setError(null)
                setFiltros({ ...filtros })
              }}
            >
              Reintentar
            </button>
        </p>
      )}

      {!loading && !error && productos.length === 0 && (
        <p className="product-status">No se encontraron productos con esos filtros.</p>
      )}

      {/* Grilla */}
      {!loading && !error && productos.length > 0 && (
        <div className="product-grid" role="list" aria-label="Lista de productos">
          {productos.map((product) => (
            <div key={product.id} role="listitem" className="product-grid__item">
              <ProductCard product={product} />
            </div>
          ))}
        </div>
      )}

      {/* Paginación */}
      {!loading && !error && totalPaginas > 1 && (
        <nav className="product-pagination" aria-label="Paginación">
            <button
              disabled={page <= 1}
              onClick={() => {
                setLoading(true)
                setPage(page - 1)
              }}
            >
              ← Anterior
            </button>
            <span>
              Página {page} de {totalPaginas}
            </span>
              <button
                disabled={page >= totalPaginas}
                onClick={() => {
                  setLoading(true)
                  setPage(page + 1)
                }}
              >
                Siguiente →
              </button>
            </nav>
      )}
          </section>
          )
}

          export default ProductList