// Constants for MediFlow Application

// ============ API CONFIGURATION ============
export const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/api';
export const API_VERSION = 'v1';
export const API_TIMEOUT = 30000; // 30 seconds

// ============ STORAGE KEYS ============
export const STORAGE_KEYS = {
  AUTH_TOKEN: 'mediflow_auth_token',
  REFRESH_TOKEN: 'mediflow_refresh_token',
  USER: 'mediflow_user',
  THEME: 'mediflow_theme',
  REMEMBER_ME: 'mediflow_remember_me',
} as const;

// ============ MEDICAL SPECIALIZATIONS ============
export const SPECIALIZATIONS = [
  'General Practice',
  'Cardiology',
  'Neurology',
  'Orthopedics',
  'Dermatology',
  'Pediatrics',
  'Ophthalmology',
  'ENT',
  'Psychiatry',
  'Gastroenterology',
  'Pulmonology',
  'Urology',
  'Obstetrics & Gynecology',
  'Rheumatology',
  'Oncology',
  'Endocrinology',
  'Nephrology',
  'Hematology',
  'Immunology',
  'Pathology',
  'Radiology',
  'Emergency Medicine',
  'Anesthesiology',
  'Physical Medicine & Rehabilitation',
  'Nuclear Medicine',
] as const;

// ============ RECORD TYPES ============
export const RECORD_TYPES = {
  PRESCRIPTION: 'prescription',
  DIAGNOSIS: 'diagnosis',
  LAB_REPORT: 'lab_report',
  IMAGING: 'imaging',
  VACCINATION: 'vaccination',
  OTHER: 'other',
} as const;

export const RECORD_TYPE_LABELS = {
  prescription: 'Prescription',
  diagnosis: 'Diagnosis',
  lab_report: 'Lab Report',
  imaging: 'Imaging',
  vaccination: 'Vaccination',
  other: 'Other',
} as const;

// ============ APPOINTMENT STATUSES ============
export const APPOINTMENT_STATUSES = {
  SCHEDULED: 'scheduled',
  COMPLETED: 'completed',
  CANCELLED: 'cancelled',
  NO_SHOW: 'no-show',
  RESCHEDULED: 'rescheduled',
} as const;

export const APPOINTMENT_STATUS_LABELS = {
  scheduled: 'Scheduled',
  completed: 'Completed',
  cancelled: 'Cancelled',
  'no-show': 'No Show',
  rescheduled: 'Rescheduled',
} as const;

export const APPOINTMENT_STATUS_COLORS = {
  scheduled: 'blue',
  completed: 'green',
  cancelled: 'red',
  'no-show': 'orange',
  rescheduled: 'purple',
} as const;

// ============ USER ROLES ============
export const USER_ROLES = {
  PATIENT: 'patient',
  DOCTOR: 'doctor',
  PROVIDER: 'provider',
  ADMIN: 'admin',
} as const;

export const USER_ROLE_LABELS = {
  patient: 'Patient',
  doctor: 'Doctor',
  provider: 'Provider',
  admin: 'Administrator',
} as const;

// ============ ERROR MESSAGES ============
export const ERROR_MESSAGES = {
  // Authentication
  AUTH_REQUIRED: 'Authentication required. Please log in.',
  INVALID_CREDENTIALS: 'Invalid email or password.',
  EMAIL_ALREADY_EXISTS: 'Email is already registered.',
  WEAK_PASSWORD: 'Password must be at least 8 characters long.',
  PASSWORD_MISMATCH: 'Passwords do not match.',
  INVALID_EMAIL: 'Please enter a valid email address.',
  
  // Authorization
  UNAUTHORIZED: 'You do not have permission to perform this action.',
  FORBIDDEN: 'Access forbidden.',
  
  // Validation
  REQUIRED_FIELD: 'This field is required.',
  INVALID_INPUT: 'Invalid input.',
  INVALID_DATE: 'Please enter a valid date.',
  INVALID_TIME: 'Please enter a valid time.',
  INVALID_PHONE: 'Please enter a valid phone number.',
  
  // Appointments
  APPOINTMENT_NOT_FOUND: 'Appointment not found.',
  APPOINTMENT_SLOT_UNAVAILABLE: 'This time slot is not available.',
  CANNOT_BOOK_PAST_DATE: 'Cannot book an appointment in the past.',
  APPOINTMENT_CONFLICT: 'You already have an appointment at this time.',
  
  // Medical Records
  RECORD_NOT_FOUND: 'Medical record not found.',
  FILE_TOO_LARGE: 'File size exceeds the maximum limit (10MB).',
  INVALID_FILE_TYPE: 'Invalid file type. Please upload a supported format.',
  UPLOAD_FAILED: 'File upload failed. Please try again.',
  
  // Provider
  PROVIDER_NOT_FOUND: 'Healthcare provider not found.',
  NO_PROVIDERS_AVAILABLE: 'No providers available for the selected specialization.',
  
  // General
  NETWORK_ERROR: 'Network error. Please check your internet connection.',
  SERVER_ERROR: 'Server error. Please try again later.',
  SOMETHING_WENT_WRONG: 'Something went wrong. Please try again.',
  NOT_FOUND: 'The requested resource was not found.',
} as const;

// ============ SUCCESS MESSAGES ============
export const SUCCESS_MESSAGES = {
  // Authentication
  LOGIN_SUCCESS: 'You have been logged in successfully.',
  SIGNUP_SUCCESS: 'Your account has been created successfully.',
  LOGOUT_SUCCESS: 'You have been logged out successfully.',
  PASSWORD_RESET_SUCCESS: 'Your password has been reset. Please check your email.',
  
  // Profile
  PROFILE_UPDATED: 'Your profile has been updated successfully.',
  PROFILE_PICTURE_UPDATED: 'Your profile picture has been updated.',
  
  // Appointments
  APPOINTMENT_CREATED: 'Appointment booked successfully.',
  APPOINTMENT_UPDATED: 'Appointment updated successfully.',
  APPOINTMENT_CANCELLED: 'Appointment cancelled successfully.',
  APPOINTMENT_RESCHEDULED: 'Appointment rescheduled successfully.',
  
  // Medical Records
  RECORD_UPLOADED: 'Medical record uploaded successfully.',
  RECORD_DELETED: 'Medical record deleted successfully.',
  RECORDS_EXPORTED: 'Medical records exported successfully.',
  
  // General
  OPERATION_SUCCESS: 'Operation completed successfully.',
  CHANGES_SAVED: 'Changes saved successfully.',
} as const;

// ============ PAGINATION ============
export const DEFAULT_PAGE = 1;
export const DEFAULT_LIMIT = 10;
export const MAX_LIMIT = 100;
export const PAGE_SIZES = [5, 10, 25, 50, 100] as const;

// ============ DATE & TIME ============
export const DATE_FORMAT = 'MM/dd/yyyy';
export const TIME_FORMAT = 'HH:mm';
export const DATETIME_FORMAT = 'MM/dd/yyyy HH:mm';
export const APPOINTMENT_BUFFER_MINUTES = 15;
export const MAX_APPOINTMENT_DAYS_AHEAD = 90;
export const MIN_APPOINTMENT_HOURS_AHEAD = 1;

// ============ FILE UPLOAD ============
export const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB
export const ALLOWED_FILE_TYPES = [
  'application/pdf',
  'image/jpeg',
  'image/png',
  'image/gif',
  'application/msword',
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
  'application/vnd.ms-excel',
  'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
] as const;

export const ALLOWED_FILE_EXTENSIONS = [
  '.pdf',
  '.jpg',
  '.jpeg',
  '.png',
  '.gif',
  '.doc',
  '.docx',
  '.xls',
  '.xlsx',
] as const;

// ============ REGEX PATTERNS ============
export const REGEX_PATTERNS = {
  EMAIL: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  PASSWORD: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
  PHONE: /^[+]?[(]?[0-9]{3}[)]?[-\s.]?[0-9]{3}[-\s.]?[0-9]{4,6}$/,
  ZIPCODE: /^\d{5}(-\d{4})?$/,
  URL: /^https?:\/\/.+/i,
} as const;

// ============ THEME ============
export const THEME_OPTIONS = {
  LIGHT: 'light',
  DARK: 'dark',
  SYSTEM: 'system',
} as const;

// ============ GENDER ============
export const GENDERS = {
  MALE: 'male',
  FEMALE: 'female',
  OTHER: 'other',
} as const;

export const GENDER_LABELS = {
  male: 'Male',
  female: 'Female',
  other: 'Other',
} as const;

// ============ APPOINTMENT TYPES ============
export const APPOINTMENT_TYPES = {
  IN_PERSON: 'in_person',
  VIRTUAL: 'virtual',
  PHONE: 'phone',
} as const;

export const APPOINTMENT_TYPE_LABELS = {
  in_person: 'In-Person',
  virtual: 'Virtual',
  phone: 'Phone',
} as const;

// ============ NOTIFICATION SETTINGS ============
export const NOTIFICATION_DURATION_MS = 5000;
export const NOTIFICATION_POSITION = 'top-right' as const;

// ============ FEATURE FLAGS ============
export const FEATURES = {
  VIRTUAL_APPOINTMENTS: true,
  PRESCRIPTION_DELIVERY: false,
  TELEMEDICINE: true,
  HEALTH_RECORDS_EXPORT: true,
  APPOINTMENT_REMINDERS: true,
  MEDICATION_REMINDERS: false,
} as const;

// ============ API ENDPOINTS ============
export const API_ENDPOINTS = {
  // Auth
  AUTH_LOGIN: '/auth/login',
  AUTH_SIGNUP: '/auth/register',
  AUTH_LOGOUT: '/auth/logout',
  AUTH_REFRESH: '/auth/refresh',
  AUTH_VERIFY: '/auth/verify',
  
  // Users
  USER_PROFILE: '/users/profile',
  USER_UPDATE_PROFILE: '/users/profile',
  USER_CHANGE_PASSWORD: '/users/change-password',
  USER_DELETE: '/users',
  
  // Appointments
  APPOINTMENTS_LIST: '/appointments',
  APPOINTMENTS_CREATE: '/appointments',
  APPOINTMENTS_GET: '/appointments/:id',
  APPOINTMENTS_UPDATE: '/appointments/:id',
  APPOINTMENTS_CANCEL: '/appointments/:id/cancel',
  APPOINTMENTS_RESCHEDULE: '/appointments/:id/reschedule',
  APPOINTMENTS_AVAILABLE_SLOTS: '/appointments/providers/:providerId/slots',
  
  // Medical Records
  RECORDS_LIST: '/medical-records',
  RECORDS_GET: '/medical-records/:id',
  RECORDS_CREATE: '/medical-records',
  RECORDS_UPLOAD: '/medical-records/upload',
  RECORDS_DELETE: '/medical-records/:id',
  RECORDS_EXPORT: '/medical-records/export',
  
  // Providers
  PROVIDERS_LIST: '/providers',
  PROVIDERS_GET: '/providers/:id',
  PROVIDERS_SEARCH: '/providers/search',
  PROVIDERS_BY_SPECIALIZATION: '/providers/specialization/:specialization',
  
  // Health
  HEALTH_CHECK: '/health',
} as const;

// ============ RESPONSIVE BREAKPOINTS ============
export const BREAKPOINTS = {
  XS: 320,
  SM: 640,
  MD: 768,
  LG: 1024,
  XL: 1280,
  XXL: 1536,
} as const;
