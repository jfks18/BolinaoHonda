import { executeQuery } from '../config/database';
import { Vehicle, VehicleCreateRequest, VehicleUpdateRequest } from '../../types/vehicle';
import { v4 as uuidv4 } from 'uuid';

export class VehicleModel {
  static async findAll(): Promise<Vehicle[]> {
    const query = `
      SELECT 
        id, make, model, year, vin, license_plate as licensePlate, 
        owner_id as ownerId, color, mileage, created_at as createdAt, 
        updated_at as updatedAt
      FROM vehicles 
      ORDER BY created_at DESC
    `;
    return await executeQuery(query);
  }

  static async findById(id: string): Promise<Vehicle | null> {
    const query = `
      SELECT 
        id, make, model, year, vin, license_plate as licensePlate, 
        owner_id as ownerId, color, mileage, created_at as createdAt, 
        updated_at as updatedAt
      FROM vehicles 
      WHERE id = ?
    `;
    const results = await executeQuery(query, [id]);
    return results.length > 0 ? results[0] : null;
  }

  static async create(vehicleData: VehicleCreateRequest): Promise<Vehicle> {
    const id = uuidv4();
    const query = `
      INSERT INTO vehicles (
        id, make, model, year, vin, license_plate, owner_id, color, mileage
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;
    
    await executeQuery(query, [
      id,
      vehicleData.make,
      vehicleData.model,
      vehicleData.year,
      vehicleData.vin,
      vehicleData.licensePlate,
      vehicleData.ownerId,
      vehicleData.color || null,
      vehicleData.mileage || null
    ]);

    const newVehicle = await this.findById(id);
    if (!newVehicle) {
      throw new Error('Failed to create vehicle');
    }
    return newVehicle;
  }

  static async update(id: string, vehicleData: VehicleUpdateRequest): Promise<Vehicle | null> {
    const fields = [];
    const values = [];

    if (vehicleData.make !== undefined) {
      fields.push('make = ?');
      values.push(vehicleData.make);
    }
    if (vehicleData.model !== undefined) {
      fields.push('model = ?');
      values.push(vehicleData.model);
    }
    if (vehicleData.year !== undefined) {
      fields.push('year = ?');
      values.push(vehicleData.year);
    }
    if (vehicleData.vin !== undefined) {
      fields.push('vin = ?');
      values.push(vehicleData.vin);
    }
    if (vehicleData.licensePlate !== undefined) {
      fields.push('license_plate = ?');
      values.push(vehicleData.licensePlate);
    }
    if (vehicleData.ownerId !== undefined) {
      fields.push('owner_id = ?');
      values.push(vehicleData.ownerId);
    }
    if (vehicleData.color !== undefined) {
      fields.push('color = ?');
      values.push(vehicleData.color);
    }
    if (vehicleData.mileage !== undefined) {
      fields.push('mileage = ?');
      values.push(vehicleData.mileage);
    }

    if (fields.length === 0) {
      return this.findById(id);
    }

    values.push(id);
    const query = `UPDATE vehicles SET ${fields.join(', ')} WHERE id = ?`;
    
    await executeQuery(query, values);
    return this.findById(id);
  }

  static async delete(id: string): Promise<boolean> {
    const query = 'DELETE FROM vehicles WHERE id = ?';
    const result: any = await executeQuery(query, [id]);
    return result.affectedRows > 0;
  }

  static async findByOwnerId(ownerId: string): Promise<Vehicle[]> {
    const query = `
      SELECT 
        id, make, model, year, vin, license_plate as licensePlate, 
        owner_id as ownerId, color, mileage, created_at as createdAt, 
        updated_at as updatedAt
      FROM vehicles 
      WHERE owner_id = ?
      ORDER BY created_at DESC
    `;
    return await executeQuery(query, [ownerId]);
  }
}