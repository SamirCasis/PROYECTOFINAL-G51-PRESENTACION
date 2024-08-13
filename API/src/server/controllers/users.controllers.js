import { createUserModel, getUserModels, getUserByEmail, updateUserModel, deleteUserModel } from '../models/users.models.js'
import { jwtSign } from '../../utils/jwt.js'
import bcrypt from 'bcrypt'

export const getUsers = async (req, res) => {
  try {
    const users = await getUserModels()
    res.status(200).json({ users })
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: 'Error al obtener los usuarios' })
  }
}

export const getUserByIdController = async (req, res) => {
  const userId = req.params.id

  try {
    const result = await getUserModels(userId)
    if (result) {
      res.json(result)
    } else {
      res.status(404).json({ message: 'Usuario no encontrado' })
    }
  } catch (error) {
    console.error('Error al obtener el usuario:', error)
    res.status(500).json({ message: 'Error interno del servidor' })
  }
}

export const registerUser = async (req, res) => {
  const { name, phone, email, password, rol } = req.body
  try {
    const userRol = rol || 'usuario'
    const existingUser = await getUserModels(null)

    if (existingUser.some(user => user.email === email)) {
      return res.status(400).json({ error: 'El correo electrónico ya está en uso' })
    }

    const newUser = await createUserModel(name, phone, email, password, userRol)
    res.status(201).json({ user: newUser[0] })
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: 'Error al registrar el usuario' })
  }
}

export const loginUser = async (req, res) => {
  const { email, password } = req.body

  try {
    let user = await getUserByEmail(email)

    if (user == null) {
      return res.status(401).json({ msg: 'Usuario y/o contraseña no encontrados' })
    }

    const isMatch = await bcrypt.compare(password, user.password)
    if (!isMatch) {
      return res.status(401).json({ msg: 'Contraseña incorrecta' })
    }

    const token = jwtSign({ id: user.id })
    res.status(200).json({ token, rol: user.rol, id: user.id })
  } catch (error) {
    console.error('Error del servidor:', error)
    res.status(500).json({ msg: 'Error del servidor' })
  }
}

export const updUser = async (req, res) => {
  try {
    const { id } = req.params
    const { name, phone, email, password } = req.body
    const existingUsers = await getUserModels(id)
    if (existingUsers.length === 0) {
      return res.status(404).json({ error: 'Usuario no encontrado' })
    }
    if (email) {
      const usersWithEmail = await getUserModels(null)
      if (usersWithEmail.some(user => user.email === email && user.id !== parseInt(id))) {
        return res.status(400).json({ error: 'El correo electrónico ya está en uso por otro usuario' })
      }
    }
    const hashedPassword = password ? await bcrypt.hash(password, 10) : undefined
    const updatedUser = await updateUserModel(id, { name, phone, email, contrasena: hashedPassword })
    res.status(200).json({ user: updatedUser[0] })
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: 'Error al actualizar el usuario' })
  }
}

export const delUser = async (req, res) => {
  try {
    const { id } = req.params
    const existingUsers = await getUserModels(id)
    if (existingUsers.length === 0) {
      return res.status(404).json({ error: 'Usuario no encontrado' })
    }
    await deleteUserModel(id)
    res.status(200).json({ message: 'Usuario eliminado exitosamente' })
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: 'Error al eliminar el usuario' })
  }
}
