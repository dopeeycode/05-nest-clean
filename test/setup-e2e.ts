import 'dotenv/config'

import { execSync } from 'node:child_process'
import { PrismaPg } from '@prisma/adapter-pg'
import { PrismaClient } from 'prisma/generated/prisma/client'
import { randomUUID } from 'node:crypto'

const databaseURL = process.env.DATABASE_URL as string
const schema = new URL(databaseURL).searchParams.get('schema')

const adapter = new PrismaPg(
  { connectionString: databaseURL },
  { schema: schema ?? 'public' },
)

const prisma = new PrismaClient({ adapter })

if (!process.env.DATABASE_URL) {
  throw new Error('DATABASE_URL environment variable is not set')
}

function generateUniqueDatabaseURL(schemaId: string): string {
  const url = new URL(databaseURL)
  url.searchParams.set('schema', schemaId)

  return url.toString()
}

const schemaId = randomUUID()

beforeAll(async () => {
  const databaseURL = generateUniqueDatabaseURL(schemaId)

  process.env.DATABASE_URL = databaseURL

  execSync('pnpm prisma migrate deploy')
})

afterAll(async () => {
  await prisma.$executeRawUnsafe(`DROP SCHEMA IF EXISTS "${schemaId}" CASCADE`)
  await prisma.$disconnect()
})
