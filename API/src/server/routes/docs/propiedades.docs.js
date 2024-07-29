/**
 * @swagger
 * components:
 *   schemas:
 *     Property:
 *       type: object
 *       required:
 *         - titulo
 *         - ubicacion
 *         - metros_cuadrados
 *         - numero_dormitorios
 *         - numero_banos
 *         - descripcion
 *         - valor
 *       properties:
 *         id:
 *           type: string
 *           description: El id autogenerado de la propiedad
 *         titulo:
 *           type: string
 *           description: El título de la propiedad
 *         ubicacion:
 *           type: string
 *           description: La ubicación de la propiedad
 *         metros_cuadrados:
 *           type: number
 *           description: El tamaño de la propiedad en metros cuadrados
 *         numero_dormitorios:
 *           type: number
 *           description: El número de dormitorios
 *         numero_banos:
 *           type: number
 *           description: El número de baños
 *         descripcion:
 *           type: string
 *           description: Una descripción de la propiedad
 *         valor:
 *           type: number
 *           description: El valor de la propiedad
 *       example:
 *         id: 00123
 *         titulo: "Hermosa Casa Familiar"
 *         ubicacion: "Calle Transversal 1001"
 *         metros_cuadrados: 150
 *         numero_dormitorios: 3
 *         numero_banos: 2
 *         descripcion: "Una hermosa casa familiar ubicada en el centro de la ciudad."
 *         valor: 3000
 */

/**
 * @swagger
 * tags:
 *   name: Propiedades
 *   description: La API de gestión de propiedades
 */

/**
 * @swagger
 * /propiedades:
 *   get:
 *     summary: Retorna la lista de todas las propiedades
 *     tags: [Propiedades]
 *     responses:
 *       200:
 *         description: La lista de las propiedades
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Property'
 */

/**
 * @swagger
 * /propiedades/{id}:
 *   get:
 *     summary: Obtener una propiedad por id
 *     tags: [Propiedades]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: El id de la propiedad
 *     responses:
 *       200:
 *         description: La descripción de la propiedad por id
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Property'
 *       404:
 *         description: La propiedad no fue encontrada
 */

/**
 * @swagger
 * /propiedades:
 *   post:
 *     summary: Crear una nueva propiedad
 *     tags: [Propiedades]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               property:
 *                 $ref: '#/components/schemas/Property'
 *     responses:
 *       '201':
 *         description: Éxito
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 property:
 *                   $ref: '#/components/schemas/Property'
 *       '400':
 *         description: Error al crear la propiedad
 */

/**
 * @swagger
 * /propiedades/{id}:
 *   put:
 *     summary: Actualizar una propiedad
 *     tags: [Propiedades]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: El id de la propiedad
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               property:
 *                 $ref: '#/components/schemas/Property'
 *     responses:
 *       200:
 *         description: Éxito
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 property:
 *                   $ref: '#/components/schemas/Property'
 *       400:
 *         description: Error al actualizar la propiedad
 */

/**
 * @swagger
 * /propiedades/{id}:
 *   delete:
 *     summary: Eliminar una propiedad
 *     tags: [Propiedades]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: El id de la propiedad
 *     responses:
 *       204:
 *         description: Éxito
 *       400:
 *         description: Error al eliminar una propiedad
 */