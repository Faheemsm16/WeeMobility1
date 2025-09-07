gsap.registerPlugin(ScrollTrigger);

// Booking Section Animations
gsap.timeline({
    scrollTrigger: {
        trigger: ".booking-section",
        start: "top 80%",
        end: "bottom 20%",
        toggleActions: "play none none reverse"
    }
})
.to(".booking-container", {
    duration: 1.2,
    y: 0,
    opacity: 1,
    ease: "power3.out"
})
.to(".booking-title", {
    duration: 0.8,
    y: 0,
    opacity: 1,
    ease: "power2.out"
}, "-=0.8")
.to(".booking-subtitle", {
    duration: 0.8,
    y: 0,
    opacity: 1,
    ease: "power2.out"
}, "-=0.6")
.to(".form-group", {
    duration: 0.6,
    y: 0,
    opacity: 1,
    stagger: 0.15,
    ease: "power2.out"
}, "-=0.4")
.to(".book-btn", {
    duration: 0.8,
    y: 0,
    opacity: 1,
    ease: "back.out(1.7)"
}, "-=0.2");

// Floating animation for background elements
gsap.to(".booking-bg-element:first-child", {
    duration: 8,
    rotation: 360,
    repeat: -1,
    ease: "none"
});

gsap.to(".booking-bg-element:last-child", {
    duration: 12,
    rotation: -360,
    repeat: -1,
    ease: "none"
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
