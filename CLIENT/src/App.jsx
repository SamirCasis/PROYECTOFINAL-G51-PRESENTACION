import { Routes, Route } from 'react-router-dom'
import { HomeView, AdminView, LoginView, NotFound, RegisterView, PropertyView, CartView } from './views/Index'
import Navigation from './components/Navigation'
import Footer from './components/Footer'
import 'bootstrap/dist/css/bootstrap.min.css'
import UserView from './views/UserView'
import ProtectedRoute from './components/ProtectedRoute'

const App = () => {
  return (
    <>
      <Navigation />
      <Routes>
        {/* Rutas Públicas */}
        <Route path='/' element={<HomeView />} />
        <Route path='/register' element={<RegisterView />} />
        <Route path='/login' element={<LoginView />} />
        <Route path='*' element={<NotFound />} />
        {/* Rutas Protegidas */}
        <Route path='/usersesion/*' element={<ProtectedRoute element={UserView} requiredRole="user" />} />
        <Route path='/admin/*' element={<ProtectedRoute element={AdminView} requiredRole="admin" />} />
        <Route path='/cart' element={<ProtectedRoute element={CartView} requiredRole={null} />} />
        <Route path='/property/:id' element={<ProtectedRoute element={PropertyView} requiredRole={null} />} />
      </Routes>
      <Footer />
    </>
  )
}

export default App


