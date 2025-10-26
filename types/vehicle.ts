export interface Vehicle {
  id: string;
  make: string;
  model: string;
  year: number;
  vin: string;
  licensePlate: string;
  ownerId: string;
  color?: string;
  mileage?: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface VehicleCreateRequest {
  make: string;
  model: string;
  year: number;
  vin: string;
  licensePlate: string;
  ownerId: string;
  color?: string;
  mileage?: number;
}

export interface VehicleUpdateRequest {
  make?: string;
  model?: string;
  year?: number;
  vin?: string;
  licensePlate?: string;
  ownerId?: string;
  color?: string;
  mileage?: number;
}

export interface VehicleResponse {
  success: boolean;
  data?: Vehicle;
  error?: string;
}

export interface VehicleListResponse {
  success: boolean;
  data?: Vehicle[];
  count?: number;
  error?: string;
}