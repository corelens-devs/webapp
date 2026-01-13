// Razorpay checkout utility functions

export const initiateCheckout = async (orderData) => {
  try {
    const response = await fetch(
      "https://backend.corelens.in/api/app/test/checkout",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("userToken")}`,
        },
        body: JSON.stringify(orderData),
      }
    );

    const data = await response.json();
    if (!data.success) {
      throw new Error(data.message || "Checkout failed");
    }

    return data;
  } catch (error) {
    console.error("Checkout error:", error);
    throw error;
  }
};

export const loadRazorpayScript = () => {
  return new Promise((resolve) => {
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.onload = () => resolve(true);
    script.onerror = () => resolve(false);
    document.body.appendChild(script);
  });
};

export const openRazorpayCheckout = (options) => {
  const { key_id, order_id, amount, onSuccess, onFailure } = options;

  // Base URL for the application
  const baseUrl = window.location.origin;

  // URL encode the success and failure URLs
  const successUrl = encodeURIComponent(`${baseUrl}/payment-success`);
  const failureUrl = encodeURIComponent(`${baseUrl}/payment-failure`);

  // Construct the callback URL
  const callback_url = encodeURIComponent(
    `https://backend.corelens.in/api/app/test/paymentVerification?successUrl=${successUrl}&failureUrl=${failureUrl}`
  );

  // Construct the checkout URL
  const checkoutUrl = `https://api.razorpay.com/v1/checkout/embedded?key_id=${key_id}&order_id=${order_id}&callback_url=${callback_url}`;

  // Open the checkout URL in a new window
  const checkoutWindow = window.open(checkoutUrl, "_blank");

  // Monitor for window close or message events
  const checkInterval = setInterval(() => {
    if (checkoutWindow.closed) {
      clearInterval(checkInterval);
      // Handle closure without completion
      onFailure?.();
    }
  }, 1000);

  // Listen for postMessage events from the checkout window
  window.addEventListener(
    "message",
    (event) => {
      // Verify the origin for security
      if (event.origin === window.location.origin) {
        try {
          const {
            razorpay_payment_id,
            razorpay_order_id,
            razorpay_signature,
            error,
          } = event.data;
          if (error) {
            onFailure?.(error);
          } else if (
            razorpay_payment_id &&
            razorpay_order_id &&
            razorpay_signature
          ) {
            onSuccess?.({
              razorpay_payment_id,
              razorpay_order_id,
              razorpay_signature,
            });
          }
        } catch (err) {
          console.error("Error processing payment response:", err);
          onFailure?.(err);
        }
      }
    },
    false
  );
};
