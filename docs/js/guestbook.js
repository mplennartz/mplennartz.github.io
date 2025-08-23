// Guestbook Interactive Functions - 1998 Style
// Handles form submission and visitor message display

document.addEventListener('DOMContentLoaded', function() {
    
    // Initialize guestbook functionality
    const guestbookForm = document.getElementById('guestbookForm');
    const guestbookEntries = document.getElementById('guestbookEntries');
    
    if (guestbookForm) {
        guestbookForm.addEventListener('submit', handleGuestbookSubmission);
    }
    
    // Handle guestbook form submission
    function handleGuestbookSubmission(event) {
        event.preventDefault();
        
        const formData = new FormData(guestbookForm);
        const name = formData.get('name') || 'Anonymous Visitor';
        const location = formData.get('location') || 'Unknown Location';
        const clearance = formData.get('clearance') || 'civilian';
        const message = formData.get('message') || '';
        
        if (message.trim() === '') {
            showRetroAlert('ERROR: Message field cannot be empty. Please share your experience.');
            return;
        }
        
        // Create new entry
        const newEntry = createGuestbookEntry(name, location, clearance, message);
        
        // Add to top of entries (most recent first)
        if (guestbookEntries && guestbookEntries.firstChild) {
            guestbookEntries.insertBefore(newEntry, guestbookEntries.firstChild);
        } else if (guestbookEntries) {
            guestbookEntries.appendChild(newEntry);
        }
        
        // Show success message
        showRetroAlert('MESSAGE TRANSMITTED SUCCESSFULLY\\n\\nYour entry has been logged and will be reviewed by our security team.\\n\\nThank you for contributing to our database.');
        
        // Clear form
        guestbookForm.reset();
        
        // Add blinking effect to new entry
        setTimeout(() => {
            newEntry.style.border = '2px solid var(--text-warning)';
            newEntry.style.animation = 'glow 2s ease-in-out 3';
        }, 100);
        
        // Scroll to show new entry
        newEntry.scrollIntoView({ behavior: 'smooth' });
    }
    
    // Create new guestbook entry element
    function createGuestbookEntry(name, location, clearance, message) {
        const entry = document.createElement('div');
        entry.className = 'guestbook-entry';
        
        // Get current date in 1998 format
        const now = new Date();
        const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 
                       'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
        const dateStr = `${months[now.getMonth()]} ${now.getDate()}, 1998 - ${
            now.getHours().toString().padStart(2, '0')}:${
            now.getMinutes().toString().padStart(2, '0')} ${now.getHours() >= 12 ? 'PM' : 'AM'}`;
        
        entry.innerHTML = `
            <div class="entry-header">
                <span class="entry-name">${escapeHtml(name)}</span>
                <span class="entry-location">${escapeHtml(location)}</span>
                <span class="entry-clearance ${clearance}">${clearance.toUpperCase()}</span>
                <span class="entry-date">${dateStr}</span>
            </div>
            <div class="entry-message">
                ${escapeHtml(message)}
            </div>
        `;
        
        return entry;
    }
    
    // Security function to escape HTML
    function escapeHtml(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }
    
    // Retro-style alert function
    function showRetroAlert(message) {
        // Create overlay
        const overlay = document.createElement('div');
        overlay.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.8);
            z-index: 9999;
            display: flex;
            justify-content: center;
            align-items: center;
        `;
        
        // Create alert box
        const alertBox = document.createElement('div');
        alertBox.style.cssText = `
            background: var(--bg-box);
            border: 3px outset var(--border-bright);
            padding: 20px;
            max-width: 400px;
            color: var(--text-primary);
            font-family: var(--font-retro);
            text-align: center;
            box-shadow: 4px 4px 8px rgba(0, 0, 0, 0.5);
        `;
        
        alertBox.innerHTML = `
            <div style="color: var(--text-warning); font-weight: bold; margin-bottom: 15px;">
                *** CURSED INVESTIGATIONS BUREAU ***
            </div>
            <div style="margin-bottom: 20px; white-space: pre-line;">
                ${message}
            </div>
            <button id="retroAlertOk" style="
                padding: 8px 20px;
                border: 2px outset var(--border-bright);
                background: var(--bg-secondary);
                color: var(--text-primary);
                cursor: pointer;
                font-family: var(--font-retro);
            ">OK</button>
        `;
        
        overlay.appendChild(alertBox);
        document.body.appendChild(overlay);
        
        // Handle OK button
        document.getElementById('retroAlertOk').addEventListener('click', () => {
            document.body.removeChild(overlay);
        });
        
        // Close on overlay click
        overlay.addEventListener('click', (e) => {
            if (e.target === overlay) {
                document.body.removeChild(overlay);
            }
        });
    }
    
    // Add retro effects to existing entries
    function addRetroEffectsToEntries() {
        const entries = document.querySelectorAll('.guestbook-entry');
        entries.forEach((entry, index) => {
            // Stagger entry appearance
            entry.style.opacity = '0';
            setTimeout(() => {
                entry.style.transition = 'opacity 0.5s ease-in';
                entry.style.opacity = '1';
            }, index * 200);
            
            // Add hover effects
            entry.addEventListener('mouseenter', () => {
                entry.style.backgroundColor = 'var(--bg-secondary)';
                entry.style.borderLeft = '4px solid var(--text-accent)';
            });
            
            entry.addEventListener('mouseleave', () => {
                entry.style.backgroundColor = 'var(--bg-box)';
                entry.style.borderLeft = '1px solid var(--border-primary)';
            });
        });
    }
    
    // Initialize retro effects
    setTimeout(addRetroEffectsToEntries, 500);
    
    // Add periodic "scanning" effect
    setInterval(() => {
        if (Math.random() < 0.1) { // 10% chance every 15 seconds
            const scanner = document.createElement('div');
            scanner.style.cssText = `
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 2px;
                background: linear-gradient(90deg, transparent, var(--text-warning), transparent);
                z-index: 100;
                animation: scan 2s linear;
            `;
            
            // Add scanning animation
            const style = document.createElement('style');
            style.textContent = `
                @keyframes scan {
                    0% { transform: translateY(0); }
                    100% { transform: translateY(100vh); }
                }
                @keyframes glow {
                    0%, 100% { box-shadow: none; }
                    50% { box-shadow: 0 0 10px var(--text-warning); }
                }
            `;
            if (!document.head.querySelector('style[data-guestbook]')) {
                style.setAttribute('data-guestbook', 'true');
                document.head.appendChild(style);
            }
            
            document.body.appendChild(scanner);
            setTimeout(() => {
                if (scanner.parentNode) {
                    scanner.parentNode.removeChild(scanner);
                }
            }, 2000);
        }
    }, 15000);
}); 