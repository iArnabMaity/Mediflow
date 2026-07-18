/**
 * User Model
 */

import bcrypt from 'bcryptjs';
import { query } from '../services/database';

export interface UserProfile {
  id: string;
  email: string;
  password: string;
  name: string;
  role: 'patient' | 'provider' | 'admin';
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export class User {
  /**
   * Create a new user
   */
  static async create(
    email: string,
    password: string,
    name: string,
    role: 'patient' | 'provider' | 'admin' = 'patient'
  ): Promise<UserProfile> {
    const id = `usr_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    const now = new Date();

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    const result = await query(
      `INSERT INTO users (id, email, password, name, role, is_active, created_at, updated_at)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
       RETURNING *`,
      [id, email, hashedPassword, name, role, true, now, now]
    );

    return this.formatUser(result[0]);
  }

  /**
   * Get user by ID
   */
  static async getById(id: string): Promise<UserProfile | null> {
    const result = await query(
      'SELECT * FROM users WHERE id = $1',
      [id]
    );

    if (result.length === 0) {
      return null;
    }

    return this.formatUser(result[0]);
  }

  /**
   * Get user by email
   */
  static async getByEmail(email: string): Promise<UserProfile | null> {
    const result = await query(
      'SELECT * FROM users WHERE email = $1',
      [email]
    );

    if (result.length === 0) {
      return null;
    }

    return this.formatUser(result[0]);
  }

  /**
   * Authenticate user with email and password
   */
  static async authenticate(email: string, password: string): Promise<UserProfile | null> {
    const user = await this.getByEmail(email);

    if (!user || !user.isActive) {
      return null;
    }

    const isValidPassword = await bcrypt.compare(password, user.password);

    if (!isValidPassword) {
      return null;
    }

    return user;
  }

  /**
   * Update user
   */
  static async update(
    id: string,
    updates: Partial<UserProfile>
  ): Promise<UserProfile | null> {
    const now = new Date();
    const fields: string[] = [];
    const values: any[] = [];
    let paramCount = 1;

    Object.entries(updates).forEach(([key, value]) => {
      if (key !== 'id' && key !== 'createdAt' && key !== 'password') {
        const dbKey = this.camelToSnake(key);
        fields.push(`${dbKey} = $${paramCount}`);
        values.push(value);
        paramCount++;
      }
    });

    fields.push(`updated_at = $${paramCount}`);
    values.push(now);
    paramCount++;

    values.push(id);

    if (fields.length === 1) {
      return this.getById(id);
    }

    const result = await query(
      `UPDATE users SET ${fields.join(', ')} WHERE id = $${paramCount} RETURNING *`,
      values
    );

    if (result.length === 0) {
      return null;
    }

    return this.formatUser(result[0]);
  }

  /**
   * Update user password
   */
  static async updatePassword(id: string, newPassword: string): Promise<UserProfile | null> {
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    const now = new Date();

    const result = await query(
      'UPDATE users SET password = $1, updated_at = $2 WHERE id = $3 RETURNING *',
      [hashedPassword, now, id]
    );

    if (result.length === 0) {
      return null;
    }

    return this.formatUser(result[0]);
  }

  /**
   * Delete user (soft delete)
   */
  static async delete(id: string): Promise<UserProfile | null> {
    return this.update(id, { isActive: false } as any);
  }

  /**
   * Check if email exists
   */
  static async emailExists(email: string): Promise<boolean> {
    const result = await query(
      'SELECT id FROM users WHERE email = $1',
      [email]
    );

    return result.length > 0;
  }

  /**
   * Get all users (with pagination)
   */
  static async getAll(skip: number = 0, take: number = 10): Promise<UserProfile[]> {
    const result = await query(
      'SELECT * FROM users WHERE is_active = true ORDER BY created_at DESC LIMIT $1 OFFSET $2',
      [take, skip]
    );

    return result.map(row => this.formatUser(row));
  }

  /**
   * Get users by role
   */
  static async getByRole(role: 'patient' | 'provider' | 'admin', skip: number = 0, take: number = 10): Promise<UserProfile[]> {
    const result = await query(
      'SELECT * FROM users WHERE role = $1 AND is_active = true ORDER BY created_at DESC LIMIT $2 OFFSET $3',
      [role, take, skip]
    );

    return result.map(row => this.formatUser(row));
  }

  /**
   * Format database row to UserProfile
   */
  private static formatUser(row: any): UserProfile {
    return {
      id: row.id,
      email: row.email,
      password: row.password,
      name: row.name,
      role: row.role,
      isActive: row.is_active,
      createdAt: new Date(row.created_at),
      updatedAt: new Date(row.updated_at),
    };
  }

  /**
   * Convert camelCase to snake_case
   */
  private static camelToSnake(str: string): string {
    return str.replace(/[A-Z]/g, letter => `_${letter.toLowerCase()}`);
  }
}

export default User;
