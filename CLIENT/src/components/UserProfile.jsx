import { Link, Routes, Route } from 'react-router-dom'
import UpdateForm from './UpdateForm'
import Favorites from './Favorites'
import PropertyFilter from './PropertyFilter'
import './UserProfile.css'

const userProfile = () => {
  return (
    <main className='userMain'>
      <section className='userPanel'>
        <h1>DATOS PERSONALES</h1>
        <Link className='options' to='/private/update'>ACTUALIZA TUS DATOS</Link>
        <Link className='options' to='/private/favorites'>REVISA TUS FAVORITOS</Link>
        <PropertyFilter />
      </section>
      <Routes>
        <Route path="update" element={<UpdateForm />} />
        <Route path="favorites" element={<Favorites />} />
      </Routes>
      <section>

      </section>
    </main>
  )
}

export default userProfile