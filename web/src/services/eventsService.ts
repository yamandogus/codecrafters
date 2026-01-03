import { apiClient } from "./api";

export interface Event {
    id: string;
    title: string;
    description: string;
    longDescription?: string;
    category: string;
    startDate: string;
    endDate: string;
    location: string;
    isOnline: boolean;
    maxParticipants?: number;
    currentParticipants: number;
    organizer: string;
    tags: string[];
    image?: string;
    status: 'UPCOMING' | 'ONGOING' | 'COMPLETED' | 'CANCELLED';
    price?: string;
    registrations?: any[];
}

export const eventService = {
    getAll: (filters?: { category?: string; search?: string }) => {
        const params = new URLSearchParams();
        if (filters?.category) params.append("category", filters.category);
        if (filters?.search) params.append("search", filters.search);
        return apiClient.get<Event[]>(`/events?${params.toString()}`);
    },

    getById: (id: string) => {
        return apiClient.get<Event>(`/events/${id}`);
    },

    create: (data: Partial<Event>) => {
        return apiClient.post<Event>("/events", data);
    },

    update: (id: string, data: Partial<Event>) => {
        return apiClient.put<Event>(`/events/${id}`, data);
    },

    delete: (id: string) => {
        return apiClient.delete(`/events/${id}`);
    },

    register: (id: string) => {
        return apiClient.post(`/events/${id}/register`);
    },

    unregister: (id: string) => {
        return apiClient.delete(`/events/${id}/register`);
    }
};
