import { createTransaction, getAllTransactions, getTransactionById } from '../models/transactions.models.js'

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

export const getTransactionByIdController = async (req, res) => {
  try {
    const { id } = req.params
    const transaction = await getTransactionById(id)

    if (!transaction) {
      return res.status(404).json({ message: 'Transaccion no encontrada' })
    }

    res.status(200).json(transaction)
  } catch (error) {
    res.status(500).json({ message: 'error al obtener la transaccion', error })
  }
}