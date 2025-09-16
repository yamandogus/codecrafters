"use client";
import React, { useState, useEffect } from "react";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { cn } from "@/lib/utils";
import { IconBrandGithub, IconBrandGoogle } from "@tabler/icons-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { useAuth } from "@/hooks/useAuth";
import { Card } from "../ui/card";

export function Login() {
  const router = useRouter();
  const { login, loading, error, clearAuthError } = useAuth();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [formErrors, setFormErrors] = useState<{[key: string]: string}>({});

  // Zaten giriş yapmışsa ana sayfaya yönlendir - Test için devre dışı
  // useEffect(() => {
  //   if (isAuthenticated) {
  //     router.push("/");
  //   }
  // }, [isAuthenticated, router]);

  // Hata mesajını temizle
  useEffect(() => {
    if (error) {
      toast.error("Giriş Başarısız", {
        description: error,
      });
      clearAuthError();
    }
  }, [error, clearAuthError]);

  const validateForm = () => {
    const errors: {[key: string]: string} = {};
    
    if (!formData.email) {
      errors.email = "E-posta adresi gerekli";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = "Geçerli bir e-posta adresi girin";
    }
    
    if (!formData.password) {
      errors.password = "Şifre gerekli";
    } else if (formData.password.length < 6) {
      errors.password = "Şifre en az 6 karakter olmalı";
    }
    
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Hata mesajını temizle
    if (formErrors[name]) {
      setFormErrors(prev => ({
        ...prev,
        [name]: ""
      }));
    }
  };

  const handleOAuthLogin = (provider: 'google' | 'github') => {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/api';
    window.location.href = `${apiUrl}/auth/${provider}`;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    try {
      const result = await login({
        email: formData.email,
        password: formData.password,
      });
      
      if (result.type === 'user/login/fulfilled') {
        // Access user role from the result payload for immediate redirection
        const payload = result.payload as { user: { role: 'USER' | 'ADMIN' | 'MODERATOR' } };
        const userRole = payload.user.role;
        
        toast.success("Giriş Başarılı", {
          description: 'CodeCrafters\'e Hoş Geldiniz!',
        });
        
        // Role-based redirection
        switch (userRole) {
          case 'ADMIN':
            router.push("/admin");
            break;
          case 'MODERATOR':
            router.push("/moderator");
            break;
          case 'USER':
          default:
            router.push("/");
            break;
        }
      }
    } catch {
      // Hata zaten useEffect'te yakalanacak
    }
  };
  return (
        <Card className="shadow-input mx-auto w-full md:max-w-md rounded-none p-4 md:rounded-2xl md:p-8 bg-card">
      <h2 className="text-xl font-bold text-card-foreground">
        CodeCrafters&apos;a Hoş Geldiniz
      </h2>
      <p className="max-w-sm text-sm text-neutral-600 dark:text-neutral-300">
        Yazılım geliştirme topluluğuna katılın ve kariyerinizi ilerletmek için
        giriş yapın
      </p>

      <form className="my-8" onSubmit={handleSubmit}>
        <LabelInputContainer className="mb-4">
          <Label htmlFor="email">E-posta Adresi</Label>
          <Input
            name="email"
            id="email"
            placeholder="ornek@codecrafters.com"
            type="email"
            value={formData.email}
            onChange={handleInputChange}
            className={formErrors.email ? "border-red-500" : ""}
            disabled={loading}
          />
          {formErrors.email && (
            <span className="text-sm text-red-500">{formErrors.email}</span>
          )}
        </LabelInputContainer>
        <LabelInputContainer className="mb-4">
          <Label htmlFor="password">Şifre</Label>
          <Input
            name="password"
            id="password"
            placeholder="••••••••"
            type="password"
            value={formData.password}
            onChange={handleInputChange}
            className={formErrors.password ? "border-red-500" : ""}
            disabled={loading}
          />
          {formErrors.password && (
            <span className="text-sm text-red-500">{formErrors.password}</span>
          )}
        </LabelInputContainer>

        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center">
            <input
              id="remember-me"
              name="remember-me"
              type="checkbox"
              className="h-4 w-4 text-purple-600 focus:ring-purple-500 border-gray-300 rounded"
            />
            <label
              htmlFor="remember-me"
              className="ml-2 block text-sm text-gray-900 dark:text-gray-300"
            >
              Beni hatırla
            </label>
          </div>
          <Link
            href="/auth/forgot-password"
            className="text-sm text-purple-600 hover:text-purple-500"
          >
            Şifremi unuttum
          </Link>
        </div>

        <button
          className="group/btn relative block h-10 w-full rounded-md bg-gradient-to-br from-purple-600 to-purple-800 font-medium text-white shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] dark:bg-gradient-to-br dark:from-purple-700 dark:to-purple-900 dark:shadow-[0px_1px_0px_0px_#27272a_inset,0px_-1px_0px_0px_#27272a_inset] disabled:opacity-50 disabled:cursor-not-allowed"
          type="submit"
          disabled={loading}
        >
          {loading ? "Giriş Yapılıyor..." : "Giriş Yap"} &rarr;
          <BottomGradient />
        </button>

        <div className="my-8 h-[1px] w-full bg-gradient-to-r from-transparent via-neutral-300 to-transparent dark:via-neutral-700" />

        <div className="flex flex-col space-y-4">
          <button
            className="group/btn shadow-input relative flex h-10 w-full items-center justify-start space-x-2 rounded-md bg-gray-50 px-4 font-medium text-black dark:bg-zinc-900 dark:shadow-[0px_0px_1px_1px_#262626]"
            type="button"
            onClick={() => handleOAuthLogin('github')}
            disabled={loading}
          >
            <IconBrandGithub className="h-4 w-4 text-neutral-800 dark:text-neutral-300" />
            <span className="text-sm text-neutral-700 dark:text-neutral-300">
              GitHub ile Giriş Yap
            </span>
            <BottomGradient />
          </button>
          <button
            className="group/btn shadow-input relative flex h-10 w-full items-center justify-start space-x-2 rounded-md bg-gray-50 px-4 font-medium text-black dark:bg-zinc-900 dark:shadow-[0px_0px_1px_1px_#262626]"
            type="button"
            onClick={() => handleOAuthLogin('google')}
            disabled={loading}
          >
            <IconBrandGoogle className="h-4 w-4 text-neutral-800 dark:text-neutral-300" />
            <span className="text-sm text-neutral-700 dark:text-neutral-300">
              Google ile Giriş Yap
            </span>
            <BottomGradient />
          </button>
        </div>

        <div className="mt-6 text-center">
          <p className="text-sm text-neutral-600 dark:text-neutral-400">
            Henüz hesabınız yok mu?{" "}
            <Link
              href="/auth/register"
              className="font-medium text-purple-600 hover:text-purple-500"
            >
              Ücretsiz kayıt olun
            </Link>
          </p>
        </div>
      </form>
    </Card>
  );
}

const BottomGradient = () => {
  return (
    <>
      <span className="absolute inset-x-0 -bottom-px block h-px w-full bg-gradient-to-r from-transparent via-purple-500 to-transparent opacity-0 transition duration-500 group-hover/btn:opacity-100" />
      <span className="absolute inset-x-10 -bottom-px mx-auto block h-px w-1/2 bg-gradient-to-r from-transparent via-pink-500 to-transparent opacity-0 blur-sm transition duration-500 group-hover/btn:opacity-100" />
    </>
  );
};

const LabelInputContainer = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <div className={cn("flex w-full flex-col space-y-2", className)}>
      {children}
    </div>
  );
};
