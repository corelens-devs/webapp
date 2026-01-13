import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import "./TestimonialSection.css";
import { image } from "../utils/asset";

const TestimonialSection = () => {
  useEffect(() => {
    // Initialize testimonial slider
    const initTestimonialSlider = () => {
      const slider = document.querySelector(".review-slider");
      if (slider && window.$ && window.$.fn.owlCarousel) {
        window.$(slider).owlCarousel({
          items: 3,
          loop: true,
          margin: 20,
          nav: false,
          dots: true,
          autoplay: true,
          autoplayTimeout: 4000,
          responsive: {
            0: {
              items: 1,
            },
            768: {
              items: 2,
            },
            992: {
              items: 3,
            },
          },
        });
      }
    };

    // Use existing jQuery and Owl Carousel
    if (window.$ && window.$.fn.owlCarousel) {
      initTestimonialSlider();
    }
  }, []);

  const testimonials = [
    {
      id: 1,
      type: "video",
      rating: 5.0,
      text: "Lorem Ipsum Dolor Sit Amet, Consectetur Elit Adipiscing . In Sit Amet Lacus In Magna Tinci...",
      backgroundImage: image("home/expressive-man-using-smartphone-selfie.jpg"),
    },
    {
      id: 2,
      type: "video",
      rating: 5.0,
      text: "Lorem Ipsum Dolor Sit Amet, Consectetur Elit Adipiscing . In Sit Amet Lacus In Magna Tinci...",
      backgroundImage: image(
        "home/pov-content-creator-reviewing-smartphone-product-camera.jpg",
      ),
    },
    {
      id: 3,
      type: "text",
      rating: 5.0,
      text: "Picture quality is excellent even in low light. I love to use this Corelens Product.",
      reviewer: {
        name: "Anjali Mehta",
        image: image("review-user5.png"),
        verified: true,
      },
    },
    {
      id: 4,
      type: "video",
      rating: 5.0,
      text: "Lorem Ipsum Dolor Sit Amet, Consectetur Elit Adipiscing . In Sit Amet Lacus In Magna Tinci...",
      backgroundImage: image("home/expressive-man-using-smartphone-selfie.jpg"),
    },
    {
      id: 5,
      type: "text",
      rating: 5.0,
      text: "You helped me set up everything over a video call, and I really appreciate your support.",
      reviewer: {
        name: "Swati Deshmukh",
        image: image("review-user4.png"),
        verified: true,
      },
    },
    {
      id: 6,
      type: "text",
      rating: 5.0,
      text: "Helped me set up everything on a video call. also given all the instructions and supporting team for all time.",
      reviewer: {
        name: "Yash Rajput",
        image: image("review-user6.png"),
        verified: true,
      },
    },
  ];

  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, index) => (
      <img key={index} src={image("star.svg")} alt="star" />
    ));
  };

  const handleVideoPlay = () => {
    alert("Video testimonial will play here");
  };

  return (
    <div className="wrapper">
      <section className="client-testimonial inner-box">
        <div className="title-group center">
          <div className="head-label">Feedback from our customers</div>
          <h2 className="heading text-heading" data-wow-delay="500ms">
            We love nothing more than hearing customers describe their
            experiences with our
            <span className="highlight">transformative technologies</span>
          </h2>
        </div>
        <div className="testimonial-grid owl-carousel owl-theme review-slider">
          {testimonials.map((testimonial) => (
            <div
              key={testimonial.id}
              className={`${testimonial.type === "video" ? "video-card" : "text-card"}`}
              data-wow-delay={`${testimonial.id * 300}ms`}
              style={
                testimonial.type === "video"
                  ? {
                      backgroundImage: `url(${testimonial.backgroundImage})`,
                      backgroundSize: "cover",
                      backgroundPosition: "center",
                      backgroundRepeat: "no-repeat",
                    }
                  : {}
              }
            >
              {testimonial.type === "video" ? (
                <div className="details">
                  <div className="rating">
                    {renderStars(testimonial.rating)}
                    <span>{testimonial.rating}/5.0</span>
                  </div>
                  <div className="video-thumb">
                    <div className="play-button" onClick={handleVideoPlay}>
                      <div className="circle">
                        <img src={image("play.svg")} alt="play" />
                      </div>
                    </div>
                  </div>
                  <p className="video-text">{testimonial.text}</p>
                </div>
              ) : (
                <>
                  <div className="mainreview">
                    <div className="toprow">
                      <img
                        src={image("quote.svg")}
                        alt="quote"
                        className="quote-symbol"
                      />
                      <div className="rating">
                        {renderStars(testimonial.rating)}
                        <span>{testimonial.rating}/5.0</span>
                      </div>
                    </div>
                    <p className="text-review">{testimonial.text}</p>
                  </div>
                  <div className="reviewer">
                    <img
                      src={testimonial.reviewer.image}
                      alt={testimonial.reviewer.name}
                    />
                    <div>
                      <strong>{testimonial.reviewer.name}</strong>
                      <span>
                        <img src={image("verified.svg")} alt="verify" />
                        Verified Buyer
                      </span>
                    </div>
                  </div>
                </>
              )}
            </div>
          ))}
        </div>
        <div className="review-number">
          <span className="num wow fadeInLeft">1000+</span>
          <span className="text wow fadeInLeft" data-wow-delay="500ms">
            Satisfied customers <br />
            with positive reviews
          </span>
          <Link
            to="/testimonials"
            className="btn arrow h50 wow fadeInRight"
            data-wow-delay="800ms"
          >
            See More Opinions
          </Link>
        </div>
      </section>
    </div>
  );
};

export default TestimonialSection;
