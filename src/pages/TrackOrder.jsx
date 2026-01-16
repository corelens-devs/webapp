import React, { useState } from "react";
import "../css/trackorder.css";
import Breadcrumb from "../components/Breadcrumb";

const TrackOrder = () => {
  const [orderId, setOrderId] = useState("");
  const [tracking, setTracking] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleTrackOrder = async (e) => {
    e.preventDefault();
    if (!orderId) return;

    setLoading(true);
    try {
      const token = localStorage.getItem("userToken");

      console.log("🔍 TrackOrder: Searching for order:", orderId);

      // Fetch all orders from /api/app/orders
      const response = await fetch(
        "https://backend.corelens.in/api/app/orders",
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        },
      );

      const result = await response.json();
      console.log("🎯 All Orders API Response received:", result);
      console.log("🎯 Response Status:", response.status, response.ok);

      // Extract orders list - handle multiple response formats
      let allOrders = [];

      if (Array.isArray(result.data?.docs)) {
        allOrders = result.data.docs;
        console.log("✅ Found orders in result.data.docs");
      } else if (Array.isArray(result.data?.orders)) {
        allOrders = result.data.orders;
        console.log("✅ Found orders in result.data.orders");
      } else if (Array.isArray(result.data)) {
        allOrders = result.data;
        console.log("✅ Found orders in result.data");
      } else if (Array.isArray(result.orders)) {
        allOrders = result.orders;
        console.log("✅ Found orders in result.orders");
      } else if (Array.isArray(result)) {
        allOrders = result;
        console.log("✅ Result is directly an array of orders");
      }

      console.log("📊 Total orders fetched:", allOrders.length);

      // Find matching order by order_no or _id
      const order = allOrders.find((o) => {
        const orderNo = (o.order_no || "").toString().toUpperCase();
        const orderId_normalized = orderId.toUpperCase();
        return orderNo === orderId_normalized || o._id === orderId;
      });

      console.log("🔍 Order search result:", {
        found: !!order,
        searchedFor: orderId,
      });

      if (order) {
        console.log("✅ Order found! Details:", order);

        // Normalize backend status - multiple field options
        const currentStatus = (
          order.current_status ||
          order.status ||
          order.orderStatus ||
          "order-placed"
        )
          .toLowerCase()
          .replace(/\s+/g, "-");

        console.log("📦 Current order status:", currentStatus);

        // Step structure (UI timeline) - stages based on status
        const steps = [
          {
            id: "order-placed",
            title: "Order Placed",
            icon: "📋",
            date: new Date(
              order.createdAtTime || order.createdAt || Date.now(),
            ).toLocaleDateString("en-IN"),
          },
          {
            id: "processing",
            title: "Processing",
            icon: "⚙️",
            date: order.processing_date
              ? new Date(order.processing_date).toLocaleDateString("en-IN")
              : "Pending",
          },
          {
            id: "packed",
            title: "Packed",
            icon: "📦",
            date: order.packed_date
              ? new Date(order.packed_date).toLocaleDateString("en-IN")
              : "Pending",
          },
          {
            id: "out-for-delivery",
            title: "Out for Delivery",
            icon: "🚚",
            date: order.delivery_date
              ? new Date(order.delivery_date).toLocaleDateString("en-IN")
              : "Pending",
          },
          {
            id: "delivered",
            title: "Delivered",
            icon: "✅",
            date: order.delivered_date
              ? new Date(order.delivered_date).toLocaleDateString("en-IN")
              : "Pending",
          },
        ];

        setTracking({
          orderId: order.order_no || order._id || orderId,
          expectedArrival:
            order.expected_delivery || order.delivery_date || "Pending",
          status: currentStatus, // highlight from backend
          steps,
        });
        console.log("✅ Order tracking data set successfully");
      } else {
        setTracking(null);
        console.warn("❌ Order not found in list:", {
          searchedFor: orderId,
          totalOrdersChecked: allOrders.length,
          orderNosInList: allOrders.map((o) => o.order_no),
        });
        alert(
          "We couldn't find this order. Please log in to your profile to track your order details",
        );
      }
    } catch (error) {
      console.error("❌ Error fetching orders:", error);
      setTracking(null);
      alert("Error: " + error.message);
    } finally {
      setLoading(false);
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
                    placeholder="Enter your order ID (e.g., 3456)"
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
                      {tracking.orderId}
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
                  {tracking.steps.map((step) => {
                    const isActive = step.id === tracking.status; // current backend status
                    const isBefore =
                      tracking.steps.findIndex((s) => s.id === step.id) <
                      tracking.steps.findIndex((s) => s.id === tracking.status);

                    return (
                      <div
                        key={step.id}
                        className={`track-order-step ${
                          isActive
                            ? "track-order-step-active"
                            : isBefore
                              ? "track-order-step-done"
                              : "track-order-step-offwhite"
                        }`}
                      >
                        <div className="track-order-step-circle">
                          {isActive ? (
                            <div className="track-order-step-check">✓</div>
                          ) : (
                            <div className="track-order-step-pending-icon">
                              ✓
                            </div>
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
                              <p className="track-order-step-date">
                                {step.date}
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
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
