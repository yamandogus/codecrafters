import { apiClient, ApiResponse, AuthResponse, LoginRequest, RegisterRequest } from './api';

export class AuthService {
  // Kullanıcı girişi
  static async login(credentials: LoginRequest): Promise<ApiResponse<AuthResponse>> {
    try {
      const response = await apiClient.post<AuthResponse>('/auth/login', credentials);
      
      // Session-based auth kullanılıyor, token localStorage'a kaydetmeye gerek yok
      // Session cookie otomatik olarak tarayıcıda saklanacak
      if (response.success && response.data?.user) {
        // Session-based auth için dummy token
        localStorage.setItem('auth_token', 'session-based');
      }
      
      return response;
    } catch (error) {
      throw error;
    }
  }

  // Kullanıcı kayıt
  static async register(userData: RegisterRequest): Promise<ApiResponse<AuthResponse>> {
    try {
      const response = await apiClient.post<AuthResponse>('/auth/register', userData);
      
      // Başarılı kayıt durumunda token'ı localStorage'a kaydet
      if (response.success && response.data?.token) {
        localStorage.setItem('auth_token', response.data.token);
        if (response.data.refreshToken) {
          localStorage.setItem('refresh_token', response.data.refreshToken);
        }
      }
      
      return response;
    } catch (error) {
      throw error;
    }
  }

  // Kullanıcı çıkış
  static async logout(): Promise<void> {
    try {
      // Backend'e logout isteği gönder (session'ı destroy etmek için)
      await apiClient.post('/auth/logout', {});
    } catch (error) {
      console.error('Backend logout hatası:', error);
      // Backend hatası olsa bile devam et
    } finally {
      // Token'ları localStorage'dan kaldır
      localStorage.removeItem('auth_token');
      localStorage.removeItem('refresh_token');
      localStorage.removeItem('persist:root'); // Redux persist'ten de temizle
    }
  }

  // Token kontrolü
  static getToken(): string | null {
    return localStorage.getItem('auth_token');
  }

  static getRefreshToken(): string | null {
    return localStorage.getItem('refresh_token');
  }

  static async refreshTokens(): Promise<boolean> {
    const refreshToken = this.getRefreshToken();
    if (!refreshToken) return false;
    try {
      const res = await apiClient.post<AuthResponse>('/auth/refresh', { refreshToken });
      if (res.success && res.data?.token) {
        localStorage.setItem('auth_token', res.data.token);
        if (res.data.refreshToken) {
          localStorage.setItem('refresh_token', res.data.refreshToken);
        }
        return true;
      }
      return false;
    } catch {
      return false;
    }
  }

  // Kullanıcının giriş yapıp yapmadığını kontrol et
  static isAuthenticated(): boolean {
    // Session-based auth için token kontrolü yapmıyoruz
    // Backend'deki /auth/check endpoint'i kullanılmalı
    const token = this.getToken();
    return token === 'session-based';
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