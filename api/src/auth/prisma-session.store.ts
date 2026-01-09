import { type SessionData, Store } from "express-session"
import type { PrismaClient } from "@prisma/client"

export class PrismaSessionStore extends Store {
  constructor(private prisma: PrismaClient) {
    super()
  }

  async get(sid: string, callback: (err?: Error, session?: SessionData | null) => void) {
    try {
      const session = await this.prisma.session.findUnique({
        where: { sid },
      })

      if (!session || session.expiresAt < new Date()) {
        return callback(undefined, null)
      }

      const data = JSON.parse(session.data) as SessionData
      callback(undefined, data)
    } catch (error) {
      callback(error)
    }
  }

  async set(sid: string, session: SessionData, callback?: (err?: Error) => void) {
    try {
      const expiresAt = session.cookie?.expires ? new Date(session.cookie.expires) : new Date(Date.now() + 86400000)

      await this.prisma.session.upsert({
        where: { sid },
        create: {
          id: sid,
          sid,
          data: JSON.stringify(session),
          expiresAt,
        },
        update: {
          data: JSON.stringify(session),
          expiresAt,
        },
      })

      callback?.()
    } catch (error) {
      callback?.(error)
    }
  }

  async destroy(sid: string, callback?: (err?: Error) => void) {
    try {
      await this.prisma.session.delete({
        where: { sid },
      })
      callback?.()
    } catch (error) {
      callback?.(error)
    }
  }

  async touch(sid: string, session: SessionData, callback?: (err?: Error) => void) {
    try {
      const expiresAt = session.cookie?.expires ? new Date(session.cookie.expires) : new Date(Date.now() + 86400000)

      await this.prisma.session.update({
        where: { sid },
        data: { expiresAt },
      })

      callback?.()
    } catch (error) {
      callback?.(error)
    }
  }

  async length(callback: (err: Error | null, length?: number) => void) {
    try {
      const count = await this.prisma.session.count()
      callback(null, count)
    } catch (error) {
      callback(error)
    }
  }

  async clear(callback?: (err?: Error) => void) {
    try {
      await this.prisma.session.deleteMany({})
      callback?.()
    } catch (error) {
      callback?.(error)
    }
  }
}
