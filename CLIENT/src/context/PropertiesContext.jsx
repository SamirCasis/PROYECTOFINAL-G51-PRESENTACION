import { createContext, useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import axios from 'axios'

export const PropertiesContext = createContext();

export const PropertiesProvider = ({ children }) => {
  const [properties, setProperties] = useState([])
  const [favoriteProperties, setFavoriteProperties] = useState([])
  const [sortOption, setSortOption] = useState('')
  const navigate = useNavigate()

  useEffect(() => {
    axios.get('/properties.json')
      .then(response => {
        setProperties(response.data)
      })
      .catch(error => {
        console.error('Error fetching properties:', error)
      })
  }, [])

  useEffect(() => {
    let sortedProperties = [...properties]
    if (sortOption === 'name-asc') {
      sortedProperties.sort((a, b) => a.title.localeCompare(b.title))
    } else if (sortOption === 'name-desc') {
      sortedProperties.sort((a, b) => b.title.localeCompare(a.title))
    }
    setProperties(sortedProperties)
  }, [sortOption])

  const toggleFavorite = (id) => {
    setFavoriteProperties(prevFavorites => 
      prevFavorites.includes(id)
        ? prevFavorites.filter(favId => favId !== id)
        : [...prevFavorites, id]
    )
  }

  const irAlDetalle = (id) => {
    navigate(`/propiedad/${id}`)
  }

  return (
    <PropertiesContext.Provider value={{ properties, favoriteProperties, toggleFavorite, irAlDetalle, setSortOption }}>
      {children}
    </PropertiesContext.Provider>
  )
}