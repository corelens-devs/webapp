import React, { useEffect } from "react";
import { image } from "../utils/asset";
const Banner = () => {
  useEffect(() => {
    // Function to reset slide animations
    const resetSlideAnimations = (isFirstSlide = false) => {
      try {
        const activeSlide = document.querySelector(
          ".home-banner-carousel .owl-item.active",
        );
        if (activeSlide) {
          let elementsToAnimate = [];

          if (isFirstSlide) {
            // First slide: animate all elements including CTA buttons and testimonials
            elementsToAnimate = activeSlide.querySelectorAll(
              ".wow, .watermark, .hero-image, .cta-buttons, .review-count, .testimonial-sec, .heading, .subtext",
            );
          } else {
            // Other slides: only animate watermark and hero-image
            const watermark = activeSlide.querySelector(".watermark");
            const heroImage = activeSlide.querySelector(".hero-image");
            elementsToAnimate = [watermark, heroImage].filter((el) => el);
          }

          // Reset watermark typing animation
          const watermark = activeSlide.querySelector(".watermark .typewriter");
          if (watermark) {
            watermark.style.animation = "none";
            watermark.style.width = "0";
            watermark.offsetHeight; // Force reflow
            watermark.style.animation = "typing 3.5s steps(40, end) forwards";
          }

          elementsToAnimate.forEach((element) => {
            if (element) {
              // Clear existing animations
              element.style.visibility = "visible";
              element.style.animationName = "none";
              element.style.animationDelay = "0s";
              element.style.animationDuration = "1s";
              element.classList.remove(
                "animated",
                "fadeInUp",
                "bounceInUp",
                "fadeInLeft",
                "fadeInRight",
              );

              // Force reflow
              element.offsetHeight;

              // Apply new animation based on element type
              let animationType = element.getAttribute("data-animation");
              let delay = "0ms";
              let duration = "1s";

              if (!animationType) {
                if (element.classList.contains("watermark")) {
                  animationType = "fadeInUp";
                  delay = "0ms";
                } else if (element.classList.contains("hero-image")) {
                  animationType = "bounceInUp";
                  delay = "800ms";
                  duration = "2s";
                } else if (element.classList.contains("heading")) {
                  animationType = "fadeInUp";
                  delay = "200ms";
                } else if (element.classList.contains("subtext")) {
                  animationType = "fadeInUp";
                  delay = "400ms";
                } else if (element.classList.contains("cta-buttons")) {
                  animationType = "fadeInUp";
                  delay = "600ms";
                } else if (element.classList.contains("review-count")) {
                  animationType = "fadeInLeft";
                  delay = "1000ms";
                } else if (element.classList.contains("testimonial-sec")) {
                  animationType = "fadeInRight";
                  delay = "1200ms";
                } else {
                  animationType =
                    element.getAttribute("data-animation") || "fadeInUp";
                  delay = element.getAttribute("data-wow-delay") || "0ms";
                  duration = element.getAttribute("data-wow-duration") || "1s";
                }
              } else {
                delay = element.getAttribute("data-wow-delay") || "0ms";
                duration = element.getAttribute("data-wow-duration") || "1s";
              }

              element.style.animationDelay = delay;
              element.style.animationDuration = duration;
              element.style.animationName = animationType;
              element.style.animationFillMode = "both";
              element.classList.add("animated", animationType);
            }
          });
        }
      } catch (error) {
        // Silently handle errors to prevent console spam
      }
    };

    const initializeScripts = () => {
      // Initialize WOW.js for animations
      if (typeof window !== "undefined" && window.WOW) {
        new window.WOW().init();
      }

      // Initialize carousel if jQuery and Owl Carousel are available
      if (window.$ && window.$.fn.owlCarousel) {
        const $carousel = window.$(".home-banner-carousel");
        if ($carousel.length) {
          // Destroy existing carousel if it exists
          if ($carousel.data("owl.carousel")) {
            $carousel.trigger("destroy.owl.carousel");
          }

          $carousel.owlCarousel({
            items: 1,
            loop: true,
            autoplay: true,
            autoplayTimeout: 5000,
            autoplayHoverPause: false,
            dots: true,
            nav: false,
            margin: 0,
            stagePadding: 0,
            smartSpeed: 1000,
            dotsData: false,
            onChanged: function (event) {
              console.log("Slide changed to:", event.item.index);
              // Check if it's the first slide (index 0 or when looping back to first slide)
              const isFirstSlide = event.item.index % event.item.count === 0;
              setTimeout(function () {
                resetSlideAnimations(isFirstSlide);
              }, 200);
            },
            onInitialized: function (event) {
              console.log(
                "Carousel initialized with",
                event.item.count,
                "items",
              );
              // Initialize first slide animations (always first slide on page load)
              setTimeout(function () {
                resetSlideAnimations(true);
              }, 300);
            },
            responsive: {
              0: {
                items: 1,
                dots: true,
              },
              768: {
                items: 1,
                dots: true,
              },
              1024: {
                items: 1,
                dots: true,
              },
            },
          });
        }
      }
    };

    // Wait for scripts to load
    const checkScripts = () => {
      if (window.$ && window.$.fn.owlCarousel && window.WOW) {
        initializeScripts();
      } else {
        setTimeout(checkScripts, 100);
      }
    };

    checkScripts();

    // Cleanup function
    return () => {
      if (window.$ && window.$(".home-banner-carousel").data("owl.carousel")) {
        window.$(".home-banner-carousel").trigger("destroy.owl.carousel");
      }
    };
  }, []);

  const bannerSlides = [
    {
      id: 1,
      watermark: "security",
      heading: "India's 1st Camera + Smart Security Platform",
      subtext:
        "Protect your home for just ₹9/hour — alerts police & neighbours instantly.",
      ctaText: "Customer Stories",
      ctaLink: "#/testimonials",
      learnMoreText: "Learn More",
      productImage: "/home/corelens-echo.png",
      backgroundColor: "#e1effe",
      textColor: "#2D7CBF",
      watermarkColor: "#c5e0f7",
      testimonial: {
        text: "Picture quality is excellent even in low light.",
        name: "Anjali Mehta",
        image: "user.png",
        backgroundColor: "#d0ebff",
      },
    },
    {
      id: 2,
      watermark: "security",
      heading: "No Power? No Net? Still Safe.",
      subtext: "Corelens works even during outages.",
      ctaText: "Discover Security",
      ctaLink: "/categories",
      learnMoreText: "Learn More",
      productImage: "/home/corelens-ultra.png",
      backgroundColor: "#d6e8fb",
      textColor: "#3498db",
      watermarkColor: "#abd6f8",
      testimonial: {
        text: "Gives full trip history – useful for billing.",
        name: "Meena Joshi",
        image: "review-user2.png",
        backgroundColor: "#e5f1fc",
      },
    },
    {
      id: 3,
      watermark: "security",
      heading: "Free Delivery. 1-Year Service.",
      subtext: "365-day support & onsite service — no holidays.",
      ctaText: "Buy Now",
      ctaLink: "#/product-details/corelens-turbo/6652dd611a712cc1384d5d63",
      learnMoreText: "Learn More",
      productImage: "/home/corelens-turbo.png",
      backgroundColor: "#ebeeff",
      textColor: "#2d7cbf",
      watermarkColor: "#cedff8",
      testimonial: {
        text: "Picture quality is excellent even in low light.",
        name: "Pooja Verma",
        image: "review-user3.png",
        backgroundColor: "#e0e5fe",
      },
    },
    {
      id: 4,
      watermark: "security",
      heading: "India's 1st Camera with Smart Surveillance",
      subtext:
        "Hourly based security at ₹9 with instant alerts for break-ins or emergencies.",
      ctaText: "Customer Stories",
      ctaLink: "#/testimonials",
      learnMoreText: "Learn More",
      productImage: "/home/corelens-gem.png",
      backgroundColor: "#e1effe",
      testimonial: {
        text: "Helped me set up everything on a video call.",
        name: "Simran Arora",
        image: "review-user4.png",
        backgroundColor: "#d0ebff",
      },
    },
    {
      id: 5,
      watermark: "security",
      heading: "No Power? No Internet? Still Protected.",
      subtext:
        "Corelens motion sensors work even during power cuts and network failure. @just 1799 now 684",
      ctaText: "Explore Security Solutions",
      ctaLink: "#/category/motion-sensors",
      learnMoreText: "Learn More",
      productImage: "/home/corelens-motion-sensor.png",
      backgroundColor: "#d6e8fb",
      textColor: "#3498db",
      watermarkColor: "#abd6f8",
      testimonial: {
        text: "Perfect for outdoor use, rain or shine.",
        name: "Neha Wadhwa",
        image: "review-user5.png",
        backgroundColor: "#e5f1fc",
      },
    },
    {
      id: 6,
      watermark: "security",
      heading: "Free Delivery. 1-Year Home Service. Zero Days Off.",
      subtext:
        "Uninterrupted security, doorstep delivery, 1-year service, 365-day support.",
      ctaText: "Buy Now",
      ctaLink: "#/product-details/corelens-prime/67b6f14412039d03d5e2c3ab",
      learnMoreText: "Learn More",
      productImage: "/home/smart-door-lock-prime.png",
      backgroundColor: "#ebeeff",
      textColor: "#2d7cbf",
      watermarkColor: "#cedff8",
      testimonial: {
        text: "Looks stylish and works reliably.",
        name: "Siddharth Chawla",
        image: "review-user6.png",
        backgroundColor: "#e0e5fe",
      },
    },
  ];

  return (
    <section className="home-banner">
      <div className="wrapper inner-box">
        <div className="owl-carousel owl-theme mainbanner-slider home-banner-carousel">
          {bannerSlides.map((slide) => (
            <div
              key={slide.id}
              className="item mediascreen"
              style={{
                backgroundColor: slide.backgroundColor || "#cfe6fa",
                minHeight: "70rem",
                width: "100%",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                position: "relative",
                boxSizing: "border-box",
                margin: "0",
                padding: "5rem 0 6rem",
              }}
            >
              <h1
                className="watermark"
                style={{
                  color: slide.watermarkColor || "rgb(7 125 199 / 13%)",
                }}
              >
                <span className="typewriter">{slide.watermark}</span>
              </h1>
              <div className="title-group center">
                {slide.subtitle && (
                  <h3
                    className="sub-heading wow fadeInUp"
                    data-wow-duration="1s"
                    data-wow-delay="100ms"
                    data-animation="fadeInUp"
                    style={{ color: slide.textColor || "#2D7CBF" }}
                  >
                    {slide.subtitle}
                  </h3>
                )}
                <h2
                  className="heading wow fadeInUp"
                  data-wow-duration="1s"
                  data-wow-delay="200ms"
                  data-animation="fadeInUp"
                  style={{ color: slide.textColor || "#2D7CBF" }}
                >
                  {slide.heading}
                </h2>
                <p
                  className="subtext wow fadeInUp"
                  data-wow-duration="1s"
                  data-wow-delay="500ms"
                  data-animation="fadeInUp"
                  style={{ color: "#333333" }}
                >
                  {slide.subtext}
                </p>
                {slide.priceText && (
                  <p
                    className="price-text wow fadeInUp"
                    data-wow-duration="1s"
                    data-wow-delay="500ms"
                    data-animation="fadeInUp"
                  >
                    {slide.priceText}
                  </p>
                )}
              </div>
              <div
                className="hero-image wow bounceInUp"
                data-wow-delay="800ms"
                data-wow-duration="2s"
                data-wow-offset="100"
                data-animation="bounceInUp"
              >
                <img
                  src={
                    slide.productImage.startsWith("http")
                      ? slide.productImage
                      : image(slide.productImage)
                  }
                  alt="Smart Locks"
                  loading="eager"
                />
              </div>
              <div
                className="cta-buttons wow fadeInUp"
                data-wow-duration="1s"
                data-wow-delay="600ms"
                data-animation="fadeInUp"
              >
                <a href={slide.ctaLink} className="btn black arrow">
                  {slide.ctaText}
                </a>
                <a href="#/about-us" className="btn white">
                  {slide.learnMoreText}
                </a>
              </div>
              <div
                className="review-count wow fadeInLeft"
                data-wow-duration="1s"
                data-wow-delay="1000ms"
                data-animation="fadeInLeft"
              >
                <span
                  className="highlight-number"
                  style={{ color: slide.textColor || "#3388bd" }}
                >
                  182K+
                </span>
                <small style={{ color: slide.textColor || "#676767" }}>
                  Satisfied customers with positive reviews
                </small>
              </div>
              <div
                className="testimonial-sec wow fadeInRight"
                data-wow-duration="1s"
                data-wow-delay="1200ms"
                data-animation="fadeInRight"
                style={{
                  backgroundColor:
                    slide.testimonial.backgroundColor || "#cfe6fa",
                }}
              >
                <img src={image(slide.testimonial.image)} alt="user" />
                <div className="testimonial-text">
                  <p style={{ color: "#333333" }}>
                    {slide.testimonial.text}
                    <strong>{slide.testimonial.name}</strong>
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Banner;
