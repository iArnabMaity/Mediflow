/**
 * JWT Token Generation and Verification
 */

import jwt from 'jsonwebtoken';
import { config } from '../config';
import { JWTPayload, TokenResponse } from './types';

/**
 * Generate JWT access token
 */
export const generateAccessToken = (payload: JWTPayload): string => {
  return jwt.sign(payload, config.JWT_SECRET, {
    expiresIn: config.JWT_EXPIRE,
    algorithm: 'HS256',
  });
};

/**
 * Generate JWT refresh token (longer expiry)
 */
export const generateRefreshToken = (payload: JWTPayload): string => {
  return jwt.sign(payload, config.JWT_SECRET, {
    expiresIn: '7d',
    algorithm: 'HS256',
  });
};

/**
 * Generate both access and refresh tokens
 */
export const generateTokens = (payload: JWTPayload): TokenResponse => {
  const accessToken = generateAccessToken(payload);
  const refreshToken = generateRefreshToken(payload);
  
  const decoded = jwt.decode(accessToken) as any;
  const expiresIn = decoded?.exp ? decoded.exp * 1000 - Date.now() : 86400000; // Default 24h

  return {
    accessToken,
    refreshToken,
    expiresIn,
  };
};

/**
 * Verify JWT token
 */
export const verifyToken = (token: string): JWTPayload => {
  try {
    return jwt.verify(token, config.JWT_SECRET) as JWTPayload;
  } catch (error: any) {
    throw new Error(`Token verification failed: ${error.message}`);
  }
};

/**
 * Decode JWT token without verification (for inspection)
 */
export const decodeToken = (token: string): JWTPayload | null => {
  try {
    return jwt.decode(token) as JWTPayload;
  } catch (error) {
    return null;
  }
};

/**
 * Check if token is expired
 */
export const isTokenExpired = (token: string): boolean => {
  const decoded = decodeToken(token);
  if (!decoded || !decoded.exp) {
    return true;
  }
  return decoded.exp * 1000 < Date.now();
};
