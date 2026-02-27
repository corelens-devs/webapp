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
            <a href="#">
              <img
                src="/images/icons/logo.png"
                alt="Corelens Logo"
                className="logo"
              />
            </a>
            <p>Shop No 3, building 2287/39 MS ROAD, K. PUL, Delhi-110006</p>
          </div>

          <div className="footer-col">
            <h4>Quick Links</h4>
            <ul>
              <li>
                <a href="#/about-us">About Us</a>
              </li>
              <li>
                <Link to="/surveillance">Surveillance</Link>
              </li>
              <li>
                <a href="#/testimonials">Testimonials</a>
              </li>
              <li>
                <a href="#/contact-us">Contact Us</a>
              </li>
            </ul>
          </div>

          <div className="footer-col">
            <h4>Explore</h4>
            <ul>
              <li>
                <a href="#/category/door-locks">Door Locks</a>
              </li>
              <li>
                <a href="#/category/cam-sensors">Cam Sensors</a>
              </li>
              <li>
                <a href="#/category/gps-trackers">GPS Trackers</a>
              </li>
              <li>
                <a href="#/category/motion-sensors">Motion Sensors</a>
              </li>
              <li>
                <a href="#/category/accessories">Accessories</a>
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
                <a href="#/terms-of-use">Terms of Use</a>
              </li>
              <li>
                <a href="#/terms-of-sales">Terms of Sales</a>
              </li>
              <li>
                <a href="#/terms-and-conditions">Term & Condition</a>
              </li>
              <li>
                <a href="#/privacy-policy">Privacy Policy</a>
              </li>
              <li>
                <a href="#/account-deletion">Account Deletion</a>
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
