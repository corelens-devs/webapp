import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { apiCall } from "../utils/api";
import { getSessionAccessToken } from "../utils/authUtils";
import "../css/cart.css";
import Swal from "sweetalert2";

const Checkout = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [userInfo, setUserInfo] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    city: "",
  });

  useEffect(() => {
    const token = getSessionAccessToken();
    const phone = localStorage.getItem("userPhone");
    const isVerified = localStorage.getItem("userVerified") === "true";

    if (!token || !phone || !isVerified) {
      alert("Please login to proceed with checkout");
      navigate("/sign-in");
      return;
    }

    const savedUserInfo = localStorage.getItem("userInfo");
    if (savedUserInfo) {
      try {
        const parsedInfo = JSON.parse(savedUserInfo);
        setUserInfo({
          name: parsedInfo.name || "",
          email: parsedInfo.email || "",
          phone: parsedInfo.mobile_number || parsedInfo.phone || phone,
          address: parsedInfo.address || "",
          city: parsedInfo.city || "",
        });
      } catch (error) {
        console.error("Error loading user info:", error);
      }
    } else {
      setUserInfo({
        ...userInfo,
        phone: phone,
      });
    }

    const savedCart = localStorage.getItem("cartItems");
    if (savedCart) {
      try {
        const parsedCart = JSON.parse(savedCart);
        setCartItems(Array.isArray(parsedCart) ? parsedCart : []);
      } catch (error) {
        console.error("Error loading cart:", error);
        setCartItems([]);
      }
    }
  }, [navigate]);

  const calculateTotal = () => {
    return cartItems.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserInfo({
      ...userInfo,
      [name]: value,
    });
  };

  const handleCheckout = async (e) => {
    e.preventDefault();

    if (!userInfo.name.trim()) {
      alert("Please enter your name");
      return;
    }

    if (!userInfo.email.trim()) {
      alert("Please enter your email");
      return;
    }

    if (!userInfo.address.trim()) {
      alert("Please enter your address");
      return;
    }

    if (cartItems.length === 0) {
      alert("Your cart is empty");
      return;
    }

    setLoading(true);

    try {
      const token = getSessionAccessToken();
      if (!token) {
        alert("Please login to continue");
        navigate("/sign-in");
        return;
      }

      const products = cartItems.map((item) => ({
        product_id: item.id,
        quantity: item.quantity,
      }));

      const totalAmount = calculateTotal();

      const billingAddressId =
        localStorage.getItem("billingAddressId") || undefined;

      const checkoutPayload = {
        amount: totalAmount,
        products: products,
        convenience_fee: 0,
        delivery_fee: 0,
        net_amount: totalAmount,
        billing_address_id: billingAddressId,
        shipping_address_id: billingAddressId,
        payment_method: "Online",
        tax: 0,
      };

      if (!billingAddressId) {
        alert("Please save a delivery address before proceeding to checkout.");
        setLoading(false);
        return;
      }

      console.log("Checkout payload:", checkoutPayload);

      const response = await apiCall("/api/app/checkout", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(checkoutPayload),
      });

      console.log("Checkout response:", response);

      if (response.success && response.data) {
        const { order, key_id } = response.data;

        if (!order || !order.id || !key_id) {
          throw new Error("Invalid response from checkout API");
        }

        const currentDomain = window.location.origin;
        const successUrl = `${currentDomain}/checkout-success`;
        const failureUrl = `${currentDomain}/checkout-failure`;

        const callbackUrl = `https://backend.corelens.in/api/app/paymentVerification?successUrl=${encodeURIComponent(
          successUrl
        )}&failureUrl=${encodeURIComponent(failureUrl)}`;

        console.log("Launching Razorpay with:", {
          key_id,
          order_id: order.id,
          callback_url: callbackUrl,
        });

        if (!window.Razorpay) {
          const script = document.createElement("script");
          script.src = "https://checkout.razorpay.com/v1/checkout.js";
          script.async = true;
          script.onload = () => {
            openRazorpayCheckout(key_id, order, callbackUrl);
          };
          script.onerror = () => {
            alert("Failed to load Razorpay. Please try again.");
            setLoading(false);
          };
          document.body.appendChild(script);
        } else {
          openRazorpayCheckout(key_id, order, callbackUrl);
        }
      } else {
        throw new Error(response.error || "Checkout failed");
      }
    } catch (error) {
      console.error("Checkout error:", error);
      alert("Checkout failed: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  const openRazorpayCheckout = (key_id, order, callbackUrl) => {
    const options = {
      key: key_id,
      amount: order.amount,
      currency: order.currency || "INR",
      name: "Corelens",
      description: "Order Payment",
      order_id: order.id,
      prefill: {
        name: userInfo.name,
        email: userInfo.email,
        contact: userInfo.phone,
      },
      theme: {
        color: "#3399cc",
      },
      handler: async function (response) {
        console.log("Payment successful:", response);

        try {
          const token = getSessionAccessToken();

          const verifyResponse = await fetch(
            "https://backend.corelens.in/api/app/paymentVerification",
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
                Authorization: token ? `Bearer ${token}` : "",
              },
              body: JSON.stringify({
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_order_id: response.razorpay_order_id,
                razorpay_signature: response.razorpay_signature,
              }),
            }
          );

          const verifyData = await verifyResponse.json();

          if (verifyData.success) {
            // Payment verified - frontend-only flow
            try {
              localStorage.removeItem("cartItems");
              localStorage.removeItem("cartLastUpdated");
              window.dispatchEvent(
                new CustomEvent("cartUpdated", { detail: [] })
              );
              await Swal.fire({
                title: "Payment successful",
                text: "Payment successful. Our team will contact you.",
                icon: "success",
                timer: 2500,
                showConfirmButton: false,
              });
              window.location.href =
                window.location.origin + "/checkout-success";
            } catch (e) {
              console.error("Post-payment UI error:", e);
            }
          } else {
            console.error("Payment verification failed:", verifyData);
            await Swal.fire({
              icon: "error",
              title: "Payment Failed",
              text: verifyData?.message || "Payment verification failed",
            });
            window.location.href =
              window.location.origin + "/checkout-failure";
          }
        } catch (error) {
          console.error("Payment verification error:", error);
          window.location.href = window.location.origin + "/checkout-failure";
        }
      },
      modal: {
        ondismiss: function () {
          console.log("Payment cancelled by user");
          setLoading(false);
        },
      },
    };

    const rzp = new window.Razorpay(options);
    rzp.open();
  };

  return (
    <div className="checkout-page">
      <div className="container">
        <h1 className="checkout-title">Checkout</h1>

        <div className="checkout-layout">
          <div className="checkout-form-section">
            <h2>Billing Information</h2>
            <form onSubmit={handleCheckout} className="checkout-form">
              <div className="form-group">
                <label htmlFor="name">Full Name *</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={userInfo.name}
                  onChange={handleInputChange}
                  placeholder="Enter your full name"
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="email">Email Address *</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={userInfo.email}
                  onChange={handleInputChange}
                  placeholder="Enter your email"
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="phone">Phone Number *</label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={userInfo.phone}
                  onChange={handleInputChange}
                  placeholder="Enter your phone number"
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="address">Address *</label>
                <textarea
                  id="address"
                  name="address"
                  value={userInfo.address}
                  onChange={handleInputChange}
                  placeholder="Enter your complete address"
                  rows="3"
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="city">City *</label>
                <input
                  type="text"
                  id="city"
                  name="city"
                  value={userInfo.city}
                  onChange={handleInputChange}
                  placeholder="Enter your city"
                  required
                />
              </div>

              <button type="submit" className="checkout-btn" disabled={loading}>
                {loading ? "Processing..." : "Proceed to Payment"}
              </button>
            </form>
          </div>

          <div className="checkout-summary-section">
            <h2>Order Summary</h2>
            <div className="order-summary">
              {cartItems.length === 0 ? (
                <p className="empty-cart-message">Your cart is empty</p>
              ) : (
                <>
                  <div className="order-items">
                    {cartItems.map((item, index) => (
                      <div key={index} className="order-item">
                        <div className="item-details">
                          <p className="item-name">{item.name}</p>
                          <p className="item-quantity">Qty: {item.quantity}</p>
                        </div>
                        <div className="item-price">
                          ₹{(item.price * item.quantity).toFixed(2)}
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="order-totals">
                    <div className="total-row">
                      <span>Subtotal:</span>
                      <span>₹{calculateTotal().toFixed(2)}</span>
                    </div>
                    <div className="total-row">
                      <span>Delivery Fee:</span>
                      <span>₹0.00</span>
                    </div>
                    <div className="total-row">
                      <span>Tax:</span>
                      <span>₹0.00</span>
                    </div>
                    <div className="total-row total-final">
                      <span>Total:</span>
                      <span>₹{calculateTotal().toFixed(2)}</span>
                    </div>
                  </div>
                </>
              )}
            </div>

            <div className="payment-info">
              <h3>Payment Method</h3>
              <p>Razorpay Secure Payment (Test Mode)</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
