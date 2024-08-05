import { useContext } from 'react'
import { PropertiesContext } from '../context/PropertiesContext'
import './PropertyFilter.css'

const PropertyFilter = () => {
  const { setSortOption } = useContext(PropertiesContext)

  const handleSortChange = (e) => {
    setSortOption(e.target.value)
  }

  return (
    <div className="property-filter">
      <label htmlFor="sortOptions">Ordenar por:</label>
      <select id="sortOptions" onChange={handleSortChange}>
        <option value="">Seleccione una opción</option>
        <option value="name-asc">Nombre (A-Z)</option>
        <option value="name-desc">Nombre (Z-A)</option>
{/*         <option value="price-asc">Precio (Menor a Mayor)</option> // considerar en backend
        <option value="price-desc">Precio (Mayor a Menor)</option> */}
      </select>
    </div>
  )
}

export default PropertyFilter


