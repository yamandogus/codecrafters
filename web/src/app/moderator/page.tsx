"use client";

import { useSelector } from 'react-redux';
import { RootState } from '@/store/store';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { ModeratorDashboard } from '@/components/moderator/moderator-dashboard';

export default function ModeratorPage() {
  const { user, isAuthenticated } = useSelector((s: RootState) => s.user);
  const router = useRouter();

  useEffect(() => {
    if (!isAuthenticated) {
      router.replace('/auth/login');
      return;
    }
    const role = user?.role;
    if (role !== 'MODERATOR' && role !== 'ADMIN') {
      router.replace('/');
    }
  }, [isAuthenticated, user, router]);

  const role = user?.role;
  if (!isAuthenticated || (role !== 'MODERATOR' && role !== 'ADMIN')) return null;

  return <ModeratorDashboard />;
}


