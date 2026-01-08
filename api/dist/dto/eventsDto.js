import { z } from "zod";
export const CreateEventSchema = z.object({
    title: z.string().min(3, "Başlık en az 3 karakter olmalıdır"),
    description: z.string().min(10, "Açıklama en az 10 karakter olmalıdır"),
    longDescription: z.string().optional(),
    category: z.enum([
        "HACKATHON",
        "WORKSHOP",
        "MEETUP",
        "CONFERENCE",
        "WEBINAR",
        "OTHER",
    ]),
    startDate: z.string().datetime(),
    endDate: z.string().datetime(),
    location: z.string().min(3, "Konum bilgisi gereklidir"),
    isOnline: z.boolean().default(false),
    maxParticipants: z.number().optional().or(z.string().transform(Number)),
    organizer: z.string().min(2, "Düzenleyen bilgisi gereklidir"),
    organizerEmail: z.string().email().optional(),
    tags: z.array(z.string()).optional(),
    image: z.string().optional(),
    price: z.string().optional(),
    requirements: z.array(z.string()).optional(),
});
export const UpdateEventSchema = CreateEventSchema.partial().extend({
    status: z.enum(["UPCOMING", "ONGOING", "COMPLETED", "CANCELLED"]).optional(),
});
