import React, { useState, useEffect, useContext } from 'react'
import { PropertiesContext } from '../context/PropertiesContext'
import './PropertyForm.css'

const PropertyForm = ({ property }) => {
  const { setProperties } = useContext(PropertiesContext);
  const [formData, setFormData] = useState(property);

  useEffect(() => {
    setFormData(property);
  }, [property]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    })
  }

  const handleSave = (e) => {
    e.preventDefault();

    setProperties((prevProperties) =>
      prevProperties.map((prop) =>
        prop.id === formData.id ? formData : prop
      )
    )
  }

  return (
    <div className="property-form-container">
      <h2>Editando: {formData.title}</h2>
      <div className="property-preview">
        <img src={formData.img} alt={formData.title} className="property-image" />
        <div className="property-details">
          <p><strong>Título:</strong> {formData.title}</p>
          <p><strong>Descripción:</strong> {formData.description}</p>
          <p><strong>Precio:</strong> {formData.price}</p>
        </div>
      </div>
      <form className="property-form" onSubmit={handleSave}>
        <label>
          Título:
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
          />
        </label>
        <button type="button" onClick={handleSave}>Guardar</button>
        <label>
          Descripción:
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            required
          />
        </label>
        <button type="button" onClick={handleSave}>Guardar</button>
        <label>
          Precio:
          <input
            type="text"
            name="price"
            value={formData.price}
            onChange={handleChange}
            required
          />
        </label>
        <button type="button" onClick={handleSave}>Guardar</button>
        <label>
          Imagen Principal URL:
          <input
            type="text"
            name="img"
            value={formData.img}
            onChange={handleChange}
            required
          />
        </label>
        <button type="button" onClick={handleSave}>Guardar</button>
        <label>
          Imágenes Adicionales URL (separadas por comas):
          <input
            type="text"
            name="additionalImages"
            value={formData.additionalImages.join(',')}
            onChange={(e) =>
              setFormData({ ...formData, additionalImages: e.target.value.split(',') })
            }
          />
        </label>
        <button type="button" onClick={handleSave}>Guardar</button>
      </form>
    </div>
  )
}

export default PropertyForm