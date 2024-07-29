import { Router } from 'express'
import { getUserModels } from '../controllers/user.controllers.js'

const router = Router()

router.get('/user', getUserModels)
router.get('/user/:id', getUserModels)
router.post('/user', getUserModels)
router.put('/user/:id', getUserModels)


export default router