import { apiClient, ApiResponse, AuthResponse, LoginRequest, RegisterRequest } from './api';

export class AuthService {
  // Kullanıcı girişi
  static async login(credentials: LoginRequest): Promise<ApiResponse<AuthResponse>> {
    try {
      const response = await apiClient.post<AuthResponse>('/api/auth/login', credentials);
      
      // Başarılı giriş durumunda token'ı localStorage'a kaydet
      if (response.success && response.data?.token) {
        localStorage.setItem('auth_token', response.data.token);
      }
      
      return response;
    } catch (error) {
      throw error;
    }
  }

  // Kullanıcı kayıt
  static async register(userData: RegisterRequest): Promise<ApiResponse<AuthResponse>> {
    try {
      const response = await apiClient.post<AuthResponse>('/api/auth/register', userData);
      
      // Başarılı kayıt durumunda token'ı localStorage'a kaydet
      if (response.success && response.data?.token) {
        localStorage.setItem('auth_token', response.data.token);
      }
      
      return response;
    } catch (error) {
      throw error;
    }
  }

  // Kullanıcı çıkış
  static async logout(): Promise<void> {
    try {
      // Token'ı localStorage'dan kaldır
      localStorage.removeItem('auth_token');
      localStorage.removeItem('persist:root'); // Redux persist'ten de temizle
    } catch {
      console.error('Logout hatası');
    }
  }

  // Token kontrolü
  static getToken(): string | null {
    return localStorage.getItem('auth_token');
  }

  // Kullanıcının giriş yapıp yapmadığını kontrol et
  static isAuthenticated(): boolean {
    const token = this.getToken();
    if (!token) return false;

    try {
      // JWT token'ın geçerliliğini kontrol et (basit exp kontrolü)
      const payload = JSON.parse(atob(token.split('.')[1]));
      const currentTime = Date.now() / 1000;
      
      return payload.exp > currentTime;
    } catch {
      // Token decode edilemezse false döner
      return false;
    }
  }

  // Token'dan kullanıcı bilgilerini al
  static getCurrentUser(): { userId: string; email: string } | null {
    const token = this.getToken();
    if (!token) return null;

    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      return {
        userId: payload.userId,
        email: payload.email,
      };
    } catch {
      return null;
    }
  }
}

export default AuthService;