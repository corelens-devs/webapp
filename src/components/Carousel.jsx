
import React, { useEffect, useRef } from 'react';

const Carousel = ({ children, items, renderItem, options = {}, className = '' }) => {
  const carouselRef = useRef(null);

  const defaultOptions = {
    items: 1,
    loop: true,
    margin: 20,
    nav: true,
    dots: true,
    autoplay: true,
    autoplayTimeout: 3000,
    autoplayHoverPause: true,
    responsive: {
      0: {
        items: 1
      },
      768: {
        items: 2
      },
      1024: {
        items: 3
      }
    },
    ...options
  };

  useEffect(() => {
    const initCarousel = () => {
      if (window.$ && window.$.fn.owlCarousel && carouselRef.current) {
        const $carousel = window.$(carouselRef.current);
        
        // Destroy existing carousel if it exists
        if ($carousel.data('owl.carousel')) {
          $carousel.trigger('destroy.owl.carousel');
          $carousel.removeClass('owl-carousel owl-loaded');
          $carousel.find('.owl-stage-outer').children().unwrap();
        }

        // Initialize new carousel
        $carousel.addClass('owl-carousel owl-theme');
        $carousel.owlCarousel(defaultOptions);
      }
    };

    // Wait for scripts to load
    const checkScripts = () => {
      if (window.$ && window.$.fn.owlCarousel) {
        initCarousel();
      } else {
        setTimeout(checkScripts, 100);
      }
    };

    checkScripts();

    // Cleanup on unmount
    return () => {
      if (window.$ && carouselRef.current) {
        const $carousel = window.$(carouselRef.current);
        if ($carousel.data('owl.carousel')) {
          $carousel.trigger('destroy.owl.carousel');
        }
      }
    };
  }, [items, children]);

  // If children are passed directly, use them
  if (children) {
    return (
      <div ref={carouselRef} className={`custom-carousel ${className}`}>
        {React.Children.map(children, (child, index) => (
          <div key={index}>{child}</div>
        ))}
      </div>
    );
  }

  // If items array is passed, render with renderItem function
  if (items && Array.isArray(items)) {
    return (
      <div ref={carouselRef} className={`custom-carousel ${className}`}>
        {items.map((item, index) => (
          <div key={item.id || index}>
            {renderItem ? renderItem({ product: item }) : <div>{item.name}</div>}
          </div>
        ))}
      </div>
    );
  }

  return (
    <div ref={carouselRef} className={`custom-carousel ${className}`}>
      <div>No items to display</div>
    </div>
  );
};

export default Carousel;
