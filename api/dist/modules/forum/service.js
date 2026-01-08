import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
export class ForumService {
    async create(userId, data) {
        return prisma.forumPost.create({
            data: {
                ...data,
                userId,
                category: data.category,
            }
        });
    }
    async getAll(filters) {
        const where = { isActive: true };
        if (filters?.category && filters.category !== 'all') {
            where.category = filters.category;
        }
        if (filters?.search) {
            where.OR = [
                { title: { contains: filters.search, mode: 'insensitive' } },
                { content: { contains: filters.search, mode: 'insensitive' } },
            ];
        }
        return prisma.forumPost.findMany({
            where,
            orderBy: [
                { isPinned: 'desc' }, // Pinli gönderiler en üstte
                { createdAt: 'desc' }
            ],
            include: {
                user: {
                    select: {
                        id: true,
                        name: true,
                        surname: true,
                        avatar: true,
                        username: true
                    }
                },
                _count: {
                    select: { comments: true }
                }
            }
        });
    }
    async getById(id) {
        await prisma.forumPost.update({ where: { id }, data: { views: { increment: 1 } } });
        return prisma.forumPost.findUnique({
            where: { id },
            include: {
                user: {
                    select: {
                        id: true,
                        name: true,
                        surname: true,
                        avatar: true,
                        username: true,
                        bio: true
                    }
                },
                comments: {
                    include: {
                        user: {
                            select: {
                                id: true,
                                name: true,
                                surname: true,
                                avatar: true,
                                username: true
                            }
                        }
                    },
                    orderBy: { createdAt: 'asc' } // Yorumlar kronolojik sırada
                }
            }
        });
    }
    async update(id, userId, data, userRole) {
        const post = await prisma.forumPost.findUnique({ where: { id } });
        if (!post)
            throw { status: 404, message: "Gönderi bulunamadı" };
        const isOwner = post.userId === userId;
        const canModerate = userRole === 'MODERATOR' || userRole === 'ADMIN';
        if (!isOwner && !canModerate) {
            throw { status: 403, message: "Bu işlem için yetkiniz yok" };
        }
        // Normal kullanıcı sadece kendi gönderisini güncelleyebilir (pin/lock hariç)
        // Pin/Lock yetkisi sadece moderator/admin'de
        if (!canModerate && (data.isPinned !== undefined || data.isLocked !== undefined)) {
            throw { status: 403, message: "Pin/Lock yetkiniz yok" };
        }
        return prisma.forumPost.update({
            where: { id },
            data: {
                ...data,
                category: data.category ? data.category : undefined,
            }
        });
    }
    async delete(id, userId, userRole) {
        const post = await prisma.forumPost.findUnique({ where: { id } });
        if (!post)
            throw { status: 404, message: "Gönderi bulunamadı" };
        if (post.userId !== userId && userRole !== 'MODERATOR' && userRole !== 'ADMIN') {
            throw { status: 403, message: "Bu işlem için yetkiniz yok" };
        }
        return prisma.forumPost.delete({ where: { id } });
    }
}
