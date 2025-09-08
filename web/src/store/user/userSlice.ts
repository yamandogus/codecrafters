import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import AuthService from '../../services/auth';
import { LoginRequest, RegisterRequest } from '../../services/api';

export interface User {
  id: string;
  name: string;
  surname: string;
  email: string;
  username: string;
  role?: 'USER' | 'ADMIN' | 'MODERATOR';
}

export interface UserState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  loading: boolean;
  error: string | null;
}

const initialState: UserState = {
  user: null,
  token: null,
  isAuthenticated: false,
  loading: false,
  error: null,
};

// Async Thunks
export const loginUser = createAsyncThunk(
  'user/login',
  async (credentials: LoginRequest, { rejectWithValue }) => {
    try {
      const response = await AuthService.login(credentials);
      if (response.success && response.data) {
        return response.data;
      }
      throw new Error(response.message || 'Giriş başarısız');
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : 'Giriş sırasında hata oluştu';
      return rejectWithValue(errorMessage);
    }
  }
);

export const registerUser = createAsyncThunk(
  'user/register',
  async (userData: RegisterRequest, { rejectWithValue }) => {
    try {
      const response = await AuthService.register(userData);
      if (response.success && response.data) {
        return response.data;
      }
      throw new Error(response.message || 'Kayıt başarısız');
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : 'Kayıt sırasında hata oluştu';
      return rejectWithValue(errorMessage);
    }
  }
);

export const logoutUser = createAsyncThunk(
  'user/logout',
  async (_, { rejectWithValue }) => {
    try {
      await AuthService.logout();
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : 'Çıkış sırasında hata oluştu';
      return rejectWithValue(errorMessage);
    }
  }
);

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    restoreUser: (state) => {
      // Redux persist ile otomatik olarak restore edilecek
      const token = AuthService.getToken();
      if (token && AuthService.isAuthenticated()) {
        state.token = token;
        state.isAuthenticated = true;
        // Kullanıcı bilgilerini token'dan al
        const currentUser = AuthService.getCurrentUser();
        if (currentUser) {
          // Token'dan sadece userId ve email geldiği için user objesini güncellemiyoruz
          // Gerçek uygulamada burada bir API çağrısı yapabilirsiniz
          state.isAuthenticated = true;
        }
      }
    },
    setUser: (state, action: PayloadAction<User>) => {
      state.user = action.payload;
    },
  },
  extraReducers: (builder) => {
    // Login
    builder
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
        state.token = action.payload.token;
        state.isAuthenticated = true;
        state.error = null;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
        state.isAuthenticated = false;
      })
      
      // Register
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
        state.token = action.payload.token;
        state.isAuthenticated = true;
        state.error = null;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
        state.isAuthenticated = false;
      })
      
      // Logout
      .addCase(logoutUser.fulfilled, (state) => {
        state.user = null;
        state.token = null;
        state.isAuthenticated = false;
        state.loading = false;
        state.error = null;
      });
  },
});

export const { clearError, restoreUser, setUser } = userSlice.actions;

export default userSlice.reducer;
