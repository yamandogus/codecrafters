import { PrismaClient, ProjectCategory, Prisma } from "@prisma/client";
import { CreateProjectDTO, UpdateProjectDTO } from "../../dto/projectsDto";

const prisma = new PrismaClient();

export class ProjectService {
    async create(userId: string, data: CreateProjectDTO) {
        return prisma.project.create({
            data: {
                ...data,
                userId,
                category: data.category as ProjectCategory,
            }
        });
    }

    async getAll(filters?: { category?: string; search?: string }) {
        const where: Prisma.ProjectWhereInput = { isActive: true };

        if (filters?.category && filters.category !== 'all') {
            where.category = filters.category as ProjectCategory;
        }

        if (filters?.search) {
            where.OR = [
                { title: { contains: filters.search, mode: 'insensitive' } },
                { description: { contains: filters.search, mode: 'insensitive' } },
                { tech: { hasSome: [filters.search] } }
            ];
        }

        return prisma.project.findMany({
            where,
            orderBy: { createdAt: 'desc' },
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

    async getById(id: string) {
        // Görüntülenme sayısını artır
        await prisma.project.update({ where: { id }, data: { views: { increment: 1 } } });

        return prisma.project.findUnique({
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

    async update(id: string, userId: string, data: UpdateProjectDTO, userRole: string) {
        const project = await prisma.project.findUnique({ where: { id } });

        if (!project) throw { status: 404, message: "Proje bulunamadı" };

        if (project.userId !== userId && userRole !== 'ADMIN') {
            throw { status: 403, message: "Bu işlem için yetkiniz yok" };
        }

        return prisma.project.update({
            where: { id },
            data: {
                ...data,
                category: data.category ? (data.category as ProjectCategory) : undefined,
            }
        });
    }

    async delete(id: string, userId: string, userRole: string) {
        const project = await prisma.project.findUnique({ where: { id } });

        if (!project) throw { status: 404, message: "Proje bulunamadı" };

        if (project.userId !== userId && userRole !== 'ADMIN') {
            throw { status: 403, message: "Bu işlem için yetkiniz yok" };
        }

        return prisma.project.delete({ where: { id } });
    }
}
