import { PrismaClient } from '@prisma/client';
import jwt from 'jsonwebtoken';
const prisma = new PrismaClient();
export class GitHubOAuthService {
    async handleGitHubAuth(profile) {
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
            const username = await this.generateUniqueUsername(profile.username || 'user');
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
        }
        catch (error) {
            throw new Error(`GitHub OAuth error: ${error}`);
        }
    }
    async generateUniqueUsername(baseUsername) {
        let username = baseUsername;
        let counter = 1;
        while (await prisma.user.findUnique({ where: { username } })) {
            username = `${baseUsername}_${counter}`;
            counter++;
        }
        return username;
    }
    mapToOAuthUser(user) {
        return {
            id: user.id,
            email: user.email,
            name: user.name,
            surname: user.surname || undefined,
            avatar: user.avatar || undefined,
            provider: user.provider || 'local',
            username: user.username,
            isVerified: user.isVerified
        };
    }
    generateToken(userId) {
        return jwt.sign({ userId }, process.env.JWT_ACCESS_SECRET, { expiresIn: '7d' });
    }
}
