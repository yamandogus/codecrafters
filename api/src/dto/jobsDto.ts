import { z } from "zod";

export const CreateJobSchema = z.object({
    title: z.string().min(3, "Başlık en az 3 karakter olmalıdır"),
    description: z.string().min(20, "Açıklama en az 20 karakter olmalıdır"),
    company: z.string().min(2, "Şirket adı gereklidir"),
    location: z.string().min(2, "Konum gereklidir"),
    type: z.enum(["FULL_TIME", "PART_TIME", "CONTRACT", "INTERNSHIP", "FREELANCE"]),
    category: z.enum([
        "FRONTEND",
        "BACKEND",
        "FULLSTACK",
        "MOBILE",
        "DEVOPS",
        "DATA",
        "OTHER",
    ]),
    skills: z.array(z.string()).optional(),
    salary: z.string().optional(),
    experience: z.string().optional(),
    isRemote: z.boolean().default(false),
    requirements: z.array(z.string()).optional(),
    responsibilities: z.array(z.string()).optional(),
    benefits: z.array(z.string()).optional(),
    companyWebsite: z.string().url().optional(),
});

export const UpdateJobSchema = CreateJobSchema.partial().extend({
    status: z.enum(["ACTIVE", "INACTIVE", "CLOSED"]).optional(),
});

export const ApplyJobSchema = z.object({
    firstName: z.string().min(2),
    lastName: z.string().min(2),
    email: z.string().email(),
    phone: z.string().optional(),
    portfolio: z.string().url().optional(),
    linkedin: z.string().url().optional(),
    github: z.string().url().optional(),
    experience: z.string().min(2),
    skills: z.string().min(2),
    coverLetter: z.string().optional(),
    resume: z.string().optional(), // Dosya yolu veya URL
    salary: z.string().optional(),
});

export type CreateJobDTO = z.infer<typeof CreateJobSchema>;
export type UpdateJobDTO = z.infer<typeof UpdateJobSchema>;
export type ApplyJobDTO = z.infer<typeof ApplyJobSchema>;
