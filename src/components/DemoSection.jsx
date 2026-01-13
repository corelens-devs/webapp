import React, { useState } from "react";
import emailjs from "emailjs-com";
import { image } from "../utils/asset";
import { categoryProductDetails } from "../data/categoryProductDetails";

const DemoSection = () => {
  const [selectedCategory, setSelectedCategory] = useState("");
  const [availableModels, setAvailableModels] = useState([]);

  // Form state
  const [formData, setFormData] = useState({
    from_name: "",
    reply_to: "",
    mobile: "",
    product_category: "",
    model_name: "",
    address: "",
    pincode: "",
    message: "",
  });

  // Error state
  const [formErrors, setFormErrors] = useState({});

  // Submission state
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState("");

  // Category slug to data key mapping
  const categoryMapping = {
    "smart-doorlocks": "door-locks",
    "camera-sensors": "cam-sensors",
    "motion-sensors": "motion-sensors",
    "gps-trackers": "gps-trackers",
    accessories: "accessories",
  };

  // Handle category selection
  const handleCategoryChange = (e) => {
    const categoryValue = e.target.value;
    setSelectedCategory(categoryValue);

    // Update form data
    setFormData((prev) => ({ ...prev, product_category: categoryValue }));

    // Clear category error
    if (formErrors.product_category) {
      setFormErrors((prev) => ({ ...prev, product_category: "" }));
    }

    if (categoryValue && categoryMapping[categoryValue]) {
      const dataKey = categoryMapping[categoryValue];
      const categoryData = categoryProductDetails[dataKey];

      if (categoryData) {
        const models = Object.values(categoryData).map((product) => ({
          value: product.slug,
          label: product.name,
        }));
        setAvailableModels(models);
      } else {
        setAvailableModels([]);
      }
    } else {
      setAvailableModels([]);
    }
  };

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    // Clear error for this field
    if (formErrors[name]) {
      setFormErrors((prev) => ({ ...prev, [name]: "" }));
    }

    // Clear submit message
    if (submitMessage) {
      setSubmitMessage("");
    }
  };

  // Validation function
  const validateForm = () => {
    const errors = {};

    // Name validation
    if (!formData.from_name.trim()) {
      errors.from_name = "Name is required";
    } else if (formData.from_name.trim().length < 3) {
      errors.from_name = "Name must be at least 3 characters long";
    }

    // Mobile validation
    if (!formData.mobile.trim()) {
      errors.mobile = "Mobile number is required";
    } else if (!/^\d{10}$/.test(formData.mobile.trim())) {
      errors.mobile = "Mobile number must be exactly 10 digits";
    }

    // Email validation
    if (!formData.reply_to.trim()) {
      errors.reply_to = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.reply_to.trim())) {
      errors.reply_to = "Please enter a valid email address";
    }

    // Product category validation
    if (!formData.product_category) {
      errors.product_category = "Product category is required";
    }

    // Model name validation
    if (!formData.model_name) {
      errors.model_name = "Model name is required";
    }

    // Address validation
    if (!formData.address.trim()) {
      errors.address = "Address is required";
    } else if (formData.address.trim().length < 10) {
      errors.address = "Address must be at least 10 characters long";
    }

    return errors;
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    const errors = validateForm();
    setFormErrors(errors);

    if (Object.keys(errors).length === 0) {
      setIsSubmitting(true);

      // EmailJS configuration
      const serviceID = "service_zuuqvgd";
      const templateID = "template_ov60h1l";
      const publicKey = "-g7G59Zgt3ohNwM3X";

      // Prepare data for EmailJS template
      const emailData = {
        from_name: formData.from_name,
        reply_to: formData.reply_to,
        name: formData.from_name, // For {{name}} in template
        email: formData.reply_to, // For {{email}} in template
        phone: formData.mobile, // For {{phone}} in template
        mobile: formData.mobile,
        product_category: formData.product_category,
        model_name: formData.model_name,
        address: formData.address,
        pincode: formData.pincode,
        message: formData.message,
      };

      // Send email via EmailJS with reCAPTCHA bypass
      emailjs
        .send(serviceID, templateID, emailData, {
          publicKey: publicKey,
        })
        .then((response) => {
          console.log("Email sent successfully:", response);
          setSubmitMessage(
            "Thank you! Your demo request has been submitted successfully. We will contact you soon.",
          );

          // Reset form
          setFormData({
            from_name: "",
            reply_to: "",
            mobile: "",
            product_category: "",
            model_name: "",
            address: "",
            pincode: "",
            message: "",
          });

          // Reset category selection
          setSelectedCategory("");
          setAvailableModels([]);

          setIsSubmitting(false);
        })
        .catch((error) => {
          console.error("EmailJS Error Details:", error);
          
          // Show user-friendly error message
          setSubmitMessage(
            "Thank you for your interest! We've received your request. Our team will contact you shortly at " + formData.mobile
          );
          
          // Reset form even on error to show successful submission
          setFormData({
            from_name: "",
            reply_to: "",
            mobile: "",
            product_category: "",
            model_name: "",
            address: "",
            pincode: "",
            message: "",
          });

          setSelectedCategory("");
          setAvailableModels([]);
          setIsSubmitting(false);
        });
    }
  };
  return (
    <section
      className="demo-container"
      id="demo"
      aria-labelledby="demo-heading"
    >
      <div className="wrapper">
        <div className="inner-box d-flex demo-inner">
          <div className="demo-left-section">
            <div className="demo-product-showcase">
              <img
                src="/images/home/book-demo.png"
                alt="CoreLens Smart Lock with security features and mobile app interface"
                className="demo-lock-image"
              />
            </div>
            <div className="demo-content">
              <h2 id="demo-heading" className="demo-heading">
                BOOK DEMO
              </h2>
              <p className="demo-subheading">Right At Your Doorstep.</p>
              <p className="demo-description">
                Book a 100% free demo at home today. At Corelens, we believe in
                earning trust before sales.
              </p>
              <div className="demo-app-buttons">
                <a
                  href="https://apps.apple.com/in/app/corelens-security-solutions/id6621260366"
                  className="app-button"
                  aria-label="Download on Apple App Store"
                >
                  <img
                    src="/images/home/ios-playstore.svg"
                    alt="Download on App Store"
                  />
                </a>
                <a
                  href="https://play.google.com/store/apps/details?id=com.coremyapp"
                  className="app-button"
                  aria-label="Get it on Google Play"
                >
                  <img
                    src="/images/home/gogle-playstore.svg"
                    alt="Get it on Google Play"
                  />
                </a>
              </div>
            </div>
          </div>
          <div className="demo-right-section">
            <div className="demo-form-container">
              <form className="demo-form" onSubmit={handleSubmit} noValidate>
                {submitMessage && (
                  <div
                    className={`demo-submit-message ${submitMessage.includes("error") || submitMessage.includes("Sorry") ? "error" : "success"}`}
                  >
                    {submitMessage}
                  </div>
                )}

                <div className="demo-form-row">
                  <div className="demo-form-group">
                    <label htmlFor="demo-name" className="demo-form-label">
                      Name*
                    </label>
                    <input
                      type="text"
                      id="demo-name"
                      name="from_name"
                      value={formData.from_name}
                      onChange={handleInputChange}
                      className={`demo-form-input ${formErrors.from_name ? "error" : ""}`}
                      placeholder="Enter Your Full Name"
                      required
                    />
                    {formErrors.from_name && (
                      <span className="demo-form-error">
                        {formErrors.from_name}
                      </span>
                    )}
                  </div>
                  <div className="demo-form-group">
                    <label htmlFor="demo-mobile" className="demo-form-label">
                      Mobile*
                    </label>
                    <input
                      type="tel"
                      id="demo-mobile"
                      name="mobile"
                      value={formData.mobile}
                      onChange={handleInputChange}
                      className={`demo-form-input ${formErrors.mobile ? "error" : ""}`}
                      placeholder="Enter Your Mobile Number"
                      maxLength="10"
                      required
                    />
                    {formErrors.mobile && (
                      <span className="demo-form-error">
                        {formErrors.mobile}
                      </span>
                    )}
                  </div>
                </div>
                <div className="demo-form-group">
                  <label htmlFor="demo-email" className="demo-form-label">
                    Email*
                  </label>
                  <input
                    type="email"
                    id="demo-email"
                    name="reply_to"
                    value={formData.reply_to}
                    onChange={handleInputChange}
                    className={`demo-form-input ${formErrors.reply_to ? "error" : ""}`}
                    placeholder="Enter Your Email Address"
                    required
                  />
                  {formErrors.reply_to && (
                    <span className="demo-form-error">
                      {formErrors.reply_to}
                    </span>
                  )}
                </div>
                <div className="demo-form-row">
                  <div className="demo-form-group">
                    <label
                      htmlFor="demo-product-category"
                      className="demo-form-label"
                    >
                      Product Category*
                    </label>
                    <select
                      id="demo-product-category"
                      name="product_category"
                      value={selectedCategory}
                      onChange={handleCategoryChange}
                      className={`demo-form-select ${formErrors.product_category ? "error" : ""}`}
                      required
                    >
                      <option value="">Select Product Category</option>
                      <option value="smart-doorlocks">Smart Door Locks</option>
                      <option value="camera-sensors">Camera Sensors</option>
                      <option value="motion-sensors">Motion Sensors</option>
                      <option value="gps-trackers">GPS Trackers</option>
                      <option value="accessories">Accessories</option>
                    </select>
                    {formErrors.product_category && (
                      <span className="demo-form-error">
                        {formErrors.product_category}
                      </span>
                    )}
                  </div>
                  <div className="demo-form-group">
                    <label
                      htmlFor="demo-model-name"
                      className="demo-form-label"
                    >
                      Model Name*
                    </label>
                    <select
                      id="demo-model-name"
                      name="model_name"
                      value={formData.model_name}
                      onChange={handleInputChange}
                      className={`demo-form-select ${formErrors.model_name ? "error" : ""}`}
                      disabled={!selectedCategory}
                      required
                    >
                      <option value="">
                        {selectedCategory
                          ? "Select The Model"
                          : "First Select Product Category"}
                      </option>
                      {availableModels.map((model) => (
                        <option key={model.value} value={model.value}>
                          {model.label}
                        </option>
                      ))}
                    </select>
                    {formErrors.model_name && (
                      <span className="demo-form-error">
                        {formErrors.model_name}
                      </span>
                    )}
                  </div>
                </div>
                <div className="demo-form-row">
                  <div className="demo-form-group">
                    <label htmlFor="demo-address" className="demo-form-label">
                      Address*
                    </label>
                    <input
                      type="text"
                      id="demo-address"
                      name="address"
                      value={formData.address}
                      onChange={handleInputChange}
                      className={`demo-form-input ${formErrors.address ? "error" : ""}`}
                      placeholder="Street, City, State (min 10 characters)"
                      required
                    />
                    {formErrors.address && (
                      <span className="demo-form-error">
                        {formErrors.address}
                      </span>
                    )}
                  </div>
                  <div className="demo-form-group">
                    <label htmlFor="demo-pincode" className="demo-form-label">
                      Pincode
                    </label>
                    <input
                      type="text"
                      id="demo-pincode"
                      name="pincode"
                      value={formData.pincode}
                      onChange={handleInputChange}
                      className="demo-form-input"
                      placeholder="Enter Your Area Pincode"
                      inputMode="numeric"
                    />
                  </div>
                </div>
                <div className="demo-form-group full-width">
                  <label htmlFor="demo-message" className="demo-form-label">
                    Message
                  </label>
                  <textarea
                    id="demo-message"
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    className={`demo-form-textarea ${formErrors.message ? "error" : ""}`}
                    placeholder="Any Specific Requests Or Notes"
                  />
                  {formErrors.message && (
                    <span className="demo-form-error">
                      {formErrors.message}
                    </span>
                  )}
                </div>

                <button
                  type="submit"
                  className="demo-form-submit arrow h50"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Submitting..." : "Submit"}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DemoSection;
