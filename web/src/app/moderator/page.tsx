"use client";

import { useRouter } from 'next/navigation';
import { AuthGuard } from '@/components/auth/auth-guard';
import { useEffect } from 'react';

export default function ModeratorPage() {
  const router = useRouter();

  // Redirect to dashboard logic remains, but wrapped in AuthGuard for role check first
  return (
    <AuthGuard roles={['MODERATOR', 'ADMIN']}>
      <ModeratorRedirect />
    </AuthGuard>
  );
}

function ModeratorRedirect() {
  const router = useRouter();

  useEffect(() => {
    router.replace('/moderator/dashboard');
  }, [router]);

  return null;
}


