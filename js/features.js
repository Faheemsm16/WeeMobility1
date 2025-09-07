// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

// Initialize animations when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    initializeAnimations();
});

function initializeAnimations() {
    // Header animation
    gsap.to('.section-header', {
        opacity: 1,
        y: 0,
        duration: 1.2,
        ease: 'power3.out',
        scrollTrigger: {
            trigger: '.section-header',
            start: 'top 80%',
            end: 'bottom 20%',
            toggleActions: 'play none none reverse'
        }
    });

    // Feature items animation
    const featureItems = document.querySelectorAll('.feature-item');
    
    featureItems.forEach((item, index) => {
        const isEven = index % 2 === 1;
        const content = item.querySelector('.feature-content');
        const title = item.querySelector('.feature-title');
        const description = item.querySelector('.feature-description');
        const image = item.querySelector('.feature-image');

        // Main container animation
        gsap.to(item, {
            opacity: 1,
            x: 0,
            duration: 1,
            ease: 'power2.out',
            scrollTrigger: {
                trigger: item,
                start: 'top 80%',
                end: 'bottom 20%',
                toggleActions: 'play none none reverse'
            }
        });

        // Title animation
        gsap.to(title, {
            opacity: 1,
            y: 0,
            duration: 0.8,
            delay: 0.2,
            ease: 'power2.out',
            scrollTrigger: {
                trigger: item,
                start: 'top 75%',
                toggleActions: 'play none none reverse'
            }
        });

        // Description animation
        gsap.to(description, {
            opacity: 1,
            y: 0,
            duration: 0.8,
            delay: 0.4,
            ease: 'power2.out',
            scrollTrigger: {
                trigger: item,
                start: 'top 75%',
                toggleActions: 'play none none reverse'
            }
        });

        // Image animation
        gsap.to(image, {
            opacity: 1,
            scale: 1,
            rotateY: 0,
            duration: 1.2,
            delay: 0.3,
            ease: 'power2.out',
            scrollTrigger: {
                trigger: item,
                start: 'top 75%',
                toggleActions: 'play none none reverse'
            }
        });

        // Image hover effect
        image.addEventListener('mouseenter', () => {
            gsap.to(image, {
                scale: 1.05,
                rotateY: isEven ? -5 : 5,
                duration: 0.3,
                ease: 'power2.out'
            });
        });

        image.addEventListener('mouseleave', () => {
            gsap.to(image, {
                scale: 1,
                rotateY: 0,
                duration: 0.3,
                ease: 'power2.out'
            });
        });
    });

    // Background elements parallax
    gsap.to('.bg-circle-1', {
        y: -100,
        rotation: 180,
        duration: 1,
        ease: 'none',
        scrollTrigger: {
            trigger: '.features-section',
            start: 'top bottom',
            end: 'bottom top',
            scrub: 1
        }
    });

    gsap.to('.bg-circle-2', {
        y: 150,
        rotation: -90,
        duration: 1,
        ease: 'none',
        scrollTrigger: {
            trigger: '.features-section',
            start: 'top bottom',
            end: 'bottom top',
            scrub: 1
        }
    });

    gsap.to('.bg-triangle', {
        rotation: 360,
        y: -200,
        duration: 1,
        ease: 'none',
        scrollTrigger: {
            trigger: '.features-section',
            start: 'top bottom',
            end: 'bottom top',
            scrub: 2
        }
    });

    // Progress bar
    gsap.to('.progress-bar', {
        width: '100%',
        duration: 1,
        ease: 'none',
        scrollTrigger: {
            trigger: '.features-section',
            start: 'top bottom',
            end: 'bottom top',
            scrub: 1
        }
    });

    // Floating animation for images
    featureItems.forEach((item, index) => {
        const image = item.querySelector('.feature-image');
        
        gsap.to(image, {
            y: '+=20',
            duration: 3,
            ease: 'power1.inOut',
            yoyo: true,
            repeat: -1,
            delay: index * 0.5
        });
    });

    // Advanced scroll-based animations
    ScrollTrigger.batch('.feature-item', {
        onEnter: (elements) => {
            gsap.from(elements, {
                opacity: 0,
                scale: 0.8,
                y: 100,
                stagger: 0.15,
                duration: 1,
                ease: 'back.out(1.7)'
            });
        },
        onLeave: (elements) => {
            gsap.to(elements, {
                opacity: 0.3,
                scale: 0.95,
                duration: 0.5
            });
        },
        onEnterBack: (elements) => {
            gsap.to(elements, {
                opacity: 1,
                scale: 1,
                duration: 0.5
            });
        }
    });

    // Add magnetic effect to feature images
    featureItems.forEach(item => {
        const image = item.querySelector('.feature-image');
        
        item.addEventListener('mousemove', (e) => {
            const rect = image.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;
            
            gsap.to(image, {
                x: x * 0.1,
                y: y * 0.1,
                duration: 0.3,
                ease: 'power2.out'
            });
        });
        
        item.addEventListener('mouseleave', () => {
            gsap.to(image, {
                x: 0,
                y: 0,
                duration: 0.5,
                ease: 'power2.out'
            });
        });
    });
}