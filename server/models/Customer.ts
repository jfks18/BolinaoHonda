import { executeQuery } from '../config/database';
import { Customer, CustomerCreateRequest, CustomerUpdateRequest } from '../../types/customer';
import { v4 as uuidv4 } from 'uuid';

export class CustomerModel {
  static async findAll(): Promise<Customer[]> {
    const query = `
      SELECT 
        id, first_name as firstName, last_name as lastName, email, phone,
        address_street as addressStreet, address_city as addressCity,
        address_state as addressState, address_zip_code as addressZipCode,
        created_at as createdAt, updated_at as updatedAt
      FROM customers 
      ORDER BY created_at DESC
    `;
    
    const results = await executeQuery(query);
    return results.map((row: any) => ({
      id: row.id,
      firstName: row.firstName,
      lastName: row.lastName,
      email: row.email,
      phone: row.phone,
      address: row.addressStreet ? {
        street: row.addressStreet,
        city: row.addressCity,
        state: row.addressState,
        zipCode: row.addressZipCode
      } : undefined,
      createdAt: row.createdAt,
      updatedAt: row.updatedAt
    }));
  }

  static async findById(id: string): Promise<Customer | null> {
    const query = `
      SELECT 
        id, first_name as firstName, last_name as lastName, email, phone,
        address_street as addressStreet, address_city as addressCity,
        address_state as addressState, address_zip_code as addressZipCode,
        created_at as createdAt, updated_at as updatedAt
      FROM customers 
      WHERE id = ?
    `;
    const results = await executeQuery(query, [id]);
    
    if (results.length === 0) return null;
    
    const row = results[0];
    return {
      id: row.id,
      firstName: row.firstName,
      lastName: row.lastName,
      email: row.email,
      phone: row.phone,
      address: row.addressStreet ? {
        street: row.addressStreet,
        city: row.addressCity,
        state: row.addressState,
        zipCode: row.addressZipCode
      } : undefined,
      createdAt: row.createdAt,
      updatedAt: row.updatedAt
    };
  }

  static async create(customerData: CustomerCreateRequest): Promise<Customer> {
    const id = uuidv4();
    const query = `
      INSERT INTO customers (
        id, first_name, last_name, email, phone, 
        address_street, address_city, address_state, address_zip_code
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;
    
    await executeQuery(query, [
      id,
      customerData.firstName,
      customerData.lastName,
      customerData.email,
      customerData.phone,
      customerData.address?.street || null,
      customerData.address?.city || null,
      customerData.address?.state || null,
      customerData.address?.zipCode || null
    ]);

    const newCustomer = await this.findById(id);
    if (!newCustomer) {
      throw new Error('Failed to create customer');
    }
    return newCustomer;
  }

  static async update(id: string, customerData: CustomerUpdateRequest): Promise<Customer | null> {
    const fields = [];
    const values = [];

    if (customerData.firstName !== undefined) {
      fields.push('first_name = ?');
      values.push(customerData.firstName);
    }
    if (customerData.lastName !== undefined) {
      fields.push('last_name = ?');
      values.push(customerData.lastName);
    }
    if (customerData.email !== undefined) {
      fields.push('email = ?');
      values.push(customerData.email);
    }
    if (customerData.phone !== undefined) {
      fields.push('phone = ?');
      values.push(customerData.phone);
    }
    if (customerData.address !== undefined) {
      fields.push('address_street = ?', 'address_city = ?', 'address_state = ?', 'address_zip_code = ?');
      values.push(
        customerData.address?.street || null,
        customerData.address?.city || null,
        customerData.address?.state || null,
        customerData.address?.zipCode || null
      );
    }

    if (fields.length === 0) {
      return this.findById(id);
    }

    values.push(id);
    const query = `UPDATE customers SET ${fields.join(', ')} WHERE id = ?`;
    
    await executeQuery(query, values);
    return this.findById(id);
  }

  static async delete(id: string): Promise<boolean> {
    const query = 'DELETE FROM customers WHERE id = ?';
    const result: any = await executeQuery(query, [id]);
    return result.affectedRows > 0;
  }

  static async findByEmail(email: string): Promise<Customer | null> {
    const query = `
      SELECT 
        id, first_name as firstName, last_name as lastName, email, phone,
        address_street as addressStreet, address_city as addressCity,
        address_state as addressState, address_zip_code as addressZipCode,
        created_at as createdAt, updated_at as updatedAt
      FROM customers 
      WHERE email = ?
    `;
    const results = await executeQuery(query, [email]);
    
    if (results.length === 0) return null;
    
    const row = results[0];
    return {
      id: row.id,
      firstName: row.firstName,
      lastName: row.lastName,
      email: row.email,
      phone: row.phone,
      address: row.addressStreet ? {
        street: row.addressStreet,
        city: row.addressCity,
        state: row.addressState,
        zipCode: row.addressZipCode
      } : undefined,
      createdAt: row.createdAt,
      updatedAt: row.updatedAt
    };
  }
}