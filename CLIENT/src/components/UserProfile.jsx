import React from 'react'
import './UserProfile.css'
import { Link, Routes, Route } from 'react-router-dom'
import Update from './Update'
import Favorites from './Favorites'

const Logued = () => {
  return (
    <main className='userMain'>
      <section className='userPanel'>
        <h1>DATOS PERSONALES</h1>
        <article>
          <Link className='options' to='/private/update'>ACTUALIZA TUS DATOS</Link>
          <Link className='options' to='/private/favorites'>REVISA TUS FAVORITOS</Link>
        </article>
      </section>
      <Routes>
        <Route path="update" element={<Update />} />
        <Route path="favorites" element={<Favorites />} />
      </Routes>
      <section>

      </section>
    </main>
  )
}

export default Logued