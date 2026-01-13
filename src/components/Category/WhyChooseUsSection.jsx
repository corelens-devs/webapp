import React from "react";

const WhyChooseUsSection = ({ whyChooseUs }) => {
  if (!whyChooseUs) {
    // Default data if not provided
    const defaultData = {
      title: "WHY CHOOSE US",
      features: [
        {
          title: "24/7 HELPLINE TOLLFREE NUMBER",
          icon: "/images/icons/call-icon.png",
          label: "24/7 HELPLINE",
          color: "#3498db",
        },
        {
          title: "TEAM OF 3800+ PROFESSIONALS",
          icon: "/images/icons/team-icon.png",
          label: "TEAM OF 3800+",
          color: "#e74c3c",
        },
        {
          title: "WE CHOSE QUALITY OVER COMPETITION",
          icon: "/images/icons/like-icon.png",
          label: "QUALITY",
          color: "#f39c12",
        },
        {
          title: "WE NEVER ARGUE OR REFUSE CUSTOMERS",
          icon: "/images/icons/feedback.png",
          label: "NO QUESTION",
          color: "#2ecc71",
        },
        {
          title: "10 YEAR SUPPORT FREE OF COST.",
          icon: "/images/icons/team-support-icon.png",
          label: "SUPPORT",
          color: "#9b59b6",
        },
      ],
    };
    whyChooseUs = defaultData;
  }

  return (
    <section className="why-choose-us-category-section">
      <div className="inner-wrap why-choose-us-container">
        <h2 className="why-choose-us-title">{whyChooseUs.title}</h2>
        <div className="why-choose-us-cards-container">
          {whyChooseUs.features.map((feature, index) => (
            <div key={index} className="why-choose-us-card">
              <h3 className="card-heading">{feature.title}</h3>
              <div className="card-icon-container">
                <img
                  src={feature.icon}
                  alt={feature.label}
                  className="card-icon-image"
                />
              </div>
              <h3 className="card-label">{feature.label}</h3>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUsSection;
