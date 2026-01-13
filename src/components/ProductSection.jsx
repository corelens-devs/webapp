import React, { useState, useEffect } from "react";
import { apiCall } from '../utils/api.js';
import { useNavigate } from "react-router-dom";
import "./ProductSection.css";
import { image } from "../utils/asset";
import { API_CONFIG } from "../utils/api";
import { normalizeProduct } from "../utils/priceCalculator";
const ProductSection = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  // Use hardcoded token for API requests
  const API_TOKEN =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7Im5hbWUiOiJSTiBTaW5naCIsImVtYWlsIjoicmFtQHRoZWxtbS5pbiIsIm1vYmlsZV9udW1iZXIiOjcyMTc4MjM2MDAsInVzZXJfdHlwZSI6IkxvZ2luIiwiY2l0eSI6IkRlbGhpIiwiaXNBZG1pbiI6ZmFsc2UsInN0YXR1cyI6dHJ1ZSwidXNlcl9pZCI6IjEyNyIsInJlZF9mbGFnIjpmYWxzZSwicmVkX2ZsYWdfbWFya2VkX2F0IjpudWxsLCJpc0Jhbm5lZCI6ZmFsc2UsImlzRGVsZXRlZCI6ZmFsc2UsIl9pZCI6IjY4Y2QzMmRlNzc1YjhkMThiYTY3ZTU5MCIsImNyZWF0ZWRBdCI6IjIwMjUtMDktMTkiLCJfX3YiOjAsImlkIjoiNjhjZDMyZGU3NzViOGQxOGJhNjdlNTkwIn0sImlhdCI6MTc1ODI3ODM2Nn0.iklltO6pQa-nrfrj9S3ti_ImRzUJtjqCe7m1_zvld8Q";

  // Map API category names to display categories
  const apiCategoryMapping = {
    Camera: "camera-sensors",
    Router: "accessories",
    Doorlocks: "smart-doorlocks",
    "Motion Sensor": "motion-sensors",
  };

  const categoryDisplayNames = {
    "camera-sensors": "CAMERA\nSENSORS",
    "smart-doorlocks": "SMART\nDOORLOCKS",
    "gps-trackers": "GPS\nTRACKERS",
    accessories: "ROUTER",
    "motion-sensors": "MOTION\nSENSORS",
  };

  // Define the order of categories to display
  const categoryOrder = [
    "camera-sensors",
    "smart-doorlocks",
    "gps-trackers",
    // "accessories",
    // "motion-sensors",
  ];

  // Special handling for GPS trackers (which are in Router category but are GPS products)
  const isGPSTracker = (productName) => {
    const name = productName.toLowerCase();
    return name.includes("turbo") || name.includes("moto");
  };

  // Special handling for Router accessories (exclude GPS products)
  const isRouterAccessory = (productName) => {
    const name = productName.toLowerCase();
    return (name.includes("mercusys") || name.includes("ac12") || name.includes("mr30g")) && 
           !name.includes("turbo") && !name.includes("moto");
  };

  // Format price with rupee symbol (rounded to remove decimals)
  const formatPrice = (price) => {
    return `₹${Math.round(price || 0)?.toLocaleString() || 0}`;
  };

  // Handle product click
  const handleProductClick = (product) => {
    console.log("Product clicked:", product);

    // For API products, generate slug and use slug/ID format
    if (product._id) {
      const productName = product.name || product.product_name || "product";
      const slug = productName
        .toLowerCase()
        .replace(/\s+/g, "-")
        .replace(/[^a-z0-9-]/g, "")
        .replace(/-+/g, "-")
        .replace(/^-|-$/g, "");
      const path = `/product-details/${slug}/${product._id}`;
      console.log("Navigating to API product:", path);
      navigate(path);
      return;
    }

    // If no _id, try to use slug for static products
    if (product.slug) {
      console.log(
        "Navigating to slug product:",
        `/product-details/${product.slug}`,
      );
      navigate(`/product-details/${product.slug}`);
      return;
    }

    // If no slug, try to generate one from product name for static products
    if (product.name || product.product_name) {
      const productName = product.name || product.product_name;
      const slug = productName
        .toLowerCase()
        .replace(/\s+/g, "-")
        .replace(/[^a-z0-9-]/g, "");
      console.log("Navigating to generated slug:", `/product-details/${slug}`);
      navigate(`/product-details/${slug}`);
      return;
    }

    console.warn("Could not determine navigation path for product:", product);
  };

  // Fetch products from API and group by categories
  const fetchProducts = async () => {
    try {
      setLoading(true);
      setError(null);
      console.log("🔍 Fetching products from API...");

      // Add cache-busting parameters to prevent 304 responses
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
        setError("Cache issue detected. Please refresh the page.");
        return;
      }

      if (!response.ok) {
        console.error("❌ API Error:", response.status, response.statusText);
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();

      if (data.success && data.data) {
        let allProducts = [];
        if (Array.isArray(data.data.docs)) {
          allProducts = data.data.docs;
        } else if (Array.isArray(data.data)) {
          allProducts = data.data;
        }

        if (allProducts.length === 0) {
          throw new Error("No products found in API response");
        }

        // Group products by categories
        const categorizedProducts = {};

        allProducts.forEach((product) => {
          const categoryName = product.category_id?.name || "Other";
          const productName = product.name || product.product_name || "";
          let categorySlug = apiCategoryMapping[categoryName] || categoryName.toLowerCase().replace(/\s+/g, "-");

          // Special handling for Router category products
          if (categoryName === "Router") {
            if (isGPSTracker(productName)) {
              categorySlug = "gps-trackers";
            } else if (isRouterAccessory(productName)) {
              categorySlug = "accessories";
            } else {
              // Skip unknown Router products
              return;
            }
          }

          if (!categorizedProducts[categorySlug]) {
            categorizedProducts[categorySlug] = [];
          }
          categorizedProducts[categorySlug].push(product);
        });

        // Filter to only include categories we want to display
        const filteredCategories = categoryOrder
          .map((categorySlug) => ({
            slug: categorySlug,
            name: categoryDisplayNames[categorySlug] || categorySlug,
            products: categorizedProducts[categorySlug] || [],
          }))
          .filter((category) => category.products.length > 0);

        setCategories(filteredCategories);

        if (filteredCategories.length === 0) {
          throw new Error("No products found for the configured categories");
        }
      } else {
        throw new Error("Invalid API response format");
      }
    } catch (err) {
      console.error("❌ Error fetching products:", err);
      setError(err.message || "Failed to load products");
      setCategories([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  if (loading) {
    return (
      <section className="productList-sec product-gradient">
        <section className="inner-wrap">
          <div className="title-group between-center">
            <h2 className="heading skyblue">
              Explore. buy. <br />
              Secure.
            </h2>
            <div className="discription">
              <p className="subtext text-white">
                Stay ahead of evolving threats with Corelens. From smart cameras
                to advanced door locks, our solutions
                <br className="hide" />
                are built to protect your home, office, and everything that
                matters most.
              </p>
            </div>
          </div>

          <div className="product-category-section">
            <div
              style={{
                textAlign: "center",
                color: "white",
                fontSize: "1.5rem",
                padding: "3rem 0",
              }}
            >
              Loading products...
            </div>
          </div>
        </section>
      </section>
    );
  }

  if (error) {
    return (
      <section className="productList-sec product-gradient">
        <section className="inner-wrap">
          <div className="title-group between-center">
            <h2 className="heading skyblue">
              Explore. buy. <br />
              Secure.
            </h2>
            <div className="discription">
              <p className="subtext text-white">
                Discover our comprehensive range of security solutions designed
                to protect what matters most.
              </p>
            </div>
          </div>

          <div className="product-category-section">
            <div
              style={{
                background: "rgba(255, 255, 255, 0.1)",
                borderRadius: "2rem",
                padding: "5rem 3rem",
                textAlign: "center",
                maxWidth: "600px",
                margin: "0 auto",
                backdropFilter: "blur(10px)",
                border: "1px solid rgba(255, 255, 255, 0.2)",
              }}
            >
              <button
                onClick={() => fetchProducts()}
                style={{
                  background: "#333",
                  color: "white",
                  border: "none",
                  padding: "1.5rem 3rem",
                  borderRadius: "0.8rem",
                  fontSize: "1.6rem",
                  fontWeight: "600",
                  cursor: "pointer",
                  transition: "all 0.3s ease",
                  display: "flex",
                  alignItems: "center",
                  gap: "1rem",
                  margin: "0 auto",
                }}
                onMouseEnter={(e) => {
                  e.target.style.background = "#555";
                  e.target.style.transform = "translateY(-2px)";
                }}
                onMouseLeave={(e) => {
                  e.target.style.background = "#333";
                  e.target.style.transform = "translateY(0)";
                }}
              >
                Try Again
                <span style={{ fontSize: "1.2rem" }}>→</span>
              </button>
            </div>
          </div>
        </section>
      </section>
    );
  }

  return (
    <section className="productList-sec product-gradient">
      <section className="inner-wrap">
        <div className="title-group between-center">
          <h2 className="heading skyblue">Explore. buy. Secure.</h2>
          <div className="discription">
            <p className="subtext text-white">
              Stay ahead of evolving threats with Corelens. From smart cameras
              to advanced door locks, our solutions are built to protect your
              home, office, and everything that matters most.
            </p>
          </div>
        </div>

        {categories.length === 0 ? (
          <div className="product-category-section">
            <div
              style={{
                textAlign: "center",
                color: "white",
                fontSize: "1.2rem",
                padding: "3rem 0",
              }}
            >
              No products found.
            </div>
          </div>
        ) : (
          categories.map((category, categoryIndex) => (
            <div key={category.slug} className="product-category-section">
              <div className="category-layout">
                <div className="category-header">
                  <h3>{category.name}</h3>
                </div>
                <div className="category-products">
                  {category.products
                    .slice(0, 5)
                    .map((product, productIndex) => {
                      // Log complete product data for debugging
                      console.log("Product API Prices Debug:", {
                        product_name: product.name,
                        id: product._id,
                        net_price: product.net_price,
                        price: product.price,
                        selling_price: product.selling_price,
                        mrp: product.mrp,
                        current_price: product.current_price,
                        original_price: product.original_price,
                        mrp_price: product.mrp_price,
                        discount_percentage: product.discount_percentage,
                        display_percentage: product.display_percentage,
                        offer_percentage: product.offer_percentage,
                      });

                      // Use correct API fields directly
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

                      // Log the final values for debugging
                      console.log(
                        "🔍 ProductSection - Using normalized values for",
                        product.product_name || product.name,
                        {
                          currentPrice: currentPrice,
                          originalPrice: originalPrice,
                          discount: discount,
                        },
                      );

                      return (
                        <div
                          key={product._id || product.slug || productIndex}
                          className="product-item"
                          onClick={() => handleProductClick(product)}
                          style={{
                            cursor: "pointer",
                            transition: "transform 0.5s ease",
                          }}
                          onMouseEnter={(e) => {
                            e.currentTarget.style.transform = "scale(1.02)";
                          }}
                          onMouseLeave={(e) => {
                            e.currentTarget.style.transform = "scale(1)";
                          }}
                        >
                          {discount > 0 && (
                            <div className="discount-badge">
                              {discount}% off
                            </div>
                          )}
                          <img
                            src={
                              product.image_url ||
                              product.cover_photo_url ||
                              image("corelens-polo.png")
                            }
                            alt={
                              product.product_name || product.name || "Product"
                            }
                            onError={(e) => {
                              e.target.src = image("corelens-polo.png");
                            }}
                          />
                          <h4>
                            {product.product_name ||
                              product.name ||
                              "Product Name"}
                          </h4>
                          <div className="pricing">
                            <span className="current-price">
                              {formatPrice(currentPrice)}
                            </span>
                            {originalPrice > 0 &&
                              originalPrice > currentPrice && (
                                <span className="original-price">
                                  {formatPrice(originalPrice)}
                                </span>
                              )}
                          </div>
                        </div>
                      );
                    })}
                </div>
              </div>
            </div>
          ))
        )}
      </section>
    </section>
  );
};

export default ProductSection;