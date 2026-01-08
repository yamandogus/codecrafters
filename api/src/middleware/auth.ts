import { PrismaClient } from '@prisma/client';
import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { AuthenticatedRequest, AppError, AuthenticatedUser } from '../types/index.js';

const prisma = new PrismaClient();

interface JwtPayload {
  userId: string;
  email: string;
  role?: string;
  iat?: number;
  exp?: number;
}

export const authenticate = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({
        success: false,
        message: 'Erişim token\'ı sağlanmadı'
      });
    }

    const token = authHeader.substring(7); // "Bearer " kısmını çıkar

    if (!token) {
      return res.status(401).json({
        success: false,
        message: 'Token bulunamadı'
      });
    }

    // Token'ı doğrula
    const decoded = jwt.verify(
      token,
      process.env.JWT_ACCESS_SECRET || 'dev-secret'
    ) as JwtPayload;

    // Kullanıcının var olup olmadığını kontrol et
    const user = await prisma.user.findUnique({
      where: { id: decoded.userId },
      select: {
        id: true,
        email: true,
        name: true,
        surname: true,
        username: true,
        role: true,
      }
    });

    if (!user) {
      return res.status(401).json({
        success: false,
        message: 'Geçersiz token - kullanıcı bulunamadı'
      });
    }

    // Kullanıcı bilgilerini request nesnesine ekle
    const authenticatedUser: AuthenticatedUser = {
      userId: user.id,
      email: user.email,
      name: user.name,
      surname: user.surname,
      username: user.username,
      role: user.role,
    };
    req.user = authenticatedUser;

    next();
  } catch (error) {
    if (error instanceof jwt.JsonWebTokenError) {
      return res.status(401).json({
        success: false,
        message: 'Geçersiz token'
      });
    }

    if (error instanceof jwt.TokenExpiredError) {
      return res.status(401).json({
        success: false,
        message: 'Token süresi dolmuş'
      });
    }

    const appError = error as AppError;
    return res.status(500).json({
      success: false,
      message: appError.message || 'Token doğrulaması sırasında hata oluştu'
    });
  }
};

// Opsiyonel authentication - token varsa kontrol et, yoksa devam et
export const optionalAuth = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return next(); // Token yoksa devam et
    }

    const token = authHeader.substring(7);

    if (!token) {
      return next(); // Token yoksa devam et
    }

    // Token'ı doğrula
    const decoded = jwt.verify(
      token,
      process.env.JWT_ACCESS_SECRET || 'dev-secret'
    ) as JwtPayload;

    // Kullanıcının var olup olmadığını kontrol et
    const user = await prisma.user.findUnique({
      where: { id: decoded.userId },
      select: {
        id: true,
        email: true,
        name: true,
        surname: true,
        username: true,
        role: true,
      }
    });

    if (user) {
      // Kullanıcı bilgilerini request nesnesine ekle
      const authenticatedUser: AuthenticatedUser = {
        userId: user.id,
        email: user.email,
        name: user.name,
        surname: user.surname,
        username: user.username,
        role: user.role,
      };
      req.user = authenticatedUser;
    }

    next();
  } catch (error) {
    // Hata olursa token'ı yok say ve devam et
    next();
  }
};

export const authorizeRoles = (...roles: string[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    if (!req.user) {
      return res.status(403).json({ success: false, message: 'Yetkisiz erişim' });
    }
    const userRole = req.user.role;
    if (!roles.includes(userRole)) {
      return res.status(403).json({ success: false, message: 'Bu işlem için yetkiniz yok' });
    }
    next();
  };
};
