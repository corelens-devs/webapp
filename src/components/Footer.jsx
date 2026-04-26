import React from "react";
import { Link } from "react-router-dom";
import "./Footer.css";
import { image } from "../utils/asset";

const Footer = () => {
  return (
    <footer className="footer wow fadeInUp">
      <div className="inner-box">
        <div className="footer-row footer-top">
          <div className="heading-sec">
            <h3>
              Ready to Transform Your Home Security?
              <br />
              Take the First Step Today!
            </h3>
          </div>
          <div className="contact-sec">
            <div>
              <h4>Call Us</h4>
              <a href="tel:+623855025004">1800-313-4207</a>
            </div>
            <div>
              <h4>Email Us</h4>
              <a href="mailto:customercare@corelens.in">
                customercare@corelens.in
              </a>
            </div>
          </div>
        </div>
        <div className="footer-row footer-main">
          <div className="footer-col about-col">
            <Link to="/">
              <img
                src="/images/icons/logo.png"
                alt="Corelens Logo"
                className="logo"
              />
            </Link>
            <p>Shop No 3, building 2287/39 MS ROAD, K. PUL, Delhi-110006</p>
          </div>

          <div className="footer-col">
            <h4>Quick Links</h4>
            <ul>
              <li>
                <Link to="/about-us">About Us</Link>
              </li>
              <li>
                <Link to="/surveillance">Surveillance</Link>
              </li>
              <li>
                <Link to="/testimonials">Testimonials</Link>
              </li>
              <li>
                <Link to="/contact-us">Contact Us</Link>
              </li>
              <li>
                <Link to="/hourly-surveillance-service">Hourly Surveillance Service</Link>
              </li>
            </ul>
          </div>

          <div className="footer-col">
            <h4>Explore</h4>
            <ul>
              <li>
                <Link to="/category/door-locks">Door Locks</Link>
              </li>
              <li>
                <Link to="/category/cam-sensors">Cam Sensors</Link>
              </li>
              <li>
                <Link to="/category/gps-trackers">GPS Trackers</Link>
              </li>
              <li>
                <Link to="/category/motion-sensors">Motion Sensors</Link>
              </li>
              <li>
                <Link to="/category/accessories">Accessories</Link>
              </li>
            </ul>
          </div>

          <div className="footer-col">
            <h4>Follow Us</h4>
            <ul>
              <li>
                <a
                  href="https://www.facebook.com/profile.php?id=61552698689659"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Facebook
                </a>
              </li>
              <li>
                <a
                  href="https://x.com/corelensindia"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Twitter
                </a>
              </li>
              <li>
                <a
                  href="https://www.instagram.com/corelensofficial/?hl=en"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Instagram
                </a>
              </li>
              <li>
                <a
                  href="https://www.linkedin.com/in/corelens-india-612605327/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  LinkedIn
                </a>
              </li>
              <li>
                <a
                  href="https://www.youtube.com/@corelensindia"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  YouTube
                </a>
              </li>
            </ul>
          </div>

          <div className="footer-col">
            <h4>Policies</h4>
            <ul>
              <li>
                <Link to="/terms-of-use">Terms of Use</Link>
              </li>
              <li>
                <Link to="/terms-of-sales">Terms of Sales</Link>
              </li>
              <li>
                <Link to="/terms-and-conditions">Term & Condition</Link>
              </li>
              <li>
                <Link to="/privacy-policy">Privacy Policy</Link>
              </li>
              <li>
                <Link to="/account-deletion">Account Deletion</Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="footer-row footer-bottom">
          <p>Copyright © 2025 - All Right Reserved</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
