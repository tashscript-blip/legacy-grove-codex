// Navigation Scroll Effect
window.addEventListener('scroll', () => {
    const header = document.querySelector('header');
    if (window.scrollY > 50) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
});

// Intersection Observer for Scroll Animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('fade-in');
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

document.addEventListener('DOMContentLoaded', () => {
    // Header init
    if (window.scrollY > 50) document.querySelector('header').classList.add('scrolled');

    // Add animate class to elements
    const fadeElements = document.querySelectorAll('.card, .feature-content, .feature-image, .checklist-item, .capture-container');
    fadeElements.forEach((el, index) => {
        el.classList.add('animate');
        if (el.classList.contains('card') || el.classList.contains('checklist-item')) {
            el.style.transitionDelay = `${(index % 3) * 0.15}s`;
        }
        observer.observe(el);
    });
    
    // Checklist interactive & LocalStorage
    const checkboxes = document.querySelectorAll('.checklist-checkbox');
    checkboxes.forEach(cb => {
        const id = cb.getAttribute('data-id');
        
        // Load state
        if (id && localStorage.getItem(id) === 'true') {
            cb.innerHTML = '✓';
            cb.style.color = 'var(--accent-green)';
            cb.classList.add('checked');
        } else {
            cb.innerHTML = '';
            cb.style.color = 'transparent';
        }

        cb.addEventListener('click', function() {
            if(this.classList.contains('checked')) {
                this.innerHTML = '';
                this.style.color = 'transparent';
                this.classList.remove('checked');
                if (id) localStorage.setItem(id, 'false');
            } else {
                this.innerHTML = '✓';
                this.style.color = 'var(--accent-green)';
                this.classList.add('checked');
                if (id) localStorage.setItem(id, 'true');
            }
        });
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

    // Modal Logic & Diagnostic Simulation
    const readyTrigger = document.getElementById('ready-test-trigger');
    const readyModal = document.getElementById('ready-modal');
    const closeModal = document.getElementById('close-modal');
    
    const readyStep1 = document.getElementById('ready-step-1');
    const readyStep2 = document.getElementById('ready-step-2');
    const readyStep3 = document.getElementById('ready-step-3');
    
    const readyBtnNext = document.getElementById('ready-btn-next');
    const readyBtnClose = document.getElementById('ready-btn-close');
    const scanStatusText = document.getElementById('ready-scan-status');
    
    // Scores and results elements
    const scoreFoundations = document.getElementById('score-foundations');
    const scoreCapital = document.getElementById('score-capital');
    const scoreCompliance = document.getElementById('score-compliance');
    const resultTitle = document.getElementById('result-title');
    const resultText = document.getElementById('result-text');

    function resetReadyModal() {
        readyStep1.style.display = 'block';
        readyStep2.style.display = 'none';
        readyStep3.style.display = 'none';
        document.getElementById('ready-entity-name').value = '';
        document.getElementById('ready-classification').selectedIndex = 0;
    }

    if (readyTrigger && readyModal) {
        readyTrigger.addEventListener('click', () => {
            resetReadyModal();
            readyModal.classList.add('active');
        });
    }
    
    if (closeModal && readyModal) {
        closeModal.addEventListener('click', () => {
            readyModal.classList.remove('active');
        });
    }

    if (readyBtnClose && readyModal) {
        readyBtnClose.addEventListener('click', () => {
            readyModal.classList.remove('active');
        });
    }

    if (readyBtnNext) {
        readyBtnNext.addEventListener('click', () => {
            const entityName = document.getElementById('ready-entity-name').value.trim();
            const classification = document.getElementById('ready-classification').value;

            if (!entityName || !classification) {
                alert('Please enter your Entity Legal Name and select a Classification.');
                return;
            }

            // Transition to Step 2 (Scanning)
            readyStep1.style.display = 'none';
            readyStep2.style.display = 'block';

            const scanPhrases = [
                "Establishing secure connection to municipal registry...",
                "Analyzing structural liability profile...",
                "Running algorithmic audit on state compliance...",
                "Checking capital availability metrics...",
                "Compiling financial health assessment..."
            ];

            let phraseIndex = 0;
            scanStatusText.textContent = scanPhrases[0];

            const scanInterval = setInterval(() => {
                phraseIndex++;
                if (phraseIndex < scanPhrases.length) {
                    scanStatusText.textContent = scanPhrases[phraseIndex];
                } else {
                    clearInterval(scanInterval);
                    showReadyResults(entityName, classification);
                }
            }, 800);
        });
    }

    function showReadyResults(entityName, classification) {
        readyStep2.style.display = 'none';
        readyStep3.style.display = 'block';

        let fScore, cScore, compScore;
        let title, copy;

        if (classification === 'sole') {
            fScore = "42%";
            cScore = "35%";
            compScore = "20%";
            title = "CRITICAL METRIC EXPOSURE DETECTED";
            copy = `Entity "${entityName}" classified as Sole Proprietorship indicates immediate structural risk. Liability shielding is non-existent, and access to MDI/CDFI capital is severely constrained. Recommendation: Convert to Limited Liability Company (LLC) structure immediately to safeguard personal assets and unlock institutional eligibility.`;
        } else if (classification === 'llc') {
            fScore = "85%";
            cScore = "65%";
            compScore = "70%";
            title = "STRUCTURAL BASELINE SECURED";
            copy = `Entity "${entityName}" classified as LLC exhibits solid liability shielding. Operational controls are active, but capital pathways are under-optimized. Recommendation: Establish formal corporate credit files and prioritize MWBE certification to access state-level set-asides and specialized mission-driven finance.`;
        } else {
            fScore = "92%";
            cScore = "80%";
            compScore = "90%";
            title = "ADVANCED SCALING STATUS VERIFIED";
            copy = `Entity "${entityName}" operating under Corporation framework. Registry records match NY Business Express baselines. Optimization path: Accelerate transition to Global NY trade channels and implement secure, audit-ready operational frameworks to protect generational equity.`;
        }

        scoreFoundations.textContent = fScore;
        scoreCapital.textContent = cScore;
        scoreCompliance.textContent = compScore;
        resultTitle.textContent = title;
        resultText.textContent = copy;
    }

    // Access Portal Logic
    const portalBtn = document.querySelector('.portal-btn');
    const portalModal = document.getElementById('portal-modal');
    const closePortal = document.getElementById('close-portal');
    const portalForm = document.getElementById('portal-form');
    const portalLoginBtn = document.getElementById('portal-login-btn');
    const portalStatus = document.getElementById('portal-status');

    if (portalBtn && portalModal) {
        portalBtn.addEventListener('click', (e) => {
            e.preventDefault();
            portalStatus.style.display = 'none';
            portalForm.reset();
            portalLoginBtn.disabled = false;
            portalLoginBtn.textContent = 'Initialize Connection';
            portalModal.classList.add('active');
        });
    }

    if (closePortal && portalModal) {
        closePortal.addEventListener('click', () => {
            portalModal.classList.remove('active');
        });
    }

    if (portalForm) {
        portalForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const username = document.getElementById('portal-username').value.trim();
            portalLoginBtn.disabled = true;
            portalLoginBtn.textContent = 'Connecting...';
            portalStatus.style.display = 'block';
            portalStatus.style.color = 'var(--primary-gold)';
            portalStatus.textContent = '> Resolving secure handshake...';

            setTimeout(() => {
                portalStatus.textContent = '> Authenticating cryptographic key...';
                setTimeout(() => {
                    portalStatus.style.color = 'var(--accent-green)';
                    portalStatus.textContent = '> CONNECTION GRANTED. Welcome back, Architect.';
                    portalLoginBtn.textContent = 'Secure Session Established';
                    setTimeout(() => {
                        portalModal.classList.remove('active');
                    }, 1200);
                }, 1000);
            }, 1000);
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

    // 3D Tilt Effect on Dashboard
    const tiltContainer = document.getElementById('dashboard-tilt');
    if (tiltContainer) {
        const tiltElement = tiltContainer.querySelector('.tilt-element');
        tiltContainer.addEventListener('mousemove', e => {
            const rect = tiltContainer.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            // max rotation 10deg
            const rotateX = ((y - centerY) / centerY) * -10;
            const rotateY = ((x - centerX) / centerX) * 10;
            
            tiltElement.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
        });
        
        tiltContainer.addEventListener('mouseleave', () => {
            tiltElement.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg)`;
        });
    }

    // Scroll Spy for Nav Links
    const sections = document.querySelectorAll('section, header');
    const navLinks = document.querySelectorAll('.nav-link');
    
    window.addEventListener('scroll', () => {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            if (scrollY >= (sectionTop - 200)) {
                current = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active-link');
            if (current && link.getAttribute('href').includes(current)) {
                link.classList.add('active-link');
            }
        });
    });
});
