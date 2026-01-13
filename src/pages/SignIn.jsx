import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { sendOTP, verifyOTP } from "../utils/api";
import { image } from "../utils/asset";
import "../css/signin.css";
import Breadcrumb from "../components/Breadcrumb";

const SignIn = () => {
  const navigate = useNavigate();
  const [phoneNumber, setPhoneNumber] = useState("");
  const [otp, setOTP] = useState("");
  const [showOTP, setShowOTP] = useState(false);
  const [loading, setLoading] = useState(false);
  const [phoneError, setPhoneError] = useState("");
  const [otpError, setOtpError] = useState("");

  const handlePhoneSubmit = async (e) => {
    e.preventDefault();
    setPhoneError("");

    if (!phoneNumber || phoneNumber.length !== 10) {
      setPhoneError("Please enter a valid 10-digit mobile number");
      return;
    }

    setLoading(true);
    console.log("SignIn: Requesting OTP for phone number:", phoneNumber);

    try {
      const result = await sendOTP(phoneNumber);
      console.log("SignIn: OTP request result:", result);

      if (result.success) {
        setShowOTP(true);
        setPhoneError("");
        console.log("SignIn: OTP request successful, showing OTP input");
      } else {
        console.error("SignIn: OTP request failed:", result);
        if (result.status === 404) {
          setPhoneError(
            "Backend service is not available. Working in demo mode.",
          );
          setShowOTP(true);
        } else if (result.status === 0) {
          setPhoneError(
            "Network connection failed. Please check your internet and try again.",
          );
        } else {
          setPhoneError(
            result.data?.message ||
              result.error ||
              "Failed to send OTP. Please try again.",
          );
        }
      }
    } catch (error) {
      console.error("SignIn: Error requesting OTP:", error);
      setPhoneError("Backend service unavailable. Working in demo mode.");
      setShowOTP(true);
    } finally {
      setLoading(false);
    }
  };

  const handleOTPSubmit = async (e) => {
    e.preventDefault();
    setOtpError("");
    setLoading(true);

    if (!otp || otp.length < 3) {
      setOtpError("Please enter the complete OTP");
      setLoading(false);
      return;
    }

    console.log("SignIn: Verifying OTP:", otp, "for phone:", phoneNumber);

    try {
      const storedToken = localStorage.getItem("otpToken");
      const result = await verifyOTP(otp, phoneNumber, storedToken);

      console.log("SignIn: OTP verification result:", result);

      // CRITICAL: Check for "User not found" AFTER OTP is verified by the backend
      // result.success will be false, but message will indicate user doesn't exist
      if (
        result &&
        result.data &&
        result.data.message &&
        result.data.message.toLowerCase().includes("user not found")
      ) {
        console.log("🚀 SignIn: OTP Verified, but User not found. Redirecting to Signup...");
        localStorage.setItem("pendingSignupMobile", phoneNumber);
        navigate("/signup", { replace: true });
        return;
      }

      if (result.success && result.data) {
        const responseData = result.data;
        const authToken =
          responseData.data?.accessToken ||
          responseData.accessToken ||
          responseData.token;

        if (!authToken) {
          setOtpError("Please enter the valid OTP");
          setLoading(false);
          return;
        }

        console.log("✅ SignIn: OTP verified successfully with token");

        // Save token to localStorage
        localStorage.setItem("userToken", authToken);
        localStorage.setItem("verificationToken", authToken);
        localStorage.setItem("userPhone", phoneNumber);
        localStorage.setItem("userVerified", "true");
        localStorage.setItem("loginTimestamp", Date.now().toString());

        const loginData = {
          token: authToken,
          verificationToken: authToken,
          phone: phoneNumber,
          isVerified: true,
          timestamp: Date.now(),
        };
        localStorage.setItem("loginData", JSON.stringify(loginData));

        console.log("✅ SignIn: Login state saved successfully");

        // Clear OTP token
        localStorage.removeItem("otpToken");

        // Fetch user profile after successful login
        try {
          console.log(
            "🔄 SignIn: Fetching user profile with GET /api/app/getProfile...",
          );

          const profileResponse = await fetch(
            "https://backend.corelens.in/api/app/getProfile",
            {
              method: "GET",
              headers: {
                Authorization: `Bearer ${authToken}`,
                "Content-Type": "application/json",
                Accept: "application/json",
              },
            },
          );

          const profileResult = await profileResponse.json();
          console.log("Profile API Response Status:", profileResponse.status);

          if (profileResponse.ok) {
            console.log("✅ SignIn: Profile API raw response:", profileResult);

            // Handle both response formats: { data: {...} } or direct {...}
            const profileData = profileResult.data || profileResult;

            if (profileData && profileData.mobile_number) {
              const savedProfile = {
                name: profileData.name || "User",
                email: profileData.email || "",
                mobile_number: profileData.mobile_number || phoneNumber,
                phone: profileData.mobile_number || phoneNumber,
                city: profileData.city || "",
                address: profileData.address || "",
                lastUpdated: Date.now(),
              };

              localStorage.setItem("userInfo", JSON.stringify(savedProfile));
              localStorage.setItem("userProfile", JSON.stringify(savedProfile));

              console.log(
                "✅ SignIn: Profile data saved to localStorage:",
                savedProfile,
              );
            } else {
              console.warn("⚠️ SignIn: Profile data missing mobile_number");
            }
          } else {
            // Check if user not found - redirect to signup
            const errorMessage = (profileResult.message || "").toLowerCase();
            if (profileResponse.status === 404 || errorMessage.includes("not found")) {
              console.log("🚀 SignIn: User not found, redirecting to signup flow...");
              localStorage.setItem("pendingSignupMobile", phoneNumber);
              navigate("/signup", { replace: true });
              return;
            }
            console.warn(
              "⚠️ SignIn: Profile fetch failed with status:",
              profileResponse.status,
            );
          }
        } catch (profileError) {
          console.error(
            "❌ SignIn: Error fetching profile after login:",
            profileError,
          );
        }

        // Dispatch event to notify other components
        window.dispatchEvent(
          new CustomEvent("userLoggedIn", {
            detail: {
              phone: phoneNumber,
              token: authToken,
              verificationToken: authToken,
              isVerified: true,
            },
          }),
        );

        // Navigate to dashboard
        console.log("🔄 SignIn: Navigating to dashboard...");
        setTimeout(() => {
          navigate("/dashboard", { replace: true });
        }, 100);
      } else {
        console.error("SignIn: OTP verification failed:", result);
        setOtpError("Please enter the valid OTP");
      }
    } catch (error) {
      console.error("SignIn: Error verifying OTP:", error);
      setOtpError("Please enter the valid OTP");
    } finally {
      setLoading(false);
    }
  };

  const handleEditPhone = () => {
    setShowOTP(false);
    setOTP("");
    setOtpError("");
  };

  return (
    <div className="signin-page">
      <section className="signin-hero-section">
        <div className="signin-inner-container">
          <div className="signin-hero-content">
            <h1 className="signin-title">
              {showOTP ? "Verify Your Mobile Number" : "Account Access"}
            </h1>
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
                  <h2 className="form-title">
                    {showOTP ? "Verify OTP" : "Sign In to CoreLens"}
                  </h2>
                  <p className="form-subtitle">
                    {showOTP
                      ? "Enter the verification code sent to your mobile"
                      : "Enter your mobile number to continue"}
                  </p>
                </div>

                {!showOTP ? (
                  <form className="signin-form" onSubmit={handlePhoneSubmit}>
                    <div className="form-group">
                      <label htmlFor="mobile-number" className="form-label">
                        Mobile Number*
                      </label>
                      <div className="phone-input-group">
                        <span className="country-code">+91</span>
                        <input
                          type="tel"
                          id="mobile-number"
                          className="phone-input"
                          placeholder="Enter mobile number"
                          value={phoneNumber}
                          onChange={(e) =>
                            setPhoneNumber(
                              e.target.value.replace(/\D/g, "").slice(0, 10),
                            )
                          }
                          maxLength="10"
                          required
                        />
                      </div>
                      {phoneError && (
                        <div className="error-message">{phoneError}</div>
                      )}
                    </div>

                    <button
                      type="submit"
                      className="signin-btn"
                      disabled={loading}
                    >
                      {loading ? "Sending OTP..." : "Send OTP"}
                    </button>

                    <p className="terms-text">
                      By continuing, you agree to CoreLens's Terms of use and
                      Privacy Policy.
                    </p>
                  </form>
                ) : (
                  <form className="signin-form" onSubmit={handleOTPSubmit}>
                    <div className="mobile-display">
                      <span>Mobile: +91 {phoneNumber}</span>
                      <button
                        type="button"
                        className="edit-btn"
                        onClick={handleEditPhone}
                      >
                        Edit
                      </button>
                    </div>

                    <div className="form-group">
                      <label htmlFor="otp" className="form-label">
                        Enter OTP*
                      </label>

                      <input
                        type="text"
                        id="otp"
                        className="otp-input"
                        placeholder="Enter OTP"
                        value={otp}
                        onChange={(e) =>
                          setOTP(e.target.value.replace(/\D/g, "").slice(0, 6))
                        }
                        maxLength="6"
                        required
                      />
                      {otpError && (
                        <div className="error-message">{otpError}</div>
                      )}
                    </div>

                    <button
                      type="submit"
                      className="signin-btn"
                      disabled={loading}
                    >
                      {loading ? "Verifying..." : "Verify & Login"}
                    </button>

                    <div className="resend-section">
                      <p>
                        Didn't receive OTP?
                        <button
                          type="button"
                          className="resend-btn"
                          onClick={() =>
                            handlePhoneSubmit({ preventDefault: () => {} })
                          }
                        >
                          Resend
                        </button>
                      </p>
                    </div>
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default SignIn;
