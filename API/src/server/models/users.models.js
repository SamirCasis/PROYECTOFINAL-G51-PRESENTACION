import linkDB from '../dbConnection/link.db.js'
import bcrypt from 'bcrypt'

export const getUserModels = async (id) => {
  const query = id
    ? 'SELECT * FROM users WHERE id = $1'
    : 'SELECT * FROM users'
  const params = id ? [id] : []
  return linkDB(query, params)
}

export const createUserModel = async (name, phone, email, password, rol) => {
  const hashedPassword = await bcrypt.hash(password, 10)
  const query = `
    INSERT INTO users (name, phone, email, password, rol)
    VALUES ($1, $2, $3, $4, $5) RETURNING *
  `
  return linkDB(query, [name, phone, email, hashedPassword, rol])
}

export const updateUserModel = async (id, { name, phone, email, password }) => {
  const hashedPassword = password ? await bcrypt.hash(password, 10) : null
  const query = `
    UPDATE users
    SET name = COALESCE($1, name),
        phone = COALESCE($2, phone),
        email = COALESCE($3, email),
        password = COALESCE($4, password)
    WHERE id = $5 RETURNING *
  `
  return linkDB(query, [name, phone, email, hashedPassword, id])
}

export const deleteUserModel = async (id) => {
  const query = 'DELETE FROM users WHERE id = $1'
  return linkDB(query, [id])
}

