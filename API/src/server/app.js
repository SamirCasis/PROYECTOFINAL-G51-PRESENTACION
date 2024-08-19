import express from 'express'
import cors from 'cors'
import swagger from '../../config/swagger/swagger.js'
import usersRoutes from './routes/users.routes.js'
import propertiesRoutes from './routes/properties.routes.js'
import transactionsRoutes from './routes/transactions.routes.js'
import { serverLog } from '../middlewares/user.middlewares.js'

const app = express()
const PORT = process.env.PORT || 5200

// Configuración de Swagger
swagger(app)

// Middleware
app.use(express.json())
app.use(cors({
    origin: 'https://proyectofinal-g51-presentacion.onrender.com',
    credentials: true
}))
app.use(serverLog)

// Rutas
app.use('/api/v1', usersRoutes)
app.use('/api/v1', propertiesRoutes)
app.use('/api/v1', transactionsRoutes)

// Ruta errónea
app.use('*', (req, res) => {
  res.status(404).send({ message: 'La ruta que intenta consultar no existe' })
})

// Inicia el servidor
app.listen(PORT, () => {
  console.log(`Server ON -> http://localhost:${PORT}`)
  console.log(`Swagger ON -> http://localhost:${PORT}/api/v1/docs`)
})

export default app
