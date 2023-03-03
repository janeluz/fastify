import { FastifyInstance } from 'fastify'
import { z } from 'zod'

import { randomUUID } from 'crypto'

export async function transactionsRoutes(app: FastifyInstance) {
  app.post('/', async (request, reply) => {
    const createTransactionBodySchema = z.object({
      title: z.string(),
      amount: z.number(),
      type: z.enum(['credit', 'debit']),
    })

    const { title, amount, type } = createTransactionBodySchema.parse(
      request.body,
    )

    await Knex('transactions').insert({
      id: randomUUID(),
      title,
      amount: type === 'credit' ? amount : amount * -1, // se for do tipo crédito utiliza do jeito que está, se for do tipo débito multiplica por -1
    })
    return reply.status(201).send()
  })
}
