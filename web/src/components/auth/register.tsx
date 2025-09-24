"use client";
import React, { useState, useEffect } from "react";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { cn } from "@/lib/utils";
import {
  IconBrandGithub,
  IconBrandGoogle
} from "@tabler/icons-react";
import Link from "next/link";
import { Card } from "../ui/card";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { useAuth } from "@/hooks/useAuth";

export function Register() {
  const router = useRouter();
  const { register: registerUser, loading, error,clearAuthError } = useAuth();
  const [formData, setFormData] = useState({
    name: "",
    surname: "",
    email: "",
    password: "",
    confirmPassword: "",
    acceptTerms: false,
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
      toast.error("Kayıt Başarısız", {
        description: error,
      });
      clearAuthError();
    }
  }, [error, clearAuthError]);

  const validateForm = () => {
    const errors: {[key: string]: string} = {};
    
    if (!formData.name.trim()) {
      errors.name = "Ad gerekli";
    } else if (formData.name.trim().length < 2) {
      errors.name = "Ad en az 2 karakter olmalı";
    }
    
    if (!formData.surname.trim()) {
      errors.surname = "Soyad gerekli";
    } else if (formData.surname.trim().length < 2) {
      errors.surname = "Soyad en az 2 karakter olmalı";
    }
    
    if (!formData.email) {
      errors.email = "E-posta adresi gerekli";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = "Geçerli bir e-posta adresi girin";
    }
    
    if (!formData.password) {
      errors.password = "Şifre gerekli";
    } else if (formData.password.length < 8) {
      errors.password = "Şifre en az 8 karakter olmalı";
    } else if (!/(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>/?])/.test(formData.password)) {
      errors.password = "Şifre en az 1 büyük harf, 1 sayı ve 1 özel karakter içermeli";
    }
    
    if (!formData.confirmPassword) {
      errors.confirmPassword = "Şifre tekrarı gerekli";
    } else if (formData.password !== formData.confirmPassword) {
      errors.confirmPassword = "Şifreler eşleşmiyor";
    }
    
    if (!formData.acceptTerms) {
      errors.acceptTerms = "Kullanım şartlarını kabul etmelisiniz";
    }
    
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    const fieldValue = type === 'checkbox' ? checked : value;
    
    setFormData(prev => ({
      ...prev,
      [name]: fieldValue
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
      const userData = {
        name: formData.name.trim(),
        surname: formData.surname.trim(),
        email: formData.email,
        password: formData.password,
        confirmPassword: formData.confirmPassword,
      };
      
      // Debug: Gönderilecek veriyi kontrol et
      console.log('Sending register data:', userData);
      
      const result = await registerUser(userData);
      
      if (result.type === 'user/register/fulfilled') {
        toast.success("Kayıt Başarılı", {
          description: `CodeCrafters'e hoş geldiniz!`,
        });
        
        // Access user role from the result payload for immediate redirection
        const payload = result.payload as { user: { role: 'USER' | 'ADMIN' | 'MODERATOR' } };
        const userRole = payload.user.role;
        
        // Role-based redirection (same as login)
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
        <Card className="shadow-input mx-auto w-full max-w-md rounded-none p-4 md:rounded-2xl md:p-8 bg-card">
      <h2 className="text-xl font-bold text-card-foreground">
        CodeCrafters&apos;a Katılın
      </h2>
      <p className="max-w-sm text-sm text-neutral-600 dark:text-neutral-300">
        Ücretsiz hesap oluşturun ve yazılım geliştirme topluluğuna katılın
      </p>

      <form className="my-8" onSubmit={handleSubmit}>
        <div className="mb-4 flex flex-col space-y-2 md:flex-row md:space-y-0 md:space-x-2">
          <LabelInputContainer>
            <Label htmlFor="name">Ad</Label>
            <Input 
              id="name" 
              name="name"
              placeholder="Ahmet" 
              type="text" 
              value={formData.name}
              onChange={handleInputChange}
              className={formErrors.name ? "border-red-500" : ""}
              disabled={loading}
            />
            {formErrors.name && (
              <span className="text-sm text-red-500">{formErrors.name}</span>
            )}
          </LabelInputContainer>
          <LabelInputContainer>
            <Label htmlFor="surname">Soyad</Label>
            <Input 
              id="surname" 
              name="surname"
              placeholder="Yılmaz" 
              type="text" 
              value={formData.surname}
              onChange={handleInputChange}
              className={formErrors.surname ? "border-red-500" : ""}
              disabled={loading}
            />
            {formErrors.surname && (
              <span className="text-sm text-red-500">{formErrors.surname}</span>
            )}
          </LabelInputContainer>
        </div>
        <LabelInputContainer className="mb-4">
          <Label htmlFor="email">E-posta Adresi</Label>
          <Input 
            id="email" 
            name="email"
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
            id="password" 
            name="password"
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
        <LabelInputContainer className="mb-6">
          <Label htmlFor="confirmPassword">Şifreyi Tekrar Girin</Label>
          <Input
            id="confirmPassword"
            name="confirmPassword"
            placeholder="••••••••"
            type="password"
            value={formData.confirmPassword}
            onChange={handleInputChange}
            className={formErrors.confirmPassword ? "border-red-500" : ""}
            disabled={loading}
          />
          {formErrors.confirmPassword && (
            <span className="text-sm text-red-500">{formErrors.confirmPassword}</span>
          )}
        </LabelInputContainer>

        <div className="flex items-start mb-6">
          <input
            id="acceptTerms"
            name="acceptTerms"
            type="checkbox"
            checked={formData.acceptTerms}
            onChange={handleInputChange}
            className="h-4 w-4 text-purple-600 focus:ring-purple-500 border-gray-300 rounded mt-1"
            disabled={loading}
          />
          <label htmlFor="acceptTerms" className="ml-2 block text-sm text-gray-900 dark:text-gray-300">
            <Link href="/terms" className="text-purple-600 hover:text-purple-500">
              Kullanım Şartları
            </Link>
                         &apos;nı ve{" "}
             <Link href="/privacy" className="text-purple-600 hover:text-purple-500">
               Gizlilik Politikası
             </Link>
             &apos;nı kabul ediyorum
          </label>
        </div>
        {formErrors.acceptTerms && (
          <span className="text-sm text-red-500 mb-4 block">{formErrors.acceptTerms}</span>
        )}

        <button
          className="group/btn relative block h-10 w-full rounded-md bg-gradient-to-br from-purple-600 to-purple-800 font-medium text-white shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] dark:bg-gradient-to-br dark:from-purple-700 dark:to-purple-900 dark:shadow-[0px_1px_0px_0px_#27272a_inset,0px_-1px_0px_0px_#27272a_inset] disabled:opacity-50 disabled:cursor-not-allowed"
          type="submit"
          disabled={loading}
        >
          {loading ? "Hesap Oluşturuluyor..." : "Ücretsiz Hesap Oluştur"} &rarr;
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
              GitHub ile Kayıt Ol
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
              Google ile Kayıt Ol
            </span>
            <BottomGradient />
          </button>
        </div>
        
        <div className="mt-6 text-center">
          <p className="text-sm text-neutral-600 dark:text-neutral-400">
            Zaten hesabınız var mı?{" "}
            <Link 
              href="/auth/login"
              className="font-medium text-purple-600 hover:text-purple-500"
            >
              Giriş yapın
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