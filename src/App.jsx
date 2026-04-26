import React, { Suspense, lazy, useEffect } from "react";
import {
  BrowserRouter as Router,
  Navigate,
  Route,
  Routes,
  useLocation,
} from "react-router-dom";
import Header from "./components/Header.jsx";
import Footer from "./components/Footer.jsx";
import RouteSeo from "./components/RouteSeo.jsx";
import "./css/main.css";

const Home = lazy(() => import("./pages/Home.jsx"));
const AboutUs = lazy(() => import("./pages/AboutUs.jsx"));
const Categories = lazy(() => import("./pages/Categories.jsx"));
const Products = lazy(() => import("./pages/Products.jsx"));
const ProductDetails = lazy(() => import("./pages/ProductDetails.jsx"));
const ViewCart = lazy(() => import("./pages/ViewCart.jsx"));
const SignIn = lazy(() => import("./pages/SignIn.jsx"));
const TrackOrder = lazy(() => import("./pages/TrackOrder.jsx"));
const Testimonials = lazy(() => import("./pages/Testimonials.jsx"));
const Dashboard = lazy(() => import("./pages/Dashboard.jsx"));
const Signup = lazy(() => import("./pages/Signup.jsx"));
const Surveillance = lazy(() => import("./pages/Surveillance.jsx"));
const CategoryPage = lazy(() => import("./pages/CategoryPage.jsx"));
const ContactUs = lazy(() => import("./pages/ContactUs.jsx"));
const TermsOfUse = lazy(() => import("./pages/TermsOfUse.jsx"));
const TermsOfSales = lazy(() => import("./pages/TermsOfSales.jsx"));
const TermsAndConditions = lazy(() => import("./pages/TermsAndConditions.jsx"));
const PrivacyPolicy = lazy(() => import("./pages/PrivacyPolicy.jsx"));
const AccountDeletion = lazy(() => import("./pages/AccountDeletion.jsx"));
const NotFound = lazy(() => import("./pages/NotFound.jsx"));
const CategoryProducts = lazy(() => import("./pages/CategoryProducts"));
const Checkout = lazy(() => import("./pages/Checkout.jsx"));
const CheckoutSuccess = lazy(() => import("./pages/CheckoutSuccess.jsx"));
const CheckoutFailure = lazy(() => import("./pages/CheckoutFailure.jsx"));
const IntentLandingPage = lazy(() => import("./pages/IntentLandingPage.jsx"));
const SurveillanceServiceLanding = lazy(() =>
  import("./pages/SurveillanceServiceLanding.jsx"),
);

function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

const loadScript = (src, id) =>
  new Promise((resolve) => {
    if (document.getElementById(id) || document.querySelector(`script[src="${src}"]`)) {
      resolve();
      return;
    }

    const script = document.createElement("script");
    script.id = id;
    script.src = src;
    script.async = true;
    script.defer = true;
    script.onload = () => resolve();
    script.onerror = () => resolve();
    document.body.appendChild(script);
  });

function AppShell() {
  useEffect(() => {
    const bootstrap = async () => {
      await loadScript("https://cdnjs.cloudflare.com/ajax/libs/jquery/3.6.0/jquery.min.js", "jquery-cdn");
      await loadScript(
        "https://cdnjs.cloudflare.com/ajax/libs/OwlCarousel2/2.3.4/owl.carousel.min.js",
        "owl-carousel-cdn",
      );
      await loadScript("https://cdnjs.cloudflare.com/ajax/libs/wow/1.1.2/wow.min.js", "wow-cdn");
    };

    if (typeof window.requestIdleCallback === "function") {
      window.requestIdleCallback(bootstrap);
    } else {
      setTimeout(bootstrap, 500);
    }
  }, []);

  useEffect(() => {
    const restoreApplicationState = async () => {
      try {
        const token = localStorage.getItem("userToken");
        const phone = localStorage.getItem("userPhone");
        const verified = localStorage.getItem("userVerified");
        const timestamp = localStorage.getItem("loginTimestamp");

        if (token && phone && verified === "true") {
          const loginTime = timestamp ? parseInt(timestamp, 10) : Date.now();
          const maxAge = 30 * 24 * 60 * 60 * 1000;
          const isValid = Date.now() - loginTime < maxAge;

          if (isValid) {
            window.dispatchEvent(
              new CustomEvent("userLoggedIn", {
                detail: { phone, token, isVerified: true },
              }),
            );
          } else {
            localStorage.removeItem("userToken");
            localStorage.removeItem("userPhone");
            localStorage.removeItem("userVerified");
            localStorage.removeItem("loginTimestamp");
            localStorage.removeItem("loginData");
            localStorage.removeItem("viewCartData");
          }
        }

        const cartItems = localStorage.getItem("cartItems");
        if (cartItems && cartItems !== "undefined" && cartItems !== "null") {
          const parsedCart = JSON.parse(cartItems);
          const validCartItems = Array.isArray(parsedCart)
            ? parsedCart.filter(
                (item) => item && item.id && item.name && item.price !== undefined && item.quantity > 0,
              )
            : [];

          if (validCartItems.length !== parsedCart.length || validCartItems.length > 0) {
            localStorage.setItem("cartItems", JSON.stringify(validCartItems));
            localStorage.setItem("cartLastUpdated", Date.now().toString());

            setTimeout(() => {
              window.dispatchEvent(new CustomEvent("cartUpdated", { detail: validCartItems }));
            }, 100);
          }
        }
      } catch (_error) {
        // Keep app resilient if stored state is malformed.
      }
    };

    restoreApplicationState();
  }, []);

  return (
    <div className="App">
      <ScrollToTop />
      <RouteSeo />
      <Header />
      <main>
        <Suspense fallback={<div className="page-loading">Loading...</div>}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about-us" element={<AboutUs />} />
            <Route path="/categories" element={<Categories />} />
            <Route path="/category/:slug" element={<CategoryPage />} />
            <Route path="/category-products/:slug" element={<CategoryProducts />} />
            <Route path="/products" element={<Products />} />
            <Route path="/product-details/:slug/:id" element={<ProductDetails />} />
            <Route path="/surveillance" element={<Surveillance />} />
            <Route path="/testimonials" element={<Testimonials />} />
            <Route path="/contact-us" element={<ContactUs />} />
            <Route path="/terms-of-use" element={<TermsOfUse />} />
            <Route path="/terms-of-sales" element={<TermsOfSales />} />
            <Route path="/terms-and-conditions" element={<TermsAndConditions />} />
            <Route path="/privacy-policy" element={<PrivacyPolicy />} />
            <Route path="/account-deletion" element={<AccountDeletion />} />
            <Route path="/contact/account-deletion" element={<Navigate to="/account-deletion" replace />} />
            <Route path="/our-privacy-policy" element={<Navigate to="/privacy-policy" replace />} />
            <Route path="/sign-in" element={<SignIn />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/track-order" element={<TrackOrder />} />
            <Route path="/view-cart" element={<ViewCart />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/checkout-success" element={<CheckoutSuccess />} />
            <Route path="/checkout-failure" element={<CheckoutFailure />} />
            <Route
              path="/smart-door-lock-installation-:city"
              element={<IntentLandingPage intentSlug="smart-door-lock-installation" />}
            />
            <Route
              path="/cctv-camera-security-:city"
              element={<IntentLandingPage intentSlug="cctv-camera-security" />}
            />
            <Route
              path="/gps-tracker-anti-theft-:city"
              element={<IntentLandingPage intentSlug="gps-tracker-anti-theft" />}
            />
            <Route
              path="/office-cctv-installation-:city"
              element={<IntentLandingPage intentSlug="office-cctv-installation" />}
            />
            <Route
              path="/vehicle-gps-tracker-installation-:city"
              element={<IntentLandingPage intentSlug="vehicle-gps-tracker-installation" />}
            />
            <Route
              path="/home-security-system-upgrade-:city"
              element={<IntentLandingPage intentSlug="home-security-system-upgrade" />}
            />
            <Route
              path="/hourly-surveillance-service"
              element={<SurveillanceServiceLanding planType="hourly" />}
            />
            <Route
              path="/monthly-surveillance-service"
              element={<SurveillanceServiceLanding planType="monthly" />}
            />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </main>
      <Footer />
    </div>
  );
}

function App() {
  return (
    <Router>
      <AppShell />
    </Router>
  );
}

export default App;
