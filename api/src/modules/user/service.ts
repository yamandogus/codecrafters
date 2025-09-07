import { UpdateProfileDTO, ChangePasswordDTO } from "../../dto/userDto";
import bcrypt from "bcrypt";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export class UserService {
  // Kullanıcı profilini getir
  async getProfile(userId: string) {
    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: {
        id: true,
        name: true,
        surname: true,
        email: true,
        username: true,
        bio: true,
        location: true,
        website: true,
        github: true,
        linkedin: true,
        avatar: true,
        provider: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    if (!user) {
      const error: any = new Error("Kullanıcı bulunamadı");
      error.status = 404;
      throw error;
    }

    return user;
  }

  // Kullanıcı profilini güncelle
  async updateProfile(userId: string, data: UpdateProfileDTO) {
    // Kullanıcının var olup olmadığını kontrol et
    const existingUser = await prisma.user.findUnique({
      where: { id: userId },
    });

    if (!existingUser) {
      const error: any = new Error("Kullanıcı bulunamadı");
      error.status = 404;
      throw error;
    }

    // Profili güncelle
    const updatedUser = await prisma.user.update({
      where: { id: userId },
      data: {
        ...data,
        updatedAt: new Date(),
      },
      select: {
        id: true,
        name: true,
        surname: true,
        email: true,
        username: true,
        bio: true,
        location: true,
        website: true,
        github: true,
        linkedin: true,
        avatar: true,
        provider: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    return updatedUser;
  }

  // Şifre değiştir
  async changePassword(userId: string, data: ChangePasswordDTO) {
    const { currentPassword, newPassword } = data;

    // Kullanıcıyı getir
    const user = await prisma.user.findUnique({
      where: { id: userId },
    });

    if (!user) {
      const error: any = new Error("Kullanıcı bulunamadı");
      error.status = 404;
      throw error;
    }

    // OAuth kullanıcıları şifre değiştiremez
    if (user.provider !== 'local') {
      const error: any = new Error("OAuth ile giriş yapan kullanıcılar şifre değiştiremez");
      error.status = 400;
      throw error;
    }

    // Mevcut şifreyi kontrol et
    const isCurrentPasswordValid = await bcrypt.compare(currentPassword, user.password || '');
    if (!isCurrentPasswordValid) {
      const error: any = new Error("Mevcut şifre hatalı");
      error.status = 400;
      throw error;
    }

    // Yeni şifreyi hashle
    const hashedNewPassword = await bcrypt.hash(newPassword, 10);

    // Şifreyi güncelle
    await prisma.user.update({
      where: { id: userId },
      data: {
        password: hashedNewPassword,
        updatedAt: new Date(),
      },
    });

    return { message: "Şifre başarıyla güncellendi" };
  }

  // Kullanıcı listesi (admin veya genel liste)
  async getUsers(page: number = 1, limit: number = 10, search?: string) {
    const skip = (page - 1) * limit;
    
    const where = search
      ? {
          OR: [
            { name: { contains: search, mode: 'insensitive' as const } },
            { surname: { contains: search, mode: 'insensitive' as const } },
            { username: { contains: search, mode: 'insensitive' as const } },
            { email: { contains: search, mode: 'insensitive' as const } },
          ],
        }
      : {};

    const [users, total] = await Promise.all([
      prisma.user.findMany({
        where,
        skip,
        take: limit,
        select: {
          id: true,
          name: true,
          surname: true,
          username: true,
          email: true,
          avatar: true,
          bio: true,
          location: true,
          createdAt: true,
        },
        orderBy: {
          createdAt: 'desc',
        },
      }),
      prisma.user.count({ where }),
    ]);

    return {
      users,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
        hasNext: page < Math.ceil(total / limit),
        hasPrev: page > 1,
      },
    };
  }

  // Kullanıcı username ile getir
  async getUserByUsername(username: string) {
    const user = await prisma.user.findUnique({
      where: { username },
      select: {
        id: true,
        name: true,
        surname: true,
        username: true,
        bio: true,
        location: true,
        website: true,
        github: true,
        linkedin: true,
        avatar: true,
        provider: true,
        createdAt: true,
        // Kullanıcının blog yazıları, projeleri vs. de eklenebilir
      },
    });

    if (!user) {
      const error: any = new Error("Kullanıcı bulunamadı");
      error.status = 404;
      throw error;
    }

    return user;
  }
}