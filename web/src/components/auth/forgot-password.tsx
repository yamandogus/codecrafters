"use client";
import React from "react";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { Card } from "../ui/card";
import { toast } from "sonner";

export function ForgotPassword() {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const email = formData.get("email");
    console.log("Password reset requested for email:", email);
    toast("Şifre Sıfırlama İsteği Gönderildi", {
      description: `Eğer ${email} adresi sistemde kayıtlıysa, şifre sıfırlama bağlantısı gönderilecektir.`,
      action: {
        label: "Kapat",
        onClick: () => console.log("Kapat tıklandı"),
      },
    });
  };
  return (
    <Card className="shadow-input mx-auto w-full max-w-md rounded-none p-4 md:rounded-2xl md:p-8 bg-card">
      <h2 className="text-xl font-bold text-card-foreground">
        Şifrenizi mi Unuttunuz?
      </h2>
      <p className="max-w-sm text-sm text-neutral-600 dark:text-neutral-300">
        Endişelenmeyin, olur böyle şeyler. E-posta adresinizi girin, size şifrenizi sıfırlamanız için bir bağlantı gönderelim.
      </p>

      <form className="my-8" onSubmit={handleSubmit}>
        <LabelInputContainer className="mb-4">
          <Label htmlFor="email">E-posta Adresi</Label>
          <Input name="email" id="email" placeholder="ornek@codecrafters.com" type="email" required />
        </LabelInputContainer>

        <button
          className="group/btn relative block h-10 w-full rounded-md bg-gradient-to-br from-purple-600 to-purple-800 font-medium text-white shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] dark:bg-gradient-to-br dark:from-purple-700 dark:to-purple-900 dark:shadow-[0px_1px_0px_0px_#27272a_inset,0px_-1px_0px_0px_#27272a_inset]"
          type="submit"
        >
          Sıfırlama Bağlantısı Gönder &rarr;
          <BottomGradient />
        </button>

        <div className="mt-6 text-center">
          <p className="text-sm text-neutral-600 dark:text-neutral-400">
            Şifrenizi hatırladınız mı?{" "}
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
