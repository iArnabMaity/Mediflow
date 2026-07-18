// Auth Store (Zustand) for MediFlow
import { create } from 'zustand';
import { User, LoginCredentials, SignupData } from '../types';
import { authService, handleApiError } from '../services/api';
import { STORAGE_KEYS } from '../constants';
import { getFromLocalStorage, setToLocalStorage } from '../utils/helpers';

interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
  
  // Actions
  initializeAuth: () => void;
  login: (credentials: LoginCredentials) => Promise<void>;
  signup: (data: SignupData) => Promise<void>;
  logout: () => Promise<void>;
  updateUser: (user: User) => void;
  setError: (error: string | null) => void;
  clearError: () => void;
}

export const useAuthStore = create<AuthState>((set, get) => ({
  user: null,
  token: null,
  isAuthenticated: false,
  isLoading: false,
  error: null,

  initializeAuth: () => {
    try {
      const user = getFromLocalStorage<User>(STORAGE_KEYS.USER);
      const token = getFromLocalStorage<string>(STORAGE_KEYS.AUTH_TOKEN);

      if (user && token) {
        set({
          user,
          token,
          isAuthenticated: true,
        });
      }
    } catch (error) {
      // Silently fail initialization
    }
  },

  login: async (credentials: LoginCredentials) => {
    set({ isLoading: true, error: null });
    try {
      const response = await authService.login(credentials);
      set({
        user: response.user,
        token: response.token,
        isAuthenticated: true,
        isLoading: false,
      });

      if (credentials.rememberMe) {
        setToLocalStorage(STORAGE_KEYS.REMEMBER_ME, true);
      }
    } catch (error) {
      const apiError = handleApiError(error);
      set({
        error: apiError.message,
        isLoading: false,
      });
      throw error;
    }
  },

  signup: async (data: SignupData) => {
    set({ isLoading: true, error: null });
    try {
      const response = await authService.signup(data);
      set({
        user: response.user,
        token: response.token,
        isAuthenticated: true,
        isLoading: false,
      });
    } catch (error) {
      const apiError = handleApiError(error);
      set({
        error: apiError.message,
        isLoading: false,
      });
      throw error;
    }
  },

  logout: async () => {
    set({ isLoading: true, error: null });
    try {
      await authService.logout();
      set({
        user: null,
        token: null,
        isAuthenticated: false,
        isLoading: false,
      });
    } catch (error) {
      const apiError = handleApiError(error);
      set({
        error: apiError.message,
        isLoading: false,
      });
      throw error;
    }
  },

  updateUser: (user: User) => {
    set({ user });
    setToLocalStorage(STORAGE_KEYS.USER, user);
  },

  setError: (error: string | null) => {
    set({ error });
  },

  clearError: () => {
    set({ error: null });
  },
}));

export default useAuthStore;
