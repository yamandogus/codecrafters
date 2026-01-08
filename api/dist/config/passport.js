import passport from 'passport';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import { Strategy as GitHubStrategy } from 'passport-github2';
import { GoogleOAuthService } from '../modules/google/service.js';
import { GitHubOAuthService } from '../modules/github/service.js';
const googleService = new GoogleOAuthService();
const githubService = new GitHubOAuthService();
// Serialize user for session
passport.serializeUser((user, done) => {
    const oauthUser = user;
    done(null, oauthUser.id);
});
// Deserialize user from session
passport.deserializeUser(async (id, done) => {
    try {
        const { PrismaClient } = await import('@prisma/client');
        const prisma = new PrismaClient();
        const user = await prisma.user.findUnique({ where: { id } });
        if (!user) {
            return done(new Error('User not found'), false);
        }
        const oauthUser = {
            id: user.id,
            email: user.email,
            name: user.name,
            surname: user.surname || undefined,
            avatar: user.avatar || undefined,
            provider: user.provider || 'local',
            username: user.username,
            isVerified: user.isVerified
        };
        done(null, oauthUser);
    }
    catch (error) {
        done(error, false);
    }
});
// Google OAuth Strategy
passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: `${process.env.API_URL || 'http://localhost:3001'}/api/auth/google/callback`
}, async (accessToken, refreshToken, profile, done) => {
    try {
        const googleProfile = {
            id: profile.id,
            displayName: profile.displayName,
            name: profile.name,
            emails: profile.emails,
            photos: profile.photos
        };
        const user = await googleService.handleGoogleAuth(googleProfile);
        done(null, user);
    }
    catch (error) {
        done(error, false);
    }
}));
// GitHub OAuth Strategy
passport.use(new GitHubStrategy({
    clientID: process.env.GITHUB_CLIENT_ID,
    clientSecret: process.env.GITHUB_CLIENT_SECRET,
    callbackURL: `${process.env.API_URL || 'http://localhost:3001'}/api/auth/github/callback`
}, async (accessToken, refreshToken, profile, done) => {
    try {
        if (!profile.username) {
            return done(new Error('GitHub username is required'), false);
        }
        const githubProfile = {
            id: profile.id,
            username: profile.username,
            displayName: profile.displayName,
            profileUrl: profile.profileUrl,
            emails: profile.emails,
            photos: profile.photos
        };
        const user = await githubService.handleGitHubAuth(githubProfile);
        done(null, user);
    }
    catch (error) {
        done(error, false);
    }
}));
export default passport;
