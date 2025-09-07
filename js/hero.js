// ==========================
// Hero Section Advanced Animations
// ==========================
gsap.registerPlugin(ScrollTrigger);

// Scroll indicator click
const scrollIndicator = document.getElementById("scrollIndicator");
if (scrollIndicator) {
  scrollIndicator.addEventListener("click", () => {
    window.scrollTo({
      top: window.innerHeight,
      behavior: "smooth",
    });
  });
}

// ==========================
// 1. Intro Animations
// ==========================

// Animate hero text with a "game-like" stagger
gsap.from(".hero h1 span, .hero h2 span, .hero p span", {
  y: 80,
  opacity: 0,
  rotateX: -90,
  duration: 1,
  ease: "back.out(1.7)",
  stagger: {
    amount: 1,
    from: "start",
  },
});

// Hero circle appears with a futuristic pulse
gsap.from(".hero-circle", {
  scale: 0.3,
  opacity: 0,
  duration: 1.5,
  ease: "elastic.out(1, 0.5)",
});

// ==========================
// 2. Floating Ambient Motion
// ==========================

// Floating dots idle drift
gsap.to(".floating-dot", {
  y: "random(-40, 40)",
  x: "random(-40, 40)",
  scale: "random(0.8, 1.3)",
  duration: 6,
  repeat: -1,
  yoyo: true,
  ease: "sine.inOut",
  stagger: {
    amount: 3,
    from: "edges",
  },
});

// ==========================
// 3. Scroll-Driven "Game Feel"
// ==========================

// Parallax layers move at different speeds
gsap.to(".hero-image", {
  y: -200,
  rotate: 15,
  scale: 1.1,
  ease: "none",
  scrollTrigger: {
    trigger: ".hero",
    start: "top top",
    end: "bottom top",
    scrub: true,
  },
});

gsap.to(".hero-circle", {
  y: -150,
  scale: 1.4,
  ease: "none",
  scrollTrigger: {
    trigger: ".hero",
    start: "top top",
    end: "bottom top",
    scrub: true,
  },
});

// Background moves slower = deep parallax
gsap.to(".floating-elements", {
  y: -100,
  opacity: 0.8,
  ease: "none",
  scrollTrigger: {
    trigger: ".hero",
    start: "top top",
    end: "bottom top",
    scrub: true,
  },
});

// Text reacts like a "cutscene"
gsap.to(".hero h1, .hero h2, .hero p", {
  scale: 1.1,
  letterSpacing: "0.05em",
  ease: "power1.out",
  scrollTrigger: {
    trigger: ".hero",
    start: "top center",
    end: "bottom top",
    scrub: true,
  },
});
