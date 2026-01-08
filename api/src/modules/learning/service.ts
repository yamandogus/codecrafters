import { PrismaClient, Prisma } from "@prisma/client";
import { CreateLearningDTO, UpdateLearningDTO } from "../../dto/learningDto.js";

const prisma = new PrismaClient();

export class LearningService {
    async create(data: CreateLearningDTO) {
        return prisma.learningResource.create({
            data: {
                ...data,
            }
        });
    }

    async getAll(filters?: { category?: string; search?: string }) {
        const where: Prisma.LearningResourceWhereInput = { isActive: true };

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

    async getById(id: string) {
        return prisma.learningResource.findUnique({
            where: { id },
        });
    }

    async update(id: string, data: UpdateLearningDTO) {
        return prisma.learningResource.update({
            where: { id },
            data: {
                ...data,
            }
        });
    }

    async delete(id: string) {
        return prisma.learningResource.delete({ where: { id } });
    }
}
