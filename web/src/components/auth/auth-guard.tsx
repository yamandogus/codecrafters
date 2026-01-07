"use client";

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useSelector } from 'react-redux';
import { RootState } from '@/store/store';
import AuthService from '@/services/auth';

interface AuthGuardProps {
  children: React.ReactNode;
  roles?: string[]; // Allowed roles. If empty, just authentication is required.
}

export function AuthGuard({ children, roles = [] }: AuthGuardProps) {
  const { user, isAuthenticated, loading } = useSelector((state: RootState) => state.user);
  const router = useRouter();
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const check = async () => {
      if (loading) return;
      if (isAuthenticated) {
        setReady(true);
        return;
      }
      const token = AuthService.getToken();
      if (token) {
        const valid = AuthService.isAuthenticated();
        if (!valid) {
          const refreshed = await AuthService.refreshTokens();
          if (refreshed) {
            setReady(true);
            return;
          }
        } else {
          setReady(true);
          return;
        }
      }
      router.replace('/auth/login');
    };
    check();
  }, [isAuthenticated, loading, router]);

  if (!ready) return null;

  if (roles.length > 0 && user && !roles.includes(user.role || '')) return null;

  return <>{children}</>;
}
