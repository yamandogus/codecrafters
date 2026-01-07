"use client";

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useSelector } from 'react-redux';
import { RootState } from '@/store/store';
import { toast } from 'sonner';

interface AuthGuardProps {
  children: React.ReactNode;
  roles?: string[]; // Allowed roles. If empty, just authentication is required.
}

export function AuthGuard({ children, roles = [] }: AuthGuardProps) {
  const { user, isAuthenticated, loading } = useSelector((state: RootState) => state.user);
  const router = useRouter();

  useEffect(() => {
    // If loading, wait.
    // However, if we rely on Redux persist, loading might be false initially but isAuthenticated false/true correctly.
    // If we have an async check, we should handle loading state.
    // Assuming 'loading' in user slice covers initial auth check or login process.
    
    if (!isAuthenticated) {
      // toast.error("Bu sayfaya erişmek için giriş yapmalısınız."); // Can be annoying on direct link load if handled poorly
      router.replace('/auth/login');
      return;
    }

    if (roles.length > 0 && user && !roles.includes(user.role)) {
      toast.error("Bu sayfaya erişim yetkiniz yok.");
      router.replace('/');
    }
  }, [isAuthenticated, user, router, roles]);

  // Render nothing while redirecting
  if (!isAuthenticated) return null;

  if (roles.length > 0 && user && !roles.includes(user.role)) return null;

  return <>{children}</>;
}
