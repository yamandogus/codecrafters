import React from 'react';
import { LucideIcon } from 'lucide-react';

export interface ProfileUser {
  id: number | string;
  name: string;
  username: string;
  email: string;
  phone?: string;
  location?: string;
  bio?: string;
  avatar: string;
  coverImage: string;
  joinDate: string;
  isVerified?: boolean;
  isMentor?: boolean;
  socialLinks?: {
    github?: string;
    linkedin?: string;
    twitter?: string;
    website?: string;
  };
  stats: {
    projects: number;
    events: number;
    followers: number;
    following: number;
    posts: number;
    likes: number;
  };
  skills: { name: string; level: string; color: string }[];
  achievements: {
    title: string;
    description: string;
    icon?: React.ReactNode | LucideIcon;
    date: string;
  }[];
  education?: {
    id: string;
    school: string;
    degree: string;
    field: string;
    startDate: string;
    endDate?: string | null;
    description?: string | null;
  }[];
  experience?: {
    id: string;
    title: string;
    company: string;
    startDate: string;
    endDate?: string | null;
    description?: string | null;
  }[];
  recentActivity: {
    type: string;
    title: string;
    description: string;
    date: string;
    icon: React.ReactNode | LucideIcon;
  }[];
}
