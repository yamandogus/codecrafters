"use client";

import UserDashboard from '@/components/dashboard/user-dashboard';
import { AuthGuard } from '@/components/auth/auth-guard';

export default function DashboardPage() {
  return (
    <AuthGuard roles={['USER', 'ADMIN', 'MODERATOR']}>
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
          <p className="text-gray-500 mt-2">Hoş geldiniz! İşte aktivitelerinizin özeti.</p>
        </div>
        <UserDashboard />
      </div>
    </AuthGuard>
  );
}
