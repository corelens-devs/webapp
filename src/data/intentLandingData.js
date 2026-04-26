export const targetCities = [
  { slug: "delhi", name: "Delhi" },
  { slug: "gurugram", name: "Gurugram" },
  { slug: "noida", name: "Noida" },
  { slug: "mumbai", name: "Mumbai" },
  { slug: "pune", name: "Pune" },
  { slug: "bengaluru", name: "Bengaluru" },
  { slug: "hyderabad", name: "Hyderabad" },
  { slug: "chennai", name: "Chennai" },
  { slug: "kolkata", name: "Kolkata" },
  { slug: "ahmedabad", name: "Ahmedabad" },
  { slug: "jaipur", name: "Jaipur" },
  { slug: "chandigarh", name: "Chandigarh" },
];

export const intentServiceConfig = {
  "smart-door-lock-installation": {
    serviceName: "Smart Door Lock Installation",
    headline: "Get Smart Door Lock Installation with Home Service",
    subheadline:
      "Secure home and office entry with expert setup, app onboarding, and post-install support.",
    coreBenefits: [
      "Professional installation with live app pairing",
      "Biometric, PIN, and remote access setup",
      "Toll-free support and home service coverage",
    ],
    audience: "Homeowners, offices, and rental property managers",
    ctaLabel: "Book Free Security Consultation",
  },
  "cctv-camera-security": {
    serviceName: "CCTV Camera Security",
    headline: "CCTV Camera Security Setup for Homes and Offices",
    subheadline:
      "Deploy reliable camera monitoring with real-time app access and theft-risk coverage.",
    coreBenefits: [
      "Camera placement planning to reduce blind spots",
      "Mobile alerts and remote live-view setup",
      "Optional monthly and hourly surveillance add-on",
    ],
    audience: "Shops, offices, apartments, and independent houses",
    ctaLabel: "Get CCTV Plan",
  },
  "gps-tracker-anti-theft": {
    serviceName: "GPS Tracker Anti-Theft",
    headline: "GPS Tracker Anti-Theft Installation for Vehicle Safety",
    subheadline:
      "Protect two-wheelers, cars, and fleets with live tracking, route history, and tamper alerts.",
    coreBenefits: [
      "Live location + history tracking",
      "Geo-fence and movement alerts",
      "Quick onboarding with app support",
    ],
    audience: "Vehicle owners, logistics operators, and fleet managers",
    ctaLabel: "Get GPS Security Setup",
  },
  "office-cctv-installation": {
    serviceName: "Office CCTV Installation",
    headline: "Office CCTV Installation with Alert Monitoring",
    subheadline:
      "Design and install office surveillance coverage with escalation-ready support.",
    coreBenefits: [
      "Entry/exit and critical-zone coverage planning",
      "Remote access for founders and admins",
      "Emergency escalation support options",
    ],
    audience: "SMEs, warehouses, clinics, and commercial offices",
    ctaLabel: "Book Office Security Audit",
  },
  "vehicle-gps-tracker-installation": {
    serviceName: "Vehicle GPS Tracker Installation",
    headline: "Vehicle GPS Tracker Installation with Theft Alerts",
    subheadline:
      "Track movement, receive tamper signals, and improve theft recovery readiness.",
    coreBenefits: [
      "Install and activate in a single visit",
      "Geo-fencing and speed alerts",
      "Tracking dashboard setup support",
    ],
    audience: "Car owners, bike owners, and fleet businesses",
    ctaLabel: "Book Tracker Installation",
  },
  "home-security-system-upgrade": {
    serviceName: "Home Security System Upgrade",
    headline: "Upgrade Home Security with Corelens Smart Protection",
    subheadline:
      "Combine smart locks, CCTV, and anti-theft tracking into one app-led security stack.",
    coreBenefits: [
      "Single partner for device + service + support",
      "Toll-free response and home service assistance",
      "Optional human surveillance booking from app",
    ],
    audience: "Families, gated homes, and second-home owners",
    ctaLabel: "Plan My Security Upgrade",
  },
};

export const proofStats = [
  {
    label: "App Installs",
    value: "100+",
    note: "Corelens app downloads across Android and iOS",
  },
  {
    label: "Support Availability",
    value: "24x7",
    note: "Toll-free support for customer assistance",
  },
  {
    label: "Callback Promise",
    value: "< 10 min",
    note: "Lead response commitment during business coverage",
  },
  {
    label: "Service Modes",
    value: "Hourly + Monthly",
    note: "Book surveillance directly from the app",
  },
];

export const proofTestimonials = [
  {
    name: "Anjali Mehta",
    city: "Delhi",
    quote:
      "Picture quality is excellent even in low light. The team helped us configure everything on the app.",
  },
  {
    name: "Swati Deshmukh",
    city: "Pune",
    quote:
      "Support was responsive and setup was smooth. We now monitor our store from anywhere.",
  },
  {
    name: "Yash Rajput",
    city: "Jaipur",
    quote:
      "The onboarding call and post-install guidance were clear. Good experience for first-time users.",
  },
];

export const responsePromise = {
  headline: "Response Time Promise",
  bullets: [
    "Lead callback within 10 minutes during active support hours",
    "Toll-free support line for urgent product and service issues",
    "Escalation-ready surveillance workflow for verified high-risk events",
  ],
};

export const getCityNameFromSlug = (slug) => {
  const city = targetCities.find((entry) => entry.slug === (slug || "").toLowerCase());
  if (city) return city.name;
  return null;
};

export const getIntentService = (intentSlug) => intentServiceConfig[intentSlug] || null;

const intentSlugs = Object.keys(intentServiceConfig);

export const generateIntentLandingRoutes = () => {
  const cityRoutes = [];
  for (const intentSlug of intentSlugs) {
    for (const city of targetCities) {
      cityRoutes.push(`/${intentSlug}-${city.slug}`);
    }
  }

  return [...cityRoutes, "/hourly-surveillance-service", "/monthly-surveillance-service"];
};
