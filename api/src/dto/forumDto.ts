import { z } from "zod";

export const CreateForumPostSchema = z.object({
    title: z.string().min(5, "Başlık en az 5 karakter olmalıdır"),
    content: z.string().min(20, "İçerik en az 20 karakter olmalıdır"),
    category: z.enum([
        "FRONTEND",
        "BACKEND",
        "MOBILE",
        "DEVOPS",
        "CAREER",
        "PROJECTS",
        "OTHER",
    ]),
});

export const UpdateForumPostSchema = CreateForumPostSchema.partial().extend({
    isPinned: z.boolean().optional(),
    isLocked: z.boolean().optional(),
    isActive: z.boolean().optional(),
});

export type CreateForumPostDTO = z.infer<typeof CreateForumPostSchema>;
export type UpdateForumPostDTO = z.infer<typeof UpdateForumPostSchema>;
