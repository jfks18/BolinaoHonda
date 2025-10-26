import { executeQuery } from '../config/database';
import { Appointment, AppointmentCreateRequest, AppointmentUpdateRequest } from '../../types/appointment';
import { v4 as uuidv4 } from 'uuid';

export class AppointmentModel {
  static async findAll(filters?: { status?: string; vehicleId?: string; customerId?: string }): Promise<Appointment[]> {
    let query = `
      SELECT 
        id, vehicle_id as vehicleId, service_id as serviceId, 
        customer_id as customerId, scheduled_date as scheduledDate, 
        status, notes, estimated_duration as estimatedDuration, 
        actual_start_time as actualStartTime, actual_end_time as actualEndTime,
        created_at as createdAt, updated_at as updatedAt
      FROM appointments 
      WHERE 1=1
    `;
    const params: any[] = [];

    if (filters?.status) {
      query += ' AND status = ?';
      params.push(filters.status);
    }

    if (filters?.vehicleId) {
      query += ' AND vehicle_id = ?';
      params.push(filters.vehicleId);
    }

    if (filters?.customerId) {
      query += ' AND customer_id = ?';
      params.push(filters.customerId);
    }

    query += ' ORDER BY scheduled_date DESC';
    return await executeQuery(query, params);
  }

  static async findById(id: string): Promise<Appointment | null> {
    const query = `
      SELECT 
        id, vehicle_id as vehicleId, service_id as serviceId, 
        customer_id as customerId, scheduled_date as scheduledDate, 
        status, notes, estimated_duration as estimatedDuration, 
        actual_start_time as actualStartTime, actual_end_time as actualEndTime,
        created_at as createdAt, updated_at as updatedAt
      FROM appointments 
      WHERE id = ?
    `;
    const results = await executeQuery(query, [id]);
    return results.length > 0 ? results[0] : null;
  }

  static async create(appointmentData: AppointmentCreateRequest): Promise<Appointment> {
    const id = uuidv4();
    const query = `
      INSERT INTO appointments (
        id, vehicle_id, service_id, customer_id, scheduled_date, 
        notes, estimated_duration
      ) VALUES (?, ?, ?, ?, ?, ?, ?)
    `;
    
    await executeQuery(query, [
      id,
      appointmentData.vehicleId,
      appointmentData.serviceId,
      appointmentData.customerId,
      new Date(appointmentData.scheduledDate),
      appointmentData.notes || '',
      appointmentData.estimatedDuration || null
    ]);

    const newAppointment = await this.findById(id);
    if (!newAppointment) {
      throw new Error('Failed to create appointment');
    }
    return newAppointment;
  }

  static async update(id: string, appointmentData: AppointmentUpdateRequest): Promise<Appointment | null> {
    const fields = [];
    const values = [];

    if (appointmentData.vehicleId !== undefined) {
      fields.push('vehicle_id = ?');
      values.push(appointmentData.vehicleId);
    }
    if (appointmentData.serviceId !== undefined) {
      fields.push('service_id = ?');
      values.push(appointmentData.serviceId);
    }
    if (appointmentData.customerId !== undefined) {
      fields.push('customer_id = ?');
      values.push(appointmentData.customerId);
    }
    if (appointmentData.scheduledDate !== undefined) {
      fields.push('scheduled_date = ?');
      values.push(new Date(appointmentData.scheduledDate));
    }
    if (appointmentData.status !== undefined) {
      fields.push('status = ?');
      values.push(appointmentData.status);
    }
    if (appointmentData.notes !== undefined) {
      fields.push('notes = ?');
      values.push(appointmentData.notes);
    }
    if (appointmentData.estimatedDuration !== undefined) {
      fields.push('estimated_duration = ?');
      values.push(appointmentData.estimatedDuration);
    }
    if (appointmentData.actualStartTime !== undefined) {
      fields.push('actual_start_time = ?');
      values.push(appointmentData.actualStartTime ? new Date(appointmentData.actualStartTime) : null);
    }
    if (appointmentData.actualEndTime !== undefined) {
      fields.push('actual_end_time = ?');
      values.push(appointmentData.actualEndTime ? new Date(appointmentData.actualEndTime) : null);
    }

    if (fields.length === 0) {
      return this.findById(id);
    }

    values.push(id);
    const query = `UPDATE appointments SET ${fields.join(', ')} WHERE id = ?`;
    
    await executeQuery(query, values);
    return this.findById(id);
  }

  static async delete(id: string): Promise<boolean> {
    const query = 'DELETE FROM appointments WHERE id = ?';
    const result: any = await executeQuery(query, [id]);
    return result.affectedRows > 0;
  }

  static async findByDateRange(startDate: Date, endDate: Date): Promise<Appointment[]> {
    const query = `
      SELECT 
        id, vehicle_id as vehicleId, service_id as serviceId, 
        customer_id as customerId, scheduled_date as scheduledDate, 
        status, notes, estimated_duration as estimatedDuration, 
        actual_start_time as actualStartTime, actual_end_time as actualEndTime,
        created_at as createdAt, updated_at as updatedAt
      FROM appointments 
      WHERE scheduled_date BETWEEN ? AND ?
      ORDER BY scheduled_date ASC
    `;
    return await executeQuery(query, [startDate, endDate]);
  }

  static async findUpcoming(limit: number = 10): Promise<Appointment[]> {
    const query = `
      SELECT 
        id, vehicle_id as vehicleId, service_id as serviceId, 
        customer_id as customerId, scheduled_date as scheduledDate, 
        status, notes, estimated_duration as estimatedDuration, 
        actual_start_time as actualStartTime, actual_end_time as actualEndTime,
        created_at as createdAt, updated_at as updatedAt
      FROM appointments 
      WHERE scheduled_date >= NOW() AND status IN ('scheduled', 'confirmed')
      ORDER BY scheduled_date ASC
      LIMIT ?
    `;
    return await executeQuery(query, [limit]);
  }
}