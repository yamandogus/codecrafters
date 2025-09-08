"use client";

import { useSelector } from 'react-redux';
import { RootState } from '@/store/store';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function AdminPage() {
  const { user, isAuthenticated } = useSelector((s: RootState) => s.user);
  const router = useRouter();

  useEffect(() => {
    if (!isAuthenticated) {
      router.replace('/auth/login');
      return;
    }
    // Basit guard: role alanı user objesine backend login/refresh ile gelir
    if (user?.role !== 'ADMIN') {
      router.replace('/');
    }
  }, [isAuthenticated, user, router]);

  if (!isAuthenticated || user?.role !== 'ADMIN') return null;

  return (
    <div className="py-10">
      <h1 className="text-2xl font-semibold">Admin Panel</h1>
      <p className="text-sm text-muted-foreground">Temel yönetim iskeleti</p>
    </div>
  );
}


