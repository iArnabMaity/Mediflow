/**
 * JWT and Authentication Types
 */

export interface JWTPayload {
  userId: string;
  email: string;
  role: 'patient' | 'provider' | 'admin';
  iat?: number;
  exp?: number;
}

export interface TokenResponse {
  accessToken: string;
  refreshToken?: string;
  expiresIn: number;
}

export interface AuthContext {
  userId: string;
  email: string;
  role: 'patient' | 'provider' | 'admin';
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest {
  email: string;
  password: string;
  name: string;
  role: 'patient' | 'provider';
}

export interface User {
  id: string;
  email: string;
  password: string;
  name: string;
  role: 'patient' | 'provider' | 'admin';
  createdAt: Date;
  updatedAt: Date;
}
