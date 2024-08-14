import express from 'express'
import { createTransactionController, getAllTransactionsController, getTransactionByIdController } from '../controllers/transactions.Controller.js'


const router = express.Router()

router.post('/transactions', createTransactionController)
router.get('/transactions', getAllTransactionsController)
router.get('/transactions/:id', getTransactionByIdController)

export default router