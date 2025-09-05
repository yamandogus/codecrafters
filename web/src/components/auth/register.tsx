"use client";
import React from "react";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { cn } from "@/lib/utils";
import {
  IconBrandGithub,
  IconBrandGoogle
} from "@tabler/icons-react";
import Link from "next/link";
import { Card } from "../ui/card";

export function Register() {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("Form submitted");
  };
  return (
    <Card className="shadow-input mx-auto w-full max-w-md rounded-none md:rounded-2xl md:p-8 bg-card">
      <h2 className="text-xl font-bold text-card-foreground">
        CodeCrafters&apos;a Katılın
      </h2>
      <p className="max-w-sm text-sm text-neutral-600 dark:text-neutral-300">
        Ücretsiz hesap oluşturun ve yazılım geliştirme topluluğuna katılın
      </p>

      <form className="my-8" onSubmit={handleSubmit}>
        <div className="mb-4 flex flex-col space-y-2 md:flex-row md:space-y-0 md:space-x-2">
          <LabelInputContainer>
            <Label htmlFor="firstname">Ad</Label>
            <Input id="firstname" placeholder="Ahmet" type="text" />
          </LabelInputContainer>
          <LabelInputContainer>
            <Label htmlFor="lastname">Soyad</Label>
            <Input id="lastname" placeholder="Yılmaz" type="text" />
          </LabelInputContainer>
        </div>
        <LabelInputContainer className="mb-4">
          <Label htmlFor="email">E-posta Adresi</Label>
          <Input id="email" placeholder="ornek@codecrafters.com" type="email" />
        </LabelInputContainer>
        <LabelInputContainer className="mb-4">
          <Label htmlFor="password">Şifre</Label>
          <Input id="password" placeholder="••••••••" type="password" />
        </LabelInputContainer>
        <LabelInputContainer className="mb-6">
          <Label htmlFor="confirmPassword">Şifreyi Tekrar Girin</Label>
          <Input
            id="confirmPassword"
            placeholder="••••••••"
            type="password"
          />
        </LabelInputContainer>

        <div className="flex items-center mb-6">
          <input
            id="terms"
            name="terms"
            type="checkbox"
            className="h-4 w-4 text-purple-600 focus:ring-purple-500 border-gray-300 rounded"
          />
          <label htmlFor="terms" className="ml-2 block text-sm text-gray-900 dark:text-gray-300">
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

        <button
          className="group/btn relative block h-10 w-full rounded-md bg-gradient-to-br from-purple-600 to-purple-800 font-medium text-white shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] dark:bg-gradient-to-br dark:from-purple-700 dark:to-purple-900 dark:shadow-[0px_1px_0px_0px_#27272a_inset,0px_-1px_0px_0px_#27272a_inset]"
          type="submit"
        >
          Ücretsiz Hesap Oluştur &rarr;
          <BottomGradient />
        </button>

        <div className="my-8 h-[1px] w-full bg-gradient-to-r from-transparent via-neutral-300 to-transparent dark:via-neutral-700" />

        <div className="flex flex-col space-y-4">
          <button
            className="group/btn shadow-input relative flex h-10 w-full items-center justify-start space-x-2 rounded-md bg-gray-50 px-4 font-medium text-black dark:bg-zinc-900 dark:shadow-[0px_0px_1px_1px_#262626]"
            type="button"
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
              href="/login"
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