import React, { useEffect, useState } from 'react'
import axios from 'axios'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.bundle.min'

const Gallery = () => {
  const [properties, setProperties] = useState([])

  useEffect(() => {
    axios.get('/properties.json')
      .then(response => {
        console.log('Datos de propiedades:', response.data);  // Agrega esta línea para depurar
        setProperties(response.data)
      })
      .catch(error => {
        console.error('Error fetching properties:', error)
      })
  }, [])

  return (
    <div className="container mt-5">
      <h1 className="mb-4">Propiedades en Venta</h1>
      <div className="row">
        {properties.map((property, id) => (
          <div className="col-md-4" key={id}>
            <div className="card">
              <img src={property.img} className="card-img-top" alt={property.title} />
              <div className="card-body">
                <h5 className="card-title">{property.title}</h5>
                <p className="card-text">{property.description}</p>
                <p className="card-text"><strong>{property.price}</strong></p>
                <a href="#" className="btn btn-primary">Ver más</a>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Gallery
