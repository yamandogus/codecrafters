"use client";

import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { restoreUser } from '@/store/user/userSlice';

export function AuthChecker({ children }: { children: React.ReactNode }) {
  const dispatch = useDispatch();

  useEffect(() => {
    // Sayfa yüklendiğinde kullanıcı oturumunu restore et
    dispatch(restoreUser());
  }, [dispatch]);

  return <>{children}</>;
}