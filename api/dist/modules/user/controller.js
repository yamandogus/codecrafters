import { UpdateProfileSchema, ChangePasswordSchema } from "../../dto/userDto.js";
import { UserService } from "./service.js";
import { ZodError } from "zod";
const userService = new UserService();
export class UserController {
    // Kendi profilini getir
    async getProfile(req, res) {
        try {
            if (!req.user) {
                return res.status(401).json({ success: false, message: "Yetkisiz erişim" });
            }
            const userId = req.user.userId; // Auth middleware'den geliyor
            const user = await userService.getProfile(userId);
            return res.status(200).json({
                success: true,
                message: "Profil başarıyla getirildi",
                data: user,
            });
        }
        catch (error) {
            const appError = error;
            const status = appError.status || 500;
            return res.status(status).json({
                success: false,
                message: appError.message || "Profil getirilirken bir hata oluştu",
            });
        }
    }
    // Profilini güncelle
    async updateProfile(req, res) {
        try {
            if (!req.user) {
                return res.status(401).json({ success: false, message: "Yetkisiz erişim" });
            }
            const userId = req.user.userId;
            const validated = UpdateProfileSchema.parse(req.body);
            const updatedUser = await userService.updateProfile(userId, validated);
            return res.status(200).json({
                success: true,
                message: "Profil başarıyla güncellendi",
                data: updatedUser,
            });
        }
        catch (error) {
            if (error instanceof ZodError) {
                return res.status(400).json({
                    success: false,
                    message: "Validasyon hatası",
                    errors: error.issues
                });
            }
            const appError = error;
            const status = appError.status || 500;
            return res.status(status).json({
                success: false,
                message: appError.message || "Profil güncellenirken bir hata oluştu",
            });
        }
    }
    // Şifre değiştir
    async changePassword(req, res) {
        try {
            if (!req.user) {
                return res.status(401).json({ success: false, message: "Yetkisiz erişim" });
            }
            const userId = req.user.userId;
            const validated = ChangePasswordSchema.parse(req.body);
            const result = await userService.changePassword(userId, validated);
            return res.status(200).json({
                success: true,
                message: result.message,
            });
        }
        catch (error) {
            if (error instanceof ZodError) {
                return res.status(400).json({
                    success: false,
                    message: "Validasyon hatası",
                    errors: error.issues
                });
            }
            const appError = error;
            const status = appError.status || 400;
            return res.status(status).json({
                success: false,
                message: appError.message || "Şifre değiştirilirken bir hata oluştu",
            });
        }
    }
    // Kullanıcı listesi
    async getUsers(req, res) {
        try {
            const page = parseInt(req.query.page) || 1;
            const limit = parseInt(req.query.limit) || 10;
            const search = req.query.search;
            const result = await userService.getUsers(page, limit, search);
            return res.status(200).json({
                success: true,
                message: "Kullanıcı listesi başarıyla getirildi",
                data: result.users,
                pagination: result.pagination,
            });
        }
        catch (error) {
            const appError = error;
            return res.status(500).json({
                success: false,
                message: appError.message || "Kullanıcı listesi getirilirken bir hata oluştu",
            });
        }
    }
    // Username ile kullanıcı getir
    async getUserByUsername(req, res) {
        try {
            const { username } = req.params;
            const user = await userService.getUserByUsername(username);
            return res.status(200).json({
                success: true,
                message: "Kullanıcı başarıyla getirildi",
                data: user,
            });
        }
        catch (error) {
            const appError = error;
            const status = appError.status || 500;
            return res.status(status).json({
                success: false,
                message: appError.message || "Kullanıcı getirilirken bir hata oluştu",
            });
        }
    }
    // Kullanıcıya ait projeleri getir
    async getMyProjects(req, res) {
        try {
            if (!req.user) {
                return res.status(401).json({ success: false, message: "Yetkisiz erişim" });
            }
            const userId = req.user.userId;
            const projects = await userService.getUserProjects(userId);
            return res.status(200).json({
                success: true,
                message: "Projeler başarıyla getirildi",
                data: projects,
            });
        }
        catch (error) {
            const appError = error;
            return res.status(500).json({
                success: false,
                message: appError.message || "Projeler getirilirken bir hata oluştu",
            });
        }
    }
    // Kullanıcı istatistiklerini getir
    async getMyStats(req, res) {
        try {
            if (!req.user) {
                return res.status(401).json({ success: false, message: "Yetkisiz erişim" });
            }
            const userId = req.user.userId;
            const stats = await userService.getUserStats(userId);
            return res.status(200).json({
                success: true,
                message: "İstatistikler başarıyla getirildi",
                data: stats,
            });
        }
        catch (error) {
            const appError = error;
            return res.status(500).json({
                success: false,
                message: appError.message || "İstatistikler getirilirken bir hata oluştu",
            });
        }
    }
}
