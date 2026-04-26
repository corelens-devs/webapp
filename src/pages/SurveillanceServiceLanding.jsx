import React from "react";
import { Link } from "react-router-dom";
import ProofBlocks from "../components/ProofBlocks";
import "../css/intent-landing.css";

const SurveillanceServiceLanding = ({ planType = "hourly" }) => {
  const isHourly = planType === "hourly";
  const title = isHourly
    ? "Hourly Surveillance Service"
    : "Monthly Surveillance Service";

  const pricingLine = isHourly
    ? "Book surveillance slots on demand and pay per usage window."
    : "Choose a recurring monthly security watch plan for predictable protection.";

  return (
    <div className="intent-landing-page">
      <section className="intent-hero surveillance-hero">
        <div className="wrapper inner-box">
          <p className="intent-tag">Corelens Surveillance</p>
          <h1>{title}</h1>
          <p className="intent-subheadline">
            Human-monitored support layer on top of your device setup for
            higher theft-prevention readiness.
          </p>
          <p className="intent-audience">{pricingLine}</p>
          <div className="intent-cta-row">
            <Link to="/contact-us" className="intent-primary-btn">
              Book Surveillance Consultation
            </Link>
            <a href="tel:1800-313-4207" className="intent-secondary-btn">
              Talk to Support
            </a>
          </div>
        </div>
      </section>

      <section className="intent-benefits">
        <div className="wrapper inner-box">
          <h2>How Corelens Surveillance Works</h2>
          <div className="intent-benefit-grid">
            <article className="intent-benefit-card">
              <p>Share camera feeds and monitoring windows from the Corelens app.</p>
            </article>
            <article className="intent-benefit-card">
              <p>Receive incident alerts and escalation support on critical events.</p>
            </article>
            <article className="intent-benefit-card">
              <p>Switch between hourly and monthly service plans based on need.</p>
            </article>
          </div>
        </div>
      </section>

      <ProofBlocks />
    </div>
  );
};

export default SurveillanceServiceLanding;
