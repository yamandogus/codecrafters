"use client";

import { useEffect, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { toast } from "sonner";

function AuthSuccessContent() {
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    const token = searchParams.get("token");
    const refreshToken = searchParams.get("refreshToken");
    const error = searchParams.get("error");

    if (error) {
      toast.error("Giriş Başarısız", {
        description: "Kimlik doğrulama sırasında bir hata oluştu.",
      });
      router.push("/auth/login");
      return;
    }

    if (token) {
      // Token'ları kaydet
      localStorage.setItem("auth_token", token);
      if (refreshToken) {
        localStorage.setItem("refresh_token", refreshToken);
      }

      toast.success("Giriş Başarılı", {
        description: "Yönlendiriliyorsunuz...",
      });

      // Token'ın kaydedildiğinden emin olmak için kısa bir bekleme
      setTimeout(() => {
        // Force reload to ensure auth state is picked up by all components
        window.location.href = "/";
      }, 500);
    } else {
      router.push("/auth/login");
    }
  }, [router, searchParams]);

  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="flex flex-col items-center gap-4">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
        <p className="text-muted-foreground">Giriş yapılıyor...</p>
      </div>
    </div>
  );
}

export default function AuthSuccessPage() {
  return (
    <Suspense fallback={
      <div className="flex min-h-screen items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
        </div>
      </div>
    }>
      <AuthSuccessContent />
    </Suspense>
  );
}
