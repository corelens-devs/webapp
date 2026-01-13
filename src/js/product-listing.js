document.addEventListener('DOMContentLoaded', function() {
  // DOM Elements
  const productsGrid = document.getElementById('productsGrid');
  const categoryFilter = document.getElementById('category-filter');
  const sortFilter = document.getElementById('sort-filter');
  const viewBtns = document.querySelectorAll('.view-btn');
  const loadMoreBtn = document.getElementById('loadMoreBtn');
  const currentCountSpan = document.getElementById('currentCount');
  const totalCountSpan = document.getElementById('totalCount');

  // Product data for load more functionality
  const additionalProducts = [
    {
      name: 'Corelens Pro',
      category: 'camera-sensors',
      price: 3200,
      originalPrice: 7500,
      discount: 57,
      image: 'images/home/corelens-polo.png'
    },
    {
      name: 'Corelens Max',
      category: 'smart-doorlocks',
      price: 12000,
      originalPrice: 25000,
      discount: 52,
      image: 'images/home/corelens-ultra.png'
    },
    {
      name: 'Corelens Track',
      category: 'gps-trackers',
      price: 4200,
      originalPrice: 8500,
      discount: 51,
      image: 'images/home/corelens-turbo.png'
    },
    {
      name: 'Corelens Vision',
      category: 'camera-sensors',
      price: 2800,
      originalPrice: 6200,
      discount: 55,
      image: 'images/home/corelens-echo.png'
    },
    {
      name: 'Corelens Smart',
      category: 'smart-doorlocks',
      price: 11500,
      originalPrice: 24000,
      discount: 52,
      image: 'images/home/corelens-prime.png'
    },
    {
      name: 'Corelens Mini',
      category: 'gps-trackers',
      price: 2200,
      originalPrice: 4800,
      discount: 54,
      image: 'images/home/corelens-moto.png'
    }
  ];

  let currentProductsShown = 10;
  let allProducts = [];
  let filteredProducts = [];

  // Initialize
  init();

  function init() {
    getAllProducts();
    updateProductCount();
    bindEvents();
  }

  function getAllProducts() {
    const productCards = Array.from(productsGrid.querySelectorAll('.product-card'));
    allProducts = productCards.map(card => ({
      element: card,
      name: card.querySelector('.product-name').textContent,
      category: card.dataset.category,
      price: parseInt(card.dataset.price),
      originalPrice: parseInt(card.querySelector('.original-price').textContent.replace('₹', '')),
    }));
    filteredProducts = [...allProducts];
  }

  function bindEvents() {
    // Filter events
    categoryFilter.addEventListener('change', applyFilters);

    // View control events
    viewBtns.forEach(btn => {
      btn.addEventListener('click', function() {
        changeView(this.dataset.columns);
        updateActiveViewBtn(this);
      });
    });

    // Load more event
    loadMoreBtn.addEventListener('click', loadMoreProducts);

    // Add to cart events
    bindAddToCartEvents();
  }

  function bindAddToCartEvents() {
    const addToCartBtns = document.querySelectorAll('.add-to-cart-btn');
    addToCartBtns.forEach(btn => {
      btn.addEventListener('click', function() {
        animateAddToCart(this);
      });
    });
  }

  function animateAddToCart(btn) {
    const originalText = btn.textContent;
    btn.style.transform = 'scale(0.95)';
    btn.textContent = 'Adding...';

    setTimeout(() => {
      btn.style.transform = 'scale(1.05)';
      btn.textContent = 'Added!';
      btn.style.background = '#27ae60';

      setTimeout(() => {
        btn.style.transform = 'scale(1)';
        btn.textContent = originalText;
        btn.style.background = '';
      }, 2000);
    }, 500);
  }

  function applyFilters() {
    const categoryValue = categoryFilter.value;

    filteredProducts = allProducts.filter(product => {
      return categoryValue === 'all' || product.category === categoryValue;
    });

    displayProducts();
    updateProductCount();
  }

  function displayProducts() {
    // Hide all products first
    allProducts.forEach(product => {
      product.element.classList.add('hidden');
    });

    // Show filtered products
    filteredProducts.forEach((product, index) => {
      if (index < currentProductsShown) {
        product.element.classList.remove('hidden');
        productsGrid.appendChild(product.element);
      }
    });

    // Update load more button
    updateLoadMoreButton();
  }

  function changeView(columns) {
    // Remove all column classes first
    productsGrid.classList.remove('columns-2', 'columns-3', 'columns-4', 'columns-5');

    // Add the specific column class
    if (columns === '2') {
      productsGrid.classList.add('columns-2');
    } else if (columns === '4') {
      productsGrid.classList.add('columns-4');
    } else if (columns === '3') {
      productsGrid.classList.add('columns-3');
    }
    // Default is 3 columns if no specific class

    console.log('Changed view to:', columns, 'columns');
    console.log('Grid classes:', productsGrid.className);
  }

  function updateActiveViewBtn(activeBtn) {
    viewBtns.forEach(btn => btn.classList.remove('active'));
    activeBtn.classList.add('active');
  }

  function loadMoreProducts() {
    const remainingSlots = Math.min(6, additionalProducts.length);

    for (let i = 0; i < remainingSlots && additionalProducts.length > 0; i++) {
      const productData = additionalProducts.shift();
      const productCard = createProductCard(productData);
      productsGrid.appendChild(productCard);

      // Add to allProducts array
      allProducts.push({
        element: productCard,
        name: productData.name,
        category: productData.category,
        price: productData.price,
        originalPrice: productData.originalPrice
      });
    }

    currentProductsShown += remainingSlots;
    updateProductCount();
    updateLoadMoreButton();

    // Bind events to new products
    bindAddToCartEvents();

    // Re-apply current filters
    applyFilters();
  }

  function createProductCard(productData) {
    const productCard = document.createElement('div');
    productCard.className = 'product-card';
    productCard.dataset.category = productData.category;
    productCard.dataset.price = productData.price;

    productCard.innerHTML = `
      <div class="product-image">
        <img src="${productData.image}" alt="${productData.name}" />
        <div class="discount-badge">${productData.discount}% off</div>
      </div>
      <div class="product-info">
        <h3 class="product-name">${productData.name}</h3>
        <div class="product-pricing">
          <span class="current-price">₹${productData.price}</span>
          <span class="original-price">₹${productData.originalPrice}</span>
        </div>
        <button class="add-to-cart-btn">Add to Cart</button>
      </div>
    `;

    return productCard;
  }

  function updateProductCount() {
    const visibleProducts = Math.min(currentProductsShown, filteredProducts.length);
    currentCountSpan.textContent = visibleProducts;
    totalCountSpan.textContent = allProducts.length + additionalProducts.length;
  }

  function updateLoadMoreButton() {
    const hasMoreProducts = additionalProducts.length > 0 || filteredProducts.length > currentProductsShown;

    if (!hasMoreProducts) {
      loadMoreBtn.disabled = true;
      loadMoreBtn.textContent = 'No More Products';
    } else {
      loadMoreBtn.disabled = false;
      loadMoreBtn.textContent = 'Load More Products';
    }
  }

  // Cart functionality (reuse from existing script.js)
  const cartToggle = document.getElementById('cartToggle');
  const cartOverlay = document.getElementById('cartOverlay');
  const cartClose = document.getElementById('cartClose');

  if (cartToggle && cartOverlay && cartClose) {
    cartToggle.addEventListener('click', function(e) {
      e.preventDefault();
      cartOverlay.classList.add('active');
    });

    cartClose.addEventListener('click', function() {
      cartOverlay.classList.remove('active');
    });

    cartOverlay.addEventListener('click', function(e) {
      if (e.target === cartOverlay) {
        cartOverlay.classList.remove('active');
      }
    });
  }
});

// Column view functionality
const columnBtns = document.querySelectorAll('.column-btn');
const productsGrid = document.querySelector('.products-grid');

if (columnBtns.length > 0 && productsGrid) {
  // Set default view to 3 columns
  productsGrid.classList.add('columns-3');
  document.querySelector('[data-columns="3"]')?.classList.add('active');

  columnBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      // Remove active class from all buttons
      columnBtns.forEach(b => b.classList.remove('active'));

      // Add active class to clicked button
      btn.classList.add('active');

      // Get number of columns
      const columns = btn.dataset.columns;

      // Remove all column classes
      productsGrid.classList.remove('columns-2', 'columns-3', 'columns-4');

      // Add new column class
      productsGrid.classList.add(`columns-${columns}`);

      console.log(`Switched to ${columns} columns view`);
    });
  });
}