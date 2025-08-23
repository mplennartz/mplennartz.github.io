// Contact Form Interactive Functions - 1998 Style
// Handles secure form submission and email protection

document.addEventListener('DOMContentLoaded', function() {
    
    // Initialize contact form functionality
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', handleContactFormSubmission);
    }
    
    // Handle contact form submission
    function handleContactFormSubmission(event) {
        event.preventDefault();
        
        const formData = new FormData(contactForm);
        const name = formData.get('name');
        const email = formData.get('email');
        const security = formData.get('security');
        const incident = formData.get('incident');
        const location = formData.get('location');
        const date = formData.get('date');
        const urgency = formData.get('urgency');
        const message = formData.get('message');
        
        // Validate required fields
        if (!name || !email || !security || !incident || !location || !date || !urgency || !message) {
            showRetroAlert('TRANSMISSION ERROR', 'All fields are required for secure transmission.\\n\\nPlease complete all sections before submitting.');
            return;
        }
        
        // Validate email format
        if (!isValidEmail(email)) {
            showRetroAlert('EMAIL FORMAT ERROR', 'Invalid email address format detected.\\n\\nPlease enter a valid email address for response purposes.');
            return;
        }
        
        // Generate case number
        const caseNumber = generateCaseNumber();
        
        // Show processing animation
        showProcessingAnimation(() => {
            // Show success message with case number
            const successMessage = `SECURE TRANSMISSION SUCCESSFUL\\n\\n` +
                                 `Your report has been received and assigned case number: ${caseNumber}\\n\\n` +
                                 `Security Level: ${security.toUpperCase()}\\n` +
                                 `Incident Type: ${incident}\\n` +
                                 `Urgency: ${urgency.toUpperCase()}\\n\\n` +
                                 `A member of our investigative team will contact you within 24-72 hours.\\n\\n` +
                                 `REMEMBER: Trust no one. The truth is out there.`;
            
            showRetroAlert('TRANSMISSION COMPLETE', successMessage);
            
            // Clear form
            contactForm.reset();
        });
    }
    
    // Email validation function
    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }
    
    // Generate realistic case number
    function generateCaseNumber() {
        const prefix = 'CIB';
        const year = '98';
        const random = Math.floor(Math.random() * 9999).toString().padStart(4, '0');
        const suffix = String.fromCharCode(65 + Math.floor(Math.random() * 26)); // Random letter A-Z
        return `${prefix}-${year}-${random}${suffix}`;
    }
    
    // Show processing animation
    function showProcessingAnimation(callback) {
        const overlay = createOverlay();
        
        const processingBox = document.createElement('div');
        processingBox.style.cssText = `
            background: var(--bg-box);
            border: 3px inset var(--border-bright);
            padding: 30px;
            max-width: 400px;
            color: var(--text-primary);
            font-family: var(--font-terminal);
            text-align: center;
            box-shadow: 4px 4px 8px rgba(0, 0, 0, 0.5);
        `;
        
        processingBox.innerHTML = `
            <div style="color: var(--text-warning); font-weight: bold; margin-bottom: 20px;">
                *** SECURE TRANSMISSION IN PROGRESS ***
            </div>
            <div id="processingText" style="margin-bottom: 20px;">
                Encrypting message...
            </div>
            <div id="progressBar" style="
                width: 100%;
                height: 20px;
                border: 2px inset var(--border-bright);
                background: var(--bg-primary);
                position: relative;
                overflow: hidden;
            ">
                <div id="progressFill" style="
                    height: 100%;
                    background: linear-gradient(90deg, var(--text-accent), var(--text-warning));
                    width: 0%;
                    transition: width 0.3s ease;
                "></div>
            </div>
        `;
        
        overlay.appendChild(processingBox);
        document.body.appendChild(overlay);
        
        // Simulate processing steps
        const steps = [
            { text: 'Encrypting message...', progress: 20 },
            { text: 'Scanning for surveillance...', progress: 40 },
            { text: 'Verifying security clearance...', progress: 60 },
            { text: 'Routing through secure channels...', progress: 80 },
            { text: 'Transmission complete!', progress: 100 }
        ];
        
        let currentStep = 0;
        const stepInterval = setInterval(() => {
            if (currentStep < steps.length) {
                document.getElementById('processingText').textContent = steps[currentStep].text;
                document.getElementById('progressFill').style.width = steps[currentStep].progress + '%';
                currentStep++;
            } else {
                clearInterval(stepInterval);
                setTimeout(() => {
                    document.body.removeChild(overlay);
                    callback();
                }, 1000);
            }
        }, 800);
    }
    
    // Create overlay element
    function createOverlay() {
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
        return overlay;
    }
    
    // Enhanced retro-style alert function
    function showRetroAlert(title, message) {
        const overlay = createOverlay();
        
        const alertBox = document.createElement('div');
        alertBox.style.cssText = `
            background: var(--bg-box);
            border: 3px outset var(--border-bright);
            padding: 25px;
            max-width: 500px;
            color: var(--text-primary);
            font-family: var(--font-retro);
            text-align: center;
            box-shadow: 4px 4px 8px rgba(0, 0, 0, 0.5);
        `;
        
        alertBox.innerHTML = `
            <div style="color: var(--text-warning); font-weight: bold; margin-bottom: 15px; font-size: 14px;">
                *** ${title} ***
            </div>
            <div style="margin-bottom: 20px; white-space: pre-line; line-height: 1.4;">
                ${message}
            </div>
            <button id="retroAlertOk" style="
                padding: 8px 20px;
                border: 2px outset var(--border-bright);
                background: var(--bg-secondary);
                color: var(--text-primary);
                cursor: pointer;
                font-family: var(--font-retro);
                font-size: 12px;
            ">ACKNOWLEDGE</button>
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
        
        // Add typewriter effect to message
        const messageElement = alertBox.querySelector('div:nth-child(2)');
        const originalText = messageElement.textContent;
        messageElement.textContent = '';
        
        let i = 0;
        const typeWriter = setInterval(() => {
            messageElement.textContent = originalText.substring(0, i);
            i++;
            if (i > originalText.length) {
                clearInterval(typeWriter);
            }
        }, 30);
    }
    
    // Add form validation styling
    function addFormValidation() {
        const inputs = contactForm.querySelectorAll('input, select, textarea');
        
        inputs.forEach(input => {
            input.addEventListener('blur', () => {
                if (input.hasAttribute('required') && !input.value.trim()) {
                    input.style.borderColor = 'var(--text-warning)';
                    input.style.backgroundColor = 'rgba(255, 255, 0, 0.1)';
                } else {
                    input.style.borderColor = 'var(--border-primary)';
                    input.style.backgroundColor = 'var(--bg-input)';
                }
            });
            
            input.addEventListener('focus', () => {
                input.style.borderColor = 'var(--text-accent)';
            });
        });
    }
    
    // Initialize form validation
    if (contactForm) {
        addFormValidation();
    }
    
    // Add urgency level visual effects
    const urgencyRadios = document.querySelectorAll('input[name="urgency"]');
    urgencyRadios.forEach(radio => {
        radio.addEventListener('change', () => {
            const labels = document.querySelectorAll('label[for^="urgency-"]');
            labels.forEach(label => {
                label.style.color = 'var(--text-primary)';
                label.style.textShadow = 'none';
            });
            
            if (radio.checked) {
                const label = document.querySelector(`label[for="${radio.id}"]`);
                if (radio.value === 'critical') {
                    label.style.color = 'var(--text-warning)';
                    label.style.textShadow = '0 0 5px var(--text-warning)';
                    label.style.animation = 'blink 1s infinite';
                } else if (radio.value === 'high') {
                    label.style.color = 'var(--text-accent)';
                }
            }
        });
    });
}); 