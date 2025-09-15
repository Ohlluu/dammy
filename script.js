// ===== MOYIN NAILS & LASH - WEBSITE FUNCTIONALITY ===== //

// ===== LOADING SCREEN ===== //
class LoadingScreen {
    constructor() {
        this.loadingScreen = document.getElementById('loadingScreen');
        this.init();
    }
    
    init() {
        // Hide loading screen after page loads
        window.addEventListener('load', () => {
            setTimeout(() => {
                this.hideLoadingScreen();
            }, 1500);
        });
    }
    
    hideLoadingScreen() {
        this.loadingScreen.classList.add('hidden');
        
        // Remove from DOM after animation completes
        setTimeout(() => {
            this.loadingScreen.remove();
        }, 500);
    }
}

// ===== NAVIGATION ===== //
class Navigation {
    constructor() {
        this.navbar = document.getElementById('navbar');
        this.navToggle = document.getElementById('navToggle');
        this.navMenu = document.getElementById('navMenu');
        this.navLinks = document.querySelectorAll('.nav-link');
        
        this.init();
    }
    
    init() {
        this.setupScrollEffect();
        this.setupSmoothScrolling();
        this.setupActiveLink();
        this.setupMobileMenu();
    }
    
    setupScrollEffect() {
        let lastScrollY = window.scrollY;
        
        window.addEventListener('scroll', () => {
            const currentScrollY = window.scrollY;
            
            // Add scrolled class for styling
            if (currentScrollY > 50) {
                this.navbar.classList.add('scrolled');
            } else {
                this.navbar.classList.remove('scrolled');
            }
            
            lastScrollY = currentScrollY;
        });
    }
    
    setupSmoothScrolling() {
        this.navLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const targetId = link.getAttribute('href');
                const targetSection = document.querySelector(targetId);
                
                if (targetSection) {
                    const offsetTop = targetSection.offsetTop - 80;
                    window.scrollTo({
                        top: offsetTop,
                        behavior: 'smooth'
                    });
                }
            });
        });
    }
    
    setupActiveLink() {
        const sections = document.querySelectorAll('section[id]');
        
        window.addEventListener('scroll', () => {
            const scrollPosition = window.scrollY + 100;
            
            sections.forEach(section => {
                const sectionTop = section.offsetTop;
                const sectionHeight = section.offsetHeight;
                const sectionId = section.getAttribute('id');
                
                if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                    this.navLinks.forEach(link => link.classList.remove('active'));
                    const activeLink = document.querySelector(`a[href="#${sectionId}"]`);
                    if (activeLink) activeLink.classList.add('active');
                }
            });
        });
    }
    
    setupMobileMenu() {
        if (this.navToggle) {
            this.navToggle.addEventListener('click', () => {
                this.navMenu.classList.toggle('active');
                this.navToggle.classList.toggle('active');
            });
            
            // Close menu when clicking on a link
            this.navLinks.forEach(link => {
                link.addEventListener('click', () => {
                    this.navMenu.classList.remove('active');
                    this.navToggle.classList.remove('active');
                });
            });
            
            // Close menu when clicking outside
            document.addEventListener('click', (e) => {
                if (!this.navbar.contains(e.target)) {
                    this.navMenu.classList.remove('active');
                    this.navToggle.classList.remove('active');
                }
            });
        }
    }
}

// ===== GALLERY FILTER ===== //
class GalleryFilter {
    constructor() {
        this.filterBtns = document.querySelectorAll('.filter-btn');
        this.galleryItems = document.querySelectorAll('.gallery-item');
        
        this.init();
    }
    
    init() {
        this.filterBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                const filterValue = btn.getAttribute('data-filter');
                this.filterGallery(filterValue);
                this.updateActiveFilter(btn);
            });
        });
    }
    
    filterGallery(filter) {
        this.galleryItems.forEach(item => {
            const categories = item.getAttribute('data-category').split(' ');
            
            if (filter === 'all' || categories.includes(filter)) {
                item.style.display = 'block';
                item.style.animation = 'fadeInUp 0.5s ease forwards';
            } else {
                item.style.display = 'none';
            }
        });
    }
    
    updateActiveFilter(activeBtn) {
        this.filterBtns.forEach(btn => btn.classList.remove('active'));
        activeBtn.classList.add('active');
    }
}

// ===== INTERSECTION OBSERVER FOR ANIMATIONS ===== //
class ScrollAnimations {
    constructor() {
        this.observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };
        
        this.init();
    }
    
    init() {
        this.setupIntersectionObserver();
    }
    
    setupIntersectionObserver() {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate');
                }
            });
        }, this.observerOptions);
        
        // Observe elements for animation
        const animatedElements = document.querySelectorAll(`
            .service-card,
            .gallery-item,
            .contact-card,
            .feature
        `);
        
        animatedElements.forEach(el => observer.observe(el));
    }
}

// ===== PERFORMANCE OPTIMIZATION ===== //
class PerformanceOptimizer {
    constructor() {
        this.init();
    }
    
    init() {
        this.lazyLoadImages();
        this.preloadCriticalImages();
    }
    
    lazyLoadImages() {
        const images = document.querySelectorAll('img[loading="lazy"]');
        
        if ('IntersectionObserver' in window) {
            const imageObserver = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const img = entry.target;
                        img.src = img.dataset.src || img.src;
                        img.classList.remove('lazy');
                        imageObserver.unobserve(img);
                    }
                });
            });
            
            images.forEach(img => imageObserver.observe(img));
        }
    }
    
    preloadCriticalImages() {
        const criticalImages = [
            'https://images.unsplash.com/photo-1604654894610-df63bc536371',
            'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b',
            'https://images.unsplash.com/photo-1522338242992-e1a54906a8da'
        ];
        
        criticalImages.forEach(src => {
            const link = document.createElement('link');
            link.rel = 'preload';
            link.as = 'image';
            link.href = src;
            document.head.appendChild(link);
        });
    }
}

// ===== WHATSAPP INTEGRATION ===== //
class WhatsAppIntegration {
    constructor() {
        this.init();
    }
    
    init() {
        this.setupServiceBooking();
    }
    
    setupServiceBooking() {
        // Enhanced WhatsApp messages for different services
        const serviceButtons = {
            'nail-services': {
                message: `Hello Moyin! 💅\n\nI'm interested in booking nail services:\n\n• Nail art & design\n• Manicure/Pedicure\n• Custom nail work\n\nPlease let me know your availability and pricing. Thank you!`
            },
            'lash-services': {
                message: `Hello Moyin! 👁️\n\nI'd like to book eyelash extension services:\n\n• Classic/Volume/Hybrid lashes\n• New set or fill\n• Consultation needed\n\nPlease share your availability and rates. Thanks!`
            },
            'consultation': {
                message: `Hello Moyin! ✨\n\nI'd like to schedule a beauty consultation to discuss:\n\n• Nail care options\n• Lash extension types\n• Custom recommendations\n\nWhen would be a good time to visit? Thank you!`
            }
        };
        
        // Add enhanced tracking for WhatsApp clicks
        document.querySelectorAll('a[href*="wa.me"]').forEach(link => {
            link.addEventListener('click', () => {
                // Track engagement
                console.log('WhatsApp booking initiated');
                
                // Add subtle success feedback
                this.showBookingFeedback();
            });
        });
    }
    
    showBookingFeedback() {
        // Create temporary feedback message
        const feedback = document.createElement('div');
        feedback.innerHTML = `
            <div style="
                position: fixed;
                bottom: 20px;
                left: 50%;
                transform: translateX(-50%);
                background: linear-gradient(135deg, #E91E63, #F7931E);
                color: white;
                padding: 12px 24px;
                border-radius: 25px;
                font-weight: 600;
                font-size: 14px;
                z-index: 10000;
                animation: slideUp 0.3s ease;
            ">
                💬 Opening WhatsApp... We'll respond quickly!
            </div>
        `;
        
        document.body.appendChild(feedback);
        
        // Remove after 3 seconds
        setTimeout(() => {
            feedback.remove();
        }, 3000);
    }
}

// ===== MOBILE OPTIMIZATION ===== //
class MobileOptimization {
    constructor() {
        this.init();
    }
    
    init() {
        this.setupTouchInteractions();
        this.optimizeForMobile();
        this.setupViewportHeight();
    }
    
    setupTouchInteractions() {
        // Enhanced touch experience for service cards
        const cards = document.querySelectorAll('.service-card, .gallery-item');
        
        cards.forEach(card => {
            card.addEventListener('touchstart', () => {
                card.classList.add('touch-active');
            });
            
            card.addEventListener('touchend', () => {
                setTimeout(() => {
                    card.classList.remove('touch-active');
                }, 150);
            });
        });
    }
    
    optimizeForMobile() {
        // Disable hover effects on touch devices
        if ('ontouchstart' in window) {
            document.body.classList.add('touch-device');
        }
        
        // Optimize button sizes for mobile
        this.optimizeButtonSizes();
    }
    
    optimizeButtonSizes() {
        const buttons = document.querySelectorAll('.btn');
        
        if (window.innerWidth <= 768) {
            buttons.forEach(btn => {
                btn.style.minHeight = '48px'; // Apple's recommended touch target
                btn.style.fontSize = '16px';  // Prevent zoom on iOS
            });
        }
    }
    
    setupViewportHeight() {
        // Fix viewport height issues on mobile browsers
        const setVH = () => {
            const vh = window.innerHeight * 0.01;
            document.documentElement.style.setProperty('--vh', `${vh}px`);
        };
        
        setVH();
        window.addEventListener('resize', setVH);
        window.addEventListener('orientationchange', () => {
            setTimeout(setVH, 100);
        });
    }
}

// ===== BUSINESS ANALYTICS ===== //
class BusinessAnalytics {
    constructor() {
        this.init();
    }
    
    init() {
        this.trackUserEngagement();
        this.trackServiceInterest();
    }
    
    trackUserEngagement() {
        // Track scroll depth
        let maxScroll = 0;
        
        window.addEventListener('scroll', () => {
            const scrollPercent = Math.round(
                (window.scrollY / (document.body.scrollHeight - window.innerHeight)) * 100
            );
            
            if (scrollPercent > maxScroll) {
                maxScroll = scrollPercent;
                
                // Log engagement milestones
                if (maxScroll >= 25 && maxScroll < 50) {
                    console.log('📊 User viewed 25% of content');
                } else if (maxScroll >= 50 && maxScroll < 75) {
                    console.log('📊 User viewed 50% of content');
                } else if (maxScroll >= 75) {
                    console.log('📊 User viewed 75% of content - High engagement!');
                }
            }
        });
        
        // Track time on site
        const startTime = Date.now();
        window.addEventListener('beforeunload', () => {
            const timeSpent = Math.round((Date.now() - startTime) / 1000);
            console.log(`📊 Time on site: ${timeSpent} seconds`);
        });
    }
    
    trackServiceInterest() {
        // Track which services users are most interested in
        const serviceCards = document.querySelectorAll('.service-card');
        
        serviceCards.forEach((card, index) => {
            const serviceName = card.querySelector('.service-title').textContent;
            
            card.addEventListener('click', () => {
                console.log(`📊 Service interest: ${serviceName}`);
            });
            
            // Track hover/touch interactions
            let interactionTimer;
            card.addEventListener('mouseenter', () => {
                interactionTimer = setTimeout(() => {
                    console.log(`📊 Extended interest in: ${serviceName}`);
                }, 2000);
            });
            
            card.addEventListener('mouseleave', () => {
                clearTimeout(interactionTimer);
            });
        });
    }
}

// ===== ACCESSIBILITY ENHANCEMENTS ===== //
class AccessibilityEnhancer {
    constructor() {
        this.init();
    }
    
    init() {
        this.addKeyboardNavigation();
        this.enhanceScreenReaderSupport();
        this.addFocusVisibility();
    }
    
    addKeyboardNavigation() {
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Tab') {
                document.body.classList.add('keyboard-navigation');
            }
        });
        
        document.addEventListener('mousedown', () => {
            document.body.classList.remove('keyboard-navigation');
        });
    }
    
    enhanceScreenReaderSupport() {
        // Add appropriate ARIA labels
        const buttons = document.querySelectorAll('.btn');
        buttons.forEach(btn => {
            if (!btn.getAttribute('aria-label')) {
                const text = btn.textContent.trim();
                btn.setAttribute('aria-label', text);
            }
        });
        
        // Enhance gallery items
        const galleryItems = document.querySelectorAll('.gallery-item');
        galleryItems.forEach((item, index) => {
            item.setAttribute('role', 'img');
            item.setAttribute('tabindex', '0');
            const alt = item.querySelector('img').alt;
            item.setAttribute('aria-label', alt || `Gallery image ${index + 1}`);
        });
    }
    
    addFocusVisibility() {
        const style = document.createElement('style');
        style.textContent = `
            .keyboard-navigation *:focus {
                outline: 2px solid #E91E63;
                outline-offset: 2px;
            }
            
            .touch-active {
                transform: scale(0.98);
                transition: transform 0.1s ease;
            }
        `;
        document.head.appendChild(style);
    }
}

// ===== INITIALIZATION ===== //
document.addEventListener('DOMContentLoaded', () => {
    console.log('✨ Moyin Nails & Lash - Website Loading...');
    
    // Initialize all components
    const loadingScreen = new LoadingScreen();
    const navigation = new Navigation();
    const galleryFilter = new GalleryFilter();
    const scrollAnimations = new ScrollAnimations();
    const performanceOptimizer = new PerformanceOptimizer();
    const whatsappIntegration = new WhatsAppIntegration();
    const mobileOptimization = new MobileOptimization();
    const businessAnalytics = new BusinessAnalytics();
    const accessibilityEnhancer = new AccessibilityEnhancer();
    
    console.log('💅 Website initialized successfully!');
    
    // Add welcome message for Lagos users
    if (navigator.language.includes('en')) {
        console.log(`
        💎 Welcome to Moyin Nails & Lash!
        
        🏗️ Features:
        - Mobile-first responsive design
        - Lagos-optimized experience
        - WhatsApp booking integration
        - Instagram showcase
        - Professional service gallery
        - Elegant luxury styling
        
        📱 Perfect for mobile viewing!
        🔗 Easy WhatsApp booking: 09033255259
        📍 Located in Baruwa Ipaja, Lagos
        `);
    }
});

// Add CSS animations for enhanced interactions
const additionalStyles = document.createElement('style');
additionalStyles.textContent = `
    @keyframes slideUp {
        from {
            transform: translateX(-50%) translateY(100%);
            opacity: 0;
        }
        to {
            transform: translateX(-50%) translateY(0);
            opacity: 1;
        }
    }
    
    .animate {
        animation: fadeInUp 0.8s ease forwards;
    }
    
    .service-card.animate {
        animation-delay: calc(var(--index, 0) * 0.1s);
    }
    
    .gallery-item.animate {
        animation-delay: calc(var(--index, 0) * 0.05s);
    }
`;
document.head.appendChild(additionalStyles);

// Lagos-specific optimizations
if (navigator.connection) {
    const connection = navigator.connection;
    
    // Optimize for slower connections common in Lagos
    if (connection.effectiveType === '2g' || connection.effectiveType === '3g') {
        console.log('📱 Optimizing for slower connection...');
        
        // Reduce image quality for slower connections
        const images = document.querySelectorAll('img');
        images.forEach(img => {
            if (img.src.includes('unsplash.com')) {
                img.src = img.src.replace('w=400&h=400', 'w=300&h=300&q=80');
            }
        });
    }
}