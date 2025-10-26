'use client';

// Utility functions for image management
export const getMotorcycleImage = (motorcycleId: string, colorIndex: number, fallbackImage: string): string => {
  if (typeof window === 'undefined') return fallbackImage;
  
  try {
    const imageKey = `motorcycle-image-${motorcycleId}-${colorIndex}`;
    const storedImage = localStorage.getItem(imageKey);
    
    // Return stored image if it exists and is valid base64
    if (storedImage && storedImage.startsWith('data:image/')) {
      return storedImage;
    }
  } catch (error) {
    console.error('Error loading stored image:', error);
  }
  
  return fallbackImage;
};

export const hasCustomImage = (motorcycleId: string, colorIndex: number): boolean => {
  if (typeof window === 'undefined') return false;
  
  const imageKey = `motorcycle-image-${motorcycleId}-${colorIndex}`;
  return localStorage.getItem(imageKey) !== null;
};

export const removeCustomImage = (motorcycleId: string, colorIndex: number): void => {
  if (typeof window === 'undefined') return;
  
  const imageKey = `motorcycle-image-${motorcycleId}-${colorIndex}`;
  localStorage.removeItem(imageKey);
};