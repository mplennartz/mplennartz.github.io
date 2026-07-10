document.addEventListener('DOMContentLoaded', function() {
    const decryptBtn = document.getElementById('decryptBtn');
    const classifiedContent = document.getElementById('classifiedContent');
    const decryptedContent = document.getElementById('decryptedContent');
    const decryptionOverlay = document.getElementById('decryptionOverlay');
    const decryptionBar = document.getElementById('decryptionBar');
    const decryptionStatus = document.getElementById('decryptionStatus');
    const classifiedName = document.getElementById('classifiedName');
    const decryptedName = document.getElementById('decryptedName');

    let isDecrypted = false;

    decryptBtn.addEventListener('click', function() {
        if (isDecrypted) {
            classifiedContent.style.display = 'block';
            decryptedContent.style.display = 'none';
            classifiedName.style.display = 'inline';
            decryptedName.style.display = 'none';
            decryptBtn.textContent = '🔓 DECRYPT CLASSIFIED FILE';
            isDecrypted = false;
        } else {
            startDecryption();
        }
    });

    function startDecryption() {
        decryptBtn.disabled = true;
        decryptionOverlay.style.display = 'flex';

        const statuses = [
            'INITIALIZING DECRYPTION SEQUENCE...',
            'BYPASSING SECURITY PROTOCOLS...',
            'DECRYPTING CLASSIFIED DATA...',
            'VERIFYING CLEARANCE LEVELS...',
            'ACCESSING RESTRICTED FILES...',
            'DECRYPTION COMPLETE...'
        ];

        let currentStep = 0;
        const totalSteps = statuses.length - 1;

        const interval = setInterval(() => {
            if (currentStep <= totalSteps) {
                const progress = (currentStep / totalSteps) * 100;
                decryptionBar.style.width = progress + '%';
                decryptionStatus.textContent = statuses[currentStep];
                currentStep++;
            } else {
                clearInterval(interval);

                setTimeout(() => {
                    decryptionOverlay.style.display = 'none';
                    classifiedContent.style.display = 'none';
                    decryptedContent.style.display = 'block';
                    classifiedName.style.display = 'none';
                    decryptedName.style.display = 'inline';
                    decryptBtn.textContent = '🔒 RE-ENCRYPT FILE';
                    decryptBtn.disabled = false;
                    isDecrypted = true;
                }, 1000);
            }
        }, 800);
    }
});
