
/**
 * Normalize API response to consistent field names
 * @param {Object} product - Raw product object from API
 * @returns {Object} - Normalized product with consistent field names
 */
export const normalizeProduct = (product) => {
  if (!product) return null;

  console.log('🔄 Normalizing product:', product.name);
  console.log('🔄 Raw API fields:', {
    selling_price: product.selling_price,
    sellingPrice: product.sellingPrice,
    mrp: product.mrp,
    MRP: product.MRP,
    display_percentage: product.display_percentage,
    displayPercentage: product.displayPercentage
  });

  // Normalize to consistent field names
  const normalized = {
    ...product,
    // Normalize selling price
    selling_price: product.selling_price || product.sellingPrice || product.net_price || product.price || 0,
    // Normalize MRP
    mrp: product.mrp || product.MRP || product.mrp_price || product.originalPrice || 0,
    // Normalize discount percentage
    display_percentage: product.display_percentage || product.displayPercentage || product.discount_percentage || product.discount || 0
  };

  console.log('✅ Normalized fields:', {
    selling_price: normalized.selling_price,
    mrp: normalized.mrp,
    display_percentage: normalized.display_percentage
  });

  return normalized;
};

/**
 * Calculates prices and discount from product API data
 * @param {Object} product - Product object from API
 * @returns {Object} - { currentPrice, originalPrice, discount }
 */
export const calculatePrices = (product) => {
  if (!product) {
    return { currentPrice: 0, originalPrice: 0, discount: 0 };
  }

  console.log('🔍 calculatePrices - Raw product data:', product);

  // Use correct API fields based on actual API response structure
  const currentPrice = product.net_price || product.selling_price || product.sellingPrice || product.price || 0;
  const originalPrice = product.price || product.mrp || product.MRP || product.originalPrice || currentPrice || 0;
  const discount = product.display_percentage || product.displayPercentage || product.discount_percentage || product.discount || 0;

  // Calculate discount if not provided but we have both prices
  let calculatedDiscount = discount;
  if (!calculatedDiscount && originalPrice > currentPrice && currentPrice > 0) {
    calculatedDiscount = Math.round(((originalPrice - currentPrice) / originalPrice) * 100);
  }

  console.log('💰 Direct API extracted prices (raw fields):', {
    currentPrice: currentPrice,
    originalPrice: originalPrice,
    discount: discount,
    rawFields: {
      selling_price: product.selling_price,
      sellingPrice: product.sellingPrice,
      mrp: product.mrp,
      MRP: product.MRP,
      display_percentage: product.display_percentage,
      displayPercentage: product.displayPercentage
    }
  });

  return {
    currentPrice: currentPrice,
    originalPrice: originalPrice,
    discount: calculatedDiscount,
    display_percentage: calculatedDiscount
  };
};
