// Re-export all types from their respective modules
export * from './vehicle';
export * from './service';
export * from './appointment';
export * from './customer';

// Common API response types
export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

export interface PaginatedResponse<T = any> {
  success: boolean;
  data?: T[];
  count?: number;
  totalCount?: number;
  page?: number;
  limit?: number;
  error?: string;
}

// Database connection types
export interface DatabaseConfig {
  host: string;
  port: number;
  database: string;
  username: string;
  password: string;
}

export interface ConnectionOptions {
  maxConnections?: number;
  timeout?: number;
  retryAttempts?: number;
  ssl?: boolean;
}

// Error types
export interface ApiError {
  status: number;
  message: string;
  code?: string;
  details?: any;
}

// Request/Response utilities
export interface QueryParams {
  page?: number;
  limit?: number;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
  search?: string;
}

export interface RequestContext {
  userId?: string;
  userRole?: string;
  timestamp: Date;
  ip?: string;
  userAgent?: string;
}