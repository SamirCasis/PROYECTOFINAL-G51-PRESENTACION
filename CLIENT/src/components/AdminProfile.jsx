import { Link, Routes, Route } from 'react-router-dom'
import UpdatePropertyPage from './UpdatePropertyPage'
import AddPropertyForm from './AddPropertyForm'
import './AdminProfile.css'
import UpdateUserForm from './UpdateUserForm'

const AdminProfile = () => {
  return (
    <main className='adminMain'>
      <section className='adminPanel'>
        <h1>ADMINISTRADOR</h1>
        <Link className='options' to='/admin/update'>ACTUALIZAR PERFIL</Link>
        <Link className='options' to='/admin/addProperty'>AGREGAR PROPIEDAD</Link>
        <Link className='options' to='/admin/updateProperty'>ACTUALIZAR PROPIEDAD</Link>
      </section>
      <Routes>
        <Route path="update" element={<UpdateUserForm />} />
        <Route path="addProperty" element={<AddPropertyForm />} />
        <Route path="updateProperty" element={<UpdatePropertyPage />} />
      </Routes>
    </main>
  )
}

export default AdminProfile


