// ===================================
// Scroll Reveal Animation
// ===================================

const observerOptions = {
    root: null,
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            // Optionally unobserve after revealing
            // observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe all elements that should reveal on scroll
document.addEventListener('DOMContentLoaded', () => {
    // Add reveal class to all major sections
    const revealElements = [
        ...document.querySelectorAll('.work-item'),
        ...document.querySelectorAll('.detail-card'),
        ...document.querySelectorAll('.benefit-card'),
        ...document.querySelectorAll('.process-step'),
        ...document.querySelectorAll('.section-intro'),
        ...document.querySelectorAll('.section-conclusion')
    ];

    revealElements.forEach((el, index) => {
        el.classList.add('reveal');
        el.style.transitionDelay = `${index * 0.05}s`;
        observer.observe(el);
    });
});

// ===================================
// Smooth Scroll for Anchor Links
// ===================================

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));

        if (target) {
            const offsetTop = target.offsetTop - 80; // Account for fixed header if any
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// ===================================
// Form Handling
// ===================================

const contactForm = document.getElementById('contactForm');

if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();

        // Get form data
        const formData = new FormData(contactForm);
        const data = Object.fromEntries(formData.entries());

        // Log form data (replace with actual API call)
        console.log('Form submitted:', data);

        // Show success message (you can customize this)
        showSuccessMessage();

        // Reset form
        contactForm.reset();
    });
}

function showSuccessMessage() {
    // Create success message element
    const successMessage = document.createElement('div');
    successMessage.className = 'success-message';
    successMessage.innerHTML = `
        <div style="
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            background: white;
            padding: 2rem 3rem;
            border-radius: 4px;
            box-shadow: 0 8px 32px rgba(0,0,0,0.2);
            z-index: 1000;
            text-align: center;
            animation: fadeInScale 0.3s ease;
        ">
            <h3 style="color: #0A2540; margin-bottom: 1rem;">Vielen Dank!</h3>
            <p style="color: #666666; margin-bottom: 1.5rem;">
                Wir haben dein Profil erhalten und melden uns, sobald ein passendes Projekt entsteht.
            </p>
            <button onclick="this.parentElement.parentElement.remove()" style="
                background: #E07A5F;
                color: white;
                border: none;
                padding: 0.75rem 2rem;
                border-radius: 4px;
                cursor: pointer;
                font-size: 1rem;
                font-weight: 500;
            ">Schließen</button>
        </div>
        <div style="
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0,0,0,0.5);
            z-index: 999;
        " onclick="this.parentElement.remove()"></div>
    `;

    document.body.appendChild(successMessage);

    // Add animation keyframe
    if (!document.getElementById('fadeInScaleStyle')) {
        const style = document.createElement('style');
        style.id = 'fadeInScaleStyle';
        style.textContent = `
            @keyframes fadeInScale {
                from {
                    opacity: 0;
                    transform: translate(-50%, -50%) scale(0.9);
                }
                to {
                    opacity: 1;
                    transform: translate(-50%, -50%) scale(1);
                }
            }
        `;
        document.head.appendChild(style);
    }
}

// ===================================
// Parallax Effect for Hero Decoration
// ===================================

let ticking = false;

function updateParallax() {
    const scrolled = window.pageYOffset;
    const heroDecoration = document.querySelector('.hero-decoration');

    if (heroDecoration) {
        const parallaxSpeed = 0.3;
        heroDecoration.style.transform = `translateY(${scrolled * parallaxSpeed}px)`;
    }

    ticking = false;
}

function requestParallaxTick() {
    if (!ticking) {
        window.requestAnimationFrame(updateParallax);
        ticking = true;
    }
}

window.addEventListener('scroll', requestParallaxTick);

// ===================================
// Role Tag Interaction Enhancement
// ===================================

document.addEventListener('DOMContentLoaded', () => {
    const roleTags = document.querySelectorAll('.role-tag');

    roleTags.forEach(tag => {
        tag.addEventListener('click', () => {
            // Scroll to form and pre-select the role if possible
            const roleSelect = document.getElementById('role');
            const roleText = tag.textContent.trim().toLowerCase();

            // Map role tags to select options
            const roleMap = {
                'agile coaches': 'agile-coach',
                'scrum master': 'scrum-master',
                'product owner': 'product-owner',
                'change- und transformationsbegleiter:innen': 'change-transformation',
                'okr coaches': 'okr-coach',
                'organisationsentwickler:innen mit agilem fokus': 'org-entwicklung'
            };

            const roleValue = roleMap[roleText];
            if (roleValue && roleSelect) {
                roleSelect.value = roleValue;
            }

            // Scroll to form
            const contactSection = document.getElementById('kontakt');
            if (contactSection) {
                contactSection.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });
});

// ===================================
// Scroll Progress Indicator (Optional)
// ===================================

function updateScrollProgress() {
    const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
    const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrolled = (winScroll / height) * 100;

    // You can add a progress bar element if desired
    // For now, this is just a placeholder for future enhancement
}

window.addEventListener('scroll', updateScrollProgress);

// ===================================
// Form Validation Enhancement
// ===================================

document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('contactForm');
    if (!form) return;

    const inputs = form.querySelectorAll('input, textarea, select');

    inputs.forEach(input => {
        // Add blur validation
        input.addEventListener('blur', () => {
            validateField(input);
        });

        // Remove error on focus
        input.addEventListener('focus', () => {
            removeError(input);
        });
    });
});

function validateField(field) {
    if (field.hasAttribute('required') && !field.value.trim()) {
        showError(field, 'Dieses Feld ist erforderlich');
        return false;
    }

    if (field.type === 'email' && field.value) {
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailPattern.test(field.value)) {
            showError(field, 'Bitte gib eine gültige E-Mail-Adresse ein');
            return false;
        }
    }

    removeError(field);
    return true;
}

function showError(field, message) {
    removeError(field); // Remove existing error first

    field.style.borderColor = '#E07A5F';

    const errorDiv = document.createElement('div');
    errorDiv.className = 'field-error';
    errorDiv.style.cssText = 'color: #E07A5F; font-size: 0.875rem; margin-top: 0.25rem;';
    errorDiv.textContent = message;

    field.parentElement.appendChild(errorDiv);
}

function removeError(field) {
    field.style.borderColor = '';
    const existingError = field.parentElement.querySelector('.field-error');
    if (existingError) {
        existingError.remove();
    }
}

// ===================================
// Console Welcome Message
// ===================================

console.log('%c👋 Willkommen bei unserem Freelancer-Netzwerk!', 'font-size: 16px; font-weight: bold; color: #0A2540;');
console.log('%cWir freuen uns über dein Interesse. Bei Fragen kannst du dich gerne an uns wenden.', 'font-size: 12px; color: #666666;');
