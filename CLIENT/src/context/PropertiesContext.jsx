import { createContext, useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

export const PropertiesContext = createContext()

export const PropertiesProvider = ({ children }) => {
  const [properties, setProperties] = useState([])
  const [favoriteProperties, setFavoriteProperties] = useState([])
  const [sortOption, setSortOption] = useState('')
  const navigate = useNavigate()

  useEffect(() => {
    const fetchProperties = async () => {
      try {
        const response = await axios.get('http://localhost:5200/api/v1/properties')
        setProperties(response.data)
      } catch (error) {
        console.error('Error fetching properties:', error)
      }
    }

    fetchProperties()
  }, [])

  useEffect(() => {
    const sortProperties = () => {
      let sortedProperties = [...properties]
      if (sortOption === 'name-asc') {
        sortedProperties.sort((a, b) => a.title.localeCompare(b.title))
      } else if (sortOption === 'name-desc') {
        sortedProperties.sort((a, b) => b.title.localeCompare(a.title))
      }
      setProperties(sortedProperties)
    }

    if (properties.length > 0) {
      sortProperties()
    }
  }, [sortOption, properties.length])

  const toggleFavorite = (id) => {
    setFavoriteProperties(prevFavorites =>
      prevFavorites.includes(id)
        ? prevFavorites.filter(favId => favId !== id)
        : [...prevFavorites, id]
    )
  }

  const goToDetail = (id) => {
    navigate(`/property/${id}`)
  }

  const updateProperty = async (id, updates) => {
    try {
      const response = await axios.put(`http://localhost:5200/api/v1/properties/${id}`, updates)
      if (response.status === 200) {
        setProperties(prevProperties => 
          prevProperties.map(property =>
            property.id === id ? response.data : property
          )
        )
        return response.data
      }
    } catch (error) {
      console.error('Error updating property:', error)
      throw error
    }
  }

  const uploadPropertyImages = async (propertyId, images) => {
    try {
      await axios.post(`http://localhost:5200/api/v1/properties/${propertyId}/images`, {
        imageUrls: images
      })
    } catch (error) {
      console.error('Error uploading property images:', error)
      throw error
    }
  }

  return (
    <PropertiesContext.Provider value={{ 
      properties, 
      favoriteProperties, 
      toggleFavorite, 
      goToDetail, 
      setSortOption, 
      updateProperty, 
      uploadPropertyImages 
    }}>
      {children}
    </PropertiesContext.Provider>
  )
}


