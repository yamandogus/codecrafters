"use client";

import { useSelector } from 'react-redux';
import { RootState } from '@/store/store';
import UserHome from '@/components/home/user-home';
import ModeratorHome from '@/components/home/moderator-home';
import AdminHome from '@/components/home/admin-home';

export default function Home() {
  const { user, isAuthenticated } = useSelector((state: RootState) => state.user);

  // If not authenticated or no user, show default user home
  if (!isAuthenticated || !user) {
    return <UserHome />;
  }

  // Role-based rendering
  switch (user.role) {
    case 'ADMIN':
      return <AdminHome />;
    case 'MODERATOR':
      return <ModeratorHome />;
    case 'USER':
    default:
      return <UserHome />;
  }
}
