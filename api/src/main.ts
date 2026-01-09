import { NestFactory } from "@nestjs/core"
import { ValidationPipe } from "@nestjs/common"
import { ConfigService } from "@nestjs/config"
import session from "express-session"
import passport from "passport"
import { AppModule } from "./app.module"
import { PrismaSessionStore } from "./auth/prisma-session.store"
import { PrismaClient } from "@prisma/client"
import { PrismaPg } from "@prisma/adapter-pg"
import { Pool } from "pg"

async function bootstrap() {
  const app = await NestFactory.create(AppModule)
  const configService = app.get(ConfigService)

  const databaseUrl = configService.get<string>("DATABASE_URL")
  if (!databaseUrl) {
    throw new Error("DATABASE_URL environment variable is required")
  }

  const pool = new Pool({ connectionString: databaseUrl })
  const adapter = new PrismaPg(pool)
  const prisma = new PrismaClient({ adapter })

  // Global validation pipe
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
      transformOptions: {
        enableImplicitConversion: true,
      },
    }),
  )

  // Session configuration with Prisma store
  app.use(
    session({
      secret: configService.get("SESSION_SECRET") || "codecrafters-secret",
      resave: false,
      saveUninitialized: false,
      store: new PrismaSessionStore(prisma),
      cookie: {
        maxAge: 1000 * 60 * 60 * 24 * 7, // 7 days
        httpOnly: true,
        secure: configService.get("NODE_ENV") === "production",
        sameSite: "lax",
      },
    }),
  )

  // Initialize Passport
  app.use(passport.initialize())
  app.use(passport.session())

  // CORS configuration
  const allowedOrigins = configService.get("ALLOWED_ORIGINS")?.split(",") || ["http://localhost:3000"]
  app.enableCors({
    origin: allowedOrigins,
    credentials: true,
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })

  // Global prefix
  app.setGlobalPrefix("api")

  const port = configService.get("PORT") || 3001
  await app.listen(port)

  console.log(`🚀 CodeCrafters Backend is running on: http://localhost:${port}/api`)
  console.log(`📚 API Documentation: http://localhost:${port}/api`)
}

bootstrap()
