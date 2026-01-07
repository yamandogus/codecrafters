"use client";

import { ModeratorDashboard } from '@/components/moderator/moderator-dashboard';
import { AuthGuard } from '@/components/auth/auth-guard';

export default function ModeratorDashboardPage() {
  return (
    <AuthGuard roles={['MODERATOR', 'ADMIN']}>
      <ModeratorDashboard />
    </AuthGuard>
  );
}