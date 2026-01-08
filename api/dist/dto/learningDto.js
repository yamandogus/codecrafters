import { z } from "zod";
export const CreateResultSchema = z.object({
    title: z.string().min(5, "Başlık en az 5 karakter olmalıdır"),
    description: z.string().min(20, "Açıklama en az 20 karakter olmalıdır"),
    category: z.string().min(2),
    duration: z.string().optional(),
    level: z.string().optional(),
    rating: z.number().min(0).max(5).default(0),
    students: z.number().default(0),
    image: z.string().optional(),
    tags: z.array(z.string()).optional(),
    content: z.string().optional(), // Link veya embed code
});
export const UpdateResultSchema = CreateResultSchema.partial().extend({
    isActive: z.boolean().optional(),
});
