/**
 * Provider/Healthcare Professional Model
 */

import { query } from '../services/database';

export interface ProviderProfile {
  id: string;
  userId: string;
  licenseNumber: string;
  specialization: string;
  hospital?: string;
  department?: string;
  yearsOfExperience: number;
  qualifications?: string;
  consultationFee: number;
  availableSlots?: string; // JSON string of available time slots
  createdAt: Date;
  updatedAt: Date;
}

export class Provider {
  /**
   * Create provider profile
   */
  static async create(
    userId: string,
    licenseNumber: string,
    specialization: string,
    yearsOfExperience: number,
    consultationFee: number,
    hospital?: string,
    department?: string,
    qualifications?: string
  ): Promise<ProviderProfile> {
    const id = `prov_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    const now = new Date();

    const result = await query(
      `INSERT INTO providers 
       (id, user_id, license_number, specialization, hospital, department, years_of_experience, qualifications, consultation_fee, created_at, updated_at)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)
       RETURNING *`,
      [id, userId, licenseNumber, specialization, hospital || null, department || null, yearsOfExperience, qualifications || null, consultationFee, now, now]
    );

    return this.formatProvider(result[0]);
  }

  /**
   * Get provider by ID
   */
  static async getById(id: string): Promise<ProviderProfile | null> {
    const result = await query(
      'SELECT * FROM providers WHERE id = $1',
      [id]
    );

    if (result.length === 0) {
      return null;
    }

    return this.formatProvider(result[0]);
  }

  /**
   * Get provider by user ID
   */
  static async getByUserId(userId: string): Promise<ProviderProfile | null> {
    const result = await query(
      'SELECT * FROM providers WHERE user_id = $1',
      [userId]
    );

    if (result.length === 0) {
      return null;
    }

    return this.formatProvider(result[0]);
  }

  /**
   * Get providers by specialization
   */
  static async getBySpecialization(specialization: string, skip: number = 0, take: number = 10): Promise<ProviderProfile[]> {
    const result = await query(
      'SELECT * FROM providers WHERE specialization = $1 ORDER BY years_of_experience DESC LIMIT $2 OFFSET $3',
      [specialization, take, skip]
    );

    return result.map(row => this.formatProvider(row));
  }

  /**
   * Update provider profile
   */
  static async update(
    id: string,
    updates: Partial<ProviderProfile>
  ): Promise<ProviderProfile | null> {
    const now = new Date();
    const fields: string[] = [];
    const values: any[] = [];
    let paramCount = 1;

    Object.entries(updates).forEach(([key, value]) => {
      if (key !== 'id' && key !== 'userId' && key !== 'createdAt') {
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
      `UPDATE providers SET ${fields.join(', ')} WHERE id = $${paramCount} RETURNING *`,
      values
    );

    if (result.length === 0) {
      return null;
    }

    return this.formatProvider(result[0]);
  }

  /**
   * Delete provider
   */
  static async delete(id: string): Promise<boolean> {
    const result = await query(
      'DELETE FROM providers WHERE id = $1',
      [id]
    );

    return result.length > 0;
  }

  /**
   * Get all providers (with pagination)
   */
  static async getAll(skip: number = 0, take: number = 10): Promise<ProviderProfile[]> {
    const result = await query(
      'SELECT * FROM providers ORDER BY years_of_experience DESC, created_at DESC LIMIT $1 OFFSET $2',
      [take, skip]
    );

    return result.map(row => this.formatProvider(row));
  }

  /**
   * Format database row to ProviderProfile
   */
  private static formatProvider(row: any): ProviderProfile {
    return {
      id: row.id,
      userId: row.user_id,
      licenseNumber: row.license_number,
      specialization: row.specialization,
      hospital: row.hospital,
      department: row.department,
      yearsOfExperience: row.years_of_experience,
      qualifications: row.qualifications,
      consultationFee: row.consultation_fee,
      availableSlots: row.available_slots,
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

export default Provider;
