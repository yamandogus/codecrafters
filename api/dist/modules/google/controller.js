import { GoogleOAuthService } from './service.js';
export class GoogleOAuthController {
    constructor() {
        // Redirect to Google OAuth
        this.redirectToGoogle = (req, res) => {
            // This will be handled by passport middleware
            // The actual redirect happens in the route
        };
        // Handle Google OAuth callback
        this.handleGoogleCallback = async (req, res) => {
            try {
                const user = req.user;
                if (!user) {
                    const response = {
                        success: false,
                        message: 'Authentication failed'
                    };
                    return res.redirect(`${process.env.FRONTEND_URL}/auth/error?message=authentication_failed`);
                }
                // Generate JWT token
                const token = this.googleService.generateToken(user.id);
                const response = {
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
            }
            catch (error) {
                console.error('Google OAuth callback error:', error);
                res.redirect(`${process.env.FRONTEND_URL}/auth/error?message=server_error`);
            }
        };
        // Handle authentication failure
        this.handleGoogleFailure = (req, res) => {
            res.redirect(`${process.env.FRONTEND_URL}/auth/error?message=google_auth_failed`);
        };
        this.googleService = new GoogleOAuthService();
    }
}
