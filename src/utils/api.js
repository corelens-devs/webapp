// API Configuration and Helper Functions
export const API_CONFIG = {
  // Use the correct API base URL - try both endpoints
  BASE_URL: 'https://backend.corelens.in',
  FALLBACK_URL: 'https://api.corelens.in',
  // Add mock/demo mode for testing when APIs are down
  DEMO_MODE: false, // Set to true for testing, false for production /api/app/getProfile calls
  // ✅ Silent token handling - never show expiry messages to user
  SILENT_TOKEN_HANDLING: true,
  ENDPOINTS: {
    SEND_OTP: '/api/app/sendOtp',
    VERIFY_OTP: '/api/app/verifyOtp',
    SIGNUP: '/api/app/signup',
    ADDRESS: '/api/app/address',
    PAYMENT: '/api/admin-panel/payment'
  }
};

// ✅ Simplified background validation - no refresh needed
const startBackgroundTokenValidation = () => {
  setInterval(async () => {
    const userToken = localStorage.getItem("userToken");
    const userPhone = localStorage.getItem("userPhone");
    const isVerified = localStorage.getItem("userVerified") === "true";

    // Just check if login data exists
    if (!userToken || !userPhone || !isVerified) {
      console.log('⚠️ Login data incomplete, user may need to re-login');
    }
  }, 5 * 60 * 1000); // Check every 5 minutes
};

// ✅ Start background validation when module loads
if (typeof window !== 'undefined') {
  startBackgroundTokenValidation();
}

// ✅ Global refresh lock to prevent concurrent refreshes
let globalRefreshPromise = null;

// ✅ Simplified token validation - no refresh endpoint needed
const silentTokenRefresh = async () => {
  // Since no refresh endpoint available, just validate current token
  const userPhone = localStorage.getItem("userPhone");
  const currentToken = localStorage.getItem("userToken");
  const isVerified = localStorage.getItem("userVerified") === "true";

  if (!userPhone || !currentToken || !isVerified) {
    console.log('❌ No valid login data found');
    return false;
  }

  // Check token age - if too old, consider invalid
  const loginTimestamp = localStorage.getItem("loginTimestamp");
  if (loginTimestamp) {
    const tokenAge = Date.now() - parseInt(loginTimestamp);
    const maxAge = 24 * 60 * 60 * 1000; // 24 hours
    
    if (tokenAge > maxAge) {
      console.log('❌ Token too old, requiring re-login');
      return false;
    }
  }

  console.log('✅ Token validation passed');
  return true;
};

// Generic API call function with fallback and automatic token handling
export const apiCall = async (endpoint, options = {}, useFallback = false) => {
  // If demo mode is enabled, return mock responses
  if (API_CONFIG.DEMO_MODE) {
    console.log('🔄 DEMO MODE: Simulating API call to:', endpoint);
    return simulateApiResponse(endpoint, options);
  }

  const baseUrl = useFallback ? API_CONFIG.FALLBACK_URL : API_CONFIG.BASE_URL;
  const url = `${baseUrl}${endpoint}`;

  const defaultOptions = {
    mode: 'cors',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'User-Agent': 'CoreLens-Web-App/1.0',
    },
  };

  const mergedOptions = {
    ...defaultOptions,
    ...options,
    headers: {
      ...defaultOptions.headers,
      ...options.headers,
    },
  };

  try {
    console.log('Making API call to:', url);
    // ✅ Security fix: Don't log sensitive headers (Authorization tokens)
    const safeOptions = {
      ...mergedOptions,
      headers: {
        ...mergedOptions.headers,
        Authorization: mergedOptions.headers.Authorization ? '[REDACTED]' : undefined
      }
    };
    console.log('Request options:', safeOptions);
    console.log('Request body:', options.body ? '[REQUEST_BODY]' : 'none');

    const response = await fetch(url, mergedOptions);

    console.log('Response status:', response.status);
    console.log('Response headers:', Object.fromEntries(response.headers.entries()));

    // ✅ Handle token expiry without refresh endpoint
    if (response.status === 401 || response.status === 403) {
      console.log('❌ Token expired or unauthorized');
      
      // Clear invalid login state
      localStorage.removeItem("userToken");
      localStorage.removeItem("userPhone");
      localStorage.removeItem("userVerified");
      localStorage.removeItem("loginTimestamp");
      localStorage.removeItem("loginData");
      localStorage.removeItem("userInfo");

      return {
        success: false,
        data: null,
        status: 401,
        error: 'Please login again to continue',
        requiresLogin: true
      };
    }

    // Check if response is JSON
    const contentType = response.headers.get('content-type');
    let data = null;

    if (contentType && contentType.includes('application/json')) {
      data = await response.json();
    } else {
      const textResponse = await response.text();
      console.log('Non-JSON response:', textResponse);

      if (response.status === 404) {
        // Try fallback URL if main URL fails with 404
        if (!useFallback) {
          console.log('Trying fallback URL...');
          return apiCall(endpoint, options, true);
        }
        throw new Error('API endpoint not found on both primary and fallback servers.');
      }

      data = { message: textResponse };
    }

    console.log('API Response:', { status: response.status, data });

    // ✅ FIX: Handle token expiry in JSON body (even with HTTP 200)
    if (response.ok && data && data.success === false && !options._retryCount) {
      const errorMessage = (data.message || data.error || '').toLowerCase();
      const isTokenExpired = errorMessage.includes('token has expired') ||
                           errorMessage.includes('token expired') ||
                           errorMessage.includes('unauthorized') ||
                           errorMessage.includes('access denied');

      if (isTokenExpired) {
        console.log('🔄 Token expired in response body, attempting refresh...');

        try {
          const refreshSuccess = await silentTokenRefresh();

          if (refreshSuccess) {
            console.log('✅ Token refreshed successfully for body-level expiry, retrying...');

            // Retry with refreshed token
            const newToken = localStorage.getItem("userToken");
            if (newToken && mergedOptions.headers) {
              const retryOptions = {
                ...options,
                headers: {
                  ...mergedOptions.headers,
                  Authorization: `Bearer ${newToken}`
                },
                _retryCount: 1 // Mark as retry to prevent infinite loops
              };

              return apiCall(endpoint, retryOptions, useFallback);
            }
          } else {
            console.log('❌ Token refresh failed for body-level expiry - clearing login state');
            // Clear invalid login state
            localStorage.removeItem("userToken");
            localStorage.removeItem("userPhone");
            localStorage.removeItem("userVerified");
            localStorage.removeItem("loginTimestamp");
            localStorage.removeItem("loginData");
            localStorage.removeItem("viewCartData");

            return {
              success: false,
              error: 'Please login again to continue',
              data: null,
              status: 401,
              requiresLogin: true
            };
          }
        } catch (refreshError) {
          console.log('❌ Token refresh error for body-level expiry:', refreshError);
          // Clear invalid login state
          localStorage.removeItem("userToken");
          localStorage.removeItem("userPhone");
          localStorage.removeItem("userVerified");
          localStorage.removeItem("loginTimestamp");
          localStorage.removeItem("loginData");
          localStorage.removeItem("viewCartData");

          return {
            success: false,
            error: 'Please login again to continue',
            data: null,
            status: 401,
            requiresLogin: true
          };
        }
      }
    }

    return {
      success: response.ok,
      data,
      status: response.status,
      statusText: response.statusText
    };
  } catch (error) {
    console.error('API call error for URL:', url, error);

    // Try fallback if main URL fails and we haven't tried it yet
    if (!useFallback && error.name === 'TypeError') {
      console.log('Primary URL failed, trying fallback...');
      return apiCall(endpoint, options, true);
    }

    if (error.name === 'TypeError' && error.message.includes('fetch')) {
      return {
        success: false,
        error: 'Network error - please check your internet connection or try again later.',
        data: null,
        status: 0
      };
    }

    // ✅ Filter out token-related errors from user view
    const isTokenError = error.message.includes('token') ||
                        error.message.includes('unauthorized') ||
                        error.message.includes('forbidden') ||
                        error.message.includes('401') ||
                        error.message.includes('403') ||
                        error.message.includes('AUTH_HANDLED');

    if (isTokenError) {
      console.log('🔄 Token-related error detected, handling silently');
      // Attempt silent refresh and return handled response
      await silentTokenRefresh();
      return {
        success: false,
        data: null,
        status: 401,
        error: 'AUTH_HANDLED',
        silentlyHandled: true
      };
    }

    return {
      success: false,
      error: error.message,
      data: null,
      status: 0
    };
  }
};

// Specific API functions
// ✅ Centralized phone normalization utility
export const normalizePhone = (phoneNumber) => {
  if (!phoneNumber) return '';

  // Remove all non-digits
  let cleaned = phoneNumber.replace(/\D/g, '');

  // If 12 digits starting with 91, remove 91 prefix to match admin format
  if (cleaned.startsWith('91') && cleaned.length === 12) {
    cleaned = cleaned.slice(2);
  }

  // Reject if not exactly 10 digits after normalization
  if (cleaned.length !== 10) {
    return null;
  }

  return cleaned;
};

export const sendOTP = (mobileNumber) => {
  // ✅ Use centralized normalization
  const cleanMobileNumber = normalizePhone(mobileNumber);

  if (!cleanMobileNumber) {
    console.error('Invalid mobile number:', mobileNumber);
    return Promise.resolve({
      success: false,
      error: 'Please enter a valid 10-digit mobile number',
      data: null,
      status: 400
    });
  }

  console.log('Sending OTP to mobile number:', cleanMobileNumber);

  const requestBody = {
    mobile_number: cleanMobileNumber
  };

  console.log('OTP Request payload:', requestBody);

  return apiCall(API_CONFIG.ENDPOINTS.SEND_OTP, {
    method: 'POST',
    body: JSON.stringify(requestBody)
  }).then(response => {
    console.log('Send OTP Response:', response);
    console.log('API Response Status:', response.status);
    console.log('API Response Data:', response.data);

    // Store token if received
    if (response.success && response.data?.token) {
      localStorage.setItem('otpToken', response.data.token);
      console.log('OTP Token stored: Present');
    }

    // Store mobile number for later verification
    localStorage.setItem('otpMobileNumber', cleanMobileNumber);

    // Additional logging for debugging
    if (response.success && response.status === 200) {
      console.log('✅ API Call Successful - Status 200');
      if (response.data?.message) {
        console.log('📧 API Message:', response.data.message);
      }
      if (!response.data?.sms_sent) {
        console.warn('⚠️ Warning: API responded OK but sms_sent flag not found. Backend may not be sending real SMS.');
      }
    } else {
      console.error('❌ API Call Failed:', response.status, response.error);
    }

    return response;
  }).catch(error => {
    console.error('Send OTP Error:', error);
    return {
      success: false,
      error: error.message || 'Failed to send OTP',
      data: null,
      status: 0
    };
  });
};

export const verifyOTP = (otp, mobileNumber, token = null) => {
  // Validate inputs
  if (!otp || otp.length < 3) {
    console.error('Invalid OTP:', otp);
    return Promise.resolve({
      success: false,
      error: 'Please enter a valid OTP',
      data: null,
      status: 400
    });
  }

  if (!mobileNumber) {
    console.error('Mobile number missing for OTP verification');
    return Promise.resolve({
      success: false,
      error: 'Mobile number is required for verification',
      data: null,
      status: 400
    });
  }

  // ✅ Use centralized normalization to match admin panel format
  const cleanMobileNumber = normalizePhone(mobileNumber);
  const cleanOTP = otp.replace(/\D/g, '');

  if (!cleanMobileNumber) {
    console.error('Invalid mobile number for OTP verification:', mobileNumber);
    return Promise.resolve({
      success: false,
      error: 'Please enter a valid 10-digit mobile number',
      data: null,
      status: 400
    });
  }

  console.log('Verifying OTP:', cleanOTP, 'for normalized mobile:', cleanMobileNumber);

  const headers = {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  };

  // Add token if provided (✅ SECURITY: Don't log the actual token)
  if (token) {
    // ✅ Ensure Bearer prefix is not duplicated
    const authToken = token.startsWith('Bearer ') ? token : `Bearer ${token}`;
    headers['Authorization'] = authToken;
    console.log('Using token for verification: Present (Bearer format)');
  }

  const requestBody = {
    mobile_number: cleanMobileNumber,
    otp: cleanOTP
  };

  console.log('Verify OTP Request payload:', requestBody);

  return apiCall(API_CONFIG.ENDPOINTS.VERIFY_OTP, {
    method: 'POST',
    headers,
    body: JSON.stringify(requestBody)
  }).then(response => {
    console.log('Verify OTP Response:', response);
    return response;
  }).catch(error => {
    console.error('Verify OTP Error:', error);
    return {
      success: false,
      error: error.message || 'Failed to verify OTP',
      data: null,
      status: 0
    };
  });
};

export const signupUser = (userData) => {
  console.log('Signup API called with:', userData);

  // ✅ Use correct signup endpoint
  const signupEndpoint = '/api/app/signup';

  const signupData = {
    mobile_number: normalizePhone(userData.mobile_number),
    name: userData.name.trim(),
    email: userData.email.trim(),
    city: userData.city.trim(),
    address: userData.address ? userData.address.trim() : ''
  };

  console.log('Signup payload:', signupData);

  return apiCall(signupEndpoint, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    },
    body: JSON.stringify(signupData)
  });
};

// Simulate API responses for demo mode
const simulateApiResponse = async (endpoint, options) => {
  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 1000));

  if (endpoint === API_CONFIG.ENDPOINTS.SEND_OTP) {
    return {
      success: true,
      data: {
        message: 'OTP sent successfully (Demo Mode)',
        token: 'demo-token-' + Date.now(),
        sms_sent: false // Indicate this is demo mode
      },
      status: 200,
      statusText: 'OK'
    };
  }

  if (endpoint === API_CONFIG.ENDPOINTS.VERIFY_OTP) {
    const body = JSON.parse(options.body || '{}');
    // Accept any OTP in demo mode and return a token
    return {
      success: true,
      data: {
        message: 'OTP verified successfully (Demo Mode)',
        verified: true,
        accessToken: 'demo-access-token-' + Date.now(),
        token: 'demo-token-' + Date.now()
      },
      status: 200,
      statusText: 'OK'
    };
  }

  if (endpoint === API_CONFIG.ENDPOINTS.SIGNUP) {
    return {
      success: true,
      data: {
        message: 'Signup successful (Demo Mode)',
        user_id: 'demo-user-' + Date.now()
      },
      status: 200,
      statusText: 'OK'
    };
  }

  // Default response for unknown endpoints
  return {
    success: true,
    data: { message: 'Demo response for ' + endpoint },
    status: 200,
    statusText: 'OK'
  };
};

export const processPayment = (token) => {
  return apiCall(API_CONFIG.ENDPOINTS.PAYMENT, {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${token}`
    }
  });
};

// Fetch user profile data by mobile number
export const saveAddress = (addressData) => {
  console.log('Save Address API called with:', addressData);

  // ✅ Normalize phone number for consistency
  const cleanMobileNumber = normalizePhone(addressData.mobile_number);

  if (!cleanMobileNumber) {
    console.error('Invalid mobile number for address save:', addressData.mobile_number);
    return Promise.resolve({
      success: false,
      error: 'Please enter a valid 10-digit mobile number',
      data: null,
      status: 400
    });
  }

  // ✅ Create properly formatted address payload for backend
  const addressPayload = {
    mobile_number: cleanMobileNumber,
    name: addressData.name.trim(),
    email: addressData.email.trim(),
    address: addressData.address.trim(),
    city: addressData.city.trim()
  };

  console.log('Address API payload:', addressPayload);

  // Get fresh token at request time
  const currentToken = localStorage.getItem("userToken");

  const headers = {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  };

  if (currentToken) {
    headers['Authorization'] = `Bearer ${currentToken}`;
    console.log('Using token for address save: Present');
  } else {
    console.warn('⚠️ No token available for address save');
  }

  // ✅ Use correct address endpoint
  const addressEndpoint = '/api/app/address';

  return apiCall(addressEndpoint, {
    method: 'POST',
    headers,
    body: JSON.stringify(addressPayload)
  }).then(response => {
    console.log('Save Address Response:', response);

    if (response.success) {
      console.log('✅ Address saved successfully to backend');

      // ✅ Also save to localStorage for future use
      try {
        const savedAddressData = {
          ...addressPayload,
          timestamp: Date.now()
        };
        localStorage.setItem('savedAddressData', JSON.stringify(savedAddressData));
        console.log('✅ Address also saved to localStorage for backup');
      } catch (storageError) {
        console.warn('⚠️ Could not save address to localStorage:', storageError);
      }
    } else {
      console.error('❌ Address save failed:', response.error || response.data?.message);
    }

    return response;
  }).catch(error => {
    console.error('Save Address Error:', error);
    return {
      success: false,
      error: error.message || 'Failed to save address',
      data: null,
      status: 0
    };
  });
};

// Fetch user order data using JWT token
export const fetchOrderData = (token = null) => {
  console.log('🛍️ Fetching order data from /api/app/order...');

  const headers = {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  };

  // ✅ Always use fresh token from localStorage
  const currentToken = token || localStorage.getItem("userToken");
  if (currentToken) {
    // ✅ Ensure Bearer prefix is not duplicated
    const authToken = currentToken.startsWith('Bearer ') ? currentToken : `Bearer ${currentToken}`;
    headers['Authorization'] = authToken;
    console.log('Using token for order fetch: Present (Bearer format)');
  } else {
    console.warn('⚠️ No token available for order fetch');
    return Promise.resolve({
      success: false,
      error: 'Authentication required',
      data: null,
      status: 401
    });
  }

  // ✅ Use the specific API endpoint for orders
  const orderEndpoint = '/api/app/order';

  console.log('Using order endpoint:', orderEndpoint);

  // ✅ If demo mode, return structured mock data immediately
  if (API_CONFIG.DEMO_MODE) {
    console.log('🔄 Demo mode enabled, returning structured mock order data');
    return Promise.resolve({
      success: true,
      data: [
        {
          id: 'demo-order-1',
          created_at: new Date().toISOString(),
          status: 'completed',
          total_amount: 2999,
          items: [
            { name: 'CoreLens Prime', quantity: 1, price: 2999 }
          ],
          razorpay_payment_id: 'demo_pay_123',
          shipping_address: '123 Demo Street, Demo City',
          notes: 'Demo order for testing'
        }
      ],
      status: 200,
      statusText: 'OK (Demo Data)'
    });
  }

  // ✅ Call the specific order API endpoint
  return apiCall(orderEndpoint, {
    method: 'GET',
    headers
  }).then(response => {
    if (response.success && response.data) {
      console.log('✅ Order fetch successful from /api/app/order');
      return response;
    } else {
      console.error('❌ Order API returned no data');
      return {
        success: false,
        error: 'Orders not found or API returned empty data',
        data: null,
        status: 404
      };
    }
  }).catch(error => {
    console.error('❌ Order fetch error from /api/app/order:', error);
    return {
      success: false,
      error: 'Network error occurred while fetching orders',
      data: null,
      status: 500
    };
  });
};

export const fetchUserProfile = (mobileNumber, token = null) => {
  // Validate mobile number
  if (!mobileNumber || mobileNumber.length < 10) {
    console.error('Invalid mobile number for profile fetch:', mobileNumber);
    return Promise.resolve({
      success: false,
      error: 'Please enter a valid mobile number',
      data: null,
      status: 400
    });
  }

  // ✅ Use centralized normalization to match admin panel format
  const cleanMobileNumber = normalizePhone(mobileNumber);

  if (!cleanMobileNumber) {
    console.error('Invalid mobile number for profile fetch:', mobileNumber);
    return Promise.resolve({
      success: false,
      error: 'Please enter a valid 10-digit mobile number',
      data: null,
      status: 400
    });
  }

  console.log('Original mobile:', mobileNumber);
  console.log('Normalized mobile for API (to match admin format):', cleanMobileNumber);

  const headers = {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  };

  // ✅ Always use fresh token from localStorage
  const currentToken = token || localStorage.getItem("userToken");
  if (currentToken) {
    // ✅ Ensure Bearer prefix is not duplicated
    const authToken = currentToken.startsWith('Bearer ') ? currentToken : `Bearer ${currentToken}`;
    headers['Authorization'] = authToken;
    console.log('Using token for profile fetch: Present (Bearer format)');
  } else {
    console.warn('⚠️ No token available for profile fetch');
  }

  // ✅ Use the specific API endpoint requested by user
  const profileEndpoint = '/api/app/getProfile';

  console.log('Using profile endpoint:', profileEndpoint);

  // ✅ If demo mode, return structured mock data immediately
  if (API_CONFIG.DEMO_MODE) {
    console.log('🔄 Demo mode enabled, returning structured mock profile data');
    return Promise.resolve({
      success: true,
      data: {
        mobile_number: cleanMobileNumber,
        name: "Demo User",
        email: "demo@corelens.in",
        city: "Mumbai",
        address: "123 Demo Street, Demo City",
        registration_date: new Date().toISOString().split('T')[0],
        verified: true,
        user_id: "demo-" + cleanMobileNumber
      },
      status: 200,
      statusText: 'OK (Demo Data)'
    });
  }

  // ✅ Call the specific getProfile API endpoint
  return apiCall(profileEndpoint, {
    method: 'GET',
    headers
  }).then(response => {
    if (response.success && response.data) {
      console.log('✅ Profile fetch successful from /api/app/getProfile');
      return response;
    } else {
      console.error('❌ Profile API returned no data');
      return {
        success: false,
        error: 'Profile not found or API returned empty data',
        data: null,
        status: 404
      };
    }
  }).catch(error => {
    console.error('❌ Profile fetch error from /api/app/getProfile:', error);
    return {
      success: false,
      error: 'Network error occurred while fetching profile',
      data: null,
      status: 500
    };
  });
};