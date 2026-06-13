document.addEventListener('DOMContentLoaded', () => {
    
    // Scroll Reveal Animation
    const revealElements = document.querySelectorAll('.reveal, .reveal-left, .reveal-right, .reveal-bounce');
    const isMobile = window.innerWidth <= 768;

    const revealOnScroll = () => {
        const windowHeight = window.innerHeight;
        const elementVisible = isMobile ? 80 : 150;

        revealElements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            if (elementTop < windowHeight - elementVisible) {
                element.classList.add('active');
            }
        });
    };

    window.addEventListener('scroll', revealOnScroll, { passive: true });
    revealOnScroll();

    // Custom Cursor Logic
    const cursor = document.querySelector('.custom-cursor');
    const cursorDot = document.querySelector('.custom-cursor-dot');

    if (cursor && cursorDot) {
        document.addEventListener('mousemove', (e) => {
            cursor.style.left = e.clientX + 'px';
            cursor.style.top = e.clientY + 'px';
            cursorDot.style.left = e.clientX + 'px';
            cursorDot.style.top = e.clientY + 'px';
        });

        const hoverElements = document.querySelectorAll('a, button, .primary-btn, .gallery-item img, .gallery-item video');
        hoverElements.forEach(el => {
            el.addEventListener('mouseenter', () => cursor.classList.add('hover'));
            el.addEventListener('mouseleave', () => cursor.classList.remove('hover'));
        });
    }

    // Side Navigation Active State Logic
    const slides = document.querySelectorAll('.slide');
    const navDots = document.querySelectorAll('.nav-dot');

    const updateNavOnScroll = () => {
        let currentSlideId = '';
        slides.forEach(slide => {
            const slideTop = slide.getBoundingClientRect().top;
            // If the top of the slide is above the middle of the viewport
            if (slideTop <= window.innerHeight / 2) {
                currentSlideId = slide.getAttribute('id');
            }
        });

        navDots.forEach(dot => {
            dot.classList.remove('active');
            if (dot.getAttribute('href') === `#${currentSlideId}`) {
                dot.classList.add('active');
            }
        });
    };

    window.addEventListener('scroll', updateNavOnScroll);
    updateNavOnScroll();

    // Smooth Scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });
});
