// Site-wide configuration — update GAME_DATE when publishing new content
// GAME_DATE is the Bureau's present (1999). TEAM_ERA is where the displaced
// team was last heard from — bump it each session from the newest packet.
var SITE_CONFIG = {
    GAME_DATE: { year: 1999, month: 'Apr', day: 22 },
    TEAM_ERA: { label: 'LATE CRETACEOUS', localDate: '~66,000,000 BC', lastPacket: 'TX-225-001' }
};
