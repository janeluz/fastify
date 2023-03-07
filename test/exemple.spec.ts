import { test, beforeAll, afterAll } from 'vitest'
import request from 'supertest'
import { app } from '../src/server'

beforeAll(async () => {
  await app.ready()
})

afterAll(async () => {
  await app.close()
})

test('User can create a new transaction', async () => {
  await request(app.server)
    .post('/transactions')
    .send({
      title: 'new transaction',
      amount: 5000,
      description: 'Salário',
    })
    .expect(201)
})
