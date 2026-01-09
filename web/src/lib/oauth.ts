/**
 * OAuth popup helper utility
 * Opens OAuth provider in a popup window and handles callback
 */

export interface OAuthResult {
  success: boolean;
  error?: string;
  user?: unknown;
}

export function openOAuthPopup(
  provider: 'google' | 'github',
  onSuccess?: (result: OAuthResult) => void,
  onError?: (error: string) => void
): void {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL 
    ? (process.env.NEXT_PUBLIC_API_URL.endsWith('/api') 
        ? process.env.NEXT_PUBLIC_API_URL 
        : `${process.env.NEXT_PUBLIC_API_URL}/api`)
    : 'http://localhost:3001/api';
  
  const authUrl = `${apiUrl}/auth/${provider}`;
  
  // Calculate popup dimensions
  const width = 500;
  const height = 600;
  const left = (window.screen.width / 2) - (width / 2);
  const top = (window.screen.height / 2) - (height / 2);

  // Open popup window
  const popup = window.open(
    authUrl,
    `${provider}OAuth`,
    `width=${width},height=${height},left=${left},top=${top},toolbar=no,location=yes,resizable=yes,scrollbars=yes,status=yes`
  );

  if (!popup) {
    const error = 'Popup blocked. Please allow popups for this site.';
    onError?.(error);
    return;
  }

  // Monitor popup for completion
  const checkInterval = setInterval(() => {
    try {
      // Check if popup was closed
      if (popup.closed) {
        clearInterval(checkInterval);
        onError?.('Authentication cancelled');
        return;
      }

      // Check if popup navigated to callback (same origin check)
      // Since OAuth redirects to our frontend, we need a different approach
      // We'll use postMessage or poll for a redirect
      const currentUrl = popup.location.href;
      
      // If popup has been redirected to frontend, it means auth succeeded
      // But we can't access cross-origin location, so we'll use message passing
      
    } catch (e) {
      // Cross-origin error is expected when popup is on OAuth provider
      // This means we're still on the OAuth provider page
    }
  }, 500);

  // Listen for postMessage from popup (if implemented)
  const messageHandler = (event: MessageEvent) => {
    // Verify origin
    if (event.origin !== window.location.origin) {
      return;
    }

    if (event.data.type === 'OAUTH_SUCCESS') {
      clearInterval(checkInterval);
      window.removeEventListener('message', messageHandler);
      popup.close();
      
      // Refresh auth state
      window.location.reload();
      
      onSuccess?.({
        success: true,
        user: event.data.user
      });
    } else if (event.data.type === 'OAUTH_ERROR') {
      clearInterval(checkInterval);
      window.removeEventListener('message', messageHandler);
      popup.close();
      
      onError?.(event.data.error || 'Authentication failed');
    }
  };

  window.addEventListener('message', messageHandler);

  // Fallback: Check if user manually closed after timeout
  setTimeout(() => {
    if (!popup.closed) {
      // Popup still open, might be waiting for user action
      // Don't close it, let user complete the flow
    }
  }, 60000); // 1 minute timeout
}

/**
 * Alternative approach: Redirect instead of popup
 * This is what most OAuth implementations do
 */
export function redirectToOAuth(provider: 'google' | 'github'): void {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL 
    ? (process.env.NEXT_PUBLIC_API_URL.endsWith('/api') 
        ? process.env.NEXT_PUBLIC_API_URL 
        : `${process.env.NEXT_PUBLIC_API_URL}/api`)
    : 'http://localhost:3001/api';
  
  const authUrl = `${apiUrl}/auth/${provider}`;
  window.location.href = authUrl;
}

