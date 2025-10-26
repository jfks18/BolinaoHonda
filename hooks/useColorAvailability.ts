'use client';

import { useState, useEffect } from 'react';
import { ColorAvailability, defaultColorAvailability } from '../data/colorAvailability';
import { colorAvailabilityManager } from '../utils/globalStateManager';

const STORAGE_KEY = 'colorAvailability';

// Custom event for real-time updates
const COLOR_AVAILABILITY_CHANGED = 'colorAvailabilityChanged';

export const useColorAvailability = () => {
  const [colorAvailability, setColorAvailability] = useState<ColorAvailability>(defaultColorAvailability);
  const [isClient, setIsClient] = useState(false);

  // Ensure we're on the client side
  useEffect(() => {
    setIsClient(true);
  }, []);

  // Load from localStorage on mount
  useEffect(() => {
    if (!isClient) return;
    
    const loadAvailability = () => {
      try {
        const saved = localStorage.getItem(STORAGE_KEY);
        if (saved) {
          const parsed = JSON.parse(saved);
          setColorAvailability(parsed);
        }
      } catch (error) {
        console.error('Error loading color availability:', error);
      }
    };

    loadAvailability();
  }, [isClient]);

  // Listen for real-time updates from other components (optimized to prevent flickering)
  useEffect(() => {
    if (!isClient) return;
    
    let lastUpdateTime = 0;
    const UPDATE_THROTTLE = 100; // Throttle updates to prevent rapid flickering
    
    const handleUpdate = (event: CustomEvent) => {
      const now = Date.now();
      if (now - lastUpdateTime < UPDATE_THROTTLE) return;
      lastUpdateTime = now;
      
      const newData = event.detail;
      
      // Deep comparison to prevent unnecessary updates
      setColorAvailability(current => {
        if (JSON.stringify(newData) === JSON.stringify(current)) {
          return current; // No change, keep current state
        }
        return newData;
      });
    };

    // Global state manager subscription (throttled)
    const unsubscribe = colorAvailabilityManager.subscribe((newData) => {
      const now = Date.now();
      if (now - lastUpdateTime < UPDATE_THROTTLE) return;
      lastUpdateTime = now;
      
      setColorAvailability(current => {
        if (JSON.stringify(newData) === JSON.stringify(current)) {
          return current; // No change, keep current state
        }
        return newData;
      });
    });

    // Single event listener (removed duplicate document listener)
    window.addEventListener(COLOR_AVAILABILITY_CHANGED, handleUpdate as EventListener);
    
    // Storage event listener for cross-tab synchronization (throttled)
    const handleStorageChange = (event: StorageEvent) => {
      if (event.key === STORAGE_KEY && event.newValue) {
        const now = Date.now();
        if (now - lastUpdateTime < UPDATE_THROTTLE) return;
        lastUpdateTime = now;
        
        try {
          const parsed = JSON.parse(event.newValue);
          setColorAvailability(current => {
            if (JSON.stringify(parsed) === JSON.stringify(current)) {
              return current; // No change, keep current state
            }
            return parsed;
          });
        } catch (error) {
          console.error('Error parsing storage change:', error);
        }
      }
    };
    
    window.addEventListener('storage', handleStorageChange);
    
    // Reduced polling frequency and throttled updates
    const pollInterval = setInterval(() => {
      const now = Date.now();
      if (now - lastUpdateTime < 500) return; // Skip if recent update
      
      try {
        const saved = localStorage.getItem(STORAGE_KEY);
        if (saved) {
          const parsed = JSON.parse(saved);
          setColorAvailability(current => {
            if (JSON.stringify(parsed) === JSON.stringify(current)) {
              return current; // No change, keep current state
            }
            return parsed;
          });
        }
      } catch (error) {
        console.error('Error in polling:', error);
      }
    }, 2000); // Increased from 1000ms to 2000ms
    
    return () => {
      unsubscribe();
      window.removeEventListener(COLOR_AVAILABILITY_CHANGED, handleUpdate as EventListener);
      window.removeEventListener('storage', handleStorageChange);
      clearInterval(pollInterval);
    };
  }, [isClient]); // Removed colorAvailability dependency to prevent infinite loops

  // Update availability and broadcast to other components
  const updateColorAvailability = (newAvailability: ColorAvailability) => {
    if (!isClient) return;
    
    console.log('📤 UPDATING AVAILABILITY:', newAvailability);
    
    // Save to localStorage FIRST
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(newAvailability));
      console.log('💾 Saved to localStorage FIRST');
    } catch (error) {
      console.error('Error saving color availability:', error);
    }
    
    // Update state immediately
    setColorAvailability(newAvailability);

    // Notify global state manager
    colorAvailabilityManager.notify(newAvailability);
    
    // Single broadcast event (no duplicate dispatches)
    const event = new CustomEvent(COLOR_AVAILABILITY_CHANGED, {
      detail: newAvailability,
      bubbles: true
    });
    
    // Dispatch only once
    window.dispatchEvent(event);
  };

  // Toggle specific color availability
  const toggleColorAvailability = (motorcycleId: string, colorIndex: number) => {
    console.log('🔄 TOGGLE CALLED:', { motorcycleId, colorIndex });
    console.log('📊 Current state:', colorAvailability[motorcycleId]?.[colorIndex]);
    
    const newAvailability = {
      ...colorAvailability,
      [motorcycleId]: {
        ...colorAvailability[motorcycleId],
        [colorIndex]: !colorAvailability[motorcycleId]?.[colorIndex]
      }
    };
    
    console.log('🆕 New availability value:', newAvailability[motorcycleId][colorIndex]);
    updateColorAvailability(newAvailability);
  };

  // Reset all colors to available
  const resetAllAvailability = () => {
    updateColorAvailability(defaultColorAvailability);
  };

  // Check if a specific color is available
  const isColorAvailable = (motorcycleId: string, colorIndex: number): boolean => {
    return colorAvailability[motorcycleId]?.[colorIndex] !== false;
  };

  // Toggle model availability
  const toggleModelAvailability = (motorcycleId: string) => {
    console.log('🏍️ TOGGLE MODEL CALLED:', { motorcycleId });
    console.log('📊 Current model state:', colorAvailability[motorcycleId]?.modelAvailable);
    
    const newAvailability = {
      ...colorAvailability,
      [motorcycleId]: {
        ...colorAvailability[motorcycleId],
        modelAvailable: !colorAvailability[motorcycleId]?.modelAvailable
      }
    };
    
    console.log('🆕 New model availability:', newAvailability[motorcycleId].modelAvailable);
    updateColorAvailability(newAvailability);
  };

  // Check if a model is available
  const isModelAvailable = (motorcycleId: string): boolean => {
    return colorAvailability[motorcycleId]?.modelAvailable !== false;
  };

  return {
    colorAvailability,
    updateColorAvailability,
    toggleColorAvailability,
    toggleModelAvailability,
    resetAllAvailability,
    isColorAvailable,
    isModelAvailable
  };
};