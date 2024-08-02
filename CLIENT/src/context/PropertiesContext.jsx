// PropertiesContext.js
import React, { createContext, useState, useEffect } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

export const PropertiesContext = createContext()

export const PropertiesProvider = ({ children }) => {
  const [properties, setProperties] = useState([])
  const navigate = useNavigate()

  useEffect(() => {
    axios.get('/properties.json')
      .then(response => {
        setProperties(response.data)
      })
      .catch(error => {
        console.error("Error fetching properties data: ", error);
      })
  }, [])

  const irAlDetalle = (id) => {
    navigate(`/propiedad/${id}`)
  }

/*   const eliminarCarrito = (id) => {
    const updatedCart = cart.filter(pizza => pizza.id !== id)
    setCart(updatedCart)
  }

  const sumaTotal = () => {
    return cart.reduce((total, pizza) => total + pizza.price, 0)
  }
 */
  return (
    <PropertiesContext.Provider value={{ properties, irAlDetalle }}>
      {children}
    </PropertiesContext.Provider>
  )
}
