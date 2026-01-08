import passport from 'passport';
import { Strategy as GoogleStrategy, Profile as GoogleProfile, VerifyCallback } from 'passport-google-oauth20';
import { Strategy as GitHubStrategy, Profile as GitHubProfile } from 'passport-github2';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// Serialize user for session
import { OAuthUser } from '../dto/oauthDto.js';

passport.serializeUser((user: any, done) => {
  done(null, user.id);
});

// Deserialize user from session
passport.deserializeUser(async (id: string, done) => {
  try {
    const user = await prisma.user.findUnique({ where: { id } });
    done(null, user);
  } catch (error) {
    done(error, false);
  }
});

// Google OAuth Strategy
passport.use(new GoogleStrategy({
  clientID: process.env.GOOGLE_CLIENT_ID!,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
  callbackURL: "/api/auth/google/callback"
}, async (accessToken: string, refreshToken: string, profile: GoogleProfile, done: VerifyCallback) => {
  try {
    // Check if user already exists with this Google ID
    let user = await prisma.user.findUnique({
      where: { googleId: profile.id }
    });

    if (user) {
      return done(null, user);
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
      return done(null, user);
    }

    // Create new user
    user = await prisma.user.create({
      data: {
        googleId: profile.id,
        email: profile.emails?.[0]?.value || '',
        name: profile.displayName || profile.name?.givenName || '',
        surname: profile.name?.familyName || '',
        avatar: profile.photos?.[0]?.value || '',
        provider: 'google',
        username: profile.emails?.[0]?.value?.split('@')[0] || `user_${Date.now()}`,
        isVerified: true
      }
    });

    done(null, user);
  } catch (error) {
    done(error, false);
  }
}));

// GitHub OAuth Strategy
passport.use(new GitHubStrategy({
  clientID: process.env.GITHUB_CLIENT_ID!,
  clientSecret: process.env.GITHUB_CLIENT_SECRET!,
  callbackURL: "/api/auth/github/callback"
}, async (accessToken: string, refreshToken: string, profile: GitHubProfile, done: VerifyCallback) => {
  try {
    // Check if user already exists with this GitHub ID
    let user = await prisma.user.findUnique({
      where: { githubId: profile.id }
    });

    if (user) {
      return done(null, user);
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
          provider: 'github'
        }
      });
      return done(null, user);
    }

    // Create new user
    user = await prisma.user.create({
      data: {
        githubId: profile.id,
        email: profile.emails?.[0]?.value || '',
        name: profile.displayName || profile.username || '',
        surname: '',
        avatar: profile.photos?.[0]?.value || '',
        provider: 'github',
        username: profile.username || `user_${Date.now()}`,
        isVerified: true,
        github: profile.profileUrl || ''
      }
    });

    done(null, user);
  } catch (error) {
    done(error, false);
  }
}));

export default passport;
