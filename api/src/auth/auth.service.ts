import { Injectable, ConflictException, UnauthorizedException } from "@nestjs/common"
import * as bcrypt from "bcrypt"
import { UsersService } from "../users/users.service"
import { RegisterDto } from "./dto/register.dto"

@Injectable()
export class AuthService {
  constructor(private usersService: UsersService) {}

  async register(registerDto: RegisterDto) {
    const existingUser = await this.usersService.findByEmail(registerDto.email)
    if (existingUser) {
      throw new ConflictException("Email already exists")
    }

    // Username yoksa email'den otomatik oluştur
    let username = registerDto.username
    if (!username) {
      const baseUsername = registerDto.email.split("@")[0]
      username = baseUsername
      let counter = 1
      
      // Username unique olana kadar dene
      while (await this.usersService.findUsernameExists(username)) {
        username = `${baseUsername}${counter}`
        counter++
      }
    } else {
      // Username varsa kontrol et
      const existingUsername = await this.usersService.findUsernameExists(username)
      if (existingUsername) {
        throw new ConflictException("Username already exists")
      }
    }

    const hashedPassword = await bcrypt.hash(registerDto.password, 10)

    const user = await this.usersService.create({
      email: registerDto.email,
      username,
      password: hashedPassword,
      name: registerDto.name,
      surname: registerDto.surname,
    })

    const { password, ...result } = user
    return {
      message: "User registered successfully",
      user: result,
    }
  }

  async validateUser(email: string, password: string) {
    const user = await this.usersService.findByEmail(email)
    if (!user || !user.password) {
      throw new UnauthorizedException("Invalid credentials")
    }

    const isPasswordValid = await bcrypt.compare(password, user.password)
    if (!isPasswordValid) {
      throw new UnauthorizedException("Invalid credentials")
    }

    if (!user.isActive) {
      throw new UnauthorizedException("Account is inactive")
    }

    const { password: _, ...result } = user
    return result
  }
}
