// Authentication utility functions

export const getSessionAccessToken = () => {
  // Try to get token from multiple sources
  const userToken = localStorage.getItem("userToken");
  const sessionData = localStorage.getItem("sessionData");
  
  if (userToken) {
    return userToken;
  }
  
  if (sessionData) {
    try {
      const parsed = JSON.parse(sessionData);
      return parsed.accessToken || parsed.token;
    } catch (error) {
      console.error("Error parsing session data:", error);
    }
  }
  
  return null;
};

export const isUserAuthenticated = () => {
  const token = getSessionAccessToken();
  const userPhone = localStorage.getItem("userPhone");
  const isVerified = localStorage.getItem("userVerified") === "true";
  
  return !!(token && userPhone && isVerified);
};

export const getUserPhone = () => {
  return localStorage.getItem("userPhone");
};

export const clearAuthData = () => {
  const authKeys = [
    "userToken",
    "verificationToken",
    "userPhone",
    "userVerified",
    "loginTimestamp",
    "loginData",
    "sessionData",
    "userInfo",
    "userProfile"
  ];
  
  authKeys.forEach(key => localStorage.removeItem(key));
};
