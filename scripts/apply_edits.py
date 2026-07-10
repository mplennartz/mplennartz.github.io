#!/usr/bin/env python3
"""Scripted repetitive edits for docs/ pages: shared-CSS extraction,
decrypt-script extraction, and nav normalization.

Every destructive replacement is verified against the canonical content
first; mismatching files are skipped with a loud warning. All passes are
idempotent. Usage: python scripts/apply_edits.py <extract|styles|decrypt|nav|report>
"""
import re
import sys
import textwrap
from pathlib import Path

DOCS = Path(__file__).resolve().parents[1] / "docs"

CANON = {
    "character": ("characters/investigator-07.html", "css/character-page.css"),
    "story": ("stories/cryptid-sightings/bigfoot-digital.html", "css/story-page.css"),
    "lore": ("lore/breathing-ground-entity.html", "css/lore-page.css"),
}

CHARACTER_PAGES = [f"characters/investigator-{n}.html" for n in ("07", "13", "42", "66", "89")]
STORY_PAGES = [
    "stories/active-leads/clockwork-horizon.html",
    "stories/conspiracy-files/circuit-breaker.html",
    "stories/conspiracy-files/deep-freeze.html",
    "stories/conspiracy-files/usb-conspiracy.html",
    "stories/cryptid-sightings/bigfoot-digital.html",
    "stories/cryptid-sightings/wild-at-heart.html",
    "stories/cryptid-sightings/nessie-webcam.html",
    "stories/ghost-stories/bloodlines.html",
    "stories/ghost-stories/whispers-at-stillwater.html",
    "stories/ghost-stories/false-light.html",
    "stories/ghost-stories/tales-from-the-trailer-park.html",
    "stories/ghost-stories/server-room-phantom.html",
]
LORE_PAGES = [
    "lore/breathing-ground-entity.html",
    "lore/sifu-loyalty-protocol.html",
    "lore/whitlock-lineage.html",
    "lore/k-vance-identity-shell.html",
    "lore/nexstep-displacement-event.html",
    "lore/telemetry-field-unit.html",
]
FAMILIES = {
    "character": CHARACTER_PAGES + ["templates/character-template.html"],
    "story": STORY_PAGES + ["templates/story-template.html"],
    "lore": LORE_PAGES + ["templates/lore-template.html"],
}

NAV_ORDER = [
    ("home.html", "HOME"),
    ("investigators.html", "INVESTIGATORS"),
    ("stories.html", "CASE FILES"),
    ("operations-map.html", "OPERATIONS MAP"),
    ("lore.html", "LORE CODEX"),
    ("evidence.html", "EVIDENCE"),
    ("contact.html", "CONTACT"),
    ("guestbook.html", "GUESTBOOK"),
]


def read(rel):
    return (DOCS / rel).read_text(encoding="utf-8")


def write(rel, text):
    (DOCS / rel).write_text(text, encoding="utf-8", newline="")


def style_span(text):
    """(start, end, inner) of the first <style> block, or None."""
    m = re.search(r"[ \t]*<style>\n(.*?)\n[ \t]*</style>\n", text, re.S)
    if not m:
        return None
    return m.start(), m.end(), m.group(1)


def css_prefix(text):
    m = re.search(r'href="(.*?)css/retro-style\.css"', text)
    return m.group(1) if m else None


def parse_rules(css):
    """Split CSS into top-level rules (comment-aware, handles @media/@keyframes)."""
    rules, depth, start, i, n = [], 0, 0, 0, len(css)
    while i < n:
        if css.startswith("/*", i):
            end = css.find("*/", i)
            i = n if end == -1 else end + 2
            continue
        c = css[i]
        if c == "{":
            depth += 1
        elif c == "}":
            depth -= 1
            if depth == 0:
                rules.append(css[start:i + 1])
                start = i + 1
        i += 1
    return rules


def norm(rule):
    rule = re.sub(r"/\*.*?\*/", "", rule, flags=re.S)
    return " ".join(rule.split())


def cmd_extract():
    for family, (src, dest) in CANON.items():
        span = style_span(read(src))
        assert span, f"no style block in {src}"
        css = textwrap.dedent(span[2]).strip() + "\n"
        write(dest, css)
        print(f"wrote {dest} ({len(css.splitlines())} lines) from {src}")
    # decrypt script
    text = read("characters/investigator-07.html")
    m = re.search(r"[ \t]*<script>\n(.*?startDecryption.*?)\n[ \t]*</script>\n", text, re.S)
    assert m, "no decrypt script found"
    js = textwrap.dedent(m.group(1)).strip() + "\n"
    write("js/character-decrypt.js", js)
    print(f"wrote js/character-decrypt.js ({len(js.splitlines())} lines)")


def cmd_styles():
    for family, pages in FAMILIES.items():
        core_css = read(CANON[family][1])
        core_norms = {norm(r) for r in parse_rules(core_css)}
        sheet = CANON[family][1]
        for rel in pages:
            text = read(rel)
            if f"{sheet.split('/')[-1]}" in text:
                print(f"skip {rel}: already linked")
                continue
            span = style_span(text)
            if not span:
                print(f"!! WARN {rel}: no style block found")
                continue
            start, end, inner = span
            page_rules = parse_rules(inner)
            page_norms = {norm(r) for r in page_rules}
            missing = core_norms - page_norms
            if missing:
                print(f"!! WARN {rel}: {len(missing)} core rules missing from page block — SKIPPED")
                for r in sorted(missing)[:3]:
                    print(f"     e.g. {r[:100]}")
                continue
            prefix = css_prefix(text)
            if prefix is None:
                print(f"!! WARN {rel}: cannot determine css prefix — SKIPPED")
                continue
            extras = [r for r in page_rules if norm(r) and norm(r) not in core_norms]
            link = f'    <link rel="stylesheet" href="{prefix}{sheet}">\n'
            if extras:
                body = "\n\n".join(
                    textwrap.indent(textwrap.dedent(r).strip(), "        ") for r in extras
                )
                repl = link + "    <style>\n        /* Page-specific styling */\n" + body + "\n    </style>\n"
            else:
                repl = link
            write(rel, text[:start] + repl + text[end:])
            print(f"ok   {rel}: -{len(inner.splitlines())} lines, {len(extras)} extra rule(s) kept")


def cmd_decrypt():
    canon = read("js/character-decrypt.js").strip()
    pages = CHARACTER_PAGES + ["templates/character-template.html"]
    for rel in pages:
        text = read(rel)
        if "character-decrypt.js" in text:
            print(f"skip {rel}: already linked")
            continue
        m = re.search(r"[ \t]*<script>\n(.*?startDecryption.*?)\n[ \t]*</script>\n", text, re.S)
        if not m:
            print(f"!! WARN {rel}: no decrypt script found")
            continue
        if textwrap.dedent(m.group(1)).strip() != canon:
            print(f"!! WARN {rel}: decrypt script differs from canonical — SKIPPED")
            continue
        prefix = css_prefix(text)
        repl = f'    <script src="{prefix}js/character-decrypt.js"></script>\n'
        write(rel, text[:m.start()] + repl + text[m.end():])
        print(f"ok   {rel}: decrypt script -> shared file")


def nav_span(text):
    start = text.find('class="nav-links"')
    if start == -1:
        return None
    end = text.find("</div>", start)
    return start, end


def cmd_nav():
    for path in sorted(DOCS.rglob("*.html")):
        rel = path.relative_to(DOCS).as_posix()
        if rel == "index.html":
            continue
        text = read(rel)
        span = nav_span(text)
        if not span:
            print(f"--   {rel}: no nav-links")
            continue
        start, end = span
        nav = text[start:end]
        m = re.search(r'( *)<a href="(.*?)stories\.html"[^>]*>', nav)
        if not m:
            print(f"!! WARN {rel}: no stories.html anchor in nav — SKIPPED")
            continue
        indent, prefix = m.group(1), m.group(2)
        changed = []
        for href, label in (("operations-map.html", "OPERATIONS MAP"), ("lore.html", "LORE CODEX")):
            if f"{prefix}{href}" in nav or f'href="{href}"' in nav:
                continue
            # insert after stories anchor (ops), or after ops anchor (lore)
            anchor_after = "stories.html" if href == "operations-map.html" else "operations-map.html"
            am = re.search(rf'( *)<a href="[^"]*{anchor_after}"[^>]*>[^<]*</a>\n', nav)
            if not am:
                print(f"!! WARN {rel}: cannot find insertion point for {label}")
                continue
            new_a = f'{indent}<a href="{prefix}{href}" class="nav-button">{label}</a>\n'
            nav = nav[:am.end()] + new_a + nav[am.end():]
            changed.append(label)
        if changed:
            write(rel, text[:start] + nav + text[end:])
            print(f"ok   {rel}: added {', '.join(changed)}")
        else:
            print(f"skip {rel}: nav complete")


def cmd_report():
    for path in sorted(DOCS.rglob("*.html")):
        rel = path.relative_to(DOCS).as_posix()
        text = read(rel)
        navs = len(re.findall(r'class="nav-button', text))
        styles = text.count("<style>")
        print(f"{rel}: nav-buttons={navs} style-blocks={styles}")


if __name__ == "__main__":
    cmds = {"extract": cmd_extract, "styles": cmd_styles, "decrypt": cmd_decrypt,
            "nav": cmd_nav, "report": cmd_report}
    if len(sys.argv) != 2 or sys.argv[1] not in cmds:
        sys.exit(f"usage: {sys.argv[0]} <{'|'.join(cmds)}>")
    cmds[sys.argv[1]]()
