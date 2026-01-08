import { z } from "zod";
export const CreateProjectSchema = z.object({
    title: z.string().min(3, "Başlık en az 3 karakter olmalıdır"),
    description: z.string().min(20, "Açıklama en az 20 karakter olmalıdır"),
    category: z.enum([
        "WEB",
        "MOBILE",
        "BACKEND",
        "AI",
        "DEVOPS",
        "OTHER",
    ]),
    image: z.string().optional(),
    tech: z.array(z.string()).optional(),
    demo: z.string().url().optional(),
    github: z.string().url().optional(),
});
export const UpdateProjectSchema = CreateProjectSchema.partial().extend({
    isActive: z.boolean().optional(),
});
