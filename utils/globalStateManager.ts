'use client';

// Global state manager for real-time updates
class ColorAvailabilityManager {
  private listeners: Set<(data: any) => void> = new Set();
  private currentData: any = null;

  subscribe(callback: (data: any) => void) {
    this.listeners.add(callback);
    // Immediately call with current data if available
    if (this.currentData) {
      callback(this.currentData);
    }
    
    return () => {
      this.listeners.delete(callback);
    };
  }

  notify(data: any) {
    this.currentData = data;
    console.log('🌐 GLOBAL MANAGER NOTIFYING:', this.listeners.size, 'listeners');
    this.listeners.forEach(callback => {
      try {
        callback(data);
      } catch (error) {
        console.error('Error in listener callback:', error);
      }
    });
  }

  getCurrentData() {
    return this.currentData;
  }
}

// Global instance
export const colorAvailabilityManager = new ColorAvailabilityManager();