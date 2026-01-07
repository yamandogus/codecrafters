import { z } from "zod";

const nameRegex = /^[a-zA-ZığüşöçİĞÜŞÖÇ\s'-]+$/u;

export const UpdateProfileSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, "İsim en az 2 karakter olmalı")
    .max(50, "İsim en fazla 50 karakter olabilir")
    .regex(nameRegex, "İsim sadece harf, boşluk, - ve ' içerebilir")
    .optional(),
  surname: z
    .string()
    .trim()
    .min(2, "Soyisim en az 2 karakter olmalı")
    .max(50, "Soyisim en fazla 50 karakter olabilir")
    .regex(nameRegex, "Soyisim sadece harf, boşluk, - ve ' içerebilir")
    .optional(),
  bio: z
    .string()
    .max(500, "Biyografi en fazla 500 karakter olabilir")
    .optional(),
  location: z
    .string()
    .max(100, "Konum en fazla 100 karakter olabilir")
    .optional(),
  website: z
    .string()
    .url("Geçerli bir URL giriniz")
    .optional()
    .or(z.literal("")),
  github: z
    .string()
    .max(39, "GitHub kullanıcı adı en fazla 39 karakter olabilir")
    .optional(),
  linkedin: z
    .string()
    .url("Geçerli bir LinkedIn URL'i giriniz")
    .optional()
    .or(z.literal("")),
  skills: z.array(z.object({
    name: z.string(),
    level: z.string(), // "Beginner" | "Intermediate" | "Advanced" | "Expert"
    color: z.string().optional()
  })).optional(),
  achievements: z.array(z.object({
    title: z.string(),
    description: z.string().optional(),
    icon: z.string().optional(),
    date: z.string().optional() // ISO date string
  })).optional(),
  experience: z.array(z.object({
    title: z.string(),
    company: z.string(),
    startDate: z.string(), // ISO date
    endDate: z.string().nullable().optional(), // ISO date or null
    description: z.string().optional()
  })).optional(),
  education: z.array(z.object({
    school: z.string(),
    degree: z.string(),
    field: z.string(),
    startDate: z.string(), // ISO date
    endDate: z.string().nullable().optional(), // ISO date or null
    description: z.string().optional()
  })).optional(),
});

export const ChangePasswordSchema = z
  .object({
    currentPassword: z
      .string()
      .min(1, "Mevcut şifre gerekli"),
    newPassword: z
      .string()
      .min(8, "Yeni şifre en az 8 karakter olmalı")
      .max(128, "Yeni şifre en fazla 128 karakter olabilir")
      .regex(
        /(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?])/,
        "Yeni şifre en az 1 büyük harf, 1 sayı ve 1 özel karakter içermeli"
      ),
    confirmPassword: z.string(),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: "Şifreler eşleşmiyor",
    path: ["confirmPassword"],
  });

export type UpdateProfileDTO = z.infer<typeof UpdateProfileSchema>;
export type ChangePasswordDTO = z.infer<typeof ChangePasswordSchema>;