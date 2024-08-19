import { useEffect, useState } from 'react'
import axios from 'axios'

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5200'

const PropertyList = () => {
    const [properties, setProperties] = useState([])
    const [error, setError] = useState('')

    useEffect(() => {
        const getProperties = async () => {
            try {
                const response = await axios.get(`${API_URL}/api/properties`)
                setProperties(response.data)
            } catch (error) {
                setError('Error al cargar propiedades')
            }
        }
        getProperties()
    }, [])

    return (
        <div>
            <h2>Listado de Propiedades</h2>
            {error && <p className="error">{error}</p>}
            <ul>
                {properties.map(property => (
                    <li key={property.id}>{property.title}</li>
                ))}
            </ul>
        </div>
    )
}

export default PropertyList

