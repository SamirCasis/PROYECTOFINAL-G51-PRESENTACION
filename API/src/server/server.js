import express from 'express'
import cors from 'cors'
import swagger from '../../config/swagger/swagger.js'

import propertiesRoutes from './routes/properties.routes.js'
import usersRoutes from './routes/users.routes.js'

const app = express()
const PORT = process.env.PORT || 5200

swagger(app)
app.use(express.json())
app.use(cors())

app.use('/api/v1/users', usersRoutes)
app.use('/api/v1/properties', propertiesRoutes)


app.listen(PORT, () => {
    console.log(`Server ON -> http://localhost:${PORT}`),
        console.log(`Swagger ON -> http://localhost:${PORT}/api/v1/docs`)
})

export default app