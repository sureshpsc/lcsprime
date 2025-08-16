// LCS PRIME - services.js - Services Page JavaScript

// Global variables
let mobileMenuOpen = false;

// Wait for DOM to load
document.addEventListener('DOMContentLoaded', function() {
    console.log('🚀 LCS PRIME Services page loaded successfully!');
    
    // Initialize all functionality
    initScrollButtons();
    initMobileMenu();
    initNavigation();
    initScrollAnimations();
    initSmoothScrolling();
    initAccessibility();
    
    console.log('✅ All services page features initialized');
});

// ===== SCROLL BUTTONS FUNCTIONALITY =====
function initScrollButtons() {
    console.log('🔧 Initializing scroll buttons...');
    
    // Remove any existing scroll buttons first
    const existingButtons = document.querySelectorAll('.scroll-to-bottom, .scroll-to-top');
    existingButtons.forEach(btn => btn.remove());
    
    // Create scroll to bottom button
    const scrollToBottomBtn = document.createElement('button');
    scrollToBottomBtn.className = 'scroll-to-bottom';
    scrollToBottomBtn.setAttribute('aria-label', 'Scroll to bottom');
    scrollToBottomBtn.setAttribute('title', 'Scroll to bottom');
    scrollToBottomBtn.innerHTML = '⬇️';
    document.body.appendChild(scrollToBottomBtn);
    
    // Create scroll to top button
    const scrollToTopBtn = document.createElement('button');
    scrollToTopBtn.className = 'scroll-to-top';
    scrollToTopBtn.setAttribute('aria-label', 'Scroll to top');
    scrollToTopBtn.setAttribute('title', 'Scroll to top');
    scrollToTopBtn.innerHTML = '⬆️';
    document.body.appendChild(scrollToTopBtn);
    
    console.log('✅ Scroll buttons created');
    
    // Add click event listeners
    scrollToBottomBtn.addEventListener('click', function(e) {
        e.preventDefault();
        console.log('⬇️ Scroll to bottom clicked');
        scrollToBottom();
        trackEvent('Navigation', 'Scroll to Bottom', 'Services Page');
    });
    
    scrollToTopBtn.addEventListener('click', function(e) {
        e.preventDefault();
        console.log('⬆️ Scroll to top clicked');
        scrollToTop();
        trackEvent('Navigation', 'Scroll to Top', 'Services Page');
    });
    
    // Show/hide scroll buttons based on scroll position
    function updateScrollButtonsVisibility() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        const windowHeight = window.innerHeight;
        const documentHeight = getDocumentHeight();
        const scrollPercentage = scrollTop / (documentHeight - windowHeight);
        
        // Show scroll to top button after scrolling 20% down
        if (scrollPercentage > 0.2) {
            scrollToTopBtn.classList.add('visible');
        } else {
            scrollToTopBtn.classList.remove('visible');
        }
        
        // Hide scroll to bottom button when near bottom (90% scrolled)
        if (scrollPercentage > 0.9) {
            scrollToBottomBtn.classList.add('hidden');
        } else {
            scrollToBottomBtn.classList.remove('hidden');
        }
    }
    
    // Throttled scroll event listener
    window.addEventListener('scroll', throttle(updateScrollButtonsVisibility, 100));
    
    // Initial check
    updateScrollButtonsVisibility();
    
    console.log('✅ Scroll button events attached');
}

// ===== MOBILE MENU FUNCTIONALITY =====
function initMobileMenu() {
    console.log('📱 Initializing mobile menu...');
    
    const navContainer = document.querySelector('.nav-container');
    if (!navContainer) {
        console.log('❌ Nav container not found');
        return;
    }
    
    // Remove existing mobile menu elements
    const existingToggle = document.querySelector('.mobile-menu-toggle');
    const existingOverlay = document.querySelector('.mobile-nav-overlay');
    if (existingToggle) existingToggle.remove();
    if (existingOverlay) existingOverlay.remove();
    
    // Create mobile menu toggle button
    const mobileToggle = document.createElement('div');
    mobileToggle.className = 'mobile-menu-toggle';
    mobileToggle.innerHTML = '<span></span><span></span><span></span>';
    navContainer.appendChild(mobileToggle);
    
    // Create mobile navigation overlay
    const mobileOverlay = document.createElement('div');
    mobileOverlay.className = 'mobile-nav-overlay';
    
    const mobileMenu = document.createElement('div');
    mobileMenu.className = 'mobile-nav-menu';
    
    // Copy navigation links to mobile menu
    const desktopLinks = document.querySelectorAll('.nav-links .nav-link');
    desktopLinks.forEach(link => {
        const mobileLink = document.createElement('a');
        mobileLink.href = link.href;
        mobileLink.textContent = link.textContent;
        mobileLink.className = 'nav-link';
        if (link.classList.contains('active')) {
            mobileLink.classList.add('active');
        }
        mobileMenu.appendChild(mobileLink);
    });
    
    mobileOverlay.appendChild(mobileMenu);
    document.body.appendChild(mobileOverlay);
    
    console.log('✅ Mobile menu elements created');
    
    // Mobile menu functions
    function openMobileMenu() {
        console.log('📱 Opening mobile menu');
        mobileToggle.classList.add('active');
        mobileOverlay.classList.add('active');
        document.body.style.overflow = 'hidden';
        mobileMenuOpen = true;
        trackEvent('Navigation', 'Mobile Menu Open', 'Services Page');
    }
    
    function closeMobileMenu() {
        console.log('📱 Closing mobile menu');
        mobileToggle.classList.remove('active');
        mobileOverlay.classList.remove('active');
        document.body.style.overflow = '';
        mobileMenuOpen = false;
        trackEvent('Navigation', 'Mobile Menu Close', 'Services Page');
    }
    
    function toggleMobileMenu() {
        if (mobileMenuOpen) {
            closeMobileMenu();
        } else {
            openMobileMenu();
        }
    }
    
    // Add event listeners
    mobileToggle.addEventListener('click', function(e) {
        e.stopPropagation();
        console.log('📱 Mobile menu toggle clicked');
        toggleMobileMenu();
    });
    
    // Close menu when clicking overlay
    mobileOverlay.addEventListener('click', function(e) {
        if (e.target === mobileOverlay) {
            console.log('📱 Mobile menu overlay clicked');
            closeMobileMenu();
        }
    });
    
    // Close menu when clicking nav links
    const mobileNavLinks = mobileMenu.querySelectorAll('.nav-link');
    mobileNavLinks.forEach(link => {
        link.addEventListener('click', function() {
            console.log('📱 Mobile nav link clicked');
            closeMobileMenu();
        });
    });
    
    // Close menu on escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && mobileMenuOpen) {
            console.log('📱 Mobile menu closed with Escape key');
            closeMobileMenu();
        }
    });
    
    // Close menu on window resize to desktop
    window.addEventListener('resize', function() {
        if (window.innerWidth > 768 && mobileMenuOpen) {
            closeMobileMenu();
        }
    });
    
    // Expose functions globally for testing
    window.openMobileMenu = openMobileMenu;
    window.closeMobileMenu = closeMobileMenu;
    window.toggleMobileMenu = toggleMobileMenu;
    
    console.log('✅ Mobile menu events attached');
}

// ===== NAVIGATION FUNCTIONALITY =====
function initNavigation() {
    const navbar = document.getElementById('navbar');
    if (!navbar) return;
    
    // Navbar scroll effect
    function handleNavbarScroll() {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    }
    
    // Debounced scroll event listener
    window.addEventListener('scroll', debounce(handleNavbarScroll, 10));
    
    // Set active navigation link
    setActiveNavLink();
}

function setActiveNavLink() {
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    const navLinks = document.querySelectorAll('.nav-link');
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        const linkHref = link.getAttribute('href');
        
        if (linkHref === currentPage || 
            (currentPage === 'services.html' && linkHref === 'services.html')) {
            link.classList.add('active');
        }
    });
}

// ===== SCROLL ANIMATIONS =====
function initScrollAnimations() {
    // Check if IntersectionObserver is supported
    if (!('IntersectionObserver' in window)) {
        console.log('IntersectionObserver not supported, skipping scroll animations');
        return;
    }
    
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Elements to animate on scroll
    const animateElements = document.querySelectorAll(
        '.service-card, .process-step'
    );
    
    animateElements.forEach((element, index) => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(30px)';
        element.style.transition = `all 0.6s ease ${index * 0.1}s`;
        observer.observe(element);
    });
}

// ===== SMOOTH SCROLLING =====
function initSmoothScrolling() {
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

// ===== ACCESSIBILITY ENHANCEMENTS =====
function initAccessibility() {
    // Handle keyboard navigation
    document.addEventListener('keydown', function(e) {
        // Handle escape key
        if (e.key === 'Escape') {
            // Close mobile menu
            if (mobileMenuOpen && window.closeMobileMenu) {
                window.closeMobileMenu();
            }
        }
        
        // Handle enter key on custom buttons
        if (e.key === 'Enter' && e.target.matches('.cta-button, .scroll-to-bottom, .scroll-to-top')) {
            e.target.click();
        }
        
        // Handle space key for scroll buttons
        if (e.key === ' ' && e.target.matches('.scroll-to-bottom, .scroll-to-top')) {
            e.preventDefault();
            e.target.click();
        }
    });
    
    // Add focus management for mobile menu
    const mobileToggle = document.querySelector('.mobile-menu-toggle');
    if (mobileToggle) {
        mobileToggle.addEventListener('keydown', function(e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                this.click();
            }
        });
    }
}

// ===== SERVICES-SPECIFIC INTERACTIONS =====
function initServicesInteractions() {
    // Add hover effects for service cards
    const serviceCards = document.querySelectorAll('.service-card');
    
    serviceCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px)';
            trackEvent('Services', 'Card Hover', this.querySelector('h3').textContent);
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });
    
    // Track CTA button clicks
    const ctaButtons = document.querySelectorAll('.cta-button');
    ctaButtons.forEach(button => {
        button.addEventListener('click', function() {
            trackEvent('Services', 'CTA Click', this.textContent.trim());
        });
    });
}

// ===== SCROLL HELPER FUNCTIONS =====
function scrollToBottom() {
    const documentHeight = getDocumentHeight();
    window.scrollTo({
        top: documentHeight,
        behavior: 'smooth'
    });
}

function scrollToTop() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
}

function getDocumentHeight() {
    return Math.max(
        document.body.scrollHeight,
        document.body.offsetHeight,
        document.documentElement.clientHeight,
        document.documentElement.scrollHeight,
        document.documentElement.offsetHeight
    );
}

// ===== UTILITY FUNCTIONS =====
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

function throttle(func, delay) {
    let timeoutId;
    let lastExecTime = 0;
    return function (...args) {
        const currentTime = Date.now();
        
        if (currentTime - lastExecTime > delay) {
            func.apply(this, args);
            lastExecTime = currentTime;
        } else {
            clearTimeout(timeoutId);
            timeoutId = setTimeout(() => {
                func.apply(this, args);
                lastExecTime = Date.now();
            }, delay - (currentTime - lastExecTime));
        }
    };
}

// ===== ANALYTICS & TRACKING =====
function trackEvent(category, action, label) {
    // Console logging for development
    console.log('📊 Analytics Event:', { category, action, label, page: 'Services' });
    
    // Replace with your analytics service (Google Analytics, etc.)
    // Example for Google Analytics:
    // if (typeof gtag !== 'undefined') {
    //     gtag('event', action, {
    //         'event_category': category,
    //         'event_label': label,
    //         'page_title': 'Services'
    //     });
    // }
}

// ===== PERFORMANCE MONITORING =====
function initPerformanceMonitoring() {
    // Monitor page load performance
    if ('performance' in window) {
        window.addEventListener('load', function() {
            setTimeout(function() {
                const perfData = performance.getEntriesByType('navigation')[0];
                if (perfData) {
                    const loadTime = perfData.loadEventEnd - perfData.loadEventStart;
                    console.log('⚡ Services page load time:', loadTime, 'ms');
                    
                    // Track slow loads
                    if (loadTime > 3000) {
                        trackEvent('Performance', 'Slow Load', `${loadTime}ms`);
                    }
                }
            }, 100);
        });
    }
    
    // Monitor JavaScript errors
    window.addEventListener('error', function(e) {
        console.error('❌ JavaScript error on Services page:', e.error);
        trackEvent('Error', 'JavaScript', e.message);
    });
}

// ===== TOUCH GESTURES FOR MOBILE =====
function initTouchGestures() {
    let touchStartY = 0;
    let touchEndY = 0;

    document.addEventListener('touchstart', function(e) {
        touchStartY = e.changedTouches[0].screenY;
    }, { passive: true });

    document.addEventListener('touchend', function(e) {
        touchEndY = e.changedTouches[0].screenY;
        handleSwipeGesture();
    }, { passive: true });

    function handleSwipeGesture() {
        const swipeThreshold = 100;
        const swipeDistance = touchStartY - touchEndY;
        
        // Swipe up to scroll to bottom
        if (swipeDistance > swipeThreshold) {
            if (window.pageYOffset < 200) {
                trackEvent('Gesture', 'Swipe Up', 'Services Page');
            }
        }
        
        // Swipe down to scroll to top (when scrolled down)
        if (swipeDistance < -swipeThreshold) {
            if (window.pageYOffset > 500) {
                trackEvent('Gesture', 'Swipe Down', 'Services Page');
            }
        }
    }
}

// ===== LOADING ANIMATION =====
window.addEventListener('load', function() {
    document.body.classList.add('loaded');
    console.log('🎉 Services page fully loaded and ready!');
    
    // Initialize performance monitoring
    initPerformanceMonitoring();
    
    // Initialize touch gestures
    initTouchGestures();
    
    // Initialize services-specific interactions
    initServicesInteractions();
    
    // Test buttons after load
    setTimeout(() => {
        const scrollBottomBtn = document.querySelector('.scroll-to-bottom');
        const scrollTopBtn = document.querySelector('.scroll-to-top');
        const mobileToggle = document.querySelector('.mobile-menu-toggle');
        
        console.log('🔍 Services page button check:');
        console.log('  Scroll bottom button:', scrollBottomBtn ? '✅ Found' : '❌ Missing');
        console.log('  Scroll top button:', scrollTopBtn ? '✅ Found' : '❌ Missing');
        console.log('  Mobile toggle:', mobileToggle ? '✅ Found' : '❌ Missing');
        
        if (scrollBottomBtn) {
            console.log('⬇️ You can click the scroll down button to test it');
        }
        if (mobileToggle) {
            console.log('📱 Resize window to <768px to see mobile menu');
        }
    }, 1000);
});

// ===== PAGE VISIBILITY API =====
document.addEventListener('visibilitychange', function() {
    if (document.hidden) {
        console.log('👁️ Services page is now hidden');
        trackEvent('Page', 'Hidden', 'Services Page');
    } else {
        console.log('👁️ Services page is now visible');
        trackEvent('Page', 'Visible', 'Services Page');
    }
});

// ===== DEVELOPMENT HELPERS =====
if (window.location.hostname === 'localhost' || 
    window.location.hostname === '127.0.0.1' || 
    window.location.protocol === 'file:') {
    
    console.log('🔧 Development mode detected for Services page');
    
    // Add development helpers
    window.lcsServices = {
        scrollToBottom: scrollToBottom,
        scrollToTop: scrollToTop,
        trackEvent: trackEvent,
        testMobileMenu: () => {
            const toggle = document.querySelector('.mobile-menu-toggle');
            if (toggle) {
                toggle.click();
                console.log('📱 Mobile menu toggled on Services page');
            } else {
                console.log('❌ Mobile menu toggle not found');
            }
        },
        testScrollButtons: () => {
            const bottomBtn = document.querySelector('.scroll-to-bottom');
            const topBtn = document.querySelector('.scroll-to-top');
            
            if (bottomBtn) {
                console.log('⬇️ Testing scroll to bottom...');
                bottomBtn.click();
            } else {
                console.log('❌ Scroll bottom button not found');
            }
            
            setTimeout(() => {
                if (topBtn) {
                    console.log('⬆️ Testing scroll to top...');
                    topBtn.click();
                } else {
                    console.log('❌ Scroll top button not found');
                }
            }, 3000);
        },
        animateServiceCards: () => {
            const cards = document.querySelectorAll('.service-card');
            cards.forEach((card, index) => {
                setTimeout(() => {
                    card.style.transform = 'translateY(-10px)';
                    setTimeout(() => {
                        card.style.transform = 'translateY(0)';
                    }, 300);
                }, index * 100);
            });
        }
    };
    
    console.log('💻 Services page development helpers available:');
    console.log('📱 Test mobile menu: window.lcsServices.testMobileMenu()');
    console.log('⬇️ Test scroll buttons: window.lcsServices.testScrollButtons()');
    console.log('🎨 Animate service cards: window.lcsServices.animateServiceCards()');
    console.log('🔝 Scroll to top: window.lcsServices.scrollToTop()');
    console.log('🔽 Scroll to bottom: window.lcsServices.scrollToBottom()');
}

// Export functions for potential module use
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        scrollToTop,
        scrollToBottom,
        trackEvent,
        debounce,
        throttle,
        initMobileMenu,
        initScrollButtons,
        initNavigation,
        initSmoothScrolling,
        initAccessibility,
        initServicesInteractions
    };
}

console.log(`
🚀 LCS PRIME SERVICES.JS LOADED!

🎯 SERVICES PAGE FEATURES ACTIVE:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
✅ Mobile hamburger menu with overlay
✅ Dynamic scroll to top/bottom buttons
✅ Service card hover animations
✅ Process step animations
✅ Smooth scrolling navigation
✅ Keyboard accessibility support
✅ Touch gesture recognition
✅ Performance monitoring
✅ Services-specific tracking
✅ Development helpers

🧪 TESTING:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
📱 Resize window to <768px to test mobile menu
⬇️ Scroll down to see scroll-to-top button appear
🎨 Hover over service cards for animations
⌨️ Use keyboard (Enter, Space, Escape) for navigation

🚀 Services page ready to use!
`);