import React from "react";
import { Link } from "react-router-dom";
import "../css/cart.css";

const CheckoutFailure = () => {
  return (
    <div className="checkout-status-page">
      <div className="container">
        <div className="status-card failure-card">
          <div className="status-icon">❌</div>
          <h1>Payment Failed</h1>
          <p>Sorry, your payment could not be processed. Please try again.</p>
          <p className="order-info">
            If the amount was deducted from your account, it will be refunded within 5-7 business days.
          </p>
          <div className="status-actions">
            <Link to="/checkout" className="btn btn-primary">
              Try Again
            </Link>
            <Link to="/view-cart" className="btn btn-secondary">
              View Cart
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutFailure;
