// Evidence Vault Interactive Functions - 1998 Style
// Handles evidence gallery navigation and special effects

document.addEventListener('DOMContentLoaded', function() {
    
    // Initialize evidence vault functionality
    initializeEvidenceGallery();
    addEvidenceEffects();
    setupCategoryNavigation();
    
    // Initialize evidence gallery with interactive features
    function initializeEvidenceGallery() {
        const evidenceItems = document.querySelectorAll('.evidence-item');
        
        evidenceItems.forEach((item, index) => {
            // Stagger loading animation
            item.style.opacity = '0';
            item.style.transform = 'translateY(20px)';
            
            setTimeout(() => {
                item.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
                item.style.opacity = '1';
                item.style.transform = 'translateY(0)';
            }, index * 150);
            
            // Add click handler for evidence viewing
            item.addEventListener('click', () => {
                showEvidenceDetail(item);
            });
            
            // Add hover effects
            item.addEventListener('mouseenter', () => {
                item.style.borderColor = 'var(--text-accent)';
                item.style.boxShadow = '0 0 10px rgba(0, 255, 0, 0.2)';
                
                // Add scanning effect to evidence ID
                const evidenceId = item.querySelector('.evidence-id');
                if (evidenceId) {
                    evidenceId.style.color = 'var(--text-warning)';
                    evidenceId.style.animation = 'pulse 2s infinite';
                }
            });
            
            item.addEventListener('mouseleave', () => {
                item.style.borderColor = 'var(--border-primary)';
                item.style.boxShadow = 'none';
                
                const evidenceId = item.querySelector('.evidence-id');
                if (evidenceId) {
                    evidenceId.style.color = 'var(--text-accent)';
                    evidenceId.style.animation = 'none';
                }
            });
        });
    }
    
    // Add special retro effects
    function addEvidenceEffects() {
        // Periodic "scanning" effect
        setInterval(() => {
            if (Math.random() < 0.15) { // 15% chance every 20 seconds
                createScanningEffect();
            }
        }, 20000);
        
        // Random "classification update" effects
        setInterval(() => {
            if (Math.random() < 0.1) { // 10% chance
                updateRandomClassification();
            }
        }, 30000);
        
        // Add terminal-style cursor to image placeholders
        addTerminalCursors();
    }
    
    // Create scanning effect across evidence items
    function createScanningEffect() {
        const scanner = document.createElement('div');
        scanner.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 3px;
            background: linear-gradient(90deg, 
                transparent, 
                var(--text-warning) 30%, 
                var(--text-accent) 50%, 
                var(--text-warning) 70%, 
                transparent);
            z-index: 200;
            animation: evidenceScan 3s linear;
            box-shadow: 0 0 10px var(--text-warning);
        `;
        
        // Add scanning animation if not exists
        if (!document.head.querySelector('style[data-evidence]')) {
            const style = document.createElement('style');
            style.setAttribute('data-evidence', 'true');
            style.textContent = `
                @keyframes evidenceScan {
                    0% { transform: translateY(0); opacity: 0; }
                    10% { opacity: 1; }
                    90% { opacity: 1; }
                    100% { transform: translateY(100vh); opacity: 0; }
                }
                @keyframes pulse {
                    0%, 100% { opacity: 1; }
                    50% { opacity: 0.5; }
                }
                @keyframes classificationBlink {
                    0%, 50% { color: var(--text-warning); }
                    51%, 100% { color: var(--text-accent); }
                }
                @keyframes terminalCursor {
                    0%, 50% { opacity: 1; }
                    51%, 100% { opacity: 0; }
                }
            `;
            document.head.appendChild(style);
        }
        
        document.body.appendChild(scanner);
        
        // Add temporary glow to evidence items as scanner passes
        setTimeout(() => {
            const evidenceItems = document.querySelectorAll('.evidence-item');
            evidenceItems.forEach((item, index) => {
                setTimeout(() => {
                    item.style.borderColor = 'var(--text-warning)';
                    item.style.boxShadow = '0 0 15px rgba(255, 255, 0, 0.3)';
                    
                    setTimeout(() => {
                        item.style.borderColor = 'var(--border-primary)';
                        item.style.boxShadow = 'none';
                    }, 200);
                }, index * 100);
            });
        }, 1500);
        
        setTimeout(() => {
            if (scanner.parentNode) {
                scanner.parentNode.removeChild(scanner);
            }
        }, 3000);
    }
    
    // Update random classification for dramatic effect
    function updateRandomClassification() {
        const classifications = document.querySelectorAll('.evidence-classification');
        const randomClassification = classifications[Math.floor(Math.random() * classifications.length)];
        
        if (randomClassification) {
            randomClassification.style.animation = 'classificationBlink 2s infinite';
            
            setTimeout(() => {
                randomClassification.style.animation = 'none';
            }, 4000);
        }
    }
    
    // Add terminal-style cursors to image placeholders
    function addTerminalCursors() {
        const imageMocks = document.querySelectorAll('.image-mock');
        
        imageMocks.forEach(mock => {
            const cursor = document.createElement('span');
            cursor.textContent = '_';
            cursor.style.cssText = `
                animation: terminalCursor 1s infinite;
                color: var(--text-accent);
                font-weight: bold;
            `;
            mock.appendChild(cursor);
        });
    }
    
    // Setup category navigation
    function setupCategoryNavigation() {
        const evidenceTabs = document.querySelectorAll('.evidence-tab');
        
        evidenceTabs.forEach(tab => {
            tab.addEventListener('click', (e) => {
                e.preventDefault();
                
                const targetId = tab.getAttribute('href').substring(1);
                const targetSection = document.getElementById(targetId);
                
                if (targetSection) {
                    // Smooth scroll to section
                    targetSection.scrollIntoView({ 
                        behavior: 'smooth',
                        block: 'start'
                    });
                    
                    // Add visual feedback
                    tab.style.color = 'var(--text-warning)';
                    tab.style.textShadow = '0 0 5px var(--text-warning)';
                    
                    // Reset other tabs
                    evidenceTabs.forEach(otherTab => {
                        if (otherTab !== tab) {
                            otherTab.style.color = 'var(--text-accent)';
                            otherTab.style.textShadow = 'none';
                        }
                    });
                    
                    // Reset tab color after delay
                    setTimeout(() => {
                        tab.style.color = 'var(--text-accent)';
                        tab.style.textShadow = 'none';
                    }, 3000);
                }
            });
        });
    }
    
    // Show detailed evidence view
    function showEvidenceDetail(evidenceItem) {
        const evidenceId = evidenceItem.querySelector('.evidence-id').textContent;
        const classification = evidenceItem.querySelector('.evidence-classification').textContent;
        const date = evidenceItem.querySelector('.evidence-date').textContent;
        const description = evidenceItem.querySelector('.evidence-description').innerHTML;
        const imageDetails = evidenceItem.querySelector('.image-details').innerHTML;
        
        // Create detail overlay
        const overlay = document.createElement('div');
        overlay.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.9);
            z-index: 9999;
            display: flex;
            justify-content: center;
            align-items: center;
            animation: fadeIn 0.3s ease;
        `;
        
        const detailBox = document.createElement('div');
        detailBox.style.cssText = `
            background: var(--bg-box);
            border: 3px outset var(--border-bright);
            padding: 30px;
            max-width: 700px;
            max-height: 80vh;
            overflow-y: auto;
            color: var(--text-primary);
            font-family: var(--font-retro);
            box-shadow: 4px 4px 8px rgba(0, 0, 0, 0.5);
        `;
        
        detailBox.innerHTML = `
            <div style="text-align: center; margin-bottom: 20px;">
                <div style="color: var(--text-warning); font-weight: bold; font-size: 16px;">
                    *** EVIDENCE DETAIL VIEW ***
                </div>
                <div style="color: var(--text-accent); margin: 10px 0;">
                    ${evidenceId} - ${classification}
                </div>
                <div style="color: var(--text-dim); font-size: 12px;">
                    Date: ${date}
                </div>
            </div>
            
            <div style="border: 2px inset var(--border-bright); padding: 20px; margin: 20px 0; background: var(--bg-primary); text-align: center;">
                <div style="color: var(--text-accent); font-size: 14px; margin-bottom: 10px;">
                    [CLASSIFIED IMAGE DATA]
                </div>
                <div style="color: var(--text-dim); font-size: 11px; line-height: 1.4;">
                    ${imageDetails}
                </div>
                <div style="margin-top: 15px; color: var(--text-warning); font-size: 10px;">
                    ⚠ VIEWING REQUIRES CLEARANCE LEVEL 3 OR HIGHER ⚠
                </div>
            </div>
            
            <div style="margin: 20px 0;">
                <div style="color: var(--text-accent); font-weight: bold; margin-bottom: 10px;">
                    DETAILED ANALYSIS:
                </div>
                <div style="line-height: 1.4; font-size: 12px;">
                    ${description}
                </div>
            </div>
            
            <div style="text-align: center; margin-top: 30px;">
                <button id="closeEvidenceDetail" style="
                    padding: 10px 25px;
                    border: 2px outset var(--border-bright);
                    background: var(--bg-secondary);
                    color: var(--text-primary);
                    cursor: pointer;
                    font-family: var(--font-retro);
                    font-size: 12px;
                ">CLOSE EVIDENCE VIEW</button>
            </div>
        `;
        
        overlay.appendChild(detailBox);
        document.body.appendChild(overlay);
        
        // Add fade-in animation
        if (!document.head.querySelector('style[data-evidence-detail]')) {
            const style = document.createElement('style');
            style.setAttribute('data-evidence-detail', 'true');
            style.textContent = `
                @keyframes fadeIn {
                    from { opacity: 0; }
                    to { opacity: 1; }
                }
            `;
            document.head.appendChild(style);
        }
        
        // Close button handler
        document.getElementById('closeEvidenceDetail').addEventListener('click', () => {
            document.body.removeChild(overlay);
        });
        
        // Close on overlay click
        overlay.addEventListener('click', (e) => {
            if (e.target === overlay) {
                document.body.removeChild(overlay);
            }
        });
        
        // Close on escape key
        const escapeHandler = (e) => {
            if (e.key === 'Escape') {
                document.body.removeChild(overlay);
                document.removeEventListener('keydown', escapeHandler);
            }
        };
        document.addEventListener('keydown', escapeHandler);
    }
    
    // Add "data corruption" effect occasionally
    setInterval(() => {
        if (Math.random() < 0.05) { // 5% chance every 25 seconds
            const textElements = document.querySelectorAll('.evidence-description, .image-details');
            const randomElement = textElements[Math.floor(Math.random() * textElements.length)];
            
            if (randomElement) {
                const originalText = randomElement.textContent;
                const corruptedText = addDataCorruption(originalText);
                
                randomElement.textContent = corruptedText;
                randomElement.style.color = 'var(--text-warning)';
                
                setTimeout(() => {
                    randomElement.textContent = originalText;
                    randomElement.style.color = 'var(--text-primary)';
                }, 2000);
            }
        }
    }, 25000);
    
    // Add random data corruption to text
    function addDataCorruption(text) {
        const chars = '!@#$%^&*()_+-=[]{}|;:,.<>?';
        let corrupted = text;
        
        // Randomly replace 2-3 characters
        for (let i = 0; i < Math.min(3, text.length); i++) {
            const randomIndex = Math.floor(Math.random() * text.length);
            const randomChar = chars[Math.floor(Math.random() * chars.length)];
            corrupted = corrupted.substring(0, randomIndex) + randomChar + corrupted.substring(randomIndex + 1);
        }
        
        return corrupted;
    }
    
    // Initialize access log
    console.log(`
    ╔══════════════════════════════════════╗
    ║        EVIDENCE VAULT ACCESS         ║
    ║                                      ║
    ║  Session ID: EV-${Date.now().toString().slice(-6)}        ║
    ║  Access Level: RESTRICTED            ║
    ║  Time: ${new Date().toLocaleTimeString()}                ║
    ║                                      ║
    ║  WARNING: All activities monitored   ║
    ╚══════════════════════════════════════╝
    `);
}); 