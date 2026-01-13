import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { calculatePrices } from "../../utils/priceCalculator";
import "../Category/CategoryPage.css";

const ProductSection = ({ categorySlug, categoryName }) => {
  const [categoryProducts, setCategoryProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const API_TOKEN =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7Im5hbWUiOiJSTiBTaW5naCIsImVtYWlsIjoicmFtQHRoZWxtbS5pbiIsIm1vYmlsZV9udW1iZXIiOjcyMTc4MjM2MDAsInVzZXJfdHlwZSI6IkxvZ2luIiwiY2l0eSI6IkRlbGhpIiwiaXNBZG1pbiI6ZmFsc2UsInN0YXR1cyI6dHJ1ZSwidXNlcl9pZCI6IjEyNyIsInJlZF9mbGFnIjpmYWxzZSwicmVkX2ZsYWdfbWFya2VkX2F0IjpudWxsLCJpc0Jhbm5lZCI6ZmFsc2UsImlzRGVsZXRlZCI6ZmFsc2UsIl9pZCI6IjY4Y2QzMmRlNzc1YjhkMThiYTY3ZTU5MCIsImNyZWF0ZWRBdCI6IjIwMjUtMDktMTkiLCJfX3YiOjAsImlkIjoiNjhjZDMyZGU3NzViOGQxOGJhNjdlNTkwIn0sImlhdCI6MTc1ODI3ODM2Nn0.iklltO6pQa-nrfrj9S3ti_ImRzUJtjqCe7m1_zvld8Q";

  // Enhanced API category name mapping with multiple strategies
  const getAPICategoryName = (categorySlug) => {
    const mapping = {
      "door-locks": "Doorlock", // Match API response exactly
      "smart-doorlocks": "Doorlock", // Match API response exactly
      "cam-sensors": "Camera",
      "camera-sensors": "Camera",
      "gps-trackers": "Router", // GPS trackers are in Router category in API
      "motion-sensors": "Motion Sensor", // Exact match from API
      accessories: "Router",
    };
    return mapping[categorySlug] || null;
  };

  // Enhanced product filtering with strict name matching
  const getProductNameFilters = (categorySlug) => {
    const filters = {
      "gps-trackers": ["turbo", "moto"], // Only GPS tracker specific products
      accessories: ["mercusys", "ac12", "mr30g"], // Only router/networking accessories
      "cam-sensors": ["polo", "oval", "gem", "echo", "wave"], // Camera products
      "door-locks": ["ultra", "prime", "royale"], // Door lock products
      "motion-sensors": ["motion", "sensor"] // Motion sensor products
    };
    return filters[categorySlug] || null;
  };

  // Enhanced product matching function with strict filtering
  const matchesCategory = (product, categorySlug, apiCategoryName) => {
    if (!product || !product.name) return false;

    const productName = product.name.toLowerCase();
    const productCategoryName = product.category_id?.name;

    // For GPS Trackers - strict filtering
    if (categorySlug === "gps-trackers") {
      const isGPSProduct = productName.includes("turbo") || productName.includes("moto");
      const isRouterCategory = productCategoryName === "Router";
      
      if (isGPSProduct && isRouterCategory) {
        console.log(`✅ GPS Tracker match: ${product.name}`);
        return true;
      }
      return false; // Strict - only GPS products allowed
    }

    // For Accessories - strict filtering (exclude GPS products)
    if (categorySlug === "accessories") {
      const isAccessoryProduct = productName.includes("mercusys") || 
                                productName.includes("ac12") || 
                                productName.includes("mr30g");
      const isRouterCategory = productCategoryName === "Router";
      const isNotGPSProduct = !productName.includes("turbo") && !productName.includes("moto");
      
      if (isAccessoryProduct && isRouterCategory && isNotGPSProduct) {
        console.log(`✅ Accessory match: ${product.name}`);
        return true;
      }
      return false; // Strict - no GPS products in accessories
    }

    // Strategy 1: Exact category match (for non-Router categories)
    if (productCategoryName === apiCategoryName && apiCategoryName !== "Router") {
      console.log(`✅ Category match: ${product.name} -> ${productCategoryName}`);
      return true;
    }

    // Strategy 2: Product name filtering for other categories
    const nameFilters = getProductNameFilters(categorySlug);
    if (nameFilters) {
      const nameMatch = nameFilters.some(filter => productName.includes(filter.toLowerCase()));
      if (nameMatch) {
        console.log(`✅ Name filter match: ${product.name} -> ${categorySlug}`);
        return true;
      }
    }

    // Strategy 3: Special handling for door locks
    if (categorySlug === "door-locks" || categorySlug === "smart-doorlocks") {
      const isDoorlock = productCategoryName === "Doorlock" ||
                        productCategoryName === "Doorlocks" ||
                        productCategoryName === "Door Lock" ||
                        productCategoryName === "Door Locks" ||
                        productName.includes("door") ||
                        productName.includes("lock") ||
                        productName.includes("ultra") ||
                        productName.includes("prime") ||
                        productName.includes("royale");
      if (isDoorlock) {
        console.log(`✅ Door lock match: ${product.name}`);
        return true;
      }
    }

    return false;
  };

  // Generate random rating between 4.0 and 4.9
  const generateRandomRating = () => {
    return (Math.random() * 0.9 + 4.0).toFixed(1);
  };

  // Helper function to format price
  const formatPrice = (price) => {
    return `₹${Math.round(price).toLocaleString("en-IN")}`;
  };

  // Simple Add to Cart function with quantity tracking
  const handleAddToCart = (product) => {
    // Calculate consistent price
    const {
      currentPrice,
      originalPrice: calculatedOriginalPrice,
      discount,
      display_percentage,
    } = calculatePrices(product);

    // Create product object for cart
    const cartProduct = {
      id: `${product._id}-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      name: product.name,
      price: Math.round(currentPrice),
      originalPrice: Math.round(calculatedOriginalPrice),
      mrp: Math.round(calculatedOriginalPrice), // Assuming mrp is same as originalPrice for cart
      discount: discount,
      display_percentage: display_percentage,
      image: product.cover_photo_url || "/images/home/corelens-polo.png",
      quantity: 1, // Always add 1 quantity
    };

    // Add to cart using header functions
    if (window.headerCartFunctions) {
      window.headerCartFunctions.addToCart(cartProduct);

      // Open cart modal after adding product
      if (window.headerCartFunctions.openCart) {
        window.headerCartFunctions.openCart();
      }
    }
  };

  // Fetch products from API with proper category filtering
  const fetchCategoryProducts = async () => {
    try {
      setLoading(true);
      console.log("🔍 Fetching products for category:", categorySlug);

      // Add cache-busting parameters and headers to force fresh data
      const cacheBuster = `?limit=100&t=${Date.now()}&rand=${Math.random()}`;

      const response = await fetch(
        `https://backend.corelens.in/api/app/products${cacheBuster}`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${API_TOKEN}`,
            "Content-Type": "application/json",
            Accept: "application/json",
            "Cache-Control": "no-cache, no-store, must-revalidate",
            "Pragma": "no-cache",
            "Expires": "0",
          },
        },
      );

      console.log("📡 API Response Status:", response.status);

      // Handle 304 Not Modified specifically
      if (response.status === 304) {
        console.log("🔄 304 Not Modified - attempting to bypass cache...");
        // For 304, try to get data from cache or retry with different headers
        setLoading(false);
        return;
      }

      if (!response.ok) {
        console.error("❌ API Error:", response.status, response.statusText);
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      console.log("Full API Response:", data);

      if (data.success && data.data) {
        let allProducts = [];
        if (Array.isArray(data.data.docs)) {
          allProducts = data.data.docs;
        } else if (Array.isArray(data.data)) {
          allProducts = data.data;
        }

        console.log("All Products from API:", allProducts.length);
        const apiCategoryName = getAPICategoryName(categorySlug);
        console.log(
          `Looking for API category: "${apiCategoryName}" for slug: "${categorySlug}"`,
        );

        // Log all available categories from API
        const availableCategories = [
          ...new Set(
            allProducts.map((p) => p.category_id?.name).filter(Boolean),
          ),
        ];
        console.log("Available categories in API:", availableCategories);

        let filteredProducts = [];
        if (apiCategoryName) {
          console.log(`🔍 All products from API:`, allProducts.map(p => ({ name: p.name, category: p.category_id?.name })));
          console.log(`🎯 Looking for category: ${categorySlug} -> API category: ${apiCategoryName}`);

          // Enhanced product matching with multiple strategies
          filteredProducts = allProducts.filter((product) => {
            return matchesCategory(product, categorySlug, apiCategoryName);
          });

          console.log(
            `✅ Products found for ${categorySlug} (${apiCategoryName}):`,
            filteredProducts.length,
          );
          console.log("Matched products:", filteredProducts.map(p => ({ name: p.name, category: p.category_id?.name })));
        }

        console.log("Final filtered products:", filteredProducts);
        setCategoryProducts(filteredProducts);
        setError(null);
      }
    } catch (err) {
      console.error("Error fetching products:", err);
      setError(err.message || "Failed to load products");
      setCategoryProducts([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (categorySlug) {
      fetchCategoryProducts();
    }
  }, [categorySlug]);

  // Retry function for manual refresh
  const retryFetch = () => {
    console.log("🔄 Manual retry triggered...");
    fetchCategoryProducts();
  };

  // Default category name display
  const displayName = categoryName || "PRODUCTS";

  if (loading) {
    return (
      <section className="smart-lock-section">
        <div className="inner-wrap">
          <div className="smart-lock-container">
            <div className="smart-lock-heading">
              <h2 className="smart-lock-title">{displayName}</h2>
            </div>
            <div style={{ textAlign: "center", padding: "2rem 0" }}>
              Loading products...
            </div>
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="smart-lock-section">
        <div className="inner-wrap">
          <div className="smart-lock-container">
            <div className="smart-lock-heading">
              <h2 className="smart-lock-title">{displayName}</h2>
            </div>
            <div
              style={{ textAlign: "center", padding: "2rem 0", color: "red" }}
            >
              Error: {error}
              <br />
              <button 
                onClick={retryFetch}
                style={{
                  marginTop: "1rem",
                  padding: "0.5rem 1rem",
                  backgroundColor: "#007bff",
                  color: "white",
                  border: "none",
                  borderRadius: "4px",
                  cursor: "pointer"
                }}
              >
                Retry
              </button>
            </div>
          </div>
        </div>
      </section>
    );
  }

  if (!categoryProducts || categoryProducts.length === 0) {
    return (
      <section className="smart-lock-section">
        <div className="inner-wrap">
          <div className="smart-lock-container">
            <div className="smart-lock-heading">
              <h2 className="smart-lock-title">{displayName}</h2>
            </div>
            <div style={{ textAlign: "center", padding: "2rem 0" }}>
              No products found for this category.
              <br />
              <small>
                Category: {categorySlug} → API Category:{" "}
                {getAPICategoryName(categorySlug)}
              </small>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="smart-lock-section">
      <div className="inner-wrap">
        <div className="smart-lock-container">
          <div className="smart-lock-heading">
            <h2 className="smart-lock-title">{displayName}</h2>
          </div>
          <div className="smart-lock-products">
            {categoryProducts.map((product) => {
              const randomRating = parseFloat(generateRandomRating());

              // Use correct API fields for pricing
              const currentPrice =
                product.net_price ||
                product.selling_price ||
                product.price ||
                0;
              const originalPrice =
                product.price || product.mrp || product.MRP || 0;
              const discount =
                product.display_percentage ||
                product.discount_percentage ||
                product.discount ||
                0;

              // Generate clean slug from product name
              const productSlug = product.name
                .toLowerCase()
                .replace(/\s+/g, "-") // Replace spaces with hyphens
                .replace(/[^\w-]+/g, "") // Remove all non-word chars except hyphens
                .replace(/-+/g, "-") // Replace multiple consecutive dashes with single dash
                .replace(/^-|-$/g, ""); // Remove leading/trailing dashes

              console.log(`Product: ${product.name} -> Slug: ${productSlug}`);

              return (
                <div key={product._id} className="smart-lock-card">
                  {/* Discount Badge */}
                  {discount > 0 && (
                    <div className="new-badge">{discount}% OFF</div>
                  )}

                  <div className="smart-lock-image">
                    <Link to={`/product-details/${productSlug}/${product._id}`}>
                      <img
                        src={
                          product.cover_photo_url ||
                          "/images/home/corelens-polo.png"
                        }
                        alt={product.name}
                        onError={(e) => {
                          e.target.src = "/images/home/corelens-polo.png";
                        }}
                      />
                    </Link>
                  </div>

                  <div className="smart-lock-content">
                    {/* Product Name - clickable */}
                    <Link
                      to={`/product-details/${productSlug}/${product._id}`}
                      style={{ textDecoration: "none", color: "inherit" }}
                    >
                      <h3 className="smart-lock-name">{product.name}</h3>
                    </Link>

                    {/* Random Rating */}
                    <div className="smart-lock-rating">
                      <div className="stars">
                        {[...Array(Math.floor(randomRating))].map((_, i) => (
                          <span key={i} className="star filled">
                            ★
                          </span>
                        ))}
                        {randomRating % 1 !== 0 && (
                          <span className="star half">★</span>
                        )}
                        {[...Array(5 - Math.ceil(randomRating))].map((_, i) => (
                          <span key={i} className="star">
                            ★
                          </span>
                        ))}
                      </div>
                      <span className="rating-value">{randomRating}</span>
                    </div>

                    <div className="smart-lock-footer">
                      {/* Dynamic Price from calculated values */}
                      <span className="smart-lock-price">
                        {formatPrice(currentPrice)}
                      </span>
                      {originalPrice > 0 && originalPrice > currentPrice && (
                        <span
                          className="original-price"
                          style={{
                            textDecoration: "line-through",
                            color: "#999",
                            fontSize: "1.4rem",
                            marginLeft: "0.8rem",
                          }}
                        >
                          {formatPrice(originalPrice)}
                        </span>
                      )}

                      {/* Simple Add To Cart Button */}
                      <button
                        className="smart-lock-cart-btn"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleAddToCart(product);
                        }}
                      >
                        Add to Cart
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProductSection;