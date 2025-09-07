gsap.registerPlugin(ScrollTrigger);

// Contact Section Animations
gsap.timeline({
    scrollTrigger: {
        trigger: ".contact-section",
        start: "top 80%",
        end: "bottom 20%",
        toggleActions: "play none none reverse"
    }
})
.to(".contact-info1", {
    duration: 1,
    x: 0,
    opacity: 1,
    ease: "power3.out"
})
.to(".contact-form-container", {
    duration: 1,
    x: 0,
    opacity: 1,
    ease: "power3.out"
}, "-=0.7")
.to(".contact-item1", {
    duration: 0.6,
    x: 0,
    opacity: 1,
    stagger: 0.2,
    ease: "power2.out"
}, "-=0.5")
.to(".contact-form input, .contact-form textarea, .contact-form select", {
    duration: 0.5,
    y: 0,
    opacity: 1,
    stagger: 0.1,
    ease: "power2.out"
}, "-=0.3")
.to(".submit-btn", {
    duration: 0.8,
    y: 0,
    opacity: 1,
    ease: "back.out(1.7)"
}, "-=0.2");

// Form submission animations
document.querySelector('.contact-form').addEventListener('submit', (e) => {
    e.preventDefault();
    gsap.to('.submit-btn', {
        duration: 0.2,
        scale: 0.95,
        yoyo: true,
        repeat: 1,
        onComplete: () => {
            alert('Message sent successfully!');
        }
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
gsap.to(".contact-section", {
    yPercent: -30,
    ease: "none",
    scrollTrigger: {
        trigger: ".contact-section",
        start: "top bottom",
        end: "bottom top",
        scrub: true
    }
});