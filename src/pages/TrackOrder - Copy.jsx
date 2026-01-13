import React, { useState } from "react";
import "../css/trackorder.css";
import Breadcrumb from "../components/Breadcrumb";

const TrackOrder = () => {
  const [orderId, setOrderId] = useState("");
  const [tracking, setTracking] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleTrackOrder = (e) => {
    e.preventDefault();
    if (orderId) {
      setLoading(true);
      // Simulate API call
      setTimeout(() => {
        setTracking({
          orderId: orderId,
          trackingId: "23453839",
          expectedArrival: "01/05/2024",
          status: "out-for-delivery",
          steps: [
            {
              id: "order-placed",
              title: "Order Placed",
              icon: "📋",
              completed: true,
              date: "28 Jan 2025",
            },
            {
              id: "processing",
              title: "Processing",
              icon: "⚙️",
              completed: true,
              date: "28 Jan 2025",
            },
            {
              id: "packed",
              title: "Packed",
              icon: "📦",
              completed: true,
              date: "29 Jan 2025",
            },
            {
              id: "out-for-delivery",
              title: "Out for Delivery",
              icon: "🚚",
              completed: true,
              date: "30 Jan 2025",
            },
            {
              id: "delivered",
              title: "Delivered",
              icon: "✅",
              completed: false,
              date: "Pending",
            },
          ],
        });
        setLoading(false);
      }, 1500);
    }
  };

  return (
    <div className="track-order-page">
      {/* Hero Section */}
      <section className="track-order-hero">
        <div className="track-order-container">
          <h1 className="track-order-title">Order Tracking</h1>
          <Breadcrumb />
        </div>
      </section>

      {/* Main Content */}
      <section className="track-order-content">
        <div className="track-order-container">
          {!tracking ? (
            <div className="track-order-form-wrapper">
              <form onSubmit={handleTrackOrder} className="track-order-form">
                <div className="track-order-form-group">
                  <label htmlFor="orderId" className="track-order-label">
                    Order ID:
                  </label>
                  <input
                    type="text"
                    id="orderId"
                    value={orderId}
                    onChange={(e) => setOrderId(e.target.value.toUpperCase())}
                    placeholder="Enter your order ID (e.g., CLI23466)"
                    className="track-order-input"
                    required
                  />
                </div>
                <button
                  type="submit"
                  className="track-order-btn"
                  disabled={loading}
                >
                  {loading ? "Tracking..." : "Track Order"}
                </button>
              </form>
            </div>
          ) : (
            <div className="track-order-result">
              {/* Order Info Header */}
              <div className="track-order-info-header">
                <div className="track-order-info-item">
                  <div className="track-order-info-icon">📋</div>
                  <div className="track-order-info-content">
                    <span className="track-order-info-label">Order ID:</span>
                    <span className="track-order-info-value track-order-highlight">
                      #{tracking.orderId}
                    </span>
                  </div>
                </div>

                <div className="track-order-info-item">
                  <span className="track-order-info-label">
                    Expected Arrival
                  </span>
                  <span className="track-order-info-badge">
                    {tracking.expectedArrival}
                  </span>
                </div>

                <div className="track-order-info-item">
                  <span className="track-order-info-label">Tracking ID</span>
                  <span className="track-order-info-badge track-order-tracking-id">
                    {tracking.trackingId}
                  </span>
                </div>
              </div>

              {/* Progress Timeline */}
              <div className="track-order-timeline">
                <div className="track-order-progress-line">
                  {tracking.steps.map((step, index) => (
                    <div
                      key={step.id}
                      className="track-order-progress-line-segment"
                    >
                      {index < tracking.steps.length - 1 && (
                        <div
                          className={`track-order-line ${
                            step.completed &&
                            tracking.steps[index + 1].completed
                              ? "track-order-line-completed"
                              : ""
                          }`}
                        />
                      )}
                    </div>
                  ))}
                </div>

                <div className="track-order-steps">
                  {tracking.steps.map((step) => (
                    <div
                      key={step.id}
                      className={`track-order-step ${
                        step.completed
                          ? "track-order-step-completed"
                          : "track-order-step-pending"
                      }`}
                    >
                      <div className="track-order-step-circle">
                        {step.completed ? (
                          <div className="track-order-step-check">✓</div>
                        ) : (
                          <div className="track-order-step-pending-icon">✓</div>
                        )}
                      </div>

                      <div className="track-order-step-content">
                        <div className="track-order-step-icon-wrapper">
                          <div className="track-order-step-icon">
                            {step.icon}
                          </div>
                          <div className="track-order-step-info">
                            <h4 className="track-order-step-title">
                              {step.title}
                            </h4>
                            <p className="track-order-step-date">{step.date}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Track Another Order Button */}
              <div className="track-order-actions">
                <button
                  className="track-order-new-btn"
                  onClick={() => {
                    setTracking(null);
                    setOrderId("");
                  }}
                >
                  Track Another Order
                </button>
              </div>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default TrackOrder;
