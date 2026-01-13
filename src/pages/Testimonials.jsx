
import React, { useState, useEffect } from "react";
import "../css/testimonials.css";
import testimonialsData from "../data/Corelens_100_testimonials-data.json";

const Testimonials = () => {
  const [visibleCards, setVisibleCards] = useState(16); // Show first 16 cards initially
  const [testimonials, setTestimonials] = useState([]);

  useEffect(() => {
    // Convert rating type to numeric stars
    const getRatingStars = (ratingType) => {
      switch (ratingType) {
        case "Excellent":
          return 5;
        case "Good":
          return 4;
        case "Average":
          return 3;
        default:
          return 5;
      }
    };

    // Process testimonials data from JSON
    const processedTestimonials = testimonialsData.map((item, index) => ({
      id: index + 1,
      name: item["Customer Name"],
      category: item["Product"],
      review: item["Review"],
      rating: getRatingStars(item["Rating Type"]),
      verified: true
    }));

    setTestimonials(processedTestimonials);
  }, []);

  const renderStars = (rating) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <span key={i} className={i <= rating ? "star filled" : "star"}>
          ★
        </span>,
      );
    }
    return stars;
  };

  const loadMoreTestimonials = () => {
    const remainingCards = testimonials.length - visibleCards;
    const cardsToShow = Math.min(6, remainingCards);
    setVisibleCards(visibleCards + cardsToShow);
  };

  const visibleTestimonials = testimonials.slice(0, visibleCards);
  const remainingCount = testimonials.length - visibleCards;

  return (
    <div className="testimonials-page">
      {/* Testimonials Hero Banner */}
      <section className="testimonials-hero">
        <div className="testimonials-hero-overlay">
          <div className="testimonials-hero-container">
            <div className="testimonials-hero-content">
              <h1 className="testimonials-hero-title">Testimonials</h1>
              <p className="testimonials-hero-subtitle">
                Real Stories, Real Satisfaction
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Main Testimonials Grid */}
      <section className="testimonials-main">
        <div className="testimonials-container">
          <div className="testimonials-grid">
            {visibleTestimonials.map((testimonial) => (
              <div key={testimonial.id} className="testimonial-card">
                <div className="testimonial-header">
                  <div className="testimonial-rating">
                    <span className="stars">
                      {renderStars(testimonial.rating)}
                    </span>
                  </div>
                  {testimonial.verified && (
                    <div className="testimonial-verified">
                      <span className="verified-badge">✓ {testimonial.category}</span>
                    </div>
                  )}
                </div>
                <p className="testimonial-text">{testimonial.review}</p>
                <div className="testimonial-author">
                  <img
                    src="/images/no-image-human.png"
                    alt={testimonial.name}
                    className="author-avatar"
                  />
                  <div className="author-info">
                    <span className="author-name">{testimonial.name}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Load More Button */}
          {remainingCount > 0 && (
            <div className="load-more-section">
              <button className="load-more-btn" onClick={loadMoreTestimonials}>
                Load More{" "}
                {remainingCount > 0 && `(${remainingCount} remaining)`}
              </button>
            </div>
          )}

          {remainingCount === 0 && visibleCards >= testimonials.length && (
            <div className="load-more-section">
              <button className="load-more-btn" disabled>
                No more testimonials to load
              </button>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default Testimonials;
