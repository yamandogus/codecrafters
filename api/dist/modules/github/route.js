import { Router } from 'express';
import passport from 'passport';
import { GitHubOAuthController } from './controller';
const router = Router();
const githubController = new GitHubOAuthController();
// GitHub OAuth routes
router.get('/auth/github', passport.authenticate('github', {
    scope: ['user:email']
}));
router.get('/auth/github/callback', passport.authenticate('github', {
    failureRedirect: '/auth/github/failure'
}), githubController.handleGitHubCallback);
router.get('/auth/github/failure', githubController.handleGitHubFailure);
export default router;
