import { JobService } from "./service.js";
import { CreateJobSchema, UpdateJobSchema, ApplyJobSchema } from "../../dto/jobsDto.js";
import { ZodError } from "zod";
const jobService = new JobService();
export class JobController {
    async create(req, res) {
        try {
            const validated = CreateJobSchema.parse(req.body);
            const result = await jobService.create(validated);
            return res.status(201).json({ success: true, message: "İş ilanı oluşturuldu", data: result });
        }
        catch (error) {
            if (error instanceof ZodError)
                return res.status(400).json({ success: false, errors: error.issues });
            return res.status(500).json({ success: false, message: "İlan oluşturulurken hata oluştu" });
        }
    }
    async getAll(req, res) {
        try {
            const { category, search, type } = req.query;
            const result = await jobService.getAll({
                category: category,
                search: search,
                type: type
            });
            return res.status(200).json({ success: true, data: result });
        }
        catch (error) {
            return res.status(500).json({ success: false, message: "İlanlar getirilirken hata oluştu" });
        }
    }
    async getById(req, res) {
        try {
            const { id } = req.params;
            const result = await jobService.getById(id);
            if (!result)
                return res.status(404).json({ success: false, message: "İlan bulunamadı" });
            return res.status(200).json({ success: true, data: result });
        }
        catch (error) {
            return res.status(500).json({ success: false, message: "İlan getirilirken hata oluştu" });
        }
    }
    async update(req, res) {
        try {
            const { id } = req.params;
            const validated = UpdateJobSchema.parse(req.body);
            const result = await jobService.update(id, validated);
            return res.status(200).json({ success: true, message: "İlan güncellendi", data: result });
        }
        catch (error) {
            if (error instanceof ZodError)
                return res.status(400).json({ success: false, errors: error.issues });
            return res.status(500).json({ success: false, message: "Güncelleme hatası" });
        }
    }
    async delete(req, res) {
        try {
            const { id } = req.params;
            await jobService.delete(id);
            return res.status(200).json({ success: true, message: "İlan silindi" });
        }
        catch (error) {
            return res.status(500).json({ success: false, message: "Silme hatası" });
        }
    }
    async apply(req, res) {
        try {
            if (!req.user) {
                return res.status(401).json({ success: false, message: "Yetkisiz erişim" });
            }
            const { id } = req.params;
            const userId = req.user.userId;
            const validated = ApplyJobSchema.parse(req.body);
            const result = await jobService.apply(id, userId, validated);
            return res.status(201).json({ success: true, message: "Başvuru başarılı", data: result });
        }
        catch (error) {
            if (error instanceof ZodError)
                return res.status(400).json({ success: false, errors: error.issues });
            const appError = error;
            const status = appError.status || 500;
            return res.status(status).json({ success: false, message: appError.message || "Başvuru hatası" });
        }
    }
    async getApplications(req, res) {
        try {
            const { id } = req.params;
            const result = await jobService.getApplications(id);
            return res.status(200).json({ success: true, data: result });
        }
        catch (error) {
            return res.status(500).json({ success: false, message: "Başvurular getirilirken hata oluştu" });
        }
    }
    async getMyApplications(req, res) {
        try {
            if (!req.user) {
                return res.status(401).json({ success: false, message: "Yetkisiz erişim" });
            }
            const userId = req.user.userId;
            const result = await jobService.getUserApplications(userId);
            return res.status(200).json({ success: true, data: result });
        }
        catch (error) {
            return res.status(500).json({ success: false, message: "Başvurularım getirilirken hata oluştu" });
        }
    }
}
