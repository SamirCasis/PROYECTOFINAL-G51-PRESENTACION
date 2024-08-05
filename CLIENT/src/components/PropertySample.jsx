import { Card, Button } from 'react-bootstrap'
import IconHeart from './IconHeart'

const PropertySample = ({ property, isFavorite, onToggleFavorite, onViewDetail }) => {
  return (
    <Card style={{ width: '18rem' }}>
      <Card.Img variant="top" src={property.img} alt={property.title} />
      <Card.Body>
        <Card.Title>{property.title}</Card.Title>
        <Card.Text>{property.description}</Card.Text>
        <div className="d-flex justify-content-between align-items-center">
          <Button variant="primary" onClick={onViewDetail}>
            Ver más
          </Button>
          <div onClick={onToggleFavorite} style={{ cursor: 'pointer' }}>
            <IconHeart filled={isFavorite} />
          </div>
        </div>
      </Card.Body>
    </Card>
  )
}

export default PropertySample


