import React, { useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  useLocation,
} from "react-router-dom";

// Component to scroll to top on route change
function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}
import Header from "./components/Header.jsx";
import Footer from "./components/Footer.jsx";
import Home from "./pages/Home.jsx";
import AboutUs from "./pages/AboutUs.jsx";
import Categories from "./pages/Categories.jsx";
import Products from "./pages/Products.jsx";
import ProductDetails from "./pages/ProductDetails.jsx";
import ViewCart from "./pages/ViewCart.jsx";
import SignIn from "./pages/SignIn.jsx";
import TrackOrder from "./pages/TrackOrder.jsx";
import Testimonials from "./pages/Testimonials.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import Signup from "./pages/Signup.jsx";
import Surveillance from "./pages/Surveillance.jsx";
import CategoryPage from "./pages/CategoryPage.jsx";
import ContactUs from "./pages/ContactUs.jsx";
import TermsOfUse from "./pages/TermsOfUse.jsx";
import TermsOfSales from "./pages/TermsOfSales.jsx";
import TermsAndConditions from "./pages/TermsAndConditions.jsx";
import PrivacyPolicy from "./pages/PrivacyPolicy.jsx";
import AccountDeletion from "./pages/AccountDeletion.jsx";
import NotFound from "./pages/NotFound.jsx";
import CategoryProducts from "./pages/CategoryProducts";
import Checkout from "./pages/Checkout.jsx";
import CheckoutSuccess from "./pages/CheckoutSuccess.jsx";
import CheckoutFailure from "./pages/CheckoutFailure.jsx";

// Import main CSS file that includes all styles
import "./css/main.css";

function App() {
  useEffect(() => {
    const loadScripts = async () => {
      try {
        if (window.jQuery) {
          
        }
        if (window.WOW) {
          new window.WOW().init();
        }
      } catch (error) {
        
      }
    };

    const restoreApplicationState = async () => {
      try {
        const token = localStorage.getItem("userToken");
        const phone = localStorage.getItem("userPhone");
        const verified = localStorage.getItem("userVerified");
        const timestamp = localStorage.getItem("loginTimestamp");

        if (token && phone && verified === "true") {
          const loginTime = timestamp ? parseInt(timestamp) : Date.now();
          const maxAge = 30 * 24 * 60 * 60 * 1000;
          const isValid = Date.now() - loginTime < maxAge;

          if (isValid) {
            window.dispatchEvent(
              new CustomEvent("userLoggedIn", {
                detail: { phone: phone, token: token, isVerified: true },
              })
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
        const cartLastUpdated = localStorage.getItem("cartLastUpdated");

        if (cartItems && cartItems !== "undefined" && cartItems !== "null") {
          try {
            const parsedCart = JSON.parse(cartItems);
            const validCartItems = Array.isArray(parsedCart)
              ? parsedCart.filter(
                  (item) =>
                    item &&
                    item.id &&
                    item.name &&
                    item.price !== undefined &&
                    item.quantity > 0
                )
              : [];

            if (
              validCartItems.length !== parsedCart.length ||
              validCartItems.length > 0
            ) {
              try {
                localStorage.setItem(
                  "cartItems",
                  JSON.stringify(validCartItems)
                );
                localStorage.setItem("cartLastUpdated", Date.now().toString());

                setTimeout(() => {
                  window.dispatchEvent(
                    new CustomEvent("cartUpdated", { detail: validCartItems })
                  );
                }, 100);
              } catch (saveError) {
                
              }
            }
          } catch (error) {
            localStorage.removeItem("cartItems");
            localStorage.removeItem("cartLastUpdated");
          }
        }
      } catch (error) {
        
      }
    };

    loadScripts();
    restoreApplicationState();
  }, []);

  return (
    <Router>
      <div className="App">
        <ScrollToTop />
        <Header />
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about-us" element={<AboutUs />} />
            <Route path="/categories" element={<Categories />} />
            <Route path="/category/:slug" element={<CategoryPage />} />
            <Route
              path="/category-products/:slug"
              element={<CategoryProducts />}
            />
            <Route path="/products" element={<Products />} />
            <Route
              path="/product-details/:slug/:id"
              element={<ProductDetails />}
            />
            <Route path="/surveillance" element={<Surveillance />} />
            <Route path="/testimonials" element={<Testimonials />} />
            <Route path="/contact-us" element={<ContactUs />} />
            <Route path="/terms-of-use" element={<TermsOfUse />} />
            <Route path="/terms-of-sales" element={<TermsOfSales />} />
            <Route
              path="/terms-and-conditions"
              element={<TermsAndConditions />}
            />
            <Route path="/privacy-policy" element={<PrivacyPolicy />} />
            <Route path="/account-deletion" element={<AccountDeletion />} />
            <Route
              path="/contact/account-deletion"
              element={<Navigate to="/account-deletion" replace />}
            />
            <Route
              path="/our-privacy-policy"
              element={<Navigate to="/privacy-policy" replace />}
            />
            <Route path="/sign-in" element={<SignIn />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/track-order" element={<TrackOrder />} />
            <Route path="/view-cart" element={<ViewCart />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/checkout-success" element={<CheckoutSuccess />} />
            <Route path="/checkout-failure" element={<CheckoutFailure />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
