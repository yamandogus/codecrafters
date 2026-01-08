import { z } from "zod";
export const CreateBlogSchema = z.object({
    title: z.string().min(3, "Başlık en az 3 karakter olmalıdır"),
    excerpt: z.string().min(10, "Özet en az 10 karakter olmalıdır"),
    content: z.string().min(50, "İçerik en az 50 karakter olmalıdır"),
    category: z.enum([
        "WEB_DEVELOPMENT",
        "PROGRAMMING",
        "FRONTEND",
        "BACKEND",
        "DESIGN",
        "CAREER",
        "OTHER",
    ]),
    image: z.string().optional(),
    tags: z.array(z.string()).optional(),
    author: z.string().optional(), // Eğer otomatik kullanıcı isminden alınacaksa opsiyonel olabilir
});
export const UpdateBlogSchema = CreateBlogSchema.partial();
