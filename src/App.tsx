// App.tsx — Layout principal: maneja Navbar, contenido y Footer
// El estado `cartOpen` controla la visibilidad del drawer del carrito
import { useState } from 'react'
import { CarritoProvider } from './context/CartContext'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Cart from './components/Cart'
import Home from './pages/Home'

const App = () => {
  const [cartOpen, setCartOpen] = useState<boolean>(false)

  const openCart = (): void => setCartOpen(true)
  const closeCart = (): void => setCartOpen(false)

  return (
    <CarritoProvider>
      {/* Navbar con callback para abrir el drawer */}
      <Navbar onCartOpen={openCart} />

      {/* Página principal */}
      <Home />

      {/* Drawer del carrito (portal lateral) */}
      <Cart isOpen={cartOpen} onClose={closeCart} />

      {/* Footer */}
      <Footer />
    </CarritoProvider>
  )
}

export default App
