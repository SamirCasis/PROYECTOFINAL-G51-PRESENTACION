import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { getUsers, getUsersByEmail, postUsers } from '../models/users.models.js'

export const registrarUsuario = async (req, res) => {
  const { name, phone, email, password, role } = req.body
  try {
    const hashedPassword = await bcrypt.hash(password, 10)
    const user = await crearUsuario(name, phone, email, hashedPassword, role)
    res.status(201).json(user)
  } catch (error) {
    res.status(500).json({ error: 'Error al crear el usuario', detalle: error.message })
  }
}

export const loginUser = async (req, res) => {
  const { email, password } = req.body
  try {
    const user = await getUsersByEmail(email)
    if (!user) {
      return res.status(401).json({ error: 'Correo o contraseña incorrectos' })
    }
    const isMatch = await bcrypt.compare(password, user.password)
    if (!isMatch) {
      return res.status(401).json({ error: 'Correo o contraseña incorrectos' })
    }
    const token = jwt.sign({ id: usuario.id, rol: usuario.rol }, process.env.JWT_SECRET, { expiresIn: '1h' })
    res.json({ token })
  } catch (error) {
    res.status(500).json({ error: 'Error al iniciar sesión', detalle: error.message })
  }
}

export const obtenerTodosUsuarios = async (req, res) => {
  try {
    const usuarios = await obtenerUsuarios()
    res.json(usuarios)
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener los usuarios', detalle: error.message })
  }
}
