"use client";

import { AdminDashboard } from '@/components/admin/admin-dashboard';
import { AuthGuard } from '@/components/auth/auth-guard';

export default function AdminPage() {
  return (
    <AuthGuard roles={['ADMIN']}>
      <AdminDashboard />
    </AuthGuard>
  );
}


