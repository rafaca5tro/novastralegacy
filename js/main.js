/**
 * Novastra Legacy Website - Main JavaScript File
 *
 * Handles:
 * - Mobile Menu Toggle
 * - Smooth Scrolling
 * - Reveal on Scroll Animations
 * - Sports Properties Carousel Logic
 * - Animated Quote Text
 * - Image Lazy Loading
 * - Stat Counter Animation
 * - Form Validation
 */

document.addEventListener('DOMContentLoaded', function() {

    /** ---------------------------------------------------------------------
     * Helper Function: Debounce
     * Limits the rate at which a function can fire.
     * ---------------------------------------------------------------------- */
    function debounce(func, wait, immediate) {
        let timeout;
        return function executedFunction() {
            const context = this;
            const args = arguments;
            const later = function() {
                timeout = null;
                if (!immediate) func.apply(context, args);
            };
            const callNow = immediate && !timeout;
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
            if (callNow) func.apply(context, args);
        };
    }

    /** ---------------------------------------------------------------------
     * 1. Mobile Menu Functionality
     * ---------------------------------------------------------------------- */
    const mobileMenuToggle = document.getElementById('mobile-menu-toggle');
    const mobileMenu = document.getElementById('mobile-menu');

    if (mobileMenuToggle && mobileMenu) {
        mobileMenuToggle.addEventListener('click', () => {
            const isExpanded = mobileMenu.classList.toggle('hidden');
            mobileMenuToggle.setAttribute('aria-expanded', String(!isExpanded));
        });

        // Close menu when a link inside it is clicked
        mobileMenu.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                if (!mobileMenu.classList.contains('hidden')) {
                    mobileMenu.classList.add('hidden');
                    mobileMenuToggle.setAttribute('aria-expanded', 'false');
                }
            });
        });

         // Close mobile menu if window is resized to desktop width
         window.addEventListener('resize', debounce(() => {
            if (window.innerWidth >= 768 && !mobileMenu.classList.contains('hidden')) {
                mobileMenu.classList.add('hidden');
                mobileMenuToggle.setAttribute('aria-expanded', 'false');
            }
        }, 250));

    } else {
        console.warn("Mobile menu toggle or menu element not found.");
    }

    /** ---------------------------------------------------------------------
     * 2. Smooth Scrolling for Anchor Links
     * ---------------------------------------------------------------------- */
    // Select links within navs, footer, and specific buttons
    const smoothScrollLinks = document.querySelectorAll('a[href^="#"]');
    const header = document.querySelector('header'); // Get the sticky header

    smoothScrollLinks.forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');

            // Handle the "#" link (scroll to top)
            if (href === '#') {
                e.preventDefault();
                window.scrollTo({ top: 0, behavior: 'smooth' });
                // Close mobile menu if open (handled by link click listener above)
                return;
            }

            // Handle actual anchor links
            let targetElement = null;
            try {
                // Basic querySelector should be sufficient for standard IDs
                targetElement = document.querySelector(href);
            } catch (error) {
                console.warn(`Invalid selector for smooth scroll: ${href}`, error);
                return; // Stop if selector is invalid
            }

            if (targetElement) {
                e.preventDefault(); // Prevent default jump only if target exists

                const headerHeight = header ? header.offsetHeight : 0;
                // Calculate position correctly, considering scroll offset and header height
                const elementPosition = targetElement.getBoundingClientRect().top + window.pageYOffset;
                // Adjust offset slightly (e.g., 1rem buffer below header)
                const offsetPosition = elementPosition - headerHeight - 16;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth' // Smooth behavior is handled by CSS `scroll-behavior: smooth;`
                });

                 // Close mobile menu if open (handled by link click listener above)

            } else {
                console.warn(`Smooth scroll target element not found for selector: ${href}`);
                // Allow default behavior (jump or navigate) if target is not on the page
            }
        });
    });

    /** ---------------------------------------------------------------------
     * 3. Reveal on Scroll Animation
     * ---------------------------------------------------------------------- */
    const revealElements = document.querySelectorAll('.reveal-on-scroll');

    // Check if IntersectionObserver is supported
    if ('IntersectionObserver' in window && revealElements.length > 0) {
        const revealObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                // If element is in viewport
                if (entry.isIntersecting) {
                    entry.target.classList.add('revealed');
                    // Stop observing the element once revealed
                    observer.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.1, // Trigger when 10% of the element is visible
            rootMargin: '0px 0px -30px 0px' // Optional: Trigger slightly before it's fully in view
        });

        revealElements.forEach(element => {
            if (element) { // Check if element exists before observing
                 revealObserver.observe(element);
            } else {
                console.warn('Null element encountered in revealElements');
            }
        });

    } else {
        // Fallback for older browsers: Reveal all elements immediately
        console.warn("IntersectionObserver not supported or no reveal elements found. Revealing all elements.");
        revealElements.forEach(element => { if(element) element.classList.add('revealed'); });
    }

    /** ---------------------------------------------------------------------
     * 4. Sports Properties Carousel (Grid-Based Layout)
     * ---------------------------------------------------------------------- */
    const sportsCarousel = document.querySelector('.sports-carousel');
    if (sportsCarousel) {
        const items = document.querySelectorAll('.sports-carousel-item');
        
        // Auto-highlight effect
        let currentIndex = 0;
        
        function highlightItem() {
            // Remove highlight from all items
            items.forEach(item => {
                item.classList.remove('active');
                item.style.transform = 'scale(1)';
                const img = item.querySelector('img');
                if (img) {
                    img.style.filter = 'grayscale(80%) brightness(0.9) opacity(0.7)';
                }
            });
            
            // Add highlight to current item
            if (items[currentIndex]) {
                items[currentIndex].classList.add('active');
                items[currentIndex].style.transform = 'scale(1.1)';
                const img = items[currentIndex].querySelector('img');
                if (img) {
                    img.style.filter = 'grayscale(0%) brightness(1) opacity(1)';
                }
                
                // Increment index for next time
                currentIndex = (currentIndex + 1) % items.length;
            }
        }
        
        // Initial highlight
        highlightItem();
        
        // Set interval for auto-highlight
        const highlightInterval = setInterval(highlightItem, 2000);
        
        // Add mouseover/mouseout effects
        items.forEach(item => {
            item.addEventListener('mouseover', function() {
                clearInterval(highlightInterval);
                
                // Reset all items
                items.forEach(i => {
                    i.classList.remove('active');
                    i.style.transform = 'scale(1)';
                    const img = i.querySelector('img');
                    if (img) {
                        img.style.filter = 'grayscale(80%) brightness(0.9) opacity(0.7)';
                    }
                });
                
                // Highlight hovered item
                this.classList.add('active');
                this.style.transform = 'scale(1.1)';
                const img = this.querySelector('img');
                if (img) {
                    img.style.filter = 'grayscale(0%) brightness(1) opacity(1)';
                }
            });
            
            item.addEventListener('mouseout', function() {
                // Restart the auto-highlight when mouse leaves
                currentIndex = 0;
                highlightItem();
                const restartInterval = setInterval(highlightItem, 2000);
                highlightInterval = restartInterval;
            });
        });
    }

    /** ---------------------------------------------------------------------
     * 5. Animated Quote Text
     * ---------------------------------------------------------------------- */
    const quoteTextElement = document.querySelector('.quote-text');
    
    if (quoteTextElement) {
        const originalQuote = quoteTextElement.textContent;
        
        const animateQuote = () => {
            if (quoteTextElement.classList.contains('quote-animated')) {
                return; // Exit if already animated
            }
            
            quoteTextElement.textContent = ''; // Clear existing text
            const words = originalQuote.split(/(\s+)/); // Split by space, keeping spaces
            let wordDelay = 0;
            
            words.forEach((part) => {
                if (part.trim().length > 0) { // Process actual words
                    const span = document.createElement('span');
                    span.textContent = part;
                    // Apply styles directly for robustness
                    span.style.opacity = '0';
                    span.style.display = 'inline-block';
                    span.style.transform = 'translateY(10px)';
                    span.style.animation = `fadeInWord 0.4s ease ${wordDelay}s forwards`;
                    quoteTextElement.appendChild(span);
                    wordDelay += 0.12; // Adjust delay between words
                } else { // Append spaces directly
                    quoteTextElement.appendChild(document.createTextNode(part));
                }
            });
            
            quoteTextElement.classList.add('quote-animated'); // Mark as animated
        };
        
        // Trigger animation when the quote section scrolls into view
        const quoteContainer = document.querySelector('.quote-container');
        if (quoteContainer && 'IntersectionObserver' in window) {
            const quoteObserver = new IntersectionObserver((entries, observer) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        // Delay animation slightly after intersection
                        setTimeout(animateQuote, 200); // 200ms delay
                        observer.unobserve(entry.target); // Animate only once
                    }
                });
            }, { threshold: 0.6 }); // Trigger when 60% visible
            
            quoteObserver.observe(quoteContainer);
        } else {
            // Fallback if IntersectionObserver is not supported or container not found
            setTimeout(animateQuote, 1000); // Animate after a delay
        }
    }

    /** ---------------------------------------------------------------------
     * 6. Image Lazy Loading
     * ---------------------------------------------------------------------- */
    const lazyImages = document.querySelectorAll('img[loading="lazy"]');
    
    if ('IntersectionObserver' in window && lazyImages.length > 0) {
        const lazyImageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    if (img.dataset.src) {
                        img.src = img.dataset.src;
                    }
                    img.onload = () => {
                        img.classList.remove('lazy-image');
                        img.classList.add('loaded-image');
                        img.style.transition = 'opacity 0.5s ease';
                        img.style.opacity = '1';
                    };
                    observer.unobserve(img);
                }
            });
        }, { rootMargin: "0px 0px 200px 0px" }); // Load images 200px before they enter viewport
        
        lazyImages.forEach(img => {
            // Add initial styling
            img.style.opacity = '0.1';
            img.classList.add('lazy-image');
            lazyImageObserver.observe(img);
        });
    } else if (lazyImages.length > 0) {
        // Fallback for browsers that don't support IntersectionObserver
        lazyImages.forEach(img => {
            if (img.dataset.src) {
                img.src = img.dataset.src;
            }
            img.classList.remove('lazy-image');
            img.classList.add('loaded-image');
            img.style.opacity = '1';
        });
    }

    /** ---------------------------------------------------------------------
     * 7. Stat Counter Animation
     * ---------------------------------------------------------------------- */
    const statCounters = document.querySelectorAll('.stat-counter[data-target]');

    const animateCounter = (element, start, end, duration, suffix = '') => {
        let startTime = null;
        
        const step = (currentTime) => {
            if (!startTime) startTime = currentTime;
            const progress = Math.min((currentTime - startTime) / duration, 1);
            // Ease-out calculation for smoother animation
            const easedProgress = 1 - Math.pow(1 - progress, 3);
            const currentVal = Math.floor(easedProgress * (end - start) + start);
            
            if (element) {
                element.textContent = currentVal + suffix;
            }
            
            if (progress < 1) {
                window.requestAnimationFrame(step);
            }
        };
        
        window.requestAnimationFrame(step);
    };

    if ('IntersectionObserver' in window && statCounters.length > 0) {
        const counterObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const counter = entry.target;
                    const target = parseInt(counter.dataset.target, 10);
                    const duration = parseInt(counter.dataset.duration || 2000, 10);
                    const suffix = counter.dataset.suffix || '';
                    
                    if (!isNaN(target) && counter) {
                        animateCounter(counter, 0, target, duration, suffix);
                    }
                    
                    observer.unobserve(counter);
                }
            });
        }, { threshold: 0.5 });
        
        statCounters.forEach(counter => {
            if (counter) counterObserver.observe(counter);
        });
    } else if (statCounters.length > 0) {
        // Fallback: Animate immediately
        statCounters.forEach(counter => {
            if (counter) {
                const target = parseInt(counter.dataset.target, 10);
                const duration = parseInt(counter.dataset.duration || 2000, 10);
                const suffix = counter.dataset.suffix || '';
                
                if (!isNaN(target)) {
                    animateCounter(counter, 0, target, duration, suffix);
                }
            }
        });
    }

    /** ---------------------------------------------------------------------
     * 8. Form Validation Enhancement
     * ---------------------------------------------------------------------- */
    const forms = document.querySelectorAll('.needs-validation');
    
    if (forms.length > 0) {
        Array.from(forms).forEach(form => {
            // Add input validation styling
            const inputs = form.querySelectorAll('input[required], textarea[required]');
            
            inputs.forEach(input => {
                // Add visual feedback when input changes
                input.addEventListener('blur', () => {
                    if (input.checkValidity()) {
                        input.classList.add('is-valid');
                        input.classList.remove('is-invalid');
                    } else {
                        input.classList.add('is-invalid');
                        input.classList.remove('is-valid');
                    }
                });
                
                // Clear validation styling on focus
                input.addEventListener('focus', () => {
                    input.classList.remove('is-invalid');
                });
            });
            
            // Form submission validation
            form.addEventListener('submit', event => {
                if (!form.checkValidity()) {
                    event.preventDefault();
                    event.stopPropagation();
                    
                    // Add visual feedback to all required fields
                    inputs.forEach(input => {
                        if (!input.checkValidity()) {
                            input.classList.add('is-invalid');
                        }
                    });
                    
                    // Scroll to first invalid input
                    const firstInvalid = form.querySelector('.is-invalid');
                    if (firstInvalid) {
                        firstInvalid.focus();
                        firstInvalid.scrollIntoView({ behavior: 'smooth', block: 'center' });
                    }
                } else {
                    // Success feedback
                    const submitBtn = form.querySelector('button[type="submit"]');
                    if (submitBtn) {
                        const originalText = submitBtn.textContent;
                        submitBtn.textContent = 'Sending...';
                        submitBtn.disabled = true;
                        
                        // Re-enable after timeout (in case form submission takes longer)
                        setTimeout(() => {
                            submitBtn.textContent = originalText;
                            submitBtn.disabled = false;
                        }, 3000);
                    }
                }
                
                form.classList.add('was-validated');
            }, false);
        });
    }

    /** ---------------------------------------------------------------------
     * 9. Hero Logo Animation
     * ---------------------------------------------------------------------- */
    const heroLogo = document.querySelector('.hero-logo-bounce');
    if (heroLogo) {
        heroLogo.style.animation = 'subtleBounce 4s ease-in-out infinite';
    }

    /** ---------------------------------------------------------------------
     * 10. Add Parallax Scrolling Effect to Section Backgrounds
     * ---------------------------------------------------------------------- */
    const parallaxBgs = document.querySelectorAll('.section-dark');
    
    function updateParallax() {
        parallaxBgs.forEach(section => {
            const scrollPosition = window.pageYOffset;
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            
            // Only apply effect when section is visible
            if (scrollPosition + window.innerHeight > sectionTop && 
                scrollPosition < sectionTop + sectionHeight) {
                
                // Calculate parallax offset (adjust the division value to control effect intensity)
                const offset = (scrollPosition - sectionTop) / 5;
                
                // Apply transform to create parallax effect
                section.style.backgroundPosition = `center ${-offset}px`;
            }
        });
    }
    
    // Only add the parallax effect if not on mobile (reduces jank on mobile devices)
    if (window.innerWidth >= 768 && parallaxBgs.length > 0) {
        window.addEventListener('scroll', debounce(updateParallax, 10));
        updateParallax(); // Initial call
    }

}); // End DOMContentLoaded