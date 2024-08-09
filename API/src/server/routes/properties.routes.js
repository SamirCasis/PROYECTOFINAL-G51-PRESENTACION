/* import { Router } from 'express'
import { getAllPropertiesController, postPropertiesController } from '../controllers/properties.controllers.js'
import { authenticateJWT } from '../../middlewares/authenticateMiddleware.js'
import { authorizeRoles } from '../../middlewares/roleMiddleware.js'

const router = Router()
router.use(authenticateJWT)


router.get('/propiedades', getAllPropertiesController)
router.get('/propiedades/:id', )
router.post('/propiedades', authorizeRoles('admin'), postPropertiesController)
router.put('/propiedades/:id', authorizeRoles('admin'), )
router.delete('/propiedades/:id', authorizeRoles('admin'), )

export default router */
