// Type Definitions for MediFlow
import { ReactNode } from 'react';

// ============ USER & AUTHENTICATION ============
export type UserRole = 'patient' | 'doctor' | 'admin' | 'provider';

export interface User {
  id: string;
  name: string;
  email: string;
  phone?: string;
  role: UserRole;
  avatar?: string;
  createdAt: string;
  updatedAt: string;
}

export interface Patient extends User {
  role: 'patient';
  dateOfBirth: string;
  gender?: 'male' | 'female' | 'other';
  address?: string;
  city?: string;
  state?: string;
  zipCode?: string;
  medicalHistory?: string[];
  allergies?: string[];
  emergencyContact?: string;
  emergencyContactPhone?: string;
}

export interface Provider extends User {
  role: 'doctor' | 'provider';
  specialization: string;
  licenseNumber: string;
  hospitalAffiliation?: string;
  yearsOfExperience?: number;
  bio?: string;
  consultationFee?: number;
  availableSlots?: TimeSlot[];
}

export interface TimeSlot {
  id: string;
  dayOfWeek: 'Mon' | 'Tue' | 'Wed' | 'Thu' | 'Fri' | 'Sat' | 'Sun';
  startTime: string;
  endTime: string;
  isAvailable: boolean;
}

// ============ AUTHENTICATION ============
export interface AuthResponse {
  token: string;
  refreshToken?: string;
  user: User;
  expiresIn: number;
}

export interface LoginCredentials {
  email: string;
  password: string;
  rememberMe?: boolean;
}

export interface SignupData {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
  role: UserRole;
  phone?: string;
  acceptTerms: boolean;
}

export interface ErrorResponse {
  message: string;
  code: string;
  details?: Record<string, any>;
  status: number;
}

// ============ APPOINTMENTS ============
export type AppointmentStatus = 'scheduled' | 'completed' | 'cancelled' | 'no-show' | 'rescheduled';

export interface Appointment {
  id: string;
  patientId: string;
  providerId: string;
  patientName?: string;
  providerName?: string;
  providerSpecialization?: string;
  date: string;
  time: string;
  duration: number; // in minutes
  reason: string;
  notes?: string;
  status: AppointmentStatus;
  createdAt: string;
  updatedAt: string;
  meetingLink?: string; // for virtual appointments
  location?: string; // for in-person appointments
}

export interface CreateAppointmentPayload {
  providerId: string;
  date: string;
  time: string;
  reason: string;
  notes?: string;
}

export interface UpdateAppointmentPayload {
  date?: string;
  time?: string;
  reason?: string;
  notes?: string;
  status?: AppointmentStatus;
}

// ============ MEDICAL RECORDS ============
export type RecordType = 'prescription' | 'diagnosis' | 'lab_report' | 'imaging' | 'vaccination' | 'other';

export interface MedicalRecord {
  id: string;
  patientId: string;
  providerId?: string;
  type: RecordType;
  title: string;
  description?: string;
  fileUrl?: string;
  fileName?: string;
  fileType?: string;
  date: string;
  createdAt: string;
  updatedAt: string;
  tags?: string[];
}

export interface Prescription extends MedicalRecord {
  type: 'prescription';
  medication: string;
  dosage: string;
  frequency: string;
  duration: string;
  startDate: string;
  endDate?: string;
  instructions?: string;
}

export interface LabReport extends MedicalRecord {
  type: 'lab_report';
  labName: string;
  testName: string;
  result?: string;
  normalRange?: string;
}

export interface UploadRecordPayload {
  type: RecordType;
  title: string;
  description?: string;
  file?: File;
  metadata?: Record<string, any>;
}

// ============ FORMS ============
export interface FormState<T> {
  values: T;
  errors: FormErrors<T>;
  touched: Partial<Record<keyof T, boolean>>;
  isSubmitting: boolean;
  isValid: boolean;
}

export type FormErrors<T> = Partial<Record<keyof T, string>>;

export interface FormValidationRules<T> {
  [key in keyof T]?: Array<(value: any) => string | undefined>;
}

// ============ NOTIFICATIONS ============
export type NotificationType = 'success' | 'error' | 'warning' | 'info';

export interface Notification {
  id: string;
  type: NotificationType;
  message: string;
  title?: string;
  duration?: number;
  action?: {
    label: string;
    onClick: () => void;
  };
}

// ============ PAGINATION & FILTERING ============
export interface PaginationParams {
  page: number;
  limit: number;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
}

export interface PaginatedResponse<T> {
  data: T[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
    hasNextPage: boolean;
    hasPreviousPage: boolean;
  };
}

export interface FilterOptions {
  search?: string;
  status?: string;
  dateFrom?: string;
  dateTo?: string;
  specialization?: string;
  [key: string]: any;
}

// ============ CONTEXT TYPES ============
export interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
  login: (credentials: LoginCredentials) => Promise<void>;
  signup: (data: SignupData) => Promise<void>;
  logout: () => Promise<void>;
  updateProfile: (data: Partial<User>) => Promise<void>;
  clearError: () => void;
}

export interface ThemeContextType {
  isDark: boolean;
  toggleTheme: () => void;
}

export interface NotificationContextType {
  notifications: Notification[];
  addNotification: (notification: Omit<Notification, 'id'>) => void;
  removeNotification: (id: string) => void;
  clearNotifications: () => void;
}

// ============ API REQUEST/RESPONSE ============
export interface ApiRequest<T> {
  data?: T;
  params?: Record<string, any>;
}

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: ErrorResponse;
  message?: string;
}
