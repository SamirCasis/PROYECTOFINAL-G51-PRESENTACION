import express from 'express'
import { getUsers, registerUser, loginUser, updUser, delUser, getUserByIdController } from '../controllers/users.controllers.js'
import { verifyToken } from '../../helpers/generateToken.js'

const router = express.Router()

router.get('/users', getUsers)
router.get('/users/:id', getUserByIdController)
router.post('/users/register', registerUser)
router.post('/users/login', loginUser)
router.put('/users/:id', verifyToken, updUser)
/* router.put('/admin/profile', verifyToken, updUser) */
router.delete('/users/:id', delUser)

export default router





