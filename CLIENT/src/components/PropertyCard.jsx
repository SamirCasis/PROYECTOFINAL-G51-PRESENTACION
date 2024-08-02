import React, { useContext } from 'react'
import { useParams } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css'
import { Card } from 'react-bootstrap'
import { PropertiesContext } from '../context/PropertiesContext'

const PropertyCard = () => {
  const { id } = useParams()
  const { properties } = useContext(PropertiesContext);
  const property = properties.find(prop => prop.id === parseInt(id))

  if (!property) {
    return <h2>Propiedad no encontrada</h2>
  }

  return (
    <Card style={{ width: '24rem', margin: 'auto' }}>
      <Card.Img variant="top" src={property.img} />
      <Card.Body>
        <Card.Title>{property.title}</Card.Title>
        <Card.Text>{property.description}</Card.Text>
        <Card.Text><strong>{property.price}</strong></Card.Text>
      </Card.Body>
    </Card>
  )
}

export default PropertyCard
