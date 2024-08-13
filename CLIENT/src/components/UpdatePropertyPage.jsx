import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Container, Form, Button, ListGroup } from 'react-bootstrap'
import './UpdatePropertyPage.css'

const UpdatePropertyPage = () => {
  const [properties, setProperties] = useState([])
  const [selectedProperty, setSelectedProperty] = useState(null)
  const [formData, setFormData] = useState({
    title: '',
    location: '',
    meters: '',
    bedrooms: '',
    bathrooms: '',
    description: '',
    price: '',
    imgurl: ''
  })
  const [error, setError] = useState(null)
  const [success, setSuccess] = useState(null)

  useEffect(() => {
    const getProperties = async () => {
      try {
        const response = await axios.get('http://localhost:5200/api/v1/properties')
        setProperties(response.data)
      } catch (error) {
        setError('Error al cargar las propiedades')
      }
    }
    getProperties()
  }, [])

  useEffect(() => {
    if (selectedProperty) {
      setFormData({
        title: selectedProperty.title,
        location: selectedProperty.location,
        meters: selectedProperty.meters,
        bedrooms: selectedProperty.bedrooms,
        bathrooms: selectedProperty.bathrooms,
        description: selectedProperty.description,
        price: selectedProperty.price,
        imgurl: selectedProperty.imgurl || ''
      })
    }
  }, [selectedProperty])

  const handleSelectProperty = (property) => {
    setSelectedProperty(property)
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData({ ...formData, [name]: value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const response = await axios.put(`http://localhost:5200/api/v1/properties/${selectedProperty.id}`, formData)
      if (response.status === 200) {
        setSuccess('Propiedad actualizada con éxito')
        setError(null)
      }
    } catch (error) {
      setError('Error al actualizar la propiedad')
    }
  }

  return (
    <Container className="updatePropertyPage col-md-6 mt-4 mb-4">
      <h1>Actualizar Propiedad</h1>
      {error && <p className="text-danger">{error}</p>}
      {success && <p className="text-success">{success}</p>}
      <div className="row">
        <div className="col-md-4">
          <ListGroup>
            {properties.map(property => (
              <ListGroup.Item
                key={property.id}
                action
                onClick={() => handleSelectProperty(property)}
              >
                {property.title}
              </ListGroup.Item>
            ))}
          </ListGroup>
        </div>
        <div className="col-md-7">
          {selectedProperty && (
            <Form onSubmit={handleSubmit}>
              <Form.Group className="mb-3" controlId="formTitle">
                <Form.Label>Título:</Form.Label>
                <Form.Control
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="formLocation">
                <Form.Label>Ubicación:</Form.Label>
                <Form.Control
                  type="text"
                  name="location"
                  value={formData.location}
                  onChange={handleChange}
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="formMeters">
                <Form.Label>Metros:</Form.Label>
                <Form.Control
                  type="number"
                  name="meters"
                  value={formData.meters}
                  onChange={handleChange}
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="formBedrooms">
                <Form.Label>Habitaciones:</Form.Label>
                <Form.Control
                  type="number"
                  name="bedrooms"
                  value={formData.bedrooms}
                  onChange={handleChange}
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="formBathrooms">
                <Form.Label>Baños:</Form.Label>
                <Form.Control
                  type="number"
                  name="bathrooms"
                  value={formData.bathrooms}
                  onChange={handleChange}
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="formDescription">
                <Form.Label>Descripción:</Form.Label>
                <Form.Control
                  as="textarea"
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="formPrice">
                <Form.Label>Precio:</Form.Label>
                <Form.Control
                  type="number"
                  name="price"
                  value={formData.price}
                  onChange={handleChange}
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="formImgurl">
                <Form.Label>Imagen Principal:</Form.Label>
                <Form.Control
                  type="text"
                  name="imgurl"
                  value={formData.imgurl}
                  onChange={handleChange}
                  placeholder="URL de la imagen principal"
                />
              </Form.Group>
              <Button variant="primary" type="submit">
                Actualizar Propiedad
              </Button>
            </Form>
          )}
        </div>
      </div>
    </Container>
  )
}

export default UpdatePropertyPage




