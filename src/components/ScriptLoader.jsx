
import { useEffect } from 'react';

const ScriptLoader = ({ scripts = [] }) => {
  useEffect(() => {
    const loadScript = (src) => {
      return new Promise((resolve, reject) => {
        // Check if script is already loaded
        const existingScript = document.querySelector(`script[src="${src}"]`);
        if (existingScript) {
          resolve();
          return;
        }

        const script = document.createElement('script');
        script.src = src;
        script.type = 'text/javascript';
        script.async = false; // Load scripts in order
        script.onload = () => resolve();
        script.onerror = () => reject(new Error(`Failed to load script: ${src}`));
        document.head.appendChild(script);
      });
    };

    const loadScripts = async () => {
      try {
        // Load scripts in sequence
        for (const script of scripts) {
          await loadScript(script);
        }
        
        // Initialize functionality after all scripts are loaded
        setTimeout(() => {
          // Initialize WOW animations if available
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

          // Initialize Owl Carousel if jQuery and Owl are available
          if (window.$ && window.$.fn.owlCarousel) {
            // Initialize carousels that might be needed
            window.$('.owl-carousel').each(function() {
              if (!window.$(this).hasClass('owl-loaded')) {
                window.$(this).owlCarousel({
                  items: 1,
                  loop: true,
                  autoplay: true,
                  autoplayTimeout: 4000,
                  nav: false,
                  dots: true
                });
              }
            });
          }
        }, 500);
        
      } catch (error) {
        console.error('Error loading scripts:', error);
      }
    };

    loadScripts();

    // Cleanup function
    return () => {
      // Remove scripts if needed during cleanup
      scripts.forEach(src => {
        const script = document.querySelector(`script[src="${src}"]`);
        if (script) {
          script.remove();
        }
      });
    };
  }, [scripts]);

  return null; // This component doesn't render anything
};

export default ScriptLoader;
