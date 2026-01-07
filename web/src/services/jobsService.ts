import { apiClient } from "./api";

export interface Job {
    id: string;
    title: string;
    description: string;
    company: string;
    location: string;
    type: string;
    category: string;
    skills: string[];
    salary?: string;
    postedDate: string;
    isRemote: boolean;
    status: string;
}

export const jobService = {
    getAll: (filters?: { category?: string; search?: string; type?: string }) => {
        const params = new URLSearchParams();
        if (filters?.category) params.append("category", filters.category);
        if (filters?.type) params.append("type", filters.type);
        if (filters?.search) params.append("search", filters.search);
        return apiClient.get<Job[]>(`/jobs?${params.toString()}`);
    },

    getById: (id: string) => {
        return apiClient.get<Job>(`/jobs/${id}`);
    },

    create: (data: Partial<Job>) => {
        return apiClient.post<Job>("/jobs", data);
    },

    update: (id: string, data: Partial<Job>) => {
        return apiClient.put<Job>(`/jobs/${id}`, data);
    },

    delete: (id: string) => {
        return apiClient.delete(`/jobs/${id}`);
    },

    apply: (id: string, data: any) => {
        return apiClient.post(`/jobs/${id}/apply`, data);
    },

    getMyApplications: () => {
        return apiClient.get<any[]>("/jobs/applications/me");
    }
};
