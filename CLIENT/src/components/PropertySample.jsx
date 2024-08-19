import { useContext } from 'react'
import { Card, Button } from 'react-bootstrap'
import IconHeart from './IconHeart'
import { PropertiesContext } from '../context/PropertiesContext'
import { UserContext } from '../context/UserContext'
import Swal from 'sweetalert2'
import { useNavigate } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBed, faBath } from '@fortawesome/free-solid-svg-icons'
import './PropertySample.css'

const PropertySample = ({ property, isFavorite, onToggleFavorite }) => {
  const { goToDetail } = useContext(PropertiesContext)
  const { user } = useContext(UserContext)
  const isAuthenticated = !!user
  const navigate = useNavigate()

  const handleViewMore = () => {
    if (isAuthenticated) {
      goToDetail(property.id)
    } else {
      Swal.fire({
        icon: 'warning',
        title: 'Atención',
        text: 'Necesitas iniciar sesión para ver más detalles.',
        confirmButtonText: 'Iniciar sesión',
        confirmButtonColor: '#3085d6',
        cancelButtonText: 'Cancelar',
        cancelButtonColor: '#d33',
        showCancelButton: true,
        reverseButtons: true
      }).then((result) => {
        if (result.isConfirmed) {
          navigate('/login')
        }
      })
    }
  }

  const handleToggleFavorite = () => {
    if (isAuthenticated) {
      onToggleFavorite()
    } else {
      Swal.fire({
        icon: 'warning',
        title: 'Atención',
        text: 'Necesitas iniciar sesión para agregar a favoritos.',
        confirmButtonText: 'Iniciar sesión',
        confirmButtonColor: '#3085d6',
        cancelButtonText: 'Cancelar',
        cancelButtonColor: '#d33',
        showCancelButton: true,
        reverseButtons: true
      }).then((result) => {
        if (result.isConfirmed) {
          navigate('/login')
        }
      })
    }
  }

  return (
    <Card className='cardSample'>
      <Card.Img variant="top" src={property.imgurl} alt={property.title} />
      <Card.Body>
        <Card.Title>{property.title}</Card.Title>
        <Card.Text>{property.description}</Card.Text>
        <div className="property-details">
          <div className="detail-item">
            <FontAwesomeIcon icon={faBed} />
            <span>{property.bedrooms} Dormitorios</span>
          </div>
          <div className="detail-item">
            <FontAwesomeIcon icon={faBath} />
            <span>{property.bathrooms} Baños</span>
          </div>
        </div>
        <div className="d-flex justify-content-between align-items-center mt-3">
          <Button variant="primary" onClick={handleViewMore}>
            Ver más
          </Button>
          <div onClick={handleToggleFavorite} style={{ cursor: 'pointer' }}>
            <IconHeart filled={isFavorite} />
          </div>
        </div>
      </Card.Body>
    </Card>
  )
}

export default PropertySample














