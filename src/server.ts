import fastify from 'fastify'
import { knex } from './database'
import { env } from './env'
import { transactionsRoutes } from './routes/transactions'

const app = fastify({ logger: true })

app.register(transactionsRoutes, {
  prefix: '/transactions',
})
app.register(knex)
app.listen({ port: env.PORT }).then(() => {
  console.log('HTTP Server Running!')
})
