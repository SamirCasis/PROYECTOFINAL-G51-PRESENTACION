import express from 'express'
import { createTransactionController, getAllTransactionsController } from '../controllers/transactions.Controller.js'


const router = express.Router()

router.post('/transactions', createTransactionController)
router.get('/transactions', getAllTransactionsController)

export default router