import { createTransaction, getAllTransactions } from '../models/transactions.models.js'

export const createTransactionController = async (req, res) => {
  const { user_id, property_id } = req.body

  try {
    const transaction = await createTransaction(user_id, property_id)
    res.status(201).json(transaction)
  } catch (error) {
    console.error('Error al crear la transacción:', error.message)
    res.status(500).json({ error: 'Error interno del servidor' })
  }
}


export const getAllTransactionsController = async (req, res) => {
  try {
    const transactions = await getAllTransactions()
    res.status(200).json({ transactions })
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: 'Error al obtener las transacciones' })
  }
}
