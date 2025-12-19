/**
 * Ravi Anna Fancy Store - Premium Gift Shop
 * Complete JavaScript Functionality
 */

document.addEventListener('DOMContentLoaded', () => {
    // ==================== STICKY HEADER ====================
    const header = document.getElementById('header');
    const backToTop = document.getElementById('backToTop');

    window.addEventListener('scroll', () => {
        const scrollY = window.scrollY;

        // Sticky header effect
        if (scrollY > 100) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }

        // Back to top button visibility
        if (scrollY > 500) {
            backToTop.classList.add('visible');
        } else {
            backToTop.classList.remove('visible');
        }
    });

    // Back to top click
    backToTop.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    // ==================== MOBILE NAVIGATION ====================
    const hamburger = document.getElementById('hamburger');
    const nav = document.getElementById('nav');
    const navLinks = document.querySelectorAll('.nav-link');

    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        nav.classList.toggle('active');
    });

    // Close mobile menu on link click
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            nav.classList.remove('active');
        });
    });

    // Active nav link on scroll
    const sections = document.querySelectorAll('section[id]');

    window.addEventListener('scroll', () => {
        const scrollY = window.scrollY + 200;

        sections.forEach(section => {
            const sectionHeight = section.offsetHeight;
            const sectionTop = section.offsetTop - 100;
            const sectionId = section.getAttribute('id');
            const navLink = document.querySelector(`.nav-link[href="#${sectionId}"]`);

            if (navLink && scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                navLinks.forEach(link => link.classList.remove('active'));
                navLink.classList.add('active');
            }
        });
    });

    // ==================== SEARCH MODAL ====================
    const searchBtn = document.getElementById('searchBtn');
    const searchModal = document.getElementById('searchModal');
    const searchClose = document.getElementById('searchClose');

    searchBtn.addEventListener('click', () => {
        searchModal.classList.add('active');
        document.body.style.overflow = 'hidden';
    });

    searchClose.addEventListener('click', () => {
        searchModal.classList.remove('active');
        document.body.style.overflow = '';
    });

    searchModal.addEventListener('click', (e) => {
        if (e.target === searchModal) {
            searchModal.classList.remove('active');
            document.body.style.overflow = '';
        }
    });

    // ==================== HERO SLIDER ====================
    const heroSlider = document.getElementById('heroSlider');
    const heroSlides = heroSlider.querySelectorAll('.hero-slide');
    const heroPrev = document.getElementById('heroPrev');
    const heroNext = document.getElementById('heroNext');
    const heroDots = document.getElementById('heroDots');

    let currentSlide = 0;
    let heroInterval;

    // Create dots
    heroSlides.forEach((_, index) => {
        const dot = document.createElement('span');
        dot.classList.add('dot');
        if (index === 0) dot.classList.add('active');
        dot.addEventListener('click', () => goToSlide(index));
        heroDots.appendChild(dot);
    });

    const dots = heroDots.querySelectorAll('.dot');

    function goToSlide(index) {
        heroSlides[currentSlide].classList.remove('active');
        dots[currentSlide].classList.remove('active');

        currentSlide = index;
        if (currentSlide >= heroSlides.length) currentSlide = 0;
        if (currentSlide < 0) currentSlide = heroSlides.length - 1;

        heroSlides[currentSlide].classList.add('active');
        dots[currentSlide].classList.add('active');
    }

    function nextSlide() {
        goToSlide(currentSlide + 1);
    }

    function prevSlide() {
        goToSlide(currentSlide - 1);
    }

    heroNext.addEventListener('click', () => {
        nextSlide();
        resetAutoplay();
    });

    heroPrev.addEventListener('click', () => {
        prevSlide();
        resetAutoplay();
    });

    function startAutoplay() {
        heroInterval = setInterval(nextSlide, 5000);
    }

    function resetAutoplay() {
        clearInterval(heroInterval);
        startAutoplay();
    }

    startAutoplay();

    // ==================== PRODUCTS CAROUSEL ====================
    const productsCarousel = document.getElementById('productsCarousel');
    const carouselPrev = document.getElementById('carouselPrev');
    const carouselNext = document.getElementById('carouselNext');

    const scrollAmount = 300;

    carouselNext.addEventListener('click', () => {
        productsCarousel.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    });

    carouselPrev.addEventListener('click', () => {
        productsCarousel.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
    });

    // ==================== CATEGORY FILTER (NEW ARRIVALS) ====================
    const filterBtns = document.querySelectorAll('.filter-btn');
    const productCards = document.querySelectorAll('#newArrivalsGrid .product-card');

    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Update active button
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            const filter = btn.dataset.filter;

            productCards.forEach(card => {
                const category = card.dataset.category;

                if (filter === 'all' || category === filter) {
                    card.classList.remove('hidden');
                    card.style.animation = 'fadeIn 0.5s ease forwards';
                } else {
                    card.classList.add('hidden');
                }
            });
        });
    });

    // ==================== QUICK VIEW MODAL ====================
    const quickViewBtns = document.querySelectorAll('.quick-view');
    const quickViewModal = document.getElementById('quickViewModal');
    const modalClose = document.getElementById('modalClose');
    const modalImage = document.getElementById('modalImage');
    const modalTitle = document.getElementById('modalTitle');
    const modalReviews = document.getElementById('modalReviews');
    const modalPrice = document.getElementById('modalPrice');
    const modalOriginalPrice = document.getElementById('modalOriginalPrice');
    const modalDesc = document.getElementById('modalDesc');
    const modalQty = document.getElementById('modalQty');

    // Product data for quick view
    const products = {
        1: {
            name: 'Pearl Drop Earrings',
            image: 'https://images.unsplash.com/photo-1602173574767-37ac01994b2a?w=500',
            price: '₹1,299',
            originalPrice: '₹1,999',
            reviews: '48 reviews',
            desc: 'Elegant pearl drop earrings featuring lustrous freshwater pearls set in premium gold-plated metal. Perfect for weddings, parties, and special occasions. These timeless pieces add instant glamour to any outfit.'
        },
        2: {
            name: 'Gold Chain Necklace',
            image: 'https://images.unsplash.com/photo-1611085583191-a3b181a88401?w=500',
            price: '₹2,499',
            originalPrice: '₹3,499',
            reviews: '32 reviews',
            desc: 'Stunning gold chain necklace crafted with precision and care. This versatile piece can be worn alone or layered with other necklaces for a trendy look. Made with hypoallergenic materials.'
        },
        3: {
            name: 'Crystal Bracelet Set',
            image: 'https://images.unsplash.com/photo-1573408301185-9146fe634ad0?w=500',
            price: '₹899',
            originalPrice: '₹1,299',
            reviews: '67 reviews',
            desc: 'Beautiful set of 3 crystal bracelets featuring sparkling stones in rose gold settings. Adjustable sizing fits most wrists. Stack them together or wear individually for different looks.'
        },
        4: {
            name: 'Designer Clutch Bag',
            image: 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=500',
            price: '₹1,799',
            originalPrice: '₹2,299',
            reviews: '29 reviews',
            desc: 'Chic designer clutch bag perfect for evening events. Features a detachable chain strap, magnetic closure, and interior pocket. Made with premium faux leather and gold hardware.'
        },
        5: {
            name: 'Statement Ring Set',
            image: 'https://images.unsplash.com/photo-1603561591411-07134e71a2a9?w=500',
            price: '₹699',
            originalPrice: '₹999',
            reviews: '54 reviews',
            desc: 'Set of 5 trendy statement rings featuring various designs including geometric patterns and nature-inspired motifs. Mix and match to create your own unique style.'
        },
        6: {
            name: 'Premium Gift Hamper',
            image: 'https://images.unsplash.com/photo-1549465220-1a8b9238cd48?w=500',
            price: '₹2,999',
            originalPrice: '₹4,499',
            reviews: '89 reviews',
            desc: 'Luxurious gift hamper containing premium chocolates, scented candles, bath essentials, and a beautiful jewelry piece. Presented in an elegant gift box with ribbon.'
        },
        7: {
            name: 'Traditional Jhumka Set',
            image: 'https://images.unsplash.com/photo-1599643477877-530eb83abc8e?w=500',
            price: '₹1,599',
            originalPrice: '₹2,299',
            reviews: '156 reviews',
            desc: 'Exquisite traditional jhumka earrings featuring intricate craftsmanship and stunning design. Perfect for festivals, weddings, and ethnic occasions. Lightweight and comfortable to wear.'
        },
        8: {
            name: 'Leather Tote Bag',
            image: 'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=500',
            price: '₹3,299',
            originalPrice: '₹4,999',
            reviews: '98 reviews',
            desc: 'Spacious leather tote bag perfect for work or travel. Features multiple compartments, secure zippers, and comfortable shoulder straps. Made with genuine leather.'
        },
        9: {
            name: 'Diamond Pendant',
            image: 'https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=500',
            price: '₹4,199',
            originalPrice: '₹5,999',
            reviews: '73 reviews',
            desc: 'Stunning diamond pendant necklace featuring a brilliant-cut simulated diamond in a classic setting. Comes with an 18-inch chain and elegant gift box.'
        },
        10: {
            name: 'Wedding Gift Set',
            image: 'https://images.unsplash.com/photo-1513885535751-8b9238bd345a?w=500',
            price: '₹5,499',
            originalPrice: '₹7,999',
            reviews: '124 reviews',
            desc: 'Complete wedding gift set including decorative items, couple accessories, and keepsake boxes. Beautifully packaged in premium gift wrapping with personalization options.'
        },
        11: {
            name: 'Rose Gold Hoops',
            image: 'https://images.unsplash.com/photo-1630019852942-f89202989a59?w=500',
            price: '₹999',
            originalPrice: '',
            reviews: '12 reviews',
            desc: 'Trendy rose gold hoop earrings perfect for everyday wear. Lightweight design with secure closure. Made with hypoallergenic materials suitable for sensitive ears.'
        },
        12: {
            name: 'Sling Crossbody',
            image: 'https://images.unsplash.com/photo-1566150905458-1bf1fc113f0d?w=500',
            price: '₹1,899',
            originalPrice: '',
            reviews: '8 reviews',
            desc: 'Stylish sling crossbody bag perfect for casual outings. Features adjustable strap, multiple pockets, and secure zipper closure. Available in multiple colors.'
        },
        13: {
            name: 'Birthday Surprise Box',
            image: 'https://images.unsplash.com/photo-1607469256872-48f39c57bb3a?w=500',
            price: '₹2,499',
            originalPrice: '',
            reviews: '15 reviews',
            desc: 'Ultimate birthday surprise box filled with treats, decorations, and a special gift. Perfect for making birthdays extra memorable. Customizable with name and message.'
        },
        14: {
            name: 'Layered Necklace',
            image: 'https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=500',
            price: '₹1,799',
            originalPrice: '',
            reviews: '22 reviews',
            desc: 'Elegant layered necklace set featuring three delicate chains of varying lengths. Creates a sophisticated layered look without the hassle of tangling. Adjustable length.'
        }
    };

    quickViewBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const productId = btn.dataset.id;
            const product = products[productId];

            if (product) {
                modalImage.src = product.image;
                modalTitle.textContent = product.name;
                modalReviews.textContent = `(${product.reviews})`;
                modalPrice.textContent = product.price;
                modalOriginalPrice.textContent = product.originalPrice;
                modalDesc.textContent = product.desc;
                modalQty.value = 1;

                quickViewModal.classList.add('active');
                document.body.style.overflow = 'hidden';
            }
        });
    });

    modalClose.addEventListener('click', () => {
        quickViewModal.classList.remove('active');
        document.body.style.overflow = '';
    });

    quickViewModal.addEventListener('click', (e) => {
        if (e.target === quickViewModal) {
            quickViewModal.classList.remove('active');
            document.body.style.overflow = '';
        }
    });

    // Quantity selector
    const qtyMinus = document.querySelector('.qty-btn.minus');
    const qtyPlus = document.querySelector('.qty-btn.plus');

    qtyMinus.addEventListener('click', () => {
        if (modalQty.value > 1) {
            modalQty.value = parseInt(modalQty.value) - 1;
        }
    });

    qtyPlus.addEventListener('click', () => {
        if (modalQty.value < 10) {
            modalQty.value = parseInt(modalQty.value) + 1;
        }
    });

    // ==================== IMAGE MODAL (INSTAGRAM) ====================
    const instagramItems = document.querySelectorAll('.instagram-item');
    const imageModal = document.getElementById('imageModal');
    const imageModalClose = document.getElementById('imageModalClose');
    const imageModalImg = document.getElementById('imageModalImg');

    instagramItems.forEach(item => {
        item.addEventListener('click', () => {
            const img = item.querySelector('img');
            imageModalImg.src = img.src.replace('w=300&h=300', 'w=800&h=800');
            imageModal.classList.add('active');
            document.body.style.overflow = 'hidden';
        });
    });

    imageModalClose.addEventListener('click', () => {
        imageModal.classList.remove('active');
        document.body.style.overflow = '';
    });

    imageModal.addEventListener('click', (e) => {
        if (e.target === imageModal) {
            imageModal.classList.remove('active');
            document.body.style.overflow = '';
        }
    });

    // ==================== TESTIMONIALS CAROUSEL ====================
    const testimonialCards = document.querySelectorAll('.testimonial-card');
    const testimonialDotsContainer = document.getElementById('testimonialDots');
    let currentTestimonial = 0;

    // Create dots
    testimonialCards.forEach((_, index) => {
        const dot = document.createElement('span');
        dot.classList.add('dot');
        if (index === 0) dot.classList.add('active');
        dot.addEventListener('click', () => goToTestimonial(index));
        testimonialDotsContainer.appendChild(dot);
    });

    const testimonialDots = testimonialDotsContainer.querySelectorAll('.dot');

    function goToTestimonial(index) {
        testimonialCards[currentTestimonial].classList.remove('active');
        testimonialDots[currentTestimonial].classList.remove('active');

        currentTestimonial = index;
        if (currentTestimonial >= testimonialCards.length) currentTestimonial = 0;

        testimonialCards[currentTestimonial].classList.add('active');
        testimonialDots[currentTestimonial].classList.add('active');
    }

    // Auto-rotate testimonials
    setInterval(() => {
        goToTestimonial(currentTestimonial + 1);
    }, 6000);

    // ==================== GIFT FINDER ====================
    const findGiftBtn = document.getElementById('findGiftBtn');
    const giftResults = document.getElementById('giftResults');
    const giftOccasion = document.getElementById('giftOccasion');
    const giftBudget = document.getElementById('giftBudget');
    const giftRecipient = document.getElementById('giftRecipient');

    const giftRecommendations = {
        birthday: [
            { name: 'Birthday Surprise Box', price: '₹2,499', image: 'https://images.unsplash.com/photo-1607469256872-48f39c57bb3a?w=100' },
            { name: 'Crystal Bracelet Set', price: '₹899', image: 'https://images.unsplash.com/photo-1573408301185-9146fe634ad0?w=100' },
            { name: 'Rose Gold Hoops', price: '₹999', image: 'https://images.unsplash.com/photo-1630019852942-f89202989a59?w=100' },
            { name: 'Designer Clutch', price: '₹1,799', image: 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=100' }
        ],
        wedding: [
            { name: 'Wedding Gift Set', price: '₹5,499', image: 'https://images.unsplash.com/photo-1513885535751-8b9238bd345a?w=100' },
            { name: 'Traditional Jhumkas', price: '₹1,599', image: 'https://images.unsplash.com/photo-1599643477877-530eb83abc8e?w=100' },
            { name: 'Gold Chain Necklace', price: '₹2,499', image: 'https://images.unsplash.com/photo-1611085583191-a3b181a88401?w=100' },
            { name: 'Premium Gift Hamper', price: '₹2,999', image: 'https://images.unsplash.com/photo-1549465220-1a8b9238cd48?w=100' }
        ],
        anniversary: [
            { name: 'Diamond Pendant', price: '₹4,199', image: 'https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=100' },
            { name: 'Pearl Drop Earrings', price: '₹1,299', image: 'https://images.unsplash.com/photo-1602173574767-37ac01994b2a?w=100' },
            { name: 'Layered Necklace', price: '₹1,799', image: 'https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=100' },
            { name: 'Leather Tote Bag', price: '₹3,299', image: 'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=100' }
        ],
        festival: [
            { name: 'Traditional Jhumkas', price: '₹1,599', image: 'https://images.unsplash.com/photo-1599643477877-530eb83abc8e?w=100' },
            { name: 'Premium Gift Hamper', price: '₹2,999', image: 'https://images.unsplash.com/photo-1549465220-1a8b9238cd48?w=100' },
            { name: 'Statement Ring Set', price: '₹699', image: 'https://images.unsplash.com/photo-1603561591411-07134e71a2a9?w=100' },
            { name: 'Gold Chain Necklace', price: '₹2,499', image: 'https://images.unsplash.com/photo-1611085583191-a3b181a88401?w=100' }
        ],
        valentines: [
            { name: 'Pearl Drop Earrings', price: '₹1,299', image: 'https://images.unsplash.com/photo-1602173574767-37ac01994b2a?w=100' },
            { name: 'Diamond Pendant', price: '₹4,199', image: 'https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=100' },
            { name: 'Crystal Bracelet Set', price: '₹899', image: 'https://images.unsplash.com/photo-1573408301185-9146fe634ad0?w=100' },
            { name: 'Rose Gold Hoops', price: '₹999', image: 'https://images.unsplash.com/photo-1630019852942-f89202989a59?w=100' }
        ]
    };

    findGiftBtn.addEventListener('click', () => {
        const occasion = giftOccasion.value;

        if (!occasion) {
            giftResults.innerHTML = `
                <div class="gift-results-placeholder">
                    <span class="gift-icon">⚠️</span>
                    <p>Please select at least an occasion to get recommendations</p>
                </div>
            `;
            return;
        }

        const recommendations = giftRecommendations[occasion] || giftRecommendations.birthday;

        let html = '<div class="gift-recommendations">';
        recommendations.forEach(item => {
            html += `
                <div class="gift-rec-card">
                    <img src="${item.image}" alt="${item.name}">
                    <div class="gift-rec-info">
                        <h4>${item.name}</h4>
                        <span>${item.price}</span>
                    </div>
                </div>
            `;
        });
        html += '</div>';

        giftResults.innerHTML = html;
    });

    // ==================== NEWSLETTER FORM ====================
    const newsletterForm = document.getElementById('newsletterForm');

    newsletterForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const email = newsletterForm.querySelector('input').value;

        if (email) {
            alert('Thank you for subscribing! You will receive exclusive offers at ' + email);
            newsletterForm.reset();
        }
    });

    // ==================== ADD TO CART ANIMATION ====================
    const addToCartBtns = document.querySelectorAll('.add-to-cart');
    const cartCount = document.querySelector('.cart-count');
    let cartItems = 3; // Initial count

    addToCartBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            cartItems++;
            cartCount.textContent = cartItems;

            // Button animation
            btn.textContent = 'Added! ✓';
            btn.style.background = '#27ae60';

            setTimeout(() => {
                btn.textContent = 'Add to Cart';
                btn.style.background = '';
            }, 1500);

            // Cart icon animation
            const cartBtn = document.getElementById('cartBtn');
            cartBtn.style.transform = 'scale(1.2)';
            setTimeout(() => {
                cartBtn.style.transform = '';
            }, 300);
        });
    });

    // Modal add to cart button
    const modalCartBtn = document.querySelector('.modal-cart-btn');
    modalCartBtn.addEventListener('click', () => {
        const qty = parseInt(modalQty.value);
        cartItems += qty;
        cartCount.textContent = cartItems;

        modalCartBtn.textContent = 'Added! ✓';
        modalCartBtn.style.background = '#27ae60';

        setTimeout(() => {
            modalCartBtn.textContent = 'Add to Cart';
            modalCartBtn.style.background = '';
            quickViewModal.classList.remove('active');
            document.body.style.overflow = '';
        }, 1000);
    });

    // ==================== WISHLIST TOGGLE ====================
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

    // ==================== SCROLL ANIMATIONS ====================
    const animateElements = document.querySelectorAll('.animate-on-scroll');

    const observerOptions = {
        threshold: 0.2,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animated');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    animateElements.forEach(el => observer.observe(el));

    // ==================== KEYBOARD NAVIGATION ====================
    document.addEventListener('keydown', (e) => {
        // Close modals with Escape
        if (e.key === 'Escape') {
            searchModal.classList.remove('active');
            quickViewModal.classList.remove('active');
            imageModal.classList.remove('active');
            document.body.style.overflow = '';
        }

        // Hero slider arrow keys
        if (e.key === 'ArrowRight') {
            nextSlide();
            resetAutoplay();
        }
        if (e.key === 'ArrowLeft') {
            prevSlide();
            resetAutoplay();
        }
    });

    // ==================== SMOOTH REVEAL ON LOAD ====================
    setTimeout(() => {
        document.body.classList.add('loaded');
    }, 100);

    console.log('✨ Ravi Anna Fancy Store - Script Loaded Successfully');
});
