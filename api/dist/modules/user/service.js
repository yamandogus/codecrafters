import bcrypt from "bcrypt";
import { PrismaClient } from "@prisma/client";
import { mapSkillLevel } from "../../types/index.js";
const prisma = new PrismaClient();
export class UserService {
    // Kullanıcı profilini getir
    async getProfile(userId) {
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
                skills: true,
                achievements: true,
                projectsCreated: {
                    take: 5,
                    orderBy: { createdAt: 'desc' },
                    select: { id: true, title: true, description: true, createdAt: true, category: true, tech: true, demo: true, github: true }
                },
                blogPosts: {
                    take: 5,
                    orderBy: { createdAt: 'desc' },
                    select: { title: true, excerpt: true, createdAt: true }
                },
                // İstatistikler
                projects: true,
                events: true,
                followers: true,
                following: true,
            },
        });
        if (!user) {
            const error = new Error("Kullanıcı bulunamadı");
            error.status = 404;
            throw error;
        }
        return user;
    }
    // Kullanıcı profilini güncelle
    async updateProfile(userId, data) {
        // Kullanıcının var olup olmadığını kontrol et
        const existingUser = await prisma.user.findUnique({
            where: { id: userId },
        });
        if (!existingUser) {
            const error = new Error("Kullanıcı bulunamadı");
            error.status = 404;
            throw error;
        }
        // Profili güncelle
        const { skills, achievements, experience, education, ...userData } = data;
        // Transaction içinde güncelleme yap
        const updatedUser = await prisma.$transaction(async (tx) => {
            // Önce kullanıcı bilgilerini güncelle
            const user = await tx.user.update({
                where: { id: userId },
                data: {
                    ...userData,
                    skills: skills ? {
                        deleteMany: {},
                        create: skills.map((skill) => ({
                            name: skill.name,
                            level: mapSkillLevel(skill.level),
                            color: skill.color
                        }))
                    } : undefined,
                    achievements: achievements ? {
                        deleteMany: {},
                        create: achievements.map((a) => ({
                            title: a.title,
                            description: a.description,
                            icon: a.icon,
                            earnedAt: a.date ? new Date(a.date) : new Date()
                        }))
                    } : undefined,
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
                    skills: true,
                    achievements: true,
                },
            });
            // Experience ve Education güncellemeleri
            if (experience !== undefined) {
                await tx.userExperience.deleteMany({ where: { userId } });
                if (experience.length > 0) {
                    await tx.userExperience.createMany({
                        data: experience.map((e) => ({
                            userId,
                            title: e.title,
                            company: e.company,
                            startDate: new Date(e.startDate),
                            endDate: e.endDate ? new Date(e.endDate) : null,
                            description: e.description || null
                        }))
                    });
                }
            }
            if (education !== undefined) {
                await tx.userEducation.deleteMany({ where: { userId } });
                if (education.length > 0) {
                    await tx.userEducation.createMany({
                        data: education.map((e) => ({
                            userId,
                            school: e.school,
                            degree: e.degree,
                            field: e.field,
                            startDate: new Date(e.startDate),
                            endDate: e.endDate ? new Date(e.endDate) : null,
                            description: e.description || null
                        }))
                    });
                }
            }
            return user;
        });
        return updatedUser;
    }
    // Şifre değiştir
    async changePassword(userId, data) {
        const { currentPassword, newPassword } = data;
        // Kullanıcıyı getir
        const user = await prisma.user.findUnique({
            where: { id: userId },
        });
        if (!user) {
            const error = new Error("Kullanıcı bulunamadı");
            error.status = 404;
            throw error;
        }
        // OAuth kullanıcıları şifre değiştiremez
        if (user.provider !== 'local') {
            const error = new Error("OAuth ile giriş yapan kullanıcılar şifre değiştiremez");
            error.status = 400;
            throw error;
        }
        // Mevcut şifreyi kontrol et
        const isCurrentPasswordValid = await bcrypt.compare(currentPassword, user.password || '');
        if (!isCurrentPasswordValid) {
            const error = new Error("Mevcut şifre hatalı");
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
    async getUsers(page = 1, limit = 10, search) {
        const skip = (page - 1) * limit;
        const where = search
            ? {
                OR: [
                    { name: { contains: search, mode: 'insensitive' } },
                    { surname: { contains: search, mode: 'insensitive' } },
                    { username: { contains: search, mode: 'insensitive' } },
                    { email: { contains: search, mode: 'insensitive' } },
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
    async getUserByUsername(username) {
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
                skills: true,
                achievements: true,
                projectsCreated: {
                    take: 5,
                    orderBy: { createdAt: 'desc' },
                    select: { id: true, title: true, description: true, createdAt: true, category: true, tech: true, demo: true, github: true }
                },
                // İstatistikler
                projects: true,
                events: true,
                followers: true,
                following: true,
            },
        });
        if (!user) {
            const error = new Error("Kullanıcı bulunamadı");
            error.status = 404;
            throw error;
        }
        return user;
    }
    // Kullanıcıya ait projeleri getir
    async getUserProjects(userId) {
        return prisma.project.findMany({
            where: {
                userId,
                isActive: true,
            },
            orderBy: { createdAt: 'desc' },
            select: {
                id: true,
                title: true,
                description: true,
                category: true,
                tech: true,
                demo: true,
                github: true,
                createdAt: true,
                updatedAt: true,
                views: true,
                stars: true,
                forks: true,
            },
        });
    }
    // Kullanıcı istatistiklerini getir
    async getUserStats(userId) {
        const [projectsCount, eventsCount, favoritesCount] = await Promise.all([
            prisma.project.count({ where: { userId, isActive: true } }),
            prisma.eventRegistration.count({ where: { userId } }),
            prisma.blogPost.count({ where: { userId, likes: { gt: 0 } } }), // Şimdilik blog post likes'ları favori olarak sayıyoruz
        ]);
        return {
            projects: projectsCount,
            events: eventsCount,
            favorites: favoritesCount,
        };
    }
}
