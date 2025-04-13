// Scroll Animation
document.addEventListener('DOMContentLoaded', function() {
    // Mobile menu toggle
    const menuToggle = document.querySelector('.menu-toggle');
    const body = document.body;
    let mobileMenu;

    if (menuToggle) {
        menuToggle.addEventListener('click', function() {
            if (!mobileMenu) {
                // Create mobile menu if it doesn't exist
                mobileMenu = document.createElement('div');
                mobileMenu.className = 'mobile-menu';
                
                // Create close button
                const closeButton = document.createElement('div');
                closeButton.className = 'close-menu';
                closeButton.innerHTML = '<i class="fas fa-times"></i>';
                closeButton.addEventListener('click', toggleMobileMenu);
                
                // Add navigation links
                const navLinks = document.querySelector('.nav-links').cloneNode(true);
                
                // Add CTA button
                const ctaButton = document.querySelector('.cta-button').cloneNode(true);
                
                // Append elements to mobile menu
                mobileMenu.appendChild(closeButton);
                mobileMenu.appendChild(navLinks);
                mobileMenu.appendChild(ctaButton);
                
                // Add click event to all links in mobile menu
                const mobileLinks = mobileMenu.querySelectorAll('a');
                mobileLinks.forEach(link => {
                    link.addEventListener('click', toggleMobileMenu);
                });
                
                // Append mobile menu to body
                body.appendChild(mobileMenu);
            }
            
            toggleMobileMenu();
        });
    }

    function toggleMobileMenu() {
        if (mobileMenu) {
            mobileMenu.classList.toggle('active');
            body.style.overflow = mobileMenu.classList.contains('active') ? 'hidden' : '';
        }
    }

    // Header scroll effect
    const header = document.querySelector('header');
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // Scroll animations using Intersection Observer
    const animatedElements = document.querySelectorAll('.animate-on-scroll');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                // Unobserve after animation is triggered
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });
    
    animatedElements.forEach(element => {
        observer.observe(element);
    });

    // Parallax effect for hero section
    const heroSection = document.querySelector('.hero-section');
    const heroImage = document.querySelector('.hero-image img');
    const heroContent = document.querySelector('.hero-content');
    
    window.addEventListener('scroll', function() {
        if (window.innerWidth > 768) { // Only apply parallax on larger screens
            const scrollPosition = window.scrollY;
            const parallaxSpeed = 0.5;
            
            if (heroImage) {
                heroImage.style.transform = `translateY(${scrollPosition * parallaxSpeed}px) rotate(-5deg)`;
            }
            
            if (heroContent) {
                heroContent.style.transform = `translateY(${scrollPosition * 0.3}px)`;
            }
        }
    });

    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                const headerHeight = document.querySelector('header').offsetHeight;
                const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
});