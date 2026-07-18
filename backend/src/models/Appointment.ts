/**
 * Appointment Model
 */

import { query } from '../services/database';

export type AppointmentStatus = 'scheduled' | 'confirmed' | 'completed' | 'cancelled' | 'no-show';

export interface AppointmentRecord {
  id: string;
  patientId: string;
  providerId: string;
  appointmentDate: Date;
  appointmentTime: string; // HH:MM format
  duration: number; // in minutes
  status: AppointmentStatus;
  reason?: string;
  notes?: string;
  createdAt: Date;
  updatedAt: Date;
}

export class Appointment {
  /**
   * Create appointment
   */
  static async create(
    patientId: string,
    providerId: string,
    appointmentDate: Date,
    appointmentTime: string,
    duration: number = 30,
    reason?: string,
    notes?: string
  ): Promise<AppointmentRecord> {
    const id = `apt_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    const now = new Date();

    const result = await query(
      `INSERT INTO appointments 
       (id, patient_id, provider_id, appointment_date, appointment_time, duration, status, reason, notes, created_at, updated_at)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)
       RETURNING *`,
      [id, patientId, providerId, appointmentDate, appointmentTime, duration, 'scheduled', reason || null, notes || null, now, now]
    );

    return this.formatAppointment(result[0]);
  }

  /**
   * Get appointment by ID
   */
  static async getById(id: string): Promise<AppointmentRecord | null> {
    const result = await query(
      'SELECT * FROM appointments WHERE id = $1',
      [id]
    );

    if (result.length === 0) {
      return null;
    }

    return this.formatAppointment(result[0]);
  }

  /**
   * Get appointments by patient ID
   */
  static async getByPatientId(patientId: string, skip: number = 0, take: number = 10): Promise<AppointmentRecord[]> {
    const result = await query(
      'SELECT * FROM appointments WHERE patient_id = $1 ORDER BY appointment_date DESC, appointment_time DESC LIMIT $2 OFFSET $3',
      [patientId, take, skip]
    );

    return result.map(row => this.formatAppointment(row));
  }

  /**
   * Get appointments by provider ID
   */
  static async getByProviderId(providerId: string, skip: number = 0, take: number = 10): Promise<AppointmentRecord[]> {
    const result = await query(
      'SELECT * FROM appointments WHERE provider_id = $1 ORDER BY appointment_date DESC, appointment_time DESC LIMIT $2 OFFSET $3',
      [providerId, take, skip]
    );

    return result.map(row => this.formatAppointment(row));
  }

  /**
   * Get appointments by date range
   */
  static async getByDateRange(startDate: Date, endDate: Date, providerId?: string, skip: number = 0, take: number = 10): Promise<AppointmentRecord[]> {
    let query_text = 'SELECT * FROM appointments WHERE appointment_date BETWEEN $1 AND $2';
    const params: any[] = [startDate, endDate];
    let paramCount = 3;

    if (providerId) {
      query_text += ` AND provider_id = $${paramCount}`;
      params.push(providerId);
      paramCount++;
    }

    query_text += ` ORDER BY appointment_date ASC, appointment_time ASC LIMIT $${paramCount} OFFSET $${paramCount + 1}`;
    params.push(take, skip);

    const result = await query(query_text, params);

    return result.map(row => this.formatAppointment(row));
  }

  /**
   * Update appointment
   */
  static async update(
    id: string,
    updates: Partial<AppointmentRecord>
  ): Promise<AppointmentRecord | null> {
    const now = new Date();
    const fields: string[] = [];
    const values: any[] = [];
    let paramCount = 1;

    Object.entries(updates).forEach(([key, value]) => {
      if (key !== 'id' && key !== 'createdAt') {
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
      `UPDATE appointments SET ${fields.join(', ')} WHERE id = $${paramCount} RETURNING *`,
      values
    );

    if (result.length === 0) {
      return null;
    }

    return this.formatAppointment(result[0]);
  }

  /**
   * Update appointment status
   */
  static async updateStatus(id: string, status: AppointmentStatus): Promise<AppointmentRecord | null> {
    return this.update(id, { status } as any);
  }

  /**
   * Cancel appointment
   */
  static async cancel(id: string): Promise<AppointmentRecord | null> {
    return this.updateStatus(id, 'cancelled');
  }

  /**
   * Delete appointment
   */
  static async delete(id: string): Promise<boolean> {
    const result = await query(
      'DELETE FROM appointments WHERE id = $1',
      [id]
    );

    return result.length > 0;
  }

  /**
   * Get appointments by status
   */
  static async getByStatus(status: AppointmentStatus, skip: number = 0, take: number = 10): Promise<AppointmentRecord[]> {
    const result = await query(
      'SELECT * FROM appointments WHERE status = $1 ORDER BY appointment_date DESC LIMIT $2 OFFSET $3',
      [status, take, skip]
    );

    return result.map(row => this.formatAppointment(row));
  }

  /**
   * Format database row to AppointmentRecord
   */
  private static formatAppointment(row: any): AppointmentRecord {
    return {
      id: row.id,
      patientId: row.patient_id,
      providerId: row.provider_id,
      appointmentDate: new Date(row.appointment_date),
      appointmentTime: row.appointment_time,
      duration: row.duration,
      status: row.status,
      reason: row.reason,
      notes: row.notes,
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

export default Appointment;
