/* ==========================================================================
   ScaleX Media — Main JavaScript Controller
   Features: Interactivity, Lightbox, Video Fallback, Counter Animations, 
             Scroll Observers, Form Validation & WhatsApp Redirect Flow
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {

  /* ------------------------------------------------------------------------
     1. FORM & WHATSAPP CONFIGURATION
     ------------------------------------------------------------------------ */
  // SETUP: create a free form at formspree.io using anandsingh7206@gmail.com,
  // then paste your endpoint ID below:
  const FORM_ENDPOINT = "https://formspree.io/f/YOUR_FORM_ID";
  const WHATSAPP_NUMBER = "918052661507";

  /* ------------------------------------------------------------------------
     2. MOBILE MENU DRAWER TOGGLE
     ------------------------------------------------------------------------ */
  const mobileMenuBtn = document.getElementById('mobileMenuBtn');
  const mobileDrawer = document.getElementById('mobileDrawer');
  const iconMenu = mobileMenuBtn ? mobileMenuBtn.querySelector('.icon-menu') : null;
  const iconClose = mobileMenuBtn ? mobileMenuBtn.querySelector('.icon-close') : null;
  const mobileLinks = document.querySelectorAll('.mobile-nav-link, .mobile-drawer-cta a');

  if (mobileMenuBtn && mobileDrawer) {
    mobileMenuBtn.addEventListener('click', () => {
      const isOpen = mobileDrawer.classList.contains('active');
      if (isOpen) {
        closeMobileDrawer();
      } else {
        openMobileDrawer();
      }
    });

    mobileLinks.forEach(link => {
      link.addEventListener('click', () => {
        closeMobileDrawer();
      });
    });
  }

  function openMobileDrawer() {
    mobileDrawer.classList.add('active');
    mobileDrawer.setAttribute('aria-hidden', 'false');
    mobileMenuBtn.setAttribute('aria-expanded', 'true');
    if (iconMenu && iconClose) {
      iconMenu.classList.add('hidden');
      iconClose.classList.remove('hidden');
    }
  }

  function closeMobileDrawer() {
    mobileDrawer.classList.remove('active');
    mobileDrawer.setAttribute('aria-hidden', 'true');
    mobileMenuBtn.setAttribute('aria-expanded', 'false');
    if (iconMenu && iconClose) {
      iconMenu.classList.remove('hidden');
      iconClose.classList.add('hidden');
    }
  }

  /* ------------------------------------------------------------------------
     3. FOUNDER VIDEO FILE DETECTOR & PLACEHOLDER MANAGEMENT
     ------------------------------------------------------------------------ */
  const founderVideo = document.getElementById('founderVideo');
  const videoPlaceholder = document.getElementById('videoPlaceholder');

  if (founderVideo && videoPlaceholder) {
    // Attempt to verify video file availability on disk
    fetch('assets/founder-anand.mp4', { method: 'HEAD' })
      .then(response => {
        if (response.ok) {
          // File exists on server, reveal video player on play or load
          founderVideo.addEventListener('play', () => {
            videoPlaceholder.style.opacity = '0';
            setTimeout(() => videoPlaceholder.classList.add('hidden'), 300);
          });
        } else {
          // Keep styled placeholder visible
          videoPlaceholder.classList.remove('hidden');
        }
      })
      .catch(() => {
        // Fallback: file missing, display placeholder cleanly
        videoPlaceholder.classList.remove('hidden');
      });

    // If user clicks on placeholder panel, attempt video play
    videoPlaceholder.addEventListener('click', () => {
      founderVideo.play().then(() => {
        videoPlaceholder.style.opacity = '0';
        setTimeout(() => videoPlaceholder.classList.add('hidden'), 300);
      }).catch(() => {
        // Video file not ready yet, keep placeholder active
      });
    });
  }

  /* ------------------------------------------------------------------------
     4. INTERSECTION OBSERVER FOR FADE-UP SCROLL ANIMATIONS
     ------------------------------------------------------------------------ */
  const fadeUpElements = document.querySelectorAll('.fade-up');

  if ('IntersectionObserver' in window) {
    const fadeObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, {
      root: null,
      threshold: 0.12
    });

    fadeUpElements.forEach(el => fadeObserver.observe(el));
  } else {
    // Fallback for older browsers
    fadeUpElements.forEach(el => el.classList.add('visible'));
  }

  /* ------------------------------------------------------------------------
     5. ANIMATED COUNTER STRIP ON SCROLL
     ------------------------------------------------------------------------ */
  const counterValues = document.querySelectorAll('.counter-value');
  let countersTriggered = false;

  function runCounters() {
    counterValues.forEach(counter => {
      const target = parseFloat(counter.getAttribute('data-target'));
      const decimals = parseInt(counter.getAttribute('data-decimals') || '0');
      const duration = 1800; // 1.8 seconds
      const startTime = performance.now();

      function updateCount(currentTime) {
        const elapsedTime = currentTime - startTime;
        const progress = Math.min(elapsedTime / duration, 1);
        // Ease out quadratic function
        const easeProgress = 1 - Math.pow(1 - progress, 3);
        const currentValue = easeProgress * target;

        counter.innerText = currentValue.toFixed(decimals);

        if (progress < 1) {
          requestAnimationFrame(updateCount);
        } else {
          counter.innerText = target.toFixed(decimals);
        }
      }

      requestAnimationFrame(updateCount);
    });
  }

  const counterSection = document.getElementById('counterSection');
  if (counterSection && 'IntersectionObserver' in window) {
    const counterObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting && !countersTriggered) {
          countersTriggered = true;
          runCounters();
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.3 });

    counterObserver.observe(counterSection);
  }

  /* ------------------------------------------------------------------------
     6. SCREENSHOT LIGHTBOX MODAL
     ------------------------------------------------------------------------ */
  const lightboxModal = document.getElementById('lightboxModal');
  const lightboxImg = document.getElementById('lightboxImg');
  const lightboxMetric = document.getElementById('lightboxMetric');
  const lightboxPlatform = document.getElementById('lightboxPlatform');
  const lightboxClose = document.getElementById('lightboxClose');
  const lightboxBackdrop = document.querySelector('.lightbox-backdrop');
  const dashboardCards = document.querySelectorAll('.dashboard-card');

  if (lightboxModal && dashboardCards.length > 0) {
    dashboardCards.forEach(card => {
      card.addEventListener('click', () => {
        const imageSrc = card.getAttribute('data-lightbox');
        const metric = card.getAttribute('data-metric');
        const platform = card.getAttribute('data-platform');

        if (imageSrc) {
          lightboxImg.src = imageSrc;
          lightboxMetric.innerText = metric || '';
          lightboxPlatform.innerText = platform || '';

          if (platform === 'Google Ads') {
            lightboxPlatform.className = 'platform-badge platform-google';
          } else {
            lightboxPlatform.className = 'platform-badge platform-meta';
          }

          lightboxModal.classList.add('active');
          lightboxModal.setAttribute('aria-hidden', 'false');
          document.body.style.overflow = 'hidden'; // Lock background scroll
        }
      });
    });

    const closeLightbox = () => {
      lightboxModal.classList.remove('active');
      lightboxModal.setAttribute('aria-hidden', 'true');
      document.body.style.overflow = '';
      setTimeout(() => {
        lightboxImg.src = '';
      }, 300);
    };

    if (lightboxClose) lightboxClose.addEventListener('click', closeLightbox);
    if (lightboxBackdrop) lightboxBackdrop.addEventListener('click', closeLightbox);

    // Keyboard ESC key to dismiss modal
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && lightboxModal.classList.contains('active')) {
        closeLightbox();
      }
    });
  }

  /* ------------------------------------------------------------------------
     7. CONTACT FORM SUBMISSION & WHATSAPP REDIRECT FLOW
     ------------------------------------------------------------------------ */
  const auditForm = document.getElementById('auditForm');
  const submitBtn = document.getElementById('submitBtn');
  const formStatus = document.getElementById('formStatus');
  const replyToField = document.getElementById('replyToField');

  if (auditForm) {
    auditForm.addEventListener('submit', async (e) => {
      e.preventDefault();

      // Clear previous error states
      clearErrors();

      // Form input elements
      const nameInput = document.getElementById('name');
      const whatsappInput = document.getElementById('whatsapp');
      const emailInput = document.getElementById('email');
      const businessInput = document.getElementById('business');
      const budgetSelect = document.getElementById('budget');
      const serviceSelect = document.getElementById('service');
      const messageInput = document.getElementById('message');

      // Values
      const name = nameInput.value.trim();
      const whatsapp = whatsappInput.value.trim();
      const email = emailInput.value.trim();
      const business = businessInput.value.trim();
      const budget = budgetSelect.value;
      const service = serviceSelect.value;
      const message = messageInput.value.trim();

      // Client-side Validation
      let isValid = true;

      if (!name) {
        showError(nameInput, 'Please enter your full name');
        isValid = false;
      }

      const phoneRegex = /^[0-9]{10}$/;
      if (!whatsapp || !phoneRegex.test(whatsapp)) {
        showError(whatsappInput, 'Please enter a valid 10-digit mobile number');
        isValid = false;
      }

      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!email || !emailRegex.test(email)) {
        showError(emailInput, 'Please enter a valid email address');
        isValid = false;
      }

      if (!business) {
        showError(businessInput, 'Please enter your business or website name');
        isValid = false;
      }

      if (!budget) {
        showError(budgetSelect, 'Please select your monthly ad budget');
        isValid = false;
      }

      if (!service) {
        showError(serviceSelect, 'Please select the service needed');
        isValid = false;
      }

      if (!isValid) return;

      // Set reply-to for Formspree
      if (replyToField) replyToField.value = email;

      // Set Button Loading State
      setLoadingState(true);

      // Prepare payload for Formspree
      const formData = {
        name,
        whatsapp: `+91 ${whatsapp}`,
        email,
        business,
        budget,
        service,
        message: message || 'N/A'
      };

      // Construct pre-filled WhatsApp message
      const whatsappMsg = `Hi ScaleX Media, I'm ${name}.\nBusiness: ${business}\nService: ${service}\nMonthly budget: ${budget}\nI'd like a free audit.`;
      const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(whatsappMsg)}`;

      try {
        // Submit to Formspree if endpoint is configured
        if (FORM_ENDPOINT && !FORM_ENDPOINT.includes('YOUR_FORM_ID')) {
          await fetch(FORM_ENDPOINT, {
            method: 'POST',
            body: JSON.stringify(formData),
            headers: {
              'Content-Type': 'application/json',
              'Accept': 'application/json'
            }
          });
        }
      } catch (err) {
        console.warn('Formspree network submission warning:', err);
      } finally {
        // Display Success Banner & Redirect to WhatsApp
        showStatus('Redirecting you to WhatsApp...', 'success');
        
        setTimeout(() => {
          window.location.href = whatsappUrl;
        }, 800);
      }
    });
  }

  function showError(inputElement, message) {
    const parentGroup = inputElement.closest('.form-group');
    if (parentGroup) {
      parentGroup.classList.add('has-error');
      const errorSpan = parentGroup.querySelector('.form-error');
      if (errorSpan && message) {
        errorSpan.innerText = message;
      }
    }
  }

  function clearErrors() {
    const errorGroups = document.querySelectorAll('.form-group.has-error');
    errorGroups.forEach(group => group.classList.remove('has-error'));
    if (formStatus) {
      formStatus.className = 'form-status-banner hidden';
      formStatus.innerText = '';
    }
  }

  function setLoadingState(isLoading) {
    if (!submitBtn) return;
    const btnText = submitBtn.querySelector('.btn-text');
    const btnSpinner = submitBtn.querySelector('.btn-spinner');

    if (isLoading) {
      submitBtn.disabled = true;
      if (btnText) btnText.classList.add('hidden');
      if (btnSpinner) btnSpinner.classList.remove('hidden');
    } else {
      submitBtn.disabled = false;
      if (btnText) btnText.classList.remove('hidden');
      if (btnSpinner) btnSpinner.classList.add('hidden');
    }
  }

  function showStatus(msg, type) {
    if (!formStatus) return;
    formStatus.innerText = msg;
    formStatus.className = `form-status-banner ${type}`;
  }

  /* ------------------------------------------------------------------------
     8. DYNAMIC COSMIC BACKGROUND (Twinkling Stars Generator)
     ------------------------------------------------------------------------ */
  const cosmicStarsContainer = document.getElementById('cosmicStars');
  if (cosmicStarsContainer) {
    const isMobile = window.innerWidth < 768;
    const starCount = isMobile ? 30 : 60;
    const fragment = document.createDocumentFragment();

    for (let i = 0; i < starCount; i++) {
      const star = document.createElement('span');
      star.className = 'star-dot';
      
      // Randomize subtle blue tint or pure white
      if (Math.random() > 0.45) {
        star.classList.add('blue-tint');
      }

      // 1px to 2px size
      const size = (1 + Math.random() * 1.2).toFixed(1);
      const top = (Math.random() * 100).toFixed(2);
      const left = (Math.random() * 100).toFixed(2);
      
      // Random twinkle duration between 2s and 6s, and random delay
      const duration = (2 + Math.random() * 4).toFixed(2);
      const delay = (Math.random() * 5).toFixed(2);

      star.style.width = `${size}px`;
      star.style.height = `${size}px`;
      star.style.top = `${top}%`;
      star.style.left = `${left}%`;
      star.style.setProperty('--twinkle-duration', `${duration}s`);
      star.style.setProperty('--twinkle-delay', `${delay}s`);

      fragment.appendChild(star);
    }

    cosmicStarsContainer.appendChild(fragment);
  }

  /* ------------------------------------------------------------------------
     9. HEADER SCROLL STATE OBSERVER (Blur & Hairline Border)
     ------------------------------------------------------------------------ */
  const siteHeader = document.querySelector('.site-header');
  if (siteHeader) {
    let ticking = false;
    const handleHeaderScroll = () => {
      if (window.scrollY > 20) {
        siteHeader.classList.add('scrolled');
      } else {
        siteHeader.classList.remove('scrolled');
      }
      ticking = false;
    };

    window.addEventListener('scroll', () => {
      if (!ticking) {
        window.requestAnimationFrame(handleHeaderScroll);
        ticking = true;
      }
    }, { passive: true });

    // Initial check on page load
    handleHeaderScroll();
  }

});
