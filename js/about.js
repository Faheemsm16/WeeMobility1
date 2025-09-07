gsap.from("#about .about-text", {
  x: -150,
  opacity: 0,
  duration: 1.3,
  scrollTrigger: {
    trigger: "#about",
    start: "top 85%",
    toggleActions: "play none none reverse"
  }
});

gsap.from("#about .about-image", {
  x: 150,
  opacity: 0,
  duration: 1.3,
  scrollTrigger: {
    trigger: "#about",
    start: "top 85%",
    toggleActions: "play none none reverse"
  }
});



// About Section Animation Controller
class AboutSectionController {
    constructor() {
        this.section = document.getElementById('about');
        this.header = this.section.querySelector('.about-header');
        this.points = this.section.querySelectorAll('.about-point');
        this.mission = this.section.querySelector('.about-mission');
        this.background = this.section.querySelector('.about-background');
        this.observer = null;
        
        this.init();
    }
    
    init() {
        this.setupIntersectionObserver();
        this.setupParallaxEffect();
        this.setupMouseEffects();
    }
    
    setupIntersectionObserver() {
        const options = {
            threshold: 0.2,
            rootMargin: '0px 0px -100px 0px'
        };
        
        this.observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    this.animateElements();
                    this.observer.unobserve(entry.target);
                }
            });
        }, options);
        
        this.observer.observe(this.section);
    }
    
    animateElements() {
        // Animate header
        setTimeout(() => {
            this.header.classList.add('animate-in');
        }, 200);
        
        // Animate points with stagger
        this.points.forEach((point, index) => {
            setTimeout(() => {
                point.classList.add('animate-in');
            }, 400 + (index * 200));
        });
        
        // Animate mission
        setTimeout(() => {
            this.mission.classList.add('animate-in');
        }, 1200);
    }
    
    setupParallaxEffect() {
        if (window.innerWidth <= 768 || window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
            return;
        }
        
        let ticking = false;
        
        const updateParallax = () => {
            const scrolled = window.pageYOffset;
            const sectionTop = this.section.offsetTop;
            const sectionHeight = this.section.offsetHeight;
            const windowHeight = window.innerHeight;
            
            // Only apply parallax when section is in view
            if (scrolled + windowHeight > sectionTop && scrolled < sectionTop + sectionHeight) {
                const parallaxValue = (scrolled - sectionTop) * 0.5;
                this.background.style.transform = `translateY(${parallaxValue}px) scale(1.1)`;
            }
            
            ticking = false;
        };
        
        const handleScroll = () => {
            if (!ticking) {
                requestAnimationFrame(updateParallax);
                ticking = true;
            }
        };
        
        window.addEventListener('scroll', handleScroll, { passive: true });
    }
    
    setupMouseEffects() {
        // Add subtle mouse tracking effect
        this.points.forEach(point => {
            point.addEventListener('mouseenter', () => {
                point.style.transform = 'translateY(-10px) scale(1.02)';
            });
            
            point.addEventListener('mouseleave', () => {
                point.style.transform = '';
            });
        });
    }
    
    destroy() {
        if (this.observer) {
            this.observer.disconnect();
        }
    }
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    new AboutSectionController();
});

// Add to global scope for external access
window.AboutSectionController = AboutSectionController;