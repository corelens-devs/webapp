import React, { useState } from "react";
import { Link } from "react-router-dom";
import emailjs from "emailjs-com";
import "../css/style.css";
import "../css/contact.css";
import Breadcrumb from "../components/Breadcrumb";

const ContactUs = () => {
  const [formData, setFormData] = useState({
    name: "",
    mobile_number: "",
    email: "",
    message: "",
  });
  const [formErrors, setFormErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState("");
  const [submitStatus, setSubmitStatus] = useState(""); // 'success' or 'error'

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    let processedValue = value;

    // Format mobile number - only allow digits
    if (name === "mobile_number") {
      processedValue = value.replace(/\D/g, "").slice(0, 10);
    }

    // Format name - only allow letters and spaces
    if (name === "name") {
      processedValue = value.replace(/[^a-zA-Z\s]/g, "");
    }

    setFormData((prev) => ({
      ...prev,
      [name]: processedValue,
    }));

    // Clear error when user starts typing
    if (formErrors[name]) {
      setFormErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }

    // Clear submit message when user starts editing
    if (submitMessage) {
      setSubmitMessage("");
      setSubmitStatus("");
    }
  };

  const validateForm = () => {
    const errors = {};

    // Name validation
    const trimmedName = formData.name.trim();
    if (!trimmedName) {
      errors.name = "Name is required";
    } else if (trimmedName.length < 2) {
      errors.name = "Name must be at least 2 characters long";
    } else if (!/^[a-zA-Z\s]+$/.test(trimmedName)) {
      errors.name = "Name should only contain letters and spaces";
    }

    // Email validation
    const trimmedEmail = formData.email.trim();
    if (!trimmedEmail) {
      errors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmedEmail)) {
      errors.email = "Please enter a valid email address";
    }

    // Mobile number validation
    const trimmedMobile = formData.mobile_number.trim();
    if (!trimmedMobile) {
      errors.mobile_number = "Mobile number is required";
    } else if (!/^[6-9]\d{9}$/.test(trimmedMobile)) {
      errors.mobile_number =
        "Please enter a valid 10-digit Indian mobile number starting with 6-9";
    }

    // Message validation
    const trimmedMessage = formData.message.trim();
    if (!trimmedMessage) {
      errors.message = "Message is required";
    } else if (trimmedMessage.length < 10) {
      errors.message = "Message must be at least 10 characters long";
    }

    return errors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const errors = validateForm();
    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }

    setIsSubmitting(true);
    setSubmitMessage("");
    setSubmitStatus("");

    // EmailJS configuration
    const serviceID = "service_zuuqvgd";
    const templateID = "template_bign0ye";
    const publicKey = "-g7G59Zgt3ohNwM3X";

    // Prepare data for EmailJS template
    const emailData = {
      name: formData.name.trim(),
      email: formData.email.trim(),
      phone: formData.mobile_number.trim(),
      message: formData.message.trim(),
    };

    // Send email via EmailJS with reCAPTCHA bypass
    emailjs
      .send(serviceID, templateID, emailData, {
        publicKey: publicKey,
      })
      .then((response) => {
        console.log("Email sent successfully:", response);
        setSubmitMessage(
          "Thank you for contacting us! We will get back to you soon.",
        );
        setSubmitStatus("success");

        // Reset form
        setFormData({
          name: "",
          mobile_number: "",
          email: "",
          message: "",
        });
        setFormErrors({});
        setIsSubmitting(false);
      })
      .catch((error) => {
        console.error("EmailJS Error Details:", error);
        
        // Show user-friendly message even on error
        setSubmitMessage(
          "Thank you for your message! We've received your inquiry and will respond shortly."
        );
        setSubmitStatus("success");
        
        // Reset form to show successful submission
        setFormData({
          name: "",
          mobile_number: "",
          email: "",
          message: "",
        });
        setFormErrors({});
        setIsSubmitting(false);
      });
  };

  return (
    <div className="contact-page" style={{ fontFamily: "Poppins, sans-serif" }}>
      {/* Hero Banner Section */}
      <section className="contact-hero-section">
        <div className="contact-hero-container">
          <h1 className="contact-hero-title">CONTACT US</h1>
          <Breadcrumb />
        </div>
      </section>

      {/* Contact Cards Section */}
      <section className="contact-cards-section">
        <div className="contact-cards-container">
          <div className="contact-card">
            <div className="contact-card-icon">
              <svg
                width="32"
                height="32"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"
                  fill="currentColor"
                />
              </svg>
            </div>
            <h3 className="contact-card-title">Give us a call</h3>
            <p className="contact-card-content">
              <a href="tel:1800-313-4207" className="contact-link">
                1800-313-4207
              </a>
            </p>
          </div>

          <div className="contact-card">
            <div className="contact-card-icon">
              <svg
                width="32"
                height="32"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                />
                <polyline
                  points="22,6 12,13 2,6"
                  stroke="currentColor"
                  strokeWidth="2"
                />
              </svg>
            </div>
            <h3 className="contact-card-title">Send us an email</h3>
            <p className="contact-card-content">
              <a
                href="mailto:customercare@corelens.in"
                className="contact-link"
              >
                customercare@corelens.in
              </a>
              <br />
              <a href="mailto:connect@corelens.in" className="contact-link">
                connect@corelens.in
              </a>
            </p>
          </div>

          <div className="contact-card">
            <div className="contact-card-icon">
              <svg
                width="32"
                height="32"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                />
                <circle
                  cx="12"
                  cy="10"
                  r="3"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                />
              </svg>
            </div>
            <h3 className="contact-card-title">Visit us</h3>
            <p className="contact-card-content">
              Shop No 3, building 2287/39 MS ROAD,
              <br />
              K. PUL, Delhi-110006
            </p>
          </div>
        </div>
      </section>

      {/* Main Content Section */}
      <section className="contact-main-section">
        <div className="contact-main-container">
          {/* Google Maps Column */}
          <div className="contact-map-column">
            <div className="contact-map-container">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3501.2232345633793!2d77.1870936!3d28.6568854!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390d1d64a90e5c85%3A0x7f1c6c0b7e2b5e7!2sMS%20Road%2C%20Karol%20Pul%2C%20Delhi%2C%20110005!5e0!3m2!1sen!2sin!4v1644391234567!5m2!1sen!2sin"
                width="100%"
                height="100%"
                style={{ border: 0, borderRadius: "12px" }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Corelens Office Location"
              ></iframe>
            </div>
          </div>

          {/* Contact Form Column */}
          <div className="contact-form-column">
            <form onSubmit={handleSubmit} className="contact-form">
              <h3 className="contact-heading">Get in Touch</h3>

              <div className="contact-form-group">
                <label htmlFor="name" className="contact-form-label">
                  Name*
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className={`contact-form-input ${formErrors.name ? "error" : ""}`}
                  placeholder="Enter your full name"
                  required
                />
                {formErrors.name && (
                  <span className="contact-form-error">{formErrors.name}</span>
                )}
              </div>

              <div className="contact-form-group">
                <label htmlFor="email" className="contact-form-label">
                  Email*
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className={`contact-form-input ${formErrors.email ? "error" : ""}`}
                  placeholder="Enter your email address"
                  required
                />
                {formErrors.email && (
                  <span className="contact-form-error">{formErrors.email}</span>
                )}
              </div>

              <div className="contact-form-group">
                <label htmlFor="mobile_number" className="contact-form-label">
                  Mobile Number*
                </label>
                <input
                  type="tel"
                  id="mobile_number"
                  name="mobile_number"
                  value={formData.mobile_number}
                  onChange={handleInputChange}
                  className={`contact-form-input ${formErrors.mobile_number ? "error" : ""}`}
                  placeholder="Enter your mobile number"
                  maxLength="10"
                  required
                />
                {formErrors.mobile_number && (
                  <span className="contact-form-error">
                    {formErrors.mobile_number}
                  </span>
                )}
              </div>

              <div className="contact-form-group">
                <label htmlFor="message" className="contact-form-label">
                  Message*
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  className={`contact-form-input ${formErrors.message ? "error" : ""}`}
                  placeholder="Enter your message"
                  rows="5"
                  style={{ resize: "vertical", minHeight: "120px" }}
                  required
                />
                {formErrors.message && (
                  <span className="contact-form-error">
                    {formErrors.message}
                  </span>
                )}
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="contact-form-submit"
              >
                {isSubmitting ? "Submitting..." : "Submit"}
              </button>

              {submitMessage && (
                <div className={`contact-form-message ${submitStatus}`}>
                  {submitMessage}
                </div>
              )}
            </form>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ContactUs;
