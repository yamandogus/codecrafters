import { Controller, Post, Get, UseGuards, Body, HttpCode, HttpStatus, Req } from "@nestjs/common"
import { AuthService } from "./auth.service"
import { LocalAuthGuard } from "./guards/local-auth.guard"
import { AuthenticatedGuard } from "./guards/authenticated.guard"
import type { RegisterDto } from "./dto/register.dto"
import type { LoginDto } from "./dto/login.dto"

@Controller("auth")
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post("register")
  async register(@Body() registerDto: RegisterDto) {
    return this.authService.register(registerDto)
  }

  @UseGuards(LocalAuthGuard)
  @Post("login")
  @HttpCode(HttpStatus.OK)
  async login(@Body() loginDto: LoginDto, @Req() req: { user?: Record<string, unknown> }) {
    return {
      message: "Login successful",
      user: req.user,
    }
  }

  @UseGuards(AuthenticatedGuard)
  @Post('logout')
  @HttpCode(HttpStatus.OK)
  async logout(@Req() req: { session: { destroy: (callback?: (err?: Error) => void) => void } }) {
    req.session.destroy();
    return { message: 'Logout successful' };
  }

  @UseGuards(AuthenticatedGuard)
  @Get('profile')
  getProfile(@Req() req: { user: Record<string, unknown> }) {
    return req.user;
  }

  @Get('check')
  checkAuth(@Req() req: { isAuthenticated: () => boolean; user?: Record<string, unknown> | null }) {
    return {
      authenticated: req.isAuthenticated(),
      user: req.user || null,
    };
  }
}
