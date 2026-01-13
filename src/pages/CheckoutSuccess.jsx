import React, { useEffect, useState } from "react";
import { apiCall } from "../utils/api";
import { Link } from "react-router-dom";
import "../css/cart.css";

const CheckoutSuccess = () => {
  const [processingOrder, setProcessingOrder] = useState(false);
  useEffect(() => {
    const processPostOrder = async () => {
      try {
        setProcessingOrder(true);
        // Frontend-only: clear cart and show success (no DB available)
        try {
          localStorage.removeItem("cartItems");
          localStorage.removeItem("cartLastUpdated");
          window.dispatchEvent(new CustomEvent("cartUpdated", { detail: [] }));
        } catch (e) {
          console.warn("CheckoutSuccess: failed to clear cart:", e);
        }
      } catch (error) {
        console.error("CheckoutSuccess: Error posting order:", error);
      } finally {
        setProcessingOrder(false);
      }
    };

    processPostOrder();
  }, []);

  return (
    <div className="checkout-status-page">
      <div className="container">
        <div className="status-card success-card">
          <div className="status-icon">✅</div>
          <h1>Payment Successful!</h1>
          <p>
            Payment successful. Our team will contact you with order details
            shortly.
          </p>
          <p className="order-info">
            You will receive a confirmation from our team soon.
          </p>
          <div className="status-actions">
            <Link to="/dashboard" className="btn btn-primary">
              View Orders
            </Link>
            <Link to="/" className="btn btn-secondary">
              Continue Shopping
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutSuccess;
