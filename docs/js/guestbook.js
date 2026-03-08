// Guestbook - Firebase Realtime Database Integration

document.addEventListener('DOMContentLoaded', function() {

    firebase.initializeApp(FIREBASE_CONFIG);

    var db = firebase.database();
    var guestbookRef = db.ref('guestbook');

    var guestbookForm = document.getElementById('guestbookForm');
    var firebaseEntries = document.getElementById('firebaseEntries');
    var submitButton = guestbookForm ? guestbookForm.querySelector('.submit-button') : null;

    var lastSubmitTime = 0;
    var COOLDOWN_MS = 30000;
    var VALID_CLEARANCES = ['civilian', 'informant', 'investigator', 'classified'];

    // ── Load entries from Firebase ──

    if (firebaseEntries) {
        guestbookRef.orderByChild('timestamp').limitToLast(10).on('value', function(snapshot) {
            firebaseEntries.innerHTML = '';

            if (!snapshot.exists()) {
                var msg = document.createElement('p');
                msg.className = 'terminal-font';
                msg.style.cssText = 'text-align: center; color: var(--text-secondary);';
                msg.textContent = 'NO TRANSMISSIONS ON RECORD \u2014 BE THE FIRST TO REPORT';
                firebaseEntries.appendChild(msg);
                return;
            }

            var entries = [];
            snapshot.forEach(function(child) {
                entries.push(child.val());
            });
            entries.reverse();

            entries.forEach(function(data) {
                firebaseEntries.appendChild(createEntryElement(data));
            });

            addRetroEffects(firebaseEntries);
        });
    }

    // ── Form submission ──

    if (guestbookForm) {
        guestbookForm.addEventListener('submit', function(event) {
            event.preventDefault();

            var formData = new FormData(guestbookForm);

            // Honeypot — bots fill hidden fields, humans don't
            if (formData.get('website_url')) {
                showRetroAlert('MESSAGE TRANSMITTED SUCCESSFULLY\n\nYour entry has been logged.');
                guestbookForm.reset();
                return;
            }

            var now = Date.now();
            if (now - lastSubmitTime < COOLDOWN_MS) {
                var remaining = Math.ceil((COOLDOWN_MS - (now - lastSubmitTime)) / 1000);
                showRetroAlert(
                    'TRANSMISSION COOLDOWN ACTIVE\n\n' +
                    'Please wait ' + remaining + ' seconds before submitting another message.\n\n' +
                    'Security protocols require a delay between transmissions.'
                );
                return;
            }

            var name = (formData.get('name') || '').trim() || 'Anonymous Visitor';
            var location = (formData.get('location') || '').trim() || 'Unknown Location';
            var clearance = formData.get('clearance') || 'civilian';
            var message = (formData.get('message') || '').trim();

            if (!message) {
                showRetroAlert('ERROR: Message field cannot be empty.\n\nPlease share your experience.');
                return;
            }

            if (submitButton) submitButton.disabled = true;

            var realNow = new Date();
            var dayOfMonth = realNow.getDate();
            var hr = realNow.getHours();
            var totalMin = Math.floor(((dayOfMonth * 24 + hr) / (32 * 24)) * 1440);
            var gh = Math.floor(totalMin / 60);
            var gm = totalMin % 60;
            var gap = gh >= 12 ? 'PM' : 'AM';
            var gdh = gh % 12 || 12;
            var gd = SITE_CONFIG.GAME_DATE;
            var gameDate = gd.month + ' ' + String(gd.day).padStart(2, '0') + ', ' + gd.year +
                ' - ' + gdh + ':' + String(gm).padStart(2, '0') + ' ' + gap;

            guestbookRef.push({
                name: name,
                location: location,
                clearance: clearance,
                message: message,
                timestamp: firebase.database.ServerValue.TIMESTAMP,
                gameDate: gameDate
            }).then(function() {
                lastSubmitTime = Date.now();
                showRetroAlert(
                    'MESSAGE TRANSMITTED SUCCESSFULLY\n\n' +
                    'Your entry has been logged and will be reviewed by our security team.\n\n' +
                    'Thank you for contributing to our database.'
                );
                guestbookForm.reset();
                if (submitButton) submitButton.disabled = false;
            }).catch(function(error) {
                console.error('Guestbook write failed:', error);
                showRetroAlert(
                    'TRANSMISSION ERROR\n\n' +
                    'Failed to submit message. Please try again.\n\n' +
                    'Error code: ' + (error.code || 'UNKNOWN')
                );
                if (submitButton) submitButton.disabled = false;
            });
        });
    }

    // ── DOM helpers ──

    function createEntryElement(data) {
        var entry = document.createElement('div');
        entry.className = 'guestbook-entry';

        var dateStr;
        if (data.gameDate) {
            dateStr = data.gameDate;
        } else {
            var realDate = new Date(data.timestamp);
            var dayOfMonth = realDate.getDate();
            var hour = realDate.getHours();
            var totalMinutes = Math.floor(((dayOfMonth * 24 + hour) / (32 * 24)) * 1440);
            var h = Math.floor(totalMinutes / 60);
            var m = totalMinutes % 60;
            var ampm = h >= 12 ? 'PM' : 'AM';
            var dh = h % 12 || 12;
            var gd = SITE_CONFIG.GAME_DATE;
            dateStr = gd.month + ' ' + gd.day + ', ' + gd.year + ' - ' +
                dh + ':' + m.toString().padStart(2, '0') + ' ' + ampm;
        }

        var safeClearance = VALID_CLEARANCES.indexOf(data.clearance) !== -1
            ? data.clearance : 'civilian';

        entry.innerHTML =
            '<div class="entry-header">' +
                '<span class="entry-name">' + escapeHtml(data.name) + '</span>' +
                '<span class="entry-location">' + escapeHtml(data.location) + '</span>' +
                '<span class="entry-clearance ' + safeClearance + '">' + safeClearance.toUpperCase() + '</span>' +
                '<span class="entry-date">' + dateStr + '</span>' +
            '</div>' +
            '<div class="entry-message">' +
                escapeHtml(data.message) +
            '</div>';

        return entry;
    }

    function escapeHtml(text) {
        var div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }

    // ── Retro alert dialog ──

    function showRetroAlert(message) {
        var overlay = document.createElement('div');
        overlay.style.cssText =
            'position:fixed;top:0;left:0;width:100%;height:100%;' +
            'background:rgba(0,0,0,0.8);z-index:9999;' +
            'display:flex;justify-content:center;align-items:center;';

        var box = document.createElement('div');
        box.style.cssText =
            'background:var(--bg-box);border:3px outset var(--border-bright);' +
            'padding:20px;max-width:400px;color:var(--text-primary);' +
            'font-family:var(--font-retro);text-align:center;' +
            'box-shadow:4px 4px 8px rgba(0,0,0,0.5);';

        box.innerHTML =
            '<div style="color:var(--text-warning);font-weight:bold;margin-bottom:15px;">' +
                '*** CURSED INVESTIGATIONS BUREAU ***' +
            '</div>' +
            '<div style="margin-bottom:20px;white-space:pre-line;">' + message + '</div>' +
            '<button id="retroAlertOk" style="' +
                'padding:8px 20px;border:2px outset var(--border-bright);' +
                'background:var(--bg-secondary);color:var(--text-primary);' +
                'cursor:pointer;font-family:var(--font-retro);">OK</button>';

        overlay.appendChild(box);
        document.body.appendChild(overlay);

        document.getElementById('retroAlertOk').addEventListener('click', function() {
            document.body.removeChild(overlay);
        });
        overlay.addEventListener('click', function(e) {
            if (e.target === overlay) document.body.removeChild(overlay);
        });
    }

    // ── Retro visual effects ──

    function addRetroEffects(container) {
        var entries = container.querySelectorAll('.guestbook-entry');
        entries.forEach(function(entry, i) {
            entry.style.opacity = '0';
            setTimeout(function() {
                entry.style.transition = 'opacity 0.5s ease-in';
                entry.style.opacity = '1';
            }, i * 200);

            entry.addEventListener('mouseenter', function() {
                entry.style.backgroundColor = 'var(--bg-secondary)';
                entry.style.borderLeft = '4px solid var(--text-accent)';
            });
            entry.addEventListener('mouseleave', function() {
                entry.style.backgroundColor = 'var(--bg-box)';
                entry.style.borderLeft = '1px solid var(--border-primary)';
            });
        });
    }

    // Effects for the hardcoded archived entries
    setTimeout(function() {
        var archived = document.getElementById('guestbookEntries');
        if (archived) addRetroEffects(archived);
    }, 500);

    // Periodic scan-line effect
    var guestbookStyle = document.createElement('style');
    guestbookStyle.textContent =
        '@keyframes scan{0%{transform:translateY(0)}100%{transform:translateY(100vh)}}' +
        '@keyframes glow{0%,100%{box-shadow:none}50%{box-shadow:0 0 10px var(--text-warning)}}';
    document.head.appendChild(guestbookStyle);

    setInterval(function() {
        if (Math.random() < 0.1) {
            var scanner = document.createElement('div');
            scanner.style.cssText =
                'position:fixed;top:0;left:0;width:100%;height:2px;' +
                'background:linear-gradient(90deg,transparent,var(--text-warning),transparent);' +
                'z-index:100;animation:scan 2s linear;';
            document.body.appendChild(scanner);
            setTimeout(function() {
                if (scanner.parentNode) scanner.parentNode.removeChild(scanner);
            }, 2000);
        }
    }, 15000);
});
