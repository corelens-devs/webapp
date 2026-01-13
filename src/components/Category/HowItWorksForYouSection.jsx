import React from "react";
import {
  FaKey,
  FaLock,
  FaMobileAlt,
  FaExclamationTriangle,
} from "react-icons/fa";
import { image } from "../../utils/asset";

const HowItWorksForYouSection = ({ howItWorksForYou }) => {
  // Default fallback data
  const defaultData = {
    title: "WHY IT WORKS FOR YOU",
    description:
      "Engineered With Premium-Grade Materials That Resist Wear And Tear. Built To Withstand Time, Weather, And Rough Handling – Without Compromising On Style.",
    featureCards: [
      {
        id: 1,
        tagTitle: "NO MORE LOST KEYS",
        backgroundImage: image("Features-card1.png"),
        mainTitle: "SMART KEY",
        subTitle: "SMART KEY",
        color: "#4A90E2",
      },
      {
        id: 2,
        tagTitle: "SMART AUTO-LOCK",
        backgroundImage: image("Features-card2.png"),
        mainTitle: "AUTO-LOCK",
        subTitle: "AUTO-LOCK",
        color: "#4A90E2",
      },
      {
        id: 3,
        tagTitle: "MOBILE INSTANT NOTIFICATIONS",
        backgroundImage: image("Features-card3.png"),
        mainTitle: "NOTIFICATION",
        subTitle: "NOTIFICATION",
        color: "#4A90E2",
      },
      {
        id: 4,
        tagTitle: "LOCK BREAKING ALARM",
        backgroundImage: image("Features-card4.png"),
        mainTitle: "BREAKING ALERT",
        subTitle: "BREAKING ALERT",
        color: "#4A90E2",
      },
    ],
  };

  const data = howItWorksForYou || defaultData;

  return (
    <section className="how-it-works-for-you-section">
      <div className="how-it-works-blue-area">
        <div className="inner-wrap">
          <div className="how-it-works-header">
            <div className="how-it-works-left">
              <h2 className="how-it-works-main-title">{data.title}</h2>
            </div>
            <div className="how-it-works-right">
              <p className="how-it-works-description">{data.description}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="how-it-works-white-area">
        <div className="inner-wrap">
          <div className="how-it-works-cards-container">
            {data.featureCards.map((card) => (
              <div key={card.id} className="how-it-works-feature-card">
                <div className="card-header">
                  <div className="card-tag-title">{card.tagTitle}</div>
                </div>
                <div className="card-background-image">
                  <img
                    src={card.backgroundImage}
                    alt={card.mainTitle}
                    onError={(e) => {
                      e.target.src = "/images/Features-card-1.png";
                      console.log(
                        "Image failed to load:",
                        card.backgroundImage,
                      );
                    }}
                  />
                  <div className="card-content-overlay">
                    <div className="card-main-title">{card.mainTitle}</div>
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

export default HowItWorksForYouSection;
