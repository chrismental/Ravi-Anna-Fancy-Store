/**
 * Ravi Anna Fancy Store - Pages JavaScript
 * Category filtering and page-specific functionality
 */

document.addEventListener('DOMContentLoaded', () => {
    // ==================== CATEGORY TAB FILTERING ====================
    const tabBtns = document.querySelectorAll('.tab-btn');
    const productCards = document.querySelectorAll('.products-grid .product-card');

    if (tabBtns.length > 0) {
        tabBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                // Update active tab
                tabBtns.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');

                const category = btn.dataset.category;

                // Filter products with animation
                productCards.forEach((card, index) => {
                    const cardCategory = card.dataset.category;

                    if (category === 'all' || cardCategory === category) {
                        card.classList.remove('hidden');
                        card.style.animation = `fadeInUp 0.5s ease ${index * 0.05}s forwards`;
                    } else {
                        card.classList.add('hidden');
                    }
                });
            });
        });
    }

    // ==================== ADD TO CART FUNCTIONALITY ====================
    const addToCartBtns = document.querySelectorAll('.add-to-cart');
    const cartCount = document.querySelector('.cart-count');

    // Get cart count from localStorage
    let cartItems = parseInt(localStorage.getItem('cartCount')) || 0;
    if (cartCount) {
        cartCount.textContent = cartItems;
    }

    addToCartBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            cartItems++;
            if (cartCount) {
                cartCount.textContent = cartItems;
                localStorage.setItem('cartCount', cartItems);
            }

            // Button animation
            const originalText = btn.textContent;
            btn.textContent = 'Added! ✓';
            btn.style.background = '#27ae60';
            btn.style.color = '#fff';

            setTimeout(() => {
                btn.textContent = originalText;
                btn.style.background = '';
                btn.style.color = '';
            }, 1500);

            // Cart icon animation
            const cartBtn = document.getElementById('cartBtn');
            if (cartBtn) {
                cartBtn.style.transform = 'scale(1.2)';
                setTimeout(() => {
                    cartBtn.style.transform = '';
                }, 300);
            }
        });
    });

    // ==================== WISHLIST FUNCTIONALITY ====================
    const wishlistBtns = document.querySelectorAll('.wishlist');

    wishlistBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.stopPropagation();
            if (btn.textContent === '♡') {
                btn.textContent = '♥';
                btn.style.color = '#ff4757';
            } else {
                btn.textContent = '♡';
                btn.style.color = '';
            }
        });
    });

    // ==================== LOAD MORE FUNCTIONALITY ====================
    const loadMoreBtn = document.querySelector('.load-more-btn');

    if (loadMoreBtn) {
        loadMoreBtn.addEventListener('click', () => {
            loadMoreBtn.textContent = 'Loading...';

            setTimeout(() => {
                loadMoreBtn.textContent = 'No More Products';
                loadMoreBtn.disabled = true;
                loadMoreBtn.style.opacity = '0.5';
                loadMoreBtn.style.cursor = 'not-allowed';
            }, 1000);
        });
    }

    // ==================== SCROLL ANIMATIONS ====================
    const animateElements = document.querySelectorAll('.product-card');

    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                entry.target.style.animation = `fadeInUp 0.6s ease ${index * 0.05}s forwards`;
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    animateElements.forEach(el => observer.observe(el));

    // Add fadeInUp animation
    const style = document.createElement('style');
    style.textContent = `
        @keyframes fadeInUp {
            from {
                opacity: 0;
                transform: translateY(30px);
            }
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }
    `;
    document.head.appendChild(style);

    console.log('✨ Pages JavaScript Loaded');
});
