import { GitHubOAuthService } from './service';
export class GitHubOAuthController {
    constructor() {
        // Redirect to GitHub OAuth
        this.redirectToGitHub = (req, res) => {
            // This will be handled by passport middleware
            // The actual redirect happens in the route
        };
        // Handle GitHub OAuth callback
        this.handleGitHubCallback = async (req, res) => {
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
                const token = this.githubService.generateToken(user.id);
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
                console.error('GitHub OAuth callback error:', error);
                res.redirect(`${process.env.FRONTEND_URL}/auth/error?message=server_error`);
            }
        };
        // Handle authentication failure
        this.handleGitHubFailure = (req, res) => {
            res.redirect(`${process.env.FRONTEND_URL}/auth/error?message=github_auth_failed`);
        };
        this.githubService = new GitHubOAuthService();
    }
}
