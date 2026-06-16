document.addEventListener('DOMContentLoaded', () => {

    // Loading Screen
    const loader = document.getElementById('loader');
    window.addEventListener('load', () => {
        setTimeout(() => {
            loader.classList.add('hidden');
        }, 1200);
    });
    // Fallback: hide loader after 3s even if assets haven't loaded
    setTimeout(() => { loader.classList.add('hidden'); }, 3000);
    
    // Scroll Reveal Animation
    const revealElements = document.querySelectorAll('.reveal, .reveal-left, .reveal-right, .reveal-bounce, .reveal-stagger');
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

    if (cursor && cursorDot && !isMobile) {
        let cursorX = 0, cursorY = 0;
        let dotX = 0, dotY = 0;

        document.addEventListener('mousemove', (e) => {
            cursorX = e.clientX;
            cursorY = e.clientY;
            cursorDot.style.left = e.clientX + 'px';
            cursorDot.style.top = e.clientY + 'px';
        });

        // Smooth cursor follow
        function animateCursor() {
            dotX += (cursorX - dotX) * 0.15;
            dotY += (cursorY - dotY) * 0.15;
            cursor.style.left = dotX + 'px';
            cursor.style.top = dotY + 'px';
            requestAnimationFrame(animateCursor);
        }
        animateCursor();

        const hoverElements = document.querySelectorAll('a, button, .primary-btn, .gallery-item img, .gallery-item video, .project-item, .team-member');
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
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });

    // Parallax effect on giant background text
    if (!isMobile) {
        window.addEventListener('scroll', () => {
            document.querySelectorAll('.giant-bg-text').forEach(el => {
                const rect = el.parentElement.getBoundingClientRect();
                const speed = 0.05;
                const yPos = rect.top * speed;
                el.style.transform = `translate(-50%, calc(-50% + ${yPos}px))`;
            });
        }, { passive: true });
    }

    // Typing effect for cover subtitle (optional enhancement)
    const coverTitle = document.querySelector('.cover-logo-title');
    if (coverTitle) {
        coverTitle.style.opacity = '0';
        setTimeout(() => {
            coverTitle.style.transition = 'opacity 1s ease';
            coverTitle.style.opacity = '1';
        }, 2000);
    }

    // Video Thumbnail Play/Pause
    document.querySelectorAll('.video-thumb-container').forEach(container => {
        const video = container.querySelector('video');
        const overlay = container.querySelector('.video-play-overlay');

        // Force load thumbnail on iOS - muted autoplay is allowed, so briefly play then pause
        function forceLoadThumbnail() {
            if (video.readyState < 2) {
                video.muted = true;
                const playPromise = video.play();
                if (playPromise !== undefined) {
                    playPromise.then(() => {
                        setTimeout(() => {
                            video.pause();
                            video.currentTime = 0.001;
                        }, 100);
                    }).catch(() => {
                        // Autoplay blocked, try load instead
                        video.load();
                    });
                }
            }
        }

        // Try to load thumbnail after a short delay (gives iOS time to set up)
        setTimeout(forceLoadThumbnail, 500 + Math.random() * 1000);

        video.addEventListener('loadeddata', () => {
            video.pause();
        });

        container.addEventListener('click', () => {
            if (video.paused) {
                // Pause all other videos first
                document.querySelectorAll('.video-thumb-container video').forEach(v => {
                    if (v !== video) {
                        v.pause();
                        v.closest('.video-thumb-container').classList.remove('playing');
                    }
                });
                video.muted = false;
                video.controls = true;
                video.play();
                container.classList.add('playing');
            } else {
                video.pause();
                container.classList.remove('playing');
            }
        });

        video.addEventListener('ended', () => {
            container.classList.remove('playing');
            video.controls = false;
        });
    });

    // Art Direction - Click to expand/lightbox
    document.querySelectorAll('.art-gallery-item').forEach(item => {
        item.addEventListener('click', () => {
            if (item.classList.contains('expanded')) {
                item.classList.remove('expanded');
            } else {
                // Close any other expanded item
                document.querySelectorAll('.art-gallery-item.expanded').forEach(el => {
                    el.classList.remove('expanded');
                });
                item.classList.add('expanded');
            }
        });
    });

    // Close expanded image on Escape key or clicking outside
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            document.querySelectorAll('.art-gallery-item.expanded').forEach(el => {
                el.classList.remove('expanded');
            });
        }
    });
});
