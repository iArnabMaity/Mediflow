/**
 * Medical Record Model
 */

import { query } from '../services/database';

export type RecordType = 'prescription' | 'diagnosis' | 'lab_result' | 'radiology' | 'discharge' | 'consultation_note' | 'other';

export interface MedicalRecordEntry {
  id: string;
  patientId: string;
  providerId: string;
  recordType: RecordType;
  title: string;
  description: string;
  recordDate: Date;
  fileUrl?: string;
  findings?: string;
  recommendations?: string;
  createdAt: Date;
  updatedAt: Date;
}

export class MedicalRecord {
  /**
   * Create medical record
   */
  static async create(
    patientId: string,
    providerId: string,
    recordType: RecordType,
    title: string,
    description: string,
    recordDate: Date,
    fileUrl?: string,
    findings?: string,
    recommendations?: string
  ): Promise<MedicalRecordEntry> {
    const id = `rec_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    const now = new Date();

    const result = await query(
      `INSERT INTO medical_records 
       (id, patient_id, provider_id, record_type, title, description, record_date, file_url, findings, recommendations, created_at, updated_at)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12)
       RETURNING *`,
      [id, patientId, providerId, recordType, title, description, recordDate, fileUrl || null, findings || null, recommendations || null, now, now]
    );

    return this.formatRecord(result[0]);
  }

  /**
   * Get medical record by ID
   */
  static async getById(id: string): Promise<MedicalRecordEntry | null> {
    const result = await query(
      'SELECT * FROM medical_records WHERE id = $1',
      [id]
    );

    if (result.length === 0) {
      return null;
    }

    return this.formatRecord(result[0]);
  }

  /**
   * Get medical records by patient ID
   */
  static async getByPatientId(patientId: string, skip: number = 0, take: number = 20): Promise<MedicalRecordEntry[]> {
    const result = await query(
      'SELECT * FROM medical_records WHERE patient_id = $1 ORDER BY record_date DESC LIMIT $2 OFFSET $3',
      [patientId, take, skip]
    );

    return result.map(row => this.formatRecord(row));
  }

  /**
   * Get medical records by patient and type
   */
  static async getByPatientIdAndType(patientId: string, recordType: RecordType, skip: number = 0, take: number = 10): Promise<MedicalRecordEntry[]> {
    const result = await query(
      'SELECT * FROM medical_records WHERE patient_id = $1 AND record_type = $2 ORDER BY record_date DESC LIMIT $3 OFFSET $4',
      [patientId, recordType, take, skip]
    );

    return result.map(row => this.formatRecord(row));
  }

  /**
   * Get medical records by provider ID
   */
  static async getByProviderId(providerId: string, skip: number = 0, take: number = 10): Promise<MedicalRecordEntry[]> {
    const result = await query(
      'SELECT * FROM medical_records WHERE provider_id = $1 ORDER BY record_date DESC LIMIT $2 OFFSET $3',
      [providerId, take, skip]
    );

    return result.map(row => this.formatRecord(row));
  }

  /**
   * Get medical records by date range
   */
  static async getByDateRange(startDate: Date, endDate: Date, patientId?: string, skip: number = 0, take: number = 10): Promise<MedicalRecordEntry[]> {
    let query_text = 'SELECT * FROM medical_records WHERE record_date BETWEEN $1 AND $2';
    const params: any[] = [startDate, endDate];
    let paramCount = 3;

    if (patientId) {
      query_text += ` AND patient_id = $${paramCount}`;
      params.push(patientId);
      paramCount++;
    }

    query_text += ` ORDER BY record_date DESC LIMIT $${paramCount} OFFSET $${paramCount + 1}`;
    params.push(take, skip);

    const result = await query(query_text, params);

    return result.map(row => this.formatRecord(row));
  }

  /**
   * Update medical record
   */
  static async update(
    id: string,
    updates: Partial<MedicalRecordEntry>
  ): Promise<MedicalRecordEntry | null> {
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
      `UPDATE medical_records SET ${fields.join(', ')} WHERE id = $${paramCount} RETURNING *`,
      values
    );

    if (result.length === 0) {
      return null;
    }

    return this.formatRecord(result[0]);
  }

  /**
   * Delete medical record
   */
  static async delete(id: string): Promise<boolean> {
    const result = await query(
      'DELETE FROM medical_records WHERE id = $1',
      [id]
    );

    return result.length > 0;
  }

  /**
   * Search medical records by keyword
   */
  static async searchByKeyword(patientId: string, keyword: string, skip: number = 0, take: number = 10): Promise<MedicalRecordEntry[]> {
    const result = await query(
      `SELECT * FROM medical_records 
       WHERE patient_id = $1 AND (title ILIKE $2 OR description ILIKE $2 OR findings ILIKE $2)
       ORDER BY record_date DESC LIMIT $3 OFFSET $4`,
      [patientId, `%${keyword}%`, take, skip]
    );

    return result.map(row => this.formatRecord(row));
  }

  /**
   * Format database row to MedicalRecordEntry
   */
  private static formatRecord(row: any): MedicalRecordEntry {
    return {
      id: row.id,
      patientId: row.patient_id,
      providerId: row.provider_id,
      recordType: row.record_type,
      title: row.title,
      description: row.description,
      recordDate: new Date(row.record_date),
      fileUrl: row.file_url,
      findings: row.findings,
      recommendations: row.recommendations,
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

export default MedicalRecord;
