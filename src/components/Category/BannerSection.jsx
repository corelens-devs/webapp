
import React from 'react';

const BannerSection = ({ banner }) => {
  if (!banner) return null;

  return (
    <section className="category-banner-section">
      <div 
        className="banner-background"
        style={{ backgroundImage: `url(${banner.backgroundImage})` }}
      >
        <div className="banner-overlay">
          <div className="inner-wrap">
            <div className="banner-content">
              <h1 className="banner-title">
                {banner.title}<br />
                <span className="banner-subtitle">{banner.subtitle}</span>
              </h1>
              <p className="banner-description">{banner.description}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BannerSection;
