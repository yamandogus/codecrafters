// API Client - Backend ile iletişim için temel yapılandırma
// Hardcoded for debugging to ensure we hit the correct endpoint
const API_BASE_URL = 'http://localhost:3001/api';
// const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/api';

export interface ApiResponse<T = unknown> {
  success: boolean;
  message: string;
  data?: T;
  errors?: Record<string, unknown>;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest {
  name: string;
  surname: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export interface User {
  id: string;
  name: string;
  surname: string;
  email: string;
  username: string;
  role?: 'USER' | 'ADMIN' | 'MODERATOR';
}

export interface AuthResponse {
  user: User;
  token: string;
  refreshToken?: string;
}

class ApiClient {
  private baseURL: string;

  constructor(baseURL: string = API_BASE_URL) {
    this.baseURL = baseURL;
  }

  private async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<ApiResponse<T>> {
    const url = `${this.baseURL}${endpoint}`;

    const config: RequestInit = {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      credentials: 'include', // Session cookies için gerekli
      ...options,
    };

    // Token varsa header'a ekle
    const token = localStorage.getItem('auth_token');
    if (token) {
      config.headers = {
        ...config.headers,
        Authorization: `Bearer ${token}`,
      };
    }

    try {
      let response = await fetch(url, config);
      if (response.status === 401) {
        // access token expired -> try refresh
        const refreshed = await (await import('./auth')).default.refreshTokens();
        if (refreshed) {
          const newToken = localStorage.getItem('auth_token');
          if (newToken) {
            config.headers = {
              ...config.headers,
              Authorization: `Bearer ${newToken}`,
            };
          }
          response = await fetch(url, config);
        }
      }

      const data = await response.json();

      if (!response.ok) {
        console.error(`[API Error] Request to ${url} failed with status ${response.status} - ${response.statusText}`);
        console.error('Error details:', data);
        
        // Validation error'ları için özel mesaj
        if (Array.isArray(data.message)) {
          const errorMessages = data.message.join(', ');
          throw new Error(errorMessages);
        }
        
        throw new Error(data.message || data.error || 'Bir hata oluştu');
      }

      // NestJS response formatını ApiResponse formatına çevir
      // Eğer zaten ApiResponse formatındaysa olduğu gibi döndür
      if (data.success !== undefined) {
        return data;
      }
      
      // NestJS doğrudan obje döndürüyorsa wrapper'a al
      return {
        success: true,
        message: data.message || 'Success',
        data: data,
      };
    } catch (error) {
      if (error instanceof Error) {
        throw error;
      }
      throw new Error('Bilinmeyen bir hata oluştu');
    }
  }

  // GET isteği
  async get<T>(endpoint: string): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, { 
      method: 'GET',
      credentials: 'include',
    });
  }

  // POST isteği
  async post<T>(endpoint: string, data?: unknown): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, {
      method: 'POST',
      body: data ? JSON.stringify(data) : undefined,
      credentials: 'include',
    });
  }

  // PUT isteği
  async put<T>(endpoint: string, data?: unknown): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, {
      method: 'PUT',
      body: data ? JSON.stringify(data) : undefined,
    });
  }

  // DELETE isteği
  async delete<T>(endpoint: string): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, { method: 'DELETE' });
  }
}

export const apiClient = new ApiClient();