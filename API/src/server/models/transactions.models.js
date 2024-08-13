import linkDB from '../dbConnection/link.db.js'

export const createTransaction = async (userId, propertyId) => {
  try {
    const result = await linkDB(
      'INSERT INTO transactions (user_id, property_id, purchase_date) VALUES ($1, $2, NOW()) RETURNING *',
      [userId, propertyId]
    )

    if (result.length === 0) {
      throw new Error('No se ha creado la transacción')
    }

console.log(result)
    return result[0]
  } catch (error) {
    console.error('Error al crear la transacción', error)
    throw new Error('No se pudo crear la transacción')
  }
}

export const getTransactionById = async (id) => {
  const query = 'SELECT * FROM transactions WHERE id = $1'
  const result = await linkDB(query, [id])
  return result[0]
}

export const getAllTransactions = async () => {
  const result = await linkDB('SELECT * FROM transactions')
  return result
}


