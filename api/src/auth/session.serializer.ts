import { Injectable } from "@nestjs/common"
import { PassportSerializer } from "@nestjs/passport"
import { UsersService } from "../users/users.service"

interface SerializedUser {
  id: string
}

interface DeserializedUser {
  id: string
  [key: string]: unknown
}

@Injectable()
export class SessionSerializer extends PassportSerializer {
  constructor(private usersService: UsersService) {
    super()
  }

  serializeUser(user: SerializedUser, done: (err: Error | null, id?: string) => void): void {
    done(null, user.id)
  }

  async deserializeUser(userId: string, done: (err: Error | null, user?: DeserializedUser) => void): Promise<void> {
    try {
      const user = await this.usersService.findById(userId)
      const { password, ...result } = user as DeserializedUser & { password?: string | null }
      done(null, result as DeserializedUser)
    } catch (error) {
      done(error instanceof Error ? error : new Error(String(error)), undefined)
    }
  }
}
