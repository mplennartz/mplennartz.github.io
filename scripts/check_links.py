#!/usr/bin/env python3
"""Verify every local href/src in docs/*.html resolves to a file on disk.
Skips external URLs, anchors, mailto, and template placeholders."""
import re
import sys
from pathlib import Path

DOCS = Path(__file__).resolve().parents[1] / "docs"

SKIP_PREFIXES = ("http://", "https://", "mailto:", "#", "javascript:", "data:")
errors = 0
checked = 0

for page in sorted(DOCS.rglob("*.html")):
    rel = page.relative_to(DOCS).as_posix()
    is_template = rel.startswith("templates/")
    text = page.read_text(encoding="utf-8")
    for m in re.finditer(r'(?:href|src)="([^"]+)"', text):
        url = m.group(1).split("#")[0].split("?")[0]
        if not url or url.startswith(SKIP_PREFIXES) or "[" in url or "${" in url:
            continue
        if url.startswith("/"):
            target = DOCS / url.lstrip("/")
        elif is_template:
            # templates are authored for their post-copy destination depth
            depth = url.count("../")
            base = DOCS / ("characters" if "character" in rel else
                           "stories/x" if "story" in rel else "lore")
            target = (base / url).resolve()
        else:
            target = (page.parent / url).resolve()
        checked += 1
        if not target.exists():
            print(f"BROKEN {rel}: {m.group(1)}")
            errors += 1

print(f"{checked} refs checked, {errors} broken")
sys.exit(1 if errors else 0)
