/**
 * Freelance Brand Identity Designer - GSAP and Fallback Animation System
 */

document.addEventListener('DOMContentLoaded', () => {
  // Initialize animations after page finishes loading or loader clears
  window.addEventListener('load', () => {
    setTimeout(initAnimations, 600);
  });
});

function initAnimations() {
  // Detect if GSAP is loaded
  if (typeof gsap !== 'undefined') {
    initGSAPAnimations();
  } else {
    console.log('GSAP not loaded. Activating premium CSS fallback animations.');
    initCSSFallbackAnimations();
  }
}

/**
 * GSAP Animation System (Premium Mode)
 */
function initGSAPAnimations() {
  // Register ScrollTrigger plugin if present
  if (typeof ScrollTrigger !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger);
  }

  // 1. Hero Reveal animations (Timeline)
  const heroTL = gsap.timeline();
  
  if (document.querySelector('.hero-title')) {
    heroTL.fromTo('.hero-pre', 
      { y: 30, opacity: 0 }, 
      { y: 0, opacity: 1, duration: 0.8, ease: 'power3.out' }
    )
    .fromTo('.hero-title', 
      { y: 40, opacity: 0 }, 
      { y: 0, opacity: 1, duration: 1, ease: 'power3.out' }, 
      '-=0.6'
    )
    .fromTo('.hero-desc', 
      { y: 20, opacity: 0 }, 
      { y: 0, opacity: 1, duration: 0.8, ease: 'power2.out' }, 
      '-=0.6'
    )
    .fromTo('.hero-actions', 
      { y: 20, opacity: 0 }, 
      { y: 0, opacity: 1, duration: 0.8, ease: 'power2.out' }, 
      '-=0.6'
    );
  }

  // 2. Navigation slide-in
  gsap.fromTo('.custom-navbar', 
    { y: -50, opacity: 0 }, 
    { y: 0, opacity: 1, duration: 1.2, ease: 'power4.out', delay: 0.1 }
  );

  // 3. Scroll Triggered Elements (Fade up)
  const fadeUps = document.querySelectorAll('.animate-fade-up');
  fadeUps.forEach(element => {
    gsap.fromTo(element, 
      { y: 40, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 1,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: element,
          start: 'top 88%',
          toggleActions: 'play none none none'
        }
      }
    );
  });

  // 4. Image Reveal Overlays
  const reveals = document.querySelectorAll('.reveal-wrapper');
  reveals.forEach(wrapper => {
    const overlay = wrapper.querySelector('.reveal-overlay');
    if (overlay) {
      gsap.to(overlay, {
        scaleY: 0,
        transformOrigin: 'top',
        duration: 1.2,
        ease: 'power3.inOut',
        scrollTrigger: {
          trigger: wrapper,
          start: 'top 85%',
          onEnter: () => wrapper.classList.add('revealed')
        }
      });
    }
  });

  // 5. Staggered Portfolio/Service grids
  const staggeredGrids = document.querySelectorAll('.staggered-grid');
  staggeredGrids.forEach(grid => {
    const items = grid.querySelectorAll('.grid-item-animate');
    if (items.length > 0) {
      gsap.fromTo(items, 
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.15,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: grid,
            start: 'top 85%',
            toggleActions: 'play none none none'
          }
        }
      );
    }
  });
}

/**
 * CSS Fallback System (IntersectionObserver-based)
 */
function initCSSFallbackAnimations() {
  const options = {
    root: null,
    rootMargin: '0px -5% -10% 0px',
    threshold: 0.1
  };

  const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('active');
        
        // Handle manual slide up animations or image reveals
        if (entry.target.classList.contains('reveal-wrapper')) {
          entry.target.classList.add('revealed');
        }
        
        // If it's a staggered grid, trigger child items sequentially
        if (entry.target.classList.contains('staggered-grid')) {
          const items = entry.target.querySelectorAll('.grid-item-animate');
          items.forEach((item, index) => {
            setTimeout(() => {
              item.classList.add('active');
            }, index * 150);
          });
        }
        
        observer.unobserve(entry.target);
      }
    });
  }, options);

  // Register elements with observer
  document.querySelectorAll('.animate-fade-up, .animate-fade-in, .reveal-wrapper, .staggered-grid').forEach(element => {
    observer.observe(element);
  });
  
  // Directly reveal Hero sections to avoid layout delay when offline
  const heroPre = document.querySelector('.hero-pre');
  const heroTitle = document.querySelector('.hero-title');
  const heroDesc = document.querySelector('.hero-desc');
  const heroActions = document.querySelector('.hero-actions');
  
  if (heroTitle) {
    setTimeout(() => {
      if (heroPre) heroPre.classList.add('active');
      heroTitle.classList.add('active');
      if (heroDesc) heroDesc.classList.add('active');
      if (heroActions) heroActions.classList.add('active');
    }, 100);
  }
}
