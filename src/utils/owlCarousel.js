
// Simple Owl Carousel initialization
const initializeOwlCarousel = () => {
  if (typeof window === 'undefined' || !window.jQuery) return;

  const $ = window.jQuery;
  if (!$.fn.owlCarousel) return;

  // Initialize testimonial carousel
  const testimonialCarousel = $('.testimonial-carousel');
  if (testimonialCarousel.length) {
    testimonialCarousel.owlCarousel({
      loop: true,
      margin: 30,
      nav: false,
      dots: true,
      autoplay: true,
      autoplayTimeout: 5000,
      responsive: {
        0: { items: 1 },
        768: { items: 2 },
        1024: { items: 3 }
      }
    });
  }

  // Initialize product carousel
  const productCarousel = $('.product-carousel');
  if (productCarousel.length) {
    productCarousel.owlCarousel({
      loop: true,
      margin: 20,
      nav: true,
      dots: false,
      autoplay: true,
      autoplayTimeout: 4000,
      responsive: {
        0: { items: 1 },
        768: { items: 2 },
        1024: { items: 4 }
      }
    });
  }
};

export { initializeOwlCarousel };
export default initializeOwlCarousel;
