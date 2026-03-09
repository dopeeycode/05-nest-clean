import { Injectable, OnModuleDestroy, OnModuleInit } from '@nestjs/common'
import { PrismaClient } from 'prisma/generated/prisma/client'
import { PrismaPg } from '@prisma/adapter-pg'
import { ConfigService } from '@nestjs/config'
import type { Env } from '@/env'

@Injectable()
export class PrismaService
  extends PrismaClient
  implements OnModuleInit, OnModuleDestroy
{
  constructor() {
    const configService = new ConfigService<Env, true>()

    const databaseURL = configService.get<string>('DATABASE_URL')
    const schema = new URL(databaseURL).searchParams.get('schema')

    const adapter = new PrismaPg(
      { connectionString: databaseURL.toString() },
      { schema: schema || 'public' },
    )

    super({
      adapter,
      log: ['warn', 'error'],
    })
  }

  onModuleInit() {
    return this.$connect()
  }

  onModuleDestroy() {
    return this.$disconnect()
  }
}
