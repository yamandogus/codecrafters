"use client";

import { useEffect, useState } from "react";
import ProfileView, { ProfileUser } from "@/components/profile/ProfileView";
import { UserService } from "@/services/userService";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { AuthGuard } from "@/components/auth/auth-guard";

export default function MyProfilePage() {
  return (
    <AuthGuard>
      <MyProfileContent />
    </AuthGuard>
  );
}

function MyProfileContent() {
  const router = useRouter();
  const [user, setUser] = useState<ProfileUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const data = await UserService.getMe();
        if (data) {
          setUser(data);
        } else {
          // If no data returned, likely not authenticated or error
          toast.error("Profil yüklenemedi", {
            description: "Lütfen tekrar giriş yapın."
          });
          // Optional: redirect to login?
          // router.push('/auth/login');
        }
      } catch (error) {
        console.error(error);
        toast.error("Bir hata oluştu");
      } finally {
        setIsLoading(false);
      }
    };

    fetchProfile();
  }, [router]);

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
      <div className="flex min-h-screen items-center justify-center flex-col gap-4">
        <p>Profil bulunamadı.</p>
        <button 
            onClick={() => window.location.reload()}
            className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
        >
            Tekrar Dene
        </button>
      </div>
    );
  }

  return <ProfileView user={user} isEditable={true} />;
}
