import { PassportStrategy } from "@nestjs/passport"
import { Strategy } from "passport-github2"
import { Injectable } from "@nestjs/common"
import { ConfigService } from "@nestjs/config"
import { UsersService } from "../../users/users.service"

interface GitHubProfile {
  id: string
  displayName?: string
  username: string
  emails?: Array<{ value: string; verified?: boolean }>
  photos?: Array<{ value: string }>
  _json?: {
    name?: string
    email?: string
    avatar_url?: string
  }
}

@Injectable()
export class GithubStrategy extends PassportStrategy(Strategy, "github") {
  constructor(
    private configService: ConfigService,
    private usersService: UsersService,
  ) {
    super({
      clientID: configService.get<string>("GITHUB_CLIENT_ID") || "",
      clientSecret: configService.get<string>("GITHUB_CLIENT_SECRET") || "",
      callbackURL: configService.get<string>("GITHUB_CALLBACK_URL") || "/api/auth/github/callback",
      scope: ["user:email"],
    })
  }

  async validate(
    accessToken: string,
    refreshToken: string,
    profile: GitHubProfile,
    done: (error: Error | null, user?: unknown) => void,
  ): Promise<unknown> {
    const { id, username, displayName, emails, photos, _json } = profile
    const email = emails?.[0]?.value || _json?.email
    const avatar = (photos?.[0]?.value || _json?.avatar_url) || undefined
    const nameFromProfile = displayName || _json?.name || username

    if (!email) {
      return done(new Error("Email not provided by GitHub. Please make sure your email is public in GitHub settings."), undefined)
    }

    // Split name into name and surname
    const nameParts = nameFromProfile.trim().split(" ")
    const name = nameParts[0] || username
    const surname = nameParts.slice(1).join(" ") || undefined

    try {
      // Check if user exists by GitHub ID
      let user = await this.usersService.findByGithubId(id)

      if (user) {
        // Update avatar if changed
        if (avatar && user.avatar !== avatar) {
          await this.usersService.updateOAuthUser(user.id, { avatar })
          user.avatar = avatar
        }
        // Update GitHub username if changed
        if (user.github !== username) {
          await this.usersService.update(user.id, { github: username })
          user.github = username
        }
        return done(null, user)
      }

      // Check if user exists by email (for linking accounts)
      user = await this.usersService.findByEmail(email)

      if (user) {
        // Link GitHub account to existing user
        await this.usersService.updateOAuthUser(user.id, {
          githubId: id,
          provider: "github",
          avatar: avatar ?? (user.avatar || undefined),
        })
        await this.usersService.update(user.id, { github: username })
        user.githubId = id
        user.provider = "github"
        user.github = username
        if (avatar) user.avatar = avatar
        return done(null, user)
      }

      // Create new user
      const newUser = await this.usersService.createOAuthUser({
        email,
        name,
        surname,
        githubId: id,
        provider: "github",
        avatar,
      })

      // Set GitHub username
      await this.usersService.update(newUser.id, { github: username })
      newUser.github = username

      return done(null, newUser)
    } catch (error) {
      return done(error as Error, undefined)
    }
  }
}

