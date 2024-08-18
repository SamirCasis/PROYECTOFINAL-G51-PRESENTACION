import React, { useState, useEffect, useContext } from 'react'
import axios from 'axios'
import { Container, Form, Button, ListGroup } from 'react-bootstrap'
import SweetAlert from 'sweetalert2'
import { PropertiesContext } from '../context/PropertiesContext'
import './UpdatePropertyPage.css'

const UpdatePropertyPage = () => {
  const { properties, updateProperty, setProperties } = useContext(PropertiesContext)
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
      const updatedProperty = await updateProperty(selectedProperty.id, formData)
      if (updatedProperty) {
        setSuccess('Propiedad actualizada con éxito')
        setError(null)
      }
    } catch (error) {
      setError('Error al actualizar la propiedad')
    }
  }

  const handleDeleteProperty = async (id, e) => {
    e.stopPropagation()
    const result = await SweetAlert.fire({
      title: '¿Estás seguro?',
      text: 'No podrás recuperar esta propiedad después de eliminarla.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, eliminarla!',
      cancelButtonText: 'Cancelar'
    })
  
    if (result.isConfirmed) {
      try {
        const response = await axios.delete(`http://localhost:5200/api/v1/properties/${id}`)
        if (response.status === 200) {
          setProperties(prevProperties => prevProperties.filter(property => property.id !== id))
          setSuccess('Propiedad eliminada con éxito')
          setError(null)
          setSelectedProperty(null)
        } else {
          setError('No se pudo eliminar la propiedad. Inténtalo de nuevo.')
        }
      } catch (error) {
        console.error('Error al eliminar la propiedad:', error)
        setError('Error al eliminar la propiedad')
        setSuccess(null)
      }
    }
  }

  return (
    <Container className="updatePropertyPage mt-4 mb-4">
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
                <Button
                  variant="danger"
                  size="sm"
                  className="float-end"
                  onClick={(e) => handleDeleteProperty(property.id, e)}
                >
                  Eliminar
                </Button>
              </ListGroup.Item>
            ))}
          </ListGroup>
        </div>
        <div className="col-md-8">
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










