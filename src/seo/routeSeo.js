import { matchPath } from "react-router-dom";
import { products } from "../data/products.js";
import { getCityNameFromSlug, getIntentService } from "../data/intentLandingData.js";

const SITE_URL = "https://www.corelens.in";
const DEFAULT_IMAGE = `${SITE_URL}/og-image.jpg`;

const staticSeo = {
  "/": {
    title: "Corelens - India's First On-Demand Surveillance App | Smart Locks, CCTV & GPS",
    description:
      "Buy smart locks, CCTV cameras, GPS trackers, and book on-demand surveillance with Corelens across India.",
    schemaType: "WebSite",
  },
  "/about-us": {
    title: "About Corelens | Smart Security Solutions in India",
    description:
      "Learn about Corelens and our mission to deliver smart security solutions across India.",
    schemaType: "AboutPage",
  },
  "/categories": {
    title: "Security Categories | Smart Locks, CCTV, GPS, Sensors | Corelens",
    description:
      "Browse Corelens categories including smart locks, camera sensors, GPS trackers, motion sensors, and accessories.",
    schemaType: "CollectionPage",
  },
  "/products": {
    title: "Smart Security Products | Corelens",
    description:
      "Explore Corelens security products with installation and support options.",
    schemaType: "CollectionPage",
  },
  "/surveillance": {
    title: "On-Demand Surveillance at Rs 9/hour | Corelens",
    description:
      "Book surveillance with Corelens and get real-time alerts and emergency escalation support.",
    schemaType: "Service",
  },
  "/contact-us": {
    title: "Contact Corelens | Customer Support",
    description:
      "Reach Corelens customer support for product help, installation, and service queries.",
    schemaType: "ContactPage",
  },
  "/testimonials": {
    title: "Customer Testimonials | Corelens",
    description:
      "See what customers say about Corelens products and surveillance services.",
    schemaType: "WebPage",
  },
  "/track-order": {
    title: "Track Your Order | Corelens",
    description: "Track your Corelens order status.",
    schemaType: "WebPage",
    robots: "noindex, nofollow",
  },
  "/privacy-policy": {
    title: "Privacy Policy | Corelens",
    description: "Read the Corelens privacy policy.",
    schemaType: "WebPage",
  },
  "/terms-of-use": {
    title: "Terms of Use | Corelens",
    description: "Read the Corelens terms of use.",
    schemaType: "WebPage",
  },
  "/terms-of-sales": {
    title: "Terms of Sales | Corelens",
    description: "Read the Corelens terms of sales.",
    schemaType: "WebPage",
  },
  "/terms-and-conditions": {
    title: "Terms and Conditions | Corelens",
    description: "Read the Corelens terms and conditions.",
    schemaType: "WebPage",
  },
  "/account-deletion": {
    title: "Account Deletion Request | Corelens",
    description: "Submit your Corelens account deletion request.",
    schemaType: "WebPage",
  },
  "/checkout": {
    title: "Checkout | Corelens",
    description: "Secure checkout for Corelens orders.",
    schemaType: "WebPage",
    robots: "noindex, nofollow",
  },
  "/checkout-success": {
    title: "Payment Successful | Corelens",
    description: "Your Corelens payment was successful.",
    schemaType: "WebPage",
    robots: "noindex, nofollow",
  },
  "/checkout-failure": {
    title: "Payment Failed | Corelens",
    description: "Your Corelens payment could not be processed.",
    schemaType: "WebPage",
    robots: "noindex, nofollow",
  },
  "/view-cart": {
    title: "Your Cart | Corelens",
    description: "Review products in your Corelens cart.",
    schemaType: "WebPage",
    robots: "noindex, nofollow",
  },
  "/sign-in": {
    title: "Sign In | Corelens",
    description: "Sign in to your Corelens account.",
    schemaType: "WebPage",
    robots: "noindex, nofollow",
  },
  "/signup": {
    title: "Sign Up | Corelens",
    description: "Create your Corelens account.",
    schemaType: "WebPage",
    robots: "noindex, nofollow",
  },
  "/dashboard": {
    title: "Dashboard | Corelens",
    description: "Manage your Corelens orders and profile.",
    schemaType: "WebPage",
    robots: "noindex, nofollow",
  },
};

const normalizePath = (pathname) => {
  if (!pathname || pathname === "/") return "/";
  return pathname.endsWith("/") ? pathname.slice(0, -1) : pathname;
};

const getProductSchema = (product, canonical) => ({
  "@context": "https://schema.org",
  "@type": "Product",
  name: product.name,
  description: product.description,
  image: [`${SITE_URL}${product.images?.main || "/images/logo.png"}`],
  brand: { "@type": "Brand", name: "Corelens" },
  offers: {
    "@type": "Offer",
    priceCurrency: "INR",
    price: product.price,
    availability: "https://schema.org/InStock",
    url: canonical,
  },
});

export const getSeoForPath = (pathname) => {
  const cleanPath = normalizePath(pathname);
  const canonical = `${SITE_URL}${cleanPath}`;

  if (staticSeo[cleanPath]) {
    return {
      ...staticSeo[cleanPath],
      canonical,
      image: DEFAULT_IMAGE,
      ogType: "website",
      schema: {
        "@context": "https://schema.org",
        "@type": staticSeo[cleanPath].schemaType || "WebPage",
        name: staticSeo[cleanPath].title,
        description: staticSeo[cleanPath].description,
        url: canonical,
      },
    };
  }

  const categoryMatch = matchPath("/category/:slug", cleanPath);
  if (categoryMatch) {
    const slug = categoryMatch.params.slug;
    const readable = slug.replace(/-/g, " ");
    return {
      title: `${readable} | Corelens Security Category`,
      description: `Browse ${readable} security products from Corelens.`,
      canonical,
      image: DEFAULT_IMAGE,
      ogType: "website",
      robots: "index, follow",
      schema: {
        "@context": "https://schema.org",
        "@type": "CollectionPage",
        name: `${readable} | Corelens`,
        description: `Corelens ${readable} products`,
        url: canonical,
      },
    };
  }

  const categoryProductsMatch = matchPath("/category-products/:slug", cleanPath);
  if (categoryProductsMatch) {
    const slug = categoryProductsMatch.params.slug;
    const readable = slug.replace(/-/g, " ");
    return {
      title: `${readable} Products | Corelens`,
      description: `Explore Corelens ${readable} products with pricing, features and support options.`,
      canonical,
      image: DEFAULT_IMAGE,
      ogType: "website",
      robots: "index, follow",
      schema: {
        "@context": "https://schema.org",
        "@type": "CollectionPage",
        name: `${readable} Products | Corelens`,
        description: `Corelens ${readable} product listing`,
        url: canonical,
      },
    };
  }

  const productMatch = matchPath("/product-details/:slug/:id", cleanPath);
  if (productMatch) {
    const slug = productMatch.params.slug;
    const product = products[slug];
    if (product) {
      return {
        title: `${product.name} | Corelens`,
        description: product.description,
        canonical,
        image: `${SITE_URL}${product.images?.main || "/images/logo.png"}`,
        ogType: "product",
        robots: "index, follow",
        schema: getProductSchema(product, canonical),
      };
    }

    return {
      title: "Product Details | Corelens",
      description: "View product details, pricing and features at Corelens.",
      canonical,
      image: DEFAULT_IMAGE,
      ogType: "product",
      robots: "index, follow",
      schema: {
        "@context": "https://schema.org",
        "@type": "WebPage",
        name: "Product Details",
        url: canonical,
      },
    };
  }

  const intentRoutePatterns = [
    "/smart-door-lock-installation-:city",
    "/cctv-camera-security-:city",
    "/gps-tracker-anti-theft-:city",
    "/office-cctv-installation-:city",
    "/vehicle-gps-tracker-installation-:city",
    "/home-security-system-upgrade-:city",
  ];

  for (const pattern of intentRoutePatterns) {
    const match = matchPath(pattern, cleanPath);
    if (!match) continue;

    const { city } = match.params;
    const intentSlug = pattern.slice(1).replace("-:city", "");
    const service = getIntentService(intentSlug);
    const cityName = getCityNameFromSlug(city);

    if (service && cityName) {
      const title = `${service.serviceName} in ${cityName} | Corelens`;
      const description = `${service.subheadline} Book ${service.serviceName.toLowerCase()} in ${cityName} with Corelens toll-free support and home service.`;

      return {
        title,
        description,
        canonical,
        image: DEFAULT_IMAGE,
        ogType: "website",
        robots: "index, follow",
        schema: {
          "@context": "https://schema.org",
          "@type": "Service",
          name: title,
          description,
          areaServed: cityName,
          provider: {
            "@type": "Organization",
            name: "Corelens",
            url: SITE_URL,
          },
          url: canonical,
        },
      };
    }
  }

  if (cleanPath === "/hourly-surveillance-service" || cleanPath === "/monthly-surveillance-service") {
    const isHourly = cleanPath === "/hourly-surveillance-service";
    const title = isHourly
      ? "Hourly Surveillance Service in India | Corelens"
      : "Monthly Surveillance Service in India | Corelens";
    const description = isHourly
      ? "Book hourly surveillance support with Corelens for on-demand monitoring and escalation-ready response."
      : "Choose Corelens monthly surveillance plans for continuous monitoring and faster incident support.";

    return {
      title,
      description,
      canonical,
      image: DEFAULT_IMAGE,
      ogType: "website",
      robots: "index, follow",
      schema: {
        "@context": "https://schema.org",
        "@type": "Service",
        name: title,
        description,
        provider: {
          "@type": "Organization",
          name: "Corelens",
          url: SITE_URL,
        },
        url: canonical,
      },
    };
  }

  return {
    title: "Corelens | Smart Security Solutions",
    description:
      "Corelens provides smart security products and on-demand surveillance services.",
    canonical,
    image: DEFAULT_IMAGE,
    ogType: "website",
    robots: "index, follow",
    schema: {
      "@context": "https://schema.org",
      "@type": "WebPage",
      name: "Corelens",
      url: canonical,
    },
  };
};

export const getOrganizationSchema = () => ({
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Corelens",
  url: SITE_URL,
  logo: `${SITE_URL}/images/logo.png`,
  contactPoint: {
    "@type": "ContactPoint",
    telephone: "+91-1800-313-4207",
    contactType: "customer service",
    areaServed: "IN",
  },
  sameAs: [
    "https://www.facebook.com/profile.php?id=61552698689659",
    "https://www.instagram.com/corelensofficial/",
    "https://www.youtube.com/@corelensindia",
    "https://x.com/corelensindia",
    "https://www.linkedin.com/in/corelens-india-612605327/",
  ],
});
