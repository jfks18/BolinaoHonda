'use client';

import { useState, useEffect } from 'react';
import { motorcycles } from '../../data/motorcycles';
import { useColorAvailability } from '../../hooks/useColorAvailability';

export default function AdminPanel() {
  const { 
    colorAvailability, 
    toggleColorAvailability, 
    toggleModelAvailability,
    resetAllAvailability,
    isColorAvailable,
    isModelAvailable
  } = useColorAvailability();
  
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [uploadingImages, setUploadingImages] = useState<{[key: string]: boolean}>({});
  const [imageUrls, setImageUrls] = useState<{[key: string]: string}>({});

  const handleLogin = () => {
    // Simple password protection - you can change this
    if (password === 'honda2025') {
      setIsAuthenticated(true);
    } else {
      alert('Incorrect password!');
    }
  };

  const handleImageUpload = async (motorcycleId: string, colorIndex: number, file: File) => {
    const uploadKey = `${motorcycleId}-${colorIndex}`;
    setUploadingImages(prev => ({ ...prev, [uploadKey]: true }));
    
    try {
      // Convert file to base64 for storage
      const reader = new FileReader();
      reader.onload = (e) => {
        const imageData = e.target?.result as string;
        
        // Save to localStorage with motorcycle and color info
        const imageKey = `motorcycle-image-${motorcycleId}-${colorIndex}`;
        localStorage.setItem(imageKey, imageData);
        
        // Update state immediately (no page reload)
        setImageUrls(prev => ({ ...prev, [uploadKey]: imageData }));
        
        console.log(`🖼️ Image uploaded for ${motorcycleId} color ${colorIndex}`);
        
        setUploadingImages(prev => ({ ...prev, [uploadKey]: false }));
      };
      reader.readAsDataURL(file);
      
    } catch (error) {
      console.error('Error uploading image:', error);
      alert('Error uploading image. Please try again.');
      setUploadingImages(prev => ({ ...prev, [uploadKey]: false }));
    }
  };

  const getStoredImageUrl = (motorcycleId: string, colorIndex: number) => {
    const uploadKey = `${motorcycleId}-${colorIndex}`;
    const imageKey = `motorcycle-image-${motorcycleId}-${colorIndex}`;
    
    // Check state first (for immediate updates), then localStorage
    return imageUrls[uploadKey] || localStorage.getItem(imageKey);
  };

  const deleteCustomImage = (motorcycleId: string, colorIndex: number) => {
    const uploadKey = `${motorcycleId}-${colorIndex}`;
    const imageKey = `motorcycle-image-${motorcycleId}-${colorIndex}`;
    
    localStorage.removeItem(imageKey);
    
    // Update state immediately (no page reload)
    setImageUrls(prev => {
      const newUrls = { ...prev };
      delete newUrls[uploadKey];
      return newUrls;
    });
    
    console.log(`🖼️ Image deleted for ${motorcycleId} color ${colorIndex}`);
  };

  const hasCustomImage = (motorcycleId: string, colorIndex: number) => {
    const uploadKey = `${motorcycleId}-${colorIndex}`;
    const imageKey = `motorcycle-image-${motorcycleId}-${colorIndex}`;
    
    // Check state first, then localStorage
    return imageUrls[uploadKey] !== undefined || localStorage.getItem(imageKey) !== null;
  };

  // Load existing images on mount
  useEffect(() => {
    if (isAuthenticated) {
      const loadedImages: {[key: string]: string} = {};
      motorcycles.forEach(motorcycle => {
        motorcycle.colors.forEach((_, colorIndex) => {
          const uploadKey = `${motorcycle.id}-${colorIndex}`;
          const imageKey = `motorcycle-image-${motorcycle.id}-${colorIndex}`;
          const storedImage = localStorage.getItem(imageKey);
          if (storedImage) {
            loadedImages[uploadKey] = storedImage;
          }
        });
      });
      setImageUrls(loadedImages);
    }
  }, [isAuthenticated]);

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen d-flex align-items-center justify-content-center" style={{ background: 'linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%)' }}>
        <div className="card shadow-strong rounded-modern-lg border-0" style={{ maxWidth: '450px', width: '100%' }}>
          <div className="card-body p-5">
            <div className="text-center mb-5">
              <div className="mb-4">
                <div className="honda-logo gradient-text" style={{ fontSize: '3rem', color: '#dc143c !important' }}>HONDA</div>
                <div className="small text-muted mt-1">Bolinao Branch</div>
              </div>
              <h4 className="card-title fw-bold text-professional mb-2">Admin Access</h4>
              <p className="text-muted mb-0">Secure access to motorcycle inventory management</p>
            </div>
            <div className="mb-4">
              <div className="form-floating">
                <input
                  type="password"
                  className="form-control rounded-modern shadow-soft"
                  id="adminPassword"
                  placeholder="Enter admin password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleLogin()}
                />
                <label htmlFor="adminPassword">Admin Password</label>
              </div>
            </div>
            <button 
              className="btn btn-honda w-100 py-3 mb-4"
              onClick={handleLogin}
            >
              🔐 Access Admin Panel
            </button>
            <div className="text-center">
              <a href="/" className="text-decoration-none text-professional small">
                ← Back to Showroom
              </a>
            </div>
            <div className="text-center mt-4 pt-3 border-top">
              <small className="text-muted">
                🔒 Authorized personnel only
              </small>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-light">
      {/* Header */}
      <header className="header-section">
        <div className="container">
          <div className="d-flex justify-content-between align-items-center py-4">
            <div>
              <div className="honda-logo" style={{ fontSize: '2.5rem' }}>HONDA</div>
              <div className="text-white-50 fw-semibold">Admin Panel - Inventory Management</div>
              <div className="small text-white-50 mt-1">🔧 Professional Control Center</div>
            </div>
            <div className="d-flex gap-3">
              <a href="/" className="btn btn-outline-light rounded-modern">
                <span className="d-block">🏍️</span>
                <span className="small">Showroom</span>
              </a>
              <button 
                className="btn btn-outline-light rounded-modern"
                onClick={() => setIsAuthenticated(false)}
              >
                <span className="d-block">🚪</span>
                <span className="small">Logout</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="container py-5">
        <div className="row mb-5">
          <div className="col-12">
            <div className="bg-professional rounded-modern-lg p-4 shadow-medium">
              <div className="d-flex justify-content-between align-items-center flex-wrap gap-3">
                <div>
                  <h2 className="gradient-text fw-bold mb-2">Inventory Management</h2>
                  <p className="text-professional mb-2">Control motorcycle model and color availability in real-time</p>
                  <div className="d-flex align-items-center gap-3">
                    <span className="badge bg-success">✓ Real-time Updates</span>
                    <span className="badge bg-primary">🔄 Auto-sync</span>
                    <span className="badge bg-honda-orange">📊 Analytics Ready</span>
                  </div>
                </div>
                <div className="d-flex flex-column gap-2">
                  <button 
                    className="btn btn-honda rounded-modern px-4"
                    onClick={() => {
                      if (confirm('Are you sure you want to reset all colors to available?')) {
                        resetAllAvailability();
                      }
                    }}
                  >
                    🔄 Reset All Available
                  </button>
                  <small className="text-muted text-center">Quick restore function</small>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="row g-4">
          {motorcycles.map((motorcycle) => (
            <div key={motorcycle.id} className="col-lg-6 col-xl-4">
              <div className={`card shadow-medium rounded-modern-lg border-0 overflow-hidden ${!isModelAvailable(motorcycle.id) ? 'border-danger' : ''}`}>
                <div className={`card-header text-white d-flex justify-content-between align-items-center position-relative ${
                  isModelAvailable(motorcycle.id) ? 'bg-honda-orange' : 'bg-danger'
                }`} style={{ background: isModelAvailable(motorcycle.id) ? 'linear-gradient(135deg, #ff8c00 0%, #ea580c 100%)' : undefined }}>
                  <div>
                    <h6 className="card-title mb-0 fw-bold">{motorcycle.name}</h6>
                    <small>₱{motorcycle.price.toLocaleString()}</small>
                  </div>
                  <div className="form-check form-switch">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      checked={isModelAvailable(motorcycle.id)}
                      onChange={() => toggleModelAvailability(motorcycle.id)}
                      title="Toggle model availability"
                    />
                    <label className="form-check-label small">
                      {isModelAvailable(motorcycle.id) ? 'Available' : 'Not Available'}
                    </label>
                  </div>
                </div>
                <div className="card-body">
                  <div className="row g-3">
                    {motorcycle.colors.map((color, colorIndex) => {
                      const isAvailable = isColorAvailable(motorcycle.id, colorIndex);
                      
                      return (
                        <div key={colorIndex} className="col-12">
                          <div 
                            className={`rounded-modern p-4 shadow-soft position-relative ${
                              isAvailable ? 'bg-white border border-success' : 'bg-danger bg-opacity-10 border border-danger'
                            }`}
                            style={{ 
                              transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                              cursor: 'pointer'
                            }}
                            onMouseEnter={(e) => {
                              e.currentTarget.style.transform = 'translateY(-2px)';
                              e.currentTarget.style.boxShadow = 'var(--shadow-lg)';
                            }}
                            onMouseLeave={(e) => {
                              e.currentTarget.style.transform = 'translateY(0)';
                              e.currentTarget.style.boxShadow = 'var(--shadow-soft)';
                            }}
                          >
                            <div className="row align-items-center">
                              {/* Color Circle and Info */}
                              <div className="col-md-8">
                                <div 
                                  className="d-flex align-items-center"
                                  onClick={() => toggleColorAvailability(motorcycle.id, colorIndex)}
                                  style={{ cursor: 'pointer' }}
                                >
                                  <div 
                                    className="me-3 position-relative"
                                    style={{ 
                                      backgroundColor: color.code,
                                      width: '40px',
                                      height: '40px',
                                      borderRadius: '50%',
                                      border: `3px solid ${isAvailable ? '#28a745' : '#dc3545'}`,
                                      transition: 'all 0.3s ease'
                                    }}
                                  >
                                    {!isAvailable && (
                                      <div className="position-absolute top-50 start-50 translate-middle">
                                        <span style={{ 
                                          fontSize: '20px', 
                                          color: '#dc3545', 
                                          fontWeight: 'bold',
                                          textShadow: '1px 1px 2px white'
                                        }}>✕</span>
                                      </div>
                                    )}
                                  </div>
                                  <div className="flex-grow-1">
                                    <div className="fw-semibold">{color.name}</div>
                                    <div className={`small fw-bold ${isAvailable ? 'text-success' : 'text-danger'}`}>
                                      {isAvailable ? '✅ Available' : '❌ Not Available'}
                                    </div>
                                  </div>
                                  <div className="form-check form-switch">
                                    <input
                                      className="form-check-input"
                                      type="checkbox"
                                      checked={isAvailable}
                                      onChange={(e) => {
                                        e.stopPropagation();
                                        toggleColorAvailability(motorcycle.id, colorIndex);
                                      }}
                                      style={{ cursor: 'pointer' }}
                                    />
                                  </div>
                                </div>
                              </div>
                              
                              {/* Image Upload Section */}
                              <div className="col-md-4">
                                <div className="d-flex flex-column gap-2">
                                  <div className="d-flex align-items-center gap-2">
                                    {/* Upload Button */}
                                    <input
                                      type="file"
                                      accept="image/*"
                                      className="form-control form-control-sm"
                                      onChange={(e) => {
                                        const file = e.target.files?.[0];
                                        if (file) {
                                          // Check file size (max 5MB)
                                          if (file.size > 5 * 1024 * 1024) {
                                            alert('File size must be less than 5MB');
                                            return;
                                          }
                                          handleImageUpload(motorcycle.id, colorIndex, file);
                                        }
                                      }}
                                      disabled={uploadingImages[`${motorcycle.id}-${colorIndex}`]}
                                      style={{ fontSize: '12px' }}
                                    />
                                    
                                    {/* Delete Button */}
                                    {hasCustomImage(motorcycle.id, colorIndex) && (
                                      <button
                                        className="btn btn-danger btn-sm"
                                        onClick={() => deleteCustomImage(motorcycle.id, colorIndex)}
                                        title="Delete custom image"
                                      >
                                        🗑️
                                      </button>
                                    )}
                                  </div>
                                  
                                  {/* Status and Upload Info */}
                                  <div>
                                    {uploadingImages[`${motorcycle.id}-${colorIndex}`] && (
                                      <div className="small text-primary">
                                        📤 Uploading...
                                      </div>
                                    )}
                                    <div className="small text-muted">
                                      📷 Upload {color.name} image
                                      {hasCustomImage(motorcycle.id, colorIndex) && (
                                        <span className="text-success fw-semibold"> • Custom image active</span>
                                      )}
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="row mt-5">
          <div className="col-12">
            <div className="card">
              <div className="card-body">
                <h6 className="card-title">Instructions:</h6>
                <ul className="small text-muted mb-0">
                  <li>Click on any color card or toggle the switch to change availability</li>
                  <li>Red border indicates unavailable colors</li>
                  <li>Changes are automatically saved and will appear on the showroom</li>
                  <li>Use "Reset All to Available" to make all colors available again</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}