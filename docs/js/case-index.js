// Case index — single source of truth for the random-case button,
// the case-file search on stories.html, and the timeline page.
// URLs are root-relative; entries are keyed by URL (case numbers are
// not unique — CIB-023 appears twice in the archive).
// Optional era/localDate fields mark entries that happened outside the
// Bureau's present (Displacement Logs); dateSort stays the receipt date.

var CIB_INDEX = {
    cases: [
        { url: 'stories/conspiracy-files/bermuda-wifi.html', title: 'Bermuda Triangle WiFi Dead Zone', caseNumber: 'CIB-051', category: 'Government Cover-ups', dateSort: '1998-08-15', dateDisplay: '08/15/98', danger: 'MEDIUM THREAT', status: 'CLASSIFIED' },
        { url: 'stories/cryptid-sightings/coffee-shop-encounter.html', title: 'Cryptid Coffee Shop Encounter', caseNumber: 'CIB-055', category: 'Cryptid Evidence', dateSort: '1998-09-03', dateDisplay: '09/03/98', danger: 'LOW THREAT', status: 'MONITORING' },
        { url: 'stories/cryptid-sightings/nessie-webcam.html', title: "Nessie's Webcam Appearance", caseNumber: 'CIB-031', category: 'Cryptid Evidence', dateSort: '1998-09-12', dateDisplay: '09/12/98', danger: 'MEDIUM THREAT', status: 'CLOSED' },
        { url: 'stories/ghost-stories/wifi-dead-zone.html', title: 'The WiFi Dead Zone Incident', caseNumber: 'CIB-007', category: 'Spectral Encounters', dateSort: '1998-10-15', dateDisplay: '10/15/98', danger: 'LOW THREAT', status: 'MONITORING' },
        { url: 'stories/conspiracy-files/usb-conspiracy.html', title: 'The USB Drive Conspiracy', caseNumber: 'CIB-042', category: 'Government Cover-ups', dateSort: '1998-10-20', dateDisplay: '10/20/98', danger: 'HIGH THREAT', status: 'ACTIVE' },
        { url: 'stories/cryptid-sightings/bigfoot-digital.html', title: "Bigfoot's Digital Footprint", caseNumber: 'CIB-023', category: 'Cryptid Evidence', dateSort: '1998-10-25', dateDisplay: '10/25/98', danger: 'HIGH THREAT', status: 'CLOSED' },
        { url: 'stories/ghost-stories/server-room-phantom.html', title: 'The Phantom of Server Room B', caseNumber: 'CIB-001', category: 'Spectral Encounters', dateSort: '1998-10-28', dateDisplay: '10/28/98', danger: 'MEDIUM THREAT', status: 'CLOSED' },
        { url: 'stories/cryptid-sightings/mothman-social.html', title: "Mothman's Social Media Presence", caseNumber: 'CIB-088', category: 'Cryptid Evidence', dateSort: '1998-10-31', dateDisplay: '10/31/98', danger: 'HIGH THREAT', status: 'ACTIVE' },
        { url: 'stories/ghost-stories/vanishing-forum-post.html', title: 'The Vanishing Forum Post', caseNumber: 'CIB-063', category: 'Spectral Encounters', dateSort: '1998-11-12', dateDisplay: '11/12/98', danger: 'MEDIUM THREAT', status: 'UNRESOLVED' },
        { url: 'stories/cryptid-sightings/wild-at-heart.html', title: 'Wild at Heart', caseNumber: 'CIB-089', category: 'Cryptid Evidence', dateSort: '1998-12-12', dateDisplay: '12/12/98', danger: 'RESOLVED', status: 'CLOSED' },
        { url: 'stories/ghost-stories/tales-from-the-trailer-park.html', title: 'Tales from the Trailer Park', caseNumber: 'CIB-008', category: 'Spectral Encounters', dateSort: '1998-12-15', dateDisplay: '12/15/98', danger: 'RESOLVED', status: 'CLOSED' },
        { url: 'stories/ghost-stories/false-light.html', title: 'False Light', caseNumber: 'CIB-015', category: 'Spectral Encounters', dateSort: '1999-01-18', dateDisplay: '01/18/99', danger: 'CRITICAL THREAT', status: 'CLOSED' },
        { url: 'stories/ghost-stories/whispers-at-stillwater.html', title: 'Whispers at Stillwater', caseNumber: 'CIB-023', category: 'Spectral Encounters', dateSort: '1999-03-15', dateDisplay: '03/15/99', danger: 'MEDIUM THREAT', status: 'CLOSED' },
        { url: 'stories/conspiracy-files/deep-freeze.html', title: 'Deep Freeze', caseNumber: 'CIB-217', category: 'Government Cover-ups', dateSort: '1999-03-25', dateDisplay: '03/25/99', danger: 'CRITICAL THREAT', status: 'CLOSED - COMPROMISED' },
        { url: 'stories/conspiracy-files/circuit-breaker.html', title: 'Circuit Breaker', caseNumber: 'CIB-224', category: 'Government Cover-ups', dateSort: '1999-03-30', dateDisplay: '03/30/99', danger: 'HIGH THREAT', status: 'RESOLVED - AI ISOLATED' },
        { url: 'stories/ghost-stories/bloodlines.html', title: 'Bloodlines', caseNumber: 'CIB-308', category: 'Spectral Encounters', dateSort: '1999-04-05', dateDisplay: '04/05/99', danger: 'HIGH THREAT', status: 'CLOSED - FEDERAL CUSTODY' },
        { url: 'stories/active-leads/clockwork-horizon.html', title: 'Clockwork Horizon', caseNumber: 'CIB-225', category: 'Active Leads', dateSort: '1999-04-21', dateDisplay: '04/21/99', danger: 'HIGH THREAT', status: 'ACTIVE - TEAM UNREACHABLE' },
        // Displacement Logs: dateSort = Bureau receipt date; era/localDate = where the team actually was
        { url: 'stories/displacement-logs/before-chicxulub.html', title: 'Before Chicxulub', caseNumber: 'TX-225-001–003', category: 'Displacement Logs', dateSort: '1999-04-22', dateDisplay: '04/22/99', danger: 'HIGH THREAT', status: 'TRANSITIONED', era: 'Late Cretaceous', localDate: '~66,000,000 BC' },
        { url: 'stories/displacement-logs/buried.html', title: 'Buried', caseNumber: 'TX-225-004–005', category: 'Displacement Logs', dateSort: '1999-04-22', dateDisplay: '04/22/99', danger: 'HIGH THREAT', status: 'TRANSITIONED - PACKET LOST', era: 'Middle Kingdom Egypt', localDate: 'c. 2055–1650 BC' },
        { url: 'stories/displacement-logs/a-cup-of-friendship.html', title: 'A Cup of Friendship', caseNumber: 'TX-225-006', category: 'Displacement Logs', dateSort: '1999-04-22', dateDisplay: '04/22/99', danger: 'HIGH THREAT', status: 'ACTIVE', era: 'Imperial Rome', localDate: '29 Dec 192 CE' }
    ],
    lore: [
        { url: 'lore/breathing-ground-entity.html', title: 'Breathing Ground Fungal Intelligence', caseNumber: 'LORE-ENT-015', dateSort: '1999-01-18', dateDisplay: '01/18/99', status: 'DORMANT / UNKNOWN' },
        { url: 'lore/sifu-loyalty-protocol.html', title: 'SIFU Loyalty Stress-Test Protocol', caseNumber: 'LORE-PRO-217', dateSort: '1999-03-25', dateDisplay: '03/25/99', status: 'CONFIRMED ACTIVE' },
        { url: 'lore/whitlock-lineage.html', title: 'The Whitlock Continuity Pattern', caseNumber: 'LORE-MYS-308', dateSort: '1999-04-05', dateDisplay: '04/05/99', status: 'CLOSED' },
        { url: 'lore/nexstep-displacement-event.html', title: 'NeXstep Displacement Event', caseNumber: 'LORE-MYS-225', dateSort: '1999-04-22', dateDisplay: '04/22/99', status: 'ACTIVE' },
        { url: 'lore/k-vance-identity-shell.html', title: 'K. Vance Identity Shell', caseNumber: 'LORE-PRO-225', dateSort: '1999-04-22', dateDisplay: '04/22/99', status: 'ACTIVE' },
        { url: 'lore/resonance-anchors.html', title: 'Resonance Anchors', caseNumber: 'LORE-MYS-226', dateSort: '1999-04-22', dateDisplay: '04/22/99', status: 'ACTIVE' },
        { url: 'lore/telemetry-field-unit.html', title: 'Bureau Field Telemetry Unit (Class T)', caseNumber: 'LORE-ART-225', dateSort: '1999-04-22', dateDisplay: '04/22/99', status: 'WITH DISPLACED TEAM' }
    ]
};

document.addEventListener('DOMContentLoaded', function() {

    // Derive path prefix back to site root from the nav (same trick as
    // ensureGlobalNavLinks in retro-effects.js); root pages get ''.
    function basePrefix() {
        var storiesLink = document.querySelector('.nav-links a[href$="stories.html"]');
        if (!storiesLink) return '';
        var href = storiesLink.getAttribute('href') || '';
        return href.slice(0, href.length - 'stories.html'.length);
    }
    var prefix = basePrefix();

    // ── RANDOM CASE FILE ──
    document.querySelectorAll('[data-random-case]').forEach(function(el) {
        el.addEventListener('click', function(event) {
            event.preventDefault();
            var pick = CIB_INDEX.cases[Math.floor(Math.random() * CIB_INDEX.cases.length)];
            window.location.href = prefix + pick.url;
        });
    });

    // ── Case-file search (stories.html) ──
    var searchInput = document.getElementById('case-search');
    if (searchInput) {
        var noResults = document.getElementById('case-search-empty');
        searchInput.addEventListener('input', function() {
            var q = searchInput.value.trim().toLowerCase();
            var anyVisible = false;
            document.querySelectorAll('.story-category').forEach(function(category) {
                var visibleInCategory = 0;
                category.querySelectorAll('.story-card').forEach(function(card) {
                    var match = !q || card.textContent.toLowerCase().indexOf(q) !== -1;
                    card.style.display = match ? '' : 'none';
                    if (match) visibleInCategory++;
                });
                category.style.display = visibleInCategory ? '' : 'none';
                if (visibleInCategory) anyVisible = true;
            });
            if (noResults) noResults.style.display = anyVisible ? 'none' : 'block';
        });
    }

    // ── Timeline (timeline.html) ──
    var timelineRoot = document.getElementById('timeline-root');
    if (timelineRoot) {
        var entries = [];
        CIB_INDEX.cases.forEach(function(c) { entries.push({ kind: 'CASE', data: c }); });
        CIB_INDEX.lore.forEach(function(l) { entries.push({ kind: 'LORE', data: l }); });
        entries.sort(function(a, b) {
            return a.data.dateSort < b.data.dateSort ? -1 :
                   a.data.dateSort > b.data.dateSort ? 1 : 0;
        });

        var MONTHS = { '01': 'JANUARY', '02': 'FEBRUARY', '03': 'MARCH', '04': 'APRIL',
                       '05': 'MAY', '06': 'JUNE', '07': 'JULY', '08': 'AUGUST',
                       '09': 'SEPTEMBER', '10': 'OCTOBER', '11': 'NOVEMBER', '12': 'DECEMBER' };
        var currentGroup = '';
        entries.forEach(function(entry) {
            var d = entry.data;
            var group = MONTHS[d.dateSort.slice(5, 7)] + ' ' + d.dateSort.slice(0, 4);
            if (group !== currentGroup) {
                currentGroup = group;
                var h = document.createElement('h3');
                h.className = 'timeline-month terminal-font';
                h.textContent = '── ' + group + ' ──';
                timelineRoot.appendChild(h);
            }
            var row = document.createElement('div');
            row.className = 'timeline-row';

            var date = document.createElement('span');
            date.className = 'timeline-date terminal-font';
            date.textContent = d.dateDisplay;

            var badge = document.createElement('span');
            badge.className = 'timeline-badge ' + (entry.kind === 'CASE' ? 'badge-case' : 'badge-lore');
            badge.textContent = entry.kind;

            var link = document.createElement('a');
            link.className = 'timeline-title';
            link.href = prefix + d.url;
            link.textContent = d.title;

            var meta = document.createElement('span');
            meta.className = 'timeline-meta';
            meta.textContent = d.caseNumber + (d.status ? ' — ' + d.status : '');
            if (d.era) meta.textContent += ' — ERA: ' + d.era.toUpperCase() + (d.localDate ? ' (' + d.localDate + ')' : '');

            row.appendChild(date);
            row.appendChild(badge);
            row.appendChild(link);
            row.appendChild(meta);
            timelineRoot.appendChild(row);
        });
    }
});
