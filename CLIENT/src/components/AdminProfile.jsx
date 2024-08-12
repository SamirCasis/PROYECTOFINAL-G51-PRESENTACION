import React from 'react'
import { Link, Routes, Route } from 'react-router-dom'
import UpdatePropertyPage from './UpdatePropertyPage'
import AddPropertyForm from './AddPropertyForm'
import UpdateAdminForm from './UpdateAdminForm'
import './AdminProfile.css'
import PropertyFilter from './PropertyFilter'

const AdminProfile = () => {
  return (
    <main className='adminMain'>
      <section className='adminPanel'>
        <h1>ADMINISTRADOR</h1>
        <Link className='options' to='/admin/updateProfile'>ACTUALIZAR PERFIL</Link>
        <Link className='options' to='/admin/addProperty'>AGREGAR PROPIEDAD</Link>
        <Link className='options' to='/admin/updateProperty'>ACTUALIZAR PROPIEDAD</Link>
        <PropertyFilter />
      </section>
      <Routes>
        <Route path="updateProfile" element={<UpdateAdminForm />} />
        <Route path="addProperty" element={<AddPropertyForm />} />
        <Route path="updateProperty" element={<UpdatePropertyPage />} />
      </Routes>
    </main>
  )
}

export default AdminProfile


