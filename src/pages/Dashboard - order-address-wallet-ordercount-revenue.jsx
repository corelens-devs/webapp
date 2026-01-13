import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../css/dashboard.css";
import { apiCall, saveAddress } from "../utils/api";
import StorageUtils from "../utils/storage";
import { getSessionAccessToken } from "../utils/authUtils";

// Purchase History Component
const PurchaseHistoryContent = ({ orders: propOrders }) => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [expandedOrders, setExpandedOrders] = useState(new Set());

  useEffect(() => {
    // Handle paginated response from API
    if (propOrders?.docs) {
      setOrders(propOrders.docs);
    } else if (Array.isArray(propOrders)) {
      setOrders(propOrders);
    } else {
      setOrders([]);
    }
    setLoading(false);
  }, [propOrders]);

  const toggleOrderExpansion = (orderId) => {
    const newExpanded = new Set(expandedOrders);
    if (newExpanded.has(orderId)) {
      newExpanded.delete(orderId);
    } else {
      newExpanded.add(orderId);
    }
    setExpandedOrders(newExpanded);
  };

  if (loading) {
    return (
      <div className="loading-state">
        <div className="loading-spinner">🔄</div>
        <p>Loading your purchase history...</p>
      </div>
    );
  }

  // ✅ Corrected condition & data mapping
  if (!orders || !Array.isArray(orders) || orders.length === 0) {
    return (
      <div className="empty-state">
        <div className="empty-icon">📦</div>
        <h3>No Purchase History</h3>
        <p>You haven't made any purchases yet.</p>
        <div style={{ marginTop: "20px" }}>
          <Link
            to="/"
            className="dashboard-shop-btn"
            style={{ marginRight: "10px" }}
          >
            Start Shopping
          </Link>
        </div>
      </div>
    );
  }

  // ✅ Normalize data (API returns docs[])
  const normalizedOrders = Array.isArray(orders?.docs) ? orders.docs : orders;

  return (
    <div className="purchase-history-container">
      <div className="purchase-history-table-wrapper">
        <table className="purchase-history-table">
          <thead>
            <tr>
              <th>Order ID</th>
              <th>Date</th>
              <th>Items</th>
              <th>Amount</th>
              <th>Status</th>
              <th>Payment</th>
            </tr>
          </thead>
          <tbody>
            {normalizedOrders.map((order, index) => {
              if (!order) return null;

              const orderId = order._id || `order-${index}`;
              const createdDate = new Date(
                order.createdAtTime || order.createdAt || Date.now()
              );

              // Get product info
              const product =
                order.orderproducts || order.products?.product_id || {};

              // Get quantity and amount from products object
              const quantity = order.products?.quantity || 1;
              const totalAmount = order.products?.amount || 0;
              const status =
                order.current_status || order.status || "Order Placed";
              const paymentId =
                order.payment_id || order.razorpay_payment_id || "";
              const productName =
                product?.name || order.name || "Unnamed Product";
              const productImg = product?.photo?.[0]?.name
                ? `https://backend.corelens.in/static/${product.photo[0].name}`
                : null;

              return (
                <React.Fragment key={orderId}>
                  <tr>
                    <td>#{order.order_no || orderId.slice(-6)}</td>
                    <td>{createdDate.toLocaleDateString("en-IN")}</td>
                    <td>
                      <div className="product-info">
                        {productImg && (
                          <img
                            src={productImg}
                            alt={productName}
                            style={{
                              width: 50,
                              height: 50,
                              borderRadius: 8,
                              marginRight: 10,
                            }}
                          />
                        )}
                        <span>{productName}</span>
                      </div>
                    </td>
                    <td>₹{Number(totalAmount).toFixed(2)}</td>
                    <td>
                      <button className="btn-details">{status}</button>
                    </td>
                    <td>{paymentId ? "Paid" : "Pending"}</td>
                  </tr>
                </React.Fragment>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};
// Surveillance History Component
const SurveillanceHistoryContent = () => {
  const [surveillances, setSurveillances] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchSurveillanceHistory();
  }, []);

  const fetchSurveillanceHistory = async () => {
    try {
      setLoading(true);
      setError(null);

      const currentUserToken =
        getSessionAccessToken() || StorageUtils.getCurrentToken();

      if (!currentUserToken) {
        setSurveillances([]);
        setLoading(false);
        return;
      }

      const response = await apiCall("/api/app/surveillances", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${currentUserToken}`,
        },
      });

      if (response.success && response.data) {
        const surveillanceData = Array.isArray(response.data)
          ? response.data
          : [];
        setSurveillances(surveillanceData);
      } else {
        setSurveillances([]);
      }
    } catch (err) {
      setError("Failed to load surveillance history. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="loading-state">
        <div className="loading-spinner">🔄</div>
        <p>Loading surveillance history...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="error-state">
        <div className="error-icon">❌</div>
        <h3>Error Loading Surveillance History</h3>
        <p>{error}</p>
        <button onClick={fetchSurveillanceHistory} className="retry-btn">
          Try Again
        </button>
      </div>
    );
  }

  if (!surveillances || surveillances.length === 0) {
    return (
      <div className="empty-state">
        <div className="empty-icon">📹</div>
        <h3>No Surveillance Data</h3>
        <p>No surveillance history available.</p>
        <button
          onClick={fetchSurveillanceHistory}
          className="retry-btn"
          style={{ marginTop: "15px" }}
        >
          Refresh Data
        </button>
      </div>
    );
  }

  return (
    <div className="surveillance-history-container">
      <div className="surveillance-history-table-wrapper">
        <table className="purchase-history-table">
          <thead>
            <tr>
              <th>Camera Name</th>
              <th>Start Time</th>
              <th>End Time</th>
              <th>Duration</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {surveillances.map((record, index) => (
              <tr key={index} className="order-row">
                <td>{record.camera_name || "Unknown Camera"}</td>
                <td>
                  {record.start_time
                    ? new Date(record.start_time).toLocaleString("en-IN")
                    : "N/A"}
                </td>
                <td>
                  {record.end_time
                    ? new Date(record.end_time).toLocaleString("en-IN")
                    : "Ongoing"}
                </td>
                <td>
                  {record.start_time && record.end_time
                    ? `${Math.round(
                        (new Date(record.end_time) -
                          new Date(record.start_time)) /
                          60000
                      )} min`
                    : "N/A"}
                </td>
                <td>
                  <span
                    className={`status-badge status-${(
                      record.status || "active"
                    ).toLowerCase()}`}
                  >
                    {record.status || "Active"}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

const Dashboard = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("edit-profile");
  const [userInfo, setUserInfo] = useState({
    id: "",
    name: "",
    phone: "",
    mobile_number: "",
    email: "",
    city: "",
    address: "",
    wallet: 0,
  });
  const [isEditing, setIsEditing] = useState(false);
  const [editForm, setEditForm] = useState({
    name: "",
    email: "",
    mobile_number: "",
    city: "",
    address: "",
  });
  const [feedbackForm, setFeedbackForm] = useState({ feedback: "" });
  const [feedbackSuccess, setFeedbackSuccess] = useState("");
  const [feedbackError, setFeedbackError] = useState("");

  const [statsData, setStatsData] = useState({
    wallet: 0,
    totalOrders: 0,
    totalRevenue: 0,
  });

  const [ordersList, setOrdersList] = useState([]);
  const [addressData, setAddressData] = useState([]);
  const [loadingDashboard, setLoadingDashboard] = useState(true);

  // Function to fetch wallet balance
  const fetchWalletBalance = async (token) => {
    try {
      const response = await fetch(
        "https://backend.corelens.in/api/app/wallet-balance",
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      const result = await response.json();
      console.log("Wallet Balance Response:", result);

      if (response.ok && result.data) {
        const balance = parseFloat(result.data.balance || 0);
        setStatsData((prev) => ({ ...prev, wallet: balance }));
        setUserInfo((prev) => ({ ...prev, wallet: balance }));
      }
    } catch (error) {
      console.error("Error fetching wallet balance:", error);
    }
  };

  useEffect(() => {
    const currentToken = localStorage.getItem("userToken");
    const userPhone = localStorage.getItem("userPhone");
    const isVerified = localStorage.getItem("userVerified") === "true";
    const loginTimestamp = localStorage.getItem("loginTimestamp");

    if (!currentToken || !userPhone || !isVerified || !loginTimestamp) {
      navigate("/sign-in", { replace: true });
      return;
    }
    console.log("currentToken: " + currentToken);

    const tokenAge = Date.now() - parseInt(loginTimestamp);
    const maxAge = 24 * 60 * 60 * 1000;

    if (tokenAge > maxAge) {
      localStorage.removeItem("userToken");
      localStorage.removeItem("userPhone");
      localStorage.removeItem("userVerified");
      localStorage.removeItem("loginTimestamp");
      localStorage.removeItem("loginData");
      localStorage.removeItem("userInfo");
      navigate("/sign-in", { replace: true });
      return;
    }

    // Fetch both profile and wallet balance
    Promise.all([autoFetchProfile(), fetchWalletBalance(currentToken)]);
  }, [navigate]);

  const autoFetchProfile = async () => {
    try {
      setLoadingDashboard(true);

      const token = localStorage.getItem("userToken");
      const userPhone = localStorage.getItem("userPhone");

      if (!token || !userPhone) {
        console.warn("Missing token or phone - redirecting to sign-in");
        navigate("/sign-in", { replace: true });
        return;
      }

      const headers = {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      };

      // Fetch profile, orders and address in parallel
      const [profileRes, ordersRes, addressRes] = await Promise.all([
        fetch("https://backend.corelens.in/api/app/getProfile", {
          method: "GET",
          headers,
        }),
        fetch("https://backend.corelens.in/api/app/orders", {
          method: "GET",
          headers,
        }),
        fetch("https://backend.corelens.in/api/app/address?limit=50", {
          method: "GET",
          headers,
        }),
      ]);
      // Parse all responses
      const [profileJson, ordersJson, addressJson] = await Promise.all([
        profileRes.json().catch(() => ({})),
        ordersRes.json().catch(() => ({})),
        addressRes.json().catch(() => ({})),
      ]);

      // ✅ Add clear logging
      if (addressJson?.data?.docs) {
        console.log("📬 All addresses fetched:", addressJson.data.docs);
      }

      // ✅ Extract address safely
      /*  const addresses =
        Array.isArray(addressJson?.data) && addressJson.data.length > 0
          ? addressJson.data
          : Array.isArray(addressJson)
          ? addressJson
          : []; 



      console.log("✅ Final Parsed Addresses:", addresses);

      const activeAddress =
        addresses.find((a) => a.defaultAddress) || addresses[0] || {};

      setAddressData(addresses); */
      // ✅ Safely extract addresses from backend response
      let addresses = [];

      if (Array.isArray(addressJson?.data?.docs)) {
        addresses = addressJson.data.docs; // backend returns docs[]
      } else if (Array.isArray(addressJson?.data)) {
        addresses = addressJson.data;
      } else if (Array.isArray(addressJson)) {
        addresses = addressJson;
      }

      // ✅ Choose address: default if exists, else last
      let activeAddress =
        addresses.find((a) => a.defaultAddress === true) ||
        addresses[addresses.length - 1] ||
        {};

      console.log("✅ Parsed Addresses:", addresses);
      console.log("🏠 Active Address:", activeAddress);

      setAddressData(addresses);

      // Additional logging for debugging
      console.log("Fetched Address Data:", addresses);
      console.log("Active Address:", activeAddress);
      console.log("Raw Address Response Shape:", Object.keys(addressJson));

      console.log("📦 Orders API Response:", ordersJson);
      console.log("👤 Profile API Response:", {
        status: profileRes.status,
        data: profileJson,
      });

      if (!profileRes.ok) {
        console.warn("Profile API returned error status:", profileRes.status);
      }

      // Fetch wallet balance
      const walletResponse = await fetch(
        "https://backend.corelens.in/api/app/wallet-balance",
        {
          method: "GET",
          headers,
        }
      );
      const walletJson = await walletResponse.json();
      console.log("💰 Wallet Balance Response:", walletJson);

      // Extract wallet balance
      let walletBalance = 0;
      if (walletJson.success && walletJson.data) {
        if (typeof walletJson.data === "number") {
          walletBalance = walletJson.data;
        } else if (walletJson.data.balance) {
          walletBalance = parseFloat(walletJson.data.balance);
        } else if (walletJson.data.walletBalance) {
          walletBalance = parseFloat(walletJson.data.walletBalance);
        }
      }
      console.log("💰 Extracted Wallet Balance:", walletBalance);

      // --- Extract profile data robustly ---
      let profileData = {};

      // common response shapes:
      // { data: {...} } or { data: { user: {...} } } or { profile: {...} } or { user: {...} } or root object
      if (profileJson && profileJson.data) {
        // some APIs return data directly or data.user / data.profile
        if (profileJson.data.profile) profileData = profileJson.data.profile;
        else if (profileJson.data.user) profileData = profileJson.data.user;
        else if (Array.isArray(profileJson.data) && profileJson.data.length > 0)
          profileData = profileJson.data[0];
        else profileData = profileJson.data;
      } else if (profileJson.profile) {
        profileData = profileJson.profile;
      } else if (profileJson.user) {
        profileData = profileJson.user;
      } else {
        profileData = profileJson || {};
      }

      // --- Extract orders robustly ---
      let ordersData = [];
      if (ordersJson) {
        // First try to get docs array from paginated response
        if (Array.isArray(ordersJson.data?.docs)) {
          ordersData = ordersJson.data.docs;
        }
        // Then try other possible response formats
        else if (Array.isArray(ordersJson.data?.orders)) {
          ordersData = ordersJson.data.orders;
        } else if (Array.isArray(ordersJson.data)) {
          ordersData = ordersJson.data;
        } else if (Array.isArray(ordersJson.orders)) {
          ordersData = ordersJson.orders;
        } else if (Array.isArray(ordersJson)) {
          ordersData = ordersJson;
        }
      }

      console.log("📦 Extracted Orders:", ordersData);

      // calculate stats
      const totalOrders = ordersData.filter(
        (order) => order && (order._id || order.order_no)
      ).length;
      console.log("🔢 Total Orders Count:", totalOrders);

      const totalRevenue = ordersData.reduce((sum, order) => {
        if (!order) return sum;
        const amount = parseFloat(
          order.total_amount || order.amount || order.products?.amount || 0
        );
        return isNaN(amount) ? sum : sum + amount;
      }, 0);

      // map profile fields with fallbacks
      const updatedUserInfo = {
        id: profileData.id || profileData._id || profileData.user_id || "",
        name: profileData.name || profileData.full_name || "",
        phone:
          profileData.phone ||
          profileData.mobile_number ||
          profileData.contact ||
          userPhone,
        mobile_number:
          profileData.mobile_number || profileData.phone || userPhone,
        email: profileData.email || profileData.email_address || "",
        // Map address and city from activeAddress first, then fallback to profile data
        address: activeAddress.address || "",
        city: activeAddress.city || profileData.city || "Gurgaon",
        // Use the wallet balance from API
        wallet: walletBalance,
      };

      // update state
      setUserInfo(updatedUserInfo);
      setEditForm({
        name: updatedUserInfo.name || "",
        email: updatedUserInfo.email || "",
        mobile_number:
          updatedUserInfo.mobile_number || updatedUserInfo.phone || "",
        city: updatedUserInfo.city || "",
        address: updatedUserInfo.address || "",
      });

      setStatsData({
        wallet: parseFloat(updatedUserInfo.wallet || 0).toFixed(2),
        totalOrders: totalOrders || 0, // Ensure we always have a number
        totalRevenue: parseFloat(totalRevenue || 0).toFixed(2),
      });

      // Log stats for debugging
      console.log("📊 Dashboard Stats:", {
        wallet: parseFloat(updatedUserInfo.wallet || 0).toFixed(2),
        totalOrders,
        totalRevenue: parseFloat(totalRevenue || 0).toFixed(2),
      });

      // Extract orders from the nested response structure
      const orders = ordersJson?.data?.docs || [];
      setOrdersList(orders);
      console.log("Setting orders list:", orders);
      localStorage.setItem("userInfo", JSON.stringify(updatedUserInfo));
    } catch (err) {
      console.error("Error in autoFetchProfile:", err);
      console.log("🏠 Address API Response Data:", addressJson);
      // set a visible error inside userInfo so UI can show friendly message
      setUserInfo((prev) => ({
        ...prev,
        error: "Could not load profile data.",
      }));
    } finally {
      setLoadingDashboard(false);
    }
  };

  const handleTabClick = (tabName) => {
    setActiveTab(tabName);
    setIsEditing(false);
  };

  const handleEditProfile = () => {
    // Populate editForm with current userInfo
    setEditForm({
      name: userInfo.name || "",
      email: userInfo.email || "",
      city: userInfo.city || "",
      address: userInfo.address || "",
    });

    setIsEditing(true);
  };

  const handleSaveProfile = async () => {
    // Validate required fields
    if (!editForm.name.trim()) {
      alert("Name is required");
      return;
    }

    if (!editForm.email.trim()) {
      alert("Email is required");
      return;
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(editForm.email.trim())) {
      alert("Please enter a valid email address");
      return;
    }

    // Validate address is not empty
    if (!editForm.address || !editForm.address.trim()) {
      alert("Address is required");
      return;
    }

    try {
      const currentToken = localStorage.getItem("userToken");
      const userPhone = localStorage.getItem("userPhone");

      if (!currentToken) {
        alert("❌ No authentication token found. Please login again.");
        return;
      }
      console.log("token:" + currentToken);
      // Prepare profile payload
      const profilePayload = {
        name: editForm.name.trim(),
        email: editForm.email.trim(),
        city: editForm.city.trim() || "Gurgaon",
      };

      // Prepare address payload with proper defaults
      const addressPayload = {
        address: editForm.address.trim(),
        pincode: "122009", // Fixed pincode for now
        type: "home", // lowercase type
        defaultAddress: true,
        city: editForm.city.trim() || "Delhi",
        state: "Delhi",
        country: "India",
      };

      console.log("Sending profile update payload:", profilePayload);
      console.log("Sending address update payload:", addressPayload);

      // Set up headers with proper authorization
      const headers = {
        Authorization: `Bearer ${currentToken}`,
        "Content-Type": "application/json",
      };

      // Get the current default address if it exists
      let addressToUpdate =
        addressData.find((a) => a.defaultAddress === true) || addressData[0];

      console.log("Current Address Data:", addressData);
      console.log("Found Address to Update:", addressToUpdate);
      // Always create a new address (no PUT call)
      const method = "POST";
      const url = "https://backend.corelens.in/api/app/address";

      console.log(
        `Using ${method} method to ${
          addressToUpdate ? "update" : "create"
        } address at: ${url}`
      );

      // Update profile and create/update address in parallel
      const [profileResponse, addressResponse] = await Promise.all([
        // Update basic profile info
        fetch("https://backend.corelens.in/api/app/change-basic", {
          method: "PUT",
          headers,
          body: JSON.stringify(profilePayload),
        }),

        // Create or update address
        fetch(url, {
          method,
          headers,
          body: JSON.stringify(addressPayload),
        }),
      ]);
      console.log("Sending Address Update:", "");
      console.log("Method:", method);
      console.log("URL:", url);
      console.log("Payload:", addressPayload);
      const [profileResult, addressResult] = await Promise.all([
        profileResponse.json(),
        addressResponse.json(),
      ]);

      // Log responses for debugging
      console.log("✅ Profile Save Response:", profileResult);
      console.log("✅ Address Save Response:", addressResult);

      // Check if we have any specific error messages
      const profileError = !profileResponse.ok ? profileResult.message : null;
      const addressError = !addressResponse.ok ? addressResult.message : null;

      if (profileError || addressError) {
        console.error("Update errors:", { profileError, addressError });
        const errorMessage = profileError || addressError;
        alert(`❌ Update failed: ${errorMessage}`);
        return;
      }

      // Check for success in either response
      const profileSuccess =
        profileResponse.ok &&
        (profileResult.success === true ||
          profileResult.status === "success" ||
          /updated|success/i.test(profileResult.message || ""));

      const addressSuccess =
        addressResponse.ok &&
        (addressResult.success === true ||
          addressResult.status === "success" ||
          /created|updated|success/i.test(addressResult.message || ""));

      if (profileSuccess && addressSuccess) {
        // Update local state
        const savedData = {
          ...userInfo,
          ...profilePayload,
          address: addressPayload.address,
          city: addressPayload.city,
        };

        setUserInfo(savedData);
        localStorage.setItem("userInfo", JSON.stringify(savedData));

        console.log("Profile and address updated successfully:", savedData);

        // Refresh data from server
        await new Promise((r) => setTimeout(r, 1000));
        await autoFetchProfile();

        alert("✅ Profile and address updated successfully!");
        setIsEditing(false);
      } else {
        console.log("❌ Debug failed responses:", {
          profileResult,
          addressResult,
        });
        const message = (
          profileResult.message ||
          addressResult.message ||
          "Failed to update profile"
        ).replace(/^error:\s*/i, "");
        alert(`❌ Failed to update: ${message}`);
      }
    } catch (error) {
      console.error("Profile save error:", error);
      alert(
        "⚠️ Error saving profile: " +
          (error.message || "Unknown error occurred")
      );
    }
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
    setEditForm({
      name: userInfo.name || "",
      email: userInfo.email || "",
      mobile_number: userInfo.phone || "",
      city: userInfo.city || "",
      address: userInfo.address || "",
    });
  };

  const handleLogout = () => {
    const preservedCartItems = localStorage.getItem("cartItems");
    const preservedCartUpdated = localStorage.getItem("cartLastUpdated");

    const keysToRemove = [
      "userToken",
      "verificationToken",
      "userPhone",
      "userVerified",
      "loginTimestamp",
      "loginData",
      "sessionData",
      "userInfo",
      "userProfile",
      "sessionArrayData",
      "otpToken",
      "viewCartData",
    ];

    keysToRemove.forEach((key) => localStorage.removeItem(key));

    if (
      preservedCartItems &&
      preservedCartItems !== "null" &&
      preservedCartItems !== "undefined"
    ) {
      localStorage.setItem("cartItems", preservedCartItems);
      if (preservedCartUpdated) {
        localStorage.setItem("cartLastUpdated", preservedCartUpdated);
      }
    }

    window.dispatchEvent(new CustomEvent("userLoggedOut"));

    navigate("/sign-in", { replace: true });
  };

  const handleFeedbackChange = (e) => {
    setFeedbackForm({ feedback: e.target.value });
    if (feedbackSuccess) setFeedbackSuccess("");
    if (feedbackError) setFeedbackError("");
  };

  const handleFeedbackSubmit = async (e) => {
    e.preventDefault();

    if (!feedbackForm.feedback.trim()) {
      setFeedbackError("Please enter your feedback before submitting.");
      return;
    }

    try {
      const userToken = localStorage.getItem("userToken");

      const response = await fetch(
        "https://backend.corelens.in/api/app/feedback",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            Authorization: userToken ? `Bearer ${userToken}` : "",
          },
          body: JSON.stringify({
            feedback: feedbackForm.feedback,
          }),
        }
      );

      const result = await response.json();

      if (response.ok) {
        setFeedbackSuccess(
          "Thank you for your feedback! We appreciate your input."
        );
        setFeedbackForm({ feedback: "" });

        setTimeout(() => {
          setFeedbackSuccess("");
        }, 5000);
      } else {
        setFeedbackError(
          result.message || "Failed to submit feedback. Please try again."
        );
      }
    } catch (error) {
      setFeedbackError(
        "Network error. Please check your connection and try again."
      );
    }
  };

  const renderContent = () => {
    if (loadingDashboard) {
      return (
        <div className="loading-state">
          <div className="loading-spinner">🔄</div>
          <p>Loading dashboard...</p>
        </div>
      );
    }

    switch (activeTab) {
      case "edit-profile":
        return (
          <div className="dashboard-content-section">
            <div className="dashboard-content-header">
              <h2>Edit Profile</h2>
              <p>Manage your account information</p>
            </div>

            <div
              className="profile-stats-cards"
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
                gap: "2rem",
                marginBottom: "3rem",
              }}
            >
              <div
                className="stat-card"
                style={{
                  background: "#e8f5e9",
                  borderRadius: "12px",
                  padding: "2rem",
                  border: "1px solid #c8e6c9",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "1.5rem",
                  }}
                >
                  <div
                    style={{
                      background: "#4caf50",
                      borderRadius: "50%",
                      width: "50px",
                      height: "50px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: "2rem",
                    }}
                  >
                    💰
                  </div>
                  <div>
                    <div
                      style={{
                        fontSize: "1.4rem",
                        color: "#666",
                        fontWeight: "500",
                      }}
                    >
                      Wallet
                    </div>
                    <div
                      style={{
                        fontSize: "2rem",
                        color: "#2c3e50",
                        fontWeight: "700",
                        marginTop: "0.5rem",
                      }}
                    >
                      ₹{statsData.wallet}
                    </div>
                  </div>
                </div>
              </div>

              <div
                className="stat-card"
                style={{
                  background: "#fff3e0",
                  borderRadius: "12px",
                  padding: "2rem",
                  border: "1px solid #ffe0b2",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "1.5rem",
                  }}
                >
                  <div
                    style={{
                      background: "#ff9800",
                      borderRadius: "50%",
                      width: "50px",
                      height: "50px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: "2rem",
                    }}
                  >
                    🛒
                  </div>
                  <div>
                    <div
                      style={{
                        fontSize: "1.4rem",
                        color: "#666",
                        fontWeight: "500",
                      }}
                    >
                      Total Orders
                    </div>
                    <div
                      style={{
                        fontSize: "2rem",
                        color: "#2c3e50",
                        fontWeight: "700",
                        marginTop: "0.5rem",
                      }}
                    >
                      {statsData.totalOrders}
                    </div>
                  </div>
                </div>
              </div>

              <div
                className="stat-card"
                style={{
                  background: "#e3f2fd",
                  borderRadius: "12px",
                  padding: "2rem",
                  border: "1px solid #bbdefb",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "1.5rem",
                  }}
                >
                  <div
                    style={{
                      background: "#2196f3",
                      borderRadius: "50%",
                      width: "50px",
                      height: "50px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: "2rem",
                    }}
                  >
                    💵
                  </div>
                  <div>
                    <div
                      style={{
                        fontSize: "1.4rem",
                        color: "#666",
                        fontWeight: "500",
                      }}
                    >
                      Total Revenue
                    </div>
                    <div
                      style={{
                        fontSize: "2rem",
                        color: "#2c3e50",
                        fontWeight: "700",
                        marginTop: "0.5rem",
                      }}
                    >
                      ₹{statsData.totalRevenue}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="profile-card">
              <div className="profile-avatar">
                <div className="avatar-circle">
                  {userInfo.name ? userInfo.name.charAt(0) : "U"}
                </div>
              </div>

              {!isEditing ? (
                <div className="profile-info">
                  <div className="info-group">
                    <label>Full Name</label>
                    <div className="info-value">
                      {loadingDashboard
                        ? "Loading..."
                        : userInfo.name || "Not provided"}
                    </div>
                  </div>

                  <div className="info-group">
                    <label>Mobile Number</label>
                    <div className="info-value">
                      {loadingDashboard
                        ? "Loading..."
                        : userInfo.phone || userInfo.mobile_number
                        ? (() => {
                            const phoneNumber = (
                              userInfo.phone ||
                              userInfo.mobile_number ||
                              ""
                            ).toString();
                            return phoneNumber.startsWith("+91")
                              ? phoneNumber
                              : phoneNumber
                              ? `+91${phoneNumber}`
                              : "";
                          })()
                        : "Not provided"}
                    </div>
                  </div>

                  <div className="info-group">
                    <label>Email Address</label>
                    <div className="info-value">
                      {loadingDashboard
                        ? "Loading..."
                        : userInfo.email || "Not provided"}
                    </div>
                  </div>

                  <div className="info-group">
                    <label>City</label>
                    <div className="info-value">
                      {loadingDashboard
                        ? "Loading..."
                        : userInfo.city || "Not provided"}
                    </div>
                  </div>

                  <div className="info-group">
                    <label>Address</label>
                    <div className="info-value">
                      {loadingDashboard
                        ? "Loading..."
                        : userInfo.address || "Not provided"}
                    </div>
                  </div>
                </div>
              ) : (
                <div className="profile-edit-form">
                  <div className="form-group">
                    <label>Full Name*</label>
                    <input
                      type="text"
                      className="dashboard-input"
                      value={editForm.name}
                      onChange={(e) =>
                        setEditForm({ ...editForm, name: e.target.value })
                      }
                      placeholder="Enter your full name"
                      required
                    />
                  </div>

                  <div className="form-group">
                    <label>Mobile Number</label>
                    <input
                      type="text"
                      className="dashboard-input disabled"
                      value={
                        editForm.mobile_number
                          ? editForm.mobile_number.toString().startsWith("+91")
                            ? editForm.mobile_number
                            : `+91${editForm.mobile_number}`
                          : ""
                      }
                      readOnly
                      disabled
                    />
                  </div>

                  <div className="form-group">
                    <label>Email Address*</label>
                    <input
                      type="email"
                      className="dashboard-input"
                      value={editForm.email}
                      onChange={(e) =>
                        setEditForm({ ...editForm, email: e.target.value })
                      }
                      placeholder="Enter your email"
                      required
                    />
                  </div>

                  <div className="form-group">
                    <label>City</label>
                    <input
                      type="text"
                      className="dashboard-input"
                      value={editForm.city}
                      onChange={(e) =>
                        setEditForm({ ...editForm, city: e.target.value })
                      }
                      placeholder="Enter your city"
                    />
                  </div>

                  <div className="form-group">
                    <label>Address</label>
                    <textarea
                      className="dashboard-input"
                      value={editForm.address || ""}
                      onChange={(e) =>
                        setEditForm({ ...editForm, address: e.target.value })
                      }
                      placeholder="Enter your complete address"
                      rows="3"
                      style={{ resize: "vertical", minHeight: "80px" }}
                    />
                  </div>

                  <div className="profile-button-container">
                    <button
                      className="profile-action-btn save-btn"
                      onClick={handleSaveProfile}
                    >
                      💾 Save Changes
                    </button>
                    <button
                      className="profile-action-btn cancel-btn"
                      onClick={handleCancelEdit}
                    >
                      ❌ Cancel
                    </button>
                  </div>
                </div>
              )}

              <div className="profile-buttons">
                <button
                  className="dashboard-edit-btn"
                  onClick={handleEditProfile}
                >
                  📝 Edit Profile
                </button>
              </div>

              {/* Debug section */}
              <div
                style={{
                  marginTop: "20px",
                  padding: "10px",
                  background: "#f5f5f5",
                  borderRadius: "4px",
                  fontSize: "12px",
                  color: "#666",
                }}
              >
                <p style={{ margin: "0 0 5px 0" }}>🔍 Debug Info:</p>
                <pre style={{ margin: 0, whiteSpace: "pre-wrap" }}>
                  {JSON.stringify(
                    {
                      loading: loadingDashboard,
                      profile: userInfo,
                      orders: ordersList?.length || 0,
                    },
                    null,
                    2
                  )}
                </pre>
              </div>
            </div>
          </div>
        );

      case "purchase-history":
        return (
          <div className="dashboard-content-section">
            <div className="dashboard-content-header">
              <h2>Purchase History</h2>
              <p>View your order history and track purchases</p>
            </div>
            <PurchaseHistoryContent orders={ordersList} />
          </div>
        );

      case "surveillance-history":
        return (
          <div className="dashboard-content-section">
            <div className="dashboard-content-header">
              <h2>Surveillance History</h2>
              <p>Monitor your security system activity</p>
            </div>
            <SurveillanceHistoryContent />
          </div>
        );

      case "help":
        return (
          <div className="dashboard-content-section">
            <div className="dashboard-content-header">
              <h2>Help & Support</h2>
              <p>Get assistance with your account and products</p>
            </div>
            <div className="help-section">
              <div className="help-card">
                <h3>📞 Contact Support</h3>
                <p>Call us at 1800-313-4207 for immediate assistance</p>
              </div>
              <div className="help-card">
                <h3>📧 Email Support</h3>
                <p>Send us an email at connect@corelens.in</p>
              </div>
              <div className="help-card">
                <h3>💬 WhatsApp Support</h3>
                <p>
                  <a
                    href="https://wa.me/919211819260"
                    className="ContactWhatsup"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    9211819260
                  </a>
                </p>
                <p>Send us a message for instant support</p>
              </div>
            </div>
          </div>
        );

      case "feedback":
        return (
          <div className="dashboard-content-section">
            <div className="dashboard-content-header">
              <h2>Feedback</h2>
              <p>Share your thoughts and suggestions</p>
            </div>
            <form className="feedback-form" onSubmit={handleFeedbackSubmit}>
              <textarea
                placeholder="Share your feedback here..."
                className="dashboard-textarea"
                rows="6"
                value={feedbackForm.feedback}
                onChange={handleFeedbackChange}
                required
              ></textarea>
              <button type="submit" className="dashboard-submit-btn">
                Submit Feedback
              </button>

              {feedbackSuccess && (
                <div className="demo-success-message">{feedbackSuccess}</div>
              )}

              {feedbackError && (
                <div
                  className="error-text"
                  style={{
                    fontSize: "1.4rem",
                    marginTop: "1rem",
                    padding: "1rem",
                    background: "#f8d7da",
                    border: "1px solid #f5c6cb",
                    borderRadius: "8px",
                    textAlign: "center",
                  }}
                >
                  {feedbackError}
                </div>
              )}
            </form>
          </div>
        );

      default:
        return null;
    }
  };

  // Show error state if profile failed to load
  if (!loadingDashboard && !userInfo.name && userInfo.error) {
    return (
      <div className="dashboard-page">
        <div
          className="error-state"
          style={{ padding: "2rem", textAlign: "center" }}
        >
          <p style={{ fontSize: "1.2rem", marginBottom: "1rem" }}>
            ⚠️ {userInfo.error}
          </p>
          <button
            onClick={autoFetchProfile}
            style={{
              padding: "0.5rem 1rem",
              background: "#007bff",
              color: "white",
              border: "none",
              borderRadius: "4px",
              cursor: "pointer",
            }}
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="dashboard-page">
      <div className="dashboard-container">
        <div className="dashboard-sidebar">
          <div className="dashboard-profile-section">
            <div className="dashboard-user-avatar">
              {userInfo.name ? userInfo.name.charAt(0).toUpperCase() : "?"}
            </div>
            <div className="dashboard-user-info">
              <h3>{userInfo.name || "Loading..."}</h3>
              <p>{userInfo.phone || userInfo.mobile_number || ""}</p>
            </div>
          </div>

          <nav className="dashboard-nav">
            <ul className="dashboard-nav-list">
              <li>
                <button
                  className={`dashboard-nav-item ${
                    activeTab === "edit-profile" ? "active" : ""
                  }`}
                  onClick={() => handleTabClick("edit-profile")}
                >
                  <span className="dashboard-nav-icon">
                    <img
                      src="./images/icons/edit-info.png"
                      alt="edit profile"
                    />
                  </span>
                  <span className="dashboard-nav-text">Edit Profile</span>
                </button>
              </li>

              <li>
                <button
                  className={`dashboard-nav-item ${
                    activeTab === "purchase-history" ? "active" : ""
                  }`}
                  onClick={() => handleTabClick("purchase-history")}
                >
                  <span className="dashboard-nav-icon">
                    <img
                      src="./images/icons/edit-info.png"
                      alt="purchase history"
                    />
                  </span>
                  <span className="dashboard-nav-text">Purchase History</span>
                </button>
              </li>

              <li>
                <button
                  className={`dashboard-nav-item ${
                    activeTab === "surveillance-history" ? "active" : ""
                  }`}
                  onClick={() => handleTabClick("surveillance-history")}
                >
                  <span className="dashboard-nav-icon">
                    <img src="./images/icons/refresh.png" alt="surveillance" />
                  </span>
                  <span className="dashboard-nav-text">
                    Surveillance History
                  </span>
                </button>
              </li>

              <li>
                <button
                  className={`dashboard-nav-item ${
                    activeTab === "help" ? "active" : ""
                  }`}
                  onClick={() => handleTabClick("help")}
                >
                  <span className="dashboard-nav-icon">
                    <img src="./images/icons/help.png" alt="help" />
                  </span>
                  <span className="dashboard-nav-text">Help</span>
                </button>
              </li>

              <li>
                <button
                  className={`dashboard-nav-item ${
                    activeTab === "feedback" ? "active" : ""
                  }`}
                  onClick={() => handleTabClick("feedback")}
                >
                  <span className="dashboard-nav-icon">
                    <img src="./images/icons/feedback.png" alt="feedback" />
                  </span>
                  <span className="dashboard-nav-text">Feedback</span>
                </button>
              </li>

              <li>
                <button
                  className="dashboard-nav-item logout-item"
                  onClick={handleLogout}
                >
                  <span className="dashboard-nav-icon">⏭</span>
                  <span className="dashboard-nav-text">Logout</span>
                </button>
              </li>
            </ul>
          </nav>
        </div>

        <div className="dashboard-main-content">{renderContent()}</div>
      </div>
    </div>
  );
};

export default Dashboard;
