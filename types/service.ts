export type ServiceCategory = 'maintenance' | 'repair' | 'inspection' | 'upgrade' | 'diagnostic';

export interface Service {
  id: string;
  name: string;
  description: string;
  price: number;
  duration: number; // in minutes
  category: ServiceCategory;
  isActive?: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface ServiceCreateRequest {
  name: string;
  description?: string;
  price: number;
  duration: number;
  category: ServiceCategory;
  isActive?: boolean;
}

export interface ServiceUpdateRequest {
  name?: string;
  description?: string;
  price?: number;
  duration?: number;
  category?: ServiceCategory;
  isActive?: boolean;
}

export interface ServiceResponse {
  success: boolean;
  data?: Service;
  error?: string;
}

export interface ServiceListResponse {
  success: boolean;
  data?: Service[];
  count?: number;
  error?: string;
}