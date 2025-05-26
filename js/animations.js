// Animation controller for Marie's comfort website

// Initialize animations when page loads
document.addEventListener('DOMContentLoaded', function() {
    initializeAnimations();
    setupIntersectionObserver();
});

/**
 * Initialize all animations on page load
 */
function initializeAnimations() {
    // Animate version display
    const versionDisplay = document.querySelector('.version-display');
    if (versionDisplay) {
        setTimeout(() => {
            versionDisplay.style.opacity = '1';
            versionDisplay.style.transform = 'translateY(0)';
        }, 500);
    }
    
    // Animate footer hearts with staggered delays
    const footerHearts = document.querySelectorAll('.footer-hearts i');
    footerHearts.forEach((heart, index) => {
        heart.style.setProperty('--i', index);
    });
}

/**
 * Setup intersection observer for scroll animations
 */
function setupIntersectionObserver() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });
    
    // Observe all animatable elements
    const animatableElements = document.querySelectorAll(
        '.message-card, .relief-card, .medicine-card, .mood-tracker'
    );
    
    animatableElements.forEach(el => {
        observer.observe(el);
    });
}

/**
 * Create floating particles effect
 */
function createFloatingParticles(container, count = 10) {
    for (let i = 0; i < count; i++) {
        const particle = document.createElement('div');
        particle.className = 'floating-particle';
        particle.style.cssText = `
            position: absolute;
            width: ${Math.random() * 6 + 2}px;
            height: ${Math.random() * 6 + 2}px;
            background: rgba(255, 182, 193, ${Math.random() * 0.5 + 0.3});
            border-radius: 50%;
            left: ${Math.random() * 100}%;
            animation: floatUp ${Math.random() * 3 + 4}s linear infinite;
            animation-delay: ${Math.random() * 2}s;
        `;
        container.appendChild(particle);
    }
}

/**
 * Add sparkle effect to elements
 */
function addSparkleEffect(element) {
    const sparkles = [];
    const sparkleCount = Math.random() * 8 + 5;
    
    for (let i = 0; i < sparkleCount; i++) {
        const sparkle = document.createElement('div');
        sparkle.innerHTML = '✨';
        sparkle.style.cssText = `
            position: absolute;
            left: ${Math.random() * 100}%;
            top: ${Math.random() * 100}%;
            font-size: ${Math.random() * 10 + 8}px;
            animation: sparkle ${Math.random() * 1 + 0.5}s ease-out forwards;
            pointer-events: none;
            z-index: 1000;
        `;
        
        element.style.position = 'relative';
        element.appendChild(sparkle);
        sparkles.push(sparkle);
        
        // Remove sparkle after animation
        setTimeout(() => {
            if (sparkle.parentNode) {
                sparkle.parentNode.removeChild(sparkle);
            }
        }, 1500);
    }
}

/**
 * Create ripple effect
 */
function createRippleEffect(event, element) {
    const ripple = document.createElement('span');
    const rect = element.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = event.clientX - rect.left - size / 2;
    const y = event.clientY - rect.top - size / 2;
    
    ripple.style.cssText = `
        position: absolute;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.6);
        transform: scale(0);
        animation: ripple 0.6s linear;
        left: ${x}px;
        top: ${y}px;
        width: ${size}px;
        height: ${size}px;
        pointer-events: none;
    `;
    
    element.style.position = 'relative';
    element.style.overflow = 'hidden';
    element.appendChild(ripple);
    
    setTimeout(() => {
        ripple.remove();
    }, 600);
}

/**
 * Animate counter numbers
 */
function animateCounter(element, start, end, duration = 1000) {
    const startTime = performance.now();
    
    function updateCounter(currentTime) {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        
        // Easing function for smooth animation
        const easeOut = 1 - Math.pow(1 - progress, 3);
        const currentNumber = Math.floor(start + (end - start) * easeOut);
        
        element.textContent = currentNumber;
        
        if (progress < 1) {
            requestAnimationFrame(updateCounter);
        }
    }
    
    requestAnimationFrame(updateCounter);
}

/**
 * Add CSS animation styles dynamically
 */
function addAnimationStyles() {
    const style = document.createElement('style');
    style.textContent = `
        @keyframes floatUp {
            to {
                transform: translateY(-100vh);
                opacity: 0;
            }
        }
        
        @keyframes sparkle {
            0% {
                transform: scale(0) rotate(0deg);
                opacity: 1;
            }
            50% {
                transform: scale(1) rotate(180deg);
                opacity: 1;
            }
            100% {
                transform: scale(0) rotate(360deg);
                opacity: 0;
            }
        }
        
        @keyframes ripple {
            to {
                transform: scale(4);
                opacity: 0;
            }
        }
        
        .animate-in {
            animation: slideUp 0.8s ease-out forwards;
        }
        
        .version-display {
            opacity: 0;
            transform: translateY(-10px);
            transition: all 0.5s ease;
        }
    `;
    document.head.appendChild(style);
}

// Add animation styles when script loads
addAnimationStyles();

/**
 * Export functions for use in other scripts
 */
window.AnimationController = {
    addSparkleEffect,
    createRippleEffect,
    animateCounter,
    createFloatingParticles
};