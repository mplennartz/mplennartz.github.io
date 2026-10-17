# Time-Hopping Arc — Session Index

Source: `total` (raw dump, left untouched). Each session below is split into its own ref file with a draft **Displacement Log** header (packet ID, era, local date, etc.) followed by the session notes verbatim, then implementation notes (mechanics to omit, lore hooks, continuity flags).

All packets belong to parent case **CIB-225 (Clockwork Horizon)**, relayed by the Class T unit / chroniton detector.

| Packet | Working title | Adventure | Session | Era / local date | Ref file |
|---|---|---|---|---|---|
| TX-225-001 | First Light | Before Chicxulub (arrival) | 13 — 05/08/26 | Late Cretaceous, ~66 MYA | `../clockwork-horizon/clockwork-horizon-part-2.txt` |
| TX-225-002 | Chroniton | Before Chicxulub (1/2) | 14 — 06/12/26 | Late Cretaceous, ~66 MYA | `before-chicxulub/before-chicxulub-part-1.txt` |
| TX-225-003 | The White Skull | Before Chicxulub (2/2) | 15 — 07/10/26 (1st half) | Late Cretaceous, ~66 MYA | `before-chicxulub/before-chicxulub-part-2.txt` |
| TX-225-004 | Khetef's Tomb | Buried (1) | 15 — 07/10/26 (2nd half) | Middle Kingdom Egypt, c. 2055–1650 BC | `buried/buried-part-1.txt` |
| TX-225-005 | LOST PACKET | Buried (2) | 16 — 08/14/26 | Egypt → Rome | `buried/buried-part-2.txt` |
| TX-225-006 | Palatine | A Cup of Friendship (1) | 17 — 10/09/26 | Imperial Rome, 29 Dec 192 CE | `rome-192-ce/rome-192-ce-part-1.txt` |
| — | — | — | 18 — 11/13/26 | not played yet | — |

Session 13's only new line versus `clockwork-horizon-part-2.txt` is the level-up to Level 5, which is mechanics and stays off the site.

## Decisions (made 10/17/26)

1. **One site page per adventure** with one packet section per session: `docs/stories/displacement-logs/before-chicxulub.html` (TX-225-001 to 003), `buried.html` (TX-225-004 to 005), `a-cup-of-friendship.html` (TX-225-006).
2. **Received dates:** every packet arrived in one burst on the current site date (04/22/99).
3. **Session 16:** the note-taker was absent, so it is published as a **LOST PACKET** (TX-225-005, 3% integrity).
4. **Rome adventure name:** *A Cup of Friendship* (refs folder kept as `rome-192-ce/`).

## Continuity (as handled on the site)

- **Investigator 28** is now listed with the displaced team everywhere: map pins, profiles, the investigators index and the team lists on CIB-225 and the displacement lore page.
- **Investigator 51:** the TX-225-001 headcount shows a corrupted "5_" field, so 51's status stays deliberately ambiguous until the notes say otherwise.
- **Device identity:** the site says analysts can't confirm whether the reactor-suite "tricorder" and the chroniton detector are the same device. Update `docs/lore/telemetry-field-unit.html` once that's settled at the table.

## Lore

Published: `docs/lore/resonance-anchors.html` (LORE-MYS-226) and chroniton findings added to `telemetry-field-unit.html`. Still unwritten:

- **The "simulation" theory**: Investigator 89's hypothesis that each era is a simulation.
- **Khetef's Tomb / the unfinished funerary cipher**.
- **Signal degradation**: the detector weakens the longer the team stays in an era, and Rome comes with a 72-hour window.
