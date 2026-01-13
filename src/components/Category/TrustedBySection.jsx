
import React from "react";

const TrustedBySection = ({ trustedBy }) => {
  // Default fallback data
  const defaultData = {
    title: "TRUSTED BY",
    logos: [
      "/images/icons/hp.png",
      "/images/icons/hdfc.png",
      "/images/icons/tataimg.png",
      "/images/icons/byjus.png",
      "/images/icons/lenskart.png",
      "/images/icons/yakult.png",
      "/images/icons/asinpaints.png",
    ],
  };

  const data = trustedBy || defaultData;

  return (
    <section className="trusted-by-section">
      <div className="inner-wrap">
        <h2 className="trusted-by-title">{data.title}</h2>
        <div className="trusted-logos-container">
          <div className="trusted-logos-grid">
            {data.logos.map((logo, index) => (
              <div key={index} className="trusted-logo-item">
                <img src={logo} alt={`Trusted Brand ${index + 1}`} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default TrustedBySection;
