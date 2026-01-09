import { Injectable, type OnModuleInit, type OnModuleDestroy } from "@nestjs/common"
import { PrismaClient } from "@prisma/client"
import { PrismaPg } from "@prisma/adapter-pg"
import { Pool } from "pg"
import { ConfigService } from "@nestjs/config"

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit, OnModuleDestroy {
  constructor(private configService: ConfigService) {
    const pool = new Pool({ 
      connectionString: configService.get<string>("DATABASE_URL") 
    })
    const adapter = new PrismaPg(pool)
    super({ adapter })
  }
  
  async onModuleInit() {
    await this.$connect()
    console.log("✅ Database connected successfully")
  }

  async onModuleDestroy() {
    await this.$disconnect()
  }
}
