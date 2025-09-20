# Character Creation Guide

## Overview
This guide explains how to use the investigator markdown files with the character template to create character profile pages for your website.

## Available Investigator Files
Each investigator has a detailed markdown file containing all the information needed to populate the character template:

- **Investigator 07** - `investigator-07-asher-khalid.md` - Field operative with interpersonal skills
- **Investigator 13** - `investigator-13-nico-rylan.md` - Medical analysis specialist (already created)
- **Investigator 23** - `investigator-23-victoria-quinn.md` - Cryptid tracking specialist
- **Investigator 34** - `investigator-34-maya-patel.md` - Historical occult researcher
- **Investigator 42** - `investigator-42-donovan-cross.md` - Government conspiracy specialist
- **Investigator 51** - `investigator-51-river-zhang.md` - Dimensional anomaly researcher
- **Investigator 66** - `investigator-66-jordan-scott.md` - Lead investigator and team coordinator
- **Investigator 89** - `investigator-89-ezra-cason.md` - Academic occult researcher

## How to Create a Character Page

### Step 1: Copy the Template
Copy `character-template.html` to your desired location:
```bash
cp templates/character-template.html characters/investigator-[NUMBER].html
```

### Step 2: Use the Markdown File
Open the corresponding markdown file for the investigator you want to create. Each file contains:

- **Basic Information**: Agent ID, name, code name, clearance level, dates
- **Profile Details**: Real name, species, threat level, status, locations
- **Character Stats**: Four key abilities with ratings (1-10 scale)
- **Background Dossier**: Character history and recruitment story
- **Witness Accounts**: Placeholder quotes to fill in later
- **Bureau Observations**: Behavioral analysis and specializations
- **Current Status**: What they're doing now
- **Character Assessment**: Bureau's official evaluation
- **Related Investigations**: Links to connect with story pages
- **Additional Sections**: Ideas for future development

### Step 3: Replace Template Placeholders
Replace all `[BRACKETED]` placeholders in the HTML template with content from the markdown file:

#### Header Section
- `[AGENT-ID]` → `CIB-007` (or appropriate number)
- `[CHARACTER NAME]` → `Asher Khalid` (or appropriate name)
- `[LEVEL]` → `ALPHA` (or appropriate clearance)
- `[DATE]` → `1998-01-15` (or appropriate date)
- `[UPDATE-DATE]` → `1998-12-15` (or appropriate date)

#### Profile Table
- `[CODE NAME]` → `"GHOST"` (or appropriate code name)
- `[REAL NAME]` → `Asher Khalid` (or appropriate name)
- `[SPECIES/TYPE]` → `Human - Field Operative` (or appropriate type)
- `[THREAT DESCRIPTION]` → `LOW THREAT - VALUABLE ASSET` (or appropriate level)
- `[CURRENT STATUS]` → `ACTIVE - FIELD OPERATIONS` (or appropriate status)
- `[LOCATIONS]` → `Bureau Field Office, Undercover Operations...` (or appropriate locations)
- `[ENCOUNTER DETAILS]` → Recruitment story from markdown file

#### Character Stats
- `[VALUE]` → `9/10` (or appropriate rating)
- `[STAT LABEL]` → `Field Operations` (or appropriate skill)

#### Content Sections
- `[CHARACTER NAME]` → Character's actual name
- `[CHARACTER TITLE]` → Professional title or specialization
- `[PHOTO DESCRIPTION]` → Description of the character photo
- All other placeholders should be filled with content from the markdown file

### Step 4: Customize Content
Use the markdown file as a guide to customize:

- **Background Dossier**: Expand the recruitment story
- **Witness Accounts**: Fill in actual quotes when available
- **Bureau Observations**: Add specific behavioral details
- **Specializations**: List actual areas of expertise
- **Current Status**: Describe what they're doing now
- **Related Investigations**: Link to actual story pages

### Step 5: Add CSS Classes
Use the appropriate CSS classes for styling:

- `.spooky` - For red/scary text (supernatural elements, dangers)
- `.atmospheric` - For glowing text (mysterious moments, emotional content)
- `.highlight` - For yellow background text (important information)
- `.terminal-font` - For monospace text (technical details, codes)
- `.blink` - For blinking animation (warnings, alerts)

## Template Features

### Classified/Decrypted System
- **Default View**: Shows redacted information (black bars)
- **Decrypt Button**: Click to reveal full character details
- **Re-encrypt**: Click to hide information again
- **Cool Effects**: Progress bar, status messages, overlay

### Image Placeholders
- **Classified View**: Silhouette placeholder
- **Decrypted View**: Character image placeholder
- **Easy to Replace**: Just replace placeholder divs with actual images

### Navigation
- **Back to Agent Files**: Links to investigators page
- **Main Archives**: Links to home page
- **Next Agent**: Can be added for sequential navigation

## Content Development Tips

### From Stories
As you write stories, look for opportunities to:
- Add witness quotes to character pages
- Develop character relationships and interactions
- Create specific case details and outcomes
- Build character backstories and motivations

### From Character Pages
Use character pages to:
- Establish character expertise and specializations
- Create connections between different investigators
- Set up future story possibilities
- Build the Bureau's organizational structure

### Consistency
- Keep character details consistent across stories and pages
- Update character status as stories progress
- Maintain timeline consistency with dates and events
- Ensure clearance levels match character roles

## File Organization
```
mplennartz.github.io/
├── docs/
│   ├── characters/
│   │   ├── investigator-07.html
│   │   ├── investigator-13.html (already created)
│   │   ├── investigator-23.html
│   │   └── ... (other investigators)
│   ├── templates/
│   │   └── character-template.html
│   └── ... (other files)
└── refs/
    ├── investigator-07-asher-khalid.md
    ├── investigator-13-nico-rylan.md
    ├── investigator-23-victoria-quinn.md
    └── ... (other markdown files)
```

## Next Steps
1. **Create Character Pages**: Use the template and markdown files to create pages for each investigator
2. **Add Images**: Replace image placeholders with actual character photos
3. **Link Stories**: Connect character pages to relevant story pages
4. **Develop Content**: Fill in TBD sections as stories are written
5. **Update Status**: Keep character information current as the story progresses

## Notes
- All investigators are marked as "LOW THREAT - VALUABLE ASSET" to maintain consistency
- Clearance levels follow the established hierarchy (ALPHA, BETA, GAMMA, OMEGA)
- Character stats use a 1-10 scale for easy comparison
- Dates are set in 1998 to match the website's retro aesthetic
- All characters have placeholder content that can be developed over time
