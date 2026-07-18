/**
 * Authentication Service
 * Handles user registration, login, and token management
 */

import User, { UserProfile } from '../models/User';
import { generateTokens, JWTPayload } from '../auth/jwt';
import { TokenResponse, LoginRequest, RegisterRequest } from '../auth/types';

export class AuthService {
  /**
   * Register a new user
   */
  static async register(data: RegisterRequest): Promise<{ user: Omit<UserProfile, 'password'>; tokens: TokenResponse }> {
    // Check if user already exists
    const existingUser = await User.getByEmail(data.email);
    if (existingUser) {
      throw new Error('User with this email already exists');
    }

    // Create user
    const user = await User.create(data.email, data.password, data.name, data.role);

    // Generate tokens
    const jwtPayload: JWTPayload = {
      userId: user.id,
      email: user.email,
      role: user.role,
    };

    const tokens = generateTokens(jwtPayload);

    return {
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        role: user.role,
        isActive: user.isActive,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt,
      },
      tokens,
    };
  }

  /**
   * Login user
   */
  static async login(data: LoginRequest): Promise<{ user: Omit<UserProfile, 'password'>; tokens: TokenResponse }> {
    // Authenticate user
    const user = await User.authenticate(data.email, data.password);

    if (!user) {
      throw new Error('Invalid email or password');
    }

    // Generate tokens
    const jwtPayload: JWTPayload = {
      userId: user.id,
      email: user.email,
      role: user.role,
    };

    const tokens = generateTokens(jwtPayload);

    return {
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        role: user.role,
        isActive: user.isActive,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt,
      },
      tokens,
    };
  }

  /**
   * Get user by ID (without password)
   */
  static async getUser(userId: string): Promise<Omit<UserProfile, 'password'> | null> {
    const user = await User.getById(userId);

    if (!user) {
      return null;
    }

    return {
      id: user.id,
      email: user.email,
      name: user.name,
      role: user.role,
      isActive: user.isActive,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    };
  }

  /**
   * Update user profile
   */
  static async updateProfile(userId: string, updates: { name?: string; email?: string }): Promise<Omit<UserProfile, 'password'> | null> {
    // Check if new email is already taken
    if (updates.email) {
      const existingUser = await User.getByEmail(updates.email);
      if (existingUser && existingUser.id !== userId) {
        throw new Error('Email already in use');
      }
    }

    const user = await User.update(userId, updates);

    if (!user) {
      return null;
    }

    return {
      id: user.id,
      email: user.email,
      name: user.name,
      role: user.role,
      isActive: user.isActive,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    };
  }

  /**
   * Change password
   */
  static async changePassword(userId: string, currentPassword: string, newPassword: string): Promise<boolean> {
    const user = await User.getById(userId);

    if (!user) {
      throw new Error('User not found');
    }

    // Verify current password
    const isValidPassword = require('bcryptjs').compareSync(currentPassword, user.password);

    if (!isValidPassword) {
      throw new Error('Current password is incorrect');
    }

    // Update password
    const updatedUser = await User.updatePassword(userId, newPassword);

    return updatedUser !== null;
  }

  /**
   * Verify user account (for email verification)
   */
  static async verifyAccount(userId: string): Promise<boolean> {
    // This would typically involve checking a verification token
    // For now, just return true as a placeholder
    return true;
  }

  /**
   * Deactivate user account
   */
  static async deactivateAccount(userId: string): Promise<boolean> {
    const user = await User.delete(userId);
    return user !== null;
  }
}

export default AuthService;
