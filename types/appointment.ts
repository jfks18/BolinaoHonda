export type AppointmentStatus = 'scheduled' | 'confirmed' | 'in-progress' | 'completed' | 'cancelled' | 'no-show';

export interface Appointment {
  id: string;
  vehicleId: string;
  serviceId: string;
  customerId: string;
  scheduledDate: Date;
  status: AppointmentStatus;
  notes?: string;
  estimatedDuration?: number; // in minutes
  actualStartTime?: Date;
  actualEndTime?: Date;
  createdAt: Date;
  updatedAt: Date;
}

export interface AppointmentCreateRequest {
  vehicleId: string;
  serviceId: string;
  customerId: string;
  scheduledDate: string | Date;
  notes?: string;
  estimatedDuration?: number;
}

export interface AppointmentUpdateRequest {
  vehicleId?: string;
  serviceId?: string;
  customerId?: string;
  scheduledDate?: string | Date;
  status?: AppointmentStatus;
  notes?: string;
  estimatedDuration?: number;
  actualStartTime?: string | Date;
  actualEndTime?: string | Date;
}

export interface AppointmentResponse {
  success: boolean;
  data?: Appointment;
  error?: string;
}

export interface AppointmentListResponse {
  success: boolean;
  data?: Appointment[];
  count?: number;
  error?: string;
}