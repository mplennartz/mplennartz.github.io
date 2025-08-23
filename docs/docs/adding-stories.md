# Adding New Stories to Cursed Investigations Bureau

## Quick Start Guide

### 1. Copy the Template
- Navigate to `templates/story-template.html`
- Copy the entire file to your desired story location:
  - Ghost stories: `stories/ghost-stories/your-story.html`
  - Cryptid sightings: `stories/cryptid-sightings/your-story.html`
  - Conspiracy files: `stories/conspiracy-files/your-story.html`

### 2. Replace Placeholders
Replace all `[BRACKETED]` placeholders with your content:

- `[STORY TITLE]` - Your story title
- `[CASE-NUMBER]` - Use the numbering system below
- `[THREAT LEVEL]` - LOW, MEDIUM, or HIGH THREAT
- `[DATE]` and `[UPDATE-DATE]` - Story dates
- `[INVESTIGATOR NAME]` - Choose from existing investigators (07, 23, 42, 89, 13, 66, 51, 34)
- `[LOCATION]` - Where the story takes place
- `[PHENOMENON TYPE]` - Type of supernatural activity

### 3. Update the Stories Page
Add your new story to `stories.html`:

```html
<div class="story-card">
    <div class="story-header">
        <a href="stories/[category]/[your-file].html" class="story-title">[Your Title]</a>
        <div class="story-meta">
            Case #[CASE-NUMBER]<br>
            Date: [DATE]<br>
            <span class="danger-level danger-[low/medium/high]">[THREAT LEVEL]</span>
        </div>
    </div>
    <p class="story-description">
        [Brief description of your story - 2-3 sentences]
    </p>
    <div class="story-tags">
        <span class="story-tag">[TAG1]</span>
        <span class="story-tag">[TAG2]</span>
        <span class="story-tag">[INVESTIGATOR NAME]</span>
    </div>
</div>
```

## Case Numbering System

### Ghost Stories (Spectral Encounters)
- Range: CIB-001 to CIB-099
- Used: CIB-001 (Server Room Phantom), CIB-007 (WiFi Dead Zone)
- Next available: CIB-002, CIB-003, etc.

### Cryptid Sightings 
- Range: CIB-100 to CIB-199 (but we're using smaller numbers for now)
- Used: CIB-023 (Bigfoot), CIB-031 (Nessie), CIB-088 (Mothman)
- Next available: CIB-024, CIB-032, etc.

### Conspiracy Files
- Range: CIB-200 to CIB-299 (but we're using smaller numbers for now)
- Used: CIB-042 (USB Conspiracy), CIB-051 (Bermuda WiFi)
- Next available: CIB-043, CIB-052, etc.

## Styling Classes

Use these CSS classes for authentic retro styling:

### Text Effects
- `.spooky` - Red text with glow (for scary/dangerous content)
- `.atmospheric` - Green glowing text (for mysterious content)
- `.highlight` - Yellow background (for important info)
- `.terminal-font` - Monospace font (for technical/computer content)
- `.blink` - Blinking animation (use sparingly!)

### Content Boxes
- `.evidence-box` - Green-bordered box for evidence and technical data
- `.witness-statement` - Yellow-bordered box for quotes and testimonies
- `.warning-box` - Red-bordered box for warnings and danger notices

## Threat Levels

### LOW THREAT (Green)
- Minor phenomena
- No physical danger
- Limited impact
- Class: `danger-low`

### MEDIUM THREAT (Yellow)
- Equipment damage possible
- Psychological effects
- Ongoing investigation needed
- Class: `danger-medium`

### HIGH THREAT (Red)
- Physical danger present
- Severe phenomena
- Immediate action required
- Class: `danger-high`

## File Structure Tips

### File Naming
- Use lowercase with hyphens: `server-room-phantom.html`
- Keep names descriptive but concise
- Match the URL structure: `/stories/ghost-stories/filename.html`

### Navigation Links
- Update `href` paths based on your file location
- Use `../../` to go up two directories from story files
- Test all navigation links after creating new stories

## Content Guidelines

### Story Length
- Aim for 500-1500 words per story
- Include multiple sections (Initial Report, Testimonies, Investigation, etc.)
- Add 2-4 witness statements
- Include specific evidence with technical details

### Writing Style
- First person from Bureau perspective
- Professional but mysterious tone
- Include specific dates (keep in 1998 timeframe)
- Add technical jargon for authenticity
- Balance humor with spookiness

### Evidence Types
- EMF readings
- Temperature changes
- Audio/video evidence
- Witness testimonies
- Historical research
- Technical malfunctions
- Government documents (for conspiracy stories)

## Adding to Homepage

Update the "Latest Investigations" table on `home.html`:

```html
<tr>
    <td>[DATE]</td>
    <td><a href="stories/[category]/[filename].html">[Story Title]</a></td>
    <td>[Investigator Name]</td>
    <td><span class="[status-class]">[STATUS]</span></td>
</tr>
```

## Testing Your Story

1. Check all links work correctly
2. Verify CSS classes display properly
3. Test navigation between stories
4. Ensure mobile responsiveness
5. Validate 1998 aesthetic is maintained

## Need Help?

- Copy existing stories as examples
- Check `templates/story-template.html` for structure
- Review CSS classes in `css/cursed-theme.css` and `css/retro-style.css`
- Keep the retro 1998 conspiracy website feel! 