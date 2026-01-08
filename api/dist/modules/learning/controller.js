import { LearningService } from "./service";
import { CreateResultSchema, UpdateResultSchema } from "../../dto/learningDto";
import { ZodError } from "zod";
const learningService = new LearningService();
export class LearningController {
    async create(req, res) {
        try {
            const validated = CreateResultSchema.parse(req.body);
            const result = await learningService.create(validated);
            return res.status(201).json({ success: true, message: "Kaynak oluşturuldu", data: result });
        }
        catch (error) {
            if (error instanceof ZodError)
                return res.status(400).json({ success: false, errors: error.issues });
            return res.status(500).json({ success: false, message: "Hata oluştu" });
        }
    }
    async getAll(req, res) {
        try {
            const { category, search } = req.query;
            const result = await learningService.getAll({ category: category, search: search });
            return res.status(200).json({ success: true, data: result });
        }
        catch (error) {
            return res.status(500).json({ success: false, message: "Kaynaklar getirilirken hata oluştu" });
        }
    }
    async getById(req, res) {
        try {
            const { id } = req.params;
            const result = await learningService.getById(id);
            if (!result)
                return res.status(404).json({ success: false, message: "Kaynak bulunamadı" });
            return res.status(200).json({ success: true, data: result });
        }
        catch (error) {
            return res.status(500).json({ success: false, message: "Hata oluştu" });
        }
    }
    async update(req, res) {
        try {
            const { id } = req.params;
            const validated = UpdateResultSchema.parse(req.body);
            const result = await learningService.update(id, validated);
            return res.status(200).json({ success: true, message: "Kaynak güncellendi", data: result });
        }
        catch (error) {
            const appError = error;
            const status = appError.status || 500;
            return res.status(status).json({ success: false, message: appError.message || "Güncelleme hatası" });
        }
    }
    async delete(req, res) {
        try {
            const { id } = req.params;
            await learningService.delete(id);
            return res.status(200).json({ success: true, message: "Kaynak silindi" });
        }
        catch (error) {
            const appError = error;
            return res.status(appError.status || 500).json({ success: false, message: appError.message || "Silme hatası" });
        }
    }
}
