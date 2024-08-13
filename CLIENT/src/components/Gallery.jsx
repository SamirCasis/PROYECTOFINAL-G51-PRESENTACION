import { useContext } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.bundle.min'
import { PropertiesContext } from '../context/PropertiesContext'
import PropertySample from './PropertySample'

const Gallery = () => {
  const { properties, favoriteProperties, toggleFavorite, irAlDetalle } = useContext(PropertiesContext)

  // Mostrar solo las primeras 3 propiedades
  const visibleProperties = properties.slice(0, 3)

  return (
    <div className="container col-10 mt-5">
      <h1 className="mb-4">Propiedades en Venta</h1>
      <section className="row">
        {visibleProperties.map((property) => (
          <div className="col-md-4" key={property.id}>
            <PropertySample
              property={property}
              isFavorite={favoriteProperties.includes(property.id)}
              onToggleFavorite={() => toggleFavorite(property.id)}
              onViewDetail={() => irAlDetalle(property.id)}
            />
          </div>
        ))}
      </section>
    </div>
  )
}

export default Gallery



