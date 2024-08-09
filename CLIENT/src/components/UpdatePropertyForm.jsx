import React, { useState, useEffect } from 'react'
import axios from 'axios'

const UpdatePropertyForm = () => {
    const [properties, setProperties] = useState([])
    const [selectedProperty, setSelectedProperty] = useState(null)
    const [formData, setFormData] = useState({
        title: '',
        location: '',
        meters: '',
        bedrooms: '',
        bathrooms: '',
        description: '',
        price: ''
    })

    useEffect(() => {
        axios.get('/api/v1/properties')
            .then(response => {
                setProperties(response.data)
            })
            .catch(error => console.error('Error fetching properties:', error))
    }, [])

    const handleSelectProperty = (id) => {
        const property = properties.find(prop => prop.id === id)
        setSelectedProperty(property)
        setFormData(property)
    }

    const handleChange = (e) => {
        const { name, value } = e.target
        setFormData(prevData => ({
            ...prevData,
            [name]: value
        }))
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        axios.put(`/api/v1/properties/${selectedProperty.id}`, formData)
            .then(response => alert('Property updated!'))
            .catch(error => console.error('Error updating property:', error))
    }

    return (
        <div>
            <h2>Actualizar Propiedad</h2>
            <div>
                <h3>Selecciona una Propiedad para Editar</h3>
                <ul>
                    {Array.isArray(properties) && properties.map(property => (
                        <li key={property.id} onClick={() => handleSelectProperty(property.id)}>
                            {property.title}
                        </li>
                    ))}
                </ul>
            </div>
            {selectedProperty && (
                <form onSubmit={handleSubmit}>
                    <input type="text" name="title" value={formData.title} onChange={handleChange} placeholder="Title" />
                    <input type="text" name="location" value={formData.location} onChange={handleChange} placeholder="Location" />
                    <input type="number" name="meters" value={formData.meters} onChange={handleChange} placeholder="Meters" />
                    <input type="number" name="bedrooms" value={formData.bedrooms} onChange={handleChange} placeholder="Bedrooms" />
                    <input type="number" name="bathrooms" value={formData.bathrooms} onChange={handleChange} placeholder="Bathrooms" />
                    <textarea name="description" value={formData.description} onChange={handleChange} placeholder="Description" />
                    <input type="number" name="price" value={formData.price} onChange={handleChange} placeholder="Price" />
                    <button type="submit">Actualizar</button>
                </form>
            )}
        </div>
    )
}

export default UpdatePropertyForm

