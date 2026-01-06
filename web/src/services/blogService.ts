import { apiClient} from "./api";

export interface BlogPost {
    id: string;
    title: string;
    excerpt: string;
    content: string;
    author: string;
    date: string;
    category: string;
    image?: string;
    readTime?: string;
    tags: string[];
    views: number;
    likes: number;
    user?: {
        id: string;
        name: string;
        surname: string;
        avatar?: string;
        username: string;
    };
}

export const blogService = {
    getAll: (filters?: { category?: string; search?: string }) => {
        const params = new URLSearchParams();
        if (filters?.category) params.append("category", filters.category);
        if (filters?.search) params.append("search", filters.search);
        return apiClient.get<BlogPost[]>(`/blog?${params.toString()}`);
    },

    getById: (id: string) => {
        return apiClient.get<BlogPost>(`/blog/${id}`);
    },

    create: (data: Partial<BlogPost>) => {
        return apiClient.post<BlogPost>("/blog", data);
    },

    update: (id: string, data: Partial<BlogPost>) => {
        return apiClient.put<BlogPost>(`/blog/${id}`, data);
    },

    delete: (id: string) => {
        return apiClient.delete(`/blog/${id}`);
    }
};
