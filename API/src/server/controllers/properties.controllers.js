import {
  getPropertiesModel,
  postPropertiesModel,
  updatePropertyModel,
  deletePropertyModel,
  getPropertyByIdModel
} from '../models/properties.models.js'

// Obtiene todas las propiedades
export const getProperties = async (req, res) => {
  try {
    const properties = await getPropertiesModel()
    res.status(200).json(properties)
  } catch (error) {
    console.error('Error retrieving properties:', error)
    res.status(500).json({ message: 'Error retrieving properties' })
  }
}

// Obtiene una propiedad por ID
export const getPropertyById = async (req, res) => {
  try {
    const property = await getPropertyByIdModel(req.params.id)
    if (property) {
      res.status(200).json(property)
    } else {
      res.status(404).json({ message: 'Property not found' })
    }
  } catch (error) {
    console.error('Error retrieving property:', error)
    res.status(500).json({ message: 'Error retrieving property' })
  }
}

// Inserta una nueva propiedad
export const addProperty = async (req, res) => {
  const { title, location, meters, bedrooms, bathrooms, description, price, imgurl } = req.body

  try {
    const newProperty = await postPropertiesModel(title, location, meters, bedrooms, bathrooms, description, price, imgurl)
    res.status(201).json(newProperty)
  } catch (error) {
    console.error('Error adding property:', error)
    res.status(500).json({ error: 'Error adding property' })
  }
}

// Actualiza una propiedad por ID
export const updateProperty = async (req, res) => {
  try {
    const { id } = req.params
    const updates = req.body
    const updatedProperty = await updatePropertyModel(id, updates)

    if (updatedProperty) {
      res.status(200).json(updatedProperty)
    } else {
      res.status(404).json({ message: 'Property not found' })
    }
  } catch (error) {
    console.error('Error updating property:', error)
    res.status(500).json({ message: 'Error updating property' })
  }
}

// Elimina una propiedad por ID
export const deleteProperty = async (req, res) => {
  try {
    const { id } = req.params
    const deleted = await deletePropertyModel(id)
    if (deleted) {
      res.status(204).end()
    } else {
      res.status(404).json({ message: 'Property not found' })
    }
  } catch (error) {
    console.error('Error deleting property:', error)
    res.status(500).json({ message: 'Error deleting property' })
  }
}




