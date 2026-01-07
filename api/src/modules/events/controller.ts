import { Request, Response } from "express";
import { EventService } from "./service";
import { CreateEventSchema, UpdateEventSchema } from "../../dto/eventsDto";

const eventService = new EventService();

export class EventController {
    async create(req: any, res: Response) {
        try {
            const validated = CreateEventSchema.parse(req.body);
            const result = await eventService.create(validated);
            return res.status(201).json({ success: true, message: "Etkinlik oluşturuldu", data: result });
        } catch (error: any) {
            if (error?.errors) return res.status(400).json({ success: false, errors: error.errors });
            return res.status(500).json({ success: false, message: "Etkinlik oluşturulurken hata oluştu" });
        }
    }

    async getAll(req: Request, res: Response) {
        try {
            const { category, search } = req.query;
            const result = await eventService.getAll({ category: category as string, search: search as string });
            return res.status(200).json({ success: true, data: result });
        } catch (error) {
            return res.status(500).json({ success: false, message: "Etkinlikler getirilirken hata oluştu" });
        }
    }

    async getById(req: Request, res: Response) {
        try {
            const { id } = req.params;
            const result = await eventService.getById(id);
            if (!result) return res.status(404).json({ success: false, message: "Etkinlik bulunamadı" });
            return res.status(200).json({ success: true, data: result });
        } catch (error) {
            return res.status(500).json({ success: false, message: "Etkinlik getirilirken hata oluştu" });
        }
    }

    async update(req: any, res: Response) {
        try {
            const { id } = req.params;
            const validated = UpdateEventSchema.parse(req.body);
            const result = await eventService.update(id, validated);
            return res.status(200).json({ success: true, message: "Etkinlik güncellendi", data: result });
        } catch (error: any) {
            if (error?.errors) return res.status(400).json({ success: false, errors: error.errors });
            return res.status(500).json({ success: false, message: "Güncelleme hatası" });
        }
    }

    async delete(req: any, res: Response) {
        try {
            const { id } = req.params;
            await eventService.delete(id);
            return res.status(200).json({ success: true, message: "Etkinlik silindi" });
        } catch (error) {
            return res.status(500).json({ success: false, message: "Silme hatası" });
        }
    }

    async register(req: any, res: Response) {
        try {
            const { id } = req.params;
            const userId = req.user.userId;
            await eventService.registerUser(id, userId);
            return res.status(200).json({ success: true, message: "Kayıt başarılı" });
        } catch (error: any) {
            const status = error.status || 500;
            return res.status(status).json({ success: false, message: error.message || "Kayıt hatası" });
        }
    }

    async unregister(req: any, res: Response) {
        try {
            const { id } = req.params;
            const userId = req.user.userId;
            await eventService.unregisterUser(id, userId);
            return res.status(200).json({ success: true, message: "Kayıt iptal edildi" });
        } catch (error: any) {
            const status = error.status || 500;
            return res.status(status).json({ success: false, message: error.message || "İptal hatası" });
        }
    }

    async getMyRegistrations(req: any, res: Response) {
        try {
            const userId = req.user.userId;
            const result = await eventService.getUserRegistrations(userId);
            return res.status(200).json({ success: true, data: result });
        } catch (error) {
            return res.status(500).json({ success: false, message: "Kayıtlı etkinlikler getirilirken hata oluştu" });
        }
    }
}
