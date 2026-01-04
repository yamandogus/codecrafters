import passport from 'passport';
import { Strategy as GoogleStrategy, Profile as GoogleProfile, VerifyCallback } from 'passport-google-oauth20';
import { Strategy as GitHubStrategy, Profile as GitHubProfile } from 'passport-github2';
import { GoogleOAuthService } from '../modules/google/service';
import { GitHubOAuthService } from '../modules/github/service';

const googleService = new GoogleOAuthService();
const githubService = new GitHubOAuthService();

// Serialize user for session
passport.serializeUser((user: any, done: VerifyCallback) => {
  done(null, user.id);
});

// Deserialize user from session
passport.deserializeUser(async (id: string, done: VerifyCallback) => {
  try {
    const { PrismaClient } = await import('@prisma/client');
    const prisma = new PrismaClient();
    const user = await prisma.user.findUnique({ where: { id } });
    done(null, user as any);
  } catch (error) {
    done(error, false);
  }
});

// Google OAuth Strategy
passport.use(new GoogleStrategy({
  clientID: process.env.GOOGLE_CLIENT_ID!,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
  callbackURL: `${process.env.API_URL || 'http://localhost:3001'}/api/auth/google/callback`
}, async (accessToken: string, refreshToken: string, profile: GoogleProfile, done: VerifyCallback) => {
  try {
    const user = await googleService.handleGoogleAuth(profile as any);
    done(null, user);
  } catch (error) {
    done(error, false);
  }
}));

// GitHub OAuth Strategy
passport.use(new GitHubStrategy({
  clientID: process.env.GITHUB_CLIENT_ID!,
  clientSecret: process.env.GITHUB_CLIENT_SECRET!,
  callbackURL: `${process.env.API_URL || 'http://localhost:3001'}/api/auth/github/callback`
}, async (accessToken: string, refreshToken: string, profile: GitHubProfile, done: VerifyCallback) => {
  try {
    const user = await githubService.handleGitHubAuth(profile as any);
    done(null, user);
  } catch (error) {
    done(error, false);
  }
}));

export default passport;