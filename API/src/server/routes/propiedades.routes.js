import { Router } from 'express'
import { getPropertiesModels, postPropertiesModels, updPropertiesModels, delPropertiesModels } from '../controllers/propiedades.controllers.js'

const router = Router()

router.get('/propiedades', getPropertiesModels)
router.get('/propiedades/:id', getPropertiesModels)
router.post('/propiedades', postPropertiesModels)
router.put('/propiedades/:id', updPropertiesModels)
router.delete('/propiedades/:id', delPropertiesModels)


export default router