import { describe, it, expect } from 'vitest'
import request from 'supertest'
import app from '../src/server/app.js'
import { jwtSign } from '../src/utils/jwt.js'


describe('GET /api/v1/users', () => {
    it('should return a list of users', async () => {
        const response = await request(app)
            .get('/api/v1/users')
            .expect('Content-Type', /json/)
            .expect(200)

        expect(response.body).toHaveProperty('users')
        expect(Array.isArray(response.body.users)).toBe(true)
        expect(response.body.users.length).toBeGreaterThan(0) // Verifica que la lista de usuarios no esté vacía
    })
})

describe('GET /api/v1/users/validate', () => {
    it('should return validated user information', async () => {
        const token = jwtSign({ email: 'testuser@example.com' }) // Usa el correo del usuario de prueba
        const response = await request(app)
            .get('/api/v1/users/validate')
            .set('Authorization', `Bearer ${token}`)
            .expect('Content-Type', /json/)
            .expect(200)

        expect(response.body).toBeInstanceOf(Object) // Asegúrate de que la respuesta sea un objeto
        expect(response.body).toHaveProperty('email', 'testuser@example.com')
    })
})

describe('GET /api/v1/users/:id', () => {
    it('should return a user by ID', async () => {
        const userId = 1 // Usa el ID del usuario de prueba
        const response = await request(app)
            .get(`/api/v1/users/${userId}`)
            .expect('Content-Type', /json/)
            .expect(200)

        expect(response.body).toHaveProperty('id', userId)
        expect(response.body).toHaveProperty('email', 'testuser@example.com') // Verifica que el email sea el esperado
    })
})

describe('POST /api/v1/users/register', () => {
    it('should register a new user', async () => {
        const response = await request(app)
            .post('/api/v1/users/register')
            .send({
                name: 'New Test User',
                phone: '0987654321',
                email: 'newtestuser@example.com',
                password: 'Password123',
                rol: 'usuario'
            })
            .expect('Content-Type', /json/)
            .expect(201)

        expect(response.body).toHaveProperty('user')
        expect(response.body.user).toHaveProperty('email', 'newtestuser@example.com')
    })
})

describe('POST /api/v1/users/login', () => {
    it('should log in and return a token', async () => {
        const response = await request(app)
            .post('/api/v1/users/login')
            .send({
                email: 'testuser@example.com',
                password: 'Password123'
            })
            .expect('Content-Type', /json/)
            .expect(200)

        expect(response.body).toHaveProperty('token')
        expect(typeof response.body.token).toBe('string') // Verifica que el token sea una cadena de texto
    })
})

describe('PUT /api/v1/users/:id', () => {
    it('should update a user by ID', async () => {
        const userId = 1 // Usa el ID del usuario de prueba
        const response = await request(app)
            .put(`/api/v1/users/${userId}`)
            .send({
                name: 'Updated User',
                phone: '0987654321',
                email: 'updateduser@example.com',
                password: 'NewPassword123'
            })
            .expect('Content-Type', /json/)
            .expect(200)

        expect(response.body).toHaveProperty('user')
        expect(response.body.user).toHaveProperty('email', 'updateduser@example.com')
    })
})

describe('DELETE /api/v1/users/:id', () => {
    it('should delete a user by ID', async () => {
        const userId = 1 // Usa el ID del usuario de prueba
        const response = await request(app)
            .delete(`/api/v1/users/${userId}`)
            .expect('Content-Type', /json/)
            .expect(200)

        expect(response.body).toHaveProperty('message', 'Usuario eliminado exitosamente')
    })
})


