import { useState } from 'react'
import axios from 'axios'
import 'bootstrap/dist/css/bootstrap.min.css'
import { Container, Form, Button } from 'react-bootstrap'
import './AddPropertyForm.css'

const AddPropertyForm = () => {
  const [formData, setFormData] = useState({
    title: '',
    location: '',
    meters: '',
    bedrooms: '',
    bathrooms: '',
    description: '',
    price: '',
    imgurl: '' // Cambiado de imageUrl a imgurl
  })

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prevData => ({
      ...prevData,
      [name]: value
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      await axios.post('http://localhost:5200/api/v1/properties', formData)
      alert('Propiedad agregada!')
    } catch (error) {
      console.error('Error adding property:', error)
    }
  }

  return (
    <Container className="addPropertyForm mt-4 mb-4 bg-secondary">
      <h2 className="text-center mb-4">Agregar Nueva Propiedad</h2>
      <Form onSubmit={handleSubmit}>

        <Form.Group className="mb-3" controlId="formTitle">
          <Form.Label>Título</Form.Label>
          <Form.Control
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            placeholder="Título de la propiedad"
            required
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formLocation">
          <Form.Label>Ubicación</Form.Label>
          <Form.Control
            type="text"
            name="location"
            value={formData.location}
            onChange={handleChange}
            placeholder="Ubicación de la propiedad"
            required
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formMeters">
          <Form.Label>Metros</Form.Label>
          <Form.Control
            type="number"
            name="meters"
            value={formData.meters}
            onChange={handleChange}
            placeholder="Metros cuadrados"
            required
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBedrooms">
          <Form.Label>Habitaciones</Form.Label>
          <Form.Control
            type="number"
            name="bedrooms"
            value={formData.bedrooms}
            onChange={handleChange}
            placeholder="Número de habitaciones"
            required
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBathrooms">
          <Form.Label>Baños</Form.Label>
          <Form.Control
            type="number"
            name="bathrooms"
            value={formData.bathrooms}
            onChange={handleChange}
            placeholder="Número de baños"
            required
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formDescription">
          <Form.Label>Descripción</Form.Label>
          <Form.Control
            as="textarea"
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Descripción de la propiedad"
            required
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formPrice">
          <Form.Label>Valor</Form.Label>
          <Form.Control
            type="number"
            name="price"
            value={formData.price}
            onChange={handleChange}
            placeholder="Valor de la propiedad"
            required
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formImgurl">
          <Form.Label>URL de la Imagen Principal</Form.Label>
          <Form.Control
            type="text"
            name="imgurl" // Cambiado de imageUrl a imgurl
            value={formData.imgurl}
            onChange={handleChange}
            placeholder="URL de la imagen principal"
            required
          />
        </Form.Group>

        <Button variant="warning" type="submit" className="w-100">
          Agregar Propiedad
        </Button>
      </Form>
    </Container>
  )
}

export default AddPropertyForm








