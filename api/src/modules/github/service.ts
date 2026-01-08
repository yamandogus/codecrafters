import { PrismaClient } from '@prisma/client';
import { GitHubProfile, OAuthUser } from '../../dto/oauthDto.js';
import jwt from 'jsonwebtoken';

const prisma = new PrismaClient();

export class GitHubOAuthService {
  async handleGitHubAuth(profile: GitHubProfile): Promise<OAuthUser> {
    try {
      // Check if user already exists with this GitHub ID
      let user = await prisma.user.findUnique({
        where: { githubId: profile.id }
      });

      if (user) {
        return this.mapToOAuthUser(user);
      }

      // Check if user exists with same email
      const existingUser = await prisma.user.findUnique({
        where: { email: profile.emails?.[0]?.value }
      });

      if (existingUser) {
        // Link GitHub account to existing user
        user = await prisma.user.update({
          where: { id: existingUser.id },
          data: {
            githubId: profile.id,
            provider: 'github',
            github: profile.profileUrl || ''
          }
        });
        return this.mapToOAuthUser(user);
      }

      // Create new user
      const username = await this.generateUniqueUsername(
        profile.username || 'user'
      );

      user = await prisma.user.create({
        data: {
          githubId: profile.id,
          email: profile.emails?.[0]?.value || '',
          name: profile.displayName || profile.username || '',
          surname: '',
          avatar: profile.photos?.[0]?.value || '',
          provider: 'github',
          username,
          isVerified: true,
          github: profile.profileUrl || ''
        }
      });

      return this.mapToOAuthUser(user);
    } catch (error) {
      throw new Error(`GitHub OAuth error: ${error}`);
    }
  }

  private async generateUniqueUsername(baseUsername: string): Promise<string> {
    let username = baseUsername;
    let counter = 1;

    while (await prisma.user.findUnique({ where: { username } })) {
      username = `${baseUsername}_${counter}`;
      counter++;
    }

    return username;
  }

  private mapToOAuthUser(user: { id: string; email: string; name: string; surname: string | null; avatar: string | null; provider: string | null; username: string; isVerified: boolean }): OAuthUser {
    return {
      id: user.id,
      email: user.email,
      name: user.name,
      surname: user.surname || undefined,
      avatar: user.avatar || undefined,
      provider: user.provider as 'github' | 'local' | 'google' || 'local',
      username: user.username,
      isVerified: user.isVerified
    };
  }

  generateToken(userId: string): string {
    return jwt.sign(
      { userId },
      process.env.JWT_ACCESS_SECRET!,
      { expiresIn: '7d' }
    );
  }
}