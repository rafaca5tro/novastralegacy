/**
 * Novastra Legacy Website - Main JavaScript File
 *
 * Handles:
 * - Mobile Menu Toggle
 * - Smooth Scrolling
 * - Reveal on Scroll Animations
 * - Sports Properties Carousel Logic
 * - Animated Quote Text
 * - Image Lazy Loading (if applicable)
 * - Other Interactive Effects
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
    const smoothScrollLinks = document.querySelectorAll('#main-menu a[href^="#"], #mobile-menu a[href^="#"], footer a[href^="#"], a.btn-secondary[href^="#"]');
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
    if ('IntersectionObserver' in window) {
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
        console.warn("IntersectionObserver not supported. Revealing all elements.");
        revealElements.forEach(element => { if(element) element.classList.add('revealed'); });
    }

    /** ---------------------------------------------------------------------
     * 4. Sports Properties Carousel
     * ---------------------------------------------------------------------- */
    const sportsCarousel = document.querySelector('.sports-carousel');
    if (sportsCarousel) {
        const track = sportsCarousel.querySelector('.sports-carousel-track');
        const items = sportsCarousel.querySelectorAll('.sports-carousel-item');
        const prevButton = sportsCarousel.querySelector('.sports-carousel-prev');
        const nextButton = sportsCarousel.querySelector('.sports-carousel-next');
        const dotsContainer = sportsCarousel.querySelector('.sports-carousel-dots');

        // Initial checks for essential elements
        if (!track || !items || items.length === 0 || !prevButton || !nextButton || !dotsContainer) {
             console.warn('Carousel elements missing (track, items, prev/next buttons, or dots container). Carousel disabled.');
             if(prevButton) prevButton.style.display = 'none';
             if(nextButton) nextButton.style.display = 'none';
             if(dotsContainer) dotsContainer.style.display = 'none';

        } else {
            let currentIndex = 0;
            const totalItems = items.length;
            let itemWidth = 150; // Will be calculated
            let itemsInView = 1; // Will be calculated

            const calculateCarouselParams = () => {
                // Calculate actual item width including margins if needed
                const itemStyle = window.getComputedStyle(items[0]);
                const itemMargin = parseFloat(itemStyle.marginLeft) + parseFloat(itemStyle.marginRight);
                itemWidth = items[0].offsetWidth + itemMargin;
                const containerWidth = sportsCarousel.offsetWidth;
                // Calculate how many full items fit
                itemsInView = Math.max(1, Math.floor(containerWidth / itemWidth));
            };

            const updateCarouselUI = () => {
                const maxPossibleIndex = Math.max(0, totalItems - itemsInView);
                // Clamp currentIndex within valid range [0, maxPossibleIndex]
                currentIndex = Math.max(0, Math.min(currentIndex, maxPossibleIndex));

                // Apply the translation to the track
                const translateX = -currentIndex * itemWidth;
                track.style.transform = `translateX(${translateX}px)`;

                // Update button states
                prevButton.disabled = currentIndex === 0;
                nextButton.disabled = currentIndex >= maxPossibleIndex;

                // Update dots
                const dots = dotsContainer.querySelectorAll('.sports-dot');
                dots.forEach((dot, index) => {
                    // Consider a dot active if it represents the first item currently visible
                    const isActive = index === currentIndex;
                    dot.classList.toggle('active', isActive);
                    dot.setAttribute('aria-selected', isActive);
                    dot.setAttribute('tabindex', isActive ? '0' : '-1');
                });
            };

            const setupDots = () => {
                dotsContainer.innerHTML = ''; // Clear existing dots

                // Only show dots if scrolling is possible (more items than fit in view)
                if (totalItems > itemsInView) {
                    dotsContainer.style.display = 'flex';

                    // Create one dot per item (or per scroll position, depending on desired behavior)
                    // Here, we create one dot per item for simplicity
                    for (let i = 0; i < totalItems; i++) {
                        const dot = document.createElement('button');
                        dot.classList.add('sports-dot');
                        dot.setAttribute('role', 'tab');
                        dot.setAttribute('aria-label', `Go to item ${i + 1}`);
                        dot.setAttribute('aria-controls', track.id || 'sports-carousel-track');
                        if (!track.id) track.id = 'sports-carousel-track';

                        dot.addEventListener('click', () => {
                            // Set index to the clicked dot's index
                            currentIndex = i;
                            // Recalculate max index based on current view params before updating
                            const maxPossibleIndex = Math.max(0, totalItems - itemsInView);
                            currentIndex = Math.min(currentIndex, maxPossibleIndex); // Ensure it doesn't go too far right
                            updateCarouselUI();
                        });

                        dotsContainer.appendChild(dot);
                    }
                    updateCarouselUI(); // Set initial active dot state

                } else {
                    dotsContainer.style.display = 'none'; // Hide if not scrollable
                }
            };

            const initCarousel = () => {
                 calculateCarouselParams();
                 setupDots();
                 updateCarouselUI();
            };

            // Event Listeners for Buttons
            prevButton.addEventListener('click', () => {
                // Move one step (e.g., one item) back
                currentIndex = Math.max(0, currentIndex - 1);
                updateCarouselUI();
            });

            nextButton.addEventListener('click', () => {
                // Move one step forward, considering itemsInView
                const maxPossibleIndex = Math.max(0, totalItems - itemsInView);
                currentIndex = Math.min(maxPossibleIndex, currentIndex + 1);
                updateCarouselUI();
            });

            // Debounced Resize Handler
            window.addEventListener('resize', debounce(initCarousel, 250));

            // Initial setup with a small delay for layout stability
            setTimeout(initCarousel, 150);
        }

    } else {
        console.log("Sports carousel element not found.");
    }


    /** ---------------------------------------------------------------------
     * 5. Animated Quote Text
     * ---------------------------------------------------------------------- */
    const quoteTextElement = document.querySelector('.quote-text');
    const originalQuote = "Legacies aren’t built in a day—they’re crafted with vision, innovation, and passion.";

    const animateQuote = () => {
        if (!quoteTextElement || quoteTextElement.classList.contains('quote-animated')) {
             return; // Exit if element not found or already animated
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
                span.style.animation = `fadeInWord 0.3s ease ${wordDelay}s forwards`;
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
    if (quoteContainer && quoteTextElement && 'IntersectionObserver' in window) {
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
    } else if (quoteTextElement) {
        // Fallback if IntersectionObserver is not supported or container not found
        console.warn("IntersectionObserver not supported for quote or container missing. Animating after delay.");
        setTimeout(animateQuote, 500); // Animate after a short delay
    }


    /** ---------------------------------------------------------------------
     * 6. Image Lazy Loading (Example - if using data-src)
     * Add 'lazy' class and data-src attribute to images in HTML to use this.
     * ---------------------------------------------------------------------- */
    const lazyImages = document.querySelectorAll('img.lazy[data-src]');
    if ('IntersectionObserver' in window && lazyImages.length > 0) {
        const lazyImageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src; // Load the image
                    img.onload = () => {
                         img.classList.remove('lazy'); // Optional: remove lazy class
                         img.classList.add('loaded'); // Optional: add loaded class for transition
                    };
                    img.onerror = () => { console.error(`Failed to load image: ${img.dataset.src}`); };
                    observer.unobserve(img); // Stop observing
                }
            });
        }, { rootMargin: "0px 0px 100px 0px" }); // Load images 100px before they enter viewport

        lazyImages.forEach(img => lazyImageObserver.observe(img));
    } else if (lazyImages.length > 0) {
        // Fallback for older browsers
        lazyImages.forEach(img => {
            img.src = img.dataset.src;
            img.classList.remove('lazy');
             img.classList.add('loaded');
        });
    }

    /** ---------------------------------------------------------------------
     * 7. Additional Hover Effects (Optional Enhancements)
     * Only needed if CSS :hover is insufficient.
     * ---------------------------------------------------------------------- */
    // document.querySelectorAll('.service-card, .btn, .icon-animate').forEach(el => {
    //     el.addEventListener('mouseenter', () => el.classList.add('js-hover'));
    //     el.addEventListener('mouseleave', () => el.classList.remove('js-hover'));
    // });


    /** ---------------------------------------------------------------------\
     * 8. Stat Counter Animation (if needed)\
     * Requires elements with class 'stat-counter', data-target, and optional data-duration / data-suffix.\
     * ---------------------------------------------------------------------- */\
    const statCounters = document.querySelectorAll('.stat-counter[data-target]');\
\
    const animateCounter = (element, start, end, duration) => {\
        let startTime = null;\
        const suffix = element.dataset.suffix || '';\
        const step = (currentTime) => {\
            if (!startTime) startTime = currentTime;\
            const progress = Math.min((currentTime - startTime) / duration, 1);\
            // Ease-out calculation: 1 - Math.pow(1 - progress, 3)\
            const easedProgress = 1 - Math.pow(1 - progress, 3);\
            const currentVal = Math.floor(easedProgress * (end - start) + start);\
            // Check if element still exists before updating\
            if (element) {\
                element.textContent = currentVal + suffix;\
            }\
            if (progress < 1) {\
                window.requestAnimationFrame(step);\
            }\
        };\
        window.requestAnimationFrame(step);\
    };\
\
    if ('IntersectionObserver' in window && statCounters.length > 0) {\
        const counterObserver = new IntersectionObserver((entries, observer) => {\
            entries.forEach(entry => {\
                if (entry.isIntersecting) {\
                    const counter = entry.target;\
                    const target = parseInt(counter.dataset.target, 10);\
                    const duration = parseInt(counter.dataset.duration || 2000, 10);\
                    if (!isNaN(target) && counter) { // Ensure target is a number and counter exists\
                         animateCounter(counter, 0, target, duration);\
                    }\
                    observer.unobserve(counter); // Animate only once\
                }\
            });\
        }, { threshold: 0.5 }); // Trigger when 50% visible\
\
        statCounters.forEach(counter => {\
            if (counter) counterObserver.observe(counter);\
        });\
    } else if (statCounters.length > 0) {\
         // Fallback: Animate immediately if observer not supported\
         statCounters.forEach(counter => {\
             if (counter) {\
                 const target = parseInt(counter.dataset.target, 10);\
                 const duration = parseInt(counter.dataset.duration || 2000, 10);\
                 if (!isNaN(target)) {\
                     animateCounter(counter, 0, target, duration);\
                 }\
             }\
         });\
    }\

}); // End DOMContentLoaded