import { FastifyInstance } from 'fastify'
import { z } from 'zod'
import { randomUUID } from 'crypto'
import { knex } from '../database'

// cookies <--> Forma de armazenar informações no navegador do usuário

export async function transactionsRoutes(app: FastifyInstance) {
  app.get('/', async () => {
    const transactions = await knex('transactions').select()
    return { transactions }
  })

  app.get('/:id', async (request) => {
    const getTransactionParamsSchema = z.object({
      id: z.string().uuid(),
    })
    const { id } = getTransactionParamsSchema.parse(request.params)

    const transaction = await knex('transactions').where({ id }).first()
    return { transaction }
  })

  // passar o retorno/ envio como objeto facilita pra qnd quiser inserir novas informações, não atrapalhar o resultado que já tinha

  app.get('/summary', async () => {
    const transactions = await knex('transactions')
      .sum('amount as amount') // o as amount é para colocar o nome na coluna
      .first()
    return { transactions }
  })

  app.post('/', async (request, reply) => {
    const createTransactionBodySchema = z.object({
      title: z.string(),
      amount: z.number(),
      type: z.enum(['credit', 'debit']),
    })

    const { title, amount, type } = createTransactionBodySchema.parse(
      request.body,
    )
    let sessionId = request.cookies.sessionId
    if (!sessionId) {
      sessionId = randomUUID()
      reply.cookie('sessionId', sessionId, {
        path: '/',
        maxAge: 1000 * 60 * 60 * 24 * 7, // 7 dias
      })
    }
    await knex('transactions').insert({
      id: randomUUID(),
      title,
      amount: type === 'credit' ? amount : amount * -1, // se for do tipo crédito utiliza do jeito que está, se for do tipo débito multiplica por -1
    })
    return reply.status(201).send()
  })
}
