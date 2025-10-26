import { executeQuery } from '../config/database';
import { Service, ServiceCreateRequest, ServiceUpdateRequest } from '../../types/service';
import { v4 as uuidv4 } from 'uuid';

export class ServiceModel {
  static async findAll(category?: string): Promise<Service[]> {
    let query = `
      SELECT 
        id, name, description, price, duration, category, 
        is_active as isActive, created_at as createdAt, 
        updated_at as updatedAt
      FROM services 
    `;
    const params: any[] = [];

    if (category) {
      query += ' WHERE category = ?';
      params.push(category);
    }

    query += ' ORDER BY created_at DESC';
    return await executeQuery(query, params);
  }

  static async findById(id: string): Promise<Service | null> {
    const query = `
      SELECT 
        id, name, description, price, duration, category, 
        is_active as isActive, created_at as createdAt, 
        updated_at as updatedAt
      FROM services 
      WHERE id = ?
    `;
    const results = await executeQuery(query, [id]);
    return results.length > 0 ? results[0] : null;
  }

  static async create(serviceData: ServiceCreateRequest): Promise<Service> {
    const id = uuidv4();
    const query = `
      INSERT INTO services (
        id, name, description, price, duration, category, is_active
      ) VALUES (?, ?, ?, ?, ?, ?, ?)
    `;
    
    await executeQuery(query, [
      id,
      serviceData.name,
      serviceData.description || '',
      serviceData.price,
      serviceData.duration,
      serviceData.category,
      serviceData.isActive !== undefined ? serviceData.isActive : true
    ]);

    const newService = await this.findById(id);
    if (!newService) {
      throw new Error('Failed to create service');
    }
    return newService;
  }

  static async update(id: string, serviceData: ServiceUpdateRequest): Promise<Service | null> {
    const fields = [];
    const values = [];

    if (serviceData.name !== undefined) {
      fields.push('name = ?');
      values.push(serviceData.name);
    }
    if (serviceData.description !== undefined) {
      fields.push('description = ?');
      values.push(serviceData.description);
    }
    if (serviceData.price !== undefined) {
      fields.push('price = ?');
      values.push(serviceData.price);
    }
    if (serviceData.duration !== undefined) {
      fields.push('duration = ?');
      values.push(serviceData.duration);
    }
    if (serviceData.category !== undefined) {
      fields.push('category = ?');
      values.push(serviceData.category);
    }
    if (serviceData.isActive !== undefined) {
      fields.push('is_active = ?');
      values.push(serviceData.isActive);
    }

    if (fields.length === 0) {
      return this.findById(id);
    }

    values.push(id);
    const query = `UPDATE services SET ${fields.join(', ')} WHERE id = ?`;
    
    await executeQuery(query, values);
    return this.findById(id);
  }

  static async delete(id: string): Promise<boolean> {
    const query = 'DELETE FROM services WHERE id = ?';
    const result: any = await executeQuery(query, [id]);
    return result.affectedRows > 0;
  }

  static async findByCategory(category: string): Promise<Service[]> {
    const query = `
      SELECT 
        id, name, description, price, duration, category, 
        is_active as isActive, created_at as createdAt, 
        updated_at as updatedAt
      FROM services 
      WHERE category = ? AND is_active = TRUE
      ORDER BY name ASC
    `;
    return await executeQuery(query, [category]);
  }
}