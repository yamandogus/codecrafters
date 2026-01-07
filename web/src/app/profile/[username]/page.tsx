"use client";

import { useEffect, useState } from "react";
import ProfileView, { ProfileUser } from "@/components/profile/ProfileView";
import { UserService } from "@/services/userService";
import { useParams } from "next/navigation";
import { toast } from "sonner";

export default function UserProfilePage() {
  const params = useParams();
  const username = params.username as string;
  const [user, setUser] = useState<ProfileUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!username) return;

    const fetchProfile = async () => {
      try {
        const data = await UserService.getUserByUsername(username);
        if (data) {
          setUser(data);
        } else {
          toast.error("Kullanıcı bulunamadı");
        }
      } catch (error) {
        console.error(error);
        toast.error("Bir hata oluştu");
      } finally {
        setIsLoading(false);
      }
    };

    fetchProfile();
  }, [username]);

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="h-8 w-8 animate-spin rounded-full border-4 border-green-600 border-t-transparent" />
          <p className="text-gray-500">Profil yükleniyor...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-2">Kullanıcı Bulunamadı</h1>
          <p className="text-gray-500">Aradığınız kullanıcı mevcut değil veya silinmiş.</p>
        </div>
      </div>
    );
  }

  return <ProfileView user={user} isEditable={false} />;
}
