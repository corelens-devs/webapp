import React from "react";
import {
  proofStats,
  proofTestimonials,
  responsePromise,
} from "../data/intentLandingData";
import "../css/intent-landing.css";

const ProofBlocks = () => {
  return (
    <section className="proof-blocks-section">
      <div className="wrapper inner-box">
        <div className="proof-header">
          <h2>Why Buyers Trust Corelens</h2>
          <p>
            Proof points that reduce buying hesitation and improve conversion
            from first call to installation.
          </p>
        </div>

        <div className="proof-stats-grid">
          {proofStats.map((item) => (
            <article key={item.label} className="proof-stat-card">
              <p className="proof-stat-value">{item.value}</p>
              <p className="proof-stat-label">{item.label}</p>
              <p className="proof-stat-note">{item.note}</p>
            </article>
          ))}
        </div>

        <div className="proof-testimonial-row">
          {proofTestimonials.map((item) => (
            <article key={`${item.name}-${item.city}`} className="proof-testimonial-card">
              <p className="proof-testimonial-quote">"{item.quote}"</p>
              <p className="proof-testimonial-name">{item.name}</p>
              <p className="proof-testimonial-city">{item.city}</p>
            </article>
          ))}
        </div>

        <div className="response-promise-card">
          <h3>{responsePromise.headline}</h3>
          <ul>
            {responsePromise.bullets.map((bullet) => (
              <li key={bullet}>{bullet}</li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
};

export default ProofBlocks;
