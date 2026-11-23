import { drizzle } from 'drizzle-orm/postgres-js'
import postgres from 'postgres'
import * as schema from './schema'

const connectionString = process.env.DATABASE_URL

let client: ReturnType<typeof postgres> | null = null
let db: any

if (connectionString) {
  try {
    // Disable prefetch for Supabase/pooler compatibility
    client = postgres(connectionString, {
      prepare: false,
      max: 1,
      idle_timeout: 20,
      connect_timeout: 10
    })
    db = drizzle(client, { schema })
  } catch {
    console.warn('[AI Studio] Database connection failed — using mock')
  }
}

if (!db) {
  const noOp = {
    findMany: async () => [],
    findFirst: async () => null,
    findUnique: async () => null,
    create: async (d: any) => d?.data ?? {},
    update: async (d: any) => d?.data ?? {},
    delete: async () => ({})
  }
  db = new Proxy(
    {},
    {
      get: (_, prop) =>
        prop === 'query'
          ? new Proxy({}, { get: () => noOp })
          : async () => []
    }
  )
}

export { db, client }

export type DB = typeof db

export * from './schema'