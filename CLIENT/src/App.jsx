import { Routes, Route } from 'react-router-dom'
import { HomeView, AdminView, LoginView, NotFound, RegisterView, PropertyView, CartView } from './views/Index'
import Navigation from './components/Navigation'
import Footer from './components/Footer'
import 'bootstrap/dist/css/bootstrap.min.css'
import UserView from './views/UserView'

const App = () => {
  return (
    <>
      <Navigation />
      <Routes>
        <Route path='/' element={<HomeView />} />
        <Route path='/registro' element={<RegisterView />} />
        <Route path='/inicia_sesion' element={<LoginView />} />
        <Route path='/private/*' element={<UserView />} />
        <Route path='/admin/*' element={<AdminView />} />
        <Route path='/propiedad/:id' element={<PropertyView />} />
        <Route path='/carrito' element={<CartView />} />
        <Route path='*' element={<NotFound />} />
      </Routes>
      <Footer />
    </>
  )
}

export default App