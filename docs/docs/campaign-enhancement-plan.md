# Campaign Enhancement Plan

This plan focuses on turning the site into a better campaign documentation hub for your monthly RPG sessions.

## Scope

Planned features:

1. World mission map with links to case pages
2. Investigator mission perspectives as hover/popup content (not separate pages)
3. Lore pages for mysteries/creatures/artifacts
4. Investigator-style page(s) for recurring NPCs

---

## How to Use This Plan

- Review each task and mark decisions in the `Decision` lines.
- Keep or adjust effort estimates as needed.
- Move tasks between phases if priorities change.
- Replace any placeholder text in `Tweak Notes`.

---

## Current Site Baseline

- Static HTML/CSS/JS site under `docs/`
- Case index: `docs/stories.html`
- Case pages: `docs/stories/...`
- Investigator index: `docs/investigators.html`
- Investigator profiles: `docs/characters/...`
- Story template: `docs/templates/story-template.html`

Implication: best approach is reusable HTML patterns + lightweight JS, not heavy framework migration.

---

## Guiding Principles

- Keep style consistent with existing retro/CIB visual language.
- Prefer reusable components (single JS/CSS patterns across pages).
- Preserve low-maintenance authoring (easy to add future cases/lore/NPCs).
- Avoid breaking existing case URLs and navigation.

---

## Phase Plan Overview

### Phase 1 (Foundation): Lore + NPC Structure

Reason: fastest value and unlocks cross-linking for later features.

### Phase 2 (Immersion): Investigator Perspectives

Reason: adds character voice/context without new page overhead.

### Phase 3 (Capstone): World Mission Map

Reason: highest complexity and visual payoff once data links exist.

---

## Detailed Tasks

## Task A: Lore Codex

### Goal

Add a lore system for mysteries/creatures/artifacts with direct links to related cases.

### Deliverables

- [x] `docs/lore.html` (index page)
- [x] `docs/lore/` folder with initial lore entries
- [x] `docs/templates/lore-template.html` (authoring template)
- [x] `Related Lore` sections added to selected case pages
- [x] Navigation link to Lore in relevant top navs

### Suggested Entry Fields

- Codex ID
- Type (`Mystery`, `Creature`, `Artifact`, `Entity`, etc.)
- First Seen (case/date)
- Known Facts
- Open Questions
- Related Cases
- Status (`Active`, `Dormant`, `Resolved`, `Unknown`)

### Estimated Effort

1 to 1.5 sessions

### Dependencies

None (best first task)

### Risks

- Link inconsistency if case links are manually typed across many pages
- Style drift if page layout differs from existing story/character conventions

### Acceptance Criteria

- [x] At least 3 lore entries published
- [x] Each lore entry links back to case(s)
- [x] At least 3 case pages link into lore
- [x] Layout and theme match existing site style

### Decision

Decision: `Completed (Implemented 2026-04-03)`

### Tweak Notes

- Implemented files:
- `docs/lore.html`
- `docs/lore/whitlock-lineage.html`
- `docs/lore/breathing-ground-entity.html`
- `docs/lore/sifu-loyalty-protocol.html`
- `docs/templates/lore-template.html`
- Cross-links added in case pages:
- `docs/stories/active-leads/bloodlines.html`
- `docs/stories/ghost-stories/false-light.html`
- `docs/stories/conspiracy-files/deep-freeze.html`

---

## Task B: Recurring NPC Dossier(s)

### Goal

Track recurring NPCs with pages that feel like investigator profiles but clearly marked as NPCs.

### Deliverables

- [ ] One new NPC dossier page under `docs/characters/`
- [ ] Investigator-style layout adapted with NPC fields
- [ ] NPC listed in an index location (either `investigators.html` section or new people page)
- [ ] Links from related case/lore pages to NPC dossier

### Suggested NPC Fields

- Role / Faction
- Relationship to team
- Last Seen
- Trust / Reliability indicator
- Known Ties
- Threat Profile
- Case Appearances

### Estimated Effort

0.5 to 1 session

### Dependencies

Ideally after Task A (so lore/case links already exist)

### Risks

- Confusion between investigator roster and NPC roster if labeling is unclear

### Acceptance Criteria

- [ ] NPC page created with complete profile
- [ ] Clearly marked as NPC (not active investigator)
- [ ] Linked from at least one case page
- [ ] Linked from at least one lore page (if relevant)

### Decision

Decision: `Pending`

### Tweak Notes

-

---

## Task C: Investigator Perspectives (Hover/Popup)

### Goal

Add short, in-character mission perspectives on case pages without sending users to separate pages.

### Deliverables

- [ ] Reusable perspective UI pattern (chips + modal/tooltip)
- [ ] Shared CSS in central stylesheet
- [ ] Shared JS behavior in central script file
- [ ] Integrated on at least one flagship case page (recommended: `bloodlines.html`)
- [ ] Content model documented for easy future additions

### Content Model (Simple)

- investigator ID
- case ID
- voice label/tag
- short perspective text (50-180 words)
- confidence or mood tag (optional)
- timestamp/session marker (optional)

### UX Requirements

- Click/tap to open perspective
- Keyboard-friendly close (Escape)
- Close on outside click
- Mobile-friendly spacing and readable modal text

### Estimated Effort

1 session for reusable component + rollout time per additional case

### Dependencies

Works best after Task A/B so links and identities are settled

### Risks

- Repeated inline scripts if not centralized
- Inconsistent authoring voice if no shared snippet format

### Acceptance Criteria

- [ ] Perspective feature works on desktop and mobile
- [ ] No separate page needed for perspective content
- [ ] At least 2 investigator perspectives on first integrated case
- [ ] Reusable pattern documented for future case pages

### Decision

Decision: `Pending`

### Tweak Notes

-

---

## Task D: World Mission Map

### Goal

Visualize mission locations with quick links to each case and optional filtering by status/investigator.

### Deliverables

- [x] `docs/operations-map.html` page
- [x] Mission pin data source (inline JS object or standalone JSON)
- [x] Pin tooltips/cards with case metadata + case link
- [x] Optional filters (`Active`, `Closed`, investigator)
- [x] Map link in site navigation

### MVP Approach

Start with a fixed image map + positioned pins, then add richer interaction if needed.

### Data Fields

- case ID
- case title
- date/session
- location label
- x/y coordinates (or lat/lng if using map library)
- status
- linked investigators
- case URL

### Estimated Effort

1.5 to 2.5 sessions

### Dependencies

Strongly benefits from Task A completion (stable links and case metadata)

### Risks

- Pin placement and overlap on small screens
- Additional effort if switching to real geospatial library

### Acceptance Criteria

- [x] All selected missions appear as pins
- [x] Pin click opens mission details with link to case page
- [x] Filters (if included) operate correctly
- [x] Mobile layout remains usable

### Decision

Decision: `Completed (Implemented 2026-04-03, Pending your review)`

### Tweak Notes

- Implemented files:
- `docs/operations-map.html`
- Navigation updated with `OPERATIONS MAP` on:
- `docs/home.html`
- `docs/stories.html`
- `docs/investigators.html`
- `docs/lore.html`
- `docs/evidence.html`
- `docs/contact.html`
- `docs/guestbook.html`

---

## Cross-Task Technical Standardization

To reduce long-term maintenance:

- [ ] Define consistent IDs (`CIB-###`) across case/lore/NPC references
- [ ] Use a standard "Related Links" block format on all pages
- [ ] Keep reusable CSS in shared stylesheets, avoid page-specific duplicates
- [ ] Keep reusable JS in shared scripts, avoid copy/paste inline scripts

Optional (recommended):

- [ ] Introduce a small data registry file for case metadata used by map and cross-links

---

## Recommended Build Order

1. Task A (Lore Codex)
2. Task B (NPC Dossier)
3. Task C (Investigator Perspectives)
4. Task D (World Mission Map)

Why this order:

- Early tasks are lower effort and unlock linking structure.
- Perspective and map become easier once canonical links and entities exist.

---

## Rough Timeline (Adjustable)

- Week 1: Task A + Task B
- Week 2: Task C pilot on one case, then roll forward
- Week 3: Task D MVP map
- Week 4: Polish and expansion (more cases, more lore, filter refinements)

---

## Content Prep Checklist (Before Implementation)

- [ ] Confirm initial lore entries (which 3 to launch first)
- [ ] Confirm first recurring NPC target
- [ ] Confirm first case to receive perspective popups (`Bloodlines` recommended)
- [ ] Confirm map scope (all historical missions vs active-only)
- [ ] Confirm preferred map style (stylized image vs realistic geography)

---

## Approval Tracker

- Task A Approved: `Yes`
- Task B Approved: `No`
- Task C Approved: `No`
- Task D Approved: `No`

Overall Plan Approved: `No`

---

## Notes for Future Expansion

- Add session timeline page (chronological campaign recap)
- Add faction tracker if recurring organizations emerge
- Add "Previously On" card generator once session count grows

