import { PrismaClient } from '@prisma/client';
import jwt from 'jsonwebtoken';
const prisma = new PrismaClient();
export class GoogleOAuthService {
    async handleGoogleAuth(profile) {
        try {
            // Check if user already exists with this Google ID
            let user = await prisma.user.findUnique({
                where: { googleId: profile.id }
            });
            if (user) {
                return this.mapToOAuthUser(user);
            }
            // Check if user exists with same email
            const existingUser = await prisma.user.findUnique({
                where: { email: profile.emails?.[0]?.value }
            });
            if (existingUser) {
                // Link Google account to existing user
                user = await prisma.user.update({
                    where: { id: existingUser.id },
                    data: {
                        googleId: profile.id,
                        provider: 'google'
                    }
                });
                return this.mapToOAuthUser(user);
            }
            // Create new user
            const username = await this.generateUniqueUsername(profile.emails?.[0]?.value?.split('@')[0] || 'user');
            user = await prisma.user.create({
                data: {
                    googleId: profile.id,
                    email: profile.emails?.[0]?.value || '',
                    name: profile.displayName || profile.name?.givenName || '',
                    surname: profile.name?.familyName || '',
                    avatar: profile.photos?.[0]?.value || '',
                    provider: 'google',
                    username,
                    isVerified: true
                }
            });
            return this.mapToOAuthUser(user);
        }
        catch (error) {
            throw new Error(`Google OAuth error: ${error}`);
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
