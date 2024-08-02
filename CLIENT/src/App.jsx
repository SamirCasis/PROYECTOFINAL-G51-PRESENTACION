import { Routes, Route } from 'react-router-dom'
import { HomeView, SesionView, NotFound, RegisterView, PropertyView } from './views/Index'
import Navigation from './components/Navigation'
import Footer from './components/Footer'
import 'bootstrap/dist/css/bootstrap.min.css'
import UserView from './views/UserView'
import { PropertiesProvider } from './context/PropertiesContext'

const App = () => {
  return (
    <>
      <Navigation />
      <PropertiesProvider>
      <Routes>
        <Route path='/' element={<HomeView />} />
        <Route path='/registro' element={<RegisterView />} />
        <Route path='/inicia_sesion' element={<SesionView />} />
        <Route path='/private/*' element={<UserView />} />
        <Route path='/propiedad/:id' element={<PropertyView />} />
        <Route path='*' element={<NotFound />} />
      </Routes>
      </PropertiesProvider>
      <Footer />
    </>
  )
}

export default App