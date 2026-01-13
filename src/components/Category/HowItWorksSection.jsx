
import React from "react";

const HowItWorksSection = ({ howItWorks }) => {
  // Default fallback data
  const defaultData = {
    title: "HOW IT WORKS FOR YOU",
    steps: [
      {
        id: 1,
        title: "CHOOSE YOUR MODEL. WE'LL HANDLE THE REST.",
        description: "Pick From Our Three Smart Lock Models Based On Your Style And Needs. Once Chosen, Our Certified Technician Will Visit Your Location And Install It Absolutely FREE — No Hidden Fees, No Stress, No Tools In Your Hands.",
        image: "/images/home/your-modal.png",
        align: "left",
      },
      {
        id: 2,
        title: "PERSONAL SETUP, DONE BY PROFESSIONALS.",
        description: "Our Technician Will Guide You Through The Initial Setup, From Registering Your Fingerprints, Setting Your Passwords, And Connecting The Lock To The CoreLens Mobile App. Everything Is Configured For You — Quickly, Securely, And Hassle-Free.",
        image: "/images/home/setup.png",
        align: "right",
      },
      {
        id: 3,
        title: "ADD YOUR FAMILY. STAY IN CONTROL.",
        description: "We Help You Register Fingerprints And Access Methods For Every Member Of Your Household — So Everyone Gets Seamless, Personalized Access. No Keys To Lose, No Codes To Forget — Just Smart, Shared Security.",
        image: "/images/home/setup.png",
        align: "left",
      },
      {
        id: 4,
        title: "YOUR LOCK, NOW FULLY INTELLIGENT.",
        description: "Once Set Up, Your CoreLens Smart Lock Can Automatically Locks Behind You, Sends Real-Time Mobile Alerts, Works Even During Power Cuts, And Gives You Total Peace Of Mind. Your Home Is Now Smarter, Safer, And Fully Under Your Control — Even When You're Not There.",
        image: "/images/home/your-lock-now.png",
        align: "right",
      },
    ]
  };

  const data = howItWorks || defaultData;

  // Reusable connector component with actual line images
  const CurvedConnector = ({ fromPosition, toPosition, index }) => {
    // Map connector index to line image
    const lineImages = {
      0: "/images/home/Line-1.png", // First connector
      1: "/images/home/Line-2.png", // Second connector  
      2: "/images/home/Line-3.png", // Third connector
      3: "/images/home/Line-2.png", // Fourth connector (use Line-2 for id:5 step)
      4: "/images/home/Line-1.png", // Fifth connector (reuse Line-1)
    };

    const lineImage = lineImages[index];
    
    if (!lineImage) return null;

    return (
      <div className={`curved-connector connector-${index + 1}`}>
        <img 
          src={lineImage} 
          alt={`Connector line ${index + 1}`}
          className="connector-line-image"
        />
      </div>
    );
  };

  return (
    <section className="how-it-works-section">
      <div className="inner-wrap">
        <div className="section-header">
          <h2 className="section-title">{data.title}</h2>
          {data.subtitle && (
            <p className="section-subtitle">{data.subtitle}</p>
          )}
        </div>

        <div className="steps-flow-container">
          {data.steps.map((step, index) => (
            <React.Fragment key={step.id}>
              <div className={`step-flow-item ${step.align}`}>
                <div className="step-flow-content">
                  <div className="step-image-container">
                    <div className="step-image-circle">
                      <img src={step.image} alt={step.title} />
                    </div>
                  </div>

                  <div className="step-text-container">
                    <h3 className="step-flow-title">{step.title}</h3>
                    <p className="step-flow-description">{step.description}</p>
                  </div>
                </div>
              </div>

              {/* Show connector after each step except last */}
              {index < data.steps.length - 1 && (
                <CurvedConnector
                  fromPosition={step.align}
                  toPosition={data.steps[index + 1].align}
                  index={index}
                />
              )}
            </React.Fragment>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorksSection;
