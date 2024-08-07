import linkDB from '../config/db.js'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

export const getUserModels = async (req, res) => {
  try {
    const { id } = req.params
    const users = id
      ? await linkDB('SELECT * FROM usuarios WHERE id = $1', [id])
      : await linkDB('SELECT * FROM usuarios')
    res.json(users)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

export const createUserModel = async (req, res) => {
  try {
    const { nombre, telefono, correo, contrasena, rol } = req.body
    const hashedPassword = await bcrypt.hash(contrasena, 10)
    const newUser = await linkDB(
      'INSERT INTO usuarios (nombre, telefono, correo, contrasena, rol) VALUES ($1, $2, $3, $4, $5) RETURNING *',
      [nombre, telefono, correo, hashedPassword, rol]
    )
    res.status(201).json(newUser)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

export const updateUserModel = async (req, res) => {
  try {
    const { id } = req.params
    const { nombre, telefono, correo, contrasena } = req.body
    const hashedPassword = contrasena ? await bcrypt.hash(contrasena, 10) : null
    const updateQuery = `
      UPDATE usuarios
      SET nombre = COALESCE($1, nombre),
          telefono = COALESCE($2, telefono),
          correo = COALESCE($3, correo),
          contrasena = COALESCE($4, contrasena)
      WHERE id = $5 RETURNING *
    `
    const updatedUser = await linkDB(updateQuery, [nombre, telefono, correo, hashedPassword, id])
    res.json(updatedUser)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

export const deleteUserModel = async (req, res) => {
  try {
    const { id } = req.params
    await linkDB('DELETE FROM usuarios WHERE id = $1', [id])
    res.status(204).send()
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}
