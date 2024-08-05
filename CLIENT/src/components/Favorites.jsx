import { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { PropertiesContext } from '../context/PropertiesContext'
import PropertySample from './PropertySample'

const FavoriteProperties = () => {
  const { properties, favoriteProperties, toggleFavorite } = useContext(PropertiesContext);
  const navigate = useNavigate();

  const favoriteList = properties.filter(property =>
    favoriteProperties.includes(property.id)
  );

  const handleViewDetail = (id) => {
    navigate(`/propiedad/${id}`);
  }

  return (
    <div className="container col-10 mt-5">
      <h1 className="mb-4">Mis Favoritos</h1>
      <section className="row">
        {favoriteList.length > 0 ? (
          favoriteList.map((property) => (
            <div className="col-md-4" key={property.id}>
              <PropertySample
                property={property}
                isFavorite={true}
                onToggleFavorite={() => toggleFavorite(property.id)}
                onViewDetail={() => handleViewDetail(property.id)}
              />
            </div>
          ))
        ) : (
          <h3>No tienes propiedades favoritas aún.</h3>
        )}
      </section>
    </div>
  );
};

export default FavoriteProperties;

