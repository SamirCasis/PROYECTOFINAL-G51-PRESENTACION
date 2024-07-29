import express from 'express'
import cors from 'cors'
import swagger from '../../config/swagger/swagger.js'

import propiedadesRoutes from './routes/propiedades.routes.js'

const app = express()
const PORT = process.env.PORT || 5200

swagger(app)
app.use(express.json())
app.use(cors())

app.use('/api/v1', propiedadesRoutes)


app.listen(PORT, () => {
    console.log(`Server ON -> http://localhost:${PORT}`),
        console.log(`Swagger ON -> http://localhost:${PORT}/api/v1/docs`)
})

export default app