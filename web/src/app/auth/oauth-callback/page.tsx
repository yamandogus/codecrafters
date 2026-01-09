"use client";

import { useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";

export default function OAuthCallbackPage() {
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    const error = searchParams.get("error");

    if (error) {
      // Send error message to parent window
      if (window.opener) {
        window.opener.postMessage(
          {
            type: "OAUTH_ERROR",
            error: error === "authentication_failed" 
              ? "Kimlik doğrulama başarısız oldu. Lütfen tekrar deneyin." 
              : "Bir hata oluştu."
          },
          window.location.origin
        );
      }
      window.close();
      return;
    }

    // Auth successful - check session and send success message
    const checkSession = async () => {
      try {
        const apiUrl = process.env.NEXT_PUBLIC_API_URL 
          ? (process.env.NEXT_PUBLIC_API_URL.endsWith('/api') 
              ? process.env.NEXT_PUBLIC_API_URL 
              : `${process.env.NEXT_PUBLIC_API_URL}/api`)
          : 'http://localhost:3001/api';

        const response = await fetch(`${apiUrl}/auth/check`, {
          method: 'GET',
          credentials: 'include', // Important for session cookies
        });

        const data = await response.json();

        if (data.authenticated && data.user) {
          // Send success message to parent window
          if (window.opener) {
            window.opener.postMessage(
              {
                type: "OAUTH_SUCCESS",
                user: data.user
              },
              window.location.origin
            );
          }
          
          // Reload parent window to update auth state
          if (window.opener) {
            window.opener.location.reload();
          }
        } else {
          // Send error if not authenticated
          if (window.opener) {
            window.opener.postMessage(
              {
                type: "OAUTH_ERROR",
                error: "Kimlik doğrulama başarısız oldu."
              },
              window.location.origin
            );
          }
        }
      } catch (err) {
        // Send error message
        if (window.opener) {
          window.opener.postMessage(
            {
              type: "OAUTH_ERROR",
              error: "Bir hata oluştu. Lütfen tekrar deneyin."
            },
            window.location.origin
          );
        }
      } finally {
        // Close popup after a short delay
        setTimeout(() => {
          window.close();
        }, 500);
      }
    };

    checkSession();
  }, [searchParams, router]);

  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="flex flex-col items-center gap-4">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
        <p className="text-muted-foreground">Giriş yapılıyor...</p>
      </div>
    </div>
  );
}

