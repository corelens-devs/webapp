
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { calculatePrices } from "../utils/priceCalculator";
import "../css/style.css";

const CategoryProducts = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const API_TOKEN =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7Im5hbWUiOiJSTiBTaW5naCIsImVtYWlsIjoicmFtQHRoZWxtbS5pbiIsIm1vYmlsZV9udW1iZXIiOjcyMTc4MjM2MDAsInVzZXJfdHlwZSI6IkxvZ2luIiwiY2l0eSI6IkRlbGhpIiwiaXNBZG1pbiI6ZmFsc2UsInN0YXR1cyI6dHJ1ZSwidXNlcl9pZCI6IjEyNyIsInJlZF9mbGFnIjpmYWxzZSwicmVkX2ZsYWdfbWFya2VkX2F0IjpudWxsLCJpc0Jhbm5lZCI6ZmFsc2UsImlzRGVsZXRlZCI6ZmFsc2UsIl9pZCI6IjY4Y2QzMmRlNzc1YjhkMThiYTY3ZTU5MCIsImNyZWF0ZWRBdCI6IjIwMjUtMDktMTkiLCJfX3YiOjAsImlkIjoiNjhjZDMyZGU3NzViOGQxOGJhNjdlNTkwIn0sImlhdCI6MTc1ODI3ODM2Nn0.iklltO6pQa-nrfrj9S3ti_ImRzUJtjqCe7m1_zvld8Q";

  // Map API category names to friendly display names
  const categoryDisplayNames = {
    "Doorlock": "Smart Door Locks",
    "Camera": "Camera Sensors", 
    "Router": "Routers & Accessories",
    "Motion Sensor": "Motion Sensors"
  };

  // Generate random rating between 4.0 and 4.9
  const generateRandomRating = () => {
    return (Math.random() * 0.9 + 4.0).toFixed(1);
  };

  // Helper function to format price
  const formatPrice = (price) => {
    return `₹${Math.round(price).toLocaleString("en-IN")}`;
  };

  // Fetch all products and group by category
  const fetchCategoriesAndProducts = async () => {
    try {
      setLoading(true);
      console.log("🔍 Fetching all products from API...");

      const response = await fetch(
        "https://backend.corelens.in/api/app/products?limit=100",
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

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      console.log("API Response:", data);

      if (data.success && data.data) {
        let allProducts = [];
        if (Array.isArray(data.data.docs)) {
          allProducts = data.data.docs;
        } else if (Array.isArray(data.data)) {
          allProducts = data.data;
        }

        console.log("Total products found:", allProducts.length);

        // Group products by category
        const categorizedProducts = {};
        
        allProducts.forEach(product => {
          const categoryName = product.category_id?.name || "Other";
          if (!categorizedProducts[categoryName]) {
            categorizedProducts[categoryName] = [];
          }
          categorizedProducts[categoryName].push(product);
        });

        // Convert to array format for easier rendering
        const categoriesArray = Object.keys(categorizedProducts).map(categoryName => ({
          name: categoryName,
          displayName: categoryDisplayNames[categoryName] || categoryName,
          products: categorizedProducts[categoryName]
        }));

        console.log("Categories with products:", categoriesArray);
        setCategories(categoriesArray);
        setError(null);
      } else {
        throw new Error("No data received from API");
      }
    } catch (err) {
      console.error("Error fetching categories and products:", err);
      setError(err.message || "Failed to load categories and products");
      setCategories([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategoriesAndProducts();
  }, []);

  if (loading) {
    return (
      <div className="category-products-page">
        <div className="inner-wrap">
          <div style={{ textAlign: "center", padding: "4rem 0" }}>
            <h2>Loading Categories and Products...</h2>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="category-products-page">
        <div className="inner-wrap">
          <div style={{ textAlign: "center", padding: "4rem 0", color: "red" }}>
            <h2>Error: {error}</h2>
            <button 
              onClick={fetchCategoriesAndProducts}
              style={{
                marginTop: "1rem",
                padding: "0.8rem 1.5rem",
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
    );
  }

  return (
    <div className="category-products-page">
      <div className="inner-wrap">
        <div style={{ padding: "2rem 0" }}>
          <h1 style={{ textAlign: "center", marginBottom: "3rem", fontSize: "2.5rem" }}>
            All Categories & Products
          </h1>
          
          {categories.length === 0 ? (
            <div style={{ textAlign: "center", padding: "2rem 0" }}>
              <p>No categories or products found.</p>
            </div>
          ) : (
            categories.map((category, categoryIndex) => (
              <div key={categoryIndex} style={{ marginBottom: "4rem" }}>
                <h2 style={{ 
                  fontSize: "2rem", 
                  marginBottom: "2rem", 
                  color: "#333",
                  borderBottom: "2px solid #007bff",
                  paddingBottom: "0.5rem"
                }}>
                  {category.displayName} ({category.products.length} products)
                </h2>
                
                <div style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
                  gap: "2rem",
                  marginBottom: "2rem"
                }}>
                  {category.products.map((product) => {
                    const randomRating = parseFloat(generateRandomRating());
                    
                    // Calculate pricing using the existing utility for consistency
                    const {
                      currentPrice,
                      originalPrice,
                      discount,
                      display_percentage,
                    } = calculatePrices(product);

                    // Generate clean slug from product name
                    const productSlug = product.name
                      .toLowerCase()
                      .replace(/\s+/g, "-")
                      .replace(/[^\w-]+/g, "")
                      .replace(/-+/g, "-")
                      .replace(/^-|-$/g, "");

                    return (
                      <div 
                        key={product._id} 
                        style={{
                          border: "1px solid #ddd",
                          borderRadius: "8px",
                          padding: "1rem",
                          backgroundColor: "#fff",
                          boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
                          position: "relative"
                        }}
                      >
                        {/* Discount Badge */}
                        {discount > 0 && (
                          <div style={{
                            position: "absolute",
                            top: "10px",
                            right: "10px",
                            backgroundColor: "#ff4444",
                            color: "white",
                            padding: "0.3rem 0.6rem",
                            borderRadius: "4px",
                            fontSize: "0.8rem",
                            fontWeight: "bold"
                          }}>
                            {Math.round(discount)}% OFF
                          </div>
                        )}

                        {/* Product Image */}
                        <div style={{ textAlign: "center", marginBottom: "1rem" }}>
                          <Link to={`/product-details/${productSlug}/${product._id}`}>
                            <img
                              src={product.cover_photo_url || "/images/home/corelens-polo.png"}
                              alt={product.name}
                              style={{
                                width: "100%",
                                maxWidth: "200px",
                                height: "200px",
                                objectFit: "contain",
                                borderRadius: "4px"
                              }}
                              onError={(e) => {
                                e.target.src = "/images/home/corelens-polo.png";
                              }}
                            />
                          </Link>
                        </div>

                        {/* Product Details */}
                        <div>
                          <Link
                            to={`/product-details/${productSlug}/${product._id}`}
                            style={{ textDecoration: "none", color: "inherit" }}
                          >
                            <h3 style={{ 
                              fontSize: "1.2rem", 
                              marginBottom: "0.5rem",
                              color: "#333"
                            }}>
                              {product.name}
                            </h3>
                          </Link>

                          {/* Rating */}
                          <div style={{ 
                            display: "flex", 
                            alignItems: "center", 
                            marginBottom: "1rem" 
                          }}>
                            <div style={{ color: "#ffa500", marginRight: "0.5rem" }}>
                              {[...Array(Math.floor(randomRating))].map((_, i) => (
                                <span key={i}>★</span>
                              ))}
                              {randomRating % 1 !== 0 && <span>★</span>}
                              {[...Array(5 - Math.ceil(randomRating))].map((_, i) => (
                                <span key={i} style={{ color: "#ddd" }}>★</span>
                              ))}
                            </div>
                            <span style={{ fontSize: "0.9rem", color: "#666" }}>
                              {randomRating}
                            </span>
                          </div>

                          {/* Price */}
                          <div style={{ 
                            marginBottom: "1rem",
                            display: "flex",
                            alignItems: "center",
                            gap: "0.5rem"
                          }}>
                            <span style={{ 
                              fontSize: "1.4rem", 
                              fontWeight: "bold", 
                              color: "#007bff" 
                            }}>
                              {formatPrice(currentPrice)}
                            </span>
                            {originalPrice > 0 && originalPrice > currentPrice && (
                              <span style={{
                                textDecoration: "line-through",
                                color: "#999",
                                fontSize: "1rem"
                              }}>
                                {formatPrice(originalPrice)}
                              </span>
                            )}
                          </div>

                          {/* Product Description (truncated) */}
                          {product.description && (
                            <p style={{ 
                              fontSize: "0.9rem", 
                              color: "#666", 
                              marginBottom: "1rem",
                              overflow: "hidden",
                              textOverflow: "ellipsis",
                              display: "-webkit-box",
                              WebkitLineClamp: 2,
                              WebkitBoxOrient: "vertical"
                            }}>
                              {product.description}
                            </p>
                          )}

                          {/* View Details Button */}
                          <Link 
                            to={`/product-details/${productSlug}/${product._id}`}
                            style={{
                              display: "inline-block",
                              padding: "0.7rem 1.2rem",
                              backgroundColor: "#007bff",
                              color: "white",
                              textDecoration: "none",
                              borderRadius: "4px",
                              fontSize: "0.9rem",
                              fontWeight: "500",
                              textAlign: "center",
                              width: "100%",
                              boxSizing: "border-box"
                            }}
                          >
                            View Details
                          </Link>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default CategoryProducts;
