import swaggerJSDoc from 'swagger-jsdoc'
import swaggerUi from 'swagger-ui-express'

const options = {
    definition: {
        openapi: '3.1.0',
        info: {
            title: 'API Propiedades',
            version: '1.0.0',
            description: 'API de gestión de propiedades',
        },
        servers: [
            {
                url: 'http://localhost:5200/api/v1',
                description: 'Servidor de prueba',
            },
        ],
    },
    apis: ['src/server/routes/docs/*.js'],
}

const specs = swaggerJSDoc(options)

export default (app) => {
    app.use(
        '/api/v1/docs',
        swaggerUi.serve,
        swaggerUi.setup(specs, {
            explorer: true,
            customCssUrl:
                'https://cdn.jsdelivr.net/npm/swagger-ui-themes@3.0.0/themes/3.x/theme-flattop.css',
        })
    )
}