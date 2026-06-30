/**
 * Freelance Brand Identity Designer - Main Interaction Script
 */

document.addEventListener('DOMContentLoaded', () => {
  initPageLoader();
  initNavbarScroll();
  initMobileMenu();
  initFAQAccordion();
  initColorCopy();
  initContactForms();
  highlightActiveNavLink();
  initScrollToTop();
});

/**
 * 1. Page Loader
 */
function initPageLoader() {
  const loader = document.querySelector('.page-loader');
  if (loader) {
    window.addEventListener('load', () => {
      setTimeout(() => {
        loader.classList.add('loaded');
      }, 500); // Small delay to guarantee visual smoothness
    });
    
    // Fallback if window load doesn't fire or takes too long
    setTimeout(() => {
      if (!loader.classList.contains('loaded')) {
        loader.classList.add('loaded');
      }
    }, 3000);
  }
}

/**
 * 2. Sticky Navbar Scrolling state
 */
function initNavbarScroll() {
  const navbar = document.querySelector('.custom-navbar');
  if (navbar) {
    const checkScroll = () => {
      if (window.scrollY > 30) {
        navbar.classList.add('scrolled');
      } else {
        navbar.classList.remove('scrolled');
      }
    };
    
    window.addEventListener('scroll', checkScroll);
    checkScroll(); // Run once in case user loads page scrolled down
  }
}

/**
 * 3. Mobile Menu Toggle & Dropdowns
 */
function initMobileMenu() {
  const mobileToggle = document.querySelector('.mobile-menu-toggle');
  const navMenu = document.querySelector('.nav-menu');
  const navItems = document.querySelectorAll('.nav-item');
  
  if (mobileToggle && navMenu) {
    mobileToggle.addEventListener('click', () => {
      mobileToggle.classList.toggle('active');
      navMenu.classList.toggle('active');
      document.body.classList.toggle('overflow-hidden'); // Prevent background scrolling
    });
    
    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
      if (!navMenu.contains(e.target) && !mobileToggle.contains(e.target) && navMenu.classList.contains('active')) {
        mobileToggle.classList.remove('active');
        navMenu.classList.remove('active');
        document.body.classList.remove('overflow-hidden');
      }
    });

    // Mobile nested dropdown toggling
    navItems.forEach(item => {
      const dropdown = item.querySelector('.nav-dropdown');
      const link = item.querySelector('.nav-link');
      
      if (dropdown && link) {
        link.addEventListener('click', (e) => {
          if (window.innerWidth <= 991.98) {
            e.preventDefault();
            item.classList.toggle('dropdown-active');
            
            // Dynamic height adjustments for dropdown
            if (item.classList.contains('dropdown-active')) {
              dropdown.style.display = 'block';
            } else {
              dropdown.style.display = 'none';
            }
          }
        });
      }
    });
  }
}

/**
 * 4. FAQ Accordion Systems
 */
function initFAQAccordion() {
  const faqItems = document.querySelectorAll('.faq-item');
  
  faqItems.forEach(item => {
    const questionBtn = item.querySelector('.faq-question');
    const answer = item.querySelector('.faq-answer');
    
    if (questionBtn && answer) {
      questionBtn.addEventListener('click', () => {
        const isActive = item.classList.contains('active');
        
        // Collapse all items first
        faqItems.forEach(otherItem => {
          otherItem.classList.remove('active');
          const otherAnswer = otherItem.querySelector('.faq-answer');
          if (otherAnswer) otherAnswer.style.maxHeight = null;
        });
        
        // If not already active, expand clicked item
        if (!isActive) {
          item.classList.add('active');
          answer.style.maxHeight = answer.scrollHeight + 'px';
        }
      });
    }
  });
}

/**
 * 5. Interactive HEX Color Copier
 */
function initColorCopy() {
  const swatches = document.querySelectorAll('.color-swatch-display');
  
  swatches.forEach(swatch => {
    swatch.addEventListener('click', () => {
      const parent = swatch.closest('.color-swatch');
      if (!parent) return;
      
      const hexText = parent.querySelector('.color-swatch-hex').textContent.trim();
      const badge = swatch.querySelector('.color-swatch-copy-badge');
      
      // Copy to clipboard
      navigator.clipboard.writeText(hexText).then(() => {
        if (badge) {
          badge.textContent = 'Copied!';
          badge.style.opacity = '1';
          badge.style.transform = 'translate(-50%, -50%) scale(1)';
          
          setTimeout(() => {
            badge.style.opacity = '';
            badge.style.transform = '';
            setTimeout(() => {
              badge.textContent = 'Copy HEX';
            }, 300);
          }, 1500);
        }
        showToast(`Color ${hexText} copied to clipboard.`);
      }).catch(err => {
        console.error('Could not copy text: ', err);
      });
    });
  });
}

/**
 * 6. Contact and Booking Forms Handling
 */
function initContactForms() {
  const forms = document.querySelectorAll('form');
  
  forms.forEach(form => {
    form.addEventListener('submit', (e) => {
      // Intercept submit
      e.preventDefault();
      
      const submitBtn = form.querySelector('button[type="submit"]');
      const originalText = submitBtn ? submitBtn.innerHTML : 'Submit';
      
      if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.innerHTML = 'Sending...';
      }
      
      // Simulate API call
      setTimeout(() => {
        if (submitBtn) {
          submitBtn.disabled = false;
          submitBtn.innerHTML = originalText;
        }
        
        // Determine type of message
        let msg = 'Thank you for your message! I will get back to you shortly.';
        if (form.closest('.booking-form-container') || form.id === 'discovery-form') {
          msg = 'Consultation request received! Let\'s build something extraordinary.';
        } else if (form.closest('.newsletter-form')) {
          msg = 'Subscribed successfully. Welcome to the design dispatch.';
        }
        
        showToast(msg);
        form.reset();
      }, 1500);
    });
  });
}

/**
 * Helper: Highlight Active Page Navigation Links
 */
function highlightActiveNavLink() {
  const path = window.location.pathname;
  const page = path.split('/').pop() || 'index.html';
  const navLinks = document.querySelectorAll('.nav-menu .nav-link, .nav-dropdown-item a');
  
  navLinks.forEach(link => {
    const href = link.getAttribute('href');
    if (href === page) {
      link.closest('.nav-item')?.classList.add('active');
      link.classList.add('active-link');
    }
  });
}

/**
 * Helper: Display Premium Notification Toast
 */
function showToast(message) {
  // Check if toast element already exists
  let toast = document.querySelector('.toast-alert');
  
  if (!toast) {
    toast = document.createElement('div');
    toast.className = 'toast-alert';
    document.body.appendChild(toast);
  }
  
  toast.textContent = message;
  toast.classList.add('show');
  
  setTimeout(() => {
    toast.classList.remove('show');
  }, 4000);
}

/**
 * Helper: Scroll to Top Button Injection & Behavior
 */
function initScrollToTop() {
  // Create button element dynamically
  const scrollBtn = document.createElement('button');
  scrollBtn.id = 'scroll-to-top';
  scrollBtn.className = 'scroll-to-top-btn';
  scrollBtn.setAttribute('aria-label', 'Scroll to top');
  
  // Clean minimal chevron-up SVG icon
  scrollBtn.innerHTML = `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
      <polyline points="18 15 12 9 6 15"></polyline>
    </svg>
  `;
  
  document.body.appendChild(scrollBtn);
  
  const toggleVisibility = () => {
    if (window.scrollY > 300) {
      scrollBtn.classList.add('visible');
    } else {
      scrollBtn.classList.remove('visible');
    }
  };
  
  window.addEventListener('scroll', toggleVisibility);
  toggleVisibility(); // Trigger initial check
  
  // Smooth scroll back to top on click
  scrollBtn.addEventListener('click', () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });
}
