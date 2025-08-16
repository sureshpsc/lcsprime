// LCS PRIME - contact.js - Complete JavaScript for Contact Page

// Global variables for mobile menu functionality
let mobileMenuOpen = false;

// Wait for DOM to load
document.addEventListener('DOMContentLoaded', function() {
    console.log('🚀 LCS PRIME Contact page loaded successfully!');
    
    // Initialize all functionality in correct order
    initScrollButtons();
    initMobileMenu();
    initNavigation();
    initContactForm();
    initScrollAnimations();
    initSmoothScrolling();
    initPerformanceMonitoring();
    initMapFunctionality();
    setActiveNavLink();
    
    console.log('✅ All features initialized');
});

// ===== SCROLL BUTTONS FUNCTIONALITY =====
function initScrollButtons() {
    console.log('🔧 Initializing scroll buttons...');
    
    // Create scroll buttons if they don't exist
    createScrollButtons();
    
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
        const documentHeight = Math.max(
            document.body.scrollHeight,
            document.body.offsetHeight,
            document.documentElement.clientHeight,
            document.documentElement.scrollHeight,
            document.documentElement.offsetHeight
        );
        window.scrollTo({
            top: documentHeight,
            behavior: 'smooth'
        });
    });
    
    scrollToTopBtn.addEventListener('click', function(e) {
        e.preventDefault();
        console.log('⬆️ Scroll to top clicked');
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
    
    // Show/hide scroll buttons based on scroll position
    function updateScrollButtonsVisibility() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        const windowHeight = window.innerHeight;
        const documentHeight = Math.max(
            document.body.scrollHeight,
            document.body.offsetHeight,
            document.documentElement.clientHeight,
            document.documentElement.scrollHeight,
            document.documentElement.offsetHeight
        );
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

// Create scroll buttons dynamically
function createScrollButtons() {
    // Create scroll to bottom button
    if (!document.getElementById('scrollToBottom')) {
        const scrollBottomBtn = document.createElement('button');
        scrollBottomBtn.id = 'scrollToBottom';
        scrollBottomBtn.className = 'scroll-to-bottom';
        scrollBottomBtn.innerHTML = '↓';
        scrollBottomBtn.setAttribute('aria-label', 'Scroll to bottom');
        scrollBottomBtn.setAttribute('title', 'Scroll to bottom');
        document.body.appendChild(scrollBottomBtn);
    }
    
    // Create scroll to top button
    if (!document.getElementById('scrollToTop')) {
        const scrollTopBtn = document.createElement('button');
        scrollTopBtn.id = 'scrollToTop';
        scrollTopBtn.className = 'scroll-to-top';
        scrollTopBtn.innerHTML = '↑';
        scrollTopBtn.setAttribute('aria-label', 'Scroll to top');
        scrollTopBtn.setAttribute('title', 'Scroll to top');
        document.body.appendChild(scrollTopBtn);
    }
}

// ===== MOBILE MENU FUNCTIONALITY =====
function initMobileMenu() {
    console.log('📱 Initializing mobile menu...');
    
    // Create mobile menu elements if they don't exist
    createMobileMenu();
    
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
    }
    
    function closeMobileMenu() {
        console.log('📱 Closing mobile menu');
        mobileToggle.classList.remove('active');
        mobileOverlay.classList.remove('active');
        document.body.style.overflow = '';
        mobileMenuOpen = false;
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
    
    // Make closeMobileMenu globally accessible
    window.closeMobileMenu = closeMobileMenu;
    
    console.log('✅ Mobile menu events attached');
}

// Create mobile menu elements dynamically
function createMobileMenu() {
    const navContainer = document.querySelector('.nav-container');
    if (!navContainer) return;
    
    // Create mobile menu toggle button
    if (!document.getElementById('mobileMenuToggle')) {
        const mobileToggle = document.createElement('button');
        mobileToggle.id = 'mobileMenuToggle';
        mobileToggle.className = 'mobile-menu-toggle';
        mobileToggle.setAttribute('aria-label', 'Toggle mobile menu');
        mobileToggle.innerHTML = `
            <span></span>
            <span></span>
            <span></span>
        `;
        navContainer.appendChild(mobileToggle);
    }
    
    // Create mobile navigation overlay
    if (!document.getElementById('mobileNavOverlay')) {
        const mobileOverlay = document.createElement('div');
        mobileOverlay.id = 'mobileNavOverlay';
        mobileOverlay.className = 'mobile-nav-overlay';
        
        // Get existing nav links
        const existingNavLinks = document.querySelectorAll('.nav-links .nav-link');
        let mobileNavLinksHTML = '';
        
        existingNavLinks.forEach(link => {
            mobileNavLinksHTML += `<a href="${link.href}" class="nav-link ${link.classList.contains('active') ? 'active' : ''}">${link.textContent}</a>`;
        });
        
        mobileOverlay.innerHTML = `
            <div class="mobile-nav-menu">
                ${mobileNavLinksHTML}
            </div>
        `;
        
        document.body.appendChild(mobileOverlay);
    }
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
    
    window.addEventListener('scroll', debounce(handleNavbarScroll, 10));
}

// Set active navigation link
function setActiveNavLink() {
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    const navLinks = document.querySelectorAll('.nav-link');
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        const linkHref = link.getAttribute('href');
        
        if (linkHref === currentPage || 
            (currentPage === '' && linkHref === 'index.html') ||
            (currentPage === 'contact.html' && linkHref === 'contact.html')) {
            link.classList.add('active');
        }
    });
}

// ===== CONTACT FORM FUNCTIONALITY =====
function initContactForm() {
    const contactForm = document.getElementById('contactForm');
    if (!contactForm) return;
    
    console.log('📝 Initializing contact form...');
    
    contactForm.addEventListener('submit', function(event) {
        event.preventDefault();
        
        const submitBtn = this.querySelector('.submit-btn');
        const originalText = submitBtn.textContent;
        
        // Get form data
        const formData = new FormData(this);
        const data = Object.fromEntries(formData.entries());
        
        // Validate form
        if (!validateForm(data)) {
            return;
        }
        
        // Show loading state
        submitBtn.textContent = 'Sending...';
        submitBtn.disabled = true;
        submitBtn.style.background = 'linear-gradient(135deg, #999 0%, #666 100%)';
        
        // Send email
        sendContactEmail(data)
            .then(() => {
                showSuccessMessage();
                this.reset();
                removeFieldValidationClasses();
                trackEvent('Contact', 'Form Submit', 'Success');
            })
            .catch((error) => {
                console.error('Error sending email:', error);
                showErrorMessage('Failed to send message. Please try again or contact us directly at contact@lcsprime.com');
                trackEvent('Contact', 'Form Submit', 'Error');
            })
            .finally(() => {
                // Reset button
                submitBtn.textContent = originalText;
                submitBtn.disabled = false;
                submitBtn.style.background = '';
            });
    });
    
    // Real-time form validation
    initFormValidation();
    
    console.log('✅ Contact form initialized');
}

// Enhanced form validation
function validateForm(data) {
    const requiredFields = ['firstName', 'lastName', 'email', 'service', 'message'];
    const errors = [];
    let isValid = true;
    
    // Clear previous validation classes
    removeFieldValidationClasses();
    
    // Check required fields
    requiredFields.forEach(field => {
        const fieldElement = document.getElementById(field);
        if (!data[field] || data[field].trim() === '') {
            errors.push(field);
            if (fieldElement) {
                fieldElement.classList.add('error');
                fieldElement.classList.remove('success');
            }
            isValid = false;
        } else {
            if (fieldElement) {
                fieldElement.classList.add('success');
                fieldElement.classList.remove('error');
            }
        }
    });
    
    // Email validation
    const emailField = document.getElementById('email');
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (data.email && !emailRegex.test(data.email)) {
        errors.push('email-format');
        if (emailField) {
            emailField.classList.add('error');
            emailField.classList.remove('success');
        }
        isValid = false;
    }
    
    // Phone validation (if provided)
    if (data.phone && data.phone.trim() !== '') {
        const phoneRegex = /^[\+]?[1-9][\d]{0,15}$/;
        const cleanPhone = data.phone.replace(/[\s\-\(\)]/g, '');
        if (!phoneRegex.test(cleanPhone)) {
            errors.push('phone-format');
            const phoneField = document.getElementById('phone');
            if (phoneField) {
                phoneField.classList.add('error');
            }
            isValid = false;
        }
    }
    
    if (!isValid) {
        showFormErrors(errors);
        // Focus on first error field
        const firstErrorField = document.querySelector('.contact-form .error');
        if (firstErrorField) {
            firstErrorField.focus();
            firstErrorField.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
        return false;
    }
    
    return true;
}

// Remove validation classes from all fields
function removeFieldValidationClasses() {
    const fields = document.querySelectorAll('.contact-form input, .contact-form textarea, .contact-form select');
    fields.forEach(field => {
        field.classList.remove('error', 'success');
    });
}

// Real-time form validation
function initFormValidation() {
    const form = document.getElementById('contactForm');
    if (!form) return;
    
    // Email validation
    const emailField = document.getElementById('email');
    if (emailField) {
        emailField.addEventListener('blur', function() {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (this.value && !emailRegex.test(this.value)) {
                this.classList.add('error');
                this.classList.remove('success');
            } else if (this.value) {
                this.classList.add('success');
                this.classList.remove('error');
            }
        });
    }
    
    // Phone validation
    const phoneField = document.getElementById('phone');
    if (phoneField) {
        phoneField.addEventListener('blur', function() {
            if (this.value.trim() !== '') {
                const phoneRegex = /^[\+]?[1-9][\d]{0,15}$/;
                const cleanPhone = this.value.replace(/[\s\-\(\)]/g, '');
                if (!phoneRegex.test(cleanPhone)) {
                    this.classList.add('error');
                } else {
                    this.classList.remove('error');
                    this.classList.add('success');
                }
            } else {
                this.classList.remove('error', 'success');
            }
        });
    }
    
    // Character counter for message field
    const messageField = document.getElementById('message');
    if (messageField) {
        messageField.addEventListener('input', function() {
            updateCharacterCounter(this);
        });
    }
    
    // Required field validation
    const requiredFields = ['firstName', 'lastName', 'service'];
    requiredFields.forEach(fieldName => {
        const field = document.getElementById(fieldName);
        if (field) {
            field.addEventListener('blur', function() {
                if (this.value.trim() === '') {
                    this.classList.add('error');
                    this.classList.remove('success');
                } else {
                    this.classList.add('success');
                    this.classList.remove('error');
                }
            });
        }
    });
}

// Update character counter
function updateCharacterCounter(field) {
    const charCount = field.value.length;
    const maxChars = 1000;
    let counter = field.parentNode.querySelector('.char-counter');
    
    if (!counter) {
        counter = document.createElement('div');
        counter.className = 'char-counter';
        field.parentNode.appendChild(counter);
    }
    
    counter.textContent = `${charCount}/${maxChars} characters`;
    
    if (charCount > maxChars) {
        counter.classList.add('over-limit');
        field.classList.add('error');
    } else {
        counter.classList.remove('over-limit');
        field.classList.remove('error');
    }
}

// Show form validation errors
function showFormErrors(errors) {
    let errorMessage = 'Please fix the following errors:\n\n';
    
    errors.forEach(error => {
        switch(error) {
            case 'firstName':
                errorMessage += '• First name is required\n';
                break;
            case 'lastName':
                errorMessage += '• Last name is required\n';
                break;
            case 'email':
                errorMessage += '• Email is required\n';
                break;
            case 'email-format':
                errorMessage += '• Please enter a valid email address\n';
                break;
            case 'phone-format':
                errorMessage += '• Please enter a valid phone number\n';
                break;
            case 'service':
                errorMessage += '• Please select a service\n';
                break;
            case 'message':
                errorMessage += '• Message is required\n';
                break;
        }
    });
    
    // Create a better error display
    showErrorMessage(errorMessage);
}

// Send contact email (simulated with enhanced logging)
async function sendContactEmail(formData) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            // Enhanced logging for development
            console.log('📧 EMAIL SUBMISSION DETAILS');
            console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
            console.log('🏢 TO: contact@lcsprime.com');
            console.log('👤 FROM:', `${formData.firstName} ${formData.lastName}`);
            console.log('📧 EMAIL:', formData.email);
            console.log('📞 PHONE:', formData.phone || 'Not provided');
            console.log('🏢 COMPANY:', formData.company || 'Not provided');
            console.log('🔧 SERVICE:', formData.service);
            console.log('💬 MESSAGE:', formData.message);
            console.log('⏰ TIMESTAMP:', new Date().toLocaleString());
            console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
            
            // Simulate success (you can add random failure for testing)
            const success = Math.random() > 0.1; // 90% success rate
            
            if (success) {
                resolve({ 
                    success: true, 
                    message: 'Email sent successfully to contact@lcsprime.com',
                    timestamp: new Date().toISOString()
                });
            } else {
                reject(new Error('Simulated network error'));
            }
        }, 2000);
    });
}

// Show success message
function showSuccessMessage() {
    // Create or show success message
    let successDiv = document.querySelector('.success-message');
    if (!successDiv) {
        successDiv = document.createElement('div');
        successDiv.className = 'success-message';
        const form = document.getElementById('contactForm');
        if (form) {
            form.insertBefore(successDiv, form.firstChild);
        }
    }
    
    successDiv.innerHTML = `
        <div style="display: flex; align-items: center; justify-content: center; gap: 0.5rem;">
            <span style="font-size: 1.2rem;">✅</span>
            <span>Thank you! Your message has been sent successfully. We'll respond within 24 hours.</span>
        </div>
    `;
    successDiv.classList.add('show');
    
    // Hide success message after 10 seconds
    setTimeout(() => {
        if (successDiv) {
            successDiv.classList.remove('show');
        }
    }, 10000);
    
    // Scroll to show success message
    successDiv.scrollIntoView({ 
        behavior: 'smooth', 
        block: 'center' 
    });
    
    // Track successful submission
    trackEvent('Contact', 'Form Success', 'Message Sent');
}

// Show error message
function showErrorMessage(message) {
    // Create a better error dialog
    const errorContainer = document.createElement('div');
    errorContainer.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: rgba(0, 0, 0, 0.8);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 10000;
        backdrop-filter: blur(5px);
    `;
    
    const errorDialog = document.createElement('div');
    errorDialog.style.cssText = `
        background: linear-gradient(135deg, #1a1a2e 0%, #16213e 100%);
        border: 1px solid rgba(239, 68, 68, 0.3);
        border-radius: 15px;
        padding: 2rem;
        max-width: 400px;
        margin: 1rem;
        box-shadow: 0 20px 40px rgba(0, 0, 0, 0.5);
    `;
    
    errorDialog.innerHTML = `
        <div style="text-align: center; color: white;">
            <div style="font-size: 3rem; margin-bottom: 1rem;">❌</div>
            <h3 style="color: #ef4444; margin-bottom: 1rem; font-size: 1.2rem;">Form Submission Error</h3>
            <p style="color: #ccc; line-height: 1.6; margin-bottom: 2rem; white-space: pre-line;">${message}</p>
            <button onclick="this.closest('.error-container').remove()" 
                    style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); 
                           color: white; border: none; padding: 0.75rem 2rem; 
                           border-radius: 25px; cursor: pointer; font-weight: 600;
                           transition: all 0.3s ease;">
                OK
            </button>
        </div>
    `;
    
    errorContainer.className = 'error-container';
    errorContainer.appendChild(errorDialog);
    document.body.appendChild(errorContainer);
    
    // Auto-remove after 10 seconds
    setTimeout(() => {
        if (errorContainer.parentNode) {
            errorContainer.remove();
        }
    }, 10000);
    
    // Close on clicking outside
    errorContainer.addEventListener('click', function(e) {
        if (e.target === errorContainer) {
            errorContainer.remove();
        }
    });
}

// ===== MAP FUNCTIONALITY =====
function initMapFunctionality() {
    console.log('🗺️ Initializing map functionality...');
    
    // Make map functions globally available
    window.toggleMap = toggleMap;
    window.shareLocation = shareLocation;
    window.mapLoaded = mapLoaded;
    
    console.log('✅ Map functionality initialized');
}

// Toggle map visibility
function toggleMap() {
    const mapSection = document.getElementById('mapSection');
    if (!mapSection) return;
    
    if (mapSection.style.display === 'none' || !mapSection.style.display) {
        // Show map
        mapSection.style.display = 'block';
        mapSection.classList.remove('hiding');
        
        // Load the map iframe if not already loaded
        const iframe = document.getElementById('googleMap');
        const loadingDiv = document.querySelector('.map-loading');
        
        if (iframe && loadingDiv) {
            // Show loading animation
            loadingDiv.style.display = 'flex';
            iframe.style.display = 'none';
            
            // Simulate loading delay and then show map
            setTimeout(() => {
                loadingDiv.style.display = 'none';
                iframe.style.display = 'block';
                iframe.style.opacity = '1';
            }, 1500);
        }
        
        // Scroll to map section
        setTimeout(() => {
            mapSection.scrollIntoView({ 
                behavior: 'smooth', 
                block: 'nearest' 
            });
        }, 200);
        
        console.log('🗺️ Map opened');
        trackEvent('Map', 'Open', 'View Location');
    } else {
        // Hide map with animation
        mapSection.classList.add('hiding');
        setTimeout(() => {
            mapSection.style.display = 'none';
            mapSection.classList.remove('hiding');
        }, 500);
        
        console.log('🗺️ Map closed');
        trackEvent('Map', 'Close', 'Hide Location');
    }
}

// Handle map iframe load
function mapLoaded() {
    console.log('🗺️ Google Map loaded successfully');
    trackEvent('Map', 'Loaded', 'Google Maps');
}

// Share location functionality
function shareLocation() {
    const locationData = {
        name: 'LCS PRIME Office',
        address: 'Manish Residency, Madinaguda, Hyderabad, TS 500049, India',
        coordinates: {
            lat: 17.4977,
            lng: 78.38576
        },
        googleMapsUrl: 'https://maps.google.com/maps?daddr=Manish+Residency,+Madinaguda,+Hyderabad,+Telangana+500049,+India'
    };
    
    // Check if Web Share API is supported
    if (navigator.share) {
        navigator.share({
            title: locationData.name,
            text: `Visit us at: ${locationData.address}`,
            url: locationData.googleMapsUrl
        }).then(() => {
            console.log('📤 Location shared successfully');
            trackEvent('Map', 'Share', 'Web Share API');
            showTemporaryMessage('📤 Location shared successfully!', 'success');
        }).catch((error) => {
            console.log('❌ Error sharing location:', error);
            fallbackShareLocation(locationData);
        });
    } else {
        // Fallback for browsers that don't support Web Share API
        fallbackShareLocation(locationData);
    }
}

// Fallback share functionality
function fallbackShareLocation(locationData) {
    const shareText = `📍 ${locationData.name}\n${locationData.address}\n🗺️ ${locationData.googleMapsUrl}`;
    
    if (navigator.clipboard) {
        navigator.clipboard.writeText(shareText).then(() => {
            showTemporaryMessage('📋 Location details copied to clipboard!', 'success');
            trackEvent('Map', 'Share', 'Clipboard Copy');
        }).catch(() => {
            showShareModal(locationData);
        });
    } else {
        showShareModal(locationData);
    }
}

// Show share modal for manual copy
function showShareModal(locationData) {
    const shareText = `📍 ${locationData.name}\n${locationData.address}\n🗺️ ${locationData.googleMapsUrl}`;
    
    const modal = document.createElement('div');
    modal.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: rgba(0, 0, 0, 0.8);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 10000;
        backdrop-filter: blur(5px);
    `;
    
    const modalContent = document.createElement('div');
    modalContent.style.cssText = `
        background: linear-gradient(135deg, #1a1a2e 0%, #16213e 100%);
        border: 1px solid rgba(102, 126, 234, 0.3);
        border-radius: 15px;
        padding: 2rem;
        max-width: 400px;
        margin: 1rem;
        box-shadow: 0 20px 40px rgba(0, 0, 0, 0.5);
        text-align: center;
    `;
    
    modalContent.innerHTML = `
        <div style="color: white;">
            <h3 style="color: #667eea; margin-bottom: 1rem; font-size: 1.3rem;">📤 Share Location</h3>
            <textarea readonly style="
                width: 100%; 
                padding: 1rem; 
                background: rgba(255, 255, 255, 0.1); 
                border: 1px solid rgba(255, 255, 255, 0.2); 
                border-radius: 8px; 
                color: white; 
                font-family: inherit; 
                font-size: 0.9rem;
                resize: none;
                margin-bottom: 1rem;
                height: 120px;
            ">${shareText}</textarea>
            <div style="display: flex; gap: 1rem; justify-content: center;">
                <button onclick="this.previousElementSibling.previousElementSibling.select(); document.execCommand('copy'); showTemporaryMessage('📋 Copied!', 'success'); this.closest('.share-modal').remove();" 
                        style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); 
                               color: white; border: none; padding: 0.75rem 1.5rem; 
                               border-radius: 25px; cursor: pointer; font-weight: 600;">
                    📋 Copy
                </button>
                <button onclick="this.closest('.share-modal').remove()" 
                        style="background: transparent; color: #999; border: 1px solid #999; 
                               padding: 0.75rem 1.5rem; border-radius: 25px; cursor: pointer; font-weight: 600;">
                    Close
                </button>
            </div>
        </div>
    `;
    
    modal.className = 'share-modal';
    modal.appendChild(modalContent);
    document.body.appendChild(modal);
    
    // Auto-remove after 30 seconds
    setTimeout(() => {
        if (modal.parentNode) {
            modal.remove();
        }
    }, 30000);
    
    // Close on clicking outside
    modal.addEventListener('click', function(e) {
        if (e.target === modal) {
            modal.remove();
        }
    });
    
    trackEvent('Map', 'Share Modal', 'Manual Copy');
}

// Enhanced geolocation features
function initGeolocationFeatures() {
    // Add "Get Directions from My Location" functionality
    if ('geolocation' in navigator) {
        const directionsBtn = document.querySelector('.map-directions-btn');
        if (directionsBtn) {
            // Add a secondary button for directions from current location
            const myLocationBtn = document.createElement('button');
            myLocationBtn.className = 'map-directions-btn';
            myLocationBtn.innerHTML = '📍 Directions from My Location';
            myLocationBtn.style.marginLeft = '0.5rem';
            
            myLocationBtn.addEventListener('click', function() {
                getDirectionsFromCurrentLocation();
            });
            
            directionsBtn.parentNode.appendChild(myLocationBtn);
        }
    }
}

// Get directions from current location
function getDirectionsFromCurrentLocation() {
    if ('geolocation' in navigator) {
        showTemporaryMessage('🔍 Getting your location...', 'info');
        
        navigator.geolocation.getCurrentPosition(
            function(position) {
                const lat = position.coords.latitude;
                const lng = position.coords.longitude;
                const destination = 'Manish+Residency,+Madinaguda,+Hyderabad,+Telangana+500049,+India';
                const directionsUrl = `https://maps.google.com/maps?saddr=${lat},${lng}&daddr=${destination}`;
                
                window.open(directionsUrl, '_blank');
                showTemporaryMessage('🗺️ Opening directions...', 'success');
                trackEvent('Map', 'Directions', 'From Current Location');
            },
            function(error) {
                console.error('Geolocation error:', error);
                showTemporaryMessage('❌ Unable to get your location. Please enable location services.', 'error');
                trackEvent('Map', 'Geolocation Error', error.message);
            },
            {
                enableHighAccuracy: true,
                timeout: 10000,
                maximumAge: 300000 // 5 minutes
            }
        );
    } else {
        showTemporaryMessage('❌ Geolocation is not supported by your browser.', 'error');
    }
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
        '.contact-item, .contact-form, .section-title, .cta-content'
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
    if (e.target.matches('.cta-button, .cta-button-secondary')) {
        trackEvent('CTA', 'Click', e.target.textContent.trim());
    }
    
    // Track form interactions
    if (e.target.matches('.submit-btn')) {
        trackEvent('Contact', 'Submit Attempt', 'Form Submit Button');
    }
    
    // Track phone/email clicks
    if (e.target.matches('a[href^="tel:"]')) {
        trackEvent('Contact', 'Phone Click', e.target.textContent.trim());
    }
    
    if (e.target.matches('a[href^="mailto:"]')) {
        trackEvent('Contact', 'Email Click', e.target.textContent.trim());
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

// ===== ACCESSIBILITY ENHANCEMENTS =====
document.addEventListener('keydown', function(e) {
    // Handle escape key
    if (e.key === 'Escape') {
        // Close mobile menu
        if (mobileMenuOpen && window.closeMobileMenu) {
            window.closeMobileMenu();
        }
        
        // Close any success messages
        const successMessage = document.querySelector('.success-message.show');
        if (successMessage) {
            successMessage.classList.remove('show');
        }
        
        // Close error dialogs
        const errorDialog = document.querySelector('.error-container');
        if (errorDialog) {
            errorDialog.remove();
        }
    }
    
    // Handle enter key on custom buttons
    if (e.key === 'Enter' && e.target.matches('.scroll-to-bottom, .scroll-to-top')) {
        e.target.click();
    }
    
    // Handle space key for scroll buttons
    if (e.key === ' ' && e.target.matches('.scroll-to-bottom, .scroll-to-top')) {
        e.preventDefault();
        e.target.click();
    }
});

// ===== LOADING ANIMATION =====
window.addEventListener('load', function() {
    document.body.classList.add('loaded');
    console.log('🎉 Contact page fully loaded and ready!');
    
    // Test functionality after load
    setTimeout(() => {
        const scrollBottomBtn = document.querySelector('.scroll-to-bottom');
        const scrollTopBtn = document.querySelector('.scroll-to-top');
        const mobileToggle = document.querySelector('.mobile-menu-toggle');
        const contactForm = document.querySelector('#contactForm');
        
        console.log('🔍 Feature check:');
        console.log('  Scroll bottom button:', scrollBottomBtn ? '✅ Found' : '❌ Missing');
        console.log('  Scroll top button:', scrollTopBtn ? '✅ Found' : '❌ Missing');
        console.log('  Mobile toggle:', mobileToggle ? '✅ Found' : '❌ Missing');
        console.log('  Contact form:', contactForm ? '✅ Found' : '❌ Missing');
        
        if (scrollBottomBtn) {
            console.log('⬇️ You can click the scroll down button to test it');
        }
        if (mobileToggle) {
            console.log('📱 Resize window to <768px to see mobile menu');
        }
        if (contactForm) {
            console.log('📝 Contact form is ready for submissions');
        }
    }, 1000);
});

// ===== TOUCH GESTURES FOR MOBILE =====
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

// ===== DEVELOPMENT HELPERS =====
if (window.location.hostname === 'localhost' || 
    window.location.hostname === '127.0.0.1' || 
    window.location.hostname.includes('127.') ||
    window.location.protocol === 'file:') {
    
    console.log('🔧 Development mode detected');
    
    // Add development helpers
    window.lcsPrime = {
        trackEvent: trackEvent,
        scrollToBottom: () => {
            const documentHeight = Math.max(
                document.body.scrollHeight,
                document.body.offsetHeight,
                document.documentElement.clientHeight,
                document.documentElement.scrollHeight,
                document.documentElement.offsetHeight
            );
            window.scrollTo({
                top: documentHeight,
                behavior: 'smooth'
            });
        },
        scrollToTop: () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        },
        testMobileMenu: () => {
            const toggle = document.querySelector('.mobile-menu-toggle');
            if (toggle) {
                toggle.click();
                console.log('📱 Mobile menu toggled');
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
        }
    };
    
    console.log('💻 Development helpers available on window.lcsPrime');
    console.log('📱 Test mobile menu: window.lcsPrime.testMobileMenu()');
    console.log('⬇️ Test scroll buttons: window.lcsPrime.testScrollButtons()');
}

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

// Export functions for potential module use
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        trackEvent,
        debounce,
        throttle,
        initMobileMenu,
        initScrollButtons
    };
}