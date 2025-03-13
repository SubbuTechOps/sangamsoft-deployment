/*
*  SangamSoft Solutions - Main JavaScript
*  Author: SangamSoft Team
*  Version: 2.0
*/

// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initialize AOS (Animate On Scroll)
    if (typeof AOS !== 'undefined') {
        AOS.init({
            duration: 800,
            easing: 'ease-in-out',
            once: true,
            mirror: false,
            disable: 'mobile' // Disable animations on mobile for better performance
        });
    }

    // Navbar scroll behavior
    const navbar = document.querySelector('.navbar');
    if (navbar) {
        window.addEventListener('scroll', function() {
            if (window.scrollY > 50) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
        });
    }

    // Back to top button
    const backToTopButton = document.querySelector('.back-to-top');
    if (backToTopButton) {
        window.addEventListener('scroll', function() {
            if (window.scrollY > 300) {
                backToTopButton.classList.add('active');
            } else {
                backToTopButton.classList.remove('active');
            }
        });

        backToTopButton.addEventListener('click', function(e) {
            e.preventDefault();
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

    // Project filters
    const filterButtons = document.querySelectorAll('.filter-btn');
    const projectItems = document.querySelectorAll('.project-item');

    if (filterButtons.length && projectItems.length) {
        filterButtons.forEach(button => {
            button.addEventListener('click', function() {
                // Remove active class from all buttons
                filterButtons.forEach(btn => btn.classList.remove('active'));
                
                // Add active class to clicked button
                this.classList.add('active');
                
                // Get filter value
                const filterValue = this.getAttribute('data-filter');
                
                // Filter projects
                projectItems.forEach(item => {
                    if (filterValue === 'all' || item.getAttribute('data-category') === filterValue) {
                        item.style.display = 'block';
                    } else {
                        item.style.display = 'none';
                    }
                });
            });
        });
    }

    // Counter animation
    const counters = document.querySelectorAll('.counter-value');
    
    if (counters.length) {
        const speed = 200; // The lower the value, the faster the animation

        counters.forEach(counter => {
            const updateCount = () => {
                const target = parseInt(counter.getAttribute('data-value'));
                const count = parseInt(counter.innerText);
                
                const increment = Math.trunc(target / speed);
                
                if (count < target) {
                    counter.innerText = count + increment;
                    setTimeout(updateCount, 1);
                } else {
                    counter.innerText = target;
                }
            };

            // Run the animation when the element is in viewport
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        updateCount();
                        observer.unobserve(entry.target);
                    }
                });
            }, { threshold: 0.5 });

            observer.observe(counter);
        });
    }

    // Testimonial slider (if you want to add it)
    // This is a simple example, you might want to use a library like Swiper for more features
    const testimonialSlider = document.querySelector('.testimonial-slider');
    if (testimonialSlider) {
        // Implementation would go here
        // Example with vanilla JS, but consider using a proper slider library
    }
    
    // Form validation
    const forms = document.querySelectorAll('.needs-validation');
    
    if (forms.length) {
        Array.from(forms).forEach(form => {
            form.addEventListener('submit', event => {
                if (!form.checkValidity()) {
                    event.preventDefault();
                    event.stopPropagation();
                }
                
                form.classList.add('was-validated');
            }, false);
        });
    }

    // Newsletter subscription form
    const newsletterForm = document.querySelector('.newsletter-form');
    
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            // Here you would typically make an AJAX call to your backend
            // For this example, we'll just show a success message
            
            const emailInput = this.querySelector('input[type="email"]');
            if (emailInput.value && emailInput.checkValidity()) {
                // Create a success message
                const successMessage = document.createElement('div');
                successMessage.className = 'alert alert-success mt-3';
                successMessage.role = 'alert';
                successMessage.innerHTML = 'Thank you for subscribing to our newsletter!';
                
                // Insert it after the form
                this.parentNode.insertBefore(successMessage, this.nextSibling);
                
                // Reset the form
                this.reset();
                
                // Remove the message after 5 seconds
                setTimeout(() => {
                    successMessage.remove();
                }, 5000);
            }
        });
    }

    // Mobile menu toggle behavior
    const navbarToggler = document.querySelector('.navbar-toggler');
    const navbarCollapse = document.querySelector('.navbar-collapse');
    
    if (navbarToggler && navbarCollapse) {
        // Close the menu when clicking outside
        document.addEventListener('click', function(event) {
            const isClickInside = navbarToggler.contains(event.target) || navbarCollapse.contains(event.target);
            
            if (!isClickInside && navbarCollapse.classList.contains('show')) {
                navbarToggler.click();
            }
        });
        
        // Close the menu when clicking on a nav item (mobile view)
        const navLinks = document.querySelectorAll('.navbar-nav .nav-link');
        navLinks.forEach(link => {
            link.addEventListener('click', function() {
                if (navbarCollapse.classList.contains('show') && !this.classList.contains('dropdown-toggle')) {
                    navbarToggler.click();
                }
            });
        });
    }

    // Enhanced mobile dropdown behavior
    const dropdown = document.querySelectorAll('.dropdown');
    if (dropdown.length) {
        // For touch devices, first tap on dropdown shows menu, second tap follows link
        if ('ontouchstart' in window) {
            dropdown.forEach(item => {
                const dropdownToggle = item.querySelector('.dropdown-toggle');
                const dropdownMenu = item.querySelector('.dropdown-menu');
                
                if (dropdownToggle) {
                    dropdownToggle.addEventListener('click', function(e) {
                        if (window.innerWidth < 992) {
                            // Let Bootstrap handle the dropdown toggle
                            // We just need to add extra handling for closing other dropdowns
                            dropdown.forEach(otherItem => {
                                if (otherItem !== item) {
                                    const otherMenu = otherItem.querySelector('.dropdown-menu');
                                    if (otherMenu && otherMenu.classList.contains('show')) {
                                        otherMenu.classList.remove('show');
                                    }
                                }
                            });
                        }
                    });
                }
            });
            
            // Close dropdowns when tapping outside on mobile
            document.addEventListener('touchstart', function(e) {
                dropdown.forEach(item => {
                    if (!item.contains(e.target)) {
                        const dropdownMenu = item.querySelector('.dropdown-menu');
                        if (dropdownMenu && dropdownMenu.classList.contains('show') && window.innerWidth < 992) {
                            // Create a new bootstrap dropdown instance and hide it
                            const bsDropdown = new bootstrap.Dropdown(item.querySelector('.dropdown-toggle'));
                            bsDropdown.hide();
                        }
                    }
                });
            });
        }
    }

    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const targetId = this.getAttribute('href');
            
            // Skip if it's just "#" or "javascript:void(0)"
            if (targetId === '#' || targetId.includes('javascript')) return;
            
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                e.preventDefault();
                
                // Adjust offset based on device (mobile menu is typically taller)
                let offset = 80;
                if (window.innerWidth < 992) {
                    offset = 60;
                }
                
                window.scrollTo({
                    top: targetElement.offsetTop - offset,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Custom file input styling
    const customFileInputs = document.querySelectorAll('.custom-file-input');
    
    if (customFileInputs.length) {
        customFileInputs.forEach(input => {
            input.addEventListener('change', function() {
                const fileName = this.files[0]?.name;
                const fileLabel = this.nextElementSibling;
                
                if (fileLabel && fileName) {
                    fileLabel.textContent = fileName;
                }
            });
        });
    }

    // Handle animated elements on scroll
    const animatedElements = document.querySelectorAll('.fade-in, .slide-in-left, .slide-in-right, .slide-in-bottom, .zoom-in');
    
    if (animatedElements.length) {
        const elementInView = (el, percentVisible = 100) => {
            const elementTop = el.getBoundingClientRect().top;
            const elementHeight = el.getBoundingClientRect().height;
            const windowHeight = window.innerHeight || document.documentElement.clientHeight;
            
            const verticalVisibility = Math.min(100, ((windowHeight - elementTop) / elementHeight) * 100);
            
            return verticalVisibility >= percentVisible;
        };
        
        const displayScrollElement = (element) => {
            element.classList.add('is-visible');
        };
        
        const handleScrollAnimation = () => {
            animatedElements.forEach(el => {
                if (elementInView(el, 25)) {
                    displayScrollElement(el);
                }
            });
        };
        
        // Disable animations on mobile for better performance
        if (window.innerWidth > 767) {
            window.addEventListener('scroll', handleScrollAnimation);
            
            // Initial check for elements already in view
            handleScrollAnimation();
        } else {
            // On mobile, just show all animated elements without animation
            animatedElements.forEach(el => {
                el.classList.add('is-visible');
            });
        }
    }
    
    // Optimize images for mobile
    if (window.innerWidth < 768) {
        // Optional: You could dynamically load smaller images for mobile devices
        // This example just forces all images to load with correct dimensions
        const images = document.querySelectorAll('img.img-fluid');
        images.forEach(img => {
            if (!img.complete) {
                img.addEventListener('load', function() {
                    this.style.height = 'auto';
                });
            }
        });
    }
    
    // Adjust hero section padding on mobile
    const adjustHeroPadding = () => {
        const heroSection = document.querySelector('.hero-section');
        if (heroSection && window.innerWidth < 768) {
            const navbarHeight = navbar ? navbar.offsetHeight : 0;
            heroSection.style.paddingTop = (navbarHeight + 30) + 'px';
        }
    };
    
    // Call adjustments on resize
    window.addEventListener('resize', adjustHeroPadding);
    adjustHeroPadding();
});