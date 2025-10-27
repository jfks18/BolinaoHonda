'use client';

import { useState, useEffect, useCallback, useMemo, memo } from 'react';
import { motorcycles, Motorcycle } from '../data/motorcycles';
import { useColorAvailability } from '../hooks/useColorAvailability';
import { getMotorcycleImage } from '../utils/imageManager';

// Memoized motorcycle card component to prevent unnecessary re-renders
const MotorcycleCard = memo(({ 
  motorcycle, 
  selectedColors, 
  isClient, 
  imageUrls, 
  isModelAvailable, 
  isColorAvailable, 
  handleColorChange, 
  handleViewDetails, 
  getMotorcycleImageUrl, 
  formatPrice 
}: {
  motorcycle: Motorcycle;
  selectedColors: {[key: string]: number};
  isClient: boolean;
  imageUrls: {[key: string]: string};
  isModelAvailable: (id: string) => boolean;
  isColorAvailable: (id: string, colorIndex: number) => boolean;
  handleColorChange: (motorcycleId: string, colorIndex: number) => void;
  handleViewDetails: (motorcycle: Motorcycle) => void;
  getMotorcycleImageUrl: (motorcycleId: string, colorIndex: number, fallbackImage: string) => string;
  formatPrice: (price: number) => string;
}) => {
  const selectedIndex = selectedColors[motorcycle.id] || 0;
  const selectedColor = motorcycle.colors[selectedIndex];
  
  return (
    <div className="col-lg-4 col-md-6 col-sm-12">
      <div className={`card motorcycle-card h-100 shadow-medium rounded-modern-lg border-0 ${
        !isModelAvailable(motorcycle.id) ? 'border-danger bg-light opacity-75' : 'bg-professional'
      }`}>
        {/* Motorcycle Image */}
        <div className="position-relative overflow-hidden" style={{ borderRadius: 'var(--border-radius-lg) var(--border-radius-lg) 0 0' }}>
          <img
            src={getMotorcycleImageUrl(
              motorcycle.id, 
              selectedIndex, 
              selectedColor.image
            )}
            className="card-img-top"
            alt={motorcycle.name}
            style={{ 
              height: '280px', 
              objectFit: 'cover',
              transition: 'transform 0.4s ease'
            }}
            
          />
          <div className="position-absolute top-0 start-0 m-3">
            <span className="category-badge">
              {motorcycle.category}
            </span>
          </div>
          <div className="position-absolute top-0 end-0 m-3">
            {isModelAvailable(motorcycle.id) ? (
              <span className="badge bg-success fs-6 px-3 py-2 rounded-modern">
                ✓ Available
              </span>
            ) : (
              <span className="badge bg-danger fs-6 px-3 py-2 rounded-modern">
                ✗ Not Available
              </span>
            )}
          </div>
          {!isModelAvailable(motorcycle.id) && (
            <div className="position-absolute top-50 start-50 translate-middle">
              <div className="bg-danger text-white px-4 py-3 rounded-modern shadow-strong">
                <h5 className="mb-0 fw-bold">❌ MODEL NOT AVAILABLE</h5>
              </div>
            </div>
          )}
          <div className="position-absolute bottom-0 start-0 end-0" style={{ 
            height: '60px',
            background: 'linear-gradient(to top, rgba(0,0,0,0.5) 0%, transparent 100%)'
          }}></div>
        </div>

        <div className="card-body p-4">
          {/* Title and Price */}
          <div className="d-flex justify-content-between align-items-start mb-4">
            <div className="flex-grow-1 me-3">
              <h5 className="card-title fw-bold text-professional mb-1">{motorcycle.name}</h5>
              <div className="d-flex align-items-center gap-2">
                <span className="badge bg-honda-orange text-white small">Honda</span>
                <span className="text-muted small">• 2024 Model</span>
              </div>
            </div>
            <div className="text-end">
              <div className="price-tag">{formatPrice(motorcycle.price)}</div>
              <small className="text-muted d-block mt-1">Starting price</small>
            </div>
          </div>

          {/* Color Options */}
          <div className="mb-4">
            <div className="d-flex justify-content-between align-items-center mb-3">
              <h6 className="fw-semibold text-professional mb-0">Available Colors</h6>
              <span className="badge bg-light text-muted small">{motorcycle.colors.length} options</span>
            </div>
            <div className="bg-light rounded-modern p-3">
              <div className="d-flex gap-3 flex-wrap justify-content-center mb-3">
                {motorcycle.colors.map((color, index) => {
                  const isAvailable = isColorAvailable(motorcycle.id, index);
                  const isSelected = selectedColors[motorcycle.id] === index || (selectedColors[motorcycle.id] === undefined && index === 0);
                  
                  return (
                    <div
                      key={index}
                      className={`color-option ${isSelected ? 'active' : ''}`}
                      style={{ 
                        backgroundColor: color.code,
                        position: 'relative',
                        cursor: (isAvailable && isModelAvailable(motorcycle.id)) ? 'pointer' : 'not-allowed',
                        opacity: (!isAvailable || !isModelAvailable(motorcycle.id)) ? 0.5 : 1,
                        filter: (!isAvailable || !isModelAvailable(motorcycle.id)) ? 'grayscale(50%)' : 'none'
                      }}
                      title={isAvailable ? color.name : `${color.name} (Not Available)`}
                      onClick={() => handleColorChange(motorcycle.id, index)}
                    >
                      {!isAvailable && (
                        <div className="position-absolute top-50 start-50 translate-middle">
                          <span style={{ 
                            fontSize: '18px', 
                            color: '#dc3545', 
                            fontWeight: 'bold',
                            textShadow: '2px 2px 4px white'
                          }}>✕</span>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
              <div className="text-center">
                <div className="fw-semibold text-professional">{selectedColor.name}</div>
                {!isColorAvailable(motorcycle.id, selectedColors[motorcycle.id] || 0) && (
                  <small className="text-danger fw-semibold d-flex align-items-center justify-content-center gap-1 mt-1">
                    <span>⚠️</span> Currently Not Available
                  </small>
                )}
              </div>
            </div>
          </div>

          {/* Specifications */}
          <div className="mb-4">
            <h6 className="fw-semibold text-professional mb-3">Key Specifications</h6>
            <div className="row g-3">
              <div className="col-6">
                <div className="bg-white rounded-modern p-2 shadow-soft text-center">
                  <div className="small text-muted mb-1">Engine</div>
                  <div className="fw-semibold text-professional small">{motorcycle.specs.displacement}</div>
                </div>
              </div>
              <div className="col-6">
                <div className="bg-white rounded-modern p-2 shadow-soft text-center">
                  <div className="small text-muted mb-1">Power</div>
                  <div className="fw-semibold text-professional small">{motorcycle.specs.power}</div>
                </div>
              </div>
              <div className="col-6">
                <div className="bg-white rounded-modern p-2 shadow-soft text-center">
                  <div className="small text-muted mb-1">Transmission</div>
                  <div className="fw-semibold text-professional small">{motorcycle.specs.transmission}</div>
                </div>
              </div>
              <div className="col-6">
                <div className="bg-white rounded-modern p-2 shadow-soft text-center">
                  <div className="small text-muted mb-1">Weight</div>
                  <div className="fw-semibold text-professional small">{motorcycle.specs.weight}</div>
                </div>
              </div>
            </div>
          </div>

          {/* Features */}
          <div className="mb-4">
            <h6 className="fw-semibold text-professional mb-3">Key Features</h6>
            <div className="d-flex flex-wrap gap-2">
              {motorcycle.features.slice(0, 4).map((feature, index) => (
                <span key={index} className="badge bg-honda-gradient text-white px-3 py-2 rounded-modern small fw-semibold">
                  {feature}
                </span>
              ))}
              {motorcycle.features.length > 4 && (
                <span className="badge bg-light text-muted px-3 py-2 rounded-modern small">
                  +{motorcycle.features.length - 4} more
                </span>
              )}
            </div>
          </div>
        </div>

        {/* Card Footer */}
        <div className="card-footer bg-transparent border-0 pt-0 pb-4">
          <div className="d-grid gap-3">
            <button 
              className={`btn fw-semibold py-3 rounded-modern ${
                isModelAvailable(motorcycle.id) 
                  ? 'btn-honda shadow-medium' 
                  : 'btn-secondary'
              }`}
              disabled={!isModelAvailable(motorcycle.id)}
              onClick={() => handleViewDetails(motorcycle)}
            >
              {isModelAvailable(motorcycle.id) ? (
                <>
                  <span className="me-2">🔍</span>
                  View Full Details
                </>
              ) : (
                <>
                  <span className="me-2">❌</span>
                  Not Available
                </>
              )}
            </button>
            <div className="row g-2">
              <div className="col-6">
                <button className="btn btn-outline-primary w-100 rounded-modern small">
                  <span className="d-block">📞</span>
                  <span className="small">Call</span>
                </button>
              </div>
              <div className="col-6">
                <button className="btn btn-outline-success w-100 rounded-modern small">
                  <span className="d-block">💬</span>
                  <span className="small">Message</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
});

export default function Home() {
  const [selectedColors, setSelectedColors] = useState<{[key: string]: number}>({});
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [selectedMotorcycle, setSelectedMotorcycle] = useState<Motorcycle | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [imageUrls, setImageUrls] = useState<{[key: string]: string}>({});
  const [isClient, setIsClient] = useState(false);
  const { colorAvailability, isColorAvailable, isModelAvailable } = useColorAvailability();

  const handleColorChange = useCallback((motorcycleId: string, colorIndex: number) => {
    // Check if model is available
    if (!isModelAvailable(motorcycleId)) {
      alert('❌ This motorcycle model is currently not available. Please contact us for more information.');
      return;
    }
    
    // Check if color is available
    if (!isColorAvailable(motorcycleId, colorIndex)) {
      alert('❌ This color is currently not available. Please contact us for more information or choose another color.');
      return;
    }

    setSelectedColors(prev => ({
      ...prev,
      [motorcycleId]: colorIndex
    }));
  }, [isModelAvailable, isColorAvailable]);

  const handleCategoryFilter = (category: string) => {
    setSelectedCategory(category);
  };

  const filteredMotorcycles = useMemo(() => {
    return selectedCategory === 'All' 
      ? motorcycles 
      : motorcycles.filter(motorcycle => {
          if (selectedCategory === 'Underbone') {
            return motorcycle.category === 'Commuter';
          }
          return motorcycle.category === selectedCategory;
        });
  }, [selectedCategory]);

  const formatPrice = useCallback((price: number) => {
    return new Intl.NumberFormat('en-PH', {
      style: 'currency',
      currency: 'PHP',
      minimumFractionDigits: 0
    }).format(price);
  }, []);

  const handleViewDetails = useCallback((motorcycle: Motorcycle) => {
    if (!isModelAvailable(motorcycle.id)) {
      alert('❌ This motorcycle model is currently not available. Please contact us for more information.');
      return;
    }
    setSelectedMotorcycle(motorcycle);
    setShowModal(true);
  }, [isModelAvailable]);

  const closeModal = useCallback(() => {
    setShowModal(false);
    setSelectedMotorcycle(null);
  }, []);

  // Handle keyboard events for modal
  const handleKeyDown = useCallback((e: React.KeyboardEvent) => {
    if (e.key === 'Escape') {
      closeModal();
    }
  }, [closeModal]);

  // Get the correct image URL (custom or default) - memoized to prevent flickering
  const getMotorcycleImageUrl = useCallback((motorcycleId: string, colorIndex: number, fallbackImage: string): string => {
    if (!isClient) return fallbackImage;
    
    const uploadKey = `${motorcycleId}-${colorIndex}`;
    const customImage = imageUrls[uploadKey];
    
    return customImage || getMotorcycleImage(motorcycleId, colorIndex, fallbackImage);
  }, [isClient, imageUrls]);

  // Load images from localStorage on client-side mount (single useEffect to prevent flickering)
  useEffect(() => {
    setIsClient(true);
    const loadedImages: {[key: string]: string} = {};
    
    motorcycles.forEach(motorcycle => {
      motorcycle.colors.forEach((_, colorIndex) => {
        const imageKey = `motorcycle-image-${motorcycle.id}-${colorIndex}`;
        const storedImage = localStorage.getItem(imageKey);
        if (storedImage && storedImage.startsWith('data:image/')) {
          loadedImages[`${motorcycle.id}-${colorIndex}`] = storedImage;
        }
      });
    });
    
    setImageUrls(loadedImages);
    
    // Listen for storage changes from admin panel (throttled)
    let storageUpdateTimeout: NodeJS.Timeout | null = null;
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key && e.key.startsWith('motorcycle-image-')) {
        // Throttle rapid storage updates
        if (storageUpdateTimeout) {
          clearTimeout(storageUpdateTimeout);
        }
        
        storageUpdateTimeout = setTimeout(() => {
          const keyParts = e.key!.replace('motorcycle-image-', '').split('-');
          if (keyParts.length >= 2) {
            const motorcycleId = keyParts.slice(0, -1).join('-');
            const colorIndex = keyParts[keyParts.length - 1];
            const uploadKey = `${motorcycleId}-${colorIndex}`;
            
            if (e.newValue && e.newValue.startsWith('data:image/')) {
              setImageUrls(prev => {
                if (prev[uploadKey] === e.newValue) return prev; // No change
                return { ...prev, [uploadKey]: e.newValue! };
              });
            } else {
              setImageUrls(prev => {
                if (!prev[uploadKey]) return prev; // Already deleted
                const newUrls = { ...prev };
                delete newUrls[uploadKey];
                return newUrls;
              });
            }
          }
        }, 50); // 50ms throttle
      }
    };
    
    window.addEventListener('storage', handleStorageChange);
    return () => {
      window.removeEventListener('storage', handleStorageChange);
      if (storageUpdateTimeout) {
        clearTimeout(storageUpdateTimeout);
      }
    };
  }, []);

  return (
    <div className="min-h-screen bg-light">
      {/* Header Section */}
      <header className="header-section">
        <div className="container">
          <div className="logo-section">
            <div className="honda-logo">HONDA</div>
            <div className="branch-name">Bolinao Branch - Premium Motorcycle Showroom</div>
            <div className="mt-3">
              <small className="text-white-50">🏢 Powered by Guanzon Group • 🌟 Quality, Trust, Service Excellence</small>
            </div>
          </div>
        </div>
      </header>

      {/* Marquee Section */}
      <div className="marquee">
        <div className="marquee-content">
            🏍️ Honda PCX 160 • Honda Click 160i • Honda CBR150R • Honda ADV 160 • Honda Wave 110i • Honda TMX Supremo 150 • Honda Click 125 SE • Honda Click 125 Standard • Honda Beat Premium • Honda Beat Playful • Honda Winner X Premium • Honda Winner X Standard • Honda Winner X Racing • Honda TMX 125 Alpha • Honda Giorno+ • Visit our showroom for inquiries and special offers! 🏍️
        </div>
      </div>

      {/* Motorcycles Grid */}
      <div className="container py-5">
        <div className="row">
          <div className="col-12 text-center mb-5">
            <h1 className="display-4 fw-bold gradient-text mb-3">Premium Motorcycle Collection</h1>
            <p className="lead text-professional mb-4">Discover the latest Honda motorcycles with cutting-edge technology and superior performance</p>
            <div className="d-flex justify-content-center align-items-center gap-4 flex-wrap">
              <div className="d-flex align-items-center">
                <span className="badge bg-success me-2">✓</span>
                <span className="text-muted">Authorized Dealer</span>
              </div>
              <div className="d-flex align-items-center">
                <span className="badge bg-primary me-2">🛡️</span>
                <span className="text-muted">Genuine Parts</span>
              </div>
              <div className="d-flex align-items-center">
                <span className="badge bg-honda-orange me-2">⚡</span>
                <span className="text-muted">Expert Service</span>
              </div>
            </div>
          </div>
        </div>

        {/* Category Filter Buttons */}
        <div className="row mb-5">
          <div className="col-12">
            <div className="d-flex justify-content-center">
              <div className="bg-white p-3 rounded-modern-lg shadow-medium">
                <div className="btn-group btn-group-lg" role="group" aria-label="Motorcycle category filter">
                  <button
                    type="button"
                    className={`btn px-4 py-3 fw-semibold rounded-modern ${selectedCategory === 'All' ? 'bg-honda-gradient text-white' : 'btn-outline-secondary'}`}
                    onClick={() => handleCategoryFilter('All')}
                  >
                    <span className="d-block">🏍️</span>
                    <span className="small">All Models</span>
                  </button>
                  <button
                    type="button"
                    className={`btn px-4 py-3 fw-semibold rounded-modern ${selectedCategory === 'Scooter' ? 'bg-honda-gradient text-white' : 'btn-outline-secondary'}`}
                    onClick={() => handleCategoryFilter('Scooter')}
                  >
                    <span className="d-block">🛵</span>
                    <span className="small">Scooters</span>
                  </button>
                  <button
                    type="button"
                    className={`btn px-4 py-3 fw-semibold rounded-modern ${selectedCategory === 'Underbone' ? 'bg-honda-gradient text-white' : 'btn-outline-secondary'}
                    `}
                    onClick={() => handleCategoryFilter('Underbone')}
                  >
                    <span className="d-block">🏍️</span>
                    <span className="small">Underbone</span>
                  </button>
                  <button
                    type="button"
                    className={`btn px-4 py-3 fw-semibold rounded-modern ${selectedCategory === 'Sport' ? 'bg-honda-gradient text-white' : 'btn-outline-secondary'}`}
                    onClick={() => handleCategoryFilter('Sport')}
                  >
                    <span className="d-block">🏁</span>
                    <span className="small">Sport</span>
                  </button>
                  <button
                    type="button"
                    className={`btn px-4 py-3 fw-semibold rounded-modern ${selectedCategory === 'Adventure' ? 'bg-honda-gradient text-white' : 'btn-outline-secondary'}`}
                    onClick={() => handleCategoryFilter('Adventure')}
                  >
                    <span className="d-block">🌄</span>
                    <span className="small">Adventure</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Results Counter */}
        <div className="row mb-4">
          <div className="col-12 text-center">
            <div className="bg-professional rounded-modern p-3 d-inline-block">
              <p className="text-professional mb-0">
                <span className="badge bg-honda-gradient me-2">{filteredMotorcycles.length}</span>
                <span>of <strong>{motorcycles.length}</strong> motorcycles available</span>
                {selectedCategory !== 'All' && (
                  <span className="ms-2">
                    <span className="badge bg-secondary">{selectedCategory === 'Underbone' ? 'Underbone' : selectedCategory}</span>
                  </span>
                )}
              </p>
            </div>
          </div>
        </div>

        <div className="row g-4">
          {filteredMotorcycles.map((motorcycle) => (
            <MotorcycleCard
              key={motorcycle.id}
              motorcycle={motorcycle}
              selectedColors={selectedColors}
              isClient={isClient}
              imageUrls={imageUrls}
              isModelAvailable={isModelAvailable}
              isColorAvailable={isColorAvailable}
              handleColorChange={handleColorChange}
              handleViewDetails={handleViewDetails}
              getMotorcycleImageUrl={getMotorcycleImageUrl}
              formatPrice={formatPrice}
            />
          ))}
        </div>
      </div>

      {/* Modal for detailed view */}
      {showModal && selectedMotorcycle && (() => {
        const modalSelectedIndex = selectedColors[selectedMotorcycle.id] || 0;
        const modalSelectedColor = selectedMotorcycle.colors[modalSelectedIndex];
        
        return (
          <div 
            className="modal fade show d-block modal-backdrop-blur" 
            style={{ backgroundColor: 'rgba(0,0,0,0.8)' }}
            onClick={closeModal}
            onKeyDown={handleKeyDown}
            tabIndex={-1}
          >
            <div 
              className="modal-dialog modal-xl modal-dialog-centered"
              onClick={(e) => e.stopPropagation()}
              style={{ maxWidth: '1200px' }}
            >
              <div className="modal-content">
                <div className="modal-header bg-honda-gradient text-white">
                  <h4 className="modal-title fw-bold">{selectedMotorcycle.name}</h4>
                  <button 
                    type="button" 
                    className="btn-close btn-close-white" 
                    onClick={closeModal}
                  ></button>
                </div>
                <div className="modal-body p-0">
                  <div className="row g-0">
                    {/* Image Section */}
                    <div className="col-md-6">
                      <div className="position-relative" style={{ height: '400px' }}>
                        <img
                          src={getMotorcycleImageUrl(
                            selectedMotorcycle.id, 
                            modalSelectedIndex, 
                            modalSelectedColor.image
                          )}
                          className="w-100 h-100"
                          alt={selectedMotorcycle.name}
                          style={{ objectFit: 'cover' }}
                        />
                        <div className="position-absolute top-0 start-0 m-3">
                          <span className="badge bg-primary fs-6">{selectedMotorcycle.category}</span>
                        </div>
                        <div className="position-absolute top-0 end-0 m-3">
                          <span className="badge bg-success fs-6">Available</span>
                        </div>
                      </div>
                    </div>
                    
                    {/* Details Section */}
                    <div className="col-md-6 p-4">
                      <div className="mb-4">
                        <h2 className="honda-red fw-bold">{formatPrice(selectedMotorcycle.price)}</h2>
                        <p className="text-muted mb-0">Starting price for {selectedMotorcycle.name}</p>
                      </div>

                      {/* Color Selection */}
                      <div className="mb-4">
                        <h6 className="fw-bold mb-3">Available Colors:</h6>
                        <div className="d-flex gap-3 flex-wrap mb-3">
                          {selectedMotorcycle.colors.map((color, index) => {
                            const isAvailable = isColorAvailable(selectedMotorcycle.id, index);
                            const isSelected = selectedColors[selectedMotorcycle.id] === index || (selectedColors[selectedMotorcycle.id] === undefined && index === 0);
                            
                            return (
                              <div
                                key={index}
                                className={`position-relative color-selection-modal`}
                                style={{ 
                                  width: '50px',
                                  height: '50px',
                                  backgroundColor: color.code,
                                  borderRadius: '50%',
                                  border: `4px solid ${isSelected ? '#dc3545' : isAvailable ? '#28a745' : '#6c757d'}`,
                                  cursor: isAvailable ? 'pointer' : 'not-allowed',
                                  opacity: !isAvailable ? 0.5 : 1,
                                  transition: 'all 0.3s ease',
                                  boxShadow: isSelected ? '0 0 15px rgba(220, 53, 69, 0.5)' : '0 2px 10px rgba(0,0,0,0.1)'
                                }}
                                title={isAvailable ? color.name : `${color.name} (Not Available)`}
                                onClick={() => isAvailable && handleColorChange(selectedMotorcycle.id, index)}
                              >
                                {!isAvailable && (
                                  <div className="position-absolute top-50 start-50 translate-middle">
                                    <span style={{ 
                                      fontSize: '20px', 
                                      color: '#dc3545', 
                                      fontWeight: 'bold',
                                      textShadow: '2px 2px 4px white'
                                    }}>✕</span>
                                  </div>
                                )}
                              </div>
                            );
                          })}
                        </div>
                        <p className="fw-semibold text-honda-red">{modalSelectedColor.name}</p>
                      </div>

                      {/* Detailed Specifications */}
                      <div className="mb-4">
                        <h6 className="fw-bold mb-3">Complete Specifications:</h6>
                        <div className="row g-3">
                          <div className="col-6">
                            <div className="border rounded p-2">
                              <small className="text-muted d-block">Engine Type</small>
                              <strong>{selectedMotorcycle.specs.engine}</strong>
                            </div>
                          </div>
                          <div className="col-6">
                            <div className="border rounded p-2">
                              <small className="text-muted d-block">Displacement</small>
                              <strong>{selectedMotorcycle.specs.displacement}</strong>
                            </div>
                          </div>
                          <div className="col-6">
                            <div className="border rounded p-2">
                              <small className="text-muted d-block">Max Power</small>
                              <strong>{selectedMotorcycle.specs.power}</strong>
                            </div>
                          </div>
                          <div className="col-6">
                            <div className="border rounded p-2">
                              <small className="text-muted d-block">Max Torque</small>
                              <strong>{selectedMotorcycle.specs.torque}</strong>
                            </div>
                          </div>
                          <div className="col-6">
                            <div className="border rounded p-2">
                              <small className="text-muted d-block">Transmission</small>
                              <strong>{selectedMotorcycle.specs.transmission}</strong>
                            </div>
                          </div>
                          <div className="col-6">
                            <div className="border rounded p-2">
                              <small className="text-muted d-block">Fuel Capacity</small>
                              <strong>{selectedMotorcycle.specs.fuelCapacity}</strong>
                            </div>
                          </div>
                          <div className="col-6">
                            <div className="border rounded p-2">
                              <small className="text-muted d-block">Weight</small>
                              <strong>{selectedMotorcycle.specs.weight}</strong>
                            </div>
                          </div>
                          <div className="col-6">
                            <div className="border rounded p-2">
                              <small className="text-muted d-block">Seat Height</small>
                              <strong>{selectedMotorcycle.specs.seatHeight}</strong>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Features */}
                      <div className="mb-4">
                        <h6 className="fw-bold mb-3">Key Features:</h6>
                        <div className="row g-2">
                          {selectedMotorcycle.features.map((feature, index) => (
                            <div key={index} className="col-md-6">
                              <div className="d-flex align-items-center">
                                <span className="text-success me-2">✓</span>
                                <span className="small">{feature}</span>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="modal-footer">
                  <button type="button" className="btn btn-secondary" onClick={closeModal}>
                    Close
                  </button>
                  <div className="btn-group">
                    <button 
                      type="button" 
                      className="btn bg-honda-gradient text-white dropdown-toggle" 
                      data-bs-toggle="dropdown"
                    >
                      📞 Contact for Inquiry
                    </button>
                    <ul className="dropdown-menu">
                      <li>
                        <a 
                          className="dropdown-item" 
                          href="https://www.facebook.com/motorcentrumbolinao.guanzon" 
                          target="_blank" 
                          rel="noopener noreferrer"
                        >
                          📘 Facebook Page
                        </a>
                      </li>
                      <li>
                        <a 
                          className="dropdown-item" 
                          href="tel:09178190155"
                        >
                          📞 Call: 09178190155
                        </a>
                      </li>
                      <li>
                        <a 
                          className="dropdown-item" 
                          href="mailto:mcc_bolinao@guanzongroup.com.ph"
                        >
                          📧 Email: mcc_bolinao@guanzongroup.com.ph
                        </a>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      })()}

      {/* Footer */}
      <footer className="bg-dark text-light py-5 mt-5" style={{ background: 'linear-gradient(135deg, #2c3e50 0%, #34495e 100%) !important' }}>
        <div className="container">
          <div className="row g-4">
            <div className="col-lg-4 col-md-6">
              <div className="mb-4">
                <h4 className="gradient-text" style={{ color: '#ff8c00 !important' }}>Honda Bolinao</h4>
                <p className="text-light mb-3">Your trusted Honda motorcycle dealer in Pangasinan</p>
              </div>
              <div className="d-flex flex-column gap-2">
                <div className="d-flex align-items-center">
                  <span className="badge bg-primary me-3">📍</span>
                  <span className="small">Germinal, Bolinao, Pangasinan</span>
                </div>
                <div className="d-flex align-items-center">
                  <span className="badge bg-success me-3">📞</span>
                  <span className="small">09178190155</span>
                </div>
                <div className="d-flex align-items-center">
                  <span className="badge bg-warning me-3">⏰</span>
                  <span className="small">Mon-Sat: 8:00 AM - 6:00 PM</span>
                </div>
              </div>
            </div>
            <div className="col-lg-4 col-md-12">
              <h6 className="text-honda-orange mb-3">Connect With Us</h6>
              <div className="d-flex gap-3 mb-3">
                <a href="https://www.facebook.com/motorcentrumbolinao.guanzon" target="_blank" className="btn btn-outline-light btn-sm rounded-modern">
                  📱 Facebook
                </a>
                <a href="mailto:mcc_bolinao@guanzongroup.com.ph" className="btn btn-outline-light btn-sm rounded-modern">
                  ✉️ Email
                </a>
              </div>
              <div className="mt-4">
                <a href="/admin" className="btn btn-honda rounded-modern">
                  🔧 Admin Panel
                </a>
              </div>
            </div>
          </div>
          <hr className="my-4 border-secondary" />
          <div className="row">
            <div className="col-md-6">
              <p className="small mb-0 text-muted">© 2025 Honda Bolinao - Guanzon Group. All rights reserved.</p>
            </div>
            <div className="col-md-6 text-md-end">
              <p className="small mb-0 text-muted">Visit us for inquiries and special financing options!</p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}