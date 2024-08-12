import React, { useState, useContext, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { PropertiesContext } from '../context/PropertiesContext'
import { CartContext } from '../context/CartContext'
import './PropertyCard.css'

const PropertyCard = () => {
  const { id } = useParams()
  const { properties } = useContext(PropertiesContext)
  const { agregarCarrito } = useContext(CartContext)

  const [property, setProperty] = useState(null)
  const [currentImage, setCurrentImage] = useState('')

  useEffect(() => {
    const foundProperty = properties.find((prop) => prop.id === parseInt(id))
    setProperty(foundProperty)
    setCurrentImage(foundProperty?.imgurl || '')
  }, [id, properties])

  if (!property) {
    return <h2>Propiedad no encontrada</h2>
  }

  return (
    <main className="card-full">
      <div className="card-detail">
        <div className="main-image">
          <img src={currentImage} alt="imagen propiedad" />
        </div>
        <div className="card-body">
          <h3 className="card-title">{property.title}</h3>
          <p>{property.description}</p>
          <p className="price"><strong>{property.price} UF</strong></p>
          <button className="buy-button" onClick={() => agregarCarrito(property.id)}>
            COMPRAR
          </button>
        </div>
      </div>
    </main>
  )
}

export default PropertyCard




