import linkDB from '../dbConnection/link.db.js'

// Obtiene todas las propiedades
export const getPropertiesModel = async () => {
  const query = 'SELECT * FROM properties'
  const rows = await linkDB(query)
  return rows
}

// Obtiene una propiedad por ID
export const getPropertyByIdModel = async (id) => {
  const query = 'SELECT * FROM properties WHERE id = $1'
  const rows = await linkDB(query, [id])
  return rows[0]
}

// Inserta una nueva propiedad y retorna la propiedad insertada
export const postPropertiesModel = async (title, location, meters, bedrooms, bathrooms, description, price, imgurl) => {
  const query = `
    INSERT INTO properties (title, location, meters, bedrooms, bathrooms, description, price, imgurl) 
    VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *`
  const rows = await linkDB(query, [title, location, meters, bedrooms, bathrooms, description, price, imgurl])
  return rows[0]
}

// Actualiza una propiedad por ID
export const updatePropertyModel = async (id, updates) => {
  const setQuery = Object.keys(updates)
    .map((key, index) => `${key} = $${index + 2}`)
    .join(', ')

  const query = `UPDATE properties SET ${setQuery} WHERE id = $1 RETURNING *`
  const values = [id, ...Object.values(updates)]
  const rows = await linkDB(query, values)
  return rows[0]
}

// Elimina una propiedad por ID y retorna un booleano que indica si la eliminación fue exitosa
export const deletePropertyModel = async (id) => {
  const query = 'DELETE FROM properties WHERE id = $1'
  const result = await linkDB(query, [id])
  return result.rowCount > 0
}




