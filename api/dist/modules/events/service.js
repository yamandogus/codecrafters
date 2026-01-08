import { PrismaClient, EventStatus } from "@prisma/client";
const prisma = new PrismaClient();
export class EventService {
    async create(data) {
        return prisma.event.create({
            data: {
                ...data,
                category: data.category,
                startDate: new Date(data.startDate),
                endDate: new Date(data.endDate),
                maxParticipants: data.maxParticipants ? Number(data.maxParticipants) : null,
            }
        });
    }
    async getAll(filters) {
        const where = { status: { not: EventStatus.CANCELLED } };
        if (filters?.category && filters.category !== 'all') {
            where.category = filters.category;
        }
        if (filters?.search) {
            where.OR = [
                { title: { contains: filters.search, mode: 'insensitive' } },
                { description: { contains: filters.search, mode: 'insensitive' } },
                { organizer: { contains: filters.search, mode: 'insensitive' } },
                { tags: { hasSome: [filters.search] } }
            ];
        }
        return prisma.event.findMany({
            where,
            orderBy: { startDate: 'asc' },
        });
    }
    async getById(id) {
        return prisma.event.findUnique({
            where: { id },
            include: {
                registrations: {
                    select: {
                        user: {
                            select: {
                                id: true,
                                name: true,
                                surname: true,
                                avatar: true
                            }
                        }
                    }
                }
            }
        });
    }
    async update(id, data) {
        return prisma.event.update({
            where: { id },
            data: {
                ...data,
                category: data.category ? data.category : undefined,
                startDate: data.startDate ? new Date(data.startDate) : undefined,
                endDate: data.endDate ? new Date(data.endDate) : undefined,
                status: data.status ? data.status : undefined,
                maxParticipants: data.maxParticipants ? Number(data.maxParticipants) : undefined,
            }
        });
    }
    async delete(id) {
        return prisma.event.delete({ where: { id } });
    }
    async registerUser(eventId, userId) {
        const event = await prisma.event.findUnique({ where: { id: eventId } });
        if (!event)
            throw { status: 404, message: "Etkinlik bulunamadı" };
        if (event.maxParticipants && event.currentParticipants >= event.maxParticipants) {
            throw { status: 400, message: "Kontenjan dolu" };
        }
        const existing = await prisma.eventRegistration.findUnique({
            where: { eventId_userId: { eventId, userId } }
        });
        if (existing)
            throw { status: 400, message: "Zaten kayıtlısınız" };
        const transaction = await prisma.$transaction([
            prisma.eventRegistration.create({
                data: { eventId, userId }
            }),
            prisma.event.update({
                where: { id: eventId },
                data: { currentParticipants: { increment: 1 } }
            })
        ]);
        return transaction[0];
    }
    async unregisterUser(eventId, userId) {
        const existing = await prisma.eventRegistration.findUnique({
            where: { eventId_userId: { eventId, userId } }
        });
        if (!existing)
            throw { status: 400, message: "Kayıt bulunamadı" };
        const transaction = await prisma.$transaction([
            prisma.eventRegistration.delete({
                where: { eventId_userId: { eventId, userId } }
            }),
            prisma.event.update({
                where: { id: eventId },
                data: { currentParticipants: { decrement: 1 } }
            })
        ]);
        return transaction[0];
    }
    async getUserRegistrations(userId) {
        return prisma.event.findMany({
            where: {
                registrations: {
                    some: { userId }
                }
            },
            include: {
                registrations: {
                    where: { userId }
                }
            },
            orderBy: { startDate: 'asc' },
        });
    }
}
