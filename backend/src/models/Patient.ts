/**
 * Patient Model
 */

import { query, beginTransaction, commitTransaction, rollbackTransaction, queryWithClient } from '../services/database';
import { PoolClient } from 'pg';

export interface PatientProfile {
  id: string;
  userId: string;
  dateOfBirth: Date;
  gender: 'male' | 'female' | 'other';
  bloodType?: string;
  medicalHistory?: string;
  allergies?: string;
  emergencyContact?: string;
  emergencyPhone?: string;
  createdAt: Date;
  updatedAt: Date;
}

export class Patient {
  /**
   * Create patient profile
   */
  static async create(
    userId: string,
    dateOfBirth: Date,
    gender: 'male' | 'female' | 'other',
    bloodType?: string,
    medicalHistory?: string,
    allergies?: string
  ): Promise<PatientProfile> {
    const id = `pat_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    const now = new Date();

    const result = await query(
      `INSERT INTO patients 
       (id, user_id, date_of_birth, gender, blood_type, medical_history, allergies, created_at, updated_at)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
       RETURNING *`,
      [id, userId, dateOfBirth, gender, bloodType || null, medicalHistory || null, allergies || null, now, now]
    );

    return this.formatPatient(result[0]);
  }

  /**
   * Get patient by ID
   */
  static async getById(id: string): Promise<PatientProfile | null> {
    const result = await query(
      'SELECT * FROM patients WHERE id = $1',
      [id]
    );

    if (result.length === 0) {
      return null;
    }

    return this.formatPatient(result[0]);
  }

  /**
   * Get patient by user ID
   */
  static async getByUserId(userId: string): Promise<PatientProfile | null> {
    const result = await query(
      'SELECT * FROM patients WHERE user_id = $1',
      [userId]
    );

    if (result.length === 0) {
      return null;
    }

    return this.formatPatient(result[0]);
  }

  /**
   * Update patient profile
   */
  static async update(
    id: string,
    updates: Partial<PatientProfile>
  ): Promise<PatientProfile | null> {
    const now = new Date();
    const fields: string[] = [];
    const values: any[] = [];
    let paramCount = 1;

    // Build dynamic UPDATE query
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
      `UPDATE patients SET ${fields.join(', ')} WHERE id = $${paramCount} RETURNING *`,
      values
    );

    if (result.length === 0) {
      return null;
    }

    return this.formatPatient(result[0]);
  }

  /**
   * Delete patient
   */
  static async delete(id: string): Promise<boolean> {
    const result = await query(
      'DELETE FROM patients WHERE id = $1',
      [id]
    );

    return result.length > 0;
  }

  /**
   * Get all patients (with pagination)
   */
  static async getAll(skip: number = 0, take: number = 10): Promise<PatientProfile[]> {
    const result = await query(
      'SELECT * FROM patients ORDER BY created_at DESC LIMIT $1 OFFSET $2',
      [take, skip]
    );

    return result.map(row => this.formatPatient(row));
  }

  /**
   * Format database row to PatientProfile
   */
  private static formatPatient(row: any): PatientProfile {
    return {
      id: row.id,
      userId: row.user_id,
      dateOfBirth: new Date(row.date_of_birth),
      gender: row.gender,
      bloodType: row.blood_type,
      medicalHistory: row.medical_history,
      allergies: row.allergies,
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

export default Patient;
