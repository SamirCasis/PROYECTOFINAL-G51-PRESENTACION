import express from 'express'
import { getUsers, registerUser, loginUser, updUser, delUser } from '../controllers/user.controllers.js'
import { authenticateJWT } from '../../middlewares/authenticateMiddleware.js'

const router = express.Router()

router.use(authenticateJWT)

router.get('/', getUsers)
router.post('/register', registerUser)
router.post('/login', loginUser)
router.put('/:id', updUser)
router.delete('/:id', delUser)

export default router




