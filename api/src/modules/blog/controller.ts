import { Request, Response } from "express";
import { BlogService } from "./service";
import { CreateBlogSchema, UpdateBlogSchema } from "../../dto/blogDto";

const blogService = new BlogService();

export class BlogController {
    async create(req: any, res: Response) {
        try {
            const validated = CreateBlogSchema.parse(req.body);
            const userId = req.user.userId; // Middleware'den gelen user id

            const result = await blogService.create(userId, validated);

            return res.status(201).json({
                success: true,
                message: "Blog yazısı başarıyla oluşturuldu",
                data: result,
            });
        } catch (error: any) {
            if (error?.errors) {
                return res.status(400).json({ success: false, errors: error.errors });
            }
            return res.status(500).json({
                success: false,
                message: "Blog yazısı oluşturulurken bir hata oluştu",
            });
        }
    }

    async getAll(req: Request, res: Response) {
        try {
            const { category, search } = req.query;
            const result = await blogService.getAll({
                category: category as string,
                search: search as string
            });

            return res.status(200).json({
                success: true,
                data: result,
            });
        } catch (error) {
            return res.status(500).json({
                success: false,
                message: "Blog yazıları getirilirken bir hata oluştu",
            });
        }
    }

    async getById(req: Request, res: Response) {
        try {
            const { id } = req.params;
            const result = await blogService.getById(id);

            if (!result) {
                return res.status(404).json({
                    success: false,
                    message: "Blog yazısı bulunamadı",
                });
            }

            return res.status(200).json({
                success: true,
                data: result,
            });
        } catch (error) {
            return res.status(500).json({
                success: false,
                message: "Blog yazısı getirilirken bir hata oluştu",
            });
        }
    }

    async update(req: any, res: Response) {
        try {
            const { id } = req.params;
            const userId = req.user.userId;
            const userRole = req.user.role;
            const validated = UpdateBlogSchema.parse(req.body);

            const result = await blogService.update(id, userId, validated, userRole);

            return res.status(200).json({
                success: true,
                message: "Blog yazısı güncellendi",
                data: result,
            });
        } catch (error: any) {
            const status = error.status || 500;
            return res.status(status).json({
                success: false,
                message: error.message || "Güncelleme sırasında hata oluştu",
            });
        }
    }

    async delete(req: any, res: Response) {
        try {
            const { id } = req.params;
            const userId = req.user.userId;
            const userRole = req.user.role;

            await blogService.delete(id, userId, userRole);

            return res.status(200).json({
                success: true,
                message: "Blog yazısı silindi",
            });
        } catch (error: any) {
            const status = error.status || 500;
            return res.status(status).json({
                success: false,
                message: error.message || "Silme işlemi sırasında hata oluştu",
            });
        }
    }
}
