import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getProductBySlug } from "../data/products";
import {
  getProductDetails,
  productExists,
  categoryProductDetails,
} from "../data/categoryProductDetails";
import { calculatePrices, normalizeProduct } from "../utils/priceCalculator";
import "../css/product-details.css";
import "../css/style.css";
import "../css/responsive.css";
import "../css/animation.css";

const ProductDetails = () => {
  const { slug, id } = useParams();
  const navigate = useNavigate();

  // Handle URL parsing properly
  let actualSlug = slug;
  let actualId = id;

  // Clean up slug by removing any trailing dashes
  if (actualSlug) {
    actualSlug = actualSlug.replace(/-+$/, "").replace(/^-+/, ""); // Remove leading and trailing dashes
  }

  console.log("Original URL params - slug:", slug, "id:", id);
  console.log(
    "Cleaned params - actualSlug:",
    actualSlug,
    "actualId:",
    actualId,
  );
  console.log(
    "URL Format - Expected: /product-details/slug/id, Current:",
    window.location.pathname,
  );
  const [quantity, setQuantity] = useState(1);
  const [product, setProduct] = useState(null);
  const [error, setError] = useState(null);
  const [mainImage, setMainImage] = useState(null); // State to manage the main image
  const [comparisonPrices, setComparisonPrices] = useState({});
  const [player, setPlayer] = useState(null);

  const API_TOKEN =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7Im5hbWUiOiJSTiBTaW5naCIsImVtYWlsIjoicmFtQHRoZWxtbS5pbiIsIm1vYmlsZV9udW1iZXIiOjcyMTc4MjM2MDAsInVzZXJfdHlwZSI6IkxvZ2luIiwiY2l0eSI6IkRlbGhpIiwiaXNBZG1pbiI6ZmFsc2UsInN0YXR1cyI6dHJ1ZSwidXNlcl9pZCI6IjEyNyIsInJlZF9mbGFnIjpmYWxzZSwicmVkX2ZsYWdfbWFya2VkX2F0IjpudWxsLCJpc0Jhbm5lZCI6ZmFsc2UsImlzRGVsZXRlZCI6ZmFsc2UsIl9pZCI6IjY4Y2QzMmRlNzc1YjhkMThiYTY3ZTU5MCIsImNyZWF0ZWRBdCI6IjIwMjUtMDktMTkiLCJfX3YiOjAsImlkIjoiNjhjZDMyZGU3NzViOGQxOGJhNjdlNTkwIn0sImlhdCI6MTc1ODI3ODM2Nn0.iklltO6pQa-nrfrj9S3ti_ImRzUJtjqCe7m1_zvld8Q";

  // Test API connection function
  const testAPIConnection = async () => {
    try {
      console.log("🔍 Testing API Connection...");
      const response = await fetch(
        "https://backend.corelens.in/api/app/products?limit=5",
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${API_TOKEN}`,
            "Content-Type": "application/json",
            Accept: "application/json",
          },
        },
      );

      console.log("API Test Response Status:", response.status);

      if (response.ok) {
        const data = await response.json();
        console.log("✅ API Connection Successful");
        console.log("Sample products:", data.data?.docs?.slice(0, 2));
        return true;
      } else {
        console.error("❌ API Connection Failed:", response.statusText);
        return false;
      }
    } catch (error) {
      console.error("❌ API Connection Error:", error);
      return false;
    }
  };

  // Helper function to get local product data from categoryProductDetails
  const getLocalProductData = () => {
    const categories = Object.keys(categoryProductDetails);
    for (const category of categories) {
      if (
        categoryProductDetails[category] &&
        categoryProductDetails[category][actualSlug]
      ) {
        return categoryProductDetails[category][actualSlug];
      }
    }
    // Fallback if not found in specific categories, try general products
    return getProductBySlug(actualSlug);
  };

  // Fetch product from API by ID
  const fetchProductById = async (productId) => {
    try {
      console.log("Fetching product with ID:", productId);

      // First try direct API call
      let response = await fetch(
        `https://backend.corelens.in/api/app/products/${productId}`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${API_TOKEN}`,
            "Content-Type": "application/json",
            Accept: "application/json",
          },
        },
      );

      console.log("Direct product API response status:", response.status);

      if (response.ok) {
        const data = await response.json();
        console.log("Direct product API response data:", data);

        if (data.success && data.data) {
          return data.data;
        }
      }

      // Fallback: fetch all products and find by ID
      console.log("Direct API failed, trying to fetch from all products list");
      response = await fetch(
        "https://backend.corelens.in/api/app/products?limit=100",
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${API_TOKEN}`,
            "Content-Type": "application/json",
            Accept: "application/json",
          },
        },
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      console.log("All products API response:", data);

      if (data.success && data.data) {
        let allProducts = [];
        if (Array.isArray(data.data.docs)) {
          allProducts = data.data.docs;
        } else if (Array.isArray(data.data)) {
          allProducts = data.data;
        }

        // Find product by ID
        const product = allProducts.find((p) => p._id === productId);
        console.log("Found product in all products:", product);
        return product || null;
      }

      return null;
    } catch (error) {
      console.error("Error fetching product by ID:", error);
      return null;
    }
  };

  // Fetch comparison prices from API
  const fetchComparisonPrices = async () => {
    try {
      const response = await fetch(
        "https://backend.corelens.in/api/app/products?limit=100",
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${API_TOKEN}`,
            "Content-Type": "application/json",
            Accept: "application/json",
          },
        },
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      const prices = {};

      if (data.success && data.data) {
        let allProducts = [];
        if (Array.isArray(data.data.docs)) {
          allProducts = data.data.docs;
        } else if (Array.isArray(data.data)) {
          allProducts = data.data;
        }

        // Enhanced product matching for comparison prices
        const findProductByKeyword = (keyword) => {
          return allProducts.find((p) => {
            if (!p.name) return false;
            const productName = p.name.toLowerCase();
            return (
              productName.includes(keyword.toLowerCase()) &&
              productName.includes("corelens")
            );
          });
        };

        // Camera products
        const polo = findProductByKeyword("polo");
        const gem = findProductByKeyword("gem");
        const oval = findProductByKeyword("oval");

        // Door lock products
        const ultra = findProductByKeyword("ultra");
        const prime = findProductByKeyword("prime");
        const royale = findProductByKeyword("royale");

        // Echo and Wave products
        const echo = findProductByKeyword("echo");
        const wave = findProductByKeyword("wave");

        console.log("Comparison products found:", {
          polo: polo?.name,
          gem: gem?.name,
          oval: oval?.name,
          ultra: ultra?.name,
          prime: prime?.name,
          royale: royale?.name,
          echo: echo?.name,
          wave: wave?.name,
        });

        if (polo)
          prices.polo = polo.price || polo.selling_price || polo.net_price || 0;
        if (gem)
          prices.gem = gem.price || gem.selling_price || gem.net_price || 0;
        if (oval)
          prices.oval = oval.price || oval.selling_price || oval.net_price || 0;
        if (ultra)
          prices.ultra =
            ultra.price || ultra.selling_price || ultra.net_price || 0;
        if (prime)
          prices.prime =
            prime.price || prime.selling_price || prime.net_price || 0;
        if (royale)
          prices.royale =
            royale.price || royale.selling_price || royale.net_price || 0;
        if (echo)
          prices.echo = echo.price || echo.selling_price || echo.net_price || 0;
        if (wave)
          prices.wave = wave.price || wave.selling_price || wave.net_price || 0;
      }

      console.log("Comparison prices fetched:", prices);
      setComparisonPrices(prices);
    } catch (error) {
      console.error("Error fetching comparison prices:", error);
    }
  };

  useEffect(() => {
    // Scroll to top when component mounts
    window.scrollTo(0, 0);

    // Initialize YouTube API
    if (!window.YT) {
      const tag = document.createElement("script");
      tag.src = "https://www.youtube.com/iframe_api";
      const firstScriptTag = document.getElementsByTagName("script")[0];
      firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
    }

    window.onYouTubeIframeAPIReady = () => {
      console.log("YouTube API Ready");
    };

    const loadProduct = async () => {
      console.log(
        "ProductDetails useEffect - ID:",
        actualId,
        "Slug:",
        actualSlug,
      );
      setError(null);

      try {
        // Test API connection when the component loads
        await testAPIConnection();

        // First check if the slug looks like an API ID (24 character hex string)
        const isApiId = actualSlug && /^[a-f\d]{24}$/i.test(actualSlug);

        if (isApiId || actualId) {
          // Try API first if we have an ID
          const productId = actualId || actualSlug;
          const apiProductData = await fetchProductById(productId);

          if (apiProductData) {
            console.log("API Product Data loaded:", apiProductData.name);

            // Normalize API response fields with better fallback logic
            const normalizedData = {
              selling_price:
                apiProductData.selling_price ||
                apiProductData.sellingPrice ||
                apiProductData.net_price ||
                apiProductData.price ||
                0,
              mrp:
                apiProductData.mrp ||
                apiProductData.MRP ||
                apiProductData.mrp_price ||
                apiProductData.original_price ||
                apiProductData.originalPrice ||
                0,
              display_percentage:
                apiProductData.display_percentage ||
                apiProductData.displayPercentage ||
                apiProductData.discount_percentage ||
                apiProductData.offer_percentage ||
                0,
            };

            // Calculate MRP from selling price and discount if MRP is 0 or invalid
            if (
              normalizedData.mrp <= 0 &&
              normalizedData.selling_price > 0 &&
              normalizedData.display_percentage > 0
            ) {
              normalizedData.mrp = Math.round(
                normalizedData.selling_price /
                  (1 - normalizedData.display_percentage / 100),
              );
            }

            // Get local product data for non-pricing fields only
            const localProduct = getLocalProductData();

            const convertedProduct = {
              id: apiProductData._id,
              name: apiProductData.name,
              slug: apiProductData.name.toLowerCase().replace(/\s+/g, "-"),
              // Always use API pricing data
              selling_price: normalizedData.selling_price,
              mrp: normalizedData.mrp,
              display_percentage: normalizedData.display_percentage,
              // Use API description if available, otherwise fallback
              description:
                apiProductData.description ||
                localProduct?.description ||
                `${apiProductData.name} - Smart Security Device with advanced features and professional installation.`,
              // Use local images if available, otherwise API images
              images: {
                main:
                  localProduct?.images?.main ||
                  apiProductData.cover_photo_url ||
                  "/images/home/smart-lock-product.png",
                thumbnails: localProduct?.images?.thumbnails || [
                  apiProductData.cover_photo_url ||
                    "/images/home/smart-lock-product.png",
                  "/images/6-Ways-to-Unlock-Your-Door-new.png",
                  "/images/strent-you-can-depend-on.png",
                  "/images/Smart Lock with Sleek Design.png",
                ],
              },
              knowMoreImage:
                localProduct?.knowMoreImage ||
                apiProductData.knowMoreImage ||
                (() => {
                  // Product-specific know more images
                  const productName = (apiProductData.name || "").toLowerCase();

                  if (productName.includes("polo")) {
                    return "/images/knowmore/knowmore-polo.jpg";
                  } else if (productName.includes("gem")) {
                    return "/images/knowmore/knowmore-gem.jpg";
                  } else if (productName.includes("oval")) {
                    return "/images/knowmore/knowmore-oval.jpg";
                  } else if (productName.includes("echo")) {
                    return "/images/knowmore/knowmore-echo.jpg";
                  } else if (productName.includes("wave")) {
                    return "/images/knowmore/knowmore-wave.jpg";
                  } else if (productName.includes("turbo")) {
                    return "/images/knowmore/knowmore-turbo.jpg";
                  } else if (productName.includes("moto")) {
                    return "/images/knowmore/knowmore-moto.jpg";
                  } else if (
                    productName.includes("motion") ||
                    productName.includes("sensor")
                  ) {
                    return "/images/knowmore/knowmore-motion-sensor.jpg";
                  } else if (productName.includes("ultra")) {
                    return "/images/knowmore/knowmore-locks.jpg";
                  } else if (productName.includes("prime")) {
                    return "/images/knowmore/knowmore-locks.jpg";
                  } else if (productName.includes("royale")) {
                    return "/images/knowmore/knowmore-locks.jpg";
                  } else {
                    // Default fallback
                    return "/images/Luxury Smart Lock Advertisement Design.png";
                  }
                })(),
              // Use local features if available, otherwise API features
              features: localProduct?.features || apiProductData.features || [],
              // Include other fields from local data
              technicalSpecs:
                localProduct?.technicalSpecs ||
                apiProductData.technicalSpecs ||
                null,
              faqs: localProduct?.faqs || apiProductData.faqs || null,
              videos: localProduct?.videos || apiProductData.videos || null,
              testimonials:
                localProduct?.testimonials ||
                apiProductData.testimonials ||
                null,
              technicalHighlights: localProduct?.technicalHighlights || null,
              customIcons: localProduct?.customIcons || null,
            };
            console.log("Converted product:", convertedProduct);
            console.log(
              "Final selling price being used:",
              convertedProduct.selling_price,
            );
            console.log("Final MRP being used:", convertedProduct.mrp);
            console.log(
              "Final display percentage being used:",
              convertedProduct.display_percentage,
            );
            setProduct(convertedProduct);
            return;
          }
        }

        // Enhanced API product matching with better name matching logic
        let foundStaticProduct = null;
        let foundApiProduct = null;

        // First, try to find API product by improved name matching with the slug
        try {
          const response = await fetch(
            "https://backend.corelens.in/api/app/products?limit=100",
            {
              method: "GET",
              headers: {
                Authorization: `Bearer ${API_TOKEN}`,
                "Content-Type": "application/json",
                Accept: "application/json",
              },
            },
          );

          if (response.ok) {
            const data = await response.json();
            if (data.success && data.data) {
              let allProducts = [];
              if (Array.isArray(data.data.docs)) {
                allProducts = data.data.docs;
              } else if (Array.isArray(data.data)) {
                allProducts = data.data;
              }

              console.log(
                "All API products:",
                allProducts.map((p) => p.name),
              );
              console.log("Looking for slug:", actualSlug);

              // Enhanced product matching with multiple strategies
              foundApiProduct = allProducts.find((p) => {
                if (!p.name) return false;

                const productName = p.name.toLowerCase();
                const productSlug = productName.replace(/\s+/g, "-");
                const cleanSlug = actualSlug.toLowerCase();

                // Strategy 1: Exact slug match
                if (productSlug === cleanSlug) {
                  console.log("✅ Exact slug match found:", p.name);
                  return true;
                }

                // Strategy 2: Product name contains slug parts
                const slugParts = cleanSlug.split("-");
                const matchesAllParts = slugParts.every(
                  (part) => part.length > 2 && productName.includes(part),
                );
                if (matchesAllParts) {
                  console.log("✅ All slug parts match:", p.name);
                  return true;
                }

                // Strategy 3: Key product identifiers
                const productKeywords = {
                  polo: ["polo"],
                  oval: ["oval"],
                  gem: ["gem"],
                  echo: ["echo"],
                  wave: ["wave"],
                  ultra: ["ultra"],
                  prime: ["prime"],
                  royale: ["royale"],
                  turbo: ["turbo"],
                  moto: ["moto"],
                  motion: ["motion", "sensor"],
                  mercusys: ["mercusys"],
                  ac12: ["ac12"],
                  mr30g: ["mr30g"],
                };

                for (const [key, keywords] of Object.entries(productKeywords)) {
                  if (cleanSlug.includes(key)) {
                    const hasKeywords = keywords.some((keyword) =>
                      productName.includes(keyword),
                    );
                    if (hasKeywords) {
                      console.log(
                        "✅ Keyword match found:",
                        p.name,
                        "for",
                        key,
                      );
                      return true;
                    }
                  }
                }

                return false;
              });

              if (foundApiProduct) {
                console.log(
                  "✅ Found API product by enhanced matching:",
                  foundApiProduct.name,
                );

                // Normalize API response fields with better fallback logic
                const normalizedData = {
                  selling_price:
                    foundApiProduct.selling_price ||
                    foundApiProduct.sellingPrice ||
                    foundApiProduct.net_price ||
                    foundApiProduct.price ||
                    0,
                  mrp:
                    foundApiProduct.mrp ||
                    foundApiProduct.MRP ||
                    foundApiProduct.mrp_price ||
                    foundApiProduct.original_price ||
                    foundApiProduct.originalPrice ||
                    0,
                  display_percentage:
                    foundApiProduct.display_percentage ||
                    foundApiProduct.displayPercentage ||
                    foundApiProduct.discount_percentage ||
                    foundApiProduct.offer_percentage ||
                    0,
                };

                // Calculate MRP from selling price and discount if MRP is 0 or invalid
                if (
                  normalizedData.mrp <= 0 &&
                  normalizedData.selling_price > 0 &&
                  normalizedData.display_percentage > 0
                ) {
                  normalizedData.mrp = Math.round(
                    normalizedData.selling_price /
                      (1 - normalizedData.display_percentage / 100),
                  );
                }

                // Get local product data for non-pricing fields only
                const localProduct = getLocalProductData();

                const convertedProduct = {
                  id: foundApiProduct._id,
                  name: foundApiProduct.name,
                  slug: foundApiProduct.name.toLowerCase().replace(/\s+/g, "-"),
                  // Always use API pricing data
                  selling_price: normalizedData.selling_price,
                  mrp: normalizedData.mrp,
                  display_percentage: normalizedData.display_percentage,
                  // Use API description if available, otherwise fallback
                  description:
                    foundApiProduct.description ||
                    localProduct?.description ||
                    `${foundApiProduct.name} - Smart Security Device with advanced features and professional installation.`,
                  // Use local images if available, otherwise API images
                  images: {
                    main:
                      localProduct?.images?.main ||
                      foundApiProduct.cover_photo_url ||
                      "/images/home/smart-lock-product.png",
                    thumbnails: localProduct?.images?.thumbnails || [
                      foundApiProduct.cover_photo_url ||
                        "/images/home/smart-lock-product.png",
                      "/images/6-Ways-to-Unlock-Your-Door-new.png",
                      "/images/strent-you-can-depend-on.png",
                      "/images/Smart Lock with Sleek Design.png",
                    ],
                  },
                  knowMoreImage:
                    localProduct?.knowMoreImage ||
                    foundApiProduct.knowMoreImage ||
                    "/images/Luxury Smart Lock Advertisement Design.png",
                  // Use local features if available, otherwise API features
                  features:
                    localProduct?.features || foundApiProduct.features || [],
                  // Include other fields from local data
                  technicalSpecs:
                    localProduct?.technicalSpecs ||
                    foundApiProduct.technicalSpecs ||
                    null,
                  faqs: localProduct?.faqs || foundApiProduct.faqs || null,
                  videos:
                    localProduct?.videos || foundApiProduct.videos || null,
                  testimonials:
                    localProduct?.testimonials ||
                    foundApiProduct.testimonials ||
                    null,
                  technicalHighlights:
                    localProduct?.technicalHighlights || null,
                  customIcons: localProduct?.customIcons || null,
                };

                setProduct(convertedProduct);
                return;
              } else {
                console.log("❌ No API product found for slug:", actualSlug);
                console.log(
                  "Available API product names:",
                  allProducts.map((p) => p.name),
                );
              }
            }
          }
        } catch (error) {
          console.error("Error searching API products by name:", error);
        }

        // If no API product found, try static data as fallback
        // Try to find product in each category
        const categories = [
          "door-locks",
          "cam-sensors",
          "gps-trackers",
          "motion-sensors",
          "accessories",
        ];
        for (const category of categories) {
          // Check if the category and product exist using the new functions
          if (productExists(category, actualSlug)) {
            foundStaticProduct = getProductDetails(category, actualSlug);
            if (foundStaticProduct) {
              break;
            }
          }
        }

        // If not found in category data, try general products data
        if (!foundStaticProduct) {
          foundStaticProduct = getProductBySlug(actualSlug);
        }

        // If still not found, try partial matching with product names
        if (!foundStaticProduct && actualSlug) {
          // Try to find by partial slug match in all categories
          for (const category of categories) {
            const categoryProducts = Object.keys(
              categoryProductDetails[category] || {},
            );
            const matchingSlug = categoryProducts.find(
              (slug) => slug.includes(actualSlug) || actualSlug.includes(slug),
            );
            if (matchingSlug) {
              foundStaticProduct = getProductDetails(category, matchingSlug);
              if (foundStaticProduct) {
                break;
              }
            }
          }
        }

        if (foundStaticProduct) {
          console.log("Using static product data for:", actualSlug);
          // For static products, try to get API pricing if available
          let finalProduct = foundStaticProduct;

          // Try to find API product with same name for pricing
          try {
            const response = await fetch(
              "https://backend.corelens.in/api/app/products?limit=100",
              {
                method: "GET",
                headers: {
                  Authorization: `Bearer ${API_TOKEN}`,
                  "Content-Type": "application/json",
                  Accept: "application/json",
                },
              },
            );

            if (response.ok) {
              const data = await response.json();
              if (data.success && data.data) {
                let allProducts = [];
                if (Array.isArray(data.data.docs)) {
                  allProducts = data.data.docs;
                } else if (Array.isArray(data.data)) {
                  allProducts = data.data;
                }

                // Find matching API product by name
                const matchingApiProduct = allProducts.find((p) => {
                  const apiName = (p.name || "")
                    .toLowerCase()
                    .replace(/\s+/g, "");
                  const staticName = (foundStaticProduct.name || "")
                    .toLowerCase()
                    .replace(/\s+/g, "");
                  return (
                    apiName.includes(staticName) || staticName.includes(apiName)
                  );
                });

                if (matchingApiProduct) {
                  console.log(
                    "Found matching API product for pricing:",
                    matchingApiProduct.name,
                  );

                  // Normalize API response fields
                  const normalizedData = {
                    selling_price:
                      matchingApiProduct.selling_price ||
                      matchingApiProduct.sellingPrice ||
                      matchingApiProduct.net_price ||
                      matchingApiProduct.price ||
                      0,
                    mrp:
                      matchingApiProduct.mrp ||
                      matchingApiProduct.MRP ||
                      matchingApiProduct.mrp_price ||
                      matchingApiProduct.original_price ||
                      matchingApiProduct.originalPrice ||
                      0,
                    display_percentage:
                      matchingApiProduct.display_percentage ||
                      matchingApiProduct.displayPercentage ||
                      matchingApiProduct.discount_percentage ||
                      matchingApiProduct.offer_percentage ||
                      0,
                  };

                  // Calculate MRP from selling price and discount if MRP is 0 or invalid
                  if (
                    normalizedData.mrp <= 0 &&
                    normalizedData.selling_price > 0 &&
                    normalizedData.display_percentage > 0
                  ) {
                    normalizedData.mrp = Math.round(
                      normalizedData.selling_price /
                        (1 - normalizedData.display_percentage / 100),
                    );
                  }

                  // Use API pricing with static product data
                  finalProduct = {
                    ...foundStaticProduct,
                    id: matchingApiProduct._id,
                    selling_price: normalizedData.selling_price,
                    mrp: normalizedData.mrp,
                    display_percentage: normalizedData.display_percentage,
                    price: normalizedData.selling_price, // For backward compatibility
                    originalPrice: normalizedData.mrp, // For backward compatibility
                    discount: normalizedData.display_percentage, // For backward compatibility
                    knowMoreImage: (() => {
                      // Product-specific know more images for static products
                      const productName = (
                        foundStaticProduct.name || ""
                      ).toLowerCase();

                      if (productName.includes("polo")) {
                        return "/images/knowmore/knowmore-polo.jpg";
                      } else if (productName.includes("gem")) {
                        return "/images/knowmore/knowmore-gem.jpg";
                      } else if (productName.includes("oval")) {
                        return "/images/knowmore/knowmore-oval.jpg";
                      } else if (productName.includes("echo")) {
                        return "/images/knowmore/knowmore-echo.jpg";
                      } else if (productName.includes("wave")) {
                        return "/images/knowmore/knowmore-wave.jpg";
                      } else if (productName.includes("turbo")) {
                        return "/images/knowmore/knowmore-turbo.jpg";
                      } else if (productName.includes("moto")) {
                        return "/images/knowmore/knowmore-moto.jpg";
                      } else if (
                        productName.includes("motion") ||
                        productName.includes("sensor")
                      ) {
                        return "/images/knowmore/knowmore-motion-sensor.jpg";
                      } else if (productName.includes("ultra")) {
                        return "/images/knowmore/knowmore-ultra.jpg";
                      } else if (productName.includes("prime")) {
                        return "/images/knowmore/knowmore-prime.jpg";
                      } else if (productName.includes("royale")) {
                        return "/images/knowmore/knowmore-royale.jpg";
                      } else {
                        return (
                          foundStaticProduct.knowMoreImage ||
                          "/images/Luxury Smart Lock Advertisement Design.png"
                        );
                      }
                    })(),
                  };

                  console.log(
                    "Combined product with API pricing:",
                    finalProduct,
                  );
                  console.log(
                    "Final selling price being used:",
                    finalProduct.selling_price,
                  );
                  console.log("Final MRP being used:", finalProduct.mrp);
                  console.log(
                    "Final display percentage being used:",
                    finalProduct.display_percentage,
                  );
                }
              }
            }
          } catch (error) {
            console.log(
              "Could not fetch API pricing for static product:",
              error.message,
            );
          }

          // If not found in categories, try to determine from product name
          if (!category && product) {
            const productName = product.name.toLowerCase();
            if (
              productName.includes("door") ||
              productName.includes("lock") ||
              productName.includes("royale") ||
              productName.includes("prime") ||
              productName.includes("ultra")
            ) {
              category = "door-locks";
            } else if (
              productName.includes("polo") ||
              productName.includes("echo") ||
              productName.includes("oval") ||
              productName.includes("cam") ||
              productName.includes("wave") ||
              productName.includes("camera")
            ) {
              category = "cam-sensors";
            } else if (
              productName.includes("turbo") ||
              productName.includes("moto") ||
              productName.includes("gps") ||
              productName.includes("tracker")
            ) {
              category = "gps-trackers";
            } else if (
              productName.includes("motion") ||
              productName.includes("sensor") ||
              productName.includes("gem")
            ) {
              category = "motion-sensors";
            } else if (
              productName.includes("mercusys") ||
              productName.includes("router") ||
              productName.includes("ac12") ||
              productName.includes("mr30g")
            ) {
              category = "accessories";
            }
          }

          // Special handling for Motion Sensor pricing if not found in API
          if (
            (actualSlug && actualSlug.includes("motion")) ||
            (product &&
              product.name &&
              product.name.toLowerCase().includes("motion"))
          ) {
            // Override with correct Motion Sensor pricing
            if (foundStaticProduct) {
              foundStaticProduct = {
                ...foundStaticProduct,
                selling_price: 1299,
                net_price: 1299,
                price: 2500,
                mrp: 2500,
                originalPrice: 2500,
                display_percentage: 48,
                discount: 48,
                knowMoreImage: "/images/knowmore/knowmore-motion-sensor.jpg",
              };
            }
          }

          const normalizedStaticProduct = normalizeProduct(finalProduct);
          setProduct(normalizedStaticProduct);
        } else {
          setError("Product not found");
        }
      } catch (err) {
        console.error("Error loading product:", err);
        setError("Failed to load product details");
      }
    };

    loadProduct();
    fetchComparisonPrices();
  }, [actualSlug, actualId, navigate]);

  useEffect(() => {
    if (!product?.videos?.length) return;

    const videoSection = document.getElementById("product-video-section");
    if (!videoSection) return;

    const onPlayerReady = (event) => {
      console.log("YouTube Player Ready");
      setPlayer(event.target);
    };

    const createPlayer = () => {
      console.log("Creating YouTube Player...");
      const iframe = videoSection.querySelector("iframe");
      if (!iframe) return;

      new window.YT.Player(iframe, {
        events: {
          onReady: onPlayerReady,
        },
      });
    };

    if (window.YT && window.YT.Player) {
      createPlayer();
    } else {
      window.onYouTubeIframeAPIReady = createPlayer;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (player) {
            if (entry.isIntersecting) {
              player.playVideo();
            } else {
              player.pauseVideo();
            }
          }
        });
      },
      { threshold: 0.5 },
    );

    observer.observe(videoSection);

    return () => {
      observer.disconnect();
    };
  }, [product, player]);

  // Generate thumbnails array - always return 5 images
  const generateThumbnails = () => {
    const thumbnails = [];

    // First check local categoryProductDetails for images
    const localProduct = getLocalProductData();
    if (
      localProduct?.images?.thumbnails &&
      localProduct.images.thumbnails.length > 0
    ) {
      // Use existing local thumbnails
      thumbnails.push(...localProduct.images.thumbnails);
    } else if (product?.cover_photo_url) {
      // Fallback to API image
      thumbnails.push(product.cover_photo_url);
    } else {
      // Default main image
      thumbnails.push("/images/home/smart-door-lock-royale.png");
    }

    const defaultImages = [
      "/images/6-Ways-to-Unlock-Your-Door-new.png",
      "/images/strent-you-can-depend-on.png",
      "/images/Smart Lock with Sleek Design.png",
      "/images/home/smart-lock-product.png",
    ];

    // Ensure we have exactly 5 images by filling with defaults
    while (thumbnails.length < 6) {
      const defaultImg =
        defaultImages[(thumbnails.length - 1) % defaultImages.length];
      if (!thumbnails.includes(defaultImg)) {
        thumbnails.push(defaultImg);
      } else {
        // If default image already exists, use a variation
        thumbnails.push(`${defaultImg}?v=${thumbnails.length}`);
      }
    }

    // Trim to exactly 5 images if we have more
    if (thumbnails.length > 6) {
      thumbnails.splice(6);
    }

    return thumbnails;
  };

  useEffect(() => {
    // Always reset main image when product changes (including URL changes)
    const localProduct = getLocalProductData();
    let newMainImage = null;

    if (localProduct?.images?.main) {
      newMainImage = localProduct.images.main;
    } else if (
      localProduct?.images?.thumbnails &&
      localProduct.images.thumbnails.length > 0
    ) {
      newMainImage = localProduct.images.thumbnails[0];
    } else if (product?.cover_photo_url) {
      // Fallback to API image
      newMainImage = product.cover_photo_url;
    } else {
      // Final fallback
      newMainImage = "/images/home/corelens-polo.png";
    }

    // Always update main image when product or URL changes
    if (newMainImage && newMainImage !== mainImage) {
      setMainImage(newMainImage);
    }
  }, [product, actualSlug, actualId]); // Added actualSlug and actualId as dependencies

  const decreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const increaseQuantity = () => {
    setQuantity(quantity + 1);
  };

  const handleQuantityChange = (e) => {
    const value = parseInt(e.target.value) || 1;
    if (value >= 1) {
      setQuantity(value);
    }
  };

  const calculateTotalPrice = () => {
    try {
      const currentPrice = product?.selling_price || product?.net_price || 0;
      const finalPrice = currentPrice * quantity;
      return Math.round(finalPrice);
    } catch (error) {
      console.error("Error calculating total price:", error);
      return 0;
    }
  };

  // Remove getProductPrices function completely - we'll use direct product fields

  // Function to get category-specific trust badges
  const getTrustBadges = () => {
    // Determine category based on product slug or actualSlug
    let category = "";

    // Check in categoryProductDetails to determine category
    const categories = [
      "door-locks",
      "cam-sensors",
      "gps-trackers",
      "motion-sensors",
      "accessories",
    ];
    for (const cat of categories) {
      if (
        categoryProductDetails[cat] &&
        categoryProductDetails[cat][actualSlug]
      ) {
        category = cat;
        break;
      }
    }

    // If not found in categories, try to determine from product name or other attributes
    if (!category && product) {
      const productName = product.name.toLowerCase();
      if (
        productName.includes("door") ||
        productName.includes("lock") ||
        productName.includes("royale") ||
        productName.includes("prime") ||
        productName.includes("ultra")
      ) {
        category = "door-locks";
      } else if (
        productName.includes("polo") ||
        productName.includes("echo") ||
        productName.includes("oval") ||
        productName.includes("cam") ||
        productName.includes("wave") ||
        productName.includes("camera")
      ) {
        category = "cam-sensors";
      } else if (
        productName.includes("turbo") ||
        productName.includes("moto") ||
        productName.includes("gps") ||
        productName.includes("tracker")
      ) {
        category = "gps-trackers";
      } else if (
        productName.includes("motion") ||
        productName.includes("sensor") ||
        productName.includes("gem")
      ) {
        category = "motion-sensors";
      } else if (
        productName.includes("mercusys") ||
        productName.includes("router") ||
        productName.includes("ac12") ||
        productName.includes("mr30g")
      ) {
        category = "accessories";
      }
    }

    // Define trust content for each category
    const trustContent = {
      "cam-sensors": [
        { label: "10 Days", sublabel: "Return Policy" },
        { label: "2 Years", sublabel: "Warranty" },
        { label: "Free Home", sublabel: "Repairs" },
        { label: "Free Demo", sublabel: "Available" },
      ],
      "door-locks": [
        { label: "10 Days", sublabel: "Return Policy" },
        { label: "10 Years", sublabel: "Service Warranty" },
        { label: "Free", sublabel: "Installation" },
        { label: "COD", sublabel: "Available" },
      ],
      "gps-trackers": [
        { label: "10 Days", sublabel: "Return Policy" },
        { label: "3 Years", sublabel: "Warranty" },
        { label: "Free Home", sublabel: "Repairs" },
        { label: "COD", sublabel: "Available" },
      ],
      "motion-sensors": [
        { label: "10 Days", sublabel: "Return Policy" },
        { label: "5 Years", sublabel: "Warranty" },
        { label: "Free Home", sublabel: "Repairs" },
        { label: "COD", sublabel: "Available" },
      ],
      accessories: [
        { label: "10 Days", sublabel: "Return Policy" },
        { label: "2 Years", sublabel: "Warranty" },
        { label: "Free Home", sublabel: "Repairs" },
        { label: "COD", sublabel: "Available" },
      ],
    };

    // Default content if category not determined
    const defaultContent = [
      { label: "10 Days", sublabel: "Return Policy" },
      { label: "2 Years", sublabel: "Warranty" },
      { label: "Free Home", sublabel: "Repairs" },
      { label: "COD", sublabel: "Available" },
    ];

    const badges = trustContent[category] || defaultContent;

    return (
      <>
        <div className="trust-badges">
          <div className="trust-badge">
            <div className="trust-icon">
              <svg viewBox="0 0 24 24">
                <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div className="trust-content">
              <div className="trust-label">{badges[0].label}</div>
              <div className="trust-sublabel">{badges[0].sublabel}</div>
            </div>
          </div>
          <div className="trust-badge">
            <div className="trust-icon">
              <svg viewBox="0 0 24 24">
                <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div className="trust-content">
              <div className="trust-label">{badges[1].label}</div>
              <div className="trust-sublabel">{badges[1].sublabel}</div>
            </div>
          </div>
        </div>
        <div className="trust-badges-bottom">
          <div className="trust-badge-bottom">
            <div className="trust-icon-small">
              <svg viewBox="0 0 24 24">
                <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div className="trust-content">
              <div className="trust-label">{badges[2].label}</div>
              <div className="trust-sublabel">{badges[2].sublabel}</div>
            </div>
          </div>
          <div className="trust-badge-bottom">
            <div className="trust-icon-small">
              <svg viewBox="0 0 24 24">
                <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div className="trust-content">
              <div className="trust-label">{badges[3].label}</div>
              <div className="trust-sublabel">{badges[3].sublabel}</div>
            </div>
          </div>
        </div>
      </>
    );
  };

  const handleAddToCart = () => {
    try {
      if (!product) {
        console.error("No product data available for cart");
        return;
      }

      // Use the current quantity (which is already minimum 1)
      const addQuantity = quantity;

      // Get price directly from product
      const currentPrice = product.selling_price || product.net_price || 0;

      if (!currentPrice || currentPrice <= 0) {
        console.error("Invalid price for product:", product.name);
        return;
      }

      // Create product object with unique ID
      const productForCart = {
        id: `${product.id || "unknown"}-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
        name: product.name || "Unknown Product",
        price: Math.round(currentPrice),
        originalPrice: Math.round(product.mrp || product.originalPrice || 0),
        mrp: Math.round(product.mrp || product.originalPrice || 0),
        discount: product.display_percentage || product.discount || 0,
        display_percentage: product.display_percentage || product.discount || 0,
        image: product.images?.main || "/images/home/smart-lock-product.png",
        quantity: addQuantity,
      };

      console.log("Adding product to cart:", productForCart);

      // Add item with specified quantity
      if (
        window.headerCartFunctions &&
        typeof window.headerCartFunctions.addToCart === "function"
      ) {
        window.headerCartFunctions.addToCart(productForCart);
      } else {
        console.warn("Cart functions not available");
      }

      // Open cart modal
      if (
        window.headerCartFunctions &&
        typeof window.headerCartFunctions.openCart === "function"
      ) {
        window.headerCartFunctions.openCart();
      }
    } catch (error) {
      console.error("Error adding product to cart:", error);
    }
  };

  useEffect(() => {
    if (!product) return;

    // Product specific functionality with proper timing
    const initializeProductFeatures = () => {
      setTimeout(() => {
        // Thumbnail switching functionality
        const thumbnails = document.querySelectorAll(".product-thumbnail");
        const mainImageContainer = document.querySelector(
          ".product-main-image",
        );

        thumbnails.forEach((thumbnail) => {
          thumbnail.addEventListener("click", () => {
            // Remove active class from all thumbnails
            thumbnails.forEach((t) => t.classList.remove("active"));
            // Add active class to clicked thumbnail
            thumbnail.classList.add("active");

            // Update main image
            const img = thumbnail.querySelector("img");
            if (img && mainImageContainer) {
              // This part is now only for image thumbnails
              mainImageContainer.innerHTML = `
                <img id="main-image" src="${img.src}" alt="${img.alt}" style="max-width: 100%; max-height: 35rem; object-fit: contain;" />
              `;
            }
          });
        });

        // Video popup functionality
        window.openVideoPopup = (videoUrl) => {
          const popup = document.getElementById("videoPopup");
          const videoContent = document.getElementById("videoContent");

          if (popup && videoContent) {
            videoContent.innerHTML = `
              <iframe width="100%" height="400" src="${videoUrl}?autoplay=1"
                title="Product Demo" frameborder="0" allowfullscreen></iframe>
            `;
            popup.style.display = "flex";
            document.body.style.overflow = "hidden";
          }
        };

        // Video popup close functionality
        const closeVideoPopup = document.getElementById("closeVideoPopup");
        if (closeVideoPopup) {
          closeVideoPopup.addEventListener("click", () => {
            const popup = document.getElementById("videoPopup");
            if (popup) {
              popup.style.display = "none";
              document.getElementById("videoContent").innerHTML = "";
              document.body.style.overflow = "auto";
            }
          });
        }

        // Video popup overlay click to close
        const videoPopup = document.getElementById("videoPopup");
        if (videoPopup) {
          videoPopup.addEventListener("click", (e) => {
            if (e.target === videoPopup) {
              videoPopup.style.display = "none";
              document.getElementById("videoContent").innerHTML = "";
              document.body.style.overflow = "auto";
            }
          });
        }

        // Pincode functionality with Indian Post API integration
        const pincodeInput = document.querySelector(".pincode-input");
        const pincodeBtn = document.querySelector(".pincode-btn");
        const deliveryInfo = document.querySelector(".delivery-info");

        if (pincodeInput && pincodeBtn && deliveryInfo) {
          // Only allow numbers in pincode input
          pincodeInput.addEventListener("input", function () {
            this.value = this.value.replace(/\D/g, "").substring(0, 6);
          });

          // Pincode check functionality with Indian Post API
          const checkPincode = async () => {
            const pincode = pincodeInput.value.trim();

            // Basic validation checks
            if (!pincode) {
              deliveryInfo.innerHTML = "❌ Please enter a pincode.";
              deliveryInfo.style.display = "block";
              deliveryInfo.style.color = "#dc3545";
              return;
            }

            // Check if it's a valid 6-digit number starting with 1-9
            if (pincode.length !== 6 || !/^[1-9][0-9]{5}$/.test(pincode)) {
              deliveryInfo.innerHTML =
                "❌ Please enter a valid 6-digit Indian pincode.";
              deliveryInfo.style.display = "block";
              deliveryInfo.style.color = "#dc3545";
              return;
            }

            // Show loading state
            deliveryInfo.innerHTML = "Checking pincode...";
            deliveryInfo.style.display = "block";
            deliveryInfo.style.color = "#6c757d";
            pincodeBtn.disabled = true;
            pincodeBtn.innerHTML = "Checking...";

            try {
              // Use Indian Post API for validation
              const response = await fetch(
                `https://api.postalpincode.in/pincode/${pincode}`,
                {
                  method: "GET",
                  headers: {
                    Accept: "application/json",
                  },
                },
              );

              if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
              }

              const data = await response.json();
              console.log("Indian Post API response:", data);

              // Check if API returned valid data
              if (data && data.length > 0 && data[0]) {
                const apiResponse = data[0];

                if (
                  apiResponse.Status === "Success" &&
                  apiResponse.PostOffice &&
                  apiResponse.PostOffice.length > 0
                ) {
                  // Valid pincode found
                  const postOffice = apiResponse.PostOffice[0];
                  const locationName = `${postOffice.Name}, ${postOffice.District}, ${postOffice.State}`;

                  // Calculate delivery days based on pincode
                  const firstTwoDigits = pincode.substring(0, 2);
                  const deliveryDays = firstTwoDigits === "11" ? 2 : 5; // Delhi NCR gets 2 days, others get 5

                  deliveryInfo.innerHTML = `
                    <div style="text-align: left; line-height: 1.6;">
                      <div style="font-weight: 600; color: #28a745; margin-bottom: 8px;">
                        ✔ Delivery available in your area within ${deliveryDays} days
                      </div>
                      <div style="font-size: 13px; color: #666; margin-top: 4px;">
                        <strong>Location:</strong> ${locationName}
                      </div>
                    </div>
                  `;
                  deliveryInfo.style.display = "block";
                  deliveryInfo.style.color = "#333";
                } else if (
                  apiResponse.Status === "Error" ||
                  !apiResponse.PostOffice ||
                  apiResponse.PostOffice.length === 0
                ) {
                  // Invalid pincode
                  deliveryInfo.innerHTML =
                    "❌ Invalid pincode. Please enter a valid 6-digit Indian pincode.";
                  deliveryInfo.style.display = "block";
                  deliveryInfo.style.color = "#dc3545";
                } else {
                  // Unexpected response format
                  deliveryInfo.innerHTML =
                    "❌ Invalid pincode. Please enter a valid 6-digit Indian pincode.";
                  deliveryInfo.style.display = "block";
                  deliveryInfo.style.color = "#dc3545";
                }
              } else {
                // No data returned
                deliveryInfo.innerHTML =
                  "❌ Invalid pincode. Please enter a valid 6-digit Indian pincode.";
                deliveryInfo.style.display = "block";
                deliveryInfo.style.color = "#dc3545";
              }
            } catch (error) {
              console.error("Pincode validation error:", error);

              // API failed - show error message
              deliveryInfo.innerHTML =
                "⚠ Unable to verify pincode right now. Please try later.";
              deliveryInfo.style.display = "block";
              deliveryInfo.style.color = "#ff8c00";
            } finally {
              pincodeBtn.disabled = false;
              pincodeBtn.innerHTML = "Check";
            }
          };

          pincodeBtn.addEventListener("click", checkPincode);

          // Check on Enter key press
          pincodeInput.addEventListener("keypress", function (e) {
            if (e.key === "Enter") {
              checkPincode();
            }
          });
        }

        // Remove any existing event listeners first
        const existingAccordionHeaders =
          document.querySelectorAll(".accordion-header");
        existingAccordionHeaders.forEach((header) => {
          const newHeader = header.cloneNode(true);
          header.parentNode.replaceChild(newHeader, header);
        });

        const existingFaqQuestions = document.querySelectorAll(".faq-question");
        existingFaqQuestions.forEach((question) => {
          const newQuestion = question.cloneNode(true);
          question.parentNode.replaceChild(newQuestion, question);
        });

        // Accordion functionality
        const accordionHeaders = document.querySelectorAll(".accordion-header");
        console.log("Found accordion headers:", accordionHeaders.length);

        accordionHeaders.forEach((header, index) => {
          console.log(`Adding click listener to accordion header ${index}`);
          header.addEventListener("click", (e) => {
            e.preventDefault();
            e.stopPropagation();

            console.log("Accordion header clicked:", index);
            const accordionItem = header.closest(".accordion-item");
            const isActive = accordionItem.classList.contains("active");

            console.log(
              "Accordion item current state:",
              isActive ? "active" : "inactive",
            );

            // Close all accordion items first
            document.querySelectorAll(".accordion-item").forEach((item) => {
              item.classList.remove("active");
            });

            // Toggle current accordion
            if (!isActive) {
              accordionItem.classList.add("active");
              console.log("Accordion opened");
            } else {
              console.log("Accordion closed");
            }
          });
        });

        // FAQ functionality
        const faqQuestions = document.querySelectorAll(".faq-question");
        console.log("Found FAQ questions:", faqQuestions.length);

        faqQuestions.forEach((question, index) => {
          console.log(`Adding click listener to FAQ question ${index}`);
          question.addEventListener("click", (e) => {
            e.preventDefault();
            e.stopPropagation();

            console.log("FAQ question clicked:", index);
            const faqItem = question.closest(".faq-item");
            const isActive = faqItem.classList.contains("active");

            console.log(
              "FAQ item current state:",
              isActive ? "active" : "inactive",
            );

            // Close all FAQ items first
            document.querySelectorAll(".faq-item").forEach((item) => {
              item.classList.remove("active");
            });

            // Toggle current FAQ
            if (!isActive) {
              faqItem.classList.add("active");
              console.log("FAQ opened");
            } else {
              console.log("FAQ closed");
            }
          });
        });

        // Global functions as backup
        window.toggleAccordion = function (header) {
          console.log("Global toggleAccordion called");
          const accordionItem = header.closest(".accordion-item");
          const isActive = accordionItem.classList.contains("active");

          document.querySelectorAll(".accordion-item").forEach((item) => {
            item.classList.remove("active");
          });

          if (!isActive) {
            accordionItem.classList.add("active");
          }
        };

        window.toggleFaq = function (question) {
          console.log("Global toggleFaq called");
          const faqItem = question.closest(".faq-item");
          const isActive = faqItem.classList.contains("active");

          document.querySelectorAll(".faq-item").forEach((item) => {
            item.classList.remove("active");
          });

          if (!isActive) {
            faqItem.classList.add("active");
          }
        };

        // Testimonial video click functionality
        const testimonialVideos =
          document.querySelectorAll(".testimonial-video");
        testimonialVideos.forEach((video) => {
          video.addEventListener("click", () => {
            window.openVideoPopup &&
              window.openVideoPopup(
                "https://www.youtube.com/embed/dQw4w9WgXcQ",
              ); // Example video URL
          });
        });

        // Product video click functionality
        const productVideoThumbnails = document.querySelectorAll(
          ".video-card .video-thumbnail",
        );
        productVideoThumbnails.forEach((thumbnail) => {
          thumbnail.addEventListener("click", () => {
            const videoTitle =
              thumbnail.parentElement.querySelector("h4").innerText;
            const videoUrl = `https://www.youtube.com/embed/fSQbZqnMMaQ?si=PGhNkxNcAltb0CyT`; // Example video URL
            window.openVideoPopup && window.openVideoPopup(videoUrl);
          });
        });
      }, 1000);
    };

    // Initialize product features
    initializeProductFeatures();

    // Load scripts after initial setup
    const scripts = [
      "/src/js/jquery.min.js",
      "/src/js/owl.carousel.min.js",
      "/src/js/wow.js",
      "/src/js/script.js",
    ];

    scripts.forEach((src) => {
      const script = document.createElement("script");
      script.src = src;
      script.onload = () => {
        console.log(`Loaded: ${src}`);
      };
      script.onerror = (error) => {
        console.error(`Error loading script ${src}:`, error);
      };
      document.head.appendChild(script);
    });

    // Cleanup function
    return () => {
      // Remove event listeners if needed
    };
  }, [product, id, slug, navigate, mainImage]); // Added mainImage as dependency for useEffect

  if (error) {
    return (
      <div className="product-details-page">
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "50vh",
            fontSize: "1.8rem",
            color: "red",
          }}
        >
          Error: {error}
        </div>
      </div>
    );
  }

  // GPS Trackers comparison table removed completely - no comparison for moto and turbo

  // Only show error if we have an actual error, not when product is still loading
  if (!product && error) {
    return (
      <div className="product-details-page">
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "50vh",
            fontSize: "1.8rem",
          }}
        >
          Product not found
        </div>
      </div>
    );
  }

  // Show nothing while product is loading (before data arrives)
  if (!product) {
    return null;
  }

  return (
    <div className="product-details-page">
      {/* Product Hero Section */}
      <section className="product-hero-modern">
        <div className="product-hero-container">
          <div className="product-hero-images">
            <div className="product-thumbnails-vertical">
              {/* Show thumbnails generated by generateThumbnails function */}
              {generateThumbnails().map((thumbnail, index) => (
                <div
                  key={index}
                  className={`product-thumbnail ${index === 0 ? "active" : ""}`}
                  data-type="image"
                  onClick={() => {
                    // Update main image state
                    setMainImage(thumbnail);

                    // Update active class
                    document
                      .querySelectorAll(".product-thumbnail")
                      .forEach((t) => t.classList.remove("active"));
                    document
                      .querySelectorAll(".product-thumbnail")
                      [index].classList.add("active");
                  }}
                >
                  <img
                    src={thumbnail}
                    alt={`${product.name} view ${index + 1}`}
                  />
                </div>
              ))}
            </div>
            <div
              className="product-main-image"
              key={`${actualSlug}-${actualId}-${mainImage}`} // Force re-render on URL/image change
            >
              <img
                id="main-image"
                src={mainImage}
                alt={`${product.name} smart lock`}
                style={{
                  maxWidth: "100%",
                  maxHeight: "35rem",
                  objectFit: "contain",
                  transition: "opacity 0.3s ease",
                }}
              />
            </div>
          </div>

          <div className="product-hero-info">
            <h1 className="product-hero-title">{product.name}</h1>

            <p className="product-hero-desc">{product.description}</p>

            <div className="mrp-section">
              <div className="mrp-label">
                MRP{" "}
                <span style={{ textDecoration: "line-through" }}>
                  ₹
                  {Math.round(
                    product.mrp || product.originalPrice || product.price || 0,
                  ).toLocaleString("en-IN")}
                </span>{" "}
                (Inclusive of all taxes)
              </div>
              <div className="mrp-price">
                ₹
                {Math.round(
                  product.selling_price || product.net_price || 0,
                ).toLocaleString("en-IN")}
                {(product.display_percentage || product.discount || 0) > 0 && (
                  <span style={{ color: "#28a745", marginLeft: "8px" }}>
                    (
                    {Math.round(
                      product.display_percentage || product.discount || 0,
                    )}
                    % Off)
                  </span>
                )}
              </div>
            </div>

            <div className="product-hero-actions">
              <div className="quantity-selector">
                <button className="qty-btn" onClick={decreaseQuantity}>
                  -
                </button>
                <input
                  type="number"
                  value={quantity}
                  min="0"
                  className="qty-input"
                  id="quantity"
                  onChange={handleQuantityChange}
                />
                <button className="qty-btn" onClick={increaseQuantity}>
                  +
                </button>
              </div>
              <button
                className="hero-btn hero-btn-secondary add-to-cart-btn"
                onClick={handleAddToCart}
              >
                Add to cart
              </button>
            </div>

            <div className="pincode-section">
              <div className="pincode-input-container">
                <input
                  type="text"
                  className="pincode-input"
                  placeholder="Input your pincode to check"
                />
                <button className="pincode-btn">Check</button>
              </div>
              <p
                className="delivery-info"
                style={{ display: "block", color: "#6c757d" }}
              >
                Please enter a pincode.
              </p>
            </div>

            {/* Trust Section with Category-specific Content */}
            <div className="trust-section">
              <div className="trust-title">
                AT CORELENS TRUST IS GUARANTEED AT EVERY STEP
              </div>
              {getTrustBadges()}
            </div>
          </div>
        </div>
      </section>

      {/* Know More Section */}
      <section className="know-more-section">
        <div className="know-more-title">KNOW MORE</div>
        <div className="know-more-image-container">
          <img
            src={product.knowMoreImage || "/images/knowmore/knowmore-locks.jpg"}
            alt="Product Features"
            className="know-more-featured-image"
            onError={(e) => {
              console.error("Image load failed:", e.target.src);
              e.target.src = "/images/knowmore/knowmore-locks.jpg";
            }}
          />
        </div>
      </section>

      {/* Video Frame Section */}
      <section className="video-frame" id="product-video-section">
        <div className="video-grid-container" id="youtube-player">
          <iframe
            width="100%"
            height="500"
            src={(() => {
              const productName = (product?.name || "").toLowerCase();
              let videoId = "";

              // Product-specific video mapping
              if (productName.includes("ultra")) {
                videoId = "dV8zaRaWCxI";
              } else if (productName.includes("royale")) {
                videoId = "owBKsviTtTQ";
              } else if (productName.includes("turbo")) {
                videoId = "SnRUk_yLRdI";
              } else if (productName.includes("echo")) {
                videoId = "RBJU2b7hDSw";
              } else if (productName.includes("wave")) {
                videoId = "tFllR0Tdn-s";
              } else if (productName.includes("polo")) {
                videoId = "90iBsEqdYF4";
              } else if (productName.includes("oval")) {
                videoId = "6dr8uwGsnlw";
              } else if (productName.includes("gem")) {
                videoId = "EjRM3m0h2tY";
              } else if (
                productName.includes("motion") ||
                productName.includes("sensor")
              ) {
                videoId = "en1VRrjOJqs";
              } else if (productName.includes("moto")) {
                videoId = "M5CZPtRqklg";
              } else if (productName.includes("prime")) {
                videoId = "oj1NXHbTwUU";
              } else {
                videoId = "fCueFbMZ3lU";
              }
              
              return `https://www.youtube.com/embed/${videoId}?enablejsapi=1&mute=1`;
            })()}
            title={`${product?.name} - Product Demo Video`}
            frameborder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerpolicy="strict-origin-when-cross-origin"
            allowfullscreen
          ></iframe>
        </div>
      </section>
      {/* Specifications Section */}
      <section className="specifications-modern">
        <div className="specs-container">
          <h2 className="specs-title">Technical Specifications</h2>
          <section className="accordion-sections">
            <div className="accordion-container">
              {/* Technical Specifications Accordion */}
              <div className="accordion-item">
                <div className="accordion-header">
                  <h3 className="accordion-title">Technical Specifications</h3>
                  <div className="accordion-toggle">
                    <svg
                      className="accordion-icon"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <polyline points="6,9 12,15 18,9"></polyline>
                    </svg>
                  </div>
                </div>
                <div className="accordion-content" id="tech-specs">
                  <div className="accordion-body">
                    {/* Features */}
                    <div className="spec-category">
                      <h4 className="spec-category-title">Main Highlights</h4>
                      <div className="highlights-grid">
                        {(() => {
                          const localProduct = getLocalProductData();
                          // Support both features array and technicalHighlights.main object
                          const highlights =
                            localProduct?.technicalHighlights?.main ||
                            product?.technicalHighlights?.main ||
                            product.features?.map((f) => ({ title: f }));

                          return highlights.map((highlight, index) => {
                            const title =
                              typeof highlight === "string"
                                ? highlight
                                : highlight.title;
                            const titleLower = title.toLowerCase();

                            let iconSrc = null;

                            // 1. Manual keyword mapping to specific PNGs in highlights folder
                            if (titleLower.includes("touchpad"))
                              iconSrc = "/images/icons/highlights/touchpad.png";
                            else if (titleLower.includes("unlock"))
                              iconSrc = "/images/icons/highlights/unlock.png";
                            else if (titleLower.includes("privacy lock"))
                              iconSrc =
                                "/images/icons/highlights/privacy-lock.png";
                            else if (titleLower.includes("notification"))
                              iconSrc =
                                "/images/icons/highlights/notification.png";
                            else if (titleLower.includes("lcd"))
                              iconSrc = "/images/icons/highlights/LCD.png";
                            else if (
                              titleLower.includes("free memory") ||
                              titleLower.includes("64gb card") ||
                              titleLower.includes("64gb memory card")
                            )
                              iconSrc =
                                "/images/icons/highlights/free-memory-card.png";
                            else if (titleLower.includes("free"))
                              iconSrc = "/images/icons/highlights/free.png";
                            else if (
                              titleLower.includes("high grade") ||
                              titleLower.includes("high-grade")
                            )
                              iconSrc =
                                "/images/icons/highlights/high-grade.png";
                            else if (
                              titleLower.includes("support") ||
                              titleLower.includes("24/7")
                            )
                              iconSrc =
                                "/images/icons/highlights/24-support.png";
                            else if (titleLower.includes("warranty"))
                              iconSrc = "/images/icons/highlights/warranty.png";
                            else if (titleLower.includes("installation"))
                              iconSrc =
                                "/images/icons/highlights/easy-installation.png";
                            else if (titleLower.includes("battery"))
                              iconSrc = "/images/icons/highlights/battery.png";
                            else if (
                              titleLower.includes("night mode") ||
                              titleLower.includes("night-mode") ||
                              titleLower.includes("ir night") ||
                              titleLower.includes("night")
                            )
                              iconSrc =
                                "/images/icons/highlights/night-mode.png";
                            else if (titleLower.includes("tracking"))
                              iconSrc = "/images/icons/highlights/tracking.png";
                            else if (titleLower.includes("signal"))
                              iconSrc = "/images/icons/highlights/signal.png";
                            else if (
                              titleLower.includes("easy to use") ||
                              titleLower.includes("easy-to-use") ||
                              titleLower.includes("ease of use") ||
                              titleLower.includes("ease-of-use")
                            )
                              iconSrc =
                                "/images/icons/highlights/ease-of-use.png";
                            else if (titleLower.includes("4g network"))
                              iconSrc = "/images/icons/highlights/4g.png";
                            else if (titleLower.includes("track playback"))
                              iconSrc =
                                "/images/icons/highlights/track-playback.png";
                            else if (
                              titleLower.includes("geo fence") ||
                              titleLower.includes("geo-fence")
                            )
                              iconSrc =
                                "/images/icons/highlights/geo-fence.png";
                            else if (titleLower.includes("power off"))
                              iconSrc =
                                "/images/icons/highlights/power-off.png";
                            else if (titleLower.includes("overspeed"))
                              iconSrc =
                                "/images/icons/highlights/overspeed.png";
                            else if (
                              titleLower.includes("ceo") ||
                              titleLower.includes("ceo fence") ||
                              titleLower.includes("ceo france")
                            )
                              iconSrc = "/images/icons/highlights/motion.png";
                            else if (titleLower.includes("alexa"))
                              iconSrc = "/images/icons/highlights/alexa.png";
                            else if (
                              titleLower.includes("auto moving") ||
                              titleLower.includes("auto-moving")
                            )
                              iconSrc =
                                "/images/icons/highlights/auto-moving.png";
                            else if (
                              titleLower.includes("water resistant") ||
                              titleLower.includes("water-resistant")
                            )
                              iconSrc =
                                "/images/icons/highlights/water-resistant.png";
                            else if (titleLower.includes("motion"))
                              iconSrc = "/images/icons/highlights/motion.png";
                            else if (titleLower.includes("volume"))
                              iconSrc = "/images/icons/highlights/volume.png";
                            else if (
                              titleLower.includes("target") ||
                              titleLower.includes("traget")
                            )
                              iconSrc = "/images/icons/highlights/traget.png";
                            else if (
                              titleLower.includes("tv") ||
                              titleLower.includes("monitor")
                            )
                              iconSrc =
                                "/images/icons/highlights/tv-monitor.png";
                            else if (titleLower.includes("audio"))
                              iconSrc = "/images/icons/highlights/volume.png";
                            else if (
                              titleLower.includes("megapixel") ||
                              titleLower.includes("mp")
                            )
                              iconSrc =
                                "/images/icons/highlights/megapixel.png";
                            else if (
                              titleLower.includes("alarm") ||
                              titleLower.includes("smart alarm")
                            )
                              iconSrc =
                                "/images/icons/highlights/notification.png";
                            else if (
                              titleLower.includes("home") ||
                              titleLower.includes("1 year home")
                            )
                              iconSrc = "/images/icons/highlights/support.png";
                            else if (
                              titleLower.includes("4 external antenna") ||
                              titleLower.includes("4-external-antenna") ||
                              titleLower.includes("external antenna")
                            )
                              iconSrc =
                                "/images/icons/highlights/4-external-antennas.png";
                            else if (titleLower.includes("parental"))
                              iconSrc = "/images/icons/highlights/parental.png";
                            else if (
                              titleLower.includes("2x2 mimo") ||
                              titleLower.includes("2x2-mimo")
                            )
                              iconSrc = "/images/icons/highlights/2x2-mimo.png";
                            else if (
                              titleLower.includes("guest network") ||
                              titleLower.includes("guest-network")
                            )
                              iconSrc =
                                "/images/icons/highlights/guest-network.png";
                            else if (
                              titleLower.includes("two modes") ||
                              titleLower.includes("two-modes")
                            )
                              iconSrc = "/images/icons/highlights/two-mode.png";
                            else if (
                              titleLower.includes("no network required") ||
                              titleLower.includes("no-network-required")
                            )
                              iconSrc =
                                "/images/icons/highlights/no-network-required.png";
                            else if (
                              titleLower.includes("long backup") ||
                              titleLower.includes("long-backup")
                            )
                              iconSrc =
                                "/images/icons/highlights/long-backup.png";

                            // 2. Fallback
                            if (!iconSrc) {
                              iconSrc = `/images/icons/corelens-icon${(index % 8) + 1}.svg`; // Re-enable generic icons temporarily to see missing ones
                            }

                            return (
                              <div key={index} className="highlight-item">
                                <img
                                  src={iconSrc}
                                  alt={title}
                                  aria-hidden="true"
                                  className="highlight-icon"
                                  onError={(e) => {
                                    e.target.src =
                                      "/images/icons/highlights/motion.png";
                                  }}
                                />
                                <span className="highlight-text">{title}</span>
                              </div>
                            );
                          });
                        })()}
                      </div>
                    </div>

                    {/* Technical highlights */}
                    <div className="spec-category">
                      <h4 className="spec-category-title">
                        Technical Highlights
                      </h4>
                      <div className="tech-highlights-table">
                        {(() => {
                          // First try to get technical highlights from local product data
                          const localProduct = getLocalProductData();
                          let technicalHighlights =
                            localProduct?.technicalHighlights ||
                            product?.technicalHighlights;

                          if (
                            technicalHighlights &&
                            Object.keys(technicalHighlights).length > 0
                          ) {
                            return Object.entries(technicalHighlights).map(
                              ([key, value]) => (
                                <div key={key} className="tech-row">
                                  <div className="tech-label">{key}</div>
                                  <div className="tech-value">{value}</div>
                                </div>
                              ),
                            );
                          } else {
                            // Fallback default technical highlights if no specs available
                            return (
                              <>
                                <div className="tech-row">
                                  <div className="tech-label">LCD Display</div>
                                  <div className="tech-value">YES</div>
                                </div>
                                <div className="tech-row">
                                  <div className="tech-label">
                                    Working voltage
                                  </div>
                                  <div className="tech-value">4.5V - 6V</div>
                                </div>
                                <div className="tech-row">
                                  <div className="tech-label">
                                    Working temperature
                                  </div>
                                  <div className="tech-value">
                                    -20°C to 60°C
                                  </div>
                                </div>
                                <div className="tech-row">
                                  <div className="tech-label">Access Logs</div>
                                  <div className="tech-value">99 Entries</div>
                                </div>
                                <div className="tech-row">
                                  <div className="tech-label">
                                    Door Thickness
                                  </div>
                                  <div className="tech-value">30mm- 80mm</div>
                                </div>
                                <div className="tech-row">
                                  <div className="tech-label">
                                    Auto Lock Feature
                                  </div>
                                  <div className="tech-value">Yes</div>
                                </div>
                                <div className="tech-row">
                                  <div className="tech-label">Connectivity</div>
                                  <div className="tech-value">
                                    Wi-Fi Supported
                                  </div>
                                </div>
                                <div className="tech-row">
                                  <div className="tech-label">
                                    Battery Backup
                                  </div>
                                  <div className="tech-value">6-9 Months</div>
                                </div>
                                <div className="tech-row">
                                  <div className="tech-label">Power supply</div>
                                  <div className="tech-value">
                                    4x AA Batteries / Rechargeable Lithium
                                    Battery
                                  </div>
                                </div>
                                <div className="tech-row">
                                  <div className="tech-label">
                                    Working Humidity
                                  </div>
                                  <div className="tech-value">10% - 90% RH</div>
                                </div>
                                <div className="tech-row">
                                  <div className="tech-label">
                                    Emergency Power
                                  </div>
                                  <div className="tech-value">
                                    USB Type-C or 9V External Power Backup
                                  </div>
                                </div>
                                <div className="tech-row">
                                  <div className="tech-label">
                                    Low battery Alarm
                                  </div>
                                  <div className="tech-value">Yes</div>
                                </div>
                              </>
                            );
                          }
                        })()}
                      </div>
                    </div>

                    {/* Functional Specifications */}
                    <div className="spec-category">
                      <h4 className="spec-category-title">
                        Functional Specifications
                      </h4>
                      {(() => {
                        // Determine category and product specific specs
                        let category = "";
                        const categories = [
                          "door-locks",
                          "cam-sensors",
                          "gps-trackers",
                          "motion-sensors",
                          "accessories",
                        ];

                        for (const cat of categories) {
                          if (
                            categoryProductDetails[cat] &&
                            categoryProductDetails[cat][actualSlug]
                          ) {
                            category = cat;
                            break;
                          }
                        }

                        // If not found in categories, try to determine from product name
                        if (!category && product) {
                          const productName = product.name.toLowerCase();
                          if (
                            productName.includes("door") ||
                            productName.includes("lock") ||
                            productName.includes("royale") ||
                            productName.includes("prime") ||
                            productName.includes("ultra")
                          ) {
                            category = "door-locks";
                          } else if (
                            productName.includes("polo") ||
                            productName.includes("echo") ||
                            productName.includes("oval") ||
                            productName.includes("cam") ||
                            productName.includes("wave") ||
                            productName.includes("camera")
                          ) {
                            category = "cam-sensors";
                          } else if (
                            productName.includes("turbo") ||
                            productName.includes("moto") ||
                            productName.includes("gps") ||
                            productName.includes("tracker")
                          ) {
                            category = "gps-trackers";
                          } else if (
                            productName.includes("motion") ||
                            productName.includes("sensor") ||
                            productName.includes("gem")
                          ) {
                            category = "motion-sensors";
                          } else if (
                            productName.includes("mercusys") ||
                            productName.includes("router") ||
                            productName.includes("ac12") ||
                            productName.includes("mr30g")
                          ) {
                            category = "accessories";
                          }
                        }

                        // Return category-specific functional specifications
                        if (category === "cam-sensors") {
                          return (
                            <ul className="spec-list">
                              <li>Crystal-Clear HD/4K Video Quality</li>
                              <li>Intelligent Motion & Human Detection</li>
                              <li>Seamless Wi-Fi and Cloud Storage</li>
                              <li>Real-Time Remote Access Anytime</li>
                              <li>
                                Get notified everytime when someone enters your
                                property.
                              </li>
                              <li>
                                Smart Surveillance book at 9rs per hour when you
                                need.
                              </li>
                            </ul>
                          );
                        } else if (category === "gps-trackers") {
                          const productName =
                            product?.name?.toLowerCase() || "";
                          if (productName.includes("moto")) {
                            return (
                              <ul className="spec-list">
                                <li>24/7 Vehicle Location Tracking System</li>
                                <li>Route History Playback and Reports</li>
                                <li>Overspeeding, Idle, and Movement Alerts</li>
                                <li>Engine Cut-Off via Mobile App</li>
                                <li>
                                  Multi-Vehicle Management on One Dashboard
                                </li>
                                <li>
                                  Tamper Detection with Instant Notifications
                                </li>
                              </ul>
                            );
                          } else if (productName.includes("turbo")) {
                            return (
                              <ul className="spec-list">
                                <li>24/7 Vehicle Location Tracking System</li>
                                <li>Route History Playback and Reports</li>
                                <li>Overspeeding, Idle, and Movement Alerts</li>
                                <li>Long lasting battery with optimisation</li>
                                <li>
                                  Multi-Vehicle Management on One Dashboard
                                </li>
                                <li>Smart Geo Fencing and instant alerts</li>
                              </ul>
                            );
                          } else {
                            // Default GPS tracker specs for other models like Wave
                            return (
                              <ul className="spec-list">
                                <li>24/7 Vehicle Location Tracking System</li>
                                <li>Route History Playback and Reports</li>
                                <li>Overspeeding, Idle, and Movement Alerts</li>
                                <li>
                                  Multi-Vehicle Management on One Dashboard
                                </li>
                                <li>Smart Geo Fencing and instant alerts</li>
                                <li>
                                  Tamper Detection with Instant Notifications
                                </li>
                              </ul>
                            );
                          }
                        } else if (category === "motion-sensors") {
                          return (
                            <ul className="spec-list">
                              <li>
                                Advanced PIR Technology for Accurate Detection
                              </li>
                              <li>Wide-Angle Coverage for Maximum Security</li>
                              <li>Day/Night Adaptive Motion Recognition</li>
                              <li>Compact, Durable, and Easy Installation</li>
                              <li>
                                Low Power Consumption, Long Battery Backup
                              </li>
                              <li>Sleek Design for Home or Office</li>
                            </ul>
                          );
                        } else if (category === "accessories") {
                          return (
                            <ul className="spec-list">
                              <li>High-Speed Wireless Connectivity</li>
                              <li>Multi-Device Support</li>
                              <li>Advanced Security Protocols</li>
                              <li>Easy Setup and Configuration</li>
                              <li>Remote Management Capabilities</li>
                              <li>Energy Efficient Operation</li>
                            </ul>
                          );
                        } else {
                          // Default door-locks specifications
                          return (
                            <ul className="spec-list">
                              <li>
                                <strong>Multiple Access Modes</strong>
                                <ul>
                                  <li>
                                    Unlock via fingerprint, PIN, mobile app,
                                    RFID card, and backup key.
                                  </li>
                                </ul>
                              </li>
                              <li>
                                <strong>Advanced Security Features</strong>
                                <ul>
                                  <li>
                                    Auto-lock, tamper alerts, wrong attempt
                                    lockout, and encrypted communication.
                                  </li>
                                </ul>
                              </li>
                              <li>
                                <strong>Connectivity & Control</strong>
                                <ul>
                                  <li>
                                    Bluetooth, Wi-Fi (remote control), and{" "}
                                    <strong>Corelens</strong> app integration.
                                  </li>
                                </ul>
                              </li>
                              <li>
                                <strong>Power & Battery Management</strong>
                                <ul>
                                  <li>
                                    Long-lasting batteries, low battery alerts,
                                    and emergency USB charging.
                                  </li>
                                </ul>
                              </li>
                              <li>
                                <strong>User Management & Logs</strong>
                                <ul>
                                  <li>
                                    Add/remove users, assign roles, generate
                                    temporary access, and view access history.
                                  </li>
                                </ul>
                              </li>
                              <li>
                                <strong>Durability & Compatibility</strong>
                                <ul>
                                  <li>
                                    Strong build (zinc/stainless steel),
                                    weather-resistant, supports different door
                                    types.
                                  </li>
                                </ul>
                              </li>
                            </ul>
                          );
                        }
                      })()}
                    </div>

                    {/* Product Details */}
                    <div className="spec-category">
                      <h4 className="spec-category-title">Product Details</h4>
                      <div className="product-details-text">
                        {(() => {
                          // Determine product category and product name for specific details
                          let category = "";
                          const categories = [
                            "door-locks",
                            "cam-sensors",
                            "gps-trackers",
                            "motion-sensors",
                            "accessories",
                          ];

                          for (const cat of categories) {
                            if (
                              categoryProductDetails[cat] &&
                              categoryProductDetails[cat][actualSlug]
                            ) {
                              category = cat;
                              break;
                            }
                          }

                          // If not found in categories, try to determine from product name
                          if (!category && product) {
                            const productName = product.name.toLowerCase();
                            if (
                              productName.includes("door") ||
                              productName.includes("lock") ||
                              productName.includes("royale") ||
                              productName.includes("prime") ||
                              productName.includes("ultra")
                            ) {
                              category = "door-locks";
                            } else if (
                              productName.includes("polo") ||
                              productName.includes("echo") ||
                              productName.includes("oval") ||
                              productName.includes("cam") ||
                              productName.includes("wave") ||
                              productName.includes("camera") ||
                              productName.includes("gem")
                            ) {
                              category = "cam-sensors";
                            } else if (
                              productName.includes("turbo") ||
                              productName.includes("moto") ||
                              productName.includes("gps") ||
                              productName.includes("tracker")
                            ) {
                              category = "gps-trackers";
                            } else if (
                              productName.includes("motion") ||
                              productName.includes("sensor")
                            ) {
                              category = "motion-sensors";
                            } else if (
                              productName.includes("mercusys") ||
                              productName.includes("router") ||
                              productName.includes("ac12") ||
                              productName.includes("mr30g")
                            ) {
                              category = "accessories";
                            }
                          }

                          // Return category-specific and product-specific details
                          if (category === "cam-sensors") {
                            const productName =
                              product?.name?.toLowerCase() || "";

                            if (productName.includes("polo")) {
                              return (
                                <>
                                  <p>
                                    Introducing the Corelens Polo – a premium
                                    outdoor security camera designed to protect
                                    what matters most. Engineered with Full HD
                                    clarity and advanced night vision, it
                                    captures every detail with unmatched
                                    precision – day or night. Its all-weather
                                    build ensures uninterrupted protection,
                                    standing strong against rain, dust, and
                                    extreme heat. With intelligent motion
                                    detection, Polo alerts you the moment
                                    unusual activity is spotted, keeping you one
                                    step ahead. Stay connected anywhere with the
                                    Corelens app, giving you live access to your
                                    home or office at all times.The two-way
                                    communication system allows you to welcome
                                    guests or deter intruders with just a tap.
                                  </p>
                                  <p>
                                    For added peace of mind, you can book hourly
                                    surveillance, where professional guards
                                    monitor your camera in real time.Every
                                    recording is safely stored through cloud
                                    backup or memory card, ensuring your
                                    evidence is never lost. Sleek, powerful, and
                                    reliable – the Corelens Polo is more than a
                                    camera; it's your intelligent outdoor
                                    guardian.
                                  </p>
                                </>
                              );
                            } else if (productName.includes("gem")) {
                              return (
                                <>
                                  <p>
                                    Introducing the Corelens Gem – a sleek
                                    Outdoor security camera designed to keep
                                    your home and loved ones safe. With Full HD
                                    clarity and infrared night vision, Gem
                                    captures every detail, day and night. Its
                                    compact, stylish design fits perfectly in
                                    any room without looking out of place.
                                    Through the Corelens app, you can watch live
                                    video anytime, anywhere, directly from your
                                    phone. Gem features two-way audio, so you
                                    can talk to family, pets, or visitors in
                                    real time.
                                  </p>
                                  <p>
                                    With smart motion detection, it instantly
                                    alerts you whenever movement is detected,
                                    keeping you informed. For extra peace of
                                    mind, you can book hourly surveillance,
                                    allowing trained professionals to monitor
                                    your Gem camera whenever needed. All
                                    recordings are safely stored via cloud
                                    backup or memory card, ensuring your videos
                                    are always accessible. Reliable,
                                    intelligent, and stylish – the Corelens Gem
                                    is more than a camera; it's your trusted
                                    Outdoor guardian.
                                  </p>
                                </>
                              );
                            } else if (productName.includes("oval")) {
                              return (
                                <>
                                  <p>
                                    Introducing the Corelens Oval – the elegant
                                    Outdoor security camera built to keep your
                                    family and spaces safe. With Full HD clarity
                                    and infrared night vision, Oval delivers
                                    sharp, clear footage around the clock. Its
                                    360° pan and tilt design ensures every
                                    corner of your room is covered, leaving no
                                    blind spots behind. Through the Corelens
                                    app, you can watch live video anytime,
                                    anywhere – right from your phone.
                                  </p>
                                  <p>
                                    Stay closer to your loved ones with two-way
                                    audio, allowing you to talk to kids,
                                    parents, or even pets in real time. Oval's
                                    smart motion detection instantly alerts you
                                    when unusual activity takes place, so you
                                    never miss a moment. For ultimate peace of
                                    mind, you can book hourly surveillance,
                                    where trained professionals monitor your
                                    Oval camera whenever needed. Recordings are
                                    safely stored via cloud backup or memory
                                    card, so your moments and evidence are
                                    always secure. Stylish, compact, and
                                    intelligent – the Corelens Oval is not just
                                    a camera, but a trusted companion for your
                                    home.
                                  </p>
                                </>
                              );
                            } else if (productName.includes("echo")) {
                              return (
                                <>
                                  <p>
                                    Meet the Corelens Echo, your smart indoor
                                    Wi-Fi camera that makes home security
                                    simple. It shows you clear HD video so you
                                    can always see what's happening at home.
                                    Even at night, Echo's night vision keeps
                                    watch when you can't. The camera can move
                                    around (left, right, up, down) to cover
                                    every corner of your room. Through the
                                    Corelens app, you can watch live video
                                    anytime, anywhere on your phone.
                                  </p>
                                  <p>
                                    Want to talk to your kids, parents, or pets?
                                    Echo lets you speak and listen with its
                                    two-way audio. If someone moves inside, the
                                    camera instantly alerts you so you don't
                                    miss a thing. Videos can be saved on cloud
                                    or memory card for later viewing. Here's the
                                    best part – you can even book surveillance
                                    on an hourly basis from the Corelens app.
                                    That means real security professionals can
                                    monitor your Echo camera whenever you need
                                    extra safety. Compact, stylish, and super
                                    easy to set up, Echo fits anywhere in your
                                    home without hassle. The Corelens Echo is
                                    more than just a camera – it's a smart guard
                                    that watches, alerts, and even brings
                                    experts to monitor for you.
                                  </p>
                                </>
                              );
                            } else if (productName.includes("wave")) {
                              return (
                                <>
                                  <p>
                                    Introducing the Corelens Wave – a smart
                                    indoor camera designed for instant home
                                    security. With Full HD clarity and infrared
                                    night vision, Wave captures every detail,
                                    day or night. Its compact, stylish design
                                    fits perfectly in any room without being
                                    intrusive. Wave is plug-and-play – just plug
                                    it into a socket, connect to Wi-Fi, and it's
                                    ready to monitor. Through the Corelens app,
                                    you can watch live video anytime, anywhere,
                                    directly from your phone.
                                  </p>
                                  <p>
                                    Wave features two-way audio, so you can talk
                                    to family, pets, or visitors in real time.
                                    With smart motion detection, it instantly
                                    alerts you whenever unusual activity is
                                    detected. For extra peace of mind, you can
                                    book hourly surveillance, allowing trained
                                    professionals to monitor your Wave camera
                                    whenever needed. All recordings are securely
                                    stored on cloud storage or memory card, so
                                    your videos are always accessible. Reliable,
                                    intelligent, and easy to use – the Corelens
                                    Wave is your trusted indoor security
                                    companion.
                                  </p>
                                </>
                              );
                            }
                          } else if (category === "gps-trackers") {
                            const productName =
                              product?.name?.toLowerCase() || "";

                            if (productName.includes("turbo")) {
                              return (
                                <>
                                  <p>
                                    Corelens Turbo is a wireless, rechargeable
                                    GPS tracker built for those who want
                                    security without wiring or complicated
                                    installation. Just charge it, place it, and
                                    track in real time. With the Corelens app
                                    (Android & iOS), you can see your vehicle,
                                    bag, or shipment live on the map anytime,
                                    anywhere. Turbo also offers geo-fencing,
                                    tamper alerts, and movement notifications,
                                    so you know instantly if something is wrong.
                                  </p>
                                  <p>
                                    Its compact design makes it easy to hide,
                                    while the long-lasting battery with smart
                                    power-saving mode ensures days of backup on
                                    a single charge. You can also review
                                    complete route history and playback past
                                    trips whenever needed. Perfect for cars,
                                    bikes, scooters, school bags, luggage, or
                                    shipments, Corelens Turbo adapts to every
                                    lifestyle and business need. It's not just a
                                    tracker — it's portable peace of mind,
                                    powered by Corelens.
                                  </p>
                                </>
                              );
                            } else if (productName.includes("moto")) {
                              return (
                                <>
                                  <p>
                                    Corelens Moto is a reliable wired GPS
                                    tracker for two-wheelers or 4-wheelers
                                    designed to keep your bike or Car safe,
                                    anytime and anywhere. With real-time live
                                    tracking on the Corelens app (Android &
                                    iOS), you always know exactly where your
                                    ride is. Equipped with ignition sensing
                                    (ACC) and low-power sleep mode, Moto ensures
                                    accurate tracking without draining your
                                    battery. You can set up geo-fences, receive
                                    instant movement and tamper alerts, and even
                                    check complete route history playback
                                    whenever you need.
                                  </p>
                                  <p>
                                    For advanced protection, Moto supports an
                                    optional engine immobilizer (via relay) so
                                    you can remotely disable your bike if
                                    stolen. Its compact and discreet design
                                    allows hidden installation under the seat or
                                    frame, keeping it safe from tampering.
                                    Whether you use your two-wheeler for daily
                                    commute, delivery work, or long rides,
                                    Corelens Moto ensures complete anti-theft
                                    protection with smart tracking. Simple to
                                    install, secure to use, and powered by the
                                    trusted Corelens surveillance ecosystem,
                                    Moto gives you peace of mind every time you
                                    park.
                                  </p>
                                </>
                              );
                            }
                          } else if (category === "door-locks") {
                            const productName =
                              product?.name?.toLowerCase() || "";

                            if (productName.includes("ultra")) {
                              return (
                                <>
                                  <p>
                                    Upgrade your home security with the Corelens
                                    Ultra Smart Door Lock – a premium digital
                                    lock designed for modern Indian homes.
                                    Forget the hassle of traditional keys –
                                    unlock your door instantly with fingerprint
                                    access, secure PIN codes, or the Corelens
                                    mobile app. Crafted with a sleek, stylish
                                    design, Ultra not only protects your home
                                    but also enhances the look of your main
                                    door. Stay in control with real-time alerts
                                    on your smartphone whenever someone tries to
                                    unlock or tamper with your door.
                                  </p>
                                  <p>
                                    For family, guests, or domestic staff,
                                    create temporary access codes that work only
                                    when you want them to – safe, simple, and
                                    convenient. With its detailed access
                                    history, you'll always know who entered your
                                    home and at what time. The lock is easy to
                                    install on most standard Indian doors, with
                                    a simple setup that works straight out of
                                    the box. Built with tamper-proof, durable
                                    materials, the Corelens Ultra ensures 24/7
                                    advanced protection against intruders.
                                    Perfect for homes, apartments, and offices –
                                    this smart door lock combines luxury,
                                    safety, and technology in one powerful
                                    device. Strong, reliable, and intelligent –
                                    the Corelens Ultra Smart Door Lock is more
                                    than a lock, it's your ultimate home
                                    security solution.
                                  </p>
                                </>
                              );
                            } else if (productName.includes("prime")) {
                              return (
                                <>
                                  <p>
                                    Upgrade your home security with the Corelens
                                    Prime Smart Door Lock – smart, stylish, and
                                    reliable. Say goodbye to traditional keys –
                                    unlock your door instantly with fingerprint,
                                    PIN, or the Corelens app. Its sleek, modern
                                    design adds a touch of elegance to any
                                    Indian home while keeping it secure. Receive
                                    instant alerts on your phone whenever
                                    someone enters or tries to tamper with your
                                    door.
                                  </p>
                                  <p>
                                    Need to give access to guests, domestic
                                    staff, or delivery personnel? Easily create
                                    temporary access codes for a limited time.
                                    Keep a check on who enters and leaves with
                                    detailed access history, so you're always
                                    informed. Installation is quick and
                                    hassle-free – fits most standard doors and
                                    works straight out of the box. Built for
                                    durability, Prime is strong,
                                    tamper-resistant, and reliable, ensuring
                                    24/7 security for your home. Whether you're
                                    home or away, the Corelens Prime puts full
                                    control of your home's access in your hands.
                                    Smart, elegant, and secure – the Corelens
                                    Prime Smart Door Lock is your trusted home
                                    guardian.
                                  </p>
                                </>
                              );
                            } else if (productName.includes("royale")) {
                              return (
                                <>
                                  <p>
                                    Step into a new era of home security with
                                    the Corelens Royale Smart Door Lock – where
                                    safety meets style. No more struggling with
                                    lost or duplicate keys – unlock your door
                                    instantly with fingerprint, PIN, or the
                                    Corelens app. Its modern, premium design
                                    adds elegance to any Indian home, making
                                    your entrance look smart and stylish. Get
                                    instant notifications on your phone whenever
                                    someone enters or tries to tamper with your
                                    door.
                                  </p>
                                  <p>
                                    Hosting relatives, guests, or domestic
                                    staff? Give them temporary access codes that
                                    work for limited hours – no more worries
                                    about spare keys. Keep track of everyone
                                    entering or leaving with detailed access
                                    history, so you always know who was home and
                                    when. Installation is simple – fits most
                                    standard doors, and it works straight out of
                                    the box. Built to last, Royale is strong,
                                    reliable, and tamper-resistant, giving you
                                    round-the-clock protection. Whether you're
                                    at home, at work, or traveling, the Corelens
                                    Royale keeps your home secure, while putting
                                    complete control in your hands. Smart,
                                    stylish, and intelligent – the Corelens
                                    Royale Smart Door Lock isn't just a lock;
                                    it's your personal home guardian.
                                  </p>
                                </>
                              );
                            }
                          } else if (category === "motion-sensors") {
                            return (
                              <>
                                <p>
                                  Motion Sensor Device 1N, Battery Pack 1N,
                                  Mounting Kit 1N, User Manual 1N, Warranty Card
                                  1N
                                </p>
                              </>
                            );
                          } else if (category === "accessories") {
                            const productName =
                              product?.name?.toLowerCase() || "";

                            if (productName.includes("ac12")) {
                              return (
                                <>
                                  <p>
                                    AC1200 Dual Band Wireless Router 1N, Power
                                    Adapter 1N, Ethernet Cable 1N, Quick
                                    Installation Guide 1N, Warranty Card 1N
                                  </p>
                                </>
                              );
                            } else if (productName.includes("mr30g")) {
                              return (
                                <>
                                  <p>
                                    AC1200 Wireless Dual Band Gigabit Router 1N,
                                    Power Adapter 1N, RJ45 Ethernet Cable 1N,
                                    Quick Installation Guide 1N, Warranty Card
                                    1N
                                  </p>
                                </>
                              );
                            }
                          }

                          // Default fallback for all products
                          return (
                            <>
                              <p>
                                Smart Security Device 1N, Power Adapter 1N,
                                Installation Kit 1N, User Manual 1N, Warranty
                                Card 1N
                              </p>
                            </>
                          );
                        })()}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* FAQ Accordion */}
              <div className="accordion-item">
                <div className="accordion-header">
                  <h3 className="accordion-title">
                    Frequently Asked Questions
                  </h3>
                  <div className="accordion-toggle">
                    <svg
                      className="accordion-icon"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <polyline points="6,9 12,15 18,9"></polyline>
                    </svg>
                  </div>
                </div>
                <div className="accordion-content" id="faq">
                  <div className="accordion-body">
                    {(() => {
                      // Determine product category for FAQ display
                      let category = "";
                      const categories = [
                        "door-locks",
                        "cam-sensors",
                        "gps-trackers",
                        "motion-sensors",
                        "accessories",
                      ];

                      for (const cat of categories) {
                        if (
                          categoryProductDetails[cat] &&
                          categoryProductDetails[cat][actualSlug]
                        ) {
                          category = cat;
                          break;
                        }
                      }

                      // If not found in categories, try to determine from product name
                      if (!category && product) {
                        const productName = product.name.toLowerCase();
                        if (
                          productName.includes("door") ||
                          productName.includes("lock") ||
                          productName.includes("royale") ||
                          productName.includes("prime") ||
                          productName.includes("ultra")
                        ) {
                          category = "door-locks";
                        } else if (
                          productName.includes("polo") ||
                          productName.includes("echo") ||
                          productName.includes("oval") ||
                          productName.includes("cam") ||
                          productName.includes("wave") ||
                          productName.includes("camera")
                        ) {
                          category = "cam-sensors";
                        } else if (
                          productName.includes("turbo") ||
                          productName.includes("moto") ||
                          productName.includes("gps") ||
                          productName.includes("tracker")
                        ) {
                          category = "gps-trackers";
                        } else if (
                          productName.includes("motion") ||
                          productName.includes("sensor") ||
                          productName.includes("gem")
                        ) {
                          category = "motion-sensors";
                        } else if (
                          productName.includes("mercusys") ||
                          productName.includes("router") ||
                          productName.includes("ac12") ||
                          productName.includes("mr30g")
                        ) {
                          category = "accessories";
                        }
                      }

                      // Define FAQ data for each category
                      const faqData = {
                        "cam-sensors": [
                          {
                            question: "Do I need Wi-Fi for these cameras?",
                            answer:
                              "Not always! Our cameras can record directly to an SD card. But with Wi-Fi or Ethernet, you get the full experience — live streaming, remote access, and smart alerts.",
                          },
                          {
                            question: "Can I watch my home from anywhere?",
                            answer:
                              "Absolutely! Just open the Corelens app and check in on your home, office, or shop anytime, from anywhere in the world.",
                          },
                          {
                            question: "Do they capture clear footage at night?",
                            answer:
                              "Yes! With powerful infrared night vision, you get sharp and detailed video even in complete darkness.",
                          },
                          {
                            question: "Are these cameras weatherproof?",
                            answer:
                              "Yes, our outdoor models are built tough with IP65/IP67 protection — rain, dust, or heat, they never stop guarding.",
                          },
                          {
                            question: "How much video storage do I get?",
                            answer:
                              "You can store up to 128GB on a microSD card, plus we offer secure cloud storage for longer backups.",
                          },
                          {
                            question: "Can I add multiple cameras?",
                            answer:
                              "Of course! The Corelens app lets you manage and view multiple cameras on a single screen — perfect for bigger homes and businesses.",
                          },
                        ],
                        "gps-trackers": [
                          {
                            question: "How accurate is the location tracking?",
                            answer:
                              "Our GPS trackers pinpoint your vehicle with up to 5–10 meter accuracy — so you always know exactly where it is.",
                          },
                          {
                            question: "Do I need internet for it to work?",
                            answer:
                              "Yes, the tracker uses a SIM card with data to send you real-time updates. Without internet, it records but cannot transmit live location.",
                          },
                          {
                            question: "Can I track more than one vehicle?",
                            answer:
                              "Definitely! With the Corelens app, you can monitor all your cars, bikes, or fleet vehicles from one dashboard.",
                          },
                          {
                            question: "What if someone tries to remove it?",
                            answer:
                              "You'll instantly get a tamper alert on your phone so you're always one step ahead.",
                          },
                          {
                            question: "How long does the battery last?",
                            answer:
                              "Depending on the model, from several days to weeks in power-saving mode. Plus, you'll get low-battery alerts before it runs out.",
                          },
                          {
                            question: "Can I remotely stop the vehicle?",
                            answer:
                              "Yes! Some models support remote engine cut-off, giving you complete control in case of theft.",
                          },
                        ],
                        "door-locks": [
                          {
                            question: "How can I unlock the door?",
                            answer:
                              "You have five choices — fingerprint, PIN code, RFID card, mobile app, or good old mechanical key. Total flexibility, total security.",
                          },
                          {
                            question:
                              "Can I open the door from outside my city?",
                            answer:
                              "Yes! With Wi-Fi models, you can lock or unlock your door from anywhere in the world using the Corelens app.",
                          },
                          {
                            question: "What happens if the battery dies?",
                            answer:
                              "Don't worry! You'll get advance low-battery alerts. And in emergencies, you can use a USB-C power bank or your backup key.",
                          },
                          {
                            question: "Is it hack-proof?",
                            answer:
                              "Yes, all Corelens smart locks use advanced AES encryption, making them highly secure against digital intrusions.",
                          },
                          {
                            question: "How many people can I give access to?",
                            answer:
                              "Up to 200 fingerprints plus multiple PIN codes and cards — perfect for families, staff, or Airbnb hosts.",
                          },
                          {
                            question: "Can it be installed on my door?",
                            answer:
                              "Yes, our locks fit most wooden and metal doors (35mm–55mm thickness), whether left or right opening.",
                          },
                        ],
                        "motion-sensors": [
                          {
                            question: "How does the motion sensor protect me?",
                            answer:
                              "It instantly detects movement in its coverage area and sounds loud alarm — to scare thieves, giving you peace of mind 24/7.",
                          },
                          {
                            question: "Does it work during the night?",
                            answer:
                              "Yes! Our sensors are always active — day or night, they never take a break.",
                          },
                          {
                            question: "How is it powered?",
                            answer:
                              "They run on long-lasting batteries which runs long enough for your vacation or any trips.",
                          },
                          {
                            question: "Do I get alerts instantly?",
                            answer:
                              "No, you'll not receive real-time notifications on the Corelens app because it works without wifi and electricity. It is just helpful to scare thieves with the loud alarm.",
                          },
                          {
                            question: "Does the sensor need wiring?",
                            answer:
                              "No. Corelens motion sensors are wireless, battery-powered, and super easy to install without drilling.",
                          },
                        ],
                        accessories: [
                          {
                            question: "Is free installation support included?",
                            answer:
                              "Yes, we provide free installation support with every purchase. Our certified technicians will help you install the device properly and ensure it's working correctly.",
                          },
                          {
                            question: "What are the connectivity options?",
                            answer:
                              "Our accessories support multiple connectivity options including Wi-Fi, Ethernet, and Bluetooth depending on the specific product model.",
                          },
                          {
                            question: "How do I set up the device?",
                            answer:
                              "Setup is simple! Just follow the quick start guide included in the box, or use our mobile app for step-by-step guided installation.",
                          },
                          {
                            question: "What is the warranty period?",
                            answer:
                              "All our accessories come with a 2-year warranty covering manufacturing defects and hardware issues.",
                          },
                          {
                            question: "Do you provide technical support?",
                            answer:
                              "Yes! We offer 24/7 technical support through phone, chat, and email to help with any questions or troubleshooting.",
                          },
                        ],
                      };

                      // Get appropriate FAQ data
                      const faqs = faqData[category] || faqData["door-locks"]; // Default to door-locks FAQs

                      // Render FAQ items
                      return faqs.map((faq, index) => (
                        <div key={index} className="faq-item">
                          <div className="faq-question">
                            <h5>{faq.question}</h5>
                            <div className="faq-toggle">
                              <svg
                                className="faq-icon"
                                width="20"
                                height="20"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                              >
                                <line x1="12" y1="5" x2="12" y2="19"></line>
                                <line x1="5" y1="12" x2="19" y2="12"></line>
                              </svg>
                            </div>
                          </div>
                          <div className="faq-answer" id={`faq${index + 1}`}>
                            <p>{faq.answer}</p>
                          </div>
                        </div>
                      ));
                    })()}
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
      </section>

      {/* Video Testimonials */}

      {/* Product Comparison */}
      {(() => {
        // Determine which comparison table to show based on current product
        const productName = (product?.name || "").toLowerCase();

        // Hide entire comparison section for GPS tracker, Motion Sensor and Accessories products
        if (
          productName.includes("moto") ||
          productName.includes("turbo") ||
          productName.includes("motion") ||
          productName.includes("sensor") ||
          productName.includes("mercusys") ||
          productName.includes("ac12") ||
          productName.includes("mr30g")
        ) {
          return null;
        }

        return (
          <section className="comparison-section">
            <div className="comparison-container">
              <h2 className="comparison-title">Product Comparison</h2>
              {(() => {
                // Camera sensors comparison (Polo, Gem, Oval)
                if (
                  productName.includes("polo") ||
                  productName.includes("gem") ||
                  productName.includes("oval")
                ) {
                  return (
                    <>
                      <p className="comparison-subtitle">
                        A Smart Camera for every need
                      </p>
                      <div className="comparison-table-wrapper">
                        <table className="comparison-table">
                          <thead>
                            <tr className="comparison-header">
                              <th className="comparison-header-cell first">
                                PARAMETERS
                              </th>
                              <th className="comparison-header-cell">
                                <div className="product-column">
                                  <img
                                    src="/images/home/corelens-polo-product.png"
                                    alt="Polo"
                                    className="product-image-small"
                                  />
                                  <div className="product-name">POLO</div>
                                  <button
                                    className="buy-now-btn"
                                    onClick={() =>
                                      navigate(
                                        "/product-details/corelens-polo/66622b6df67cb81eb1e09ac1",
                                      )
                                    }
                                  >
                                    BUY NOW
                                  </button>
                                </div>
                              </th>
                              <th className="comparison-header-cell">
                                <div className="product-column">
                                  <img
                                    src="/images/home/corelens-gem.png"
                                    alt="Gem"
                                    className="product-image-small"
                                  />
                                  <div className="product-name">GEM</div>
                                  <button
                                    className="buy-now-btn"
                                    onClick={() =>
                                      navigate(
                                        "/product-details/corelens-gem/66622d52f67cb81eb1e09ef7",
                                      )
                                    }
                                  >
                                    BUY NOW
                                  </button>
                                </div>
                              </th>
                              <th className="comparison-header-cell">
                                <div className="product-column">
                                  <img
                                    src="/images/home/corelens-oval.png"
                                    alt="Oval"
                                    className="product-image-small"
                                  />
                                  <div className="product-name">OVAL</div>
                                  <button
                                    className="buy-now-btn"
                                    onClick={() =>
                                      navigate(
                                        "/product-details/corelens-oval/66622c84f67cb81eb1e09d25",
                                      )
                                    }
                                  >
                                    BUY NOW
                                  </button>
                                </div>
                              </th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr className="comparison-row">
                              <td className="comparison-cell first">
                                Resolution
                              </td>
                              <td className="comparison-cell">
                                4MP Full HD (2K)
                              </td>
                              <td className="comparison-cell">
                                4MP Quad HD (2K)
                              </td>
                              <td className="comparison-cell">
                                8MP Ultra HD (4K)
                              </td>
                            </tr>
                            <tr className="comparison-row">
                              <td className="comparison-cell first">
                                Night Vision Type
                              </td>
                              <td className="comparison-cell">
                                Starlight Color Night Vision
                              </td>
                              <td className="comparison-cell">
                                Starlight Color Night Vision
                              </td>
                              <td className="comparison-cell">
                                Starlight Color Night Vision
                              </td>
                            </tr>
                            <tr className="comparison-row">
                              <td className="comparison-cell first">
                                Low-Light Performance
                              </td>
                              <td className="comparison-cell">IR</td>
                              <td className="comparison-cell">
                                Enhanced low-light clarity
                              </td>
                              <td className="comparison-cell">
                                Ultra-low lux (near dark)
                              </td>
                            </tr>
                            <tr className="comparison-row">
                              <td className="comparison-cell first">
                                Weight (in grams)
                              </td>
                              <td className="comparison-cell">560g</td>
                              <td className="comparison-cell">510g</td>
                              <td className="comparison-cell">650g</td>
                            </tr>
                            <tr className="comparison-row">
                              <td className="comparison-cell first">
                                Chip Processor
                              </td>
                              <td className="comparison-cell">NT98566</td>
                              <td className="comparison-cell">XM530V200</td>
                              <td className="comparison-cell">XM530V200</td>
                            </tr>
                            <tr className="comparison-row">
                              <td className="comparison-cell first">
                                Audio Support
                              </td>
                              <td className="comparison-cell">2-way audio</td>
                              <td className="comparison-cell">2-way audio</td>
                              <td className="comparison-cell">
                                Noise-cancelled 2-way audio
                              </td>
                            </tr>
                            <tr className="comparison-row">
                              <td className="comparison-cell first">Sensor</td>
                              <td className="comparison-cell">SC8238</td>
                              <td className="comparison-cell">SC401AI</td>
                              <td className="comparison-cell">SC401AI</td>
                            </tr>
                            <tr className="comparison-row">
                              <td className="comparison-cell first">
                                Storage Options
                              </td>
                              <td className="comparison-cell">Upto 128 GB</td>
                              <td className="comparison-cell">Upto 128 GB</td>
                              <td className="comparison-cell">Upto 256 GB</td>
                            </tr>
                            <tr className="comparison-row">
                              <td className="comparison-cell first">
                                Two way audio
                              </td>
                              <td className="comparison-cell">
                                <span className="check-mark">
                                  <svg
                                    width="20"
                                    height="20"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                  >
                                    <path
                                      d="M20 6L9 17L4 12"
                                      stroke="#28a745"
                                      strokeWidth="2"
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                    />
                                  </svg>
                                </span>
                              </td>
                              <td className="comparison-cell">
                                <span className="check-mark">
                                  <svg
                                    width="20"
                                    height="20"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                  >
                                    <path
                                      d="M20 6L9 17L4 12"
                                      stroke="#28a745"
                                      strokeWidth="2"
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                    />
                                  </svg>
                                </span>
                              </td>
                              <td className="comparison-cell">
                                <span className="check-mark">
                                  <svg
                                    width="20"
                                    height="20"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                  >
                                    <path
                                      d="M20 6L9 17L4 12"
                                      stroke="#28a745"
                                      strokeWidth="2"
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                    />
                                  </svg>
                                </span>
                              </td>
                            </tr>
                            <tr className="comparison-row">
                              <td className="comparison-cell first">
                                Dynamic Range
                              </td>
                              <td className="comparison-cell">Digital WDR</td>
                              <td className="comparison-cell">True WDR</td>
                              <td className="comparison-cell">
                                HDR + Advanced WDR
                              </td>
                            </tr>
                            <tr className="comparison-row">
                              <td className="comparison-cell first">Price</td>
                              <td className="comparison-cell">
                                ₹
                                {Math.round(
                                  comparisonPrices.polo || 0,
                                ).toLocaleString("en-IN")}
                              </td>
                              <td className="comparison-cell">
                                ₹
                                {Math.round(
                                  comparisonPrices.gem || 0,
                                ).toLocaleString("en-IN")}
                              </td>
                              <td className="comparison-cell">
                                ₹
                                {Math.round(
                                  comparisonPrices.oval || 0,
                                ).toLocaleString("en-IN")}
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </>
                  );
                }

                // Camera sensors comparison (Echo, Wave)
                if (
                  productName.includes("echo") ||
                  productName.includes("wave")
                ) {
                  return (
                    <>
                      <p className="comparison-subtitle">
                        A Smart Camera for every need
                      </p>
                      <div className="comparison-table-wrapper">
                        <table className="comparison-table">
                          <thead>
                            <tr className="comparison-header">
                              <th className="comparison-header-cell first">
                                PARAMETERS
                              </th>
                              <th className="comparison-header-cell">
                                <div className="product-column">
                                  <img
                                    src="/images/home/corelens-echo.png"
                                    alt="Echo"
                                    className="product-image-small"
                                  />
                                  <div className="product-name">Echo</div>
                                  <button
                                    className="buy-now-btn"
                                    onClick={() =>
                                      navigate(
                                        "/product-details/corelens-echo/66f69ba60da3811fd4444ac2",
                                      )
                                    }
                                  >
                                    BUY NOW
                                  </button>
                                </div>
                              </th>
                              <th className="comparison-header-cell">
                                <div className="product-column">
                                  <img
                                    src="/images/home/corelens-wave.png"
                                    alt="Wave"
                                    className="product-image-small"
                                  />
                                  <div className="product-name">Wave</div>
                                  <button
                                    className="buy-now-btn"
                                    onClick={() =>
                                      navigate(
                                        "/product-details/corelens-wave/66f6a2b30da3811fd4447fec",
                                      )
                                    }
                                  >
                                    BUY NOW
                                  </button>
                                </div>
                              </th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr className="comparison-row">
                              <td className="comparison-cell first">
                                Resolution
                              </td>
                              <td className="comparison-cell">2MP Full HD</td>
                              <td className="comparison-cell">2MP</td>
                            </tr>
                            <tr className="comparison-row">
                              <td className="comparison-cell first">
                                Night Vision Type
                              </td>
                              <td className="comparison-cell">
                                Starlight Color Night Vision
                              </td>
                              <td className="comparison-cell">
                                Starlight Color Night Vision
                              </td>
                            </tr>
                            <tr className="comparison-row">
                              <td className="comparison-cell first">
                                Fixed to socket
                              </td>
                              <td className="comparison-cell">NO</td>
                              <td className="comparison-cell">YES</td>
                            </tr>
                            <tr className="comparison-row">
                              <td className="comparison-cell first">
                                Weight (in grams)
                              </td>
                              <td className="comparison-cell">284g</td>
                              <td className="comparison-cell">316g</td>
                            </tr>
                            <tr className="comparison-row">
                              <td className="comparison-cell first">
                                Chip Processor
                              </td>
                              <td className="comparison-cell">530V200</td>
                              <td className="comparison-cell">530V200</td>
                            </tr>
                            <tr className="comparison-row">
                              <td className="comparison-cell first">
                                Audio Support
                              </td>
                              <td className="comparison-cell">2-way audio</td>
                              <td className="comparison-cell">2-way audio</td>
                            </tr>
                            <tr className="comparison-row">
                              <td className="comparison-cell first">Sensor</td>
                              <td className="comparison-cell">SC2336P</td>
                              <td className="comparison-cell">SC2336P</td>
                            </tr>
                            <tr className="comparison-row">
                              <td className="comparison-cell first">
                                Storage Options
                              </td>
                              <td className="comparison-cell">Upto 128 GB</td>
                              <td className="comparison-cell">Upto 128 GB</td>
                            </tr>
                            <tr className="comparison-row">
                              <td className="comparison-cell first">
                                Two way audio
                              </td>
                              <td className="comparison-cell">
                                <span className="check-mark">
                                  <svg
                                    width="20"
                                    height="20"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                  >
                                    <path
                                      d="M20 6L9 17L4 12"
                                      stroke="#28a745"
                                      strokeWidth="2"
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                    />
                                  </svg>
                                </span>
                              </td>
                              <td className="comparison-cell">
                                <span className="check-mark">
                                  <svg
                                    width="20"
                                    height="20"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                  >
                                    <path
                                      d="M20 6L9 17L4 12"
                                      stroke="#28a745"
                                      strokeWidth="2"
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                    />
                                  </svg>
                                </span>
                              </td>
                            </tr>
                            <tr className="comparison-row">
                              <td className="comparison-cell first">
                                Low-Light Performance
                              </td>
                              <td className="comparison-cell">IR</td>
                              <td className="comparison-cell">IR</td>
                            </tr>
                            <tr className="comparison-row">
                              <td className="comparison-cell first">
                                Dynamic Range
                              </td>
                              <td className="comparison-cell">Digital WDR</td>
                              <td className="comparison-cell">Digital WDR</td>
                            </tr>
                            <tr className="comparison-row">
                              <td className="comparison-cell first">Price</td>
                              <td className="comparison-cell">
                                ₹
                                {Math.round(
                                  comparisonPrices.echo || 1560,
                                ).toLocaleString("en-IN")}
                              </td>
                              <td className="comparison-cell">
                                ₹
                                {Math.round(
                                  comparisonPrices.wave || 1560,
                                ).toLocaleString("en-IN")}
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </>
                  );
                }

                // Default door locks comparison (Ultra, Prime, Royale)
                return (
                  <>
                    <p className="comparison-subtitle">
                      A Smart lock for every home
                    </p>
                    <div className="comparison-table-wrapper">
                      <table className="comparison-table">
                        <thead>
                          <tr className="comparison-header">
                            <th className="comparison-header-cell first">
                              Features
                            </th>
                            <th className="comparison-header-cell">
                              <div className="product-column">
                                <img
                                  src="/images/home/corelens-ultra.png"
                                  alt="Ultra"
                                  className="product-image-small"
                                />
                                <div className="product-name">Ultra</div>
                                <button
                                  className="buy-now-btn"
                                  onClick={() =>
                                    navigate(
                                      "/product-details/corelens-ultra/67b6e55112039d03d5e2a547",
                                    )
                                  }
                                >
                                  Buy Now
                                </button>
                              </div>
                            </th>
                            <th className="comparison-header-cell">
                              <div className="product-column">
                                <img
                                  src="/images/home/smart-door-lock-prime.png"
                                  alt="Select"
                                  className="product-image-small"
                                />
                                <div className="product-name">Prime</div>
                                <button
                                  className="buy-now-btn"
                                  onClick={() =>
                                    navigate(
                                      "/product-details/corelens-prime/67b6f14412039d03d5e2c3ab",
                                    )
                                  }
                                >
                                  Buy Now
                                </button>
                              </div>
                            </th>
                            <th className="comparison-header-cell">
                              <div className="product-column">
                                <img
                                  src="/images/home/smart-door-lock-royale.png"
                                  alt="Select"
                                  className="product-image-small"
                                />
                                <div className="product-name">Royale</div>
                                <button
                                  className="buy-now-btn"
                                  onClick={() =>
                                    navigate(
                                      "/product-details/corelens-royale/67bf0210f2520508916b5a6c",
                                    )
                                  }
                                >
                                  Buy Now
                                </button>
                              </div>
                            </th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr className="comparison-row">
                            <td className="comparison-cell first">
                              Size in inches with handle (H x L x W)
                            </td>
                            <td className="comparison-cell">
                              13.5 x 6.2 x 1.1
                            </td>
                            <td className="comparison-cell">
                              13.5 x 6.9 x 1.1
                            </td>
                            <td className="comparison-cell">
                              13.4 x 6.9 x 0.9
                            </td>
                          </tr>
                          <tr className="comparison-row">
                            <td className="comparison-cell first">
                              Min. Wooden Door Thickness
                            </td>
                            <td className="comparison-cell">3.4 cm</td>
                            <td className="comparison-cell">3.1 cm</td>
                            <td className="comparison-cell">3.1 cm</td>
                          </tr>
                          <tr className="comparison-row">
                            <td className="comparison-cell first">Material</td>
                            <td className="comparison-cell">Aluminium alloy</td>
                            <td className="comparison-cell">Aluminium alloy</td>
                            <td className="comparison-cell">Steel alloy</td>
                          </tr>
                          <tr className="comparison-row">
                            <td className="comparison-cell first">
                              No. of Bolts
                            </td>
                            <td className="comparison-cell">5</td>
                            <td className="comparison-cell">5</td>
                            <td className="comparison-cell">5</td>
                          </tr>
                          <tr className="comparison-row">
                            <td className="comparison-cell first">
                              App Connectivity
                            </td>
                            <td className="comparison-cell">
                              <span className="check-mark">
                                <svg
                                  width="20"
                                  height="20"
                                  viewBox="0 0 24 24"
                                  fill="none"
                                  xmlns="http://www.w3.org/2000/svg"
                                >
                                  <path
                                    d="M20 6L9 17L4 12"
                                    stroke="#28a745"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                  />
                                </svg>
                              </span>
                            </td>
                            <td className="comparison-cell">
                              <span className="check-mark">
                                <svg
                                  width="20"
                                  height="20"
                                  viewBox="0 0 24 24"
                                  fill="none"
                                  xmlns="http://www.w3.org/2000/svg"
                                >
                                  <path
                                    d="M20 6L9 17L4 12"
                                    stroke="#28a745"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                  />
                                </svg>
                              </span>
                            </td>
                            <td className="comparison-cell">
                              <span className="check-mark">
                                <svg
                                  width="20"
                                  height="20"
                                  viewBox="0 0 24 24"
                                  fill="none"
                                  xmlns="http://www.w3.org/2000/svg"
                                >
                                  <path
                                    d="M20 6L9 17L4 12"
                                    stroke="#28a745"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                  />
                                </svg>
                              </span>
                            </td>
                          </tr>
                          <tr className="comparison-row">
                            <td className="comparison-cell first">
                              Privacy lock
                            </td>
                            <td className="comparison-cell">
                              <span className="check-mark">
                                <svg
                                  width="20"
                                  height="20"
                                  viewBox="0 0 24 24"
                                  fill="none"
                                  xmlns="http://www.w3.org/2000/svg"
                                >
                                  <path
                                    d="M20 6L9 17L4 12"
                                    stroke="#28a745"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                  />
                                </svg>
                              </span>
                            </td>
                            <td className="comparison-cell">
                              <span className="check-mark">
                                <svg
                                  width="20"
                                  height="20"
                                  viewBox="0 0 24 24"
                                  fill="none"
                                  xmlns="http://www.w3.org/2000/svg"
                                >
                                  <path
                                    d="M20 6L9 17L4 12"
                                    stroke="#28a745"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                  />
                                </svg>
                              </span>
                            </td>
                            <td className="comparison-cell">
                              <span className="check-mark">
                                <svg
                                  width="20"
                                  height="20"
                                  viewBox="0 0 24 24"
                                  fill="none"
                                  xmlns="http://www.w3.org/2000/svg"
                                >
                                  <path
                                    d="M20 6L9 17L4 12"
                                    stroke="#28a745"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                  />
                                </svg>
                              </span>
                            </td>
                          </tr>
                          <tr className="comparison-row">
                            <td className="comparison-cell first">
                              LCD Display
                            </td>
                            <td className="comparison-cell">
                              <span className="check-mark">
                                <svg
                                  width="20"
                                  height="20"
                                  viewBox="0 0 24 24"
                                  fill="none"
                                  xmlns="http://www.w3.org/2000/svg"
                                >
                                  <path
                                    d="M20 6L9 17L4 12"
                                    stroke="#28a745"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                  />
                                </svg>
                              </span>
                            </td>
                            <td className="comparison-cell">
                              <span className="check-mark">
                                <svg
                                  width="20"
                                  height="20"
                                  viewBox="0 0 24 24"
                                  fill="none"
                                  xmlns="http://www.w3.org/2000/svg"
                                >
                                  <path
                                    d="M20 6L9 17L4 12"
                                    stroke="#28a745"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                  />
                                </svg>
                              </span>
                            </td>
                            <td className="comparison-cell">
                              <span className="cross-mark">
                                <svg
                                  width="20"
                                  height="20"
                                  viewBox="0 0 24 24"
                                  fill="none"
                                  xmlns="http://www.w3.org/2000/svg"
                                >
                                  <path
                                    d="M18 6L6 18M6 6L18 18"
                                    stroke="#dc3545"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                  />
                                </svg>
                              </span>
                            </td>
                          </tr>
                          <tr className="comparison-row">
                            <td className="comparison-cell first">
                              Child Lock
                            </td>
                            <td className="comparison-cell">
                              <span className="check-mark">
                                <svg
                                  width="20"
                                  height="20"
                                  viewBox="0 0 24 24"
                                  fill="none"
                                  xmlns="http://www.w3.org/2000/svg"
                                >
                                  <path
                                    d="M20 6L9 17L4 12"
                                    stroke="#28a745"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                  />
                                </svg>
                              </span>
                            </td>
                            <td className="comparison-cell">
                              <span className="cross-mark">
                                <svg
                                  width="20"
                                  height="20"
                                  viewBox="0 0 24 24"
                                  fill="none"
                                  xmlns="http://www.w3.org/2000/svg"
                                >
                                  <path
                                    d="M18 6L6 18M6 6L18 18"
                                    stroke="#dc3545"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                  />
                                </svg>
                              </span>
                            </td>
                            <td className="comparison-cell">
                              <span className="cross-mark">
                                <svg
                                  width="20"
                                  height="20"
                                  viewBox="0 0 24 24"
                                  fill="none"
                                  xmlns="http://www.w3.org/2000/svg"
                                >
                                  <path
                                    d="M18 6L6 18M6 6L18 18"
                                    stroke="#dc3545"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                  />
                                </svg>
                              </span>
                            </td>
                          </tr>
                          <tr className="comparison-row">
                            <td className="comparison-cell first">
                              App Connectivity
                            </td>
                            <td className="comparison-cell">
                              <span className="check-mark">
                                <svg
                                  width="20"
                                  height="20"
                                  viewBox="0 0 24 24"
                                  fill="none"
                                  xmlns="http://www.w3.org/2000/svg"
                                >
                                  <path
                                    d="M20 6L9 17L4 12"
                                    stroke="#28a745"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                  />
                                </svg>
                              </span>
                            </td>
                            <td className="comparison-cell">
                              <span className="check-mark">
                                <svg
                                  width="20"
                                  height="20"
                                  viewBox="0 0 24 24"
                                  fill="none"
                                  xmlns="http://www.w3.org/2000/svg"
                                >
                                  <path
                                    d="M20 6L9 17L4 12"
                                    stroke="#28a745"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                  />
                                </svg>
                              </span>
                            </td>
                            <td className="comparison-cell">
                              <span className="check-mark">
                                <svg
                                  width="20"
                                  height="20"
                                  viewBox="0 0 24 24"
                                  fill="none"
                                  xmlns="http://www.w3.org/2000/svg"
                                >
                                  <path
                                    d="M20 6L9 17L4 12"
                                    stroke="#28a745"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                  />
                                </svg>
                              </span>
                            </td>
                          </tr>
                          <tr className="comparison-row">
                            <td className="comparison-cell first">Price</td>
                            <td className="comparison-cell">
                              ₹
                              {Math.round(
                                comparisonPrices.ultra || 8820,
                              ).toLocaleString("en-IN")}
                            </td>
                            <td className="comparison-cell">
                              ₹
                              {Math.round(
                                comparisonPrices.prime || 7995,
                              ).toLocaleString("en-IN")}
                            </td>
                            <td className="comparison-cell">
                              ₹
                              {Math.round(
                                comparisonPrices.royale || 10080,
                              ).toLocaleString("en-IN")}
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </>
                );
              })()}
            </div>
          </section>
        );
      })()}

      {/* Video Popup Modal */}
      <div className="video-popup-overlay" id="videoPopup">
        <div className="video-popup-modal">
          <div className="video-popup-header">
            <h3>Product Demo Video</h3>
            <button className="video-popup-close" id="closeVideoPopup">
              &times;
            </button>
          </div>
          <div className="video-popup-content" id="videoContent">
            {/* Video iframe will be inserted here */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
