// Initialize GSAP and ScrollTrigger
gsap.registerPlugin(ScrollTrigger);

// Initial visibility for products (in case animations don't trigger)
gsap.set([".products-title", ".products-subtitle", ".product-card"], {
    opacity: 1,
    y: 0,
    scale: 1
});

// Products Section Animations
gsap.timeline({
    scrollTrigger: {
        trigger: ".products-section",
        start: "top 90%",
        end: "bottom 10%",
        toggleActions: "play none none reverse",
        markers: false // Set to true for debugging
    }
})
.from(".products-title", {
    duration: 1.2,
    y: 100,
    opacity: 0,
    scale: 0.8,
    ease: "back.out(1.7)"
})
.from(".products-subtitle", {
    duration: 1,
    y: 50,
    opacity: 0,
    ease: "power3.out"
}, "-=0.8")
.from(".product-card", {
    duration: 1.2,
    y: 100,
    opacity: 0,
    scale: 0.8,
    stagger: 0.2,
    ease: "back.out(1.7)"
}, "-=0.5");

// Product card hover animations
document.querySelectorAll('.product-card').forEach(card => {
    const icon = card.querySelector('.product-icon');
    const title = card.querySelector('.product-title');
    const description = card.querySelector('.product-description');
    const badge = card.querySelector('.product-badge');

    card.addEventListener('mouseenter', () => {
        gsap.timeline()
            .to(icon, { duration: 0.3, scale: 1.1, rotation: 5, ease: "power2.out" })
            .to(title, { duration: 0.3, color: "#FFA500", ease: "power2.out" }, "-=0.2")
            .to(description, { duration: 0.3, color: "#fff", ease: "power2.out" }, "-=0.3")
            .to(badge, { duration: 0.3, scale: 1.05, ease: "power2.out" }, "-=0.3");
    });

    card.addEventListener('mouseleave', () => {
        gsap.timeline()
            .to(icon, { duration: 0.3, scale: 1, rotation: 0, ease: "power2.out" })
            .to(title, { duration: 0.3, color: "#FFD700", ease: "power2.out" }, "-=0.2")
            .to(description, { duration: 0.3, color: "#ccc", ease: "power2.out" }, "-=0.3")
            .to(badge, { duration: 0.3, scale: 1, ease: "power2.out" }, "-=0.3");
    });
});

// Floating particles animation
gsap.to(".particle", {
    duration: 4,
    y: "random(-50, 50)",
    x: "random(-30, 30)",
    scale: "random(0.5, 1.5)",
    opacity: "random(0.3, 1)",
    stagger: 0.5,
    repeat: -1,
    yoyo: true,
    ease: "power2.inOut"
});
