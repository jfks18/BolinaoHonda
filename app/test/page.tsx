'use client';

import { useColorAvailability } from '../../hooks/useColorAvailability';

export default function TestPage() {
  const { 
    colorAvailability, 
    toggleColorAvailability, 
    toggleModelAvailability,
    isColorAvailable,
    isModelAvailable
  } = useColorAvailability();

  const testToggleColor = () => {
    console.log('Testing color toggle for motorcycle 1, color 0');
    toggleColorAvailability('1', 0);
  };

  const testToggleModel = () => {
    console.log('Testing model toggle for motorcycle 1');
    toggleModelAvailability('1');
  };

  return (
    <div className="container py-5">
      <h1>Color Availability Test</h1>
      <div className="mb-3">
        <h3>Current State:</h3>
        <pre>{JSON.stringify(colorAvailability, null, 2)}</pre>
      </div>
      
      <div className="mb-3">
        <h3>PCX 160 Model Available:</h3>
        <p>{isModelAvailable('1') ? '✅ Model Available' : '❌ Model Not Available'}</p>
      </div>

      <div className="mb-3">
        <h3>PCX 160 First Color Available:</h3>
        <p>{isColorAvailable('1', 0) ? '✅ Available' : '❌ Not Available'}</p>
      </div>

      <div className="mb-3">
        <button 
          className="btn btn-danger me-2"
          onClick={testToggleModel}
        >
          Toggle PCX 160 Model
        </button>
        <button 
          className="btn btn-primary"
          onClick={testToggleColor}
        >
          Toggle PCX 160 First Color
        </button>
      </div>

      <div className="mt-4">
        <a href="/" className="btn btn-secondary me-2">Home</a>
        <a href="/admin" className="btn btn-warning">Admin</a>
      </div>
    </div>
  );
}