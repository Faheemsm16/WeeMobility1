gsap.registerPlugin(ScrollTrigger);

// Testimonials Section Animations
gsap.timeline({
    scrollTrigger: {
        trigger: ".testimonials-section",
        start: "top 80%",
        end: "bottom 20%",
        toggleActions: "play none none reverse"
    }
})
.to(".testimonials-title", {
    duration: 1,
    y: 0,
    opacity: 1,
    ease: "power3.out"
})
.to(".testimonial-card", {
    duration: 1,
    y: 0,
    rotationX: 0,
    opacity: 1,
    stagger: 0.2,
    ease: "power3.out"
}, "-=0.5")
.to(".testimonials-nav", {
    duration: 0.8,
    y: 0,
    opacity: 1,
    ease: "power2.out"
}, "-=0.3");


// Enhanced hover effects
document.querySelectorAll('.testimonial-card').forEach(card => {
    card.addEventListener('mouseenter', () => {
        gsap.to(card, {
            duration: 0.3,
            y: -15,
            rotationX: 0,
            rotationY: 5,
            scale: 1.02,
            ease: "power2.out"
        });
    });
    
    card.addEventListener('mouseleave', () => {
        gsap.to(card, {
            duration: 0.3,
            y: 0,
            rotationX: 0,
            rotationY: 0,
            scale: 1,
            ease: "power2.out"
        });
    });
});


// Transition Block Animations
function animateTransitionBlock(blockId) {
    const block = document.querySelector(blockId);
    const content = block.querySelector('.transition-content');
    const line = block.querySelector('.transition-line');
    const dots = block.querySelectorAll('.transition-dot');
    
    const tl = gsap.timeline({
        scrollTrigger: {
            trigger: block,
            start: "top 80%",
            end: "bottom 20%",
            toggleActions: "play none none reverse",
            onEnter: () => block.classList.add('animate')
        }
    });
    
    tl.to(content, {
        duration: 0.8,
        y: 0,
        opacity: 1,
        ease: "power2.out"
    })
    .to(line, {
        duration: 1.2,
        width: "200px",
        ease: "power2.inOut"
    }, "-=0.6")
    .to(dots, {
        duration: 0.4,
        scale: 1,
        stagger: 0.1,
        ease: "back.out(1.7)"
    }, "-=0.8");
}

// Apply animations to both transition blocks
animateTransitionBlock('#transition1');
animateTransitionBlock('#transition2');

// Parallax effect for sections
gsap.to(".testimonials-section", {
    yPercent: -20,
    ease: "none",
    scrollTrigger: {
        trigger: ".testimonials-section",
        start: "top bottom",
        end: "bottom top",
        scrub: true
    }
});