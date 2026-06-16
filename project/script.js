/* ==========================================================================
   SARANGI CONSULTING — BCG-Style Interactive Behaviors
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {

    // ======================================================================
    // 1. MEGA MENU TOGGLE
    // ======================================================================
    const burgerBtn = document.getElementById('burger-btn');
    const closeMenuBtn = document.getElementById('close-menu-btn');
    const megaMenu = document.getElementById('mega-menu');
    const megaNavPrimary = document.getElementById('mega-nav-primary');

    const openMenu = () => {
        megaMenu.classList.add('active');
        burgerBtn.classList.add('active');
        document.body.style.overflow = 'hidden';
    };

    const closeMenu = () => {
        megaMenu.classList.remove('active');
        burgerBtn.classList.remove('active');
        document.body.style.overflow = '';
        
        // Reset to primary nav
        document.querySelectorAll('.mega-submenu').forEach(sub => sub.classList.remove('active'));
        megaNavPrimary.style.display = '';
    };

    if (burgerBtn) burgerBtn.addEventListener('click', openMenu);
    if (closeMenuBtn) closeMenuBtn.addEventListener('click', closeMenu);

    // Close menu on link click
    megaMenu?.querySelectorAll('a:not(.has-submenu)').forEach(link => {
        link.addEventListener('click', () => {
            // Small delay for visual feedback
            setTimeout(closeMenu, 150);
        });
    });

    // Close on Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && megaMenu.classList.contains('active')) {
            closeMenu();
        }
    });

    // ======================================================================
    // 2. MEGA MENU SUB-NAVIGATION
    // ======================================================================
    const submenuLinks = document.querySelectorAll('.has-submenu');
    const backButtons = document.querySelectorAll('.mega-back-btn');

    submenuLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('data-submenu');
            const targetSubmenu = document.getElementById(targetId);
            
            if (targetSubmenu) {
                megaNavPrimary.style.display = 'none';
                targetSubmenu.classList.add('active');
            }
        });
    });

    backButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            document.querySelectorAll('.mega-submenu').forEach(sub => sub.classList.remove('active'));
            megaNavPrimary.style.display = '';
        });
    });

    // ======================================================================
    // 3. SEARCH FILTER IN MEGA MENU
    // ======================================================================
    const searchInput = document.getElementById('mega-search-input');

    if (searchInput) {
        searchInput.addEventListener('input', (e) => {
            const query = e.target.value.toLowerCase().trim();
            const allLinks = megaMenu.querySelectorAll('.mega-nav-link, .mega-submenu-link');
            
            if (query === '') {
                // Reset visibility
                allLinks.forEach(link => {
                    link.style.display = '';
                });
                document.querySelectorAll('.mega-nav-section, .mega-nav-divider, .mega-nav-category-title').forEach(el => {
                    el.style.display = '';
                });
                return;
            }
            
            allLinks.forEach(link => {
                const text = link.textContent.toLowerCase();
                link.style.display = text.includes(query) ? '' : 'none';
            });
        });
    }

    // ======================================================================
    // 4. STICKY HEADER SCROLL EFFECT
    // ======================================================================
    const header = document.getElementById('bcg-header');

    window.addEventListener('scroll', () => {
        if (window.scrollY > 80) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // ======================================================================
    // 5. SCROLL REVEAL ANIMATIONS
    // ======================================================================
    const revealElements = document.querySelectorAll('.reveal-up');

    const revealCallback = (entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
            }
        });
    };

    const revealOptions = {
        threshold: 0.1,
        rootMargin: "0px 0px -60px 0px"
    };

    const revealObserver = new IntersectionObserver(revealCallback, revealOptions);

    revealElements.forEach(el => {
        revealObserver.observe(el);
    });

    // ======================================================================
    // 6. HERO GRADIENT PAUSE/PLAY
    // ======================================================================
    const pauseBtn = document.getElementById('hero-pause-btn');
    const gradientBg = document.querySelector('.hero-gradient-bg');
    let isPaused = false;

    if (pauseBtn && gradientBg) {
        pauseBtn.addEventListener('click', () => {
            isPaused = !isPaused;
            if (isPaused) {
                gradientBg.style.animationPlayState = 'paused';
                pauseBtn.innerHTML = '<i class="fas fa-play"></i>';
            } else {
                gradientBg.style.animationPlayState = 'running';
                pauseBtn.innerHTML = '<i class="fas fa-pause"></i>';
            }
        });
    }

    // ======================================================================
    // 7. SUBSCRIBE FORM
    // ======================================================================
    const subscribeForm = document.getElementById('subscribe-form');

    if (subscribeForm) {
        subscribeForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const emailInput = subscribeForm.querySelector('.subscribe-input');
            const submitBtn = subscribeForm.querySelector('.subscribe-btn');
            
            if (emailInput && emailInput.value.trim()) {
                const originalText = submitBtn.textContent;
                submitBtn.textContent = 'SUBSCRIBING...';
                submitBtn.disabled = true;
                
                setTimeout(() => {
                    submitBtn.textContent = 'SUBSCRIBED ✓';
                    submitBtn.style.background = '#22C55E';
                    emailInput.value = '';
                    
                    setTimeout(() => {
                        submitBtn.textContent = originalText;
                        submitBtn.style.background = '';
                        submitBtn.disabled = false;
                    }, 3000);
                }, 1200);
            }
        });
    }

    // ======================================================================
    // 8. SMOOTH SCROLL FOR ANCHOR LINKS
    // ======================================================================
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                e.preventDefault();
                const headerOffset = 80;
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
                
                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

});
