import { getProperties, postProperties } from '../models/properties.models.js'

export const getAllPropertiesController = async (req, res) => {
  try {
    const properties = await getProperties()
    res.json(properties)
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener las propiedades', message: error.message })
  }
}

export const getPropertyByIdController = async (req, res) => {
  const { id } = req.params
  try {
    const property = await getPropertyById(id)
    if (property) {
      res.json(property)
    } else {
      res.status(404).json({ error: 'Propiedad no encontrada' })
    }
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener la propiedad', message: error.message })
  }
}

export const postPropertiesController = async (req, res) => {
  const { title, location, meters, bedrooms, bathrooms, description, price } = req.body
  try {
    const property = await postProperties(title, location, meters, bedrooms, bathrooms, description, price)
    res.status(201).json(property)
  } catch (error) {
    res.status(500).json({ error: 'Error al agregar la propiedad', message: error.message })
  }
}

export const updatePropertyController = async (req, res) => {
  const { id } = req.params
  const updates = req.body
  try {
    const updatedProperty = await updateProperty(id, updates)
    if (updatedProperty) {
      res.json(updatedProperty)
    } else {
      res.status(404).json({ error: 'Propiedad no encontrada' })
    }
  } catch (error) {
    res.status(500).json({ error: 'Error al actualizar la propiedad', message: error.message })
  }
}

export const deletePropertyController = async (req, res) => {
  const { id } = req.params
  try {
    const result = await deleteProperty(id)
    if (result) {
      res.status(204).end()
    } else {
      res.status(404).json({ error: 'Propiedad no encontrada' })
    }
  } catch (error) {
    res.status(500).json({ error: 'Error al eliminar la propiedad', message: error.message })
  }
}