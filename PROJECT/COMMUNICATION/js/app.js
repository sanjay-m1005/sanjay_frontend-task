/**
 * TALARA — The Palmyra Company
 * Application Controller & Interactive Core
 */

(function () {
  'use strict';

  // State Management
  const STATE = {
    cart: JSON.parse(localStorage.getItem('talara_cart') || '[]'),
    wishlist: JSON.parse(localStorage.getItem('talara_wishlist') || '[]'),
    activeCategory: 'all',
    activeAnatomyPart: null,
    searchQuery: '',
    sortBy: 'featured',
    selectedProductForModal: null,
    selectedVariantIndex: 0,
    modalQuantity: 1,
    isAgeVerified: sessionStorage.getItem('talara_age_verified') === 'true',
    activeProcessStep: 0,
    appliedPromo: null,
    freeShippingThreshold: 60.00
  };

  // Promo codes configuration
  const PROMO_CODES = {
    'PALMVALUE': { type: 'percent', value: 0.15, label: '15% Off (Palm = Value)' },
    'BORASSUS': { type: 'percent', value: 0.20, label: '20% Off Launch Special' },
    'ZEROCHLORINE': { type: 'fixed', value: 5.00, label: '$5 Off Pure Craft' }
  };

  // DOM Elements cache
  let dom = {};

  function initDOM() {
    dom = {
      navbar: document.getElementById('main-navbar'),
      navMobileMenu: document.getElementById('mobile-menu-drawer'),
      navMobileToggle: document.getElementById('mobile-menu-toggle'),
      cartDrawer: document.getElementById('cart-drawer'),
      wishlistDrawer: document.getElementById('wishlist-drawer'),
      drawerBackdrop: document.getElementById('drawer-backdrop'),
      modalBackdrop: document.getElementById('modal-backdrop'),
      productModal: document.getElementById('product-detail-modal'),
      ageModal: document.getElementById('age-verification-modal'),
      checkoutModal: document.getElementById('checkout-modal'),
      orderSuccessModal: document.getElementById('order-success-modal'),
      toastContainer: document.getElementById('toast-container'),

      // Badges
      cartBadge: document.getElementById('cart-count-badge'),
      wishlistBadge: document.getElementById('wishlist-count-badge'),

      // Catalog
      productsGrid: document.getElementById('products-grid'),
      productCountEl: document.getElementById('product-results-count'),
      categoryFilterPills: document.querySelectorAll('.filter-pill[data-category]'),
      searchInput: document.getElementById('product-search-input'),
      sortSelect: document.getElementById('product-sort-select'),

      // Anatomy
      anatomyCardsContainer: document.getElementById('anatomy-cards-container'),
      anatomyDetailPanel: document.getElementById('anatomy-detail-panel'),

      // Process
      processTimelineContainer: document.getElementById('process-timeline-container'),
      processDetailPanel: document.getElementById('process-detail-panel'),

      // Cart Elements
      cartItemsList: document.getElementById('cart-items-list'),
      cartSubtotalEl: document.getElementById('cart-subtotal-val'),
      cartShippingEl: document.getElementById('cart-shipping-val'),
      cartTotalEl: document.getElementById('cart-total-val'),
      cartFreeShippingBar: document.getElementById('cart-free-shipping-fill'),
      cartFreeShippingText: document.getElementById('cart-free-shipping-text'),
      promoCodeInput: document.getElementById('promo-code-input'),
      applyPromoBtn: document.getElementById('apply-promo-btn'),
      promoFeedbackEl: document.getElementById('promo-feedback-msg'),
      promoDiscountRow: document.getElementById('cart-promo-discount-row'),
      promoDiscountVal: document.getElementById('cart-promo-discount-val'),

      // Wishlist Elements
      wishlistItemsList: document.getElementById('wishlist-items-list'),

      // Contact Form
      b2bForm: document.getElementById('b2b-inquiry-form')
    };
  }

  // --- Helpers ---
  function formatMoney(amount) {
    return '$' + Number(amount).toFixed(2);
  }

  function showToast(message, type = 'info') {
    if (!dom.toastContainer) return;
    const toast = document.createElement('div');
    toast.className = 'toast';
    
    let iconSvg = '';
    if (type === 'success') {
      iconSvg = `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#4ade80" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>`;
    } else if (type === 'warn') {
      iconSvg = `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#f59e0b" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="8" x2="12" y2="12"></line><line x1="12" y1="16" x2="12.01" y2="16"></line></svg>`;
    } else {
      iconSvg = `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--primary-amber-light)" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="16" x2="12" y2="12"></line><line x1="12" y1="8" x2="12.01" y2="8"></line></svg>`;
    }

    toast.innerHTML = `
      <div class="flex-shrink-0">${iconSvg}</div>
      <div class="text-sm font-medium">${message}</div>
    `;

    dom.toastContainer.appendChild(toast);

    setTimeout(() => {
      toast.style.opacity = '0';
      toast.style.transform = 'translateY(-10px)';
      toast.style.transition = 'all 0.3s ease';
      setTimeout(() => toast.remove(), 300);
    }, 3500);
  }

  function saveCart() {
    localStorage.setItem('talara_cart', JSON.stringify(STATE.cart));
    updateCartUI();
  }

  function saveWishlist() {
    localStorage.setItem('talara_wishlist', JSON.stringify(STATE.wishlist));
    updateWishlistUI();
  }

  // --- Scroll & Navbar Handling ---
  function initNavbarScroll() {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 40) {
        dom.navbar.classList.add('navbar-scrolled');
      } else {
        dom.navbar.classList.remove('navbar-scrolled');
      }
    }, { passive: true });
  }

  // --- Catalog Rendering ---
  function getFilteredProducts() {
    let list = [...PRODUCTS_DATA];

    // Filter by Category
    if (STATE.activeCategory !== 'all') {
      list = list.filter(p => p.category === STATE.activeCategory);
    }

    // Filter by Palm Anatomy
    if (STATE.activeAnatomyPart) {
      list = list.filter(p => p.palmPartId === STATE.activeAnatomyPart);
    }

    // Filter by Search Query
    if (STATE.searchQuery.trim() !== '') {
      const q = STATE.searchQuery.toLowerCase().trim();
      list = list.filter(p => 
        p.name.toLowerCase().includes(q) ||
        p.subtitle.toLowerCase().includes(q) ||
        p.shortDesc.toLowerCase().includes(q) ||
        p.palmPart.toLowerCase().includes(q) ||
        (p.ingredients && p.ingredients.some(i => i.toLowerCase().includes(q)))
      );
    }

    // Sorting
    if (STATE.sortBy === 'price-low') {
      list.sort((a, b) => a.price - b.price);
    } else if (STATE.sortBy === 'price-high') {
      list.sort((a, b) => b.price - a.price);
    } else if (STATE.sortBy === 'rating') {
      list.sort((a, b) => b.rating - a.rating);
    } else if (STATE.sortBy === 'name') {
      list.sort((a, b) => a.name.localeCompare(b.name));
    } else {
      // Featured
      list.sort((a, b) => (b.isFeatured ? 1 : 0) - (a.isFeatured ? 1 : 0));
    }

    return list;
  }

  function renderProductsGrid() {
    if (!dom.productsGrid) return;
    const items = getFilteredProducts();

    if (dom.productCountEl) {
      dom.productCountEl.textContent = `Showing ${items.length} ${items.length === 1 ? 'creation' : 'creations'}`;
    }

    if (items.length === 0) {
      dom.productsGrid.innerHTML = `
        <div class="col-span-full text-center py-16 px-4">
          <div class="inline-flex items-center justify-center w-16 h-16 rounded-full bg-emerald-950/40 text-amber-400 mb-4 border border-amber-500/20">
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
          </div>
          <h3 class="text-xl font-display font-semibold text-white mb-2">No Palm Products Found</h3>
          <p class="text-zinc-400 max-w-md mx-auto text-sm mb-6">We couldn't find any products matching your active filters. Try clearing your search or resetting category filters.</p>
          <button id="reset-filters-btn" class="btn-primary py-2 px-6 text-sm">Reset All Filters</button>
        </div>
      `;
      const resetBtn = document.getElementById('reset-filters-btn');
      if (resetBtn) {
        resetBtn.addEventListener('click', () => {
          STATE.activeCategory = 'all';
          STATE.activeAnatomyPart = null;
          STATE.searchQuery = '';
          if (dom.searchInput) dom.searchInput.value = '';
          updateCategoryPills();
          renderProductsGrid();
        });
      }
      return;
    }

    dom.productsGrid.innerHTML = items.map(product => {
      const isWishlisted = STATE.wishlist.some(id => id === product.id);
      const isAlcoholic = product.ageRestricted;

      return `
        <article class="product-card group" data-product-id="${product.id}">
          <div class="product-card-img-wrap">
            <img 
              src="${product.image}" 
              alt="${product.name}" 
              class="product-card-img" 
              loading="lazy"
              onerror="this.src='images/hero-palmyra.jpg'"
            />
            <div class="absolute top-3.5 left-3.5 flex flex-col gap-1.5 z-10">
              <span class="badge-tag ${isAlcoholic ? 'badge-red' : 'badge-amber'}">
                ${product.badge}
              </span>
              ${product.isNew ? '<span class="badge-tag badge-emerald">New Launch</span>' : ''}
            </div>

            <button 
              class="wishlist-toggle-btn absolute top-3.5 right-3.5 w-9 h-9 rounded-full bg-black/60 backdrop-blur-md border border-white/10 flex items-center justify-center text-white/70 hover:text-amber-400 hover:scale-110 transition-all z-10 ${isWishlisted ? 'text-amber-400 !border-amber-400/40 bg-amber-950/40' : ''}"
              data-product-id="${product.id}"
              aria-label="Save to wishlist"
              title="Add to wishlist"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="${isWishlisted ? 'currentColor' : 'none'}" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
              </svg>
            </button>

            <button 
              class="quick-view-btn absolute bottom-3 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-all duration-300 py-2 px-5 bg-black/80 hover:bg-black backdrop-blur-md border border-amber-500/40 text-amber-200 rounded-full text-xs font-semibold tracking-wider uppercase shadow-xl flex items-center gap-1.5 pointer-events-auto"
              data-product-id="${product.id}"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
              Quick Specs
            </button>
          </div>

          <div class="p-5 flex flex-col flex-grow">
            <div class="flex items-center justify-between text-xs text-amber-400/80 mb-1.5 font-mono uppercase tracking-wider">
              <span>${product.categoryLabel}</span>
              <span class="flex items-center gap-1 text-zinc-400">
                <svg width="13" height="13" viewBox="0 0 24 24" fill="var(--primary-amber)" stroke="none"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg>
                ${product.rating} (${product.reviewsCount})
              </span>
            </div>

            <h3 class="font-display font-semibold text-lg text-white group-hover:text-amber-300 transition-colors mb-1 line-clamp-1">
              ${product.name}
            </h3>

            <p class="text-xs text-zinc-400 mb-3 line-clamp-1 font-sans">
              Part: <span class="text-zinc-200">${product.palmPart}</span>
            </p>

            <p class="text-xs text-zinc-400 line-clamp-2 mb-4 leading-relaxed flex-grow">
              ${product.shortDesc}
            </p>

            <div class="pt-3 border-t border-white/5 flex items-center justify-between mt-auto">
              <div>
                <span class="text-xs text-zinc-500 block uppercase tracking-wider font-mono">Price</span>
                <span class="text-lg font-bold font-display text-white">${formatMoney(product.price)}</span>
              </div>

              <div class="flex items-center gap-2">
                <button 
                  class="open-product-modal-btn p-2.5 rounded-full bg-white/5 hover:bg-white/15 text-zinc-300 hover:text-white transition-colors border border-white/10"
                  data-product-id="${product.id}"
                  title="View Full Story & Nutrition"
                  aria-label="View details"
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path><circle cx="12" cy="12" r="3"></circle></svg>
                </button>

                <button 
                  class="direct-add-cart-btn btn-amber-outline py-2 px-3.5 text-xs font-semibold flex items-center gap-1.5"
                  data-product-id="${product.id}"
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="9" cy="21" r="1"></circle><circle cx="20" cy="21" r="1"></circle><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path></svg>
                  Add
                </button>
              </div>
            </div>
          </div>
        </article>
      `;
    }).join('');

    bindProductCardEvents();
  }

  function bindProductCardEvents() {
    // Open product modal
    document.querySelectorAll('.open-product-modal-btn, .quick-view-btn, .product-card h3').forEach(el => {
      el.addEventListener('click', (e) => {
        const card = e.target.closest('[data-product-id]');
        if (card) {
          const pid = card.dataset.productId;
          openProductModal(pid);
        }
      });
    });

    // Wishlist buttons
    document.querySelectorAll('.wishlist-toggle-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        const pid = btn.dataset.productId;
        toggleWishlist(pid);
      });
    });

    // Direct Add to Cart
    document.querySelectorAll('.direct-add-cart-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        const pid = btn.dataset.productId;
        handleAddToCartDirect(pid);
      });
    });
  }

  function updateCategoryPills() {
    dom.categoryFilterPills.forEach(pill => {
      if (pill.dataset.category === STATE.activeCategory) {
        pill.classList.add('active');
      } else {
        pill.classList.remove('active');
      }
    });
  }

  // --- Palm Anatomy Interactive Module ---
  function renderAnatomySection() {
    if (!dom.anatomyCardsContainer) return;

    dom.anatomyCardsContainer.innerHTML = PALM_ANATOMY.map((part, index) => {
      const isActive = STATE.activeAnatomyPart === part.id;
      return `
        <div 
          class="anatomy-card glass-panel rounded-xl p-5 border border-white/5 hover:border-amber-500/40 transition-all ${isActive ? 'active' : ''}"
          data-part-id="${part.id}"
        >
          <div class="flex items-center justify-between mb-3">
            <span class="text-xs font-mono uppercase tracking-widest text-amber-400 font-semibold">Node 0${index + 1}</span>
            <div class="anatomy-node-dot"></div>
          </div>
          <h4 class="font-display font-semibold text-base text-white mb-1">${part.partName}</h4>
          <p class="text-xs text-zinc-400 italic mb-2.5">${part.botanicalTerm}</p>
          <p class="text-xs text-zinc-300 line-clamp-2 mb-3 leading-relaxed">${part.role}</p>
          <div class="flex items-center justify-between text-xs text-amber-300/90 pt-2 border-t border-white/5">
            <span>${part.relatedProductIds.length} Derivatives</span>
            <span class="flex items-center gap-1 font-semibold group-hover:translate-x-1 transition-transform">
              Explore →
            </span>
          </div>
        </div>
      `;
    }).join('');

    document.querySelectorAll('.anatomy-card').forEach(card => {
      card.addEventListener('click', () => {
        const partId = card.dataset.partId;
        selectAnatomyPart(partId);
      });
    });

    // Render detail panel for first or active
    updateAnatomyDetailPanel();
  }

  function selectAnatomyPart(partId) {
    if (STATE.activeAnatomyPart === partId) {
      STATE.activeAnatomyPart = null; // toggle off
    } else {
      STATE.activeAnatomyPart = partId;
    }
    renderAnatomySection();
    renderProductsGrid();

    // Scroll to catalog smoothly if an anatomy node was clicked
    if (STATE.activeAnatomyPart) {
      const catSection = document.getElementById('catalog-section');
      if (catSection) {
        catSection.scrollIntoView({ behavior: 'smooth' });
      }
    }
  }

  function updateAnatomyDetailPanel() {
    if (!dom.anatomyDetailPanel) return;
    const currentPart = PALM_ANATOMY.find(p => p.id === (STATE.activeAnatomyPart || 'inflorescence'));
    if (!currentPart) return;

    dom.anatomyDetailPanel.innerHTML = `
      <div class="glass-panel p-6 sm:p-8 rounded-2xl border border-amber-500/20 shadow-2xl relative overflow-hidden">
        <div class="absolute -right-10 -bottom-10 w-48 h-48 rounded-full bg-amber-500/5 blur-3xl pointer-events-none"></div>

        <div class="flex flex-wrap items-center justify-between gap-4 mb-5 border-b border-white/10 pb-4">
          <div>
            <span class="badge-tag badge-amber mb-1.5 font-mono text-[11px]">Botanical Fraction</span>
            <h3 class="font-display text-2xl font-bold text-white">${currentPart.partName}</h3>
            <p class="text-sm font-mono text-amber-400 italic">${currentPart.botanicalTerm}</p>
          </div>
          <div class="text-right">
            <span class="text-xs text-zinc-400 block font-mono">Harvest Window</span>
            <span class="text-sm font-semibold text-zinc-200">${currentPart.harvestSeason}</span>
          </div>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6 text-sm">
          <div>
            <h5 class="text-xs font-mono uppercase tracking-wider text-zinc-400 mb-1.5">Tree Function & Ecosystem Role</h5>
            <p class="text-zinc-300 leading-relaxed">${currentPart.role}</p>
          </div>
          <div>
            <h5 class="text-xs font-mono uppercase tracking-wider text-zinc-400 mb-1.5">Modern High-Value Transformation</h5>
            <p class="text-zinc-300 leading-relaxed">${currentPart.modernValue}</p>
          </div>
        </div>

        <div class="p-4 rounded-xl bg-black/40 border border-emerald-500/20 flex flex-wrap items-center justify-between gap-3 text-xs">
          <div class="flex items-center gap-2">
            <span class="w-2 h-2 rounded-full bg-emerald-400"></span>
            <span class="text-zinc-300"><strong class="text-white">Yield Efficiency:</strong> ${currentPart.utilizationRate}</span>
          </div>
          <button 
            id="filter-by-anatomy-btn"
            class="btn-amber-outline text-xs py-1.5 px-3.5"
            data-part-id="${currentPart.id}"
          >
            Filter Catalog for This Part (${currentPart.relatedProductIds.length})
          </button>
        </div>
      </div>
    `;

    const filterBtn = document.getElementById('filter-by-anatomy-btn');
    if (filterBtn) {
      filterBtn.addEventListener('click', () => {
        STATE.activeAnatomyPart = filterBtn.dataset.partId;
        renderProductsGrid();
        const catalogEl = document.getElementById('catalog-section');
        if (catalogEl) catalogEl.scrollIntoView({ behavior: 'smooth' });
      });
    }
  }

  // --- Process Journey Timeline ---
  function renderProcessTimeline() {
    if (!dom.processTimelineContainer) return;

    dom.processTimelineContainer.innerHTML = PROCESS_STEPS.map((step, index) => {
      const isActive = STATE.activeProcessStep === index;
      return `
        <button 
          class="process-step-tab text-left p-4 rounded-xl transition-all border ${isActive ? 'bg-amber-950/30 border-amber-500/40 text-white' : 'bg-transparent border-white/5 text-zinc-400 hover:text-zinc-200 hover:border-white/20'}"
          data-step-index="${index}"
        >
          <span class="font-mono text-xs text-amber-400 font-bold block mb-1">STAGE ${step.step}</span>
          <h4 class="font-display font-semibold text-sm ${isActive ? 'text-amber-200' : 'text-zinc-300'}">${step.title}</h4>
        </button>
      `;
    }).join('');

    document.querySelectorAll('.process-step-tab').forEach(tab => {
      tab.addEventListener('click', () => {
        STATE.activeProcessStep = parseInt(tab.dataset.stepIndex, 10);
        renderProcessTimeline();
        updateProcessDetailPanel();
      });
    });

    updateProcessDetailPanel();
  }

  function updateProcessDetailPanel() {
    if (!dom.processDetailPanel) return;
    const step = PROCESS_STEPS[STATE.activeProcessStep];
    if (!step) return;

    dom.processDetailPanel.innerHTML = `
      <div class="glass-panel p-6 sm:p-10 rounded-2xl border border-white/10 relative overflow-hidden">
        <div class="flex flex-wrap items-center justify-between gap-4 mb-6">
          <div class="flex items-center gap-4">
            <span class="step-number text-amber-500/40">${step.step}</span>
            <div>
              <span class="text-xs font-mono uppercase tracking-widest text-amber-400 font-semibold block">${step.phase}</span>
              <h3 class="font-display text-2xl font-bold text-white">${step.title}</h3>
            </div>
          </div>
        </div>

        <p class="text-base text-zinc-200 mb-4 leading-relaxed font-sans font-medium">
          ${step.summary}
        </p>

        <p class="text-sm text-zinc-400 mb-6 leading-relaxed">
          ${step.detail}
        </p>

        <div class="pt-4 border-t border-white/10 flex items-center justify-between flex-wrap gap-4 text-xs font-mono text-emerald-400 bg-emerald-950/20 p-3.5 rounded-xl border border-emerald-500/20">
          <span class="flex items-center gap-2">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path></svg>
            ${step.metrics}
          </span>
          <div class="flex gap-2">
            <button id="prev-process-btn" class="p-1.5 rounded-full hover:bg-white/10 text-white" ${STATE.activeProcessStep === 0 ? 'disabled style="opacity:0.3"' : ''}>← Prev</button>
            <button id="next-process-btn" class="p-1.5 rounded-full hover:bg-white/10 text-white" ${STATE.activeProcessStep === PROCESS_STEPS.length - 1 ? 'disabled style="opacity:0.3"' : ''}>Next →</button>
          </div>
        </div>
      </div>
    `;

    const prevBtn = document.getElementById('prev-process-btn');
    const nextBtn = document.getElementById('next-process-btn');
    if (prevBtn) {
      prevBtn.addEventListener('click', () => {
        if (STATE.activeProcessStep > 0) {
          STATE.activeProcessStep--;
          renderProcessTimeline();
        }
      });
    }
    if (nextBtn) {
      nextBtn.addEventListener('click', () => {
        if (STATE.activeProcessStep < PROCESS_STEPS.length - 1) {
          STATE.activeProcessStep++;
          renderProcessTimeline();
        }
      });
    }
  }

  // --- Product Detail Modal ---
  function openProductModal(productId) {
    const product = PRODUCTS_DATA.find(p => p.id === productId);
    if (!product) return;

    // Check age verification for alcohol product
    if (product.ageRestricted && !STATE.isAgeVerified) {
      openAgeVerificationModal(productId);
      return;
    }

    STATE.selectedProductForModal = product;
    STATE.selectedVariantIndex = 0;
    STATE.modalQuantity = 1;

    renderProductModalContent();
    dom.productModal.classList.add('open');
    dom.modalBackdrop.classList.add('open');
    document.body.style.overflow = 'hidden';
  }

  function closeProductModal() {
    dom.productModal.classList.remove('open');
    dom.modalBackdrop.classList.remove('open');
    document.body.style.overflow = '';
  }

  function renderProductModalContent() {
    const product = STATE.selectedProductForModal;
    if (!product) return;

    const currentVariant = product.variants[STATE.selectedVariantIndex] || { price: product.price, name: 'Standard' };
    const totalPrice = currentVariant.price * STATE.modalQuantity;

    dom.productModal.innerHTML = `
      <div class="relative p-6 sm:p-8">
        <!-- Close Button -->
        <button 
          id="close-modal-btn" 
          class="absolute top-4 right-4 w-9 h-9 rounded-full bg-black/60 hover:bg-black text-zinc-400 hover:text-white flex items-center justify-center border border-white/10 z-20"
          aria-label="Close modal"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
        </button>

        <div class="grid grid-cols-1 md:grid-cols-12 gap-8">
          <!-- Left: Imagery & Part Identification -->
          <div class="md:col-span-5 flex flex-col">
            <div class="rounded-2xl overflow-hidden bg-black/40 border border-white/10 relative mb-4">
              <img 
                src="${product.image}" 
                alt="${product.name}" 
                class="w-full h-80 object-cover" 
                onerror="this.src='images/hero-palmyra.jpg'"
              />
              <div class="absolute bottom-3 left-3 flex flex-wrap gap-2">
                <span class="badge-tag badge-amber">${product.badge}</span>
                ${product.ageRestricted ? '<span class="badge-tag badge-red">21+ Notice</span>' : ''}
              </div>
            </div>

            <!-- Palm Part Breakdown Card -->
            <div class="p-4 rounded-xl bg-black/30 border border-emerald-500/20 text-xs">
              <span class="text-amber-400 font-mono uppercase tracking-wider block mb-1">Palm Source Fraction</span>
              <p class="text-white font-semibold text-sm mb-1">${product.palmPart}</p>
              <p class="text-zinc-400 leading-relaxed">${product.sustainability}</p>
            </div>
          </div>

          <!-- Right: Details, Tabs, E-Commerce -->
          <div class="md:col-span-7 flex flex-col">
            <div class="mb-4">
              <div class="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-amber-400 mb-1">
                <span>${product.categoryLabel}</span>
                <span>•</span>
                <span>★ ${product.rating} (${product.reviewsCount} reviews)</span>
              </div>
              <h2 class="font-display text-2xl sm:text-3xl font-bold text-white mb-1">${product.name}</h2>
              <p class="text-sm text-zinc-400 italic mb-3">${product.subtitle}</p>
              <p class="text-sm text-zinc-300 leading-relaxed mb-4">${product.fullDescription}</p>
            </div>

            <!-- Tab Buttons -->
            <div class="flex border-b border-white/10 text-xs font-medium gap-6 mb-4">
              <button class="modal-tab-btn active pb-2 border-b-2 border-amber-500 text-white font-semibold" data-tab="specs">Ingredients & Nutrition</button>
              <button class="modal-tab-btn pb-2 border-b-2 border-transparent text-zinc-400 hover:text-white" data-tab="journey">Journey & Packaging</button>
              <button class="modal-tab-btn pb-2 border-b-2 border-transparent text-zinc-400 hover:text-white" data-tab="safety">Safety & Disclaimers</button>
            </div>

            <!-- Tab 1: Specs -->
            <div id="modal-tab-specs" class="modal-tab-content space-y-4 text-xs">
              <div>
                <h5 class="font-mono text-zinc-400 uppercase tracking-wider mb-1.5">Ingredients / Materials</h5>
                <ul class="list-disc list-inside text-zinc-200 space-y-1">
                  ${product.ingredients.map(ing => `<li>${ing}</li>`).join('')}
                </ul>
              </div>

              ${product.nutrition ? `
                <div class="p-3.5 rounded-lg bg-black/40 border border-white/5 font-mono text-[11px]">
                  <div class="flex justify-between font-bold text-white pb-1.5 border-b border-white/10 mb-1.5">
                    <span>NUTRITIONAL PANEL</span>
                    <span>${product.nutrition.servingSize}</span>
                  </div>
                  <div class="grid grid-cols-2 gap-x-4 gap-y-1 text-zinc-300">
                    <div>Calories: <strong class="text-white">${product.nutrition.calories}</strong></div>
                    <div>Carbohydrates: <strong class="text-white">${product.nutrition.carbs}</strong></div>
                    <div>Sugars: <strong class="text-white">${product.nutrition.sugars}</strong></div>
                    <div>Protein: <strong class="text-white">${product.nutrition.protein}</strong></div>
                    ${product.nutrition.potassium ? `<div>Potassium: <strong class="text-white">${product.nutrition.potassium}</strong></div>` : ''}
                    ${product.nutrition.iron ? `<div>Iron: <strong class="text-white">${product.nutrition.iron}</strong></div>` : ''}
                  </div>
                  ${product.glycemicContext ? `
                    <p class="text-[10px] text-amber-300/80 pt-2 border-t border-white/5 mt-2 italic font-sans leading-tight">
                      ${product.glycemicContext}
                    </p>
                  ` : ''}
                </div>
              ` : ''}

              <div class="grid grid-cols-2 gap-3 text-zinc-300">
                <div>
                  <span class="text-zinc-500 uppercase block text-[10px]">Allergen Statement</span>
                  <span>${product.allergens}</span>
                </div>
                <div>
                  <span class="text-zinc-500 uppercase block text-[10px]">Storage</span>
                  <span>${product.storage}</span>
                </div>
              </div>
            </div>

            <!-- Tab 2: Journey -->
            <div id="modal-tab-journey" class="modal-tab-content hidden space-y-3 text-xs">
              <div>
                <h5 class="font-mono text-zinc-400 uppercase tracking-wider mb-1">Production Story</h5>
                <p class="text-zinc-300 leading-relaxed">${product.productionStory}</p>
              </div>
              <div>
                <h5 class="font-mono text-zinc-400 uppercase tracking-wider mb-1">Sustainable Packaging Concept</h5>
                <p class="text-zinc-300 leading-relaxed">${product.packagingConcept}</p>
              </div>
              <div>
                <h5 class="font-mono text-zinc-400 uppercase tracking-wider mb-1">How It Reaches You</h5>
                <p class="text-zinc-300 leading-relaxed">${product.howItReachesYou}</p>
              </div>
            </div>

            <!-- Tab 3: Safety & Disclaimers -->
            <div id="modal-tab-safety" class="modal-tab-content hidden space-y-3 text-xs">
              <div class="safety-warning-banner">
                <strong class="block mb-1 text-red-300 font-bold uppercase tracking-wider">Official Advisory & Safety Information:</strong>
                ${product.safetyDisclaimers}
              </div>

              ${product.ageRestricted ? `
                <div class="p-3 bg-red-950/40 border border-red-500/40 rounded text-red-200">
                  <strong class="block mb-1 font-bold">21+ / 18+ Legal Age Verification</strong>
                  ${product.ageRestrictionText}
                </div>
              ` : ''}

              <div class="p-3 bg-black/40 rounded border border-white/5 text-zinc-400">
                <strong class="text-white block mb-1">Dietary & Health Advice Notice</strong>
                TALARA strictly complies with global food standards. No product on this website is marketed as a medical treatment. Consult a licensed medical practitioner for personalized dietary guidance.
              </div>
            </div>

            <!-- Variant Selector -->
            <div class="mt-6 pt-4 border-t border-white/10">
              <div class="mb-3">
                <span class="text-xs font-mono text-zinc-400 uppercase tracking-wider block mb-1.5">Select Variant</span>
                <div class="flex flex-wrap gap-2">
                  ${product.variants.map((v, idx) => `
                    <button 
                      class="variant-btn py-1.5 px-3 rounded-lg text-xs font-medium border transition-all ${idx === STATE.selectedVariantIndex ? 'bg-amber-950/60 border-amber-400 text-amber-200 shadow-md' : 'bg-white/5 border-white/10 text-zinc-400 hover:text-white'}"
                      data-variant-index="${idx}"
                    >
                      ${v.name} (${formatMoney(v.price)})
                    </button>
                  `).join('')}
                </div>
              </div>

              <!-- Quantity & Add to Cart -->
              <div class="flex items-center gap-4 pt-2">
                <div class="flex items-center border border-white/15 rounded-full bg-black/40 overflow-hidden">
                  <button id="modal-qty-minus" class="px-3.5 py-2 text-zinc-400 hover:text-white transition-colors">-</button>
                  <span id="modal-qty-val" class="px-3 py-2 text-sm font-bold font-mono text-white">${STATE.modalQuantity}</span>
                  <button id="modal-qty-plus" class="px-3.5 py-2 text-zinc-400 hover:text-white transition-colors">+</button>
                </div>

                <button 
                  id="modal-add-to-cart-btn" 
                  class="btn-primary flex-grow py-3 px-6 text-sm"
                >
                  Add to Cart • ${formatMoney(totalPrice)}
                </button>
              </div>
            </div>

          </div>
        </div>
      </div>
    `;

    bindModalEvents();
  }

  function bindModalEvents() {
    const closeBtn = document.getElementById('close-modal-btn');
    if (closeBtn) closeBtn.addEventListener('click', closeProductModal);

    // Tab switching
    document.querySelectorAll('.modal-tab-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        document.querySelectorAll('.modal-tab-btn').forEach(b => {
          b.classList.remove('active', 'border-amber-500', 'text-white', 'font-semibold');
          b.classList.add('border-transparent', 'text-zinc-400');
        });
        btn.classList.add('active', 'border-amber-500', 'text-white', 'font-semibold');
        btn.classList.remove('border-transparent', 'text-zinc-400');

        const tabKey = btn.dataset.tab;
        document.querySelectorAll('.modal-tab-content').forEach(content => content.classList.add('hidden'));
        const targetContent = document.getElementById(`modal-tab-${tabKey}`);
        if (targetContent) targetContent.classList.remove('hidden');
      });
    });

    // Variant Selection
    document.querySelectorAll('.variant-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        STATE.selectedVariantIndex = parseInt(btn.dataset.variantIndex, 10);
        renderProductModalContent();
      });
    });

    // Quantity controls
    const minusBtn = document.getElementById('modal-qty-minus');
    const plusBtn = document.getElementById('modal-qty-plus');
    if (minusBtn) {
      minusBtn.addEventListener('click', () => {
        if (STATE.modalQuantity > 1) {
          STATE.modalQuantity--;
          renderProductModalContent();
        }
      });
    }
    if (plusBtn) {
      plusBtn.addEventListener('click', () => {
        STATE.modalQuantity++;
        renderProductModalContent();
      });
    }

    // Add to Cart
    const addBtn = document.getElementById('modal-add-to-cart-btn');
    if (addBtn) {
      addBtn.addEventListener('click', () => {
        const product = STATE.selectedProductForModal;
        const variant = product.variants[STATE.selectedVariantIndex] || { price: product.price, name: 'Standard' };
        addToCart(product.id, variant.name, variant.price, STATE.modalQuantity);
        closeProductModal();
        openCartDrawer();
      });
    }
  }

  // --- Age Verification Modal ---
  function openAgeVerificationModal(pendingProductId) {
    dom.ageModal.innerHTML = `
      <div class="p-6 sm:p-8 text-center max-w-md mx-auto">
        <div class="w-16 h-16 rounded-full bg-red-950/60 border border-red-500/30 flex items-center justify-center text-red-400 mx-auto mb-4">
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="8" x2="12" y2="12"></line><line x1="12" y1="16" x2="12.01" y2="16"></line></svg>
        </div>
        <span class="badge-tag badge-red mb-2">Age Verification Required</span>
        <h3 class="font-display text-2xl font-bold text-white mb-2">Are you of legal drinking age?</h3>
        <p class="text-xs text-zinc-400 mb-6 leading-relaxed">
          This creation contains naturally fermented palm wine (~5.4% ABV). You must be at least 21 years old in the United States or of legal drinking age in your country of residence.
        </p>

        <div class="p-3 bg-black/40 rounded border border-red-500/20 text-[11px] text-zinc-400 mb-6 text-left">
          <strong>Statutory Warning:</strong> (1) Women should not drink alcoholic beverages during pregnancy due to the risk of birth defects. (2) Consumption impairs ability to drive or operate heavy machinery.
        </div>

        <div class="flex gap-3">
          <button id="age-reject-btn" class="btn-secondary flex-1 py-2.5 text-xs">No, I am Under Age</button>
          <button id="age-confirm-btn" class="btn-primary flex-1 py-2.5 text-xs">Yes, I am 21+ / Legal</button>
        </div>
      </div>
    `;

    dom.ageModal.classList.add('open');
    dom.modalBackdrop.classList.add('open');
    document.body.style.overflow = 'hidden';

    document.getElementById('age-confirm-btn').addEventListener('click', () => {
      STATE.isAgeVerified = true;
      sessionStorage.setItem('talara_age_verified', 'true');
      dom.ageModal.classList.remove('open');
      dom.modalBackdrop.classList.remove('open');
      document.body.style.overflow = '';
      showToast('Legal age verified. Enjoy responsibly.', 'success');
      if (pendingProductId) {
        openProductModal(pendingProductId);
      }
    });

    document.getElementById('age-reject-btn').addEventListener('click', () => {
      dom.ageModal.classList.remove('open');
      dom.modalBackdrop.classList.remove('open');
      document.body.style.overflow = '';
      showToast('Access restricted to non-alcoholic offerings.', 'warn');
    });
  }

  // --- Cart Management ---
  function handleAddToCartDirect(productId) {
    const product = PRODUCTS_DATA.find(p => p.id === productId);
    if (!product) return;

    if (product.ageRestricted && !STATE.isAgeVerified) {
      openAgeVerificationModal(productId);
      return;
    }

    const defaultVariant = product.variants[0] || { price: product.price, name: 'Standard' };
    addToCart(product.id, defaultVariant.name, defaultVariant.price, 1);
    openCartDrawer();
  }

  function addToCart(productId, variantName, price, quantity) {
    const existingIndex = STATE.cart.findIndex(item => item.productId === productId && item.variantName === variantName);
    if (existingIndex > -1) {
      STATE.cart[existingIndex].quantity += quantity;
    } else {
      STATE.cart.push({
        productId,
        variantName,
        price,
        quantity
      });
    }
    saveCart();
    const product = PRODUCTS_DATA.find(p => p.id === productId);
    showToast(`Added "${product.name}" to cart`, 'success');
  }

  function updateCartItemQuantity(index, delta) {
    if (!STATE.cart[index]) return;
    STATE.cart[index].quantity += delta;
    if (STATE.cart[index].quantity <= 0) {
      STATE.cart.splice(index, 1);
    }
    saveCart();
  }

  function removeCartItem(index) {
    if (!STATE.cart[index]) return;
    STATE.cart.splice(index, 1);
    saveCart();
    showToast('Item removed from cart', 'info');
  }

  function getCartCalculations() {
    const subtotal = STATE.cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    let discount = 0;

    if (STATE.appliedPromo) {
      if (STATE.appliedPromo.type === 'percent') {
        discount = subtotal * STATE.appliedPromo.value;
      } else if (STATE.appliedPromo.type === 'fixed') {
        discount = Math.min(subtotal, STATE.appliedPromo.value);
      }
    }

    const shipping = subtotal >= STATE.freeShippingThreshold || subtotal === 0 ? 0 : 8.50;
    const total = Math.max(0, subtotal - discount + shipping);

    return { subtotal, discount, shipping, total };
  }

  function updateCartUI() {
    const totalCount = STATE.cart.reduce((sum, item) => sum + item.quantity, 0);
    if (dom.cartBadge) {
      dom.cartBadge.textContent = totalCount;
      dom.cartBadge.style.display = totalCount > 0 ? 'flex' : 'none';
    }

    const { subtotal, discount, shipping, total } = getCartCalculations();

    if (dom.cartSubtotalEl) dom.cartSubtotalEl.textContent = formatMoney(subtotal);
    if (dom.cartShippingEl) dom.cartShippingEl.textContent = shipping === 0 ? 'FREE' : formatMoney(shipping);
    if (dom.cartTotalEl) dom.cartTotalEl.textContent = formatMoney(total);

    // Free shipping threshold progress bar
    if (dom.cartFreeShippingBar && dom.cartFreeShippingText) {
      if (subtotal === 0) {
        dom.cartFreeShippingBar.style.width = '0%';
        dom.cartFreeShippingText.textContent = `Add ${formatMoney(STATE.freeShippingThreshold)} for Free Climate-Neutral Delivery`;
      } else if (subtotal >= STATE.freeShippingThreshold) {
        dom.cartFreeShippingBar.style.width = '100%';
        dom.cartFreeShippingText.textContent = 'You have unlocked Free Climate-Neutral Delivery!';
      } else {
        const remaining = STATE.freeShippingThreshold - subtotal;
        const pct = Math.min(100, (subtotal / STATE.freeShippingThreshold) * 100);
        dom.cartFreeShippingBar.style.width = `${pct}%`;
        dom.cartFreeShippingText.textContent = `Add ${formatMoney(remaining)} more for Free Shipping`;
      }
    }

    // Promo row display
    if (dom.promoDiscountRow && dom.promoDiscountVal) {
      if (discount > 0) {
        dom.promoDiscountRow.classList.remove('hidden');
        dom.promoDiscountVal.textContent = `-${formatMoney(discount)}`;
      } else {
        dom.promoDiscountRow.classList.add('hidden');
      }
    }

    // Render Items
    if (!dom.cartItemsList) return;

    if (STATE.cart.length === 0) {
      dom.cartItemsList.innerHTML = `
        <div class="text-center py-16 px-4">
          <div class="w-14 h-14 rounded-full bg-white/5 text-zinc-500 flex items-center justify-center mx-auto mb-3">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><circle cx="9" cy="21" r="1"></circle><circle cx="20" cy="21" r="1"></circle><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path></svg>
          </div>
          <p class="text-white font-medium text-sm mb-1">Your cart is empty</p>
          <p class="text-xs text-zinc-400 mb-4">Explore our Palmyra ecosystem to add pure creations.</p>
          <button id="cart-start-shopping-btn" class="btn-amber-outline text-xs py-2 px-4">Browse Collection</button>
        </div>
      `;
      const startBtn = document.getElementById('cart-start-shopping-btn');
      if (startBtn) {
        startBtn.addEventListener('click', () => {
          closeCartDrawer();
          const catSection = document.getElementById('catalog-section');
          if (catSection) catSection.scrollIntoView({ behavior: 'smooth' });
        });
      }
      return;
    }

    dom.cartItemsList.innerHTML = STATE.cart.map((item, index) => {
      const product = PRODUCTS_DATA.find(p => p.id === item.productId);
      if (!product) return '';

      return `
        <div class="flex items-center gap-3.5 p-3.5 rounded-xl bg-black/30 border border-white/5">
          <img 
            src="${product.image}" 
            alt="${product.name}" 
            class="w-16 h-16 rounded-lg object-cover flex-shrink-0 bg-zinc-900" 
            onerror="this.src='images/hero-palmyra.jpg'"
          />

          <div class="flex-grow min-w-0">
            <h4 class="text-sm font-semibold text-white truncate">${product.name}</h4>
            <p class="text-xs text-amber-400/90 font-mono">${item.variantName}</p>
            <div class="flex items-center justify-between mt-2">
              <span class="text-xs font-mono font-bold text-white">${formatMoney(item.price * item.quantity)}</span>

              <div class="flex items-center border border-white/10 rounded-md bg-zinc-900/80">
                <button class="cart-minus-btn px-2 py-0.5 text-xs text-zinc-400 hover:text-white" data-index="${index}">-</button>
                <span class="px-2 text-xs font-mono text-white">${item.quantity}</span>
                <button class="cart-plus-btn px-2 py-0.5 text-xs text-zinc-400 hover:text-white" data-index="${index}">+</button>
              </div>
            </div>
          </div>

          <button 
            class="cart-remove-btn p-1.5 text-zinc-500 hover:text-red-400 transition-colors" 
            data-index="${index}"
            title="Remove item"
            aria-label="Remove item"
          >
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path></svg>
          </button>
        </div>
      `;
    }).join('');

    // Attach cart item events
    document.querySelectorAll('.cart-minus-btn').forEach(btn => {
      btn.addEventListener('click', () => updateCartItemQuantity(parseInt(btn.dataset.index, 10), -1));
    });
    document.querySelectorAll('.cart-plus-btn').forEach(btn => {
      btn.addEventListener('click', () => updateCartItemQuantity(parseInt(btn.dataset.index, 10), 1));
    });
    document.querySelectorAll('.cart-remove-btn').forEach(btn => {
      btn.addEventListener('click', () => removeCartItem(parseInt(btn.dataset.index, 10)));
    });
  }

  function openCartDrawer() {
    dom.cartDrawer.classList.add('open');
    dom.drawerBackdrop.classList.add('open');
    document.body.style.overflow = 'hidden';
  }

  function closeCartDrawer() {
    dom.cartDrawer.classList.remove('open');
    dom.drawerBackdrop.classList.remove('open');
    document.body.style.overflow = '';
  }

  // --- Wishlist Management ---
  function toggleWishlist(productId) {
    const index = STATE.wishlist.indexOf(productId);
    const product = PRODUCTS_DATA.find(p => p.id === productId);

    if (index > -1) {
      STATE.wishlist.splice(index, 1);
      showToast(`Removed "${product.name}" from wishlist`, 'info');
    } else {
      STATE.wishlist.push(productId);
      showToast(`Saved "${product.name}" to wishlist`, 'success');
    }

    saveWishlist();
    renderProductsGrid();
  }

  function updateWishlistUI() {
    if (dom.wishlistBadge) {
      dom.wishlistBadge.textContent = STATE.wishlist.length;
      dom.wishlistBadge.style.display = STATE.wishlist.length > 0 ? 'flex' : 'none';
    }

    if (!dom.wishlistItemsList) return;

    if (STATE.wishlist.length === 0) {
      dom.wishlistItemsList.innerHTML = `
        <div class="text-center py-16 px-4">
          <div class="w-14 h-14 rounded-full bg-white/5 text-zinc-500 flex items-center justify-center mx-auto mb-3">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path></svg>
          </div>
          <p class="text-white font-medium text-sm mb-1">Your wishlist is empty</p>
          <p class="text-xs text-zinc-400">Save items you love to revisit anytime.</p>
        </div>
      `;
      return;
    }

    dom.wishlistItemsList.innerHTML = STATE.wishlist.map((pid, idx) => {
      const product = PRODUCTS_DATA.find(p => p.id === pid);
      if (!product) return '';

      return `
        <div class="flex items-center gap-3.5 p-3.5 rounded-xl bg-black/30 border border-white/5">
          <img 
            src="${product.image}" 
            alt="${product.name}" 
            class="w-16 h-16 rounded-lg object-cover flex-shrink-0 bg-zinc-900" 
            onerror="this.src='images/hero-palmyra.jpg'"
          />

          <div class="flex-grow min-w-0">
            <h4 class="text-sm font-semibold text-white truncate">${product.name}</h4>
            <p class="text-xs font-mono text-amber-400 font-bold mb-2">${formatMoney(product.price)}</p>
            <div class="flex items-center gap-2">
              <button 
                class="move-wishlist-cart-btn btn-amber-outline py-1 px-3 text-[11px]" 
                data-product-id="${product.id}"
              >
                Move to Cart
              </button>
              <button 
                class="remove-wishlist-btn text-xs text-zinc-500 hover:text-red-400" 
                data-product-id="${product.id}"
              >
                Remove
              </button>
            </div>
          </div>
        </div>
      `;
    }).join('');

    document.querySelectorAll('.move-wishlist-cart-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const pid = btn.dataset.productId;
        handleAddToCartDirect(pid);
        toggleWishlist(pid);
      });
    });

    document.querySelectorAll('.remove-wishlist-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const pid = btn.dataset.productId;
        toggleWishlist(pid);
      });
    });
  }

  function openWishlistDrawer() {
    dom.wishlistDrawer.classList.add('open');
    dom.drawerBackdrop.classList.add('open');
    document.body.style.overflow = 'hidden';
  }

  function closeWishlistDrawer() {
    dom.wishlistDrawer.classList.remove('open');
    dom.drawerBackdrop.classList.remove('open');
    document.body.style.overflow = '';
  }

  // --- Checkout Simulation Flow ---
  function openCheckoutModal() {
    if (STATE.cart.length === 0) {
      showToast('Add items to cart before proceeding to checkout', 'warn');
      return;
    }

    closeCartDrawer();
    const { subtotal, discount, shipping, total } = getCartCalculations();

    dom.checkoutModal.innerHTML = `
      <div class="p-6 sm:p-8 max-w-2xl mx-auto">
        <div class="flex items-center justify-between border-b border-white/10 pb-4 mb-6">
          <div>
            <span class="badge-tag badge-amber mb-1 font-mono text-[10px]">Secure Sandbox Checkout</span>
            <h3 class="font-display text-2xl font-bold text-white">Order Finalization</h3>
          </div>
          <button id="close-checkout-btn" class="text-zinc-400 hover:text-white">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
          </button>
        </div>

        <form id="checkout-form" class="space-y-6">
          <!-- Step 1: Shipping Details -->
          <div>
            <h4 class="text-xs font-mono uppercase tracking-widest text-amber-400 font-semibold mb-3">1. Shipping Address & Contact</h4>
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              <input type="text" id="chk-first-name" placeholder="First Name" required value="Sanjay" class="p-2.5 rounded-lg bg-black/40 border border-white/10 text-white focus:border-amber-400 outline-none" />
              <input type="text" id="chk-last-name" placeholder="Last Name" required value="M." class="p-2.5 rounded-lg bg-black/40 border border-white/10 text-white focus:border-amber-400 outline-none" />
              <input type="email" id="chk-email" placeholder="Email Address" required value="sanjay@talara-ecosystem.io" class="sm:col-span-2 p-2.5 rounded-lg bg-black/40 border border-white/10 text-white focus:border-amber-400 outline-none" />
              <input type="text" id="chk-address" placeholder="Delivery Street Address" required value="42 Coastal Palm Avenue, Green Groves" class="sm:col-span-2 p-2.5 rounded-lg bg-black/40 border border-white/10 text-white focus:border-amber-400 outline-none" />
              <input type="text" id="chk-city" placeholder="City" required value="Chennai" class="p-2.5 rounded-lg bg-black/40 border border-white/10 text-white focus:border-amber-400 outline-none" />
              <input type="text" id="chk-postal" placeholder="Postal Code" required value="600001" class="p-2.5 rounded-lg bg-black/40 border border-white/10 text-white focus:border-amber-400 outline-none" />
            </div>
          </div>

          <!-- Step 2: Delivery Speed -->
          <div>
            <h4 class="text-xs font-mono uppercase tracking-widest text-amber-400 font-semibold mb-3">2. Carbon-Neutral Delivery Options</h4>
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              <label class="flex items-start gap-3 p-3 rounded-lg border border-amber-500/40 bg-amber-950/20 cursor-pointer">
                <input type="radio" name="delivery_method" checked class="mt-0.5" />
                <div>
                  <strong class="text-white block">Standard Cold-Chain Express</strong>
                  <span class="text-zinc-400">3–4 Business Days • ${shipping === 0 ? 'FREE' : formatMoney(shipping)}</span>
                </div>
              </label>
              <label class="flex items-start gap-3 p-3 rounded-lg border border-white/10 bg-black/30 cursor-pointer">
                <input type="radio" name="delivery_method" class="mt-0.5" />
                <div>
                  <strong class="text-white block">White-Glove Zero-Tree Freight</strong>
                  <span class="text-zinc-400">Next-Day Refrigerated • +$12.00</span>
                </div>
              </label>
            </div>
          </div>

          <!-- Step 3: Payment Method (Sandbox Placeholder) -->
          <div>
            <h4 class="text-xs font-mono uppercase tracking-widest text-amber-400 font-semibold mb-2">3. Payment Confirmation (Sandbox)</h4>
            <div class="p-3.5 rounded-xl bg-black/50 border border-white/10 text-xs space-y-2">
              <div class="flex items-center justify-between text-zinc-300">
                <span>Payment Mode:</span>
                <span class="font-mono text-amber-300">Simulated Encrypted Card / UPI</span>
              </div>
              <p class="text-[11px] text-zinc-400 leading-relaxed">
                🔒 Demonstration Mode: No real financial charges will be executed. Clicking "Confirm Order" generates a simulated production order receipt.
              </p>
            </div>
          </div>

          <!-- Summary Strip -->
          <div class="p-4 rounded-xl bg-black/60 border border-white/10 flex items-center justify-between text-sm">
            <div>
              <span class="text-xs text-zinc-400 block font-mono">Total Due</span>
              <span class="text-2xl font-bold font-display text-white">${formatMoney(total)}</span>
            </div>
            <button type="submit" class="btn-primary py-3 px-6 text-sm">
              Confirm & Generate Receipt →
            </button>
          </div>
        </form>
      </div>
    `;

    dom.checkoutModal.classList.add('open');
    dom.modalBackdrop.classList.add('open');
    document.body.style.overflow = 'hidden';

    document.getElementById('close-checkout-btn').addEventListener('click', () => {
      dom.checkoutModal.classList.remove('open');
      dom.modalBackdrop.classList.remove('open');
      document.body.style.overflow = '';
    });

    document.getElementById('checkout-form').addEventListener('submit', (e) => {
      e.preventDefault();
      executeSimulatedCheckout();
    });
  }

  function executeSimulatedCheckout() {
    const orderId = 'TLR-' + Math.floor(100000 + Math.random() * 900000);
    const { subtotal, discount, shipping, total } = getCartCalculations();
    const purchasedItems = [...STATE.cart];

    // Clear state
    STATE.cart = [];
    STATE.appliedPromo = null;
    saveCart();

    dom.checkoutModal.classList.remove('open');

    // Show Receipt Modal
    dom.orderSuccessModal.innerHTML = `
      <div class="p-6 sm:p-10 max-w-lg mx-auto text-center">
        <div class="w-16 h-16 rounded-full bg-emerald-950 border border-emerald-500/40 text-emerald-400 flex items-center justify-center mx-auto mb-4">
          <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"></polyline></svg>
        </div>

        <span class="badge-tag badge-emerald mb-2">Order Confirmed & Logged</span>
        <h3 class="font-display text-2xl font-bold text-white mb-1">Thank You for Supporting the Palm</h3>
        <p class="text-xs font-mono text-amber-400 mb-6">Order ID: #${orderId}</p>

        <div class="text-left p-4 rounded-xl bg-black/50 border border-white/10 text-xs space-y-2.5 mb-6 font-mono">
          <div class="text-zinc-400 font-bold border-b border-white/10 pb-1.5 flex justify-between">
            <span>ITEM</span>
            <span>TOTAL</span>
          </div>
          ${purchasedItems.map(item => {
            const p = PRODUCTS_DATA.find(prod => prod.id === item.productId);
            return `
              <div class="flex justify-between text-zinc-300">
                <span class="truncate pr-2">${item.quantity}x ${p ? p.name : 'Item'} (${item.variantName})</span>
                <span>${formatMoney(item.price * item.quantity)}</span>
              </div>
            `;
          }).join('')}
          <div class="border-t border-white/10 pt-2 flex justify-between font-bold text-white text-sm">
            <span>Final Paid</span>
            <span>${formatMoney(total)}</span>
          </div>
        </div>

        <div class="p-3.5 bg-emerald-950/30 border border-emerald-500/20 rounded-xl text-left text-xs mb-6 text-zinc-300">
          <strong class="text-emerald-300 block mb-1">Grove Traceability Initialized:</strong>
          Harvest batch allocation is synchronized with our coastal tapper collective in Tamil Nadu. Your shipment includes biodegradable zero-tree cushioning.
        </div>

        <button id="order-success-close-btn" class="btn-primary w-full py-3 text-sm">
          Return to The Ecosystem
        </button>
      </div>
    `;

    dom.orderSuccessModal.classList.add('open');
    dom.modalBackdrop.classList.add('open');

    document.getElementById('order-success-close-btn').addEventListener('click', () => {
      dom.orderSuccessModal.classList.remove('open');
      dom.modalBackdrop.classList.remove('open');
      document.body.style.overflow = '';
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  // --- Promo Engine ---
  function handleApplyPromo() {
    if (!dom.promoCodeInput) return;
    const code = dom.promoCodeInput.value.trim().toUpperCase();

    if (PROMO_CODES[code]) {
      STATE.appliedPromo = PROMO_CODES[code];
      updateCartUI();
      showToast(`Promo "${code}" applied: ${PROMO_CODES[code].label}`, 'success');
      if (dom.promoFeedbackEl) {
        dom.promoFeedbackEl.textContent = `Applied: ${PROMO_CODES[code].label}`;
        dom.promoFeedbackEl.className = 'text-xs text-emerald-400 mt-1.5 block font-mono';
      }
    } else {
      showToast('Invalid promo code. Try PALMVALUE or BORASSUS', 'warn');
      if (dom.promoFeedbackEl) {
        dom.promoFeedbackEl.textContent = 'Invalid promo code. Try PALMVALUE or BORASSUS';
        dom.promoFeedbackEl.className = 'text-xs text-red-400 mt-1.5 block font-mono';
      }
    }
  }

  // --- Event Listeners Setup ---
  function initEventListeners() {
    initNavbarScroll();

    // Mobile Menu Toggle
    if (dom.navMobileToggle && dom.navMobileMenu) {
      dom.navMobileToggle.addEventListener('click', () => {
        dom.navMobileMenu.classList.toggle('hidden');
      });
      // Close mobile menu when a nav link is clicked
      dom.navMobileMenu.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => dom.navMobileMenu.classList.add('hidden'));
      });
    }

    // Category Filter Pills
    dom.categoryFilterPills.forEach(pill => {
      pill.addEventListener('click', () => {
        STATE.activeCategory = pill.dataset.category;
        STATE.activeAnatomyPart = null; // reset anatomy filter when manually picking a category
        updateCategoryPills();
        renderProductsGrid();
      });
    });

    // Search Input
    if (dom.searchInput) {
      dom.searchInput.addEventListener('input', (e) => {
        STATE.searchQuery = e.target.value;
        renderProductsGrid();
      });
    }

    // Sort Select
    if (dom.sortSelect) {
      dom.sortSelect.addEventListener('change', (e) => {
        STATE.sortBy = e.target.value;
        renderProductsGrid();
      });
    }

    // Drawers & Modal Backdrops
    if (dom.drawerBackdrop) {
      dom.drawerBackdrop.addEventListener('click', () => {
        closeCartDrawer();
        closeWishlistDrawer();
      });
    }

    if (dom.modalBackdrop) {
      dom.modalBackdrop.addEventListener('click', (e) => {
        if (e.target === dom.modalBackdrop) {
          closeProductModal();
          dom.ageModal.classList.remove('open');
          dom.checkoutModal.classList.remove('open');
          dom.orderSuccessModal.classList.remove('open');
          dom.modalBackdrop.classList.remove('open');
          document.body.style.overflow = '';
        }
      });
    }

    // Cart Drawer triggers
    document.querySelectorAll('.open-cart-btn').forEach(btn => {
      btn.addEventListener('click', openCartDrawer);
    });
    const closeCartBtn = document.getElementById('close-cart-btn');
    if (closeCartBtn) closeCartBtn.addEventListener('click', closeCartDrawer);

    // Wishlist Drawer triggers
    document.querySelectorAll('.open-wishlist-btn').forEach(btn => {
      btn.addEventListener('click', openWishlistDrawer);
    });
    const closeWishlistBtn = document.getElementById('close-wishlist-btn');
    if (closeWishlistBtn) closeWishlistBtn.addEventListener('click', closeWishlistDrawer);

    // Checkout Trigger
    const checkoutBtn = document.getElementById('cart-checkout-btn');
    if (checkoutBtn) {
      checkoutBtn.addEventListener('click', openCheckoutModal);
    }

    // Promo code apply
    if (dom.applyPromoBtn) {
      dom.applyPromoBtn.addEventListener('click', handleApplyPromo);
    }

    // B2B Inquiry Form
    if (dom.b2bForm) {
      dom.b2bForm.addEventListener('submit', (e) => {
        e.preventDefault();
        showToast('Inquiry received! Our enterprise team will respond within 24 hours.', 'success');
        dom.b2bForm.reset();
      });
    }

    // Newsletter forms
    document.querySelectorAll('.newsletter-form').forEach(form => {
      form.addEventListener('submit', (e) => {
        e.preventDefault();
        showToast('Subscribed! Welcome to the TALARA Vanguard.', 'success');
        form.reset();
      });
    });

    // Escape key closes modals
    window.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        closeCartDrawer();
        closeWishlistDrawer();
        closeProductModal();
        dom.ageModal.classList.remove('open');
        dom.checkoutModal.classList.remove('open');
        dom.orderSuccessModal.classList.remove('open');
        dom.modalBackdrop.classList.remove('open');
        document.body.style.overflow = '';
      }
    });
  }

  // --- Initialize App ---
  function init() {
    initDOM();
    initEventListeners();
    renderProductsGrid();
    renderAnatomySection();
    renderProcessTimeline();
    updateCartUI();
    updateWishlistUI();
  }

  // Run on DOM ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

})();
