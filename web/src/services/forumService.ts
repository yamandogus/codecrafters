import { apiClient } from "./api";

export interface ForumPost {
    id: string;
    title: string;
    content: string;
    category: string;
    views: number;
    likes: number;
    replies: number;
    isPinned: boolean;
    isLocked: boolean;
    createdAt: string;
    user: {
        id: string;
        username: string;
        avatar?: string;
    };
}

export const forumService = {
    getAll: (filters?: { category?: string; search?: string }) => {
        const params = new URLSearchParams();
        if (filters?.category) params.append("category", filters.category);
        if (filters?.search) params.append("search", filters.search);
        return apiClient.get<ForumPost[]>(`/forum?${params.toString()}`);
    },

    getById: (id: string) => {
        return apiClient.get<ForumPost>(`/forum/${id}`);
    },

    create: (data: Partial<ForumPost>) => {
        return apiClient.post<ForumPost>("/forum", data);
    },

    update: (id: string, data: Partial<ForumPost>) => {
        return apiClient.put<ForumPost>(`/forum/${id}`, data);
    },

    delete: (id: string) => {
        return apiClient.delete(`/forum/${id}`);
    }
};
