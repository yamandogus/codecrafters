import { Request, Response } from "express";
import { LoginSchema, RegisterSchema } from "../../dto/authDto";
import { AuthService } from "./service";

const authService = new AuthService();

export class AuthController {
  async register(req: any, res: any) {
    try {
      const validated = RegisterSchema.parse(req.body);

      const result = await authService.register(validated);

      return res.status(201).json({
        success: true,
        message: "Kayıt başarılı",
        data: result,
      });
    } catch (error: any) {
      if (error?.error) {
        return res.status(400).json({
          success: false,
          message: error.message,
          data: error.error,
        });
      }
      const status = error.status || 400;
      return res.status(status).json({
        success: false,
        message: error?.message || "Kayıt sırasında bir hata oluştu",
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
    } catch (error: any) {
      if (error?.errors) {
        return res.status(400).json({ success: false, errors: error.errors });
      }
      const status = error?.status || 401;
      return res.status(status).json({
        success: false,
        message: error?.message || "Giriş sırasında bir hata oluştu",
      });
    }
  }
}
