export interface GoogleProfile {
  id: string;
  displayName: string;
  name?: {
    givenName?: string;
    familyName?: string;
  };
  emails?: Array<{
    value: string;
    verified?: boolean;
  }>;
  photos?: Array<{
    value: string;
  }>;
}

export interface GitHubProfile {
  id: string;
  username: string;
  displayName?: string;
  profileUrl?: string;
  emails?: Array<{
    value: string;
    primary?: boolean;
    verified?: boolean;
  }>;
  photos?: Array<{
    value: string;
  }>;
}

export interface OAuthUser {
  id: string;
  email: string;
  name: string;
  surname?: string;
  avatar?: string;
  provider: 'google' | 'github' | 'local';
  username: string;
  isVerified: boolean;
}

export interface OAuthResponse {
  success: boolean;
  user?: OAuthUser;
  token?: string;
  message?: string;
}