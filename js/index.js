// LCS PRIME - index.js - Complete JavaScript with Mobile Menu & Scroll Features

// Global variables
let mobileMenuOpen = false;

// Wait for DOM to load
document.addEventListener('DOMContentLoaded', function() {
    console.log('🚀 LCS PRIME website loaded successfully!');
    
    // Initialize all functionality
    initScrollButtons();
    initMobileMenu();
    initNavigation();
    initSmoothScrolling();
    initAccessibility();
    
    console.log('✅ All features initialized');
});

// ===== SCROLL BUTTONS FUNCTIONALITY =====
function initScrollButtons() {
    console.log('🔧 Initializing scroll buttons...');
    
    const scrollToBottomBtn = document.getElementById('scrollToBottom');
    const scrollToTopBtn = document.getElementById('scrollToTop');
    
    if (!scrollToBottomBtn || !scrollToTopBtn) {
        console.error('❌ Scroll buttons not found in DOM');
        return;
    }
    
    // Add click event listeners
    scrollToBottomBtn.addEventListener('click', function(e) {
        e.preventDefault();
        console.log('⬇️ Scroll to bottom clicked');
        scrollToBottom();
        trackEvent('Navigation', 'Scroll to Bottom', 'Button');
    });
    
    scrollToTopBtn.addEventListener('click', function(e) {
        e.preventDefault();
        console.log('⬆️ Scroll to top clicked');
        scrollToTop();
        trackEvent('Navigation', 'Scroll to Top', 'Button');
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
    
    const mobileToggle = document.getElementById('mobileMenuToggle');
    const mobileOverlay = document.getElementById('mobileNavOverlay');
    
    if (!mobileToggle || !mobileOverlay) {
        console.error('❌ Mobile menu elements not found');
        return;
    }
    
    // Mobile menu functions
    function openMobileMenu() {
        console.log('📱 Opening mobile menu');
        mobileToggle.classList.add('active');
        mobileOverlay.classList.add('active');
        document.body.style.overflow = 'hidden';
        mobileMenuOpen = true;
        trackEvent('Navigation', 'Mobile Menu Open', 'Hamburger');
    }
    
    function closeMobileMenu() {
        console.log('📱 Closing mobile menu');
        mobileToggle.classList.remove('active');
        mobileOverlay.classList.remove('active');
        document.body.style.overflow = '';
        mobileMenuOpen = false;
        trackEvent('Navigation', 'Mobile Menu Close', 'Hamburger');
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
    const mobileNavLinks = mobileOverlay.querySelectorAll('.nav-link');
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
            (currentPage === '' && linkHref === 'index.html') ||
            (currentPage === 'index.html' && linkHref === 'index.html')) {
            link.classList.add('active');
        }
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
    const mobileToggle = document.getElementById('mobileMenuToggle');
    const mobileOverlay = document.getElementById('mobileNavOverlay');
    
    if (mobileToggle && mobileOverlay) {
        mobileToggle.addEventListener('keydown', function(e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                this.click();
            }
        });
    }
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
    console.log('📊 Analytics Event:', { category, action, label });
    
    // Replace with your analytics service (Google Analytics, etc.)
    // Example for Google Analytics:
    // if (typeof gtag !== 'undefined') {
    //     gtag('event', action, {
    //         'event_category': category,
    //         'event_label': label
    //     });
    // }
}

// Track CTA button clicks
document.addEventListener('click', function(e) {
    if (e.target.matches('.cta-button')) {
        trackEvent('CTA', 'Click', e.target.textContent.trim());
    }
});

// ===== PERFORMANCE MONITORING =====
function initPerformanceMonitoring() {
    // Monitor page load performance
    if ('performance' in window) {
        window.addEventListener('load', function() {
            setTimeout(function() {
                const perfData = performance.getEntriesByType('navigation')[0];
                if (perfData) {
                    const loadTime = perfData.loadEventEnd - perfData.loadEventStart;
                    console.log('⚡ Page load time:', loadTime, 'ms');
                    
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
        console.error('❌ JavaScript error:', e.error);
        trackEvent('Error', 'JavaScript', e.message);
    });
    
    // Monitor unhandled promise rejections
    window.addEventListener('unhandledrejection', function(e) {
        console.error('❌ Unhandled promise rejection:', e.reason);
        trackEvent('Error', 'Promise Rejection', e.reason.toString());
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
            // Only track if near top of page
            if (window.pageYOffset < 200) {
                trackEvent('Gesture', 'Swipe Up', 'Mobile');
            }
        }
        
        // Swipe down to scroll to top (when scrolled down)
        if (swipeDistance < -swipeThreshold) {
            // Only track if scrolled down significantly
            if (window.pageYOffset > 500) {
                trackEvent('Gesture', 'Swipe Down', 'Mobile');
            }
        }
    }
}

// ===== LOADING ANIMATION =====
window.addEventListener('load', function() {
    document.body.classList.add('loaded');
    console.log('🎉 Website fully loaded and ready!');
    
    // Initialize performance monitoring
    initPerformanceMonitoring();
    
    // Initialize touch gestures
    initTouchGestures();
    
    // Test buttons after load
    setTimeout(() => {
        const scrollBottomBtn = document.getElementById('scrollToBottom');
        const scrollTopBtn = document.getElementById('scrollToTop');
        const mobileToggle = document.getElementById('mobileMenuToggle');
        
        console.log('🔍 Button check:');
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
        console.log('👁️ Page is now hidden');
        trackEvent('Page', 'Hidden', 'Visibility API');
    } else {
        console.log('👁️ Page is now visible');
        trackEvent('Page', 'Visible', 'Visibility API');
    }
});

// ===== NETWORK STATUS =====
window.addEventListener('online', function() {
    console.log('🌐 Connection restored');
    trackEvent('Network', 'Online', 'Connection Status');
});

window.addEventListener('offline', function() {
    console.log('🌐 Connection lost');
    trackEvent('Network', 'Offline', 'Connection Status');
});

// ===== DEVELOPMENT HELPERS =====
if (window.location.hostname === 'localhost' || 
    window.location.hostname === '127.0.0.1' || 
    window.location.protocol === 'file:') {
    
    console.log('🔧 Development mode detected');
    
    // Add development helpers
    window.lcsPrime = {
        scrollToBottom: scrollToBottom,
        scrollToTop: scrollToTop,
        trackEvent: trackEvent,
        testMobileMenu: () => {
            const toggle = document.getElementById('mobileMenuToggle');
            if (toggle) {
                toggle.click();
                console.log('📱 Mobile menu toggled');
            } else {
                console.log('❌ Mobile menu toggle not found');
            }
        },
        testScrollButtons: () => {
            const bottomBtn = document.getElementById('scrollToBottom');
            const topBtn = document.getElementById('scrollToTop');
            
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
        }
    };
    
    console.log('💻 Development helpers available:');
    console.log('📱 Test mobile menu: window.lcsPrime.testMobileMenu()');
    console.log('⬇️ Test scroll buttons: window.lcsPrime.testScrollButtons()');
    console.log('🔝 Scroll to top: window.lcsPrime.scrollToTop()');
    console.log('🔽 Scroll to bottom: window.lcsPrime.scrollToBottom()');
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
        initAccessibility
    };
}

console.log(`
🚀 LCS PRIME INDEX.JS LOADED!

🎯 FEATURES ACTIVE:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
✅ Mobile hamburger menu with overlay
✅ Dynamic scroll to top/bottom buttons
✅ Smooth scrolling animations
✅ Keyboard accessibility support
✅ Touch gesture recognition
✅ Performance monitoring
✅ Error tracking
✅ Analytics integration
✅ Development helpers

🧪 TESTING:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
📱 Resize window to <768px to test mobile menu
⬇️ Scroll down to see scroll-to-top button appear
⬆️ Use scroll buttons to navigate
⌨️ Use keyboard (Enter, Space, Escape) for navigation

🚀 Ready to use!
`);