import express from 'express'
import { registrarUsuario, loginUsuario, obtenerTodosUsuarios } from '../controllers/usuarioController.js'
import { authenticateJWT } from '../../middlewares/authenticateMiddleware.js'

const router = express.Router()
router.use(authenticateJWT) // middleware de autenticación a todas las rutas

router.get('/', obtenerTodosUsuarios)
router.post('/register', registrarUsuario)
router.post('/login', loginUsuario)

export default router
