import { Request, Response } from "express";
import { LoginSchema, RegisterSchema } from "../../dto/authDto.js";
import { AuthService } from "./service.js";
import { AppError } from "../../types/index.js";
import { ZodError } from "zod";

const authService = new AuthService();

export class AuthController {
  async register(req: Request, res: Response) {
    try {
      const validated = RegisterSchema.parse(req.body);

      const result = await authService.register(validated);

      return res.status(201).json({
        success: true,
        message: "Kayıt başarılı",
        data: result,
      });
    } catch (error) {
      if (error instanceof ZodError) {
        return res.status(400).json({
          success: false,
          message: "Validasyon hatası",
          errors: error.issues,
        });
      }
      const appError = error as AppError;
      const status = appError.status || 400;
      return res.status(status).json({
        success: false,
        message: appError.message || "Kayıt sırasında bir hata oluştu",
      });
    }
  }

  async login(req: Request, res: Response) {
    try {
      const validated = LoginSchema.parse(req.body);
      const result = await authService.login(validated);

      return res.status(200).json({
        success: true,
        message: "Giriş başarılı",
        data: result,
      });
    } catch (error) {
      if (error instanceof ZodError) {
        return res.status(400).json({ success: false, errors: error.issues });
      }
      const appError = error as AppError;
      const status = appError.status || 401;
      return res.status(status).json({
        success: false,
        message: appError.message || "Giriş sırasında bir hata oluştu",
      });
    }
  }

  async refresh(req: Request, res: Response) {
    try {
      const { refreshToken } = (req.body || {}) as { refreshToken?: string };
      if (!refreshToken) {
        return res.status(400).json({ success: false, message: 'refreshToken gerekli' });
      }
      const result = await authService.refresh(refreshToken);
      return res.status(200).json({ success: true, message: 'Token yenilendi', data: result });
    } catch (error) {
      const appError = error as AppError;
      const status = appError.status || 401;
      return res.status(status).json({ success: false, message: appError.message || 'Yenileme sırasında hata oluştu' });
    }
  }
}
