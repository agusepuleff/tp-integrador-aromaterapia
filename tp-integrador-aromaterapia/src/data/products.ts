// Interface que define la estructura de un producto
export interface Product {
  id: number
  nombre: string
  precio: number
  stock: number
  categoria: string
  img: string
  descripcion?: string
}


export const products: Product[] = [
  {
    id: 1,
    nombre: 'Combo 6 Aceites Esenciales A Elección',
    precio: 33600,
    categoria: 'Bienestar y Aromaterapia',
    stock: 15,
    descripcion: 'Elegí 6 aceites esenciales puros de nuestra colección completa.',
    img: 'https://encrypted-tbn3.gstatic.com/shopping?q=tbn:ANd9GcRf2fdRv3vpAPsccbs31Au8MdfS9EX0YFysHMwG6B-E0wrEVHRb4pz2CsukUPHrQXh9KeU4XaBQEHMRAxO-2Hv5UQJ79fQPk4ys5Jzhe18_Hl6RW4ha6r91EQ',
  },
  {
    id: 2,
    nombre: 'Limón — Aceite Esencial Puro',
    precio: 32500,
    categoria: 'Aceites Individuales',
    stock: 8,
    descripcion: 'Aceite esencial de limón 100% puro. Energizante y refrescante.',
    img: 'https://encrypted-tbn0.gstatic.com/shopping?q=tbn:ANd9GcQX10_GHMDSEugKxQWk-BIUnpUx8P-W8CQL-BHlo_A9YZqez8FBvEzL-Kn0hcXWsFX_OU6XwvwGkQEd9Xox61ryyU-mG0MAJbHr39FfxerOeZXDTwntxZN6nVlR',
  },
  {
    id: 3,
    nombre: 'Cliganic Set de Aromaterapia — 6 Aceites Esenciales',
    precio: 33250,
    categoria: 'Sets de Regalo',
    stock: 22,
    descripcion: 'Kit inicial ideal con los 6 aceites más populares de aromaterapia.',
    img: 'https://encrypted-tbn2.gstatic.com/shopping?q=tbn:ANd9GcQotOF6WJ_FFDi2H-wuK0MeuzrADgNyOrqOr1dMpZvbz6HUn8qJOrA2aMdfgy8Vyb05AgTXU5suEmLxTzxCHAHvzS0-yV79',
  },
  {
    id: 4,
    nombre: 'Bruma Sensorial 3 Fases',
    precio: 8500,
    categoria: 'Brumas Aromáticas',
    stock: 12,
    descripcion: 'Bruma relajante con aceites esenciales de lavanda y manzanilla.',
    img: 'https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?w=400&h=400&fit=crop',
  },
  {
    id: 5,
    nombre: 'Gotas Aromáticas para Objetos',
    precio: 6200,
    categoria: 'Aromaterapia Ambiental',
    stock: 20,
    descripcion: 'Gotas concentradas para perfumar ropa, almohadas y objetos del hogar.',
    img: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=400&fit=crop',
  },
  {
    id: 6,
    nombre: 'Disco Aromático Recargable',
    precio: 7800,
    categoria: 'Difusores Portátiles',
    stock: 15,
    descripcion: 'Difusor portátil recargable, perfecto para llevar a cualquier lugar.',
    img: 'https://images.unsplash.com/photo-1595521867364-35a41fce21f5?w=400&h=400&fit=crop',
  },
  {
    id: 7,
    nombre: 'Sales de Baño Relajantes',
    precio: 5016,
    categoria: 'Cuidado Personal',
    stock: 15,
    descripcion: 'Sales minerales enriquecidas con aceites esenciales de lavanda y rosa.',
    img: 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=400&h=400&fit=crop',
  },
  {
    id: 8,
    nombre: 'Vela Aromática — Jazmín Primavera',
    precio: 9800,
    categoria: 'Velas Aromáticas',
    stock: 35,
    descripcion: 'Vela de soja con fragancia de jazmín natural. Duración 45 horas.',
    img: 'https://images.unsplash.com/photo-1603006905003-be475563bc59?w=400&h=400&fit=crop',
  },
  {
    id: 9,
    nombre: 'Kit Lavanda Patagónica con Minidifusor',
    precio: 39516,
    categoria: 'Sets de Regalo',
    stock: 35,
    descripcion: 'Kit completo con aceite esencial de lavanda patagónica y difusor portátil USB.',
    img: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=400&h=400&fit=crop',
  },
  {
    id: 10,
    nombre: 'Aceite Esencial de Menta Pura 10ml',
    precio: 6749,
    categoria: 'Aceites Individuales',
    stock: 20,
    descripcion: 'Aceite esencial de menta piperita 100% puro. Refrescante y estimulante.',
    img: 'https://images.unsplash.com/photo-1515377905703-c4788e51af15?w=400&h=400&fit=crop',
  },
]
