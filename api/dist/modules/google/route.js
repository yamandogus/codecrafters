import { Router } from 'express';
import passport from 'passport';
import { GoogleOAuthController } from './controller';
const router = Router();
const googleController = new GoogleOAuthController();
// Google OAuth routes
router.get('/auth/google', passport.authenticate('google', {
    scope: ['profile', 'email']
}));
router.get('/auth/google/callback', passport.authenticate('google', {
    failureRedirect: '/auth/google/failure'
}), googleController.handleGoogleCallback);
router.get('/auth/google/failure', googleController.handleGoogleFailure);
export default router;
