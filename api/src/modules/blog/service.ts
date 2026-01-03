import { PrismaClient, BlogCategory } from "@prisma/client";
import { CreateBlogDTO, UpdateBlogDTO } from "../../dto/blogDto";

const prisma = new PrismaClient();

export class BlogService {
    async create(userId: string, data: CreateBlogDTO) {
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
                category: data.category as BlogCategory,
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

    async getAll(filters?: { category?: string; search?: string }) {
        const where: any = { isPublished: true };

        if (filters?.category && filters.category !== 'all') {
            where.category = filters.category as BlogCategory;
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

    async getById(id: string) {
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

    async update(id: string, userId: string, data: UpdateBlogDTO, userRole: string) {
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
                category: data.category ? (data.category as BlogCategory) : undefined
            }
        });
    }

    async delete(id: string, userId: string, userRole: string) {
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

    // Like / Unlike functionality could be added here
}
