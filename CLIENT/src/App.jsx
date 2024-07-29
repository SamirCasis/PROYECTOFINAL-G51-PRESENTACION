import { Routes, Route } from 'react-router-dom'
import { HomeView, NotFound, RegisterView } from './views/Index'
import Navigation from './components/Navigation'
import Footer from './components/Footer'
import 'bootstrap/dist/css/bootstrap.min.css'
import SesionView from './views/SesionView'

const App = () => {
  return (
    <>
      <Navigation />
      <Routes>
        <Route path='/' element={<HomeView />} />
        <Route path='/registro' element={<RegisterView />} />
        <Route path='/sesion' element={<SesionView />} />
        <Route path='*' element={<NotFound />} />
      </Routes>
      <Footer />
    </>
  )
}

export default App