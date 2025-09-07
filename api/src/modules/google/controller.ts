import { Request, Response } from 'express';
import { GoogleOAuthService } from './service';
import { OAuthResponse } from '../../dto/oauthDto';

export class GoogleOAuthController {
  private googleService: GoogleOAuthService;

  constructor() {
    this.googleService = new GoogleOAuthService();
  }

  // Redirect to Google OAuth
  redirectToGoogle = (req: Request, res: Response): void => {
    // This will be handled by passport middleware
    // The actual redirect happens in the route
  };

  // Handle Google OAuth callback
  handleGoogleCallback = async (req: Request, res: Response): Promise<void> => {
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
      const token = this.googleService.generateToken(user.id);

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
      console.error('Google OAuth callback error:', error);
      res.redirect(`${process.env.FRONTEND_URL}/auth/error?message=server_error`);
    }
  };

  // Handle authentication failure
  handleGoogleFailure = (req: Request, res: Response): void => {
    res.redirect(`${process.env.FRONTEND_URL}/auth/error?message=google_auth_failed`);
  };
}