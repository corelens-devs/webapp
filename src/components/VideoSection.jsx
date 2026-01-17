import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import "./VideoSection.css";
import { image } from "../utils/asset";

const VideoSection = () => {
  useEffect(() => {
    // Initialize video slider with proper configuration
    const initVideoSlider = () => {
      const slider = document.querySelector(".video-slider");
      if (slider && window.$ && window.$.fn.owlCarousel) {
        // Destroy existing carousel if any
        if (window.$(slider).data("owl.carousel")) {
          window.$(slider).trigger("destroy.owl.carousel");
          window.$(slider).removeClass("owl-carousel owl-theme");
        }

        // Re-add required classes
        window.$(slider).addClass("owl-carousel owl-theme");

        window.$(slider).owlCarousel({
          items: 1,
          loop: true,
          margin: 0,
          nav: true,
          dots: true,
          autoplay: true,
          autoplayTimeout: 7000, 
          autoplayHoverPause: true,
          autoHeight: false,
          center: false,
          stagePadding: 0,
          smartSpeed: 1200, 
          animateOut: "fadeOut",
          animateIn: "fadeIn",
          dotsClass: "owl-dots",
          dotClass: "owl-dot",
          navClass: ["owl-prev", "owl-next"],
          navText: [
            '<span class="prev-arrow">‹</span>',
            '<span class="next-arrow">›</span>',
          ],
          responsive: {
            0: {
              items: 1,
              nav: true,
              dots: true,
            },
            768: {
              items: 1,
              nav: true,
              dots: true,
            },
            992: {
              items: 1,
              nav: true,
              dots: true,
            },
          },
          onInitialized: function (event) {
            console.log("Video carousel initialized successfully");
            // Force show dots
            setTimeout(() => {
              const dotsContainer = document.querySelector(
                ".video-slider .owl-dots",
              );
              if (dotsContainer) {
                dotsContainer.style.display = "block";
                dotsContainer.style.visibility = "visible";
              }
            }, 100);
          },
          onTranslated: function (event) {
            // event.page.index handles loop mode correctly for dots
            const pageIndex = event.page.index;
            const dots = document.querySelectorAll(".video-slider .owl-dot");
            dots.forEach((dot, index) => {
              if (index === pageIndex) {
                dot.classList.add("active");
              } else {
                dot.classList.remove("active");
              }
            });
          },
        });

        // Add click event listeners to dots for smooth manual navigation
        setTimeout(() => {
          const dots = document.querySelectorAll(".video-slider .owl-dot");
          dots.forEach((dot, index) => {
            dot.addEventListener("click", function () {
              window.$(slider).trigger("to.owl.carousel", [index, 1200]); // Smooth manual transition
            });
          });
        }, 500);
      }
    };

    // Wait for scripts and DOM to be ready
    const checkAndInit = () => {
      if (window.$ && window.$.fn.owlCarousel) {
        const slider = document.querySelector(".video-slider");
        if (slider && slider.children.length > 0) {
          initVideoSlider();
        } else {
          setTimeout(checkAndInit, 100);
        }
      } else {
        setTimeout(checkAndInit, 100);
      }
    };

    // Start initialization
    setTimeout(checkAndInit, 200);

    return () => {
      const slider = document.querySelector(".video-slider");
      if (slider && window.$ && window.$(slider).data("owl.carousel")) {
        window.$(slider).trigger("destroy.owl.carousel");
      }
    };
  }, []);

  const videoSlides = [
    {
      id: 1,
      image: image("corelens-graphic-ad.png"),
      alt: "Going on a Trip? slide",
    },
    {
      id: 2,
      image: image("home/Group-143684.png"),
      alt: "Going on a Trip? slide 2",
    },
  ];

  return (
    <div className="wrapper">
      <section className="inner-wrap">
        <div className="slidingsec title-group center">
          <h2 className="heading text-heading">
            Need extra safety through our camera sensors ?
            <span className="highlight">
              Book surveillance and enjoy your outings.
            </span>
          </h2>
        </div>
        <div className="title-group between-center pad-10 ">
          <h2 className="headline bluegray ">
            SECURE YOUR HOME <br />
            SECURE YOUR FAMILY
          </h2>
          <div className="slide-content">
            <p className="subtext">
              Why only rely on old cameras when you can book surveillance with
              our <br className="hide" />
              products on hourly basis or monthly basis easily.
            </p>
            <Link to="/surveillance" className="btn arrow h50">
              Explore Now
            </Link>
          </div>
        </div>
        <section className="video-sec" style={{ marginBottom: "80px" }}>
          <div className="slider owl-carousel owl-theme video-slider">
            {videoSlides.map((slide) => (
              <div key={slide.id} className="slide-item">
                <img src={slide.image} alt={slide.alt} />
              </div>
            ))}
          </div>
        </section>
      </section>
    </div>
  );
};

export default VideoSection;
