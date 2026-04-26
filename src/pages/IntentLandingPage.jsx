import React from "react";
import { Link, useParams } from "react-router-dom";
import ProofBlocks from "../components/ProofBlocks";
import {
  getCityNameFromSlug,
  getIntentService,
} from "../data/intentLandingData";
import "../css/intent-landing.css";

const IntentLandingPage = ({ intentSlug }) => {
  const { city } = useParams();
  const service = getIntentService(intentSlug);
  const cityName = getCityNameFromSlug(city);

  if (!service || !cityName) {
    return (
      <section className="intent-landing-not-found wrapper inner-box">
        <h1>Page Not Found</h1>
        <p>The requested city landing page is not available yet.</p>
        <Link to="/contact-us" className="intent-primary-btn">
          Contact Corelens
        </Link>
      </section>
    );
  }

  return (
    <div className="intent-landing-page">
      <section className="intent-hero">
        <div className="wrapper inner-box">
          <p className="intent-tag">{service.serviceName}</p>
          <h1>
            {service.headline} in <span>{cityName}</span>
          </h1>
          <p className="intent-subheadline">{service.subheadline}</p>
          <p className="intent-audience">Best for: {service.audience}</p>
          <div className="intent-cta-row">
            <Link to="/contact-us" className="intent-primary-btn">
              {service.ctaLabel}
            </Link>
            <a href="tel:1800-313-4207" className="intent-secondary-btn">
              Call 1800-313-4207
            </a>
          </div>
        </div>
      </section>

      <section className="intent-benefits">
        <div className="wrapper inner-box">
          <h2>What You Get</h2>
          <div className="intent-benefit-grid">
            {service.coreBenefits.map((benefit) => (
              <article key={benefit} className="intent-benefit-card">
                <p>{benefit}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <ProofBlocks />

      <section className="intent-final-cta">
        <div className="wrapper inner-box">
          <h2>Book a Security Call for {cityName}</h2>
          <p>
            Get a recommendation for devices, installation flow, and optional
            hourly/monthly surveillance based on your risk profile.
          </p>
          <div className="intent-cta-row">
            <Link to="/contact-us" className="intent-primary-btn">
              Get My Security Plan
            </Link>
            <Link to="/hourly-surveillance-service" className="intent-secondary-btn">
              Explore Hourly Surveillance
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default IntentLandingPage;
