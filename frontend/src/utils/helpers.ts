// Utility Functions for MediFlow
import { REGEX_PATTERNS } from '../constants';
import clsx, { type ClassValue } from 'clsx';

// ============ DATE & TIME UTILITIES ============

export const formatDate = (date: string | Date): string => {
  const d = typeof date === 'string' ? new Date(date) : date;
  if (isNaN(d.getTime())) return '';
  return d.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
};

export const formatTime = (time: string | Date): string => {
  let d: Date;
  
  if (typeof time === 'string') {
    // Handle HH:mm format
    if (time.includes(':') && !time.includes('T')) {
      d = new Date(`2024-01-01T${time}`);
    } else {
      d = new Date(time);
    }
  } else {
    d = time;
  }

  if (isNaN(d.getTime())) return '';
  
  return d.toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: true,
  });
};

export const formatDateTime = (date: string | Date): string => {
  const d = typeof date === 'string' ? new Date(date) : date;
  if (isNaN(d.getTime())) return '';
  
  return d.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    hour12: true,
  });
};

export const getRelativeTime = (date: string | Date): string => {
  const d = typeof date === 'string' ? new Date(date) : date;
  if (isNaN(d.getTime())) return '';
  
  const now = new Date();
  const seconds = Math.floor((now.getTime() - d.getTime()) / 1000);
  
  if (seconds < 60) return 'Just now';
  if (seconds < 3600) return `${Math.floor(seconds / 60)}m ago`;
  if (seconds < 86400) return `${Math.floor(seconds / 3600)}h ago`;
  if (seconds < 604800) return `${Math.floor(seconds / 86400)}d ago`;
  
  return formatDate(d);
};

export const calculateAge = (dateOfBirth: string | Date): number => {
  const dob = typeof dateOfBirth === 'string' ? new Date(dateOfBirth) : dateOfBirth;
  if (isNaN(dob.getTime())) return 0;
  
  const today = new Date();
  let age = today.getFullYear() - dob.getFullYear();
  const monthDiff = today.getMonth() - dob.getMonth();
  
  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < dob.getDate())) {
    age--;
  }
  
  return age;
};

export const addDays = (date: Date, days: number): Date => {
  const result = new Date(date);
  result.setDate(result.getDate() + days);
  return result;
};

export const isSameDay = (date1: Date, date2: Date): boolean => {
  return (
    date1.getFullYear() === date2.getFullYear() &&
    date1.getMonth() === date2.getMonth() &&
    date1.getDate() === date2.getDate()
  );
};

export const isDateInPast = (date: Date): boolean => {
  return date < new Date();
};

// ============ VALIDATION UTILITIES ============

export const validateEmail = (email: string): boolean => {
  return REGEX_PATTERNS.EMAIL.test(email);
};

export const validatePassword = (password: string): boolean => {
  return REGEX_PATTERNS.PASSWORD.test(password);
};

export const validatePhone = (phone: string): boolean => {
  return REGEX_PATTERNS.PHONE.test(phone);
};

export const validateZipCode = (zipCode: string): boolean => {
  return REGEX_PATTERNS.ZIPCODE.test(zipCode);
};

export const validateUrl = (url: string): boolean => {
  return REGEX_PATTERNS.URL.test(url);
};

export const getPasswordStrength = (password: string): 'weak' | 'fair' | 'good' | 'strong' => {
  if (password.length < 8) return 'weak';
  if (password.length < 12) return 'fair';
  if (/[A-Z]/.test(password) && /[0-9]/.test(password) && /[@$!%*?&]/.test(password)) {
    return 'strong';
  }
  return 'good';
};

// ============ STRING UTILITIES ============

export const getInitials = (name: string): string => {
  return name
    .split(' ')
    .slice(0, 2)
    .map((part) => part.charAt(0).toUpperCase())
    .join('')
    .substring(0, 2);
};

export const capitalizeFirstLetter = (str: string): string => {
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
};

export const capitalize = (str: string): string => {
  return str.replace(/\b\w/g, (char) => char.toUpperCase());
};

export const truncate = (str: string, length: number): string => {
  if (str.length <= length) return str;
  return str.substring(0, length - 3) + '...';
};

export const slug = (str: string): string => {
  return str
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '');
};

// ============ CLASS NAME UTILITIES ============

export const cn = (...inputs: ClassValue[]): string => {
  return clsx(...inputs);
};

// ============ OBJECT UTILITIES ============

export const omit = <T extends Record<string, any>, >(
  obj: T,
  keys: (keyof T)[]
): Partial<T> => {
  const result = { ...obj };
  keys.forEach((key) => {
    delete result[key];
  });
  return result;
};

export const pick = <T extends Record<string, any>, >(
  obj: T,
  keys: (keyof T)[]
): Partial<T> => {
  const result: Partial<T> = {};
  keys.forEach((key) => {
    if (key in obj) {
      result[key] = obj[key];
    }
  });
  return result;
};

export const deepMerge = <T extends Record<string, any>, >(
  target: T,
  source: Partial<T>
): T => {
  const output: any = { ...target };
  
  Object.keys(source).forEach((key) => {
    const sourceValue = source[key as keyof T];
    const targetValue = target[key as keyof T];
    
    if (
      sourceValue &&
      typeof sourceValue === 'object' &&
      !Array.isArray(sourceValue) &&
      targetValue &&
      typeof targetValue === 'object' &&
      !Array.isArray(targetValue)
    ) {
      const merged = deepMerge(
        targetValue as Record<string, any>,
        sourceValue as Record<string, any>
      );
      output[key] = merged;
    } else {
      output[key] = sourceValue;
    }
  });
  
  return output;
};

// ============ ARRAY UTILITIES ============

export const unique = <T, >(arr: T[]): T[] => {
  return Array.from(new Set(arr));
};

export const uniqueBy = <T, >(arr: T[], key: (item: T) => any): T[] => {
  const seen = new Set();
  return arr.filter((item) => {
    const k = key(item);
    if (seen.has(k)) return false;
    seen.add(k);
    return true;
  });
};

export const chunk = <T, >(arr: T[], size: number): T[][] => {
  const result: T[][] = [];
  for (let i = 0; i < arr.length; i += size) {
    result.push(arr.slice(i, i + size));
  }
  return result;
};

// ============ NUMBER UTILITIES ============

export const formatNumber = (num: number): string => {
  return num.toLocaleString('en-US');
};

export const formatCurrency = (amount: number, currency: string = 'USD'): string => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency,
  }).format(amount);
};

export const percentage = (value: number, total: number): number => {
  return (value / total) * 100;
};

export const roundTo = (num: number, decimals: number): number => {
  return Math.round(num * Math.pow(10, decimals)) / Math.pow(10, decimals);
};

// ============ FILE UTILITIES ============

export const formatFileSize = (bytes: number): string => {
  if (bytes === 0) return '0 Bytes';
  
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  
  return Math.round((bytes / Math.pow(k, i)) * 100) / 100 + ' ' + sizes[i];
};

export const getFileExtension = (filename: string): string => {
  return filename.slice((filename.lastIndexOf('.') - 1 >>> 0) + 2);
};

export const getFileType = (filename: string): string => {
  const ext = getFileExtension(filename).toLowerCase();
  const mimeTypes: Record<string, string> = {
    pdf: 'application/pdf',
    doc: 'application/msword',
    docx: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    xls: 'application/vnd.ms-excel',
    xlsx: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    jpg: 'image/jpeg',
    jpeg: 'image/jpeg',
    png: 'image/png',
    gif: 'image/gif',
  };
  return mimeTypes[ext] || 'application/octet-stream';
};

// ============ LOCAL STORAGE UTILITIES ============

export const getFromLocalStorage = <T>(key: string, defaultValue?: T): T | null => {
  try {
    if (typeof window === 'undefined') return null;
    const item = window.localStorage.getItem(key);
    return item ? JSON.parse(item) : defaultValue || null;
  } catch {
    return defaultValue || null;
  }
};

export const setToLocalStorage = <T>(key: string, value: T): void => {
  try {
    if (typeof window === 'undefined') return;
    window.localStorage.setItem(key, JSON.stringify(value));
  } catch {
    // Silently fail
  }
};

export const removeFromLocalStorage = (key: string): void => {
  try {
    if (typeof window === 'undefined') return;
    window.localStorage.removeItem(key);
  } catch {
    // Silently fail
  }
};

export const clearLocalStorage = (): void => {
  try {
    if (typeof window === 'undefined') return;
    window.localStorage.clear();
  } catch {
    // Silently fail
  }
};

// ============ PROMISE UTILITIES ============

export const delay = (ms: number): Promise<void> => {
  return new Promise((resolve) => setTimeout(resolve, ms));
};

export const timeout = <T, >(promise: Promise<T>, ms: number): Promise<T> => {
  return Promise.race([
    promise,
    new Promise<T>((_, reject) =>
      setTimeout(() => reject(new Error('Timeout')), ms)
    ),
  ]);
};

export const retry = async <T, >(
  fn: () => Promise<T>,
  maxAttempts: number = 3,
  delayMs: number = 1000
): Promise<T> => {
  for (let i = 0; i < maxAttempts; i++) {
    try {
      return await fn();
    } catch (error) {
      if (i === maxAttempts - 1) throw error;
      await delay(delayMs * Math.pow(2, i));
    }
  }
  throw new Error('Retry failed');
};

// ============ ENVIRONMENT UTILITIES ============

export const isDev = (): boolean => process.env.NODE_ENV === 'development';
export const isProd = (): boolean => process.env.NODE_ENV === 'production';
export const isTest = (): boolean => process.env.NODE_ENV === 'test';

// ============ BROWSER UTILITIES ============

export const isBrowser = (): boolean => typeof window !== 'undefined';

export const copyToClipboard = async (text: string): Promise<void> => {
  if (!isBrowser()) return;
  
  try {
    if (navigator.clipboard) {
      await navigator.clipboard.writeText(text);
    } else {
      const el = document.createElement('textarea');
      el.value = text;
      document.body.appendChild(el);
      el.select();
      document.execCommand('copy');
      document.body.removeChild(el);
    }
  } catch {
    // Silently fail
  }
};

export const downloadFile = (data: any, filename: string): void => {
  if (!isBrowser()) return;
  
  const json = typeof data === 'string' ? data : JSON.stringify(data, null, 2);
  const blob = new Blob([json], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  link.click();
  URL.revokeObjectURL(url);
};

// ============ DEBOUNCE & THROTTLE ============

export const debounce = <T extends (...args: any[]) => any, >(
  fn: T,
  delay: number
): ((...args: Parameters<T>) => void) => {
  let timeoutId: NodeJS.Timeout | null = null;
  
  return (...args: Parameters<T>) => {
    if (timeoutId) clearTimeout(timeoutId);
    timeoutId = setTimeout(() => fn(...args), delay);
  };
};

export const throttle = <T extends (...args: any[]) => any, >(
  fn: T,
  limit: number
): ((...args: Parameters<T>) => void) => {
  let inThrottle: boolean;
  
  return (...args: Parameters<T>) => {
    if (!inThrottle) {
      fn(...args);
      inThrottle = true;
      setTimeout(() => (inThrottle = false), limit);
    }
  };
};

