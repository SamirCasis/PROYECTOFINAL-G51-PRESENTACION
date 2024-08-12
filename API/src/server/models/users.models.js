import linkDB from '../dbConnection/link.db.js'
import bcrypt from 'bcrypt'

export const createUserModel = async (name, phone, email, password, rol) => {
  const hashedPassword = bcrypt.hashSync(password, 10)
  const query = 'INSERT INTO users (name, phone, email, password, rol) VALUES ($1, $2, $3, $4, $5) RETURNING *'
  const result = await linkDB(query, [name, phone, email, hashedPassword, rol])
  return result [0]
}

export const getUserModels = async (id) => {
  const query = id
    ? 'SELECT * FROM users WHERE id = $1'
    : 'SELECT * FROM users'
  const params = id ? [id] : []
  const result = await linkDB(query, params)
  return(result)
}


export const getUserByEmail = async (email) => {
  const query = 'SELECT email, password, rol FROM users WHERE email = $1'
  let result
  try {
    result = await linkDB(query, [email])
  } catch (error) {
    console.error('Error al ejecutar la consulta:', error)
    return null
  }
  if (!result) {
    console.error('Resultado inesperado de la consulta:', result)
    return null
  }
  return result[0]
}

export const updateUserModel = async (id, { name, phone, email, password }) => {
  const hashedPassword = password ? await bcrypt.hash(password, 10) : null
  const query = 'UPDATE users SET name = COALESCE($1, name), phone = COALESCE($2, phone),email = COALESCE($3, email), password = COALESCE($4, password) WHERE id = $5 RETURNING *'
  return linkDB(query, [name, phone, email, hashedPassword, id])
}

export const deleteUserModel = async (id) => {
  const query = 'DELETE FROM users WHERE id = $1'
  const result = await linkDB(query, [id])
  return (result)
}

