import { test, beforeAll, afterAll, describe, it } from 'vitest'
import request from 'supertest'
import { app } from '../src/server'

describe('Transactions', () => {
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
        type: 'credit',
      })
      .expect(201)
  })
  it('should be able  to list all transactions', async () => {
    const createTransactionResponse = await request(app.server)
      .post('/transactions')
      .send({
        title: 'new transaction',
        amount: 5000,
        type: 'credit',
      })

    const cookies = createTransactionResponse.headers('set-cookie')

    await request(app.server)
      .get('/transactions')
      .set('Cookie', cookies)
      .expect(200)
  })
})
