
import React from 'react';

const FeaturesSection = ({ features }) => {
  if (!features) return null;

  // Fixed feature data matching the design
  const featureCards = [
    {
      id: 1,
      title: 'SMART KEY',
      icon: '🔑',
      image: '/images/home/corelens-royale.png'
    },
    {
      id: 2,
      title: 'AUTO-LOCK',
      icon: '🔒',
      image: '/images/home/corelens-royale.png'
    },
    {
      id: 3,
      title: 'NOTIFICATION',
      icon: '🔔',
      image: '/images/home/corelens-royale.png'
    },
    {
      id: 4,
      title: 'BREAKING ALERT',
      icon: '⚠️',
      image: '/images/home/corelens-royale.png'
    }
  ];

  return (
    <section className="why-it-works-blue-section">
      <div className="inner-wrap">
        <div className="why-it-works-content">
          <div className="why-it-works-text">
            <h2 className="why-it-works-title">WHY IT WORKS FOR YOU</h2>
            <p className="why-it-works-description">
              Engineered with premium-grade materials that resist wear and tear built 
              to withstand harsh weather, and tough handling... without compromising 
              in style.
            </p>
          </div>
          <div className="why-it-works-features-grid">
            {featureCards.map((feature) => (
              <div key={feature.id} className="why-feature-card">
                <div className="why-feature-header">
                  <div className="why-feature-title-group">
                    <h3 className="why-feature-title">{feature.title}</h3>
                  </div>
                  <div className="why-feature-icon">{feature.icon}</div>
                </div>
                <div className="why-feature-image">
                  <img src={feature.image} alt={feature.title} />
                  <div className="why-feature-overlay">
                    <h4 className="why-feature-overlay-title">{feature.title}</h4>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
