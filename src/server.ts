import fastify from 'fastify'
import { knex } from './database'
import { env } from './env'
import { transactionsRoutes } from './routes/transactions'

const app = fastify({ logger: true })

app.get('/hello', async () => {
  const transaction = await knex('transaction')
    .where('amount', 1000)
    .select('*')

  return transaction
})
app.register(transactionsRoutes)

app.listen({ port: env.PORT }).then(() => {
  console.log('HTTP Server Running!')
})
