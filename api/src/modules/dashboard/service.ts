import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export class DashboardService {
    async getUserDashboardStats(userId: string) {
        // Parallel fetching for performance
        const [
            applicationsCount,
            registrationsCount,
            upcomingEvents,
            recentApplications
        ] = await Promise.all([
            prisma.jobApplication.count({ where: { userId } }),
            prisma.eventRegistration.count({ where: { userId } }),
            prisma.event.findMany({
                where: {
                    registrations: { some: { userId } },
                    startDate: { gte: new Date() }
                },
                orderBy: { startDate: 'asc' },
                take: 3,
                select: {
                    id: true,
                    title: true,
                    startDate: true,
                    location: true,
                    isOnline: true,
                    image: true
                }
            }),
            prisma.jobApplication.findMany({
                where: { userId },
                orderBy: { appliedAt: 'desc' },
                take: 3,
                include: {
                    job: {
                        select: {
                            id: true,
                            title: true,
                            company: true,
                            status: true,
                            type: true
                        }
                    }
                }
            })
        ]);

        return {
            stats: {
                totalApplications: applicationsCount,
                totalEvents: registrationsCount,
            },
            upcomingEvents,
            recentApplications
        };
    }
}
