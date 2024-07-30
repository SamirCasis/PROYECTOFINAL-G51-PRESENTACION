import { Routes, Route } from 'react-router-dom'
import { HomeView, SesionView, NotFound, RegisterView } from './views/Index'
import Navigation from './components/Navigation'
import Footer from './components/Footer'
import 'bootstrap/dist/css/bootstrap.min.css'
import LoguedView from './views/LoguedView'

const App = () => {
  return (
    <>
      <Navigation />
      <Routes>
        <Route path='/' element={<HomeView />} />
        <Route path='/registro' element={<RegisterView />} />
        <Route path='/inicia_sesion' element={<SesionView />} />
        <Route path='/private' element={<LoguedView />} />
        <Route path='*' element={<NotFound />} />
      </Routes>
      <Footer />
    </>
  )
}

export default App