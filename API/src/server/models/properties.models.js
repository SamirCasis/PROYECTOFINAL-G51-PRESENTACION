import linkDB from './db.js'

export const getProperties = async () => {
  const query = 'SELECT * FROM propiedades'
  const rows = await linkDB(query)
  return rows
}

export const postProperties = async (title, location, meters, bedrooms, bathrooms, description, price) => {
  const query = `INSERT INTO propiedades (title, location, meters, bedrooms, bathrooms, description, price) 
                 VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *`
  const rows = await linkDB(query, [title, location, meters, bedrooms, bathrooms, description, price])
  return rows[0]
}

export const getPropertyById = async (id) => {
  const query = 'SELECT * FROM propiedades WHERE id = $1'
  const rows = await linkDB(query, [id])
  return rows[0]
}

export const updateProperty = async (id, updates) => {
  const setQuery = Object.keys(updates)
    .map((key, index) => `${key} = $${index + 2}`)
    .join(', ')
  
  const query = `UPDATE propiedades SET ${setQuery} WHERE id = $1 RETURNING *`
  const values = [id, ...Object.values(updates)]
  const rows = await linkDB(query, values)
  return rows[0]
}

export const deleteProperty = async (id) => {
  const query = 'DELETE FROM propiedades WHERE id = $1'
  const result = await linkDB(query, [id])
  return result.rowCount > 0
}
