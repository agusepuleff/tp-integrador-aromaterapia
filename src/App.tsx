// App.tsx — Layout principal y rutas de la aplicación
import { useState } from 'react'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import { AuthProvider } from './context/AuthContext'
import { CarritoProvider } from './context/CartContext'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Cart from './components/Cart'
import Home from './pages/Home'
import Login from './pages/Login'
import Register from './pages/Register'
import Pedidos from './pages/Pedidos'
import ProtectedRoute from './components/ProtectedRoute'

const App = () => {
  const [cartOpen, setCartOpen] = useState<boolean>(false)

  return (
    <BrowserRouter>
      {/* AuthProvider va afuera: el carrito depende de si hay sesión */}
      <AuthProvider>
        <CarritoProvider>
          <Navbar onCartOpen={() => setCartOpen(true)} />

          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/registro" element={<Register />} />
            <Route
              path="/pedidos"
              element={
                <ProtectedRoute>
                  <Pedidos />
                </ProtectedRoute>
              }
            />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>

          <Cart isOpen={cartOpen} onClose={() => setCartOpen(false)} />
          <Footer />
        </CarritoProvider>
      </AuthProvider>
    </BrowserRouter>
  )
}

export default App