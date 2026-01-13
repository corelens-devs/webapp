// Storage utility functions for better data persistence
export const StorageUtils = {
  // Cart management with enhanced persistence
  saveCart: (cartItems) => {
    try {
      const validItems = Array.isArray(cartItems)
        ? cartItems.filter(
            (item) =>
              item &&
              item.id &&
              item.name &&
              item.price !== undefined &&
              item.quantity > 0,
          )
        : [];

      // Multiple save attempts for reliability
      for (let attempt = 0; attempt < 3; attempt++) {
        try {
          localStorage.setItem("cartItems", JSON.stringify(validItems));
          localStorage.setItem("cartLastUpdated", Date.now().toString());

          // Verify save was successful
          const verification = localStorage.getItem("cartItems");
          if (verification === JSON.stringify(validItems)) {
            console.log(
              "💾 Cart saved to localStorage:",
              validItems.length,
              "items",
            );
            return true;
          }
        } catch (saveError) {
          console.warn(`Cart save attempt ${attempt + 1} failed:`, saveError);
          if (attempt === 2) throw saveError;
        }
      }
      return false;
    } catch (error) {
      console.error("❌ Error saving cart:", error);
      return false;
    }
  },

  loadCart: () => {
    try {
      const savedCartItems = localStorage.getItem("cartItems");
      const lastUpdated = localStorage.getItem("cartLastUpdated");

      console.log(
        "🔍 Loading cart - Raw data exists:",
        !!savedCartItems,
        "Last updated:",
        lastUpdated,
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

          console.log(
            "📦 Cart loaded from localStorage:",
            validItems.length,
            "valid items out of",
            parsedItems.length,
            "total",
          );

          // Re-save if items were filtered
          if (validItems.length !== parsedItems.length) {
            this.saveCart(validItems);
          }

          return validItems;
        }
      }
      console.log("📭 No valid cart items found in localStorage");
      return [];
    } catch (error) {
      console.error("❌ Error loading cart:", error);
      try {
        localStorage.removeItem("cartItems");
        localStorage.removeItem("cartLastUpdated");
      } catch (cleanError) {
        console.error("❌ Error cleaning corrupted cart:", cleanError);
      }
      return [];
    }
  },

  clearCart: () => {
    try {
      localStorage.removeItem("cartItems");
      localStorage.removeItem("cartLastUpdated");
      console.log("🗑️ Cart cleared from localStorage");
      return true;
    } catch (error) {
      console.error("❌ Error clearing cart:", error);
      return false;
    }
  },

  // ✅ Save complete session data from API response
  saveCompleteSession: (apiResponse, phoneNumber) => {
    try {
      const sessionData = {
        // API Response data
        accessToken: apiResponse.accessToken || apiResponse.token,
        user: apiResponse.user || {},

        // Session metadata
        phone: phoneNumber,
        isVerified: true,
        timestamp: Date.now(),
        loginTime: new Date().toISOString(),

        // Complete response for reference
        originalResponse: apiResponse,
      };

      console.log("💾 Saving complete session data:", sessionData);

      // Save to multiple keys for different access patterns
      localStorage.setItem("sessionData", JSON.stringify(sessionData));
      localStorage.setItem("loginData", JSON.stringify(sessionData));
      localStorage.setItem("userToken", sessionData.accessToken);
      localStorage.setItem("verificationToken", sessionData.accessToken);
      localStorage.setItem("userPhone", phoneNumber);
      localStorage.setItem("userVerified", "true");
      localStorage.setItem("loginTimestamp", sessionData.timestamp.toString());

      // Save user profile separately
      if (sessionData.user && Object.keys(sessionData.user).length > 0) {
        const userProfile = {
          ...sessionData.user,
          phone: sessionData.user.mobile_number || phoneNumber,
          lastUpdated: Date.now(),
        };
        localStorage.setItem("userInfo", JSON.stringify(userProfile));
        localStorage.setItem("userProfile", JSON.stringify(userProfile));
      }

      return true;
    } catch (error) {
      console.error("❌ Error saving complete session:", error);
      return false;
    }
  },

  // ✅ Load complete session data
  loadCompleteSession: () => {
    try {
      const sessionData = localStorage.getItem("sessionData");
      if (
        sessionData &&
        sessionData !== "null" &&
        sessionData !== "undefined"
      ) {
        const parsedSession = JSON.parse(sessionData);

        // Check if session is still valid (30 days)
        const sessionAge = Date.now() - parsedSession.timestamp;
        const maxAge = 30 * 24 * 60 * 60 * 1000; // 30 days

        if (sessionAge < maxAge) {
          console.log("✅ Valid session found:", {
            user: parsedSession.user?.name || "Unknown",
            phone: parsedSession.phone,
            loginTime: parsedSession.loginTime,
            daysAgo: Math.floor(sessionAge / (24 * 60 * 60 * 1000)),
          });
          return parsedSession;
        } else {
          console.log("⚠️ Session expired, clearing...");
          this.clearCompleteSession();
          return null;
        }
      }
      return null;
    } catch (error) {
      console.error("❌ Error loading session:", error);
      return null;
    }
  },

  // ✅ Clear complete session (preserving cart)
  clearCompleteSession: () => {
    try {
      // 🛒 PRESERVE CART ITEMS - Save cart before clearing session
      const preservedCartItems = localStorage.getItem("cartItems");
      const preservedCartUpdated = localStorage.getItem("cartLastUpdated");
      console.log(
        "🛒 Storage: Preserving cart during session clear:",
        preservedCartItems ? "Found cart data" : "No cart data",
      );

      const keysToRemove = [
        "sessionData",
        "loginData",
        "userToken",
        "verificationToken",
        "userPhone",
        "userVerified",
        "loginTimestamp",
        "userInfo",
        "userProfile",
        "viewCartData",
        "otpToken",
        // 🛒 NOTE: cartItems और cartLastUpdated को यहाँ include नहीं किया
      ];

      keysToRemove.forEach((key) => localStorage.removeItem(key));

      // 🛒 RESTORE CART ITEMS - Put cart back after session clear
      if (
        preservedCartItems &&
        preservedCartItems !== "null" &&
        preservedCartItems !== "undefined"
      ) {
        localStorage.setItem("cartItems", preservedCartItems);
        if (preservedCartUpdated) {
          localStorage.setItem("cartLastUpdated", preservedCartUpdated);
        }
        console.log("✅ Storage: Cart items restored after session clear");
      }

      console.log("🗑️ Complete session cleared (cart preserved)");
      return true;
    } catch (error) {
      console.error("❌ Error clearing session:", error);
      return false;
    }
  },

  // ✅ Get current access token
  getCurrentToken: () => {
    const sessionData = StorageUtils.loadCompleteSession();
    return sessionData?.accessToken || localStorage.getItem("userToken");
  },

  // ✅ Get current user data
  getCurrentUser: () => {
    const sessionData = StorageUtils.loadCompleteSession();
    if (sessionData?.user) {
      return sessionData.user;
    }

    // Fallback to userInfo
    const userInfo = localStorage.getItem("userInfo");
    if (userInfo && userInfo !== "null") {
      try {
        return JSON.parse(userInfo);
      } catch (error) {
        console.error("Error parsing userInfo:", error);
      }
    }
    return null;
  },

  // Enhanced login state management
  saveLoginState: (phoneNumber, token, isVerified = true) => {
    try {
      const loginData = {
        token: token,
        verificationToken: token, // Add verificationToken
        phone: phoneNumber,
        isVerified: isVerified,
        timestamp: Date.now(),
      };

      // Multiple save attempts for reliability
      for (let attempt = 0; attempt < 3; attempt++) {
        try {
          // Save individual items for backwards compatibility
          localStorage.setItem("userToken", token);
          localStorage.setItem("verificationToken", token); // Save verificationToken
          localStorage.setItem("userPhone", phoneNumber);
          localStorage.setItem("userVerified", isVerified.toString());
          localStorage.setItem(
            "loginTimestamp",
            loginData.timestamp.toString(),
          );

          // Save consolidated login data
          localStorage.setItem("loginData", JSON.stringify(loginData));

          // Verify save was successful
          const verification = localStorage.getItem("userToken");
          if (verification === token) {
            console.log("🔐 Login state saved:", {
              phone: phoneNumber,
              hasToken: !!token,
              isVerified,
              timestamp: new Date(loginData.timestamp).toLocaleString(),
              attempt: attempt + 1,
            });
            return true;
          }
        } catch (saveError) {
          console.warn(`Login save attempt ${attempt + 1} failed:`, saveError);
          if (attempt === 2) throw saveError;
        }
      }

      return false;
    } catch (error) {
      console.error("❌ Error saving login state:", error);
      return false;
    }
  },

  loadLoginState: () => {
    try {
      // Try to load consolidated login data first
      const consolidatedData = localStorage.getItem("loginData");
      if (consolidatedData) {
        try {
          const loginData = JSON.parse(consolidatedData);
          if (loginData.token && loginData.phone) {
            console.log("🔐 Consolidated login state found:", {
              phone: loginData.phone,
              hasToken: !!loginData.token,
              isVerified: loginData.isVerified,
              loginTime: new Date(loginData.timestamp).toLocaleString(),
            });
            return loginData;
          }
        } catch (parseError) {
          console.warn(
            "Failed to parse consolidated login data, falling back to individual items",
          );
        }
      }

      // Fallback to individual items
      const token = localStorage.getItem("userToken");
      const phone = localStorage.getItem("userPhone");
      const verified = localStorage.getItem("userVerified");
      const timestamp = localStorage.getItem("loginTimestamp");

      if (token && phone) {
        const loginData = {
          token,
          phone,
          isVerified: verified === "true",
          timestamp: timestamp ? parseInt(timestamp) : Date.now(),
        };

        console.log("🔐 Individual login state found:", {
          phone: loginData.phone,
          hasToken: !!loginData.token,
          isVerified: loginData.isVerified,
          loginTime: new Date(loginData.timestamp).toLocaleString(),
        });

        return loginData;
      }

      console.log("🔓 No login state found");
      return null;
    } catch (error) {
      console.error("❌ Error loading login state:", error);
      return null;
    }
  },

  clearLoginState: () => {
    try {
      // 🛒 PRESERVE CART ITEMS - Save cart before clearing login state
      const preservedCartItems = localStorage.getItem("cartItems");
      const preservedCartUpdated = localStorage.getItem("cartLastUpdated");
      console.log(
        "🛒 Storage: Preserving cart during login clear:",
        preservedCartItems ? "Found cart data" : "No cart data",
      );

      // Clear all login-related data
      const keysToRemove = [
        "userToken",
        "verificationToken",
        "userPhone",
        "userVerified",
        "loginTimestamp",
        "loginData",
        "viewCartData",
        "otpToken",
        // 🛒 NOTE: cartItems और cartLastUpdated को यहाँ include नहीं किया
      ];

      keysToRemove.forEach((key) => {
        localStorage.removeItem(key);
      });

      // 🛒 RESTORE CART ITEMS - Put cart back after login clear
      if (
        preservedCartItems &&
        preservedCartItems !== "null" &&
        preservedCartItems !== "undefined"
      ) {
        localStorage.setItem("cartItems", preservedCartItems);
        if (preservedCartUpdated) {
          localStorage.setItem("cartLastUpdated", preservedCartUpdated);
        }
        console.log("✅ Storage: Cart items restored after login clear");
      }

      console.log("🔓 Login state cleared (cart preserved)");
      return true;
    } catch (error) {
      console.error("❌ Error clearing login state:", error);
      return false;
    }
  },

  // Check if login is still valid (30 days expiry)
  isLoginValid: () => {
    try {
      const loginData = this.loadLoginState();
      if (!loginData || !loginData.timestamp) return false;

      const loginTime = loginData.timestamp;
      const currentTime = Date.now();
      const thirtyDays = 30 * 24 * 60 * 60 * 1000; // 30 days in milliseconds

      const isValid =
        currentTime - loginTime < thirtyDays && loginData.isVerified;

      console.log("🕐 Login validity check:", {
        loginTime: new Date(loginTime).toLocaleString(),
        isValid,
        isVerified: loginData.isVerified,
        daysAgo: Math.floor((currentTime - loginTime) / (24 * 60 * 60 * 1000)),
      });

      return isValid;
    } catch (error) {
      console.error("❌ Error checking login validity:", error);
      return false;
    }
  },

  // Check if user is currently logged in
  isLoggedIn: () => {
    const loginData = this.loadLoginState();
    return loginData && loginData.isVerified && this.isLoginValid();
  },

  // Force save to localStorage with retry and verification
  forceSave: (key, value, retries = 3) => {
    for (let i = 0; i < retries; i++) {
      try {
        const stringValue =
          typeof value === "string" ? value : JSON.stringify(value);
        localStorage.setItem(key, stringValue);

        // Verify save worked
        const saved = localStorage.getItem(key);
        if (saved === stringValue) {
          console.log(
            `✅ Force save successful for ${key} on attempt ${i + 1}`,
          );
          return true;
        }
      } catch (error) {
        console.error(
          `❌ Force save attempt ${i + 1} failed for ${key}:`,
          error,
        );
        if (i === retries - 1) {
          return false;
        }
        // Wait a bit before retry
        setTimeout(() => {}, 100 * (i + 1));
      }
    }
    return false;
  },

  // Force load from localStorage with validation
  forceLoad: (key, parseJSON = true) => {
    try {
      const value = localStorage.getItem(key);
      if (value && value !== "undefined" && value !== "null") {
        if (parseJSON) {
          try {
            return JSON.parse(value);
          } catch (parseError) {
            console.warn(
              `Failed to parse JSON for ${key}, returning as string`,
            );
            return value;
          }
        }
        return value;
      }
      return null;
    } catch (error) {
      console.error(`❌ Force load failed for ${key}:`, error);
      try {
        localStorage.removeItem(key); // Remove corrupted data
      } catch (removeError) {
        console.error(`❌ Error removing corrupted key ${key}:`, removeError);
      }
      return null;
    }
  },

  // Helper method to add item to cart
  addToCart: (newItem) => {
    try {
      const currentCart = StorageUtils.loadCart();
      const existingItemIndex = currentCart.findIndex(
        (item) => item.id === newItem.id,
      );

      if (existingItemIndex > -1) {
        // Update quantity of existing item
        currentCart[existingItemIndex].quantity += newItem.quantity || 1;
      } else {
        // Add new item
        currentCart.push({
          ...newItem,
          quantity: newItem.quantity || 1,
        });
      }

      const success = StorageUtils.saveCart(currentCart);
      if (success) {
        // Dispatch event to update UI
        window.dispatchEvent(
          new CustomEvent("cartUpdated", { detail: currentCart }),
        );
      }
      return success;
    } catch (error) {
      console.error("❌ Error adding to cart:", error);
      return false;
    }
  },

  // Helper method to remove item from cart
  removeFromCart: (itemId) => {
    try {
      const currentCart = StorageUtils.loadCart();
      const updatedCart = currentCart.filter((item) => item.id !== itemId);

      const success = StorageUtils.saveCart(updatedCart);
      if (success) {
        // Dispatch event to update UI
        window.dispatchEvent(
          new CustomEvent("cartUpdated", { detail: updatedCart }),
        );
      }
      return success;
    } catch (error) {
      console.error("❌ Error removing from cart:", error);
      return false;
    }
  },
};

export default StorageUtils;
