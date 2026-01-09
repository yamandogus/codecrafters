import { type ExecutionContext, Injectable, UnauthorizedException } from "@nestjs/common"
import { AuthGuard } from "@nestjs/passport"

@Injectable()
export class LocalAuthGuard extends AuthGuard("local") {
  async canActivate(context: ExecutionContext) {
    try {
      const result = (await super.canActivate(context)) as boolean
      const request = context.switchToHttp().getRequest()
      
      // User varsa session'a kaydet
      if (request.user) {
        await super.logIn(request)
      }
      
      return result
    } catch (error) {
      // Passport exception'larını yakala ve daha anlamlı hata mesajı döndür
      if (error instanceof UnauthorizedException) {
        throw error
      }
      
      // Diğer hataları UnauthorizedException'a çevir
      throw new UnauthorizedException("Invalid credentials")
    }
  }
}
