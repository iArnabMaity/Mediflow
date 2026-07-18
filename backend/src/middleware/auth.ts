/**
 * Authentication Middleware
 * Verifies JWT tokens and attaches user context to requests
 */

import { Request, Response, NextFunction } from 'express';
import { verifyToken, isTokenExpired } from '../auth/jwt';
import { AuthContext } from '../auth/types';

export interface AuthenticatedRequest extends Request {
  user?: AuthContext;
  token?: string;
}

/**
 * Middleware to verify JWT token and authenticate requests
 */
export const authMiddleware = (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({
        error: 'Missing or invalid authorization header',
        code: 'MISSING_TOKEN',
      });
    }

    const token = authHeader.substring(7);

    // Check if token is expired
    if (isTokenExpired(token)) {
      return res.status(401).json({
        error: 'Token has expired',
        code: 'TOKEN_EXPIRED',
      });
    }

    // Verify token
    const payload = verifyToken(token);

    // Attach user context to request
    req.user = {
      userId: payload.userId,
      email: payload.email,
      role: payload.role,
    };

    req.token = token;

    next();
  } catch (error: any) {
    return res.status(401).json({
      error: 'Invalid or malformed token',
      code: 'INVALID_TOKEN',
      details: error.message,
    });
  }
};

/**
 * Middleware to check user role
 */
export const requireRole = (allowedRoles: string[]) => {
  return (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    if (!req.user) {
      return res.status(401).json({
        error: 'User not authenticated',
        code: 'NOT_AUTHENTICATED',
      });
    }

    if (!allowedRoles.includes(req.user.role)) {
      return res.status(403).json({
        error: `Access denied. Required role: ${allowedRoles.join(' or ')}`,
        code: 'INSUFFICIENT_PERMISSIONS',
        userRole: req.user.role,
      });
    }

    next();
  };
};

/**
 * Middleware to require patient role
 */
export const requirePatient = (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
  if (!req.user) {
    return res.status(401).json({
      error: 'User not authenticated',
      code: 'NOT_AUTHENTICATED',
    });
  }

  if (req.user.role !== 'patient') {
    return res.status(403).json({
      error: 'This action is only available to patients',
      code: 'PATIENT_ONLY',
    });
  }

  next();
};

/**
 * Middleware to require provider role
 */
export const requireProvider = (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
  if (!req.user) {
    return res.status(401).json({
      error: 'User not authenticated',
      code: 'NOT_AUTHENTICATED',
    });
  }

  if (req.user.role !== 'provider') {
    return res.status(403).json({
      error: 'This action is only available to providers',
      code: 'PROVIDER_ONLY',
    });
  }

  next();
};

/**
 * Middleware to require admin role
 */
export const requireAdmin = (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
  if (!req.user) {
    return res.status(401).json({
      error: 'User not authenticated',
      code: 'NOT_AUTHENTICATED',
    });
  }

  if (req.user.role !== 'admin') {
    return res.status(403).json({
      error: 'Admin access required',
      code: 'ADMIN_ONLY',
    });
  }

  next();
};

export default authMiddleware;
