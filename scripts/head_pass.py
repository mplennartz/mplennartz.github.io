#!/usr/bin/env python3
"""Insert meta description, Open Graph tags, and favicon link into every
content page, and emit docs/sitemap.xml from the same table. Idempotent."""
import re
import sys
from pathlib import Path

DOCS = Path(__file__).resolve().parents[1] / "docs"
SITE = "https://www.theredactedtruth.com"
OG_IMAGE = f"{SITE}/images/og-card.png"

# rel path -> (og:type, description)
PAGES = {
    "index.html": ("website", "The Redacted Truth - a satirical 1998-era paranormal conspiracy archive. Fictional case files, cryptid sightings, and government cover-ups. Enter the archives."),
    "home.html": ("website", "Homepage of the Cursed Investigations Bureau - declassified case files, investigator dossiers, the lore codex, and field operations of The Redacted Truth."),
    "investigators.html": ("website", "The classified field investigators of the Cursed Investigations Bureau - codenames GHOST, DOC, RELIC, DOGFATHER, SHADE, and SAGE."),
    "stories.html": ("website", "Complete case file archive: active leads, spectral encounters, cryptid evidence, and government cover-ups documented by the Bureau."),
    "lore.html": ("website", "The Lore Codex - entities, artifacts, covert programs, and unsolved mysteries catalogued by the Cursed Investigations Bureau."),
    "evidence.html": ("website", "The Bureau evidence locker: photographs, recordings, and recovered artifacts from paranormal investigations."),
    "contact.html": ("website", "Submit a secure report of paranormal activity to the Cursed Investigations Bureau. Trust no one."),
    "guestbook.html": ("website", "Sign the Bureau guestbook - transmissions from informants, investigators, and civilians who have seen too much."),
    "operations-map.html": ("website", "Interactive map of Cursed Investigations Bureau field operations and case locations."),
    "characters/investigator-07.html": ("article", "Agent #CIB-007 'GHOST' - combat specialist and field operative. Classified dossier; decryption clearance required."),
    "characters/investigator-13.html": ("article", "Agent #CIB-013 'DOC' - combat medic and field operative. Classified dossier; decryption clearance required."),
    "characters/investigator-28.html": ("article", "Agent #CIB-028 'RELIC' - academic explorer, field researcher, and explosives specialist. Classified dossier; decryption clearance required."),
    "characters/investigator-42.html": ("article", "Agent #CIB-042 'DOGFATHER' - commander and K9 specialist. Classified dossier; decryption clearance required."),
    "characters/investigator-66.html": ("article", "Agent #CIB-066 'SHADE' - undercover operative and investigator. Classified dossier; decryption clearance required."),
    "characters/investigator-89.html": ("article", "Agent #CIB-089 'SAGE' - scholar, cryptographer, and hacker. Classified dossier; decryption clearance required."),
    "stories/active-leads/clockwork-horizon.html": ("article", "Case #CIB-225: Missing quantum cores at Argencorp NeXstep lead to a hidden reactor suite - and a field team displaced to an unmapped wilderness."),
    "stories/conspiracy-files/circuit-breaker.html": ("article", "Case #CIB-224: A workplace death in a fully automated DC office building reveals an emergent, self-preserving building AI."),
    "stories/conspiracy-files/deep-freeze.html": ("article", "Case #CIB-217: An Arctic rescue mission at Site Polaris turns out to be a covert government loyalty stress-test with lethal stakes."),
    "stories/conspiracy-files/usb-conspiracy.html": ("article", "Case #CIB-042: Leaked government USB drives expose decades of classified supernatural research and active cover-ups."),
    "stories/conspiracy-files/bermuda-wifi.html": ("article", "Case #CIB-051: A total communications blackout over the Bermuda Triangle traces back to Project Blue Sky ionospheric experiments."),
    "stories/cryptid-sightings/wild-at-heart.html": ("article", "Case #CIB-089: A mangled body in the New Jersey Pine Barrens leads investigators into the legend of the Jersey Devil."),
    "stories/cryptid-sightings/mothman-social.html": ("article", "Case #CIB-088: Point Pleasant winged-humanoid sightings correlate exactly with anonymous forum posts that predict disasters."),
    "stories/cryptid-sightings/bigfoot-digital.html": ("article", "Case #CIB-023: Silicon Valley security footage captures an 8-foot humanoid that knows every camera blind spot."),
    "stories/cryptid-sightings/nessie-webcam.html": ("article", "Case #CIB-031: A Loch Ness tourism webcam records 47 seconds of aquatic movement unlike any known marine life."),
    "stories/cryptid-sightings/coffee-shop-encounter.html": ("article", "Case #CIB-055: A seven-foot fur-covered humanoid peacefully frequents a downtown Seattle coffee shop."),
    "stories/ghost-stories/bloodlines.html": ("article", "Case #CIB-308: An FBI-assist case in Groveton, PA exposes the Whitlock family's vitality-transfer killings."),
    "stories/ghost-stories/whispers-at-stillwater.html": ("article", "Case #CIB-023: An ancestral estate in Fiddler's Green, WV is haunted by the hybrid entity Sulemazoth."),
    "stories/ghost-stories/false-light.html": ("article", "Case #CIB-015: Two hikers dead of impossible decomposition - and a reality-warping presence beneath Wilkes County, NC."),
    "stories/ghost-stories/tales-from-the-trailer-park.html": ("article", "Case #CIB-008: A blood-drained corpse in Muleshoe, TX leads the Bureau to a hidden vampire community."),
    "stories/ghost-stories/vanishing-forum-post.html": ("article", "Case #CIB-063: A forum post describing a murder vanishes minutes after each viewing, leaving no server trace."),
    "stories/ghost-stories/server-room-phantom.html": ("article", "Case #CIB-001: TechCorp servers crash nightly at exactly 3:33 AM amid cold spots and monitor apparitions."),
    "stories/ghost-stories/wifi-dead-zone.html": ("article", "Case #CIB-007: A downtown Portland block loses all connectivity nightly - tied to the restless spirits of a historical tragedy."),
    "lore/nexstep-displacement-event.html": ("article", "LORE-MYS-225: The Argencorp reactor-control breach that displaced six Bureau investigators to an unmapped wilderness."),
    "lore/whitlock-lineage.html": ("article", "LORE-MYS-308: The Whitlock continuity pattern - vitality-transfer rites and the impersonation of a former federal agent."),
    "lore/telemetry-field-unit.html": ("article", "LORE-ART-225: A handheld instrument of unknown manufacture recovered from the NeXstep reactor suite."),
    "lore/breathing-ground-entity.html": ("article", "LORE-ENT-015: A subterranean fungal intelligence with hallucinogenic spread and temporal distortion."),
    "lore/k-vance-identity-shell.html": ("article", "LORE-PRO-225: A false personnel construct with a valid badge, cross-department orders, and no HR file."),
    "lore/sifu-loyalty-protocol.html": ("article", "LORE-PRO-217: A covert program using engineered crisis scenarios to eliminate whistleblowers."),
    "timeline.html": ("website", "Operation chronology - every Bureau case file and codex entry in chronological order."),
}


def css_prefix(text):
    m = re.search(r'href="(.*?)css/retro-style\.css"', text)
    return m.group(1) if m else None


def page_title(text, rel):
    m = re.search(r"<title>(.*?)</title>", text)
    title = m.group(1) if m else "The Redacted Truth"
    return title.removeprefix("The Redacted Truth - ") or "The Redacted Truth"


def cmd_apply():
    for rel, (og_type, desc) in PAGES.items():
        path = DOCS / rel
        if not path.exists():
            print(f"--   {rel}: does not exist yet, skipping")
            continue
        text = path.read_text(encoding="utf-8")
        if 'property="og:title"' in text:
            print(f"skip {rel}: already tagged")
            continue
        m = re.search(r"[ \t]*<title>.*?</title>\n", text)
        if not m:
            print(f"!! WARN {rel}: no title tag")
            continue
        prefix = css_prefix(text) or ""
        url = SITE + "/" if rel == "index.html" else f"{SITE}/{rel}"
        title = page_title(text, rel)
        block = (
            f'    <meta name="description" content="{desc}">\n'
            f'    <meta property="og:title" content="{title}">\n'
            f'    <meta property="og:description" content="{desc}">\n'
            f'    <meta property="og:type" content="{og_type}">\n'
            f'    <meta property="og:url" content="{url}">\n'
            f'    <meta property="og:image" content="{OG_IMAGE}">\n'
            f'    <link rel="icon" type="image/svg+xml" href="{prefix}favicon.svg">\n'
        )
        path.write_text(text[:m.end()] + block + text[m.end():], encoding="utf-8", newline="")
        print(f"ok   {rel}")

    # templates get description placeholder + favicon only (no OG - urls unknown)
    for rel in ("templates/story-template.html", "templates/character-template.html",
                "templates/lore-template.html"):
        path = DOCS / rel
        text = path.read_text(encoding="utf-8")
        if 'name="description"' in text:
            print(f"skip {rel}: already tagged")
            continue
        m = re.search(r"[ \t]*<title>.*?</title>\n", text)
        prefix = css_prefix(text) or ""
        block = (
            '    <meta name="description" content="[One-sentence description for search and share previews]">\n'
            f'    <link rel="icon" type="image/svg+xml" href="{prefix}favicon.svg">\n'
        )
        path.write_text(text[:m.end()] + block + text[m.end():], encoding="utf-8", newline="")
        print(f"ok   {rel} (placeholder)")


def cmd_sitemap():
    urls = []
    for rel in PAGES:
        if not (DOCS / rel).exists():
            print(f"--   sitemap: skipping missing {rel}")
            continue
        urls.append(SITE + "/" if rel == "index.html" else f"{SITE}/{rel}")
    lines = ['<?xml version="1.0" encoding="UTF-8"?>',
             '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">']
    for u in urls:
        lines.append(f"  <url><loc>{u}</loc></url>")
    lines.append("</urlset>")
    (DOCS / "sitemap.xml").write_text("\n".join(lines) + "\n", encoding="utf-8", newline="")
    print(f"wrote sitemap.xml ({len(urls)} urls)")


if __name__ == "__main__":
    cmds = {"apply": cmd_apply, "sitemap": cmd_sitemap}
    if len(sys.argv) != 2 or sys.argv[1] not in cmds:
        sys.exit(f"usage: {sys.argv[0]} <{'|'.join(cmds)}>")
    cmds[sys.argv[1]]()
