// Initialize GSAP and ScrollTrigger
gsap.registerPlugin(ScrollTrigger);

// Footer animations - simplified to prevent visibility issues
gsap.timeline({
    scrollTrigger: {
        trigger: ".footer",
        start: "top 90%",
        end: "bottom 20%",
        toggleActions: "play none none none"
    }
})
.from(".footer-logo", {
    duration: 1,
    scale: 0,
    rotation: 180,
    ease: "back.out(1.7)"
})

.from(".footer-section h3", {
    opacity: 0,
    y: -20,
    duration: 0.8,
    stagger: 0.2,
    ease: "power3.out"
}, "-=0.8")  // Start when logo animation completes
.fromTo(".footer-section ul li, .contact-info", 
    { opacity: 0, y: 30 }, 
    { opacity: 1, y: 0, duration: 0.8, stagger: 0.1, ease: "power3.out" }, 
    "-=0.5"
);

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            gsap.to(window, {
                duration: 1.5,
                scrollTo: target,
                ease: "power3.inOut"
            });
        }
    });
});

// Continuous background animation
gsap.to(".products-section::before, .footer::before", {
    duration: 10,
    backgroundPosition: "200% 0%",
    repeat: -1,
    ease: "none"
});

// Performance optimization
ScrollTrigger.config({
    autoRefreshEvents: "visibilitychange,DOMContentLoaded,load"
});

// Refresh ScrollTrigger on window resize
window.addEventListener('resize', () => {
    ScrollTrigger.refresh();
});