import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import "../css/surveillance.css";
import { image } from "../utils/asset";
import {
  FaEye,
  FaShieldAlt,
  FaHome,
  FaRupeeSign,
  FaExclamationTriangle,
} from "react-icons/fa";

const Surveillance = () => {
  useEffect(() => {
    // Set meta title
    document.title =
      "Corelens | Surveillance | Smart Home Security Systems & CCTV in India";

    // Set meta description
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute(
        "content",
        "Book on-demand surveillance at just ₹9 with Corelens app. Smart CCTV monitoring, real-time alerts & emergency response for home, shop & office security in India.",
      );
    } else {
      const meta = document.createElement("meta");
      meta.name = "description";
      meta.content =
        "Book on-demand surveillance at just ₹9 with Corelens app. Smart CCTV monitoring, real-time alerts & emergency response for home, shop & office security in India.";
      document.getElementsByTagName("head")[0].appendChild(meta);
    }

    // Set meta keywords
    const metaKeywords = document.querySelector('meta[name="keywords"]');
    if (metaKeywords) {
      metaKeywords.setAttribute(
        "content",
        "Corelens, on-demand surveillance app, surveillance app India, CCTV cameras India, buy CCTV online, GPS trackers India, home security solutions, mobile surveillance app, Android surveillance app, iOS surveillance app, smart home security, CCTV installation India, book surveillance service, best GPS tracker India, affordable CCTV cameras India",
      );
    } else {
      const meta = document.createElement("meta");
      meta.name = "keywords";
      meta.content =
        "Corelens, on-demand surveillance app, surveillance app India, CCTV cameras India, buy CCTV online, GPS trackers India, home security solutions, mobile surveillance app, Android surveillance app, iOS surveillance app, smart home security, CCTV installation India, book surveillance service, best GPS tracker India, affordable CCTV cameras India";
      document.getElementsByTagName("head")[0].appendChild(meta);
    }

    // Cleanup function to reset title when component unmounts
    return () => {
      document.title = "Corelens - Smart Security Solutions";
    };
  }, []);

  return (
    <div className="surveillance-page">
      {/* Hero Banner Offer Section */}
      <section className="surveillance-offer">
        <div className="wrapper">
          <div className="inner-box">
            <div className="offer-content">
              <div className="offer-left">
                <h2 className="offer-title">
                  Surveillance at Just <br />
                  ₹9 — Anytime, Anywhere
                </h2>
                <p className="offer-subtitle">
                  Installing Cameras in easy but watching them 24/7 isnt.
                  Although our cameras comes with notification on mobiles but
                  still if you wish we can do surveillance at 9RS per hour when
                  you are on a trip or vacation and want complete peace of mind.
                  During surveillance if we see thieves or other emergency we
                  inform the police and neighbours . All this at Just 9Rs per
                  hour. Pay for hourly basis. You can start and end surveillance
                  directly through our app.
                </p>

                <div className="offer-features">
                  <div className="feature-item">
                    <img
                      src={image("corelene-greencheck.png")}
                      alt="check"
                      className="check-icon"
                    />
                    <span>Instant Booking</span>
                  </div>
                  <div className="feature-item">
                    <img
                      src={image("corelene-greencheck.png")}
                      alt="check"
                      className="check-icon"
                    />
                    <span>Privacy Protected</span>
                  </div>
                  <div className="feature-item">
                    <img
                      src={image("corelene-greencheck.png")}
                      alt="check"
                      className="check-icon"
                    />
                    <span>Customized can't view other address</span>
                  </div>
                  <div className="feature-item">
                    <img
                      src={image("corelene-greencheck.png")}
                      alt="check"
                      className="check-icon"
                    />
                    <span>Smart Alarm</span>
                  </div>
                  <div className="feature-item">
                    <img
                      src={image("corelene-greencheck.png")}
                      alt="check"
                      className="check-icon"
                    />
                    <span>Just ₹9 monthly subscription paid for a plan.</span>
                  </div>
                </div>

                <div className="offer-buttons">
                  <button className="btn primary-btn">Book Now @ ₹9</button>
                  <button className="btn secondary-btn">
                    Download Corelens App
                  </button>
                </div>
              </div>

              <div className="offer-right">
                <div className="mobile-app-preview">
                  <img
                    src={image("thumb/surveillance-ap-screen.png")}
                    alt="Surveillance App Screen"
                    className="app-screen-image"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="surveillance-services">
        <div className="wrapper">
          <div className="inner-box">
            <div className="services-content">
              <div className="services-header">
                <h2 className="section-title">
                  What is Surveillance <br className="hide" />& Why You Need It.
                </h2>
                <div className="services-subtitle">
                  <p>
                    Surveillance is the act of keeping a close watch on your
                    home, shop, or office—especially when you’re not around.
                    While traditional CCTVs just record footage, smart
                    surveillance like Corelens offers real-time monitoring,
                    alerts, and emergency response. Whether you're on vacation,
                    at work, or asleep, Corelens ensures your space is being
                    watched 24/7. You don’t need to keep checking—just pay for
                    what you use and stay protected anytime, anywhere.
                  </p>
                </div>
              </div>

              <div className="services-grid">
                <div className="service-card">
                  <div className="service-icon green">
                    <FaEye className="service-icon-font" />
                  </div>
                  <h3>You Can't Watch 24/7</h3>
                  <p>
                    Normal CCTV only records footage, but you can't be glued to
                    your screen all day. Corelens monitors and acts instantly
                    when it matters most.
                  </p>
                </div>

                <div className="service-card dark">
                  <div className="service-icon dark-green">
                    <FaShieldAlt className="service-icon-font" />
                  </div>
                  <h3>Smart Protection, Not Just Recording</h3>
                  <p>
                    Unlike basic cameras, Corelens raises alarms, verifies
                    threats, and notifies the right people—automatically.
                  </p>
                </div>

                <div className="service-card">
                  <div className="service-icon green">
                    <FaHome className="service-icon-font" />
                  </div>
                  <h3>We Guard Your Home When You're Away</h3>
                  <p>
                    Whether you're on vacation, at work, or asleep, Corelens
                    keeps an eye on your space 24/7.
                  </p>
                </div>
                <div className="service-card">
                  <div className="service-icon green">
                    <FaRupeeSign className="service-icon-font" />
                  </div>
                  <h3>Pay Only for What You Use</h3>
                  <p>
                    Start or stop surveillance anytime. No fixed setup or
                    contracts—just pay for the hours you need.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Comparison Table Section */}
      <section className="surveillance-comparison-table">
        <div className="wrapper">
          <div className="inner-box">
            <div className="comparison-table-container">
              <table className="surveillance-comparison-table-main">
                <thead>
                  <tr className="comparison-table-header">
                    <th className="comparison-table-cell normal-cctv-header">
                      Normal CCTV
                    </th>
                    <th className="comparison-table-cell corelens-header">
                      Corelens Surveillance
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="comparison-table-row">
                    <td className="comparison-table-cell normal-cctv-cell">
                      Just records video
                    </td>
                    <td className="comparison-table-cell corelens-cell">
                      Monitors & acts instantly
                    </td>
                  </tr>
                  <tr className="comparison-table-row">
                    <td className="comparison-table-cell normal-cctv-cell">
                      No emergency support
                    </td>
                    <td className="comparison-table-cell corelens-cell">
                      Calls family, neighbors & police
                    </td>
                  </tr>
                  <tr className="comparison-table-row">
                    <td className="comparison-table-cell normal-cctv-cell">
                      You must keep checking
                    </td>
                    <td className="comparison-table-cell corelens-cell">
                      We watch for you 24/7
                    </td>
                  </tr>
                  <tr className="comparison-table-row">
                    <td className="comparison-table-cell normal-cctv-cell">
                      Fixed setups & contracts
                    </td>
                    <td className="comparison-table-cell corelens-cell">
                      Pay only for the hours you use
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section - Flip Cards */}
      <section className="surveillance-how-it-works">
        <div className="wrapper">
          <div className="inner-box">
            <h2 className="how-it-works-main-title">
              How does Corelens
              <br />
              surveillance keep you safe?
            </h2>

            <div className="flip-cards-grid">
              {/* Card 1 */}
              <div className="flip-card">
                <div className="flip-card-inner">
                  <div className="flip-card-front">
                    <div className="vector-icon-large">
                      <img
                        src={image("icons/servillance-iconflip-1.png")}
                        alt="Book in Seconds"
                        className="vector-svg-large"
                      />
                    </div>
                    <div className="flipcord-details">
                      <h3 className="flip-card-title">Book in Seconds</h3>
                      <p className="flip-card-description">
                        Open The Corelens App → Select Your Cameras → Choose
                        Hourly (₹9) Or Monthly Plan
                      </p>
                    </div>
                  </div>
                  <div className="flip-card-back">
                    <p>
                      Just open the Corelens App and click on surveillance
                      button. Select the number of cameras you want us to do
                      surveillance for and select the duration (optional). Just
                      slide to start the surveillance.
                    </p>
                  </div>
                </div>
              </div>

              {/* Card 2 */}
              <div className="flip-card">
                <div className="flip-card-inner">
                  <div className="flip-card-front">
                    <div className="vector-icon-large">
                      <img
                        src={image("icons/servillance-iconflip-2.png")}
                        alt="Privacy First"
                        className="vector-svg-large"
                      />
                    </div>
                    <div className="flipcord-details">
                      <h3 className="flip-card-title">Privacy First</h3>
                      <p className="flip-card-description">
                        Your Exact Address Is Hidden. Technicians Cannot See
                        Your Location – They Only Monitor Your Camera Feed
                      </p>
                    </div>
                  </div>
                  <div className="flip-card-back">
                    <p>
                      We have kept your privacy as our topmost priority. Nobody
                      knows about your information like your address or phone
                      number or anything. They remain encrypted within our
                      system which keeps your privacy protected
                    </p>
                  </div>
                </div>
              </div>

              {/* Card 3 */}
              <div className="flip-card">
                <div className="flip-card-inner">
                  <div className="flip-card-front">
                    <div className="vector-icon-large">
                      <img
                        src={image("icons/servillance-iconflip-3.png")}
                        alt="Smart Alarm Raised"
                        className="vector-svg-large"
                      />
                    </div>
                    <div className="flipcord-details">
                      <h3 className="flip-card-title">Smart Alarm Raised</h3>
                      <p className="flip-card-description">
                        If Anything Unusual Is Detected, An Alarm Is Raised
                        Instantly
                      </p>
                    </div>
                  </div>
                  <div className="flip-card-back">
                    <p>
                      Once the emergency/Theft is confirmed by our supervisors ,
                      then the alarm is raised and calls are made to the nearest
                      police station and your neighbours in your absence. We
                      thrive to prevent your loss like its just ours.
                    </p>
                  </div>
                </div>
              </div>

              {/* Card 4 */}
              <div className="flip-card">
                <div className="flip-card-inner">
                  <div className="flip-card-front">
                    <div className="vector-icon-large">
                      <img
                        src={image("icons/servillance-iconflip-4.png")}
                        alt="Verified by Professionals"
                        className="vector-svg-large"
                      />
                    </div>
                    <div className="flipcord-details">
                      <h3 className="flip-card-title">
                        Verified by Professionals
                      </h3>
                      <p className="flip-card-description">
                        Our Senior Security Experts Check The Alert To Avoid
                        False Alarms
                      </p>
                    </div>
                  </div>
                  <div className="flip-card-back">
                    <p>
                      All the alerts are deeply examined in two levels to
                      sincerely provide the true service and keep you at ease.
                      Once the surveillance is active , the user shall not worry
                      about anything. They also get notified of every update.
                    </p>
                  </div>
                </div>
              </div>

              {/* Card 5 */}
              <div className="flip-card">
                <div className="flip-card-inner">
                  <div className="flip-card-front">
                    <div className="vector-icon-large">
                      <img
                        src={image("icons/servillance-iconflip-5.png")}
                        alt="Emergency Support Activated"
                        className="vector-svg-large"
                      />
                    </div>
                    <div className="flipcord-details">
                      <h3 className="flip-card-title">
                        Emergency Support Activated
                      </h3>
                      <p className="flip-card-description">
                        Once confirmed, Corelens immediately calls your
                        emergency contacts...
                      </p>
                    </div>
                  </div>
                  <div className="flip-card-back">
                    <p>
                      We have the access to your local police station which
                      saves time to quickly send the local police at your home.
                      We coordinate with everyone at the same time which is not
                      possible by you alone.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Surveillance;
