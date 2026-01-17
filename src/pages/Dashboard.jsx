import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import "../css/dashboard.css";
import { apiCall, saveAddress } from "../utils/api";
import StorageUtils from "../utils/storage";
import { getSessionAccessToken } from "../utils/authUtils";

// Indian States and Cities Mapping (27 States + 8 Union Territories = 36)
const STATES_AND_CITIES = {
  // States (27)
  "Andhra Pradesh": [
    "Visakhapatnam",
    "Vijayawada",
    "Nellore",
    "Tirupati",
    "Chittoor",
  ],
  "Arunachal Pradesh": ["Itanagar", "Guwahati", "Tezu"],
  Assam: ["Guwahati", "Silchar", "Dibrugarh", "Nagaon"],
  Bihar: ["Patna", "Gaya", "Muzaffarpur", "Bihar Sharif"],
  Chhattisgarh: ["Raipur", "Bilaspur", "Durg", "Rajnandgaon"],
  Goa: ["Panaji", "Margao", "Vasco da Gama"],
  Gujarat: ["Ahmedabad", "Surat", "Vadodara", "Rajkot", "Jamnagar"],
  Haryana: ["Faridabad", "Gurgaon", "Hisar", "Rohtak", "Yamunanagar"],
  "Himachal Pradesh": ["Shimla", "Solan", "Mandi", "Kangra"],
  Jharkhand: ["Ranchi", "Dhanbad", "Giridih", "Bokaro"],
  Karnataka: ["Bangalore", "Mysore", "Mangalore", "Belgaum", "Hubli"],
  Kerala: ["Kochi", "Thiruvananthapuram", "Kozhikode", "Thrissur"],
  "Madhya Pradesh": ["Bhopal", "Indore", "Jabalpur", "Gwalior", "Ujjain"],
  Maharashtra: ["Mumbai", "Pune", "Nagpur", "Nashik", "Aurangabad"],
  Manipur: ["Imphal", "Thoubal"],
  Meghalaya: ["Shillong", "Tura"],
  Mizoram: ["Aizawl", "Lunglei"],
  Nagaland: ["Kohima", "Dimapur"],
  Odisha: ["Bhubaneswar", "Cuttack", "Sambalpur", "Rourkela"],
  Punjab: ["Chandigarh", "Amritsar", "Jalandhar", "Ludhiana"],
  Rajasthan: ["Jaipur", "Jodhpur", "Udaipur", "Ajmer", "Bikaner"],
  Sikkim: ["Gangtok", "Pelling"],
  "Tamil Nadu": ["Chennai", "Coimbatore", "Madurai", "Salem", "Tiruppur"],
  Telangana: ["Hyderabad", "Warangal", "Nizamabad"],
  Tripura: ["Agartala", "Udaipur"],
  "Uttar Pradesh": ["Lucknow", "Kanpur", "Varanasi", "Meerut", "Agra"],
  Uttarakhand: ["Dehradun", "Nainital", "Garhwal"],
  "West Bengal": ["Kolkata", "Darjeeling", "Asansol", "Siliguri"],
  // Union Territories (8)
  "Andaman and Nicobar Islands": ["Port Blair", "Havelock", "Neil Island"],
  Chandigarh: ["Chandigarh", "Mohali", "Panchkula"],
  "Dadra and Nagar Haveli and Daman and Diu": ["Silvassa", "Daman", "Diu"],
  Delhi: ["New Delhi", "Delhi", "Noida", "Gurgaon"],
  "Jammu and Kashmir": ["Srinagar", "Jammu", "Leh", "Anantnag"],
  Ladakh: ["Leh", "Kargil"],
  Lakshadweep: ["Kavaratti", "Agatti"],
  Puducherry: ["Puducherry", "Yanam", "Karaikal", "Mahe"],
};

// Purchase History Component with Advanced Filters & Pagination
const PurchaseHistoryContent = ({ orders: propOrders }) => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [paymentFilter, setPaymentFilter] = useState("all");
  const [sortBy, setSortBy] = useState("date-desc");
  const [currentPage, setCurrentPage] = useState(1);
  const ITEMS_PER_PAGE = 6;

  useEffect(() => {
    if (propOrders?.docs) {
      setOrders(propOrders.docs);
    } else if (Array.isArray(propOrders)) {
      setOrders(propOrders);
    } else {
      setOrders([]);
    }
    setLoading(false);
  }, [propOrders]);

  // Reset to page 1 when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery, statusFilter, paymentFilter, sortBy]);

  const normalizedOrders = Array.isArray(orders?.docs) ? orders.docs : orders;

  // Filter and sort orders
  const filteredOrders = normalizedOrders
    .filter((order) => {
      if (!order) return false;
      const productName = (order.name || "").toLowerCase();
      const orderId = (order.order_no || "").toString().toLowerCase();
      const query = searchQuery.toLowerCase();
      const matchesSearch =
        productName.includes(query) || orderId.includes(query);

      const status = order.current_status || order.status || "Order Placed";
      const matchesStatus = statusFilter === "all" || status === statusFilter;

      const paymentId = order.payment_id || order.razorpay_payment_id || "";
      const isPaid = !!paymentId && paymentId !== "cod";
      const isCOD =
        order.payment_method?.toLowerCase() === "cod" ||
        order.payment_mode?.toLowerCase() === "cod" ||
        order.payment_type?.toLowerCase() === "cod" ||
        order.method?.toLowerCase() === "cod" ||
        order.orderproducts?.payment_method?.toLowerCase() === "cod";

      const matchesPayment =
        paymentFilter === "all" ||
        (paymentFilter === "paid" && isPaid) ||
        (paymentFilter === "pending" && (isCOD || !isPaid));

      return matchesSearch && matchesStatus && matchesPayment;
    })
    .sort((a, b) => {
      const dateA = new Date(a.createdAtTime || a.createdAt || 0);
      const dateB = new Date(b.createdAtTime || b.createdAt || 0);
      const amountA = a.products?.amount || 0;
      const amountB = b.products?.amount || 0;

      switch (sortBy) {
        case "date-desc":
          return dateB - dateA;
        case "date-asc":
          return dateA - dateB;
        case "amount-desc":
          return amountB - amountA;
        case "amount-asc":
          return amountA - amountB;
        default:
          return dateB - dateA;
      }
    });

  if (loading) {
    return (
      <div className="loading-state">
        <div className="loading-spinner">🔄</div>
        <p>Loading your purchase history...</p>
      </div>
    );
  }

  if (
    !normalizedOrders ||
    !Array.isArray(normalizedOrders) ||
    normalizedOrders.length === 0
  ) {
    return (
      <div className="empty-state">
        <div className="empty-icon">📦</div>
        <h3>No Purchase History</h3>
        <p>You haven't made any purchases yet.</p>
        <div style={{ marginTop: "20px" }}>
          <Link to="/" className="dashboard-shop-btn">
            Start Shopping
          </Link>
        </div>
      </div>
    );
  }

  // Pagination calculation
  const totalPages = Math.ceil(filteredOrders.length / ITEMS_PER_PAGE);
  const startIdx = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIdx = startIdx + ITEMS_PER_PAGE;
  const paginatedOrders = filteredOrders.slice(startIdx, endIdx);

  return (
    <div className="purchase-history-container">
      {/* Filter Section */}
      <div className="data-table-filters">
        <div className="filter-row">
          <div className="search-box">
            <input
              type="text"
              placeholder="Search by Order ID or Product..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="search-input"
            />
            <span className="search-icon">🔍</span>
          </div>
        </div>

        <div className="filter-controls">
          <div className="filter-group">
            <label>Status:</label>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="filter-select"
            >
              <option value="all">All Status</option>
              <option value="Order Placed">Order Placed</option>
              <option value="Shipped">Shipped</option>
              <option value="Delivered">Delivered</option>
              <option value="Cancelled">Cancelled</option>
            </select>
          </div>

          <div className="filter-group">
            <label>Payment:</label>
            <select
              value={paymentFilter}
              onChange={(e) => setPaymentFilter(e.target.value)}
              className="filter-select"
            >
              <option value="all">All Payments</option>
              <option value="paid">Paid</option>
              <option value="pending">Pending</option>
            </select>
          </div>

          <div className="filter-group">
            <label>Sort By:</label>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="filter-select"
            >
              <option value="date-desc">Latest First</option>
              <option value="date-asc">Oldest First</option>
              <option value="amount-desc">High to Low</option>
              <option value="amount-asc">Low to High</option>
            </select>
          </div>
        </div>
      </div>

      {/* Results Count */}
      <div className="results-summary">
        Showing {startIdx + 1}-{Math.min(endIdx, filteredOrders.length)} of{" "}
        {filteredOrders.length} orders (Page {currentPage} of {totalPages})
      </div>

      {/* Data Table */}
      <div className="data-table-responsive">
        <table className="data-table">
          <thead>
            <tr>
              <th>Order ID</th>
              <th>Date</th>
              <th>Product</th>
              <th>Amount</th>
              <th>Status</th>
              <th>Invoice</th>
            </tr>
          </thead>
          <tbody>
            {paginatedOrders.length > 0 ? (
              paginatedOrders.map((order, index) => {
                if (!order) return null;
                const orderId = order._id || `order-${index}`;
                const createdDate = new Date(
                  order.createdAtTime || order.createdAt || Date.now(),
                );
                const product =
                  order.orderproducts || order.products?.product_id || {};
                const totalAmount = order.products?.amount || 0;
                const status =
                  order.current_status || order.status || "Order Placed";
                const paymentId =
                  order.payment_id || order.razorpay_payment_id || "";

                // Debug log to see actual order structure
                console.log("DEBUG Order:", {
                  id: order.order_no,
                  method: order.payment_method,
                  mode: order.payment_mode,
                  type: order.payment_type,
                  raw_method: order.method,
                  paymentId,
                });

                const productName =
                  product?.name || order.name || "Unnamed Product";
                const productImg = product?.photo?.[0]?.name
                  ? `https://backend.corelens.in/static/${product.photo[0].name}`
                  : null;
                const isPaid =
                  !!paymentId && String(paymentId).toLowerCase() !== "cod";
                const isCOD =
                  String(order.payment_method || "").toLowerCase() === "cod" ||
                  String(order.payment_mode || "").toLowerCase() === "cod" ||
                  String(order.payment_type || "").toLowerCase() === "cod" ||
                  String(order.method || "").toLowerCase() === "cod" ||
                  String(
                    order.orderproducts?.payment_method || "",
                  ).toLowerCase() === "cod" ||
                  String(paymentId || "").toLowerCase() === "cod";
                
                // Dynamic method directly from API fields
                const displayMethod = order.payment_method || order.payment_mode || order.payment_type || order.method || (paymentId ? "Online" : "COD");

                const displayPaymentStatus = isPaid
                  ? "✓ Paid"
                  : isCOD
                    ? "⏳ Pending (COD)"
                    : "⏳ Pending";

                const handleDownloadInvoice = async (id) => {
                  try {
                    const token = localStorage.getItem("userToken");
                    if (!token) throw new Error("Authentication required");

                    const response = await fetch(
                      `https://backend.corelens.in/api/app/generate-invoice/${id}`,
                      {
                        headers: {
                          Authorization: `Bearer ${token}`,
                        },
                      },
                    );

                    if (!response.ok)
                      throw new Error("Failed to generate invoice");

                    const blob = await response.blob();
                    const url = window.URL.createObjectURL(blob);
                    const a = document.createElement("a");
                    a.href = url;
                    a.download = `invoice-${id}.pdf`;
                    document.body.appendChild(a);
                    a.click();
                    window.URL.revokeObjectURL(url);
                    document.body.removeChild(a);
                  } catch (error) {
                    console.error("Invoice error:", error);
                    Swal.fire("Error", "Could not download invoice", "error");
                  }
                };

                return (
                  <tr key={orderId} className="data-row">
                    <td className="col-order-id" data-label="Order ID">
                      #{order.order_no || orderId.slice(-6)}
                    </td>
                    <td className="col-date" data-label="Date">
                      {createdDate.toLocaleDateString("en-IN")}
                    </td>
                    <td className="col-product" data-label="Product">
                      <div className="product-cell">
                        {productImg && (
                          <img
                            src={productImg}
                            alt={productName}
                            className="product-img"
                          />
                        )}
                        <span className="product-name">{productName}</span>
                      </div>
                    </td>
                    <td className="col-amount" data-label="Amount">
                      ₹{Number(totalAmount).toFixed(2)}
                    </td>
                    <td className="col-status" data-label="Status">
                      <span
                        className={`status-badge status-${status.toLowerCase().replace(" ", "-")}`}
                      >
                        {status}
                      </span>
                    </td>
                    <td className="col-invoice" data-label="Invoice">
                      <button
                        onClick={() => handleDownloadInvoice(order._id)}
                        className="invoice-btn"
                        style={{
                          padding: "5px 10px",
                          background: "#007bff",
                          color: "white",
                          border: "none",
                          borderRadius: "4px",
                          cursor: "pointer",
                        }}
                      >
                        📄 Download
                      </button>
                    </td>
                  </tr>
                );
              })
            ) : (
              <tr>
                <td colSpan="5" className="no-results">
                  No orders match your filters
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination Controls */}
      {totalPages > 1 && (
        <div className="pagination-section">
          <div className="pagination-info">
            Page {currentPage} of {totalPages} • {filteredOrders.length} total
            orders
          </div>
          <div className="pagination-controls">
            <button
              onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
              disabled={currentPage === 1}
              className="pagination-btn"
            >
              ← Previous
            </button>
            <div className="page-numbers">
              {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                (pageNum) => (
                  <button
                    key={pageNum}
                    onClick={() => setCurrentPage(pageNum)}
                    className={`page-number-btn ${currentPage === pageNum ? "active" : ""}`}
                  >
                    {pageNum}
                  </button>
                ),
              )}
            </div>
            <button
              onClick={() =>
                setCurrentPage(Math.min(totalPages, currentPage + 1))
              }
              disabled={currentPage === totalPages}
              className="pagination-btn"
            >
              Next →
            </button>
          </div>
        </div>
      )}
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
                          60000,
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
    state: "",
    city: "",
    address: "",
    wallet: 0,
  });
  const [isEditing, setIsEditing] = useState(false);
  const [editForm, setEditForm] = useState({
    name: "",
    email: "",
    mobile_number: "",
    state: "",
    city: "",
    address: "",
  });

  const handleUpdateProfile = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("userToken");
    setLoadingDashboard(true);
    try {
      const headers = {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      };

      // Prepare payloads (excluding pincode)
      const profilePayload = {
        name: editForm.name.trim(),
        email: editForm.email.trim(),
        city: editForm.city.trim() || "Delhi",
      };

      const addressPayload = {
        address: editForm.address.trim(),
        pincode: "110001",
        type: "home",
        defaultAddress: true,
        city: editForm.city.trim() || "Delhi",
        state: editForm.state || "Delhi",
        country: "India",
      };

      console.log("📤 Dashboard: Sending profile update:", profilePayload);
      console.log("📤 Dashboard: Sending address update:", addressPayload);

      // Update both profile and address in parallel
      const [profileResponse, addressResponse] = await Promise.all([
        fetch("https://backend.corelens.in/api/app/change-basic", {
          method: "PUT",
          headers,
          body: JSON.stringify(profilePayload),
        }),
        fetch("https://backend.corelens.in/api/app/address", {
          method: "POST",
          headers,
          body: JSON.stringify(addressPayload),
        }),
      ]);

      const [profileResult, addressResult] = await Promise.all([
        profileResponse.json().catch(() => ({})),
        addressResponse.json().catch(() => ({})),
      ]);

      if (profileResponse.ok && addressResponse.ok) {
        // Update local state
        const updatedInfo = {
          ...userInfo,
          name: editForm.name.trim(),
          email: editForm.email.trim(),
          address: editForm.address.trim(),
          city: editForm.city.trim(),
          state: editForm.state,
        };
        setUserInfo(updatedInfo);
        localStorage.setItem("userInfo", JSON.stringify(updatedInfo));
        setIsEditing(false);

        // Success message
        Swal.fire({
          icon: "success",
          title: "Profile Updated",
          text: "Your profile and address have been updated successfully.",
          timer: 2000,
          showConfirmButton: false,
        });

        // Refresh profile data from server to ensure sync
        setTimeout(() => autoFetchProfile(), 500);
        return; // Exit function after success
      }

      // If we reach here, one or both failed
      const errorMsg = (
        profileResult.message ||
        addressResult.message ||
        "Failed to update profile"
      ).replace(/^error:\s*/i, "");
      throw new Error(errorMsg);
    } catch (error) {
      console.error("Update profile error:", error);
      Swal.fire("Error", error.message || "Failed to update profile", "error");
    } finally {
      setLoadingDashboard(false);
    }
  };
  const [availableCities, setAvailableCities] = useState([]);
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
  const [activeAddressId, setActiveAddressId] = useState(null);
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
        },
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

      // ✅ Safely extract addresses from backend response (trust backend as source of truth)
      let addresses = [];

      if (Array.isArray(addressJson?.data?.docs)) {
        addresses = addressJson.data.docs;
      } else if (Array.isArray(addressJson?.data)) {
        addresses = addressJson.data;
      } else if (Array.isArray(addressJson)) {
        addresses = addressJson;
      }

      // ✅ ALWAYS show the LAST UPDATED address (no default/fallback logic)
      let activeAddress = {};
      if (addresses && addresses.length > 0) {
        // Sort by LAST UPDATED timestamp - MOST RECENTLY UPDATED FIRST
        // Priority: updatedAt > createdAt
        const sortedByLastUpdated = addresses.slice().sort((a, b) => {
          // Get last update time: prefer updatedAt, fall back to createdAt
          const timeA = a.updatedAt
            ? new Date(a.updatedAt).getTime()
            : a.createdAt
              ? new Date(a.createdAt).getTime()
              : 0;
          const timeB = b.updatedAt
            ? new Date(b.updatedAt).getTime()
            : b.createdAt
              ? new Date(b.createdAt).getTime()
              : 0;
          return timeB - timeA; // Most recently updated first
        });

        // Select the LAST UPDATED address (first in sorted list)
        activeAddress = sortedByLastUpdated[0] || {};
        setActiveAddressId(activeAddress._id || null);
      }

      setAddressData(addresses);

      if (!profileRes.ok) {
        console.warn("Profile API returned error status:", profileRes.status);
      }

      // Fetch wallet balance
      const walletResponse = await fetch(
        "https://backend.corelens.in/api/app/wallet-balance",
        {
          method: "GET",
          headers,
        },
      );
      const walletJson = await walletResponse.json();

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
        (order) => order && (order._id || order.order_no),
      ).length;
      console.log("🔢 Total Orders Count:", totalOrders);

      const totalRevenue = ordersData.reduce((sum, order) => {
        if (!order) return sum;
        const amount = parseFloat(
          order.total_amount || order.amount || order.products?.amount || 0,
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
        // ✅ Address from latest API address ONLY (never from profileData which may be default)
        state: activeAddress.state || "",
        address: activeAddress.address || "",
        city: activeAddress.city || "",
        // Use the wallet balance from API
        wallet: walletBalance,
      };

      // update state
      setUserInfo(updatedUserInfo);
      setEditForm({
        name: updatedUserInfo.name || "",
        email: updatedUserInfo.email || "",
        mobile_number:
          updatedUserInfo.mobile_number ||
          updatedUserInfo.phone ||
          userPhone ||
          "",
        state: updatedUserInfo.state || "",
        city: updatedUserInfo.city || "",
        address: updatedUserInfo.address || "",
      });

      // Set available cities based on state from API
      if (updatedUserInfo.state && STATES_AND_CITIES[updatedUserInfo.state]) {
        setAvailableCities(STATES_AND_CITIES[updatedUserInfo.state]);
      }

      setStatsData({
        wallet: parseFloat(updatedUserInfo.wallet || 0).toFixed(2),
        totalOrders: totalOrders || 0, // Ensure we always have a number
        totalRevenue: parseFloat(totalRevenue || 0).toFixed(2),
      });

      // Extract orders from the nested response structure
      const orders = ordersJson?.data?.docs || [];
      setOrdersList(orders);
      localStorage.setItem("userInfo", JSON.stringify(updatedUserInfo));
    } catch (err) {
      console.error("Error in autoFetchProfile:", err);
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
      mobile_number:
        userInfo.mobile_number ||
        userInfo.phone ||
        localStorage.getItem("userPhone") ||
        "",
      state: userInfo.state || "",
      city: userInfo.city || "",
      address: userInfo.address || "",
    });

    // Set available cities based on current state
    if (userInfo.state && STATES_AND_CITIES[userInfo.state]) {
      setAvailableCities(STATES_AND_CITIES[userInfo.state]);
    }

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

    if (!editForm.state.trim()) {
      alert("State is required");
      return;
    }

    if (!editForm.city.trim()) {
      alert("City is required");
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
      // Prepare profile payload (includes city for profile)
      const profilePayload = {
        name: editForm.name.trim(),
        email: editForm.email.trim(),
        city: editForm.city.trim() || "Gurgaon",
      };

      // Prepare address payload with all required fields (syncs to admin)
      const addressPayload = {
        address: editForm.address.trim(),
        pincode: "110001",
        type: "home",
        defaultAddress: true,
        city: editForm.city.trim() || "",
        state: editForm.state.trim() || "",
        country: "India",
      };

      console.log("Sending profile update payload:", profilePayload);
      console.log("Sending address update payload:", addressPayload);

      // Set up headers with proper authorization
      const headers = {
        Authorization: `Bearer ${currentToken}`,
        "Content-Type": "application/json",
      };

      // ✅ Always POST new address (backend doesn't support update)
      // We'll store the new address details in localStorage to remember which one we just saved
      const newAddressSignature = `${addressPayload.address}|${addressPayload.city}|${addressPayload.state}`;

      console.log(
        `🔄 ADDRESS ACTION: Always create new address for: ${newAddressSignature}`,
      );

      // Update profile and create/update address
      const [profileResponse, addressResponse] = await Promise.all([
        // Update basic profile info
        fetch("https://backend.corelens.in/api/app/change-basic", {
          method: "PUT",
          headers,
          body: JSON.stringify(profilePayload),
        }),

        // Always POST address to avoid route issues, since PUT /single-address/ might not be correctly supported for updates
        fetch("https://backend.corelens.in/api/app/address", {
          method: "POST",
          headers,
          body: JSON.stringify(addressPayload),
        }),
      ]);

      console.log("Sending Address Update - Payload:", addressPayload);
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
        console.log("✅ Profile & Address save SUCCESS");
        console.log("📋 Address Response:", addressResult);

        Swal.fire({
          icon: "success",
          title: "Profile Updated",
          text: "Your profile and address have been updated successfully.",
          timer: 2000,
          showConfirmButton: false,
        });
        setIsEditing(false);

        // ✅ Refresh from backend to show newest address
        setTimeout(() => {
          console.log("🔄 Refreshing profile from backend after save...");
          autoFetchProfile();
        }, 1500);
      } else {
        const errorMsg = (
          profileResult.message ||
          addressResult.message ||
          "Update failed"
        ).replace(/^error:\s*/i, "");
        Swal.fire("Error", errorMsg, "error");
      }
    } catch (error) {
      console.error("Profile save error:", error);
      alert(
        "⚠️ Error saving profile: " +
          (error.message || "Unknown error occurred"),
      );
    }
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
    setEditForm({
      name: userInfo.name || "",
      email: userInfo.email || "",
      mobile_number: userInfo.phone || "",
      state: userInfo.state || "",
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
        },
      );

      const result = await response.json();

      if (response.ok) {
        setFeedbackSuccess(
          "Thank you for your feedback! We appreciate your input.",
        );
        setFeedbackForm({ feedback: "" });

        setTimeout(() => {
          setFeedbackSuccess("");
        }, 5000);
      } else {
        setFeedbackError(
          result.message || "Failed to submit feedback. Please try again.",
        );
      }
    } catch (error) {
      setFeedbackError(
        "Network error. Please check your connection and try again.",
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
                      Total Spend
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
                    <label>State</label>
                    <div className="info-value">
                      {loadingDashboard
                        ? "Loading..."
                        : userInfo.state || "Not provided"}
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

                  <div className="form-group dropdown-container">
                    <label>State*</label>
                    <select
                      className="dashboard-input searchable-select"
                      value={editForm.state}
                      onChange={(e) => {
                        const selectedState = e.target.value;
                        setEditForm({
                          ...editForm,
                          state: selectedState,
                          city: "",
                        });
                        if (STATES_AND_CITIES[selectedState]) {
                          setAvailableCities(STATES_AND_CITIES[selectedState]);
                        }
                      }}
                      required
                    >
                      <option value="">-- Select State --</option>
                      {Object.keys(STATES_AND_CITIES)
                        .sort()
                        .map((state) => (
                          <option key={state} value={state}>
                            {state}
                          </option>
                        ))}
                    </select>
                  </div>

                  <div className="form-group dropdown-container">
                    <label>City*</label>
                    <select
                      className="dashboard-input searchable-select"
                      value={editForm.city}
                      onChange={(e) =>
                        setEditForm({ ...editForm, city: e.target.value })
                      }
                      required
                    >
                      <option value="">-- Select City --</option>
                      {availableCities.sort().map((city) => (
                        <option key={city} value={city}>
                          {city}
                        </option>
                      ))}
                    </select>
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
