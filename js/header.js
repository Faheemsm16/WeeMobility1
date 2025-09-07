// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    
    // Header scroll effect
    const header = document.getElementById('header');
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // Manual smooth scroll function to avoid GSAP conflict
    function smoothScrollTo(targetId) {
        // Handle top/home navigation
        if (targetId === '' || targetId === 'top') {
            const start = window.pageYOffset;
            const startTime = performance.now();
            const duration = 800;

            function scroll(currentTime) {
                const elapsed = currentTime - startTime;
                const progress = Math.min(elapsed / duration, 1);
                
                // Easing function (ease-out)
                const ease = 1 - Math.pow(1 - progress, 3);
                
                window.scrollTo(0, start * (1 - ease));
                
                if (progress < 1) {
                    requestAnimationFrame(scroll);
                }
            }
            
            requestAnimationFrame(scroll);
            return;
        }

        // Find target element
        const targetElement = document.getElementById(targetId);
        if (targetElement) {
            // Calculate position accounting for fixed header
            const headerHeight = header.offsetHeight;
            const targetPosition = targetElement.offsetTop - headerHeight - 20;
            const start = window.pageYOffset;
            const distance = targetPosition - start;
            const startTime = performance.now();
            const duration = 800;

            function scroll(currentTime) {
                const elapsed = currentTime - startTime;
                const progress = Math.min(elapsed / duration, 1);
                
                // Easing function (ease-out)
                const ease = 1 - Math.pow(1 - progress, 3);
                
                window.scrollTo(0, start + distance * ease);
                
                if (progress < 1) {
                    requestAnimationFrame(scroll);
                }
            }
            
            requestAnimationFrame(scroll);
        }
    }

    // Add click events to all navigation links
    const navLinks = document.querySelectorAll('.nav-link, .logo-link');
    
    navLinks.forEach(function(link) {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            // Only handle internal anchor links
            if (href && href.startsWith('#')) {
                e.preventDefault();
                const targetId = href.replace('#', '');
                smoothScrollTo(targetId);
            }
        });
    });

    // Dropdown functionality for mobile/touch devices
    const dropdown = document.querySelector('.dropdown');
    const dropbtn = document.querySelector('.dropbtn');
    
    if (dropdown && dropbtn) {
        dropbtn.addEventListener('click', function(e) {
            e.preventDefault();
            dropdown.classList.toggle('active');
        });

        // Close dropdown when clicking outside
        document.addEventListener('click', function(e) {
            if (!dropdown.contains(e.target)) {
                dropdown.classList.remove('active');
            }
        });
    }

    console.log('Navigation initialized successfully');
});