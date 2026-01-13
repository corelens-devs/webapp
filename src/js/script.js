// Video Popup Functionality
document.addEventListener("DOMContentLoaded", function() {
  const videoPopup = document.getElementById("videoPopup");
  const closeVideoPopup = document.getElementById("closeVideoPopup");
  const videoContent = document.getElementById("videoContent");
  const playButtons = document.querySelectorAll(".play-button");
  const videoUrl = "https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1&rel=0";

  // Make openVideoPopup function globally accessible
  window.openVideoPopup = function() {
    if (videoContent && videoPopup) {
      videoContent.innerHTML = `
        <iframe 
          src="${videoUrl}" 
          title="Video Player" 
          frameborder="0" 
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
          allowfullscreen>
        </iframe>
      `;
      videoPopup.classList.add("active");
      document.body.style.overflow = "hidden";
    }
  };

  function closeVideoPopupFunc() {
    if (videoPopup && videoContent) {
      videoPopup.classList.remove("active");
      videoContent.innerHTML = "";
      document.body.style.overflow = "auto";
    }
  }

  playButtons.forEach((button) => {
    button.addEventListener("click", function(e) {
      e.preventDefault();
      window.openVideoPopup();
    });
  });

  if (closeVideoPopup) {
    closeVideoPopup.addEventListener("click", closeVideoPopupFunc);
  }

  if (videoPopup) {
    videoPopup.addEventListener("click", function(e) {
      if (e.target === videoPopup) {
        closeVideoPopupFunc();
      }
    });
  }

  document.addEventListener("keydown", function(e) {
    if (
      e.key === "Escape" &&
      videoPopup &&
      videoPopup.classList.contains("active")
    ) {
      closeVideoPopupFunc();
    }
  });

  // Demo form validation and submission
  const demoForm = document.querySelector(".demo-form");
  if (demoForm) {
    demoForm.addEventListener("submit", function(e) {
      e.preventDefault();
      const formData = new FormData(this);
      const name = formData.get("name");
      const mobile = formData.get("mobile");
      const email = formData.get("email");
      const productType = formData.get("product-type");
      const modelName = formData.get("model-name");
      const address = formData.get("address");
      const pincode = formData.get("pincode");

      let isValid = true;
      let errors = [];

      if (!name || name.trim().length < 2) {
        errors.push("Please enter a valid name");
        isValid = false;
      }

      if (!mobile || !/^[6-9]\d{9}$/.test(mobile)) {
        errors.push("Please enter a valid 10-digit mobile number");
        isValid = false;
      }

      if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        errors.push("Please enter a valid email address");
        isValid = false;
      }

      if (!productType || productType.trim().length < 2) {
        errors.push("Please enter a product type");
        isValid = false;
      }

      if (!modelName) {
        errors.push("Please select a model");
        isValid = false;
      }

      if (!address || address.trim().length < 5) {
        errors.push("Please enter a valid address");
        isValid = false;
      }

      if (!pincode || !/^\d{6}$/.test(pincode)) {
        errors.push("Please enter a valid 6-digit pincode");
        isValid = false;
      }

      if (isValid) {
        showMessage(
          "Demo booking request submitted successfully! We will contact you soon.",
          "success"
        );
        this.reset();
      } else {
        showMessage(errors.join("\n"), "error");
      }
    });

    const mobileInput = document.getElementById("demo-mobile");
    if (mobileInput) {
      mobileInput.addEventListener("input", function() {
        this.value = this.value.replace(/\D/g, "").substring(0, 10);
      });
    }

    const pincodeInput = document.getElementById("demo-pincode");
    if (pincodeInput) {
      pincodeInput.addEventListener("input", function() {
        this.value = this.value.replace(/\D/g, "").substring(0, 6);
      });
    }
  }

  function showMessage(message, type) {
    const messageEl = document.createElement("div");
    messageEl.className = `demo-message demo-message--${type}`;
    messageEl.style.cssText = `
      position: fixed;
      top: 2rem;
      right: 2rem;
      background: ${type === "success" ? "#10B981" : "#EF4444"};
      color: white;
      padding: 1.5rem 2rem;
      border-radius: 0.5rem;
      box-shadow: 0 10px 25px rgba(0,0,0,0.1);
      z-index: 1000;
      max-width: 40rem;
      font-size: 1.4rem;
      white-space: pre-line;
    `;
    messageEl.textContent = message;
    document.body.appendChild(messageEl);
    setTimeout(() => {
      if (messageEl.parentNode) {
        messageEl.parentNode.removeChild(messageEl);
      }
    }, 5000);
  }

  // Pincode delivery check functionality
  const pincodeInput = document.querySelector(".pincode-input");
  const pincodeBtn = document.querySelector(".pincode-btn");
  const deliveryInfo = document.querySelector(".delivery-info");

  if (pincodeInput && pincodeBtn && deliveryInfo) {
    pincodeBtn.addEventListener("click", function() {
      const pincode = pincodeInput.value.trim();

      if (pincode.length === 6 && /^\d{6}$/.test(pincode)) {
        let deliveryDays;
        if (pincode.startsWith("1100")) {
          deliveryDays = 2;
        } else {
          deliveryDays = 5;
        }

        deliveryInfo.innerHTML = `Delivery by: <span>${deliveryDays} days</span>`;
        deliveryInfo.style.display = "block";
      } else {
        alert("Please enter a valid 6-digit pincode");
      }
    });

    // Also check on Enter key press
    pincodeInput.addEventListener("keypress", function(e) {
      if (e.key === "Enter") {
        pincodeBtn.click();
      }
    });

    // Only allow numbers in pincode input
    pincodeInput.addEventListener("input", function() {
      this.value = this.value.replace(/\D/g, "").substring(0, 6);
    });
  }
});

// Notification Functionality
document.addEventListener("DOMContentLoaded", function() {
  const notificationToggle = document.getElementById("notificationToggle");
  const notificationOverlay = document.getElementById("notificationOverlay");
  const notificationClose = document.getElementById("notificationClose");
  const markAllReadBtn = document.querySelector(".mark-all-read-btn");

  if (notificationToggle && notificationOverlay && notificationClose) {
    // Open notification modal
    notificationToggle.addEventListener("click", function(e) {
      e.preventDefault();
      notificationOverlay.classList.add("active");
      document.body.style.overflow = "hidden";
    });

    // Close notification modal
    notificationClose.addEventListener("click", function() {
      notificationOverlay.classList.remove("active");
      document.body.style.overflow = "auto";
    });

    // Close notification when clicking overlay
    notificationOverlay.addEventListener("click", function(e) {
      if (e.target === notificationOverlay) {
        notificationOverlay.classList.remove("active");
        document.body.style.overflow = "auto";
      }
    });

    // Close notification with escape key
    document.addEventListener("keydown", function(e) {
      if (
        e.key === "Escape" &&
        notificationOverlay.classList.contains("active")
      ) {
        notificationOverlay.classList.remove("active");
        document.body.style.overflow = "auto";
      }
    });

    // Mark all as read functionality
    if (markAllReadBtn) {
      markAllReadBtn.addEventListener("click", function() {
        const unreadItems = document.querySelectorAll(
          ".notification-item.unread"
        );
        unreadItems.forEach((item) => {
          item.classList.remove("unread");
        });

        // Update notification count
        const notificationCount = document.querySelector(".notification-count");
        if (notificationCount) {
          notificationCount.textContent = "0";
          notificationCount.style.display = "none";
        }

        // Show success message
        showNotificationMessage("All notifications marked as read!", "success");
      });
    }
  }

  function showNotificationMessage(message, type) {
    const messageEl = document.createElement("div");
    messageEl.className = `notification-toast notification-toast--${type}`;
    messageEl.style.cssText = `
      position: fixed;
      top: 2rem;
      right: 2rem;
      background: ${type === "success" ? "#10B981" : "#EF4444"};
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
    messageEl.textContent = message;
    document.body.appendChild(messageEl);

    setTimeout(() => {
      messageEl.style.animation = "slideOutRight 0.3s ease";
      setTimeout(() => {
        if (messageEl.parentNode) {
          messageEl.parentNode.removeChild(messageEl);
        }
      }, 300);
    }, 3000);
  }
});

// Product Details Functionality
document.addEventListener("DOMContentLoaded", function() {
  // Product Image Thumbnails with click functionality
  const thumbnails = document.querySelectorAll(".product-thumbnail");
  const mainImageContainer = document.querySelector(".product-main-image");

  if (thumbnails.length > 0 && mainImageContainer) {
    // Set first thumbnail as active
    const firstThumbnail = thumbnails[0];
    if (firstThumbnail) {
      firstThumbnail.classList.add("active");
    }

    // Add click functionality to thumbnails
    thumbnails.forEach((thumbnail, index) => {
      thumbnail.addEventListener("click", function() {
        // Remove active class from all thumbnails
        thumbnails.forEach((thumb) => thumb.classList.remove("active"));

        // Add active class to clicked thumbnail
        this.classList.add("active");

        // Get the image source from the clicked thumbnail
        const thumbnailImg = this.querySelector("img");
        if (thumbnailImg) {
          // Check if this is a video thumbnail
          if (
            this.classList.contains("video-thumbnail") ||
            this.dataset.type === "video"
          ) {
            // Replace main image with video iframe
            mainImageContainer.innerHTML = `
              <iframe 
                src="https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1&rel=0" 
                title="Product Demo Video" 
                frameborder="0" 
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                allowfullscreen
                style="width: 100%; height: 100%; min-height: 50rem; border-radius: 1rem;">
              </iframe>
            `;
          } else {
            // Restore image container and change main image for regular image thumbnails
            mainImageContainer.innerHTML = `
              <img id="main-image" src="${thumbnailImg.src}" alt="${thumbnailImg.alt}" style="max-width: 100%; max-height: 35rem; object-fit: contain; transition: opacity 0.3s ease;" />
            `;

            // Update the main image reference and add smooth transition
            const newMainImage = document.getElementById("main-image");
            if (newMainImage) {
              newMainImage.style.opacity = "0";
              setTimeout(() => {
                newMainImage.style.opacity = "1";
              }, 100);
            }
          }
        }
      });
    });
  }

  // Enhanced Add to Cart Functionality with Cart Modal Opening
  const addToCartBtn = document.querySelector(".add-to-cart-btn");
  if (addToCartBtn) {
    addToCartBtn.addEventListener("click", function() {
      // Get product details from the page
      const productTitle = document.querySelector(".product-hero-title")?.textContent || "Corelens Product";
      const productPrice = document.querySelector(".mrp-price")?.textContent || "₹19,990.00";
      const productImage = document.querySelector("#main-image")?.src || "images/home/corelens-polo.png";
      const quantity = document.querySelector("#quantity")?.value || "1";

      // Button animation
      this.style.transform = "scale(0.95)";
      //const originalText = this.innerHTML;
      //this.innerHTML = "Adding...";

      setTimeout(() => {
        this.style.transform = "scale(1.05)";
        //this.innerHTML = "Added!";
        this.style.background = "linear-gradient(135deg, #27ae60, #2ecc71)";

        // Add product to cart
        addProductToCart(productTitle, productPrice, productImage, quantity);

        // Open cart modal
        const cartOverlay = document.getElementById("cartOverlay");
        if (cartOverlay) {
          cartOverlay.classList.add("active");
          document.body.style.overflow = "hidden";
        }

        setTimeout(() => {
          this.style.transform = "scale(1)";
          //this.innerHTML = originalText;
          this.style.background = "";
        }, 2000);
      }, 500);
    });
  }

  // Function to add product to cart
  function addProductToCart(name, price, image, quantity) {
    const cartItemsContainer = document.querySelector(".cart-items");
    if (!cartItemsContainer) return;

    // Create new cart item HTML
    const newCartItem = document.createElement("div");
    newCartItem.className = "cart-item";
    newCartItem.innerHTML = `
      <div class="item-image">
        <img src="${image}" alt="${name}" />
      </div>
      <div class="item-details">
        <h4>${name}</h4>
        <div class="item-price">
          <span class="quantity">${quantity}x</span>
          <span class="price">${price}</span>
        </div>
      </div>
      <button class="remove-item">&times;</button>
    `;

    // Insert the new item at the beginning of cart items
    cartItemsContainer.insertBefore(newCartItem, cartItemsContainer.firstChild);

    // Update cart count and total
    updateCartCount();
    updateCartTotal();

    // Add remove functionality to the new item
    const removeBtn = newCartItem.querySelector(".remove-item");
    if (removeBtn) {
      removeBtn.addEventListener("click", function() {
        removeCartItem(newCartItem);
      });
    }
  }

  // Enhanced Order Through Call Functionality
  const orderBtn = document.querySelector(".order-btn");
  if (orderBtn) {
    orderBtn.addEventListener("click", function() {
      this.style.transform = "scale(0.98)";
      setTimeout(() => {
        this.style.transform = "scale(1.02)";
        window.location.href = "tel:1800-313-4207";
      }, 100);
    });
  }

  // Cart Modal Functionality
  const cartToggle = document.getElementById("cartToggle");
  const cartOverlay = document.getElementById("cartOverlay");
  const cartClose = document.getElementById("cartClose");
  const removeItemBtns = document.querySelectorAll(".remove-item");

  if (cartToggle && cartOverlay && cartClose) {
    // Open cart modal
    cartToggle.addEventListener("click", function(e) {
      e.preventDefault();
      cartOverlay.classList.add("active");
      document.body.style.overflow = "hidden";
    });

    // Close cart modal
    cartClose.addEventListener("click", function() {
      cartOverlay.classList.remove("active");
      document.body.style.overflow = "auto";
    });

    // Close cart when clicking overlay
    cartOverlay.addEventListener("click", function(e) {
      if (e.target === cartOverlay) {
        cartOverlay.classList.remove("active");
        document.body.style.overflow = "auto";
      }
    });

    // Close cart with escape key
    document.addEventListener("keydown", function(e) {
      if (e.key === "Escape" && cartOverlay.classList.contains("active")) {
        cartOverlay.classList.remove("active");
        document.body.style.overflow = "auto";
      }
    });

    // Checkout button functionality
    const checkoutBtn = document.querySelector(".checkout-btn");
    if (checkoutBtn) {
      checkoutBtn.addEventListener("click", function() {
        // Close cart modal first
        cartOverlay.classList.remove("active");
        document.body.style.overflow = "auto";

        // Redirect to view-cart page
        window.location.href = "view-cart.html";
      });
    }
  }

  // Remove item functionality for cart modal
  document.addEventListener("click", function(e) {
    if (e.target.classList.contains("remove-item")) {
      const cartItem = e.target.closest(".cart-item");
      if (cartItem) {
        removeCartItem(cartItem);
      }
    }
  });

  // Function to remove cart item with animation
  function removeCartItem(cartItem) {
    cartItem.style.transform = "translateX(100%)";
    cartItem.style.opacity = "0";
    cartItem.style.transition = "all 0.3s ease";

    setTimeout(() => {
      cartItem.remove();
      updateCartCount();
      updateCartTotal();
    }, 300);
  }

  // Function to update cart count
  function updateCartCount() {
    const cartItems = document.querySelectorAll(".cart-items .cart-item");
    const cartCount = document.querySelector(".cart-count");
    if (cartCount) {
      cartCount.textContent = cartItems.length;
    }
  }

  // Function to update cart total
  function updateCartTotal() {
    const cartItems = document.querySelectorAll(".cart-items .cart-item");
    let total = 0;

    cartItems.forEach((item) => {
      const priceText = item.querySelector(".price").textContent;
      const quantityText = item.querySelector(".quantity").textContent;

      // Extract price (remove ₹ and commas)
      const price = parseInt(priceText.replace(/[₹,]/g, ""));
      // Extract quantity (remove 'x' from text like "1x" or "2x")
      const quantity = parseInt(quantityText.replace('x', '')) || 1;

      total += (price * quantity);
    });

    const subtotalAmount = document.querySelector(".subtotal-amount");
    const subtotalLabel = document.querySelector(".subtotal-label");

    if (subtotalAmount && subtotalLabel) {
      subtotalAmount.textContent = `₹${total.toLocaleString()}`;
      subtotalLabel.textContent = `Subtotal (${cartItems.length} item${cartItems.length !== 1 ? "s" : ""})`;
    }
  }

  // Initialize remove functionality for existing cart items
  document.addEventListener("DOMContentLoaded", function() {
    const existingRemoveBtns = document.querySelectorAll(".cart-items .remove-item");
    existingRemoveBtns.forEach(btn => {
      btn.addEventListener("click", function() {
        const cartItem = this.closest(".cart-item");
        if (cartItem) {
          removeCartItem(cartItem);
        }
      });
    });

    // Initialize remove functionality for cart-item-summary
    const summaryRemoveBtns = document.querySelectorAll(".remove-item-summary");
    summaryRemoveBtns.forEach(btn => {
      btn.addEventListener("click", function() {
        const cartItemSummary = this.closest(".cart-item-summary");
        if (cartItemSummary) {
          removeCartItemSummary(cartItemSummary);
        }
      });
    });
  });

  // Function to remove cart-item-summary with animation
  function removeCartItemSummary(cartItemSummary) {
    // Get item name for success message
    const itemName = cartItemSummary.querySelector('.item-details h4').textContent;

    // Remove without confirmation
    cartItemSummary.style.transform = "translateX(100%)";
    cartItemSummary.style.opacity = "0";
    cartItemSummary.style.transition = "all 0.3s ease";

    setTimeout(() => {
      cartItemSummary.remove();
      updateCartSummaryTotals();

      // Show success message
      showRemoveMessage(`"${itemName}" has been removed from your cart.`);
    }, 300);
  }

  // Function to show remove confirmation message
  function showRemoveMessage(message) {
    const messageEl = document.createElement("div");
    messageEl.className = "remove-success-message";
    messageEl.style.cssText = `
      position: fixed;
      top: 2rem;
      right: 2rem;
      background: #28a745;
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
    messageEl.textContent = message;
    document.body.appendChild(messageEl);

    setTimeout(() => {
      messageEl.style.animation = "slideOutRight 0.3s ease";
      setTimeout(() => {
        if (messageEl.parentNode) {
          messageEl.parentNode.removeChild(messageEl);
        }
      }, 300);
    }, 3000);
  }

  // Function to update cart summary totals after item removal
  function updateCartSummaryTotals() {
    const remainingItems = document.querySelectorAll(".cart-item-summary");
    let newSubtotal = 0;

    remainingItems.forEach(item => {
      const priceText = item.querySelector(".item-price").textContent;
      const price = parseFloat(priceText.replace(/[^0-9.]/g, ""));
      const quantity = parseInt(item.querySelector(".item-quantity").textContent) || 1;
      newSubtotal += (price * quantity);
    });

    // Update subtotal
    const subtotalElement = document.querySelector(".order-summary .summary-row:first-child span:last-child");
    if (subtotalElement) {
      subtotalElement.textContent = `$${newSubtotal.toFixed(2)}`;
    }

    // Update total (assuming same tax and no discount for simplicity)
    const tax = 5.00; // Fixed tax from the design
    const newTotal = newSubtotal + tax;

    const totalElement = document.querySelector(".summary-total span:last-child");
    if (totalElement) {
      totalElement.textContent = `$${newTotal.toFixed(2)}`;
    }
  }

  // Quantity controls functionality
  document.addEventListener("click", function(e) {
    if (e.target.classList.contains("qty-btn")) {
      const qtyInput = e.target.parentNode.querySelector(".qty-input");
      const isPlus = e.target.classList.contains("plus");
      const isMinus = e.target.classList.contains("minus");

      let currentQty = parseInt(qtyInput.value);

      if (isPlus) {
        qtyInput.value = currentQty + 1;
      } else if (isMinus && currentQty > 1) {
        qtyInput.value = currentQty - 1;
      }

      updateItemTotal(e.target.closest(".cart-item"));
      updateCartTotal();
    }
  });

  // Update individual item total
  function updateItemTotal(cartItem) {
    const qtyInput = cartItem.querySelector(".qty-input");
    const currentPrice = cartItem.querySelector(".current-price");
    const totalPrice = cartItem.querySelector(".total-price");

    if (qtyInput && currentPrice && totalPrice) {
      const qty = parseInt(qtyInput.value);
      const price = parseInt(
        currentPrice.textContent.replace("₹", "").replace(",", "")
      );
      const total = qty * price;

      totalPrice.textContent = `₹${total.toLocaleString()}`;
    }
  }

  // Save for later functionality
  document.addEventListener("click", function(e) {
    if (e.target.classList.contains("save-later-btn")) {
      e.target.style.background = "#27ae60";
      e.target.style.color = "white";
      e.target.textContent = "Saved!";

      setTimeout(() => {
        e.target.style.background = "";
        e.target.style.color = "";
        e.target.textContent = "Save for Later";
      }, 2000);
    }
  });

  // Buy now functionality
  document.addEventListener("click", function(e) {
    if (e.target.classList.contains("buy-now-btn")) {
      const productName = e.target
        .closest(".cart-item")
        .querySelector("h3").textContent;
      alert(`Proceeding to buy ${productName} now!`);
    }
  });

  // Global functions for cart updates (avoiding duplicates)
  window.updateCartCount = function() {
    const cartItems = document.querySelectorAll(".cart-items .cart-item");
    const cartCount = document.querySelector(".cart-count");
    if (cartCount) {
      cartCount.textContent = cartItems.length;
    }
  }

  window.updateCartTotal = function() {
    const cartItems = document.querySelectorAll(".cart-items .cart-item");
    let total = 0;
    cartItems.forEach((item) => {
      const priceText = item.querySelector(".price").textContent;
      const quantityText = item.querySelector(".quantity").textContent;

      // Extract price (remove ₹ and commas)
      const price = parseInt(priceText.replace(/[₹,]/g, ""));
      // Extract quantity (remove 'x' from text like "1x" or "2x")
      const quantity = parseInt(quantityText.replace('x', '')) || 1;

      total += (price * quantity);
    });

    const subtotalAmount = document.querySelector(".subtotal-amount");
    const subtotalLabel = document.querySelector(".subtotal-label");
    if (subtotalAmount && subtotalLabel) {
      subtotalAmount.textContent = `₹${total.toLocaleString()}`;
      subtotalLabel.textContent = `Subtotal (${cartItems.length} item${cartItems.length !== 1 ? "s" : ""
        })`;
    }
  }
});

// Product listing controls if page exists
if (
  window.location.pathname.includes("product") &&
  document.querySelector(".products-grid")
) {
  initializeProductListing();
}

// Cart functionality
document.addEventListener("DOMContentLoaded", function() {
  // Cart page functionality
  if (window.location.pathname.includes("view-cart")) {
    initializeCartFunctionality();
  }
});

function initializeCartFunctionality() {
  // Quantity controls
  document.querySelectorAll(".quantity-controls").forEach((control) => {
    const minusBtn = control.querySelector(".minus");
    const plusBtn = control.querySelector(".plus");
    const input = control.querySelector(".qty-input");
    const cartItem = control.closest(".cart-item");

    minusBtn.addEventListener("click", () => {
      const currentValue = parseInt(input.value);
      if (currentValue > 1) {
        input.value = currentValue - 1;
        updateItemTotal(cartItem);
      }
    });

    plusBtn.addEventListener("click", () => {
      const currentValue = parseInt(input.value);
      input.value = currentValue + 1;
      updateItemTotal(cartItem);
    });

    input.addEventListener("change", () => {
      const value = parseInt(input.value);
      if (value < 1 || isNaN(value)) {
        input.value = 1;
      }
      updateItemTotal(cartItem);
    });
  });

  // Remove item functionality
  document.querySelectorAll(".remove-btn").forEach((btn) => {
    btn.addEventListener("click", () => {
      const cartItem = btn.closest(".cart-item");
      if (confirm("Are you sure you want to remove this item from cart?")) {
        cartItem.style.animation = "slideOutRight 0.3s ease-out";
        setTimeout(() => {
          cartItem.remove();
          updateCartSummary();
          updateItemsCount();
        }, 300);
      }
    });
  });

  // Clear cart functionality
  const clearCartBtn = document.querySelector(".clear-cart-btn");
  if (clearCartBtn) {
    clearCartBtn.addEventListener("click", () => {
      if (confirm("Are you sure you want to clear all items from cart?")) {
        document.querySelectorAll(".cart-item").forEach((item) => {
          item.style.animation = "fadeOut 0.3s ease-out";
          setTimeout(() => item.remove(), 300);
        });
        setTimeout(() => {
          updateCartSummary();
          updateItemsCount();
        }, 300);
      }
    });
  }

  // Save for later functionality
  document.querySelectorAll(".save-later-btn").forEach((btn) => {
    btn.addEventListener("click", () => {
      alert("Item saved for later!");
    });
  });

  // Buy now functionality
  document.querySelectorAll(".buy-now-btn").forEach((btn) => {
    btn.addEventListener("click", () => {
      alert("Redirecting to checkout...");
    });
  });

  // Promo code functionality
  const promoBtn = document.querySelector(".apply-promo-btn");
  if (promoBtn) {
    promoBtn.addEventListener("click", () => {
      const promoInput = document.querySelector(".promo-input");
      const promoCode = promoInput.value.trim().toUpperCase();

      if (promoCode) {
        if (promoCode === "SAVE20" || promoCode === "WELCOME10") {
          alert("Promo code applied successfully!");
          updateCartSummary();
        } else {
          alert("Invalid promo code. Please try again.");
        }
        promoInput.value = "";
      }
    });
  }
}

function updateItemTotal(cartItem) {
  const quantity = parseInt(cartItem.querySelector(".qty-input").value);
  const priceText = cartItem.querySelector(".current-price").textContent;
  const price = parseInt(priceText.replace(/[₹,]/g, ""));
  const total = price * quantity;

  cartItem.querySelector(
    ".total-price"
  ).textContent = `₹${total.toLocaleString()}`;
  updateCartSummary();
}

function updateCartSummary() {
  const cartItems = document.querySelectorAll(".cart-item");
  let subtotal = 0;

  cartItems.forEach((item) => {
    const totalText = item.querySelector(".total-price").textContent;
    const total = parseInt(totalText.replace(/[₹,]/g, ""));
    subtotal += total;
  });

  const tax = Math.round(subtotal * 0.18); // 18% tax
  const discount = 2000; // Fixed discount
  const finalTotal = subtotal + tax - discount;

  // Update summary
  const subtotalElement = document.querySelector(
    ".summary-row:first-child span:last-child"
  );
  const taxElement = document.querySelector(
    ".summary-row:nth-child(3) span:last-child"
  );
  const totalElement = document.querySelector(
    ".summary-row.total span:last-child"
  );

  if (subtotalElement)
    subtotalElement.textContent = `₹${subtotal.toLocaleString()}`;
  if (taxElement) taxElement.textContent = `₹${tax.toLocaleString()}`;
  if (totalElement)
    totalElement.textContent = `₹${finalTotal.toLocaleString()}`;
}

function updateItemsCount() {
  const cartItems = document.querySelectorAll(".cart-item");
  const itemsCount = document.querySelector(".items-count");
  if (itemsCount) {
    itemsCount.textContent = `${cartItems.length} items`;
  }
}

// Add CSS animation for remove effect
const style = document.createElement("style");
style.textContent = `
  @keyframes slideOutRight {
    0% { transform: translateX(0); opacity: 1; }
    100% { transform: translateX(100%); opacity: 0; }
  }

  @keyframes fadeOut {
    0% { opacity: 1; }
    100% { opacity: 0; }
  }
`;
document.head.appendChild(style);

// Product thumbnail switching
function switchMainImage(imageSrc) {
  const mainImage = document.getElementById("main-image");
  if (mainImage) {
    mainImage.src = imageSrc;
  }
}

// Quantity selector functions
function increaseQuantity() {
  const quantityInput = document.getElementById("quantity");
  if (quantityInput) {
    let currentValue = parseInt(quantityInput.value);
    quantityInput.value = currentValue + 1;
  }
}

function decreaseQuantity() {
  const quantityInput = document.getElementById("quantity");
  if (quantityInput) {
    let currentValue = parseInt(quantityInput.value);
    if (currentValue > 1) {
      quantityInput.value = currentValue - 1;
    }
  }
}

// Initialize thumbnail click handlers
document.addEventListener("DOMContentLoaded", function() {
  const thumbnails = document.querySelectorAll(".product-thumbnail");

  thumbnails.forEach((thumbnail) => {
    thumbnail.addEventListener("click", function() {
      // Remove active class from all thumbnails
      thumbnails.forEach((thumb) => thumb.classList.remove("active"));

      // Add active class to clicked thumbnail
      this.classList.add("active");

      // Get image source from thumbnail
      const img = this.querySelector("img");
      if (img) {
        switchMainImage(img.src);
      }
    });
  });
});

// Enhanced table interactions
document.addEventListener("DOMContentLoaded", function() {
  // Add smooth hover effects for table rows
  const specsRows = document.querySelectorAll(".specs-row");
  const faqRows = document.querySelectorAll(".faq-row");

  specsRows.forEach((row) => {
    row.addEventListener("mouseenter", function() {
      this.style.transform = "translateX(5px)";
      this.style.boxShadow = "0 5px 15px rgba(0, 0, 0, 0.1)";
    });

    row.addEventListener("mouseleave", function() {
      this.style.transform = "translateX(0)";
      this.style.boxShadow = "none";
    });
  });

  faqRows.forEach((row) => {
    row.addEventListener("mouseenter", function() {
      this.style.transform = "translateX(5px)";
      this.style.boxShadow = "0 5px 15px rgba(0, 0, 0, 0.1)";
    });

    row.addEventListener("mouseleave", function() {
      this.style.transform = "translateX(0)";
      this.style.boxShadow = "none";
    });
  });

  // Enhanced learn more button functionality
  const learnMoreBtn = document.querySelector(".learn-more-btn");
  if (learnMoreBtn) {
    learnMoreBtn.addEventListener("click", function() {
      this.style.transform = "scale(0.95)";
      setTimeout(() => {
        this.style.transform = "scale(1)";
        alert("Contact us for more detailed product information!");
      }, 150);
    });
  }
});

// Remove Cart Item Function for view-cart.html page
function removeCartItem(itemId) {
  const cartItem = document.querySelector(`[data-item-id="${itemId}"]`);
  if (!cartItem) return;

  // Get item name for success message
  const itemName = cartItem.querySelector('.item-details h4').textContent;

  // Remove without confirmation
  cartItem.style.transform = "translateX(100%)";
  cartItem.style.opacity = "0";
  cartItem.style.transition = "all 0.3s ease";

  setTimeout(() => {
    cartItem.remove();
    updateCartTotals();
    showRemoveSuccessMessage(`"${itemName}" has been removed from your cart.`);

    // Check if cart is empty
    checkEmptyCart();
  }, 300);
}

// Update cart totals after item removal
function updateCartTotals() {
  const remainingItems = document.querySelectorAll(".cart-item-summary");
  let newSubtotal = 0;

  remainingItems.forEach(item => {
    const priceElement = item.querySelector(".item-price");
    const price = parseFloat(priceElement.dataset.price) || 0;
    const quantityElement = item.querySelector(".item-quantity");
    const quantity = parseInt(quantityElement.textContent) || 1;
    newSubtotal += (price * quantity);
  });

  // Update subtotal
  const subtotalElement = document.querySelector(".order-summary .summary-row:first-child span:last-child");
  if (subtotalElement) {
    subtotalElement.textContent = `$${newSubtotal.toFixed(2)}`;
  }

  // Update total (assuming same tax and shipping)
  const taxElement = document.querySelector(".order-summary .summary-row:nth-child(3) span:last-child");
  const tax = taxElement ? parseFloat(taxElement.textContent.replace('$', '')) : 5.00;

  const shippingElement = document.querySelector(".order-summary .summary-row:nth-child(2) span:last-child");
  const shipping = shippingElement ? parseFloat(shippingElement.textContent.replace('$', '')) : 0;

  const newTotal = newSubtotal + tax + shipping;

  const totalElement = document.querySelector(".summary-total span:last-child");
  if (totalElement) {
    totalElement.textContent = `$${newTotal.toFixed(2)}`;
  }

  // Update cart count in header if exists
  const cartCountElement = document.querySelector(".cart-count");
  if (cartCountElement) {
    cartCountElement.textContent = remainingItems.length;
  }
}

// Show success message after removal
function showRemoveSuccessMessage(message) {
  const messageEl = document.createElement("div");
  messageEl.className = "remove-success-message";
  messageEl.style.cssText = `
    position: fixed;
    top: 2rem;
    right: 2rem;
    background: #28a745;
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
  messageEl.textContent = message;
  document.body.appendChild(messageEl);

  setTimeout(() => {
    messageEl.style.animation = "slideOutRight 0.3s ease";
    setTimeout(() => {
      if (messageEl.parentNode) {
        messageEl.parentNode.removeChild(messageEl);
      }
    }, 300);
  }, 3000);
}

// Check if cart is empty and show message
function checkEmptyCart() {
  const remainingItems = document.querySelectorAll(".cart-item-summary");

  if (remainingItems.length === 0) {
    const cartItemsList = document.querySelector(".cart-items-list");
    if (cartItemsList) {
      cartItemsList.innerHTML = `
        <div class="empty-cart-message" style="text-align: center; padding: 3rem; color: #666;">
          <h3 style="font-size: 2rem; margin-bottom: 1rem;">Your cart is empty</h3>
          <p style="margin-bottom: 2rem;">Add some products to your cart to continue shopping.</p>
          <a href="product.html" style="background: var(--blue); color: white; padding: 1rem 2rem; border-radius: 0.8rem; text-decoration: none; font-weight: 600;">Continue Shopping</a>
        </div>
      `;
    }

    // Hide checkout button if cart is empty
    const checkoutBtn = document.querySelector(".continue-payment-btn");
    if (checkoutBtn) {
      checkoutBtn.style.display = "none";
    }
  }
}

// Load More Testimonials Functionality
document.addEventListener("DOMContentLoaded", function() {
  const loadMoreBtn = document.getElementById("loadMoreTestimonials");

  if (loadMoreBtn) {
    loadMoreBtn.addEventListener("click", function() {
      const hiddenCards = document.querySelectorAll(".testimonial-card.hidden");
      const cardsToShow = 6; // Show 6 cards per click

      // Show next 6 hidden cards
      for (let i = 0; i < Math.min(cardsToShow, hiddenCards.length); i++) {
        const card = hiddenCards[i];
        card.classList.remove("hidden");
        card.classList.add("fade-in");

        // Remove fade-in class after animation completes
        setTimeout(() => {
          card.classList.remove("fade-in");
        }, 600);
      }

      // Update button text and state
      const remainingHidden = document.querySelectorAll(".testimonial-card.hidden");
      if (remainingHidden.length === 0) {
        this.textContent = "No more testimonials to load";
        this.disabled = true;
      } else {
        this.textContent = `Load More (${remainingHidden.length} remaining)`;
      }

      // Add loading animation
      this.style.transform = "scale(0.95)";
      setTimeout(() => {
        this.style.transform = "scale(1)";
      }, 150);
    });
  }
});

// Accordion Functionality
function toggleAccordion(accordionId) {
  const accordionContent = document.getElementById(accordionId);
  const accordionItem = accordionContent.closest(".accordion-item");

  // Toggle active class
  accordionItem.classList.toggle("active");

  // Close other accordions if needed (optional)
  // const otherAccordions = document.querySelectorAll('.accordion-item');
  // otherAccordions.forEach(item => {
  //     if (item !== accordionItem) {
  //         item.classList.remove('active');
  //     }
  // });
}

// FAQ Functionality
function toggleFaq(faqId) {
  const faqAnswer = document.getElementById(faqId);
  const faqItem = faqAnswer.closest(".faq-item");

  // Toggle active class
  faqItem.classList.toggle("active");

  // Optional: Close other FAQs when opening a new one
  // const otherFaqs = document.querySelectorAll('.faq-item');
  // otherFaqs.forEach(item => {
  //     if (item !== faqItem) {
  //         item.classList.remove('active');
  //     }
  // });
}

function animateAddToCart(btn) {
  // Simple scale animation without text change
  btn.style.transform = 'scale(0.95)';

  setTimeout(() => {
    btn.style.transform = 'scale(1)';
  }, 150);
}