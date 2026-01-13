const [profileRes, ordersRes] = await Promise.all([
  fetch("https://backend.corelens.in/api/app/getProfile", {
    method: "GET",
    headers,
  }),
  fetch("https://backend.corelens.in/api/app/orders?limit=50", {
    method: "GET",
    headers,
  }),
]);

// parse responses safely
const profileJson = await profileRes.json().catch(() => ({}));
const ordersJson = await ordersRes.json().catch(() => ({}));

// Log raw API responses for debugging
console.log("Profile API Response:", {
  status: profileRes.status,
  data: profileJson,
});

if (!profileRes.ok) {
  console.warn("Profile API returned error status:", profileRes.status);
}

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
