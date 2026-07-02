import Carousel from '../components/Carousel'
import ProductList from '../components/ProductList'
import Contact from '../components/Contact'

const Home = () => {
  return (
    <main id="inicio">

      {/* Hero con carrusel */}
      <Carousel />

      {/* Productos */}
      <ProductList />

      {/* Contacto */}
      <Contact />

    </main>
  )
}

export default Home