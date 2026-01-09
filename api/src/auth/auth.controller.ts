import { Controller, Post, Get, UseGuards, Body, HttpCode, HttpStatus, Req, Redirect, UnauthorizedException } from "@nestjs/common"
import { AuthService } from "./auth.service"
import { LocalAuthGuard } from "./guards/local-auth.guard"
import { AuthenticatedGuard } from "./guards/authenticated.guard"
import { GoogleAuthGuard } from "./guards/google-auth.guard"
import { GithubAuthGuard } from "./guards/github-auth.guard"
import { RegisterDto } from "./dto/register.dto"
import { LoginDto } from "./dto/login.dto"

@Controller("auth")
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post("register")
  async register(@Body() registerDto: RegisterDto, @Req() req: any) {
    const result = await this.authService.register(registerDto)
    
    // Register'dan sonra otomatik login yap
    try {
      const user = await this.authService.validateUser(registerDto.email, registerDto.password)
      if (user) {
        // Session'a kullanıcıyı kaydet (Promise wrapper)
        await new Promise<void>((resolve, reject) => {
          req.login(user, (err: Error | null) => {
            if (err) {
              reject(err)
            } else {
              resolve()
            }
          })
        })
      }
    } catch (error) {
      console.error('Auto-login after register failed:', error)
      // Login hatası olsa bile register başarılı, devam et
    }
    
    return {
      success: true,
      message: result.message,
      data: {
        user: result.user,
        // Session-based auth için token yerine session kullanılıyor
        token: "session-based",
        refreshToken: undefined,
      },
    }
  }

  @UseGuards(LocalAuthGuard)
  @Post("login")
  @HttpCode(HttpStatus.OK)
  async login(@Body() loginDto: LoginDto, @Req() req: { user?: Record<string, unknown> }) {
    if (!req.user) {
      throw new UnauthorizedException("Authentication failed")
    }

    return {
      success: true,
      message: "Login successful",
      data: {
        user: req.user,
        // Session-based auth için token yerine session kullanılıyor
        // Frontend için dummy token (session kontrolü için)
        token: "session-based",
        refreshToken: undefined,
      },
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

  // Google OAuth routes
  @Get('google')
  @UseGuards(GoogleAuthGuard)
  async googleAuth() {
    // Guard redirects to Google
  }

  @Get('google/callback')
  @UseGuards(GoogleAuthGuard)
  @Redirect()
  async googleAuthCallback(@Req() req: { user?: Record<string, unknown> }) {
    const frontendUrl = process.env.FRONTEND_URL || "http://localhost:3000"
    const user = req.user as { role?: string } | undefined
    
    if (!user) {
      return { url: `${frontendUrl}/auth/oauth-callback?error=authentication_failed` }
    }

    // Redirect to callback page which will handle popup communication
    return { url: `${frontendUrl}/auth/oauth-callback` }
  }

  // GitHub OAuth routes
  @Get('github')
  @UseGuards(GithubAuthGuard)
  async githubAuth() {
    // Guard redirects to GitHub
  }

  @Get('github/callback')
  @UseGuards(GithubAuthGuard)
  @Redirect()
  async githubAuthCallback(@Req() req: { user?: Record<string, unknown> }) {
    const frontendUrl = process.env.FRONTEND_URL || "http://localhost:3000"
    const user = req.user as { role?: string } | undefined
    
    if (!user) {
      return { url: `${frontendUrl}/auth/oauth-callback?error=authentication_failed` }
    }

    // Redirect to callback page which will handle popup communication
    return { url: `${frontendUrl}/auth/oauth-callback` }
  }
}
