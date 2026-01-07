import { Request } from 'express';
import { UserRole, SkillLevel } from '@prisma/client';

// Express Request tipini genişlet - req.user için
export interface AuthenticatedUser {
  userId: string;
  email: string;
  name: string;
  surname: string | null;
  username: string;
  role: UserRole;
}

// Express Request tipini module augmentation ile genişlet
// express-serve-static-core modülünü genişletiyoruz
declare module 'express-serve-static-core' {
  interface Request {
    user?: AuthenticatedUser;
  }
}

export interface AuthenticatedRequest extends Request {
  user: AuthenticatedUser;
}

// Error tipi
export interface AppError extends Error {
  status?: number;
  statusCode?: number;
  errors?: unknown;
}

// API Response tipi
export interface ApiResponse<T = unknown> {
  success: boolean;
  message?: string;
  data?: T;
  errors?: unknown;
}

// Pagination tipi
export interface PaginationMeta {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}

export interface PaginatedResponse<T> {
  data: T[];
  pagination: PaginationMeta;
}

// Skill Level mapping
export type SkillLevelString = 'BEGINNER' | 'INTERMEDIATE' | 'ADVANCED' | 'EXPERT';

export function mapSkillLevel(level: string): SkillLevel {
  const upperLevel = level.toUpperCase();
  if (upperLevel === 'BEGINNER') return 'BEGINNER';
  if (upperLevel === 'INTERMEDIATE') return 'INTERMEDIATE';
  if (upperLevel === 'ADVANCED') return 'ADVANCED';
  if (upperLevel === 'EXPERT') return 'EXPERT';
  return 'BEGINNER'; // default
}
