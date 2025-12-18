import React from 'react';
import '../css/HeroSection.css';

const HeroSection = () => {
  // Main hero section component for landing page
  return (
    <div className="hero d-flex align-items-center justify-content-center text-center">
      <div className="hero-content">
        {/* Main headline in Hindi with bold styling */}
        <h1 className="display-4 display-md-3 fw-bold text-dark">
          सरकारी योजनाएँ, आपके द्वार
        </h1>
        {/* Subtitle below the headline */}
        <h3 className="fw-normal text-muted mb-3">
          Track All Your Government Schemes
        </h3>
      </div>

      {/* Some decorative device elements, visible only on medium+ screens */}
      <div className="product-device shadow-sm d-none d-md-block" />
      <div className="product-device product-device-2 shadow-sm d-none d-md-block" />

      {/* TODO: Consider adding a call-to-action button here for better user engagement */}
    </div>
  );
};

export default HeroSection;
