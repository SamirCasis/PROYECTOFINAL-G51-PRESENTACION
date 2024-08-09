import React, { useContext } from 'react'
import { PropertiesContext } from '../context/PropertiesContext'

const PropertiesList = ({ onSelectProperty }) => {
  const { properties } = useContext(PropertiesContext)

  return (
    <main>
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
    </main>
  )
}

export default PropertiesList
