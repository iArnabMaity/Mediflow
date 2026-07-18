/**
 * Appointment Service
 * Handles appointment scheduling, management, and validation
 */

import Appointment, { AppointmentRecord, AppointmentStatus } from '../models/Appointment';
import Patient from '../models/Patient';
import Provider from '../models/Provider';

export class AppointmentService {
  /**
   * Schedule a new appointment
   */
  static async scheduleAppointment(
    patientId: string,
    providerId: string,
    appointmentDate: Date,
    appointmentTime: string,
    reason?: string
  ): Promise<AppointmentRecord> {
    // Verify patient and provider exist
    const patient = await Patient.getById(patientId);
    if (!patient) {
      throw new Error('Patient not found');
    }

    const provider = await Provider.getById(providerId);
    if (!provider) {
      throw new Error('Provider not found');
    }

    // Check for scheduling conflicts
    const existingAppointments = await Appointment.getByDateRange(
      appointmentDate,
      new Date(appointmentDate.getTime() + 86400000) // Next day
    );

    const timeSlotTaken = existingAppointments.some(apt => {
      if (apt.providerId !== providerId || apt.status === 'cancelled') {
        return false;
      }

      return this.isTimeSlotConflicting(appointmentTime, apt.appointmentTime, apt.duration);
    });

    if (timeSlotTaken) {
      throw new Error('Time slot is not available');
    }

    // Create appointment
    const appointment = await Appointment.create(
      patientId,
      providerId,
      appointmentDate,
      appointmentTime,
      30,
      reason
    );

    return appointment;
  }

  /**
   * Check if time slots conflict
   */
  private static isTimeSlotConflicting(newTime: string, existingTime: string, duration: number): boolean {
    const [newHour, newMin] = newTime.split(':').map(Number);
    const [existingHour, existingMin] = existingTime.split(':').map(Number);

    const newStart = newHour * 60 + newMin;
    const existingStart = existingHour * 60 + existingMin;
    const existingEnd = existingStart + duration;

    // Check if new slot overlaps with existing slot
    return newStart >= existingStart && newStart < existingEnd;
  }

  /**
   * Get patient appointments
   */
  static async getPatientAppointments(patientId: string, skip: number = 0, take: number = 10): Promise<AppointmentRecord[]> {
    return Appointment.getByPatientId(patientId, skip, take);
  }

  /**
   * Get provider appointments
   */
  static async getProviderAppointments(providerId: string, skip: number = 0, take: number = 10): Promise<AppointmentRecord[]> {
    return Appointment.getByProviderId(providerId, skip, take);
  }

  /**
   * Get appointments for a specific date
   */
  static async getAppointmentsForDate(date: Date, providerId?: string): Promise<AppointmentRecord[]> {
    const startDate = new Date(date);
    startDate.setHours(0, 0, 0, 0);

    const endDate = new Date(date);
    endDate.setHours(23, 59, 59, 999);

    return Appointment.getByDateRange(startDate, endDate, providerId);
  }

  /**
   * Update appointment
   */
  static async updateAppointment(appointmentId: string, updates: Partial<AppointmentRecord>): Promise<AppointmentRecord | null> {
    return Appointment.update(appointmentId, updates);
  }

  /**
   * Confirm appointment
   */
  static async confirmAppointment(appointmentId: string): Promise<AppointmentRecord | null> {
    return Appointment.updateStatus(appointmentId, 'confirmed');
  }

  /**
   * Complete appointment
   */
  static async completeAppointment(appointmentId: string, notes?: string): Promise<AppointmentRecord | null> {
    const appointment = await Appointment.getById(appointmentId);
    if (!appointment) {
      return null;
    }

    return Appointment.update(appointmentId, {
      status: 'completed',
      notes: notes || appointment.notes,
    } as any);
  }

  /**
   * Cancel appointment
   */
  static async cancelAppointment(appointmentId: string, reason?: string): Promise<AppointmentRecord | null> {
    const appointment = await Appointment.getById(appointmentId);
    if (!appointment) {
      return null;
    }

    return Appointment.update(appointmentId, {
      status: 'cancelled',
      notes: reason || appointment.notes,
    } as any);
  }

  /**
   * Mark appointment as no-show
   */
  static async markNoShow(appointmentId: string): Promise<AppointmentRecord | null> {
    return Appointment.updateStatus(appointmentId, 'no-show');
  }

  /**
   * Reschedule appointment
   */
  static async rescheduleAppointment(
    appointmentId: string,
    newDate: Date,
    newTime: string
  ): Promise<AppointmentRecord | null> {
    const appointment = await Appointment.getById(appointmentId);
    if (!appointment) {
      throw new Error('Appointment not found');
    }

    if (appointment.status === 'completed' || appointment.status === 'cancelled') {
      throw new Error('Cannot reschedule completed or cancelled appointments');
    }

    // Check for scheduling conflicts
    const existingAppointments = await Appointment.getByDateRange(newDate, new Date(newDate.getTime() + 86400000));

    const timeSlotTaken = existingAppointments.some(apt => {
      if (apt.providerId !== appointment.providerId || apt.id === appointmentId || apt.status === 'cancelled') {
        return false;
      }

      return this.isTimeSlotConflicting(newTime, apt.appointmentTime, apt.duration);
    });

    if (timeSlotTaken) {
      throw new Error('Time slot is not available');
    }

    return Appointment.update(appointmentId, {
      appointmentDate: newDate,
      appointmentTime: newTime,
    } as any);
  }

  /**
   * Get upcoming appointments for a patient
   */
  static async getUpcomingAppointments(patientId: string): Promise<AppointmentRecord[]> {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const appointments = await Appointment.getByPatientId(patientId, 0, 100);

    return appointments.filter(apt => {
      const aptDate = new Date(apt.appointmentDate);
      return aptDate >= today && (apt.status === 'scheduled' || apt.status === 'confirmed');
    });
  }

  /**
   * Get completed appointments for a patient
   */
  static async getCompletedAppointments(patientId: string, skip: number = 0, take: number = 10): Promise<AppointmentRecord[]> {
    const appointments = await Appointment.getByPatientId(patientId, skip, take);
    return appointments.filter(apt => apt.status === 'completed');
  }
}

export default AppointmentService;
