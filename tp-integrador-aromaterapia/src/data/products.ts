//Interface que define la estructura de un producto
export interface Product {
 id: number
 nombre: string
 precio: number
 stock: number
 categoria: string
 img: string
}


export const products: Product[] = [
 {
   id: 1,
   nombre: 'Combo 6 Aceites Esenciales A Elección ',
   precio: 33.600,
   categoria: 'Bienestar y Aromaterapia',
   stock: 15,
   img: 'https://encrypted-tbn3.gstatic.com/shopping?q=tbn:ANd9GcRf2fdRv3vpAPsccbs31Au8MdfS9EX0YFysHMwG6B-E0wrEVHRb4pz2CsukUPHrQXh9KeU4XaBQEHMRAxO-2Hv5UQJ79fQPk4ys5Jzhe18_Hl6RW4ha6r91EQ'
 },
 {
   id: 2,
   nombre: 'Limón / Aceite Esencial',
   precio: 32.500 ,
   categoria: 'Aceites Individuales / Cítricos' ,
   stock: 8,
   img: 'https://encrypted-tbn0.gstatic.com/shopping?q=tbn:ANd9GcQX10_GHMDSEugKxQWk-BIUnpUx8P-W8CQL-BHlo_A9YZqez8FBvEzL-Kn0hcXWsFX_OU6XwvwGkQEd9Xox61ryyU-mG0MAJbHr39FfxerOeZXDTwntxZN6nVlR'
 },
 {
   id: 3,
   nombre: 'Cliganic The Basics Set de aromaterapia con aceites esenciales',
   precio: 33.250 ,
   categoria: 'Sets de Regalo / Kits de Inicio' ,
   stock: 22,
   img: 'https://encrypted-tbn2.gstatic.com/shopping?q=tbn:ANd9GcQotOF6WJ_FFDi2H-wuK0MeuzrADgNyOrqOr1dMpZvbz6HUn8qJOrA2aMdfgy8Vyb05AgTXU5suEmLxTzxCHAHvzS0-yV79'
 },
 {
   id: 4,
   nombre: 'Bruma Sensorial 3 Fases',
   precio: 8500 ,
   categoria: 'Brumas Aromáticas' ,
   stock: 12,
   img: 'https://images.pokemontcg.io/base1/4.png'
 },
 {
   id: 5,
   nombre: 'Gotas para Objetos',
   precio: 6200,
   categoria: 'Aromaterapia Ambiental' ,
   stock: 20,
   img: 'https://images.pokemontcg.io/swsh3/20.png'
 },
 {
   id: 6,
   nombre: 'Disco Aromático Recargable',
   precio: 7800,
   categoria: 'Difusores Portátiles' ,
   stock: 15,
   img: 'https://images.pokemontcg.io/base5/4.png'
 },
 {
   id: 7,
   nombre: 'Sales de baño',
   precio: 5016,
   categoria: 'Cuidado personal' ,
   stock: 15,
   img: 'https://images.pokemontcg.io/base4/22.png'
 },
 {
   id: 8,
   nombre: 'Vela Aromática primavera - Jazmín',
   precio: 9800,
   categoria: 'Vela aromaticas' ,
   stock: 35,
   img: 'https://images.pokemontcg.io/base1/2.png'
 },
 {
   id: 9,
   nombre: 'Kit lavanda patagónica con minidifusor',
   precio:  39516,
   categoria: 'Vela aromaticas' ,
   stock: 35,
   img: 'https://images.pokemontcg.io/dp3/2.png'
 },
 {
   id: 10,
   nombre: 'Aceite Esencial de Menta Puro 10ml Fresco',
   precio: 6749,
   categoria: 'Aceites Esenciales' ,
   stock: 20,
   img: 'https://images.pokemontcg.io/base1/15.png'
 }
 
]
