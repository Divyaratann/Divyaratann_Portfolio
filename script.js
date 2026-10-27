/* ==========================================================================
   DIVYARATANN SRIVASTAVA - MODERN AI ENGINEER PORTFOLIO SCRIPT (2026)
   Interactivity, Canvas Particles, Cursor Glow, Active Scroll Spy & EmailJS
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
    // 1. Hide Loading Screen
    const loader = document.getElementById('loader');
    window.addEventListener('load', () => {
        setTimeout(() => {
            if (loader) loader.classList.add('hidden');
        }, 300);
    });

    // 2. Initialize Particles Canvas Background
    initParticlesCanvas();

    // 3. Glowing Cursor Spotlight Tracking
    initCursorGlow();

    // 4. Scroll Progress Indicator & Navbar Blur
    initScrollEffects();

    // 5. Typing Animation for Hero Section
    initTypingEffect();

    // 6. Mobile Menu Drawer Navigation
    initMobileNavigation();

    // 7. Active Navbar Scroll Spy (Intersection Observer)
    initScrollSpy();

    // 8. Animated Counter Numbers
    initAnimatedCounters();

    // 9. Interactive 3D Card Tilt Effect
    initTiltCards();

    // 10. Contact Form Validation & EmailJS Integration
    initContactForm();

    // 11. Interactive Project Filter Tabs
    initProjectFilters();

    // 12. Floating Instant Resume & Visitor Connect Widget
    initVisitorConnectWidget();
});

/* ==========================================================================
   PARTICLES CANVAS BACKGROUND
   ========================================================================== */
function initParticlesCanvas() {
    const canvas = document.getElementById('particles-canvas');
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let width = canvas.width = window.innerWidth;
    let height = canvas.height = window.innerHeight;

    window.addEventListener('resize', () => {
        width = canvas.width = window.innerWidth;
        height = canvas.height = window.innerHeight;
    });

    const particleCount = Math.min(Math.floor(width / 15), 60);
    const particles = [];

    for (let i = 0; i < particleCount; i++) {
        particles.push({
            x: Math.random() * width,
            y: Math.random() * height,
            radius: Math.random() * 2 + 1,
            vx: (Math.random() - 0.5) * 0.5,
            vy: (Math.random() - 0.5) * 0.5,
            color: Math.random() > 0.5 ? 'rgba(99, 102, 241, ' : 'rgba(139, 92, 246, ',
            alpha: Math.random() * 0.4 + 0.15
        });
    }

    function render() {
        ctx.clearRect(0, 0, width, height);

        // Draw connections
        for (let i = 0; i < particles.length; i++) {
            for (let j = i + 1; j < particles.length; j++) {
                const dx = particles[i].x - particles[j].x;
                const dy = particles[i].y - particles[j].y;
                const dist = Math.sqrt(dx * dx + dy * dy);

                if (dist < 120) {
                    ctx.beginPath();
                    ctx.moveTo(particles[i].x, particles[i].y);
                    ctx.lineTo(particles[j].x, particles[j].y);
                    ctx.strokeStyle = `rgba(99, 102, 241, ${0.12 * (1 - dist / 120)})`;
                    ctx.lineWidth = 0.5;
                    ctx.stroke();
                }
            }
        }

        // Draw & move particles
        particles.forEach(p => {
            p.x += p.vx;
            p.y += p.vy;

            if (p.x < 0 || p.x > width) p.vx *= -1;
            if (p.y < 0 || p.y > height) p.vy *= -1;

            ctx.beginPath();
            ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
            ctx.fillStyle = p.color + p.alpha + ')';
            ctx.fill();
        });

        requestAnimationFrame(render);
    }

    render();
}

/* ==========================================================================
   CURSOR GLOW SPOTLIGHT
   ========================================================================== */
function initCursorGlow() {
    const cursorGlow = document.getElementById('cursor-glow');
    if (!cursorGlow) return;

    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;
    let currentX = mouseX;
    let currentY = mouseY;

    window.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
    });

    function animateCursor() {
        currentX += (mouseX - currentX) * 0.1;
        currentY += (mouseY - currentY) * 0.1;
        cursorGlow.style.left = `${currentX}px`;
        cursorGlow.style.top = `${currentY}px`;
        requestAnimationFrame(animateCursor);
    }

    animateCursor();
}

/* ==========================================================================
   SCROLL EFFECTS & PROGRESS BAR
   ========================================================================== */
function initScrollEffects() {
    const scrollProgress = document.getElementById('scroll-progress');
    const navbar = document.getElementById('navbar');

    window.addEventListener('scroll', () => {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const progress = (scrollTop / scrollHeight) * 100;

        if (scrollProgress) {
            scrollProgress.style.width = `${progress}%`;
        }

        if (navbar) {
            if (scrollTop > 50) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
        }
    });
}

/* ==========================================================================
   HERO TYPING ANIMATION
   ========================================================================== */
function initTypingEffect() {
    const typingElement = document.getElementById('typing-text');
    if (!typingElement) return;

    const roles = [
        'AI & Machine Learning Engineer',
        'Software QA & Automation Engineer',
        'Full-Stack Software Developer',
        'Generative AI & LLM Systems Engineer',
        'SDET & Test Automation Specialist'
    ];

    let roleIndex = 0;
    let charIndex = 0;
    let isDeleting = false;

    function type() {
        const currentRole = roles[roleIndex];
        let typingSpeed = 70 + Math.random() * 20;

        if (isDeleting) {
            typingElement.textContent = currentRole.substring(0, charIndex - 1);
            charIndex--;
            typingSpeed = 30;
        } else {
            typingElement.textContent = currentRole.substring(0, charIndex + 1);
            charIndex++;
        }

        if (!isDeleting && charIndex === currentRole.length) {
            isDeleting = true;
            typingSpeed = 2200; // 2.2s reading pause for recruiters
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            roleIndex = (roleIndex + 1) % roles.length;
            typingSpeed = 350; // Pause before typing next role
        }

        setTimeout(type, typingSpeed);
    }

    type();
}

/* ==========================================================================
   MOBILE NAVIGATION MENU
   ========================================================================== */
function initMobileNavigation() {
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    if (!hamburger || !navMenu) return;

    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });
}

/* ==========================================================================
   SCROLL SPY FOR NAVBAR LINKS
   ========================================================================== */
function initScrollSpy() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');

    window.addEventListener('scroll', () => {
        let currentSection = '';
        const scrollPosition = window.pageYOffset + 120;

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;

            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                currentSection = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${currentSection}`) {
                link.classList.add('active');
            }
        });
    });
}

/* ==========================================================================
   ANIMATED COUNTER NUMBERS
   ========================================================================== */
function initAnimatedCounters() {
    const statNumbers = document.querySelectorAll('.stat-number');
    let hasAnimated = false;

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !hasAnimated) {
                hasAnimated = true;
                statNumbers.forEach(stat => {
                    const target = parseInt(stat.getAttribute('data-target'), 10);
                    let count = 0;
                    const duration = 2000;
                    const increment = target / (duration / 16);

                    function updateCount() {
                        count += increment;
                        if (count < target) {
                            stat.textContent = Math.ceil(count);
                            requestAnimationFrame(updateCount);
                        } else {
                            stat.textContent = target;
                        }
                    }

                    updateCount();
                });
            }
        });
    }, { threshold: 0.5 });

    const statsGrid = document.querySelector('.stats-counter-grid');
    if (statsGrid) observer.observe(statsGrid);
}

/* ==========================================================================
   3D CARD TILT EFFECT
   ========================================================================== */
function initTiltCards() {
    const cards = document.querySelectorAll('.tilt-card');

    cards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            const centerX = rect.width / 2;
            const centerY = rect.height / 2;

            const rotateX = (y - centerY) / 20;
            const rotateY = (centerX - x) / 20;

            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-4px)`;
        });

        card.addEventListener('mouseleave', () => {
            card.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0px)`;
        });
    });
}

/* ==========================================================================
   CONTACT FORM & EMAILJS
   ========================================================================== */
function initContactForm() {
    const contactForm = document.getElementById('contactForm');
    if (!contactForm) return;

    // Initialize EmailJS
    if (typeof emailjs !== 'undefined') {
        emailjs.init("a6l1Ph8gIdj4gEAz0");
    }

    contactForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        if (!validateForm()) return;

        const submitBtn = document.getElementById('submit-btn');
        const originalBtnHtml = submitBtn.innerHTML;

        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending Message...';
        submitBtn.disabled = true;

        const formData = {
            from_name: document.getElementById('name').value.trim(),
            from_email: document.getElementById('email').value.trim(),
            subject: document.getElementById('subject').value.trim(),
            message: document.getElementById('message').value.trim(),
            to_email: 'divyaratann2703@gmail.com'
        };

        try {
            if (typeof emailjs !== 'undefined') {
                await emailjs.send(
                    'service_88g26s5',
                    'template_exnd33n',
                    formData,
                    'a6l1Ph8gIdj4gEAz0'
                );

                showNotification('✅ Message sent successfully! I will get back to you soon.', 'success');
                contactForm.reset();
            } else {
                throw new Error("EmailJS SDK not loaded");
            }
        } catch (error) {
            console.error('Email submission error:', error);
            // Fallback Mailto
            const mailtoSubject = encodeURIComponent(formData.subject);
            const mailtoBody = encodeURIComponent(`Name: ${formData.from_name}\nEmail: ${formData.from_email}\n\nMessage:\n${formData.message}`);
            window.location.href = `mailto:divyaratann2703@gmail.com?subject=${mailtoSubject}&body=${mailtoBody}`;
            showNotification('📧 Opening default email client...', 'info');
        } finally {
            submitBtn.innerHTML = originalBtnHtml;
            submitBtn.disabled = false;
        }
    });

    function validateForm() {
        let isValid = true;
        const nameInput = document.getElementById('name');
        const emailInput = document.getElementById('email');
        const subjectInput = document.getElementById('subject');
        const messageInput = document.getElementById('message');

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        // Reset error states
        document.querySelectorAll('.form-group').forEach(group => group.classList.remove('error'));

        if (!nameInput.value.trim()) {
            nameInput.closest('.form-group').classList.add('error');
            isValid = false;
        }

        if (!emailInput.value.trim() || !emailRegex.test(emailInput.value.trim())) {
            emailInput.closest('.form-group').classList.add('error');
            isValid = false;
        }

        if (!subjectInput.value.trim()) {
            subjectInput.closest('.form-group').classList.add('error');
            isValid = false;
        }

        if (!messageInput.value.trim()) {
            messageInput.closest('.form-group').classList.add('error');
            isValid = false;
        }

        return isValid;
    }
}

/* Toast Notification Utility */
function showNotification(message, type = 'info') {
    const existingToast = document.querySelector('.notification-toast');
    if (existingToast) existingToast.remove();

    const toast = document.createElement('div');
    toast.className = `notification-toast notification-${type}`;
    toast.innerHTML = `
        <i class="fas ${type === 'success' ? 'fa-check-circle text-accent' : 'fa-info-circle'}"></i>
        <span>${message}</span>
    `;

    document.body.appendChild(toast);

    setTimeout(() => {
        toast.style.opacity = '0';
        toast.style.transition = 'opacity 0.4s ease';
        setTimeout(() => toast.remove(), 400);
    }, 4000);
}

/* ==========================================================================
   INTERACTIVE PROJECT CATEGORY FILTERS (CHECK POINT STYLE)
   ========================================================================== */
function initProjectFilters() {
    const tabs = document.querySelectorAll('.tech-tab');
    const cards = document.querySelectorAll('#projects-grid .project-card');

    if (!tabs.length || !cards.length) return;

    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            tabs.forEach(t => t.classList.remove('active'));
            tab.classList.add('active');

            const filter = tab.getAttribute('data-filter');

            cards.forEach(card => {
                const category = card.getAttribute('data-category');
                if (filter === 'all' || category === filter) {
                    card.classList.remove('filter-hidden');
                } else {
                    card.classList.add('filter-hidden');
                }
            });
        });
    });
}


/* ==========================================================================
   FLOATING INSTANT RESUME & DIRECT CONNECT WIDGET
   ========================================================================== */
function initVisitorConnectWidget() {
    const toggleBtn = document.getElementById('connect-toggle-btn');
    const connectCard = document.getElementById('connect-card');
    const closeBtn = document.getElementById('connect-close-btn');
    const quickForm = document.getElementById('visitor-quick-form');
    const statusMsg = document.getElementById('connect-status-msg');
    const submitBtn = document.getElementById('visitor-submit-btn');

    if (!toggleBtn || !connectCard) return;

    // Toggle drawer open/close
    toggleBtn.addEventListener('click', () => {
        connectCard.classList.toggle('active');
        if (connectCard.classList.contains('active')) {
            const emailInput = document.getElementById('visitor-quick-email');
            if (emailInput) emailInput.focus();
        }
    });

    if (closeBtn) {
        closeBtn.addEventListener('click', () => {
            connectCard.classList.remove('active');
        });
    }

    // Auto-prompt subtly after 12 seconds of viewing if user hasn't opened it yet
    setTimeout(() => {
        if (!sessionStorage.getItem('divy_connect_prompted') && !connectCard.classList.contains('active')) {
            connectCard.classList.add('active');
            sessionStorage.setItem('divy_connect_prompted', 'true');
        }
    }, 12000);

    // Form Submission Handling
    if (quickForm) {
        quickForm.addEventListener('submit', async (e) => {
            e.preventDefault();

            const emailInput = document.getElementById('visitor-quick-email');
            const orgInput = document.getElementById('visitor-quick-org');
            const email = emailInput ? emailInput.value.trim() : '';
            const org = orgInput ? orgInput.value.trim() : 'Not Specified';

            if (!email) return;

            const originalBtnHtml = submitBtn ? submitBtn.innerHTML : '';
            if (submitBtn) {
                submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending Details...';
                submitBtn.disabled = true;
            }

            // Notification payload for Divyaratann & auto-delivery
            const mailData = {
                from_name: `Visitor (${org})`,
                from_email: email,
                subject: `🚀 [Live Portfolio Lead] Visitor Request from ${email}`,
                message: `A new visitor viewed your portfolio and requested your verified resume & GitHub repos!\n\nEmail: ${email}\nOrganization: ${org}\nTimestamp: ${new Date().toLocaleString()}\nPage: ${window.location.href}`,
                to_email: 'divyaratann2703@gmail.com'
            };

            try {
                if (typeof emailjs !== 'undefined') {
                    await emailjs.send(
                        'service_88g26s5',
                        'template_exnd33n',
                        mailData,
                        'a6l1Ph8gIdj4gEAz0'
                    );
                }
            } catch (err) {
                console.warn('Auto-notify emailjs error:', err);
            }

            // Provide immediate positive feedback & direct resume download link
            if (statusMsg) {
                statusMsg.className = 'connect-status-msg success';
                statusMsg.innerHTML = `
                    <div style="margin-bottom: 6px;"><strong>✅ Success!</strong> Profile package dispatched to <code>${email}</code>.</div>
                    <a href="resume.pdf" download class="btn btn-sm btn-outline" style="font-size: 0.78rem; padding: 4px 10px; display: inline-flex; align-items: center; gap: 5px; margin-top: 4px; text-decoration: none;">
                        <i class="fas fa-download"></i> Direct Resume PDF Download
                    </a>
                `;
            }

            showNotification(`🎉 Resume package dispatched to ${email}!`, 'success');
            quickForm.reset();

            if (submitBtn) {
                submitBtn.innerHTML = '<i class="fas fa-check"></i> Dispatched!';
            }

            // Auto close card after 6 seconds
            setTimeout(() => {
                if (connectCard.classList.contains('active')) {
                    connectCard.classList.remove('active');
                }
                if (submitBtn) {
                    submitBtn.innerHTML = originalBtnHtml;
                    submitBtn.disabled = false;
                }
            }, 6000);
        });
    }
}
