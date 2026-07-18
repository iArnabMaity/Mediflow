/**
 * Authentication Routes
 */

import { Router, Request, Response, NextFunction } from 'express';
import AuthService from '../services/AuthService';
import { verifyToken } from '../auth/jwt';
import { LoginRequest, RegisterRequest } from '../auth/types';

const router = Router();

/**
 * POST /auth/register
 * Register a new user
 */
router.post('/register', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { email, password, name, role } = req.body;

    // Validate input
    if (!email || !password || !name) {
      return res.status(400).json({
        error: 'Missing required fields: email, password, name',
      });
    }

    if (!['patient', 'provider'].includes(role)) {
      return res.status(400).json({
        error: 'Invalid role. Must be "patient" or "provider"',
      });
    }

    const result = await AuthService.register({
      email,
      password,
      name,
      role,
    });

    res.status(201).json({
      success: true,
      user: result.user,
      accessToken: result.tokens.accessToken,
      refreshToken: result.tokens.refreshToken,
      expiresIn: result.tokens.expiresIn,
    });
  } catch (error: any) {
    if (error.message.includes('already exists')) {
      return res.status(409).json({ error: error.message });
    }
    next(error);
  }
});

/**
 * POST /auth/login
 * Login user
 */
router.post('/login', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { email, password } = req.body;

    // Validate input
    if (!email || !password) {
      return res.status(400).json({
        error: 'Missing required fields: email, password',
      });
    }

    const result = await AuthService.login({
      email,
      password,
    });

    res.status(200).json({
      success: true,
      user: result.user,
      accessToken: result.tokens.accessToken,
      refreshToken: result.tokens.refreshToken,
      expiresIn: result.tokens.expiresIn,
    });
  } catch (error: any) {
    if (error.message.includes('Invalid')) {
      return res.status(401).json({ error: error.message });
    }
    next(error);
  }
});

/**
 * GET /auth/me
 * Get current user (requires authentication)
 */
router.get('/me', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];

    if (!token) {
      return res.status(401).json({ error: 'Missing authorization token' });
    }

    const payload = verifyToken(token);
    const user = await AuthService.getUser(payload.userId);

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.status(200).json(user);
  } catch (error: any) {
    if (error.message.includes('Token')) {
      return res.status(401).json({ error: error.message });
    }
    next(error);
  }
});

/**
 * POST /auth/change-password
 * Change user password
 */
router.post('/change-password', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];

    if (!token) {
      return res.status(401).json({ error: 'Missing authorization token' });
    }

    const { currentPassword, newPassword } = req.body;

    if (!currentPassword || !newPassword) {
      return res.status(400).json({
        error: 'Missing required fields: currentPassword, newPassword',
      });
    }

    const payload = verifyToken(token);
    const success = await AuthService.changePassword(payload.userId, currentPassword, newPassword);

    res.status(200).json({
      success: true,
      message: 'Password changed successfully',
    });
  } catch (error: any) {
    if (error.message.includes('not found') || error.message.includes('incorrect')) {
      return res.status(401).json({ error: error.message });
    }
    next(error);
  }
});

/**
 * POST /auth/verify-token
 * Verify if token is valid
 */
router.post('/verify-token', (req: Request, res: Response) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];

    if (!token) {
      return res.status(401).json({ valid: false, error: 'Missing token' });
    }

    const payload = verifyToken(token);

    res.status(200).json({
      valid: true,
      payload,
    });
  } catch (error: any) {
    res.status(401).json({
      valid: false,
      error: error.message,
    });
  }
});

export default router;
