import { createUserModel, getUserModels, updateUserModel, deleteUserModel } from '../models/users.models.js'
import { generateToken } from '../../helpers/generateToken.js'
import bcrypt from 'bcrypt'

export const getUsers = async (req, res) => {
  try {
    const users = await getUserModels(null)
    res.status(200).json({ users })
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: 'Error al obtener los usuarios' })
  }
}

export const registerUser = async (req, res) => {
  try {
    const { name, phone, email, password, rol } = req.body
    const existingUser = await getUserModels(null)

    if (existingUser.some(user => user.email === email)) {
      return res.status(400).json({ error: 'El correo electrónico ya está en uso' })
    }

    const newUser = await createUserModel(name, phone, email, password, rol)
    const token = generateToken(newUser[0].id)

    res.status(201).json({ user: newUser[0], token })
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: 'Error al registrar el usuario' })
  }
}

export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body
    const users = await getUserModels(null)
    const user = users.find(u => u.email === email)

    if (!user) {
      return res.status(404).json({ error: 'Usuario no encontrado' })
    }

    const isMatch = await bcrypt.compare(password, user.password)

    if (!isMatch) {
      return res.status(401).json({ error: 'Contraseña incorrecta' })
    }

    const token = generateToken(user.id)

    res.status(200).json({ user, token })
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: 'Error al iniciar sesión' })
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
