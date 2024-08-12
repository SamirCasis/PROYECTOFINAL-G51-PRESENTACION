import express from 'express'
import {
  getProperties,
  getPropertyById,
  addProperty,
  updateProperty,
  deleteProperty
} from '../controllers/properties.controllers.js'

const router = express.Router()

// Obtiene todas las propiedades
router.get('/properties', getProperties)

// Obtiene una propiedad por ID
router.get('/properties/:id', getPropertyById)

// Inserta una nueva propiedad
router.post('/properties', addProperty)

// Actualiza una propiedad por ID
router.put('/properties/:id', updateProperty)

// Elimina una propiedad por ID
router.delete('/properties/:id', deleteProperty)

export default router

