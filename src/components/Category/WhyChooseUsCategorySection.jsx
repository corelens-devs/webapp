import React from "react";

const WhyChooseUsCategorySection = ({ whyChooseUs }) => {
  // Default fallback data
  const defaultFeatures = [
    {
      title: "24/7 HELPLINE TOLLFREE NUMBER",
      icon: "/images/icons/call-icon.png",
      label: "24/7 HELPLINE",
    },
    {
      title: "TEAM OF 3800+ PROFESSIONALS",
      icon: "/images/icons/team-icon.png",
      label: "TEAM OF 3800+",
    },
    {
      title: "WE CHOSE QUALITY OVER COMPETITION",
      icon: "/images/icons/like-icon.png",
      label: "QUALITY",
    },
    {
      title: "WE NEVER ARGUE OR REFUSE CUSTOMERS",
      icon: "/images/icons/feedback.png",
      label: "NO QUESTION",
    },
    {
      title: "10 YEAR SUPPORT FREE OF COST.",
      icon: "/images/icons/team-support-icon.png",
      label: "SUPPORT",
    },
  ];

  const features = whyChooseUs?.features || defaultFeatures;
  const title = whyChooseUs?.title || "WHY CHOOSE US";

  return (
    <section className="why-choose-us-category-section">
      <div className="inner-wrap why-choose-us-container">
        <h2 className="why-choose-us-title">{title}</h2>
        <div className="why-choose-us-cards-container">
          {features.map((feature, index) => (
            <div key={index} className="why-choose-us-card">
              <h3 className="card-heading">{feature.title}</h3>
              <div className="card-icon-container">
                <img
                  src={feature.icon}
                  alt={feature.label}
                  className="card-icon-image"
                />
              </div>
              <div className="card-label">{feature.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUsCategorySection;