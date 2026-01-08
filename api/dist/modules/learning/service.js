import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
export class LearningService {
    async create(data) {
        return prisma.learningResource.create({
            data: {
                ...data,
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
                { description: { contains: filters.search, mode: 'insensitive' } },
                { tags: { hasSome: [filters.search] } }
            ];
        }
        return prisma.learningResource.findMany({
            where,
            orderBy: { createdAt: 'desc' },
        });
    }
    async getById(id) {
        return prisma.learningResource.findUnique({
            where: { id },
        });
    }
    async update(id, data) {
        return prisma.learningResource.update({
            where: { id },
            data: {
                ...data,
            }
        });
    }
    async delete(id) {
        return prisma.learningResource.delete({ where: { id } });
    }
}
