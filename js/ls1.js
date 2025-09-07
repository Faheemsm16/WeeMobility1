gsap.registerPlugin(ScrollTrigger);

class LS1ProductShowcase {
    constructor() {
        this.section = document.getElementById("ls1-section");
        this.viewButtons = this.section.querySelectorAll(".control-btn");
        this.colorOptions = this.section.querySelectorAll(".color-option");
        this.productImages = this.section.querySelectorAll(".product-image");
        this.taglineElement = document.getElementById("dynamic-tagline");

        this.currentView = "front";
        this.currentColor = "misty-grey";

        // Enhanced taglines for each color with special words
        this.taglines = {
            "aqua-blue": {
                text: "Current Mood: Cruisin' Cool.",
                highlights: ["Current", "Cruisin'"],
                special: ["Cool"]
            },
            "cherry-red": {
                text: "Built to Cherry-ish Every Mile.",
                highlights: ["Built", "Cherry-ish"],
                special: ["Mile"]
            },
            "choco-brown": {
                text: "Craving the Road Less Traveled?",
                highlights: ["Craving", "Road"],
                special: ["Traveled"]
            },
            "misty-grey": {
                text: "Cloud Nine? More Like Lane Nine.",
                highlights: ["Cloud", "Lane"],
                special: ["Nine"]
            },
            "sunset-orange": {
                text: "Catch Flights? Nah, Catch Sunsets.",
                highlights: ["Catch", "Sunsets"],
                special: ["Flights"]
            }
        };

        this.init();
    }

    init() {
        this.setupEventListeners();
        this.updateDisplay(true);
        this.updateSectionColor();
        this.createAnimatedTagline();
        this.initScrollAnimations();
        this.initEntranceAnimations();
    }

    setupEventListeners() {
        // View switching
        this.viewButtons.forEach((btn) => {
            btn.addEventListener("click", () => {
                this.switchView(btn.dataset.view);
            });
        });

        // Color switching
        this.colorOptions.forEach((option) => {
            option.addEventListener("click", () => {
                this.switchColor(option.dataset.color);
            });
        });

        // Keyboard navigation
        document.addEventListener("keydown", (e) => {
            if (this.isInViewport()) {
                this.handleKeyboard(e);
            }
        });

        // Mouse wheel color switching (when hovering over color selector)
        // const colorSelector = this.section.querySelector('.color-selector');
        // colorSelector.addEventListener('wheel', (e) => {
        //     e.preventDefault();

        //     if (this.isAnimating) return;

        //     this.isAnimating = true;
        //     const direction = e.deltaY > 0 ? 1 : -1;
        //     this.navigateColor(direction);

        //     gsap.delayedCall(0.8, () => {
        //         this.isAnimating = false;
        //     });
        // });
    }

    switchView(view) {
        if (this.currentView === view) return;
        
        const oldView = this.currentView;
        this.currentView = view;
        this.updateActiveControls();
        
        // Animate view transition
        this.animateViewTransition(oldView, view);
    }

    switchColor(color) {
        if (this.currentColor === color) return;
        
        const oldColor = this.currentColor;
        this.currentColor = color;
        this.updateActiveControls();
        this.updateSectionColor();
        this.updateAnimatedTagline();
        
        // Animate color transition
        this.animateColorTransition(oldColor, color);
    }

    updateSectionColor() {
        gsap.to(this.section, {
            duration: 1.2,
            ease: "power3.inOut",
            onStart: () => {
                this.section.setAttribute("data-color", this.currentColor);
                const featureSection = document.querySelector('.ls1-features-section');
                featureSection.setAttribute('data-color', this.currentColor);
            }
        });
    }

    createAnimatedTagline() {
        const taglineData = this.taglines[this.currentColor];
        const words = taglineData.text.split(' ');
        
        // Clear existing content
        this.taglineElement.innerHTML = '';
        
        // Create word elements
        words.forEach((word, index) => {
            const wordElement = document.createElement('span');
            wordElement.className = 'tagline-word';
            wordElement.textContent = word;
            
            // Add special classes based on word type
            if (taglineData.highlights.includes(word.replace(/[^\w]/g, ''))) {
                wordElement.classList.add('highlight');
            }
            if (taglineData.special.includes(word.replace(/[^\w]/g, ''))) {
                wordElement.classList.add('special-effect');
            }
            
            this.taglineElement.appendChild(wordElement);
            
            // Add space after each word except the last one
            if (index < words.length - 1) {
                this.taglineElement.appendChild(document.createTextNode(' '));
            }
        });
        
        // Animate words in
        this.animateTaglineIn();
    }

    updateAnimatedTagline() {
        // Animate out current words
        const currentWords = this.taglineElement.querySelectorAll('.tagline-word');
        
        const tl = gsap.timeline({
            onComplete: () => {
                this.createAnimatedTagline();
            }
        });
        
        // Animate out with different effects for each word
        currentWords.forEach((word, index) => {
            const randomDirection = Math.random() > 0.5 ? 1 : -1;
            const randomRotation = (Math.random() - 0.5) * 360;
            
            tl.to(word, {
                duration: 0.4,
                opacity: 0,
                y: -30 * randomDirection,
                x: 20 * randomDirection,
                rotation: randomRotation,
                scale: 0.3,
                ease: "power2.in"
            }, index * 0.05);
        });
    }

    animateTaglineIn() {
        const words = this.taglineElement.querySelectorAll('.tagline-word');
        
        // Set initial state
        gsap.set(words, {
            opacity: 0,
            y: 50,
            rotation: 15,
            scale: 0.3
        });
        
        // Create staggered animation timeline
        const tl = gsap.timeline();
        
        words.forEach((word, index) => {
            const isSpecial = word.classList.contains('special-effect');
            const isHighlight = word.classList.contains('highlight');
            
            // Different animation based on word type
            if (isSpecial) {
                tl.to(word, {
                    duration: 0.8,
                    opacity: 1,
                    y: 0,
                    rotation: 0,
                    scale: 1.1,
                    ease: "back.out(2)",
                    onComplete: () => {
                        // Add floating animation to special words
                        word.classList.add('floating');
                        this.addWordInteractions(word);
                    }
                }, index * 0.1 + 0.2);
            } else if (isHighlight) {
                tl.to(word, {
                    duration: 0.6,
                    opacity: 1,
                    y: 0,
                    rotation: 0,
                    scale: 1.05,
                    ease: "power3.out",
                    onComplete: () => {
                        this.addWordInteractions(word);
                    }
                }, index * 0.1);
            } else {
                tl.to(word, {
                    duration: 0.5,
                    opacity: 1,
                    y: 0,
                    rotation: 0,
                    scale: 1,
                    ease: "power2.out",
                    onComplete: () => {
                        this.addWordInteractions(word);
                    }
                }, index * 0.1);
            }
        });
        
        // Add final sparkle effect
        tl.call(() => {
            this.addSparkleEffect();
        }, null, "+=0.5");
    }

    addWordInteractions(word) {
        // Mouse enter effect
        word.addEventListener('mouseenter', () => {
            gsap.to(word, {
                duration: 0.3,
                scale: word.classList.contains('special-effect') ? 1.2 : 1.1,
                y: -5,
                ease: "power2.out"
            });
        });
        
        // Mouse leave effect
        word.addEventListener('mouseleave', () => {
            const baseScale = word.classList.contains('special-effect') ? 1.1 : 
                              word.classList.contains('highlight') ? 1.05 : 1;
            gsap.to(word, {
                duration: 0.3,
                scale: baseScale,
                y: 0,
                ease: "power2.out"
            });
        });
        
        // Click effect
        word.addEventListener('click', () => {
            gsap.timeline()
                .to(word, {
                    duration: 0.1,
                    scale: 0.95,
                    ease: "power2.in"
                })
                .to(word, {
                    duration: 0.4,
                    scale: word.classList.contains('special-effect') ? 1.3 : 1.2,
                    rotation: 360,
                    ease: "back.out(1.7)"
                })
                .to(word, {
                    duration: 0.3,
                    scale: word.classList.contains('special-effect') ? 1.1 : 
                            word.classList.contains('highlight') ? 1.05 : 1,
                    rotation: 0,
                    ease: "power2.out"
                });
        });
    }

    addSparkleEffect() {
        // Create temporary sparkle elements
        const sparkleCount = 8;
        const container = this.taglineElement;
        
        for (let i = 0; i < sparkleCount; i++) {
            const sparkle = document.createElement('div');
            sparkle.style.cssText = `
                position: absolute;
                width: 4px;
                height: 4px;
                background: var(--primary-yellow);
                border-radius: 50%;
                pointer-events: none;
                z-index: 10;
            `;
            
            container.appendChild(sparkle);
            
            // Random position around the tagline
            const angle = (i / sparkleCount) * Math.PI * 2;
            const radius = 60 + Math.random() * 40;
            const startX = Math.cos(angle) * radius;
            const startY = Math.sin(angle) * radius;
            
            gsap.set(sparkle, {
                x: startX,
                y: startY,
                scale: 0,
                opacity: 0
            });
            
            gsap.timeline()
                .to(sparkle, {
                    duration: 0.6,
                    scale: 1,
                    opacity: 1,
                    ease: "power2.out"
                })
                .to(sparkle, {
                    duration: 1.2,
                    x: startX * 1.5,
                    y: startY * 1.5,
                    scale: 0,
                    opacity: 0,
                    ease: "power2.in",
                    onComplete: () => {
                        sparkle.remove();
                    }
                }, "-=0.3");
        }
    }

    updateActiveControls() {
        this.viewButtons.forEach((btn) =>
            btn.classList.toggle("active", btn.dataset.view === this.currentView)
        );
        this.colorOptions.forEach((option) =>
            option.classList.toggle("active", option.dataset.color === this.currentColor)
        );
    }

    animateViewTransition(oldView, newView) {
        const currentImages = this.section.querySelectorAll(`[data-view="${this.currentView}"][data-color="${this.currentColor}"]`);
        const oldImages = this.section.querySelectorAll(`[data-view="${oldView}"][data-color="${this.currentColor}"]`);

        // Animate out old images
        gsap.to(oldImages, {
            duration: 0.4,
            opacity: 0,
            rotateY: 90,
            scale: 0.8,
            ease: "power2.in",
            onComplete: () => {
                oldImages.forEach(img => {
                    img.classList.remove('active');
                    img.style.position = 'absolute';
                });
            }
        });

        // Animate in new images
        gsap.fromTo(currentImages, {
            opacity: 0,
            rotateY: -90,
            scale: 0.8
        }, {
            duration: 0.6,
            delay: 0.2,
            opacity: 1,
            rotateY: 0,
            scale: 1,
            ease: "power2.out",
            onStart: () => {
                currentImages.forEach(img => {
                    img.classList.add('active');
                    img.style.position = 'relative';
                });
            }
        });
    }

    animateColorTransition(oldColor, newColor) {
        const currentImages = this.section.querySelectorAll(`[data-view="${this.currentView}"][data-color="${this.currentColor}"]`);
        const oldImages = this.section.querySelectorAll(`[data-view="${this.currentView}"][data-color="${oldColor}"]`);

        // Create a more dramatic color transition
        const tl = gsap.timeline();

        // Animate out old images with burst effect
        tl.to(oldImages, {
            duration: 0.4,
            opacity: 0,
            scale: 1.2,
            rotation: 15,
            ease: "power2.in",
            onComplete: () => {
                oldImages.forEach(img => {
                    img.classList.remove('active');
                    img.style.position = 'absolute';
                });
            }
        })
        // Animate in new images with dramatic entrance
        .fromTo(currentImages, {
            opacity: 0,
            scale: 0.3,
            rotation: -15,
            y: 50
        }, {
            duration: 0.8,
            opacity: 1,
            scale: 1,
            rotation: 0,
            y: 0,
            ease: "back.out(1.7)",
            onStart: () => {
                currentImages.forEach(img => {
                    img.classList.add('active');
                    img.style.position = 'relative';
                });
            }
        })
        // Add particle burst effect
        .to(this.section.querySelectorAll('.particle'), {
            duration: 0.3,
            scale: 2,
            opacity: 0.8,
            ease: "power2.out"
        }, "-=0.6")
        .to(this.section.querySelectorAll('.particle'), {
            duration: 0.4,
            scale: 1,
            opacity: 0.3,
            ease: "power2.in"
        });
    }

    updateDisplay(initial = false) {
        this.productImages.forEach((img) => {
            const shouldShow = 
                img.dataset.view === this.currentView && 
                img.dataset.color === this.currentColor;

            if (shouldShow) {
                if (!initial) {
                    img.classList.add('active');
                    img.style.position = 'relative';
                } else {
                    img.classList.add('active');
                    img.style.opacity = '1';
                    img.style.position = 'relative';
                }
            } else {
                img.classList.remove('active');
                img.style.position = 'absolute';
                img.style.opacity = '0';
            }
        });
    }

    handleKeyboard(e) {
        switch (e.key) {
            case "ArrowLeft":
                e.preventDefault();
                this.navigateColor(-1);
                break;
            case "ArrowRight":
                e.preventDefault();
                this.navigateColor(1);
                break;
            case "ArrowUp":
            case "ArrowDown":
                e.preventDefault();
                this.toggleView();
                break;
            case " ":
                e.preventDefault();
                this.navigateColor(1);
                break;
        }
    }

    navigateColor(direction) {
        const colors = [
            "misty-grey",
            "cherry-red", 
            "choco-brown",
            "aqua-blue",
            "sunset-orange"
        ];
        const currentIndex = colors.indexOf(this.currentColor);
        let newIndex = currentIndex + direction;

        if (newIndex < 0) newIndex = colors.length - 1;
        if (newIndex >= colors.length) newIndex = 0;

        this.switchColor(colors[newIndex]);
    }

    toggleView() {
        const newView = this.currentView === "front" ? "side" : "front";
        this.switchView(newView);
    }

    isInViewport() {
        const rect = this.section.getBoundingClientRect();
        return rect.top < window.innerHeight && rect.bottom > 0;
    }

    initEntranceAnimations() {
        // Set initial states
        gsap.set([".ls1-title h1", ".ls1-subtitle"], { 
            opacity: 0, 
            y: 80 
        });
        gsap.set(".control-panel", { 
            opacity: 0, 
            x: 100 
        });
        gsap.set(".product-showcase", { 
            opacity: 0, 
            scale: 0.8 
        });
        gsap.set(".feature-card1", { 
            opacity: 0, 
            y: 50 
        });
        gsap.set([".particle", ".wave"], { 
            opacity: 0 
        });

        // Create entrance timeline
        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: this.section,
                start: "top 80%",
                toggleActions: "play none none reverse"
            }
        });

        // Animate background elements first
        tl.to([".particle", ".wave"], {
            duration: 1,
            opacity: 0.3,
            stagger: 0.1,
            ease: "power2.out"
        })
        // Main title with dramatic entrance
        .to(".ls1-title h1", {
            duration: 1.2,
            opacity: 1,
            y: 0,
            ease: "power4.out"
        }, "-=0.8")
        // Subtitle follows
        .to(".ls1-subtitle", {
            duration: 0.8,
            opacity: 1,
            y: 0,
            ease: "power3.out"
        }, "-=0.6")
        // Create tagline after subtitle
        .call(() => {
            this.createAnimatedTagline();
        }, null, "-=0.4")
        // Product showcase with scale animation
        .to(".product-showcase", {
            duration: 1.2,
            opacity: 1,
            scale: 1,
            ease: "power3.out"
        }, "-=0.8")
        // Control panel slides in
        .to(".control-panel", {
            duration: 0.8,
            opacity: 1,
            x: 0,
            ease: "power3.out"
        }, "-=0.6")
        // Feature cards animate in with stagger
        .to(".feature-card1", {
            duration: 0.6,
            opacity: 1,
            y: 0,
            stagger: 0.1,
            ease: "power2.out"
        }, "-=0.4");
    }

    initScrollAnimations() {
        // Parallax effect for background elements
        gsap.to(".wave1", {
            x: -200,
            ease: "none",
            scrollTrigger: {
                trigger: this.section,
                start: "top bottom",
                end: "bottom top",
                scrub: 1
            }
        });

        gsap.to(".wave2", {
            x: 200,
            ease: "none",
            scrollTrigger: {
                trigger: this.section,
                start: "top bottom", 
                end: "bottom top",
                scrub: 1
            }
        });

        // Particles floating effect on scroll
        gsap.to(".particle", {
            y: -100,
            ease: "none",
            stagger: 0.2,
            scrollTrigger: {
                trigger: this.section,
                start: "top bottom",
                end: "bottom top",
                scrub: 2
            }
        });

        // Enhanced hover effects
        this.addHoverEffects();
    }

    addHoverEffects() {
        // Product image hover effects
        this.productImages.forEach(img => {
            img.addEventListener('mouseenter', () => {
                if (img.classList.contains('active')) {
                    gsap.to(img, {
                        duration: 0.3,
                        scale: 1.05,
                        rotateY: 5,
                        ease: "power2.out"
                    });
                }
            });

            img.addEventListener('mouseleave', () => {
                if (img.classList.contains('active')) {
                    gsap.to(img, {
                        duration: 0.3,
                        scale: 1,
                        rotateY: 0,
                        ease: "power2.out"
                    });
                }
            });
        });

        // Feature cards hover animations
        const featureCards = this.section.querySelectorAll('.feature-card1');
        featureCards.forEach(card => {
            card.addEventListener('mouseenter', () => {
                gsap.to(card, {
                    duration: 0.3,
                    y: -15,
                    scale: 1.02,
                    ease: "power2.out"
                });
            });

            card.addEventListener('mouseleave', () => {
                gsap.to(card, {
                    duration: 0.3,
                    y: 0,
                    scale: 1,
                    ease: "power2.out"
                });
            });
        });

        // Color options enhanced hover
        this.colorOptions.forEach(option => {
            option.addEventListener('mouseenter', () => {
                gsap.to(option, {
                    duration: 0.2,
                    scale: 1.15,
                    rotation: 5,
                    ease: "power2.out"
                });
            });

            option.addEventListener('mouseleave', () => {
                if (!option.classList.contains('active')) {
                    gsap.to(option, {
                        duration: 0.2,
                        scale: 1,
                        rotation: 0,
                        ease: "power2.out"
                    });
                }
            });
        });

        // Control buttons enhanced animations
        this.viewButtons.forEach(btn => {
            btn.addEventListener('mouseenter', () => {
                if (!btn.classList.contains('active')) {
                    gsap.to(btn, {
                        duration: 0.2,
                        y: -3,
                        ease: "power2.out"
                    });
                }
            });

            btn.addEventListener('mouseleave', () => {
                if (!btn.classList.contains('active')) {
                    gsap.to(btn, {
                        duration: 0.2,
                        y: 0,
                        ease: "power2.out"
                    });
                }
            });
        });
    }
}

// Initialize when DOM is loaded
document.addEventListener("DOMContentLoaded", () => {
    new LS1ProductShowcase();
});

// Add cursor glow effect
document.addEventListener('mousemove', (e) => {
    const cursor = document.querySelector('.cursor-glow') || (() => {
        const glow = document.createElement('div');
        glow.className = 'cursor-glow';
        glow.style.cssText = `
            position: fixed;
            width: 20px;
            height: 20px;
            background: radial-gradient(circle, rgba(255,184,0,0.3) 0%, transparent 70%);
            pointer-events: none;
            z-index: 9999;
            border-radius: 50%;
            mix-blend-mode: screen;
            transition: opacity 0.3s ease;
        `;
        document.body.appendChild(glow);
        return glow;
    })();

    gsap.to(cursor, {
        duration: 0.3,
        x: e.clientX - 10,
        y: e.clientY - 10,
        ease: "power2.out"
    });
});