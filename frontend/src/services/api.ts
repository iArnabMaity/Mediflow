// API Service for MediFlow
import axios, { AxiosError, AxiosInstance, AxiosRequestConfig } from 'axios';
import { API_BASE_URL, STORAGE_KEYS, API_ENDPOINTS } from '../constants';
import {
  AuthResponse,
  LoginCredentials,
  SignupData,
  User,
  Appointment,
  CreateAppointmentPayload,
  UpdateAppointmentPayload,
  MedicalRecord,
  UploadRecordPayload,
  Provider,
  PaginatedResponse,
  ErrorResponse,
  ApiResponse,
} from '../types';
import { getFromLocalStorage, setToLocalStorage } from '../utils/helpers';

// ============ API CLIENT SETUP ============

export const apiClient: AxiosInstance = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 30000,
});

// Request interceptor to add auth token
apiClient.interceptors.request.use(
  (config) => {
    const token = getFromLocalStorage<string>(STORAGE_KEYS.AUTH_TOKEN);
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor to handle auth errors
apiClient.interceptors.response.use(
  (response) => response,
  (error: AxiosError) => {
    if (error.response?.status === 401) {
      // Unauthorized - clear token and redirect to login
      localStorage.removeItem(STORAGE_KEYS.AUTH_TOKEN);
      localStorage.removeItem(STORAGE_KEYS.USER);
      // Note: Actual redirect should be handled by the app's auth context
    }
    return Promise.reject(error);
  }
);

// ============ AUTHENTICATION ENDPOINTS ============

export const authService = {
  login: async (credentials: LoginCredentials): Promise<AuthResponse> => {
    const response = await apiClient.post<AuthResponse>(
      API_ENDPOINTS.AUTH_LOGIN,
      credentials
    );
    
    // Store token and user
    setToLocalStorage(STORAGE_KEYS.AUTH_TOKEN, response.data.token);
    if (response.data.refreshToken) {
      setToLocalStorage(STORAGE_KEYS.REFRESH_TOKEN, response.data.refreshToken);
    }
    setToLocalStorage(STORAGE_KEYS.USER, response.data.user);
    
    return response.data;
  },

  signup: async (data: SignupData): Promise<AuthResponse> => {
    const response = await apiClient.post<AuthResponse>(
      API_ENDPOINTS.AUTH_SIGNUP,
      data
    );
    
    // Store token and user
    setToLocalStorage(STORAGE_KEYS.AUTH_TOKEN, response.data.token);
    if (response.data.refreshToken) {
      setToLocalStorage(STORAGE_KEYS.REFRESH_TOKEN, response.data.refreshToken);
    }
    setToLocalStorage(STORAGE_KEYS.USER, response.data.user);
    
    return response.data;
  },

  logout: async (): Promise<void> => {
    try {
      await apiClient.post(API_ENDPOINTS.AUTH_LOGOUT);
    } finally {
      // Clear token and user regardless of API response
      localStorage.removeItem(STORAGE_KEYS.AUTH_TOKEN);
      localStorage.removeItem(STORAGE_KEYS.REFRESH_TOKEN);
      localStorage.removeItem(STORAGE_KEYS.USER);
    }
  },

  refreshToken: async (): Promise<AuthResponse> => {
    const refreshToken = getFromLocalStorage<string>(STORAGE_KEYS.REFRESH_TOKEN);
    if (!refreshToken) {
      throw new Error('No refresh token available');
    }

    const response = await apiClient.post<AuthResponse>(
      API_ENDPOINTS.AUTH_REFRESH,
      { refreshToken }
    );
    
    setToLocalStorage(STORAGE_KEYS.AUTH_TOKEN, response.data.token);
    if (response.data.refreshToken) {
      setToLocalStorage(STORAGE_KEYS.REFRESH_TOKEN, response.data.refreshToken);
    }
    
    return response.data;
  },

  verify: async (): Promise<User> => {
    const response = await apiClient.get<User>(API_ENDPOINTS.AUTH_VERIFY);
    return response.data;
  },
};

// ============ USER ENDPOINTS ============

export const userService = {
  getProfile: async (): Promise<User> => {
    const response = await apiClient.get<User>(API_ENDPOINTS.USER_PROFILE);
    return response.data;
  },

  updateProfile: async (data: Partial<User>): Promise<User> => {
    const response = await apiClient.put<User>(
      API_ENDPOINTS.USER_UPDATE_PROFILE,
      data
    );
    setToLocalStorage(STORAGE_KEYS.USER, response.data);
    return response.data;
  },

  changePassword: async (
    currentPassword: string,
    newPassword: string
  ): Promise<void> => {
    await apiClient.post(API_ENDPOINTS.USER_CHANGE_PASSWORD, {
      currentPassword,
      newPassword,
    });
  },

  deleteAccount: async (): Promise<void> => {
    await apiClient.delete(API_ENDPOINTS.USER_DELETE);
    localStorage.removeItem(STORAGE_KEYS.AUTH_TOKEN);
    localStorage.removeItem(STORAGE_KEYS.USER);
  },
};

// ============ APPOINTMENT ENDPOINTS ============

export const appointmentService = {
  list: async (params?: {
    page?: number;
    limit?: number;
    status?: string;
    providerId?: string;
    dateFrom?: string;
    dateTo?: string;
  }): Promise<PaginatedResponse<Appointment>> => {
    const response = await apiClient.get<PaginatedResponse<Appointment>>(
      API_ENDPOINTS.APPOINTMENTS_LIST,
      { params }
    );
    return response.data;
  },

  get: async (id: string): Promise<Appointment> => {
    const response = await apiClient.get<Appointment>(
      API_ENDPOINTS.APPOINTMENTS_GET.replace(':id', id)
    );
    return response.data;
  },

  create: async (data: CreateAppointmentPayload): Promise<Appointment> => {
    const response = await apiClient.post<Appointment>(
      API_ENDPOINTS.APPOINTMENTS_CREATE,
      data
    );
    return response.data;
  },

  update: async (
    id: string,
    data: UpdateAppointmentPayload
  ): Promise<Appointment> => {
    const response = await apiClient.put<Appointment>(
      API_ENDPOINTS.APPOINTMENTS_UPDATE.replace(':id', id),
      data
    );
    return response.data;
  },

  cancel: async (id: string): Promise<Appointment> => {
    const response = await apiClient.post<Appointment>(
      API_ENDPOINTS.APPOINTMENTS_CANCEL.replace(':id', id)
    );
    return response.data;
  },

  reschedule: async (
    id: string,
    newDate: string,
    newTime: string
  ): Promise<Appointment> => {
    const response = await apiClient.post<Appointment>(
      API_ENDPOINTS.APPOINTMENTS_RESCHEDULE.replace(':id', id),
      { date: newDate, time: newTime }
    );
    return response.data;
  },

  getAvailableSlots: async (
    providerId: string,
    dateFrom: string,
    dateTo: string
  ): Promise<any[]> => {
    const response = await apiClient.get<any[]>(
      API_ENDPOINTS.APPOINTMENTS_AVAILABLE_SLOTS.replace(':providerId', providerId),
      { params: { dateFrom, dateTo } }
    );
    return response.data;
  },
};

// ============ MEDICAL RECORDS ENDPOINTS ============

export const recordService = {
  list: async (params?: {
    page?: number;
    limit?: number;
    type?: string;
    dateFrom?: string;
    dateTo?: string;
  }): Promise<PaginatedResponse<MedicalRecord>> => {
    const response = await apiClient.get<PaginatedResponse<MedicalRecord>>(
      API_ENDPOINTS.RECORDS_LIST,
      { params }
    );
    return response.data;
  },

  get: async (id: string): Promise<MedicalRecord> => {
    const response = await apiClient.get<MedicalRecord>(
      API_ENDPOINTS.RECORDS_GET.replace(':id', id)
    );
    return response.data;
  },

  create: async (data: UploadRecordPayload): Promise<MedicalRecord> => {
    const formData = new FormData();
    formData.append('type', data.type);
    formData.append('title', data.title);
    if (data.description) {
      formData.append('description', data.description);
    }
    if (data.file) {
      formData.append('file', data.file);
    }
    if (data.metadata) {
      formData.append('metadata', JSON.stringify(data.metadata));
    }

    const response = await apiClient.post<MedicalRecord>(
      API_ENDPOINTS.RECORDS_CREATE,
      formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      }
    );
    return response.data;
  },

  upload: async (file: File, metadata?: Record<string, any>): Promise<MedicalRecord> => {
    const formData = new FormData();
    formData.append('file', file);
    if (metadata) {
      formData.append('metadata', JSON.stringify(metadata));
    }

    const response = await apiClient.post<MedicalRecord>(
      API_ENDPOINTS.RECORDS_UPLOAD,
      formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      }
    );
    return response.data;
  },

  delete: async (id: string): Promise<void> => {
    await apiClient.delete(API_ENDPOINTS.RECORDS_DELETE.replace(':id', id));
  },

  export: async (format: 'pdf' | 'json' = 'pdf'): Promise<Blob> => {
    const response = await apiClient.get(
      API_ENDPOINTS.RECORDS_EXPORT,
      {
        params: { format },
        responseType: 'blob',
      }
    );
    return response.data;
  },
};

// ============ PROVIDER ENDPOINTS ============

export const providerService = {
  list: async (params?: {
    page?: number;
    limit?: number;
    search?: string;
    specialization?: string;
  }): Promise<PaginatedResponse<Provider>> => {
    const response = await apiClient.get<PaginatedResponse<Provider>>(
      API_ENDPOINTS.PROVIDERS_LIST,
      { params }
    );
    return response.data;
  },

  get: async (id: string): Promise<Provider> => {
    const response = await apiClient.get<Provider>(
      API_ENDPOINTS.PROVIDERS_GET.replace(':id', id)
    );
    return response.data;
  },

  search: async (query: string): Promise<Provider[]> => {
    const response = await apiClient.get<Provider[]>(
      API_ENDPOINTS.PROVIDERS_SEARCH,
      { params: { q: query } }
    );
    return response.data;
  },

  bySpecialization: async (specialization: string): Promise<Provider[]> => {
    const response = await apiClient.get<Provider[]>(
      API_ENDPOINTS.PROVIDERS_BY_SPECIALIZATION.replace(':specialization', specialization)
    );
    return response.data;
  },
};

// ============ HEALTH CHECK ============

export const healthService = {
  check: async (): Promise<{ status: string; timestamp: string }> => {
    const response = await apiClient.get<{ status: string; timestamp: string }>(
      API_ENDPOINTS.HEALTH_CHECK
    );
    return response.data;
  },
};

// ============ ERROR HANDLING ============

export const handleApiError = (error: unknown): ErrorResponse => {
  if (axios.isAxiosError(error)) {
    const status = error.response?.status || 500;
    const data = error.response?.data as any;
    
    return {
      message: data?.message || error.message,
      code: data?.code || `ERROR_${status}`,
      details: data?.details,
      status,
    };
  }

  if (error instanceof Error) {
    return {
      message: error.message,
      code: 'UNKNOWN_ERROR',
      status: 500,
    };
  }

  return {
    message: 'An unknown error occurred',
    code: 'UNKNOWN_ERROR',
    status: 500,
  };
};

export default apiClient;
