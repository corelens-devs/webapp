import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { calculatePrices } from "../utils/priceCalculator";
import "../css/style.css";

const Products = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const API_TOKEN =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7Im5hbWUiOiJSTiBTaW5naCIsImVtYWlsIjoicmFtQHRoZWxtbS5pbiIsIm1vYmlsZV9udW1iZXIiOjcyMTc4MjM2MDAsInVzZXJfdHlwZSI6IkxvZ2luIiwiY2l0eSI6IkRlbGhpIiwiaXNBZG1pbiI6ZmFsc2UsInN0YXR1cyI6dHJ1ZSwidXNlcl9pZCI6IjEyNyIsInJlZF9mbGFnIjpmYWxzZSwicmVkX2ZsYWdfbWFya2VkX2F0IjpudWxsLCJpc0Jhbm5lZCI6ZmFsc2UsImlzRGVsZXRlZCI6ZmFsc2UsIl9pZCI6IjY4Y2QzMmRlNzc1YjhkMThiYTY3ZTU5MCIsImNyZWF0ZWRBdCI6IjIwMjUtMDktMTkiLCJfX3YiOjAsImlkIjoiNjhjZDMyZGU3NzViOGQxOGJhNjdlNTkwIn0sImlhdCI6MTc1ODI3ODM2Nn0.iklltO6pQa-nrfrj9S3ti_ImRzUJtjqCe7m1_zvld8Q";

  // Generate random rating between 4.0 and 4.9
  const generateRandomRating = () => {
    return (Math.random() * 0.9 + 4.0).toFixed(1);
  };

  // Helper function to format price
  const formatPrice = (price) => {
    return `₹${Math.round(price).toLocaleString("en-IN")}`;
  };

  // Fetch all products from API
  const fetchAllProducts = async () => {
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
        setProducts(allProducts);
        setError(null);
      } else {
        throw new Error("No data received from API");
      }
    } catch (err) {
      console.error("Error fetching products:", err);
      setError(err.message || "Failed to load products");
      setProducts([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAllProducts();
  }, []);

  if (loading) {
    return (
      <div className="products-page">
        <div className="inner-wrap">
          <div style={{ textAlign: "center", padding: "4rem 0" }}>
            <h2>Loading Products...</h2>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="products-page">
        <div className="inner-wrap">
          <div style={{ textAlign: "center", padding: "4rem 0", color: "red" }}>
            <h2>Error: {error}</h2>
            <button 
              onClick={fetchAllProducts}
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
    <div className="products-page">
      <div className="inner-wrap">
        <div style={{ padding: "2rem 0" }}>
          <div style={{ textAlign: "center", marginBottom: "3rem" }}>
            <h1 style={{ fontSize: "2.5rem", marginBottom: "1rem" }}>
              All Products
            </h1>
            <p style={{ fontSize: "1.2rem", color: "#666" }}>
              Discover our complete range of {products.length} smart security products
            </p>
            <div style={{ marginTop: "1rem" }}>
              <Link 
                to="/category-products"
                style={{
                  display: "inline-block",
                  padding: "0.8rem 1.5rem",
                  backgroundColor: "#28a745",
                  color: "white",
                  textDecoration: "none",
                  borderRadius: "4px",
                  fontSize: "1rem",
                  fontWeight: "500"
                }}
              >
                View by Categories
              </Link>
            </div>
          </div>

          {products.length === 0 ? (
            <div style={{ textAlign: "center", padding: "2rem 0" }}>
              <p>No products found.</p>
            </div>
          ) : (
            <div style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
              gap: "1.5rem"
            }}>
              {products.map((product) => {
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
                      position: "relative",
                      transition: "transform 0.2s, box-shadow 0.2s"
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.transform = "translateY(-2px)";
                      e.currentTarget.style.boxShadow = "0 4px 8px rgba(0,0,0,0.15)";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.transform = "translateY(0)";
                      e.currentTarget.style.boxShadow = "0 2px 4px rgba(0,0,0,0.1)";
                    }}
                  >
                    {/* Discount Badge */}
                    {display_percentage > 0 && (
                      <div style={{
                        position: "absolute",
                        top: "10px",
                        right: "10px",
                        backgroundColor: "#ff4444",
                        color: "white",
                        padding: "0.3rem 0.6rem",
                        borderRadius: "4px",
                        fontSize: "0.8rem",
                        fontWeight: "bold",
                        zIndex: 1
                      }}>
                        {display_percentage}% OFF
                      </div>
                    )}

                    {/* Category Badge */}
                    {product.category_id?.name && (
                      <div style={{
                        position: "absolute",
                        top: "10px",
                        left: "10px",
                        backgroundColor: "#007bff",
                        color: "white",
                        padding: "0.2rem 0.5rem",
                        borderRadius: "12px",
                        fontSize: "0.7rem",
                        fontWeight: "500"
                      }}>
                        {product.category_id.name}
                      </div>
                    )}

                    {/* Product Image */}
                    <div style={{ textAlign: "center", marginBottom: "1rem", marginTop: "1rem" }}>
                      <Link to={`/product-details/${productSlug}/${product._id}`}>
                        <img
                          src={product.cover_photo_url || "/images/home/corelens-polo.png"}
                          alt={product.name}
                          style={{
                            width: "100%",
                            maxWidth: "180px",
                            height: "180px",
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
                          fontSize: "1.1rem", 
                          marginBottom: "0.5rem",
                          color: "#333",
                          minHeight: "2.2rem",
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                          display: "-webkit-box",
                          WebkitLineClamp: 2,
                          WebkitBoxOrient: "vertical"
                        }}>
                          {product.name}
                        </h3>
                      </Link>

                      {/* Rating */}
                      <div style={{ 
                        display: "flex", 
                        alignItems: "center", 
                        marginBottom: "0.8rem" 
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
                        <span style={{ fontSize: "0.8rem", color: "#666" }}>
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
                          fontSize: "1.3rem", 
                          fontWeight: "bold", 
                          color: "#007bff" 
                        }}>
                          {formatPrice(currentPrice)}
                        </span>
                        {originalPrice > 0 && originalPrice > currentPrice && (
                          <span style={{
                            textDecoration: "line-through",
                            color: "#999",
                            fontSize: "0.9rem"
                          }}>
                            {formatPrice(originalPrice)}
                          </span>
                        )}
                      </div>

                      {/* View Details Button */}
                      <Link 
                        to={`/product-details/${productSlug}/${product._id}`}
                        style={{
                          display: "inline-block",
                          padding: "0.6rem 1rem",
                          backgroundColor: "#007bff",
                          color: "white",
                          textDecoration: "none",
                          borderRadius: "4px",
                          fontSize: "0.85rem",
                          fontWeight: "500",
                          textAlign: "center",
                          width: "100%",
                          boxSizing: "border-box",
                          transition: "background-color 0.2s"
                        }}
                        onMouseEnter={(e) => {
                          e.target.style.backgroundColor = "#0056b3";
                        }}
                        onMouseLeave={(e) => {
                          e.target.style.backgroundColor = "#007bff";
                        }}
                      >
                        View Details
                      </Link>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Products;