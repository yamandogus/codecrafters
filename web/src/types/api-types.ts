import React from 'react';
import { LucideIcon } from 'lucide-react';

// Generic API Response Wrapper
export interface ApiResponse<T> {
    success: boolean;
    data?: T;
    error?: string;
    message?: string;
}

// User Related Types
export interface UserResponse {
    id: number | string;
    username: string;
    email: string;
    name: string;
    surname?: string;
    phone?: string;
    avatar?: string;
    bio?: string;
    location?: string;
    website?: string;
    github?: string;
    linkedin?: string;
    twitter?: string;
    createdAt: string;
    updatedAt?: string;
    skills?: SkillData[];
    achievements?: AchievementData[];
    projectsCreated?: ProjectData[];
    blogPosts?: BlogPostData[];
    events?: EventData[];
    followers?: UserResponse[];
    following?: UserResponse[];
}

export interface SkillData {
    name: string;
    level: string;
    color: string;
}

export interface AchievementData {
    title: string;
    description: string;
    date: string;
    icon?: React.ReactNode | LucideIcon;
}

export interface ProjectData {
    id: string | number;
    title: string;
    description: string;
    createdAt: string;
    updatedAt?: string;
    category?: string;
    tech?: string[];
    demo?: string;
    github?: string;
    technologies?: string[];
    githubUrl?: string;
    liveUrl?: string;
}

export interface BlogPostData {
    id: string | number;
    title: string;
    content: string;
    excerpt?: string;
    createdAt: string;
    updatedAt?: string;
    tags?: string[];
}

// Event Related Types
export interface EventRegistration {
    id: string | number;
    eventId: string | number;
    userId: string | number;
    registeredAt: string;
    status: 'confirmed' | 'pending' | 'cancelled';
}

export interface EventData {
    id: string | number;
    title: string;
    description: string;
    category: string;
    startDate: string;
    endDate: string;
    location: string;
    isOnline: boolean;
    registrations?: EventRegistration[];
}

// Job Related Types
export interface JobApplication {
    id: string | number;
    jobId: string | number;
    userId: string | number;
    appliedAt: string;
    status: 'pending' | 'reviewing' | 'accepted' | 'rejected';
    resume?: string;
    coverLetter?: string;
}

export interface JobApplicationData {
    resume?: string;
    coverLetter?: string;
    portfolio?: string;
}

// Activity Types
export interface ActivityData {
    type: string;
    title: string;
    description: string;
    date: string;
    icon: React.ReactNode | LucideIcon;
}
