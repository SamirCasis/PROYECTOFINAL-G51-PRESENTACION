import { useContext } from 'react'
import { Link } from 'react-router-dom'
import { PropertiesContext } from '../context/PropertiesContext'
import './AdminProfile.css'

const AdminProfile = ({ onSelectProperty }) => {
  const { properties } = useContext(PropertiesContext);

  return (
    <main className='adminMain'>
      <section className='adminPanel'>
        <h1>ADMINISTRADOR</h1>
        <article>
          <Link className='options' to='/admin/addProperty'>AGREGAR PROPIEDAD</Link>
          <Link className='options' to='/admin/updateProfile'>ACTUALIZAR PROPIEDAD</Link>
        </article>
        <h2>PROPIEDADES</h2>
        <ul className='property-list'>
          {properties.map((property) => (
            <li
              key={property.id}
              className='property-item'
              onClick={() => onSelectProperty(property)}
            >
              {property.title}
            </li>
          ))}
        </ul>
      </section>
    </main>
  )
}

export default AdminProfile
