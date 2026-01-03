import { Request, Response } from "express";
import { ForumService } from "./service";
import { CreateForumPostSchema, UpdateForumPostSchema } from "../../dto/forumDto";

const forumService = new ForumService();

export class ForumController {
    async create(req: any, res: Response) {
        try {
            const validated = CreateForumPostSchema.parse(req.body);
            const userId = req.user.userId;
            const result = await forumService.create(userId, validated);
            return res.status(201).json({ success: true, message: "Gönderi oluşturuldu", data: result });
        } catch (error: any) {
            if (error?.errors) return res.status(400).json({ success: false, errors: error.errors });
            return res.status(500).json({ success: false, message: "Oluşturma hatası" });
        }
    }

    async getAll(req: Request, res: Response) {
        try {
            const { category, search } = req.query;
            const result = await forumService.getAll({ category: category as string, search: search as string });
            return res.status(200).json({ success: true, data: result });
        } catch (error) {
            return res.status(500).json({ success: false, message: "Gönderiler getirilirken hata oluştu" });
        }
    }

    async getById(req: Request, res: Response) {
        try {
            const { id } = req.params;
            const result = await forumService.getById(id);
            if (!result) return res.status(404).json({ success: false, message: "Gönderi bulunamadı" });
            return res.status(200).json({ success: true, data: result });
        } catch (error) {
            return res.status(500).json({ success: false, message: "Hata oluştu" });
        }
    }

    async update(req: any, res: Response) {
        try {
            const { id } = req.params;
            const userId = req.user.userId;
            const userRole = req.user.role;
            const validated = UpdateForumPostSchema.parse(req.body);
            const result = await forumService.update(id, userId, validated, userRole);
            return res.status(200).json({ success: true, message: "Gönderi güncellendi", data: result });
        } catch (error: any) {
            const status = error.status || 500;
            return res.status(status).json({ success: false, message: error.message || "Güncelleme hatası" });
        }
    }

    async delete(req: any, res: Response) {
        try {
            const { id } = req.params;
            const userId = req.user.userId;
            const userRole = req.user.role;
            await forumService.delete(id, userId, userRole);
            return res.status(200).json({ success: true, message: "Gönderi silindi" });
        } catch (error: any) {
            const status = error.status || 500;
            return res.status(status).json({ success: false, message: error.message || "Silme hatası" });
        }
    }
}
