import { Request, Response } from "express";
import { JobService } from "./service";
import { CreateJobSchema, UpdateJobSchema, ApplyJobSchema } from "../../dto/jobsDto";

const jobService = new JobService();

export class JobController {
    async create(req: any, res: Response) {
        try {
            const validated = CreateJobSchema.parse(req.body);
            const result = await jobService.create(validated);
            return res.status(201).json({ success: true, message: "İş ilanı oluşturuldu", data: result });
        } catch (error: any) {
            if (error?.errors) return res.status(400).json({ success: false, errors: error.errors });
            return res.status(500).json({ success: false, message: "İlan oluşturulurken hata oluştu" });
        }
    }

    async getAll(req: Request, res: Response) {
        try {
            const { category, search, type } = req.query;
            const result = await jobService.getAll({
                category: category as string,
                search: search as string,
                type: type as string
            });
            return res.status(200).json({ success: true, data: result });
        } catch (error) {
            return res.status(500).json({ success: false, message: "İlanlar getirilirken hata oluştu" });
        }
    }

    async getById(req: Request, res: Response) {
        try {
            const { id } = req.params;
            const result = await jobService.getById(id);
            if (!result) return res.status(404).json({ success: false, message: "İlan bulunamadı" });
            return res.status(200).json({ success: true, data: result });
        } catch (error) {
            return res.status(500).json({ success: false, message: "İlan getirilirken hata oluştu" });
        }
    }

    async update(req: any, res: Response) {
        try {
            const { id } = req.params;
            const validated = UpdateJobSchema.parse(req.body);
            const result = await jobService.update(id, validated);
            return res.status(200).json({ success: true, message: "İlan güncellendi", data: result });
        } catch (error: any) {
            if (error?.errors) return res.status(400).json({ success: false, errors: error.errors });
            return res.status(500).json({ success: false, message: "Güncelleme hatası" });
        }
    }

    async delete(req: any, res: Response) {
        try {
            const { id } = req.params;
            await jobService.delete(id);
            return res.status(200).json({ success: true, message: "İlan silindi" });
        } catch (error) {
            return res.status(500).json({ success: false, message: "Silme hatası" });
        }
    }

    async apply(req: any, res: Response) {
        try {
            const { id } = req.params;
            const userId = req.user.userId;
            const validated = ApplyJobSchema.parse(req.body);
            const result = await jobService.apply(id, userId, validated);
            return res.status(201).json({ success: true, message: "Başvuru başarılı", data: result });
        } catch (error: any) {
            const status = error.status || 500;
            if (error?.errors) return res.status(400).json({ success: false, errors: error.errors });
            return res.status(status).json({ success: false, message: error.message || "Başvuru hatası" });
        }
    }

    async getApplications(req: any, res: Response) {
        try {
            const { id } = req.params;
            const result = await jobService.getApplications(id);
            return res.status(200).json({ success: true, data: result });
        } catch (error) {
            return res.status(500).json({ success: false, message: "Başvurular getirilirken hata oluştu" });
        }
    }
}
