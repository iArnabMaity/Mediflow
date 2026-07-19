// API Interceptor Middleware
import { AxiosError, AxiosRequestConfig } from 'axios';
import { apiClient } from '../services/api';
import { STORAGE_KEYS } from '../constants';
import { getFromLocalStorage, setToLocalStorage } from '../utils/helpers';

// Track if we're already refreshing the token to avoid multiple refresh calls
let isRefreshing = false;
let failedQueue: Array<{
  resolve: (value: string) => void;
  reject: (reason?: any) => void;
}> = [];

const processQueue = (
  error: AxiosError | null,
  token: string | null = null
) => {
  failedQueue.forEach((prom) => {
    if (error) {
      prom.reject(error);
    } else if (token) {
      prom.resolve(token);
    }
  });

  failedQueue = [];
};

export const setupApiInterceptors = () => {
  // Request interceptor - add token to headers
  apiClient.interceptors.request.use(
    (config) => {
      const token = getFromLocalStorage<string>(STORAGE_KEYS.AUTH_TOKEN);
      if (token) {
        config.headers = config.headers || {};
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    },
    (error) => Promise.reject(error)
  );

  // Response interceptor - handle 401 and refresh token
  apiClient.interceptors.response.use(
    (response) => response,
    async (error: AxiosError) => {
      const originalRequest = error.config as any;

      if (error.response?.status === 401 && !originalRequest._retry) {
        if (isRefreshing) {
          return new Promise((resolve, reject) => {
            failedQueue.push({ resolve, reject });
          })
            .then((token) => {
              if (originalRequest.headers) {
                originalRequest.headers.Authorization = `Bearer ${token}`;
              }
              return apiClient(originalRequest);
            })
            .catch((err) => Promise.reject(err));
        }

        originalRequest._retry = true;
        isRefreshing = true;

        try {
          const refreshToken = getFromLocalStorage<string>(STORAGE_KEYS.REFRESH_TOKEN);
          if (!refreshToken) {
            throw new Error('No refresh token available');
          }

          const response = await apiClient.post('/auth/refresh', { refreshToken });
          const { token, refreshToken: newRefreshToken } = response.data;

          setToLocalStorage(STORAGE_KEYS.AUTH_TOKEN, token);
          if (newRefreshToken) {
            setToLocalStorage(STORAGE_KEYS.REFRESH_TOKEN, newRefreshToken);
          }

          if (originalRequest.headers) {
            originalRequest.headers.Authorization = `Bearer ${token}`;
          }

          processQueue(null, token);
          return apiClient(originalRequest);
        } catch (err) {
          processQueue(err as AxiosError, null);

          // Clear auth data and redirect to login
          localStorage.removeItem(STORAGE_KEYS.AUTH_TOKEN);
          localStorage.removeItem(STORAGE_KEYS.USER);
          
          // Note: Actual redirect should be handled by the app's router
          // You might dispatch an action or set a flag here

          return Promise.reject(err);
        } finally {
          isRefreshing = false;
        }
      }

      return Promise.reject(error);
    }
  );
};


export default setupApiInterceptors;
