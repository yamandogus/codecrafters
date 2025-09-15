import { LoginDTO, RegisterDTO } from "../../dto/authDto";
import bcrypt from "bcrypt";
import { PrismaClient } from "@prisma/client";
import jwt from "jsonwebtoken";
import crypto from "crypto";

const prisma = new PrismaClient();

export class AuthService {
  private signAccessToken(payload: { userId: string; email: string; role: string }) {
    return jwt.sign(payload, process.env.JWT_ACCESS_SECRET || "dev-secret", {
      expiresIn: process.env.JWT_ACCESS_EXPIRES_IN || "15m",
    });
  }

  private signRefreshToken(payload: { userId: string }) {
    const token = jwt.sign(payload, process.env.JWT_REFRESH_SECRET || "dev-refresh-secret", {
      expiresIn: process.env.JWT_REFRESH_EXPIRES_IN || "7d",
    });
    return token;
  }

  private hashToken(token: string) {
    return crypto.createHash("sha256").update(token).digest("hex");
  }

  async register(data: RegisterDTO) {
    const { name, surname, email, password } = data;
    
    // Debug: Gelen veriyi kontrol et
    console.log('Register data:', { name, surname, email });

    const existing = await prisma.user.findUnique({
      where: { email },
    });
    if (existing) {
      const e: any = new Error(
        "Bu e-posta ile zaten kayıtlı bir kullanıcı var"
      );
      e.status = 400;
      throw e;
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    
    // Use full email as username
    const username = email;
    
    // Create new user
    const newUser = await prisma.user.create({
      data: {
        name,
        surname,
        email,
        password: hashedPassword,
        username,
        provider: 'local'
      },
      select: {
        id: true,
        name: true,
        surname: true,
        email: true,
        username: true,
        role: true,
        createdAt: true,
      },
    });

    const accessToken = this.signAccessToken({ userId: newUser.id, email: newUser.email, role: (newUser as any).role });
    const refreshToken = this.signRefreshToken({ userId: newUser.id });

    await prisma.refreshToken.create({
      data: {
        userId: newUser.id,
        tokenHash: this.hashToken(refreshToken),
        expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
      },
    });

    return { user: newUser, token: accessToken, refreshToken };
  }

  async login(data: LoginDTO) {
    const { email, password } = data;
    const user = await prisma.user.findUnique({ where: { email } });

    if (!user) {
      const e: any = new Error("Geçersiz e-posta veya şifre");
      e.status = 401;
      throw e;
    }

    const isPasswordValid = await bcrypt.compare(password, user.password || '');

    if (!user.password || !isPasswordValid) {
      const e: any = new Error("Geçersiz e-posta veya şifre");
      e.status = 401;
      throw e;
    }

    const accessToken = this.signAccessToken({ userId: user.id, email: user.email, role: user.role });
    const refreshToken = this.signRefreshToken({ userId: user.id });

    await prisma.refreshToken.create({
      data: {
        userId: user.id,
        tokenHash: this.hashToken(refreshToken),
        expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
      },
    });

    return {
      user: {
        id: user.id,
        name: user.name,
        surname: user.surname,
        email: user.email,
        username: user.username,
        role: user.role,
      },
      token: accessToken,
      refreshToken,
    };
  }

  async refresh(token: string) {
    try {
      const decoded = jwt.verify(token, process.env.JWT_REFRESH_SECRET || "dev-refresh-secret") as { userId: string; iat: number; exp: number };
      const tokenHash = this.hashToken(token);

      const stored = await prisma.refreshToken.findFirst({
        where: {
          userId: decoded.userId,
          tokenHash,
          revokedAt: null,
          expiresAt: { gt: new Date() },
        },
        include: { user: true },
      });

      if (!stored || !stored.user) {
        const e: any = new Error("Geçersiz veya süresi dolmuş yenileme tokenı");
        e.status = 401;
        throw e;
      }

      // rotate refresh token (optional simple strategy: revoke and issue new)
      await prisma.refreshToken.update({
        where: { id: stored.id },
        data: { revokedAt: new Date() },
      });

      const newRefresh = this.signRefreshToken({ userId: stored.user.id });
      await prisma.refreshToken.create({
        data: {
          userId: stored.user.id,
          tokenHash: this.hashToken(newRefresh),
          expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
        },
      });

      const newAccess = this.signAccessToken({ userId: stored.user.id, email: stored.user.email, role: stored.user.role });

      return { token: newAccess, refreshToken: newRefresh };
    } catch (err: any) {
      const e: any = new Error("Yenileme başarısız");
      e.status = 401;
      throw e;
    }
  }
}
