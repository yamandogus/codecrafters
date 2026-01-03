import { apiClient } from "./api";

export interface LearningResource {
    id: string;
    title: string;
    description: string;
    category: string;
    duration?: string;
    level?: string;
    rating: number;
    students: number;
    image?: string;
    tags: string[];
}

export const learningService = {
    getAll: (filters?: { category?: string; search?: string }) => {
        const params = new URLSearchParams();
        if (filters?.category) params.append("category", filters.category);
        if (filters?.search) params.append("search", filters.search);
        return apiClient.get<LearningResource[]>(`/learning?${params.toString()}`);
    },

    getById: (id: string) => {
        return apiClient.get<LearningResource>(`/learning/${id}`);
    },

    create: (data: Partial<LearningResource>) => {
        return apiClient.post<LearningResource>("/learning", data);
    },

    update: (id: string, data: Partial<LearningResource>) => {
        return apiClient.put<LearningResource>(`/learning/${id}`, data);
    },

    delete: (id: string) => {
        return apiClient.delete(`/learning/${id}`);
    }
};
