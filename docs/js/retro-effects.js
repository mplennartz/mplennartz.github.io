// Cursed Investigations Bureau - Retro Effects JavaScript
// Simulating classic 1998 web features

document.addEventListener('DOMContentLoaded', function() {
    const REDUCED_MOTION = window.matchMedia &&
        window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    function ensureGlobalNavLinks() {
        const navLinks = document.querySelector('.nav-links');
        if (!navLinks) return;

        const storiesLink = navLinks.querySelector('a[href$="stories.html"]');
        if (!storiesLink) return;

        const caseHref = storiesLink.getAttribute('href') || '';
        const basePath = caseHref.slice(0, caseHref.length - 'stories.html'.length);
        const operationsHref = basePath + 'operations-map.html';
        const loreHref = basePath + 'lore.html';

        const existingOperations = navLinks.querySelector(`a[href="${operationsHref}"]`);
        const existingLore = navLinks.querySelector(`a[href="${loreHref}"]`);

        if (!existingOperations) {
            const operationsLink = document.createElement('a');
            operationsLink.href = operationsHref;
            operationsLink.className = 'nav-button';
            operationsLink.textContent = 'OPERATIONS MAP';
            storiesLink.insertAdjacentElement('afterend', operationsLink);
        }

        if (!existingLore) {
            const updatedOpsLink = navLinks.querySelector(`a[href="${operationsHref}"]`);
            const insertAfter = updatedOpsLink || storiesLink;
            const loreLink = document.createElement('a');
            loreLink.href = loreHref;
            loreLink.className = 'nav-button';
            loreLink.textContent = 'LORE CODEX';
            insertAfter.insertAdjacentElement('afterend', loreLink);
        }
    }

    ensureGlobalNavLinks();

    
    // Update visitor counter with random increments
    function updateVisitorCounter() {
        const counter = document.querySelector('.visitor-counter .terminal-font');
        if (counter) {
            let currentCount = parseInt(counter.textContent.replace(/\D/g, ''));
            // Randomly increment by 1-3 every few seconds
            const increment = Math.floor(Math.random() * 3) + 1;
            currentCount += increment;
            counter.textContent = `VISITORS: ${currentCount.toString().padStart(6, '0')}`;
        }
    }
    
    // Update visitor counter every 10-30 seconds
    setInterval(updateVisitorCounter, Math.random() * 20000 + 10000);
    
    // Add random blinking effect to certain elements
    function addRandomBlink() {
        const blinkElements = document.querySelectorAll('.blink');
        blinkElements.forEach(element => {
            // Randomly pause blinking for realism
            if (Math.random() < 0.1) {
                element.style.animationPlayState = 'paused';
                setTimeout(() => {
                    element.style.animationPlayState = 'running';
                }, Math.random() * 2000 + 1000);
            }
        });
    }
    
    // Check for random blink pauses every 5 seconds
    if (!REDUCED_MOTION) setInterval(addRandomBlink, 5000);
    
    // Set .last-updated text from site config on page load
    const lastUpdatedEl = document.querySelector('.last-updated');
    if (lastUpdatedEl && typeof SITE_CONFIG !== 'undefined') {
        const gd = SITE_CONFIG.GAME_DATE;
        lastUpdatedEl.textContent = `Last Updated: ${gd.month} ${String(gd.day).padStart(2, '0')}, ${gd.year}`;
    }

    // Simulate "last updated" timestamp glitches (very rarely)
    function maybeUpdateTimestamp() {
        if (Math.random() < 0.01) {
            const timestamp = document.querySelector('.last-updated');
            if (timestamp && typeof SITE_CONFIG !== 'undefined') {
                // Temporal bleed: sometimes the stamp shows where the team is instead
                const era = SITE_CONFIG.TEAM_ERA;
                if (era && Math.random() < 0.33) {
                    timestamp.textContent = `Last Updated: ▓▓ ${era.localDate} ▓▓ [SIGNAL: ${era.label}]`;
                    return;
                }
                const gd = SITE_CONFIG.GAME_DATE;
                const h = Math.floor(Math.random() * 24);
                const m = Math.floor(Math.random() * 60);
                const ampm = h >= 12 ? 'PM' : 'AM';
                const dh = h % 12 || 12;
                timestamp.textContent = `Last Updated: ${gd.month} ${String(gd.day).padStart(2, '0')}, ${gd.year} at ${dh}:${String(m).padStart(2, '0')} ${ampm}`;
            }
        }
    }

    // Check for timestamp updates every minute
    setInterval(maybeUpdateTimestamp, 60000);
    
    // Add subtle cursor following effect for spooky elements
    let mouseX = 0, mouseY = 0;
    
    document.addEventListener('mousemove', function(e) {
        mouseX = e.clientX;
        mouseY = e.clientY;
    });
    
    function addSpookyEffects() {
        const spookyElements = document.querySelectorAll('.spooky');
        spookyElements.forEach(element => {
            const rect = element.getBoundingClientRect();
            const elementX = rect.left + rect.width / 2;
            const elementY = rect.top + rect.height / 2;
            const distance = Math.sqrt(Math.pow(mouseX - elementX, 2) + Math.pow(mouseY - elementY, 2));
            
            // Add glow effect when mouse is near
            if (distance < 100) {
                element.style.textShadow = `0 0 ${Math.max(0, 20 - distance/5)}px var(--text-warning)`;
            } else {
                element.style.textShadow = 'var(--glow-red)';
            }
        });
    }
    
    // Update spooky effects every 100ms
    if (!REDUCED_MOTION) setInterval(addSpookyEffects, 100);
    
    // Simulate occasional "connection issues" with marquee
    function simulateConnection() {
        const marquee = document.querySelector('.marquee-text');
        if (marquee && Math.random() < 0.05) { // 5% chance every 10 seconds
            marquee.style.animationPlayState = 'paused';
            setTimeout(() => {
                marquee.style.animationPlayState = 'running';
            }, Math.random() * 3000 + 1000);
        }
    }
    
    if (!REDUCED_MOTION) setInterval(simulateConnection, 10000);
    
    // Add typewriter effect to terminal elements on hover
    function addTypewriterEffect(element) {
        const originalText = element.textContent;
        element.textContent = '';
        
        let i = 0;
        const typing = setInterval(() => {
            element.textContent += originalText[i];
            i++;
            if (i >= originalText.length) {
                clearInterval(typing);
            }
        }, 50);
    }
    
    // Apply typewriter effect to terminal elements
    if (!REDUCED_MOTION) document.querySelectorAll('.terminal-font').forEach(element => {
        element.addEventListener('mouseenter', () => {
            if (!element.dataset.typed) {
                element.dataset.typed = 'true';
                addTypewriterEffect(element);
            }
        });
    });
    
    // Konami code -> omega clearance file
    const KONAMI = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown',
                    'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight',
                    'KeyB', 'KeyA'];
    let konamiProgress = 0;

    function omegaUnlock() {
        // reuse the nav to find the path back to site root (index.html has
        // no nav but sits at the root, so '' is correct there too)
        const storiesLink = document.querySelector('.nav-links a[href$="stories.html"]');
        const href = storiesLink ? storiesLink.getAttribute('href') : 'stories.html';
        const basePath = href.slice(0, href.length - 'stories.html'.length);
        const target = basePath + 'classified/omega-file.html';

        if (REDUCED_MOTION) {
            window.location.href = target;
            return;
        }
        const overlay = document.createElement('div');
        overlay.style.cssText =
            'position:fixed;top:0;left:0;width:100%;height:100%;' +
            'background:#000;color:var(--text-primary, #00ff00);z-index:99999;' +
            'display:flex;justify-content:center;align-items:center;' +
            'font-family:\'Courier New\',monospace;font-size:20px;text-align:center;';
        overlay.textContent = '>> CLEARANCE OMEGA ACCEPTED — RETRIEVING FILE...';
        document.body.appendChild(overlay);
        setTimeout(() => { window.location.href = target; }, 1200);
    }

    document.addEventListener('keydown', function(e) {
        konamiProgress = (e.code === KONAMI[konamiProgress]) ? konamiProgress + 1
            : (e.code === KONAMI[0] ? 1 : 0);
        if (konamiProgress === KONAMI.length) {
            konamiProgress = 0;
            omegaUnlock();
        }
    });

    // Console easter egg
    console.log(`
    ╔══════════════════════════════════════╗
    ║     CURSED INVESTIGATIONS BUREAU     ║
    ║                                      ║
    ║  You've found the developer console! ║
    ║  Are you one of us? Contact us at:   ║
    ║  investigate@cursed.gov              ║
    ║                                      ║
    ║  Warning: You are being monitored    ║
    ╚══════════════════════════════════════╝
    `);
});