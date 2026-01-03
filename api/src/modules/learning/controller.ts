import { Request, Response } from "express";
import { LearningService } from "./service";
import { CreateResultSchema, UpdateResultSchema } from "../../dto/learningDto";

const learningService = new LearningService();

export class LearningController {
    async create(req: any, res: Response) {
        try {
            const validated = CreateResultSchema.parse(req.body);
            const result = await learningService.create(validated);
            return res.status(201).json({ success: true, message: "Kaynak oluşturuldu", data: result });
        } catch (error: any) {
            if (error?.errors) return res.status(400).json({ success: false, errors: error.errors });
            return res.status(500).json({ success: false, message: "Hata oluştu" });
        }
    }

    async getAll(req: Request, res: Response) {
        try {
            const { category, search } = req.query;
            const result = await learningService.getAll({ category: category as string, search: search as string });
            return res.status(200).json({ success: true, data: result });
        } catch (error) {
            return res.status(500).json({ success: false, message: "Kaynaklar getirilirken hata oluştu" });
        }
    }

    async getById(req: Request, res: Response) {
        try {
            const { id } = req.params;
            const result = await learningService.getById(id);
            if (!result) return res.status(404).json({ success: false, message: "Kaynak bulunamadı" });
            return res.status(200).json({ success: true, data: result });
        } catch (error) {
            return res.status(500).json({ success: false, message: "Hata oluştu" });
        }
    }

    async update(req: any, res: Response) {
        try {
            const { id } = req.params;
            const validated = UpdateResultSchema.parse(req.body);
            const result = await learningService.update(id, validated);
            return res.status(200).json({ success: true, message: "Kaynak güncellendi", data: result });
        } catch (error: any) {
            const status = error.status || 500;
            return res.status(status).json({ success: false, message: error.message || "Güncelleme hatası" });
        }
    }

    async delete(req: any, res: Response) {
        try {
            const { id } = req.params;
            await learningService.delete(id);
            return res.status(200).json({ success: true, message: "Kaynak silindi" });
        } catch (error: any) {
            return res.status(500).json({ success: false, message: "Silme hatası" });
        }
    }
}
