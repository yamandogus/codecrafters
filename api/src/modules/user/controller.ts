import { Request, Response } from "express";
import { UpdateProfileSchema, ChangePasswordSchema } from "../../dto/userDto";
import { UserService } from "./service";

const userService = new UserService();

export class UserController {
  // Kendi profilini getir
  async getProfile(req: any, res: Response) {
    try {
      const userId = req.user.userId; // Auth middleware'den geliyor
      const user = await userService.getProfile(userId);

      return res.status(200).json({
        success: true,
        message: "Profil başarıyla getirildi",
        data: user,
      });
    } catch (error: any) {
      const status = error.status || 500;
      return res.status(status).json({
        success: false,
        message: error?.message || "Profil getirilirken bir hata oluştu",
      });
    }
  }

  // Profilini güncelle
  async updateProfile(req: any, res: Response) {
    try {
      const userId = req.user.userId;
      const validated = UpdateProfileSchema.parse(req.body);

      const updatedUser = await userService.updateProfile(userId, validated);

      return res.status(200).json({
        success: true,
        message: "Profil başarıyla güncellendi",
        data: updatedUser,
      });
    } catch (error: any) {
      if (error?.errors) {
        return res.status(400).json({ 
          success: false, 
          message: "Validasyon hatası",
          errors: error.errors 
        });
      }
      const status = error.status || 500;
      return res.status(status).json({
        success: false,
        message: error?.message || "Profil güncellenirken bir hata oluştu",
      });
    }
  }

  // Şifre değiştir
  async changePassword(req: any, res: Response) {
    try {
      const userId = req.user.userId;
      const validated = ChangePasswordSchema.parse(req.body);

      const result = await userService.changePassword(userId, validated);

      return res.status(200).json({
        success: true,
        message: result.message,
      });
    } catch (error: any) {
      if (error?.errors) {
        return res.status(400).json({ 
          success: false, 
          message: "Validasyon hatası",
          errors: error.errors 
        });
      }
      const status = error.status || 400;
      return res.status(status).json({
        success: false,
        message: error?.message || "Şifre değiştirilirken bir hata oluştu",
      });
    }
  }

  // Kullanıcı listesi
  async getUsers(req: Request, res: Response) {
    try {
      const page = parseInt(req.query.page as string) || 1;
      const limit = parseInt(req.query.limit as string) || 10;
      const search = req.query.search as string;

      const result = await userService.getUsers(page, limit, search);

      return res.status(200).json({
        success: true,
        message: "Kullanıcı listesi başarıyla getirildi",
        data: result.users,
        pagination: result.pagination,
      });
    } catch (error: any) {
      return res.status(500).json({
        success: false,
        message: error?.message || "Kullanıcı listesi getirilirken bir hata oluştu",
      });
    }
  }

  // Username ile kullanıcı getir
  async getUserByUsername(req: Request, res: Response) {
    try {
      const { username } = req.params;
      const user = await userService.getUserByUsername(username);

      return res.status(200).json({
        success: true,
        message: "Kullanıcı başarıyla getirildi",
        data: user,
      });
    } catch (error: any) {
      const status = error.status || 500;
      return res.status(status).json({
        success: false,
        message: error?.message || "Kullanıcı getirilirken bir hata oluştu",
      });
    }
  }
}