import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
export class BlogService {
    async create(userId, data) {
        // Okuma süresi hesaplama (basit bir yaklaşım: ortalama 200 kelime/dakika)
        const wordCount = data.content.split(/\s+/).length;
        const readTime = `${Math.ceil(wordCount / 200)} dk okuma`;
        // Yazar ismini user tablosundan alalım
        const user = await prisma.user.findUnique({
            where: { id: userId },
            select: { name: true, surname: true }
        });
        const authorName = data.author || `${user?.name} ${user?.surname}`;
        return prisma.blogPost.create({
            data: {
                ...data,
                category: data.category,
                userId,
                author: authorName,
                readTime,
                date: new Date(),
            },
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
            }
        });
    }
    async getAll(filters) {
        const where = { isPublished: true };
        if (filters?.category && filters.category !== 'all') {
            where.category = filters.category;
        }
        if (filters?.search) {
            where.OR = [
                { title: { contains: filters.search, mode: 'insensitive' } },
                { content: { contains: filters.search, mode: 'insensitive' } },
                { tags: { hasSome: [filters.search] } } // Basit tag araması
            ];
        }
        return prisma.blogPost.findMany({
            where,
            orderBy: { date: 'desc' },
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
            }
        });
    }
    async getById(id) {
        // Görüntülenme sayısını artır
        await prisma.blogPost.update({
            where: { id },
            data: { views: { increment: 1 } }
        });
        return prisma.blogPost.findUnique({
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
                    orderBy: { createdAt: 'desc' }
                }
            }
        });
    }
    async update(id, userId, data, userRole) {
        const post = await prisma.blogPost.findUnique({ where: { id } });
        if (!post) {
            throw { status: 404, message: "Blog yazısı bulunamadı" };
        }
        if (post.userId !== userId && userRole !== 'ADMIN') {
            throw { status: 403, message: "Bu işlem için yetkiniz yok" };
        }
        return prisma.blogPost.update({
            where: { id },
            data: {
                ...data,
                category: data.category ? data.category : undefined
            }
        });
    }
    async delete(id, userId, userRole) {
        const post = await prisma.blogPost.findUnique({ where: { id } });
        if (!post) {
            throw { status: 404, message: "Blog yazısı bulunamadı" };
        }
        if (post.userId !== userId && userRole !== 'ADMIN') {
            throw { status: 403, message: "Bu işlem için yetkiniz yok" };
        }
        return prisma.blogPost.delete({
            where: { id }
        });
    }
}
