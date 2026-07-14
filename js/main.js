document.addEventListener('DOMContentLoaded', () => {
    // Header Scroll Effect
    window.addEventListener('scroll', () => {
        const header = document.querySelector('header');
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // Mobile Menu Toggle
    const hamburger = document.getElementById('hamburger');
    const mobileMenu = document.getElementById('mobile-menu');
    const mobileLinks = document.querySelectorAll('.mobile-link');
    
    if (hamburger && mobileMenu) {
        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('active');
            mobileMenu.classList.toggle('active');
        });

        mobileLinks.forEach(link => {
            link.addEventListener('click', () => {
                hamburger.classList.remove('active');
                mobileMenu.classList.remove('active');
            });
        });
    }

    // Scroll Orchestration: Intersection Observer
    const scrollElements = document.querySelectorAll('.scroll-reveal');
    const scrollObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, { threshold: 0.15, rootMargin: '0px 0px -50px 0px' });
    
    scrollElements.forEach(el => scrollObserver.observe(el));

    // Dual CTA Modal Logic
    const unlockBtns = document.querySelectorAll('#unlock-btn, #unlock-btn-book');
    const unlockModal = document.getElementById('unlock-modal');
    const closeUnlock = document.getElementById('close-unlock');
    
    unlockBtns.forEach(btn => {
        if(btn) {
            btn.addEventListener('click', (e) => {
                e.preventDefault();
                unlockModal.classList.add('active');
            });
        }
    });
    if (closeUnlock && unlockModal) {
        closeUnlock.addEventListener('click', () => unlockModal.classList.remove('active'));
    }

    // Mythic Diagnostic (Ready Test) Logic
    const readyTrigger = document.getElementById('ready-test-trigger');
    const readyModal = document.getElementById('ready-modal');
    const closeReady = document.getElementById('close-ready');
    const readyNext = document.getElementById('ready-btn-next');
    const readyStep1 = document.getElementById('ready-step-1');
    const readyStep2 = document.getElementById('ready-step-2');
    const readyStep3 = document.getElementById('ready-step-3');
    const scanStatus = document.getElementById('ready-scan-status');

    if (readyTrigger && readyModal) {
        readyTrigger.addEventListener('click', (e) => {
            e.preventDefault();
            readyStep1.style.display = 'block';
            readyStep2.style.display = 'none';
            readyStep3.style.display = 'none';
            readyModal.classList.add('active');
        });
    }

    if (closeReady && readyModal) {
        closeReady.addEventListener('click', () => readyModal.classList.remove('active'));
    }

    if (readyNext) {
        readyNext.addEventListener('click', () => {
            readyStep1.style.display = 'none';
            readyStep2.style.display = 'block';

            const phrases = [
                "Initializing protocols...",
                "Scanning structural integrity...",
                "Mapping operational pattern...",
                "Consulting the Codex..."
            ];
            
            let i = 0;
            scanStatus.textContent = phrases[i];
            
            const interval = setInterval(() => {
                i++;
                if (i < phrases.length) {
                    scanStatus.textContent = phrases[i];
                } else {
                    clearInterval(interval);
                    readyStep2.style.display = 'none';
                    readyStep3.style.display = 'block';
                    
                    // Simple randomizer for Archetype mapping (since it's a simulator)
                    const archetypes = [
                        { title: "Initiate", copy: "You are awakening to the architecture. The path forward requires clarity and structure." },
                        { title: "Adept", copy: "You are shaping the field with intention. It is time to deepen your systems." },
                        { title: "Architect", copy: "You are designing systems that others inhabit. Continue weaving the lineage." }
                    ];
                    const pick = archetypes[Math.floor(Math.random() * archetypes.length)];
                    document.getElementById('result-title').textContent = pick.title;
                    document.getElementById('result-text').textContent = pick.copy;
                }
            }, 800);
        });
    }

    // Interactive Card Glow tracking
    const interactiveCards = document.querySelectorAll('.interactive-card');
    interactiveCards.forEach(card => {
        card.addEventListener('mousemove', e => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            card.style.setProperty('--mouse-x', `${x}px`);
            card.style.setProperty('--mouse-y', `${y}px`);
        });
    });
});
