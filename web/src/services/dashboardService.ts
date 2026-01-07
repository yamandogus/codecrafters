import { apiClient } from "./api";
import { Event } from "./eventsService";
import { Job } from "./jobsService";

export interface DashboardStats {
    totalApplications: number;
    totalEvents: number;
}

export interface DashboardData {
    stats: DashboardStats;
    upcomingEvents: Event[];
    recentApplications: {
        id: string;
        status: string;
        appliedAt: string;
        job: Partial<Job>;
    }[];
}

export const dashboardService = {
    getUserDashboard: () => {
        return apiClient.get<DashboardData>("/dashboard/user");
    }
};
