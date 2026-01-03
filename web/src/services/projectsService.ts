import { apiClient } from "./api";

export interface Project {
    id: string;
    title: string;
    description: string;
    category: string;
    image?: string;
    tech: string[];
    demo?: string;
    github?: string;
    userId: string;
    user?: {
        id: string;
        username: string;
        avatar?: string;
    };
}

export const projectService = {
    getAll: (filters?: { category?: string; search?: string }) => {
        const params = new URLSearchParams();
        if (filters?.category) params.append("category", filters.category);
        if (filters?.search) params.append("search", filters.search);
        return apiClient.get<Project[]>(`/projects?${params.toString()}`);
    },

    getById: (id: string) => {
        return apiClient.get<Project>(`/projects/${id}`);
    },

    create: (data: Partial<Project>) => {
        return apiClient.post<Project>("/projects", data);
    },

    update: (id: string, data: Partial<Project>) => {
        return apiClient.put<Project>(`/projects/${id}`, data);
    },

    delete: (id: string) => {
        return apiClient.delete(`/projects/${id}`);
    }
};
