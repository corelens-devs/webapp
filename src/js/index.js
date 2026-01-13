// Reset slide animations function
function resetSlideAnimations() {
  const activeSlide = document.querySelector('.home-banner-carousel .owl-item.active');
  if (activeSlide) {
    // Remove existing animation classes
    const animatedElements = activeSlide.querySelectorAll('.wow');
    animatedElements.forEach(element => {
      element.classList.remove('animated', 'fadeInUp', 'bounceInUp', 'bounceInLeft', 'bounceInRight');
      element.style.visibility = 'hidden';
    });

    // Re-trigger animations after a short delay
    setTimeout(() => {
      animatedElements.forEach(element => {
        element.style.visibility = 'visible';
        const animationType = element.getAttribute('data-animation') || 'fadeInUp';
        element.classList.add('animated', animationType);
      });
    }, 100);
  }
}

// Initialize when jQuery is ready
$(document).ready(function() {
  console.log('DOM ready - initializing components');

  // Initialize testimonial carousel
  if ($('.testimonial-carousel').length) {
    $('.testimonial-carousel').owlCarousel({
      items: 3,
      margin: 30,
      loop: true,
      autoplay: true,
      autoplayTimeout: 5000,
      nav: true,
      dots: true,
      navText: ['<', '>'],
      responsive: {
        0: { items: 1 },
        768: { items: 2 },
        992: { items: 3 }
      }
    });
  }

  // Initialize other carousels
  $('.owl-carousel').not('.testimonial-carousel').each(function() {
    $(this).owlCarousel({
      items: 1,
      margin: 0,
      loop: true,
      autoplay: true,
      autoplayTimeout: 4000,
      nav: false,
      dots: true
    });
  });

  // Cart modal functionality
  $('.cart-icon').on('click', function(e) {
    e.preventDefault();
    $('#cartModal').addClass('show');
    $('body').addClass('modal-open');
  });

  $('.close-modal, .modal-backdrop').on('click', function() {
    $('#cartModal').removeClass('show');
    $('body').removeClass('modal-open');
  });

  // Quantity controls
  $(document).on('click', '.qty-btn', function() {
    var $input = $(this).siblings('.qty-input');
    var currentVal = parseInt($input.val()) || 1;
    var min = parseInt($input.attr('min')) || 1;
    var max = parseInt($input.attr('max')) || 999;

    if ($(this).hasClass('plus')) {
      if (currentVal < max) {
        $input.val(currentVal + 1);
      }
    } else if ($(this).hasClass('minus')) {
      if (currentVal > min) {
        $input.val(currentVal - 1);
      }
    }
  });

  // Smooth scrolling for anchor links
  $('a[href^="#"]').on('click', function(e) {
    e.preventDefault();
    var target = $(this.getAttribute('href'));
    if (target.length) {
      $('html, body').stop().animate({
        scrollTop: target.offset().top - 100
      }, 1000);
    }
  });

  // Mobile menu toggle
  $('.toggleBtn').on('click', function() {
    $('.navigation').toggleClass('active');
    $(this).toggleClass('active');
  });

  // Form validation
  $('form').on('submit', function(e) {
    var isValid = true;
    $(this).find('input[required], select[required], textarea[required]').each(function() {
      if (!$(this).val().trim()) {
        isValid = false;
        $(this).addClass('error');
      } else {
        $(this).removeClass('error');
      }
    });

    if (!isValid) {
      e.preventDefault();
      alert('Please fill in all required fields.');
    }
  });

  // Category slider
  $(".category-slider").owlCarousel({
    loop: true,
    margin: 45,
    nav: false,
    responsive: {
      0: {
        items: 1,
      },
      600: {
        items: 3,
        margin: 20,
      },
      1100: {
        items: 3,
      },
    },
  });

  // Review slider
  $(".review-slider").owlCarousel({
    loop: true,
    margin: 20,
    nav: false,
    responsive: {
      0: {
        items: 1,
      },
      600: {
        items: 3,
      },
      1000: {
        items: 3,
      },
    },
  });

  // Main banner slider with animation reset
  $(".mainbanner-slider, .home-banner-carousel").owlCarousel({
    loop: true,
    margin: 20,
    nav: false,
    items: 1,
    onChanged: function(event) {
      setTimeout(function() {
        resetSlideAnimations();
      }, 50);
    },
    onInitialized: function(event) {
      // Ensure first slide animations work on page load
      setTimeout(function() {
        resetSlideAnimations();
      }, 300);
    },
  });

  // Toggle Menu
  $('.toggleBtn').on('click', function() {
    if ($('.nav-links').hasClass('slide')) {
      $('.nav-links').removeClass('slide');
    } else {
      $('.nav-links').addClass('slide');
    }
  });

  // Initialize WOW animations
  if (typeof WOW !== 'undefined') {
    new WOW().init();
  }

  // Close mobile menu when clicking outside
  $(document).on("click", function(event) {
    var $trigger = $("header .toggleBtn, .nav-links");
    if ($trigger[0] !== event.target && !$trigger.has(event.target).length) {
      $(".nav-links").removeClass("slide");
      $("body").removeClass("overlay");
      // Reset all menu states
      $('.nav-links .arrowSign').removeClass("rotate");
      $('.nav-links .sub-menu').slideUp(200);
      $('.nav-links .megamenu').slideUp(200).removeClass('active');
      $('.nav-links .megamenu-parent').removeClass('open');
    }
  });

  // Unified arrow click handler for all submenus (both regular and megamenu)
  $(".nav-links .arrowSign").click(function(e) {
    e.preventDefault();
    e.stopPropagation();

    var $arrow = $(this);
    var $parent = $arrow.parent();
    var $isMegamenu = $parent.hasClass('megamenu-parent');
    var $isCurrentlyOpen = $arrow.hasClass('rotate');

    // On mobile, handle both regular submenus and megamenus
    if ($(window).width() <= 767) {
      console.log('Mobile arrow clicked!', $isMegamenu ? 'Megamenu' : 'Regular submenu');

      // Close ALL other submenus and megamenus first
      $('.nav-links .arrowSign').not($arrow).removeClass("rotate");
      $('.nav-links .sub-menu').slideUp(200);
      $('.nav-links .megamenu-parent').not($parent).removeClass('open');
      $('.nav-links .megamenu').not($parent.find('.megamenu')).slideUp(200).removeClass('active');

      // Toggle current submenu
      if ($isCurrentlyOpen) {
        // Close current submenu
        $arrow.removeClass("rotate");
        if ($isMegamenu) {
          $parent.removeClass('open');
          $parent.find('.megamenu').removeClass('active').slideUp(300);
        } else {
          $parent.find('.sub-menu').slideUp(200);
        }
      } else {
        // Open current submenu
        $arrow.addClass("rotate");
        if ($isMegamenu) {
          $parent.addClass('open');
          $parent.find('.megamenu').addClass('active').slideDown(300);
        } else {
          $parent.find('.sub-menu').slideDown(200);
        }
      }
    } else {
      // Desktop behavior for regular submenus only (megamenu uses hover on desktop)
      if (!$isMegamenu) {
        $arrow.toggleClass("rotate");
        $arrow.next().slideToggle();
      }
    }
  });

  // Desktop hover functionality for megamenu only
  $('.nav-links .megamenu-parent').on('mouseenter', function() {
    if ($(window).width() > 767) {
      $(this).find('.megamenu').stop(true, true).fadeIn(200);
    }
  });

  $('.nav-links .megamenu-parent').on('mouseleave', function() {
    if ($(window).width() > 767) {
      $(this).find('.megamenu').stop(true, true).fadeOut(150);
    }
  });

  // Handle window resize
  $(window).on('resize', function() {
    if ($(window).width() > 767) {
      // Desktop mode - reset mobile states
      $('.nav-links .megamenu').hide().removeClass('active');
      $('.nav-links .megamenu-parent').removeClass('open');
      $('.nav-links .arrowSign').removeClass('rotate');
      $('.nav-links .sub-menu').hide();
    } else {
      // Mobile mode - hide desktop megamenu
      $('.nav-links .megamenu').hide().removeClass('active');
      $('.nav-links .megamenu-parent').removeClass('open');
    }
  });

  // Close megamenu when clicking on a category item
  $(document).on('click', '.megamenu a', function(e) {
    if ($(window).width() <= 767) {
      e.stopPropagation();
      $('.nav-links .megamenu').slideUp(200).removeClass('active');
      $('.nav-links .megamenu-parent').removeClass('open');
      $('.nav-links .arrowSign').removeClass("rotate");
    }
  });
});

// Make resetSlideAnimations globally available
window.resetSlideAnimations = resetSlideAnimations;