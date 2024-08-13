import { describe, test, expect } from 'vitest'
import request from 'supertest'
import app from '../index.js'

describe('Operaciones Post y Get', () => {
    test('POST/ api/v1/transactions crea transaccion y devuelve un 201', async () => {
        const transaction = { user_id: 1, property_id: 1 }
        const res = await request(app).post('/api/v1/transactions')
        .send(transaction)
        expect(res.statusCode).toBe(201)
        expect(res.body).toContainEqual(transaction)
    })

    test('GET/ debe retornar un array de objetos y un status 200', async () => {
        const res = await request(app).get('/api/v1/transactions')
        expect(res.status).toBe(200)
        expect(res.body).toBeInstanceOf(Array)
        expect(res.body.length).toBeGreaterThan(0)
    })
})


