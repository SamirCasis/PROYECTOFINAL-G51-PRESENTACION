import express from 'express'
import { getUsers, registerUser, loginUser, updUser, delUser, getUserByIdController } from '../controllers/users.controllers.js'
import { tokenVerify } from '../../middlewares/authToken.middlewares.js'


const router = express.Router()

router.get('/users', getUsers)
router.get('/users/:id', tokenVerify, getUserByIdController)
router.post('/users/register', registerUser)
router.post('/users/login', loginUser)
router.put('/users/:id', tokenVerify, updUser)
router.delete('/users/:id', delUser)

export default router





