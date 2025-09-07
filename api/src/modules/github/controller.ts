import { Request, Response } from 'express';
import { GitHubOAuthService } from './service';
import { OAuthResponse } from '../../dto/oauthDto';

export class GitHubOAuthController {
  private githubService: GitHubOAuthService;

  constructor() {
    this.githubService = new GitHubOAuthService();
  }

  // Redirect to GitHub OAuth
  redirectToGitHub = (req: Request, res: Response): void => {
    // This will be handled by passport middleware
    // The actual redirect happens in the route
  };

  // Handle GitHub OAuth callback
  handleGitHubCallback = async (req: Request, res: Response): Promise<void> => {
    try {
      const user = req.user as any;
      
      if (!user) {
        const response: OAuthResponse = {
          success: false,
          message: 'Authentication failed'
        };
        return res.redirect(`${process.env.FRONTEND_URL}/auth/error?message=authentication_failed`);
      }

      // Generate JWT token
      const token = this.githubService.generateToken(user.id);

      const response: OAuthResponse = {
        success: true,
        user: {
          id: user.id,
          email: user.email,
          name: user.name,
          surname: user.surname,
          avatar: user.avatar,
          provider: user.provider,
          username: user.username,
          isVerified: user.isVerified
        },
        token
      };

      // Redirect to frontend with token
      res.redirect(`${process.env.FRONTEND_URL}/auth/success?token=${token}`);
      
    } catch (error) {
      console.error('GitHub OAuth callback error:', error);
      res.redirect(`${process.env.FRONTEND_URL}/auth/error?message=server_error`);
    }
  };

  // Handle authentication failure
  handleGitHubFailure = (req: Request, res: Response): void => {
    res.redirect(`${process.env.FRONTEND_URL}/auth/error?message=github_auth_failed`);
  };
}