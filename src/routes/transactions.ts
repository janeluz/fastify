import { FastifyInstance } from 'fastify'
import knex from 'knex'

export async function transactionsRoutes(app: FastifyInstance) {
  app.get('/transactions', async () => {
    const transactions = await knex('transaction')
      .where('amount', 1000)
      .select('*')

    return transactions
  })
}
