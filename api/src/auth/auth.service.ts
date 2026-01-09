import { Injectable, ConflictException, UnauthorizedException } from "@nestjs/common"
import * as bcrypt from "bcrypt"
import { UsersService } from "../users/users.service"
import type { RegisterDto } from "./dto/register.dto"

@Injectable()
export class AuthService {
  constructor(private usersService: UsersService) {}

  async register(registerDto: RegisterDto) {
    const existingUser = await this.usersService.findByEmail(registerDto.email)
    if (existingUser) {
      throw new ConflictException("Email already exists")
    }

    const existingUsername = await this.usersService.findByUsername(registerDto.username)
    if (existingUsername) {
      throw new ConflictException("Username already exists")
    }

    const hashedPassword = await bcrypt.hash(registerDto.password, 10)

    const user = await this.usersService.create({
      ...registerDto,
      password: hashedPassword,
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
