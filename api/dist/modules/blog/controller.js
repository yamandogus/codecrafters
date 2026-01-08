import { BlogService } from "./service";
import { CreateBlogSchema, UpdateBlogSchema } from "../../dto/blogDto";
import { ZodError } from "zod";
const blogService = new BlogService();
export class BlogController {
    async create(req, res) {
        try {
            if (!req.user) {
                return res.status(401).json({ success: false, message: "Yetkisiz erişim" });
            }
            const validated = CreateBlogSchema.parse(req.body);
            const userId = req.user.userId; // Middleware'den gelen user id
            const result = await blogService.create(userId, validated);
            return res.status(201).json({
                success: true,
                message: "Blog yazısı başarıyla oluşturuldu",
                data: result,
            });
        }
        catch (error) {
            if (error instanceof ZodError) {
                return res.status(400).json({ success: false, errors: error.issues });
            }
            return res.status(500).json({
                success: false,
                message: "Blog yazısı oluşturulurken bir hata oluştu",
            });
        }
    }
    async getAll(req, res) {
        try {
            const { category, search } = req.query;
            const result = await blogService.getAll({
                category: category,
                search: search
            });
            return res.status(200).json({
                success: true,
                data: result,
            });
        }
        catch (error) {
            return res.status(500).json({
                success: false,
                message: "Blog yazıları getirilirken bir hata oluştu",
            });
        }
    }
    async getById(req, res) {
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
        }
        catch (error) {
            return res.status(500).json({
                success: false,
                message: "Blog yazısı getirilirken bir hata oluştu",
            });
        }
    }
    async update(req, res) {
        try {
            if (!req.user) {
                return res.status(401).json({ success: false, message: "Yetkisiz erişim" });
            }
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
        }
        catch (error) {
            const appError = error;
            const status = appError.status || 500;
            return res.status(status).json({
                success: false,
                message: appError.message || "Güncelleme sırasında hata oluştu",
            });
        }
    }
    async delete(req, res) {
        try {
            if (!req.user) {
                return res.status(401).json({ success: false, message: "Yetkisiz erişim" });
            }
            const { id } = req.params;
            const userId = req.user.userId;
            const userRole = req.user.role;
            await blogService.delete(id, userId, userRole);
            return res.status(200).json({
                success: true,
                message: "Blog yazısı silindi",
            });
        }
        catch (error) {
            const appError = error;
            const status = appError.status || 500;
            return res.status(status).json({
                success: false,
                message: appError.message || "Silme işlemi sırasında hata oluştu",
            });
        }
    }
}
