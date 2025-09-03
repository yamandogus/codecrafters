"use client";
import React from "react";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { cn } from "@/lib/utils";
import { IconBrandGithub, IconBrandGoogle } from "@tabler/icons-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { useDispatch } from "react-redux";
import { setUsername } from "@/store/user/userSlice";

const testUser = {
  username: "testuser@gmail.com",
  password: "123456",
};

export function Login() {
  const router = useRouter();
  const dispacth = useDispatch()
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData.entries());
    console.log("data", data);

    const username = formData.get("username");
    const password = formData.get("password");
    if (username === testUser.username && password === testUser.password) {
      dispacth(setUsername(username))
      toast("Giriş Başarılı", {
        description: "CodeCrafters'e Hoş Geldiniz " + username,
        action: {
          label: "Kapat",
          onClick: () => console.log("Kapat tıklandı"),
        },
      });
      router.push("/");
    } else {
      console.log("Giriş başarısız");
      toast("Giriş Başarısız", {
        description: "Kullanıcı Adı veya Şifre Hatalı",
        action: {
          label: "Kapat",
          onClick: () => console.log("Kapat tıklandı"),
        },
      });
    }
  };
  return (
    <div className="shadow-input mx-auto w-full max-w-md rounded-none bg-white p-4 md:rounded-2xl md:p-8 dark:bg-black">
      <h2 className="text-xl font-bold text-neutral-800 dark:text-neutral-200">
        CodeCrafters&apos;a Hoş Geldiniz
      </h2>
      <p className="mt-2 max-w-sm text-sm text-neutral-600 dark:text-neutral-300">
        Yazılım geliştirme topluluğuna katılın ve kariyerinizi ilerletmek için
        giriş yapın
      </p>

      <form className="my-8" onSubmit={handleSubmit}>
        <LabelInputContainer className="mb-4">
          <Label htmlFor="username">Kullanıcı Adı</Label>
          <Input
            name="username"
            id="username"
            placeholder="ornek@codecrafters.com"
            type="email"
          />
        </LabelInputContainer>
        <LabelInputContainer className="mb-4">
          <Label htmlFor="password">Şifre</Label>
          <Input
            name="password"
            id="password"
            placeholder="••••••••"
            type="password"
          />
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
            href="/forgot-password"
            className="text-sm text-purple-600 hover:text-purple-500"
          >
            Şifremi unuttum
          </Link>
        </div>

        <button
          className="group/btn relative block h-10 w-full rounded-md bg-gradient-to-br from-purple-600 to-purple-800 font-medium text-white shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] dark:bg-gradient-to-br dark:from-purple-700 dark:to-purple-900 dark:shadow-[0px_1px_0px_0px_#27272a_inset,0px_-1px_0px_0px_#27272a_inset]"
          type="submit"
        >
          Giriş Yap &rarr;
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
              GitHub ile Giriş Yap
            </span>
            <BottomGradient />
          </button>
          <button
            className="group/btn shadow-input relative flex h-10 w-full items-center justify-start space-x-2 rounded-md bg-gray-50 px-4 font-medium text-black dark:bg-zinc-900 dark:shadow-[0px_0px_1px_1px_#262626]"
            type="button"
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
              href="/pages/register"
              className="font-medium text-purple-600 hover:text-purple-500"
            >
              Ücretsiz kayıt olun
            </Link>
          </p>
        </div>
      </form>
    </div>
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
