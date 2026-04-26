import React, { useState, useEffect } from "react";
import Swal from "sweetalert2";
import "./viewcart.css";
import {
  sendOTP,
  verifyOTP,
  saveAddress,
  fetchUserProfile,
  processPayment as apiProcessPayment,
} from "../utils/api";

// ✅ SECURITY FIX: Get token dynamically from localStorage instead of hardcoding
const getCurrentToken = () => {
  return (
    localStorage.getItem("userToken") ||
    localStorage.getItem("verificationToken") ||
    null
  );
};

// 📍 India States and Union Territories List
const INDIA_STATES = [
  "Andhra Pradesh",
  "Arunachal Pradesh",
  "Assam",
  "Bihar",
  "Chhattisgarh",
  "Goa",
  "Gujarat",
  "Haryana",
  "Himachal Pradesh",
  "Jharkhand",
  "Karnataka",
  "Kerala",
  "Madhya Pradesh",
  "Maharashtra",
  "Manipur",
  "Meghalaya",
  "Mizoram",
  "Nagaland",
  "Odisha",
  "Punjab",
  "Rajasthan",
  "Sikkim",
  "Tamil Nadu",
  "Telangana",
  "Tripura",
  "Uttar Pradesh",
  "Uttarakhand",
  "West Bengal",
  // Union Territories
  "Andaman and Nicobar Islands",
  "Chandigarh",
  "Dadra and Nagar Haveli and Daman and Diu",
  "Delhi",
  "Jammu and Kashmir",
  "Ladakh",
  "Lakshadweep",
  "Puducherry",
];

const ViewCart = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [completedSteps, setCompletedSteps] = useState([]);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [showOTP, setShowOTP] = useState(false);
  const [otp, setOTP] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    address: "",
    city: "",
    state: "",
  });
  const [formErrors, setFormErrors] = useState({});
  const [paymentWarning, setPaymentWarning] = useState("");
  const [showPaymentSelection, setShowPaymentSelection] = useState(false);
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState("");
  const [phoneError, setPhoneError] = useState("");
  const [otpError, setOtpError] = useState("");
  const [loading, setLoading] = useState(false);
  const [userToken, setUserToken] = useState("");
  const [editingStep, setEditingStep] = useState(null);
  const [profileLoading, setProfileLoading] = useState(false);

  // Selected address object and display string
  const [selectedAddress, setSelectedAddress] = useState(null);
  const [addressDisplay, setAddressDisplay] = useState("");

  // 🔥 Dynamic billing address state
  const [billingAddressId, setBillingAddressId] = useState(null);
  const [activeAddress, setActiveAddress] = useState(null);

  // 📍 Delivery Address Selector State
  const [savedAddresses, setSavedAddresses] = useState([]);
  const [selectedAddressId, setSelectedAddressId] = useState(null);
  const [showAddNewForm, setShowAddNewForm] = useState(false);
  const [showAddressList, setShowAddressList] = useState(false);
  const [addressViewMode, setAddressViewMode] = useState("dropdown");
  const [newAddressForm, setNewAddressForm] = useState({
    name: "",
    address: "",
    city: "",
    state: "",
    pincode: "",
    type: "Home",
    otherType: "",
    isOtherSelected: false,
    submitToSave: false,
  });
  const [stateSearch, setStateSearch] = useState("");
  const [showStateDropdown, setShowStateDropdown] = useState(false);
  const [showAllAddresses, setShowAllAddresses] = useState(false);

  // Cart items state - initially empty, loaded from localStorage
  const [cartItems, setCartItems] = useState([]);

  // Test API connectivity with dynamic token
  const testAPIConnectivity = async () => {
    
    try {
      const currentToken = getCurrentToken();
      if (!currentToken) {
        
        return false;
      }

      const response = await fetch(
        "https://backend.corelens.in/api/app/test/checkout",
        {
          method: "OPTIONS",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${currentToken}`,
          },
        },
      );
      console.log(
        "🔧 API Test Response:",
        response.status,
        response.statusText,
      );
      return response.ok;
    } catch (error) {
      
      return false;
    }
  };

  // 📍 Load saved addresses from API
  const loadSavedAddresses = async () => {
    try {
      const currentToken =
        localStorage.getItem("userToken") ||
        localStorage.getItem("verificationToken");
      
      if (!currentToken) {
        
        return;
      }

      
      const response = await fetch(
        "https://backend.corelens.in/api/app/address?page=1&limit=50",
        {
          headers: {
            Authorization: `Bearer ${currentToken}`,
            "Content-Type": "application/json",
          },
        },
      );

      

      if (response.ok) {
        const data = await response.json();
        

        let addressList = [];
        if (data.data?.docs && Array.isArray(data.data.docs)) {
          addressList = data.data.docs;
        } else if (Array.isArray(data.data)) {
          addressList = data.data;
        } else if (Array.isArray(data.addresses)) {
          addressList = data.addresses;
        } else if (Array.isArray(data)) {
          addressList = data;
        }

        console.log(
          "📍 loadSavedAddresses: Parsed address list:",
          addressList.length,
          "items",
          addressList,
        );
        setSavedAddresses(addressList);

        // Check if there's a previously selected address ID
        const previouslySelectedId =
          sessionStorage.getItem("selectedAddressId");
        let addressToLoad = null;

        if (previouslySelectedId && addressList.length > 0) {
          // Find the previously selected address
          addressToLoad = addressList.find(
            (addr) => (addr._id || addr.id) === previouslySelectedId,
          );
          
        }

        // If no previously selected, use first address
        if (!addressToLoad && addressList.length > 0) {
          addressToLoad = addressList[0];
          console.log(
            "📍 No previous selection, using first address:",
            addressToLoad,
          );
        }

        // Auto-load the selected address
        if (addressToLoad) {
          handleFormChange("address", addressToLoad.address || "");
          handleFormChange("city", addressToLoad.city || "");
          handleFormChange("state", addressToLoad.state || "");
          const finalId = addressToLoad._id || addressToLoad.id;
          setSelectedAddressId(finalId);
          setBillingAddressId(finalId);
          localStorage.setItem("billingAddressId", finalId);
          
        }

        console.log(
          "✅ Loaded addresses:",
          addressList.length,
          "addresses found",
        );
      } else {
        console.error(
          "📍 loadSavedAddresses: API error status",
          response.status,
        );
      }
    } catch (error) {
      
    }
  };

  const [isNewUser, setIsNewUser] = useState(false);
  const [promoCode, setPromoCode] = useState("");
  const [promoData, setPromoData] = useState(null);
  const [promoError, setPromoError] = useState("");
  const [promoLoading, setPromoLoading] = useState(false);

  // Calculate Subtotal (Base Price)
  const getSubtotal = () => {
    return cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  };

  // Calculate Promo Discount
  const getPromoDiscount = () => {
    if (!promoData || cartItems.length === 0) return 0;
    const subtotal = getSubtotal();
    let discount = 0;
    if (promoData.type === "percentage") {
      discount = (subtotal * promoData.value) / 100;
    } else {
      discount = promoData.value;
    }
    if (promoData.max_discount && discount > promoData.max_discount) {
      discount = promoData.max_discount;
    }
    return Math.round(discount);
  };

  // Calculate GST (18% on Subtotal - Discount)
  const getGSTAmount = () => {
    const amountAfterDiscount = getSubtotal() - getPromoDiscount();
    return Math.round(amountAfterDiscount * 0.18);
  };

  // Calculate Total Payable
  const getFinalTotal = () => {
    return getSubtotal() - getPromoDiscount() + getGSTAmount();
  };

  const handleApplyPromo = async () => {
    if (!promoCode.trim()) {
      setPromoError("Please enter a promo code");
      return;
    }

    setPromoLoading(true);
    setPromoError("");

    try {
      const token = getCurrentToken();
      const response = await fetch(
        `https://backend.corelens.in/api/app/promo-codes?search=${promoCode.trim()}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        },
      );

      if (response.ok) {
        const result = await response.json();
        const promo = result.data?.docs?.[0] || result.data?.[0];

        if (
          !promo ||
          promo.code.toUpperCase() !== promoCode.trim().toUpperCase()
        ) {
          setPromoError("Invalid or expired promo code");
          setPromoData(null);
        } else if (!promo.is_active) {
          setPromoError("Promo code is inactive");
          setPromoData(null);
        } else {
          setPromoData(promo);
          setPromoError("");
          Swal.fire({
            icon: "success",
            title: "Promo Applied!",
            text: `${promo.code} applied successfully.`,
            timer: 2000,
            showConfirmButton: false,
          });
        }
      } else {
        setPromoError("Failed to validate promo code");
      }
    } catch (error) {
      
      setPromoError("Something went wrong");
    } finally {
      setPromoLoading(false);
    }
  };

  // Auto-remove promo if cart is empty
  useEffect(() => {
    if (cartItems.length === 0 && promoData) {
      setPromoData(null);
      setPromoCode("");
    }
  }, [cartItems, promoData]);

  useEffect(() => {
    if (showAddNewForm && formData.name && !newAddressForm.name) {
      setNewAddressForm((prev) => ({
        ...prev,
        name: formData.name,
      }));
    }
  }, [showAddNewForm, formData.name]);

  // Handle form field changes
  const handleFormChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  // Restore saved form data on component mount
  useEffect(() => {
    const savedFormData = sessionStorage.getItem("checkoutFormData");
    if (savedFormData) {
      try {
        const parsedData = JSON.parse(savedFormData);
        setFormData(parsedData);
        
      } catch (e) {
        
      }
    }
  }, []);

  // Save form data to session storage whenever it changes
  useEffect(() => {
    sessionStorage.setItem("checkoutFormData", JSON.stringify(formData));
    
  }, [formData]);

  // Load saved data on component mount and load Razorpay script
  useEffect(() => {
    loadSavedData();
    loadCartItems();
    loadSavedAddresses(); // Always try to load addresses

    // Test API connectivity in development
    if (
      window.location.hostname === "localhost" ||
      window.location.hostname.includes("replit")
    ) {
      testAPIConnectivity();
    }

    // Load Razorpay script
    const loadRazorpayScript = () => {
      return new Promise((resolve) => {
        const existingScript = document.getElementById("razorpay-script");
        if (existingScript) {
          resolve(true);
          return;
        }

        const script = document.createElement("script");
        script.id = "razorpay-script";
        script.src = "https://checkout.razorpay.com/v1/checkout.js";
        script.onload = () => {
          
          resolve(true);
        };
        script.onerror = () => {
          
          resolve(false);
        };
        document.body.appendChild(script);
      });
    };

    loadRazorpayScript();

    // Listen for storage changes (when cart is updated from other components)
    const handleStorageChange = (e) => {
      if (e.key === "cartItems") {
        console.log(
          "ViewCart: Cart items updated in localStorage, reloading...",
        );
        loadCartItems();
      } else if (
        e.key === "userToken" ||
        e.key === "userPhone" ||
        e.key === "loginData"
      ) {
        
        setTimeout(loadSavedData, 100); // Small delay to ensure change is complete
      }
    };

    window.addEventListener("storage", handleStorageChange);

    // Listen for custom events from the same window
    const handleCartUpdate = () => {
      
      loadCartItems();
    };

    const handleLoginUpdate = (event) => {
      
      if (event.detail?.phone && event.detail?.token) {
        setPhoneNumber(event.detail.phone);
        setUserToken(event.detail.token);
        setCompletedSteps([0]); // Mark login as completed
        setCurrentStep(1); // Move to address step
        setShowOTP(false);
        
      }
    };

    window.addEventListener("cartUpdated", handleCartUpdate);
    window.addEventListener("userLoggedIn", handleLoginUpdate);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
      window.removeEventListener("cartUpdated", handleCartUpdate);
      window.removeEventListener("userLoggedIn", handleLoginUpdate);
    };
  }, []);

  // Inject a CSS class for read-only address fields so they remain visible
  useEffect(() => {
    try {
      const styleId = "viewcart-readonly-style";
      if (!document.getElementById(styleId)) {
        const style = document.createElement("style");
        style.id = styleId;
        style.innerHTML = `
          .readonly-input {
            background: #f3f3f3 !important;
            color: #000 !important;
            opacity: 1 !important;
            cursor: not-allowed !important;
            border: 1px solid #d0d0d0 !important;
          }
        `;
        document.head.appendChild(style);
      }
    } catch (e) {
      
    }
  }, []);

  // Save data to localStorage whenever it changes
  useEffect(() => {
    saveDataToStorage();
  }, [phoneNumber, formData, completedSteps, userToken]);

  const loadCartItems = async () => {
    try {
      

      // Use enhanced storage utility
      try {
        const { StorageUtils } = await import("../utils/storage.js");
        const validItems = StorageUtils.loadCart();

        setCartItems(validItems);
        console.log(
          "✅ ViewCart: Loaded cart items using StorageUtils:",
          validItems.length,
          "items",
        );
      } catch (importError) {
        console.warn(
          "⚠️ ViewCart: StorageUtils import failed, using fallback method",
        );

        // Fallback to direct localStorage access
        const savedCartItems = localStorage.getItem("cartItems");
        const lastUpdated = localStorage.getItem("cartLastUpdated");

        console.log(
          "🔍 ViewCart: Cart data exists:",
          !!savedCartItems,
          "Last updated:",
          lastUpdated
            ? new Date(parseInt(lastUpdated)).toLocaleString()
            : "Never",
        );

        if (
          savedCartItems &&
          savedCartItems !== "undefined" &&
          savedCartItems !== "null"
        ) {
          const parsedItems = JSON.parse(savedCartItems);
          if (Array.isArray(parsedItems)) {
            const validItems = parsedItems.filter(
              (item) =>
                item &&
                item.id &&
                item.name &&
                item.price !== undefined &&
                item.quantity > 0,
            );
            setCartItems(validItems);
            console.log(
              "✅ ViewCart: Loaded cart items (fallback):",
              validItems.length,
              "items",
            );

            // Force save if items were cleaned
            if (validItems.length !== parsedItems.length) {
              try {
                localStorage.setItem("cartItems", JSON.stringify(validItems));
                localStorage.setItem("cartLastUpdated", Date.now().toString());
                
              } catch (saveError) {
                console.error(
                  "❌ ViewCart: Error saving cleaned cart:",
                  saveError,
                );
              }
            }
          } else {
            
            setCartItems([]);
            try {
              localStorage.removeItem("cartItems");
              localStorage.removeItem("cartLastUpdated");
            } catch (removeError) {
              console.error(
                "❌ ViewCart: Error removing invalid cart:",
                removeError,
              );
            }
          }
        } else {
          setCartItems([]);
          
        }
      }
    } catch (error) {
      
      setCartItems([]);
      try {
        localStorage.removeItem("cartItems"); // Remove corrupted data
        localStorage.removeItem("cartLastUpdated");
      } catch (removeError) {
        console.error(
          "❌ ViewCart: Error removing corrupted cart:",
          removeError,
        );
      }
    }
  };

  const loadSavedData = async () => {
    try {
      

      let loginData = null;
      let isValidLogin = false;

      // ✅ Enhanced login state detection - check multiple sources
      const token = localStorage.getItem("userToken");
      const verificationToken = localStorage.getItem("verificationToken");
      const phone = localStorage.getItem("userPhone");
      const verified = localStorage.getItem("userVerified");
      const timestamp = localStorage.getItem("loginTimestamp");
      const consolidatedLoginData = localStorage.getItem("loginData");

      console.log("🔍 ViewCart: Checking all login sources:", {
        hasUserToken: !!token,
        hasVerificationToken: !!verificationToken,
        hasPhone: !!phone,
        isVerified: verified === "true",
        hasTimestamp: !!timestamp,
        hasConsolidatedData: !!consolidatedLoginData,
      });

      // Try consolidated login data first
      if (consolidatedLoginData) {
        try {
          const parsedLoginData = JSON.parse(consolidatedLoginData);
          if (
            parsedLoginData.token &&
            parsedLoginData.phone &&
            parsedLoginData.isVerified
          ) {
            const loginTime = parsedLoginData.timestamp || Date.now();
            const maxAge = 30 * 24 * 60 * 60 * 1000; // 30 days
            isValidLogin = Date.now() - loginTime < maxAge;

            if (isValidLogin) {
              loginData = parsedLoginData;
              
            }
          }
        } catch (parseError) {
          
        }
      }

      // Fallback to individual localStorage items
      if (
        !loginData &&
        (token || verificationToken) &&
        phone &&
        verified === "true"
      ) {
        const activeToken = token || verificationToken;
        const loginTime = timestamp ? parseInt(timestamp) : Date.now();
        const maxAge = 30 * 24 * 60 * 60 * 1000; // 30 days
        isValidLogin = Date.now() - loginTime < maxAge;

        if (isValidLogin) {
          loginData = {
            token: activeToken,
            phone,
            isVerified: true,
            timestamp: loginTime,
          };

          
        } else {
          // Login expired, clear it
          
          localStorage.removeItem("userToken");
          localStorage.removeItem("verificationToken");
          localStorage.removeItem("userPhone");
          localStorage.removeItem("userVerified");
          localStorage.removeItem("loginTimestamp");
          localStorage.removeItem("loginData");
        }
      }

      if (loginData && isValidLogin) {
        console.log("🔍 ViewCart: Valid login found:", {
          phone: loginData.phone,
          hasToken: !!loginData.token,
          loginTime: new Date(loginData.timestamp).toLocaleString(),
        });

        // ✅ Immediately set login step as completed and move to address
        setPhoneNumber(loginData.phone);
        setUserToken(loginData.token);
        setCompletedSteps([0]); // Mark login step as completed
        setCurrentStep(1); // Move to address step
        setShowOTP(false);

        console.log(
          "✅ ViewCart: Login step marked as completed, proceeding to address",
        );

        // Load profile to pre-fill address form
        await loadUserProfile(loginData.phone, loginData.token);
      } else {
        
        setCurrentStep(0); // Start with login step
        setCompletedSteps([]);
        setShowOTP(false);
      }

      // Load ViewCart specific data (address form, etc.)
      const savedViewCart = localStorage.getItem("viewCartData");
      if (savedViewCart) {
        try {
          const data = JSON.parse(savedViewCart);

          // IMPORTANT: If user is logged in (we fetched profile/address from server),
          // prefer server data and DO NOT overwrite formData with saved local data.
          if (!loginData) {
            // Only restore form data when there's no valid login (offline/guest)
            setFormData(
              data.formData || {
                name: "",
                email: "",
                address: "",
                city: "",
                state: "",
              },
            );
          } else {
            console.log(
              "ViewCart: Found saved viewCartData but user is logged in — keeping server-fetched formData",
            );
          }

          // If address was previously completed in saved data and user is logged in,
          // mark address as completed so UI behaves as before
          if (data.completedSteps?.includes(1) && loginData) {
            setCompletedSteps([0, 1]);
            console.log(
              "✅ ViewCart: Address step also completed from saved data",
            );
          }
        } catch (parseError) {
          console.error(
            "❌ ViewCart: Error parsing saved ViewCart data:",
            parseError,
          );
          localStorage.removeItem("viewCartData");
        }
      }
    } catch (error) {
      
    }
  };

  const saveDataToStorage = () => {
    try {
      const dataToSave = {
        phoneNumber,
        formData,
        completedSteps,
        userToken,
        timestamp: Date.now(),
      };
      localStorage.setItem("viewCartData", JSON.stringify(dataToSave));
    } catch (error) {
      
    }
  };

  const clearSavedData = () => {
    localStorage.removeItem("viewCartData");
  };

  // ✅ Dynamic steps based on new user or existing user
  const getSteps = () => {
    if (isNewUser) {
      return [
        { id: 0, title: "LOGIN", number: "1" },
        { id: 1, title: "SIGNUP", number: "2" },
        { id: 2, title: "ADD NEW ADDRESS", number: "3" },
      ];
    }
    return [
      { id: 0, title: "LOGIN", number: "1" },
      { id: 1, title: "DELIVERY ADDRESS", number: "2" },
      { id: 2, title: "ADD NEW ADDRESS", number: "3" },
    ];
  };

  const steps = getSteps();

  const handleStepClick = (stepId) => {
    // Prevent clicking on disabled steps
    if (isStepDisabled(stepId)) return;

    // Custom logic for Add New Address step
    if (stepId === 2) {
      handleAddNewAddressAction();
      return;
    }

    setCurrentStep(stepId);
    setEditingStep(stepId);
  };

  const handleRemoveItem = (itemId) => {
    const updatedItems = cartItems.filter((item) => item.id !== itemId);
    setCartItems(updatedItems);
    // Update localStorage
    localStorage.setItem("cartItems", JSON.stringify(updatedItems));
    // Dispatch event to notify other components
    window.dispatchEvent(
      new CustomEvent("cartUpdated", { detail: updatedItems }),
    );

    // Update header cart functions if available
    if (window.headerCartFunctions) {
      const newCartCount = updatedItems.reduce(
        (total, item) => total + item.quantity,
        0,
      );
      window.headerCartFunctions.updateCartCount(newCartCount);
    }

    
  };

  const handleUpdateItemQuantity = (itemId, newQuantity) => {
    if (newQuantity <= 0) {
      // Show remove alert when quantity becomes 0
      const item = cartItems.find((item) => item.id === itemId);
      if (item) {
        const messageEl = document.createElement("div");
        messageEl.style.cssText = `
          position: fixed;
          top: 2rem;
          right: 2rem;
          background: #dc3545;
          color: white;
          padding: 1.5rem 2rem;
          border-radius: 0.8rem;
          box-shadow: 0 10px 25px rgba(0,0,0,0.1);
          z-index: 10000;
          max-width: 30rem;
          font-size: 1.4rem;
          font-weight: 500;
          animation: slideInRight 0.3s ease;
        `;
        messageEl.textContent = `${item.name} removed from cart`;
        document.body.appendChild(messageEl);

        setTimeout(() => {
          messageEl.style.animation = "slideOutRight 0.3s ease";
          setTimeout(() => {
            if (messageEl.parentNode) {
              messageEl.parentNode.removeChild(messageEl);
            }
          }, 300);
        }, 2000);
      }
      handleRemoveItem(itemId);
      return;
    }

    const updatedItems = cartItems.map((item) =>
      item.id === itemId ? { ...item, quantity: newQuantity } : item,
    );
    setCartItems(updatedItems);
    localStorage.setItem("cartItems", JSON.stringify(updatedItems));
    window.dispatchEvent(
      new CustomEvent("cartUpdated", { detail: updatedItems }),
    );

    // Update header cart functions if available
    if (window.headerCartFunctions) {
      const newCartCount = updatedItems.reduce(
        (total, item) => total + item.quantity,
        0,
      );
      window.headerCartFunctions.updateCartCount(newCartCount);
    }

    
  };

  const isStepCompleted = (stepId) => {
    return completedSteps.includes(stepId);
  };

  const isStepActive = (stepId) => {
    return currentStep === stepId;
  };

  const isStepDisabled = (stepId) => {
    // New user: Step 1 (SIGNUP) disabled until login complete, Step 2 (ADD ADDRESS) disabled until signup complete
    if (isNewUser) {
      if (stepId === 1) return !completedSteps.includes(0); // SIGNUP disabled until LOGIN complete
      if (stepId === 2) return !completedSteps.includes(1); // ADD ADDRESS disabled until SIGNUP complete
      return stepId > currentStep && !completedSteps.includes(stepId);
    }

    // Existing user: Step 2 (ADD NEW ADDRESS) ALWAYS active, Step 1 disabled until login complete
    if (stepId === 2) return !completedSteps.includes(0); // ADD ADDRESS needs LOGIN first

    return stepId > currentStep && !completedSteps.includes(stepId);
  };

  const handleEditStep = (stepId) => {
    setEditingStep(stepId);
    setCurrentStep(stepId);

    // When editing login (Step 0) or address selection (Step 1),
    // we should also pre-fill the Add New Address form (Step 2/showAddNewForm)
    // with the user's current profile name if it exists.
    if (formData.name && !newAddressForm.name) {
      setNewAddressForm((prev) => ({
        ...prev,
        name: formData.name,
      }));
    }
  };

  const handleAddNewAddressAction = () => {
    setShowAddNewForm(true);
    setShowAddressList(false);

    // Pre-fill name, phone, and email from profile/formData if available
    setNewAddressForm((prev) => ({
      ...prev,
      name: prev.name || formData.name || "",
      phone:
        prev.phone || phoneNumber || localStorage.getItem("userPhone") || "",
      email: prev.email || formData.email || "",
    }));
  };

  const validatePhoneNumber = (phone) => {
    const phoneRegex = /^[6-9]\d{9}$/;
    return phoneRegex.test(phone);
  };

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validateFormData = () => {
    const errors = {};

    // Name validation
    if (!formData.name.trim()) {
      errors.name = "Name is required";
    } else if (formData.name.trim().length < 2) {
      errors.name = "Name must be at least 2 characters long";
    }

    // Email validation
    if (!formData.email.trim()) {
      errors.email = "Email is required";
    } else if (!validateEmail(formData.email)) {
      errors.email = "Please enter a valid email address";
    }

    // Address validation
    if (!formData.address.trim()) {
      errors.address = "Address is required";
    } else if (formData.address.trim().length < 5) {
      errors.address = "Address must be at least 5 characters long";
    }

    // City validation
    if (!formData.city.trim()) {
      errors.city = "City is required";
    } else if (formData.city.trim().length < 2) {
      errors.city = "City must be at least 2 characters long";
    }

    return errors;
  };

  const handlePhoneSubmit = async () => {
    setPhoneError("");
    setOtpError("");
    setLoading(true);

    if (!validatePhoneNumber(phoneNumber)) {
      setPhoneError("Please enter a valid 10-digit mobile number");
      setLoading(false);
      return;
    }

    

    try {
      const result = await sendOTP(phoneNumber);
      

      if (result.success) {
        
        setShowOTP(true);
        setOTP(""); // Clear previous OTP
        setPhoneError("");
      } else {
        
        // Check if it's a real API failure or demo mode
        if (result.status === 200) {
          // API responded OK but may not have sent real SMS
          setShowOTP(true);
          setOTP("");
          setPhoneError(
            "API responded OK. If OTP not received, backend SMS service may not be configured. Using demo mode.",
          );
        } else {
          setPhoneError(
            `API Error (${result.status}): ${
              result.error || "Failed to send OTP"
            }`,
          );
        }
      }
    } catch (error) {
      
      setPhoneError(
        `Network Error: ${error.message}. Please check your internet connection.`,
      );
    } finally {
      setLoading(false);
    }
  };

  const handleOTPSubmit = async () => {
    setOtpError("");
    setLoading(true);

    if (!otp || otp.length !== 4) {
      setOtpError("Please enter a valid 4-digit OTP");
      setLoading(false);
      return;
    }

    

    try {
      // Get stored token from OTP request
      const storedToken = localStorage.getItem("otpToken");
      

      const result = await verifyOTP(otp, phoneNumber, storedToken);
      
      console.log(
        "ViewCart: Full result for debugging:",
        JSON.stringify(result),
      );

      // ✅ Check for "user not found" FIRST (new user case)
      const isUserNotFound =
        result?.message?.toLowerCase?.()?.includes("user not found") ||
        result?.data?.message?.toLowerCase?.()?.includes("user not found") ||
        result?.error?.toLowerCase?.()?.includes("user not found") ||
        result?.error?.toLowerCase?.()?.includes("not registered") ||
        (result?.success === false &&
          result?.data?.message?.toLowerCase?.()?.includes("user not found"));

      if (isUserNotFound) {
        // 🆕 NEW USER DETECTED
        console.log(
          "👤 ViewCart: New user detected, initiating auto-registration flow",
        );

        // 1. Store mobile number in session/local
        sessionStorage.setItem("mobile", phoneNumber);
        localStorage.setItem("userPhone", phoneNumber);

        // 2. Clear OTP error as this is a successful verification of a new user
        setOtpError("");

        // 3. Mark login step as completed and proceed to signup
        const tempToken = `new-user-token-${phoneNumber}-${Date.now()}`;

        setIsNewUser(true);
        setCompletedSteps([0]); // Mark LOGIN as completed
        setCurrentStep(1); // ✅ Auto-open Step 2 (SIGNUP) - now at step 1 for new users
        setEditingStep(1); // Ensure it's active
        setShowOTP(false);
        setUserToken(tempToken);
        localStorage.setItem("userToken", tempToken);
        localStorage.setItem("userVerified", "true");
        setLoading(false);

        // Notify user about registration
        Swal.fire({
          html: `
            <div style="display: flex; flex-direction: column; align-items: center; padding: 10px;">
              <img src="/images/icons/add_newuser.png" alt="Add User" style="width: 40px; height: 40px; margin-bottom: 15px; object-fit: contain;" />
              <h2 style="font-size: 1.25rem; font-weight: 600; margin-bottom: 10px; color: #333;">User Not Found</h2>
              <p style="color: #666; font-size: 0.95rem; line-height: 1.4; margin: 0;">Welcome! Please complete your registration to continue shopping.</p>
            </div>
          `,
          showConfirmButton: true,
          confirmButtonText: "OK",
          confirmButtonColor: "#1976d2",
          width: '350px',
          padding: '1.5rem',
          customClass: {
            popup: "custom-swal-popup",
          },
        });

        // Pre-fill form for the new user with mobile number
        setNewAddressForm({
          name: "",
          email: "",
          address: "",
          city: "",
          state: "",
          pincode: "",
          type: "Home",
          phone: phoneNumber,
        });

        console.log(
          "✅ ViewCart: Flow switched to SIGNUP mode for new user at Step 1",
        );
      } else if (result.success && result.data) {
        

        // Extract token from response - handle multiple formats
        let authToken = null;
        const responseData = result.data;

        if (responseData.accessToken) {
          authToken = responseData.accessToken;
          
        } else if (responseData.data?.accessToken) {
          authToken = responseData.data.accessToken;
          
        } else if (responseData.token) {
          authToken = responseData.token;
          
        } else if (responseData.data?.token) {
          authToken = responseData.data.token;
          
        } else if (
          responseData.verified === true ||
          responseData.data?.verified === true
        ) {
          // If verification succeeded but no token, generate one
          authToken = `verified-token-${phoneNumber}-${Date.now()}`;
          console.log(
            "⚠️ ViewCart: No token in response but OTP verified - generated token",
          );
        }

        if (authToken) {
          completeLoginStep(authToken);
        } else {
          
          setOtpError("Invalid OTP. Please enter the correct 4-digit code.");
        }
      } else {
        
        setOtpError("Invalid OTP. Please enter the correct 4-digit code.");
      }
    } catch (error) {
      
      setOtpError("Error verifying OTP. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const loadUserProfile = async (phoneNumber, token) => {
    
    setProfileLoading(true);

    try {
      // Directly call the backend endpoints for profile & address
      const headers = {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      };

      // Fetch profile and addresses in parallel
      const [profileRes, addressRes] = await Promise.all([
        fetch("https://backend.corelens.in/api/app/getProfile", {
          method: "GET",
          headers,
        }),
        fetch("https://backend.corelens.in/api/app/single-address", {
          method: "GET",
          headers,
        }),
      ]);

      const profileJson = await profileRes.json().catch(() => ({}));
      const addressJson = await addressRes.json().catch(() => ({}));

      
      

      // Normalize profile data according to API shape
      let profileData = {};
      if (profileJson?.data?.user) {
        profileData = profileJson.data.user;
      } else if (profileJson?.data?.profile) {
        profileData = profileJson.data.profile;
      } else if (profileJson?.profile) {
        // some endpoints return profile at root
        profileData = profileJson.profile;
      } else if (profileJson?.data) {
        profileData = profileJson.data;
      } else {
        profileData = profileJson || {};
      }

      // Parse addresses similar to Dashboard: prefer data.docs array and find default or last
      let addresses = [];
      if (Array.isArray(addressJson?.data?.docs)) {
        addresses = addressJson.data.docs;
      } else if (Array.isArray(addressJson?.data)) {
        addresses = addressJson.data;
      } else if (Array.isArray(addressJson)) {
        addresses = addressJson;
      }

      const foundActiveAddress =
        addresses.find((a) => a.defaultAddress === true) ||
        addresses[addresses.length - 1] ||
        null;

      // 🔥 Set active address and billing address ID in state
      setActiveAddress(foundActiveAddress);
      if (
        foundActiveAddress &&
        (foundActiveAddress._id || foundActiveAddress.id)
      ) {
        const addressId = foundActiveAddress._id || foundActiveAddress.id;
        setBillingAddressId(addressId);
        localStorage.setItem("billingAddressId", addressId);
        
      }

      console.log("Parsed addresses (ViewCart):", addresses);
      console.log("Active address (ViewCart):", foundActiveAddress);

      // Use address if present, otherwise fall back to profile fields
      const resolvedName = foundActiveAddress?.name || profileData?.name || "";
      const resolvedEmail =
        foundActiveAddress?.email || profileData?.email || "";

      const extractAddress = (val) => {
        if (!val) return "";
        // If it's already a string
        if (typeof val === "string") return val.trim();

        // If it's an array, extract each item and join
        if (Array.isArray(val)) {
          return val
            .map((it) => extractAddress(it))
            .filter(Boolean)
            .join(", ");
        }

        // If it's an object, look for common address fields, recurse when needed
        if (typeof val === "object") {
          // If the object itself contains free-form lines
          const preferredKeys = [
            "address",
            "full_address",
            "formatted",
            "address_line1",
            "address_line_1",
            "address_line2",
            "line1",
            "line2",
            "street",
            "area",
            "locality",
            "city",
            "state",
            "pincode",
            "house",
            "building",
          ];

          for (const k of preferredKeys) {
            if (val[k]) {
              // If the field is a string, return it
              if (typeof val[k] === "string") return val[k].trim();
              // If nested object/array, recurse
              const nested = extractAddress(val[k]);
              if (nested) return nested;
            }
          }

          // If no single preferred key, try to build from multiple parts
          const parts = [];
          // collect common parts
          [
            "house",
            "building",
            "line1",
            "line2",
            "address",
            "street",
            "area",
            "locality",
            "city",
            "state",
            "pincode",
          ].forEach((k) => {
            if (val[k]) {
              if (typeof val[k] === "string") parts.push(val[k].trim());
              else parts.push(extractAddress(val[k]));
            }
          });

          // fallback to JSON string if we couldn't build meaningful parts
          const joined = parts.filter(Boolean).join(", ");
          return joined || JSON.stringify(val);
        }

        return "";
      };

      // 🔥 PRIORITY: Check if user has a previously selected address
      const previouslySelectedId = sessionStorage.getItem("selectedAddressId");
      const hasSelectedAddress = !!previouslySelectedId;

      console.log(
        "🔥 loadUserProfile: Check for previously selected address:",
        {
          selectedAddressId: previouslySelectedId,
          hasSelectedAddress,
        },
      );

      // Extract address info regardless of selection state
      const resolvedAddress =
        extractAddress(foundActiveAddress) ||
        extractAddress(profileData) ||
        extractAddress(profileJson) ||
        "";

      // City may be present on address object or profile (do not default to Delhi)
      const resolvedCity =
        (foundActiveAddress &&
          (foundActiveAddress.city ||
            foundActiveAddress.town ||
            foundActiveAddress.locality)) ||
        profileData?.city ||
        profileData?.town ||
        profileJson?.city ||
        "";

      // State - extract from address or profile
      const resolvedState =
        (foundActiveAddress && foundActiveAddress.state) ||
        profileData?.state ||
        profileJson?.state ||
        "";

      // Pincode - removed
      const resolvedPincode = "";

      console.log("loadUserProfile: address extraction result", {
        resolvedAddress,
        resolvedCity,
        resolvedState,
        resolvedPincode,
        profileDataAddress: profileData?.address,
        profileJsonAddress: profileJson?.address,
        foundActiveAddress,
      });

      // Create newFormData with all extracted info
      const newFormData = {
        name: resolvedName,
        email: resolvedEmail,
        address: resolvedAddress,
        city: resolvedCity,
        state: resolvedState,
        pincode: resolvedPincode || "",
      };

      // Update form data
      setFormData(newFormData);
      console.log(
        "📝 ViewCart: Form data updated with profile info:",
        newFormData,
      );

      // Persist userInfo so other pages (Dashboard / ViewCart) remain consistent
      try {
        const storedProfile = JSON.parse(
          localStorage.getItem("userInfo") || "{}",
        );
        const merged = {
          ...storedProfile,
          name: newFormData.name || storedProfile.name,
          email: newFormData.email || storedProfile.email,
          address: newFormData.address || storedProfile.address,
          city: newFormData.city || storedProfile.city,
          state: newFormData.state || storedProfile.state,
        };
        localStorage.setItem("userInfo", JSON.stringify(merged));
        console.log(
          "✅ Updated localStorage.userInfo with ViewCart profile data:",
          merged,
        );
      } catch (e) {
        
      }

      // Only mark address step complete when we actually have usable data
      const hasName = (resolvedName || "").toString().trim().length >= 2;
      const hasEmail = (resolvedEmail || "").toString().includes("@");
      const hasAddress = (resolvedAddress || "").toString().trim().length >= 5;
      const hasCity = (resolvedCity || "").toString().trim().length >= 2;

      if (hasName && hasEmail && hasAddress && hasCity) {
        setCompletedSteps((prev) => {
          if (prev.includes(1)) return prev;
          const base = prev.includes(0) ? [0] : [];
          return [...base, 1];
        });
      } else {
        // ensure we don't accidentally mark step 1 complete if data insufficient
        setCompletedSteps((prev) => prev.filter((s) => s !== 1));
      }

      console.log(
        "✅ Form pre-filled with address/profile data (address preferred)",
      );
    } catch (error) {
      
      // Try to load from localStorage as fallback
      try {
        const savedUserInfo = localStorage.getItem("userInfo");
        if (savedUserInfo) {
          const userInfo = JSON.parse(savedUserInfo);
          setFormData((prev) => ({
            ...prev,
            name: userInfo.name || prev.name,
            email: userInfo.email || prev.email,
            address: userInfo.address || prev.address,
            city: userInfo.city || prev.city || "",
            state: userInfo.state || prev.state || "",
            pincode: userInfo.pincode || prev.pincode || "",
          }));
          
        }
      } catch (localStorageError) {
        
      }
    } finally {
      setProfileLoading(false);
    }
  };

  const completeLoginStep = async (token) => {
    try {
      console.log(
        "✅ ViewCart: Completing login step with token:",
        token ? "***" + token.slice(-10) : "none",
      );

      setUserToken(token);
      setCompletedSteps((prev) => [...prev.filter((step) => step !== 0), 0]);
      setCurrentStep(1);
      setEditingStep(null);
      setOtpError("");
      setShowOTP(false);

      // Save login state with verificationToken
      localStorage.setItem("userToken", token);
      localStorage.setItem("verificationToken", token); // Save as verificationToken
      localStorage.setItem("userPhone", phoneNumber);
      localStorage.setItem("userVerified", "true");
      localStorage.setItem("loginTimestamp", Date.now().toString());

      // Also save consolidated login data
      const loginData = {
        token: token,
        verificationToken: token,
        phone: phoneNumber,
        isVerified: true,
        timestamp: Date.now(),
      };
      localStorage.setItem("loginData", JSON.stringify(loginData));

      console.log(
        "✅ ViewCart: Login state saved successfully with verificationToken",
      );

      // Clear OTP token
      localStorage.removeItem("otpToken");

      // Load user profile to pre-fill address form
      await loadUserProfile(phoneNumber, token);

      // Load saved addresses for dropdown selection
      await loadSavedAddresses();

      // Dispatch login event to notify other components
      window.dispatchEvent(
        new CustomEvent("userLoggedIn", {
          detail: {
            phone: phoneNumber,
            token: token,
            verificationToken: token,
            isVerified: true,
          },
        }),
      );

      
    } catch (error) {
      
    } finally {
      setLoading(false);
    }
  };

  const saveAddressData = async () => {
    // Validate form data first
    const errors = validateFormData();
    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }

    setLoading(true);
    setFormErrors({});

    try {
      const currentToken = localStorage.getItem("userToken");
      if (!currentToken) {
        throw new Error("Authentication required. Please login again.");
      }

      const headers = {
        Authorization: `Bearer ${currentToken}`,
        "Content-Type": "application/json",
      };

      // 🔥 Prepare profile payload (for Dashboard sync)
      const profilePayload = {
        name: formData.name.trim(),
        email: formData.email.trim(),
        city: formData.city.trim() || "Delhi",
      };

      // Prepare address payload
      const addressPayload = {
        address: formData.address.trim(),
        type: "home",
        defaultAddress: true,
        city: formData.city.trim() || "Delhi",
        state: formData.state || "Delhi",
        country: "India",
        pincode: "122001", // Dummy pincode to satisfy backend requirement
      };

      
      

      // 🔥 Update both profile and address in parallel (same as Dashboard)
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

      
      

      // 🔥 Update billingAddressId if new address created
      if (addressResult?.data?._id || addressResult?.data?.id) {
        const newAddressId = addressResult.data._id || addressResult.data.id;
        setBillingAddressId(newAddressId);
        localStorage.setItem("billingAddressId", newAddressId);
        
      }

      // 🔥 Update localStorage userInfo for Dashboard sync
      try {
        const storedProfile = JSON.parse(
          localStorage.getItem("userInfo") || "{}",
        );
        const merged = {
          ...storedProfile,
          name: formData.name.trim(),
          email: formData.email.trim(),
          address: formData.address.trim(),
          city: formData.city.trim(),
        };
        localStorage.setItem("userInfo", JSON.stringify(merged));
        
      } catch (e) {
        
      }

      if (profileResponse.ok || addressResponse.ok) {
        setCompletedSteps((prev) => [...prev.filter((step) => step !== 1), 1]);
        setEditingStep(null);
        

        // ✅ Show success message to user
        const successMessage = document.createElement("div");
        successMessage.style.cssText = `
          position: fixed;
          top: 2rem;
          right: 2rem;
          background: #28a745;
          color: white;
          padding: 1.5rem 2rem;
          border-radius: 0.8rem;
          box-shadow: 0 10px 25px rgba(0,0,0,0.1);
          z-index: 10000;
          max-width: 30rem;
          font-size: 1.4rem;
          font-weight: 500;
        `;
        successMessage.textContent =
          "✅ Address saved successfully to admin panel!";
        document.body.appendChild(successMessage);

        setTimeout(() => {
          if (successMessage.parentNode) {
            successMessage.parentNode.removeChild(successMessage);
          }
        }, 3000);
      } else {
        const errorMsg =
          profileResult?.message || addressResult?.message || "Failed to save";
        

        // ✅ Show error message
        const errorMessage = document.createElement("div");
        errorMessage.style.cssText = `
          position: fixed;
          top: 2rem;
          right: 2rem;
          background: #dc3545;
          color: white;
          padding: 1.5rem 2rem;
          border-radius: 0.8rem;
          box-shadow: 0 10px 25px rgba(0,0,0,0.1);
          z-index: 10000;
          max-width: 30rem;
          font-size: 1.4rem;
          font-weight: 500;
        `;
        errorMessage.textContent = `❌ Failed to save address: ${
          result.error || "Unknown error"
        }`;
        document.body.appendChild(errorMessage);

        setTimeout(() => {
          if (errorMessage.parentNode) {
            errorMessage.parentNode.removeChild(errorMessage);
          }
        }, 5000);

        // Don't proceed to next step if address save failed
        return;
      }
    } catch (error) {
      

      // ✅ Show network error message to user
      const errorMessage = document.createElement("div");
      errorMessage.style.cssText = `
        position: fixed;
        top: 2rem;
        right: 2rem;
        background: #dc3545;
        color: white;
        padding: 1.5rem 2rem;
        border-radius: 0.8rem;
        box-shadow: 0 10px 25px rgba(0,0,0,0.1);
        z-index: 10000;
        max-width: 30rem;
        font-size: 1.4rem;
        font-weight: 500;
      `;
      errorMessage.textContent = `❌ Network error: ${error.message}`;
      document.body.appendChild(errorMessage);

      setTimeout(() => {
        if (errorMessage.parentNode) {
          errorMessage.parentNode.removeChild(errorMessage);
        }
      }, 5000);

      return;
    } finally {
      setLoading(false);
    }
  };

  const processPayment = async () => {
    setLoading(true);
    setPaymentWarning("");

    try {
      // Validate cart before payment
      if (!cartItems || cartItems.length === 0) {
        throw new Error("Cart is empty. Please add items to continue.");
      }

      // Prepare payment data with proper structure
      const paymentData = {
        mobile_number: phoneNumber.replace(/\D/g, ""),
        name: formData.name.trim(),
        email: formData.email.trim(),
        address: formData.address.trim(),
        city: formData.city.trim(),
        amount: getFinalTotal(),
        total_amount: getFinalTotal(),
        currency: "INR",
        receipt: `order_${Date.now()}_${phoneNumber}`,
        items: cartItems.map((item) => ({
          product_id: item.id,
          name: item.name,
          price: item.price,
          quantity: item.quantity,
          total: item.price * item.quantity,
        })),
        user_details: {
          mobile_number: phoneNumber.replace(/\D/g, ""),
          name: formData.name.trim(),
          email: formData.email.trim(),
          address: formData.address.trim(),
          city: formData.city.trim(),
        },
      };

      

      // 🔥 Get billing address ID - from state or localStorage as fallback
      let currentBillingAddressId =
        billingAddressId || localStorage.getItem("billingAddressId");

      // If still no billing address, try to fetch it
      if (!currentBillingAddressId) {
        
        try {
          const addressRes = await fetch(
            "https://backend.corelens.in/api/app/address?limit=50",
            {
              method: "GET",
              headers: {
                Authorization: `Bearer ${getCurrentToken()}`,
                Accept: "application/json",
              },
            },
          );
          const addressJson = await addressRes.json();
          let addresses = [];
          if (Array.isArray(addressJson?.data?.docs)) {
            addresses = addressJson.data.docs;
          } else if (Array.isArray(addressJson?.data)) {
            addresses = addressJson.data;
          }
          const foundAddress =
            addresses.find((a) => a.defaultAddress === true) ||
            addresses[addresses.length - 1];
          if (foundAddress && (foundAddress._id || foundAddress.id)) {
            currentBillingAddressId = foundAddress._id || foundAddress.id;
            setBillingAddressId(currentBillingAddressId);
            localStorage.setItem("billingAddressId", currentBillingAddressId);
            console.log(
              "🔥 Fetched billing address ID:",
              currentBillingAddressId,
            );
          }
        } catch (addrErr) {
          
        }
      }

      if (!currentBillingAddressId) {
        throw new Error(
          "Billing address not found. Please add an address first.",
        );
      }

      // 🔥 CREATE RAZORPAY ORDER WITH FULL PAYLOAD
      const razorpayOrderPayload = {
        amount: getFinalTotal(),
        products: cartItems.map((item) => ({
          product_id: item.id.split("-")[0],
          quantity: item.quantity,
        })),
        convenience_fee: 0,
        delivery_fee: 0,
        net_amount: getFinalTotal(),
        billing_address_id: currentBillingAddressId,
        payment_method: "Online",
        tax: getGSTAmount(),
      };

      console.log(
        "🔥 Creating Razorpay order with payload:",
        razorpayOrderPayload,
      );

      const paymentToken = getCurrentToken();
      if (!paymentToken)
        throw new Error("Authentication required. Please login again.");

      // Call backend to create Razorpay order
      const razorpayResponse = await fetch(
        "https://backend.corelens.in/api/app/test/checkout",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${paymentToken}`,
            Accept: "application/json",
          },
          body: JSON.stringify(razorpayOrderPayload),
        },
      );

      const orderData = await razorpayResponse.json();
      
      console.log(
        "🔥 Response status:",
        razorpayResponse.status,
        razorpayResponse.statusText,
      );

      if (!razorpayResponse.ok || !orderData.success) {
        const errorMsg =
          orderData?.message ||
          orderData?.error ||
          JSON.stringify(orderData) ||
          "Failed to create Razorpay order";
        console.error(
          "🔥 Razorpay order creation failed:",
          errorMsg,
          orderData,
        );
        throw new Error(errorMsg);
      }

      if (!orderData.order || !orderData.order.id)
        throw new Error("Invalid Razorpay order response from server");

      // Step 2: Initialize Razorpay
      const razorpayOptions = {
        // Razorpay key from backend (preferred) or fallback to test key
        key: orderData.key_id || orderData.key || "rzp_test_RBxTR01ZyYPaUV",
        // Order id created by backend (Razorpay order id)
        order_id: orderData.order.id,
        // Amount in paise (backend may already return paise)
        amount: orderData.order.amount || getFinalTotal() * 100,
        currency: orderData.order.currency || "INR",
        name: "Corelens",
        description: "Smart Security Solutions - Your Order",
        prefill: {
          name: formData.name.trim(),
          email: formData.email.trim(),
          address: formData.address.trim(),
          contact: phoneNumber.replace(/\D/g, ""),
        },
        notes: {
          receipt: paymentData.receipt || `order_${Date.now()}`,
        },

        handler: async function (response) {
          // // 🔥 PREVENT DUPLICATE - CHECK AT THE VERY START
          // const orderPostedKey = `orderPosted_${response.razorpay_order_id}`;
          // if (localStorage.getItem(orderPostedKey)) {
          //   console.warn(
          //     "⚠️ Order already posted for this Razorpay order ID. Handler triggered again. Preventing duplicate.",
          //   );
          //   await Swal.fire({
          //     title: "Order Already Processed",
          //     text: "Your order has already been registered. Redirecting...",
          //     icon: "info",
          //     timer: 2000,
          //     showConfirmButton: false,
          //   });
          //   window.location.href =
          //     window.location.origin + "/checkout-success";
          //   return;
          // }

          // // 🔥 SET LOCK IMMEDIATELY - Prevent handler re-entry even if triggered multiple times
          // try {
          //   localStorage.setItem(orderPostedKey, "processing");
          //   
          // } catch (e) {
          //   
          // }

          // Disable payment button to prevent double-click
          setLoading(true);

          try {
            // Verify payment with backend first
            const backendresponse = await fetch(
              `https://backend.corelens.in/api/app/test/paymentverificationweb`,
              {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                  Authorization: `Bearer ${getCurrentToken()}`,
                  Accept: "application/json",
                },
                body: JSON.stringify(response),
              },
            );

            const backendData = await backendresponse.json();
            if (
              /* check backendData for success */ backendresponse.ok &&
              backendData.success
            ) {
              // Clear cart and notify app
              setCartItems([]);
              localStorage.removeItem("cartItems");
              localStorage.removeItem("cartLastUpdated");
              window.dispatchEvent(
                new CustomEvent("cartUpdated", { detail: [] }),
              );

              // Show success and redirect to success page
              await Swal.fire({
                title: "Payment Successful!",
                text: "Your order has been placed successfully.",
                icon: "success",
                timer: 2500,
                showConfirmButton: false,
              });

              window.location.href =
                window.location.origin + "/checkout-success";

              //   // 🔥 EXTRA PROTECTION: Check if we already tried to create order (using payment_id instead of order_id)
              //   const paymentIdKey = `orderCreatedWithPaymentId_${response.razorpay_payment_id}`;
              //   if (localStorage.getItem(paymentIdKey)) {
              //     console.warn(
              //       "🔥 Order already created with this payment ID. Preventing duplicate.",
              //       response.razorpay_payment_id,
              //     );
              //     await Swal.fire({
              //       title: "Payment Already Processed",
              //       text: "This payment has already been registered. Redirecting...",
              //       icon: "info",
              //       timer: 2000,
              //       showConfirmButton: false,
              //     });
              //     window.location.href =
              //       window.location.origin + "/checkout-success";
              //     return;
              //   }

              //   // Payment verified by backend — now register order in Corelens (ONLY ONCE due to lock)
              //   try {
              //     // 🔥 SET PAYMENT ID LOCK BEFORE MAKING API CALL
              //     try {
              //       localStorage.setItem(paymentIdKey, "processing");
              //       console.log(
              //         "🔐 Payment ID lock set for:",
              //         response.razorpay_payment_id,
              //       );
              //     } catch (e) {
              //       
              //     }

              //     const productsPayload = (cartItems || []).map((item) => ({
              //       product_id: item.id.split("-")[0],
              //       quantity: item.quantity,
              //     }));

              //     const totalAmount = getFinalTotal();
              //     const tax = getGSTAmount();

              //     const billingAddressId =
              //       (activeAddress && (activeAddress._id || activeAddress.id)) ||
              //       localStorage.getItem("billingAddressId") ||
              //       undefined;

              //     const orderPayload = {
              //       products: productsPayload,
              //       billing_address_id: billingAddressId || undefined,
              //       shipping_address_id: billingAddressId || undefined,
              //       payment_method: "Online",
              //       amount: totalAmount,
              //       tax: tax,
              //       delivery_fee: 0,
              //       convenience_fee: 0,
              //       net_amount: totalAmount,
              //       razorpay_order_id: response.razorpay_order_id,
              //       razorpay_payment_id: response.razorpay_payment_id,
              //       razorpay_signature: response.razorpay_signature,
              //     };

              //     console.log(
              //       "🔥 [IMPORTANT] Creating order with payment_id:",
              //       response.razorpay_payment_id,
              //       "Payload:",
              //       orderPayload,
              //     );

              //     const token = getCurrentToken();
              //     if (!token)
              //       throw new Error(
              //         "Authentication required. Please login again.",
              //       );

              //     const orderResp = await fetch(
              //       "https://backend.corelens.in/api/app/order",
              //       {
              //         method: "POST",
              //         headers: {
              //           "Content-Type": "application/json",
              //           Authorization: `Bearer ${token}`,
              //           Accept: "application/json",
              //         },
              //         body: JSON.stringify(orderPayload),
              //       },
              //     );

              //     const orderJson = await orderResp.json().catch(() => ({}));
              //     console.log(
              //       "🔥 [IMPORTANT] /api/app/order response:",
              //       orderResp.status,
              //       orderJson,
              //     );

              //     if (!orderResp.ok || !orderJson.success) {
              //       // If order registration fails, surface the error and do NOT redirect
              //       const msg = orderJson?.message || "Failed to register order";
              //       await Swal.fire({
              //         icon: "error",
              //         title: "Order Registration Failed",
              //         text: msg,
              //       });
              //       
              //       // Clear payment ID lock on failure so user can retry
              //       try {
              //         localStorage.removeItem(paymentIdKey);
              //       } catch (e) {}
              //       setLoading(false);
              //       return;
              //     }

              //     // Mark payment ID as successfully processed
              //     try {
              //       localStorage.setItem(paymentIdKey, "1");
              //       
              //     } catch (e) {}

              //     // 🔥 Mark this order as posted to avoid duplicate posts
              //     try {
              //       localStorage.setItem(
              //         `orderPosted_${response.razorpay_order_id}`,
              //         "1",
              //       );
              //       // Also mark Corelens order as created
              //       localStorage.setItem(
              //         `corelensOrderCreated_${response.razorpay_order_id}`,
              //         "1",
              //       );
              //     } catch (e) {}

              //     // Clear cart and notify app
              //     setCartItems([]);
              //     localStorage.removeItem("cartItems");
              //     localStorage.removeItem("cartLastUpdated");
              //     window.dispatchEvent(
              //       new CustomEvent("cartUpdated", { detail: [] }),
              //     );

              //     // Show success and redirect to success page
              //     await Swal.fire({
              //       title: "Payment Successful!",
              //       text: "Your order has been placed successfully.",
              //       icon: "success",
              //       timer: 2500,
              //       showConfirmButton: false,
              //     });

              //     window.location.href =
              //       window.location.origin + "/checkout-success";
              //   } catch (err) {
              //     
              //     await Swal.fire({
              //       icon: "error",
              //       title: "Order Save Error",
              //       text: "Payment succeeded but there was an issue saving your order. Please contact support.",
              //     });
              //   }
            } else if (
              !backendresponse.ok ||
              (backendresponse.ok && !backendData.success)
            ) {
              // failure flow
              await Swal.fire({
                icon: "error",
                title: "Payment Verification Failed",
                text: backendData?.message || "Payment verification failed",
              });
              setLoading(false);
              // // 🔥 CLEAR LOCK ON FAILURE - User can try again
              // try {
              //   localStorage.removeItem(orderPostedKey);
              //   
              // } catch (e) {}
            }
          } catch (handlerError) {
            
            await Swal.fire({
              icon: "error",
              title: "Payment Error",
              text:
                handlerError.message ||
                "An error occurred during payment processing",
            });
            setLoading(false);
            // // 🔥 CLEAR LOCK ON ERROR - User can try again
            // try {
            //   localStorage.removeItem(orderPostedKey);
            //   
            // } catch (e) {}
          }
        },

        modal: {
          ondismiss: async function () {
            // 
            // // 🔥 CLEAR LOCK WHEN USER CANCELS - User can try again
            // try {
            //   localStorage.removeItem(orderPostedKey);
            //   
            // } catch (e) {}
            setLoading(false);
            await Swal.fire({
              icon: "info",
              title: "Payment Cancelled",
              text: "You cancelled the payment process. You can try again.",
            });
          },
        },
      };

      
      const rzp = new window.Razorpay(razorpayOptions);
      rzp.open();
    } catch (error) {
      
      const errorMessage = error.message || "";
      if (
        errorMessage.includes("token") ||
        errorMessage.includes("expired") ||
        errorMessage.includes("unauthorized")
      ) {
        setPaymentWarning("Session expired. Please refresh and login again.");
        localStorage.removeItem("userToken");
        localStorage.removeItem("loginTimestamp");
        localStorage.removeItem("loginData");
      } else {
        await Swal.fire({
          icon: "error",
          title: "Payment Failed",
          text: error.message || "Something went wrong during payment.",
        });
        setPaymentWarning(`Payment failed: ${error.message}`);
      }
    } finally {
      setLoading(false);
    }
  };

  const handleAddressSubmit = async () => {
    try {
      setLoading(true);

      // For NEW address - save using newAddressForm data to API
      if (showAddNewForm) {
        // Validate required fields
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        // Use custom type if "Other" is selected
        const finalType = newAddressForm.isOtherSelected
          ? newAddressForm.otherType
          : newAddressForm.type;

        if (
          !newAddressForm.name?.trim() ||
          newAddressForm.name.trim().length < 2 ||
          !newAddressForm.email?.trim() ||
          !emailRegex.test(newAddressForm.email.trim()) ||
          !newAddressForm.city?.trim() ||
          newAddressForm.city.trim().length < 2 ||
          !newAddressForm.state ||
          !newAddressForm.address?.trim() ||
          newAddressForm.address.trim().length < 10 ||
          !newAddressForm.pincode?.trim() ||
          newAddressForm.pincode.trim().length !== 6 ||
          (newAddressForm.isOtherSelected && !newAddressForm.otherType?.trim())
        ) {
          let errorMsg = "Please fill all required fields correctly.";
          if (
            newAddressForm.isOtherSelected &&
            !newAddressForm.otherType?.trim()
          ) {
            errorMsg = "Please enter the address type name for 'Other'.";
          } else if (newAddressForm.address?.trim().length < 10) {
            errorMsg = "Address must be at least 10 characters long.";
          } else if (
            newAddressForm.email?.trim() &&
            !emailRegex.test(newAddressForm.email.trim())
          ) {
            errorMsg = "Please enter a valid email address.";
          } else if (
            !newAddressForm.pincode?.trim() ||
            newAddressForm.pincode.trim().length !== 6
          ) {
            errorMsg = "Pincode must be exactly 6 digits.";
          }

          Swal.fire({
            icon: "warning",
            title: "Validation Error",
            text: errorMsg,
          });
          setLoading(false);
          return;
        }

        // 🆕 NEW USER SIGNUP LOGIC
        if (isNewUser) {
          
          try {
            const signupPayload = {
              name: newAddressForm.name.trim(),
              email: newAddressForm.email.trim(),
              phone: phoneNumber,
              password: `User@${phoneNumber.slice(-4)}`,
            };

            
            const signupRes = await fetch(
              "https://backend.corelens.in/api/app/signup",
              {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(signupPayload),
              },
            );

            const signupResult = await signupRes.json();
            

            if (signupRes.ok && signupResult.data?.accessToken) {
              const newToken = signupResult.data.accessToken;
              setUserToken(newToken);
              localStorage.setItem("userToken", newToken);
              

              // 🔥 CRITICAL: Update the token variable to be used in the address API call below
              const addressToken = newToken;

              const addressPayload = {
                name: newAddressForm.name.trim(),
                email: newAddressForm.email?.trim() || formData.email,
                address: newAddressForm.address.trim(),
                city: newAddressForm.city.trim(),
                state: newAddressForm.state,
                phone: newAddressForm.phone?.replace("+91", "") || phoneNumber,
                type: finalType || "Home",
                pincode: newAddressForm.pincode?.trim(),
                defaultAddress: true,
              };

              console.log(
                "📡 Saving NEW address with NEW token:",
                addressPayload,
              );
              const res = await fetch(
                "https://backend.corelens.in/api/app/address",
                {
                  method: "POST",
                  headers: {
                    Authorization: `Bearer ${addressToken}`,
                    "Content-Type": "application/json",
                  },
                  body: JSON.stringify(addressPayload),
                },
              );

              const result = await res.json();
              if (res.ok) {
                // Success path for new user
                const newAddress = result.data;
                const newAddressId = newAddress._id || newAddress.id;
                setFormData({
                  name: newAddress.name,
                  email: formData.email || "",
                  address: newAddress.address,
                  city: newAddress.city,
                  state: newAddress.state,
                });
                setBillingAddressId(newAddressId);
                localStorage.setItem("billingAddressId", newAddressId);
                setSelectedAddressId(newAddressId);
                await loadSavedAddresses();
                setShowAddNewForm(false);
                setIsNewUser(false); // ✅ Mark signup complete - enable address steps
                setCurrentStep(1);
                setCompletedSteps((prev) => [
                  ...prev.filter((s) => s !== 1),
                  1,
                ]);
                Swal.fire({
                  icon: "success",
                  title: "Success",
                  text: "Registered and address saved!",
                  timer: 2000,
                  showConfirmButton: false,
                });
                return; // Exit after successful dual-action
              }
            } else if (signupRes.status === 409) {
              
            }
          } catch (err) {
            
          }
        }

        // Validate Pincode using external API
        const pincode = newAddressForm.pincode?.trim();
        if (
          !pincode ||
          pincode.length !== 6 ||
          !/^[1-9][0-9]{5}$/.test(pincode)
        ) {
          Swal.fire({
            icon: "error",
            title: "Invalid Pincode",
            text: "Please enter a valid 6-digit Indian pincode.",
          });
          setLoading(false);
          return;
        }

        try {
          const pincodeRes = await fetch(
            `https://api.postalpincode.in/pincode/${pincode}`,
          );
          const pincodeData = await pincodeRes.json();
          if (!pincodeData || pincodeData[0].Status !== "Success") {
            Swal.fire({
              icon: "error",
              title: "Invalid Pincode",
              text: "The pincode you entered is invalid according to Indian Post records.",
            });
            setLoading(false);
            return;
          }
        } catch (err) {
          console.warn(
            "Pincode verification API failed, proceeding with manual validation",
          );
        }

        const token = userToken || localStorage.getItem("userToken");
        // Prepare address payload with user-provided pincode
        const addressPayload = {
          name: newAddressForm.name.trim(),
          email: newAddressForm.email?.trim() || formData.email,
          address: newAddressForm.address.trim(),
          city: newAddressForm.city.trim(),
          state: newAddressForm.state,
          phone: newAddressForm.phone?.replace("+91", "") || phoneNumber,
          type: finalType || "Home",
          pincode: newAddressForm.pincode?.trim(),
          defaultAddress: true,
        };

        
        const res = await fetch("https://backend.corelens.in/api/app/address", {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify(addressPayload),
        });

        const result = await res.json();
        

        if (res.ok && result.data) {
          const newAddress = result.data;
          const newAddressId = newAddress._id || newAddress.id;

          // Update formData with the new address
          setFormData({
            name: newAddress.name,
            email: formData.email || "",
            address: newAddress.address,
            city: newAddress.city,
            state: newAddress.state,
          });

          // Set billing address ID
          setBillingAddressId(newAddressId);
          localStorage.setItem("billingAddressId", newAddressId);
          setSelectedAddressId(newAddressId);

          // Refresh address list from API
          await loadSavedAddresses();

          // Clear form and hide it
          setNewAddressForm({
            name: "",
            address: "",
            city: "",
            state: "",
            pincode: "",
            type: "Home",
            otherType: "",
            isOtherSelected: false,
            submitToSave: false,
          });
          setShowAddNewForm(false);

          // Move back to Delivery Address step with updated list
          setCurrentStep(1);
          setCompletedSteps((prev) => [...prev.filter((s) => s !== 1), 1]);

          Swal.fire({
            icon: "success",
            title: "Success",
            text: "Address saved successfully!",
            timer: 2000,
            showConfirmButton: false,
          });
        } else {
          Swal.fire({
            icon: "error",
            title: "Error",
            text: result.message || "Failed to save address",
          });
        }
      } else {
        // Fallback for existing selection
        saveAddressData();
      }
    } catch (error) {
      
      Swal.fire({
        icon: "error",
        title: "Error",
        text: error.message,
      });
    } finally {
      setLoading(false);
    }
  };

  const handleContinueToPayment = () => {
    // Explicitly set the step to 3 to show payment options
    console.log("🚀 Explicitly triggering payment step (Step 3)");
    setCurrentStep(3);
    setEditingStep(3);
    setShowPaymentSelection(true);
    setPaymentWarning("");
  };

  const handlePaymentMethodSelect = async (method) => {
    const token = getCurrentToken();

    // Explicitly find the address again to ensure it's available for validation
    const currentBillingAddress = savedAddresses.find(
      (addr) =>
        (addr._id || addr.id) === (billingAddressId || selectedAddressId),
    );

    if (method === "online") {
      setShowPaymentSelection(false);
      setSelectedPaymentMethod(method);
      processPayment();
    } else if (method === "cod") {
      // Inline validation for COD
      if (!currentBillingAddress) {
        Swal.fire({
          icon: "warning",
          title: "Address Required",
          text: "Please select a delivery address first.",
        });
        setCurrentStep(1);
        setEditingStep(1);
        setShowPaymentSelection(false);
        return;
      }
      if (!token) {
        Swal.fire({
          icon: "warning",
          title: "Login Required",
          text: "Please login to place an order.",
        });
        setCurrentStep(0);
        setEditingStep(0);
        setShowPaymentSelection(false);
        return;
      }

      // Close modal and proceed to COD processing
      setShowPaymentSelection(false);
      setSelectedPaymentMethod(method);
      await processCODPayment();
    }
  };

  const processCODPayment = async () => {
    try {
      setLoading(true);
      const currentToken = getCurrentToken();

      if (!currentToken) {
        setLoading(false);
        Swal.fire({
          icon: "warning",
          title: "Login Required",
          text: "Your session has expired. Please login again.",
        });
        setCurrentStep(0);
        return;
      }

      // 1. Re-fetch address list to get the latest backend _id
      
      const addressRes = await fetch(
        "https://backend.corelens.in/api/app/address?page=1&limit=50",
        {
          headers: {
            Authorization: `Bearer ${currentToken}`,
            "Content-Type": "application/json",
          },
        },
      );

      if (!addressRes.ok) {
        throw new Error("Failed to fetch address list from server");
      }

      const addressData = await addressRes.json();
      let addressList = [];
      if (addressData.data?.docs && Array.isArray(addressData.data.docs)) {
        addressList = addressData.data.docs;
      } else if (Array.isArray(addressData.data)) {
        addressList = addressData.data;
      }

      if (addressList.length === 0) {
        setLoading(false);
        Swal.fire({
          icon: "warning",
          title: "Address Required",
          text: "Please add a delivery address before placing an order.",
        });
        setCurrentStep(1);
        return;
      }

      // 2. Pick the correct address _id
      // Priority: 1. selectedAddressId (from UI) 2. default address 3. first address in list
      let latestAddress = addressList.find(
        (a) => (a._id || a.id) === selectedAddressId,
      );

      if (!latestAddress) {
        console.log(
          "📍 Selected address not found in list, falling back to default/first",
        );
        latestAddress =
          addressList.find((a) => a.defaultAddress) || addressList[0];
      }

      const finalAddressId = latestAddress._id || latestAddress.id;

      if (!finalAddressId) {
        throw new Error(
          "Could not resolve backend address ID. Please select or add an address.",
        );
      }

      

      // 3. Resolve amounts
      const subtotalValue = getSubtotal();
      const promoDiscount = getPromoDiscount();
      const amountAfterDiscount = subtotalValue - promoDiscount;
      // BACKEND FIX: tax is 18%, delivery_fee is 0
      const taxAmount = Number((amountAfterDiscount * 0.18).toFixed(2));
      const finalTotalAmount = Number(
        (amountAfterDiscount + taxAmount).toFixed(2),
      );

      // Use correct product structure for backend
      const orderProducts = cartItems.map((item) => ({
        product_id: item.id ? item.id.split("-")[0] : item._id,
        quantity: Number(item.quantity) || 1,
      }));

      // 4. Generate dynamic trx_ref_no
      const random10Digit = Math.floor(1000000000 + Math.random() * 9000000000);

      const orderPayload = {
        amount: Number(subtotalValue),
        products: orderProducts,
        net_amount: finalTotalAmount,
        tax: taxAmount,
        delivery_fee: 0,
        billing_address_id: finalAddressId,
        shipping_address_id: finalAddressId,
        payment_method: "COD",
        payment_mode: "COD",
        payment_status: "PENDING",
        trx_ref_no: `pymt-${random10Digit}`,
      };

      console.log(
        "🚀 [COD DEBUG] Sending Verified Payload:",
        JSON.stringify(orderPayload, null, 2),
      );

      // 5. Place order
      console.log(
        "🚀 [COD DEBUG] Request URL: https://backend.corelens.in/api/app/order",
      );
      const response = await fetch(
        "https://backend.corelens.in/api/app/order",
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${currentToken}`,
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          body: JSON.stringify(orderPayload),
        },
      );

      const result = await response.json();
      

      if (
        response.ok &&
        (result.success === true || result.success === "true")
      ) {
        localStorage.removeItem("cartItems");
        localStorage.removeItem("cartLastUpdated");
        localStorage.removeItem("cart");
        setCartItems([]);
        window.dispatchEvent(new Event("cartUpdated"));

        await Swal.fire({
          icon: "success",
          title: "Order Placed Successfully!",
          text: "Your order has been placed. Please pay at delivery.",
          confirmButtonText: "OK",
          confirmButtonColor: "#fb641b",
        }).then((result) => {
          if (result.isConfirmed) {
            window.location.href = "/checkout-success";
          }
        });
      } else {
        throw new Error(result.message || "Backend rejected order creation");
      }
    } catch (error) {
      
      Swal.fire({
        icon: "error",
        title: "Order Failed",
        text:
          error.message || "Something went wrong while placing your COD order.",
      });
    } finally {
      setLoading(false);
    }
  };

  const renderLoginStep = () => {
    const isCompleted = isStepCompleted(0);
    const isEditing = editingStep === 0;

    if (isCompleted && !isEditing) {
      return (
        <div className="step-content-panel">
          <div className="completed-login-display">
            <div className="login-name-phone">
              <div className="login-name">{formData.name || "User"}</div>
              <div className="login-phone">+91{phoneNumber}</div>
            </div>
            <button className="change-btn" onClick={() => handleEditStep(0)}>
              CHANGE
            </button>
          </div>
        </div>
      );
    }

    return (
      <div className="step-content-panel">
        <div className="phone-input-section">
          <div className={`phone-input-group ${phoneError ? "error" : ""}`}>
            <span className="country-code">+91</span>
            <input
              type="tel"
              className="phone-input"
              placeholder="Enter mobile number"
              value={phoneNumber}
              onChange={(e) =>
                setPhoneNumber(e.target.value.replace(/\D/g, "").slice(0, 10))
              }
              maxLength="10"
            />
          </div>
          {phoneError && <div className="error-message">{phoneError}</div>}

          {showOTP && (
            <div className={`otp-section ${showOTP ? "visible" : ""}`}>
              <div className="otp-message">
                <p
                  style={{
                    color: "#333",
                    fontSize: "1.4rem",
                    marginBottom: "0.5rem",
                  }}
                >
                  4 digit OTP has been sent to +91 {phoneNumber}
                </p>
                <p
                  style={{
                    color: "#666",
                    fontSize: "1.2rem",
                    marginBottom: "1.5rem",
                  }}
                ></p>
              </div>
              <input
                type="text"
                className="otp-input-field"
                placeholder="Enter OTP"
                value={otp}
                onChange={(e) => {
                  const val = e.target.value.replace(/\D/g, "").slice(0, 6);
                  setOTP(val);
                  if (otpError) setOtpError("");
                }}
                maxLength="6"
                autoFocus
                style={{
                  width: "100%",
                  padding: "1.2rem 1.5rem",
                  border: "2px solid #e0e0e0",
                  borderRadius: "0.8rem",
                  fontSize: "1.6rem",
                  textAlign: "center",
                  letterSpacing: "0.3rem",
                  fontWeight: "600",
                  background: "#fff",
                  color: "#333",
                  marginBottom: "1rem",
                }}
              />
              {otpError && (
                <div
                  className="error-message"
                  style={{
                    color: "#f44336",
                    fontSize: "1.2rem",
                    marginBottom: "1rem",
                  }}
                >
                  {otpError}
                </div>
              )}
              <button
                type="button"
                className="resend-otp-btn"
                onClick={handlePhoneSubmit}
                style={{
                  marginTop: "1rem",
                  fontSize: "1.2rem",
                  color: "#007bff",
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                  textDecoration: "underline",
                }}
              >
                Resend OTP
              </button>
            </div>
          )}
        </div>

        {!showOTP ? (
          <button
            className="continue-btn"
            onClick={handlePhoneSubmit}
            disabled={!phoneNumber || phoneNumber.length !== 10 || loading}
          >
            {loading ? "SENDING OTP..." : "CONTINUE"}
          </button>
        ) : (
          <button
            className="continue-btn"
            onClick={handleOTPSubmit}
            disabled={!otp || otp.length < 3 || loading}
          >
            {loading ? "VERIFYING..." : "VERIFY & CONTINUE"}
          </button>
        )}
      </div>
    );
  };

  // ✅ NEW USER SIGNUP FORM (Step 1 for new users)
  const renderSignupStep = () => {
    if (!isStepActive(1) || !isNewUser) {
      return null;
    }

    return (
      <div className="step-content-panel">
        <div className="add-address-form-wrapper">
          <h4 className="add-address-title">COMPLETE YOUR PROFILE</h4>
          <form className="add-address-form">
            <div
              style={{
                background: "#e3f2fd",
                color: "#0d47a1",
                padding: "1rem",
                borderRadius: "0.5rem",
                marginBottom: "1.5rem",
                fontSize: "1.3rem",
                fontWeight: "500",
                borderLeft: "4px solid #1976d2",
              }}
            >
              👋 Please register your details to continue
            </div>

            {/* Mobile Number - Read Only */}
            <div className="form-group">
              <input
                type="text"
                className="form-input readonly-input"
                placeholder="Mobile Number"
                value={`+91 ${phoneNumber}`}
                readOnly
                style={{
                  background: "#f5f5f5",
                  cursor: "not-allowed",
                  opacity: 1,
                }}
              />
            </div>

            {/* Name and Email Row */}
            <div className="form-row">
              <div className="form-group">
                <input
                  type="text"
                  className="form-input"
                  placeholder="Full Name"
                  value={newAddressForm.name || ""}
                  onChange={(e) =>
                    setNewAddressForm({
                      ...newAddressForm,
                      name: e.target.value,
                    })
                  }
                />
              </div>
              <div className="form-group">
                <input
                  type="email"
                  className="form-input"
                  placeholder="Email Address"
                  value={newAddressForm.email || ""}
                  onChange={(e) =>
                    setNewAddressForm({
                      ...newAddressForm,
                      email: e.target.value,
                    })
                  }
                />
              </div>
            </div>

            {/* City */}
            <div className="form-group">
              <input
                type="text"
                className="form-input"
                placeholder="City"
                value={newAddressForm.city || ""}
                onChange={(e) =>
                  setNewAddressForm({
                    ...newAddressForm,
                    city: e.target.value,
                  })
                }
              />
            </div>

            {/* Sign Up Button */}
            <div className="form-buttons">
              <button
                type="button"
                className="save-address-btn"
                onClick={async () => {
                  // Validate form
                  if (!newAddressForm.name?.trim()) {
                    Swal.fire({ icon: "warning", title: "Name required" });
                    return;
                  }
                  if (
                    !newAddressForm.email?.trim() ||
                    !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(newAddressForm.email)
                  ) {
                    Swal.fire({
                      icon: "warning",
                      title: "Valid email required",
                    });
                    return;
                  }
                  if (!newAddressForm.city?.trim()) {
                    Swal.fire({ icon: "warning", title: "City required" });
                    return;
                  }

                  setLoading(true);
                  try {
                    const signupPayload = {
                      name: newAddressForm.name.trim(),
                      email: newAddressForm.email.trim(),
                      phone: phoneNumber,
                      city: newAddressForm.city.trim(),
                      mobile_number: phoneNumber,
                    };

                    

                    const signupRes = await fetch(
                      "https://backend.corelens.in/api/app/signup",
                      {
                        method: "POST",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify(signupPayload),
                      },
                    );

                    const signupResult = await signupRes.json();
                    

                    if (signupRes.ok && signupResult.data?.accessToken) {
                      const newToken = signupResult.data.accessToken;
                      setUserToken(newToken);
                      localStorage.setItem("userToken", newToken);
                      localStorage.setItem("userPhone", phoneNumber);
                      localStorage.setItem("userVerified", "true");
                      localStorage.setItem(
                        "loginTimestamp",
                        Date.now().toString(),
                      );

                      // ✅ Signup complete - move to ADD NEW ADDRESS
                      setIsNewUser(false);
                      setCompletedSteps([0, 1]);
                      setCurrentStep(2);
                      setShowAddNewForm(true);

                      // Pre-fill address form
                      setNewAddressForm({
                        name: newAddressForm.name.trim(),
                        email: newAddressForm.email.trim(),
                        address: "",
                        city: newAddressForm.city.trim(),
                        state: newAddressForm.state || "",
                        phone: phoneNumber,
                        type: "Home",
                        pincode: "",
                      });

                      // ✅ CRITICAL: Dispatch login event to notify header about login
                      window.dispatchEvent(
                        new CustomEvent("userLoggedIn", {
                          detail: {
                            phone: phoneNumber,
                            token: newToken,
                            verificationToken: newToken,
                            isVerified: true,
                          },
                        }),
                      );

                      Swal.fire({
                        icon: "success",
                        title: "Registration Successful!",
                        text: "Now please fill in your delivery address.",
                        timer: 2000,
                        showConfirmButton: false,
                      });
                    } else {
                      Swal.fire({
                        icon: "error",
                        title: "Signup Failed",
                        text: signupResult.message || "Try again",
                      });
                    }
                  } catch (err) {
                    
                    Swal.fire({
                      icon: "error",
                      title: "Error",
                      text: err.message,
                    });
                  } finally {
                    setLoading(false);
                  }
                }}
                disabled={loading}
                style={{
                  background: loading ? "#ccc" : "#fb641b",
                  cursor: loading ? "not-allowed" : "pointer",
                }}
              >
                {loading ? "REGISTERING..." : "SIGN UP"}
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  };

  const renderAddNewAddressStep = () => {
    if (!isStepActive(2) && !showAddNewForm) {
      return null;
    }

    return (
      <div className="step-content-panel">
        <div className="add-address-form-wrapper">
          <h4 className="add-address-title">ADD A NEW ADDRESS</h4>
          <form className="add-address-form">
            {isNewUser && (
              <div
                className="new-user-welcome-msg"
                style={{
                  background: "#e3f2fd",
                  color: "#0d47a1",
                  padding: "1rem",
                  borderRadius: "0.5rem",
                  marginBottom: "1.5rem",
                  fontSize: "1.3rem",
                  fontWeight: "500",
                  borderLeft: "4px solid #1976d2",
                }}
              >
                👋 As a new user, please register your details below
              </div>
            )}
            <div className="form-row">
              <div className="form-group">
                <input
                  type="text"
                  className="form-input"
                  placeholder="Name"
                  value={newAddressForm.name || ""}
                  onChange={(e) =>
                    setNewAddressForm({
                      ...newAddressForm,
                      name: e.target.value,
                    })
                  }
                />
              </div>
              <div className="form-group">
                <input
                  type="email"
                  className="form-input"
                  placeholder="Email Address"
                  value={newAddressForm.email || ""}
                  onChange={(e) =>
                    setNewAddressForm({
                      ...newAddressForm,
                      email: e.target.value,
                    })
                  }
                />
              </div>
            </div>
            <div className="form-row">
              <div className="form-group">
                <input
                  type="text"
                  className="form-input readonly-input"
                  placeholder={`+91${phoneNumber}`}
                  value={`+91${phoneNumber}`}
                  readOnly
                />
              </div>
              <div className="form-group">
                <input
                  type="text"
                  className="form-input"
                  placeholder="Pincode"
                  value={newAddressForm.pincode || ""}
                  onChange={(e) =>
                    setNewAddressForm({
                      ...newAddressForm,
                      pincode: e.target.value,
                    })
                  }
                />
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <select
                  className="form-input"
                  value={newAddressForm.state || ""}
                  onChange={(e) =>
                    setNewAddressForm({
                      ...newAddressForm,
                      state: e.target.value,
                    })
                  }
                >
                  <option value="">--Select State--</option>
                  {INDIA_STATES.map((state) => (
                    <option key={state} value={state}>
                      {state}
                    </option>
                  ))}
                </select>
              </div>
              <div className="form-group">
                <input
                  type="text"
                  className="form-input"
                  placeholder="City"
                  value={newAddressForm.city || ""}
                  onChange={(e) =>
                    setNewAddressForm({
                      ...newAddressForm,
                      city: e.target.value,
                    })
                  }
                />
              </div>
            </div>

            <div className="form-group">
              <textarea
                className="form-input address-textarea"
                placeholder="Address (Area and Street) - Minimum 10 characters"
                value={newAddressForm.address || ""}
                onChange={(e) =>
                  setNewAddressForm({
                    ...newAddressForm,
                    address: e.target.value,
                  })
                }
                style={{ height: "100px", resize: "none", paddingTop: "10px" }}
              />
            </div>

            <div className="address-type-section">
              <label>Address Type</label>
              <div className="radio-group">
                <div className="radio-option">
                  <input
                    type="radio"
                    name="addressType"
                    value="Home"
                    checked={newAddressForm.type === "Home"}
                    onChange={(e) =>
                      setNewAddressForm({
                        ...newAddressForm,
                        type: e.target.value,
                        isOtherSelected: false,
                      })
                    }
                  />
                  <label>Home</label>
                </div>
                <div className="radio-option">
                  <input
                    type="radio"
                    name="addressType"
                    value="Work"
                    checked={newAddressForm.type === "Work"}
                    onChange={(e) =>
                      setNewAddressForm({
                        ...newAddressForm,
                        type: e.target.value,
                        isOtherSelected: false,
                      })
                    }
                  />
                  <label>Work</label>
                </div>
                <div className="radio-option">
                  <input
                    type="radio"
                    name="addressType"
                    value="Other"
                    checked={newAddressForm.type === "Other"}
                    onChange={(e) =>
                      setNewAddressForm({
                        ...newAddressForm,
                        type: e.target.value,
                        isOtherSelected: true,
                      })
                    }
                  />
                  <label>Other</label>
                </div>
              </div>

              {newAddressForm.isOtherSelected && (
                <div className="other-type-input-container">
                  <input
                    type="text"
                    className="form-input"
                    placeholder="other name"
                    value={newAddressForm.otherType || ""}
                    onChange={(e) =>
                      setNewAddressForm({
                        ...newAddressForm,
                        otherType: e.target.value,
                      })
                    }
                  />
                  <div className="submit-checkbox-container">
                    <input
                      type="checkbox"
                      id="submitToSave"
                      checked={newAddressForm.submitToSave || false}
                      onChange={(e) =>
                        setNewAddressForm({
                          ...newAddressForm,
                          submitToSave: e.target.checked,
                        })
                      }
                    />
                    <label htmlFor="submitToSave">Submit</label>
                  </div>
                </div>
              )}
            </div>

            <div className="form-buttons">
              <button
                type="button"
                className="save-address-btn"
                onClick={handleAddressSubmit}
                disabled={
                  loading ||
                  (isNewUser &&
                    (!newAddressForm.name?.trim() ||
                      newAddressForm.name.trim().length < 2 ||
                      !newAddressForm.email?.trim() ||
                      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(
                        newAddressForm.email.trim(),
                      ) ||
                      !newAddressForm.city?.trim() ||
                      newAddressForm.city.trim().length < 2 ||
                      !newAddressForm.state ||
                      !newAddressForm.address?.trim() ||
                      newAddressForm.address.trim().length < 10 ||
                      !newAddressForm.pincode?.trim() ||
                      newAddressForm.pincode.trim().length !== 6))
                }
                style={{
                  background:
                    loading ||
                    (isNewUser &&
                      (!newAddressForm.name?.trim() ||
                        newAddressForm.name.trim().length < 2 ||
                        !newAddressForm.email?.trim() ||
                        !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(
                          newAddressForm.email.trim(),
                        ) ||
                        !newAddressForm.city?.trim() ||
                        newAddressForm.city.trim().length < 2 ||
                        !newAddressForm.state ||
                        !newAddressForm.address?.trim() ||
                        newAddressForm.address.trim().length < 10 ||
                        !newAddressForm.pincode?.trim() ||
                        newAddressForm.pincode.trim().length !== 6))
                      ? "#ccc"
                      : "#fb641b",
                  cursor: loading ? "not-allowed" : "pointer",
                  opacity: 1,
                }}
              >
                {loading
                  ? "SAVING..."
                  : isNewUser
                    ? "SIGN UP & SAVE"
                    : "SAVE ADDRESS"}
              </button>
              <button
                type="button"
                className="cancel-btn"
                onClick={() => {
                  setShowAddNewForm(false);
                  setNewAddressForm({
                    name: "",
                    address: "",
                    city: "",
                    state: "",
                    pincode: "",
                    type: "Home",
                  });
                }}
              >
                CANCEL
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  };

  const renderAddressStep = () => {
    const isCompleted = isStepCompleted(1);
    const isEditing = editingStep === 1;

    if (isCompleted && !isEditing && !showAddNewForm) {
      return (
        <div className="step-content-panel">
          <div className="completed-address-display">
            <div className="selected-address-card">
              <div className="address-name">{formData.name}</div>
              <div className="address-phone">+91{phoneNumber}</div>
              <div className="address-text">{formData.address}</div>
              <div className="address-location">
                {formData.city} - {formData.state}
              </div>
            </div>
            <button className="edit-btn" onClick={() => handleEditStep(1)}>
              Edit
            </button>
          </div>
        </div>
      );
    }

    return (
      <div className="step-content-panel">
        {profileLoading && (
          <div className="profile-loading">🔄 Loading your addresses...</div>
        )}

        {/* Saved Addresses List */}
        {!isNewUser && (
          <div className="saved-addresses-section">
            {(showAllAddresses
              ? savedAddresses
              : savedAddresses.slice(0, 3)
            ).map((addr, idx) => (
              <div
                key={addr._id || addr.id || idx}
                className="address-radio-card"
                onClick={() => {
                  setSelectedAddressId(addr._id || addr.id);
                  setBillingAddressId(addr._id || addr.id); // 🔥 Update billingAddressId
                  localStorage.setItem("billingAddressId", addr._id || addr.id);
                  handleFormChange("address", addr.address || "");
                  handleFormChange("city", addr.city || "");
                  handleFormChange("state", addr.state || "");
                  // Also update formData name/email if they exist in the address record
                  if (addr.name) handleFormChange("name", addr.name);
                  if (addr.email) handleFormChange("email", addr.email);
                  setShowAddNewForm(false);
                  console.log(
                    "🔥 Selected address and updated billingAddressId:",
                    addr._id || addr.id,
                  );
                }}
              >
                <input
                  type="radio"
                  name="deliveryAddress"
                  value={addr._id || addr.id}
                  checked={selectedAddressId === (addr._id || addr.id)}
                  onChange={() => {}}
                />
                <div className="address-card-content">
                  <div className="address-card-header">
                    <span className="address-card-name">
                      {addr.name || formData.name || "User"}
                    </span>
                    <span className="address-card-type">
                      {addr.type || "Home"}
                    </span>
                    <span className="address-card-phone">
                      {addr.mobile_number || addr.phone || phoneNumber}
                    </span>
                  </div>
                  <div className="address-card-body">
                    <div className="address-street">{addr.address}</div>
                    <div className="address-city-zip">
                      {addr.city} - {addr.pincode || ""}
                    </div>
                  </div>
                </div>
              </div>
            ))}

            {savedAddresses.length > 3 && (
              <button
                className="view-all-addresses-btn"
                onClick={() => setShowAllAddresses(!showAllAddresses)}
              >
                {showAllAddresses
                  ? "▲ Hide addresses"
                  : `▼ View all ${savedAddresses.length} addresses`}
              </button>
            )}
          </div>
        )}

        {/* Continue Button - Navigate to Payment */}
        {selectedAddressId && (
          <button
            className="continue-btn"
            onClick={() => {
              setCompletedSteps([...completedSteps.filter((s) => s !== 1), 1]);
              // Move to payment (next step after address is done)
              setEditingStep(null);
            }}
            disabled={loading || profileLoading}
          >
            CONTINUE
          </button>
        )}
      </div>
    );
  };

  return (
    <div className="cart-page">
      {/* Payment Method Selection Popup */}
      {showPaymentSelection && (
        <div className="payment-modal-overlay">
          <div className="payment-modal-content">
            <div className="payment-modal-header">
              <h3>Payment Option</h3>
              <button
                className="close-modal-btn"
                onClick={() => setShowPaymentSelection(false)}
              >
                &times;
              </button>
            </div>
            <div className="payment-options-list">
              <div
                className="payment-option-card"
                onClick={() => {
                  const billingAddress = savedAddresses.find(
                    (addr) =>
                      (addr._id || addr.id) ===
                      (billingAddressId || selectedAddressId),
                  );
                  if (!billingAddress) {
                    Swal.fire({
                      icon: "warning",
                      title: "Address Required",
                      text: "Please select a delivery address first.",
                    });
                    setShowPaymentSelection(false);
                    setCurrentStep(1);
                    setEditingStep(1);
                    return;
                  }
                  handlePaymentMethodSelect("online");
                }}
              >
                <div className="option-info">
                  <span className="option-label">
                    UPI / Net Banking / Cards
                  </span>
                  <div className="payment-logos">
                    <img
                      src="/images/icons/UPI-Logo.png"
                      alt="UPI"
                      style={{ height: "12px" }}
                    />
                    <img
                      src="/images/icons/Paytm_Logo.png"
                      alt="Paytm"
                      style={{ height: "12px" }}
                    />
                    <img
                      src="/images/icons/PhonePe_Logo.png"
                      alt="PhonePe"
                      style={{ height: "15px" }}
                    />
                    <img
                      src="/images/icons/Google_Pay_Logo.png"
                      alt="GPay"
                      style={{ height: "15px" }}
                    />
                  </div>
                </div>
                <div className="option-arrow">→</div>
              </div>

              <div
                className="payment-option-card"
                onClick={() => {
                  const billingAddress = savedAddresses.find(
                    (addr) =>
                      (addr._id || addr.id) ===
                      (billingAddressId || selectedAddressId),
                  );
                  if (!billingAddress) {
                    Swal.fire({
                      icon: "warning",
                      title: "Address Required",
                      text: "Please select a delivery address first.",
                    });
                    setShowPaymentSelection(false);
                    setCurrentStep(1);
                    setEditingStep(1);
                    return;
                  }
                  handlePaymentMethodSelect("cod");
                }}
              >
                <div className="option-info">
                  <span className="option-label">COD (Cash On Delivery)</span>
                </div>
                <div className="option-checkbox">
                  <div className="checkmark-box">✓</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Hero Section */}
      <section className="cart-hero-section">
        <div className="cart-inner-container">
          <div className="cart-hero-content">
            <h1 className="cart-title">Your Cart</h1>
            <nav className="cart-breadcrumb">
              <a className="breadcrumb-link" href="/">
                home
              </a>
              <span className="breadcrumb-separator"> / </span>
              <span className="breadcrumb-current">view cart</span>
            </nav>
          </div>
        </div>
      </section>

      {/* Main Cart Content */}
      <section className="cart-page-section">
        <div className="cart-inner-container">
          <div className="cart-layout">
            {/* Left Side - Checkout Steps */}
            <div className="checkout-steps-container">
              {steps.map((step) => (
                <div
                  key={step.id}
                  className={`step-panel ${
                    isStepActive(step.id) ||
                    (step.id === 2 && isNewUser && currentStep === 2)
                      ? "active"
                      : isStepCompleted(step.id) ||
                          (step.id === 2 &&
                            isNewUser &&
                            completedSteps.includes(0))
                        ? "completed"
                        : isStepDisabled(step.id)
                          ? "disabled"
                          : ""
                  }`}
                  style={
                    step.id === 2 && isNewUser && currentStep === 2
                      ? { backgroundColor: "#1976d2", color: "white" }
                      : step.id === 2 && isNewUser && completedSteps.includes(0)
                        ? { backgroundColor: "#1976d2", color: "white" }
                        : {}
                  }
                >
                  <div
                    className="step-header"
                    onClick={() => handleStepClick(step.id)}
                  >
                    <div className="step-number-badge">{step.number}</div>
                    <h3 className="step-title">{step.title}</h3>
                  </div>

                  {step.id === 0 && renderLoginStep()}
                  {step.id === 1 && !isNewUser && renderAddressStep()}
                  {step.id === 1 && isNewUser && renderSignupStep()}
                  {step.id === 2 && renderAddNewAddressStep()}
                </div>
              ))}
            </div>

            {/* Right Side - Cart Summary */}
            <div className="cart-summary-sidebar">
              <h3 className="summary-title">Your Cart</h3>

              <div className="cart-items-list">
                {cartItems.length === 0 ? (
                  <div
                    className="empty-cart-message"
                    style={{
                      textAlign: "center",
                      padding: "3rem 2rem",
                      color: "#6c757d",
                      fontSize: "1.4rem",
                    }}
                  >
                    <div style={{ fontSize: "3rem", marginBottom: "1rem" }}>
                      🛒
                    </div>
                    <p>Your cart is empty</p>
                    <p style={{ fontSize: "1.2rem" }}>
                      Add items from our product pages to continue
                    </p>
                  </div>
                ) : (
                  cartItems.map((item) => (
                    <div key={item.id} className="cart-item-summary">
                      <button
                        className="remove-item-btn"
                        onClick={() => handleRemoveItem(item.id)}
                      >
                        ×
                      </button>
                      <div className="item-image-container">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="item-image"
                        />
                      </div>
                      <div className="item-details">
                        <h4 className="item-name">{item.name}</h4>
                        <div className="item-price-details">
                          {((item.originalPrice &&
                            item.originalPrice > item.price) ||
                            (item.mrp && item.mrp > item.price)) && (
                            <>
                              <span className="item-original-price-viewcart">
                                ₹
                                {(
                                  item.originalPrice ||
                                  item.mrp ||
                                  item.price
                                ).toLocaleString("en-IN")}
                              </span>
                              <span className="item-discount-viewcart">
                                {item.discount ||
                                  item.display_percentage ||
                                  Math.round(
                                    (((item.originalPrice ||
                                      item.mrp ||
                                      item.price) -
                                      item.price) /
                                      (item.originalPrice ||
                                        item.mrp ||
                                        item.price)) *
                                      100,
                                  )}
                                % OFF
                              </span>
                            </>
                          )}
                        </div>
                      </div>
                      <div className="item-controls-viewcart">
                        <div className="quantity-controls-viewcart">
                          <button
                            className="qty-btn-viewcart"
                            onClick={() =>
                              handleUpdateItemQuantity(
                                item.id,
                                item.quantity - 1,
                              )
                            }
                          >
                            -
                          </button>
                          <span className="qty-display-viewcart">
                            {item.quantity}
                          </span>
                          <button
                            className="qty-btn-viewcart"
                            onClick={() =>
                              handleUpdateItemQuantity(
                                item.id,
                                item.quantity + 1,
                              )
                            }
                          >
                            +
                          </button>
                        </div>
                        <div className="item-total-price-viewcart">
                          ₹
                          {Math.round(
                            item.price * item.quantity,
                          ).toLocaleString("en-IN")}
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>

              {cartItems.length > 0 && (
                <>
                  <div className="discount-section">
                    <input
                      type="text"
                      className="discount-input"
                      placeholder="Discount code"
                      value={promoCode}
                      onChange={(e) => setPromoCode(e.target.value)}
                    />
                    <button
                      className="apply-btn"
                      onClick={handleApplyPromo}
                      disabled={promoLoading}
                    >
                      {promoLoading ? "..." : "Apply"}
                    </button>
                  </div>
                  {promoError && (
                    <p
                      className="promo-error"
                      style={{
                        color: "red",
                        fontSize: "1.2rem",
                        marginTop: "5px",
                        marginLeft: "5px",
                      }}
                    >
                      {promoError}
                    </p>
                  )}

                  <div className="price-breakdown">
                    <div className="price-row">
                      <span>Subtotal</span>
                      <span>₹{getSubtotal().toLocaleString("en-IN")}</span>
                    </div>
                    {promoData && (
                      <div
                        className="price-row promo-row"
                        style={{ color: "#388e3c" }}
                      >
                        <span>Promo Discount ({promoData.code})</span>
                        <span>
                          - ₹{getPromoDiscount().toLocaleString("en-IN")}
                        </span>
                      </div>
                    )}
                    <div className="price-row gst-fee-row">
                      <span>GST Fee (18%)</span>
                      <span>₹{getGSTAmount().toLocaleString("en-IN")}</span>
                    </div>
                    <div className="price-row">
                      <span>Delivery Fee</span>
                      <span className="free-text">Free</span>
                    </div>
                    <div className="price-row total">
                      <span>Total</span>
                      <span>₹{getFinalTotal().toLocaleString("en-IN")}</span>
                    </div>
                  </div>
                </>
              )}

              <button
                className={`payment-btn ${
                  !completedSteps.includes(0) ||
                  !completedSteps.includes(1) ||
                  cartItems.length === 0
                    ? "disabled"
                    : ""
                }`}
                onClick={handleContinueToPayment}
                disabled={
                  !completedSteps.includes(0) ||
                  !completedSteps.includes(1) ||
                  loading ||
                  cartItems.length === 0
                }
              >
                {loading ? "PROCESSING..." : "CONTINUE TO PAYMENT"}
              </button>

              {paymentWarning && (
                <div className="payment-warning">
                  {paymentWarning}
                  {paymentWarning.includes("login") && (
                    <div style={{ marginTop: "1rem" }}>
                      <button
                        onClick={() => (window.location.href = "/signin")}
                        className="btn arrow h50"
                        style={{ fontSize: "1.2rem", padding: "0.8rem 1.5rem" }}
                      >
                        Login Again
                      </button>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ViewCart;
