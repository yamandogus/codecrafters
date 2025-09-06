import { z } from "zod";

const nameRegex = /^[a-zA-ZığüşöçİĞÜŞÖÇ\s'-]+$/u;

export const LoginSchema  = z.object({
  email: z
    .string()
    .email("Geçerli bir e-posta giriniz")
    .min(5, "E-posta en az 5 karakter olmalı")
    .max(100, "E-posta en fazla 100 karakter olabilir"),
  password: z
    .string()
    .min(6, "Şifre en az 6 karakter olmalı")
    .max(64, "Şifre en fazla 64 karakter olabilir"),
});

export const RegisterSchema = z
  .object({
    name: z
      .string()
      .trim()
      .min(2, "İsim en az 2 karakter olmalı")
      .max(50, "İsim en fazla 50 karakter olabilir")
      .regex(nameRegex, "İsim sadece harf, boşluk, - ve ' içerebilir"),
    surname: z
      .string()
      .trim()
      .min(2, "Soyisim en az 2 karakter olmalı")
      .max(50, "Soyisim en fazla 50 karakter olabilir")
      .regex(nameRegex, "Soyisim sadece harf, boşluk, - ve ' içerebilir"),
    email: z
      .string()
      .trim()
      .email("Geçerli bir e-posta adresi giriniz")
      .min(5, "E-posta en az 5 karakter olmalı")
      .max(100, "E-posta en fazla 100 karakter olabilir"),
    password: z
      .string()
      .min(8, "Şifre en az 8 karakter olmalı")
      .max(128, "Şifre en fazla 128 karakter olabilir")
      .regex(
        /(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?])/,
        "Şifre en az 1 büyük harf, 1 sayı ve 1 özel karakter içermeli"
      ),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Şifreler eşleşmiyor",
    path: ["confirmPassword"],
  });




export type RegisterDTO = z.infer<typeof RegisterSchema>;
export type LoginDTO = z.infer<typeof LoginSchema>;