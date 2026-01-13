
import React from 'react';

const TrustedBrandsSection = ({ trustedBrands }) => {
  if (!trustedBrands) return null;

  return (
    <section className="trusted-brands-section">
      <div className="inner-wrap">
        <h2 className="section-title">{trustedBrands.title}</h2>
        <div className="brands-grid">
          {trustedBrands.logos.map((logo, index) => (
            <div key={index} className="brand-logo">
              <img src={logo} alt={`Brand ${index + 1}`} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TrustedBrandsSection;
