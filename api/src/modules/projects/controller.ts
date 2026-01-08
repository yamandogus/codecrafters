import { Request, Response } from "express";
import { ProjectService } from "./service.js";
import { CreateProjectSchema, UpdateProjectSchema } from "../../dto/projectsDto.js";
import { AppError } from "../../types/index.js";
import { ZodError } from "zod";

const projectService = new ProjectService();

export class ProjectController {
    async create(req: Request, res: Response) {
        try {
            if (!req.user) {
                return res.status(401).json({ success: false, message: "Yetkisiz erişim" });
            }
            const validated = CreateProjectSchema.parse(req.body);
            const userId = req.user.userId;

            const result = await projectService.create(userId, validated);

            return res.status(201).json({ success: true, message: "Proje oluşturuldu", data: result });
        } catch (error) {
            if (error instanceof ZodError) return res.status(400).json({ success: false, errors: error.issues });
            return res.status(500).json({ success: false, message: "Proje oluşturulurken hata oluştu" });
        }
    }

    async getAll(req: Request, res: Response) {
        try {
            const { category, search } = req.query;
            const result = await projectService.getAll({ category: category as string, search: search as string });
            return res.status(200).json({ success: true, data: result });
        } catch (error) {
            return res.status(500).json({ success: false, message: "Projeler getirilirken hata oluştu" });
        }
    }

    async getById(req: Request, res: Response) {
        try {
            const { id } = req.params;
            const result = await projectService.getById(id);
            if (!result) return res.status(404).json({ success: false, message: "Proje bulunamadı" });
            return res.status(200).json({ success: true, data: result });
        } catch (error) {
            return res.status(500).json({ success: false, message: "Proje getirilirken hata oluştu" });
        }
    }

    async update(req: Request, res: Response) {
        try {
            if (!req.user) {
                return res.status(401).json({ success: false, message: "Yetkisiz erişim" });
            }
            const { id } = req.params;
            const userId = req.user.userId;
            const userRole = req.user.role;
            const validated = UpdateProjectSchema.parse(req.body);
            const result = await projectService.update(id, userId, validated, userRole);
            return res.status(200).json({ success: true, message: "Proje güncellendi", data: result });
        } catch (error) {
            const appError = error as AppError;
            const status = appError.status || 500;
            return res.status(status).json({ success: false, message: appError.message || "Güncelleme hatası" });
        }
    }

    async delete(req: Request, res: Response) {
        try {
            if (!req.user) {
                return res.status(401).json({ success: false, message: "Yetkisiz erişim" });
            }
            const { id } = req.params;
            const userId = req.user.userId;
            const userRole = req.user.role;
            await projectService.delete(id, userId, userRole);
            return res.status(200).json({ success: true, message: "Proje silindi" });
        } catch (error) {
            const appError = error as AppError;
            const status = appError.status || 500;
            return res.status(status).json({ success: false, message: appError.message || "Silme hatası" });
        }
    }
}
