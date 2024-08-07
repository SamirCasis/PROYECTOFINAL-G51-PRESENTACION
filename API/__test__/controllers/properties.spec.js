import request from 'supertest'
import { describe, it, expect, beforeEach, afterAll } from 'vitest'
import app from '../../src/server/server.js'
import linkDB from '../config/db.js'

const resetDatabase = async () => {
  await linkDB('DELETE FROM propiedades')
  await linkDB(`
    INSERT INTO propiedades (title, location, meters, bedrooms, bathrooms, description, price)
    VALUES 
      ('Property 1', 'Location 1', 100, 3, 2, 'Description 1', 100000),
      ('Property 2', 'Location 2', 150, 4, 3, 'Description 2', 200000)
  `)
}

describe('Properties Controllers', () => {
  beforeEach(async () => {
    await resetDatabase()
  })

  afterAll(async () => {
    await linkDB.end()
  })

  describe('GET /properties', () => {
    it('should return all properties', async () => {
      const response = await request(app).get('/properties')
      
      expect(response.status).toBe(200)
      expect(response.body.length).toBe(2)
      expect(response.body[0]).toHaveProperty('title', 'Property 1')
    })
  })

  describe('GET /properties/:id', () => {
    it('should return a property by id', async () => {
      const response = await request(app).get('/properties/1')
      
      expect(response.status).toBe(200)
      expect(response.body).toHaveProperty('title', 'Property 1')
    })

    it('should return 404 if property not found', async () => {
      const response = await request(app).get('/properties/999')
      
      expect(response.status).toBe(404)
      expect(response.body).toHaveProperty('error', 'Propiedad no encontrada')
    })
  })

  describe('POST /properties', () => {
    it('should create a new property', async () => {
      const newProperty = {
        title: 'Property 3',
        location: 'Location 3',
        meters: 200,
        bedrooms: 5,
        bathrooms: 4,
        description: 'Description 3',
        price: 300000
      }

      const response = await request(app).post('/properties').send(newProperty)
      
      expect(response.status).toBe(201)
      expect(response.body).toHaveProperty('title', 'Property 3')

      const allProperties = await request(app).get('/properties')
      expect(allProperties.body.length).toBe(3)
    })
  })

  describe('PUT /properties/:id', () => {
    it('should update a property', async () => {
      const updates = { title: 'Updated Property 1', price: 110000 }
      
      const response = await request(app).put('/properties/1').send(updates)
      
      expect(response.status).toBe(200)
      expect(response.body).toHaveProperty('title', 'Updated Property 1')
    })

    it('should return 404 if property not found', async () => {
      const updates = { title: 'Non-existent Property', price: 0 }
      
      const response = await request(app).put('/properties/999').send(updates)
      
      expect(response.status).toBe(404)
      expect(response.body).toHaveProperty('error', 'Propiedad no encontrada')
    })
  })

  describe('DELETE /properties/:id', () => {
    it('should delete a property', async () => {
      const response = await request(app).delete('/properties/1')
      
      expect(response.status).toBe(204)

      const allProperties = await request(app).get('/properties')
      expect(allProperties.body.length).toBe(1)
    })

    it('should return 404 if property not found', async () => {
      const response = await request(app).delete('/properties/999')
      
      expect(response.status).toBe(404)
      expect(response.body).toHaveProperty('error', 'Propiedad no encontrada')
    })
  })
})
