import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { image } from "../utils/asset";

const Header = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [cartCount, setCartCount] = useState(0);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [openSubmenu, setOpenSubmenu] = useState(null);

  // ✅ Login state management
  const [isUserLoggedIn, setIsUserLoggedIn] = useState(false);
  const [userName, setUserName] = useState("");
  // 🔹 helper functions OUTSIDE useEffect
  const loadCartFromStorage = () => {
    try {
      const savedCartItems = localStorage.getItem("cartItems");

      if (
        savedCartItems &&
        savedCartItems !== "[]" &&
        savedCartItems !== "null" &&
        savedCartItems !== "undefined"
      ) {
        const parsed = JSON.parse(savedCartItems);
        const validItems = Array.isArray(parsed) ? parsed : [];

        setCartItems(validItems);
        setCartCount(validItems.reduce((t, i) => t + (i.quantity || 0), 0));
      } else {
        setCartItems([]);
        setCartCount(0);
      }
    } catch {
      setCartItems([]);
      setCartCount(0);
    }
  };

  const checkLoginStatus = () => {
    try {
      const userToken = localStorage.getItem("userToken");
      const userPhone = localStorage.getItem("userPhone");
      const userVerified = localStorage.getItem("userVerified");
      const loginTimestamp = localStorage.getItem("loginTimestamp");

      if (userToken && userPhone && userVerified === "true" && loginTimestamp) {
        const loginTime = parseInt(loginTimestamp, 10);
        const maxAge = 30 * 24 * 60 * 60 * 1000;

        if (Date.now() - loginTime < maxAge) {
          setIsUserLoggedIn(true);

          const savedUserInfo = localStorage.getItem("userInfo");
          if (savedUserInfo) {
            try {
              const userInfo = JSON.parse(savedUserInfo);
              setUserName(
                userInfo.name ||
                  userInfo.firstName ||
                  `User ${userPhone.slice(-4)}`
              );
            } catch {
              setUserName(`User ${userPhone.slice(-4)}`);
            }
          } else {
            setUserName(`User ${userPhone.slice(-4)}`);
          }
          return;
        }
      }

      setIsUserLoggedIn(false);
      setUserName("");
    } catch {
      setIsUserLoggedIn(false);
      setUserName("");
    }
  };

  // 🔹 SINGLE useEffect (NO NESTING)
  useEffect(() => {
    // initial load
    loadCartFromStorage();
    checkLoginStatus();

    const handleCartUpdate = (event) => {
      const updatedItems = Array.isArray(event.detail) ? event.detail : [];
      setCartItems(updatedItems);
      setCartCount(
        updatedItems.reduce((total, item) => total + (item.quantity || 0), 0)
      );
    };

    const handleUserLogin = () => {
      checkLoginStatus();
    };

    const handleLogout = () => {
      setIsUserLoggedIn(false);
      setUserName("");

      localStorage.removeItem("userToken");
      localStorage.removeItem("verificationToken");
      localStorage.removeItem("userPhone");
      localStorage.removeItem("userVerified");
      localStorage.removeItem("loginTimestamp");
      localStorage.removeItem("loginData");
      localStorage.removeItem("sessionData");
      localStorage.removeItem("userInfo");
      localStorage.removeItem("userProfile");
      localStorage.removeItem("sessionArrayData");

      window.dispatchEvent(new CustomEvent("userLoggedOut"));
      navigate("/sign-in");
    };

    const handleStorageChange = (event) => {
      if (event.key === "cartItems") {
        loadCartFromStorage();
      } else if (event.key === "userToken" && !event.newValue) {
        setIsUserLoggedIn(false);
        setUserName("");
      }
    };

    const handleVisibilityChange = () => {
      if (!document.hidden) {
        loadCartFromStorage();
      }
    };

    const handlePopstate = () => {
      loadCartFromStorage();
    };

    window.addEventListener("cartUpdated", handleCartUpdate);
    window.addEventListener("storage", handleStorageChange);
    document.addEventListener("visibilitychange", handleVisibilityChange);
    window.addEventListener("popstate", handlePopstate);
    window.addEventListener("userLoggedIn", handleUserLogin);
    window.addEventListener("userLoggedOut", handleLogout);

    return () => {
      window.removeEventListener("cartUpdated", handleCartUpdate);
      window.removeEventListener("storage", handleStorageChange);
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      window.removeEventListener("popstate", handlePopstate);
      window.removeEventListener("userLoggedIn", handleUserLogin);
      window.removeEventListener("userLoggedOut", handleLogout);
    };
  }, []);

  // Save cart items to localStorage whenever cartItems changes
  useEffect(() => {
    const saveCartToStorage = async () => {
      try {
        // Preferred method
        const { StorageUtils } = await import("../utils/storage.js");
        StorageUtils.saveCart(cartItems);
      } catch (error) {
        // Fallback method
        try {
          localStorage.setItem("cartItems", JSON.stringify(cartItems));
          localStorage.setItem("cartLastUpdated", Date.now().toString());
        } catch {
          // silent fail
        }
      }
    };

    saveCartToStorage();
  }, [cartItems]);

  // Global cart functions
  useEffect(() => {
    window.headerCartFunctions = {
      addToCart: (product) => {
        const productQuantity = Math.max(1, product.quantity || 1);

        setCartItems((prevItems) => {
          const existingItem = prevItems.find(
            (item) => item.name === product.name || item.id === product.id
          );
          let updatedItems;

          if (existingItem) {
            updatedItems = prevItems.map((item) =>
              item.name === product.name || item.id === product.id
                ? { ...item, quantity: existingItem.quantity + productQuantity }
                : item
            );
          } else {
            const newItem = {
              ...product,
              quantity: productQuantity,
              id: product.id || `product-${Date.now()}`,
              addedAt: Date.now(),
            };
            updatedItems = [...prevItems, newItem];
          }

          // Calculate total cart count
          const newCartCount = updatedItems.reduce(
            (total, item) => total + item.quantity,
            0
          );
          setCartCount(newCartCount);

          // Save to localStorage
          const saveCartToLocalStorage = async () => {
            const maxAttempts = 3;
            for (let attempt = 1; attempt <= maxAttempts; attempt++) {
              try {
                const cartData = JSON.stringify(updatedItems);
                localStorage.setItem("cartItems", cartData);
                localStorage.setItem("cartLastUpdated", Date.now().toString());

                const verification = localStorage.getItem("cartItems");
                if (verification === cartData) {
                  window.dispatchEvent(
                    new StorageEvent("storage", {
                      key: "cartItems",
                      newValue: cartData,
                      url: window.location.href,
                    })
                  );
                  break;
                } else {
                  throw new Error("Save verification failed");
                }
              } catch (error) {
                if (attempt === maxAttempts) {
                  alert(
                    "Warning: Cart data may not persist after refresh. Please try adding items again."
                  );
                }
              }
            }
          };

          saveCartToLocalStorage();

          setTimeout(() => {
            const cartCountEl = document.querySelector(".cart-count");
            if (cartCountEl) {
              cartCountEl.classList.add("updated");
              setTimeout(() => cartCountEl.classList.remove("updated"), 600);
            }
          }, 100);

          return updatedItems;
        });
      },
      updateCartCount: (newCount) => {
        setCartCount(newCount);
        // Add visual feedback for cart count update
        setTimeout(() => {
          const cartCountEl = document.querySelector(".cart-count");
          if (cartCountEl) {
            cartCountEl.classList.add("updated");
            setTimeout(() => cartCountEl.classList.remove("updated"), 600);
          }
        }, 100);
      },
      openCart: () => {
        setIsCartOpen(true);
        document.body.style.overflow = "hidden";
      },
      closeCart: () => {
        setIsCartOpen(false);
        document.body.style.overflow = "auto";
      },
    };

    return () => {
      delete window.headerCartFunctions;
    };
  }, []);

  const toggleCart = () => {
    setIsCartOpen(!isCartOpen);
    if (!isCartOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  };

  const closeCart = () => {
    setIsCartOpen(false);
    document.body.style.overflow = "auto";
  };

  // Add escape key functionality
  useEffect(() => {
    const handleEscapeKey = (e) => {
      if (e.key === "Escape" && isCartOpen) {
        closeCart();
      }
    };

    if (isCartOpen) {
      document.addEventListener("keydown", handleEscapeKey);
      return () => {
        document.removeEventListener("keydown", handleEscapeKey);
      };
    }
  }, [isCartOpen]);

  const removeItem = (itemId) => {
    const updatedItems = cartItems.filter((item) => item.id !== itemId);

    setCartItems(updatedItems);

    const newCartCount = updatedItems.reduce(
      (total, item) => total + item.quantity,
      0
    );
    setCartCount(newCartCount);

    try {
      localStorage.setItem("cartItems", JSON.stringify(updatedItems));
    } catch (error) {
      // Silent fail
    }

    window.dispatchEvent(
      new CustomEvent("cartUpdated", { detail: updatedItems })
    );

    const removedItem = cartItems.find((item) => item.id === itemId);
    if (removedItem) {
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
      messageEl.textContent = `${removedItem.name} removed from cart`;
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
  };

  const updateQuantity = (itemId, newQuantity) => {
    if (newQuantity <= 0) {
      removeItem(itemId);
      return;
    }

    const updatedItems = cartItems.map((item) =>
      item.id === itemId ? { ...item, quantity: newQuantity } : item
    );

    setCartItems(updatedItems);

    const newCartCount = updatedItems.reduce(
      (total, item) => total + item.quantity,
      0
    );
    setCartCount(newCartCount);

    try {
      localStorage.setItem("cartItems", JSON.stringify(updatedItems));
    } catch (error) {
      // Silent fail
    }

    window.dispatchEvent(
      new CustomEvent("cartUpdated", { detail: updatedItems })
    );
  };

  const calculateSubtotal = () => {
    return cartItems.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );
  };

  const getTotalItems = () => {
    return cartItems.reduce((total, item) => total + item.quantity, 0);
  };

  const toggleMobileMenu = () => {
    const newState = !isMobileMenuOpen;
    setIsMobileMenuOpen(newState);
    if (newState) {
      document.body.classList.add("overlay");
      document.body.style.overflow = "hidden";
    } else {
      document.body.classList.remove("overlay");
      document.body.style.overflow = "auto";
      setOpenSubmenu(null); // Close any open submenus
    }
  };

  const toggleSubmenu = (e, menuName) => {
    e.preventDefault();
    e.stopPropagation();
    console.log("Toggle clicked for:", menuName, "Current state:", openSubmenu);

    // Mobile में proper toggle functionality
    if (window.innerWidth <= 768) {
      if (openSubmenu === menuName) {
        // Already open, so close it
        setOpenSubmenu(null);
      } else {
        // Close any other open menu first, then open this one
        setOpenSubmenu(menuName);
      }
    } else {
      // Desktop behavior - only for regular submenus, not megamenu
      if (menuName !== "categories") {
        setOpenSubmenu(openSubmenu === menuName ? null : menuName);
      }
    }
  };

  const handleMegamenuClick = (e) => {
    // Only prevent propagation if not clicking on a link
    if (!e.target.closest("a")) {
      e.stopPropagation();
    }
  };

  const handleMegamenuMouseEnter = () => {
    if (window.innerWidth > 768) {
      setOpenSubmenu("categories");
    }
  };

  const handleMegamenuMouseLeave = () => {
    if (window.innerWidth > 768) {
      // Add longer delay to prevent menu from closing when moving to megamenu content
      setTimeout(() => {
        setOpenSubmenu(null);
      }, 300);
    }
  };

  const handleMegamenuContentMouseEnter = (e) => {
    e.stopPropagation();
  };

  const handleMegamenuContentMouseLeave = (e) => {
    e.stopPropagation();
  };

  const handleMegamenuLinkClick = () => {
    // Don't prevent default navigation - let the link work normally
    // Just close the megamenu after click
    setTimeout(() => {
      setOpenSubmenu(null);
      setIsMobileMenuOpen(false);
      document.body.classList.remove("overlay");
      document.body.style.overflow = "auto";
    }, 100);
  };

  // Close mobile menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      const navLinks = document.querySelector(".nav-links");
      const toggleBtn = document.querySelector(".toggleBtn");
      const megamenuParent = document.querySelector(".megamenu-parent");

      // Don't close if clicking on navigation or toggle button
      if (
        isMobileMenuOpen &&
        !navLinks?.contains(event.target) &&
        !toggleBtn?.contains(event.target)
      ) {
        setIsMobileMenuOpen(false);
        document.body.classList.remove("overlay");
        document.body.style.overflow = "auto";
        setOpenSubmenu(null);
      }

      // Close megamenu when clicking outside (for desktop)
      if (
        window.innerWidth > 768 &&
        openSubmenu === "categories" &&
        !megamenuParent?.contains(event.target)
      ) {
        setOpenSubmenu(null);
      }
    };

    document.addEventListener("click", handleClickOutside);
    document.addEventListener("touchend", handleClickOutside);

    return () => {
      document.removeEventListener("click", handleClickOutside);
      document.removeEventListener("touchend", handleClickOutside);
    };
  }, [isMobileMenuOpen, openSubmenu]);

  const handleSubmenuLinkClick = () => {
    setIsMobileMenuOpen(false);
    document.body.classList.remove("overlay");
    document.body.style.overflow = "auto";
  };

  const handleRemoveFromCart = (itemId) => {
    const updatedItems = cartItems.filter((item) => item.id !== itemId);
    setCartItems(updatedItems);

    // Update cart count
    const newCartCount = updatedItems.reduce(
      (total, item) => total + item.quantity,
      0
    );
    setCartCount(newCartCount);

    localStorage.setItem("cartItems", JSON.stringify(updatedItems));
    window.dispatchEvent(
      new CustomEvent("cartUpdated", { detail: updatedItems })
    );
  };
  // Handle Download App click (navigate + scroll to demo)
  const handleDownloadClick = (e) => {
    e.preventDefault();

    if (location.pathname === "/") {
      // Already on home — just scroll
      const section = document.getElementById("demo");
      if (section) {
        section.scrollIntoView({ behavior: "smooth" });
      }
    } else {
      sessionStorage.setItem("scrollToDemo", "1");
      navigate("/");
    }
  };

  // Scroll to demo automatically on deep-link request
  useEffect(() => {
    const shouldScroll = location.hash === "#demo" || sessionStorage.getItem("scrollToDemo") === "1";
    if (shouldScroll) {
      sessionStorage.removeItem("scrollToDemo");
      const section = document.getElementById("demo");
      if (section) {
        setTimeout(() => {
          section.scrollIntoView({ behavior: "smooth" });
        }, 500);
      }
    }
  }, [location]);

  return (
    <header>
      <div className="top-header">
        <div className="wrapper inner-box between-center">
          <div className="contact-info">
            <a href="mailto:connect@corelens.in">
              <img src={image("email.svg")} alt="email" className="email" />
              connect@corelens.in
            </a>
            <a href="tel:1800-313-4207">
              <img src={image("phone.svg")} alt="phone" className="phone" />
              1800-313-4207
            </a>
          </div>
          <ul className="social-icons">
            <li>
              <a
                href="https://www.facebook.com/profile.php?id=61552698689659"
                target="_blank"
              >
                <img src={image("social-icon/facebook.svg")} alt="facebook" />
              </a>
            </li>
            <li>
              <a href="https://www.youtube.com/@corelensindia" target="_blank">
                <img src={image("social-icon/youtube.svg")} alt="Youtube" />
              </a>
            </li>
            <li>
              <a
                href="https://www.linkedin.com/in/corelens-india-612605327/"
                target="_blank"
              >
                <img src={image("social-icon/linkedin.png")} alt="Linkedin" />
              </a>
            </li>
            <li>
              <a href="https://x.com/corelensindia" target="_blank">
                <img src={image("social-icon/twitter.svg")} alt="Twitter" />
              </a>
            </li>
            <li>
              <a
                href="https://www.instagram.com/corelensofficial/?hl=en"
                target="_blank"
              >
                <img src={image("social-icon/instagram.svg")} alt="Instagram" />
              </a>
            </li>
          </ul>
        </div>
      </div>
      <div className="main-header">
        <div className="wrapper inner-box between-center">
          <div className="toggleBtn" onClick={toggleMobileMenu}>
            <img src={image("toggle.svg")} alt="Hamburger icon" />
          </div>
          <Link to="/" className="logo">
            <img src={image("logo.svg")} alt="corelens logo" />
          </Link>
          <ul className={`nav-links ${isMobileMenuOpen ? "slide" : ""}`}>
            <li className={location.pathname === "/" ? "active" : ""}>
              <Link
                to="/"
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  document.body.classList.remove("overlay");
                  document.body.style.overflow = "auto";
                }}
              >
                Home
              </Link>
            </li>
            <li
              className={location.pathname === "/surveillance" ? "active" : ""}
            >
              <Link
                to="/surveillance"
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  document.body.classList.remove("overlay");
                  document.body.style.overflow = "auto";
                }}
              >
                Surveillance
              </Link>
            </li>
            <li
              className={`megamenu-parent ${
                openSubmenu === "categories" ? "open" : ""
              }`}
              onMouseEnter={handleMegamenuMouseEnter}
              onMouseLeave={handleMegamenuMouseLeave}
            >
              <a
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  if (window.innerWidth <= 768) {
                    toggleSubmenu(e, "categories");
                  }
                }}
              >
                Categories
              </a>
              <span
                className={`arrowSign ${
                  openSubmenu === "categories" ? "rotate" : ""
                }`}
                onClick={(e) => toggleSubmenu(e, "categories")}
                onTouchStart={(e) => toggleSubmenu(e, "categories")}
                role="button"
                tabIndex={0}
              ></span>
              <div
                className={`megamenu ${
                  openSubmenu === "categories" ? "active" : ""
                }`}
                onClick={handleMegamenuClick}
                onMouseEnter={handleMegamenuContentMouseEnter}
                onMouseLeave={handleMegamenuContentMouseLeave}
              >
                <div className="megamenu-container">
                  <div className="megamenu-mobile-category">
                    <ul className="megamenu-mobile-list">
                      <li>
                        <Link
                          to="/category/door-locks"
                          onClick={handleMegamenuLinkClick}
                        >
                          Door Locks
                        </Link>
                      </li>
                      <li>
                        <Link
                          to="/category/cam-sensors"
                          onClick={handleMegamenuLinkClick}
                        >
                          Cam Sensors
                        </Link>
                      </li>
                      <li>
                        <Link
                          to="/category/gps-trackers"
                          onClick={handleMegamenuLinkClick}
                        >
                          GPS Trackers
                        </Link>
                      </li>
                      <li>
                        <Link
                          to="/category/motion-sensors"
                          onClick={handleMegamenuLinkClick}
                        >
                          Motion Sensors
                        </Link>
                      </li>
                      <li>
                        <Link
                          to="/category/accessories"
                          onClick={handleMegamenuLinkClick}
                        >
                          Accessories
                        </Link>
                      </li>
                    </ul>
                  </div>
                  <div className="megamenu-row">
                    <Link
                      to="/category/door-locks"
                      className="megamenu-product-item"
                      onClick={handleMegamenuLinkClick}
                    >
                      <div className="megamenu-product-image">
                        <img
                          src={image("home/doorlock-category.png")}
                          alt="Door Locks"
                        />
                      </div>
                      <p className="megamenu-product-name">Door Locks</p>
                    </Link>
                    <Link
                      to="/category/cam-sensors"
                      className="megamenu-product-item"
                      onClick={handleMegamenuLinkClick}
                    >
                      <div className="megamenu-product-image">
                        <img
                          src={image("home/corelens-camera-category.png")}
                          alt="Cam Sensors"
                        />
                      </div>
                      <p className="megamenu-product-name">Cam Sensors</p>
                    </Link>
                    <Link
                      to="/category/gps-trackers"
                      className="megamenu-product-item"
                      onClick={handleMegamenuLinkClick}
                    >
                      <div className="megamenu-product-image">
                        <img
                          src={image("home/corelens-gps-tracking-category.png")}
                          alt="GPS Trackers"
                        />
                      </div>
                      <p className="megamenu-product-name">GPS Trackers</p>
                    </Link>
                    <Link
                      to="/category/motion-sensors"
                      className="megamenu-product-item"
                      onClick={handleMegamenuLinkClick}
                    >
                      <div className="megamenu-product-image">
                        <img
                          src={image("home/motion-sensor.png")}
                          alt="Motion Sensors"
                        />
                      </div>
                      <p className="megamenu-product-name">Motion Sensors</p>
                    </Link>
                    <Link
                      to="/category/accessories"
                      className="megamenu-product-item"
                      onClick={handleMegamenuLinkClick}
                    >
                      <div className="megamenu-product-image">
                        <img
                          src={image("home/mercusys-mr30g.png")}
                          alt="Accessories"
                        />
                      </div>
                      <p className="megamenu-product-name">Accessories</p>
                    </Link>
                  </div>
                </div>
              </div>
            </li>

            <li
              className={location.pathname === "/track-order" ? "active" : ""}
            >
              <Link
                to="/track-order"
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  document.body.classList.remove("overlay");
                  document.body.style.overflow = "auto";
                }}
              >
                Track my order
              </Link>
            </li>
            <li
              className={location.pathname === "/testimonials" ? "active" : ""}
            >
              <Link
                className="testimonials"
                to="/testimonials"
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  document.body.classList.remove("overlay");
                  document.body.style.overflow = "auto";
                }}
              >
                Testimonials
              </Link>
            </li>
            <li className={location.pathname === "/about-us" ? "active" : ""}>
              <Link
                className="aboutusnv"
                to="/about-us"
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  document.body.classList.remove("overlay");
                  document.body.style.overflow = "auto";
                }}
              >
                About Us
              </Link>
            </li>
          </ul>
          <div className="right-header">
            <a
              rel="noopener noreferrer"
              className="appdownload"
              onClick={handleDownloadClick}
            >
              Download App
            </a>
            {/* ✅ Conditional login/username display */}
            {isUserLoggedIn ? (
              <button
                onClick={() => navigate("/dashboard")}
                className="login-btn user-btn"
                title="Go to Dashboard"
              >
                My Account
              </button>
            ) : (
              <Link to="/sign-in" className="login-btn">
                Login
              </Link>
            )}
            <div className="cart-container">
              <a
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  toggleCart();
                }}
                className="cart-link"
              >
                <img
                  src={image("app-store.svg")}
                  alt="Add to Cart"
                  className="add-to-cart-icon"
                />
                <span className="cart-count">{cartCount}</span>
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div
          className="overlay-backdrop"
          onClick={() => {
            setIsMobileMenuOpen(false);
            document.body.classList.remove("overlay");
            document.body.style.overflow = "auto";
            setOpenSubmenu(null);
          }}
          onTouchEnd={() => {
            setIsMobileMenuOpen(false);
            document.body.classList.remove("overlay");
            document.body.style.overflow = "auto";
            setOpenSubmenu(null);
          }}
        ></div>
      )}

      {/* Cart Modal */}
      <div
        className={`cart-overlay ${isCartOpen ? "active" : ""}`}
        onClick={(e) => {
          if (e.target === e.currentTarget) closeCart();
        }}
      >
        <div className="cart-modal">
          <div className="cart-header">
            <h2>Your cart</h2>
            <button className="cart-close" onClick={closeCart}>
              &times;
            </button>
          </div>

          <div className="cart-items">
            {cartItems.length === 0 ? (
              <div className="empty-cart">
                <div className="empty-cart-icon">🛒</div>
                <h3>Your cart is empty</h3>
                <p>Add some products to get started!</p>
              </div>
            ) : (
              cartItems.map((item) => (
                <div key={item.id} className="cart-item cart-item-horizontal">
                  <div className="item-image">
                    <img src={item.image} alt={item.name} />
                  </div>

                  <div className="item-details">
                    <h4 className="item-name">{item.name}</h4>
                    <div className="item-price-details-modal">
                      <div className="price-info-modal">
                        {((item.originalPrice &&
                          item.originalPrice > item.price) ||
                          (item.mrp && item.mrp > item.price)) && (
                          <>
                            <span className="item-original-price-modal">
                              ₹
                              {(
                                item.originalPrice ||
                                item.mrp ||
                                item.price
                              ).toLocaleString("en-IN")}
                            </span>
                            <span className="item-discount-modal">
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
                                    100
                                )}
                              % OFF
                            </span>
                          </>
                        )}
                      </div>
                    </div>
                    <div className="item-price-row">
                      <div className="quantity-controls-cart">
                        <button
                          className="qty-btn-cart"
                          onClick={(e) => {
                            e.stopPropagation();
                            updateQuantity(
                              item.id,
                              Math.max(0, item.quantity - 1)
                            );
                          }}
                        >
                          -
                        </button>
                        <span className="qty-display-cart">
                          {item.quantity}
                        </span>
                        <button
                          className="qty-btn-cart"
                          onClick={(e) => {
                            e.stopPropagation();
                            updateQuantity(item.id, item.quantity + 1);
                          }}
                        >
                          +
                        </button>
                      </div>
                      <div className="item-total-price">
                        ₹
                        {Math.round(item.price * item.quantity).toLocaleString(
                          "en-IN"
                        )}
                      </div>
                    </div>
                  </div>
                  <button
                    className="remove-item"
                    onClick={() => removeItem(item.id)}
                  >
                    &times;
                  </button>
                </div>
              ))
            )}
          </div>

          {cartItems.length > 0 && (
            <div className="cart-summary">
              <div className="subtotal">
                <span className="subtotal-label">
                  Subtotal ({getTotalItems()} items)
                </span>
                <span className="subtotal-amount">
                  ₹{calculateSubtotal().toLocaleString()}
                </span>
              </div>

              <div className="shipping-info">
                <div className="shipping-bar"></div>
              </div>

              <div className="cart-actions">
                <Link
                  to="/view-cart"
                  className="view-cart-btn"
                  onClick={closeCart}
                >
                  View cart
                </Link>
                <Link
                  to="/view-cart"
                  className="checkout-btn"
                  onClick={closeCart}
                >
                  Check out
                </Link>
              </div>

              <div className="free-shipping-note">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                  <path
                    d="M3 17H21L19 7H5L3 17Z"
                    stroke="currentColor"
                    strokeWidth="2"
                  />
                  <path
                    d="M8 21C9.1 21 10 20.1 10 19C10 17.9 9.1 17 8 17C6.9 17 6 17.9 6 19C6 20.1 6.9 21 8 21Z"
                    stroke="currentColor"
                    strokeWidth="2"
                  />
                  <path
                    d="M16 21C17.1 21 18 20.1 18 19C18 17.9 17.1 17 16 17C14.9 17 14 17.9 14 19C14 20.1 14.9 21 16 21Z"
                    stroke="currentColor"
                    strokeWidth="2"
                  />
                </svg>
                <span>Free shipping on all orders over ₹1,500</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
