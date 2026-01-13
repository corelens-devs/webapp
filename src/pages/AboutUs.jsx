import React, { useEffect } from "react";
import "../css/about.css";
import Breadcrumb from "../components/Breadcrumb";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faShieldAlt,
  faMobileAlt,
  faHome,
  faClock,
  faStar,
  faFlag,
} from "@fortawesome/free-solid-svg-icons";

const AboutUs = () => {
  useEffect(() => {
    // Set meta title
    document.title =
      "Corelens | About Us | Smart Home Security Systems & CCTV in India";

    // Set meta description
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute(
        "content",
        "Learn about Corelens – India's trusted brand for CCTV cameras, smart locks, GPS trackers & motion sensors. Complete home & business security solutions with app control.",
      );
    } else {
      const meta = document.createElement("meta");
      meta.name = "description";
      meta.content =
        "Learn about Corelens – India's trusted brand for CCTV cameras, smart locks, GPS trackers & motion sensors. Complete home & business security solutions with app control.";
      document.getElementsByTagName("head")[0].appendChild(meta);
    }

    // Set meta keywords
    const metaKeywords = document.querySelector('meta[name="keywords"]');
    if (metaKeywords) {
      metaKeywords.setAttribute(
        "content",
        "Corelens security solutions, home security systems India, CCTV cameras in India, smart door locks India, motion sensors India, GPS trackers India, smart home security solutions, surveillance solutions India, Corelens app",
      );
    } else {
      const meta = document.createElement("meta");
      meta.name = "keywords";
      meta.content =
        "Corelens security solutions, home security systems India, CCTV cameras in India, smart door locks India, motion sensors India, GPS trackers India, smart home security solutions, surveillance solutions India, Corelens app";
      document.getElementsByTagName("head")[0].appendChild(meta);
    }

    return () => {
      document.title = "Corelens - Smart Security Solutions";
    };
  }, []);

  return (
    <div className="about-us-page">
      {/* Hero Section */}
      <section className="about-hero-section">
        <div className="about-hero-container">
          <h1 className="about-hero-title">ABOUT US</h1>
          <Breadcrumb />
        </div>
      </section>

      {/* Our Story Section */}
      <section className="about-story-section">
        <div className="about-container">
          <div className="about-story-content">
            <div className="about-story-text">
              <h2 className="about-section-title text-center">
                Smart Home Security Systems in India
              </h2>
              <p className="about-story-description">
                At Corelens, we believe that true security is not about
                devices—it’s about peace of mind. We are India’s first brand to
                offer a complete home and business security solution under one
                trusted name. Our wide range of products—CCTV cameras, GPS
                trackers, smart door locks, and motion sensors—work seamlessly
                together through the Corelens App, giving you total control and
                protection anytime, anywhere.
              </p>
              <p className="about-story-description">
                Whether you want to protect your home, office, vehicles, or
                loved ones, Corelens is designed to deliver smart, reliable, and
                affordable security solutions for India.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* The Cause Section */}
      <section className="about-cause-section">
        <div className="about-container">
          <div className="about-cause-content">
            <div className="about-cause-image">
              <img src="/images/the-couse.png" alt="THE CAUSE corelens" />
            </div>
            <div className="about-cause-text">
              <h2 className="about-section-title">The Cause</h2>
              <p className="about-cause-description">
                In a world where security threats are ever-evolving, we saw the
                need for a proactive approach to protection. Our
                state-of-the-art security devices are not only effective in
                capturing high-definition footage but also equipped with smart
                technology to alert you instantly of any suspicious activity.
              </p>
              <p className="about-cause-description">
                We believe that security should be accessible to everyone.
                That's why we strive to offer affordable, high-quality solutions
                without compromising on performance or reliability. Our products
                are designed to be user-friendly, making it easy for anyone to
                set up and manage their security system through our intuitive
                app.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Our Vision Section */}
      <section className="about-vision-section">
        <div className="about-container">
          <div className="about-vision-content">
            <div className="about-vision-text">
              <h2 className="about-section-title">Our Vision</h2>
              <div className="about-vision-points">
                <div className="about-vision-point">
                  <p>
                    In 2020, India recorded over 625,000 theft cases, largely
                    due to the COVID-19 pandemic and associated lockdowns.
                  </p>
                </div>
                <div className="about-vision-point alter-color">
                  <p>
                    The National Crime Records Bureau (NCRB) reported that motor
                    vehicle theft was the most common type of theft in India,
                    accounting for nearly 40% of all theft cases in 2020.
                  </p>
                </div>
                <div className="about-vision-point">
                  <p>
                    Preliminary data suggested a further rise in theft
                    incidents, with figures reported to be over 700,000 for the
                    year 2022.
                  </p>
                </div>
                <div className="about-vision-point alter-color">
                  <p>
                    Early reports indicate that theft cases continued to
                    increase, approaching pre-pandemic levels with an estimated
                    750,000 cases for the year 2023.
                  </p>
                </div>
                <div className="about-vision-point">
                  <p>
                    Early reports indicate that theft cases continued to
                    increase, approaching pre-pandemic levels with an estimated
                    750,000 cases for the year 2023.
                  </p>
                </div>
              </div>
            </div>
            <div className="about-vision-image">
              <img src="/images/vision-content.png" alt="Security Vision" />
            </div>
          </div>
        </div>
      </section>

      {/* Our Mission Section */}
      <section className="about-mission-section">
        <div className="about-container">
          <div className="about-mission-content">
            <div className="about-mission-image">
              <img
                src="/images/mission-corelens.png"
                alt="Mission Technology"
              />
            </div>
            <div className="about-mission-text">
              <h2 className="about-section-title">Our Mission</h2>
              <div className="about-mission-description">
                <ul>
                  <li>
                    To deliver advanced CCTV cameras, GPS trackers, smart locks,
                    and motion sensors designed for Indian conditions.
                  </li>
                  <li>
                    To provide flexible surveillance services—hourly, daily, or
                    monthly—so customers always stay in control.
                  </li>
                  <li>
                    To make smart home security in India accessible and
                    affordable for families and businesses.
                  </li>
                  <li>
                    To constantly innovate and build future-ready security
                    solutions powered by technology and trust.
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Our Core Values Section */}
      <section className="about-core-values-section">
        <div className="about-container">
          <div className="about-core-values-content">
            <div className="about-core-values-text">
              <h2 className="about-section-title">Our Core Values</h2>
              <ul className="core-values-list">
                <li>
                  <strong>Trust</strong> – Your safety is our responsibility.
                </li>
                <li>
                  <strong>Innovation</strong> – Smarter, faster, and more
                  connected devices.
                </li>
                <li>
                  <strong>Accessibility</strong> – Affordable security for every
                  Indian home.
                </li>
                <li>
                  <strong>Reliability</strong> – Products built to perform 24/7,
                  day and night.
                </li>
                <li>
                  <strong>Customer Satisfaction</strong> – Our goal is not just
                  sales, but your peace of mind.
                </li>
              </ul>
            </div>
            <div className="about-core-values-image">
              <img src="/images/customer-sutisfaction.png" alt="Core Values" />
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="about-choose-section">
        <div className="about-container">
          <h2 className="about-section-title about-choose-title">
            Why Choose Us
          </h2>
          <p className="about-choose-subtitle">
            Selecting us means safety, for exceptional service, reliability, and
            a technology-based safe experience. Every choice, be it hardware or
            service, is developed to secure your home and let you experience
            unparalleled convenience.
          </p>

          <div className="about-choose-grid">
            <div className="about-choose-card">
              <div className="choose-card-icon">
                <FontAwesomeIcon icon={faShieldAlt} className="feature-icon" />
              </div>
              <h3 className="choose-card-title">Complete Security Solution</h3>
              <p className="choose-card-description">
                CCTV cameras, smart locks, GPS trackers & motion sensors in one
                system.
              </p>
            </div>

            <div className="about-choose-card">
              <div className="choose-card-icon">
                <FontAwesomeIcon icon={faMobileAlt} className="feature-icon" />
              </div>
              <h3 className="choose-card-title">Corelens App Control</h3>
              <p className="choose-card-description">
                Monitor everything in real time from your smartphone.
              </p>
            </div>

            <div className="about-choose-card">
              <div className="choose-card-icon">
                <FontAwesomeIcon icon={faHome} className="feature-icon" />
              </div>
              <h3 className="choose-card-title">Free Doorstep Demo</h3>
              <p className="choose-card-description">
                Experience our products at home with zero cost.
              </p>
            </div>

            <div className="about-choose-card">
              <div className="choose-card-icon">
                <FontAwesomeIcon icon={faClock} className="feature-icon" />
              </div>
              <h3 className="choose-card-title">On-Demand Surveillance</h3>
              <p className="choose-card-description">
                Book live security by the hour, day, or month.
              </p>
            </div>

            <div className="about-choose-card">
              <div className="choose-card-icon">
                <FontAwesomeIcon icon={faStar} className="feature-icon" />
              </div>
              <h3 className="choose-card-title">Trusted by Thousands</h3>
              <p className="choose-card-description">
                Already protecting families and businesses across India.
              </p>
            </div>

            <div className="about-choose-card">
              <div className="choose-card-icon">
                <FontAwesomeIcon icon={faFlag} className="feature-icon" />
              </div>
              <h3 className="choose-card-title">Made for India</h3>
              <p className="choose-card-description">
                Strong, durable, and reliable solutions designed for Indian
                conditions.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Our Commitment Section */}
      <section className="about-commitment-section">
        <div className="about-container">
          <h2 className="about-section-title text-center">Our Commitment</h2>
          <div className="commitment-content">
            <p className="commitment-description">
              When you choose Corelens, you don't just buy a CCTV camera or
              smart lock—you choose a complete security partner. We are
              committed to protecting your family, home, vehicles, and business
              assets with technology that is powerful, simple, and dependable.
            </p>
            <p className="commitment-footer">
              Because at the end of the day,
              <br />
              <strong>
                👉 Corelens is not just about products—it's about protecting
                what matters most: your loved ones, your peace of mind, and your
                future.
              </strong>
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutUs;
