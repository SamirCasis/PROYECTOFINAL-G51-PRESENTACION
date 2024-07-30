import React from 'react'
import './Logued.css'
import { Link } from 'react-router-dom'

const Logued = () => {
  return (
    <main className='userMain'>
<section className='userPanel'>
    <h1>DATOS PERSONALES</h1>
   <article>
        <Link className='options'>ACTUALIZA TUS DATOS</Link>
        <Link className='options'>REVISA TUS FAVORITOS</Link>
   </article>
</section>
<section>

</section>
    </main>
  )
}

export default Logued