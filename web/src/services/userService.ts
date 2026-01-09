import { ProfileUser } from '@/components/profile/types';
import { BookOpen, Code } from 'lucide-react';
import { apiClient } from './api';
import { UserResponse, ProjectData, BlogPostData, ActivityData } from '@/types/api-types';

export class UserService {
  static async updateProfile(data: Partial<{
    name: string;
    surname: string;
    bio: string;
    location: string;
    website: string;
    github: string;
    linkedin: string;
    phone?: string;
    skills?: { name: string; level: string; color: string }[];
    achievements?: { title: string; description?: string; icon?: string; date?: string }[];
  }>): Promise<ProfileUser | null> {
    try {
      const response = await apiClient.put<UserResponse>('/users/profile', data);
      if (response.success && response.data) {
        const me = await this.getMe();
        return me;
      }
      return null;
    } catch (error) {
      console.error('Error updating profile:', error);
      return null;
    }
  }
  static async getMe(): Promise<ProfileUser | null> {
    try {
      const response = await apiClient.get<UserResponse>('/users/me');
      if (response.success && response.data) {
        return this.adaptUser(response.data);
      }
      return null;
    } catch (error) {
      console.error('Error fetching current user:', error);
      return null;
    }
  }

  static async getUserByUsername(username: string): Promise<ProfileUser | null> {
    try {
      const response = await apiClient.get<UserResponse>(`/users/username/${username}`);
      if (response.success && response.data) {
        return this.adaptUser(response.data);
      }
      return null;
    } catch (error) {
      console.error(`Error fetching user ${username}:`, error);
      return null;
    }
  }

  private static adaptUser(data: any): ProfileUser {
    // Combine name and surname if needed, or just use name if surname is missing
    const fullName = data.surname ? `${data.name} ${data.surname}` : data.name;

    // Adapt stats - use _count if available, otherwise use array lengths
    const stats = {
      projects: data._count?.projectsCreated || data.projectsCreated?.length || 0,
      events: data._count?.eventsRegistered || (data.eventsRegistered?.length) || 0,
      followers: data._count?.followersRelation || data.followers?.length || 0,
      following: data._count?.followingRelation || data.following?.length || 0,
      posts: data._count?.blogPosts || data.blogPosts?.length || 0,
      likes: 0 // Not available in backend response yet
    };

    // Adapt recent activity from projects and blog posts
    const recentActivity: ActivityData[] = [];

    if (data.projectsCreated) {
      data.projectsCreated.forEach((p: ProjectData) => {
        recentActivity.push({
          type: "project",
          title: p.title,
          description: p.description,
          date: p.createdAt,
          icon: Code
        });
      });
    }

    if (data.blogPosts) {
      data.blogPosts.forEach((p: BlogPostData) => {
        recentActivity.push({
          type: "post",
          title: p.title,
          description: p.excerpt || "Blog yazısı",
          date: p.createdAt,
          icon: BookOpen
        });
      });
    }

    // Sort activity by date
    recentActivity.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

    return {
      id: data.id,
      name: fullName,
      username: data.username,
      email: data.email,
      phone: data.phone, // Might not be in backend response yet
      location: data.location,
      bio: data.bio,
      avatar: data.avatar || "https://github.com/shadcn.png", // Default avatar
      coverImage: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=1200&h=300&fit=crop&auto=format", // Default cover
      joinDate: data.createdAt,
      isVerified: false, // Not in backend
      isMentor: false, // Not in backend
      socialLinks: {
        github: data.github,
        linkedin: data.linkedin,
        website: data.website,
        twitter: undefined // Not in backend response explicitly as twitter field, maybe inside another field?
      },
      stats: stats,
      skills: data.skills || [], // Assuming backend returns matching shape or empty
      achievements: data.achievements || [], // Assuming backend returns matching shape or empty
      recentActivity: recentActivity.slice(0, 5), // Limit to 5
      projects: data.projectsCreated?.map((p: ProjectData) => ({
        id: p.id,
        title: p.title,
        description: p.description,
        category: p.category,
        createdAt: p.createdAt,
        tech: p.tech || p.technologies || [],
        demo: p.demo,
        github: p.github || p.githubUrl
      })) || []
    };
  }

  static async getMyStats(): Promise<{ projects: number; events: number; favorites: number } | null> {
    try {
      const response = await apiClient.get<{ projects: number; events: number; favorites: number }>('/users/me/stats');
      if (response.success && response.data) {
        return response.data;
      }
      return null;
    } catch (error) {
      console.error('Error fetching user stats:', error);
      return null;
    }
  }

  static async getMyProjects() {
    try {
      const response = await apiClient.get<ProjectData[]>('/users/me/projects');
      if (response.success && response.data) {
        return response.data;
      }
      return [];
    } catch (error) {
      console.error('Error fetching user projects:', error);
      return [];
    }
  }
}
