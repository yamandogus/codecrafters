import { Module } from "@nestjs/common"
import { PassportModule } from "@nestjs/passport"
import { AuthController } from "./auth.controller"
import { AuthService } from "./auth.service"
import { UsersModule } from "../users/users.module"
import { LocalStrategy } from "./strategies/local.strategy"
import { GoogleStrategy } from "./strategies/google.strategy"
import { GithubStrategy } from "./strategies/github.strategy"
import { SessionSerializer } from "./session.serializer"

@Module({
  imports: [UsersModule, PassportModule.register({ session: true })],
  controllers: [AuthController],
  providers: [AuthService, LocalStrategy, GoogleStrategy, GithubStrategy, SessionSerializer],
  exports: [AuthService],
})
export class AuthModule {}
