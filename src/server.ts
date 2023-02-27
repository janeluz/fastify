import fastify from 'fastify'
import { knex } from './database'

const app = fastify()

app.get('/hello', async () => {
  const transaction = await knex('transaction')
    .where('amount', 1000)
    .select('*')

  return transaction
})

app.listen({ port: 3000 }).then(() => {
  console.log('HTTP Server Running!')
})
