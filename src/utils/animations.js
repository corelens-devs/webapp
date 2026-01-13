
// Simple WOW.js initialization
const initializeAnimations = () => {
  if (typeof window === 'undefined') return;

  // Initialize WOW.js if available
  if (window.WOW && !window.wowInitialized) {
    const wow = new window.WOW({
      boxClass: 'wow',
      animateClass: 'animated',
      offset: 0,
      mobile: true,
      live: true
    });
    wow.init();
    window.wowInitialized = true;
  }
};

export { initializeAnimations };
export default initializeAnimations;
