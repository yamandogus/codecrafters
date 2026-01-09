import { PassportStrategy } from "@nestjs/passport"
import { Strategy, VerifyCallback } from "passport-google-oauth20"
import { Injectable } from "@nestjs/common"
import { ConfigService } from "@nestjs/config"
import { UsersService } from "../../users/users.service"

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy, "google") {
  constructor(
    private configService: ConfigService,
    private usersService: UsersService,
  ) {
    super({
      clientID: configService.get<string>("GOOGLE_CLIENT_ID") || "",
      clientSecret: configService.get<string>("GOOGLE_CLIENT_SECRET") || "",
      callbackURL: configService.get<string>("GOOGLE_CALLBACK_URL") || "/api/auth/google/callback",
      scope: ["email", "profile"],
    })
  }

  async validate(
    accessToken: string,
    refreshToken: string,
    profile: {
      id: string
      displayName: string
      emails: Array<{ value: string; verified?: boolean }>
      photos?: Array<{ value: string }>
    },
    done: VerifyCallback,
  ): Promise<unknown> {
    const { id, displayName, emails, photos } = profile
    const email = emails?.[0]?.value
    const avatar = photos?.[0]?.value || undefined

    if (!email) {
      return done(new Error("Email not provided by Google"), undefined)
    }

    // Split display name into name and surname
    const nameParts = displayName.trim().split(" ")
    const name = nameParts[0] || displayName
    const surname = nameParts.slice(1).join(" ") || undefined

    try {
      // Check if user exists by Google ID
      let user = await this.usersService.findByGoogleId(id)

      if (user) {
        // Update avatar if changed
        if (avatar && user.avatar !== avatar) {
          await this.usersService.updateOAuthUser(user.id, { avatar })
          user.avatar = avatar
        }
        return done(null, user)
      }

      // Check if user exists by email (for linking accounts)
      user = await this.usersService.findByEmail(email)

      if (user) {
        // Link Google account to existing user
        await this.usersService.updateOAuthUser(user.id, {
          googleId: id,
          provider: "google",
          avatar: avatar ?? (user.avatar || undefined),
        })
        user.googleId = id
        user.provider = "google"
        if (avatar) user.avatar = avatar
        return done(null, user)
      }

      // Create new user
      const newUser = await this.usersService.createOAuthUser({
        email,
        name,
        surname,
        googleId: id,
        provider: "google",
        avatar,
      })

      return done(null, newUser)
    } catch (error) {
      return done(error as Error, undefined)
    }
  }
}

