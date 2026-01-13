import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { image } from "../utils/asset";
import "../css/signin.css";
import Breadcrumb from "../components/Breadcrumb";
import Swal from "sweetalert2";

const Signup = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    mobile: "",
    name: "",
    email: "",
    city: ""
  });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    const verifiedMobile = localStorage.getItem("pendingSignupMobile");
    if (!verifiedMobile) {
      navigate("/sign-in");
      return;
    }
    setFormData(prev => ({ ...prev, mobile: verifiedMobile }));
  }, [navigate]);

  const validate = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = "Name is required";
    if (!formData.city.trim()) newErrors.city = "City is required";
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Invalid email format";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    setLoading(true);
    try {
      // Create payload that matches backend expectation
      const signupPayload = {
        mobile_number: formData.mobile, // Backend might expect mobile_number
        name: formData.name.trim(),
        email: formData.email.trim(),
        city: formData.city.trim()
      };

      console.log("🚀 Submitting Signup Payload:", signupPayload);

      const response = await fetch("https://backend.corelens.in/api/app/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json"
        },
        body: JSON.stringify(signupPayload)
      });

      const result = await response.json();

      if (response.ok && result.success) {
        const authToken = result.data?.accessToken || result.accessToken || result.token;
        
        localStorage.setItem("userToken", authToken);
        localStorage.setItem("userPhone", formData.mobile);
        localStorage.setItem("userVerified", "true");
        localStorage.setItem("loginTimestamp", Date.now().toString());
        
        const userInfo = {
          name: formData.name,
          email: formData.email,
          mobile_number: formData.mobile,
          city: formData.city,
          lastUpdated: Date.now()
        };
        localStorage.setItem("userInfo", JSON.stringify(userInfo));
        localStorage.setItem("userProfile", JSON.stringify(userInfo));
        
        localStorage.removeItem("pendingSignupMobile");

        Swal.fire({
          icon: 'success',
          title: 'Signup Successful',
          text: 'Welcome to CoreLens!',
          timer: 2000,
          showConfirmButton: false
        });

        setTimeout(() => {
          navigate("/dashboard", { replace: true });
        }, 2000);
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Signup Failed',
          text: result.message || "Failed to complete signup. Please try again."
        });
      }
    } catch (error) {
      console.error("Signup error:", error);
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: "Something went wrong. Please try again later."
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="signin-page">
      <section className="signin-hero-section">
        <div className="signin-inner-container">
          <div className="signin-hero-content">
            <h1 className="signin-title">Complete Your Profile</h1>
            <Breadcrumb />
          </div>
        </div>
      </section>

      <section className="signin-section">
        <div className="signin-inner-container">
          <div className="signin-layout">
            <div className="signin-showcase">
              <div className="showcase-background">
                <div className="showcase-content">
                  <div className="showcase-image">
                    <img
                      src={image("home/login-corelens.jpg")}
                      alt="CoreLens Smart Lock System login banner"
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="signin-form-container">
              <div className="signin-form-wrapper">
                <div className="form-header">
                  <h2 className="form-title">Join CoreLens</h2>
                  <p className="form-subtitle">Please provide your details to continue</p>
                </div>

                <form className="signin-form" onSubmit={handleSubmit}>
                  <div className="form-group">
                    <label className="form-label">Mobile Number</label>
                    <input
                      type="text"
                      className="phone-input"
                      value={formData.mobile}
                      readOnly
                      style={{ backgroundColor: "#f5f5f5", cursor: "not-allowed" }}
                    />
                  </div>

                  <div className="form-group">
                    <label className="form-label">Full Name*</label>
                    <input
                      type="text"
                      className="phone-input"
                      placeholder="Enter your name"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    />
                    {errors.name && <div className="error-message">{errors.name}</div>}
                  </div>

                  <div className="form-group">
                    <label className="form-label">Email Address*</label>
                    <input
                      type="email"
                      className="phone-input"
                      placeholder="Enter your email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    />
                    {errors.email && <div className="error-message">{errors.email}</div>}
                  </div>

                  <div className="form-group">
                    <label className="form-label">City*</label>
                    <input
                      type="text"
                      className="phone-input"
                      placeholder="Enter your city"
                      value={formData.city}
                      onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                    />
                    {errors.city && <div className="error-message">{errors.city}</div>}
                  </div>

                  <button type="submit" className="signin-btn" disabled={loading}>
                    {loading ? "Creating Account..." : "Complete Signup"}
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Signup;