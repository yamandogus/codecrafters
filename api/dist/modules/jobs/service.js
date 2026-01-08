import { PrismaClient, JobStatus } from "@prisma/client";
const prisma = new PrismaClient();
export class JobService {
    async create(data) {
        return prisma.job.create({
            data: {
                ...data,
                category: data.category,
                type: data.type,
            }
        });
    }
    async getAll(filters) {
        const where = { status: JobStatus.ACTIVE };
        if (filters?.category && filters.category !== 'all') {
            where.category = filters.category;
        }
        if (filters?.type && filters.type !== 'all') {
            where.type = filters.type;
        }
        if (filters?.search) {
            where.OR = [
                { title: { contains: filters.search, mode: 'insensitive' } },
                { company: { contains: filters.search, mode: 'insensitive' } },
                { description: { contains: filters.search, mode: 'insensitive' } },
            ];
        }
        return prisma.job.findMany({
            where,
            orderBy: { createdAt: 'desc' },
        });
    }
    async getById(id) {
        // İzlenme sayısını artır
        await prisma.job.update({ where: { id }, data: { views: { increment: 1 } } });
        return prisma.job.findUnique({
            where: { id },
            include: {
                _count: {
                    select: { applications: true }
                }
            }
        });
    }
    async update(id, data) {
        return prisma.job.update({
            where: { id },
            data: {
                ...data,
                category: data.category ? data.category : undefined,
                type: data.type ? data.type : undefined,
                status: data.status ? data.status : undefined,
            }
        });
    }
    async delete(id) {
        return prisma.job.delete({ where: { id } });
    }
    async apply(jobId, userId, data) {
        // Check if user already applied
        const existing = await prisma.jobApplication.findFirst({
            where: { jobId, userId }
        });
        if (existing) {
            throw { status: 400, message: "Bu ilana zaten başvurdunuz" };
        }
        const transaction = await prisma.$transaction([
            prisma.jobApplication.create({
                data: {
                    ...data,
                    jobId,
                    userId,
                }
            }),
            prisma.job.update({
                where: { id: jobId },
                data: { applicationCount: { increment: 1 } }
            })
        ]);
        return transaction[0];
    }
    async getApplications(jobId) {
        return prisma.jobApplication.findMany({
            where: { jobId },
            include: {
                user: {
                    select: {
                        id: true,
                        name: true,
                        surname: true,
                        email: true,
                        avatar: true
                    }
                }
            },
            orderBy: { appliedAt: 'desc' }
        });
    }
    async getUserApplications(userId) {
        return prisma.jobApplication.findMany({
            where: { userId },
            include: {
                job: {
                    select: {
                        id: true,
                        title: true,
                        company: true,
                        location: true,
                        type: true,
                        category: true,
                        status: true,
                        createdAt: true
                    }
                }
            },
            orderBy: { appliedAt: 'desc' }
        });
    }
}
