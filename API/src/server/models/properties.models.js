import linkDB from '../dbConnection/link.db.js'

export const getPropertiesModel = async () => {
  const query = 'SELECT * FROM properties'
  const rows = await linkDB(query)
  return rows
}

export const getPropertyByIdModel = async (id) => {
  const query = 'SELECT * FROM properties WHERE id = $1'
  const rows = await linkDB(query, [id])
  return rows[0]
}

export const postPropertiesModel = async (title, location, meters, bedrooms, bathrooms, description, price, imgurl) => {
  const query = `
    INSERT INTO properties (title, location, meters, bedrooms, bathrooms, description, price, imgurl) 
    VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *`
  const rows = await linkDB(query, [title, location, meters, bedrooms, bathrooms, description, price, imgurl])
  return rows[0]
}

export const updatePropertyModel = async (id, { title, location, meters, bedrooms, bathrooms, description, price, imgurl }) => {
  const query = `
    UPDATE properties 
    SET 
      title = COALESCE($1, title), 
      location = COALESCE($2, location), 
      meters = COALESCE($3, meters), 
      bedrooms = COALESCE($4, bedrooms), 
      bathrooms = COALESCE($5, bathrooms), 
      description = COALESCE($6, description), 
      price = COALESCE($7, price), 
      imgurl = COALESCE($8, imgurl)
    WHERE id = $9 
    RETURNING *
  `
  const rows = await linkDB(query, [title, location, meters, bedrooms, bathrooms, description, price, imgurl, id])
  return rows[0]
}

export const deletePropertyModel = async (id) => {
  const query = 'DELETE FROM properties WHERE id = $1 RETURNING id'
  const result = await linkDB(query, [id])
  return result[0] || null
}




