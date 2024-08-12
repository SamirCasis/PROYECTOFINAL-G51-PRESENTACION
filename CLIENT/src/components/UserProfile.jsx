import { Link, Routes, Route } from 'react-router-dom'
import UpdateUserForm from './UpdateUserForm'
import Favorites from './Favorites'
import PropertyFilter from './PropertyFilter'
import { UserContext } from '../context/UserContext'
import { useContext } from 'react'
import './UserProfile.css'


const userProfile = () => {

  const { userData, isAuthenticated } = useContext(UserContext)

  return (
    <main className='userMain'>
      <section className='userPanel'>
        <h1>DATOS PERSONALES</h1>
        <Link className='options' to='/usersesion/update'>ACTUALIZA TUS DATOS</Link>
        <Link className='options' to='/usersesion/favorites'>REVISA TUS FAVORITOS</Link>
        <PropertyFilter />
      </section>
      <Routes>
        <Route path="update" element={<UpdateUserForm />} />
        <Route path="favorites" element={<Favorites />} />
      </Routes>
    </main>
  )
}

export default userProfile
