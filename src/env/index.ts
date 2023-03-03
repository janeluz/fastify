import 'dotenv/config'
import { z } from 'zod'

const envSchema = z.object({
  NODE_ENV: z.enum(['development', 'production', 'test']).default('production'),
  DATABASE_URL: z.string(),
  PORT: z.number().default(3333),
})

const _env = envSchema.safeParse(process.env)

if (_env.success === false) {
  console.error(' invalid environment variables!', _env.error)

  throw new Error('Invalid environment variables!')
}

export const env = _env.data
// o metodo parse pega o schema verifica no process env se está correto e valida
// arse dispara um erro automatico qnd a validação não é feita, o safeParse não, vc cria o proprio erro